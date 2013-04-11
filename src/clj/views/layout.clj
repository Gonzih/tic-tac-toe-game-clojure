(ns views.layout
  (:require [hiccup.core :refer :all]))

(defn layout [& body]
  (html [:head [:title "Game"]
               [:script {:type "text/javascript" :src "/jquery.min.js"}]
               [:link   {:type "text/css" :rel "stylesheet" :href "/styles.css"}]]
        [:body body]
        [:script {:type "text/javascript" :src "/main.js"}]))

(defn index []
  (layout [:div#status "Waiting for players"]
          [:div#board [:div#11.cell][:div#12.cell][:div#13.cell] [:div.clear]
                      [:div#21.cell][:div#22.cell][:div#23.cell] [:div.clear]
                      [:div#31.cell][:div#32.cell][:div#33.cell]]))

(defn not-found [] (html [:h1 "Not Found"]))
