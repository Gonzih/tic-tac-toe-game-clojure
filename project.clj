(defproject xo-game "0.1.0-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}
  :source-paths ["src/clj"]
  :dependencies [[org.clojure/clojure "1.5.1"]
                 [http-kit "2.0.0"]
                 [compojure "1.1.5"]
                 [ring/ring-core "1.2.0-beta2"]
                 [ring/ring-devel "1.2.0-beta2"]
                 [hiccup "1.0.2"]
                 [org.clojure/tools.logging "0.2.6"]]
  :plugins []
  :main xo-game.handler
  :cljsbuild {
    :builds [{
        :source-paths ["src/cljs"]
        :compiler {
          :output-to "js/main.js"
          ;:optimizations :advanced
          :optimizations :simple
          :pretty-print true
          :externs ["externs/google_vizualization_api.js"
                    "externs/jquery.js"]}}]}
  :profiles
    {:dev        {:dependencies [[ring-mock "0.1.3"]
                                 [jayq "2.3.0"]
                                 [org.clojure/clojurescript "0.0-1586"]
                                 [log4j "1.2.15" :exclusions [javax.mail/mail
                                                              javax.jms/jms
                                                              com.sun.jdmk/jmxtools
                                                              com.sun.jmx/jmxri]]]
                  :plugins      [[lein-cljsbuild "0.3.0"]]}
     :production {:dependencies []
                  :plugins      []}}
  :min-lein-version "2.0.0")
