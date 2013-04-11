(ns xo-game.handler
  (:require [compojure.core             :refer :all]
            [ring.middleware.file       :refer :all]
            [ring.middleware.params     :refer :all]
            [ring.middleware.reload     :refer :all]
            [ring.middleware.stacktrace :refer :all]
            [org.httpkit.server         :refer :all]
            [clojure.tools.logging      :refer [info]]
            [compojure.handler     :as handler]
            [compojure.route       :as route]
            [views.layout          :as layout]))

(defmacro do-alter [& args]
  `(dosync (alter ~@args)))

(defmacro do-ref-set [& args]
  `(dosync (ref-set ~@args)))

(defn send-channel! [channel data]
  (info "Sending to channel " channel " data " data)
  (send! channel (str data)))

(def clients (ref {}))
(def players (ref #{}))
(def current-player (ref nil))
(def game-moves (ref []))

(defn find-channel [id]
  (-> (filter (fn [[conn c-id]] (= id c-id)) @clients) first first))

(defn uuid []
  (-> (java.util.UUID/randomUUID) str))

(defn start-client [[channel id]]
  (send-channel! channel {:action :start
                          :player? (contains? @players id)
                          :players (vec @players)}))

(defn start-game []
  (doall (map start-client @clients))
  (-> @current-player
      find-channel
      (send-channel! {:action :start-turn})))

(defn another-player []
  (first (disj @players @current-player)))

(defmulti process-message (fn [channel message] (:action message)))

(defmethod process-message :get-id [channel message]
  (let [id (str (uuid))]
    (dosync
      (alter clients assoc channel id)
      (when (< (count @players) 2) (alter   players conj   id))
      (when (= (count @players) 1) (ref-set current-player id)))
    (when (= (count @players) 2) (start-game))
    (send-channel! channel {:action :get-id :id id})))

(defmethod process-message :move [channel message]
  (let [{cell-to :cell-to player-id :player-id} message]
    (do-alter game-moves conj [player-id cell-to])
    (doall (map (fn [[channel id]]
                  (send-channel! channel {:action :move
                                          :cell-to cell-to
                                          :player-id player-id}))
                @clients))
    (send-channel! channel {:action :end-turn})
    (do-ref-set current-player (another-player))
    (-> @current-player find-channel (send-channel! {:action :start-turn}))))

(defmethod process-message :default [channel message]
  (info (str "Invalid message " message)))

(defn msg-received [channel msg]
  (info "Receiving from channel " channel " message " msg)
  (process-message channel (read-string msg)))

(defn ws-handler [req]
  (with-channel req channel
    (when (websocket? channel)
      (do-alter clients assoc channel true)
      (on-receive channel (fn [msg] (#'msg-received channel msg)))
      (on-close channel (fn [status]
                          (dosync
                            (alter players disj   (@clients channel))
                            (alter clients dissoc channel)))))))

(defroutes app-routes
  (GET "/" [] (layout/index))
  (GET "/ws" [] #'ws-handler)
  (route/files "" {:root "js"})
  (route/not-found (layout/not-found)))

(def app (-> #'app-routes
             (wrap-reload '(xo-game.handler views.layout))
             wrap-stacktrace
             handler/site
             wrap-params))

(defn -main []
  (let [stop (run-server app {:port 3000})]
    (info "Running")
    (read)
    (stop)))
