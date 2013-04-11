(ns xo-game.handler
  (:require [compojure.core             :refer :all]
            [ring.middleware.file       :refer :all]
            [ring.middleware.params     :refer :all]
            [ring.middleware.reload     :refer :all]
            [ring.middleware.stacktrace :refer :all]
            [org.httpkit.server         :refer :all]
            [clojure.set                :refer [subset?]]
            [clojure.tools.logging      :refer [info]]
            [compojure.handler     :as handler]
            [compojure.route       :as route]
            [views.layout          :as layout]
            [clojure.string        :as s]))

(defmacro do-alter [& args]
  `(dosync (alter ~@args)))

(defmacro do-ref-set [& args]
  `(dosync (ref-set ~@args)))

(defn send-channel! [channel data]
  (info "Sending to channel " channel " data " data)
  (send! channel (str data)))

(def ran (range 1 4))
(def win-lines (->>  (for [a ran b ran] (str a b)) (partition 3)))               ; All win rows
(def win-cols  (->>  (for [a ran b ran] (str b a)) (partition 3)))               ; All win cols
(def win-diag1 (list (for [a ran] (str a a))))                                   ; Win diagonal from upper right to bottom left
(def win-diag2 (list (s/split "13 22 31" #"\s")))                                ; Win diagonal from upper left to bottom right
(def win-combinations (map set (concat win-lines win-cols win-diag1 win-diag2))) ; Concat all win possibilities, convert to set

(def clients (ref {}))         ; List of clients (WebSockets + ids)
(def players (ref #{}))        ; List of players (ids)
(def current-player (ref nil)) ; ID of current player (current turn)
(def game-moves (ref []))      ; History of moves

(defn reset-game []
  (info "Reset")
  (dosync
    (ref-set game-moves [])))

(defn user-win? [user-turns]
  (some (fn [turns] (subset? turns user-turns)) win-combinations))

(defn find-winner []
  (->> @game-moves
       (group-by first)
       (map (fn [[id moves]] [id (map last moves)]))
       (map (fn [[id moves]] [id (-> moves concat set)]))
       (filter (fn [[id moves]] (user-win? moves)))
       first first))

(defn valid-move [player-id cell-to]
  (and (= @current-player player-id)
       (contains? @players player-id)
       (empty? (filter (fn [[id to]] (= to cell-to)) @game-moves))))

(defn find-channel [id]
  (-> (filter (fn [[conn c-id]] (= id c-id)) @clients) first first))

(defn uuid []
  (str (java.util.UUID/randomUUID)))

(defn start-client [[channel id]]
  (send-channel! channel {:action :start
                          :player? (contains? @players id)
                          :players (vec @players)}))

(defn start-game []
  (doall (map start-client @clients))
  (-> @current-player
      find-channel
      (send-channel! {:action :start-turn})))

(defn game-win-by [channel winner]
  (send-channel! channel {:action :win :player-id winner}))

(defn finish-game [[channel id]]
  (send-channel! channel {:action :finish}))

(defn another-player []
  (first (disj @players @current-player)))

(defmulti process-message (fn [channel message] (:action message)))

(defmethod process-message :get-id [channel message]
  (let [id (str (uuid))]
    (dosync
      (alter clients assoc channel id)                           ; Add new user id to clients list
      (when (< (count @players) 2) (alter   players conj   id))  ; If players amount il lower than 2 add player
      (when (= (count @players) 1) (ref-set current-player id))) ; If we have 1 player set it as current-player
    (send-channel! channel {:action :get-id :id id})             ; Send back user id to user
    (when (= (count @players) 2) (start-game))))                 ; If we have 2 playerst then start the game

(defn try-win-game
  "Find winner and send clients info about it"
  []
  (if-let [winner (find-winner)]
    (do (doall (map (fn [[channel id]] (game-win-by channel winner))
                    @clients))
        (reset-game))))

(defn try-finish-game
  "Finish game if 9 moves were done"
  []
  (when (= (count @game-moves) 9)
    (doall (map finish-game @clients))
    (reset-game)))

(defn end-turn [channel]
  (send-channel! channel {:action :end-turn}))

(defn start-turn [channel]
  (send-channel! channel {:action :start-turn}))

(defmethod process-message :move [channel {:keys [cell-to player-id] :as message}]
  (when (valid-move player-id cell-to)
    (do-alter game-moves conj [player-id cell-to]) ; Store move
    (doall (map (fn [[channel id]]                 ; Broadcast move to all clients
                  (send-channel! channel message))
                @clients))
    (end-turn channel)                             ; End turn for current user
    (do-ref-set current-player (another-player))   ; Replace current user with another one
    (-> @current-player find-channel start-turn)   ; Start turn for new user
    (try-win-game)                                 ; Try to find game winner
    (try-finish-game)))                            ; Try to finish the game

(defmethod process-message :default [channel message]
  (info (str "Invalid message " message)))

(defn msg-received [channel msg]
  (info "Receiving from channel " channel " message " msg)
  (process-message channel (read-string msg)))

(defn ws-handler [req]
  (with-channel req channel
    (when (websocket? channel)
      (do-alter clients assoc channel true)
      (on-receive channel (fn [msg] (msg-received channel msg)))
      (on-close channel (fn [status]
                          (info "Client " channel " quit.")
                          (dosync
                            (let [id (@clients channel)]
                              (alter players disj id)
                              (when (= @current-player id)
                                (ref-set current-player nil)) ; Do I need this line?
                              (alter clients dissoc channel))))))))

(defroutes app-routes
  (GET "/" [] (layout/index))
  (GET "/ws" [] ws-handler)
  (route/files "" {:root "js"})
  (route/not-found (layout/not-found)))

(def app (-> app-routes
             (wrap-reload '(xo-game.handler views.layout))
             wrap-stacktrace
             handler/site
             wrap-params))

(defn -main []
  (let [stop (run-server app {:port 3000})]
    (info "Running")
    (read)
    (stop)))

; TODO
; game state polling
; restart button
; reset using web sockets
