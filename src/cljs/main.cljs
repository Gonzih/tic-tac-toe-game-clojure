(ns xo-game.core
  (:require [cljs.reader :as reader])
  (:use [jayq.util :only [log]]
        [jayq.core :only [$ inner show on attr]]))

(def id      (atom nil))
(def players (atom nil))
(def turn?   (atom false))
(def player? (atom false))

(defn show-board [] (show ($ "#board")))
(defn status [& messages] (inner ($ "#status") (apply str messages)))

(defmulti process-message :action)

(defmethod process-message :get-id [message]
  (reset! id (:id message)))

(defmethod process-message :start [{is-player? :player? received-players :players}]
  (reset! player? is-player?)
  (reset! players (zipmap received-players ["x" "o"]))
  (if is-player?
    (status "Game in progress")
    (status "Game in progress (spectating)"))
  (show-board))

(defmethod process-message :start-turn [message]
  (reset! turn? true)
  (status "Your turn"))

(defmethod process-message :end-turn [message]
  (reset! turn? false)
  (status "Waiting for other player turn"))

(defmethod process-message :move [message]
  (let [{:keys [cell-to player-id]} message]
    (inner ($ (str "div#" cell-to ".cell")) (@players player-id))))

(defmethod process-message :win [{:keys [player-id]}]
  (if @player?
    (if (= @id player-id)
      (status "You won")
      (status "You lose"))
    (status "Player " player-id " won")))

(defmethod process-message :default [message]
  (log "Wrong message " message))

(defn get-id [conn]
  (.send conn (str {:action :get-id})))

(def conn (js/WebSocket. "ws://127.0.0.1:3000/ws"))

(defn onopen [e]
  (get-id conn))

(defn onerror [& args]
  (log args))

(defn onmessage [e]
  (log (aget e "data"))
  (-> e (aget "data") reader/read-string process-message))

(aset conn "onopen"    onopen)
(aset conn "onerror"   onerror)
(aset conn "onmessage" onmessage)

(defn cell-click [cell-id]
  (when (and @turn? @player?)
    (.send conn (str {:action :move :cell-to cell-id :player-id @id}))))

(on ($ "div.cell") "click" (fn [e] (-> e (aget "currentTarget") $ (attr "id") cell-click)))
