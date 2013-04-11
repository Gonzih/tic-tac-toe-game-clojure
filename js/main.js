var COMPILED = !0, goog = goog || {};
goog.global = this;
goog.DEBUG = !0;
goog.LOCALE = "en";
goog.provide = function(a) {
  if(!COMPILED) {
    if(goog.isProvided_(a)) {
      throw Error('Namespace "' + a + '" already declared.');
    }
    delete goog.implicitNamespaces_[a];
    for(var b = a;(b = b.substring(0, b.lastIndexOf("."))) && !goog.getObjectByName(b);) {
      goog.implicitNamespaces_[b] = !0
    }
  }
  goog.exportPath_(a)
};
goog.setTestOnly = function(a) {
  if(COMPILED && !goog.DEBUG) {
    throw a = a || "", Error("Importing test-only code into non-debug environment" + a ? ": " + a : ".");
  }
};
COMPILED || (goog.isProvided_ = function(a) {
  return!goog.implicitNamespaces_[a] && !!goog.getObjectByName(a)
}, goog.implicitNamespaces_ = {});
goog.exportPath_ = function(a, b, c) {
  a = a.split(".");
  c = c || goog.global;
  !(a[0] in c) && c.execScript && c.execScript("var " + a[0]);
  for(var d;a.length && (d = a.shift());) {
    !a.length && goog.isDef(b) ? c[d] = b : c = c[d] ? c[d] : c[d] = {}
  }
};
goog.getObjectByName = function(a, b) {
  for(var c = a.split("."), d = b || goog.global, e;e = c.shift();) {
    if(goog.isDefAndNotNull(d[e])) {
      d = d[e]
    }else {
      return null
    }
  }
  return d
};
goog.globalize = function(a, b) {
  var c = b || goog.global, d;
  for(d in a) {
    c[d] = a[d]
  }
};
goog.addDependency = function(a, b, c) {
  if(!COMPILED) {
    for(var d, a = a.replace(/\\/g, "/"), e = goog.dependencies_, f = 0;d = b[f];f++) {
      e.nameToPath[d] = a, a in e.pathToNames || (e.pathToNames[a] = {}), e.pathToNames[a][d] = !0
    }
    for(d = 0;b = c[d];d++) {
      a in e.requires || (e.requires[a] = {}), e.requires[a][b] = !0
    }
  }
};
goog.ENABLE_DEBUG_LOADER = !0;
goog.require = function(a) {
  if(!COMPILED && !goog.isProvided_(a)) {
    if(goog.ENABLE_DEBUG_LOADER) {
      var b = goog.getPathFromDeps_(a);
      if(b) {
        goog.included_[b] = !0;
        goog.writeScripts_();
        return
      }
    }
    a = "goog.require could not find: " + a;
    goog.global.console && goog.global.console.error(a);
    throw Error(a);
  }
};
goog.basePath = "";
goog.nullFunction = function() {
};
goog.identityFunction = function(a) {
  return a
};
goog.abstractMethod = function() {
  throw Error("unimplemented abstract method");
};
goog.addSingletonGetter = function(a) {
  a.getInstance = function() {
    if(a.instance_) {
      return a.instance_
    }
    goog.DEBUG && (goog.instantiatedSingletons_[goog.instantiatedSingletons_.length] = a);
    return a.instance_ = new a
  }
};
goog.instantiatedSingletons_ = [];
!COMPILED && goog.ENABLE_DEBUG_LOADER && (goog.included_ = {}, goog.dependencies_ = {pathToNames:{}, nameToPath:{}, requires:{}, visited:{}, written:{}}, goog.inHtmlDocument_ = function() {
  var a = goog.global.document;
  return"undefined" != typeof a && "write" in a
}, goog.findBasePath_ = function() {
  if(goog.global.CLOSURE_BASE_PATH) {
    goog.basePath = goog.global.CLOSURE_BASE_PATH
  }else {
    if(goog.inHtmlDocument_()) {
      for(var a = goog.global.document.getElementsByTagName("script"), b = a.length - 1;0 <= b;--b) {
        var c = a[b].src, d = c.lastIndexOf("?"), d = -1 == d ? c.length : d;
        if("base.js" == c.substr(d - 7, 7)) {
          goog.basePath = c.substr(0, d - 7);
          break
        }
      }
    }
  }
}, goog.importScript_ = function(a) {
  var b = goog.global.CLOSURE_IMPORT_SCRIPT || goog.writeScriptTag_;
  !goog.dependencies_.written[a] && b(a) && (goog.dependencies_.written[a] = !0)
}, goog.writeScriptTag_ = function(a) {
  return goog.inHtmlDocument_() ? (goog.global.document.write('<script type="text/javascript" src="' + a + '"><\/script>'), !0) : !1
}, goog.writeScripts_ = function() {
  function a(e) {
    if(!(e in d.written)) {
      if(!(e in d.visited) && (d.visited[e] = !0, e in d.requires)) {
        for(var g in d.requires[e]) {
          if(!goog.isProvided_(g)) {
            if(g in d.nameToPath) {
              a(d.nameToPath[g])
            }else {
              throw Error("Undefined nameToPath for " + g);
            }
          }
        }
      }
      e in c || (c[e] = !0, b.push(e))
    }
  }
  var b = [], c = {}, d = goog.dependencies_, e;
  for(e in goog.included_) {
    d.written[e] || a(e)
  }
  for(e = 0;e < b.length;e++) {
    if(b[e]) {
      goog.importScript_(goog.basePath + b[e])
    }else {
      throw Error("Undefined script input");
    }
  }
}, goog.getPathFromDeps_ = function(a) {
  return a in goog.dependencies_.nameToPath ? goog.dependencies_.nameToPath[a] : null
}, goog.findBasePath_(), goog.global.CLOSURE_NO_DEPS || goog.importScript_(goog.basePath + "deps.js"));
goog.typeOf = function(a) {
  var b = typeof a;
  if("object" == b) {
    if(a) {
      if(a instanceof Array) {
        return"array"
      }
      if(a instanceof Object) {
        return b
      }
      var c = Object.prototype.toString.call(a);
      if("[object Window]" == c) {
        return"object"
      }
      if("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) {
        return"array"
      }
      if("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call")) {
        return"function"
      }
    }else {
      return"null"
    }
  }else {
    if("function" == b && "undefined" == typeof a.call) {
      return"object"
    }
  }
  return b
};
goog.isDef = function(a) {
  return void 0 !== a
};
goog.isNull = function(a) {
  return null === a
};
goog.isDefAndNotNull = function(a) {
  return null != a
};
goog.isArray = function(a) {
  return"array" == goog.typeOf(a)
};
goog.isArrayLike = function(a) {
  var b = goog.typeOf(a);
  return"array" == b || "object" == b && "number" == typeof a.length
};
goog.isDateLike = function(a) {
  return goog.isObject(a) && "function" == typeof a.getFullYear
};
goog.isString = function(a) {
  return"string" == typeof a
};
goog.isBoolean = function(a) {
  return"boolean" == typeof a
};
goog.isNumber = function(a) {
  return"number" == typeof a
};
goog.isFunction = function(a) {
  return"function" == goog.typeOf(a)
};
goog.isObject = function(a) {
  var b = typeof a;
  return"object" == b && null != a || "function" == b
};
goog.getUid = function(a) {
  return a[goog.UID_PROPERTY_] || (a[goog.UID_PROPERTY_] = ++goog.uidCounter_)
};
goog.removeUid = function(a) {
  "removeAttribute" in a && a.removeAttribute(goog.UID_PROPERTY_);
  try {
    delete a[goog.UID_PROPERTY_]
  }catch(b) {
  }
};
goog.UID_PROPERTY_ = "closure_uid_" + Math.floor(2147483648 * Math.random()).toString(36);
goog.uidCounter_ = 0;
goog.getHashCode = goog.getUid;
goog.removeHashCode = goog.removeUid;
goog.cloneObject = function(a) {
  var b = goog.typeOf(a);
  if("object" == b || "array" == b) {
    if(a.clone) {
      return a.clone()
    }
    var b = "array" == b ? [] : {}, c;
    for(c in a) {
      b[c] = goog.cloneObject(a[c])
    }
    return b
  }
  return a
};
goog.bindNative_ = function(a, b, c) {
  return a.call.apply(a.bind, arguments)
};
goog.bindJs_ = function(a, b, c) {
  if(!a) {
    throw Error();
  }
  if(2 < arguments.length) {
    var d = Array.prototype.slice.call(arguments, 2);
    return function() {
      var c = Array.prototype.slice.call(arguments);
      Array.prototype.unshift.apply(c, d);
      return a.apply(b, c)
    }
  }
  return function() {
    return a.apply(b, arguments)
  }
};
goog.bind = function(a, b, c) {
  goog.bind = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? goog.bindNative_ : goog.bindJs_;
  return goog.bind.apply(null, arguments)
};
goog.partial = function(a, b) {
  var c = Array.prototype.slice.call(arguments, 1);
  return function() {
    var b = Array.prototype.slice.call(arguments);
    b.unshift.apply(b, c);
    return a.apply(this, b)
  }
};
goog.mixin = function(a, b) {
  for(var c in b) {
    a[c] = b[c]
  }
};
goog.now = Date.now || function() {
  return+new Date
};
goog.globalEval = function(a) {
  if(goog.global.execScript) {
    goog.global.execScript(a, "JavaScript")
  }else {
    if(goog.global.eval) {
      if(null == goog.evalWorksForGlobals_ && (goog.global.eval("var _et_ = 1;"), "undefined" != typeof goog.global._et_ ? (delete goog.global._et_, goog.evalWorksForGlobals_ = !0) : goog.evalWorksForGlobals_ = !1), goog.evalWorksForGlobals_) {
        goog.global.eval(a)
      }else {
        var b = goog.global.document, c = b.createElement("script");
        c.type = "text/javascript";
        c.defer = !1;
        c.appendChild(b.createTextNode(a));
        b.body.appendChild(c);
        b.body.removeChild(c)
      }
    }else {
      throw Error("goog.globalEval not available");
    }
  }
};
goog.evalWorksForGlobals_ = null;
goog.getCssName = function(a, b) {
  var c = function(a) {
    return goog.cssNameMapping_[a] || a
  }, d = function(a) {
    for(var a = a.split("-"), b = [], d = 0;d < a.length;d++) {
      b.push(c(a[d]))
    }
    return b.join("-")
  }, d = goog.cssNameMapping_ ? "BY_WHOLE" == goog.cssNameMappingStyle_ ? c : d : function(a) {
    return a
  };
  return b ? a + "-" + d(b) : d(a)
};
goog.setCssNameMapping = function(a, b) {
  goog.cssNameMapping_ = a;
  goog.cssNameMappingStyle_ = b
};
!COMPILED && goog.global.CLOSURE_CSS_NAME_MAPPING && (goog.cssNameMapping_ = goog.global.CLOSURE_CSS_NAME_MAPPING);
goog.getMsg = function(a, b) {
  var c = b || {}, d;
  for(d in c) {
    var e = ("" + c[d]).replace(/\$/g, "$$$$"), a = a.replace(RegExp("\\{\\$" + d + "\\}", "gi"), e)
  }
  return a
};
goog.exportSymbol = function(a, b, c) {
  goog.exportPath_(a, b, c)
};
goog.exportProperty = function(a, b, c) {
  a[b] = c
};
goog.inherits = function(a, b) {
  function c() {
  }
  c.prototype = b.prototype;
  a.superClass_ = b.prototype;
  a.prototype = new c;
  a.prototype.constructor = a
};
goog.base = function(a, b, c) {
  var d = arguments.callee.caller;
  if(d.superClass_) {
    return d.superClass_.constructor.apply(a, Array.prototype.slice.call(arguments, 1))
  }
  for(var e = Array.prototype.slice.call(arguments, 2), f = !1, g = a.constructor;g;g = g.superClass_ && g.superClass_.constructor) {
    if(g.prototype[b] === d) {
      f = !0
    }else {
      if(f) {
        return g.prototype[b].apply(a, e)
      }
    }
  }
  if(a[b] === d) {
    return a.constructor.prototype[b].apply(a, e)
  }
  throw Error("goog.base called from a method of one name to a method of a different name");
};
goog.scope = function(a) {
  a.call(goog.global)
};
goog.debug = {};
goog.debug.Error = function(a) {
  Error.captureStackTrace ? Error.captureStackTrace(this, goog.debug.Error) : this.stack = Error().stack || "";
  a && (this.message = String(a))
};
goog.inherits(goog.debug.Error, Error);
goog.debug.Error.prototype.name = "CustomError";
goog.string = {};
goog.string.Unicode = {NBSP:"\u00a0"};
goog.string.startsWith = function(a, b) {
  return 0 == a.lastIndexOf(b, 0)
};
goog.string.endsWith = function(a, b) {
  var c = a.length - b.length;
  return 0 <= c && a.indexOf(b, c) == c
};
goog.string.caseInsensitiveStartsWith = function(a, b) {
  return 0 == goog.string.caseInsensitiveCompare(b, a.substr(0, b.length))
};
goog.string.caseInsensitiveEndsWith = function(a, b) {
  return 0 == goog.string.caseInsensitiveCompare(b, a.substr(a.length - b.length, b.length))
};
goog.string.subs = function(a, b) {
  for(var c = 1;c < arguments.length;c++) {
    var d = String(arguments[c]).replace(/\$/g, "$$$$"), a = a.replace(/\%s/, d)
  }
  return a
};
goog.string.collapseWhitespace = function(a) {
  return a.replace(/[\s\xa0]+/g, " ").replace(/^\s+|\s+$/g, "")
};
goog.string.isEmpty = function(a) {
  return/^[\s\xa0]*$/.test(a)
};
goog.string.isEmptySafe = function(a) {
  return goog.string.isEmpty(goog.string.makeSafe(a))
};
goog.string.isBreakingWhitespace = function(a) {
  return!/[^\t\n\r ]/.test(a)
};
goog.string.isAlpha = function(a) {
  return!/[^a-zA-Z]/.test(a)
};
goog.string.isNumeric = function(a) {
  return!/[^0-9]/.test(a)
};
goog.string.isAlphaNumeric = function(a) {
  return!/[^a-zA-Z0-9]/.test(a)
};
goog.string.isSpace = function(a) {
  return" " == a
};
goog.string.isUnicodeChar = function(a) {
  return 1 == a.length && " " <= a && "~" >= a || "\u0080" <= a && "\ufffd" >= a
};
goog.string.stripNewlines = function(a) {
  return a.replace(/(\r\n|\r|\n)+/g, " ")
};
goog.string.canonicalizeNewlines = function(a) {
  return a.replace(/(\r\n|\r|\n)/g, "\n")
};
goog.string.normalizeWhitespace = function(a) {
  return a.replace(/\xa0|\s/g, " ")
};
goog.string.normalizeSpaces = function(a) {
  return a.replace(/\xa0|[ \t]+/g, " ")
};
goog.string.collapseBreakingSpaces = function(a) {
  return a.replace(/[\t\r\n ]+/g, " ").replace(/^[\t\r\n ]+|[\t\r\n ]+$/g, "")
};
goog.string.trim = function(a) {
  return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
};
goog.string.trimLeft = function(a) {
  return a.replace(/^[\s\xa0]+/, "")
};
goog.string.trimRight = function(a) {
  return a.replace(/[\s\xa0]+$/, "")
};
goog.string.caseInsensitiveCompare = function(a, b) {
  var c = String(a).toLowerCase(), d = String(b).toLowerCase();
  return c < d ? -1 : c == d ? 0 : 1
};
goog.string.numerateCompareRegExp_ = /(\.\d+)|(\d+)|(\D+)/g;
goog.string.numerateCompare = function(a, b) {
  if(a == b) {
    return 0
  }
  if(!a) {
    return-1
  }
  if(!b) {
    return 1
  }
  for(var c = a.toLowerCase().match(goog.string.numerateCompareRegExp_), d = b.toLowerCase().match(goog.string.numerateCompareRegExp_), e = Math.min(c.length, d.length), f = 0;f < e;f++) {
    var g = c[f], h = d[f];
    if(g != h) {
      return c = parseInt(g, 10), !isNaN(c) && (d = parseInt(h, 10), !isNaN(d) && c - d) ? c - d : g < h ? -1 : 1
    }
  }
  return c.length != d.length ? c.length - d.length : a < b ? -1 : 1
};
goog.string.urlEncode = function(a) {
  return encodeURIComponent(String(a))
};
goog.string.urlDecode = function(a) {
  return decodeURIComponent(a.replace(/\+/g, " "))
};
goog.string.newLineToBr = function(a, b) {
  return a.replace(/(\r\n|\r|\n)/g, b ? "<br />" : "<br>")
};
goog.string.htmlEscape = function(a, b) {
  if(b) {
    return a.replace(goog.string.amperRe_, "&amp;").replace(goog.string.ltRe_, "&lt;").replace(goog.string.gtRe_, "&gt;").replace(goog.string.quotRe_, "&quot;")
  }
  if(!goog.string.allRe_.test(a)) {
    return a
  }
  -1 != a.indexOf("&") && (a = a.replace(goog.string.amperRe_, "&amp;"));
  -1 != a.indexOf("<") && (a = a.replace(goog.string.ltRe_, "&lt;"));
  -1 != a.indexOf(">") && (a = a.replace(goog.string.gtRe_, "&gt;"));
  -1 != a.indexOf('"') && (a = a.replace(goog.string.quotRe_, "&quot;"));
  return a
};
goog.string.amperRe_ = /&/g;
goog.string.ltRe_ = /</g;
goog.string.gtRe_ = />/g;
goog.string.quotRe_ = /\"/g;
goog.string.allRe_ = /[&<>\"]/;
goog.string.unescapeEntities = function(a) {
  return goog.string.contains(a, "&") ? "document" in goog.global ? goog.string.unescapeEntitiesUsingDom_(a) : goog.string.unescapePureXmlEntities_(a) : a
};
goog.string.unescapeEntitiesUsingDom_ = function(a) {
  var b = {"&amp;":"&", "&lt;":"<", "&gt;":">", "&quot;":'"'}, c = document.createElement("div");
  return a.replace(goog.string.HTML_ENTITY_PATTERN_, function(a, e) {
    var f = b[a];
    if(f) {
      return f
    }
    if("#" == e.charAt(0)) {
      var g = Number("0" + e.substr(1));
      isNaN(g) || (f = String.fromCharCode(g))
    }
    f || (c.innerHTML = a + " ", f = c.firstChild.nodeValue.slice(0, -1));
    return b[a] = f
  })
};
goog.string.unescapePureXmlEntities_ = function(a) {
  return a.replace(/&([^;]+);/g, function(a, c) {
    switch(c) {
      case "amp":
        return"&";
      case "lt":
        return"<";
      case "gt":
        return">";
      case "quot":
        return'"';
      default:
        if("#" == c.charAt(0)) {
          var d = Number("0" + c.substr(1));
          if(!isNaN(d)) {
            return String.fromCharCode(d)
          }
        }
        return a
    }
  })
};
goog.string.HTML_ENTITY_PATTERN_ = /&([^;\s<&]+);?/g;
goog.string.whitespaceEscape = function(a, b) {
  return goog.string.newLineToBr(a.replace(/  /g, " &#160;"), b)
};
goog.string.stripQuotes = function(a, b) {
  for(var c = b.length, d = 0;d < c;d++) {
    var e = 1 == c ? b : b.charAt(d);
    if(a.charAt(0) == e && a.charAt(a.length - 1) == e) {
      return a.substring(1, a.length - 1)
    }
  }
  return a
};
goog.string.truncate = function(a, b, c) {
  c && (a = goog.string.unescapeEntities(a));
  a.length > b && (a = a.substring(0, b - 3) + "...");
  c && (a = goog.string.htmlEscape(a));
  return a
};
goog.string.truncateMiddle = function(a, b, c, d) {
  c && (a = goog.string.unescapeEntities(a));
  if(d && a.length > b) {
    d > b && (d = b);
    var e = a.length - d, a = a.substring(0, b - d) + "..." + a.substring(e)
  }else {
    a.length > b && (d = Math.floor(b / 2), e = a.length - d, a = a.substring(0, d + b % 2) + "..." + a.substring(e))
  }
  c && (a = goog.string.htmlEscape(a));
  return a
};
goog.string.specialEscapeChars_ = {"\x00":"\\0", "\b":"\\b", "\f":"\\f", "\n":"\\n", "\r":"\\r", "\t":"\\t", "\x0B":"\\x0B", '"':'\\"', "\\":"\\\\"};
goog.string.jsEscapeCache_ = {"'":"\\'"};
goog.string.quote = function(a) {
  a = String(a);
  if(a.quote) {
    return a.quote()
  }
  for(var b = ['"'], c = 0;c < a.length;c++) {
    var d = a.charAt(c), e = d.charCodeAt(0);
    b[c + 1] = goog.string.specialEscapeChars_[d] || (31 < e && 127 > e ? d : goog.string.escapeChar(d))
  }
  b.push('"');
  return b.join("")
};
goog.string.escapeString = function(a) {
  for(var b = [], c = 0;c < a.length;c++) {
    b[c] = goog.string.escapeChar(a.charAt(c))
  }
  return b.join("")
};
goog.string.escapeChar = function(a) {
  if(a in goog.string.jsEscapeCache_) {
    return goog.string.jsEscapeCache_[a]
  }
  if(a in goog.string.specialEscapeChars_) {
    return goog.string.jsEscapeCache_[a] = goog.string.specialEscapeChars_[a]
  }
  var b = a, c = a.charCodeAt(0);
  if(31 < c && 127 > c) {
    b = a
  }else {
    if(256 > c) {
      if(b = "\\x", 16 > c || 256 < c) {
        b += "0"
      }
    }else {
      b = "\\u", 4096 > c && (b += "0")
    }
    b += c.toString(16).toUpperCase()
  }
  return goog.string.jsEscapeCache_[a] = b
};
goog.string.toMap = function(a) {
  for(var b = {}, c = 0;c < a.length;c++) {
    b[a.charAt(c)] = !0
  }
  return b
};
goog.string.contains = function(a, b) {
  return-1 != a.indexOf(b)
};
goog.string.countOf = function(a, b) {
  return a && b ? a.split(b).length - 1 : 0
};
goog.string.removeAt = function(a, b, c) {
  var d = a;
  0 <= b && (b < a.length && 0 < c) && (d = a.substr(0, b) + a.substr(b + c, a.length - b - c));
  return d
};
goog.string.remove = function(a, b) {
  var c = RegExp(goog.string.regExpEscape(b), "");
  return a.replace(c, "")
};
goog.string.removeAll = function(a, b) {
  var c = RegExp(goog.string.regExpEscape(b), "g");
  return a.replace(c, "")
};
goog.string.regExpEscape = function(a) {
  return String(a).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08")
};
goog.string.repeat = function(a, b) {
  return Array(b + 1).join(a)
};
goog.string.padNumber = function(a, b, c) {
  a = goog.isDef(c) ? a.toFixed(c) : String(a);
  c = a.indexOf(".");
  -1 == c && (c = a.length);
  return goog.string.repeat("0", Math.max(0, b - c)) + a
};
goog.string.makeSafe = function(a) {
  return null == a ? "" : String(a)
};
goog.string.buildString = function(a) {
  return Array.prototype.join.call(arguments, "")
};
goog.string.getRandomString = function() {
  return Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ goog.now()).toString(36)
};
goog.string.compareVersions = function(a, b) {
  for(var c = 0, d = goog.string.trim(String(a)).split("."), e = goog.string.trim(String(b)).split("."), f = Math.max(d.length, e.length), g = 0;0 == c && g < f;g++) {
    var h = d[g] || "", i = e[g] || "", j = RegExp("(\\d*)(\\D*)", "g"), l = RegExp("(\\d*)(\\D*)", "g");
    do {
      var m = j.exec(h) || ["", "", ""], k = l.exec(i) || ["", "", ""];
      if(0 == m[0].length && 0 == k[0].length) {
        break
      }
      var c = 0 == m[1].length ? 0 : parseInt(m[1], 10), n = 0 == k[1].length ? 0 : parseInt(k[1], 10), c = goog.string.compareElements_(c, n) || goog.string.compareElements_(0 == m[2].length, 0 == k[2].length) || goog.string.compareElements_(m[2], k[2])
    }while(0 == c)
  }
  return c
};
goog.string.compareElements_ = function(a, b) {
  return a < b ? -1 : a > b ? 1 : 0
};
goog.string.HASHCODE_MAX_ = 4294967296;
goog.string.hashCode = function(a) {
  for(var b = 0, c = 0;c < a.length;++c) {
    b = 31 * b + a.charCodeAt(c), b %= goog.string.HASHCODE_MAX_
  }
  return b
};
goog.string.uniqueStringCounter_ = 2147483648 * Math.random() | 0;
goog.string.createUniqueString = function() {
  return"goog_" + goog.string.uniqueStringCounter_++
};
goog.string.toNumber = function(a) {
  var b = Number(a);
  return 0 == b && goog.string.isEmpty(a) ? NaN : b
};
goog.string.toCamelCase = function(a) {
  return String(a).replace(/\-([a-z])/g, function(a, c) {
    return c.toUpperCase()
  })
};
goog.string.toSelectorCase = function(a) {
  return String(a).replace(/([A-Z])/g, "-$1").toLowerCase()
};
goog.string.toTitleCase = function(a, b) {
  var c = goog.isString(b) ? goog.string.regExpEscape(b) : "\\s";
  return a.replace(RegExp("(^" + (c ? "|[" + c + "]+" : "") + ")([a-z])", "g"), function(a, b, c) {
    return b + c.toUpperCase()
  })
};
goog.string.parseInt = function(a) {
  isFinite(a) && (a = String(a));
  return goog.isString(a) ? /^\s*-?0x/i.test(a) ? parseInt(a, 16) : parseInt(a, 10) : NaN
};
goog.asserts = {};
goog.asserts.ENABLE_ASSERTS = goog.DEBUG;
goog.asserts.AssertionError = function(a, b) {
  b.unshift(a);
  goog.debug.Error.call(this, goog.string.subs.apply(null, b));
  b.shift();
  this.messagePattern = a
};
goog.inherits(goog.asserts.AssertionError, goog.debug.Error);
goog.asserts.AssertionError.prototype.name = "AssertionError";
goog.asserts.doAssertFailure_ = function(a, b, c, d) {
  var e = "Assertion failed";
  if(c) {
    var e = e + (": " + c), f = d
  }else {
    a && (e += ": " + a, f = b)
  }
  throw new goog.asserts.AssertionError("" + e, f || []);
};
goog.asserts.assert = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !a && goog.asserts.doAssertFailure_("", null, b, Array.prototype.slice.call(arguments, 2));
  return a
};
goog.asserts.fail = function(a, b) {
  if(goog.asserts.ENABLE_ASSERTS) {
    throw new goog.asserts.AssertionError("Failure" + (a ? ": " + a : ""), Array.prototype.slice.call(arguments, 1));
  }
};
goog.asserts.assertNumber = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !goog.isNumber(a) && goog.asserts.doAssertFailure_("Expected number but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a
};
goog.asserts.assertString = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !goog.isString(a) && goog.asserts.doAssertFailure_("Expected string but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a
};
goog.asserts.assertFunction = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !goog.isFunction(a) && goog.asserts.doAssertFailure_("Expected function but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a
};
goog.asserts.assertObject = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !goog.isObject(a) && goog.asserts.doAssertFailure_("Expected object but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a
};
goog.asserts.assertArray = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !goog.isArray(a) && goog.asserts.doAssertFailure_("Expected array but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a
};
goog.asserts.assertBoolean = function(a, b, c) {
  goog.asserts.ENABLE_ASSERTS && !goog.isBoolean(a) && goog.asserts.doAssertFailure_("Expected boolean but got %s: %s.", [goog.typeOf(a), a], b, Array.prototype.slice.call(arguments, 2));
  return a
};
goog.asserts.assertInstanceof = function(a, b, c, d) {
  goog.asserts.ENABLE_ASSERTS && !(a instanceof b) && goog.asserts.doAssertFailure_("instanceof check failed.", null, c, Array.prototype.slice.call(arguments, 3));
  return a
};
goog.array = {};
goog.NATIVE_ARRAY_PROTOTYPES = !0;
goog.array.peek = function(a) {
  return a[a.length - 1]
};
goog.array.ARRAY_PROTOTYPE_ = Array.prototype;
goog.array.indexOf = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.indexOf ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return goog.array.ARRAY_PROTOTYPE_.indexOf.call(a, b, c)
} : function(a, b, c) {
  c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
  if(goog.isString(a)) {
    return!goog.isString(b) || 1 != b.length ? -1 : a.indexOf(b, c)
  }
  for(;c < a.length;c++) {
    if(c in a && a[c] === b) {
      return c
    }
  }
  return-1
};
goog.array.lastIndexOf = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.lastIndexOf ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return goog.array.ARRAY_PROTOTYPE_.lastIndexOf.call(a, b, null == c ? a.length - 1 : c)
} : function(a, b, c) {
  c = null == c ? a.length - 1 : c;
  0 > c && (c = Math.max(0, a.length + c));
  if(goog.isString(a)) {
    return!goog.isString(b) || 1 != b.length ? -1 : a.lastIndexOf(b, c)
  }
  for(;0 <= c;c--) {
    if(c in a && a[c] === b) {
      return c
    }
  }
  return-1
};
goog.array.forEach = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.forEach ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  goog.array.ARRAY_PROTOTYPE_.forEach.call(a, b, c)
} : function(a, b, c) {
  for(var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0;f < d;f++) {
    f in e && b.call(c, e[f], f, a)
  }
};
goog.array.forEachRight = function(a, b, c) {
  for(var d = a.length, e = goog.isString(a) ? a.split("") : a, d = d - 1;0 <= d;--d) {
    d in e && b.call(c, e[d], d, a)
  }
};
goog.array.filter = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.filter ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return goog.array.ARRAY_PROTOTYPE_.filter.call(a, b, c)
} : function(a, b, c) {
  for(var d = a.length, e = [], f = 0, g = goog.isString(a) ? a.split("") : a, h = 0;h < d;h++) {
    if(h in g) {
      var i = g[h];
      b.call(c, i, h, a) && (e[f++] = i)
    }
  }
  return e
};
goog.array.map = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.map ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return goog.array.ARRAY_PROTOTYPE_.map.call(a, b, c)
} : function(a, b, c) {
  for(var d = a.length, e = Array(d), f = goog.isString(a) ? a.split("") : a, g = 0;g < d;g++) {
    g in f && (e[g] = b.call(c, f[g], g, a))
  }
  return e
};
goog.array.reduce = function(a, b, c, d) {
  if(a.reduce) {
    return d ? a.reduce(goog.bind(b, d), c) : a.reduce(b, c)
  }
  var e = c;
  goog.array.forEach(a, function(c, g) {
    e = b.call(d, e, c, g, a)
  });
  return e
};
goog.array.reduceRight = function(a, b, c, d) {
  if(a.reduceRight) {
    return d ? a.reduceRight(goog.bind(b, d), c) : a.reduceRight(b, c)
  }
  var e = c;
  goog.array.forEachRight(a, function(c, g) {
    e = b.call(d, e, c, g, a)
  });
  return e
};
goog.array.some = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.some ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return goog.array.ARRAY_PROTOTYPE_.some.call(a, b, c)
} : function(a, b, c) {
  for(var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0;f < d;f++) {
    if(f in e && b.call(c, e[f], f, a)) {
      return!0
    }
  }
  return!1
};
goog.array.every = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.every ? function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return goog.array.ARRAY_PROTOTYPE_.every.call(a, b, c)
} : function(a, b, c) {
  for(var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0;f < d;f++) {
    if(f in e && !b.call(c, e[f], f, a)) {
      return!1
    }
  }
  return!0
};
goog.array.find = function(a, b, c) {
  b = goog.array.findIndex(a, b, c);
  return 0 > b ? null : goog.isString(a) ? a.charAt(b) : a[b]
};
goog.array.findIndex = function(a, b, c) {
  for(var d = a.length, e = goog.isString(a) ? a.split("") : a, f = 0;f < d;f++) {
    if(f in e && b.call(c, e[f], f, a)) {
      return f
    }
  }
  return-1
};
goog.array.findRight = function(a, b, c) {
  b = goog.array.findIndexRight(a, b, c);
  return 0 > b ? null : goog.isString(a) ? a.charAt(b) : a[b]
};
goog.array.findIndexRight = function(a, b, c) {
  for(var d = a.length, e = goog.isString(a) ? a.split("") : a, d = d - 1;0 <= d;d--) {
    if(d in e && b.call(c, e[d], d, a)) {
      return d
    }
  }
  return-1
};
goog.array.contains = function(a, b) {
  return 0 <= goog.array.indexOf(a, b)
};
goog.array.isEmpty = function(a) {
  return 0 == a.length
};
goog.array.clear = function(a) {
  if(!goog.isArray(a)) {
    for(var b = a.length - 1;0 <= b;b--) {
      delete a[b]
    }
  }
  a.length = 0
};
goog.array.insert = function(a, b) {
  goog.array.contains(a, b) || a.push(b)
};
goog.array.insertAt = function(a, b, c) {
  goog.array.splice(a, c, 0, b)
};
goog.array.insertArrayAt = function(a, b, c) {
  goog.partial(goog.array.splice, a, c, 0).apply(null, b)
};
goog.array.insertBefore = function(a, b, c) {
  var d;
  2 == arguments.length || 0 > (d = goog.array.indexOf(a, c)) ? a.push(b) : goog.array.insertAt(a, b, d)
};
goog.array.remove = function(a, b) {
  var c = goog.array.indexOf(a, b), d;
  (d = 0 <= c) && goog.array.removeAt(a, c);
  return d
};
goog.array.removeAt = function(a, b) {
  goog.asserts.assert(null != a.length);
  return 1 == goog.array.ARRAY_PROTOTYPE_.splice.call(a, b, 1).length
};
goog.array.removeIf = function(a, b, c) {
  b = goog.array.findIndex(a, b, c);
  return 0 <= b ? (goog.array.removeAt(a, b), !0) : !1
};
goog.array.concat = function(a) {
  return goog.array.ARRAY_PROTOTYPE_.concat.apply(goog.array.ARRAY_PROTOTYPE_, arguments)
};
goog.array.toArray = function(a) {
  var b = a.length;
  if(0 < b) {
    for(var c = Array(b), d = 0;d < b;d++) {
      c[d] = a[d]
    }
    return c
  }
  return[]
};
goog.array.clone = goog.array.toArray;
goog.array.extend = function(a, b) {
  for(var c = 1;c < arguments.length;c++) {
    var d = arguments[c], e;
    if(goog.isArray(d) || (e = goog.isArrayLike(d)) && d.hasOwnProperty("callee")) {
      a.push.apply(a, d)
    }else {
      if(e) {
        for(var f = a.length, g = d.length, h = 0;h < g;h++) {
          a[f + h] = d[h]
        }
      }else {
        a.push(d)
      }
    }
  }
};
goog.array.splice = function(a, b, c, d) {
  goog.asserts.assert(null != a.length);
  return goog.array.ARRAY_PROTOTYPE_.splice.apply(a, goog.array.slice(arguments, 1))
};
goog.array.slice = function(a, b, c) {
  goog.asserts.assert(null != a.length);
  return 2 >= arguments.length ? goog.array.ARRAY_PROTOTYPE_.slice.call(a, b) : goog.array.ARRAY_PROTOTYPE_.slice.call(a, b, c)
};
goog.array.removeDuplicates = function(a, b) {
  for(var c = b || a, d = {}, e = 0, f = 0;f < a.length;) {
    var g = a[f++], h = goog.isObject(g) ? "o" + goog.getUid(g) : (typeof g).charAt(0) + g;
    Object.prototype.hasOwnProperty.call(d, h) || (d[h] = !0, c[e++] = g)
  }
  c.length = e
};
goog.array.binarySearch = function(a, b, c) {
  return goog.array.binarySearch_(a, c || goog.array.defaultCompare, !1, b)
};
goog.array.binarySelect = function(a, b, c) {
  return goog.array.binarySearch_(a, b, !0, void 0, c)
};
goog.array.binarySearch_ = function(a, b, c, d, e) {
  for(var f = 0, g = a.length, h;f < g;) {
    var i = f + g >> 1, j;
    j = c ? b.call(e, a[i], i, a) : b(d, a[i]);
    0 < j ? f = i + 1 : (g = i, h = !j)
  }
  return h ? f : ~f
};
goog.array.sort = function(a, b) {
  goog.asserts.assert(null != a.length);
  goog.array.ARRAY_PROTOTYPE_.sort.call(a, b || goog.array.defaultCompare)
};
goog.array.stableSort = function(a, b) {
  for(var c = 0;c < a.length;c++) {
    a[c] = {index:c, value:a[c]}
  }
  var d = b || goog.array.defaultCompare;
  goog.array.sort(a, function(a, b) {
    return d(a.value, b.value) || a.index - b.index
  });
  for(c = 0;c < a.length;c++) {
    a[c] = a[c].value
  }
};
goog.array.sortObjectsByKey = function(a, b, c) {
  var d = c || goog.array.defaultCompare;
  goog.array.sort(a, function(a, c) {
    return d(a[b], c[b])
  })
};
goog.array.isSorted = function(a, b, c) {
  for(var b = b || goog.array.defaultCompare, d = 1;d < a.length;d++) {
    var e = b(a[d - 1], a[d]);
    if(0 < e || 0 == e && c) {
      return!1
    }
  }
  return!0
};
goog.array.equals = function(a, b, c) {
  if(!goog.isArrayLike(a) || !goog.isArrayLike(b) || a.length != b.length) {
    return!1
  }
  for(var d = a.length, c = c || goog.array.defaultCompareEquality, e = 0;e < d;e++) {
    if(!c(a[e], b[e])) {
      return!1
    }
  }
  return!0
};
goog.array.compare = function(a, b, c) {
  return goog.array.equals(a, b, c)
};
goog.array.compare3 = function(a, b, c) {
  for(var c = c || goog.array.defaultCompare, d = Math.min(a.length, b.length), e = 0;e < d;e++) {
    var f = c(a[e], b[e]);
    if(0 != f) {
      return f
    }
  }
  return goog.array.defaultCompare(a.length, b.length)
};
goog.array.defaultCompare = function(a, b) {
  return a > b ? 1 : a < b ? -1 : 0
};
goog.array.defaultCompareEquality = function(a, b) {
  return a === b
};
goog.array.binaryInsert = function(a, b, c) {
  c = goog.array.binarySearch(a, b, c);
  return 0 > c ? (goog.array.insertAt(a, b, -(c + 1)), !0) : !1
};
goog.array.binaryRemove = function(a, b, c) {
  b = goog.array.binarySearch(a, b, c);
  return 0 <= b ? goog.array.removeAt(a, b) : !1
};
goog.array.bucket = function(a, b) {
  for(var c = {}, d = 0;d < a.length;d++) {
    var e = a[d], f = b(e, d, a);
    goog.isDef(f) && (c[f] || (c[f] = [])).push(e)
  }
  return c
};
goog.array.repeat = function(a, b) {
  for(var c = [], d = 0;d < b;d++) {
    c[d] = a
  }
  return c
};
goog.array.flatten = function(a) {
  for(var b = [], c = 0;c < arguments.length;c++) {
    var d = arguments[c];
    goog.isArray(d) ? b.push.apply(b, goog.array.flatten.apply(null, d)) : b.push(d)
  }
  return b
};
goog.array.rotate = function(a, b) {
  goog.asserts.assert(null != a.length);
  a.length && (b %= a.length, 0 < b ? goog.array.ARRAY_PROTOTYPE_.unshift.apply(a, a.splice(-b, b)) : 0 > b && goog.array.ARRAY_PROTOTYPE_.push.apply(a, a.splice(0, -b)));
  return a
};
goog.array.zip = function(a) {
  if(!arguments.length) {
    return[]
  }
  for(var b = [], c = 0;;c++) {
    for(var d = [], e = 0;e < arguments.length;e++) {
      var f = arguments[e];
      if(c >= f.length) {
        return b
      }
      d.push(f[c])
    }
    b.push(d)
  }
};
goog.array.shuffle = function(a, b) {
  for(var c = b || Math.random, d = a.length - 1;0 < d;d--) {
    var e = Math.floor(c() * (d + 1)), f = a[d];
    a[d] = a[e];
    a[e] = f
  }
};
goog.object = {};
goog.object.forEach = function(a, b, c) {
  for(var d in a) {
    b.call(c, a[d], d, a)
  }
};
goog.object.filter = function(a, b, c) {
  var d = {}, e;
  for(e in a) {
    b.call(c, a[e], e, a) && (d[e] = a[e])
  }
  return d
};
goog.object.map = function(a, b, c) {
  var d = {}, e;
  for(e in a) {
    d[e] = b.call(c, a[e], e, a)
  }
  return d
};
goog.object.some = function(a, b, c) {
  for(var d in a) {
    if(b.call(c, a[d], d, a)) {
      return!0
    }
  }
  return!1
};
goog.object.every = function(a, b, c) {
  for(var d in a) {
    if(!b.call(c, a[d], d, a)) {
      return!1
    }
  }
  return!0
};
goog.object.getCount = function(a) {
  var b = 0, c;
  for(c in a) {
    b++
  }
  return b
};
goog.object.getAnyKey = function(a) {
  for(var b in a) {
    return b
  }
};
goog.object.getAnyValue = function(a) {
  for(var b in a) {
    return a[b]
  }
};
goog.object.contains = function(a, b) {
  return goog.object.containsValue(a, b)
};
goog.object.getValues = function(a) {
  var b = [], c = 0, d;
  for(d in a) {
    b[c++] = a[d]
  }
  return b
};
goog.object.getKeys = function(a) {
  var b = [], c = 0, d;
  for(d in a) {
    b[c++] = d
  }
  return b
};
goog.object.getValueByKeys = function(a, b) {
  for(var c = goog.isArrayLike(b), d = c ? b : arguments, c = c ? 0 : 1;c < d.length && !(a = a[d[c]], !goog.isDef(a));c++) {
  }
  return a
};
goog.object.containsKey = function(a, b) {
  return b in a
};
goog.object.containsValue = function(a, b) {
  for(var c in a) {
    if(a[c] == b) {
      return!0
    }
  }
  return!1
};
goog.object.findKey = function(a, b, c) {
  for(var d in a) {
    if(b.call(c, a[d], d, a)) {
      return d
    }
  }
};
goog.object.findValue = function(a, b, c) {
  return(b = goog.object.findKey(a, b, c)) && a[b]
};
goog.object.isEmpty = function(a) {
  for(var b in a) {
    return!1
  }
  return!0
};
goog.object.clear = function(a) {
  for(var b in a) {
    delete a[b]
  }
};
goog.object.remove = function(a, b) {
  var c;
  (c = b in a) && delete a[b];
  return c
};
goog.object.add = function(a, b, c) {
  if(b in a) {
    throw Error('The object already contains the key "' + b + '"');
  }
  goog.object.set(a, b, c)
};
goog.object.get = function(a, b, c) {
  return b in a ? a[b] : c
};
goog.object.set = function(a, b, c) {
  a[b] = c
};
goog.object.setIfUndefined = function(a, b, c) {
  return b in a ? a[b] : a[b] = c
};
goog.object.clone = function(a) {
  var b = {}, c;
  for(c in a) {
    b[c] = a[c]
  }
  return b
};
goog.object.unsafeClone = function(a) {
  var b = goog.typeOf(a);
  if("object" == b || "array" == b) {
    if(a.clone) {
      return a.clone()
    }
    var b = "array" == b ? [] : {}, c;
    for(c in a) {
      b[c] = goog.object.unsafeClone(a[c])
    }
    return b
  }
  return a
};
goog.object.transpose = function(a) {
  var b = {}, c;
  for(c in a) {
    b[a[c]] = c
  }
  return b
};
goog.object.PROTOTYPE_FIELDS_ = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
goog.object.extend = function(a, b) {
  for(var c, d, e = 1;e < arguments.length;e++) {
    d = arguments[e];
    for(c in d) {
      a[c] = d[c]
    }
    for(var f = 0;f < goog.object.PROTOTYPE_FIELDS_.length;f++) {
      c = goog.object.PROTOTYPE_FIELDS_[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
    }
  }
};
goog.object.create = function(a) {
  var b = arguments.length;
  if(1 == b && goog.isArray(arguments[0])) {
    return goog.object.create.apply(null, arguments[0])
  }
  if(b % 2) {
    throw Error("Uneven number of arguments");
  }
  for(var c = {}, d = 0;d < b;d += 2) {
    c[arguments[d]] = arguments[d + 1]
  }
  return c
};
goog.object.createSet = function(a) {
  var b = arguments.length;
  if(1 == b && goog.isArray(arguments[0])) {
    return goog.object.createSet.apply(null, arguments[0])
  }
  for(var c = {}, d = 0;d < b;d++) {
    c[arguments[d]] = !0
  }
  return c
};
goog.string.format = function(a, b) {
  var c = Array.prototype.slice.call(arguments), d = c.shift();
  if("undefined" == typeof d) {
    throw Error("[goog.string.format] Template required");
  }
  return d.replace(/%([0\-\ \+]*)(\d+)?(\.(\d+))?([%sfdiu])/g, function(a, b, d, h, i, j, l, m) {
    if("%" == j) {
      return"%"
    }
    var k = c.shift();
    if("undefined" == typeof k) {
      throw Error("[goog.string.format] Not enough arguments");
    }
    arguments[0] = k;
    return goog.string.format.demuxes_[j].apply(null, arguments)
  })
};
goog.string.format.demuxes_ = {};
goog.string.format.demuxes_.s = function(a, b, c) {
  return isNaN(c) || "" == c || a.length >= c ? a : a = -1 < b.indexOf("-", 0) ? a + goog.string.repeat(" ", c - a.length) : goog.string.repeat(" ", c - a.length) + a
};
goog.string.format.demuxes_.f = function(a, b, c, d, e) {
  d = a.toString();
  isNaN(e) || "" == e || (d = a.toFixed(e));
  var f;
  f = 0 > a ? "-" : 0 <= b.indexOf("+") ? "+" : 0 <= b.indexOf(" ") ? " " : "";
  0 <= a && (d = f + d);
  if(isNaN(c) || d.length >= c) {
    return d
  }
  d = isNaN(e) ? Math.abs(a).toString() : Math.abs(a).toFixed(e);
  a = c - d.length - f.length;
  0 <= b.indexOf("-", 0) ? d = f + d + goog.string.repeat(" ", a) : (b = 0 <= b.indexOf("0", 0) ? "0" : " ", d = f + goog.string.repeat(b, a) + d);
  return d
};
goog.string.format.demuxes_.d = function(a, b, c, d, e, f, g, h) {
  return goog.string.format.demuxes_.f(parseInt(a, 10), b, c, d, 0, f, g, h)
};
goog.string.format.demuxes_.i = goog.string.format.demuxes_.d;
goog.string.format.demuxes_.u = goog.string.format.demuxes_.d;
goog.string.StringBuffer = function(a, b) {
  null != a && this.append.apply(this, arguments)
};
goog.string.StringBuffer.prototype.buffer_ = "";
goog.string.StringBuffer.prototype.set = function(a) {
  this.buffer_ = "" + a
};
goog.string.StringBuffer.prototype.append = function(a, b, c) {
  this.buffer_ += a;
  if(null != b) {
    for(var d = 1;d < arguments.length;d++) {
      this.buffer_ += arguments[d]
    }
  }
  return this
};
goog.string.StringBuffer.prototype.clear = function() {
  this.buffer_ = ""
};
goog.string.StringBuffer.prototype.getLength = function() {
  return this.buffer_.length
};
goog.string.StringBuffer.prototype.toString = function() {
  return this.buffer_
};
var cljs = {core:{}};
cljs.core._STAR_unchecked_if_STAR_ = !1;
cljs.core._STAR_print_fn_STAR_ = function() {
  throw Error("No *print-fn* fn set for evaluation environment");
};
cljs.core._STAR_1 = void 0;
cljs.core._STAR_2 = void 0;
cljs.core._STAR_3 = void 0;
cljs.core.truth_ = function(a) {
  return null != a && !1 !== a
};
cljs.core.identical_QMARK_ = function(a, b) {
  return a === b
};
cljs.core.nil_QMARK_ = function(a) {
  return null == a
};
cljs.core.not = function(a) {
  return cljs.core.truth_(a) ? !1 : !0
};
cljs.core.type_satisfies_ = function(a, b) {
  return a[goog.typeOf(null == b ? null : b)] ? !0 : a._ ? !0 : !1
};
cljs.core.is_proto_ = function(a) {
  return a.constructor.prototype === a
};
cljs.core._STAR_main_cli_fn_STAR_ = null;
cljs.core.missing_protocol = function(a, b) {
  return Error(["No protocol method ", a, " defined for type ", goog.typeOf(b), ": ", b].join(""))
};
cljs.core.aclone = function(a) {
  return a.slice()
};
cljs.core.array = function(a) {
  return Array.prototype.slice.call(arguments)
};
cljs.core.make_array = function() {
  var a = null, a = function(b, c) {
    switch(arguments.length) {
      case 1:
        return Array(b);
      case 2:
        return a.cljs$lang$arity$1(c)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$1 = function(a) {
    return Array(a)
  };
  a.cljs$lang$arity$2 = function(b, c) {
    return a.cljs$lang$arity$1(c)
  };
  return a
}();
cljs.core.apply = void 0;
cljs.core.aget = function() {
  var a = null, b = function(b, c, f) {
    return cljs.core.apply.cljs$lang$arity$3 ? cljs.core.apply.cljs$lang$arity$3(a, a.cljs$lang$arity$2(b, c), f) : cljs.core.apply.call(null, a, a.cljs$lang$arity$2(b, c), f)
  }, c = function(a, c, f) {
    var g = null;
    goog.isDef(f) && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return b.call(this, a, c, g)
  };
  c.cljs$lang$maxFixedArity = 2;
  c.cljs$lang$applyTo = function(a) {
    var c = cljs.core.first(a), f = cljs.core.first(cljs.core.next(a)), a = cljs.core.rest(cljs.core.next(a));
    return b(c, f, a)
  };
  c.cljs$lang$arity$variadic = b;
  a = function(a, b, f) {
    switch(arguments.length) {
      case 2:
        return a[b];
      default:
        return c.cljs$lang$arity$variadic(a, b, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = c.cljs$lang$applyTo;
  a.cljs$lang$arity$2 = function(a, b) {
    return a[b]
  };
  a.cljs$lang$arity$variadic = c.cljs$lang$arity$variadic;
  return a
}();
cljs.core.aset = function(a, b, c) {
  return a[b] = c
};
cljs.core.alength = function(a) {
  return a.length
};
cljs.core.reduce = void 0;
cljs.core.into_array = function() {
  var a = null, b = function(b) {
    return a.cljs$lang$arity$2(null, b)
  }, c = function(a, b) {
    return cljs.core.reduce.cljs$lang$arity$3 ? cljs.core.reduce.cljs$lang$arity$3(function(a, b) {
      a.push(b);
      return a
    }, [], b) : cljs.core.reduce.call(null, function(a, b) {
      a.push(b);
      return a
    }, [], b)
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$1 = b;
  a.cljs$lang$arity$2 = c;
  return a
}();
cljs.core.Fn = {};
cljs.core.IFn = {};
cljs.core._invoke = function() {
  var a = null, b = function(a) {
    var b;
    b = a ? a.cljs$core$IFn$_invoke$arity$1 : a;
    if(b) {
      return a.cljs$core$IFn$_invoke$arity$1(a)
    }
    b = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!b && (b = cljs.core._invoke._, !b)) {
      throw cljs.core.missing_protocol("IFn.-invoke", a);
    }
    return b.call(null, a)
  }, c = function(a, b) {
    var c;
    c = a ? a.cljs$core$IFn$_invoke$arity$2 : a;
    if(c) {
      return a.cljs$core$IFn$_invoke$arity$2(a, b)
    }
    c = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!c && (c = cljs.core._invoke._, !c)) {
      throw cljs.core.missing_protocol("IFn.-invoke", a);
    }
    return c.call(null, a, b)
  }, d = function(a, b, c) {
    var d;
    d = a ? a.cljs$core$IFn$_invoke$arity$3 : a;
    if(d) {
      return a.cljs$core$IFn$_invoke$arity$3(a, b, c)
    }
    d = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!d && (d = cljs.core._invoke._, !d)) {
      throw cljs.core.missing_protocol("IFn.-invoke", a);
    }
    return d.call(null, a, b, c)
  }, e = function(a, b, c, d) {
    var e;
    e = a ? a.cljs$core$IFn$_invoke$arity$4 : a;
    if(e) {
      return a.cljs$core$IFn$_invoke$arity$4(a, b, c, d)
    }
    e = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!e && (e = cljs.core._invoke._, !e)) {
      throw cljs.core.missing_protocol("IFn.-invoke", a);
    }
    return e.call(null, a, b, c, d)
  }, f = function(a, b, c, d, e) {
    var f;
    f = a ? a.cljs$core$IFn$_invoke$arity$5 : a;
    if(f) {
      return a.cljs$core$IFn$_invoke$arity$5(a, b, c, d, e)
    }
    f = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!f && (f = cljs.core._invoke._, !f)) {
      throw cljs.core.missing_protocol("IFn.-invoke", a);
    }
    return f.call(null, a, b, c, d, e)
  }, g = function(a, b, c, d, e, f) {
    var g;
    g = a ? a.cljs$core$IFn$_invoke$arity$6 : a;
    if(g) {
      return a.cljs$core$IFn$_invoke$arity$6(a, b, c, d, e, f)
    }
    g = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!g && (g = cljs.core._invoke._, !g)) {
      throw cljs.core.missing_protocol("IFn.-invoke", a);
    }
    return g.call(null, a, b, c, d, e, f)
  }, h = function(a, b, c, d, e, f, g) {
    var h;
    h = a ? a.cljs$core$IFn$_invoke$arity$7 : a;
    if(h) {
      return a.cljs$core$IFn$_invoke$arity$7(a, b, c, d, e, f, g)
    }
    h = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!h && (h = cljs.core._invoke._, !h)) {
      throw cljs.core.missing_protocol("IFn.-invoke", a);
    }
    return h.call(null, a, b, c, d, e, f, g)
  }, i = function(a, b, c, d, e, f, g, h) {
    var i;
    i = a ? a.cljs$core$IFn$_invoke$arity$8 : a;
    if(i) {
      return a.cljs$core$IFn$_invoke$arity$8(a, b, c, d, e, f, g, h)
    }
    i = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!i && (i = cljs.core._invoke._, !i)) {
      throw cljs.core.missing_protocol("IFn.-invoke", a);
    }
    return i.call(null, a, b, c, d, e, f, g, h)
  }, j = function(a, b, c, d, e, f, g, h, i) {
    var j;
    j = a ? a.cljs$core$IFn$_invoke$arity$9 : a;
    if(j) {
      return a.cljs$core$IFn$_invoke$arity$9(a, b, c, d, e, f, g, h, i)
    }
    j = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!j && (j = cljs.core._invoke._, !j)) {
      throw cljs.core.missing_protocol("IFn.-invoke", a);
    }
    return j.call(null, a, b, c, d, e, f, g, h, i)
  }, l = function(a, b, c, d, e, f, g, h, i, j) {
    var l;
    l = a ? a.cljs$core$IFn$_invoke$arity$10 : a;
    if(l) {
      return a.cljs$core$IFn$_invoke$arity$10(a, b, c, d, e, f, g, h, i, j)
    }
    l = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!l && (l = cljs.core._invoke._, !l)) {
      throw cljs.core.missing_protocol("IFn.-invoke", a);
    }
    return l.call(null, a, b, c, d, e, f, g, h, i, j)
  }, m = function(a, b, c, d, e, f, g, h, i, j, l) {
    var m;
    m = a ? a.cljs$core$IFn$_invoke$arity$11 : a;
    if(m) {
      return a.cljs$core$IFn$_invoke$arity$11(a, b, c, d, e, f, g, h, i, j, l)
    }
    m = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!m && (m = cljs.core._invoke._, !m)) {
      throw cljs.core.missing_protocol("IFn.-invoke", a);
    }
    return m.call(null, a, b, c, d, e, f, g, h, i, j, l)
  }, k = function(a, b, c, d, e, f, g, h, i, j, l, m) {
    var k;
    k = a ? a.cljs$core$IFn$_invoke$arity$12 : a;
    if(k) {
      return a.cljs$core$IFn$_invoke$arity$12(a, b, c, d, e, f, g, h, i, j, l, m)
    }
    k = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!k && (k = cljs.core._invoke._, !k)) {
      throw cljs.core.missing_protocol("IFn.-invoke", a);
    }
    return k.call(null, a, b, c, d, e, f, g, h, i, j, l, m)
  }, n = function(a, b, c, d, e, f, g, h, i, j, l, m, k) {
    var n;
    n = a ? a.cljs$core$IFn$_invoke$arity$13 : a;
    if(n) {
      return a.cljs$core$IFn$_invoke$arity$13(a, b, c, d, e, f, g, h, i, j, l, m, k)
    }
    n = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!n && (n = cljs.core._invoke._, !n)) {
      throw cljs.core.missing_protocol("IFn.-invoke", a);
    }
    return n.call(null, a, b, c, d, e, f, g, h, i, j, l, m, k)
  }, p = function(a, b, c, d, e, f, g, h, i, j, l, m, k, n) {
    var q;
    q = a ? a.cljs$core$IFn$_invoke$arity$14 : a;
    if(q) {
      return a.cljs$core$IFn$_invoke$arity$14(a, b, c, d, e, f, g, h, i, j, l, m, k, n)
    }
    q = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!q && (q = cljs.core._invoke._, !q)) {
      throw cljs.core.missing_protocol("IFn.-invoke", a);
    }
    return q.call(null, a, b, c, d, e, f, g, h, i, j, l, m, k, n)
  }, q = function(a, b, c, d, e, f, g, h, i, j, l, m, k, n, q) {
    var p;
    p = a ? a.cljs$core$IFn$_invoke$arity$15 : a;
    if(p) {
      return a.cljs$core$IFn$_invoke$arity$15(a, b, c, d, e, f, g, h, i, j, l, m, k, n, q)
    }
    p = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!p && (p = cljs.core._invoke._, !p)) {
      throw cljs.core.missing_protocol("IFn.-invoke", a);
    }
    return p.call(null, a, b, c, d, e, f, g, h, i, j, l, m, k, n, q)
  }, r = function(a, b, c, d, e, f, g, h, i, j, l, m, k, n, q, p) {
    var r;
    r = a ? a.cljs$core$IFn$_invoke$arity$16 : a;
    if(r) {
      return a.cljs$core$IFn$_invoke$arity$16(a, b, c, d, e, f, g, h, i, j, l, m, k, n, q, p)
    }
    r = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!r && (r = cljs.core._invoke._, !r)) {
      throw cljs.core.missing_protocol("IFn.-invoke", a);
    }
    return r.call(null, a, b, c, d, e, f, g, h, i, j, l, m, k, n, q, p)
  }, s = function(a, b, c, d, e, f, g, h, i, j, l, m, k, n, q, p, r) {
    var s;
    s = a ? a.cljs$core$IFn$_invoke$arity$17 : a;
    if(s) {
      return a.cljs$core$IFn$_invoke$arity$17(a, b, c, d, e, f, g, h, i, j, l, m, k, n, q, p, r)
    }
    s = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!s && (s = cljs.core._invoke._, !s)) {
      throw cljs.core.missing_protocol("IFn.-invoke", a);
    }
    return s.call(null, a, b, c, d, e, f, g, h, i, j, l, m, k, n, q, p, r)
  }, t = function(a, b, c, d, e, f, g, h, i, j, l, m, k, n, q, p, r, s) {
    var t;
    t = a ? a.cljs$core$IFn$_invoke$arity$18 : a;
    if(t) {
      return a.cljs$core$IFn$_invoke$arity$18(a, b, c, d, e, f, g, h, i, j, l, m, k, n, q, p, r, s)
    }
    t = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!t && (t = cljs.core._invoke._, !t)) {
      throw cljs.core.missing_protocol("IFn.-invoke", a);
    }
    return t.call(null, a, b, c, d, e, f, g, h, i, j, l, m, k, n, q, p, r, s)
  }, u = function(a, b, c, d, e, f, g, h, i, j, l, m, k, n, q, p, r, s, t) {
    var u;
    u = a ? a.cljs$core$IFn$_invoke$arity$19 : a;
    if(u) {
      return a.cljs$core$IFn$_invoke$arity$19(a, b, c, d, e, f, g, h, i, j, l, m, k, n, q, p, r, s, t)
    }
    u = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!u && (u = cljs.core._invoke._, !u)) {
      throw cljs.core.missing_protocol("IFn.-invoke", a);
    }
    return u.call(null, a, b, c, d, e, f, g, h, i, j, l, m, k, n, q, p, r, s, t)
  }, x = function(a, b, c, d, e, f, g, h, i, j, l, m, k, n, q, p, r, s, t, u) {
    var x;
    x = a ? a.cljs$core$IFn$_invoke$arity$20 : a;
    if(x) {
      return a.cljs$core$IFn$_invoke$arity$20(a, b, c, d, e, f, g, h, i, j, l, m, k, n, q, p, r, s, t, u)
    }
    x = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!x && (x = cljs.core._invoke._, !x)) {
      throw cljs.core.missing_protocol("IFn.-invoke", a);
    }
    return x.call(null, a, b, c, d, e, f, g, h, i, j, l, m, k, n, q, p, r, s, t, u)
  }, D = function(a, b, c, d, e, f, g, h, i, j, l, m, k, n, q, p, r, s, t, u, x) {
    var D;
    D = a ? a.cljs$core$IFn$_invoke$arity$21 : a;
    if(D) {
      return a.cljs$core$IFn$_invoke$arity$21(a, b, c, d, e, f, g, h, i, j, l, m, k, n, q, p, r, s, t, u, x)
    }
    D = cljs.core._invoke[goog.typeOf(null == a ? null : a)];
    if(!D && (D = cljs.core._invoke._, !D)) {
      throw cljs.core.missing_protocol("IFn.-invoke", a);
    }
    return D.call(null, a, b, c, d, e, f, g, h, i, j, l, m, k, n, q, p, r, s, t, u, x)
  }, a = function(a, v, w, y, z, A, B, C, E, F, G, H, I, J, K, L, M, N, O, P, Q) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, v);
      case 3:
        return d.call(this, a, v, w);
      case 4:
        return e.call(this, a, v, w, y);
      case 5:
        return f.call(this, a, v, w, y, z);
      case 6:
        return g.call(this, a, v, w, y, z, A);
      case 7:
        return h.call(this, a, v, w, y, z, A, B);
      case 8:
        return i.call(this, a, v, w, y, z, A, B, C);
      case 9:
        return j.call(this, a, v, w, y, z, A, B, C, E);
      case 10:
        return l.call(this, a, v, w, y, z, A, B, C, E, F);
      case 11:
        return m.call(this, a, v, w, y, z, A, B, C, E, F, G);
      case 12:
        return k.call(this, a, v, w, y, z, A, B, C, E, F, G, H);
      case 13:
        return n.call(this, a, v, w, y, z, A, B, C, E, F, G, H, I);
      case 14:
        return p.call(this, a, v, w, y, z, A, B, C, E, F, G, H, I, J);
      case 15:
        return q.call(this, a, v, w, y, z, A, B, C, E, F, G, H, I, J, K);
      case 16:
        return r.call(this, a, v, w, y, z, A, B, C, E, F, G, H, I, J, K, L);
      case 17:
        return s.call(this, a, v, w, y, z, A, B, C, E, F, G, H, I, J, K, L, M);
      case 18:
        return t.call(this, a, v, w, y, z, A, B, C, E, F, G, H, I, J, K, L, M, N);
      case 19:
        return u.call(this, a, v, w, y, z, A, B, C, E, F, G, H, I, J, K, L, M, N, O);
      case 20:
        return x.call(this, a, v, w, y, z, A, B, C, E, F, G, H, I, J, K, L, M, N, O, P);
      case 21:
        return D.call(this, a, v, w, y, z, A, B, C, E, F, G, H, I, J, K, L, M, N, O, P, Q)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$1 = b;
  a.cljs$lang$arity$2 = c;
  a.cljs$lang$arity$3 = d;
  a.cljs$lang$arity$4 = e;
  a.cljs$lang$arity$5 = f;
  a.cljs$lang$arity$6 = g;
  a.cljs$lang$arity$7 = h;
  a.cljs$lang$arity$8 = i;
  a.cljs$lang$arity$9 = j;
  a.cljs$lang$arity$10 = l;
  a.cljs$lang$arity$11 = m;
  a.cljs$lang$arity$12 = k;
  a.cljs$lang$arity$13 = n;
  a.cljs$lang$arity$14 = p;
  a.cljs$lang$arity$15 = q;
  a.cljs$lang$arity$16 = r;
  a.cljs$lang$arity$17 = s;
  a.cljs$lang$arity$18 = t;
  a.cljs$lang$arity$19 = u;
  a.cljs$lang$arity$20 = x;
  a.cljs$lang$arity$21 = D;
  return a
}();
cljs.core.ICounted = {};
cljs.core._count = function(a) {
  var b;
  b = a ? a.cljs$core$ICounted$_count$arity$1 : a;
  if(b) {
    return a.cljs$core$ICounted$_count$arity$1(a)
  }
  b = cljs.core._count[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._count._, !b)) {
    throw cljs.core.missing_protocol("ICounted.-count", a);
  }
  return b.call(null, a)
};
cljs.core.IEmptyableCollection = {};
cljs.core._empty = function(a) {
  var b;
  b = a ? a.cljs$core$IEmptyableCollection$_empty$arity$1 : a;
  if(b) {
    return a.cljs$core$IEmptyableCollection$_empty$arity$1(a)
  }
  b = cljs.core._empty[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._empty._, !b)) {
    throw cljs.core.missing_protocol("IEmptyableCollection.-empty", a);
  }
  return b.call(null, a)
};
cljs.core.ICollection = {};
cljs.core._conj = function(a, b) {
  var c;
  c = a ? a.cljs$core$ICollection$_conj$arity$2 : a;
  if(c) {
    return a.cljs$core$ICollection$_conj$arity$2(a, b)
  }
  c = cljs.core._conj[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.core._conj._, !c)) {
    throw cljs.core.missing_protocol("ICollection.-conj", a);
  }
  return c.call(null, a, b)
};
cljs.core.IIndexed = {};
cljs.core._nth = function() {
  var a = null, b = function(a, b) {
    var c;
    c = a ? a.cljs$core$IIndexed$_nth$arity$2 : a;
    if(c) {
      return a.cljs$core$IIndexed$_nth$arity$2(a, b)
    }
    c = cljs.core._nth[goog.typeOf(null == a ? null : a)];
    if(!c && (c = cljs.core._nth._, !c)) {
      throw cljs.core.missing_protocol("IIndexed.-nth", a);
    }
    return c.call(null, a, b)
  }, c = function(a, b, c) {
    var g;
    g = a ? a.cljs$core$IIndexed$_nth$arity$3 : a;
    if(g) {
      return a.cljs$core$IIndexed$_nth$arity$3(a, b, c)
    }
    g = cljs.core._nth[goog.typeOf(null == a ? null : a)];
    if(!g && (g = cljs.core._nth._, !g)) {
      throw cljs.core.missing_protocol("IIndexed.-nth", a);
    }
    return g.call(null, a, b, c)
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$2 = b;
  a.cljs$lang$arity$3 = c;
  return a
}();
cljs.core.ASeq = {};
cljs.core.ISeq = {};
cljs.core._first = function(a) {
  var b;
  b = a ? a.cljs$core$ISeq$_first$arity$1 : a;
  if(b) {
    return a.cljs$core$ISeq$_first$arity$1(a)
  }
  b = cljs.core._first[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._first._, !b)) {
    throw cljs.core.missing_protocol("ISeq.-first", a);
  }
  return b.call(null, a)
};
cljs.core._rest = function(a) {
  var b;
  b = a ? a.cljs$core$ISeq$_rest$arity$1 : a;
  if(b) {
    return a.cljs$core$ISeq$_rest$arity$1(a)
  }
  b = cljs.core._rest[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._rest._, !b)) {
    throw cljs.core.missing_protocol("ISeq.-rest", a);
  }
  return b.call(null, a)
};
cljs.core.INext = {};
cljs.core._next = function(a) {
  var b;
  b = a ? a.cljs$core$INext$_next$arity$1 : a;
  if(b) {
    return a.cljs$core$INext$_next$arity$1(a)
  }
  b = cljs.core._next[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._next._, !b)) {
    throw cljs.core.missing_protocol("INext.-next", a);
  }
  return b.call(null, a)
};
cljs.core.ILookup = {};
cljs.core._lookup = function() {
  var a = null, b = function(a, b) {
    var c;
    c = a ? a.cljs$core$ILookup$_lookup$arity$2 : a;
    if(c) {
      return a.cljs$core$ILookup$_lookup$arity$2(a, b)
    }
    c = cljs.core._lookup[goog.typeOf(null == a ? null : a)];
    if(!c && (c = cljs.core._lookup._, !c)) {
      throw cljs.core.missing_protocol("ILookup.-lookup", a);
    }
    return c.call(null, a, b)
  }, c = function(a, b, c) {
    var g;
    g = a ? a.cljs$core$ILookup$_lookup$arity$3 : a;
    if(g) {
      return a.cljs$core$ILookup$_lookup$arity$3(a, b, c)
    }
    g = cljs.core._lookup[goog.typeOf(null == a ? null : a)];
    if(!g && (g = cljs.core._lookup._, !g)) {
      throw cljs.core.missing_protocol("ILookup.-lookup", a);
    }
    return g.call(null, a, b, c)
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$2 = b;
  a.cljs$lang$arity$3 = c;
  return a
}();
cljs.core.IAssociative = {};
cljs.core._contains_key_QMARK_ = function(a, b) {
  var c;
  c = a ? a.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 : a;
  if(c) {
    return a.cljs$core$IAssociative$_contains_key_QMARK_$arity$2(a, b)
  }
  c = cljs.core._contains_key_QMARK_[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.core._contains_key_QMARK_._, !c)) {
    throw cljs.core.missing_protocol("IAssociative.-contains-key?", a);
  }
  return c.call(null, a, b)
};
cljs.core._assoc = function(a, b, c) {
  var d;
  d = a ? a.cljs$core$IAssociative$_assoc$arity$3 : a;
  if(d) {
    return a.cljs$core$IAssociative$_assoc$arity$3(a, b, c)
  }
  d = cljs.core._assoc[goog.typeOf(null == a ? null : a)];
  if(!d && (d = cljs.core._assoc._, !d)) {
    throw cljs.core.missing_protocol("IAssociative.-assoc", a);
  }
  return d.call(null, a, b, c)
};
cljs.core.IMap = {};
cljs.core._dissoc = function(a, b) {
  var c;
  c = a ? a.cljs$core$IMap$_dissoc$arity$2 : a;
  if(c) {
    return a.cljs$core$IMap$_dissoc$arity$2(a, b)
  }
  c = cljs.core._dissoc[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.core._dissoc._, !c)) {
    throw cljs.core.missing_protocol("IMap.-dissoc", a);
  }
  return c.call(null, a, b)
};
cljs.core.IMapEntry = {};
cljs.core._key = function(a) {
  var b;
  b = a ? a.cljs$core$IMapEntry$_key$arity$1 : a;
  if(b) {
    return a.cljs$core$IMapEntry$_key$arity$1(a)
  }
  b = cljs.core._key[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._key._, !b)) {
    throw cljs.core.missing_protocol("IMapEntry.-key", a);
  }
  return b.call(null, a)
};
cljs.core._val = function(a) {
  var b;
  b = a ? a.cljs$core$IMapEntry$_val$arity$1 : a;
  if(b) {
    return a.cljs$core$IMapEntry$_val$arity$1(a)
  }
  b = cljs.core._val[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._val._, !b)) {
    throw cljs.core.missing_protocol("IMapEntry.-val", a);
  }
  return b.call(null, a)
};
cljs.core.ISet = {};
cljs.core._disjoin = function(a, b) {
  var c;
  c = a ? a.cljs$core$ISet$_disjoin$arity$2 : a;
  if(c) {
    return a.cljs$core$ISet$_disjoin$arity$2(a, b)
  }
  c = cljs.core._disjoin[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.core._disjoin._, !c)) {
    throw cljs.core.missing_protocol("ISet.-disjoin", a);
  }
  return c.call(null, a, b)
};
cljs.core.IStack = {};
cljs.core._peek = function(a) {
  var b;
  b = a ? a.cljs$core$IStack$_peek$arity$1 : a;
  if(b) {
    return a.cljs$core$IStack$_peek$arity$1(a)
  }
  b = cljs.core._peek[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._peek._, !b)) {
    throw cljs.core.missing_protocol("IStack.-peek", a);
  }
  return b.call(null, a)
};
cljs.core._pop = function(a) {
  var b;
  b = a ? a.cljs$core$IStack$_pop$arity$1 : a;
  if(b) {
    return a.cljs$core$IStack$_pop$arity$1(a)
  }
  b = cljs.core._pop[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._pop._, !b)) {
    throw cljs.core.missing_protocol("IStack.-pop", a);
  }
  return b.call(null, a)
};
cljs.core.IVector = {};
cljs.core._assoc_n = function(a, b, c) {
  var d;
  d = a ? a.cljs$core$IVector$_assoc_n$arity$3 : a;
  if(d) {
    return a.cljs$core$IVector$_assoc_n$arity$3(a, b, c)
  }
  d = cljs.core._assoc_n[goog.typeOf(null == a ? null : a)];
  if(!d && (d = cljs.core._assoc_n._, !d)) {
    throw cljs.core.missing_protocol("IVector.-assoc-n", a);
  }
  return d.call(null, a, b, c)
};
cljs.core.IDeref = {};
cljs.core._deref = function(a) {
  var b;
  b = a ? a.cljs$core$IDeref$_deref$arity$1 : a;
  if(b) {
    return a.cljs$core$IDeref$_deref$arity$1(a)
  }
  b = cljs.core._deref[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._deref._, !b)) {
    throw cljs.core.missing_protocol("IDeref.-deref", a);
  }
  return b.call(null, a)
};
cljs.core.IDerefWithTimeout = {};
cljs.core._deref_with_timeout = function(a, b, c) {
  var d;
  d = a ? a.cljs$core$IDerefWithTimeout$_deref_with_timeout$arity$3 : a;
  if(d) {
    return a.cljs$core$IDerefWithTimeout$_deref_with_timeout$arity$3(a, b, c)
  }
  d = cljs.core._deref_with_timeout[goog.typeOf(null == a ? null : a)];
  if(!d && (d = cljs.core._deref_with_timeout._, !d)) {
    throw cljs.core.missing_protocol("IDerefWithTimeout.-deref-with-timeout", a);
  }
  return d.call(null, a, b, c)
};
cljs.core.IMeta = {};
cljs.core._meta = function(a) {
  var b;
  b = a ? a.cljs$core$IMeta$_meta$arity$1 : a;
  if(b) {
    return a.cljs$core$IMeta$_meta$arity$1(a)
  }
  b = cljs.core._meta[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._meta._, !b)) {
    throw cljs.core.missing_protocol("IMeta.-meta", a);
  }
  return b.call(null, a)
};
cljs.core.IWithMeta = {};
cljs.core._with_meta = function(a, b) {
  var c;
  c = a ? a.cljs$core$IWithMeta$_with_meta$arity$2 : a;
  if(c) {
    return a.cljs$core$IWithMeta$_with_meta$arity$2(a, b)
  }
  c = cljs.core._with_meta[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.core._with_meta._, !c)) {
    throw cljs.core.missing_protocol("IWithMeta.-with-meta", a);
  }
  return c.call(null, a, b)
};
cljs.core.IReduce = {};
cljs.core._reduce = function() {
  var a = null, b = function(a, b) {
    var c;
    c = a ? a.cljs$core$IReduce$_reduce$arity$2 : a;
    if(c) {
      return a.cljs$core$IReduce$_reduce$arity$2(a, b)
    }
    c = cljs.core._reduce[goog.typeOf(null == a ? null : a)];
    if(!c && (c = cljs.core._reduce._, !c)) {
      throw cljs.core.missing_protocol("IReduce.-reduce", a);
    }
    return c.call(null, a, b)
  }, c = function(a, b, c) {
    var g;
    g = a ? a.cljs$core$IReduce$_reduce$arity$3 : a;
    if(g) {
      return a.cljs$core$IReduce$_reduce$arity$3(a, b, c)
    }
    g = cljs.core._reduce[goog.typeOf(null == a ? null : a)];
    if(!g && (g = cljs.core._reduce._, !g)) {
      throw cljs.core.missing_protocol("IReduce.-reduce", a);
    }
    return g.call(null, a, b, c)
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$2 = b;
  a.cljs$lang$arity$3 = c;
  return a
}();
cljs.core.IKVReduce = {};
cljs.core._kv_reduce = function(a, b, c) {
  var d;
  d = a ? a.cljs$core$IKVReduce$_kv_reduce$arity$3 : a;
  if(d) {
    return a.cljs$core$IKVReduce$_kv_reduce$arity$3(a, b, c)
  }
  d = cljs.core._kv_reduce[goog.typeOf(null == a ? null : a)];
  if(!d && (d = cljs.core._kv_reduce._, !d)) {
    throw cljs.core.missing_protocol("IKVReduce.-kv-reduce", a);
  }
  return d.call(null, a, b, c)
};
cljs.core.IEquiv = {};
cljs.core._equiv = function(a, b) {
  var c;
  c = a ? a.cljs$core$IEquiv$_equiv$arity$2 : a;
  if(c) {
    return a.cljs$core$IEquiv$_equiv$arity$2(a, b)
  }
  c = cljs.core._equiv[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.core._equiv._, !c)) {
    throw cljs.core.missing_protocol("IEquiv.-equiv", a);
  }
  return c.call(null, a, b)
};
cljs.core.IHash = {};
cljs.core._hash = function(a) {
  var b;
  b = a ? a.cljs$core$IHash$_hash$arity$1 : a;
  if(b) {
    return a.cljs$core$IHash$_hash$arity$1(a)
  }
  b = cljs.core._hash[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._hash._, !b)) {
    throw cljs.core.missing_protocol("IHash.-hash", a);
  }
  return b.call(null, a)
};
cljs.core.ISeqable = {};
cljs.core._seq = function(a) {
  var b;
  b = a ? a.cljs$core$ISeqable$_seq$arity$1 : a;
  if(b) {
    return a.cljs$core$ISeqable$_seq$arity$1(a)
  }
  b = cljs.core._seq[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._seq._, !b)) {
    throw cljs.core.missing_protocol("ISeqable.-seq", a);
  }
  return b.call(null, a)
};
cljs.core.ISequential = {};
cljs.core.IList = {};
cljs.core.IRecord = {};
cljs.core.IReversible = {};
cljs.core._rseq = function(a) {
  var b;
  b = a ? a.cljs$core$IReversible$_rseq$arity$1 : a;
  if(b) {
    return a.cljs$core$IReversible$_rseq$arity$1(a)
  }
  b = cljs.core._rseq[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._rseq._, !b)) {
    throw cljs.core.missing_protocol("IReversible.-rseq", a);
  }
  return b.call(null, a)
};
cljs.core.ISorted = {};
cljs.core._sorted_seq = function(a, b) {
  var c;
  c = a ? a.cljs$core$ISorted$_sorted_seq$arity$2 : a;
  if(c) {
    return a.cljs$core$ISorted$_sorted_seq$arity$2(a, b)
  }
  c = cljs.core._sorted_seq[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.core._sorted_seq._, !c)) {
    throw cljs.core.missing_protocol("ISorted.-sorted-seq", a);
  }
  return c.call(null, a, b)
};
cljs.core._sorted_seq_from = function(a, b, c) {
  var d;
  d = a ? a.cljs$core$ISorted$_sorted_seq_from$arity$3 : a;
  if(d) {
    return a.cljs$core$ISorted$_sorted_seq_from$arity$3(a, b, c)
  }
  d = cljs.core._sorted_seq_from[goog.typeOf(null == a ? null : a)];
  if(!d && (d = cljs.core._sorted_seq_from._, !d)) {
    throw cljs.core.missing_protocol("ISorted.-sorted-seq-from", a);
  }
  return d.call(null, a, b, c)
};
cljs.core._entry_key = function(a, b) {
  var c;
  c = a ? a.cljs$core$ISorted$_entry_key$arity$2 : a;
  if(c) {
    return a.cljs$core$ISorted$_entry_key$arity$2(a, b)
  }
  c = cljs.core._entry_key[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.core._entry_key._, !c)) {
    throw cljs.core.missing_protocol("ISorted.-entry-key", a);
  }
  return c.call(null, a, b)
};
cljs.core._comparator = function(a) {
  var b;
  b = a ? a.cljs$core$ISorted$_comparator$arity$1 : a;
  if(b) {
    return a.cljs$core$ISorted$_comparator$arity$1(a)
  }
  b = cljs.core._comparator[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._comparator._, !b)) {
    throw cljs.core.missing_protocol("ISorted.-comparator", a);
  }
  return b.call(null, a)
};
cljs.core.IPrintable = {};
cljs.core._pr_seq = function(a, b) {
  var c;
  c = a ? a.cljs$core$IPrintable$_pr_seq$arity$2 : a;
  if(c) {
    return a.cljs$core$IPrintable$_pr_seq$arity$2(a, b)
  }
  c = cljs.core._pr_seq[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.core._pr_seq._, !c)) {
    throw cljs.core.missing_protocol("IPrintable.-pr-seq", a);
  }
  return c.call(null, a, b)
};
cljs.core.IWriter = {};
cljs.core._write = function(a, b) {
  var c;
  c = a ? a.cljs$core$IWriter$_write$arity$2 : a;
  if(c) {
    return a.cljs$core$IWriter$_write$arity$2(a, b)
  }
  c = cljs.core._write[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.core._write._, !c)) {
    throw cljs.core.missing_protocol("IWriter.-write", a);
  }
  return c.call(null, a, b)
};
cljs.core._flush = function(a) {
  var b;
  b = a ? a.cljs$core$IWriter$_flush$arity$1 : a;
  if(b) {
    return a.cljs$core$IWriter$_flush$arity$1(a)
  }
  b = cljs.core._flush[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._flush._, !b)) {
    throw cljs.core.missing_protocol("IWriter.-flush", a);
  }
  return b.call(null, a)
};
cljs.core.IPrintWithWriter = {};
cljs.core._pr_writer = function(a, b, c) {
  var d;
  d = a ? a.cljs$core$IPrintWithWriter$_pr_writer$arity$3 : a;
  if(d) {
    return a.cljs$core$IPrintWithWriter$_pr_writer$arity$3(a, b, c)
  }
  d = cljs.core._pr_writer[goog.typeOf(null == a ? null : a)];
  if(!d && (d = cljs.core._pr_writer._, !d)) {
    throw cljs.core.missing_protocol("IPrintWithWriter.-pr-writer", a);
  }
  return d.call(null, a, b, c)
};
cljs.core.IPending = {};
cljs.core._realized_QMARK_ = function(a) {
  var b;
  b = a ? a.cljs$core$IPending$_realized_QMARK_$arity$1 : a;
  if(b) {
    return a.cljs$core$IPending$_realized_QMARK_$arity$1(a)
  }
  b = cljs.core._realized_QMARK_[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._realized_QMARK_._, !b)) {
    throw cljs.core.missing_protocol("IPending.-realized?", a);
  }
  return b.call(null, a)
};
cljs.core.IWatchable = {};
cljs.core._notify_watches = function(a, b, c) {
  var d;
  d = a ? a.cljs$core$IWatchable$_notify_watches$arity$3 : a;
  if(d) {
    return a.cljs$core$IWatchable$_notify_watches$arity$3(a, b, c)
  }
  d = cljs.core._notify_watches[goog.typeOf(null == a ? null : a)];
  if(!d && (d = cljs.core._notify_watches._, !d)) {
    throw cljs.core.missing_protocol("IWatchable.-notify-watches", a);
  }
  return d.call(null, a, b, c)
};
cljs.core._add_watch = function(a, b, c) {
  var d;
  d = a ? a.cljs$core$IWatchable$_add_watch$arity$3 : a;
  if(d) {
    return a.cljs$core$IWatchable$_add_watch$arity$3(a, b, c)
  }
  d = cljs.core._add_watch[goog.typeOf(null == a ? null : a)];
  if(!d && (d = cljs.core._add_watch._, !d)) {
    throw cljs.core.missing_protocol("IWatchable.-add-watch", a);
  }
  return d.call(null, a, b, c)
};
cljs.core._remove_watch = function(a, b) {
  var c;
  c = a ? a.cljs$core$IWatchable$_remove_watch$arity$2 : a;
  if(c) {
    return a.cljs$core$IWatchable$_remove_watch$arity$2(a, b)
  }
  c = cljs.core._remove_watch[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.core._remove_watch._, !c)) {
    throw cljs.core.missing_protocol("IWatchable.-remove-watch", a);
  }
  return c.call(null, a, b)
};
cljs.core.IEditableCollection = {};
cljs.core._as_transient = function(a) {
  var b;
  b = a ? a.cljs$core$IEditableCollection$_as_transient$arity$1 : a;
  if(b) {
    return a.cljs$core$IEditableCollection$_as_transient$arity$1(a)
  }
  b = cljs.core._as_transient[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._as_transient._, !b)) {
    throw cljs.core.missing_protocol("IEditableCollection.-as-transient", a);
  }
  return b.call(null, a)
};
cljs.core.ITransientCollection = {};
cljs.core._conj_BANG_ = function(a, b) {
  var c;
  c = a ? a.cljs$core$ITransientCollection$_conj_BANG_$arity$2 : a;
  if(c) {
    return a.cljs$core$ITransientCollection$_conj_BANG_$arity$2(a, b)
  }
  c = cljs.core._conj_BANG_[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.core._conj_BANG_._, !c)) {
    throw cljs.core.missing_protocol("ITransientCollection.-conj!", a);
  }
  return c.call(null, a, b)
};
cljs.core._persistent_BANG_ = function(a) {
  var b;
  b = a ? a.cljs$core$ITransientCollection$_persistent_BANG_$arity$1 : a;
  if(b) {
    return a.cljs$core$ITransientCollection$_persistent_BANG_$arity$1(a)
  }
  b = cljs.core._persistent_BANG_[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._persistent_BANG_._, !b)) {
    throw cljs.core.missing_protocol("ITransientCollection.-persistent!", a);
  }
  return b.call(null, a)
};
cljs.core.ITransientAssociative = {};
cljs.core._assoc_BANG_ = function(a, b, c) {
  var d;
  d = a ? a.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3 : a;
  if(d) {
    return a.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3(a, b, c)
  }
  d = cljs.core._assoc_BANG_[goog.typeOf(null == a ? null : a)];
  if(!d && (d = cljs.core._assoc_BANG_._, !d)) {
    throw cljs.core.missing_protocol("ITransientAssociative.-assoc!", a);
  }
  return d.call(null, a, b, c)
};
cljs.core.ITransientMap = {};
cljs.core._dissoc_BANG_ = function(a, b) {
  var c;
  c = a ? a.cljs$core$ITransientMap$_dissoc_BANG_$arity$2 : a;
  if(c) {
    return a.cljs$core$ITransientMap$_dissoc_BANG_$arity$2(a, b)
  }
  c = cljs.core._dissoc_BANG_[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.core._dissoc_BANG_._, !c)) {
    throw cljs.core.missing_protocol("ITransientMap.-dissoc!", a);
  }
  return c.call(null, a, b)
};
cljs.core.ITransientVector = {};
cljs.core._assoc_n_BANG_ = function(a, b, c) {
  var d;
  d = a ? a.cljs$core$ITransientVector$_assoc_n_BANG_$arity$3 : a;
  if(d) {
    return a.cljs$core$ITransientVector$_assoc_n_BANG_$arity$3(a, b, c)
  }
  d = cljs.core._assoc_n_BANG_[goog.typeOf(null == a ? null : a)];
  if(!d && (d = cljs.core._assoc_n_BANG_._, !d)) {
    throw cljs.core.missing_protocol("ITransientVector.-assoc-n!", a);
  }
  return d.call(null, a, b, c)
};
cljs.core._pop_BANG_ = function(a) {
  var b;
  b = a ? a.cljs$core$ITransientVector$_pop_BANG_$arity$1 : a;
  if(b) {
    return a.cljs$core$ITransientVector$_pop_BANG_$arity$1(a)
  }
  b = cljs.core._pop_BANG_[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._pop_BANG_._, !b)) {
    throw cljs.core.missing_protocol("ITransientVector.-pop!", a);
  }
  return b.call(null, a)
};
cljs.core.ITransientSet = {};
cljs.core._disjoin_BANG_ = function(a, b) {
  var c;
  c = a ? a.cljs$core$ITransientSet$_disjoin_BANG_$arity$2 : a;
  if(c) {
    return a.cljs$core$ITransientSet$_disjoin_BANG_$arity$2(a, b)
  }
  c = cljs.core._disjoin_BANG_[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.core._disjoin_BANG_._, !c)) {
    throw cljs.core.missing_protocol("ITransientSet.-disjoin!", a);
  }
  return c.call(null, a, b)
};
cljs.core.IComparable = {};
cljs.core._compare = function(a, b) {
  var c;
  c = a ? a.cljs$core$IComparable$_compare$arity$2 : a;
  if(c) {
    return a.cljs$core$IComparable$_compare$arity$2(a, b)
  }
  c = cljs.core._compare[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.core._compare._, !c)) {
    throw cljs.core.missing_protocol("IComparable.-compare", a);
  }
  return c.call(null, a, b)
};
cljs.core.IChunk = {};
cljs.core._drop_first = function(a) {
  var b;
  b = a ? a.cljs$core$IChunk$_drop_first$arity$1 : a;
  if(b) {
    return a.cljs$core$IChunk$_drop_first$arity$1(a)
  }
  b = cljs.core._drop_first[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._drop_first._, !b)) {
    throw cljs.core.missing_protocol("IChunk.-drop-first", a);
  }
  return b.call(null, a)
};
cljs.core.IChunkedSeq = {};
cljs.core._chunked_first = function(a) {
  var b;
  b = a ? a.cljs$core$IChunkedSeq$_chunked_first$arity$1 : a;
  if(b) {
    return a.cljs$core$IChunkedSeq$_chunked_first$arity$1(a)
  }
  b = cljs.core._chunked_first[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._chunked_first._, !b)) {
    throw cljs.core.missing_protocol("IChunkedSeq.-chunked-first", a);
  }
  return b.call(null, a)
};
cljs.core._chunked_rest = function(a) {
  var b;
  b = a ? a.cljs$core$IChunkedSeq$_chunked_rest$arity$1 : a;
  if(b) {
    return a.cljs$core$IChunkedSeq$_chunked_rest$arity$1(a)
  }
  b = cljs.core._chunked_rest[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._chunked_rest._, !b)) {
    throw cljs.core.missing_protocol("IChunkedSeq.-chunked-rest", a);
  }
  return b.call(null, a)
};
cljs.core.IChunkedNext = {};
cljs.core._chunked_next = function(a) {
  var b;
  b = a ? a.cljs$core$IChunkedNext$_chunked_next$arity$1 : a;
  if(b) {
    return a.cljs$core$IChunkedNext$_chunked_next$arity$1(a)
  }
  b = cljs.core._chunked_next[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._chunked_next._, !b)) {
    throw cljs.core.missing_protocol("IChunkedNext.-chunked-next", a);
  }
  return b.call(null, a)
};
cljs.core.seq = function(a) {
  return null == a ? null : cljs.core.truth_(a ? cljs.core.truth_(function() {
    var b = a.cljs$lang$protocol_mask$partition0$ & 32;
    return b ? b : a.cljs$core$ASeq$
  }()) ? !0 : a.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.type_satisfies_(cljs.core.ASeq, a) : cljs.core.type_satisfies_(cljs.core.ASeq, a)) ? a : cljs.core._seq(a)
};
cljs.core.first = function(a) {
  if(null == a) {
    return null
  }
  if(cljs.core.truth_(a ? cljs.core.truth_(function() {
    var b = a.cljs$lang$protocol_mask$partition0$ & 64;
    return b ? b : a.cljs$core$ISeq$
  }()) ? !0 : a.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.type_satisfies_(cljs.core.ISeq, a) : cljs.core.type_satisfies_(cljs.core.ISeq, a))) {
    return cljs.core._first(a)
  }
  var b = cljs.core.seq(a);
  return null == b ? null : cljs.core._first(b)
};
cljs.core.rest = function(a) {
  if(null != a) {
    if(cljs.core.truth_(a ? cljs.core.truth_(function() {
      var b = a.cljs$lang$protocol_mask$partition0$ & 64;
      return b ? b : a.cljs$core$ISeq$
    }()) ? !0 : a.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.type_satisfies_(cljs.core.ISeq, a) : cljs.core.type_satisfies_(cljs.core.ISeq, a))) {
      return cljs.core._rest(a)
    }
    var b = cljs.core.seq(a);
    return null != b ? cljs.core._rest(b) : cljs.core.List.EMPTY
  }
  return cljs.core.List.EMPTY
};
cljs.core.next = function(a) {
  return null == a ? null : cljs.core.truth_(a ? cljs.core.truth_(function() {
    var b = a.cljs$lang$protocol_mask$partition0$ & 128;
    return b ? b : a.cljs$core$INext$
  }()) ? !0 : a.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.type_satisfies_(cljs.core.INext, a) : cljs.core.type_satisfies_(cljs.core.INext, a)) ? cljs.core._next(a) : cljs.core.seq(cljs.core.rest(a))
};
cljs.core._EQ_ = function() {
  var a = null, b = function(a, b) {
    var c = a === b;
    return c ? c : cljs.core._equiv(a, b)
  }, c = function(b, c, d) {
    for(;;) {
      if(cljs.core.truth_(a.cljs$lang$arity$2(b, c))) {
        if(cljs.core.next(d)) {
          b = c, c = cljs.core.first(d), d = cljs.core.next(d)
        }else {
          return a.cljs$lang$arity$2(c, cljs.core.first(d))
        }
      }else {
        return!1
      }
    }
  }, d = function(a, b, d) {
    var h = null;
    goog.isDef(d) && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return c.call(this, a, b, h)
  };
  d.cljs$lang$maxFixedArity = 2;
  d.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), d = cljs.core.first(cljs.core.next(a)), a = cljs.core.rest(cljs.core.next(a));
    return c(b, d, a)
  };
  d.cljs$lang$arity$variadic = c;
  a = function(a, c, g) {
    switch(arguments.length) {
      case 1:
        return!0;
      case 2:
        return b.call(this, a, c);
      default:
        return d.cljs$lang$arity$variadic(a, c, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = d.cljs$lang$applyTo;
  a.cljs$lang$arity$1 = function() {
    return!0
  };
  a.cljs$lang$arity$2 = b;
  a.cljs$lang$arity$variadic = d.cljs$lang$arity$variadic;
  return a
}();
cljs.core.type = function(a) {
  return null == a ? null : a.constructor
};
cljs.core.instance_QMARK_ = function(a, b) {
  return b instanceof a
};
cljs.core.hash_map = void 0;
cljs.core.list = void 0;
cljs.core.equiv_sequential = void 0;
cljs.core.IHash["null"] = !0;
cljs.core._hash["null"] = function() {
  return 0
};
cljs.core.ILookup["null"] = !0;
cljs.core._lookup["null"] = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return null;
      case 3:
        return d
    }
    throw Error("Invalid arity: " + arguments.length);
  }
}();
cljs.core.IAssociative["null"] = !0;
cljs.core._assoc["null"] = function(a, b, c) {
  return cljs.core.hash_map.cljs$lang$arity$2 ? cljs.core.hash_map.cljs$lang$arity$2(b, c) : cljs.core.hash_map.call(null, b, c)
};
cljs.core.INext["null"] = !0;
cljs.core._next["null"] = function() {
  return null
};
cljs.core.IPrintWithWriter["null"] = !0;
cljs.core._pr_writer["null"] = function(a, b) {
  return cljs.core._write(b, "nil")
};
cljs.core.ICollection["null"] = !0;
cljs.core._conj["null"] = function(a, b) {
  return cljs.core.list.cljs$lang$arity$1 ? cljs.core.list.cljs$lang$arity$1(b) : cljs.core.list.call(null, b)
};
cljs.core.IReduce["null"] = !0;
cljs.core._reduce["null"] = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return c.cljs$lang$arity$0 ? c.cljs$lang$arity$0() : c.call(null);
      case 3:
        return d
    }
    throw Error("Invalid arity: " + arguments.length);
  }
}();
cljs.core.IPrintable["null"] = !0;
cljs.core._pr_seq["null"] = function() {
  return cljs.core.list.cljs$lang$arity$1 ? cljs.core.list.cljs$lang$arity$1("nil") : cljs.core.list.call(null, "nil")
};
cljs.core.ISet["null"] = !0;
cljs.core._disjoin["null"] = function() {
  return null
};
cljs.core.ICounted["null"] = !0;
cljs.core._count["null"] = function() {
  return 0
};
cljs.core.IStack["null"] = !0;
cljs.core._peek["null"] = function() {
  return null
};
cljs.core._pop["null"] = function() {
  return null
};
cljs.core.ISeq["null"] = !0;
cljs.core._first["null"] = function() {
  return null
};
cljs.core._rest["null"] = function() {
  return cljs.core.list.cljs$lang$arity$0 ? cljs.core.list.cljs$lang$arity$0() : cljs.core.list.call(null)
};
cljs.core.IEquiv["null"] = !0;
cljs.core._equiv["null"] = function(a, b) {
  return null == b
};
cljs.core.IWithMeta["null"] = !0;
cljs.core._with_meta["null"] = function() {
  return null
};
cljs.core.IMeta["null"] = !0;
cljs.core._meta["null"] = function() {
  return null
};
cljs.core.IIndexed["null"] = !0;
cljs.core._nth["null"] = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return null;
      case 3:
        return d
    }
    throw Error("Invalid arity: " + arguments.length);
  }
}();
cljs.core.IEmptyableCollection["null"] = !0;
cljs.core._empty["null"] = function() {
  return null
};
cljs.core.IMap["null"] = !0;
cljs.core._dissoc["null"] = function() {
  return null
};
Date.prototype.cljs$core$IEquiv$ = !0;
Date.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  var c = cljs.core.instance_QMARK_(Date, b);
  return c ? a.toString() === b.toString() : c
};
cljs.core.IHash.number = !0;
cljs.core._hash.number = function(a) {
  return Math.floor(a) % 2147483647
};
cljs.core.IEquiv.number = !0;
cljs.core._equiv.number = function(a, b) {
  return a === b
};
cljs.core.IHash["boolean"] = !0;
cljs.core._hash["boolean"] = function(a) {
  return!0 === a ? 1 : 0
};
cljs.core.with_meta = void 0;
cljs.core.IWithMeta["function"] = !0;
cljs.core._with_meta["function"] = function(a, b) {
  return cljs.core.with_meta.cljs$lang$arity$2 ? cljs.core.with_meta.cljs$lang$arity$2(function() {
    if(void 0 === cljs.core.t2960) {
      cljs.core.t2960 = {};
      cljs.core.t2960 = function(a, b, c) {
        this.meta = a;
        this.f = b;
        this.meta2961 = c;
        this.cljs$lang$protocol_mask$partition1$ = 0;
        this.cljs$lang$protocol_mask$partition0$ = 393217
      };
      cljs.core.t2960.cljs$lang$type = !0;
      cljs.core.t2960.cljs$lang$ctorPrSeq = function() {
        return cljs.core.list.cljs$lang$arity$1 ? cljs.core.list.cljs$lang$arity$1("cljs.core/t2960") : cljs.core.list.call(null, "cljs.core/t2960")
      };
      cljs.core.t2960.cljs$lang$ctorPrWriter = function(a, b) {
        return cljs.core._write(b, "cljs.core/t2960")
      };
      var c = cljs.core.t2960.prototype, d = function(a, b) {
        return cljs.core.apply.cljs$lang$arity$2 ? cljs.core.apply.cljs$lang$arity$2(a.f, b) : cljs.core.apply.call(null, a.f, b)
      }, e = function(a, b) {
        var a = this, c = null;
        goog.isDef(b) && (c = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
        return d.call(this, a, c)
      };
      e.cljs$lang$maxFixedArity = 1;
      e.cljs$lang$applyTo = function(a) {
        var b = cljs.core.first(a), a = cljs.core.rest(a);
        return d(b, a)
      };
      e.cljs$lang$arity$variadic = d;
      c.call = e;
      cljs.core.t2960.prototype.apply = function(a, b) {
        a = this;
        return a.call.apply(a, [a].concat(b.slice()))
      };
      cljs.core.t2960.prototype.cljs$core$Fn$ = !0;
      cljs.core.t2960.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
        return this.meta2961
      };
      cljs.core.t2960.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
        return new cljs.core.t2960(this.meta, this.f, b)
      }
    }
    return new cljs.core.t2960(b, a, null)
  }(), b) : cljs.core.with_meta.call(null, function() {
    if(void 0 === cljs.core.t2960) {
      cljs.core.t2960 = function(a, b, c) {
        this.meta = a;
        this.f = b;
        this.meta2961 = c;
        this.cljs$lang$protocol_mask$partition1$ = 0;
        this.cljs$lang$protocol_mask$partition0$ = 393217
      };
      cljs.core.t2960.cljs$lang$type = !0;
      cljs.core.t2960.cljs$lang$ctorPrSeq = function() {
        return cljs.core.list.cljs$lang$arity$1 ? cljs.core.list.cljs$lang$arity$1("cljs.core/t2960") : cljs.core.list.call(null, "cljs.core/t2960")
      };
      cljs.core.t2960.cljs$lang$ctorPrWriter = function(a, b) {
        return cljs.core._write(b, "cljs.core/t2960")
      };
      var c = cljs.core.t2960.prototype, d = function(a, b) {
        return cljs.core.apply.cljs$lang$arity$2 ? cljs.core.apply.cljs$lang$arity$2(a.f, b) : cljs.core.apply.call(null, a.f, b)
      }, e = function(a, b) {
        var a = this, c = null;
        goog.isDef(b) && (c = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
        return d.call(this, a, c)
      };
      e.cljs$lang$maxFixedArity = 1;
      e.cljs$lang$applyTo = function(a) {
        var b = cljs.core.first(a), a = cljs.core.rest(a);
        return d(b, a)
      };
      e.cljs$lang$arity$variadic = d;
      c.call = e;
      cljs.core.t2960.prototype.apply = function(a, b) {
        a = this;
        return a.call.apply(a, [a].concat(b.slice()))
      };
      cljs.core.t2960.prototype.cljs$core$Fn$ = !0;
      cljs.core.t2960.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
        return this.meta2961
      };
      cljs.core.t2960.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
        return new cljs.core.t2960(this.meta, this.f, b)
      }
    }
    return new cljs.core.t2960(b, a, null)
  }(), b)
};
cljs.core.IMeta["function"] = !0;
cljs.core._meta["function"] = function() {
  return null
};
cljs.core.Fn["function"] = !0;
cljs.core.IHash._ = !0;
cljs.core._hash._ = function(a) {
  return goog.getUid(a)
};
cljs.core.inc = function(a) {
  return a + 1
};
cljs.core.deref = void 0;
cljs.core.Reduced = function(a) {
  this.val = a;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 32768
};
cljs.core.Reduced.cljs$lang$type = !0;
cljs.core.Reduced.cljs$lang$ctorPrSeq = function() {
  return cljs.core.list.cljs$lang$arity$1 ? cljs.core.list.cljs$lang$arity$1("cljs.core/Reduced") : cljs.core.list.call(null, "cljs.core/Reduced")
};
cljs.core.Reduced.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/Reduced")
};
cljs.core.Reduced.prototype.cljs$core$IDeref$_deref$arity$1 = function() {
  return this.val
};
cljs.core.reduced = function(a) {
  return new cljs.core.Reduced(a)
};
cljs.core.reduced_QMARK_ = function(a) {
  return cljs.core.instance_QMARK_(cljs.core.Reduced, a)
};
cljs.core.ci_reduce = function() {
  var a = null, b = function(a, b) {
    var c = cljs.core._count(a);
    if(0 === c) {
      return b.cljs$lang$arity$0 ? b.cljs$lang$arity$0() : b.call(null)
    }
    for(var d = cljs.core._nth.cljs$lang$arity$2(a, 0), i = 1;;) {
      if(i < c) {
        d = b.cljs$lang$arity$2 ? b.cljs$lang$arity$2(d, cljs.core._nth.cljs$lang$arity$2(a, i)) : b.call(null, d, cljs.core._nth.cljs$lang$arity$2(a, i));
        if(cljs.core.reduced_QMARK_(d)) {
          return cljs.core.deref.cljs$lang$arity$1 ? cljs.core.deref.cljs$lang$arity$1(d) : cljs.core.deref.call(null, d)
        }
        i += 1
      }else {
        return d
      }
    }
  }, c = function(a, b, c) {
    for(var d = cljs.core._count(a), i = 0;;) {
      if(i < d) {
        c = b.cljs$lang$arity$2 ? b.cljs$lang$arity$2(c, cljs.core._nth.cljs$lang$arity$2(a, i)) : b.call(null, c, cljs.core._nth.cljs$lang$arity$2(a, i));
        if(cljs.core.reduced_QMARK_(c)) {
          return cljs.core.deref.cljs$lang$arity$1 ? cljs.core.deref.cljs$lang$arity$1(c) : cljs.core.deref.call(null, c)
        }
        i += 1
      }else {
        return c
      }
    }
  }, d = function(a, b, c, d) {
    for(var i = cljs.core._count(a);;) {
      if(d < i) {
        c = b.cljs$lang$arity$2 ? b.cljs$lang$arity$2(c, cljs.core._nth.cljs$lang$arity$2(a, d)) : b.call(null, c, cljs.core._nth.cljs$lang$arity$2(a, d));
        if(cljs.core.reduced_QMARK_(c)) {
          return cljs.core.deref.cljs$lang$arity$1 ? cljs.core.deref.cljs$lang$arity$1(c) : cljs.core.deref.call(null, c)
        }
        d += 1
      }else {
        return c
      }
    }
  }, a = function(a, f, g, h) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, f);
      case 3:
        return c.call(this, a, f, g);
      case 4:
        return d.call(this, a, f, g, h)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$2 = b;
  a.cljs$lang$arity$3 = c;
  a.cljs$lang$arity$4 = d;
  return a
}();
cljs.core.array_reduce = function() {
  var a = null, b = function(a, b) {
    var c = a.length;
    if(0 === a.length) {
      return b.cljs$lang$arity$0 ? b.cljs$lang$arity$0() : b.call(null)
    }
    for(var d = a[0], i = 1;;) {
      if(i < c) {
        d = b.cljs$lang$arity$2 ? b.cljs$lang$arity$2(d, a[i]) : b.call(null, d, a[i]);
        if(cljs.core.reduced_QMARK_(d)) {
          return cljs.core.deref.cljs$lang$arity$1 ? cljs.core.deref.cljs$lang$arity$1(d) : cljs.core.deref.call(null, d)
        }
        i += 1
      }else {
        return d
      }
    }
  }, c = function(a, b, c) {
    for(var d = a.length, i = 0;;) {
      if(i < d) {
        c = b.cljs$lang$arity$2 ? b.cljs$lang$arity$2(c, a[i]) : b.call(null, c, a[i]);
        if(cljs.core.reduced_QMARK_(c)) {
          return cljs.core.deref.cljs$lang$arity$1 ? cljs.core.deref.cljs$lang$arity$1(c) : cljs.core.deref.call(null, c)
        }
        i += 1
      }else {
        return c
      }
    }
  }, d = function(a, b, c, d) {
    for(var i = a.length;;) {
      if(d < i) {
        c = b.cljs$lang$arity$2 ? b.cljs$lang$arity$2(c, a[d]) : b.call(null, c, a[d]);
        if(cljs.core.reduced_QMARK_(c)) {
          return cljs.core.deref.cljs$lang$arity$1 ? cljs.core.deref.cljs$lang$arity$1(c) : cljs.core.deref.call(null, c)
        }
        d += 1
      }else {
        return c
      }
    }
  }, a = function(a, f, g, h) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, f);
      case 3:
        return c.call(this, a, f, g);
      case 4:
        return d.call(this, a, f, g, h)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$2 = b;
  a.cljs$lang$arity$3 = c;
  a.cljs$lang$arity$4 = d;
  return a
}();
cljs.core.hash_coll = void 0;
cljs.core.cons = void 0;
cljs.core.pr_str = void 0;
cljs.core.RSeq = void 0;
cljs.core.counted_QMARK_ = function(a) {
  return a ? cljs.core.truth_(function() {
    var b = a.cljs$lang$protocol_mask$partition0$ & 2;
    return b ? b : a.cljs$core$ICounted$
  }()) ? !0 : a.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.type_satisfies_(cljs.core.ICounted, a) : cljs.core.type_satisfies_(cljs.core.ICounted, a)
};
cljs.core.indexed_QMARK_ = function(a) {
  return a ? cljs.core.truth_(function() {
    var b = a.cljs$lang$protocol_mask$partition0$ & 16;
    return b ? b : a.cljs$core$IIndexed$
  }()) ? !0 : a.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.type_satisfies_(cljs.core.IIndexed, a) : cljs.core.type_satisfies_(cljs.core.IIndexed, a)
};
cljs.core.IndexedSeq = function(a, b) {
  this.a = a;
  this.i = b;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 166199550
};
cljs.core.IndexedSeq.cljs$lang$type = !0;
cljs.core.IndexedSeq.cljs$lang$ctorPrSeq = function() {
  return cljs.core.list.cljs$lang$arity$1 ? cljs.core.list.cljs$lang$arity$1("cljs.core/IndexedSeq") : cljs.core.list.call(null, "cljs.core/IndexedSeq")
};
cljs.core.IndexedSeq.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/IndexedSeq")
};
cljs.core.IndexedSeq.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  return cljs.core.hash_coll.cljs$lang$arity$1 ? cljs.core.hash_coll.cljs$lang$arity$1(a) : cljs.core.hash_coll.call(null, a)
};
cljs.core.IndexedSeq.prototype.cljs$core$INext$_next$arity$1 = function() {
  return this.i + 1 < this.a.length ? new cljs.core.IndexedSeq(this.a, this.i + 1) : null
};
cljs.core.IndexedSeq.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return cljs.core.cons.cljs$lang$arity$2 ? cljs.core.cons.cljs$lang$arity$2(b, a) : cljs.core.cons.call(null, b, a)
};
cljs.core.IndexedSeq.prototype.cljs$core$IReversible$_rseq$arity$1 = function(a) {
  var b = a.cljs$core$ICounted$_count$arity$1(a);
  return 0 < b ? new cljs.core.RSeq(a, b - 1, null) : cljs.core.List.EMPTY
};
cljs.core.IndexedSeq.prototype.toString = function() {
  return cljs.core.pr_str.cljs$lang$arity$1 ? cljs.core.pr_str.cljs$lang$arity$1(this) : cljs.core.pr_str.call(null, this)
};
cljs.core.IndexedSeq.prototype.cljs$core$IReduce$_reduce$arity$2 = function(a, b) {
  return cljs.core.counted_QMARK_(this.a) ? cljs.core.ci_reduce.cljs$lang$arity$4(this.a, b, this.a[this.i], this.i + 1) : cljs.core.ci_reduce.cljs$lang$arity$4(a, b, this.a[this.i], 0)
};
cljs.core.IndexedSeq.prototype.cljs$core$IReduce$_reduce$arity$3 = function(a, b, c) {
  return cljs.core.counted_QMARK_(this.a) ? cljs.core.ci_reduce.cljs$lang$arity$4(this.a, b, c, this.i) : cljs.core.ci_reduce.cljs$lang$arity$4(a, b, c, 0)
};
cljs.core.IndexedSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = function(a) {
  return a
};
cljs.core.IndexedSeq.prototype.cljs$core$ICounted$_count$arity$1 = function() {
  return this.a.length - this.i
};
cljs.core.IndexedSeq.prototype.cljs$core$ISeq$_first$arity$1 = function() {
  return this.a[this.i]
};
cljs.core.IndexedSeq.prototype.cljs$core$ISeq$_rest$arity$1 = function() {
  return this.i + 1 < this.a.length ? new cljs.core.IndexedSeq(this.a, this.i + 1) : cljs.core.list.cljs$lang$arity$0 ? cljs.core.list.cljs$lang$arity$0() : cljs.core.list.call(null)
};
cljs.core.IndexedSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_sequential.cljs$lang$arity$2 ? cljs.core.equiv_sequential.cljs$lang$arity$2(a, b) : cljs.core.equiv_sequential.call(null, a, b)
};
cljs.core.IndexedSeq.prototype.cljs$core$IIndexed$_nth$arity$2 = function(a, b) {
  var c = b + this.i;
  return c < this.a.length ? this.a[c] : null
};
cljs.core.IndexedSeq.prototype.cljs$core$IIndexed$_nth$arity$3 = function(a, b, c) {
  a = b + this.i;
  return a < this.a.length ? this.a[a] : c
};
cljs.core.IndexedSeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function() {
  return cljs.core.List.EMPTY
};
cljs.core.prim_seq = function() {
  var a = null, b = function(b) {
    return a.cljs$lang$arity$2(b, 0)
  }, c = function(a, b) {
    return b < a.length ? new cljs.core.IndexedSeq(a, b) : null
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$1 = b;
  a.cljs$lang$arity$2 = c;
  return a
}();
cljs.core.array_seq = function() {
  var a = null, b = function(a) {
    return cljs.core.prim_seq.cljs$lang$arity$2(a, 0)
  }, c = function(a, b) {
    return cljs.core.prim_seq.cljs$lang$arity$2(a, b)
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$1 = b;
  a.cljs$lang$arity$2 = c;
  return a
}();
cljs.core.IReduce.array = !0;
cljs.core._reduce.array = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return cljs.core.ci_reduce.cljs$lang$arity$2(a, c);
      case 3:
        return cljs.core.ci_reduce.cljs$lang$arity$3(a, c, d)
    }
    throw Error("Invalid arity: " + arguments.length);
  }
}();
cljs.core.ILookup.array = !0;
cljs.core._lookup.array = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return a[c];
      case 3:
        return cljs.core._nth.cljs$lang$arity$3(a, c, d)
    }
    throw Error("Invalid arity: " + arguments.length);
  }
}();
cljs.core.IIndexed.array = !0;
cljs.core._nth.array = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        var e;
        e = c < a.length ? a[c] : null;
        return e;
      case 3:
        return e = c < a.length ? a[c] : d, e
    }
    throw Error("Invalid arity: " + arguments.length);
  }
}();
cljs.core.ICounted.array = !0;
cljs.core._count.array = function(a) {
  return a.length
};
cljs.core.ISeqable.array = !0;
cljs.core._seq.array = function(a) {
  return cljs.core.array_seq.cljs$lang$arity$2(a, 0)
};
cljs.core.with_meta = void 0;
cljs.core.RSeq = function(a, b, c) {
  this.ci = a;
  this.i = b;
  this.meta = c;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 31850574
};
cljs.core.RSeq.cljs$lang$type = !0;
cljs.core.RSeq.cljs$lang$ctorPrSeq = function() {
  return cljs.core.list.cljs$lang$arity$1 ? cljs.core.list.cljs$lang$arity$1("cljs.core/RSeq") : cljs.core.list.call(null, "cljs.core/RSeq")
};
cljs.core.RSeq.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/RSeq")
};
cljs.core.RSeq.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  return cljs.core.hash_coll.cljs$lang$arity$1 ? cljs.core.hash_coll.cljs$lang$arity$1(a) : cljs.core.hash_coll.call(null, a)
};
cljs.core.RSeq.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return cljs.core.cons.cljs$lang$arity$2 ? cljs.core.cons.cljs$lang$arity$2(b, a) : cljs.core.cons.call(null, b, a)
};
cljs.core.RSeq.prototype.toString = function() {
  return cljs.core.pr_str.cljs$lang$arity$1 ? cljs.core.pr_str.cljs$lang$arity$1(this) : cljs.core.pr_str.call(null, this)
};
cljs.core.RSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = function(a) {
  return a
};
cljs.core.RSeq.prototype.cljs$core$ICounted$_count$arity$1 = function() {
  return this.i + 1
};
cljs.core.RSeq.prototype.cljs$core$ISeq$_first$arity$1 = function() {
  return cljs.core._nth.cljs$lang$arity$2(this.ci, this.i)
};
cljs.core.RSeq.prototype.cljs$core$ISeq$_rest$arity$1 = function() {
  return 0 < this.i ? new cljs.core.RSeq(this.ci, this.i - 1, null) : cljs.core.List.EMPTY
};
cljs.core.RSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_sequential.cljs$lang$arity$2 ? cljs.core.equiv_sequential.cljs$lang$arity$2(a, b) : cljs.core.equiv_sequential.call(null, a, b)
};
cljs.core.RSeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.RSeq(this.ci, this.i, b)
};
cljs.core.RSeq.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
  return this.meta
};
cljs.core.RSeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function() {
  return cljs.core.with_meta.cljs$lang$arity$2 ? cljs.core.with_meta.cljs$lang$arity$2(cljs.core.List.EMPTY, this.meta) : cljs.core.with_meta.call(null, cljs.core.List.EMPTY, this.meta)
};
cljs.core.second = function(a) {
  return cljs.core.first(cljs.core.next(a))
};
cljs.core.ffirst = function(a) {
  return cljs.core.first(cljs.core.first(a))
};
cljs.core.nfirst = function(a) {
  return cljs.core.next(cljs.core.first(a))
};
cljs.core.fnext = function(a) {
  return cljs.core.first(cljs.core.next(a))
};
cljs.core.nnext = function(a) {
  return cljs.core.next(cljs.core.next(a))
};
cljs.core.last = function(a) {
  for(;;) {
    var b = cljs.core.next(a);
    if(null != b) {
      a = b
    }else {
      return cljs.core.first(a)
    }
  }
};
cljs.core.IEquiv._ = !0;
cljs.core._equiv._ = function(a, b) {
  return a === b
};
cljs.core.conj = function() {
  var a = null, b = function(a, b) {
    return cljs.core._conj(a, b)
  }, c = function(b, c, d) {
    for(;;) {
      if(cljs.core.truth_(d)) {
        b = a.cljs$lang$arity$2(b, c), c = cljs.core.first(d), d = cljs.core.next(d)
      }else {
        return a.cljs$lang$arity$2(b, c)
      }
    }
  }, d = function(a, b, d) {
    var h = null;
    goog.isDef(d) && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return c.call(this, a, b, h)
  };
  d.cljs$lang$maxFixedArity = 2;
  d.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), d = cljs.core.first(cljs.core.next(a)), a = cljs.core.rest(cljs.core.next(a));
    return c(b, d, a)
  };
  d.cljs$lang$arity$variadic = c;
  a = function(a, c, g) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, c);
      default:
        return d.cljs$lang$arity$variadic(a, c, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = d.cljs$lang$applyTo;
  a.cljs$lang$arity$2 = b;
  a.cljs$lang$arity$variadic = d.cljs$lang$arity$variadic;
  return a
}();
cljs.core.empty = function(a) {
  return cljs.core._empty(a)
};
cljs.core.accumulating_seq_count = function(a) {
  for(var a = cljs.core.seq(a), b = 0;;) {
    if(cljs.core.counted_QMARK_(a)) {
      return b + cljs.core._count(a)
    }
    a = cljs.core.next(a);
    b += 1
  }
};
cljs.core.count = function(a) {
  return cljs.core.counted_QMARK_(a) ? cljs.core._count(a) : cljs.core.accumulating_seq_count(a)
};
cljs.core.linear_traversal_nth = function() {
  var a = null, b = function(a, b) {
    for(;;) {
      if(null == a) {
        throw Error("Index out of bounds");
      }
      if(0 === b) {
        if(cljs.core.seq(a)) {
          return cljs.core.first(a)
        }
        throw Error("Index out of bounds");
      }
      if(cljs.core.indexed_QMARK_(a)) {
        return cljs.core._nth.cljs$lang$arity$2(a, b)
      }
      if(cljs.core.seq(a)) {
        var c = cljs.core.next(a), g = b - 1, a = c, b = g
      }else {
        throw Error("Index out of bounds");
      }
    }
  }, c = function(a, b, c) {
    for(;;) {
      if(null == a) {
        return c
      }
      if(0 === b) {
        return cljs.core.seq(a) ? cljs.core.first(a) : c
      }
      if(cljs.core.indexed_QMARK_(a)) {
        return cljs.core._nth.cljs$lang$arity$3(a, b, c)
      }
      if(cljs.core.seq(a)) {
        a = cljs.core.next(a), b -= 1
      }else {
        return c
      }
    }
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$2 = b;
  a.cljs$lang$arity$3 = c;
  return a
}();
cljs.core.nth = function() {
  var a = null, b = function(a, b) {
    return null == a ? null : cljs.core.truth_(a ? cljs.core.truth_(function() {
      var b = a.cljs$lang$protocol_mask$partition0$ & 16;
      return b ? b : a.cljs$core$IIndexed$
    }()) ? !0 : a.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.type_satisfies_(cljs.core.IIndexed, a) : cljs.core.type_satisfies_(cljs.core.IIndexed, a)) ? cljs.core._nth.cljs$lang$arity$2(a, Math.floor(b)) : cljs.core.linear_traversal_nth.cljs$lang$arity$2(a, Math.floor(b))
  }, c = function(a, b, c) {
    return null != a ? cljs.core.truth_(a ? cljs.core.truth_(function() {
      var b = a.cljs$lang$protocol_mask$partition0$ & 16;
      return b ? b : a.cljs$core$IIndexed$
    }()) ? !0 : a.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.type_satisfies_(cljs.core.IIndexed, a) : cljs.core.type_satisfies_(cljs.core.IIndexed, a)) ? cljs.core._nth.cljs$lang$arity$3(a, Math.floor(b), c) : cljs.core.linear_traversal_nth.cljs$lang$arity$3(a, Math.floor(b), c) : c
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$2 = b;
  a.cljs$lang$arity$3 = c;
  return a
}();
cljs.core.get = function() {
  var a = null, b = function(a, b) {
    return cljs.core._lookup.cljs$lang$arity$2(a, b)
  }, c = function(a, b, c) {
    return cljs.core._lookup.cljs$lang$arity$3(a, b, c)
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$2 = b;
  a.cljs$lang$arity$3 = c;
  return a
}();
cljs.core.assoc = function() {
  var a = null, b = function(a, b, c) {
    return cljs.core._assoc(a, b, c)
  }, c = function(b, c, d, h) {
    for(;;) {
      if(b = a.cljs$lang$arity$3(b, c, d), cljs.core.truth_(h)) {
        c = cljs.core.first(h), d = cljs.core.second(h), h = cljs.core.nnext(h)
      }else {
        return b
      }
    }
  }, d = function(a, b, d, h) {
    var i = null;
    goog.isDef(h) && (i = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
    return c.call(this, a, b, d, i)
  };
  d.cljs$lang$maxFixedArity = 3;
  d.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), d = cljs.core.first(cljs.core.next(a)), h = cljs.core.first(cljs.core.next(cljs.core.next(a))), a = cljs.core.rest(cljs.core.next(cljs.core.next(a)));
    return c(b, d, h, a)
  };
  d.cljs$lang$arity$variadic = c;
  a = function(a, c, g, h) {
    switch(arguments.length) {
      case 3:
        return b.call(this, a, c, g);
      default:
        return d.cljs$lang$arity$variadic(a, c, g, cljs.core.array_seq(arguments, 3))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 3;
  a.cljs$lang$applyTo = d.cljs$lang$applyTo;
  a.cljs$lang$arity$3 = b;
  a.cljs$lang$arity$variadic = d.cljs$lang$arity$variadic;
  return a
}();
cljs.core.dissoc = function() {
  var a = null, b = function(a, b) {
    return cljs.core._dissoc(a, b)
  }, c = function(b, c, d) {
    for(;;) {
      if(b = a.cljs$lang$arity$2(b, c), cljs.core.truth_(d)) {
        c = cljs.core.first(d), d = cljs.core.next(d)
      }else {
        return b
      }
    }
  }, d = function(a, b, d) {
    var h = null;
    goog.isDef(d) && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return c.call(this, a, b, h)
  };
  d.cljs$lang$maxFixedArity = 2;
  d.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), d = cljs.core.first(cljs.core.next(a)), a = cljs.core.rest(cljs.core.next(a));
    return c(b, d, a)
  };
  d.cljs$lang$arity$variadic = c;
  a = function(a, c, g) {
    switch(arguments.length) {
      case 1:
        return a;
      case 2:
        return b.call(this, a, c);
      default:
        return d.cljs$lang$arity$variadic(a, c, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = d.cljs$lang$applyTo;
  a.cljs$lang$arity$1 = function(a) {
    return a
  };
  a.cljs$lang$arity$2 = b;
  a.cljs$lang$arity$variadic = d.cljs$lang$arity$variadic;
  return a
}();
cljs.core.with_meta = function(a, b) {
  return cljs.core._with_meta(a, b)
};
cljs.core.meta = function(a) {
  return cljs.core.truth_(a ? cljs.core.truth_(function() {
    var b = a.cljs$lang$protocol_mask$partition0$ & 131072;
    return b ? b : a.cljs$core$IMeta$
  }()) ? !0 : a.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.type_satisfies_(cljs.core.IMeta, a) : cljs.core.type_satisfies_(cljs.core.IMeta, a)) ? cljs.core._meta(a) : null
};
cljs.core.peek = function(a) {
  return cljs.core._peek(a)
};
cljs.core.pop = function(a) {
  return cljs.core._pop(a)
};
cljs.core.disj = function() {
  var a = null, b = function(a, b) {
    return cljs.core._disjoin(a, b)
  }, c = function(b, c, d) {
    for(;;) {
      if(b = a.cljs$lang$arity$2(b, c), cljs.core.truth_(d)) {
        c = cljs.core.first(d), d = cljs.core.next(d)
      }else {
        return b
      }
    }
  }, d = function(a, b, d) {
    var h = null;
    goog.isDef(d) && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return c.call(this, a, b, h)
  };
  d.cljs$lang$maxFixedArity = 2;
  d.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), d = cljs.core.first(cljs.core.next(a)), a = cljs.core.rest(cljs.core.next(a));
    return c(b, d, a)
  };
  d.cljs$lang$arity$variadic = c;
  a = function(a, c, g) {
    switch(arguments.length) {
      case 1:
        return a;
      case 2:
        return b.call(this, a, c);
      default:
        return d.cljs$lang$arity$variadic(a, c, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = d.cljs$lang$applyTo;
  a.cljs$lang$arity$1 = function(a) {
    return a
  };
  a.cljs$lang$arity$2 = b;
  a.cljs$lang$arity$variadic = d.cljs$lang$arity$variadic;
  return a
}();
cljs.core.string_hash_cache = {};
cljs.core.string_hash_cache_count = 0;
cljs.core.add_to_string_hash_cache = function(a) {
  var b = goog.string.hashCode(a);
  cljs.core.string_hash_cache[a] = b;
  cljs.core.string_hash_cache_count += 1;
  return b
};
cljs.core.check_string_hash_cache = function(a) {
  255 < cljs.core.string_hash_cache_count && (cljs.core.string_hash_cache = {}, cljs.core.string_hash_cache_count = 0);
  var b = cljs.core.string_hash_cache[a];
  return null != b ? b : cljs.core.add_to_string_hash_cache(a)
};
cljs.core.hash = function() {
  var a = null, b = function(b) {
    return a.cljs$lang$arity$2(b, !0)
  }, c = function(a, b) {
    return cljs.core.truth_(function() {
      var c = goog.isString(a);
      return c ? b : c
    }()) ? cljs.core.check_string_hash_cache(a) : cljs.core._hash(a)
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$1 = b;
  a.cljs$lang$arity$2 = c;
  return a
}();
cljs.core.empty_QMARK_ = function(a) {
  var b = null == a;
  return b ? b : cljs.core.not(cljs.core.seq(a))
};
cljs.core.coll_QMARK_ = function(a) {
  return null == a ? !1 : a ? cljs.core.truth_(function() {
    var b = a.cljs$lang$protocol_mask$partition0$ & 8;
    return b ? b : a.cljs$core$ICollection$
  }()) ? !0 : a.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.type_satisfies_(cljs.core.ICollection, a) : cljs.core.type_satisfies_(cljs.core.ICollection, a)
};
cljs.core.set_QMARK_ = function(a) {
  return null == a ? !1 : a ? cljs.core.truth_(function() {
    var b = a.cljs$lang$protocol_mask$partition0$ & 4096;
    return b ? b : a.cljs$core$ISet$
  }()) ? !0 : a.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.type_satisfies_(cljs.core.ISet, a) : cljs.core.type_satisfies_(cljs.core.ISet, a)
};
cljs.core.associative_QMARK_ = function(a) {
  return a ? cljs.core.truth_(function() {
    var b = a.cljs$lang$protocol_mask$partition0$ & 512;
    return b ? b : a.cljs$core$IAssociative$
  }()) ? !0 : a.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.type_satisfies_(cljs.core.IAssociative, a) : cljs.core.type_satisfies_(cljs.core.IAssociative, a)
};
cljs.core.sequential_QMARK_ = function(a) {
  return a ? cljs.core.truth_(function() {
    var b = a.cljs$lang$protocol_mask$partition0$ & 16777216;
    return b ? b : a.cljs$core$ISequential$
  }()) ? !0 : a.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.type_satisfies_(cljs.core.ISequential, a) : cljs.core.type_satisfies_(cljs.core.ISequential, a)
};
cljs.core.reduceable_QMARK_ = function(a) {
  return a ? cljs.core.truth_(function() {
    var b = a.cljs$lang$protocol_mask$partition0$ & 524288;
    return b ? b : a.cljs$core$IReduce$
  }()) ? !0 : a.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.type_satisfies_(cljs.core.IReduce, a) : cljs.core.type_satisfies_(cljs.core.IReduce, a)
};
cljs.core.map_QMARK_ = function(a) {
  return null == a ? !1 : a ? cljs.core.truth_(function() {
    var b = a.cljs$lang$protocol_mask$partition0$ & 1024;
    return b ? b : a.cljs$core$IMap$
  }()) ? !0 : a.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.type_satisfies_(cljs.core.IMap, a) : cljs.core.type_satisfies_(cljs.core.IMap, a)
};
cljs.core.vector_QMARK_ = function(a) {
  return a ? cljs.core.truth_(function() {
    var b = a.cljs$lang$protocol_mask$partition0$ & 16384;
    return b ? b : a.cljs$core$IVector$
  }()) ? !0 : a.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.type_satisfies_(cljs.core.IVector, a) : cljs.core.type_satisfies_(cljs.core.IVector, a)
};
cljs.core.chunked_seq_QMARK_ = function(a) {
  return a ? cljs.core.truth_(function() {
    var b = a.cljs$lang$protocol_mask$partition1$ & 512;
    return b ? b : a.cljs$core$IChunkedSeq$
  }()) ? !0 : a.cljs$lang$protocol_mask$partition1$ ? !1 : cljs.core.type_satisfies_(cljs.core.IChunkedSeq, a) : cljs.core.type_satisfies_(cljs.core.IChunkedSeq, a)
};
cljs.core.js_obj = function() {
  var a = null, b = function(a) {
    return cljs.core.apply.cljs$lang$arity$2 ? cljs.core.apply.cljs$lang$arity$2(goog.object.create, a) : cljs.core.apply.call(null, goog.object.create, a)
  }, c = function(a) {
    var c = null;
    goog.isDef(a) && (c = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return b.call(this, c)
  };
  c.cljs$lang$maxFixedArity = 0;
  c.cljs$lang$applyTo = function(a) {
    a = cljs.core.seq(a);
    return b(a)
  };
  c.cljs$lang$arity$variadic = b;
  a = function(a) {
    switch(arguments.length) {
      case 0:
        return{};
      default:
        return c.cljs$lang$arity$variadic(cljs.core.array_seq(arguments, 0))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 0;
  a.cljs$lang$applyTo = c.cljs$lang$applyTo;
  a.cljs$lang$arity$0 = function() {
    return{}
  };
  a.cljs$lang$arity$variadic = c.cljs$lang$arity$variadic;
  return a
}();
cljs.core.js_keys = function(a) {
  var b = [];
  goog.object.forEach(a, function(a, d) {
    return b.push(d)
  });
  return b
};
cljs.core.js_delete = function(a, b) {
  return delete a[b]
};
cljs.core.array_copy = function(a, b, c, d, e) {
  for(;;) {
    if(0 === e) {
      return c
    }
    c[d] = a[b];
    d += 1;
    e -= 1;
    b += 1
  }
};
cljs.core.array_copy_downward = function(a, b, c, d, e) {
  b += e - 1;
  for(d += e - 1;;) {
    if(0 === e) {
      return c
    }
    c[d] = a[b];
    d -= 1;
    e -= 1;
    b -= 1
  }
};
cljs.core.lookup_sentinel = {};
cljs.core.false_QMARK_ = function(a) {
  return!1 === a
};
cljs.core.true_QMARK_ = function(a) {
  return!0 === a
};
cljs.core.undefined_QMARK_ = function(a) {
  return void 0 === a
};
cljs.core.seq_QMARK_ = function(a) {
  return null == a ? !1 : a ? cljs.core.truth_(function() {
    var b = a.cljs$lang$protocol_mask$partition0$ & 64;
    return b ? b : a.cljs$core$ISeq$
  }()) ? !0 : a.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.type_satisfies_(cljs.core.ISeq, a) : cljs.core.type_satisfies_(cljs.core.ISeq, a)
};
cljs.core.seqable_QMARK_ = function(a) {
  return a ? cljs.core.truth_(function() {
    var b = a.cljs$lang$protocol_mask$partition0$ & 8388608;
    return b ? b : a.cljs$core$ISeqable$
  }()) ? !0 : a.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.type_satisfies_(cljs.core.ISeqable, a) : cljs.core.type_satisfies_(cljs.core.ISeqable, a)
};
cljs.core.boolean$ = function(a) {
  return cljs.core.truth_(a) ? !0 : !1
};
cljs.core.string_QMARK_ = function(a) {
  var b = goog.isString(a);
  return b ? cljs.core.not(function() {
    var b = "\ufdd0" === a.charAt(0);
    return b ? b : "\ufdd1" === a.charAt(0)
  }()) : b
};
cljs.core.keyword_QMARK_ = function(a) {
  var b = goog.isString(a);
  return b ? "\ufdd0" === a.charAt(0) : b
};
cljs.core.symbol_QMARK_ = function(a) {
  var b = goog.isString(a);
  return b ? "\ufdd1" === a.charAt(0) : b
};
cljs.core.number_QMARK_ = function(a) {
  return goog.isNumber(a)
};
cljs.core.fn_QMARK_ = function(a) {
  var b = goog.isFunction(a);
  return b ? b : a ? cljs.core.truth_(cljs.core.truth_(null) ? null : a.cljs$core$Fn$) ? !0 : a.cljs$lang$protocol_mask$partition$ ? !1 : cljs.core.type_satisfies_(cljs.core.Fn, a) : cljs.core.type_satisfies_(cljs.core.Fn, a)
};
cljs.core.ifn_QMARK_ = function(a) {
  var b = cljs.core.fn_QMARK_(a);
  return b ? b : a ? cljs.core.truth_(function() {
    var b = a.cljs$lang$protocol_mask$partition0$ & 1;
    return b ? b : a.cljs$core$IFn$
  }()) ? !0 : a.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.type_satisfies_(cljs.core.IFn, a) : cljs.core.type_satisfies_(cljs.core.IFn, a)
};
cljs.core.integer_QMARK_ = function(a) {
  var b = cljs.core.number_QMARK_(a);
  return b && (b = !isNaN(a)) ? (b = Infinity !== a) ? parseFloat(a) === parseInt(a, 10) : b : b
};
cljs.core.contains_QMARK_ = function(a, b) {
  return cljs.core._lookup.cljs$lang$arity$3(a, b, cljs.core.lookup_sentinel) === cljs.core.lookup_sentinel ? !1 : !0
};
cljs.core.find = function(a, b) {
  return cljs.core.truth_(function() {
    var c = null != a;
    return c ? (c = cljs.core.associative_QMARK_(a)) ? cljs.core.contains_QMARK_(a, b) : c : c
  }()) ? cljs.core.PersistentVector.fromArray([b, cljs.core._lookup.cljs$lang$arity$2(a, b)], !0) : null
};
cljs.core.distinct_QMARK_ = function() {
  var a = null, b = function(a, b) {
    return!cljs.core._EQ_.cljs$lang$arity$2(a, b)
  }, c = function(a, b, c) {
    if(cljs.core._EQ_.cljs$lang$arity$2(a, b)) {
      return!1
    }
    a = cljs.core.PersistentHashSet.fromArray([b, a]);
    for(b = c;;) {
      var d = cljs.core.first(b), c = cljs.core.next(b);
      if(cljs.core.truth_(b)) {
        if(cljs.core.contains_QMARK_(a, d)) {
          return!1
        }
        a = cljs.core.conj.cljs$lang$arity$2(a, d);
        b = c
      }else {
        return!0
      }
    }
  }, d = function(a, b, d) {
    var h = null;
    goog.isDef(d) && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return c.call(this, a, b, h)
  };
  d.cljs$lang$maxFixedArity = 2;
  d.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), d = cljs.core.first(cljs.core.next(a)), a = cljs.core.rest(cljs.core.next(a));
    return c(b, d, a)
  };
  d.cljs$lang$arity$variadic = c;
  a = function(a, c, g) {
    switch(arguments.length) {
      case 1:
        return!0;
      case 2:
        return b.call(this, a, c);
      default:
        return d.cljs$lang$arity$variadic(a, c, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = d.cljs$lang$applyTo;
  a.cljs$lang$arity$1 = function() {
    return!0
  };
  a.cljs$lang$arity$2 = b;
  a.cljs$lang$arity$variadic = d.cljs$lang$arity$variadic;
  return a
}();
cljs.core.compare = function(a, b) {
  if(a === b) {
    return 0
  }
  if(null == a) {
    return-1
  }
  if(null == b) {
    return 1
  }
  if(cljs.core.type(a) === cljs.core.type(b)) {
    return cljs.core.truth_(a ? cljs.core.truth_(function() {
      var b = a.cljs$lang$protocol_mask$partition1$ & 2048;
      return b ? b : a.cljs$core$IComparable$
    }()) ? !0 : a.cljs$lang$protocol_mask$partition1$ ? !1 : cljs.core.type_satisfies_(cljs.core.IComparable, a) : cljs.core.type_satisfies_(cljs.core.IComparable, a)) ? cljs.core._compare(a, b) : goog.array.defaultCompare(a, b)
  }
  throw Error("compare on non-nil objects of different types");
};
cljs.core.compare_indexed = function() {
  var a = null, b = function(b, c) {
    var f = cljs.core.count(b), g = cljs.core.count(c);
    return f < g ? -1 : f > g ? 1 : a.cljs$lang$arity$4(b, c, f, 0)
  }, c = function(a, b, c, g) {
    for(;;) {
      var h = cljs.core.compare(cljs.core.nth.cljs$lang$arity$2(a, g), cljs.core.nth.cljs$lang$arity$2(b, g));
      if(cljs.core.truth_(function() {
        var a = 0 === h;
        return a ? g + 1 < c : a
      }())) {
        g += 1
      }else {
        return h
      }
    }
  }, a = function(a, e, f, g) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 4:
        return c.call(this, a, e, f, g)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$2 = b;
  a.cljs$lang$arity$4 = c;
  return a
}();
cljs.core.fn__GT_comparator = function(a) {
  return cljs.core._EQ_.cljs$lang$arity$2(a, cljs.core.compare) ? cljs.core.compare : function(b, c) {
    var d = a.cljs$lang$arity$2 ? a.cljs$lang$arity$2(b, c) : a.call(null, b, c);
    return cljs.core.number_QMARK_(d) ? d : cljs.core.truth_(d) ? -1 : cljs.core.truth_(a.cljs$lang$arity$2 ? a.cljs$lang$arity$2(c, b) : a.call(null, c, b)) ? 1 : 0
  }
};
cljs.core.to_array = void 0;
cljs.core.sort = function() {
  var a = null, b = function(b) {
    return a.cljs$lang$arity$2(cljs.core.compare, b)
  }, c = function(a, b) {
    if(cljs.core.seq(b)) {
      var c = cljs.core.to_array.cljs$lang$arity$1 ? cljs.core.to_array.cljs$lang$arity$1(b) : cljs.core.to_array.call(null, b);
      goog.array.stableSort(c, cljs.core.fn__GT_comparator(a));
      return cljs.core.seq(c)
    }
    return cljs.core.List.EMPTY
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$1 = b;
  a.cljs$lang$arity$2 = c;
  return a
}();
cljs.core.sort_by = function() {
  var a = null, b = function(b, c) {
    return a.cljs$lang$arity$3(b, cljs.core.compare, c)
  }, c = function(a, b, c) {
    return cljs.core.sort.cljs$lang$arity$2(function(c, f) {
      return cljs.core.fn__GT_comparator(b).call(null, a.cljs$lang$arity$1 ? a.cljs$lang$arity$1(c) : a.call(null, c), a.cljs$lang$arity$1 ? a.cljs$lang$arity$1(f) : a.call(null, f))
    }, c)
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$2 = b;
  a.cljs$lang$arity$3 = c;
  return a
}();
cljs.core.seq_reduce = function() {
  var a = null, b = function(a, b) {
    var c = cljs.core.seq(b);
    return c ? cljs.core.reduce.cljs$lang$arity$3 ? cljs.core.reduce.cljs$lang$arity$3(a, cljs.core.first(c), cljs.core.next(c)) : cljs.core.reduce.call(null, a, cljs.core.first(c), cljs.core.next(c)) : a.cljs$lang$arity$0 ? a.cljs$lang$arity$0() : a.call(null)
  }, c = function(a, b, c) {
    for(c = cljs.core.seq(c);;) {
      if(c) {
        b = a.cljs$lang$arity$2 ? a.cljs$lang$arity$2(b, cljs.core.first(c)) : a.call(null, b, cljs.core.first(c));
        if(cljs.core.reduced_QMARK_(b)) {
          return cljs.core.deref.cljs$lang$arity$1 ? cljs.core.deref.cljs$lang$arity$1(b) : cljs.core.deref.call(null, b)
        }
        c = cljs.core.next(c)
      }else {
        return b
      }
    }
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$2 = b;
  a.cljs$lang$arity$3 = c;
  return a
}();
cljs.core.vec = void 0;
cljs.core.shuffle = function(a) {
  a = cljs.core.to_array.cljs$lang$arity$1 ? cljs.core.to_array.cljs$lang$arity$1(a) : cljs.core.to_array.call(null, a);
  goog.array.shuffle(a);
  return cljs.core.vec.cljs$lang$arity$1 ? cljs.core.vec.cljs$lang$arity$1(a) : cljs.core.vec.call(null, a)
};
cljs.core.reduce = function() {
  var a = null, b = function(a, b) {
    return cljs.core.truth_(b ? cljs.core.truth_(function() {
      var a = b.cljs$lang$protocol_mask$partition0$ & 524288;
      return a ? a : b.cljs$core$IReduce$
    }()) ? !0 : b.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.type_satisfies_(cljs.core.IReduce, b) : cljs.core.type_satisfies_(cljs.core.IReduce, b)) ? cljs.core._reduce.cljs$lang$arity$2(b, a) : cljs.core.seq_reduce.cljs$lang$arity$2(a, b)
  }, c = function(a, b, c) {
    return cljs.core.truth_(c ? cljs.core.truth_(function() {
      var a = c.cljs$lang$protocol_mask$partition0$ & 524288;
      return a ? a : c.cljs$core$IReduce$
    }()) ? !0 : c.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.type_satisfies_(cljs.core.IReduce, c) : cljs.core.type_satisfies_(cljs.core.IReduce, c)) ? cljs.core._reduce.cljs$lang$arity$3(c, a, b) : cljs.core.seq_reduce.cljs$lang$arity$3(a, b, c)
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$2 = b;
  a.cljs$lang$arity$3 = c;
  return a
}();
cljs.core.reduce_kv = function(a, b, c) {
  return cljs.core._kv_reduce(c, a, b)
};
cljs.core._PLUS_ = function() {
  var a = null, b = function(b, c, f) {
    return cljs.core.reduce.cljs$lang$arity$3(a, b + c, f)
  }, c = function(a, c, f) {
    var g = null;
    goog.isDef(f) && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return b.call(this, a, c, g)
  };
  c.cljs$lang$maxFixedArity = 2;
  c.cljs$lang$applyTo = function(a) {
    var c = cljs.core.first(a), f = cljs.core.first(cljs.core.next(a)), a = cljs.core.rest(cljs.core.next(a));
    return b(c, f, a)
  };
  c.cljs$lang$arity$variadic = b;
  a = function(a, b, f) {
    switch(arguments.length) {
      case 0:
        return 0;
      case 1:
        return a;
      case 2:
        return a + b;
      default:
        return c.cljs$lang$arity$variadic(a, b, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = c.cljs$lang$applyTo;
  a.cljs$lang$arity$0 = function() {
    return 0
  };
  a.cljs$lang$arity$1 = function(a) {
    return a
  };
  a.cljs$lang$arity$2 = function(a, b) {
    return a + b
  };
  a.cljs$lang$arity$variadic = c.cljs$lang$arity$variadic;
  return a
}();
cljs.core._ = function() {
  var a = null, b = function(b, c, f) {
    return cljs.core.reduce.cljs$lang$arity$3(a, b - c, f)
  }, c = function(a, c, f) {
    var g = null;
    goog.isDef(f) && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return b.call(this, a, c, g)
  };
  c.cljs$lang$maxFixedArity = 2;
  c.cljs$lang$applyTo = function(a) {
    var c = cljs.core.first(a), f = cljs.core.first(cljs.core.next(a)), a = cljs.core.rest(cljs.core.next(a));
    return b(c, f, a)
  };
  c.cljs$lang$arity$variadic = b;
  a = function(a, b, f) {
    switch(arguments.length) {
      case 1:
        return-a;
      case 2:
        return a - b;
      default:
        return c.cljs$lang$arity$variadic(a, b, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = c.cljs$lang$applyTo;
  a.cljs$lang$arity$1 = function(a) {
    return-a
  };
  a.cljs$lang$arity$2 = function(a, b) {
    return a - b
  };
  a.cljs$lang$arity$variadic = c.cljs$lang$arity$variadic;
  return a
}();
cljs.core._STAR_ = function() {
  var a = null, b = function(b, c, f) {
    return cljs.core.reduce.cljs$lang$arity$3(a, b * c, f)
  }, c = function(a, c, f) {
    var g = null;
    goog.isDef(f) && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return b.call(this, a, c, g)
  };
  c.cljs$lang$maxFixedArity = 2;
  c.cljs$lang$applyTo = function(a) {
    var c = cljs.core.first(a), f = cljs.core.first(cljs.core.next(a)), a = cljs.core.rest(cljs.core.next(a));
    return b(c, f, a)
  };
  c.cljs$lang$arity$variadic = b;
  a = function(a, b, f) {
    switch(arguments.length) {
      case 0:
        return 1;
      case 1:
        return a;
      case 2:
        return a * b;
      default:
        return c.cljs$lang$arity$variadic(a, b, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = c.cljs$lang$applyTo;
  a.cljs$lang$arity$0 = function() {
    return 1
  };
  a.cljs$lang$arity$1 = function(a) {
    return a
  };
  a.cljs$lang$arity$2 = function(a, b) {
    return a * b
  };
  a.cljs$lang$arity$variadic = c.cljs$lang$arity$variadic;
  return a
}();
cljs.core._SLASH_ = function() {
  var a = null, b = function(b) {
    return a.cljs$lang$arity$2(1, b)
  }, c = function(b, c, d) {
    return cljs.core.reduce.cljs$lang$arity$3(a, a.cljs$lang$arity$2(b, c), d)
  }, d = function(a, b, d) {
    var h = null;
    goog.isDef(d) && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return c.call(this, a, b, h)
  };
  d.cljs$lang$maxFixedArity = 2;
  d.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), d = cljs.core.first(cljs.core.next(a)), a = cljs.core.rest(cljs.core.next(a));
    return c(b, d, a)
  };
  d.cljs$lang$arity$variadic = c;
  a = function(a, c, g) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return a / c;
      default:
        return d.cljs$lang$arity$variadic(a, c, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = d.cljs$lang$applyTo;
  a.cljs$lang$arity$1 = b;
  a.cljs$lang$arity$2 = function(a, b) {
    return a / b
  };
  a.cljs$lang$arity$variadic = d.cljs$lang$arity$variadic;
  return a
}();
cljs.core._LT_ = function() {
  var a = null, b = function(a, b, c) {
    for(;;) {
      if(a < b) {
        if(cljs.core.next(c)) {
          a = b, b = cljs.core.first(c), c = cljs.core.next(c)
        }else {
          return b < cljs.core.first(c)
        }
      }else {
        return!1
      }
    }
  }, c = function(a, c, f) {
    var g = null;
    goog.isDef(f) && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return b.call(this, a, c, g)
  };
  c.cljs$lang$maxFixedArity = 2;
  c.cljs$lang$applyTo = function(a) {
    var c = cljs.core.first(a), f = cljs.core.first(cljs.core.next(a)), a = cljs.core.rest(cljs.core.next(a));
    return b(c, f, a)
  };
  c.cljs$lang$arity$variadic = b;
  a = function(a, b, f) {
    switch(arguments.length) {
      case 1:
        return!0;
      case 2:
        return a < b;
      default:
        return c.cljs$lang$arity$variadic(a, b, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = c.cljs$lang$applyTo;
  a.cljs$lang$arity$1 = function() {
    return!0
  };
  a.cljs$lang$arity$2 = function(a, b) {
    return a < b
  };
  a.cljs$lang$arity$variadic = c.cljs$lang$arity$variadic;
  return a
}();
cljs.core._LT__EQ_ = function() {
  var a = null, b = function(a, b, c) {
    for(;;) {
      if(a <= b) {
        if(cljs.core.next(c)) {
          a = b, b = cljs.core.first(c), c = cljs.core.next(c)
        }else {
          return b <= cljs.core.first(c)
        }
      }else {
        return!1
      }
    }
  }, c = function(a, c, f) {
    var g = null;
    goog.isDef(f) && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return b.call(this, a, c, g)
  };
  c.cljs$lang$maxFixedArity = 2;
  c.cljs$lang$applyTo = function(a) {
    var c = cljs.core.first(a), f = cljs.core.first(cljs.core.next(a)), a = cljs.core.rest(cljs.core.next(a));
    return b(c, f, a)
  };
  c.cljs$lang$arity$variadic = b;
  a = function(a, b, f) {
    switch(arguments.length) {
      case 1:
        return!0;
      case 2:
        return a <= b;
      default:
        return c.cljs$lang$arity$variadic(a, b, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = c.cljs$lang$applyTo;
  a.cljs$lang$arity$1 = function() {
    return!0
  };
  a.cljs$lang$arity$2 = function(a, b) {
    return a <= b
  };
  a.cljs$lang$arity$variadic = c.cljs$lang$arity$variadic;
  return a
}();
cljs.core._GT_ = function() {
  var a = null, b = function(a, b, c) {
    for(;;) {
      if(a > b) {
        if(cljs.core.next(c)) {
          a = b, b = cljs.core.first(c), c = cljs.core.next(c)
        }else {
          return b > cljs.core.first(c)
        }
      }else {
        return!1
      }
    }
  }, c = function(a, c, f) {
    var g = null;
    goog.isDef(f) && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return b.call(this, a, c, g)
  };
  c.cljs$lang$maxFixedArity = 2;
  c.cljs$lang$applyTo = function(a) {
    var c = cljs.core.first(a), f = cljs.core.first(cljs.core.next(a)), a = cljs.core.rest(cljs.core.next(a));
    return b(c, f, a)
  };
  c.cljs$lang$arity$variadic = b;
  a = function(a, b, f) {
    switch(arguments.length) {
      case 1:
        return!0;
      case 2:
        return a > b;
      default:
        return c.cljs$lang$arity$variadic(a, b, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = c.cljs$lang$applyTo;
  a.cljs$lang$arity$1 = function() {
    return!0
  };
  a.cljs$lang$arity$2 = function(a, b) {
    return a > b
  };
  a.cljs$lang$arity$variadic = c.cljs$lang$arity$variadic;
  return a
}();
cljs.core._GT__EQ_ = function() {
  var a = null, b = function(a, b, c) {
    for(;;) {
      if(a >= b) {
        if(cljs.core.next(c)) {
          a = b, b = cljs.core.first(c), c = cljs.core.next(c)
        }else {
          return b >= cljs.core.first(c)
        }
      }else {
        return!1
      }
    }
  }, c = function(a, c, f) {
    var g = null;
    goog.isDef(f) && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return b.call(this, a, c, g)
  };
  c.cljs$lang$maxFixedArity = 2;
  c.cljs$lang$applyTo = function(a) {
    var c = cljs.core.first(a), f = cljs.core.first(cljs.core.next(a)), a = cljs.core.rest(cljs.core.next(a));
    return b(c, f, a)
  };
  c.cljs$lang$arity$variadic = b;
  a = function(a, b, f) {
    switch(arguments.length) {
      case 1:
        return!0;
      case 2:
        return a >= b;
      default:
        return c.cljs$lang$arity$variadic(a, b, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = c.cljs$lang$applyTo;
  a.cljs$lang$arity$1 = function() {
    return!0
  };
  a.cljs$lang$arity$2 = function(a, b) {
    return a >= b
  };
  a.cljs$lang$arity$variadic = c.cljs$lang$arity$variadic;
  return a
}();
cljs.core.dec = function(a) {
  return a - 1
};
cljs.core.max = function() {
  var a = null, b = function(a, b) {
    return a > b ? a : b
  }, c = function(b, c, d) {
    return cljs.core.reduce.cljs$lang$arity$3(a, b > c ? b : c, d)
  }, d = function(a, b, d) {
    var h = null;
    goog.isDef(d) && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return c.call(this, a, b, h)
  };
  d.cljs$lang$maxFixedArity = 2;
  d.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), d = cljs.core.first(cljs.core.next(a)), a = cljs.core.rest(cljs.core.next(a));
    return c(b, d, a)
  };
  d.cljs$lang$arity$variadic = c;
  a = function(a, c, g) {
    switch(arguments.length) {
      case 1:
        return a;
      case 2:
        return b.call(this, a, c);
      default:
        return d.cljs$lang$arity$variadic(a, c, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = d.cljs$lang$applyTo;
  a.cljs$lang$arity$1 = function(a) {
    return a
  };
  a.cljs$lang$arity$2 = b;
  a.cljs$lang$arity$variadic = d.cljs$lang$arity$variadic;
  return a
}();
cljs.core.min = function() {
  var a = null, b = function(a, b) {
    return a < b ? a : b
  }, c = function(b, c, d) {
    return cljs.core.reduce.cljs$lang$arity$3(a, b < c ? b : c, d)
  }, d = function(a, b, d) {
    var h = null;
    goog.isDef(d) && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return c.call(this, a, b, h)
  };
  d.cljs$lang$maxFixedArity = 2;
  d.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), d = cljs.core.first(cljs.core.next(a)), a = cljs.core.rest(cljs.core.next(a));
    return c(b, d, a)
  };
  d.cljs$lang$arity$variadic = c;
  a = function(a, c, g) {
    switch(arguments.length) {
      case 1:
        return a;
      case 2:
        return b.call(this, a, c);
      default:
        return d.cljs$lang$arity$variadic(a, c, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = d.cljs$lang$applyTo;
  a.cljs$lang$arity$1 = function(a) {
    return a
  };
  a.cljs$lang$arity$2 = b;
  a.cljs$lang$arity$variadic = d.cljs$lang$arity$variadic;
  return a
}();
cljs.core.fix = function(a) {
  return 0 <= a ? Math.floor.cljs$lang$arity$1 ? Math.floor.cljs$lang$arity$1(a) : Math.floor.call(null, a) : Math.ceil.cljs$lang$arity$1 ? Math.ceil.cljs$lang$arity$1(a) : Math.ceil.call(null, a)
};
cljs.core.int$ = function(a) {
  return cljs.core.fix(a)
};
cljs.core.long$ = function(a) {
  return cljs.core.fix(a)
};
cljs.core.js_mod = function(a, b) {
  return a % b
};
cljs.core.mod = function(a, b) {
  return(a % b + b) % b
};
cljs.core.quot = function(a, b) {
  return cljs.core.fix((a - a % b) / b)
};
cljs.core.rem = function(a, b) {
  var c = cljs.core.quot(a, b);
  return a - b * c
};
cljs.core.rand = function() {
  var a = null, b = function() {
    return Math.random.cljs$lang$arity$0 ? Math.random.cljs$lang$arity$0() : Math.random.call(null)
  }, c = function(b) {
    return b * a.cljs$lang$arity$0()
  }, a = function(a) {
    switch(arguments.length) {
      case 0:
        return b.call(this);
      case 1:
        return c.call(this, a)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$0 = b;
  a.cljs$lang$arity$1 = c;
  return a
}();
cljs.core.rand_int = function(a) {
  return cljs.core.fix(cljs.core.rand.cljs$lang$arity$1(a))
};
cljs.core.bit_xor = function(a, b) {
  return a ^ b
};
cljs.core.bit_and = function(a, b) {
  return a & b
};
cljs.core.bit_or = function(a, b) {
  return a | b
};
cljs.core.bit_and_not = function(a, b) {
  return a & ~b
};
cljs.core.bit_clear = function(a, b) {
  return a & ~(1 << b)
};
cljs.core.bit_flip = function(a, b) {
  return a ^ 1 << b
};
cljs.core.bit_not = function(a) {
  return~a
};
cljs.core.bit_set = function(a, b) {
  return a | 1 << b
};
cljs.core.bit_test = function(a, b) {
  return 0 != (a & 1 << b)
};
cljs.core.bit_shift_left = function(a, b) {
  return a << b
};
cljs.core.bit_shift_right = function(a, b) {
  return a >> b
};
cljs.core.bit_shift_right_zero_fill = function(a, b) {
  return a >>> b
};
cljs.core.bit_count = function(a) {
  a -= a >> 1 & 1431655765;
  a = (a & 858993459) + (a >> 2 & 858993459);
  return 16843009 * (a + (a >> 4) & 252645135) >> 24
};
cljs.core._EQ__EQ_ = function() {
  var a = null, b = function(a, b) {
    return cljs.core._equiv(a, b)
  }, c = function(b, c, d) {
    for(;;) {
      if(cljs.core.truth_(a.cljs$lang$arity$2(b, c))) {
        if(cljs.core.next(d)) {
          b = c, c = cljs.core.first(d), d = cljs.core.next(d)
        }else {
          return a.cljs$lang$arity$2(c, cljs.core.first(d))
        }
      }else {
        return!1
      }
    }
  }, d = function(a, b, d) {
    var h = null;
    goog.isDef(d) && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return c.call(this, a, b, h)
  };
  d.cljs$lang$maxFixedArity = 2;
  d.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), d = cljs.core.first(cljs.core.next(a)), a = cljs.core.rest(cljs.core.next(a));
    return c(b, d, a)
  };
  d.cljs$lang$arity$variadic = c;
  a = function(a, c, g) {
    switch(arguments.length) {
      case 1:
        return!0;
      case 2:
        return b.call(this, a, c);
      default:
        return d.cljs$lang$arity$variadic(a, c, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = d.cljs$lang$applyTo;
  a.cljs$lang$arity$1 = function() {
    return!0
  };
  a.cljs$lang$arity$2 = b;
  a.cljs$lang$arity$variadic = d.cljs$lang$arity$variadic;
  return a
}();
cljs.core.pos_QMARK_ = function(a) {
  return 0 < a
};
cljs.core.zero_QMARK_ = function(a) {
  return 0 === a
};
cljs.core.neg_QMARK_ = function(a) {
  return 0 > a
};
cljs.core.nthnext = function(a, b) {
  for(var c = b, d = cljs.core.seq(a);;) {
    if(cljs.core.truth_(function() {
      var a = d;
      return a ? 0 < c : a
    }())) {
      var e = c - 1, f = cljs.core.next(d), c = e, d = f
    }else {
      return d
    }
  }
};
cljs.core.str_STAR_ = function() {
  var a = null, b = function(a) {
    return null == a ? "" : a.toString()
  }, c = function(b, c) {
    return function(b, c) {
      for(;;) {
        if(cljs.core.truth_(c)) {
          var d = b.append(a.cljs$lang$arity$1(cljs.core.first(c))), e = cljs.core.next(c), b = d, c = e
        }else {
          return a.cljs$lang$arity$1(b)
        }
      }
    }.call(null, new goog.string.StringBuffer(a.cljs$lang$arity$1(b)), c)
  }, d = function(a, b) {
    var d = null;
    goog.isDef(b) && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return c.call(this, a, d)
  };
  d.cljs$lang$maxFixedArity = 1;
  d.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), a = cljs.core.rest(a);
    return c(b, a)
  };
  d.cljs$lang$arity$variadic = c;
  a = function(a, c) {
    switch(arguments.length) {
      case 0:
        return"";
      case 1:
        return b.call(this, a);
      default:
        return d.cljs$lang$arity$variadic(a, cljs.core.array_seq(arguments, 1))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 1;
  a.cljs$lang$applyTo = d.cljs$lang$applyTo;
  a.cljs$lang$arity$0 = function() {
    return""
  };
  a.cljs$lang$arity$1 = b;
  a.cljs$lang$arity$variadic = d.cljs$lang$arity$variadic;
  return a
}();
cljs.core.str = function() {
  var a = null, b = function(a) {
    return cljs.core.symbol_QMARK_(a) ? a.substring(2, a.length) : cljs.core.keyword_QMARK_(a) ? cljs.core.str_STAR_.cljs$lang$arity$variadic(":", cljs.core.array_seq([a.substring(2, a.length)], 0)) : null == a ? "" : a.toString()
  }, c = function(b, c) {
    return function(b, c) {
      for(;;) {
        if(cljs.core.truth_(c)) {
          var d = b.append(a.cljs$lang$arity$1(cljs.core.first(c))), e = cljs.core.next(c), b = d, c = e
        }else {
          return cljs.core.str_STAR_.cljs$lang$arity$1(b)
        }
      }
    }.call(null, new goog.string.StringBuffer(a.cljs$lang$arity$1(b)), c)
  }, d = function(a, b) {
    var d = null;
    goog.isDef(b) && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return c.call(this, a, d)
  };
  d.cljs$lang$maxFixedArity = 1;
  d.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), a = cljs.core.rest(a);
    return c(b, a)
  };
  d.cljs$lang$arity$variadic = c;
  a = function(a, c) {
    switch(arguments.length) {
      case 0:
        return"";
      case 1:
        return b.call(this, a);
      default:
        return d.cljs$lang$arity$variadic(a, cljs.core.array_seq(arguments, 1))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 1;
  a.cljs$lang$applyTo = d.cljs$lang$applyTo;
  a.cljs$lang$arity$0 = function() {
    return""
  };
  a.cljs$lang$arity$1 = b;
  a.cljs$lang$arity$variadic = d.cljs$lang$arity$variadic;
  return a
}();
cljs.core.subs = function() {
  var a = null, a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return a.substring(c);
      case 3:
        return a.substring(c, d)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$2 = function(a, c) {
    return a.substring(c)
  };
  a.cljs$lang$arity$3 = function(a, c, d) {
    return a.substring(c, d)
  };
  return a
}();
cljs.core.map = void 0;
cljs.core.format = function() {
  var a = function(a, b) {
    var e = cljs.core.map.cljs$lang$arity$2 ? cljs.core.map.cljs$lang$arity$2(function(a) {
      return cljs.core.truth_(function() {
        var b = cljs.core.keyword_QMARK_(a);
        return b ? b : cljs.core.symbol_QMARK_(a)
      }()) ? "" + cljs.core.str(a) : a
    }, b) : cljs.core.map.call(null, function(a) {
      return cljs.core.truth_(function() {
        var b = cljs.core.keyword_QMARK_(a);
        return b ? b : cljs.core.symbol_QMARK_(a)
      }()) ? "" + cljs.core.str(a) : a
    }, b);
    return cljs.core.apply.cljs$lang$arity$3 ? cljs.core.apply.cljs$lang$arity$3(goog.string.format, a, e) : cljs.core.apply.call(null, goog.string.format, a, e)
  }, b = function(b, d) {
    var e = null;
    goog.isDef(d) && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return a.call(this, b, e)
  };
  b.cljs$lang$maxFixedArity = 1;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), b = cljs.core.rest(b);
    return a(d, b)
  };
  b.cljs$lang$arity$variadic = a;
  return b
}();
cljs.core.symbol = function() {
  var a = null, b = function(a) {
    return cljs.core.symbol_QMARK_(a) ? a : cljs.core.keyword_QMARK_(a) ? cljs.core.str_STAR_.cljs$lang$arity$variadic("\ufdd1", cljs.core.array_seq(["'", cljs.core.subs.cljs$lang$arity$2(a, 2)], 0)) : cljs.core.str_STAR_.cljs$lang$arity$variadic("\ufdd1", cljs.core.array_seq(["'", a], 0))
  }, c = function(b, c) {
    return a.cljs$lang$arity$1(cljs.core.str_STAR_.cljs$lang$arity$variadic(b, cljs.core.array_seq(["/", c], 0)))
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$1 = b;
  a.cljs$lang$arity$2 = c;
  return a
}();
cljs.core.keyword = function() {
  var a = null, b = function(a) {
    return cljs.core.keyword_QMARK_(a) ? a : cljs.core.symbol_QMARK_(a) ? cljs.core.str_STAR_.cljs$lang$arity$variadic("\ufdd0", cljs.core.array_seq([":", cljs.core.subs.cljs$lang$arity$2(a, 2)], 0)) : cljs.core.str_STAR_.cljs$lang$arity$variadic("\ufdd0", cljs.core.array_seq([":", a], 0))
  }, c = function(b, c) {
    return a.cljs$lang$arity$1(cljs.core.str_STAR_.cljs$lang$arity$variadic(b, cljs.core.array_seq(["/", c], 0)))
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$1 = b;
  a.cljs$lang$arity$2 = c;
  return a
}();
cljs.core.equiv_sequential = function(a, b) {
  return cljs.core.boolean$(cljs.core.sequential_QMARK_(b) ? function() {
    for(var c = cljs.core.seq(a), d = cljs.core.seq(b);;) {
      if(null == c) {
        return null == d
      }
      if(null != d && cljs.core._EQ_.cljs$lang$arity$2(cljs.core.first(c), cljs.core.first(d))) {
        c = cljs.core.next(c), d = cljs.core.next(d)
      }else {
        return!1
      }
    }
  }() : null)
};
cljs.core.hash_combine = function(a, b) {
  return a ^ b + 2654435769 + (a << 6) + (a >> 2)
};
cljs.core.hash_coll = function(a) {
  return cljs.core.reduce.cljs$lang$arity$3(function(a, c) {
    return cljs.core.hash_combine(a, cljs.core.hash.cljs$lang$arity$2(c, !1))
  }, cljs.core.hash.cljs$lang$arity$2(cljs.core.first(a), !1), cljs.core.next(a))
};
cljs.core.key = void 0;
cljs.core.val = void 0;
cljs.core.hash_imap = function(a) {
  for(var b = 0, a = cljs.core.seq(a);;) {
    if(a) {
      var c = cljs.core.first(a), b = (b + (cljs.core.hash.cljs$lang$arity$1(cljs.core.key.cljs$lang$arity$1 ? cljs.core.key.cljs$lang$arity$1(c) : cljs.core.key.call(null, c)) ^ cljs.core.hash.cljs$lang$arity$1(cljs.core.val.cljs$lang$arity$1 ? cljs.core.val.cljs$lang$arity$1(c) : cljs.core.val.call(null, c)))) % 4503599627370496, a = cljs.core.next(a)
    }else {
      return b
    }
  }
};
cljs.core.hash_iset = function(a) {
  for(var b = 0, a = cljs.core.seq(a);;) {
    if(a) {
      var c = cljs.core.first(a), b = (b + cljs.core.hash.cljs$lang$arity$1(c)) % 4503599627370496, a = cljs.core.next(a)
    }else {
      return b
    }
  }
};
cljs.core.name = void 0;
cljs.core.extend_object_BANG_ = function(a, b) {
  for(var c = cljs.core.seq(b);;) {
    if(c) {
      var d = cljs.core.first(c), e = cljs.core.nth.cljs$lang$arity$3(d, 0, null), d = cljs.core.nth.cljs$lang$arity$3(d, 1, null), e = cljs.core.name.cljs$lang$arity$1 ? cljs.core.name.cljs$lang$arity$1(e) : cljs.core.name.call(null, e);
      a[e] = d;
      c = cljs.core.next(c)
    }else {
      break
    }
  }
  return a
};
cljs.core.List = function(a, b, c, d, e) {
  this.meta = a;
  this.first = b;
  this.rest = c;
  this.count = d;
  this.__hash = e;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 65413358
};
cljs.core.List.cljs$lang$type = !0;
cljs.core.List.cljs$lang$ctorPrSeq = function() {
  return cljs.core.list.cljs$lang$arity$1 ? cljs.core.list.cljs$lang$arity$1("cljs.core/List") : cljs.core.list.call(null, "cljs.core/List")
};
cljs.core.List.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/List")
};
cljs.core.List.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  var b = this.__hash;
  return null != b ? b : this.__hash = a = cljs.core.hash_coll(a)
};
cljs.core.List.prototype.cljs$core$INext$_next$arity$1 = function() {
  return 1 === this.count ? null : this.rest
};
cljs.core.List.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return new cljs.core.List(this.meta, b, a, this.count + 1, null)
};
cljs.core.List.prototype.toString = function() {
  return cljs.core.pr_str.cljs$lang$arity$1 ? cljs.core.pr_str.cljs$lang$arity$1(this) : cljs.core.pr_str.call(null, this)
};
cljs.core.List.prototype.cljs$core$ISeqable$_seq$arity$1 = function(a) {
  return a
};
cljs.core.List.prototype.cljs$core$ICounted$_count$arity$1 = function() {
  return this.count
};
cljs.core.List.prototype.cljs$core$IStack$_peek$arity$1 = function() {
  return this.first
};
cljs.core.List.prototype.cljs$core$IStack$_pop$arity$1 = function(a) {
  return a.cljs$core$ISeq$_rest$arity$1(a)
};
cljs.core.List.prototype.cljs$core$ISeq$_first$arity$1 = function() {
  return this.first
};
cljs.core.List.prototype.cljs$core$ISeq$_rest$arity$1 = function() {
  return 1 === this.count ? cljs.core.List.EMPTY : this.rest
};
cljs.core.List.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_sequential(a, b)
};
cljs.core.List.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.List(b, this.first, this.rest, this.count, this.__hash)
};
cljs.core.List.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
  return this.meta
};
cljs.core.List.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function() {
  return cljs.core.List.EMPTY
};
cljs.core.EmptyList = function(a) {
  this.meta = a;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 65413326
};
cljs.core.EmptyList.cljs$lang$type = !0;
cljs.core.EmptyList.cljs$lang$ctorPrSeq = function() {
  return cljs.core.list.cljs$lang$arity$1 ? cljs.core.list.cljs$lang$arity$1("cljs.core/EmptyList") : cljs.core.list.call(null, "cljs.core/EmptyList")
};
cljs.core.EmptyList.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/EmptyList")
};
cljs.core.EmptyList.prototype.cljs$core$IHash$_hash$arity$1 = function() {
  return 0
};
cljs.core.EmptyList.prototype.cljs$core$INext$_next$arity$1 = function() {
  return null
};
cljs.core.EmptyList.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return new cljs.core.List(this.meta, b, null, 1, null)
};
cljs.core.EmptyList.prototype.toString = function() {
  return cljs.core.pr_str.cljs$lang$arity$1 ? cljs.core.pr_str.cljs$lang$arity$1(this) : cljs.core.pr_str.call(null, this)
};
cljs.core.EmptyList.prototype.cljs$core$ISeqable$_seq$arity$1 = function() {
  return null
};
cljs.core.EmptyList.prototype.cljs$core$ICounted$_count$arity$1 = function() {
  return 0
};
cljs.core.EmptyList.prototype.cljs$core$IStack$_peek$arity$1 = function() {
  return null
};
cljs.core.EmptyList.prototype.cljs$core$IStack$_pop$arity$1 = function() {
  throw Error("Can't pop empty list");
};
cljs.core.EmptyList.prototype.cljs$core$ISeq$_first$arity$1 = function() {
  return null
};
cljs.core.EmptyList.prototype.cljs$core$ISeq$_rest$arity$1 = function() {
  return cljs.core.List.EMPTY
};
cljs.core.EmptyList.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_sequential(a, b)
};
cljs.core.EmptyList.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.EmptyList(b)
};
cljs.core.EmptyList.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
  return this.meta
};
cljs.core.EmptyList.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function(a) {
  return a
};
cljs.core.List.EMPTY = new cljs.core.EmptyList(null);
cljs.core.reversible_QMARK_ = function(a) {
  return a ? cljs.core.truth_(function() {
    var b = a.cljs$lang$protocol_mask$partition0$ & 134217728;
    return b ? b : a.cljs$core$IReversible$
  }()) ? !0 : a.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.type_satisfies_(cljs.core.IReversible, a) : cljs.core.type_satisfies_(cljs.core.IReversible, a)
};
cljs.core.rseq = function(a) {
  return cljs.core._rseq(a)
};
cljs.core.reverse = function(a) {
  return cljs.core.reversible_QMARK_(a) ? cljs.core.rseq(a) : cljs.core.reduce.cljs$lang$arity$3(cljs.core.conj, cljs.core.List.EMPTY, a)
};
cljs.core.list = function() {
  var a = null, b = function() {
    return cljs.core.List.EMPTY
  }, c = function(a) {
    return cljs.core.conj.cljs$lang$arity$2(cljs.core.List.EMPTY, a)
  }, d = function(b, c) {
    return cljs.core.conj.cljs$lang$arity$2(a.cljs$lang$arity$1(c), b)
  }, e = function(b, c, d) {
    return cljs.core.conj.cljs$lang$arity$2(a.cljs$lang$arity$2(c, d), b)
  }, f = function(a, b, c, d) {
    return cljs.core.conj.cljs$lang$arity$2(cljs.core.conj.cljs$lang$arity$2(cljs.core.conj.cljs$lang$arity$2(cljs.core.reduce.cljs$lang$arity$3(cljs.core.conj, cljs.core.List.EMPTY, cljs.core.reverse(d)), c), b), a)
  }, g = function(a, b, c, d) {
    var e = null;
    goog.isDef(d) && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
    return f.call(this, a, b, c, e)
  };
  g.cljs$lang$maxFixedArity = 3;
  g.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), c = cljs.core.first(cljs.core.next(a)), d = cljs.core.first(cljs.core.next(cljs.core.next(a))), a = cljs.core.rest(cljs.core.next(cljs.core.next(a)));
    return f(b, c, d, a)
  };
  g.cljs$lang$arity$variadic = f;
  a = function(a, f, j, l) {
    switch(arguments.length) {
      case 0:
        return b.call(this);
      case 1:
        return c.call(this, a);
      case 2:
        return d.call(this, a, f);
      case 3:
        return e.call(this, a, f, j);
      default:
        return g.cljs$lang$arity$variadic(a, f, j, cljs.core.array_seq(arguments, 3))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 3;
  a.cljs$lang$applyTo = g.cljs$lang$applyTo;
  a.cljs$lang$arity$0 = b;
  a.cljs$lang$arity$1 = c;
  a.cljs$lang$arity$2 = d;
  a.cljs$lang$arity$3 = e;
  a.cljs$lang$arity$variadic = g.cljs$lang$arity$variadic;
  return a
}();
cljs.core.Cons = function(a, b, c, d) {
  this.meta = a;
  this.first = b;
  this.rest = c;
  this.__hash = d;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 65405164
};
cljs.core.Cons.cljs$lang$type = !0;
cljs.core.Cons.cljs$lang$ctorPrSeq = function() {
  return cljs.core.list.cljs$lang$arity$1("cljs.core/Cons")
};
cljs.core.Cons.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/Cons")
};
cljs.core.Cons.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  var b = this.__hash;
  return null != b ? b : this.__hash = a = cljs.core.hash_coll(a)
};
cljs.core.Cons.prototype.cljs$core$INext$_next$arity$1 = function() {
  return null == this.rest ? null : cljs.core._seq(this.rest)
};
cljs.core.Cons.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return new cljs.core.Cons(null, b, a, this.__hash)
};
cljs.core.Cons.prototype.toString = function() {
  return cljs.core.pr_str.cljs$lang$arity$1 ? cljs.core.pr_str.cljs$lang$arity$1(this) : cljs.core.pr_str.call(null, this)
};
cljs.core.Cons.prototype.cljs$core$ISeqable$_seq$arity$1 = function(a) {
  return a
};
cljs.core.Cons.prototype.cljs$core$ISeq$_first$arity$1 = function() {
  return this.first
};
cljs.core.Cons.prototype.cljs$core$ISeq$_rest$arity$1 = function() {
  return null == this.rest ? cljs.core.List.EMPTY : this.rest
};
cljs.core.Cons.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_sequential(a, b)
};
cljs.core.Cons.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.Cons(b, this.first, this.rest, this.__hash)
};
cljs.core.Cons.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
  return this.meta
};
cljs.core.Cons.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function() {
  return cljs.core.with_meta(cljs.core.List.EMPTY, this.meta)
};
cljs.core.cons = function(a, b) {
  return cljs.core.truth_(function() {
    var a = null == b;
    return a ? a : b ? cljs.core.truth_(function() {
      var a = b.cljs$lang$protocol_mask$partition0$ & 64;
      return a ? a : b.cljs$core$ISeq$
    }()) ? !0 : b.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.type_satisfies_(cljs.core.ISeq, b) : cljs.core.type_satisfies_(cljs.core.ISeq, b)
  }()) ? new cljs.core.Cons(null, a, b, null) : new cljs.core.Cons(null, a, cljs.core.seq(b), null)
};
cljs.core.list_QMARK_ = function(a) {
  return a ? cljs.core.truth_(function() {
    var b = a.cljs$lang$protocol_mask$partition0$ & 33554432;
    return b ? b : a.cljs$core$IList$
  }()) ? !0 : a.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.type_satisfies_(cljs.core.IList, a) : cljs.core.type_satisfies_(cljs.core.IList, a)
};
cljs.core.IReduce.string = !0;
cljs.core._reduce.string = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return cljs.core.ci_reduce.cljs$lang$arity$2(a, c);
      case 3:
        return cljs.core.ci_reduce.cljs$lang$arity$3(a, c, d)
    }
    throw Error("Invalid arity: " + arguments.length);
  }
}();
cljs.core.ILookup.string = !0;
cljs.core._lookup.string = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return cljs.core._nth.cljs$lang$arity$2(a, c);
      case 3:
        return cljs.core._nth.cljs$lang$arity$3(a, c, d)
    }
    throw Error("Invalid arity: " + arguments.length);
  }
}();
cljs.core.IIndexed.string = !0;
cljs.core._nth.string = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        var e;
        e = c < cljs.core._count(a) ? a.charAt(c) : null;
        return e;
      case 3:
        return e = c < cljs.core._count(a) ? a.charAt(c) : d, e
    }
    throw Error("Invalid arity: " + arguments.length);
  }
}();
cljs.core.ICounted.string = !0;
cljs.core._count.string = function(a) {
  return a.length
};
cljs.core.ISeqable.string = !0;
cljs.core._seq.string = function(a) {
  return cljs.core.prim_seq.cljs$lang$arity$2(a, 0)
};
cljs.core.IHash.string = !0;
cljs.core._hash.string = function(a) {
  return goog.string.hashCode(a)
};
cljs.core.Keyword = function(a) {
  this.k = a;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 1
};
cljs.core.Keyword.cljs$lang$type = !0;
cljs.core.Keyword.cljs$lang$ctorPrSeq = function() {
  return cljs.core.list.cljs$lang$arity$1("cljs.core/Keyword")
};
cljs.core.Keyword.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/Keyword")
};
cljs.core.Keyword.prototype.call = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        var e;
        e = a;
        e = this;
        if(null == c) {
          e = null
        }else {
          var f = c.strobj;
          e = null == f ? cljs.core._lookup.cljs$lang$arity$3(c, e.k, null) : f[e.k]
        }
        return e;
      case 3:
        return e = null == c ? d : cljs.core._lookup.cljs$lang$arity$3(c, this.k, d), e
    }
    throw Error("Invalid arity: " + arguments.length);
  }
}();
cljs.core.Keyword.prototype.apply = function(a, b) {
  a = this;
  return a.call.apply(a, [a].concat(b.slice()))
};
String.prototype.cljs$core$IFn$ = !0;
String.prototype.call = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return cljs.core._lookup.cljs$lang$arity$3(c, this.toString(), null);
      case 3:
        return cljs.core._lookup.cljs$lang$arity$3(c, this.toString(), d)
    }
    throw Error("Invalid arity: " + arguments.length);
  }
}();
String.prototype.apply = function(a, b) {
  return a.call.apply(a, [a].concat(b.slice()))
};
String.prototype.apply = function(a, b) {
  return 2 > cljs.core.count(b) ? cljs.core._lookup.cljs$lang$arity$3(b[0], a, null) : cljs.core._lookup.cljs$lang$arity$3(b[0], a, b[1])
};
cljs.core.lazy_seq_value = function(a) {
  var b = a.x;
  if(a.realized) {
    return b
  }
  a.x = b.cljs$lang$arity$0 ? b.cljs$lang$arity$0() : b.call(null);
  a.realized = !0;
  return a.x
};
cljs.core.LazySeq = function(a, b, c, d) {
  this.meta = a;
  this.realized = b;
  this.x = c;
  this.__hash = d;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 31850700
};
cljs.core.LazySeq.cljs$lang$type = !0;
cljs.core.LazySeq.cljs$lang$ctorPrSeq = function() {
  return cljs.core.list.cljs$lang$arity$1("cljs.core/LazySeq")
};
cljs.core.LazySeq.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/LazySeq")
};
cljs.core.LazySeq.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  var b = this.__hash;
  return null != b ? b : this.__hash = a = cljs.core.hash_coll(a)
};
cljs.core.LazySeq.prototype.cljs$core$INext$_next$arity$1 = function(a) {
  return cljs.core._seq(a.cljs$core$ISeq$_rest$arity$1(a))
};
cljs.core.LazySeq.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return cljs.core.cons(b, a)
};
cljs.core.LazySeq.prototype.toString = function() {
  return cljs.core.pr_str.cljs$lang$arity$1 ? cljs.core.pr_str.cljs$lang$arity$1(this) : cljs.core.pr_str.call(null, this)
};
cljs.core.LazySeq.prototype.cljs$core$ISeqable$_seq$arity$1 = function(a) {
  return cljs.core.seq(cljs.core.lazy_seq_value(a))
};
cljs.core.LazySeq.prototype.cljs$core$ISeq$_first$arity$1 = function(a) {
  return cljs.core.first(cljs.core.lazy_seq_value(a))
};
cljs.core.LazySeq.prototype.cljs$core$ISeq$_rest$arity$1 = function(a) {
  return cljs.core.rest(cljs.core.lazy_seq_value(a))
};
cljs.core.LazySeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_sequential(a, b)
};
cljs.core.LazySeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.LazySeq(b, this.realized, this.x, this.__hash)
};
cljs.core.LazySeq.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
  return this.meta
};
cljs.core.LazySeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function() {
  return cljs.core.with_meta(cljs.core.List.EMPTY, this.meta)
};
cljs.core.ArrayChunk = void 0;
cljs.core.ChunkBuffer = function(a, b) {
  this.buf = a;
  this.end = b;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 2
};
cljs.core.ChunkBuffer.cljs$lang$type = !0;
cljs.core.ChunkBuffer.cljs$lang$ctorPrSeq = function() {
  return cljs.core.list.cljs$lang$arity$1("cljs.core/ChunkBuffer")
};
cljs.core.ChunkBuffer.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/ChunkBuffer")
};
cljs.core.ChunkBuffer.prototype.cljs$core$ICounted$_count$arity$1 = function() {
  return this.end
};
cljs.core.ChunkBuffer.prototype.add = function(a) {
  this.buf[this.end] = a;
  return this.end += 1
};
cljs.core.ChunkBuffer.prototype.chunk = function() {
  var a = new cljs.core.ArrayChunk(this.buf, 0, this.end);
  this.buf = null;
  return a
};
cljs.core.chunk_buffer = function(a) {
  return new cljs.core.ChunkBuffer(cljs.core.make_array.cljs$lang$arity$1(a), 0)
};
cljs.core.ArrayChunk = function(a, b, c) {
  this.arr = a;
  this.off = b;
  this.end = c;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 524306
};
cljs.core.ArrayChunk.cljs$lang$type = !0;
cljs.core.ArrayChunk.cljs$lang$ctorPrSeq = function() {
  return cljs.core.list.cljs$lang$arity$1("cljs.core/ArrayChunk")
};
cljs.core.ArrayChunk.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/ArrayChunk")
};
cljs.core.ArrayChunk.prototype.cljs$core$IReduce$_reduce$arity$2 = function(a, b) {
  return cljs.core.array_reduce.cljs$lang$arity$4(this.arr, b, this.arr[this.off], this.off + 1)
};
cljs.core.ArrayChunk.prototype.cljs$core$IReduce$_reduce$arity$3 = function(a, b, c) {
  return cljs.core.array_reduce.cljs$lang$arity$4(this.arr, b, c, this.off)
};
cljs.core.ArrayChunk.prototype.cljs$core$IChunk$ = !0;
cljs.core.ArrayChunk.prototype.cljs$core$IChunk$_drop_first$arity$1 = function() {
  if(this.off === this.end) {
    throw Error("-drop-first of empty chunk");
  }
  return new cljs.core.ArrayChunk(this.arr, this.off + 1, this.end)
};
cljs.core.ArrayChunk.prototype.cljs$core$IIndexed$_nth$arity$2 = function(a, b) {
  return this.arr[this.off + b]
};
cljs.core.ArrayChunk.prototype.cljs$core$IIndexed$_nth$arity$3 = function(a, b, c) {
  var d = this;
  return cljs.core.truth_(function() {
    var a = 0 <= b;
    return a ? b < d.end - d.off : a
  }()) ? d.arr[d.off + b] : c
};
cljs.core.ArrayChunk.prototype.cljs$core$ICounted$_count$arity$1 = function() {
  return this.end - this.off
};
cljs.core.array_chunk = function() {
  var a = null, b = function(b) {
    return a.cljs$lang$arity$3(b, 0, b.length)
  }, c = function(b, c) {
    return a.cljs$lang$arity$3(b, c, b.length)
  }, d = function(a, b, c) {
    return new cljs.core.ArrayChunk(a, b, c)
  }, a = function(a, f, g) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, f);
      case 3:
        return d.call(this, a, f, g)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$1 = b;
  a.cljs$lang$arity$2 = c;
  a.cljs$lang$arity$3 = d;
  return a
}();
cljs.core.ChunkedCons = function(a, b, c, d) {
  this.chunk = a;
  this.more = b;
  this.meta = c;
  this.__hash = d;
  this.cljs$lang$protocol_mask$partition0$ = 31850604;
  this.cljs$lang$protocol_mask$partition1$ = 1536
};
cljs.core.ChunkedCons.cljs$lang$type = !0;
cljs.core.ChunkedCons.cljs$lang$ctorPrSeq = function() {
  return cljs.core.list.cljs$lang$arity$1("cljs.core/ChunkedCons")
};
cljs.core.ChunkedCons.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/ChunkedCons")
};
cljs.core.ChunkedCons.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  var b = this.__hash;
  return null != b ? b : this.__hash = a = cljs.core.hash_coll(a)
};
cljs.core.ChunkedCons.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return cljs.core.cons(b, a)
};
cljs.core.ChunkedCons.prototype.cljs$core$ISeqable$_seq$arity$1 = function(a) {
  return a
};
cljs.core.ChunkedCons.prototype.cljs$core$ISeq$_first$arity$1 = function() {
  return cljs.core._nth.cljs$lang$arity$2(this.chunk, 0)
};
cljs.core.ChunkedCons.prototype.cljs$core$ISeq$_rest$arity$1 = function() {
  return 1 < cljs.core._count(this.chunk) ? new cljs.core.ChunkedCons(cljs.core._drop_first(this.chunk), this.more, this.meta, null) : null == this.more ? cljs.core.List.EMPTY : this.more
};
cljs.core.ChunkedCons.prototype.cljs$core$IChunkedNext$_chunked_next$arity$1 = function() {
  return null == this.more ? null : this.more
};
cljs.core.ChunkedCons.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_sequential(a, b)
};
cljs.core.ChunkedCons.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.ChunkedCons(this.chunk, this.more, b, this.__hash)
};
cljs.core.ChunkedCons.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
  return this.meta
};
cljs.core.ChunkedCons.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function() {
  return cljs.core.with_meta(cljs.core.List.EMPTY, this.meta)
};
cljs.core.ChunkedCons.prototype.cljs$core$IChunkedSeq$_chunked_first$arity$1 = function() {
  return this.chunk
};
cljs.core.ChunkedCons.prototype.cljs$core$IChunkedSeq$_chunked_rest$arity$1 = function() {
  return null == this.more ? cljs.core.List.EMPTY : this.more
};
cljs.core.chunk_cons = function(a, b) {
  return 0 === cljs.core._count(a) ? b : new cljs.core.ChunkedCons(a, b, null, null)
};
cljs.core.chunk_append = function(a, b) {
  return a.add(b)
};
cljs.core.chunk = function(a) {
  return a.chunk()
};
cljs.core.chunk_first = function(a) {
  return cljs.core._chunked_first(a)
};
cljs.core.chunk_rest = function(a) {
  return cljs.core._chunked_rest(a)
};
cljs.core.chunk_next = function(a) {
  return cljs.core.truth_(a ? cljs.core.truth_(function() {
    var b = a.cljs$lang$protocol_mask$partition1$ & 1024;
    return b ? b : a.cljs$core$IChunkedNext$
  }()) ? !0 : a.cljs$lang$protocol_mask$partition1$ ? !1 : cljs.core.type_satisfies_(cljs.core.IChunkedNext, a) : cljs.core.type_satisfies_(cljs.core.IChunkedNext, a)) ? cljs.core._chunked_next(a) : cljs.core.seq(cljs.core._chunked_rest(a))
};
cljs.core.to_array = function(a) {
  for(var b = [];;) {
    if(cljs.core.seq(a)) {
      b.push(cljs.core.first(a)), a = cljs.core.next(a)
    }else {
      return b
    }
  }
};
cljs.core.to_array_2d = function(a) {
  for(var b = cljs.core.make_array.cljs$lang$arity$1(cljs.core.count(a)), c = 0, a = cljs.core.seq(a);;) {
    if(a) {
      b[c] = cljs.core.to_array(cljs.core.first(a)), c += 1, a = cljs.core.next(a)
    }else {
      break
    }
  }
  return b
};
cljs.core.long_array = function() {
  var a = null, b = function(b) {
    if(cljs.core.number_QMARK_(b)) {
      return a.cljs$lang$arity$2(b, null)
    }
    if(cljs.core.seq_QMARK_(b)) {
      return cljs.core.into_array.cljs$lang$arity$1(b)
    }
    throw Error("long-array called with something other than size or ISeq");
  }, c = function(a, b) {
    var c = cljs.core.make_array.cljs$lang$arity$1(a);
    if(cljs.core.seq_QMARK_(b)) {
      for(var g = 0, h = cljs.core.seq(b);;) {
        if(cljs.core.truth_(function() {
          var b = h;
          return b ? g < a : b
        }())) {
          c[g] = cljs.core.first(h);
          var i = g + 1, j = cljs.core.next(h), g = i, h = j
        }else {
          return c
        }
      }
    }else {
      for(i = 0;;) {
        if(i < a) {
          c[i] = b, i += 1
        }else {
          break
        }
      }
      return c
    }
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$1 = b;
  a.cljs$lang$arity$2 = c;
  return a
}();
cljs.core.double_array = function() {
  var a = null, b = function(b) {
    if(cljs.core.number_QMARK_(b)) {
      return a.cljs$lang$arity$2(b, null)
    }
    if(cljs.core.seq_QMARK_(b)) {
      return cljs.core.into_array.cljs$lang$arity$1(b)
    }
    throw Error("double-array called with something other than size or ISeq");
  }, c = function(a, b) {
    var c = cljs.core.make_array.cljs$lang$arity$1(a);
    if(cljs.core.seq_QMARK_(b)) {
      for(var g = 0, h = cljs.core.seq(b);;) {
        if(cljs.core.truth_(function() {
          var b = h;
          return b ? g < a : b
        }())) {
          c[g] = cljs.core.first(h);
          var i = g + 1, j = cljs.core.next(h), g = i, h = j
        }else {
          return c
        }
      }
    }else {
      for(i = 0;;) {
        if(i < a) {
          c[i] = b, i += 1
        }else {
          break
        }
      }
      return c
    }
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$1 = b;
  a.cljs$lang$arity$2 = c;
  return a
}();
cljs.core.object_array = function() {
  var a = null, b = function(b) {
    if(cljs.core.number_QMARK_(b)) {
      return a.cljs$lang$arity$2(b, null)
    }
    if(cljs.core.seq_QMARK_(b)) {
      return cljs.core.into_array.cljs$lang$arity$1(b)
    }
    throw Error("object-array called with something other than size or ISeq");
  }, c = function(a, b) {
    var c = cljs.core.make_array.cljs$lang$arity$1(a);
    if(cljs.core.seq_QMARK_(b)) {
      for(var g = 0, h = cljs.core.seq(b);;) {
        if(cljs.core.truth_(function() {
          var b = h;
          return b ? g < a : b
        }())) {
          c[g] = cljs.core.first(h);
          var i = g + 1, j = cljs.core.next(h), g = i, h = j
        }else {
          return c
        }
      }
    }else {
      for(i = 0;;) {
        if(i < a) {
          c[i] = b, i += 1
        }else {
          break
        }
      }
      return c
    }
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$1 = b;
  a.cljs$lang$arity$2 = c;
  return a
}();
cljs.core.bounded_count = function(a, b) {
  if(cljs.core.counted_QMARK_(a)) {
    return cljs.core.count(a)
  }
  for(var c = a, d = b, e = 0;;) {
    if(cljs.core.truth_(function() {
      var a = 0 < d;
      return a ? cljs.core.seq(c) : a
    }())) {
      var f = cljs.core.next(c), g = d - 1, e = e + 1, c = f, d = g
    }else {
      return e
    }
  }
};
cljs.core.spread = function spread(b) {
  return null == b ? null : null == cljs.core.next(b) ? cljs.core.seq(cljs.core.first(b)) : cljs.core.cons(cljs.core.first(b), spread(cljs.core.next(b)))
};
cljs.core.concat = function() {
  var a = null, b = function() {
    return new cljs.core.LazySeq(null, !1, function() {
      return null
    }, null)
  }, c = function(a) {
    return new cljs.core.LazySeq(null, !1, function() {
      return a
    }, null)
  }, d = function(b, c) {
    return new cljs.core.LazySeq(null, !1, function() {
      var d = cljs.core.seq(b);
      return d ? cljs.core.chunked_seq_QMARK_(d) ? cljs.core.chunk_cons(cljs.core.chunk_first(d), a.cljs$lang$arity$2(cljs.core.chunk_rest(d), c)) : cljs.core.cons(cljs.core.first(d), a.cljs$lang$arity$2(cljs.core.rest(d), c)) : c
    }, null)
  }, e = function(b, c, d) {
    return function l(a, b) {
      return new cljs.core.LazySeq(null, !1, function() {
        var c = cljs.core.seq(a);
        return c ? cljs.core.chunked_seq_QMARK_(c) ? cljs.core.chunk_cons(cljs.core.chunk_first(c), l(cljs.core.chunk_rest(c), b)) : cljs.core.cons(cljs.core.first(c), l(cljs.core.rest(c), b)) : cljs.core.truth_(b) ? l(cljs.core.first(b), cljs.core.next(b)) : null
      }, null)
    }(a.cljs$lang$arity$2(b, c), d)
  }, f = function(a, b, c) {
    var d = null;
    goog.isDef(c) && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return e.call(this, a, b, d)
  };
  f.cljs$lang$maxFixedArity = 2;
  f.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), c = cljs.core.first(cljs.core.next(a)), a = cljs.core.rest(cljs.core.next(a));
    return e(b, c, a)
  };
  f.cljs$lang$arity$variadic = e;
  a = function(a, e, i) {
    switch(arguments.length) {
      case 0:
        return b.call(this);
      case 1:
        return c.call(this, a);
      case 2:
        return d.call(this, a, e);
      default:
        return f.cljs$lang$arity$variadic(a, e, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = f.cljs$lang$applyTo;
  a.cljs$lang$arity$0 = b;
  a.cljs$lang$arity$1 = c;
  a.cljs$lang$arity$2 = d;
  a.cljs$lang$arity$variadic = f.cljs$lang$arity$variadic;
  return a
}();
cljs.core.list_STAR_ = function() {
  var a = null, b = function(a) {
    return cljs.core.seq(a)
  }, c = function(a, b) {
    return cljs.core.cons(a, b)
  }, d = function(a, b, c) {
    return cljs.core.cons(a, cljs.core.cons(b, c))
  }, e = function(a, b, c, d) {
    return cljs.core.cons(a, cljs.core.cons(b, cljs.core.cons(c, d)))
  }, f = function(a, b, c, d, e) {
    return cljs.core.cons(a, cljs.core.cons(b, cljs.core.cons(c, cljs.core.cons(d, cljs.core.spread(e)))))
  }, g = function(a, b, c, d, e) {
    var g = null;
    goog.isDef(e) && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 4), 0));
    return f.call(this, a, b, c, d, g)
  };
  g.cljs$lang$maxFixedArity = 4;
  g.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), c = cljs.core.first(cljs.core.next(a)), d = cljs.core.first(cljs.core.next(cljs.core.next(a))), e = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(a)))), a = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(a))));
    return f(b, c, d, e, a)
  };
  g.cljs$lang$arity$variadic = f;
  a = function(a, f, j, l, m) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, f);
      case 3:
        return d.call(this, a, f, j);
      case 4:
        return e.call(this, a, f, j, l);
      default:
        return g.cljs$lang$arity$variadic(a, f, j, l, cljs.core.array_seq(arguments, 4))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 4;
  a.cljs$lang$applyTo = g.cljs$lang$applyTo;
  a.cljs$lang$arity$1 = b;
  a.cljs$lang$arity$2 = c;
  a.cljs$lang$arity$3 = d;
  a.cljs$lang$arity$4 = e;
  a.cljs$lang$arity$variadic = g.cljs$lang$arity$variadic;
  return a
}();
cljs.core.transient$ = function(a) {
  return cljs.core._as_transient(a)
};
cljs.core.persistent_BANG_ = function(a) {
  return cljs.core._persistent_BANG_(a)
};
cljs.core.conj_BANG_ = function(a, b) {
  return cljs.core._conj_BANG_(a, b)
};
cljs.core.assoc_BANG_ = function(a, b, c) {
  return cljs.core._assoc_BANG_(a, b, c)
};
cljs.core.dissoc_BANG_ = function(a, b) {
  return cljs.core._dissoc_BANG_(a, b)
};
cljs.core.pop_BANG_ = function(a) {
  return cljs.core._pop_BANG_(a)
};
cljs.core.disj_BANG_ = function(a, b) {
  return cljs.core._disjoin_BANG_(a, b)
};
cljs.core.apply_to = function(a, b, c) {
  var d = cljs.core.seq(c);
  if(0 === b) {
    return a.cljs$lang$arity$0 ? a.cljs$lang$arity$0() : a.call(null)
  }
  var c = cljs.core._first(d), e = cljs.core._rest(d);
  if(1 === b) {
    return a.cljs$lang$arity$1 ? a.cljs$lang$arity$1(c) : a.cljs$lang$arity$1 ? a.cljs$lang$arity$1(c) : a.call(null, c)
  }
  var d = cljs.core._first(e), f = cljs.core._rest(e);
  if(2 === b) {
    return a.cljs$lang$arity$2 ? a.cljs$lang$arity$2(c, d) : a.cljs$lang$arity$2 ? a.cljs$lang$arity$2(c, d) : a.call(null, c, d)
  }
  var e = cljs.core._first(f), g = cljs.core._rest(f);
  if(3 === b) {
    return a.cljs$lang$arity$3 ? a.cljs$lang$arity$3(c, d, e) : a.cljs$lang$arity$3 ? a.cljs$lang$arity$3(c, d, e) : a.call(null, c, d, e)
  }
  var f = cljs.core._first(g), h = cljs.core._rest(g);
  if(4 === b) {
    return a.cljs$lang$arity$4 ? a.cljs$lang$arity$4(c, d, e, f) : a.cljs$lang$arity$4 ? a.cljs$lang$arity$4(c, d, e, f) : a.call(null, c, d, e, f)
  }
  g = cljs.core._first(h);
  h = cljs.core._rest(h);
  if(5 === b) {
    return a.cljs$lang$arity$5 ? a.cljs$lang$arity$5(c, d, e, f, g) : a.cljs$lang$arity$5 ? a.cljs$lang$arity$5(c, d, e, f, g) : a.call(null, c, d, e, f, g)
  }
  var a = cljs.core._first(h), i = cljs.core._rest(h);
  if(6 === b) {
    return a.cljs$lang$arity$6 ? a.cljs$lang$arity$6(c, d, e, f, g, a) : a.cljs$lang$arity$6 ? a.cljs$lang$arity$6(c, d, e, f, g, a) : a.call(null, c, d, e, f, g, a)
  }
  var h = cljs.core._first(i), j = cljs.core._rest(i);
  if(7 === b) {
    return a.cljs$lang$arity$7 ? a.cljs$lang$arity$7(c, d, e, f, g, a, h) : a.cljs$lang$arity$7 ? a.cljs$lang$arity$7(c, d, e, f, g, a, h) : a.call(null, c, d, e, f, g, a, h)
  }
  var i = cljs.core._first(j), l = cljs.core._rest(j);
  if(8 === b) {
    return a.cljs$lang$arity$8 ? a.cljs$lang$arity$8(c, d, e, f, g, a, h, i) : a.cljs$lang$arity$8 ? a.cljs$lang$arity$8(c, d, e, f, g, a, h, i) : a.call(null, c, d, e, f, g, a, h, i)
  }
  var j = cljs.core._first(l), m = cljs.core._rest(l);
  if(9 === b) {
    return a.cljs$lang$arity$9 ? a.cljs$lang$arity$9(c, d, e, f, g, a, h, i, j) : a.cljs$lang$arity$9 ? a.cljs$lang$arity$9(c, d, e, f, g, a, h, i, j) : a.call(null, c, d, e, f, g, a, h, i, j)
  }
  var l = cljs.core._first(m), k = cljs.core._rest(m);
  if(10 === b) {
    return a.cljs$lang$arity$10 ? a.cljs$lang$arity$10(c, d, e, f, g, a, h, i, j, l) : a.cljs$lang$arity$10 ? a.cljs$lang$arity$10(c, d, e, f, g, a, h, i, j, l) : a.call(null, c, d, e, f, g, a, h, i, j, l)
  }
  var m = cljs.core._first(k), n = cljs.core._rest(k);
  if(11 === b) {
    return a.cljs$lang$arity$11 ? a.cljs$lang$arity$11(c, d, e, f, g, a, h, i, j, l, m) : a.cljs$lang$arity$11 ? a.cljs$lang$arity$11(c, d, e, f, g, a, h, i, j, l, m) : a.call(null, c, d, e, f, g, a, h, i, j, l, m)
  }
  var k = cljs.core._first(n), p = cljs.core._rest(n);
  if(12 === b) {
    return a.cljs$lang$arity$12 ? a.cljs$lang$arity$12(c, d, e, f, g, a, h, i, j, l, m, k) : a.cljs$lang$arity$12 ? a.cljs$lang$arity$12(c, d, e, f, g, a, h, i, j, l, m, k) : a.call(null, c, d, e, f, g, a, h, i, j, l, m, k)
  }
  var n = cljs.core._first(p), q = cljs.core._rest(p);
  if(13 === b) {
    return a.cljs$lang$arity$13 ? a.cljs$lang$arity$13(c, d, e, f, g, a, h, i, j, l, m, k, n) : a.cljs$lang$arity$13 ? a.cljs$lang$arity$13(c, d, e, f, g, a, h, i, j, l, m, k, n) : a.call(null, c, d, e, f, g, a, h, i, j, l, m, k, n)
  }
  var p = cljs.core._first(q), r = cljs.core._rest(q);
  if(14 === b) {
    return a.cljs$lang$arity$14 ? a.cljs$lang$arity$14(c, d, e, f, g, a, h, i, j, l, m, k, n, p) : a.cljs$lang$arity$14 ? a.cljs$lang$arity$14(c, d, e, f, g, a, h, i, j, l, m, k, n, p) : a.call(null, c, d, e, f, g, a, h, i, j, l, m, k, n, p)
  }
  var q = cljs.core._first(r), s = cljs.core._rest(r);
  if(15 === b) {
    return a.cljs$lang$arity$15 ? a.cljs$lang$arity$15(c, d, e, f, g, a, h, i, j, l, m, k, n, p, q) : a.cljs$lang$arity$15 ? a.cljs$lang$arity$15(c, d, e, f, g, a, h, i, j, l, m, k, n, p, q) : a.call(null, c, d, e, f, g, a, h, i, j, l, m, k, n, p, q)
  }
  var r = cljs.core._first(s), t = cljs.core._rest(s);
  if(16 === b) {
    return a.cljs$lang$arity$16 ? a.cljs$lang$arity$16(c, d, e, f, g, a, h, i, j, l, m, k, n, p, q, r) : a.cljs$lang$arity$16 ? a.cljs$lang$arity$16(c, d, e, f, g, a, h, i, j, l, m, k, n, p, q, r) : a.call(null, c, d, e, f, g, a, h, i, j, l, m, k, n, p, q, r)
  }
  var s = cljs.core._first(t), u = cljs.core._rest(t);
  if(17 === b) {
    return a.cljs$lang$arity$17 ? a.cljs$lang$arity$17(c, d, e, f, g, a, h, i, j, l, m, k, n, p, q, r, s) : a.cljs$lang$arity$17 ? a.cljs$lang$arity$17(c, d, e, f, g, a, h, i, j, l, m, k, n, p, q, r, s) : a.call(null, c, d, e, f, g, a, h, i, j, l, m, k, n, p, q, r, s)
  }
  var t = cljs.core._first(u), x = cljs.core._rest(u);
  if(18 === b) {
    return a.cljs$lang$arity$18 ? a.cljs$lang$arity$18(c, d, e, f, g, a, h, i, j, l, m, k, n, p, q, r, s, t) : a.cljs$lang$arity$18 ? a.cljs$lang$arity$18(c, d, e, f, g, a, h, i, j, l, m, k, n, p, q, r, s, t) : a.call(null, c, d, e, f, g, a, h, i, j, l, m, k, n, p, q, r, s, t)
  }
  u = cljs.core._first(x);
  x = cljs.core._rest(x);
  if(19 === b) {
    return a.cljs$lang$arity$19 ? a.cljs$lang$arity$19(c, d, e, f, g, a, h, i, j, l, m, k, n, p, q, r, s, t, u) : a.cljs$lang$arity$19 ? a.cljs$lang$arity$19(c, d, e, f, g, a, h, i, j, l, m, k, n, p, q, r, s, t, u) : a.call(null, c, d, e, f, g, a, h, i, j, l, m, k, n, p, q, r, s, t, u)
  }
  var D = cljs.core._first(x);
  cljs.core._rest(x);
  if(20 === b) {
    return a.cljs$lang$arity$20 ? a.cljs$lang$arity$20(c, d, e, f, g, a, h, i, j, l, m, k, n, p, q, r, s, t, u, D) : a.cljs$lang$arity$20 ? a.cljs$lang$arity$20(c, d, e, f, g, a, h, i, j, l, m, k, n, p, q, r, s, t, u, D) : a.call(null, c, d, e, f, g, a, h, i, j, l, m, k, n, p, q, r, s, t, u, D)
  }
  throw Error("Only up to 20 arguments supported on functions");
};
cljs.core.apply = function() {
  var a = null, b = function(a, b) {
    var c = a.cljs$lang$maxFixedArity;
    if(a.cljs$lang$applyTo) {
      var d = cljs.core.bounded_count(b, c + 1);
      return d <= c ? cljs.core.apply_to(a, d, b) : a.cljs$lang$applyTo(b)
    }
    return a.apply(a, cljs.core.to_array(b))
  }, c = function(a, b, c) {
    b = cljs.core.list_STAR_.cljs$lang$arity$2(b, c);
    c = a.cljs$lang$maxFixedArity;
    if(a.cljs$lang$applyTo) {
      var d = cljs.core.bounded_count(b, c + 1);
      return d <= c ? cljs.core.apply_to(a, d, b) : a.cljs$lang$applyTo(b)
    }
    return a.apply(a, cljs.core.to_array(b))
  }, d = function(a, b, c, d) {
    b = cljs.core.list_STAR_.cljs$lang$arity$3(b, c, d);
    c = a.cljs$lang$maxFixedArity;
    return a.cljs$lang$applyTo ? (d = cljs.core.bounded_count(b, c + 1), d <= c ? cljs.core.apply_to(a, d, b) : a.cljs$lang$applyTo(b)) : a.apply(a, cljs.core.to_array(b))
  }, e = function(a, b, c, d, e) {
    b = cljs.core.list_STAR_.cljs$lang$arity$4(b, c, d, e);
    c = a.cljs$lang$maxFixedArity;
    return a.cljs$lang$applyTo ? (d = cljs.core.bounded_count(b, c + 1), d <= c ? cljs.core.apply_to(a, d, b) : a.cljs$lang$applyTo(b)) : a.apply(a, cljs.core.to_array(b))
  }, f = function(a, b, c, d, e, g) {
    b = cljs.core.cons(b, cljs.core.cons(c, cljs.core.cons(d, cljs.core.cons(e, cljs.core.spread(g)))));
    c = a.cljs$lang$maxFixedArity;
    return a.cljs$lang$applyTo ? (d = cljs.core.bounded_count(b, c + 1), d <= c ? cljs.core.apply_to(a, d, b) : a.cljs$lang$applyTo(b)) : a.apply(a, cljs.core.to_array(b))
  }, g = function(a, b, c, d, e, g) {
    var n = null;
    goog.isDef(g) && (n = cljs.core.array_seq(Array.prototype.slice.call(arguments, 5), 0));
    return f.call(this, a, b, c, d, e, n)
  };
  g.cljs$lang$maxFixedArity = 5;
  g.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), c = cljs.core.first(cljs.core.next(a)), d = cljs.core.first(cljs.core.next(cljs.core.next(a))), e = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(a)))), g = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(cljs.core.next(a))))), a = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(cljs.core.next(a)))));
    return f(b, c, d, e, g, a)
  };
  g.cljs$lang$arity$variadic = f;
  a = function(a, f, j, l, m, k) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, f);
      case 3:
        return c.call(this, a, f, j);
      case 4:
        return d.call(this, a, f, j, l);
      case 5:
        return e.call(this, a, f, j, l, m);
      default:
        return g.cljs$lang$arity$variadic(a, f, j, l, m, cljs.core.array_seq(arguments, 5))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 5;
  a.cljs$lang$applyTo = g.cljs$lang$applyTo;
  a.cljs$lang$arity$2 = b;
  a.cljs$lang$arity$3 = c;
  a.cljs$lang$arity$4 = d;
  a.cljs$lang$arity$5 = e;
  a.cljs$lang$arity$variadic = g.cljs$lang$arity$variadic;
  return a
}();
cljs.core.vary_meta = function() {
  var a = function(a, b, e) {
    return cljs.core.with_meta(a, cljs.core.apply.cljs$lang$arity$3(b, cljs.core.meta(a), e))
  }, b = function(b, d, e) {
    var f = null;
    goog.isDef(e) && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return a.call(this, b, d, f)
  };
  b.cljs$lang$maxFixedArity = 2;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), e = cljs.core.first(cljs.core.next(b)), b = cljs.core.rest(cljs.core.next(b));
    return a(d, e, b)
  };
  b.cljs$lang$arity$variadic = a;
  return b
}();
cljs.core.not_EQ_ = function() {
  var a = null, b = function(a, b) {
    return!cljs.core._EQ_.cljs$lang$arity$2(a, b)
  }, c = function(a, b, c) {
    return cljs.core.not(cljs.core.apply.cljs$lang$arity$4(cljs.core._EQ_, a, b, c))
  }, d = function(a, b, d) {
    var h = null;
    goog.isDef(d) && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return c.call(this, a, b, h)
  };
  d.cljs$lang$maxFixedArity = 2;
  d.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), d = cljs.core.first(cljs.core.next(a)), a = cljs.core.rest(cljs.core.next(a));
    return c(b, d, a)
  };
  d.cljs$lang$arity$variadic = c;
  a = function(a, c, g) {
    switch(arguments.length) {
      case 1:
        return!1;
      case 2:
        return b.call(this, a, c);
      default:
        return d.cljs$lang$arity$variadic(a, c, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = d.cljs$lang$applyTo;
  a.cljs$lang$arity$1 = function() {
    return!1
  };
  a.cljs$lang$arity$2 = b;
  a.cljs$lang$arity$variadic = d.cljs$lang$arity$variadic;
  return a
}();
cljs.core.not_empty = function(a) {
  return cljs.core.seq(a) ? a : null
};
cljs.core.every_QMARK_ = function(a, b) {
  for(;;) {
    if(null == cljs.core.seq(b)) {
      return!0
    }
    if(cljs.core.truth_(a.cljs$lang$arity$1 ? a.cljs$lang$arity$1(cljs.core.first(b)) : a.call(null, cljs.core.first(b)))) {
      var c = a, d = cljs.core.next(b), a = c, b = d
    }else {
      return!1
    }
  }
};
cljs.core.not_every_QMARK_ = function(a, b) {
  return!cljs.core.every_QMARK_(a, b)
};
cljs.core.some = function(a, b) {
  for(;;) {
    if(cljs.core.seq(b)) {
      var c = a.cljs$lang$arity$1 ? a.cljs$lang$arity$1(cljs.core.first(b)) : a.call(null, cljs.core.first(b));
      if(cljs.core.truth_(c)) {
        return c
      }
      var c = a, d = cljs.core.next(b), a = c, b = d
    }else {
      return null
    }
  }
};
cljs.core.not_any_QMARK_ = function(a, b) {
  return cljs.core.not(cljs.core.some(a, b))
};
cljs.core.even_QMARK_ = function(a) {
  if(cljs.core.integer_QMARK_(a)) {
    return 0 === (a & 1)
  }
  throw Error([cljs.core.str("Argument must be an integer: "), cljs.core.str(a)].join(""));
};
cljs.core.odd_QMARK_ = function(a) {
  return!cljs.core.even_QMARK_(a)
};
cljs.core.identity = function(a) {
  return a
};
cljs.core.complement = function(a) {
  var b = null, c = function(b, c, d) {
    return cljs.core.not(cljs.core.apply.cljs$lang$arity$4(a, b, c, d))
  }, d = function(a, b, d) {
    var h = null;
    goog.isDef(d) && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return c.call(this, a, b, h)
  };
  d.cljs$lang$maxFixedArity = 2;
  d.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), d = cljs.core.first(cljs.core.next(a)), a = cljs.core.rest(cljs.core.next(a));
    return c(b, d, a)
  };
  d.cljs$lang$arity$variadic = c;
  b = function(b, c, g) {
    switch(arguments.length) {
      case 0:
        return cljs.core.not(a.cljs$lang$arity$0 ? a.cljs$lang$arity$0() : a.call(null));
      case 1:
        return cljs.core.not(a.cljs$lang$arity$1 ? a.cljs$lang$arity$1(b) : a.call(null, b));
      case 2:
        return cljs.core.not(a.cljs$lang$arity$2 ? a.cljs$lang$arity$2(b, c) : a.call(null, b, c));
      default:
        return d.cljs$lang$arity$variadic(b, c, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  b.cljs$lang$maxFixedArity = 2;
  b.cljs$lang$applyTo = d.cljs$lang$applyTo;
  return b
};
cljs.core.constantly = function(a) {
  var b = function(b) {
    goog.isDef(b) && cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0);
    return a
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    cljs.core.seq(b);
    return a
  };
  b.cljs$lang$arity$variadic = function() {
    return a
  };
  return b
};
cljs.core.comp = function() {
  var a = null, b = function() {
    return cljs.core.identity
  }, c = function(a, b) {
    var c = null, d = function(c, d, e, f) {
      return a.cljs$lang$arity$1 ? a.cljs$lang$arity$1(cljs.core.apply.cljs$lang$arity$5(b, c, d, e, f)) : a.call(null, cljs.core.apply.cljs$lang$arity$5(b, c, d, e, f))
    }, e = function(a, b, c, e) {
      var g = null;
      goog.isDef(e) && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
      return d.call(this, a, b, c, g)
    };
    e.cljs$lang$maxFixedArity = 3;
    e.cljs$lang$applyTo = function(a) {
      var b = cljs.core.first(a), c = cljs.core.first(cljs.core.next(a)), e = cljs.core.first(cljs.core.next(cljs.core.next(a))), a = cljs.core.rest(cljs.core.next(cljs.core.next(a)));
      return d(b, c, e, a)
    };
    e.cljs$lang$arity$variadic = d;
    c = function(c, d, f, i) {
      switch(arguments.length) {
        case 0:
          return a.cljs$lang$arity$1 ? a.cljs$lang$arity$1(b.cljs$lang$arity$0 ? b.cljs$lang$arity$0() : b.call(null)) : a.call(null, b.cljs$lang$arity$0 ? b.cljs$lang$arity$0() : b.call(null));
        case 1:
          return a.cljs$lang$arity$1 ? a.cljs$lang$arity$1(b.cljs$lang$arity$1 ? b.cljs$lang$arity$1(c) : b.call(null, c)) : a.call(null, b.cljs$lang$arity$1 ? b.cljs$lang$arity$1(c) : b.call(null, c));
        case 2:
          return a.cljs$lang$arity$1 ? a.cljs$lang$arity$1(b.cljs$lang$arity$2 ? b.cljs$lang$arity$2(c, d) : b.call(null, c, d)) : a.call(null, b.cljs$lang$arity$2 ? b.cljs$lang$arity$2(c, d) : b.call(null, c, d));
        case 3:
          return a.cljs$lang$arity$1 ? a.cljs$lang$arity$1(b.cljs$lang$arity$3 ? b.cljs$lang$arity$3(c, d, f) : b.call(null, c, d, f)) : a.call(null, b.cljs$lang$arity$3 ? b.cljs$lang$arity$3(c, d, f) : b.call(null, c, d, f));
        default:
          return e.cljs$lang$arity$variadic(c, d, f, cljs.core.array_seq(arguments, 3))
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    c.cljs$lang$maxFixedArity = 3;
    c.cljs$lang$applyTo = e.cljs$lang$applyTo;
    return c
  }, d = function(a, b, c) {
    var d = null, e = function(d, e, f, j) {
      return a.cljs$lang$arity$1 ? a.cljs$lang$arity$1(b.cljs$lang$arity$1 ? b.cljs$lang$arity$1(cljs.core.apply.cljs$lang$arity$5(c, d, e, f, j)) : b.call(null, cljs.core.apply.cljs$lang$arity$5(c, d, e, f, j))) : a.call(null, b.cljs$lang$arity$1 ? b.cljs$lang$arity$1(cljs.core.apply.cljs$lang$arity$5(c, d, e, f, j)) : b.call(null, cljs.core.apply.cljs$lang$arity$5(c, d, e, f, j)))
    }, f = function(a, b, c, d) {
      var f = null;
      goog.isDef(d) && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
      return e.call(this, a, b, c, f)
    };
    f.cljs$lang$maxFixedArity = 3;
    f.cljs$lang$applyTo = function(a) {
      var b = cljs.core.first(a), c = cljs.core.first(cljs.core.next(a)), d = cljs.core.first(cljs.core.next(cljs.core.next(a))), a = cljs.core.rest(cljs.core.next(cljs.core.next(a)));
      return e(b, c, d, a)
    };
    f.cljs$lang$arity$variadic = e;
    d = function(d, e, j, l) {
      switch(arguments.length) {
        case 0:
          return a.cljs$lang$arity$1 ? a.cljs$lang$arity$1(b.cljs$lang$arity$1 ? b.cljs$lang$arity$1(c.cljs$lang$arity$0 ? c.cljs$lang$arity$0() : c.call(null)) : b.call(null, c.cljs$lang$arity$0 ? c.cljs$lang$arity$0() : c.call(null))) : a.call(null, b.cljs$lang$arity$1 ? b.cljs$lang$arity$1(c.cljs$lang$arity$0 ? c.cljs$lang$arity$0() : c.call(null)) : b.call(null, c.cljs$lang$arity$0 ? c.cljs$lang$arity$0() : c.call(null)));
        case 1:
          return a.cljs$lang$arity$1 ? a.cljs$lang$arity$1(b.cljs$lang$arity$1 ? b.cljs$lang$arity$1(c.cljs$lang$arity$1 ? c.cljs$lang$arity$1(d) : c.call(null, d)) : b.call(null, c.cljs$lang$arity$1 ? c.cljs$lang$arity$1(d) : c.call(null, d))) : a.call(null, b.cljs$lang$arity$1 ? b.cljs$lang$arity$1(c.cljs$lang$arity$1 ? c.cljs$lang$arity$1(d) : c.call(null, d)) : b.call(null, c.cljs$lang$arity$1 ? c.cljs$lang$arity$1(d) : c.call(null, d)));
        case 2:
          return a.cljs$lang$arity$1 ? a.cljs$lang$arity$1(b.cljs$lang$arity$1 ? b.cljs$lang$arity$1(c.cljs$lang$arity$2 ? c.cljs$lang$arity$2(d, e) : c.call(null, d, e)) : b.call(null, c.cljs$lang$arity$2 ? c.cljs$lang$arity$2(d, e) : c.call(null, d, e))) : a.call(null, b.cljs$lang$arity$1 ? b.cljs$lang$arity$1(c.cljs$lang$arity$2 ? c.cljs$lang$arity$2(d, e) : c.call(null, d, e)) : b.call(null, c.cljs$lang$arity$2 ? c.cljs$lang$arity$2(d, e) : c.call(null, d, e)));
        case 3:
          return a.cljs$lang$arity$1 ? a.cljs$lang$arity$1(b.cljs$lang$arity$1 ? b.cljs$lang$arity$1(c.cljs$lang$arity$3 ? c.cljs$lang$arity$3(d, e, j) : c.call(null, d, e, j)) : b.call(null, c.cljs$lang$arity$3 ? c.cljs$lang$arity$3(d, e, j) : c.call(null, d, e, j))) : a.call(null, b.cljs$lang$arity$1 ? b.cljs$lang$arity$1(c.cljs$lang$arity$3 ? c.cljs$lang$arity$3(d, e, j) : c.call(null, d, e, j)) : b.call(null, c.cljs$lang$arity$3 ? c.cljs$lang$arity$3(d, e, j) : c.call(null, d, e, j)));
        default:
          return f.cljs$lang$arity$variadic(d, e, j, cljs.core.array_seq(arguments, 3))
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    d.cljs$lang$maxFixedArity = 3;
    d.cljs$lang$applyTo = f.cljs$lang$applyTo;
    return d
  }, e = function(a, b, c, d) {
    var e = cljs.core.reverse(cljs.core.list_STAR_.cljs$lang$arity$4(a, b, c, d)), f = function(a) {
      for(var a = cljs.core.apply.cljs$lang$arity$2(cljs.core.first(e), a), b = cljs.core.next(e);;) {
        if(b) {
          a = cljs.core.first(b).call(null, a), b = cljs.core.next(b)
        }else {
          return a
        }
      }
    }, a = function(a) {
      var b = null;
      goog.isDef(a) && (b = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
      return f.call(this, b)
    };
    a.cljs$lang$maxFixedArity = 0;
    a.cljs$lang$applyTo = function(a) {
      a = cljs.core.seq(a);
      return f(a)
    };
    a.cljs$lang$arity$variadic = f;
    return a
  }, f = function(a, b, c, d) {
    var f = null;
    goog.isDef(d) && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
    return e.call(this, a, b, c, f)
  };
  f.cljs$lang$maxFixedArity = 3;
  f.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), c = cljs.core.first(cljs.core.next(a)), d = cljs.core.first(cljs.core.next(cljs.core.next(a))), a = cljs.core.rest(cljs.core.next(cljs.core.next(a)));
    return e(b, c, d, a)
  };
  f.cljs$lang$arity$variadic = e;
  a = function(a, e, i, j) {
    switch(arguments.length) {
      case 0:
        return b.call(this);
      case 1:
        return a;
      case 2:
        return c.call(this, a, e);
      case 3:
        return d.call(this, a, e, i);
      default:
        return f.cljs$lang$arity$variadic(a, e, i, cljs.core.array_seq(arguments, 3))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 3;
  a.cljs$lang$applyTo = f.cljs$lang$applyTo;
  a.cljs$lang$arity$0 = b;
  a.cljs$lang$arity$1 = function(a) {
    return a
  };
  a.cljs$lang$arity$2 = c;
  a.cljs$lang$arity$3 = d;
  a.cljs$lang$arity$variadic = f.cljs$lang$arity$variadic;
  return a
}();
cljs.core.partial = function() {
  var a = null, b = function(a, b) {
    var c = function(c) {
      return cljs.core.apply.cljs$lang$arity$3(a, b, c)
    }, d = function(a) {
      var b = null;
      goog.isDef(a) && (b = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
      return c.call(this, b)
    };
    d.cljs$lang$maxFixedArity = 0;
    d.cljs$lang$applyTo = function(a) {
      a = cljs.core.seq(a);
      return c(a)
    };
    d.cljs$lang$arity$variadic = c;
    return d
  }, c = function(a, b, c) {
    var d = function(d) {
      return cljs.core.apply.cljs$lang$arity$4(a, b, c, d)
    }, e = function(a) {
      var b = null;
      goog.isDef(a) && (b = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
      return d.call(this, b)
    };
    e.cljs$lang$maxFixedArity = 0;
    e.cljs$lang$applyTo = function(a) {
      a = cljs.core.seq(a);
      return d(a)
    };
    e.cljs$lang$arity$variadic = d;
    return e
  }, d = function(a, b, c, d) {
    var e = function(e) {
      return cljs.core.apply.cljs$lang$arity$5(a, b, c, d, e)
    }, f = function(a) {
      var b = null;
      goog.isDef(a) && (b = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
      return e.call(this, b)
    };
    f.cljs$lang$maxFixedArity = 0;
    f.cljs$lang$applyTo = function(a) {
      a = cljs.core.seq(a);
      return e(a)
    };
    f.cljs$lang$arity$variadic = e;
    return f
  }, e = function(a, b, c, d, e) {
    var f = function(f) {
      return cljs.core.apply.cljs$lang$arity$5(a, b, c, d, cljs.core.concat.cljs$lang$arity$2(e, f))
    }, k = function(a) {
      var b = null;
      goog.isDef(a) && (b = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
      return f.call(this, b)
    };
    k.cljs$lang$maxFixedArity = 0;
    k.cljs$lang$applyTo = function(a) {
      a = cljs.core.seq(a);
      return f(a)
    };
    k.cljs$lang$arity$variadic = f;
    return k
  }, f = function(a, b, c, d, f) {
    var m = null;
    goog.isDef(f) && (m = cljs.core.array_seq(Array.prototype.slice.call(arguments, 4), 0));
    return e.call(this, a, b, c, d, m)
  };
  f.cljs$lang$maxFixedArity = 4;
  f.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), c = cljs.core.first(cljs.core.next(a)), d = cljs.core.first(cljs.core.next(cljs.core.next(a))), f = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(a)))), a = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(a))));
    return e(b, c, d, f, a)
  };
  f.cljs$lang$arity$variadic = e;
  a = function(a, e, i, j, l) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, i);
      case 4:
        return d.call(this, a, e, i, j);
      default:
        return f.cljs$lang$arity$variadic(a, e, i, j, cljs.core.array_seq(arguments, 4))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 4;
  a.cljs$lang$applyTo = f.cljs$lang$applyTo;
  a.cljs$lang$arity$2 = b;
  a.cljs$lang$arity$3 = c;
  a.cljs$lang$arity$4 = d;
  a.cljs$lang$arity$variadic = f.cljs$lang$arity$variadic;
  return a
}();
cljs.core.fnil = function() {
  var a = null, b = function(a, b) {
    var c = null, d = function(c, d, g, h) {
      return cljs.core.apply.cljs$lang$arity$5(a, null == c ? b : c, d, g, h)
    }, i = function(a, b, c, e) {
      var f = null;
      goog.isDef(e) && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
      return d.call(this, a, b, c, f)
    };
    i.cljs$lang$maxFixedArity = 3;
    i.cljs$lang$applyTo = function(a) {
      var b = cljs.core.first(a), c = cljs.core.first(cljs.core.next(a)), e = cljs.core.first(cljs.core.next(cljs.core.next(a))), a = cljs.core.rest(cljs.core.next(cljs.core.next(a)));
      return d(b, c, e, a)
    };
    i.cljs$lang$arity$variadic = d;
    c = function(c, d, g, h) {
      switch(arguments.length) {
        case 1:
          return a.cljs$lang$arity$1 ? a.cljs$lang$arity$1(null == c ? b : c) : a.call(null, null == c ? b : c);
        case 2:
          return a.cljs$lang$arity$2 ? a.cljs$lang$arity$2(null == c ? b : c, d) : a.call(null, null == c ? b : c, d);
        case 3:
          return a.cljs$lang$arity$3 ? a.cljs$lang$arity$3(null == c ? b : c, d, g) : a.call(null, null == c ? b : c, d, g);
        default:
          return i.cljs$lang$arity$variadic(c, d, g, cljs.core.array_seq(arguments, 3))
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    c.cljs$lang$maxFixedArity = 3;
    c.cljs$lang$applyTo = i.cljs$lang$applyTo;
    return c
  }, c = function(a, b, c) {
    var d = null, i = function(d, h, i, j) {
      return cljs.core.apply.cljs$lang$arity$5(a, null == d ? b : d, null == h ? c : h, i, j)
    }, j = function(a, b, c, d) {
      var e = null;
      goog.isDef(d) && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
      return i.call(this, a, b, c, e)
    };
    j.cljs$lang$maxFixedArity = 3;
    j.cljs$lang$applyTo = function(a) {
      var b = cljs.core.first(a), c = cljs.core.first(cljs.core.next(a)), d = cljs.core.first(cljs.core.next(cljs.core.next(a))), a = cljs.core.rest(cljs.core.next(cljs.core.next(a)));
      return i(b, c, d, a)
    };
    j.cljs$lang$arity$variadic = i;
    d = function(d, h, i, n) {
      switch(arguments.length) {
        case 2:
          return a.cljs$lang$arity$2 ? a.cljs$lang$arity$2(null == d ? b : d, null == h ? c : h) : a.call(null, null == d ? b : d, null == h ? c : h);
        case 3:
          return a.cljs$lang$arity$3 ? a.cljs$lang$arity$3(null == d ? b : d, null == h ? c : h, i) : a.call(null, null == d ? b : d, null == h ? c : h, i);
        default:
          return j.cljs$lang$arity$variadic(d, h, i, cljs.core.array_seq(arguments, 3))
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    d.cljs$lang$maxFixedArity = 3;
    d.cljs$lang$applyTo = j.cljs$lang$applyTo;
    return d
  }, d = function(a, b, c, d) {
    var i = null, j = function(i, j, l, p) {
      return cljs.core.apply.cljs$lang$arity$5(a, null == i ? b : i, null == j ? c : j, null == l ? d : l, p)
    }, l = function(a, b, c, d) {
      var e = null;
      goog.isDef(d) && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
      return j.call(this, a, b, c, e)
    };
    l.cljs$lang$maxFixedArity = 3;
    l.cljs$lang$applyTo = function(a) {
      var b = cljs.core.first(a), c = cljs.core.first(cljs.core.next(a)), d = cljs.core.first(cljs.core.next(cljs.core.next(a))), a = cljs.core.rest(cljs.core.next(cljs.core.next(a)));
      return j(b, c, d, a)
    };
    l.cljs$lang$arity$variadic = j;
    i = function(i, j, n, p) {
      switch(arguments.length) {
        case 2:
          return a.cljs$lang$arity$2 ? a.cljs$lang$arity$2(null == i ? b : i, null == j ? c : j) : a.call(null, null == i ? b : i, null == j ? c : j);
        case 3:
          return a.cljs$lang$arity$3 ? a.cljs$lang$arity$3(null == i ? b : i, null == j ? c : j, null == n ? d : n) : a.call(null, null == i ? b : i, null == j ? c : j, null == n ? d : n);
        default:
          return l.cljs$lang$arity$variadic(i, j, n, cljs.core.array_seq(arguments, 3))
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    i.cljs$lang$maxFixedArity = 3;
    i.cljs$lang$applyTo = l.cljs$lang$applyTo;
    return i
  }, a = function(a, f, g, h) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, f);
      case 3:
        return c.call(this, a, f, g);
      case 4:
        return d.call(this, a, f, g, h)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$2 = b;
  a.cljs$lang$arity$3 = c;
  a.cljs$lang$arity$4 = d;
  return a
}();
cljs.core.map_indexed = function(a, b) {
  var c = function e(b, c) {
    return new cljs.core.LazySeq(null, !1, function() {
      var h = cljs.core.seq(c);
      if(h) {
        if(cljs.core.chunked_seq_QMARK_(h)) {
          for(var i = cljs.core.chunk_first(h), j = cljs.core.count(i), l = cljs.core.chunk_buffer(j), m = 0;;) {
            if(m < j) {
              cljs.core.chunk_append(l, a.cljs$lang$arity$2 ? a.cljs$lang$arity$2(b + m, cljs.core._nth.cljs$lang$arity$2(i, m)) : a.call(null, b + m, cljs.core._nth.cljs$lang$arity$2(i, m))), m += 1
            }else {
              break
            }
          }
          return cljs.core.chunk_cons(cljs.core.chunk(l), e(b + j, cljs.core.chunk_rest(h)))
        }
        return cljs.core.cons(a.cljs$lang$arity$2 ? a.cljs$lang$arity$2(b, cljs.core.first(h)) : a.call(null, b, cljs.core.first(h)), e(b + 1, cljs.core.rest(h)))
      }
      return null
    }, null)
  };
  return c.cljs$lang$arity$2 ? c.cljs$lang$arity$2(0, b) : c.call(null, 0, b)
};
cljs.core.keep = function keep(b, c) {
  return new cljs.core.LazySeq(null, !1, function() {
    var d = cljs.core.seq(c);
    if(d) {
      if(cljs.core.chunked_seq_QMARK_(d)) {
        for(var e = cljs.core.chunk_first(d), f = cljs.core.count(e), g = cljs.core.chunk_buffer(f), h = 0;;) {
          if(h < f) {
            var i = b.cljs$lang$arity$1 ? b.cljs$lang$arity$1(cljs.core._nth.cljs$lang$arity$2(e, h)) : b.call(null, cljs.core._nth.cljs$lang$arity$2(e, h));
            null != i && cljs.core.chunk_append(g, i);
            h += 1
          }else {
            break
          }
        }
        return cljs.core.chunk_cons(cljs.core.chunk(g), keep(b, cljs.core.chunk_rest(d)))
      }
      e = b.cljs$lang$arity$1 ? b.cljs$lang$arity$1(cljs.core.first(d)) : b.call(null, cljs.core.first(d));
      return null == e ? keep(b, cljs.core.rest(d)) : cljs.core.cons(e, keep(b, cljs.core.rest(d)))
    }
    return null
  }, null)
};
cljs.core.keep_indexed = function(a, b) {
  var c = function e(b, c) {
    return new cljs.core.LazySeq(null, !1, function() {
      var h = cljs.core.seq(c);
      if(h) {
        if(cljs.core.chunked_seq_QMARK_(h)) {
          for(var i = cljs.core.chunk_first(h), j = cljs.core.count(i), l = cljs.core.chunk_buffer(j), m = 0;;) {
            if(m < j) {
              var k = a.cljs$lang$arity$2 ? a.cljs$lang$arity$2(b + m, cljs.core._nth.cljs$lang$arity$2(i, m)) : a.call(null, b + m, cljs.core._nth.cljs$lang$arity$2(i, m));
              null != k && cljs.core.chunk_append(l, k);
              m += 1
            }else {
              break
            }
          }
          return cljs.core.chunk_cons(cljs.core.chunk(l), e(b + j, cljs.core.chunk_rest(h)))
        }
        i = a.cljs$lang$arity$2 ? a.cljs$lang$arity$2(b, cljs.core.first(h)) : a.call(null, b, cljs.core.first(h));
        return null == i ? e(b + 1, cljs.core.rest(h)) : cljs.core.cons(i, e(b + 1, cljs.core.rest(h)))
      }
      return null
    }, null)
  };
  return c.cljs$lang$arity$2 ? c.cljs$lang$arity$2(0, b) : c.call(null, 0, b)
};
cljs.core.every_pred = function() {
  var a = null, b = function(a) {
    var b = null, c = function(b) {
      return cljs.core.boolean$(a.cljs$lang$arity$1 ? a.cljs$lang$arity$1(b) : a.call(null, b))
    }, d = function(b, c) {
      return cljs.core.boolean$(function() {
        var d = a.cljs$lang$arity$1 ? a.cljs$lang$arity$1(b) : a.call(null, b);
        return cljs.core.truth_(d) ? a.cljs$lang$arity$1 ? a.cljs$lang$arity$1(c) : a.call(null, c) : d
      }())
    }, e = function(b, c, d) {
      return cljs.core.boolean$(function() {
        var e = a.cljs$lang$arity$1 ? a.cljs$lang$arity$1(b) : a.call(null, b);
        return cljs.core.truth_(e) ? (e = a.cljs$lang$arity$1 ? a.cljs$lang$arity$1(c) : a.call(null, c), cljs.core.truth_(e) ? a.cljs$lang$arity$1 ? a.cljs$lang$arity$1(d) : a.call(null, d) : e) : e
      }())
    }, f = function(c, d, e, f) {
      return cljs.core.boolean$(function() {
        var i = b.cljs$lang$arity$3(c, d, e);
        return cljs.core.truth_(i) ? cljs.core.every_QMARK_(a, f) : i
      }())
    }, k = function(a, b, c, d) {
      var e = null;
      goog.isDef(d) && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
      return f.call(this, a, b, c, e)
    };
    k.cljs$lang$maxFixedArity = 3;
    k.cljs$lang$applyTo = function(a) {
      var b = cljs.core.first(a), c = cljs.core.first(cljs.core.next(a)), d = cljs.core.first(cljs.core.next(cljs.core.next(a))), a = cljs.core.rest(cljs.core.next(cljs.core.next(a)));
      return f(b, c, d, a)
    };
    k.cljs$lang$arity$variadic = f;
    b = function(a, b, f, g) {
      switch(arguments.length) {
        case 0:
          return!0;
        case 1:
          return c.call(this, a);
        case 2:
          return d.call(this, a, b);
        case 3:
          return e.call(this, a, b, f);
        default:
          return k.cljs$lang$arity$variadic(a, b, f, cljs.core.array_seq(arguments, 3))
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    b.cljs$lang$maxFixedArity = 3;
    b.cljs$lang$applyTo = k.cljs$lang$applyTo;
    b.cljs$lang$arity$0 = function() {
      return!0
    };
    b.cljs$lang$arity$1 = c;
    b.cljs$lang$arity$2 = d;
    b.cljs$lang$arity$3 = e;
    b.cljs$lang$arity$variadic = k.cljs$lang$arity$variadic;
    return b
  }, c = function(a, b) {
    var c = null, d = function(c) {
      return cljs.core.boolean$(function() {
        var d = a.cljs$lang$arity$1 ? a.cljs$lang$arity$1(c) : a.call(null, c);
        return cljs.core.truth_(d) ? b.cljs$lang$arity$1 ? b.cljs$lang$arity$1(c) : b.call(null, c) : d
      }())
    }, e = function(c, d) {
      return cljs.core.boolean$(function() {
        var e = a.cljs$lang$arity$1 ? a.cljs$lang$arity$1(c) : a.call(null, c);
        return cljs.core.truth_(e) && (e = a.cljs$lang$arity$1 ? a.cljs$lang$arity$1(d) : a.call(null, d), cljs.core.truth_(e)) ? (e = b.cljs$lang$arity$1 ? b.cljs$lang$arity$1(c) : b.call(null, c), cljs.core.truth_(e) ? b.cljs$lang$arity$1 ? b.cljs$lang$arity$1(d) : b.call(null, d) : e) : e
      }())
    }, f = function(c, d, e) {
      return cljs.core.boolean$(function() {
        var f = a.cljs$lang$arity$1 ? a.cljs$lang$arity$1(c) : a.call(null, c);
        return cljs.core.truth_(f) && (f = a.cljs$lang$arity$1 ? a.cljs$lang$arity$1(d) : a.call(null, d), cljs.core.truth_(f) && (f = a.cljs$lang$arity$1 ? a.cljs$lang$arity$1(e) : a.call(null, e), cljs.core.truth_(f) && (f = b.cljs$lang$arity$1 ? b.cljs$lang$arity$1(c) : b.call(null, c), cljs.core.truth_(f)))) ? (f = b.cljs$lang$arity$1 ? b.cljs$lang$arity$1(d) : b.call(null, d), cljs.core.truth_(f) ? b.cljs$lang$arity$1 ? b.cljs$lang$arity$1(e) : b.call(null, e) : f) : f
      }())
    }, k = function(d, e, f, j) {
      return cljs.core.boolean$(function() {
        var l = c.cljs$lang$arity$3(d, e, f);
        return cljs.core.truth_(l) ? cljs.core.every_QMARK_(function(c) {
          var d = a.cljs$lang$arity$1 ? a.cljs$lang$arity$1(c) : a.call(null, c);
          return cljs.core.truth_(d) ? b.cljs$lang$arity$1 ? b.cljs$lang$arity$1(c) : b.call(null, c) : d
        }, j) : l
      }())
    }, n = function(a, b, c, d) {
      var e = null;
      goog.isDef(d) && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
      return k.call(this, a, b, c, e)
    };
    n.cljs$lang$maxFixedArity = 3;
    n.cljs$lang$applyTo = function(a) {
      var b = cljs.core.first(a), c = cljs.core.first(cljs.core.next(a)), d = cljs.core.first(cljs.core.next(cljs.core.next(a))), a = cljs.core.rest(cljs.core.next(cljs.core.next(a)));
      return k(b, c, d, a)
    };
    n.cljs$lang$arity$variadic = k;
    c = function(a, b, c, g) {
      switch(arguments.length) {
        case 0:
          return!0;
        case 1:
          return d.call(this, a);
        case 2:
          return e.call(this, a, b);
        case 3:
          return f.call(this, a, b, c);
        default:
          return n.cljs$lang$arity$variadic(a, b, c, cljs.core.array_seq(arguments, 3))
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    c.cljs$lang$maxFixedArity = 3;
    c.cljs$lang$applyTo = n.cljs$lang$applyTo;
    c.cljs$lang$arity$0 = function() {
      return!0
    };
    c.cljs$lang$arity$1 = d;
    c.cljs$lang$arity$2 = e;
    c.cljs$lang$arity$3 = f;
    c.cljs$lang$arity$variadic = n.cljs$lang$arity$variadic;
    return c
  }, d = function(a, b, c) {
    var d = null, e = function(d) {
      return cljs.core.boolean$(function() {
        var e = a.cljs$lang$arity$1 ? a.cljs$lang$arity$1(d) : a.call(null, d);
        return cljs.core.truth_(e) ? (e = b.cljs$lang$arity$1 ? b.cljs$lang$arity$1(d) : b.call(null, d), cljs.core.truth_(e) ? c.cljs$lang$arity$1 ? c.cljs$lang$arity$1(d) : c.call(null, d) : e) : e
      }())
    }, f = function(d, e) {
      return cljs.core.boolean$(function() {
        var f = a.cljs$lang$arity$1 ? a.cljs$lang$arity$1(d) : a.call(null, d);
        return cljs.core.truth_(f) && (f = b.cljs$lang$arity$1 ? b.cljs$lang$arity$1(d) : b.call(null, d), cljs.core.truth_(f) && (f = c.cljs$lang$arity$1 ? c.cljs$lang$arity$1(d) : c.call(null, d), cljs.core.truth_(f) && (f = a.cljs$lang$arity$1 ? a.cljs$lang$arity$1(e) : a.call(null, e), cljs.core.truth_(f)))) ? (f = b.cljs$lang$arity$1 ? b.cljs$lang$arity$1(e) : b.call(null, e), cljs.core.truth_(f) ? c.cljs$lang$arity$1 ? c.cljs$lang$arity$1(e) : c.call(null, e) : f) : f
      }())
    }, k = function(d, e, f) {
      return cljs.core.boolean$(function() {
        var j = a.cljs$lang$arity$1 ? a.cljs$lang$arity$1(d) : a.call(null, d);
        return cljs.core.truth_(j) && (j = b.cljs$lang$arity$1 ? b.cljs$lang$arity$1(d) : b.call(null, d), cljs.core.truth_(j) && (j = c.cljs$lang$arity$1 ? c.cljs$lang$arity$1(d) : c.call(null, d), cljs.core.truth_(j) && (j = a.cljs$lang$arity$1 ? a.cljs$lang$arity$1(e) : a.call(null, e), cljs.core.truth_(j) && (j = b.cljs$lang$arity$1 ? b.cljs$lang$arity$1(e) : b.call(null, e), cljs.core.truth_(j) && (j = c.cljs$lang$arity$1 ? c.cljs$lang$arity$1(e) : c.call(null, e), cljs.core.truth_(j) && (j = 
        a.cljs$lang$arity$1 ? a.cljs$lang$arity$1(f) : a.call(null, f), cljs.core.truth_(j))))))) ? (j = b.cljs$lang$arity$1 ? b.cljs$lang$arity$1(f) : b.call(null, f), cljs.core.truth_(j) ? c.cljs$lang$arity$1 ? c.cljs$lang$arity$1(f) : c.call(null, f) : j) : j
      }())
    }, n = function(e, f, l, m) {
      return cljs.core.boolean$(function() {
        var k = d.cljs$lang$arity$3(e, f, l);
        return cljs.core.truth_(k) ? cljs.core.every_QMARK_(function(d) {
          var e = a.cljs$lang$arity$1 ? a.cljs$lang$arity$1(d) : a.call(null, d);
          return cljs.core.truth_(e) ? (e = b.cljs$lang$arity$1 ? b.cljs$lang$arity$1(d) : b.call(null, d), cljs.core.truth_(e) ? c.cljs$lang$arity$1 ? c.cljs$lang$arity$1(d) : c.call(null, d) : e) : e
        }, m) : k
      }())
    }, p = function(a, b, c, d) {
      var e = null;
      goog.isDef(d) && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
      return n.call(this, a, b, c, e)
    };
    p.cljs$lang$maxFixedArity = 3;
    p.cljs$lang$applyTo = function(a) {
      var b = cljs.core.first(a), c = cljs.core.first(cljs.core.next(a)), d = cljs.core.first(cljs.core.next(cljs.core.next(a))), a = cljs.core.rest(cljs.core.next(cljs.core.next(a)));
      return n(b, c, d, a)
    };
    p.cljs$lang$arity$variadic = n;
    d = function(a, b, c, d) {
      switch(arguments.length) {
        case 0:
          return!0;
        case 1:
          return e.call(this, a);
        case 2:
          return f.call(this, a, b);
        case 3:
          return k.call(this, a, b, c);
        default:
          return p.cljs$lang$arity$variadic(a, b, c, cljs.core.array_seq(arguments, 3))
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    d.cljs$lang$maxFixedArity = 3;
    d.cljs$lang$applyTo = p.cljs$lang$applyTo;
    d.cljs$lang$arity$0 = function() {
      return!0
    };
    d.cljs$lang$arity$1 = e;
    d.cljs$lang$arity$2 = f;
    d.cljs$lang$arity$3 = k;
    d.cljs$lang$arity$variadic = p.cljs$lang$arity$variadic;
    return d
  }, e = function(a, b, c, d) {
    var e = cljs.core.list_STAR_.cljs$lang$arity$4(a, b, c, d), f = null, k = function(a) {
      return cljs.core.every_QMARK_(function(b) {
        return b.cljs$lang$arity$1 ? b.cljs$lang$arity$1(a) : b.call(null, a)
      }, e)
    }, n = function(a, b) {
      return cljs.core.every_QMARK_(function(c) {
        var d = c.cljs$lang$arity$1 ? c.cljs$lang$arity$1(a) : c.call(null, a);
        return cljs.core.truth_(d) ? c.cljs$lang$arity$1 ? c.cljs$lang$arity$1(b) : c.call(null, b) : d
      }, e)
    }, p = function(a, b, c) {
      return cljs.core.every_QMARK_(function(d) {
        var e = d.cljs$lang$arity$1 ? d.cljs$lang$arity$1(a) : d.call(null, a);
        return cljs.core.truth_(e) ? (e = d.cljs$lang$arity$1 ? d.cljs$lang$arity$1(b) : d.call(null, b), cljs.core.truth_(e) ? d.cljs$lang$arity$1 ? d.cljs$lang$arity$1(c) : d.call(null, c) : e) : e
      }, e)
    }, q = function(a, b, c, d) {
      return cljs.core.boolean$(function() {
        var g = f.cljs$lang$arity$3(a, b, c);
        return cljs.core.truth_(g) ? cljs.core.every_QMARK_(function(a) {
          return cljs.core.every_QMARK_(a, d)
        }, e) : g
      }())
    }, r = function(a, b, c, d) {
      var e = null;
      goog.isDef(d) && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
      return q.call(this, a, b, c, e)
    };
    r.cljs$lang$maxFixedArity = 3;
    r.cljs$lang$applyTo = function(a) {
      var b = cljs.core.first(a), c = cljs.core.first(cljs.core.next(a)), d = cljs.core.first(cljs.core.next(cljs.core.next(a))), a = cljs.core.rest(cljs.core.next(cljs.core.next(a)));
      return q(b, c, d, a)
    };
    r.cljs$lang$arity$variadic = q;
    f = function(a, b, c, d) {
      switch(arguments.length) {
        case 0:
          return!0;
        case 1:
          return k.call(this, a);
        case 2:
          return n.call(this, a, b);
        case 3:
          return p.call(this, a, b, c);
        default:
          return r.cljs$lang$arity$variadic(a, b, c, cljs.core.array_seq(arguments, 3))
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    f.cljs$lang$maxFixedArity = 3;
    f.cljs$lang$applyTo = r.cljs$lang$applyTo;
    f.cljs$lang$arity$0 = function() {
      return!0
    };
    f.cljs$lang$arity$1 = k;
    f.cljs$lang$arity$2 = n;
    f.cljs$lang$arity$3 = p;
    f.cljs$lang$arity$variadic = r.cljs$lang$arity$variadic;
    return f
  }, f = function(a, b, c, d) {
    var f = null;
    goog.isDef(d) && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
    return e.call(this, a, b, c, f)
  };
  f.cljs$lang$maxFixedArity = 3;
  f.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), c = cljs.core.first(cljs.core.next(a)), d = cljs.core.first(cljs.core.next(cljs.core.next(a))), a = cljs.core.rest(cljs.core.next(cljs.core.next(a)));
    return e(b, c, d, a)
  };
  f.cljs$lang$arity$variadic = e;
  a = function(a, e, i, j) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e);
      case 3:
        return d.call(this, a, e, i);
      default:
        return f.cljs$lang$arity$variadic(a, e, i, cljs.core.array_seq(arguments, 3))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 3;
  a.cljs$lang$applyTo = f.cljs$lang$applyTo;
  a.cljs$lang$arity$1 = b;
  a.cljs$lang$arity$2 = c;
  a.cljs$lang$arity$3 = d;
  a.cljs$lang$arity$variadic = f.cljs$lang$arity$variadic;
  return a
}();
cljs.core.some_fn = function() {
  var a = null, b = function(a) {
    var b = null, c = function(b) {
      return a.cljs$lang$arity$1 ? a.cljs$lang$arity$1(b) : a.call(null, b)
    }, d = function(b, c) {
      var d = a.cljs$lang$arity$1 ? a.cljs$lang$arity$1(b) : a.call(null, b);
      return cljs.core.truth_(d) ? d : a.cljs$lang$arity$1 ? a.cljs$lang$arity$1(c) : a.call(null, c)
    }, e = function(b, c, d) {
      b = a.cljs$lang$arity$1 ? a.cljs$lang$arity$1(b) : a.call(null, b);
      if(cljs.core.truth_(b)) {
        return b
      }
      c = a.cljs$lang$arity$1 ? a.cljs$lang$arity$1(c) : a.call(null, c);
      return cljs.core.truth_(c) ? c : a.cljs$lang$arity$1 ? a.cljs$lang$arity$1(d) : a.call(null, d)
    }, f = function(c, d, e, f) {
      c = b.cljs$lang$arity$3(c, d, e);
      return cljs.core.truth_(c) ? c : cljs.core.some(a, f)
    }, k = function(a, b, c, d) {
      var e = null;
      goog.isDef(d) && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
      return f.call(this, a, b, c, e)
    };
    k.cljs$lang$maxFixedArity = 3;
    k.cljs$lang$applyTo = function(a) {
      var b = cljs.core.first(a), c = cljs.core.first(cljs.core.next(a)), d = cljs.core.first(cljs.core.next(cljs.core.next(a))), a = cljs.core.rest(cljs.core.next(cljs.core.next(a)));
      return f(b, c, d, a)
    };
    k.cljs$lang$arity$variadic = f;
    b = function(a, b, f, g) {
      switch(arguments.length) {
        case 0:
          return null;
        case 1:
          return c.call(this, a);
        case 2:
          return d.call(this, a, b);
        case 3:
          return e.call(this, a, b, f);
        default:
          return k.cljs$lang$arity$variadic(a, b, f, cljs.core.array_seq(arguments, 3))
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    b.cljs$lang$maxFixedArity = 3;
    b.cljs$lang$applyTo = k.cljs$lang$applyTo;
    b.cljs$lang$arity$0 = function() {
      return null
    };
    b.cljs$lang$arity$1 = c;
    b.cljs$lang$arity$2 = d;
    b.cljs$lang$arity$3 = e;
    b.cljs$lang$arity$variadic = k.cljs$lang$arity$variadic;
    return b
  }, c = function(a, b) {
    var c = null, d = function(c) {
      var d = a.cljs$lang$arity$1 ? a.cljs$lang$arity$1(c) : a.call(null, c);
      return cljs.core.truth_(d) ? d : b.cljs$lang$arity$1 ? b.cljs$lang$arity$1(c) : b.call(null, c)
    }, e = function(c, d) {
      var e = a.cljs$lang$arity$1 ? a.cljs$lang$arity$1(c) : a.call(null, c);
      if(cljs.core.truth_(e)) {
        return e
      }
      e = a.cljs$lang$arity$1 ? a.cljs$lang$arity$1(d) : a.call(null, d);
      if(cljs.core.truth_(e)) {
        return e
      }
      e = b.cljs$lang$arity$1 ? b.cljs$lang$arity$1(c) : b.call(null, c);
      return cljs.core.truth_(e) ? e : b.cljs$lang$arity$1 ? b.cljs$lang$arity$1(d) : b.call(null, d)
    }, f = function(c, d, e) {
      var f = a.cljs$lang$arity$1 ? a.cljs$lang$arity$1(c) : a.call(null, c);
      if(cljs.core.truth_(f)) {
        return f
      }
      f = a.cljs$lang$arity$1 ? a.cljs$lang$arity$1(d) : a.call(null, d);
      if(cljs.core.truth_(f)) {
        return f
      }
      f = a.cljs$lang$arity$1 ? a.cljs$lang$arity$1(e) : a.call(null, e);
      if(cljs.core.truth_(f)) {
        return f
      }
      c = b.cljs$lang$arity$1 ? b.cljs$lang$arity$1(c) : b.call(null, c);
      if(cljs.core.truth_(c)) {
        return c
      }
      d = b.cljs$lang$arity$1 ? b.cljs$lang$arity$1(d) : b.call(null, d);
      return cljs.core.truth_(d) ? d : b.cljs$lang$arity$1 ? b.cljs$lang$arity$1(e) : b.call(null, e)
    }, k = function(d, e, f, j) {
      d = c.cljs$lang$arity$3(d, e, f);
      return cljs.core.truth_(d) ? d : cljs.core.some(function(c) {
        var d = a.cljs$lang$arity$1 ? a.cljs$lang$arity$1(c) : a.call(null, c);
        return cljs.core.truth_(d) ? d : b.cljs$lang$arity$1 ? b.cljs$lang$arity$1(c) : b.call(null, c)
      }, j)
    }, n = function(a, b, c, d) {
      var e = null;
      goog.isDef(d) && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
      return k.call(this, a, b, c, e)
    };
    n.cljs$lang$maxFixedArity = 3;
    n.cljs$lang$applyTo = function(a) {
      var b = cljs.core.first(a), c = cljs.core.first(cljs.core.next(a)), d = cljs.core.first(cljs.core.next(cljs.core.next(a))), a = cljs.core.rest(cljs.core.next(cljs.core.next(a)));
      return k(b, c, d, a)
    };
    n.cljs$lang$arity$variadic = k;
    c = function(a, b, c, g) {
      switch(arguments.length) {
        case 0:
          return null;
        case 1:
          return d.call(this, a);
        case 2:
          return e.call(this, a, b);
        case 3:
          return f.call(this, a, b, c);
        default:
          return n.cljs$lang$arity$variadic(a, b, c, cljs.core.array_seq(arguments, 3))
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    c.cljs$lang$maxFixedArity = 3;
    c.cljs$lang$applyTo = n.cljs$lang$applyTo;
    c.cljs$lang$arity$0 = function() {
      return null
    };
    c.cljs$lang$arity$1 = d;
    c.cljs$lang$arity$2 = e;
    c.cljs$lang$arity$3 = f;
    c.cljs$lang$arity$variadic = n.cljs$lang$arity$variadic;
    return c
  }, d = function(a, b, c) {
    var d = null, e = function(d) {
      var e = a.cljs$lang$arity$1 ? a.cljs$lang$arity$1(d) : a.call(null, d);
      if(cljs.core.truth_(e)) {
        return e
      }
      e = b.cljs$lang$arity$1 ? b.cljs$lang$arity$1(d) : b.call(null, d);
      return cljs.core.truth_(e) ? e : c.cljs$lang$arity$1 ? c.cljs$lang$arity$1(d) : c.call(null, d)
    }, f = function(d, e) {
      var f = a.cljs$lang$arity$1 ? a.cljs$lang$arity$1(d) : a.call(null, d);
      if(cljs.core.truth_(f)) {
        return f
      }
      f = b.cljs$lang$arity$1 ? b.cljs$lang$arity$1(d) : b.call(null, d);
      if(cljs.core.truth_(f)) {
        return f
      }
      f = c.cljs$lang$arity$1 ? c.cljs$lang$arity$1(d) : c.call(null, d);
      if(cljs.core.truth_(f)) {
        return f
      }
      f = a.cljs$lang$arity$1 ? a.cljs$lang$arity$1(e) : a.call(null, e);
      if(cljs.core.truth_(f)) {
        return f
      }
      f = b.cljs$lang$arity$1 ? b.cljs$lang$arity$1(e) : b.call(null, e);
      return cljs.core.truth_(f) ? f : c.cljs$lang$arity$1 ? c.cljs$lang$arity$1(e) : c.call(null, e)
    }, k = function(d, e, f) {
      var j = a.cljs$lang$arity$1 ? a.cljs$lang$arity$1(d) : a.call(null, d);
      if(cljs.core.truth_(j)) {
        return j
      }
      j = b.cljs$lang$arity$1 ? b.cljs$lang$arity$1(d) : b.call(null, d);
      if(cljs.core.truth_(j)) {
        return j
      }
      d = c.cljs$lang$arity$1 ? c.cljs$lang$arity$1(d) : c.call(null, d);
      if(cljs.core.truth_(d)) {
        return d
      }
      d = a.cljs$lang$arity$1 ? a.cljs$lang$arity$1(e) : a.call(null, e);
      if(cljs.core.truth_(d)) {
        return d
      }
      d = b.cljs$lang$arity$1 ? b.cljs$lang$arity$1(e) : b.call(null, e);
      if(cljs.core.truth_(d)) {
        return d
      }
      e = c.cljs$lang$arity$1 ? c.cljs$lang$arity$1(e) : c.call(null, e);
      if(cljs.core.truth_(e)) {
        return e
      }
      e = a.cljs$lang$arity$1 ? a.cljs$lang$arity$1(f) : a.call(null, f);
      if(cljs.core.truth_(e)) {
        return e
      }
      e = b.cljs$lang$arity$1 ? b.cljs$lang$arity$1(f) : b.call(null, f);
      return cljs.core.truth_(e) ? e : c.cljs$lang$arity$1 ? c.cljs$lang$arity$1(f) : c.call(null, f)
    }, n = function(e, f, l, k) {
      e = d.cljs$lang$arity$3(e, f, l);
      return cljs.core.truth_(e) ? e : cljs.core.some(function(d) {
        var e = a.cljs$lang$arity$1 ? a.cljs$lang$arity$1(d) : a.call(null, d);
        if(cljs.core.truth_(e)) {
          return e
        }
        e = b.cljs$lang$arity$1 ? b.cljs$lang$arity$1(d) : b.call(null, d);
        return cljs.core.truth_(e) ? e : c.cljs$lang$arity$1 ? c.cljs$lang$arity$1(d) : c.call(null, d)
      }, k)
    }, p = function(a, b, c, d) {
      var e = null;
      goog.isDef(d) && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
      return n.call(this, a, b, c, e)
    };
    p.cljs$lang$maxFixedArity = 3;
    p.cljs$lang$applyTo = function(a) {
      var b = cljs.core.first(a), c = cljs.core.first(cljs.core.next(a)), d = cljs.core.first(cljs.core.next(cljs.core.next(a))), a = cljs.core.rest(cljs.core.next(cljs.core.next(a)));
      return n(b, c, d, a)
    };
    p.cljs$lang$arity$variadic = n;
    d = function(a, b, c, d) {
      switch(arguments.length) {
        case 0:
          return null;
        case 1:
          return e.call(this, a);
        case 2:
          return f.call(this, a, b);
        case 3:
          return k.call(this, a, b, c);
        default:
          return p.cljs$lang$arity$variadic(a, b, c, cljs.core.array_seq(arguments, 3))
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    d.cljs$lang$maxFixedArity = 3;
    d.cljs$lang$applyTo = p.cljs$lang$applyTo;
    d.cljs$lang$arity$0 = function() {
      return null
    };
    d.cljs$lang$arity$1 = e;
    d.cljs$lang$arity$2 = f;
    d.cljs$lang$arity$3 = k;
    d.cljs$lang$arity$variadic = p.cljs$lang$arity$variadic;
    return d
  }, e = function(a, b, c, d) {
    var e = cljs.core.list_STAR_.cljs$lang$arity$4(a, b, c, d), f = null, k = function(a) {
      return cljs.core.some(function(b) {
        return b.cljs$lang$arity$1 ? b.cljs$lang$arity$1(a) : b.call(null, a)
      }, e)
    }, n = function(a, b) {
      return cljs.core.some(function(c) {
        var d = c.cljs$lang$arity$1 ? c.cljs$lang$arity$1(a) : c.call(null, a);
        return cljs.core.truth_(d) ? d : c.cljs$lang$arity$1 ? c.cljs$lang$arity$1(b) : c.call(null, b)
      }, e)
    }, p = function(a, b, c) {
      return cljs.core.some(function(d) {
        var e = d.cljs$lang$arity$1 ? d.cljs$lang$arity$1(a) : d.call(null, a);
        if(cljs.core.truth_(e)) {
          return e
        }
        e = d.cljs$lang$arity$1 ? d.cljs$lang$arity$1(b) : d.call(null, b);
        return cljs.core.truth_(e) ? e : d.cljs$lang$arity$1 ? d.cljs$lang$arity$1(c) : d.call(null, c)
      }, e)
    }, q = function(a, b, c, d) {
      a = f.cljs$lang$arity$3(a, b, c);
      return cljs.core.truth_(a) ? a : cljs.core.some(function(a) {
        return cljs.core.some(a, d)
      }, e)
    }, r = function(a, b, c, d) {
      var e = null;
      goog.isDef(d) && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
      return q.call(this, a, b, c, e)
    };
    r.cljs$lang$maxFixedArity = 3;
    r.cljs$lang$applyTo = function(a) {
      var b = cljs.core.first(a), c = cljs.core.first(cljs.core.next(a)), d = cljs.core.first(cljs.core.next(cljs.core.next(a))), a = cljs.core.rest(cljs.core.next(cljs.core.next(a)));
      return q(b, c, d, a)
    };
    r.cljs$lang$arity$variadic = q;
    f = function(a, b, c, d) {
      switch(arguments.length) {
        case 0:
          return null;
        case 1:
          return k.call(this, a);
        case 2:
          return n.call(this, a, b);
        case 3:
          return p.call(this, a, b, c);
        default:
          return r.cljs$lang$arity$variadic(a, b, c, cljs.core.array_seq(arguments, 3))
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    f.cljs$lang$maxFixedArity = 3;
    f.cljs$lang$applyTo = r.cljs$lang$applyTo;
    f.cljs$lang$arity$0 = function() {
      return null
    };
    f.cljs$lang$arity$1 = k;
    f.cljs$lang$arity$2 = n;
    f.cljs$lang$arity$3 = p;
    f.cljs$lang$arity$variadic = r.cljs$lang$arity$variadic;
    return f
  }, f = function(a, b, c, d) {
    var f = null;
    goog.isDef(d) && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
    return e.call(this, a, b, c, f)
  };
  f.cljs$lang$maxFixedArity = 3;
  f.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), c = cljs.core.first(cljs.core.next(a)), d = cljs.core.first(cljs.core.next(cljs.core.next(a))), a = cljs.core.rest(cljs.core.next(cljs.core.next(a)));
    return e(b, c, d, a)
  };
  f.cljs$lang$arity$variadic = e;
  a = function(a, e, i, j) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e);
      case 3:
        return d.call(this, a, e, i);
      default:
        return f.cljs$lang$arity$variadic(a, e, i, cljs.core.array_seq(arguments, 3))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 3;
  a.cljs$lang$applyTo = f.cljs$lang$applyTo;
  a.cljs$lang$arity$1 = b;
  a.cljs$lang$arity$2 = c;
  a.cljs$lang$arity$3 = d;
  a.cljs$lang$arity$variadic = f.cljs$lang$arity$variadic;
  return a
}();
cljs.core.map = function() {
  var a = null, b = function(b, c) {
    return new cljs.core.LazySeq(null, !1, function() {
      var d = cljs.core.seq(c);
      if(d) {
        if(cljs.core.chunked_seq_QMARK_(d)) {
          for(var e = cljs.core.chunk_first(d), f = cljs.core.count(e), m = cljs.core.chunk_buffer(f), k = 0;;) {
            if(k < f) {
              cljs.core.chunk_append(m, b.cljs$lang$arity$1 ? b.cljs$lang$arity$1(cljs.core._nth.cljs$lang$arity$2(e, k)) : b.call(null, cljs.core._nth.cljs$lang$arity$2(e, k))), k += 1
            }else {
              break
            }
          }
          return cljs.core.chunk_cons(cljs.core.chunk(m), a.cljs$lang$arity$2(b, cljs.core.chunk_rest(d)))
        }
        return cljs.core.cons(b.cljs$lang$arity$1 ? b.cljs$lang$arity$1(cljs.core.first(d)) : b.call(null, cljs.core.first(d)), a.cljs$lang$arity$2(b, cljs.core.rest(d)))
      }
      return null
    }, null)
  }, c = function(b, c, d) {
    return new cljs.core.LazySeq(null, !1, function() {
      var e = cljs.core.seq(c), f = cljs.core.seq(d);
      return cljs.core.truth_(e ? f : e) ? cljs.core.cons(b.cljs$lang$arity$2 ? b.cljs$lang$arity$2(cljs.core.first(e), cljs.core.first(f)) : b.call(null, cljs.core.first(e), cljs.core.first(f)), a.cljs$lang$arity$3(b, cljs.core.rest(e), cljs.core.rest(f))) : null
    }, null)
  }, d = function(b, c, d, e) {
    return new cljs.core.LazySeq(null, !1, function() {
      var f = cljs.core.seq(c), m = cljs.core.seq(d), k = cljs.core.seq(e);
      return cljs.core.truth_(f ? m ? k : m : f) ? cljs.core.cons(b.cljs$lang$arity$3 ? b.cljs$lang$arity$3(cljs.core.first(f), cljs.core.first(m), cljs.core.first(k)) : b.call(null, cljs.core.first(f), cljs.core.first(m), cljs.core.first(k)), a.cljs$lang$arity$4(b, cljs.core.rest(f), cljs.core.rest(m), cljs.core.rest(k))) : null
    }, null)
  }, e = function(b, c, d, e, f) {
    return a.cljs$lang$arity$2(function(a) {
      return cljs.core.apply.cljs$lang$arity$2(b, a)
    }, function k(b) {
      return new cljs.core.LazySeq(null, !1, function() {
        var c = a.cljs$lang$arity$2(cljs.core.seq, b);
        return cljs.core.every_QMARK_(cljs.core.identity, c) ? cljs.core.cons(a.cljs$lang$arity$2(cljs.core.first, c), k(a.cljs$lang$arity$2(cljs.core.rest, c))) : null
      }, null)
    }(cljs.core.conj.cljs$lang$arity$variadic(f, e, cljs.core.array_seq([d, c], 0))))
  }, f = function(a, b, c, d, f) {
    var m = null;
    goog.isDef(f) && (m = cljs.core.array_seq(Array.prototype.slice.call(arguments, 4), 0));
    return e.call(this, a, b, c, d, m)
  };
  f.cljs$lang$maxFixedArity = 4;
  f.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), c = cljs.core.first(cljs.core.next(a)), d = cljs.core.first(cljs.core.next(cljs.core.next(a))), f = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(a)))), a = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(a))));
    return e(b, c, d, f, a)
  };
  f.cljs$lang$arity$variadic = e;
  a = function(a, e, i, j, l) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, i);
      case 4:
        return d.call(this, a, e, i, j);
      default:
        return f.cljs$lang$arity$variadic(a, e, i, j, cljs.core.array_seq(arguments, 4))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 4;
  a.cljs$lang$applyTo = f.cljs$lang$applyTo;
  a.cljs$lang$arity$2 = b;
  a.cljs$lang$arity$3 = c;
  a.cljs$lang$arity$4 = d;
  a.cljs$lang$arity$variadic = f.cljs$lang$arity$variadic;
  return a
}();
cljs.core.take = function take(b, c) {
  return new cljs.core.LazySeq(null, !1, function() {
    if(0 < b) {
      var d = cljs.core.seq(c);
      return d ? cljs.core.cons(cljs.core.first(d), take(b - 1, cljs.core.rest(d))) : null
    }
    return null
  }, null)
};
cljs.core.drop = function(a, b) {
  return new cljs.core.LazySeq(null, !1, function() {
    var c;
    a: {
      var d = a;
      for(c = b;;) {
        var e = cljs.core.seq(c);
        if(cljs.core.truth_(function() {
          var a = 0 < d;
          return a ? e : a
        }())) {
          c = d - 1;
          var f = cljs.core.rest(e), d = c;
          c = f
        }else {
          c = e;
          break a
        }
      }
      c = void 0
    }
    return c
  }, null)
};
cljs.core.drop_last = function() {
  var a = null, b = function(b) {
    return a.cljs$lang$arity$2(1, b)
  }, c = function(a, b) {
    return cljs.core.map.cljs$lang$arity$3(function(a) {
      return a
    }, b, cljs.core.drop(a, b))
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$1 = b;
  a.cljs$lang$arity$2 = c;
  return a
}();
cljs.core.take_last = function(a, b) {
  for(var c = cljs.core.seq(b), d = cljs.core.seq(cljs.core.drop(a, b));;) {
    if(d) {
      c = cljs.core.next(c), d = cljs.core.next(d)
    }else {
      return c
    }
  }
};
cljs.core.drop_while = function(a, b) {
  return new cljs.core.LazySeq(null, !1, function() {
    var c;
    a: {
      var d = a;
      for(c = b;;) {
        var e = cljs.core.seq(c);
        if(cljs.core.truth_(function() {
          var a = e;
          return a ? d.cljs$lang$arity$1 ? d.cljs$lang$arity$1(cljs.core.first(e)) : d.call(null, cljs.core.first(e)) : a
        }())) {
          c = d;
          var f = cljs.core.rest(e), d = c;
          c = f
        }else {
          c = e;
          break a
        }
      }
      c = void 0
    }
    return c
  }, null)
};
cljs.core.cycle = function cycle(b) {
  return new cljs.core.LazySeq(null, !1, function() {
    var c = cljs.core.seq(b);
    return c ? cljs.core.concat.cljs$lang$arity$2(c, cycle(c)) : null
  }, null)
};
cljs.core.split_at = function(a, b) {
  return cljs.core.PersistentVector.fromArray([cljs.core.take(a, b), cljs.core.drop(a, b)], !0)
};
cljs.core.repeat = function() {
  var a = null, b = function(b) {
    return new cljs.core.LazySeq(null, !1, function() {
      return cljs.core.cons(b, a.cljs$lang$arity$1(b))
    }, null)
  }, c = function(b, c) {
    return cljs.core.take(b, a.cljs$lang$arity$1(c))
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$1 = b;
  a.cljs$lang$arity$2 = c;
  return a
}();
cljs.core.replicate = function(a, b) {
  return cljs.core.take(a, cljs.core.repeat.cljs$lang$arity$1(b))
};
cljs.core.repeatedly = function() {
  var a = null, b = function(b) {
    return new cljs.core.LazySeq(null, !1, function() {
      return cljs.core.cons(b.cljs$lang$arity$0 ? b.cljs$lang$arity$0() : b.call(null), a.cljs$lang$arity$1(b))
    }, null)
  }, c = function(b, c) {
    return cljs.core.take(b, a.cljs$lang$arity$1(c))
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$1 = b;
  a.cljs$lang$arity$2 = c;
  return a
}();
cljs.core.iterate = function iterate(b, c) {
  return cljs.core.cons(c, new cljs.core.LazySeq(null, !1, function() {
    return iterate(b, b.cljs$lang$arity$1 ? b.cljs$lang$arity$1(c) : b.call(null, c))
  }, null))
};
cljs.core.interleave = function() {
  var a = null, b = function(b, c) {
    return new cljs.core.LazySeq(null, !1, function() {
      var d = cljs.core.seq(b), h = cljs.core.seq(c);
      return cljs.core.truth_(d ? h : d) ? cljs.core.cons(cljs.core.first(d), cljs.core.cons(cljs.core.first(h), a.cljs$lang$arity$2(cljs.core.rest(d), cljs.core.rest(h)))) : null
    }, null)
  }, c = function(b, c, d) {
    return new cljs.core.LazySeq(null, !1, function() {
      var h = cljs.core.map.cljs$lang$arity$2(cljs.core.seq, cljs.core.conj.cljs$lang$arity$variadic(d, c, cljs.core.array_seq([b], 0)));
      return cljs.core.every_QMARK_(cljs.core.identity, h) ? cljs.core.concat.cljs$lang$arity$2(cljs.core.map.cljs$lang$arity$2(cljs.core.first, h), cljs.core.apply.cljs$lang$arity$2(a, cljs.core.map.cljs$lang$arity$2(cljs.core.rest, h))) : null
    }, null)
  }, d = function(a, b, d) {
    var h = null;
    goog.isDef(d) && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return c.call(this, a, b, h)
  };
  d.cljs$lang$maxFixedArity = 2;
  d.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), d = cljs.core.first(cljs.core.next(a)), a = cljs.core.rest(cljs.core.next(a));
    return c(b, d, a)
  };
  d.cljs$lang$arity$variadic = c;
  a = function(a, c, g) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, c);
      default:
        return d.cljs$lang$arity$variadic(a, c, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = d.cljs$lang$applyTo;
  a.cljs$lang$arity$2 = b;
  a.cljs$lang$arity$variadic = d.cljs$lang$arity$variadic;
  return a
}();
cljs.core.interpose = function(a, b) {
  return cljs.core.drop(1, cljs.core.interleave.cljs$lang$arity$2(cljs.core.repeat.cljs$lang$arity$1(a), b))
};
cljs.core.flatten1 = function(a) {
  return function c(a, e) {
    return new cljs.core.LazySeq(null, !1, function() {
      var f = cljs.core.seq(a);
      return f ? cljs.core.cons(cljs.core.first(f), c(cljs.core.rest(f), e)) : cljs.core.seq(e) ? c(cljs.core.first(e), cljs.core.rest(e)) : null
    }, null)
  }(null, a)
};
cljs.core.mapcat = function() {
  var a = null, b = function(a, b) {
    return cljs.core.flatten1(cljs.core.map.cljs$lang$arity$2(a, b))
  }, c = function(a, b, c) {
    return cljs.core.flatten1(cljs.core.apply.cljs$lang$arity$4(cljs.core.map, a, b, c))
  }, d = function(a, b, d) {
    var h = null;
    goog.isDef(d) && (h = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return c.call(this, a, b, h)
  };
  d.cljs$lang$maxFixedArity = 2;
  d.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), d = cljs.core.first(cljs.core.next(a)), a = cljs.core.rest(cljs.core.next(a));
    return c(b, d, a)
  };
  d.cljs$lang$arity$variadic = c;
  a = function(a, c, g) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, c);
      default:
        return d.cljs$lang$arity$variadic(a, c, cljs.core.array_seq(arguments, 2))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 2;
  a.cljs$lang$applyTo = d.cljs$lang$applyTo;
  a.cljs$lang$arity$2 = b;
  a.cljs$lang$arity$variadic = d.cljs$lang$arity$variadic;
  return a
}();
cljs.core.filter = function filter(b, c) {
  return new cljs.core.LazySeq(null, !1, function() {
    var d = cljs.core.seq(c);
    if(d) {
      if(cljs.core.chunked_seq_QMARK_(d)) {
        for(var e = cljs.core.chunk_first(d), f = cljs.core.count(e), g = cljs.core.chunk_buffer(f), h = 0;;) {
          if(h < f) {
            cljs.core.truth_(b.cljs$lang$arity$1 ? b.cljs$lang$arity$1(cljs.core._nth.cljs$lang$arity$2(e, h)) : b.call(null, cljs.core._nth.cljs$lang$arity$2(e, h))) && cljs.core.chunk_append(g, cljs.core._nth.cljs$lang$arity$2(e, h)), h += 1
          }else {
            break
          }
        }
        return cljs.core.chunk_cons(cljs.core.chunk(g), filter(b, cljs.core.chunk_rest(d)))
      }
      e = cljs.core.first(d);
      d = cljs.core.rest(d);
      return cljs.core.truth_(b.cljs$lang$arity$1 ? b.cljs$lang$arity$1(e) : b.call(null, e)) ? cljs.core.cons(e, filter(b, d)) : filter(b, d)
    }
    return null
  }, null)
};
cljs.core.remove = function(a, b) {
  return cljs.core.filter(cljs.core.complement(a), b)
};
cljs.core.tree_seq = function(a, b, c) {
  return function e(c) {
    return new cljs.core.LazySeq(null, !1, function() {
      return cljs.core.cons(c, cljs.core.truth_(a.cljs$lang$arity$1 ? a.cljs$lang$arity$1(c) : a.call(null, c)) ? cljs.core.mapcat.cljs$lang$arity$2(e, b.cljs$lang$arity$1 ? b.cljs$lang$arity$1(c) : b.call(null, c)) : null)
    }, null)
  }(c)
};
cljs.core.flatten = function(a) {
  return cljs.core.filter(function(a) {
    return!cljs.core.sequential_QMARK_(a)
  }, cljs.core.rest(cljs.core.tree_seq(cljs.core.sequential_QMARK_, cljs.core.seq, a)))
};
cljs.core.into = function(a, b) {
  return cljs.core.truth_(a ? cljs.core.truth_(function() {
    var b = a.cljs$lang$protocol_mask$partition1$ & 4;
    return b ? b : a.cljs$core$IEditableCollection$
  }()) ? !0 : a.cljs$lang$protocol_mask$partition1$ ? !1 : cljs.core.type_satisfies_(cljs.core.IEditableCollection, a) : cljs.core.type_satisfies_(cljs.core.IEditableCollection, a)) ? cljs.core.persistent_BANG_(cljs.core.reduce.cljs$lang$arity$3(cljs.core._conj_BANG_, cljs.core.transient$(a), b)) : cljs.core.reduce.cljs$lang$arity$3(cljs.core._conj, a, b)
};
cljs.core.mapv = function() {
  var a = null, b = function(a, b) {
    return cljs.core.persistent_BANG_(cljs.core.reduce.cljs$lang$arity$3(function(b, c) {
      return cljs.core.conj_BANG_(b, a.cljs$lang$arity$1 ? a.cljs$lang$arity$1(c) : a.call(null, c))
    }, cljs.core.transient$(cljs.core.PersistentVector.EMPTY), b))
  }, c = function(a, b, c) {
    return cljs.core.into(cljs.core.PersistentVector.EMPTY, cljs.core.map.cljs$lang$arity$3(a, b, c))
  }, d = function(a, b, c, d) {
    return cljs.core.into(cljs.core.PersistentVector.EMPTY, cljs.core.map.cljs$lang$arity$4(a, b, c, d))
  }, e = function(a, b, c, d, e) {
    return cljs.core.into(cljs.core.PersistentVector.EMPTY, cljs.core.apply.cljs$lang$arity$variadic(cljs.core.map, a, b, c, d, cljs.core.array_seq([e], 0)))
  }, f = function(a, b, c, d, f) {
    var m = null;
    goog.isDef(f) && (m = cljs.core.array_seq(Array.prototype.slice.call(arguments, 4), 0));
    return e.call(this, a, b, c, d, m)
  };
  f.cljs$lang$maxFixedArity = 4;
  f.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), c = cljs.core.first(cljs.core.next(a)), d = cljs.core.first(cljs.core.next(cljs.core.next(a))), f = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(a)))), a = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(a))));
    return e(b, c, d, f, a)
  };
  f.cljs$lang$arity$variadic = e;
  a = function(a, e, i, j, l) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, i);
      case 4:
        return d.call(this, a, e, i, j);
      default:
        return f.cljs$lang$arity$variadic(a, e, i, j, cljs.core.array_seq(arguments, 4))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 4;
  a.cljs$lang$applyTo = f.cljs$lang$applyTo;
  a.cljs$lang$arity$2 = b;
  a.cljs$lang$arity$3 = c;
  a.cljs$lang$arity$4 = d;
  a.cljs$lang$arity$variadic = f.cljs$lang$arity$variadic;
  return a
}();
cljs.core.filterv = function(a, b) {
  return cljs.core.persistent_BANG_(cljs.core.reduce.cljs$lang$arity$3(function(b, d) {
    return cljs.core.truth_(a.cljs$lang$arity$1 ? a.cljs$lang$arity$1(d) : a.call(null, d)) ? cljs.core.conj_BANG_(b, d) : b
  }, cljs.core.transient$(cljs.core.PersistentVector.EMPTY), b))
};
cljs.core.partition = function() {
  var a = null, b = function(b, c) {
    return a.cljs$lang$arity$3(b, b, c)
  }, c = function(b, c, d) {
    return new cljs.core.LazySeq(null, !1, function() {
      var h = cljs.core.seq(d);
      if(h) {
        var i = cljs.core.take(b, h);
        return b === cljs.core.count(i) ? cljs.core.cons(i, a.cljs$lang$arity$3(b, c, cljs.core.drop(c, h))) : null
      }
      return null
    }, null)
  }, d = function(b, c, d, h) {
    return new cljs.core.LazySeq(null, !1, function() {
      var i = cljs.core.seq(h);
      if(i) {
        var j = cljs.core.take(b, i);
        return b === cljs.core.count(j) ? cljs.core.cons(j, a.cljs$lang$arity$4(b, c, d, cljs.core.drop(c, i))) : cljs.core.list.cljs$lang$arity$1(cljs.core.take(b, cljs.core.concat.cljs$lang$arity$2(j, d)))
      }
      return null
    }, null)
  }, a = function(a, f, g, h) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, f);
      case 3:
        return c.call(this, a, f, g);
      case 4:
        return d.call(this, a, f, g, h)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$2 = b;
  a.cljs$lang$arity$3 = c;
  a.cljs$lang$arity$4 = d;
  return a
}();
cljs.core.get_in = function() {
  var a = null, b = function(b, c) {
    return a.cljs$lang$arity$3(b, c, null)
  }, c = function(a, b, c) {
    for(var g = cljs.core.lookup_sentinel, h = a, a = cljs.core.seq(b);;) {
      if(a) {
        if(cljs.core.not(function() {
          var a = h;
          return a ? cljs.core.truth_(function() {
            var b = a.cljs$lang$protocol_mask$partition0$ & 256;
            return b ? b : a.cljs$core$ILookup$
          }()) ? !0 : a.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.type_satisfies_(cljs.core.ILookup, a) : cljs.core.type_satisfies_(cljs.core.ILookup, a)
        }())) {
          return c
        }
        b = cljs.core._lookup.cljs$lang$arity$3(h, cljs.core.first(a), g);
        if(g === b) {
          return c
        }
        a = cljs.core.next(a);
        h = b
      }else {
        return h
      }
    }
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$2 = b;
  a.cljs$lang$arity$3 = c;
  return a
}();
cljs.core.assoc_in = function assoc_in(b, c, d) {
  var e = cljs.core.nth.cljs$lang$arity$3(c, 0, null), c = cljs.core.nthnext(c, 1);
  return cljs.core.truth_(c) ? cljs.core.assoc.cljs$lang$arity$3(b, e, assoc_in(cljs.core._lookup.cljs$lang$arity$3(b, e, null), c, d)) : cljs.core.assoc.cljs$lang$arity$3(b, e, d)
};
cljs.core.update_in = function() {
  var a = function(a, d, e, f) {
    var g = cljs.core.nth.cljs$lang$arity$3(d, 0, null), d = cljs.core.nthnext(d, 1);
    return cljs.core.truth_(d) ? cljs.core.assoc.cljs$lang$arity$3(a, g, cljs.core.apply.cljs$lang$arity$5(b, cljs.core._lookup.cljs$lang$arity$3(a, g, null), d, e, f)) : cljs.core.assoc.cljs$lang$arity$3(a, g, cljs.core.apply.cljs$lang$arity$3(e, cljs.core._lookup.cljs$lang$arity$3(a, g, null), f))
  }, b = function(b, d, e, f) {
    var g = null;
    goog.isDef(f) && (g = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
    return a.call(this, b, d, e, g)
  };
  b.cljs$lang$maxFixedArity = 3;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), e = cljs.core.first(cljs.core.next(b)), f = cljs.core.first(cljs.core.next(cljs.core.next(b))), b = cljs.core.rest(cljs.core.next(cljs.core.next(b)));
    return a(d, e, f, b)
  };
  b.cljs$lang$arity$variadic = a;
  return b
}();
cljs.core.Vector = function(a, b, c) {
  this.meta = a;
  this.array = b;
  this.__hash = c;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 32400159
};
cljs.core.Vector.cljs$lang$type = !0;
cljs.core.Vector.cljs$lang$ctorPrSeq = function() {
  return cljs.core.list.cljs$lang$arity$1("cljs.core/Vector")
};
cljs.core.Vector.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/Vector")
};
cljs.core.Vector.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  var b = this.__hash;
  return null != b ? b : this.__hash = a = cljs.core.hash_coll(a)
};
cljs.core.Vector.prototype.cljs$core$ILookup$_lookup$arity$2 = function(a, b) {
  return a.cljs$core$IIndexed$_nth$arity$3(a, b, null)
};
cljs.core.Vector.prototype.cljs$core$ILookup$_lookup$arity$3 = function(a, b, c) {
  return a.cljs$core$IIndexed$_nth$arity$3(a, b, c)
};
cljs.core.Vector.prototype.cljs$core$IAssociative$_assoc$arity$3 = function(a, b, c) {
  a = this.array.slice();
  a[b] = c;
  return new cljs.core.Vector(this.meta, a, null)
};
cljs.core.Vector.prototype.call = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return this.cljs$core$ILookup$_lookup$arity$2(this, c);
      case 3:
        return this.cljs$core$ILookup$_lookup$arity$3(this, c, d)
    }
    throw Error("Invalid arity: " + arguments.length);
  }
}();
cljs.core.Vector.prototype.apply = function(a, b) {
  a = this;
  return a.call.apply(a, [a].concat(b.slice()))
};
cljs.core.Vector.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  var c = this.array.slice();
  c.push(b);
  return new cljs.core.Vector(this.meta, c, null)
};
cljs.core.Vector.prototype.toString = function() {
  return cljs.core.pr_str.cljs$lang$arity$1 ? cljs.core.pr_str.cljs$lang$arity$1(this) : cljs.core.pr_str.call(null, this)
};
cljs.core.Vector.prototype.cljs$core$IReduce$_reduce$arity$2 = function(a, b) {
  return cljs.core.ci_reduce.cljs$lang$arity$2(this.array, b)
};
cljs.core.Vector.prototype.cljs$core$IReduce$_reduce$arity$3 = function(a, b, c) {
  return cljs.core.ci_reduce.cljs$lang$arity$3(this.array, b, c)
};
cljs.core.Vector.prototype.cljs$core$ISeqable$_seq$arity$1 = function() {
  var a = this;
  return 0 < a.array.length ? function c(d) {
    return new cljs.core.LazySeq(null, !1, function() {
      return d < a.array.length ? cljs.core.cons(a.array[d], c(d + 1)) : null
    }, null)
  }(0) : null
};
cljs.core.Vector.prototype.cljs$core$ICounted$_count$arity$1 = function() {
  return this.array.length
};
cljs.core.Vector.prototype.cljs$core$IStack$_peek$arity$1 = function() {
  var a = this.array.length;
  return 0 < a ? this.array[a - 1] : null
};
cljs.core.Vector.prototype.cljs$core$IStack$_pop$arity$1 = function() {
  if(0 < this.array.length) {
    var a = this.array.slice();
    a.pop();
    return new cljs.core.Vector(this.meta, a, null)
  }
  throw Error("Can't pop empty vector");
};
cljs.core.Vector.prototype.cljs$core$IVector$_assoc_n$arity$3 = function(a, b, c) {
  return a.cljs$core$IAssociative$_assoc$arity$3(a, b, c)
};
cljs.core.Vector.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_sequential(a, b)
};
cljs.core.Vector.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.Vector(b, this.array, this.__hash)
};
cljs.core.Vector.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
  return this.meta
};
cljs.core.Vector.prototype.cljs$core$IIndexed$_nth$arity$2 = function(a, b) {
  var c = this;
  return cljs.core.truth_(function() {
    var a = 0 <= b;
    return a ? b < c.array.length : a
  }()) ? c.array[b] : null
};
cljs.core.Vector.prototype.cljs$core$IIndexed$_nth$arity$3 = function(a, b, c) {
  var d = this;
  return cljs.core.truth_(function() {
    var a = 0 <= b;
    return a ? b < d.array.length : a
  }()) ? d.array[b] : c
};
cljs.core.Vector.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function() {
  return cljs.core.with_meta(cljs.core.Vector.EMPTY, this.meta)
};
cljs.core.Vector.EMPTY = new cljs.core.Vector(null, [], 0);
cljs.core.Vector.fromArray = function(a) {
  return new cljs.core.Vector(null, a, null)
};
cljs.core.VectorNode = function(a, b) {
  this.edit = a;
  this.arr = b
};
cljs.core.VectorNode.cljs$lang$type = !0;
cljs.core.VectorNode.cljs$lang$ctorPrSeq = function() {
  return cljs.core.list.cljs$lang$arity$1("cljs.core/VectorNode")
};
cljs.core.VectorNode.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/VectorNode")
};
cljs.core.pv_fresh_node = function(a) {
  return new cljs.core.VectorNode(a, cljs.core.make_array.cljs$lang$arity$1(32))
};
cljs.core.pv_aget = function(a, b) {
  return a.arr[b]
};
cljs.core.pv_aset = function(a, b, c) {
  return a.arr[b] = c
};
cljs.core.pv_clone_node = function(a) {
  return new cljs.core.VectorNode(a.edit, a.arr.slice())
};
cljs.core.tail_off = function(a) {
  a = a.cnt;
  return 32 > a ? 0 : a - 1 >>> 5 << 5
};
cljs.core.new_path = function(a, b, c) {
  for(;;) {
    if(0 === b) {
      return c
    }
    var d = cljs.core.pv_fresh_node(a);
    cljs.core.pv_aset(d, 0, c);
    c = d;
    b -= 5
  }
};
cljs.core.push_tail = function push_tail(b, c, d, e) {
  var f = cljs.core.pv_clone_node(d), g = b.cnt - 1 >>> c & 31;
  5 === c ? cljs.core.pv_aset(f, g, e) : (d = cljs.core.pv_aget(d, g), b = null != d ? push_tail(b, c - 5, d, e) : cljs.core.new_path(null, c - 5, e), cljs.core.pv_aset(f, g, b));
  return f
};
cljs.core.array_for = function(a, b) {
  if(cljs.core.truth_(function() {
    var c = 0 <= b;
    return c ? b < a.cnt : c
  }())) {
    if(b >= cljs.core.tail_off(a)) {
      return a.tail
    }
    for(var c = a.root, d = a.shift;;) {
      if(0 < d) {
        c = cljs.core.pv_aget(c, b >>> d & 31), d -= 5
      }else {
        return c.arr
      }
    }
  }else {
    throw Error([cljs.core.str("No item "), cljs.core.str(b), cljs.core.str(" in vector of length "), cljs.core.str(a.cnt)].join(""));
  }
};
cljs.core.do_assoc = function do_assoc(b, c, d, e, f) {
  var g = cljs.core.pv_clone_node(d);
  if(0 === c) {
    cljs.core.pv_aset(g, e & 31, f)
  }else {
    var h = e >>> c & 31;
    cljs.core.pv_aset(g, h, do_assoc(b, c - 5, cljs.core.pv_aget(d, h), e, f))
  }
  return g
};
cljs.core.pop_tail = function pop_tail(b, c, d) {
  var e = b.cnt - 2 >>> c & 31;
  if(5 < c) {
    var f = pop_tail(b, c - 5, cljs.core.pv_aget(d, e));
    if(cljs.core.truth_(function() {
      var b = null == f;
      return b ? 0 === e : b
    }())) {
      return null
    }
    b = cljs.core.pv_clone_node(d);
    cljs.core.pv_aset(b, e, f);
    return b
  }
  if(0 === e) {
    return null
  }
  b = cljs.core.pv_clone_node(d);
  cljs.core.pv_aset(b, e, null);
  return b
};
cljs.core.tv_editable_root = void 0;
cljs.core.tv_editable_tail = void 0;
cljs.core.TransientVector = void 0;
cljs.core.deref = void 0;
cljs.core.pr_sequential = void 0;
cljs.core.pr_sequential_writer = void 0;
cljs.core.pr_writer = void 0;
cljs.core.chunked_seq = void 0;
cljs.core.PersistentVector = function(a, b, c, d, e, f) {
  this.meta = a;
  this.cnt = b;
  this.shift = c;
  this.root = d;
  this.tail = e;
  this.__hash = f;
  this.cljs$lang$protocol_mask$partition1$ = 4;
  this.cljs$lang$protocol_mask$partition0$ = 167668511
};
cljs.core.PersistentVector.cljs$lang$type = !0;
cljs.core.PersistentVector.cljs$lang$ctorPrSeq = function() {
  return cljs.core.list.cljs$lang$arity$1("cljs.core/PersistentVector")
};
cljs.core.PersistentVector.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/PersistentVector")
};
cljs.core.PersistentVector.prototype.cljs$core$IEditableCollection$_as_transient$arity$1 = function() {
  return new cljs.core.TransientVector(this.cnt, this.shift, cljs.core.tv_editable_root.cljs$lang$arity$1 ? cljs.core.tv_editable_root.cljs$lang$arity$1(this.root) : cljs.core.tv_editable_root.call(null, this.root), cljs.core.tv_editable_tail.cljs$lang$arity$1 ? cljs.core.tv_editable_tail.cljs$lang$arity$1(this.tail) : cljs.core.tv_editable_tail.call(null, this.tail))
};
cljs.core.PersistentVector.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  var b = this.__hash;
  return null != b ? b : this.__hash = a = cljs.core.hash_coll(a)
};
cljs.core.PersistentVector.prototype.cljs$core$ILookup$_lookup$arity$2 = function(a, b) {
  return a.cljs$core$IIndexed$_nth$arity$3(a, b, null)
};
cljs.core.PersistentVector.prototype.cljs$core$ILookup$_lookup$arity$3 = function(a, b, c) {
  return a.cljs$core$IIndexed$_nth$arity$3(a, b, c)
};
cljs.core.PersistentVector.prototype.cljs$core$IAssociative$_assoc$arity$3 = function(a, b, c) {
  var d = this;
  if(cljs.core.truth_(function() {
    var a = 0 <= b;
    return a ? b < d.cnt : a
  }())) {
    return cljs.core.tail_off(a) <= b ? (a = d.tail.slice(), a[b & 31] = c, new cljs.core.PersistentVector(d.meta, d.cnt, d.shift, d.root, a, null)) : new cljs.core.PersistentVector(d.meta, d.cnt, d.shift, cljs.core.do_assoc(a, d.shift, d.root, b, c), d.tail, null)
  }
  if(b === d.cnt) {
    return a.cljs$core$ICollection$_conj$arity$2(a, c)
  }
  throw Error([cljs.core.str("Index "), cljs.core.str(b), cljs.core.str(" out of bounds  [0,"), cljs.core.str(d.cnt), cljs.core.str("]")].join(""));
};
cljs.core.PersistentVector.prototype.call = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return this.cljs$core$ILookup$_lookup$arity$2(this, c);
      case 3:
        return this.cljs$core$ILookup$_lookup$arity$3(this, c, d)
    }
    throw Error("Invalid arity: " + arguments.length);
  }
}();
cljs.core.PersistentVector.prototype.apply = function(a, b) {
  a = this;
  return a.call.apply(a, [a].concat(b.slice()))
};
cljs.core.PersistentVector.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = function(a, b, c) {
  for(var c = [0, c], d = 0;;) {
    if(d < this.cnt) {
      var e = cljs.core.array_for(a, d), f = e.length;
      a: {
        for(var g = 0, h = c[1];;) {
          if(g < f) {
            if(h = b.cljs$lang$arity$3 ? b.cljs$lang$arity$3(h, g + d, e[g]) : b.call(null, h, g + d, e[g]), cljs.core.reduced_QMARK_(h)) {
              e = h;
              break a
            }else {
              g += 1
            }
          }else {
            c[0] = f;
            e = c[1] = h;
            break a
          }
        }
        e = void 0
      }
      if(cljs.core.reduced_QMARK_(e)) {
        return cljs.core.deref.cljs$lang$arity$1 ? cljs.core.deref.cljs$lang$arity$1(e) : cljs.core.deref.call(null, e)
      }
      d += c[0]
    }else {
      return c[1]
    }
  }
};
cljs.core.PersistentVector.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  if(32 > this.cnt - cljs.core.tail_off(a)) {
    var c = this.tail.slice();
    c.push(b);
    return new cljs.core.PersistentVector(this.meta, this.cnt + 1, this.shift, this.root, c, null)
  }
  var d = this.cnt >>> 5 > 1 << this.shift, c = d ? this.shift + 5 : this.shift;
  d ? (d = cljs.core.pv_fresh_node(null), cljs.core.pv_aset(d, 0, this.root), cljs.core.pv_aset(d, 1, cljs.core.new_path(null, this.shift, new cljs.core.VectorNode(null, this.tail)))) : d = cljs.core.push_tail(a, this.shift, this.root, new cljs.core.VectorNode(null, this.tail));
  return new cljs.core.PersistentVector(this.meta, this.cnt + 1, c, d, [b], null)
};
cljs.core.PersistentVector.prototype.cljs$core$IReversible$_rseq$arity$1 = function(a) {
  return 0 < this.cnt ? new cljs.core.RSeq(a, this.cnt - 1, null) : cljs.core.List.EMPTY
};
cljs.core.PersistentVector.prototype.cljs$core$IMapEntry$_key$arity$1 = function(a) {
  return a.cljs$core$IIndexed$_nth$arity$2(a, 0)
};
cljs.core.PersistentVector.prototype.cljs$core$IMapEntry$_val$arity$1 = function(a) {
  return a.cljs$core$IIndexed$_nth$arity$2(a, 1)
};
cljs.core.PersistentVector.prototype.toString = function() {
  return cljs.core.pr_str.cljs$lang$arity$1 ? cljs.core.pr_str.cljs$lang$arity$1(this) : cljs.core.pr_str.call(null, this)
};
cljs.core.PersistentVector.prototype.cljs$core$IReduce$_reduce$arity$2 = function(a, b) {
  return cljs.core.ci_reduce.cljs$lang$arity$2(a, b)
};
cljs.core.PersistentVector.prototype.cljs$core$IReduce$_reduce$arity$3 = function(a, b, c) {
  return cljs.core.ci_reduce.cljs$lang$arity$3(a, b, c)
};
cljs.core.PersistentVector.prototype.cljs$core$ISeqable$_seq$arity$1 = function(a) {
  return 0 === this.cnt ? null : cljs.core.chunked_seq.cljs$lang$arity$3 ? cljs.core.chunked_seq.cljs$lang$arity$3(a, 0, 0) : cljs.core.chunked_seq.call(null, a, 0, 0)
};
cljs.core.PersistentVector.prototype.cljs$core$ICounted$_count$arity$1 = function() {
  return this.cnt
};
cljs.core.PersistentVector.prototype.cljs$core$IStack$_peek$arity$1 = function(a) {
  return 0 < this.cnt ? a.cljs$core$IIndexed$_nth$arity$2(a, this.cnt - 1) : null
};
cljs.core.PersistentVector.prototype.cljs$core$IStack$_pop$arity$1 = function(a) {
  var b = this;
  if(0 === b.cnt) {
    throw Error("Can't pop empty vector");
  }
  if(1 === b.cnt) {
    return cljs.core._with_meta(cljs.core.PersistentVector.EMPTY, b.meta)
  }
  if(1 < b.cnt - cljs.core.tail_off(a)) {
    return new cljs.core.PersistentVector(b.meta, b.cnt - 1, b.shift, b.root, b.tail.slice(0, -1), null)
  }
  var c = cljs.core.array_for(a, b.cnt - 2), a = cljs.core.pop_tail(a, b.shift, b.root), d = null == a ? cljs.core.PersistentVector.EMPTY_NODE : a, a = b.cnt - 1;
  return cljs.core.truth_(function() {
    var a = 5 < b.shift;
    return a ? null == cljs.core.pv_aget(d, 1) : a
  }()) ? new cljs.core.PersistentVector(b.meta, a, b.shift - 5, cljs.core.pv_aget(d, 0), c, null) : new cljs.core.PersistentVector(b.meta, a, b.shift, d, c, null)
};
cljs.core.PersistentVector.prototype.cljs$core$IVector$_assoc_n$arity$3 = function(a, b, c) {
  return a.cljs$core$IAssociative$_assoc$arity$3(a, b, c)
};
cljs.core.PersistentVector.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_sequential(a, b)
};
cljs.core.PersistentVector.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.PersistentVector(b, this.cnt, this.shift, this.root, this.tail, this.__hash)
};
cljs.core.PersistentVector.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
  return this.meta
};
cljs.core.PersistentVector.prototype.cljs$core$IIndexed$_nth$arity$2 = function(a, b) {
  return cljs.core.array_for(a, b)[b & 31]
};
cljs.core.PersistentVector.prototype.cljs$core$IIndexed$_nth$arity$3 = function(a, b, c) {
  var d = this;
  return cljs.core.truth_(function() {
    var a = 0 <= b;
    return a ? b < d.cnt : a
  }()) ? a.cljs$core$IIndexed$_nth$arity$2(a, b) : c
};
cljs.core.PersistentVector.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function() {
  return cljs.core.with_meta(cljs.core.PersistentVector.EMPTY, this.meta)
};
cljs.core.PersistentVector.EMPTY_NODE = cljs.core.pv_fresh_node(null);
cljs.core.PersistentVector.EMPTY = new cljs.core.PersistentVector(null, 0, 5, cljs.core.PersistentVector.EMPTY_NODE, [], 0);
cljs.core.PersistentVector.fromArray = function(a, b) {
  var c = a.length, d = !0 === b ? a : a.slice();
  if(32 > c) {
    return new cljs.core.PersistentVector(null, c, 5, cljs.core.PersistentVector.EMPTY_NODE, d, null)
  }
  for(var e = d.slice(0, 32), f = new cljs.core.PersistentVector(null, 32, 5, cljs.core.PersistentVector.EMPTY_NODE, e, null), e = 32, g = cljs.core._as_transient(f);;) {
    if(e < c) {
      f = e + 1, g = cljs.core.conj_BANG_(g, d[e]), e = f
    }else {
      return cljs.core.persistent_BANG_(g)
    }
  }
};
cljs.core.vec = function(a) {
  return cljs.core._persistent_BANG_(cljs.core.reduce.cljs$lang$arity$3(cljs.core._conj_BANG_, cljs.core._as_transient(cljs.core.PersistentVector.EMPTY), a))
};
cljs.core.vector = function() {
  var a = function(a) {
    return cljs.core.vec(a)
  }, b = function(b) {
    var d = null;
    goog.isDef(b) && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a(b)
  };
  b.cljs$lang$arity$variadic = a;
  return b
}();
cljs.core.ChunkedSeq = function(a, b, c, d, e, f) {
  this.vec = a;
  this.node = b;
  this.i = c;
  this.off = d;
  this.meta = e;
  this.__hash = f;
  this.cljs$lang$protocol_mask$partition0$ = 31719660;
  this.cljs$lang$protocol_mask$partition1$ = 1536
};
cljs.core.ChunkedSeq.cljs$lang$type = !0;
cljs.core.ChunkedSeq.cljs$lang$ctorPrSeq = function() {
  return cljs.core.list.cljs$lang$arity$1("cljs.core/ChunkedSeq")
};
cljs.core.ChunkedSeq.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/ChunkedSeq")
};
cljs.core.ChunkedSeq.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  var b = this.__hash;
  return null != b ? b : this.__hash = a = cljs.core.hash_coll(a)
};
cljs.core.ChunkedSeq.prototype.cljs$core$INext$_next$arity$1 = function(a) {
  return this.off + 1 < this.node.length ? (a = cljs.core.chunked_seq.cljs$lang$arity$4 ? cljs.core.chunked_seq.cljs$lang$arity$4(this.vec, this.node, this.i, this.off + 1) : cljs.core.chunked_seq.call(null, this.vec, this.node, this.i, this.off + 1), null == a ? null : a) : a.cljs$core$IChunkedNext$_chunked_next$arity$1(a)
};
cljs.core.ChunkedSeq.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return cljs.core.cons(b, a)
};
cljs.core.ChunkedSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = function(a) {
  return a
};
cljs.core.ChunkedSeq.prototype.cljs$core$ISeq$_first$arity$1 = function() {
  return this.node[this.off]
};
cljs.core.ChunkedSeq.prototype.cljs$core$ISeq$_rest$arity$1 = function(a) {
  return this.off + 1 < this.node.length ? (a = cljs.core.chunked_seq.cljs$lang$arity$4 ? cljs.core.chunked_seq.cljs$lang$arity$4(this.vec, this.node, this.i, this.off + 1) : cljs.core.chunked_seq.call(null, this.vec, this.node, this.i, this.off + 1), null == a ? cljs.core.List.EMPTY : a) : a.cljs$core$IChunkedSeq$_chunked_rest$arity$1(a)
};
cljs.core.ChunkedSeq.prototype.cljs$core$IChunkedNext$_chunked_next$arity$1 = function() {
  var a = this.node.length, a = this.i + a < cljs.core._count(this.vec) ? cljs.core.chunked_seq.cljs$lang$arity$3 ? cljs.core.chunked_seq.cljs$lang$arity$3(this.vec, this.i + a, 0) : cljs.core.chunked_seq.call(null, this.vec, this.i + a, 0) : null;
  return null == a ? null : a
};
cljs.core.ChunkedSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_sequential(a, b)
};
cljs.core.ChunkedSeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return cljs.core.chunked_seq.cljs$lang$arity$5 ? cljs.core.chunked_seq.cljs$lang$arity$5(this.vec, this.node, this.i, this.off, b) : cljs.core.chunked_seq.call(null, this.vec, this.node, this.i, this.off, b)
};
cljs.core.ChunkedSeq.prototype.cljs$core$IWithMeta$_meta$arity$1 = function() {
  return this.meta
};
cljs.core.ChunkedSeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function() {
  return cljs.core.with_meta(cljs.core.PersistentVector.EMPTY, this.meta)
};
cljs.core.ChunkedSeq.prototype.cljs$core$IChunkedSeq$_chunked_first$arity$1 = function() {
  return cljs.core.array_chunk.cljs$lang$arity$2(this.node, this.off)
};
cljs.core.ChunkedSeq.prototype.cljs$core$IChunkedSeq$_chunked_rest$arity$1 = function() {
  var a = this.node.length, a = this.i + a < cljs.core._count(this.vec) ? cljs.core.chunked_seq.cljs$lang$arity$3 ? cljs.core.chunked_seq.cljs$lang$arity$3(this.vec, this.i + a, 0) : cljs.core.chunked_seq.call(null, this.vec, this.i + a, 0) : null;
  return null == a ? cljs.core.List.EMPTY : a
};
cljs.core.chunked_seq = function() {
  var a = null, b = function(b, c, d) {
    return a.cljs$lang$arity$5(b, cljs.core.array_for(b, c), c, d, null)
  }, c = function(b, c, d, h) {
    return a.cljs$lang$arity$5(b, c, d, h, null)
  }, d = function(a, b, c, d, i) {
    return new cljs.core.ChunkedSeq(a, b, c, d, i, null)
  }, a = function(a, f, g, h, i) {
    switch(arguments.length) {
      case 3:
        return b.call(this, a, f, g);
      case 4:
        return c.call(this, a, f, g, h);
      case 5:
        return d.call(this, a, f, g, h, i)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$3 = b;
  a.cljs$lang$arity$4 = c;
  a.cljs$lang$arity$5 = d;
  return a
}();
cljs.core.build_subvec = void 0;
cljs.core.Subvec = function(a, b, c, d, e) {
  this.meta = a;
  this.v = b;
  this.start = c;
  this.end = d;
  this.__hash = e;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 32400159
};
cljs.core.Subvec.cljs$lang$type = !0;
cljs.core.Subvec.cljs$lang$ctorPrSeq = function() {
  return cljs.core.list.cljs$lang$arity$1("cljs.core/Subvec")
};
cljs.core.Subvec.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/Subvec")
};
cljs.core.Subvec.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  var b = this.__hash;
  return null != b ? b : this.__hash = a = cljs.core.hash_coll(a)
};
cljs.core.Subvec.prototype.cljs$core$ILookup$_lookup$arity$2 = function(a, b) {
  return a.cljs$core$IIndexed$_nth$arity$3(a, b, null)
};
cljs.core.Subvec.prototype.cljs$core$ILookup$_lookup$arity$3 = function(a, b, c) {
  return a.cljs$core$IIndexed$_nth$arity$3(a, b, c)
};
cljs.core.Subvec.prototype.cljs$core$IAssociative$_assoc$arity$3 = function(a, b, c) {
  a = this.start + b;
  return cljs.core.build_subvec.cljs$lang$arity$5 ? cljs.core.build_subvec.cljs$lang$arity$5(this.meta, cljs.core._assoc(this.v, a, c), this.start, this.end > a + 1 ? this.end : a + 1, null) : cljs.core.build_subvec.call(null, this.meta, cljs.core._assoc(this.v, a, c), this.start, this.end > a + 1 ? this.end : a + 1, null)
};
cljs.core.Subvec.prototype.call = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return this.cljs$core$ILookup$_lookup$arity$2(this, c);
      case 3:
        return this.cljs$core$ILookup$_lookup$arity$3(this, c, d)
    }
    throw Error("Invalid arity: " + arguments.length);
  }
}();
cljs.core.Subvec.prototype.apply = function(a, b) {
  a = this;
  return a.call.apply(a, [a].concat(b.slice()))
};
cljs.core.Subvec.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return cljs.core.build_subvec.cljs$lang$arity$5 ? cljs.core.build_subvec.cljs$lang$arity$5(this.meta, cljs.core._assoc_n(this.v, this.end, b), this.start, this.end + 1, null) : cljs.core.build_subvec.call(null, this.meta, cljs.core._assoc_n(this.v, this.end, b), this.start, this.end + 1, null)
};
cljs.core.Subvec.prototype.toString = function() {
  return cljs.core.pr_str.cljs$lang$arity$1 ? cljs.core.pr_str.cljs$lang$arity$1(this) : cljs.core.pr_str.call(null, this)
};
cljs.core.Subvec.prototype.cljs$core$IReduce$_reduce$arity$2 = function(a, b) {
  return cljs.core.ci_reduce.cljs$lang$arity$2(a, b)
};
cljs.core.Subvec.prototype.cljs$core$IReduce$_reduce$arity$3 = function(a, b, c) {
  return cljs.core.ci_reduce.cljs$lang$arity$3(a, b, c)
};
cljs.core.Subvec.prototype.cljs$core$ISeqable$_seq$arity$1 = function() {
  var a = this;
  return function c(d) {
    return d === a.end ? null : cljs.core.cons(cljs.core._nth.cljs$lang$arity$2(a.v, d), new cljs.core.LazySeq(null, !1, function() {
      return c(d + 1)
    }, null))
  }(a.start)
};
cljs.core.Subvec.prototype.cljs$core$ICounted$_count$arity$1 = function() {
  return this.end - this.start
};
cljs.core.Subvec.prototype.cljs$core$IStack$_peek$arity$1 = function() {
  return cljs.core._nth.cljs$lang$arity$2(this.v, this.end - 1)
};
cljs.core.Subvec.prototype.cljs$core$IStack$_pop$arity$1 = function() {
  if(this.start === this.end) {
    throw Error("Can't pop empty vector");
  }
  return cljs.core.build_subvec.cljs$lang$arity$5 ? cljs.core.build_subvec.cljs$lang$arity$5(this.meta, this.v, this.start, this.end - 1, null) : cljs.core.build_subvec.call(null, this.meta, this.v, this.start, this.end - 1, null)
};
cljs.core.Subvec.prototype.cljs$core$IVector$_assoc_n$arity$3 = function(a, b, c) {
  return a.cljs$core$IAssociative$_assoc$arity$3(a, b, c)
};
cljs.core.Subvec.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_sequential(a, b)
};
cljs.core.Subvec.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return cljs.core.build_subvec.cljs$lang$arity$5 ? cljs.core.build_subvec.cljs$lang$arity$5(b, this.v, this.start, this.end, this.__hash) : cljs.core.build_subvec.call(null, b, this.v, this.start, this.end, this.__hash)
};
cljs.core.Subvec.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
  return this.meta
};
cljs.core.Subvec.prototype.cljs$core$IIndexed$_nth$arity$2 = function(a, b) {
  return cljs.core._nth.cljs$lang$arity$2(this.v, this.start + b)
};
cljs.core.Subvec.prototype.cljs$core$IIndexed$_nth$arity$3 = function(a, b, c) {
  return cljs.core._nth.cljs$lang$arity$3(this.v, this.start + b, c)
};
cljs.core.Subvec.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function() {
  return cljs.core.with_meta(cljs.core.Vector.EMPTY, this.meta)
};
cljs.core.build_subvec = function(a, b, c, d, e) {
  var f = cljs.core.count(b);
  if(cljs.core.truth_(function() {
    var a = 0 > c;
    return a || (a = 0 > d) ? a : (a = c > f) ? a : d > f
  }())) {
    throw Error("Index out of bounds");
  }
  return new cljs.core.Subvec(a, b, c, d, e)
};
cljs.core.subvec = function() {
  var a = null, b = function(b, c) {
    return a.cljs$lang$arity$3(b, c, cljs.core.count(b))
  }, c = function(a, b, c) {
    return cljs.core.build_subvec(null, a, b, c, null)
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$2 = b;
  a.cljs$lang$arity$3 = c;
  return a
}();
cljs.core.tv_ensure_editable = function(a, b) {
  return a === b.edit ? b : new cljs.core.VectorNode(a, b.arr.slice())
};
cljs.core.tv_editable_root = function(a) {
  return new cljs.core.VectorNode({}, a.arr.slice())
};
cljs.core.tv_editable_tail = function(a) {
  var b = cljs.core.make_array.cljs$lang$arity$1(32);
  cljs.core.array_copy(a, 0, b, 0, a.length);
  return b
};
cljs.core.tv_push_tail = function tv_push_tail(b, c, d, e) {
  var f = cljs.core.tv_ensure_editable(b.root.edit, d), g = b.cnt - 1 >>> c & 31;
  cljs.core.pv_aset(f, g, 5 === c ? e : function() {
    var d = cljs.core.pv_aget(f, g);
    return null != d ? tv_push_tail(b, c - 5, d, e) : cljs.core.new_path(b.root.edit, c - 5, e)
  }());
  return f
};
cljs.core.tv_pop_tail = function tv_pop_tail(b, c, d) {
  var d = cljs.core.tv_ensure_editable(b.root.edit, d), e = b.cnt - 2 >>> c & 31;
  if(5 < c) {
    var f = tv_pop_tail(b, c - 5, cljs.core.pv_aget(d, e));
    if(cljs.core.truth_(function() {
      var b = null == f;
      return b ? 0 === e : b
    }())) {
      return null
    }
    cljs.core.pv_aset(d, e, f);
    return d
  }
  if(0 === e) {
    return null
  }
  cljs.core.pv_aset(d, e, null);
  return d
};
cljs.core.editable_array_for = function(a, b) {
  if(cljs.core.truth_(function() {
    var c = 0 <= b;
    return c ? b < a.cnt : c
  }())) {
    if(b >= cljs.core.tail_off(a)) {
      return a.tail
    }
    for(var c = a.root, d = c, e = a.shift;;) {
      if(0 < e) {
        d = cljs.core.tv_ensure_editable(c.edit, cljs.core.pv_aget(d, b >>> e & 31)), e -= 5
      }else {
        return d.arr
      }
    }
  }else {
    throw Error([cljs.core.str("No item "), cljs.core.str(b), cljs.core.str(" in transient vector of length "), cljs.core.str(a.cnt)].join(""));
  }
};
cljs.core.TransientVector = function(a, b, c, d) {
  this.cnt = a;
  this.shift = b;
  this.root = c;
  this.tail = d;
  this.cljs$lang$protocol_mask$partition0$ = 275;
  this.cljs$lang$protocol_mask$partition1$ = 88
};
cljs.core.TransientVector.cljs$lang$type = !0;
cljs.core.TransientVector.cljs$lang$ctorPrSeq = function() {
  return cljs.core.list.cljs$lang$arity$1("cljs.core/TransientVector")
};
cljs.core.TransientVector.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/TransientVector")
};
cljs.core.TransientVector.prototype.call = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return this.cljs$core$ILookup$_lookup$arity$2(this, c);
      case 3:
        return this.cljs$core$ILookup$_lookup$arity$3(this, c, d)
    }
    throw Error("Invalid arity: " + arguments.length);
  }
}();
cljs.core.TransientVector.prototype.apply = function(a, b) {
  a = this;
  return a.call.apply(a, [a].concat(b.slice()))
};
cljs.core.TransientVector.prototype.cljs$core$ILookup$_lookup$arity$2 = function(a, b) {
  return a.cljs$core$IIndexed$_nth$arity$3(a, b, null)
};
cljs.core.TransientVector.prototype.cljs$core$ILookup$_lookup$arity$3 = function(a, b, c) {
  return a.cljs$core$IIndexed$_nth$arity$3(a, b, c)
};
cljs.core.TransientVector.prototype.cljs$core$IIndexed$_nth$arity$2 = function(a, b) {
  if(this.root.edit) {
    return cljs.core.array_for(a, b)[b & 31]
  }
  throw Error("nth after persistent!");
};
cljs.core.TransientVector.prototype.cljs$core$IIndexed$_nth$arity$3 = function(a, b, c) {
  var d = this;
  return cljs.core.truth_(function() {
    var a = 0 <= b;
    return a ? b < d.cnt : a
  }()) ? a.cljs$core$IIndexed$_nth$arity$2(a, b) : c
};
cljs.core.TransientVector.prototype.cljs$core$ICounted$_count$arity$1 = function() {
  if(this.root.edit) {
    return this.cnt
  }
  throw Error("count after persistent!");
};
cljs.core.TransientVector.prototype.cljs$core$ITransientVector$_assoc_n_BANG_$arity$3 = function(a, b, c) {
  var d = this;
  if(d.root.edit) {
    if(cljs.core.truth_(function() {
      var a = 0 <= b;
      return a ? b < d.cnt : a
    }())) {
      if(cljs.core.tail_off(a) <= b) {
        d.tail[b & 31] = c
      }else {
        var e = function g(a, e) {
          var j = cljs.core.tv_ensure_editable(d.root.edit, e);
          if(0 === a) {
            cljs.core.pv_aset(j, b & 31, c)
          }else {
            var l = b >>> a & 31;
            cljs.core.pv_aset(j, l, g(a - 5, cljs.core.pv_aget(j, l)))
          }
          return j
        }.call(null, d.shift, d.root);
        d.root = e
      }
      return a
    }
    if(b === d.cnt) {
      return a.cljs$core$ITransientCollection$_conj_BANG_$arity$2(a, c)
    }
    throw Error([cljs.core.str("Index "), cljs.core.str(b), cljs.core.str(" out of bounds for TransientVector of length"), cljs.core.str(d.cnt)].join(""));
  }
  throw Error("assoc! after persistent!");
};
cljs.core.TransientVector.prototype.cljs$core$ITransientVector$_pop_BANG_$arity$1 = function(a) {
  var b = this;
  if(b.root.edit) {
    if(0 === b.cnt) {
      throw Error("Can't pop empty vector");
    }
    if(1 === b.cnt) {
      b.cnt = 0
    }else {
      if(0 < (b.cnt - 1 & 31)) {
        b.cnt -= 1
      }else {
        var c = cljs.core.editable_array_for(a, b.cnt - 2), d;
        var e = cljs.core.tv_pop_tail(a, b.shift, b.root);
        d = null != e ? e : new cljs.core.VectorNode(b.root.edit, cljs.core.make_array.cljs$lang$arity$1(32));
        cljs.core.truth_(function() {
          var a = 5 < b.shift;
          return a ? null == cljs.core.pv_aget(d, 1) : a
        }()) ? (e = cljs.core.tv_ensure_editable(b.root.edit, cljs.core.pv_aget(d, 0)), b.root = e, b.shift -= 5) : b.root = d;
        b.cnt -= 1;
        b.tail = c
      }
    }
    return a
  }
  throw Error("pop! after persistent!");
};
cljs.core.TransientVector.prototype.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3 = function(a, b, c) {
  return a.cljs$core$ITransientVector$_assoc_n_BANG_$arity$3(a, b, c)
};
cljs.core.TransientVector.prototype.cljs$core$ITransientCollection$_conj_BANG_$arity$2 = function(a, b) {
  if(this.root.edit) {
    if(32 > this.cnt - cljs.core.tail_off(a)) {
      this.tail[this.cnt & 31] = b
    }else {
      var c = new cljs.core.VectorNode(this.root.edit, this.tail), d = cljs.core.make_array.cljs$lang$arity$1(32);
      d[0] = b;
      this.tail = d;
      if(this.cnt >>> 5 > 1 << this.shift) {
        var d = cljs.core.make_array.cljs$lang$arity$1(32), e = this.shift + 5;
        d[0] = this.root;
        d[1] = cljs.core.new_path(this.root.edit, this.shift, c);
        this.root = new cljs.core.VectorNode(this.root.edit, d);
        this.shift = e
      }else {
        this.root = cljs.core.tv_push_tail(a, this.shift, this.root, c)
      }
    }
    this.cnt += 1;
    return a
  }
  throw Error("conj! after persistent!");
};
cljs.core.TransientVector.prototype.cljs$core$ITransientCollection$_persistent_BANG_$arity$1 = function(a) {
  if(this.root.edit) {
    this.root.edit = null;
    var a = this.cnt - cljs.core.tail_off(a), b = cljs.core.make_array.cljs$lang$arity$1(a);
    cljs.core.array_copy(this.tail, 0, b, 0, a);
    return new cljs.core.PersistentVector(null, this.cnt, this.shift, this.root, b, null)
  }
  throw Error("persistent! called twice");
};
cljs.core.PersistentQueueSeq = function(a, b, c, d) {
  this.meta = a;
  this.front = b;
  this.rear = c;
  this.__hash = d;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 31850572
};
cljs.core.PersistentQueueSeq.cljs$lang$type = !0;
cljs.core.PersistentQueueSeq.cljs$lang$ctorPrSeq = function() {
  return cljs.core.list.cljs$lang$arity$1("cljs.core/PersistentQueueSeq")
};
cljs.core.PersistentQueueSeq.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/PersistentQueueSeq")
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  var b = this.__hash;
  return null != b ? b : this.__hash = a = cljs.core.hash_coll(a)
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return cljs.core.cons(b, a)
};
cljs.core.PersistentQueueSeq.prototype.toString = function() {
  return cljs.core.pr_str.cljs$lang$arity$1 ? cljs.core.pr_str.cljs$lang$arity$1(this) : cljs.core.pr_str.call(null, this)
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = function(a) {
  return a
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$ISeq$_first$arity$1 = function() {
  return cljs.core._first(this.front)
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$ISeq$_rest$arity$1 = function(a) {
  var b = cljs.core.next(this.front);
  return b ? new cljs.core.PersistentQueueSeq(this.meta, b, this.rear, null) : null == this.rear ? a.cljs$core$IEmptyableCollection$_empty$arity$1(a) : new cljs.core.PersistentQueueSeq(this.meta, this.rear, null, null)
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_sequential(a, b)
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.PersistentQueueSeq(b, this.front, this.rear, this.__hash)
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
  return this.meta
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function() {
  return cljs.core.with_meta(cljs.core.List.EMPTY, this.meta)
};
cljs.core.PersistentQueue = function(a, b, c, d, e) {
  this.meta = a;
  this.count = b;
  this.front = c;
  this.rear = d;
  this.__hash = e;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 31858766
};
cljs.core.PersistentQueue.cljs$lang$type = !0;
cljs.core.PersistentQueue.cljs$lang$ctorPrSeq = function() {
  return cljs.core.list.cljs$lang$arity$1("cljs.core/PersistentQueue")
};
cljs.core.PersistentQueue.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/PersistentQueue")
};
cljs.core.PersistentQueue.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  var b = this.__hash;
  return null != b ? b : this.__hash = a = cljs.core.hash_coll(a)
};
cljs.core.PersistentQueue.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  var c = this;
  return cljs.core.truth_(c.front) ? new cljs.core.PersistentQueue(c.meta, c.count + 1, c.front, cljs.core.conj.cljs$lang$arity$2(function() {
    var a = c.rear;
    return cljs.core.truth_(a) ? a : cljs.core.PersistentVector.EMPTY
  }(), b), null) : new cljs.core.PersistentQueue(c.meta, c.count + 1, cljs.core.conj.cljs$lang$arity$2(c.front, b), cljs.core.PersistentVector.EMPTY, null)
};
cljs.core.PersistentQueue.prototype.toString = function() {
  return cljs.core.pr_str.cljs$lang$arity$1 ? cljs.core.pr_str.cljs$lang$arity$1(this) : cljs.core.pr_str.call(null, this)
};
cljs.core.PersistentQueue.prototype.cljs$core$ISeqable$_seq$arity$1 = function() {
  var a = this, b = cljs.core.seq(a.rear);
  return cljs.core.truth_(function() {
    var c = a.front;
    return cljs.core.truth_(c) ? c : b
  }()) ? new cljs.core.PersistentQueueSeq(null, a.front, cljs.core.seq(b), null) : null
};
cljs.core.PersistentQueue.prototype.cljs$core$ICounted$_count$arity$1 = function() {
  return this.count
};
cljs.core.PersistentQueue.prototype.cljs$core$IStack$_peek$arity$1 = function() {
  return cljs.core._first(this.front)
};
cljs.core.PersistentQueue.prototype.cljs$core$IStack$_pop$arity$1 = function(a) {
  return cljs.core.truth_(this.front) ? (a = cljs.core.next(this.front)) ? new cljs.core.PersistentQueue(this.meta, this.count - 1, a, this.rear, null) : new cljs.core.PersistentQueue(this.meta, this.count - 1, cljs.core.seq(this.rear), cljs.core.PersistentVector.EMPTY, null) : a
};
cljs.core.PersistentQueue.prototype.cljs$core$ISeq$_first$arity$1 = function() {
  return cljs.core.first(this.front)
};
cljs.core.PersistentQueue.prototype.cljs$core$ISeq$_rest$arity$1 = function(a) {
  return cljs.core.rest(cljs.core.seq(a))
};
cljs.core.PersistentQueue.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_sequential(a, b)
};
cljs.core.PersistentQueue.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.PersistentQueue(b, this.count, this.front, this.rear, this.__hash)
};
cljs.core.PersistentQueue.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
  return this.meta
};
cljs.core.PersistentQueue.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function() {
  return cljs.core.PersistentQueue.EMPTY
};
cljs.core.PersistentQueue.EMPTY = new cljs.core.PersistentQueue(null, 0, null, cljs.core.PersistentVector.EMPTY, 0);
cljs.core.NeverEquiv = function() {
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 2097152
};
cljs.core.NeverEquiv.cljs$lang$type = !0;
cljs.core.NeverEquiv.cljs$lang$ctorPrSeq = function() {
  return cljs.core.list.cljs$lang$arity$1("cljs.core/NeverEquiv")
};
cljs.core.NeverEquiv.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/NeverEquiv")
};
cljs.core.NeverEquiv.prototype.cljs$core$IEquiv$_equiv$arity$2 = function() {
  return!1
};
cljs.core.never_equiv = new cljs.core.NeverEquiv;
cljs.core.equiv_map = function(a, b) {
  return cljs.core.boolean$(cljs.core.map_QMARK_(b) ? cljs.core.count(a) === cljs.core.count(b) ? cljs.core.every_QMARK_(cljs.core.identity, cljs.core.map.cljs$lang$arity$2(function(a) {
    return cljs.core._EQ_.cljs$lang$arity$2(cljs.core._lookup.cljs$lang$arity$3(b, cljs.core.first(a), cljs.core.never_equiv), cljs.core.second(a))
  }, a)) : null : null)
};
cljs.core.scan_array = function(a, b, c) {
  for(var d = c.length, e = 0;;) {
    if(e < d) {
      if(b === c[e]) {
        return e
      }
      e += a
    }else {
      return null
    }
  }
};
cljs.core.obj_map_compare_keys = function(a, b) {
  var c = cljs.core.hash.cljs$lang$arity$1(a), d = cljs.core.hash.cljs$lang$arity$1(b);
  return c < d ? -1 : c > d ? 1 : 0
};
cljs.core.obj_map__GT_hash_map = function(a, b, c) {
  for(var d = a.keys, e = d.length, f = a.strobj, a = cljs.core.meta(a), g = 0, h = cljs.core.transient$(cljs.core.PersistentHashMap.EMPTY);;) {
    if(g < e) {
      var i = d[g], g = g + 1, h = cljs.core.assoc_BANG_(h, i, f[i])
    }else {
      return cljs.core.with_meta(cljs.core.persistent_BANG_(cljs.core.assoc_BANG_(h, b, c)), a)
    }
  }
};
cljs.core.obj_clone = function(a, b) {
  for(var c = {}, d = b.length, e = 0;;) {
    if(e < d) {
      var f = b[e];
      c[f] = a[f];
      e += 1
    }else {
      break
    }
  }
  return c
};
cljs.core.ObjMap = function(a, b, c, d, e) {
  this.meta = a;
  this.keys = b;
  this.strobj = c;
  this.update_count = d;
  this.__hash = e;
  this.cljs$lang$protocol_mask$partition1$ = 4;
  this.cljs$lang$protocol_mask$partition0$ = 16123663
};
cljs.core.ObjMap.cljs$lang$type = !0;
cljs.core.ObjMap.cljs$lang$ctorPrSeq = function() {
  return cljs.core.list.cljs$lang$arity$1("cljs.core/ObjMap")
};
cljs.core.ObjMap.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/ObjMap")
};
cljs.core.ObjMap.prototype.cljs$core$IEditableCollection$_as_transient$arity$1 = function(a) {
  return cljs.core.transient$(cljs.core.into(cljs.core.hash_map.cljs$lang$arity$0 ? cljs.core.hash_map.cljs$lang$arity$0() : cljs.core.hash_map.call(null), a))
};
cljs.core.ObjMap.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  var b = this.__hash;
  return null != b ? b : this.__hash = a = cljs.core.hash_imap(a)
};
cljs.core.ObjMap.prototype.cljs$core$ILookup$_lookup$arity$2 = function(a, b) {
  return a.cljs$core$ILookup$_lookup$arity$3(a, b, null)
};
cljs.core.ObjMap.prototype.cljs$core$ILookup$_lookup$arity$3 = function(a, b, c) {
  var d = this;
  return cljs.core.truth_(function() {
    var a = goog.isString(b);
    return a ? null != cljs.core.scan_array(1, b, d.keys) : a
  }()) ? d.strobj[b] : c
};
cljs.core.ObjMap.prototype.cljs$core$IAssociative$_assoc$arity$3 = function(a, b, c) {
  var d = this;
  if(goog.isString(b)) {
    if(cljs.core.truth_(function() {
      var a = d.update_count > cljs.core.ObjMap.HASHMAP_THRESHOLD;
      return a ? a : d.keys.length >= cljs.core.ObjMap.HASHMAP_THRESHOLD
    }())) {
      return cljs.core.obj_map__GT_hash_map(a, b, c)
    }
    if(null != cljs.core.scan_array(1, b, d.keys)) {
      return a = cljs.core.obj_clone(d.strobj, d.keys), a[b] = c, new cljs.core.ObjMap(d.meta, d.keys, a, d.update_count + 1, null)
    }
    var a = cljs.core.obj_clone(d.strobj, d.keys), e = d.keys.slice();
    a[b] = c;
    e.push(b);
    return new cljs.core.ObjMap(d.meta, e, a, d.update_count + 1, null)
  }
  return cljs.core.obj_map__GT_hash_map(a, b, c)
};
cljs.core.ObjMap.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = function(a, b) {
  var c = this;
  return cljs.core.truth_(function() {
    var a = goog.isString(b);
    return a ? null != cljs.core.scan_array(1, b, c.keys) : a
  }()) ? !0 : !1
};
cljs.core.ObjMap.prototype.call = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return this.cljs$core$ILookup$_lookup$arity$2(this, c);
      case 3:
        return this.cljs$core$ILookup$_lookup$arity$3(this, c, d)
    }
    throw Error("Invalid arity: " + arguments.length);
  }
}();
cljs.core.ObjMap.prototype.apply = function(a, b) {
  a = this;
  return a.call.apply(a, [a].concat(b.slice()))
};
cljs.core.ObjMap.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = function(a, b, c) {
  for(a = this.keys.sort(cljs.core.obj_map_compare_keys);;) {
    if(cljs.core.seq(a)) {
      var d = cljs.core.first(a), c = b.cljs$lang$arity$3 ? b.cljs$lang$arity$3(c, d, this.strobj[d]) : b.call(null, c, d, this.strobj[d]);
      if(cljs.core.reduced_QMARK_(c)) {
        return cljs.core.deref.cljs$lang$arity$1 ? cljs.core.deref.cljs$lang$arity$1(c) : cljs.core.deref.call(null, c)
      }
      a = cljs.core.rest(a)
    }else {
      return c
    }
  }
};
cljs.core.ObjMap.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return cljs.core.vector_QMARK_(b) ? a.cljs$core$IAssociative$_assoc$arity$3(a, cljs.core._nth.cljs$lang$arity$2(b, 0), cljs.core._nth.cljs$lang$arity$2(b, 1)) : cljs.core.reduce.cljs$lang$arity$3(cljs.core._conj, a, b)
};
cljs.core.ObjMap.prototype.toString = function() {
  return cljs.core.pr_str.cljs$lang$arity$1 ? cljs.core.pr_str.cljs$lang$arity$1(this) : cljs.core.pr_str.call(null, this)
};
cljs.core.ObjMap.prototype.cljs$core$ISeqable$_seq$arity$1 = function() {
  var a = this;
  return 0 < a.keys.length ? cljs.core.map.cljs$lang$arity$2(function(b) {
    return cljs.core.vector.cljs$lang$arity$variadic(cljs.core.array_seq([b, a.strobj[b]], 0))
  }, a.keys.sort(cljs.core.obj_map_compare_keys)) : null
};
cljs.core.ObjMap.prototype.cljs$core$ICounted$_count$arity$1 = function() {
  return this.keys.length
};
cljs.core.ObjMap.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_map(a, b)
};
cljs.core.ObjMap.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.ObjMap(b, this.keys, this.strobj, this.update_count, this.__hash)
};
cljs.core.ObjMap.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
  return this.meta
};
cljs.core.ObjMap.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function() {
  return cljs.core.with_meta(cljs.core.ObjMap.EMPTY, this.meta)
};
cljs.core.ObjMap.prototype.cljs$core$IMap$_dissoc$arity$2 = function(a, b) {
  var c = this;
  if(cljs.core.truth_(function() {
    var a = goog.isString(b);
    return a ? null != cljs.core.scan_array(1, b, c.keys) : a
  }())) {
    var d = c.keys.slice(), e = cljs.core.obj_clone(c.strobj, c.keys);
    d.splice(cljs.core.scan_array(1, b, d), 1);
    cljs.core.js_delete(e, b);
    return new cljs.core.ObjMap(c.meta, d, e, c.update_count + 1, null)
  }
  return a
};
cljs.core.ObjMap.EMPTY = new cljs.core.ObjMap(null, [], {}, 0, 0);
cljs.core.ObjMap.HASHMAP_THRESHOLD = 32;
cljs.core.ObjMap.fromObject = function(a, b) {
  return new cljs.core.ObjMap(null, a, b, 0, null)
};
cljs.core.HashMap = function(a, b, c, d) {
  this.meta = a;
  this.count = b;
  this.hashobj = c;
  this.__hash = d;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 15075087
};
cljs.core.HashMap.cljs$lang$type = !0;
cljs.core.HashMap.cljs$lang$ctorPrSeq = function() {
  return cljs.core.list.cljs$lang$arity$1("cljs.core/HashMap")
};
cljs.core.HashMap.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/HashMap")
};
cljs.core.HashMap.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  var b = this.__hash;
  return null != b ? b : this.__hash = a = cljs.core.hash_imap(a)
};
cljs.core.HashMap.prototype.cljs$core$ILookup$_lookup$arity$2 = function(a, b) {
  return a.cljs$core$ILookup$_lookup$arity$3(a, b, null)
};
cljs.core.HashMap.prototype.cljs$core$ILookup$_lookup$arity$3 = function(a, b, c) {
  a = this.hashobj[cljs.core.hash.cljs$lang$arity$1(b)];
  b = cljs.core.truth_(a) ? cljs.core.scan_array(2, b, a) : null;
  return cljs.core.truth_(b) ? a[b + 1] : c
};
cljs.core.HashMap.prototype.cljs$core$IAssociative$_assoc$arity$3 = function(a, b, c) {
  var a = cljs.core.hash.cljs$lang$arity$1(b), d = this.hashobj[a];
  if(cljs.core.truth_(d)) {
    var d = d.slice(), e = goog.object.clone(this.hashobj);
    e[a] = d;
    a = cljs.core.scan_array(2, b, d);
    if(cljs.core.truth_(a)) {
      return d[a + 1] = c, new cljs.core.HashMap(this.meta, this.count, e, null)
    }
    d.push(b, c);
    return new cljs.core.HashMap(this.meta, this.count + 1, e, null)
  }
  e = goog.object.clone(this.hashobj);
  e[a] = [b, c];
  return new cljs.core.HashMap(this.meta, this.count + 1, e, null)
};
cljs.core.HashMap.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = function(a, b) {
  var c = this.hashobj[cljs.core.hash.cljs$lang$arity$1(b)], c = cljs.core.truth_(c) ? cljs.core.scan_array(2, b, c) : null;
  return cljs.core.truth_(c) ? !0 : !1
};
cljs.core.HashMap.prototype.call = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return this.cljs$core$ILookup$_lookup$arity$2(this, c);
      case 3:
        return this.cljs$core$ILookup$_lookup$arity$3(this, c, d)
    }
    throw Error("Invalid arity: " + arguments.length);
  }
}();
cljs.core.HashMap.prototype.apply = function(a, b) {
  a = this;
  return a.call.apply(a, [a].concat(b.slice()))
};
cljs.core.HashMap.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return cljs.core.vector_QMARK_(b) ? a.cljs$core$IAssociative$_assoc$arity$3(a, cljs.core._nth.cljs$lang$arity$2(b, 0), cljs.core._nth.cljs$lang$arity$2(b, 1)) : cljs.core.reduce.cljs$lang$arity$3(cljs.core._conj, a, b)
};
cljs.core.HashMap.prototype.toString = function() {
  return cljs.core.pr_str.cljs$lang$arity$1 ? cljs.core.pr_str.cljs$lang$arity$1(this) : cljs.core.pr_str.call(null, this)
};
cljs.core.HashMap.prototype.cljs$core$ISeqable$_seq$arity$1 = function() {
  var a = this;
  if(0 < a.count) {
    var b = cljs.core.js_keys(a.hashobj).sort();
    return cljs.core.mapcat.cljs$lang$arity$2(function(b) {
      return cljs.core.map.cljs$lang$arity$2(cljs.core.vec, cljs.core.partition.cljs$lang$arity$2(2, a.hashobj[b]))
    }, b)
  }
  return null
};
cljs.core.HashMap.prototype.cljs$core$ICounted$_count$arity$1 = function() {
  return this.count
};
cljs.core.HashMap.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_map(a, b)
};
cljs.core.HashMap.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.HashMap(b, this.count, this.hashobj, this.__hash)
};
cljs.core.HashMap.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
  return this.meta
};
cljs.core.HashMap.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function() {
  return cljs.core.with_meta(cljs.core.HashMap.EMPTY, this.meta)
};
cljs.core.HashMap.prototype.cljs$core$IMap$_dissoc$arity$2 = function(a, b) {
  var c = cljs.core.hash.cljs$lang$arity$1(b), d = this.hashobj[c], e = cljs.core.truth_(d) ? cljs.core.scan_array(2, b, d) : null;
  if(cljs.core.not(e)) {
    return a
  }
  var f = goog.object.clone(this.hashobj);
  3 > d.length ? cljs.core.js_delete(f, c) : (d = d.slice(), d.splice(e, 2), f[c] = d);
  return new cljs.core.HashMap(this.meta, this.count - 1, f, null)
};
cljs.core.HashMap.EMPTY = new cljs.core.HashMap(null, 0, {}, 0);
cljs.core.HashMap.fromArrays = function(a, b) {
  for(var c = a.length, d = 0, e = cljs.core.HashMap.EMPTY;;) {
    if(d < c) {
      var f = d + 1, e = cljs.core.assoc.cljs$lang$arity$3(e, a[d], b[d]), d = f
    }else {
      return e
    }
  }
};
cljs.core.array_map_index_of = function(a, b) {
  for(var c = a.arr, d = c.length, e = 0;;) {
    if(d <= e) {
      return-1
    }
    if(cljs.core._EQ_.cljs$lang$arity$2(c[e], b)) {
      return e
    }
    e += 2
  }
};
cljs.core.TransientArrayMap = void 0;
cljs.core.PersistentArrayMap = function(a, b, c, d) {
  this.meta = a;
  this.cnt = b;
  this.arr = c;
  this.__hash = d;
  this.cljs$lang$protocol_mask$partition1$ = 4;
  this.cljs$lang$protocol_mask$partition0$ = 16123663
};
cljs.core.PersistentArrayMap.cljs$lang$type = !0;
cljs.core.PersistentArrayMap.cljs$lang$ctorPrSeq = function() {
  return cljs.core.list.cljs$lang$arity$1("cljs.core/PersistentArrayMap")
};
cljs.core.PersistentArrayMap.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/PersistentArrayMap")
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IEditableCollection$_as_transient$arity$1 = function() {
  return new cljs.core.TransientArrayMap({}, this.arr.length, this.arr.slice())
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  var b = this.__hash;
  return null != b ? b : this.__hash = a = cljs.core.hash_imap(a)
};
cljs.core.PersistentArrayMap.prototype.cljs$core$ILookup$_lookup$arity$2 = function(a, b) {
  return a.cljs$core$ILookup$_lookup$arity$3(a, b, null)
};
cljs.core.PersistentArrayMap.prototype.cljs$core$ILookup$_lookup$arity$3 = function(a, b, c) {
  a = cljs.core.array_map_index_of(a, b);
  return-1 === a ? c : this.arr[a + 1]
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IAssociative$_assoc$arity$3 = function(a, b, c) {
  var d = cljs.core.array_map_index_of(a, b);
  if(-1 === d) {
    if(this.cnt < cljs.core.PersistentArrayMap.HASHMAP_THRESHOLD) {
      var d = cljs.core.PersistentArrayMap, a = this.meta, e = this.cnt + 1, f = this.arr.slice();
      f.push(b);
      f.push(c);
      return new d(a, e, f, null)
    }
    return cljs.core.with_meta(cljs.core.assoc.cljs$lang$arity$3(cljs.core.into(cljs.core.PersistentHashMap.EMPTY, a), b, c), this.meta)
  }
  if(c === this.arr[d + 1]) {
    return a
  }
  b = cljs.core.PersistentArrayMap;
  a = this.meta;
  e = this.cnt;
  f = this.arr.slice();
  f[d + 1] = c;
  return new b(a, e, f, null)
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = function(a, b) {
  return-1 !== cljs.core.array_map_index_of(a, b)
};
cljs.core.PersistentArrayMap.prototype.call = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return this.cljs$core$ILookup$_lookup$arity$2(this, c);
      case 3:
        return this.cljs$core$ILookup$_lookup$arity$3(this, c, d)
    }
    throw Error("Invalid arity: " + arguments.length);
  }
}();
cljs.core.PersistentArrayMap.prototype.apply = function(a, b) {
  a = this;
  return a.call.apply(a, [a].concat(b.slice()))
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = function(a, b, c) {
  for(var a = this.arr.length, d = 0;;) {
    if(d < a) {
      c = b.cljs$lang$arity$3 ? b.cljs$lang$arity$3(c, this.arr[d], this.arr[d + 1]) : b.call(null, c, this.arr[d], this.arr[d + 1]);
      if(cljs.core.reduced_QMARK_(c)) {
        return cljs.core.deref.cljs$lang$arity$1 ? cljs.core.deref.cljs$lang$arity$1(c) : cljs.core.deref.call(null, c)
      }
      d += 2
    }else {
      return c
    }
  }
};
cljs.core.PersistentArrayMap.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return cljs.core.vector_QMARK_(b) ? a.cljs$core$IAssociative$_assoc$arity$3(a, cljs.core._nth.cljs$lang$arity$2(b, 0), cljs.core._nth.cljs$lang$arity$2(b, 1)) : cljs.core.reduce.cljs$lang$arity$3(cljs.core._conj, a, b)
};
cljs.core.PersistentArrayMap.prototype.toString = function() {
  return cljs.core.pr_str.cljs$lang$arity$1 ? cljs.core.pr_str.cljs$lang$arity$1(this) : cljs.core.pr_str.call(null, this)
};
cljs.core.PersistentArrayMap.prototype.cljs$core$ISeqable$_seq$arity$1 = function() {
  var a = this;
  if(0 < a.cnt) {
    var b = a.arr.length;
    return function d(e) {
      return new cljs.core.LazySeq(null, !1, function() {
        return e < b ? cljs.core.cons(cljs.core.PersistentVector.fromArray([a.arr[e], a.arr[e + 1]], !0), d(e + 2)) : null
      }, null)
    }(0)
  }
  return null
};
cljs.core.PersistentArrayMap.prototype.cljs$core$ICounted$_count$arity$1 = function() {
  return this.cnt
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_map(a, b)
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.PersistentArrayMap(b, this.cnt, this.arr, this.__hash)
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
  return this.meta
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function() {
  return cljs.core._with_meta(cljs.core.PersistentArrayMap.EMPTY, this.meta)
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IMap$_dissoc$arity$2 = function(a, b) {
  if(0 <= cljs.core.array_map_index_of(a, b)) {
    var c = this.arr.length, d = c - 2;
    if(0 === d) {
      return a.cljs$core$IEmptyableCollection$_empty$arity$1(a)
    }
    for(var d = cljs.core.make_array.cljs$lang$arity$1(d), e = 0, f = 0;;) {
      if(e >= c) {
        return new cljs.core.PersistentArrayMap(this.meta, this.cnt - 1, d, null)
      }
      cljs.core._EQ_.cljs$lang$arity$2(b, this.arr[e]) || (d[f] = this.arr[e], d[f + 1] = this.arr[e + 1], f += 2);
      e += 2
    }
  }else {
    return a
  }
};
cljs.core.PersistentArrayMap.EMPTY = new cljs.core.PersistentArrayMap(null, 0, [], null);
cljs.core.PersistentArrayMap.HASHMAP_THRESHOLD = 16;
cljs.core.PersistentArrayMap.fromArrays = function(a, b) {
  for(var c = cljs.core.count(a), d = 0, e = cljs.core.transient$(cljs.core.PersistentArrayMap.EMPTY);;) {
    if(d < c) {
      var f = d + 1, e = cljs.core.assoc_BANG_(e, a[d], b[d]), d = f
    }else {
      return cljs.core.persistent_BANG_(e)
    }
  }
};
cljs.core.array__GT_transient_hash_map = void 0;
cljs.core.TransientArrayMap = function(a, b, c) {
  this.editable_QMARK_ = a;
  this.len = b;
  this.arr = c;
  this.cljs$lang$protocol_mask$partition1$ = 56;
  this.cljs$lang$protocol_mask$partition0$ = 258
};
cljs.core.TransientArrayMap.cljs$lang$type = !0;
cljs.core.TransientArrayMap.cljs$lang$ctorPrSeq = function() {
  return cljs.core.list.cljs$lang$arity$1("cljs.core/TransientArrayMap")
};
cljs.core.TransientArrayMap.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/TransientArrayMap")
};
cljs.core.TransientArrayMap.prototype.cljs$core$ITransientMap$_dissoc_BANG_$arity$2 = function(a, b) {
  if(cljs.core.truth_(this.editable_QMARK_)) {
    var c = cljs.core.array_map_index_of(a, b);
    0 <= c && (this.arr[c] = this.arr[this.len - 2], this.arr[c + 1] = this.arr[this.len - 1], c = this.arr, c.pop(), c.pop(), this.len -= 2);
    return a
  }
  throw Error("dissoc! after persistent!");
};
cljs.core.TransientArrayMap.prototype.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3 = function(a, b, c) {
  if(cljs.core.truth_(this.editable_QMARK_)) {
    var d = cljs.core.array_map_index_of(a, b);
    if(-1 === d) {
      return this.len + 2 <= 2 * cljs.core.PersistentArrayMap.HASHMAP_THRESHOLD ? (this.len += 2, this.arr.push(b), this.arr.push(c), a) : cljs.core.assoc_BANG_(cljs.core.array__GT_transient_hash_map.cljs$lang$arity$2 ? cljs.core.array__GT_transient_hash_map.cljs$lang$arity$2(this.len, this.arr) : cljs.core.array__GT_transient_hash_map.call(null, this.len, this.arr), b, c)
    }
    c !== this.arr[d + 1] && (this.arr[d + 1] = c);
    return a
  }
  throw Error("assoc! after persistent!");
};
cljs.core.TransientArrayMap.prototype.cljs$core$ITransientCollection$_conj_BANG_$arity$2 = function(a, b) {
  if(cljs.core.truth_(this.editable_QMARK_)) {
    if(cljs.core.truth_(b ? cljs.core.truth_(function() {
      var a = b.cljs$lang$protocol_mask$partition0$ & 2048;
      return a ? a : b.cljs$core$IMapEntry$
    }()) ? !0 : b.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.type_satisfies_(cljs.core.IMapEntry, b) : cljs.core.type_satisfies_(cljs.core.IMapEntry, b))) {
      return a.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3(a, cljs.core.key.cljs$lang$arity$1 ? cljs.core.key.cljs$lang$arity$1(b) : cljs.core.key.call(null, b), cljs.core.val.cljs$lang$arity$1 ? cljs.core.val.cljs$lang$arity$1(b) : cljs.core.val.call(null, b))
    }
    for(var c = cljs.core.seq(b), d = a;;) {
      var e = cljs.core.first(c);
      if(cljs.core.truth_(e)) {
        c = cljs.core.next(c), d = d.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3(d, cljs.core.key.cljs$lang$arity$1 ? cljs.core.key.cljs$lang$arity$1(e) : cljs.core.key.call(null, e), cljs.core.val.cljs$lang$arity$1 ? cljs.core.val.cljs$lang$arity$1(e) : cljs.core.val.call(null, e))
      }else {
        return d
      }
    }
  }else {
    throw Error("conj! after persistent!");
  }
};
cljs.core.TransientArrayMap.prototype.cljs$core$ITransientCollection$_persistent_BANG_$arity$1 = function() {
  if(cljs.core.truth_(this.editable_QMARK_)) {
    return this.editable_QMARK_ = !1, new cljs.core.PersistentArrayMap(null, cljs.core.quot(this.len, 2), this.arr, null)
  }
  throw Error("persistent! called twice");
};
cljs.core.TransientArrayMap.prototype.cljs$core$ILookup$_lookup$arity$2 = function(a, b) {
  return a.cljs$core$ILookup$_lookup$arity$3(a, b, null)
};
cljs.core.TransientArrayMap.prototype.cljs$core$ILookup$_lookup$arity$3 = function(a, b, c) {
  if(cljs.core.truth_(this.editable_QMARK_)) {
    return a = cljs.core.array_map_index_of(a, b), -1 === a ? c : this.arr[a + 1]
  }
  throw Error("lookup after persistent!");
};
cljs.core.TransientArrayMap.prototype.cljs$core$ICounted$_count$arity$1 = function() {
  if(cljs.core.truth_(this.editable_QMARK_)) {
    return cljs.core.quot(this.len, 2)
  }
  throw Error("count after persistent!");
};
cljs.core.TransientHashMap = void 0;
cljs.core.array__GT_transient_hash_map = function(a, b) {
  for(var c = cljs.core.transient$(cljs.core.ObjMap.EMPTY), d = 0;;) {
    if(d < a) {
      c = cljs.core.assoc_BANG_(c, b[d], b[d + 1]), d += 2
    }else {
      return c
    }
  }
};
cljs.core.Box = function(a) {
  this.val = a
};
cljs.core.Box.cljs$lang$type = !0;
cljs.core.Box.cljs$lang$ctorPrSeq = function() {
  return cljs.core.list.cljs$lang$arity$1("cljs.core/Box")
};
cljs.core.Box.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/Box")
};
cljs.core.create_inode_seq = void 0;
cljs.core.create_array_node_seq = void 0;
cljs.core.reset_BANG_ = void 0;
cljs.core.create_node = void 0;
cljs.core.atom = void 0;
cljs.core.deref = void 0;
cljs.core.key_test = function(a, b) {
  return goog.isString(a) ? a === b : cljs.core._EQ_.cljs$lang$arity$2(a, b)
};
cljs.core.mask = function(a, b) {
  return a >>> b & 31
};
cljs.core.clone_and_set = function() {
  var a = null, b = function(a, b, c) {
    a = a.slice();
    a[b] = c;
    return a
  }, c = function(a, b, c, g, h) {
    a = a.slice();
    a[b] = c;
    a[g] = h;
    return a
  }, a = function(a, e, f, g, h) {
    switch(arguments.length) {
      case 3:
        return b.call(this, a, e, f);
      case 5:
        return c.call(this, a, e, f, g, h)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$3 = b;
  a.cljs$lang$arity$5 = c;
  return a
}();
cljs.core.remove_pair = function(a, b) {
  var c = cljs.core.make_array.cljs$lang$arity$1(a.length - 2);
  cljs.core.array_copy(a, 0, c, 0, 2 * b);
  cljs.core.array_copy(a, 2 * (b + 1), c, 2 * b, c.length - 2 * b);
  return c
};
cljs.core.bitmap_indexed_node_index = function(a, b) {
  return cljs.core.bit_count(a & b - 1)
};
cljs.core.bitpos = function(a, b) {
  return 1 << (a >>> b & 31)
};
cljs.core.edit_and_set = function() {
  var a = null, b = function(a, b, c, g) {
    a = a.ensure_editable(b);
    a.arr[c] = g;
    return a
  }, c = function(a, b, c, g, h, i) {
    a = a.ensure_editable(b);
    a.arr[c] = g;
    a.arr[h] = i;
    return a
  }, a = function(a, e, f, g, h, i) {
    switch(arguments.length) {
      case 4:
        return b.call(this, a, e, f, g);
      case 6:
        return c.call(this, a, e, f, g, h, i)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$4 = b;
  a.cljs$lang$arity$6 = c;
  return a
}();
cljs.core.inode_kv_reduce = function(a, b, c) {
  for(var d = a.length, e = 0;;) {
    if(e < d) {
      var f = a[e];
      null != f ? c = b.cljs$lang$arity$3 ? b.cljs$lang$arity$3(c, f, a[e + 1]) : b.call(null, c, f, a[e + 1]) : (f = a[e + 1], c = null != f ? f.kv_reduce(b, c) : c);
      if(cljs.core.reduced_QMARK_(c)) {
        return cljs.core.deref.cljs$lang$arity$1 ? cljs.core.deref.cljs$lang$arity$1(c) : cljs.core.deref.call(null, c)
      }
      e += 2
    }else {
      return c
    }
  }
};
cljs.core.ArrayNode = void 0;
cljs.core.BitmapIndexedNode = function(a, b, c) {
  this.edit = a;
  this.bitmap = b;
  this.arr = c
};
cljs.core.BitmapIndexedNode.cljs$lang$type = !0;
cljs.core.BitmapIndexedNode.cljs$lang$ctorPrSeq = function() {
  return cljs.core.list.cljs$lang$arity$1("cljs.core/BitmapIndexedNode")
};
cljs.core.BitmapIndexedNode.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/BitmapIndexedNode")
};
cljs.core.BitmapIndexedNode.prototype.edit_and_remove_pair = function(a, b, c) {
  if(this.bitmap === b) {
    return null
  }
  var a = this.ensure_editable(a), d = a.arr, e = d.length;
  a.bitmap ^= b;
  cljs.core.array_copy(d, 2 * (c + 1), d, 2 * c, e - 2 * (c + 1));
  d[e - 2] = null;
  d[e - 1] = null;
  return a
};
cljs.core.BitmapIndexedNode.prototype.inode_assoc_BANG_ = function(a, b, c, d, e, f) {
  var g = 1 << (c >>> b & 31), h = cljs.core.bitmap_indexed_node_index(this.bitmap, g);
  if(0 === (this.bitmap & g)) {
    var i = cljs.core.bit_count(this.bitmap);
    if(2 * i < this.arr.length) {
      return a = this.ensure_editable(a), b = a.arr, f.val = !0, cljs.core.array_copy_downward(b, 2 * h, b, 2 * (h + 1), 2 * (i - h)), b[2 * h] = d, b[2 * h + 1] = e, a.bitmap |= g, a
    }
    if(16 <= i) {
      h = cljs.core.make_array.cljs$lang$arity$1(32);
      h[c >>> b & 31] = cljs.core.BitmapIndexedNode.EMPTY.inode_assoc_BANG_(a, b + 5, c, d, e, f);
      for(e = d = 0;;) {
        if(32 > d) {
          0 !== (this.bitmap >>> d & 1) && (h[d] = null != this.arr[e] ? cljs.core.BitmapIndexedNode.EMPTY.inode_assoc_BANG_(a, b + 5, cljs.core.hash.cljs$lang$arity$1(this.arr[e]), this.arr[e], this.arr[e + 1], f) : this.arr[e + 1], e += 2), d += 1
        }else {
          break
        }
      }
      return new cljs.core.ArrayNode(a, i + 1, h)
    }
    b = cljs.core.make_array.cljs$lang$arity$1(2 * (i + 4));
    cljs.core.array_copy(this.arr, 0, b, 0, 2 * h);
    b[2 * h] = d;
    b[2 * h + 1] = e;
    cljs.core.array_copy(this.arr, 2 * h, b, 2 * (h + 1), 2 * (i - h));
    f.val = !0;
    a = this.ensure_editable(a);
    a.arr = b;
    a.bitmap |= g;
    return a
  }
  i = this.arr[2 * h];
  g = this.arr[2 * h + 1];
  if(null == i) {
    return i = g.inode_assoc_BANG_(a, b + 5, c, d, e, f), i === g ? this : cljs.core.edit_and_set.cljs$lang$arity$4(this, a, 2 * h + 1, i)
  }
  if(cljs.core.key_test(d, i)) {
    return e === g ? this : cljs.core.edit_and_set.cljs$lang$arity$4(this, a, 2 * h + 1, e)
  }
  f.val = !0;
  return cljs.core.edit_and_set.cljs$lang$arity$6(this, a, 2 * h, null, 2 * h + 1, cljs.core.create_node.cljs$lang$arity$7 ? cljs.core.create_node.cljs$lang$arity$7(a, b + 5, i, g, c, d, e) : cljs.core.create_node.call(null, a, b + 5, i, g, c, d, e))
};
cljs.core.BitmapIndexedNode.prototype.inode_seq = function() {
  return cljs.core.create_inode_seq.cljs$lang$arity$1 ? cljs.core.create_inode_seq.cljs$lang$arity$1(this.arr) : cljs.core.create_inode_seq.call(null, this.arr)
};
cljs.core.BitmapIndexedNode.prototype.inode_without_BANG_ = function(a, b, c, d, e) {
  var f = 1 << (c >>> b & 31);
  if(0 === (this.bitmap & f)) {
    return this
  }
  var g = cljs.core.bitmap_indexed_node_index(this.bitmap, f), h = this.arr[2 * g], i = this.arr[2 * g + 1];
  return null == h ? (b = i.inode_without_BANG_(a, b + 5, c, d, e), b === i ? this : null != b ? cljs.core.edit_and_set.cljs$lang$arity$4(this, a, 2 * g + 1, b) : this.bitmap === f ? null : this.edit_and_remove_pair(a, f, g)) : cljs.core.key_test(d, h) ? (e[0] = !0, this.edit_and_remove_pair(a, f, g)) : this
};
cljs.core.BitmapIndexedNode.prototype.ensure_editable = function(a) {
  if(a === this.edit) {
    return this
  }
  var b = cljs.core.bit_count(this.bitmap), c = cljs.core.make_array.cljs$lang$arity$1(0 > b ? 4 : 2 * (b + 1));
  cljs.core.array_copy(this.arr, 0, c, 0, 2 * b);
  return new cljs.core.BitmapIndexedNode(a, this.bitmap, c)
};
cljs.core.BitmapIndexedNode.prototype.kv_reduce = function(a, b) {
  return cljs.core.inode_kv_reduce(this.arr, a, b)
};
cljs.core.BitmapIndexedNode.prototype.inode_find = function(a, b, c, d) {
  var e = 1 << (b >>> a & 31);
  if(0 === (this.bitmap & e)) {
    return d
  }
  var f = cljs.core.bitmap_indexed_node_index(this.bitmap, e), e = this.arr[2 * f], f = this.arr[2 * f + 1];
  return null == e ? f.inode_find(a + 5, b, c, d) : cljs.core.key_test(c, e) ? cljs.core.PersistentVector.fromArray([e, f], !0) : d
};
cljs.core.BitmapIndexedNode.prototype.inode_without = function(a, b, c) {
  var d = 1 << (b >>> a & 31);
  if(0 === (this.bitmap & d)) {
    return this
  }
  var e = cljs.core.bitmap_indexed_node_index(this.bitmap, d), f = this.arr[2 * e], g = this.arr[2 * e + 1];
  return null == f ? (a = g.inode_without(a + 5, b, c), a === g ? this : null != a ? new cljs.core.BitmapIndexedNode(null, this.bitmap, cljs.core.clone_and_set.cljs$lang$arity$3(this.arr, 2 * e + 1, a)) : this.bitmap === d ? null : new cljs.core.BitmapIndexedNode(null, this.bitmap ^ d, cljs.core.remove_pair(this.arr, e))) : cljs.core.key_test(c, f) ? new cljs.core.BitmapIndexedNode(null, this.bitmap ^ d, cljs.core.remove_pair(this.arr, e)) : this
};
cljs.core.BitmapIndexedNode.prototype.inode_assoc = function(a, b, c, d, e) {
  var f = 1 << (b >>> a & 31), g = cljs.core.bitmap_indexed_node_index(this.bitmap, f);
  if(0 === (this.bitmap & f)) {
    var h = cljs.core.bit_count(this.bitmap);
    if(16 <= h) {
      g = cljs.core.make_array.cljs$lang$arity$1(32);
      g[b >>> a & 31] = cljs.core.BitmapIndexedNode.EMPTY.inode_assoc(a + 5, b, c, d, e);
      for(d = c = 0;;) {
        if(32 > c) {
          0 !== (this.bitmap >>> c & 1) && (g[c] = null != this.arr[d] ? cljs.core.BitmapIndexedNode.EMPTY.inode_assoc(a + 5, cljs.core.hash.cljs$lang$arity$1(this.arr[d]), this.arr[d], this.arr[d + 1], e) : this.arr[d + 1], d += 2), c += 1
        }else {
          break
        }
      }
      return new cljs.core.ArrayNode(null, h + 1, g)
    }
    a = cljs.core.make_array.cljs$lang$arity$1(2 * (h + 1));
    cljs.core.array_copy(this.arr, 0, a, 0, 2 * g);
    a[2 * g] = c;
    a[2 * g + 1] = d;
    cljs.core.array_copy(this.arr, 2 * g, a, 2 * (g + 1), 2 * (h - g));
    e.val = !0;
    return new cljs.core.BitmapIndexedNode(null, this.bitmap | f, a)
  }
  h = this.arr[2 * g];
  f = this.arr[2 * g + 1];
  if(null == h) {
    return h = f.inode_assoc(a + 5, b, c, d, e), h === f ? this : new cljs.core.BitmapIndexedNode(null, this.bitmap, cljs.core.clone_and_set.cljs$lang$arity$3(this.arr, 2 * g + 1, h))
  }
  if(cljs.core.key_test(c, h)) {
    return d === f ? this : new cljs.core.BitmapIndexedNode(null, this.bitmap, cljs.core.clone_and_set.cljs$lang$arity$3(this.arr, 2 * g + 1, d))
  }
  e.val = !0;
  return new cljs.core.BitmapIndexedNode(null, this.bitmap, cljs.core.clone_and_set.cljs$lang$arity$5(this.arr, 2 * g, null, 2 * g + 1, cljs.core.create_node.cljs$lang$arity$6 ? cljs.core.create_node.cljs$lang$arity$6(a + 5, h, f, b, c, d) : cljs.core.create_node.call(null, a + 5, h, f, b, c, d)))
};
cljs.core.BitmapIndexedNode.prototype.inode_lookup = function(a, b, c, d) {
  var e = 1 << (b >>> a & 31);
  if(0 === (this.bitmap & e)) {
    return d
  }
  var f = cljs.core.bitmap_indexed_node_index(this.bitmap, e), e = this.arr[2 * f], f = this.arr[2 * f + 1];
  return null == e ? f.inode_lookup(a + 5, b, c, d) : cljs.core.key_test(c, e) ? f : d
};
cljs.core.BitmapIndexedNode.EMPTY = new cljs.core.BitmapIndexedNode(null, 0, cljs.core.make_array.cljs$lang$arity$1(0));
cljs.core.pack_array_node = function(a, b, c) {
  for(var d = a.arr, a = 2 * (a.cnt - 1), e = cljs.core.make_array.cljs$lang$arity$1(a), f = 0, g = 1, h = 0;;) {
    if(f < a) {
      cljs.core.truth_(function() {
        var a = f !== c;
        return a ? null != d[f] : a
      }()) && (e[g] = d[f], g += 2, h |= 1 << f), f += 1
    }else {
      return new cljs.core.BitmapIndexedNode(b, h, e)
    }
  }
};
cljs.core.ArrayNode = function(a, b, c) {
  this.edit = a;
  this.cnt = b;
  this.arr = c
};
cljs.core.ArrayNode.cljs$lang$type = !0;
cljs.core.ArrayNode.cljs$lang$ctorPrSeq = function() {
  return cljs.core.list.cljs$lang$arity$1("cljs.core/ArrayNode")
};
cljs.core.ArrayNode.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/ArrayNode")
};
cljs.core.ArrayNode.prototype.inode_assoc_BANG_ = function(a, b, c, d, e, f) {
  var g = c >>> b & 31, h = this.arr[g];
  if(null == h) {
    return a = cljs.core.edit_and_set.cljs$lang$arity$4(this, a, g, cljs.core.BitmapIndexedNode.EMPTY.inode_assoc_BANG_(a, b + 5, c, d, e, f)), a.cnt += 1, a
  }
  b = h.inode_assoc_BANG_(a, b + 5, c, d, e, f);
  return b === h ? this : cljs.core.edit_and_set.cljs$lang$arity$4(this, a, g, b)
};
cljs.core.ArrayNode.prototype.inode_seq = function() {
  return cljs.core.create_array_node_seq.cljs$lang$arity$1 ? cljs.core.create_array_node_seq.cljs$lang$arity$1(this.arr) : cljs.core.create_array_node_seq.call(null, this.arr)
};
cljs.core.ArrayNode.prototype.inode_without_BANG_ = function(a, b, c, d, e) {
  var f = c >>> b & 31, g = this.arr[f];
  if(null == g) {
    return this
  }
  b = g.inode_without_BANG_(a, b + 5, c, d, e);
  if(b === g) {
    return this
  }
  if(null == b) {
    if(8 >= this.cnt) {
      return cljs.core.pack_array_node(this, a, f)
    }
    a = cljs.core.edit_and_set.cljs$lang$arity$4(this, a, f, b);
    a.cnt -= 1;
    return a
  }
  return cljs.core.edit_and_set.cljs$lang$arity$4(this, a, f, b)
};
cljs.core.ArrayNode.prototype.ensure_editable = function(a) {
  return a === this.edit ? this : new cljs.core.ArrayNode(a, this.cnt, this.arr.slice())
};
cljs.core.ArrayNode.prototype.kv_reduce = function(a, b) {
  for(var c = this.arr.length, d = 0, e = b;;) {
    if(d < c) {
      var f = this.arr[d];
      if(null != f) {
        e = f.kv_reduce(a, e);
        if(cljs.core.reduced_QMARK_(e)) {
          return cljs.core.deref.cljs$lang$arity$1 ? cljs.core.deref.cljs$lang$arity$1(e) : cljs.core.deref.call(null, e)
        }
        d += 1
      }else {
        return null
      }
    }else {
      return e
    }
  }
};
cljs.core.ArrayNode.prototype.inode_find = function(a, b, c, d) {
  var e = this.arr[b >>> a & 31];
  return null != e ? e.inode_find(a + 5, b, c, d) : d
};
cljs.core.ArrayNode.prototype.inode_without = function(a, b, c) {
  var d = b >>> a & 31, e = this.arr[d];
  return null != e ? (a = e.inode_without(a + 5, b, c), a === e ? this : null == a ? 8 >= this.cnt ? cljs.core.pack_array_node(this, null, d) : new cljs.core.ArrayNode(null, this.cnt - 1, cljs.core.clone_and_set.cljs$lang$arity$3(this.arr, d, a)) : new cljs.core.ArrayNode(null, this.cnt, cljs.core.clone_and_set.cljs$lang$arity$3(this.arr, d, a))) : this
};
cljs.core.ArrayNode.prototype.inode_assoc = function(a, b, c, d, e) {
  var f = b >>> a & 31, g = this.arr[f];
  if(null == g) {
    return new cljs.core.ArrayNode(null, this.cnt + 1, cljs.core.clone_and_set.cljs$lang$arity$3(this.arr, f, cljs.core.BitmapIndexedNode.EMPTY.inode_assoc(a + 5, b, c, d, e)))
  }
  a = g.inode_assoc(a + 5, b, c, d, e);
  return a === g ? this : new cljs.core.ArrayNode(null, this.cnt, cljs.core.clone_and_set.cljs$lang$arity$3(this.arr, f, a))
};
cljs.core.ArrayNode.prototype.inode_lookup = function(a, b, c, d) {
  var e = this.arr[b >>> a & 31];
  return null != e ? e.inode_lookup(a + 5, b, c, d) : d
};
cljs.core.hash_collision_node_find_index = function(a, b, c) {
  for(var b = 2 * b, d = 0;;) {
    if(d < b) {
      if(cljs.core.key_test(c, a[d])) {
        return d
      }
      d += 2
    }else {
      return-1
    }
  }
};
cljs.core.HashCollisionNode = function(a, b, c, d) {
  this.edit = a;
  this.collision_hash = b;
  this.cnt = c;
  this.arr = d
};
cljs.core.HashCollisionNode.cljs$lang$type = !0;
cljs.core.HashCollisionNode.cljs$lang$ctorPrSeq = function() {
  return cljs.core.list.cljs$lang$arity$1("cljs.core/HashCollisionNode")
};
cljs.core.HashCollisionNode.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/HashCollisionNode")
};
cljs.core.HashCollisionNode.prototype.inode_assoc_BANG_ = function(a, b, c, d, e, f) {
  if(c === this.collision_hash) {
    b = cljs.core.hash_collision_node_find_index(this.arr, this.cnt, d);
    if(-1 === b) {
      if(this.arr.length > 2 * this.cnt) {
        return a = cljs.core.edit_and_set.cljs$lang$arity$6(this, a, 2 * this.cnt, d, 2 * this.cnt + 1, e), f.val = !0, a.cnt += 1, a
      }
      b = this.arr.length;
      c = cljs.core.make_array.cljs$lang$arity$1(b + 2);
      cljs.core.array_copy(this.arr, 0, c, 0, b);
      c[b] = d;
      c[b + 1] = e;
      f.val = !0;
      return this.ensure_editable_array(a, this.cnt + 1, c)
    }
    return this.arr[b + 1] === e ? this : cljs.core.edit_and_set.cljs$lang$arity$4(this, a, b + 1, e)
  }
  return(new cljs.core.BitmapIndexedNode(a, 1 << (this.collision_hash >>> b & 31), [null, this, null, null])).inode_assoc_BANG_(a, b, c, d, e, f)
};
cljs.core.HashCollisionNode.prototype.inode_seq = function() {
  return cljs.core.create_inode_seq.cljs$lang$arity$1 ? cljs.core.create_inode_seq.cljs$lang$arity$1(this.arr) : cljs.core.create_inode_seq.call(null, this.arr)
};
cljs.core.HashCollisionNode.prototype.inode_without_BANG_ = function(a, b, c, d, e) {
  b = cljs.core.hash_collision_node_find_index(this.arr, this.cnt, d);
  if(-1 === b) {
    return this
  }
  e[0] = !0;
  if(1 === this.cnt) {
    return null
  }
  a = this.ensure_editable(a);
  e = a.arr;
  e[b] = e[2 * this.cnt - 2];
  e[b + 1] = e[2 * this.cnt - 1];
  e[2 * this.cnt - 1] = null;
  e[2 * this.cnt - 2] = null;
  a.cnt -= 1;
  return a
};
cljs.core.HashCollisionNode.prototype.ensure_editable = function(a) {
  if(a === this.edit) {
    return this
  }
  var b = cljs.core.make_array.cljs$lang$arity$1(2 * (this.cnt + 1));
  cljs.core.array_copy(this.arr, 0, b, 0, 2 * this.cnt);
  return new cljs.core.HashCollisionNode(a, this.collision_hash, this.cnt, b)
};
cljs.core.HashCollisionNode.prototype.kv_reduce = function(a, b) {
  return cljs.core.inode_kv_reduce(this.arr, a, b)
};
cljs.core.HashCollisionNode.prototype.inode_find = function(a, b, c, d) {
  a = cljs.core.hash_collision_node_find_index(this.arr, this.cnt, c);
  return 0 > a ? d : cljs.core.key_test(c, this.arr[a]) ? cljs.core.PersistentVector.fromArray([this.arr[a], this.arr[a + 1]], !0) : d
};
cljs.core.HashCollisionNode.prototype.inode_without = function(a, b, c) {
  a = cljs.core.hash_collision_node_find_index(this.arr, this.cnt, c);
  return-1 === a ? this : 1 === this.cnt ? null : new cljs.core.HashCollisionNode(null, this.collision_hash, this.cnt - 1, cljs.core.remove_pair(this.arr, cljs.core.quot(a, 2)))
};
cljs.core.HashCollisionNode.prototype.inode_assoc = function(a, b, c, d, e) {
  return b === this.collision_hash ? (a = cljs.core.hash_collision_node_find_index(this.arr, this.cnt, c), -1 === a ? (a = this.arr.length, b = cljs.core.make_array.cljs$lang$arity$1(a + 2), cljs.core.array_copy(this.arr, 0, b, 0, a), b[a] = c, b[a + 1] = d, e.val = !0, new cljs.core.HashCollisionNode(null, this.collision_hash, this.cnt + 1, b)) : cljs.core._EQ_.cljs$lang$arity$2(this.arr[a], d) ? this : new cljs.core.HashCollisionNode(null, this.collision_hash, this.cnt, cljs.core.clone_and_set.cljs$lang$arity$3(this.arr, 
  a + 1, d))) : (new cljs.core.BitmapIndexedNode(null, 1 << (this.collision_hash >>> a & 31), [null, this])).inode_assoc(a, b, c, d, e)
};
cljs.core.HashCollisionNode.prototype.inode_lookup = function(a, b, c, d) {
  a = cljs.core.hash_collision_node_find_index(this.arr, this.cnt, c);
  return 0 > a ? d : cljs.core.key_test(c, this.arr[a]) ? this.arr[a + 1] : d
};
cljs.core.HashCollisionNode.prototype.ensure_editable_array = function(a, b, c) {
  return a === this.edit ? (this.arr = c, this.cnt = b, this) : new cljs.core.HashCollisionNode(this.edit, this.collision_hash, b, c)
};
cljs.core.create_node = function() {
  var a = null, b = function(a, b, c, g, h, i) {
    var j = cljs.core.hash.cljs$lang$arity$1(b);
    if(j === g) {
      return new cljs.core.HashCollisionNode(null, j, 2, [b, c, h, i])
    }
    var l = new cljs.core.Box(!1);
    return cljs.core.BitmapIndexedNode.EMPTY.inode_assoc(a, j, b, c, l).inode_assoc(a, g, h, i, l)
  }, c = function(a, b, c, g, h, i, j) {
    var l = cljs.core.hash.cljs$lang$arity$1(c);
    if(l === h) {
      return new cljs.core.HashCollisionNode(null, l, 2, [c, g, i, j])
    }
    var m = new cljs.core.Box(!1);
    return cljs.core.BitmapIndexedNode.EMPTY.inode_assoc_BANG_(a, b, l, c, g, m).inode_assoc_BANG_(a, b, h, i, j, m)
  }, a = function(a, e, f, g, h, i, j) {
    switch(arguments.length) {
      case 6:
        return b.call(this, a, e, f, g, h, i);
      case 7:
        return c.call(this, a, e, f, g, h, i, j)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$6 = b;
  a.cljs$lang$arity$7 = c;
  return a
}();
cljs.core.NodeSeq = function(a, b, c, d, e) {
  this.meta = a;
  this.nodes = b;
  this.i = c;
  this.s = d;
  this.__hash = e;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 31850572
};
cljs.core.NodeSeq.cljs$lang$type = !0;
cljs.core.NodeSeq.cljs$lang$ctorPrSeq = function() {
  return cljs.core.list.cljs$lang$arity$1("cljs.core/NodeSeq")
};
cljs.core.NodeSeq.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/NodeSeq")
};
cljs.core.NodeSeq.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  var b = this.__hash;
  return null != b ? b : this.__hash = a = cljs.core.hash_coll(a)
};
cljs.core.NodeSeq.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return cljs.core.cons(b, a)
};
cljs.core.NodeSeq.prototype.toString = function() {
  return cljs.core.pr_str.cljs$lang$arity$1 ? cljs.core.pr_str.cljs$lang$arity$1(this) : cljs.core.pr_str.call(null, this)
};
cljs.core.NodeSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = function(a) {
  return a
};
cljs.core.NodeSeq.prototype.cljs$core$ISeq$_first$arity$1 = function() {
  return null == this.s ? cljs.core.PersistentVector.fromArray([this.nodes[this.i], this.nodes[this.i + 1]], !0) : cljs.core.first(this.s)
};
cljs.core.NodeSeq.prototype.cljs$core$ISeq$_rest$arity$1 = function() {
  return null == this.s ? cljs.core.create_inode_seq.cljs$lang$arity$3 ? cljs.core.create_inode_seq.cljs$lang$arity$3(this.nodes, this.i + 2, null) : cljs.core.create_inode_seq.call(null, this.nodes, this.i + 2, null) : cljs.core.create_inode_seq.cljs$lang$arity$3 ? cljs.core.create_inode_seq.cljs$lang$arity$3(this.nodes, this.i, cljs.core.next(this.s)) : cljs.core.create_inode_seq.call(null, this.nodes, this.i, cljs.core.next(this.s))
};
cljs.core.NodeSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_sequential(a, b)
};
cljs.core.NodeSeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.NodeSeq(b, this.nodes, this.i, this.s, this.__hash)
};
cljs.core.NodeSeq.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
  return this.meta
};
cljs.core.NodeSeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function() {
  return cljs.core.with_meta(cljs.core.List.EMPTY, this.meta)
};
cljs.core.create_inode_seq = function() {
  var a = null, b = function(b) {
    return a.cljs$lang$arity$3(b, 0, null)
  }, c = function(a, b, c) {
    if(null == c) {
      for(c = a.length;;) {
        if(b < c) {
          if(null != a[b]) {
            return new cljs.core.NodeSeq(null, a, b, null, null)
          }
          var g = a[b + 1];
          if(cljs.core.truth_(g) && (g = g.inode_seq(), cljs.core.truth_(g))) {
            return new cljs.core.NodeSeq(null, a, b + 2, g, null)
          }
          b += 2
        }else {
          return null
        }
      }
    }else {
      return new cljs.core.NodeSeq(null, a, b, c, null)
    }
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$1 = b;
  a.cljs$lang$arity$3 = c;
  return a
}();
cljs.core.ArrayNodeSeq = function(a, b, c, d, e) {
  this.meta = a;
  this.nodes = b;
  this.i = c;
  this.s = d;
  this.__hash = e;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 31850572
};
cljs.core.ArrayNodeSeq.cljs$lang$type = !0;
cljs.core.ArrayNodeSeq.cljs$lang$ctorPrSeq = function() {
  return cljs.core.list.cljs$lang$arity$1("cljs.core/ArrayNodeSeq")
};
cljs.core.ArrayNodeSeq.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/ArrayNodeSeq")
};
cljs.core.ArrayNodeSeq.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  var b = this.__hash;
  return null != b ? b : this.__hash = a = cljs.core.hash_coll(a)
};
cljs.core.ArrayNodeSeq.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return cljs.core.cons(b, a)
};
cljs.core.ArrayNodeSeq.prototype.toString = function() {
  return cljs.core.pr_str.cljs$lang$arity$1 ? cljs.core.pr_str.cljs$lang$arity$1(this) : cljs.core.pr_str.call(null, this)
};
cljs.core.ArrayNodeSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = function(a) {
  return a
};
cljs.core.ArrayNodeSeq.prototype.cljs$core$ISeq$_first$arity$1 = function() {
  return cljs.core.first(this.s)
};
cljs.core.ArrayNodeSeq.prototype.cljs$core$ISeq$_rest$arity$1 = function() {
  return cljs.core.create_array_node_seq.cljs$lang$arity$4 ? cljs.core.create_array_node_seq.cljs$lang$arity$4(null, this.nodes, this.i, cljs.core.next(this.s)) : cljs.core.create_array_node_seq.call(null, null, this.nodes, this.i, cljs.core.next(this.s))
};
cljs.core.ArrayNodeSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_sequential(a, b)
};
cljs.core.ArrayNodeSeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.ArrayNodeSeq(b, this.nodes, this.i, this.s, this.__hash)
};
cljs.core.ArrayNodeSeq.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
  return this.meta
};
cljs.core.ArrayNodeSeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function() {
  return cljs.core.with_meta(cljs.core.List.EMPTY, this.meta)
};
cljs.core.create_array_node_seq = function() {
  var a = null, b = function(b) {
    return a.cljs$lang$arity$4(null, b, 0, null)
  }, c = function(a, b, c, g) {
    if(null == g) {
      for(g = b.length;;) {
        if(c < g) {
          var h = b[c];
          if(cljs.core.truth_(h) && (h = h.inode_seq(), cljs.core.truth_(h))) {
            return new cljs.core.ArrayNodeSeq(a, b, c + 1, h, null)
          }
          c += 1
        }else {
          return null
        }
      }
    }else {
      return new cljs.core.ArrayNodeSeq(a, b, c, g, null)
    }
  }, a = function(a, e, f, g) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 4:
        return c.call(this, a, e, f, g)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$1 = b;
  a.cljs$lang$arity$4 = c;
  return a
}();
cljs.core.TransientHashMap = void 0;
cljs.core.PersistentHashMap = function(a, b, c, d, e, f) {
  this.meta = a;
  this.cnt = b;
  this.root = c;
  this.has_nil_QMARK_ = d;
  this.nil_val = e;
  this.__hash = f;
  this.cljs$lang$protocol_mask$partition1$ = 4;
  this.cljs$lang$protocol_mask$partition0$ = 16123663
};
cljs.core.PersistentHashMap.cljs$lang$type = !0;
cljs.core.PersistentHashMap.cljs$lang$ctorPrSeq = function() {
  return cljs.core.list.cljs$lang$arity$1("cljs.core/PersistentHashMap")
};
cljs.core.PersistentHashMap.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/PersistentHashMap")
};
cljs.core.PersistentHashMap.prototype.cljs$core$IEditableCollection$_as_transient$arity$1 = function() {
  return new cljs.core.TransientHashMap({}, this.root, this.cnt, this.has_nil_QMARK_, this.nil_val)
};
cljs.core.PersistentHashMap.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  var b = this.__hash;
  return null != b ? b : this.__hash = a = cljs.core.hash_imap(a)
};
cljs.core.PersistentHashMap.prototype.cljs$core$ILookup$_lookup$arity$2 = function(a, b) {
  return a.cljs$core$ILookup$_lookup$arity$3(a, b, null)
};
cljs.core.PersistentHashMap.prototype.cljs$core$ILookup$_lookup$arity$3 = function(a, b, c) {
  return null == b ? this.has_nil_QMARK_ ? this.nil_val : c : null == this.root ? c : this.root.inode_lookup(0, cljs.core.hash.cljs$lang$arity$1(b), b, c)
};
cljs.core.PersistentHashMap.prototype.cljs$core$IAssociative$_assoc$arity$3 = function(a, b, c) {
  var d = this;
  if(null == b) {
    return cljs.core.truth_(function() {
      var a = d.has_nil_QMARK_;
      return a ? c === d.nil_val : a
    }()) ? a : new cljs.core.PersistentHashMap(d.meta, d.has_nil_QMARK_ ? d.cnt : d.cnt + 1, d.root, !0, c, null)
  }
  var e = new cljs.core.Box(!1), b = (null == d.root ? cljs.core.BitmapIndexedNode.EMPTY : d.root).inode_assoc(0, cljs.core.hash.cljs$lang$arity$1(b), b, c, e);
  return b === d.root ? a : new cljs.core.PersistentHashMap(d.meta, e.val ? d.cnt + 1 : d.cnt, b, d.has_nil_QMARK_, d.nil_val, null)
};
cljs.core.PersistentHashMap.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = function(a, b) {
  return null == b ? this.has_nil_QMARK_ : null == this.root ? !1 : this.root.inode_lookup(0, cljs.core.hash.cljs$lang$arity$1(b), b, cljs.core.lookup_sentinel) !== cljs.core.lookup_sentinel
};
cljs.core.PersistentHashMap.prototype.call = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return this.cljs$core$ILookup$_lookup$arity$2(this, c);
      case 3:
        return this.cljs$core$ILookup$_lookup$arity$3(this, c, d)
    }
    throw Error("Invalid arity: " + arguments.length);
  }
}();
cljs.core.PersistentHashMap.prototype.apply = function(a, b) {
  a = this;
  return a.call.apply(a, [a].concat(b.slice()))
};
cljs.core.PersistentHashMap.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = function(a, b, c) {
  a = this.has_nil_QMARK_ ? b.cljs$lang$arity$3 ? b.cljs$lang$arity$3(c, null, this.nil_val) : b.call(null, c, null, this.nil_val) : c;
  return cljs.core.reduced_QMARK_(a) ? cljs.core.deref.cljs$lang$arity$1 ? cljs.core.deref.cljs$lang$arity$1(a) : cljs.core.deref.call(null, a) : null != this.root ? this.root.kv_reduce(b, a) : a
};
cljs.core.PersistentHashMap.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return cljs.core.vector_QMARK_(b) ? a.cljs$core$IAssociative$_assoc$arity$3(a, cljs.core._nth.cljs$lang$arity$2(b, 0), cljs.core._nth.cljs$lang$arity$2(b, 1)) : cljs.core.reduce.cljs$lang$arity$3(cljs.core._conj, a, b)
};
cljs.core.PersistentHashMap.prototype.toString = function() {
  return cljs.core.pr_str.cljs$lang$arity$1 ? cljs.core.pr_str.cljs$lang$arity$1(this) : cljs.core.pr_str.call(null, this)
};
cljs.core.PersistentHashMap.prototype.cljs$core$ISeqable$_seq$arity$1 = function() {
  if(0 < this.cnt) {
    var a = null != this.root ? this.root.inode_seq() : null;
    return this.has_nil_QMARK_ ? cljs.core.cons(cljs.core.PersistentVector.fromArray([null, this.nil_val], !0), a) : a
  }
  return null
};
cljs.core.PersistentHashMap.prototype.cljs$core$ICounted$_count$arity$1 = function() {
  return this.cnt
};
cljs.core.PersistentHashMap.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_map(a, b)
};
cljs.core.PersistentHashMap.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.PersistentHashMap(b, this.cnt, this.root, this.has_nil_QMARK_, this.nil_val, this.__hash)
};
cljs.core.PersistentHashMap.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
  return this.meta
};
cljs.core.PersistentHashMap.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function() {
  return cljs.core._with_meta(cljs.core.PersistentHashMap.EMPTY, this.meta)
};
cljs.core.PersistentHashMap.prototype.cljs$core$IMap$_dissoc$arity$2 = function(a, b) {
  if(null == b) {
    return this.has_nil_QMARK_ ? new cljs.core.PersistentHashMap(this.meta, this.cnt - 1, this.root, !1, null, null) : a
  }
  if(null == this.root) {
    return a
  }
  var c = this.root.inode_without(0, cljs.core.hash.cljs$lang$arity$1(b), b);
  return c === this.root ? a : new cljs.core.PersistentHashMap(this.meta, this.cnt - 1, c, this.has_nil_QMARK_, this.nil_val, null)
};
cljs.core.PersistentHashMap.EMPTY = new cljs.core.PersistentHashMap(null, 0, null, !1, null, 0);
cljs.core.PersistentHashMap.fromArrays = function(a, b) {
  for(var c = a.length, d = 0, e = cljs.core.transient$(cljs.core.PersistentHashMap.EMPTY);;) {
    if(d < c) {
      var f = d + 1, e = cljs.core.assoc_BANG_(e, a[d], b[d]), d = f
    }else {
      return cljs.core.persistent_BANG_(e)
    }
  }
};
cljs.core.TransientHashMap = function(a, b, c, d, e) {
  this.edit = a;
  this.root = b;
  this.count = c;
  this.has_nil_QMARK_ = d;
  this.nil_val = e;
  this.cljs$lang$protocol_mask$partition1$ = 56;
  this.cljs$lang$protocol_mask$partition0$ = 258
};
cljs.core.TransientHashMap.cljs$lang$type = !0;
cljs.core.TransientHashMap.cljs$lang$ctorPrSeq = function() {
  return cljs.core.list.cljs$lang$arity$1("cljs.core/TransientHashMap")
};
cljs.core.TransientHashMap.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/TransientHashMap")
};
cljs.core.TransientHashMap.prototype.cljs$core$ITransientMap$_dissoc_BANG_$arity$2 = function(a, b) {
  return a.without_BANG_(b)
};
cljs.core.TransientHashMap.prototype.cljs$core$ITransientAssociative$_assoc_BANG_$arity$3 = function(a, b, c) {
  return a.assoc_BANG_(b, c)
};
cljs.core.TransientHashMap.prototype.cljs$core$ITransientCollection$_conj_BANG_$arity$2 = function(a, b) {
  return a.conj_BANG_(b)
};
cljs.core.TransientHashMap.prototype.cljs$core$ITransientCollection$_persistent_BANG_$arity$1 = function(a) {
  return a.persistent_BANG_()
};
cljs.core.TransientHashMap.prototype.cljs$core$ILookup$_lookup$arity$2 = function(a, b) {
  return null == b ? this.has_nil_QMARK_ ? this.nil_val : null : null == this.root ? null : this.root.inode_lookup(0, cljs.core.hash.cljs$lang$arity$1(b), b)
};
cljs.core.TransientHashMap.prototype.cljs$core$ILookup$_lookup$arity$3 = function(a, b, c) {
  return null == b ? this.has_nil_QMARK_ ? this.nil_val : c : null == this.root ? c : this.root.inode_lookup(0, cljs.core.hash.cljs$lang$arity$1(b), b, c)
};
cljs.core.TransientHashMap.prototype.cljs$core$ICounted$_count$arity$1 = function() {
  if(this.edit) {
    return this.count
  }
  throw Error("count after persistent!");
};
cljs.core.TransientHashMap.prototype.conj_BANG_ = function(a) {
  if(this.edit) {
    if(cljs.core.truth_(a ? cljs.core.truth_(function() {
      var b = a.cljs$lang$protocol_mask$partition0$ & 2048;
      return b ? b : a.cljs$core$IMapEntry$
    }()) ? !0 : a.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.type_satisfies_(cljs.core.IMapEntry, a) : cljs.core.type_satisfies_(cljs.core.IMapEntry, a))) {
      return this.assoc_BANG_(cljs.core.key.cljs$lang$arity$1 ? cljs.core.key.cljs$lang$arity$1(a) : cljs.core.key.call(null, a), cljs.core.val.cljs$lang$arity$1 ? cljs.core.val.cljs$lang$arity$1(a) : cljs.core.val.call(null, a))
    }
    for(var b = cljs.core.seq(a), c = this;;) {
      var d = cljs.core.first(b);
      if(cljs.core.truth_(d)) {
        b = cljs.core.next(b), c = c.assoc_BANG_(cljs.core.key.cljs$lang$arity$1 ? cljs.core.key.cljs$lang$arity$1(d) : cljs.core.key.call(null, d), cljs.core.val.cljs$lang$arity$1 ? cljs.core.val.cljs$lang$arity$1(d) : cljs.core.val.call(null, d))
      }else {
        return c
      }
    }
  }else {
    throw Error("conj! after persistent");
  }
};
cljs.core.TransientHashMap.prototype.assoc_BANG_ = function(a, b) {
  if(this.edit) {
    if(null == a) {
      this.nil_val !== b && (this.nil_val = b), this.has_nil_QMARK_ || (this.count += 1, this.has_nil_QMARK_ = !0)
    }else {
      var c = new cljs.core.Box(!1), d = (null == this.root ? cljs.core.BitmapIndexedNode.EMPTY : this.root).inode_assoc_BANG_(this.edit, 0, cljs.core.hash.cljs$lang$arity$1(a), a, b, c);
      d !== this.root && (this.root = d);
      c.val && (this.count += 1)
    }
    return this
  }
  throw Error("assoc! after persistent!");
};
cljs.core.TransientHashMap.prototype.without_BANG_ = function(a) {
  if(this.edit) {
    if(null == a) {
      this.has_nil_QMARK_ && (this.has_nil_QMARK_ = !1, this.nil_val = null, this.count -= 1)
    }else {
      if(null != this.root) {
        var b = new cljs.core.Box(!1), a = this.root.inode_without_BANG_(this.edit, 0, cljs.core.hash.cljs$lang$arity$1(a), a, b);
        a !== this.root && (this.root = a);
        cljs.core.truth_(b[0]) && (this.count -= 1)
      }
    }
    return this
  }
  throw Error("dissoc! after persistent!");
};
cljs.core.TransientHashMap.prototype.persistent_BANG_ = function() {
  if(this.edit) {
    return this.edit = null, new cljs.core.PersistentHashMap(null, this.count, this.root, this.has_nil_QMARK_, this.nil_val, null)
  }
  throw Error("persistent! called twice");
};
cljs.core.tree_map_seq_push = function(a, b, c) {
  for(var d = b;;) {
    if(null != a) {
      b = c ? a.left : a.right, d = cljs.core.conj.cljs$lang$arity$2(d, a), a = b
    }else {
      return d
    }
  }
};
cljs.core.PersistentTreeMapSeq = function(a, b, c, d, e) {
  this.meta = a;
  this.stack = b;
  this.ascending_QMARK_ = c;
  this.cnt = d;
  this.__hash = e;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 31850574
};
cljs.core.PersistentTreeMapSeq.cljs$lang$type = !0;
cljs.core.PersistentTreeMapSeq.cljs$lang$ctorPrSeq = function() {
  return cljs.core.list.cljs$lang$arity$1("cljs.core/PersistentTreeMapSeq")
};
cljs.core.PersistentTreeMapSeq.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/PersistentTreeMapSeq")
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  var b = this.__hash;
  return null != b ? b : this.__hash = a = cljs.core.hash_coll(a)
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return cljs.core.cons(b, a)
};
cljs.core.PersistentTreeMapSeq.prototype.toString = function() {
  return cljs.core.pr_str.cljs$lang$arity$1 ? cljs.core.pr_str.cljs$lang$arity$1(this) : cljs.core.pr_str.call(null, this)
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$ISeqable$_seq$arity$1 = function(a) {
  return a
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$ICounted$_count$arity$1 = function(a) {
  return 0 > this.cnt ? cljs.core.count(cljs.core.next(a)) + 1 : this.cnt
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$ISeq$_first$arity$1 = function() {
  return cljs.core.peek(this.stack)
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$ISeq$_rest$arity$1 = function() {
  var a = cljs.core.first(this.stack), a = cljs.core.tree_map_seq_push(this.ascending_QMARK_ ? a.right : a.left, cljs.core.next(this.stack), this.ascending_QMARK_);
  return null != a ? new cljs.core.PersistentTreeMapSeq(null, a, this.ascending_QMARK_, this.cnt - 1, null) : cljs.core.List.EMPTY
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_sequential(a, b)
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.PersistentTreeMapSeq(b, this.stack, this.ascending_QMARK_, this.cnt, this.__hash)
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
  return this.meta
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function() {
  return cljs.core.with_meta(cljs.core.List.EMPTY, this.meta)
};
cljs.core.create_tree_map_seq = function(a, b, c) {
  return new cljs.core.PersistentTreeMapSeq(null, cljs.core.tree_map_seq_push(a, null, b), b, c, null)
};
cljs.core.RedNode = void 0;
cljs.core.BlackNode = void 0;
cljs.core.balance_left = function(a, b, c, d) {
  return cljs.core.instance_QMARK_(cljs.core.RedNode, c) ? cljs.core.instance_QMARK_(cljs.core.RedNode, c.left) ? new cljs.core.RedNode(c.key, c.val, c.left.blacken(), new cljs.core.BlackNode(a, b, c.right, d, null), null) : cljs.core.instance_QMARK_(cljs.core.RedNode, c.right) ? new cljs.core.RedNode(c.right.key, c.right.val, new cljs.core.BlackNode(c.key, c.val, c.left, c.right.left, null), new cljs.core.BlackNode(a, b, c.right.right, d, null), null) : new cljs.core.BlackNode(a, b, c, d, null) : 
  new cljs.core.BlackNode(a, b, c, d, null)
};
cljs.core.balance_right = function(a, b, c, d) {
  return cljs.core.instance_QMARK_(cljs.core.RedNode, d) ? cljs.core.instance_QMARK_(cljs.core.RedNode, d.right) ? new cljs.core.RedNode(d.key, d.val, new cljs.core.BlackNode(a, b, c, d.left, null), d.right.blacken(), null) : cljs.core.instance_QMARK_(cljs.core.RedNode, d.left) ? new cljs.core.RedNode(d.left.key, d.left.val, new cljs.core.BlackNode(a, b, c, d.left.left, null), new cljs.core.BlackNode(d.key, d.val, d.left.right, d.right, null), null) : new cljs.core.BlackNode(a, b, c, d, null) : new cljs.core.BlackNode(a, 
  b, c, d, null)
};
cljs.core.balance_left_del = function(a, b, c, d) {
  if(cljs.core.instance_QMARK_(cljs.core.RedNode, c)) {
    return new cljs.core.RedNode(a, b, c.blacken(), d, null)
  }
  if(cljs.core.instance_QMARK_(cljs.core.BlackNode, d)) {
    return cljs.core.balance_right(a, b, c, d.redden())
  }
  if(cljs.core.truth_(function() {
    var a = cljs.core.instance_QMARK_(cljs.core.RedNode, d);
    return a ? cljs.core.instance_QMARK_(cljs.core.BlackNode, d.left) : a
  }())) {
    return new cljs.core.RedNode(d.left.key, d.left.val, new cljs.core.BlackNode(a, b, c, d.left.left, null), cljs.core.balance_right(d.key, d.val, d.left.right, d.right.redden()), null)
  }
  throw Error("red-black tree invariant violation");
};
cljs.core.balance_right_del = function(a, b, c, d) {
  if(cljs.core.instance_QMARK_(cljs.core.RedNode, d)) {
    return new cljs.core.RedNode(a, b, c, d.blacken(), null)
  }
  if(cljs.core.instance_QMARK_(cljs.core.BlackNode, c)) {
    return cljs.core.balance_left(a, b, c.redden(), d)
  }
  if(cljs.core.truth_(function() {
    var a = cljs.core.instance_QMARK_(cljs.core.RedNode, c);
    return a ? cljs.core.instance_QMARK_(cljs.core.BlackNode, c.right) : a
  }())) {
    return new cljs.core.RedNode(c.right.key, c.right.val, cljs.core.balance_left(c.key, c.val, c.left.redden(), c.right.left), new cljs.core.BlackNode(a, b, c.right.right, d, null), null)
  }
  throw Error("red-black tree invariant violation");
};
cljs.core.tree_map_kv_reduce = function tree_map_kv_reduce(b, c, d) {
  d = null != b.left ? tree_map_kv_reduce(b.left, c, d) : d;
  if(cljs.core.reduced_QMARK_(d)) {
    return cljs.core.deref.cljs$lang$arity$1 ? cljs.core.deref.cljs$lang$arity$1(d) : cljs.core.deref.call(null, d)
  }
  d = c.cljs$lang$arity$3 ? c.cljs$lang$arity$3(d, b.key, b.val) : c.call(null, d, b.key, b.val);
  if(cljs.core.reduced_QMARK_(d)) {
    return cljs.core.deref.cljs$lang$arity$1 ? cljs.core.deref.cljs$lang$arity$1(d) : cljs.core.deref.call(null, d)
  }
  b = null != b.right ? tree_map_kv_reduce(b.right, c, d) : d;
  return cljs.core.reduced_QMARK_(b) ? cljs.core.deref.cljs$lang$arity$1 ? cljs.core.deref.cljs$lang$arity$1(b) : cljs.core.deref.call(null, b) : b
};
cljs.core.BlackNode = function(a, b, c, d, e) {
  this.key = a;
  this.val = b;
  this.left = c;
  this.right = d;
  this.__hash = e;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 32402207
};
cljs.core.BlackNode.cljs$lang$type = !0;
cljs.core.BlackNode.cljs$lang$ctorPrSeq = function() {
  return cljs.core.list.cljs$lang$arity$1("cljs.core/BlackNode")
};
cljs.core.BlackNode.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/BlackNode")
};
cljs.core.BlackNode.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  var b = this.__hash;
  return null != b ? b : this.__hash = a = cljs.core.hash_coll(a)
};
cljs.core.BlackNode.prototype.cljs$core$ILookup$_lookup$arity$2 = function(a, b) {
  return a.cljs$core$IIndexed$_nth$arity$3(a, b, null)
};
cljs.core.BlackNode.prototype.cljs$core$ILookup$_lookup$arity$3 = function(a, b, c) {
  return a.cljs$core$IIndexed$_nth$arity$3(a, b, c)
};
cljs.core.BlackNode.prototype.cljs$core$IAssociative$_assoc$arity$3 = function(a, b, c) {
  return cljs.core.assoc.cljs$lang$arity$3(cljs.core.PersistentVector.fromArray([this.key, this.val], !0), b, c)
};
cljs.core.BlackNode.prototype.call = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return this.cljs$core$ILookup$_lookup$arity$2(this, c);
      case 3:
        return this.cljs$core$ILookup$_lookup$arity$3(this, c, d)
    }
    throw Error("Invalid arity: " + arguments.length);
  }
}();
cljs.core.BlackNode.prototype.apply = function(a, b) {
  a = this;
  return a.call.apply(a, [a].concat(b.slice()))
};
cljs.core.BlackNode.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return cljs.core.PersistentVector.fromArray([this.key, this.val, b], !0)
};
cljs.core.BlackNode.prototype.cljs$core$IMapEntry$_key$arity$1 = function() {
  return this.key
};
cljs.core.BlackNode.prototype.cljs$core$IMapEntry$_val$arity$1 = function() {
  return this.val
};
cljs.core.BlackNode.prototype.add_right = function(a) {
  return a.balance_right(this)
};
cljs.core.BlackNode.prototype.redden = function() {
  return new cljs.core.RedNode(this.key, this.val, this.left, this.right, null)
};
cljs.core.BlackNode.prototype.remove_right = function(a) {
  return cljs.core.balance_right_del(this.key, this.val, this.left, a)
};
cljs.core.BlackNode.prototype.replace = function(a, b, c, d) {
  return new cljs.core.BlackNode(a, b, c, d, null)
};
cljs.core.BlackNode.prototype.kv_reduce = function(a, b) {
  return cljs.core.tree_map_kv_reduce(this, a, b)
};
cljs.core.BlackNode.prototype.remove_left = function(a) {
  return cljs.core.balance_left_del(this.key, this.val, a, this.right)
};
cljs.core.BlackNode.prototype.add_left = function(a) {
  return a.balance_left(this)
};
cljs.core.BlackNode.prototype.balance_left = function(a) {
  return new cljs.core.BlackNode(a.key, a.val, this, a.right, null)
};
cljs.core.BlackNode.prototype.toString = function() {
  return function() {
    switch(arguments.length) {
      case 0:
        return cljs.core.pr_str.cljs$lang$arity$1 ? cljs.core.pr_str.cljs$lang$arity$1(this) : cljs.core.pr_str.call(null, this)
    }
    throw Error("Invalid arity: " + arguments.length);
  }
}();
cljs.core.BlackNode.prototype.balance_right = function(a) {
  return new cljs.core.BlackNode(a.key, a.val, a.left, this, null)
};
cljs.core.BlackNode.prototype.blacken = function() {
  return this
};
cljs.core.BlackNode.prototype.cljs$core$IReduce$_reduce$arity$2 = function(a, b) {
  return cljs.core.ci_reduce.cljs$lang$arity$2(a, b)
};
cljs.core.BlackNode.prototype.cljs$core$IReduce$_reduce$arity$3 = function(a, b, c) {
  return cljs.core.ci_reduce.cljs$lang$arity$3(a, b, c)
};
cljs.core.BlackNode.prototype.cljs$core$ISeqable$_seq$arity$1 = function() {
  return cljs.core.list.cljs$lang$arity$2(this.key, this.val)
};
cljs.core.BlackNode.prototype.cljs$core$ICounted$_count$arity$1 = function() {
  return 2
};
cljs.core.BlackNode.prototype.cljs$core$IStack$_peek$arity$1 = function() {
  return this.val
};
cljs.core.BlackNode.prototype.cljs$core$IStack$_pop$arity$1 = function() {
  return cljs.core.PersistentVector.fromArray([this.key], !0)
};
cljs.core.BlackNode.prototype.cljs$core$IVector$_assoc_n$arity$3 = function(a, b, c) {
  return cljs.core._assoc_n(cljs.core.PersistentVector.fromArray([this.key, this.val], !0), b, c)
};
cljs.core.BlackNode.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_sequential(a, b)
};
cljs.core.BlackNode.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return cljs.core.with_meta(cljs.core.PersistentVector.fromArray([this.key, this.val], !0), b)
};
cljs.core.BlackNode.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
  return null
};
cljs.core.BlackNode.prototype.cljs$core$IIndexed$_nth$arity$2 = function(a, b) {
  return 0 === b ? this.key : 1 === b ? this.val : null
};
cljs.core.BlackNode.prototype.cljs$core$IIndexed$_nth$arity$3 = function(a, b, c) {
  return 0 === b ? this.key : 1 === b ? this.val : c
};
cljs.core.BlackNode.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function() {
  return cljs.core.PersistentVector.EMPTY
};
cljs.core.RedNode = function(a, b, c, d, e) {
  this.key = a;
  this.val = b;
  this.left = c;
  this.right = d;
  this.__hash = e;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 32402207
};
cljs.core.RedNode.cljs$lang$type = !0;
cljs.core.RedNode.cljs$lang$ctorPrSeq = function() {
  return cljs.core.list.cljs$lang$arity$1("cljs.core/RedNode")
};
cljs.core.RedNode.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/RedNode")
};
cljs.core.RedNode.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  var b = this.__hash;
  return null != b ? b : this.__hash = a = cljs.core.hash_coll(a)
};
cljs.core.RedNode.prototype.cljs$core$ILookup$_lookup$arity$2 = function(a, b) {
  return a.cljs$core$IIndexed$_nth$arity$3(a, b, null)
};
cljs.core.RedNode.prototype.cljs$core$ILookup$_lookup$arity$3 = function(a, b, c) {
  return a.cljs$core$IIndexed$_nth$arity$3(a, b, c)
};
cljs.core.RedNode.prototype.cljs$core$IAssociative$_assoc$arity$3 = function(a, b, c) {
  return cljs.core.assoc.cljs$lang$arity$3(cljs.core.PersistentVector.fromArray([this.key, this.val], !0), b, c)
};
cljs.core.RedNode.prototype.call = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return this.cljs$core$ILookup$_lookup$arity$2(this, c);
      case 3:
        return this.cljs$core$ILookup$_lookup$arity$3(this, c, d)
    }
    throw Error("Invalid arity: " + arguments.length);
  }
}();
cljs.core.RedNode.prototype.apply = function(a, b) {
  a = this;
  return a.call.apply(a, [a].concat(b.slice()))
};
cljs.core.RedNode.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return cljs.core.PersistentVector.fromArray([this.key, this.val, b], !0)
};
cljs.core.RedNode.prototype.cljs$core$IMapEntry$_key$arity$1 = function() {
  return this.key
};
cljs.core.RedNode.prototype.cljs$core$IMapEntry$_val$arity$1 = function() {
  return this.val
};
cljs.core.RedNode.prototype.add_right = function(a) {
  return new cljs.core.RedNode(this.key, this.val, this.left, a, null)
};
cljs.core.RedNode.prototype.redden = function() {
  throw Error("red-black tree invariant violation");
};
cljs.core.RedNode.prototype.remove_right = function(a) {
  return new cljs.core.RedNode(this.key, this.val, this.left, a, null)
};
cljs.core.RedNode.prototype.replace = function(a, b, c, d) {
  return new cljs.core.RedNode(a, b, c, d, null)
};
cljs.core.RedNode.prototype.kv_reduce = function(a, b) {
  return cljs.core.tree_map_kv_reduce(this, a, b)
};
cljs.core.RedNode.prototype.remove_left = function(a) {
  return new cljs.core.RedNode(this.key, this.val, a, this.right, null)
};
cljs.core.RedNode.prototype.add_left = function(a) {
  return new cljs.core.RedNode(this.key, this.val, a, this.right, null)
};
cljs.core.RedNode.prototype.balance_left = function(a) {
  return cljs.core.instance_QMARK_(cljs.core.RedNode, this.left) ? new cljs.core.RedNode(this.key, this.val, this.left.blacken(), new cljs.core.BlackNode(a.key, a.val, this.right, a.right, null), null) : cljs.core.instance_QMARK_(cljs.core.RedNode, this.right) ? new cljs.core.RedNode(this.right.key, this.right.val, new cljs.core.BlackNode(this.key, this.val, this.left, this.right.left, null), new cljs.core.BlackNode(a.key, a.val, this.right.right, a.right, null), null) : new cljs.core.BlackNode(a.key, 
  a.val, this, a.right, null)
};
cljs.core.RedNode.prototype.toString = function() {
  return function() {
    switch(arguments.length) {
      case 0:
        return cljs.core.pr_str.cljs$lang$arity$1 ? cljs.core.pr_str.cljs$lang$arity$1(this) : cljs.core.pr_str.call(null, this)
    }
    throw Error("Invalid arity: " + arguments.length);
  }
}();
cljs.core.RedNode.prototype.balance_right = function(a) {
  return cljs.core.instance_QMARK_(cljs.core.RedNode, this.right) ? new cljs.core.RedNode(this.key, this.val, new cljs.core.BlackNode(a.key, a.val, a.left, this.left, null), this.right.blacken(), null) : cljs.core.instance_QMARK_(cljs.core.RedNode, this.left) ? new cljs.core.RedNode(this.left.key, this.left.val, new cljs.core.BlackNode(a.key, a.val, a.left, this.left.left, null), new cljs.core.BlackNode(this.key, this.val, this.left.right, this.right, null), null) : new cljs.core.BlackNode(a.key, 
  a.val, a.left, this, null)
};
cljs.core.RedNode.prototype.blacken = function() {
  return new cljs.core.BlackNode(this.key, this.val, this.left, this.right, null)
};
cljs.core.RedNode.prototype.cljs$core$IReduce$_reduce$arity$2 = function(a, b) {
  return cljs.core.ci_reduce.cljs$lang$arity$2(a, b)
};
cljs.core.RedNode.prototype.cljs$core$IReduce$_reduce$arity$3 = function(a, b, c) {
  return cljs.core.ci_reduce.cljs$lang$arity$3(a, b, c)
};
cljs.core.RedNode.prototype.cljs$core$ISeqable$_seq$arity$1 = function() {
  return cljs.core.list.cljs$lang$arity$2(this.key, this.val)
};
cljs.core.RedNode.prototype.cljs$core$ICounted$_count$arity$1 = function() {
  return 2
};
cljs.core.RedNode.prototype.cljs$core$IStack$_peek$arity$1 = function() {
  return this.val
};
cljs.core.RedNode.prototype.cljs$core$IStack$_pop$arity$1 = function() {
  return cljs.core.PersistentVector.fromArray([this.key], !0)
};
cljs.core.RedNode.prototype.cljs$core$IVector$_assoc_n$arity$3 = function(a, b, c) {
  return cljs.core._assoc_n(cljs.core.PersistentVector.fromArray([this.key, this.val], !0), b, c)
};
cljs.core.RedNode.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_sequential(a, b)
};
cljs.core.RedNode.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return cljs.core.with_meta(cljs.core.PersistentVector.fromArray([this.key, this.val], !0), b)
};
cljs.core.RedNode.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
  return null
};
cljs.core.RedNode.prototype.cljs$core$IIndexed$_nth$arity$2 = function(a, b) {
  return 0 === b ? this.key : 1 === b ? this.val : null
};
cljs.core.RedNode.prototype.cljs$core$IIndexed$_nth$arity$3 = function(a, b, c) {
  return 0 === b ? this.key : 1 === b ? this.val : c
};
cljs.core.RedNode.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function() {
  return cljs.core.PersistentVector.EMPTY
};
cljs.core.tree_map_add = function tree_map_add(b, c, d, e, f) {
  if(null == c) {
    return new cljs.core.RedNode(d, e, null, null, null)
  }
  var g = b.cljs$lang$arity$2 ? b.cljs$lang$arity$2(d, c.key) : b.call(null, d, c.key);
  if(0 === g) {
    return f[0] = c, null
  }
  if(0 > g) {
    return b = tree_map_add(b, c.left, d, e, f), null != b ? c.add_left(b) : null
  }
  b = tree_map_add(b, c.right, d, e, f);
  return null != b ? c.add_right(b) : null
};
cljs.core.tree_map_append = function tree_map_append(b, c) {
  if(null == b) {
    return c
  }
  if(null == c) {
    return b
  }
  if(cljs.core.instance_QMARK_(cljs.core.RedNode, b)) {
    if(cljs.core.instance_QMARK_(cljs.core.RedNode, c)) {
      var d = tree_map_append(b.right, c.left);
      return cljs.core.instance_QMARK_(cljs.core.RedNode, d) ? new cljs.core.RedNode(d.key, d.val, new cljs.core.RedNode(b.key, b.val, b.left, d.left, null), new cljs.core.RedNode(c.key, c.val, d.right, c.right, null), null) : new cljs.core.RedNode(b.key, b.val, b.left, new cljs.core.RedNode(c.key, c.val, d, c.right, null), null)
    }
    return new cljs.core.RedNode(b.key, b.val, b.left, tree_map_append(b.right, c), null)
  }
  if(cljs.core.instance_QMARK_(cljs.core.RedNode, c)) {
    return new cljs.core.RedNode(c.key, c.val, tree_map_append(b, c.left), c.right, null)
  }
  d = tree_map_append(b.right, c.left);
  return cljs.core.instance_QMARK_(cljs.core.RedNode, d) ? new cljs.core.RedNode(d.key, d.val, new cljs.core.BlackNode(b.key, b.val, b.left, d.left, null), new cljs.core.BlackNode(c.key, c.val, d.right, c.right, null), null) : cljs.core.balance_left_del(b.key, b.val, b.left, new cljs.core.BlackNode(c.key, c.val, d, c.right, null))
};
cljs.core.tree_map_remove = function tree_map_remove(b, c, d, e) {
  if(null != c) {
    var f = b.cljs$lang$arity$2 ? b.cljs$lang$arity$2(d, c.key) : b.call(null, d, c.key);
    if(0 === f) {
      return e[0] = c, cljs.core.tree_map_append(c.left, c.right)
    }
    if(0 > f) {
      var g = tree_map_remove(b, c.left, d, e);
      return cljs.core.truth_(function() {
        var b = null != g;
        return b ? b : null != e[0]
      }()) ? cljs.core.instance_QMARK_(cljs.core.BlackNode, c.left) ? cljs.core.balance_left_del(c.key, c.val, g, c.right) : new cljs.core.RedNode(c.key, c.val, g, c.right, null) : null
    }
    g = tree_map_remove(b, c.right, d, e);
    return cljs.core.truth_(function() {
      var b = null != g;
      return b ? b : null != e[0]
    }()) ? cljs.core.instance_QMARK_(cljs.core.BlackNode, c.right) ? cljs.core.balance_right_del(c.key, c.val, c.left, g) : new cljs.core.RedNode(c.key, c.val, c.left, g, null) : null
  }
  return null
};
cljs.core.tree_map_replace = function tree_map_replace(b, c, d, e) {
  var f = c.key, g = b.cljs$lang$arity$2 ? b.cljs$lang$arity$2(d, f) : b.call(null, d, f);
  return 0 === g ? c.replace(f, e, c.left, c.right) : 0 > g ? c.replace(f, c.val, tree_map_replace(b, c.left, d, e), c.right) : c.replace(f, c.val, c.left, tree_map_replace(b, c.right, d, e))
};
cljs.core.key = void 0;
cljs.core.PersistentTreeMap = function(a, b, c, d, e) {
  this.comp = a;
  this.tree = b;
  this.cnt = c;
  this.meta = d;
  this.__hash = e;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 418776847
};
cljs.core.PersistentTreeMap.cljs$lang$type = !0;
cljs.core.PersistentTreeMap.cljs$lang$ctorPrSeq = function() {
  return cljs.core.list.cljs$lang$arity$1("cljs.core/PersistentTreeMap")
};
cljs.core.PersistentTreeMap.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/PersistentTreeMap")
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  var b = this.__hash;
  return null != b ? b : this.__hash = a = cljs.core.hash_imap(a)
};
cljs.core.PersistentTreeMap.prototype.cljs$core$ILookup$_lookup$arity$2 = function(a, b) {
  return a.cljs$core$ILookup$_lookup$arity$3(a, b, null)
};
cljs.core.PersistentTreeMap.prototype.cljs$core$ILookup$_lookup$arity$3 = function(a, b, c) {
  a = a.entry_at(b);
  return null != a ? a.val : c
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IAssociative$_assoc$arity$3 = function(a, b, c) {
  var d = [null], e = cljs.core.tree_map_add(this.comp, this.tree, b, c, d);
  return null == e ? (d = cljs.core.nth.cljs$lang$arity$2(d, 0), cljs.core._EQ_.cljs$lang$arity$2(c, d.val) ? a : new cljs.core.PersistentTreeMap(this.comp, cljs.core.tree_map_replace(this.comp, this.tree, b, c), this.cnt, this.meta, null)) : new cljs.core.PersistentTreeMap(this.comp, e.blacken(), this.cnt + 1, this.meta, null)
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = function(a, b) {
  return null != a.entry_at(b)
};
cljs.core.PersistentTreeMap.prototype.call = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return this.cljs$core$ILookup$_lookup$arity$2(this, c);
      case 3:
        return this.cljs$core$ILookup$_lookup$arity$3(this, c, d)
    }
    throw Error("Invalid arity: " + arguments.length);
  }
}();
cljs.core.PersistentTreeMap.prototype.apply = function(a, b) {
  a = this;
  return a.call.apply(a, [a].concat(b.slice()))
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = function(a, b, c) {
  return null != this.tree ? cljs.core.tree_map_kv_reduce(this.tree, b, c) : c
};
cljs.core.PersistentTreeMap.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return cljs.core.vector_QMARK_(b) ? a.cljs$core$IAssociative$_assoc$arity$3(a, cljs.core._nth.cljs$lang$arity$2(b, 0), cljs.core._nth.cljs$lang$arity$2(b, 1)) : cljs.core.reduce.cljs$lang$arity$3(cljs.core._conj, a, b)
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IReversible$_rseq$arity$1 = function() {
  return 0 < this.cnt ? cljs.core.create_tree_map_seq(this.tree, !1, this.cnt) : null
};
cljs.core.PersistentTreeMap.prototype.toString = function() {
  return cljs.core.pr_str.cljs$lang$arity$1 ? cljs.core.pr_str.cljs$lang$arity$1(this) : cljs.core.pr_str.call(null, this)
};
cljs.core.PersistentTreeMap.prototype.entry_at = function(a) {
  for(var b = this.tree;;) {
    if(null != b) {
      var c = this.comp.cljs$lang$arity$2 ? this.comp.cljs$lang$arity$2(a, b.key) : this.comp.call(null, a, b.key);
      if(0 === c) {
        return b
      }
      b = 0 > c ? b.left : b.right
    }else {
      return null
    }
  }
};
cljs.core.PersistentTreeMap.prototype.cljs$core$ISorted$_sorted_seq$arity$2 = function(a, b) {
  return 0 < this.cnt ? cljs.core.create_tree_map_seq(this.tree, b, this.cnt) : null
};
cljs.core.PersistentTreeMap.prototype.cljs$core$ISorted$_sorted_seq_from$arity$3 = function(a, b, c) {
  if(0 < this.cnt) {
    for(var a = null, d = this.tree;;) {
      if(null != d) {
        var e = this.comp.cljs$lang$arity$2 ? this.comp.cljs$lang$arity$2(b, d.key) : this.comp.call(null, b, d.key);
        if(0 === e) {
          return new cljs.core.PersistentTreeMapSeq(null, cljs.core.conj.cljs$lang$arity$2(a, d), c, -1, null)
        }
        cljs.core.truth_(c) ? 0 > e ? (a = cljs.core.conj.cljs$lang$arity$2(a, d), d = d.left) : d = d.right : 0 < e ? (a = cljs.core.conj.cljs$lang$arity$2(a, d), d = d.right) : d = d.left
      }else {
        return null == a ? null : new cljs.core.PersistentTreeMapSeq(null, a, c, -1, null)
      }
    }
  }else {
    return null
  }
};
cljs.core.PersistentTreeMap.prototype.cljs$core$ISorted$_entry_key$arity$2 = function(a, b) {
  return cljs.core.key.cljs$lang$arity$1 ? cljs.core.key.cljs$lang$arity$1(b) : cljs.core.key.call(null, b)
};
cljs.core.PersistentTreeMap.prototype.cljs$core$ISorted$_comparator$arity$1 = function() {
  return this.comp
};
cljs.core.PersistentTreeMap.prototype.cljs$core$ISeqable$_seq$arity$1 = function() {
  return 0 < this.cnt ? cljs.core.create_tree_map_seq(this.tree, !0, this.cnt) : null
};
cljs.core.PersistentTreeMap.prototype.cljs$core$ICounted$_count$arity$1 = function() {
  return this.cnt
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_map(a, b)
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.PersistentTreeMap(this.comp, this.tree, this.cnt, b, this.__hash)
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
  return this.meta
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function() {
  return cljs.core.with_meta(cljs.core.PersistentTreeMap.EMPTY, this.meta)
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IMap$_dissoc$arity$2 = function(a, b) {
  var c = [null], d = cljs.core.tree_map_remove(this.comp, this.tree, b, c);
  return null == d ? null == cljs.core.nth.cljs$lang$arity$2(c, 0) ? a : new cljs.core.PersistentTreeMap(this.comp, null, 0, this.meta, null) : new cljs.core.PersistentTreeMap(this.comp, d.blacken(), this.cnt - 1, this.meta, null)
};
cljs.core.PersistentTreeMap.EMPTY = new cljs.core.PersistentTreeMap(cljs.core.compare, null, 0, null, 0);
cljs.core.hash_map = function() {
  var a = function(a) {
    for(var a = cljs.core.seq(a), b = cljs.core.transient$(cljs.core.PersistentHashMap.EMPTY);;) {
      if(a) {
        var e = cljs.core.nnext(a), b = cljs.core.assoc_BANG_(b, cljs.core.first(a), cljs.core.second(a)), a = e
      }else {
        return cljs.core.persistent_BANG_(b)
      }
    }
  }, b = function(b) {
    var d = null;
    goog.isDef(b) && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a(b)
  };
  b.cljs$lang$arity$variadic = a;
  return b
}();
cljs.core.array_map = function() {
  var a = function(a) {
    return new cljs.core.PersistentArrayMap(null, cljs.core.quot(cljs.core.count(a), 2), cljs.core.apply.cljs$lang$arity$2(cljs.core.array, a), null)
  }, b = function(b) {
    var d = null;
    goog.isDef(b) && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a(b)
  };
  b.cljs$lang$arity$variadic = a;
  return b
}();
cljs.core.obj_map = function() {
  var a = function(a) {
    for(var b = [], e = {}, a = cljs.core.seq(a);;) {
      if(a) {
        b.push(cljs.core.first(a)), e[cljs.core.first(a)] = cljs.core.second(a), a = cljs.core.nnext(a)
      }else {
        return cljs.core.ObjMap.fromObject.cljs$lang$arity$2 ? cljs.core.ObjMap.fromObject.cljs$lang$arity$2(b, e) : cljs.core.ObjMap.fromObject.call(null, b, e)
      }
    }
  }, b = function(b) {
    var d = null;
    goog.isDef(b) && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a(b)
  };
  b.cljs$lang$arity$variadic = a;
  return b
}();
cljs.core.sorted_map = function() {
  var a = function(a) {
    for(var a = cljs.core.seq(a), b = cljs.core.PersistentTreeMap.EMPTY;;) {
      if(a) {
        var e = cljs.core.nnext(a), b = cljs.core.assoc.cljs$lang$arity$3(b, cljs.core.first(a), cljs.core.second(a)), a = e
      }else {
        return b
      }
    }
  }, b = function(b) {
    var d = null;
    goog.isDef(b) && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a(b)
  };
  b.cljs$lang$arity$variadic = a;
  return b
}();
cljs.core.sorted_map_by = function() {
  var a = function(a, b) {
    for(var e = cljs.core.seq(b), f = new cljs.core.PersistentTreeMap(cljs.core.fn__GT_comparator(a), null, 0, null, 0);;) {
      if(e) {
        var g = cljs.core.nnext(e), f = cljs.core.assoc.cljs$lang$arity$3(f, cljs.core.first(e), cljs.core.second(e)), e = g
      }else {
        return f
      }
    }
  }, b = function(b, d) {
    var e = null;
    goog.isDef(d) && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return a.call(this, b, e)
  };
  b.cljs$lang$maxFixedArity = 1;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), b = cljs.core.rest(b);
    return a(d, b)
  };
  b.cljs$lang$arity$variadic = a;
  return b
}();
cljs.core.keys = function(a) {
  return cljs.core.seq(cljs.core.map.cljs$lang$arity$2(cljs.core.first, a))
};
cljs.core.key = function(a) {
  return cljs.core._key(a)
};
cljs.core.vals = function(a) {
  return cljs.core.seq(cljs.core.map.cljs$lang$arity$2(cljs.core.second, a))
};
cljs.core.val = function(a) {
  return cljs.core._val(a)
};
cljs.core.merge = function() {
  var a = function(a) {
    return cljs.core.truth_(cljs.core.some(cljs.core.identity, a)) ? cljs.core.reduce.cljs$lang$arity$2(function(a, b) {
      return cljs.core.conj.cljs$lang$arity$2(cljs.core.truth_(a) ? a : cljs.core.ObjMap.EMPTY, b)
    }, a) : null
  }, b = function(b) {
    var d = null;
    goog.isDef(b) && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a(b)
  };
  b.cljs$lang$arity$variadic = a;
  return b
}();
cljs.core.merge_with = function() {
  var a = function(a, b) {
    if(cljs.core.truth_(cljs.core.some(cljs.core.identity, b))) {
      var e = function(b, d) {
        var e = cljs.core.first(d), i = cljs.core.second(d);
        return cljs.core.contains_QMARK_(b, e) ? cljs.core.assoc.cljs$lang$arity$3(b, e, a.cljs$lang$arity$2 ? a.cljs$lang$arity$2(cljs.core._lookup.cljs$lang$arity$3(b, e, null), i) : a.call(null, cljs.core._lookup.cljs$lang$arity$3(b, e, null), i)) : cljs.core.assoc.cljs$lang$arity$3(b, e, i)
      };
      return cljs.core.reduce.cljs$lang$arity$2(function(a, b) {
        return cljs.core.reduce.cljs$lang$arity$3(e, cljs.core.truth_(a) ? a : cljs.core.ObjMap.EMPTY, cljs.core.seq(b))
      }, b)
    }
    return null
  }, b = function(b, d) {
    var e = null;
    goog.isDef(d) && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return a.call(this, b, e)
  };
  b.cljs$lang$maxFixedArity = 1;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), b = cljs.core.rest(b);
    return a(d, b)
  };
  b.cljs$lang$arity$variadic = a;
  return b
}();
cljs.core.select_keys = function(a, b) {
  for(var c = cljs.core.ObjMap.EMPTY, d = cljs.core.seq(b);;) {
    if(d) {
      var e = cljs.core.first(d), f = cljs.core._lookup.cljs$lang$arity$3(a, e, "\ufdd0:cljs.core/not-found"), c = cljs.core.not_EQ_.cljs$lang$arity$2(f, "\ufdd0:cljs.core/not-found") ? cljs.core.assoc.cljs$lang$arity$3(c, e, f) : c, d = cljs.core.next(d)
    }else {
      return c
    }
  }
};
cljs.core.TransientHashSet = void 0;
cljs.core.PersistentHashSet = function(a, b, c) {
  this.meta = a;
  this.hash_map = b;
  this.__hash = c;
  this.cljs$lang$protocol_mask$partition1$ = 4;
  this.cljs$lang$protocol_mask$partition0$ = 15077647
};
cljs.core.PersistentHashSet.cljs$lang$type = !0;
cljs.core.PersistentHashSet.cljs$lang$ctorPrSeq = function() {
  return cljs.core.list.cljs$lang$arity$1("cljs.core/PersistentHashSet")
};
cljs.core.PersistentHashSet.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/PersistentHashSet")
};
cljs.core.PersistentHashSet.prototype.cljs$core$IEditableCollection$_as_transient$arity$1 = function() {
  return new cljs.core.TransientHashSet(cljs.core.transient$(this.hash_map))
};
cljs.core.PersistentHashSet.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  var b = this.__hash;
  return null != b ? b : this.__hash = a = cljs.core.hash_iset(a)
};
cljs.core.PersistentHashSet.prototype.cljs$core$ILookup$_lookup$arity$2 = function(a, b) {
  return a.cljs$core$ILookup$_lookup$arity$3(a, b, null)
};
cljs.core.PersistentHashSet.prototype.cljs$core$ILookup$_lookup$arity$3 = function(a, b, c) {
  return cljs.core.truth_(cljs.core._contains_key_QMARK_(this.hash_map, b)) ? b : c
};
cljs.core.PersistentHashSet.prototype.call = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return this.cljs$core$ILookup$_lookup$arity$2(this, c);
      case 3:
        return this.cljs$core$ILookup$_lookup$arity$3(this, c, d)
    }
    throw Error("Invalid arity: " + arguments.length);
  }
}();
cljs.core.PersistentHashSet.prototype.apply = function(a, b) {
  a = this;
  return a.call.apply(a, [a].concat(b.slice()))
};
cljs.core.PersistentHashSet.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return new cljs.core.PersistentHashSet(this.meta, cljs.core.assoc.cljs$lang$arity$3(this.hash_map, b, null), null)
};
cljs.core.PersistentHashSet.prototype.toString = function() {
  return cljs.core.pr_str.cljs$lang$arity$1 ? cljs.core.pr_str.cljs$lang$arity$1(this) : cljs.core.pr_str.call(null, this)
};
cljs.core.PersistentHashSet.prototype.cljs$core$ISeqable$_seq$arity$1 = function() {
  return cljs.core.keys(this.hash_map)
};
cljs.core.PersistentHashSet.prototype.cljs$core$ISet$_disjoin$arity$2 = function(a, b) {
  return new cljs.core.PersistentHashSet(this.meta, cljs.core.dissoc.cljs$lang$arity$2(this.hash_map, b), null)
};
cljs.core.PersistentHashSet.prototype.cljs$core$ICounted$_count$arity$1 = function(a) {
  return cljs.core.count(cljs.core.seq(a))
};
cljs.core.PersistentHashSet.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  var c = cljs.core.set_QMARK_(b);
  return c ? (c = cljs.core.count(a) === cljs.core.count(b)) ? cljs.core.every_QMARK_(function(b) {
    return cljs.core.contains_QMARK_(a, b)
  }, b) : c : c
};
cljs.core.PersistentHashSet.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.PersistentHashSet(b, this.hash_map, this.__hash)
};
cljs.core.PersistentHashSet.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
  return this.meta
};
cljs.core.PersistentHashSet.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function() {
  return cljs.core.with_meta(cljs.core.PersistentHashSet.EMPTY, this.meta)
};
cljs.core.PersistentHashSet.EMPTY = new cljs.core.PersistentHashSet(null, cljs.core.hash_map(), 0);
cljs.core.PersistentHashSet.fromArray = function(a) {
  for(var b = cljs.core.count(a), c = 0, d = cljs.core.transient$(cljs.core.PersistentHashSet.EMPTY);;) {
    if(c < b) {
      var e = c + 1, d = cljs.core.conj_BANG_(d, a[c]), c = e
    }else {
      return cljs.core.persistent_BANG_(d)
    }
  }
};
cljs.core.TransientHashSet = function(a) {
  this.transient_map = a;
  this.cljs$lang$protocol_mask$partition0$ = 259;
  this.cljs$lang$protocol_mask$partition1$ = 136
};
cljs.core.TransientHashSet.cljs$lang$type = !0;
cljs.core.TransientHashSet.cljs$lang$ctorPrSeq = function() {
  return cljs.core.list.cljs$lang$arity$1("cljs.core/TransientHashSet")
};
cljs.core.TransientHashSet.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/TransientHashSet")
};
cljs.core.TransientHashSet.prototype.call = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        var e;
        e = cljs.core._lookup.cljs$lang$arity$3(this.transient_map, c, cljs.core.lookup_sentinel) === cljs.core.lookup_sentinel ? null : c;
        return e;
      case 3:
        return e = cljs.core._lookup.cljs$lang$arity$3(this.transient_map, c, cljs.core.lookup_sentinel) === cljs.core.lookup_sentinel ? d : c, e
    }
    throw Error("Invalid arity: " + arguments.length);
  }
}();
cljs.core.TransientHashSet.prototype.apply = function(a, b) {
  a = this;
  return a.call.apply(a, [a].concat(b.slice()))
};
cljs.core.TransientHashSet.prototype.cljs$core$ILookup$_lookup$arity$2 = function(a, b) {
  return a.cljs$core$ILookup$_lookup$arity$3(a, b, null)
};
cljs.core.TransientHashSet.prototype.cljs$core$ILookup$_lookup$arity$3 = function(a, b, c) {
  return cljs.core._lookup.cljs$lang$arity$3(this.transient_map, b, cljs.core.lookup_sentinel) === cljs.core.lookup_sentinel ? c : b
};
cljs.core.TransientHashSet.prototype.cljs$core$ICounted$_count$arity$1 = function() {
  return cljs.core.count(this.transient_map)
};
cljs.core.TransientHashSet.prototype.cljs$core$ITransientSet$_disjoin_BANG_$arity$2 = function(a, b) {
  this.transient_map = cljs.core.dissoc_BANG_(this.transient_map, b);
  return a
};
cljs.core.TransientHashSet.prototype.cljs$core$ITransientCollection$_conj_BANG_$arity$2 = function(a, b) {
  this.transient_map = cljs.core.assoc_BANG_(this.transient_map, b, null);
  return a
};
cljs.core.TransientHashSet.prototype.cljs$core$ITransientCollection$_persistent_BANG_$arity$1 = function() {
  return new cljs.core.PersistentHashSet(null, cljs.core.persistent_BANG_(this.transient_map), null)
};
cljs.core.PersistentTreeSet = function(a, b, c) {
  this.meta = a;
  this.tree_map = b;
  this.__hash = c;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 417730831
};
cljs.core.PersistentTreeSet.cljs$lang$type = !0;
cljs.core.PersistentTreeSet.cljs$lang$ctorPrSeq = function() {
  return cljs.core.list.cljs$lang$arity$1("cljs.core/PersistentTreeSet")
};
cljs.core.PersistentTreeSet.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/PersistentTreeSet")
};
cljs.core.PersistentTreeSet.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  var b = this.__hash;
  return null != b ? b : this.__hash = a = cljs.core.hash_iset(a)
};
cljs.core.PersistentTreeSet.prototype.cljs$core$ILookup$_lookup$arity$2 = function(a, b) {
  return a.cljs$core$ILookup$_lookup$arity$3(a, b, null)
};
cljs.core.PersistentTreeSet.prototype.cljs$core$ILookup$_lookup$arity$3 = function(a, b, c) {
  a = this.tree_map.entry_at(b);
  return null != a ? a.key : c
};
cljs.core.PersistentTreeSet.prototype.call = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return this.cljs$core$ILookup$_lookup$arity$2(this, c);
      case 3:
        return this.cljs$core$ILookup$_lookup$arity$3(this, c, d)
    }
    throw Error("Invalid arity: " + arguments.length);
  }
}();
cljs.core.PersistentTreeSet.prototype.apply = function(a, b) {
  a = this;
  return a.call.apply(a, [a].concat(b.slice()))
};
cljs.core.PersistentTreeSet.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return new cljs.core.PersistentTreeSet(this.meta, cljs.core.assoc.cljs$lang$arity$3(this.tree_map, b, null), null)
};
cljs.core.PersistentTreeSet.prototype.cljs$core$IReversible$_rseq$arity$1 = function() {
  return cljs.core.map.cljs$lang$arity$2(cljs.core.key, cljs.core.rseq(this.tree_map))
};
cljs.core.PersistentTreeSet.prototype.toString = function() {
  return cljs.core.pr_str.cljs$lang$arity$1 ? cljs.core.pr_str.cljs$lang$arity$1(this) : cljs.core.pr_str.call(null, this)
};
cljs.core.PersistentTreeSet.prototype.cljs$core$ISorted$_sorted_seq$arity$2 = function(a, b) {
  return cljs.core.map.cljs$lang$arity$2(cljs.core.key, cljs.core._sorted_seq(this.tree_map, b))
};
cljs.core.PersistentTreeSet.prototype.cljs$core$ISorted$_sorted_seq_from$arity$3 = function(a, b, c) {
  return cljs.core.map.cljs$lang$arity$2(cljs.core.key, cljs.core._sorted_seq_from(this.tree_map, b, c))
};
cljs.core.PersistentTreeSet.prototype.cljs$core$ISorted$_entry_key$arity$2 = function(a, b) {
  return b
};
cljs.core.PersistentTreeSet.prototype.cljs$core$ISorted$_comparator$arity$1 = function() {
  return cljs.core._comparator(this.tree_map)
};
cljs.core.PersistentTreeSet.prototype.cljs$core$ISeqable$_seq$arity$1 = function() {
  return cljs.core.keys(this.tree_map)
};
cljs.core.PersistentTreeSet.prototype.cljs$core$ISet$_disjoin$arity$2 = function(a, b) {
  return new cljs.core.PersistentTreeSet(this.meta, cljs.core.dissoc.cljs$lang$arity$2(this.tree_map, b), null)
};
cljs.core.PersistentTreeSet.prototype.cljs$core$ICounted$_count$arity$1 = function() {
  return cljs.core.count(this.tree_map)
};
cljs.core.PersistentTreeSet.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  var c = cljs.core.set_QMARK_(b);
  return c ? (c = cljs.core.count(a) === cljs.core.count(b)) ? cljs.core.every_QMARK_(function(b) {
    return cljs.core.contains_QMARK_(a, b)
  }, b) : c : c
};
cljs.core.PersistentTreeSet.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.PersistentTreeSet(b, this.tree_map, this.__hash)
};
cljs.core.PersistentTreeSet.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
  return this.meta
};
cljs.core.PersistentTreeSet.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function() {
  return cljs.core.with_meta(cljs.core.PersistentTreeSet.EMPTY, this.meta)
};
cljs.core.PersistentTreeSet.EMPTY = new cljs.core.PersistentTreeSet(null, cljs.core.sorted_map(), 0);
cljs.core.hash_set = function() {
  var a = null, b = function() {
    return cljs.core.PersistentHashSet.EMPTY
  }, c = function(a) {
    for(var a = cljs.core.seq(a), b = cljs.core.transient$(cljs.core.PersistentHashSet.EMPTY);;) {
      if(cljs.core.seq(a)) {
        var c = cljs.core.next(a), b = cljs.core.conj_BANG_(b, cljs.core.first(a)), a = c
      }else {
        return cljs.core.persistent_BANG_(b)
      }
    }
  }, d = function(a) {
    var b = null;
    goog.isDef(a) && (b = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return c.call(this, b)
  };
  d.cljs$lang$maxFixedArity = 0;
  d.cljs$lang$applyTo = function(a) {
    a = cljs.core.seq(a);
    return c(a)
  };
  d.cljs$lang$arity$variadic = c;
  a = function(a) {
    switch(arguments.length) {
      case 0:
        return b.call(this);
      default:
        return d.cljs$lang$arity$variadic(cljs.core.array_seq(arguments, 0))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 0;
  a.cljs$lang$applyTo = d.cljs$lang$applyTo;
  a.cljs$lang$arity$0 = b;
  a.cljs$lang$arity$variadic = d.cljs$lang$arity$variadic;
  return a
}();
cljs.core.set = function(a) {
  return cljs.core.apply.cljs$lang$arity$2(cljs.core.hash_set, a)
};
cljs.core.sorted_set = function() {
  var a = function(a) {
    return cljs.core.reduce.cljs$lang$arity$3(cljs.core._conj, cljs.core.PersistentTreeSet.EMPTY, a)
  }, b = function(b) {
    var d = null;
    goog.isDef(b) && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a(b)
  };
  b.cljs$lang$arity$variadic = a;
  return b
}();
cljs.core.sorted_set_by = function() {
  var a = function(a, b) {
    return cljs.core.reduce.cljs$lang$arity$3(cljs.core._conj, new cljs.core.PersistentTreeSet(null, cljs.core.sorted_map_by(a), 0), b)
  }, b = function(b, d) {
    var e = null;
    goog.isDef(d) && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return a.call(this, b, e)
  };
  b.cljs$lang$maxFixedArity = 1;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), b = cljs.core.rest(b);
    return a(d, b)
  };
  b.cljs$lang$arity$variadic = a;
  return b
}();
cljs.core.replace = function(a, b) {
  if(cljs.core.vector_QMARK_(b)) {
    var c = cljs.core.count(b);
    return cljs.core.reduce.cljs$lang$arity$3(function(b, c) {
      var f = cljs.core.find(a, cljs.core.nth.cljs$lang$arity$2(b, c));
      return cljs.core.truth_(f) ? cljs.core.assoc.cljs$lang$arity$3(b, c, cljs.core.second(f)) : b
    }, b, cljs.core.take(c, cljs.core.iterate(cljs.core.inc, 0)))
  }
  return cljs.core.map.cljs$lang$arity$2(function(b) {
    var c = cljs.core.find(a, b);
    return cljs.core.truth_(c) ? cljs.core.second(c) : b
  }, b)
};
cljs.core.distinct = function(a) {
  return function c(a, e) {
    return new cljs.core.LazySeq(null, !1, function() {
      return function(a, d) {
        for(;;) {
          var e = a, i = cljs.core.nth.cljs$lang$arity$3(e, 0, null);
          if(e = cljs.core.seq(e)) {
            if(cljs.core.contains_QMARK_(d, i)) {
              i = cljs.core.rest(e), e = d, a = i, d = e
            }else {
              return cljs.core.cons(i, c(cljs.core.rest(e), cljs.core.conj.cljs$lang$arity$2(d, i)))
            }
          }else {
            return null
          }
        }
      }.call(null, a, e)
    }, null)
  }(a, cljs.core.PersistentHashSet.EMPTY)
};
cljs.core.butlast = function(a) {
  for(var b = cljs.core.PersistentVector.EMPTY;;) {
    if(cljs.core.next(a)) {
      b = cljs.core.conj.cljs$lang$arity$2(b, cljs.core.first(a)), a = cljs.core.next(a)
    }else {
      return cljs.core.seq(b)
    }
  }
};
cljs.core.name = function(a) {
  if(cljs.core.string_QMARK_(a)) {
    return a
  }
  if(cljs.core.truth_(function() {
    var b = cljs.core.keyword_QMARK_(a);
    return b ? b : cljs.core.symbol_QMARK_(a)
  }())) {
    var b = a.lastIndexOf("/", a.length - 2);
    return 0 > b ? cljs.core.subs.cljs$lang$arity$2(a, 2) : cljs.core.subs.cljs$lang$arity$2(a, b + 1)
  }
  throw Error([cljs.core.str("Doesn't support name: "), cljs.core.str(a)].join(""));
};
cljs.core.namespace = function(a) {
  if(cljs.core.truth_(function() {
    var b = cljs.core.keyword_QMARK_(a);
    return b ? b : cljs.core.symbol_QMARK_(a)
  }())) {
    var b = a.lastIndexOf("/", a.length - 2);
    return-1 < b ? cljs.core.subs.cljs$lang$arity$3(a, 2, b) : null
  }
  throw Error([cljs.core.str("Doesn't support namespace: "), cljs.core.str(a)].join(""));
};
cljs.core.zipmap = function(a, b) {
  for(var c = cljs.core.ObjMap.EMPTY, d = cljs.core.seq(a), e = cljs.core.seq(b);;) {
    if(cljs.core.truth_(function() {
      var a = d;
      return a ? e : a
    }())) {
      var c = cljs.core.assoc.cljs$lang$arity$3(c, cljs.core.first(d), cljs.core.first(e)), f = cljs.core.next(d), g = cljs.core.next(e), d = f, e = g
    }else {
      return c
    }
  }
};
cljs.core.max_key = function() {
  var a = null, b = function(a, b, c) {
    return(a.cljs$lang$arity$1 ? a.cljs$lang$arity$1(b) : a.call(null, b)) > (a.cljs$lang$arity$1 ? a.cljs$lang$arity$1(c) : a.call(null, c)) ? b : c
  }, c = function(b, c, d, h) {
    return cljs.core.reduce.cljs$lang$arity$3(function(c, d) {
      return a.cljs$lang$arity$3(b, c, d)
    }, a.cljs$lang$arity$3(b, c, d), h)
  }, d = function(a, b, d, h) {
    var i = null;
    goog.isDef(h) && (i = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
    return c.call(this, a, b, d, i)
  };
  d.cljs$lang$maxFixedArity = 3;
  d.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), d = cljs.core.first(cljs.core.next(a)), h = cljs.core.first(cljs.core.next(cljs.core.next(a))), a = cljs.core.rest(cljs.core.next(cljs.core.next(a)));
    return c(b, d, h, a)
  };
  d.cljs$lang$arity$variadic = c;
  a = function(a, c, g, h) {
    switch(arguments.length) {
      case 2:
        return c;
      case 3:
        return b.call(this, a, c, g);
      default:
        return d.cljs$lang$arity$variadic(a, c, g, cljs.core.array_seq(arguments, 3))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 3;
  a.cljs$lang$applyTo = d.cljs$lang$applyTo;
  a.cljs$lang$arity$2 = function(a, b) {
    return b
  };
  a.cljs$lang$arity$3 = b;
  a.cljs$lang$arity$variadic = d.cljs$lang$arity$variadic;
  return a
}();
cljs.core.min_key = function() {
  var a = null, b = function(a, b, c) {
    return(a.cljs$lang$arity$1 ? a.cljs$lang$arity$1(b) : a.call(null, b)) < (a.cljs$lang$arity$1 ? a.cljs$lang$arity$1(c) : a.call(null, c)) ? b : c
  }, c = function(b, c, d, h) {
    return cljs.core.reduce.cljs$lang$arity$3(function(c, d) {
      return a.cljs$lang$arity$3(b, c, d)
    }, a.cljs$lang$arity$3(b, c, d), h)
  }, d = function(a, b, d, h) {
    var i = null;
    goog.isDef(h) && (i = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
    return c.call(this, a, b, d, i)
  };
  d.cljs$lang$maxFixedArity = 3;
  d.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), d = cljs.core.first(cljs.core.next(a)), h = cljs.core.first(cljs.core.next(cljs.core.next(a))), a = cljs.core.rest(cljs.core.next(cljs.core.next(a)));
    return c(b, d, h, a)
  };
  d.cljs$lang$arity$variadic = c;
  a = function(a, c, g, h) {
    switch(arguments.length) {
      case 2:
        return c;
      case 3:
        return b.call(this, a, c, g);
      default:
        return d.cljs$lang$arity$variadic(a, c, g, cljs.core.array_seq(arguments, 3))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 3;
  a.cljs$lang$applyTo = d.cljs$lang$applyTo;
  a.cljs$lang$arity$2 = function(a, b) {
    return b
  };
  a.cljs$lang$arity$3 = b;
  a.cljs$lang$arity$variadic = d.cljs$lang$arity$variadic;
  return a
}();
cljs.core.partition_all = function() {
  var a = null, b = function(b, c) {
    return a.cljs$lang$arity$3(b, b, c)
  }, c = function(b, c, f) {
    return new cljs.core.LazySeq(null, !1, function() {
      var g = cljs.core.seq(f);
      return g ? cljs.core.cons(cljs.core.take(b, g), a.cljs$lang$arity$3(b, c, cljs.core.drop(c, g))) : null
    }, null)
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$2 = b;
  a.cljs$lang$arity$3 = c;
  return a
}();
cljs.core.take_while = function take_while(b, c) {
  return new cljs.core.LazySeq(null, !1, function() {
    var d = cljs.core.seq(c);
    return d ? cljs.core.truth_(b.cljs$lang$arity$1 ? b.cljs$lang$arity$1(cljs.core.first(d)) : b.call(null, cljs.core.first(d))) ? cljs.core.cons(cljs.core.first(d), take_while(b, cljs.core.rest(d))) : null : null
  }, null)
};
cljs.core.mk_bound_fn = function(a, b, c) {
  return function(d) {
    var e = cljs.core._comparator(a);
    return b.cljs$lang$arity$2 ? b.cljs$lang$arity$2(e.cljs$lang$arity$2 ? e.cljs$lang$arity$2(cljs.core._entry_key(a, d), c) : e.call(null, cljs.core._entry_key(a, d), c), 0) : b.call(null, e.cljs$lang$arity$2 ? e.cljs$lang$arity$2(cljs.core._entry_key(a, d), c) : e.call(null, cljs.core._entry_key(a, d), c), 0)
  }
};
cljs.core.subseq = function() {
  var a = null, b = function(a, b, c) {
    var g = cljs.core.mk_bound_fn(a, b, c);
    return cljs.core.truth_(cljs.core.PersistentHashSet.fromArray([cljs.core._GT_, cljs.core._GT__EQ_]).call(null, b)) ? (a = cljs.core._sorted_seq_from(a, c, !0), cljs.core.truth_(a) ? (b = cljs.core.nth.cljs$lang$arity$3(a, 0, null), cljs.core.truth_(g.cljs$lang$arity$1 ? g.cljs$lang$arity$1(b) : g.call(null, b)) ? a : cljs.core.next(a)) : null) : cljs.core.take_while(g, cljs.core._sorted_seq(a, !0))
  }, c = function(a, b, c, g, h) {
    var i = cljs.core._sorted_seq_from(a, c, !0);
    if(cljs.core.truth_(i)) {
      var j = cljs.core.nth.cljs$lang$arity$3(i, 0, null);
      return cljs.core.take_while(cljs.core.mk_bound_fn(a, g, h), cljs.core.truth_(cljs.core.mk_bound_fn(a, b, c).call(null, j)) ? i : cljs.core.next(i))
    }
    return null
  }, a = function(a, e, f, g, h) {
    switch(arguments.length) {
      case 3:
        return b.call(this, a, e, f);
      case 5:
        return c.call(this, a, e, f, g, h)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$3 = b;
  a.cljs$lang$arity$5 = c;
  return a
}();
cljs.core.rsubseq = function() {
  var a = null, b = function(a, b, c) {
    var g = cljs.core.mk_bound_fn(a, b, c);
    return cljs.core.truth_(cljs.core.PersistentHashSet.fromArray([cljs.core._LT_, cljs.core._LT__EQ_]).call(null, b)) ? (a = cljs.core._sorted_seq_from(a, c, !1), cljs.core.truth_(a) ? (b = cljs.core.nth.cljs$lang$arity$3(a, 0, null), cljs.core.truth_(g.cljs$lang$arity$1 ? g.cljs$lang$arity$1(b) : g.call(null, b)) ? a : cljs.core.next(a)) : null) : cljs.core.take_while(g, cljs.core._sorted_seq(a, !1))
  }, c = function(a, b, c, g, h) {
    var i = cljs.core._sorted_seq_from(a, h, !1);
    if(cljs.core.truth_(i)) {
      var j = cljs.core.nth.cljs$lang$arity$3(i, 0, null);
      return cljs.core.take_while(cljs.core.mk_bound_fn(a, b, c), cljs.core.truth_(cljs.core.mk_bound_fn(a, g, h).call(null, j)) ? i : cljs.core.next(i))
    }
    return null
  }, a = function(a, e, f, g, h) {
    switch(arguments.length) {
      case 3:
        return b.call(this, a, e, f);
      case 5:
        return c.call(this, a, e, f, g, h)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$3 = b;
  a.cljs$lang$arity$5 = c;
  return a
}();
cljs.core.Range = function(a, b, c, d, e) {
  this.meta = a;
  this.start = b;
  this.end = c;
  this.step = d;
  this.__hash = e;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 32375006
};
cljs.core.Range.cljs$lang$type = !0;
cljs.core.Range.cljs$lang$ctorPrSeq = function() {
  return cljs.core.list.cljs$lang$arity$1("cljs.core/Range")
};
cljs.core.Range.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/Range")
};
cljs.core.Range.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  var b = this.__hash;
  return null != b ? b : this.__hash = a = cljs.core.hash_coll(a)
};
cljs.core.Range.prototype.cljs$core$INext$_next$arity$1 = function() {
  return 0 < this.step ? this.start + this.step < this.end ? new cljs.core.Range(this.meta, this.start + this.step, this.end, this.step, null) : null : this.start + this.step > this.end ? new cljs.core.Range(this.meta, this.start + this.step, this.end, this.step, null) : null
};
cljs.core.Range.prototype.cljs$core$ICollection$_conj$arity$2 = function(a, b) {
  return cljs.core.cons(b, a)
};
cljs.core.Range.prototype.toString = function() {
  return cljs.core.pr_str.cljs$lang$arity$1 ? cljs.core.pr_str.cljs$lang$arity$1(this) : cljs.core.pr_str.call(null, this)
};
cljs.core.Range.prototype.cljs$core$IReduce$_reduce$arity$2 = function(a, b) {
  return cljs.core.ci_reduce.cljs$lang$arity$2(a, b)
};
cljs.core.Range.prototype.cljs$core$IReduce$_reduce$arity$3 = function(a, b, c) {
  return cljs.core.ci_reduce.cljs$lang$arity$3(a, b, c)
};
cljs.core.Range.prototype.cljs$core$ISeqable$_seq$arity$1 = function(a) {
  return 0 < this.step ? this.start < this.end ? a : null : this.start > this.end ? a : null
};
cljs.core.Range.prototype.cljs$core$ICounted$_count$arity$1 = function(a) {
  return cljs.core.not(a.cljs$core$ISeqable$_seq$arity$1(a)) ? 0 : Math.ceil((this.end - this.start) / this.step)
};
cljs.core.Range.prototype.cljs$core$ISeq$_first$arity$1 = function() {
  return this.start
};
cljs.core.Range.prototype.cljs$core$ISeq$_rest$arity$1 = function(a) {
  return null != a.cljs$core$ISeqable$_seq$arity$1(a) ? new cljs.core.Range(this.meta, this.start + this.step, this.end, this.step, null) : cljs.core.List.EMPTY
};
cljs.core.Range.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return cljs.core.equiv_sequential(a, b)
};
cljs.core.Range.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = function(a, b) {
  return new cljs.core.Range(b, this.start, this.end, this.step, this.__hash)
};
cljs.core.Range.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
  return this.meta
};
cljs.core.Range.prototype.cljs$core$IIndexed$_nth$arity$2 = function(a, b) {
  var c = this;
  if(b < a.cljs$core$ICounted$_count$arity$1(a)) {
    return c.start + b * c.step
  }
  if(cljs.core.truth_(function() {
    var a = c.start > c.end;
    return a ? 0 === c.step : a
  }())) {
    return c.start
  }
  throw Error("Index out of bounds");
};
cljs.core.Range.prototype.cljs$core$IIndexed$_nth$arity$3 = function(a, b, c) {
  var d = this;
  return b < a.cljs$core$ICounted$_count$arity$1(a) ? d.start + b * d.step : cljs.core.truth_(function() {
    var a = d.start > d.end;
    return a ? 0 === d.step : a
  }()) ? d.start : c
};
cljs.core.Range.prototype.cljs$core$IEmptyableCollection$_empty$arity$1 = function() {
  return cljs.core.with_meta(cljs.core.List.EMPTY, this.meta)
};
cljs.core.range = function() {
  var a = null, b = function() {
    return a.cljs$lang$arity$3(0, Number.MAX_VALUE, 1)
  }, c = function(b) {
    return a.cljs$lang$arity$3(0, b, 1)
  }, d = function(b, c) {
    return a.cljs$lang$arity$3(b, c, 1)
  }, e = function(a, b, c) {
    return new cljs.core.Range(null, a, b, c, null)
  }, a = function(a, g, h) {
    switch(arguments.length) {
      case 0:
        return b.call(this);
      case 1:
        return c.call(this, a);
      case 2:
        return d.call(this, a, g);
      case 3:
        return e.call(this, a, g, h)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$0 = b;
  a.cljs$lang$arity$1 = c;
  a.cljs$lang$arity$2 = d;
  a.cljs$lang$arity$3 = e;
  return a
}();
cljs.core.take_nth = function take_nth(b, c) {
  return new cljs.core.LazySeq(null, !1, function() {
    var d = cljs.core.seq(c);
    return d ? cljs.core.cons(cljs.core.first(d), take_nth(b, cljs.core.drop(b, d))) : null
  }, null)
};
cljs.core.split_with = function(a, b) {
  return cljs.core.PersistentVector.fromArray([cljs.core.take_while(a, b), cljs.core.drop_while(a, b)], !0)
};
cljs.core.partition_by = function partition_by(b, c) {
  return new cljs.core.LazySeq(null, !1, function() {
    var d = cljs.core.seq(c);
    if(d) {
      var e = cljs.core.first(d), f = b.cljs$lang$arity$1 ? b.cljs$lang$arity$1(e) : b.call(null, e), e = cljs.core.cons(e, cljs.core.take_while(function(c, d) {
        return function(c) {
          return cljs.core._EQ_.cljs$lang$arity$2(d, b.cljs$lang$arity$1 ? b.cljs$lang$arity$1(c) : b.call(null, c))
        }
      }(e, f), cljs.core.next(d)));
      return cljs.core.cons(e, partition_by(b, cljs.core.seq(cljs.core.drop(cljs.core.count(e), d))))
    }
    return null
  }, null)
};
cljs.core.frequencies = function(a) {
  return cljs.core.persistent_BANG_(cljs.core.reduce.cljs$lang$arity$3(function(a, c) {
    return cljs.core.assoc_BANG_(a, c, cljs.core._lookup.cljs$lang$arity$3(a, c, 0) + 1)
  }, cljs.core.transient$(cljs.core.ObjMap.EMPTY), a))
};
cljs.core.reductions = function() {
  var a = null, b = function(b, c) {
    return new cljs.core.LazySeq(null, !1, function() {
      var f = cljs.core.seq(c);
      return f ? a.cljs$lang$arity$3(b, cljs.core.first(f), cljs.core.rest(f)) : cljs.core.list.cljs$lang$arity$1(b.cljs$lang$arity$0 ? b.cljs$lang$arity$0() : b.call(null))
    }, null)
  }, c = function(b, c, f) {
    return cljs.core.cons(c, new cljs.core.LazySeq(null, !1, function() {
      var g = cljs.core.seq(f);
      return g ? a.cljs$lang$arity$3(b, b.cljs$lang$arity$2 ? b.cljs$lang$arity$2(c, cljs.core.first(g)) : b.call(null, c, cljs.core.first(g)), cljs.core.rest(g)) : null
    }, null))
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$2 = b;
  a.cljs$lang$arity$3 = c;
  return a
}();
cljs.core.juxt = function() {
  var a = null, b = function(a) {
    var b = null, c = function(b, c, d, e) {
      return cljs.core.vector.cljs$lang$arity$variadic(cljs.core.array_seq([cljs.core.apply.cljs$lang$arity$5(a, b, c, d, e)], 0))
    }, d = function(a, b, d, e) {
      var f = null;
      goog.isDef(e) && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
      return c.call(this, a, b, d, f)
    };
    d.cljs$lang$maxFixedArity = 3;
    d.cljs$lang$applyTo = function(a) {
      var b = cljs.core.first(a), d = cljs.core.first(cljs.core.next(a)), e = cljs.core.first(cljs.core.next(cljs.core.next(a))), a = cljs.core.rest(cljs.core.next(cljs.core.next(a)));
      return c(b, d, e, a)
    };
    d.cljs$lang$arity$variadic = c;
    b = function(b, c, e, f) {
      switch(arguments.length) {
        case 0:
          return cljs.core.vector.cljs$lang$arity$variadic(cljs.core.array_seq([a.cljs$lang$arity$0 ? a.cljs$lang$arity$0() : a.call(null)], 0));
        case 1:
          return cljs.core.vector.cljs$lang$arity$variadic(cljs.core.array_seq([a.cljs$lang$arity$1 ? a.cljs$lang$arity$1(b) : a.call(null, b)], 0));
        case 2:
          return cljs.core.vector.cljs$lang$arity$variadic(cljs.core.array_seq([a.cljs$lang$arity$2 ? a.cljs$lang$arity$2(b, c) : a.call(null, b, c)], 0));
        case 3:
          return cljs.core.vector.cljs$lang$arity$variadic(cljs.core.array_seq([a.cljs$lang$arity$3 ? a.cljs$lang$arity$3(b, c, e) : a.call(null, b, c, e)], 0));
        default:
          return d.cljs$lang$arity$variadic(b, c, e, cljs.core.array_seq(arguments, 3))
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    b.cljs$lang$maxFixedArity = 3;
    b.cljs$lang$applyTo = d.cljs$lang$applyTo;
    return b
  }, c = function(a, b) {
    var c = null, d = function(c, d, e, f) {
      return cljs.core.vector.cljs$lang$arity$variadic(cljs.core.array_seq([cljs.core.apply.cljs$lang$arity$5(a, c, d, e, f), cljs.core.apply.cljs$lang$arity$5(b, c, d, e, f)], 0))
    }, e = function(a, b, c, e) {
      var f = null;
      goog.isDef(e) && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
      return d.call(this, a, b, c, f)
    };
    e.cljs$lang$maxFixedArity = 3;
    e.cljs$lang$applyTo = function(a) {
      var b = cljs.core.first(a), c = cljs.core.first(cljs.core.next(a)), e = cljs.core.first(cljs.core.next(cljs.core.next(a))), a = cljs.core.rest(cljs.core.next(cljs.core.next(a)));
      return d(b, c, e, a)
    };
    e.cljs$lang$arity$variadic = d;
    c = function(c, d, f, i) {
      switch(arguments.length) {
        case 0:
          return cljs.core.vector.cljs$lang$arity$variadic(cljs.core.array_seq([a.cljs$lang$arity$0 ? a.cljs$lang$arity$0() : a.call(null), b.cljs$lang$arity$0 ? b.cljs$lang$arity$0() : b.call(null)], 0));
        case 1:
          return cljs.core.vector.cljs$lang$arity$variadic(cljs.core.array_seq([a.cljs$lang$arity$1 ? a.cljs$lang$arity$1(c) : a.call(null, c), b.cljs$lang$arity$1 ? b.cljs$lang$arity$1(c) : b.call(null, c)], 0));
        case 2:
          return cljs.core.vector.cljs$lang$arity$variadic(cljs.core.array_seq([a.cljs$lang$arity$2 ? a.cljs$lang$arity$2(c, d) : a.call(null, c, d), b.cljs$lang$arity$2 ? b.cljs$lang$arity$2(c, d) : b.call(null, c, d)], 0));
        case 3:
          return cljs.core.vector.cljs$lang$arity$variadic(cljs.core.array_seq([a.cljs$lang$arity$3 ? a.cljs$lang$arity$3(c, d, f) : a.call(null, c, d, f), b.cljs$lang$arity$3 ? b.cljs$lang$arity$3(c, d, f) : b.call(null, c, d, f)], 0));
        default:
          return e.cljs$lang$arity$variadic(c, d, f, cljs.core.array_seq(arguments, 3))
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    c.cljs$lang$maxFixedArity = 3;
    c.cljs$lang$applyTo = e.cljs$lang$applyTo;
    return c
  }, d = function(a, b, c) {
    var d = null, e = function(d, e, f, j) {
      return cljs.core.vector.cljs$lang$arity$variadic(cljs.core.array_seq([cljs.core.apply.cljs$lang$arity$5(a, d, e, f, j), cljs.core.apply.cljs$lang$arity$5(b, d, e, f, j), cljs.core.apply.cljs$lang$arity$5(c, d, e, f, j)], 0))
    }, f = function(a, b, c, d) {
      var f = null;
      goog.isDef(d) && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
      return e.call(this, a, b, c, f)
    };
    f.cljs$lang$maxFixedArity = 3;
    f.cljs$lang$applyTo = function(a) {
      var b = cljs.core.first(a), c = cljs.core.first(cljs.core.next(a)), d = cljs.core.first(cljs.core.next(cljs.core.next(a))), a = cljs.core.rest(cljs.core.next(cljs.core.next(a)));
      return e(b, c, d, a)
    };
    f.cljs$lang$arity$variadic = e;
    d = function(d, e, j, l) {
      switch(arguments.length) {
        case 0:
          return cljs.core.vector.cljs$lang$arity$variadic(cljs.core.array_seq([a.cljs$lang$arity$0 ? a.cljs$lang$arity$0() : a.call(null), b.cljs$lang$arity$0 ? b.cljs$lang$arity$0() : b.call(null), c.cljs$lang$arity$0 ? c.cljs$lang$arity$0() : c.call(null)], 0));
        case 1:
          return cljs.core.vector.cljs$lang$arity$variadic(cljs.core.array_seq([a.cljs$lang$arity$1 ? a.cljs$lang$arity$1(d) : a.call(null, d), b.cljs$lang$arity$1 ? b.cljs$lang$arity$1(d) : b.call(null, d), c.cljs$lang$arity$1 ? c.cljs$lang$arity$1(d) : c.call(null, d)], 0));
        case 2:
          return cljs.core.vector.cljs$lang$arity$variadic(cljs.core.array_seq([a.cljs$lang$arity$2 ? a.cljs$lang$arity$2(d, e) : a.call(null, d, e), b.cljs$lang$arity$2 ? b.cljs$lang$arity$2(d, e) : b.call(null, d, e), c.cljs$lang$arity$2 ? c.cljs$lang$arity$2(d, e) : c.call(null, d, e)], 0));
        case 3:
          return cljs.core.vector.cljs$lang$arity$variadic(cljs.core.array_seq([a.cljs$lang$arity$3 ? a.cljs$lang$arity$3(d, e, j) : a.call(null, d, e, j), b.cljs$lang$arity$3 ? b.cljs$lang$arity$3(d, e, j) : b.call(null, d, e, j), c.cljs$lang$arity$3 ? c.cljs$lang$arity$3(d, e, j) : c.call(null, d, e, j)], 0));
        default:
          return f.cljs$lang$arity$variadic(d, e, j, cljs.core.array_seq(arguments, 3))
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    d.cljs$lang$maxFixedArity = 3;
    d.cljs$lang$applyTo = f.cljs$lang$applyTo;
    return d
  }, e = function(a, b, c, d) {
    var e = cljs.core.list_STAR_.cljs$lang$arity$4(a, b, c, d), a = null, f = function(a, b, c, d) {
      return cljs.core.reduce.cljs$lang$arity$3(function(e, f) {
        return cljs.core.conj.cljs$lang$arity$2(e, cljs.core.apply.cljs$lang$arity$5(f, a, b, c, d))
      }, cljs.core.PersistentVector.EMPTY, e)
    }, k = function(a, b, c, d) {
      var e = null;
      goog.isDef(d) && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
      return f.call(this, a, b, c, e)
    };
    k.cljs$lang$maxFixedArity = 3;
    k.cljs$lang$applyTo = function(a) {
      var b = cljs.core.first(a), c = cljs.core.first(cljs.core.next(a)), d = cljs.core.first(cljs.core.next(cljs.core.next(a))), a = cljs.core.rest(cljs.core.next(cljs.core.next(a)));
      return f(b, c, d, a)
    };
    k.cljs$lang$arity$variadic = f;
    a = function(a, b, c, d) {
      switch(arguments.length) {
        case 0:
          return cljs.core.reduce.cljs$lang$arity$3(function(a, b) {
            return cljs.core.conj.cljs$lang$arity$2(a, b.cljs$lang$arity$0 ? b.cljs$lang$arity$0() : b.call(null))
          }, cljs.core.PersistentVector.EMPTY, e);
        case 1:
          var f = a;
          return cljs.core.reduce.cljs$lang$arity$3(function(a, b) {
            return cljs.core.conj.cljs$lang$arity$2(a, b.cljs$lang$arity$1 ? b.cljs$lang$arity$1(f) : b.call(null, f))
          }, cljs.core.PersistentVector.EMPTY, e);
        case 2:
          var g = a, h = b;
          return cljs.core.reduce.cljs$lang$arity$3(function(a, b) {
            return cljs.core.conj.cljs$lang$arity$2(a, b.cljs$lang$arity$2 ? b.cljs$lang$arity$2(g, h) : b.call(null, g, h))
          }, cljs.core.PersistentVector.EMPTY, e);
        case 3:
          var i = a, j = b, m = c;
          return cljs.core.reduce.cljs$lang$arity$3(function(a, b) {
            return cljs.core.conj.cljs$lang$arity$2(a, b.cljs$lang$arity$3 ? b.cljs$lang$arity$3(i, j, m) : b.call(null, i, j, m))
          }, cljs.core.PersistentVector.EMPTY, e);
        default:
          return k.cljs$lang$arity$variadic(a, b, c, cljs.core.array_seq(arguments, 3))
      }
      throw Error("Invalid arity: " + arguments.length);
    };
    a.cljs$lang$maxFixedArity = 3;
    a.cljs$lang$applyTo = k.cljs$lang$applyTo;
    return a
  }, f = function(a, b, c, d) {
    var f = null;
    goog.isDef(d) && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0));
    return e.call(this, a, b, c, f)
  };
  f.cljs$lang$maxFixedArity = 3;
  f.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), c = cljs.core.first(cljs.core.next(a)), d = cljs.core.first(cljs.core.next(cljs.core.next(a))), a = cljs.core.rest(cljs.core.next(cljs.core.next(a)));
    return e(b, c, d, a)
  };
  f.cljs$lang$arity$variadic = e;
  a = function(a, e, i, j) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e);
      case 3:
        return d.call(this, a, e, i);
      default:
        return f.cljs$lang$arity$variadic(a, e, i, cljs.core.array_seq(arguments, 3))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 3;
  a.cljs$lang$applyTo = f.cljs$lang$applyTo;
  a.cljs$lang$arity$1 = b;
  a.cljs$lang$arity$2 = c;
  a.cljs$lang$arity$3 = d;
  a.cljs$lang$arity$variadic = f.cljs$lang$arity$variadic;
  return a
}();
cljs.core.dorun = function() {
  var a = null, b = function(a) {
    for(;;) {
      if(cljs.core.seq(a)) {
        a = cljs.core.next(a)
      }else {
        return null
      }
    }
  }, c = function(a, b) {
    for(;;) {
      if(cljs.core.truth_(function() {
        var c = cljs.core.seq(b);
        return c ? 0 < a : c
      }())) {
        var c = a - 1, g = cljs.core.next(b), a = c, b = g
      }else {
        return null
      }
    }
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$1 = b;
  a.cljs$lang$arity$2 = c;
  return a
}();
cljs.core.doall = function() {
  var a = null, b = function(a) {
    cljs.core.dorun.cljs$lang$arity$1(a);
    return a
  }, c = function(a, b) {
    cljs.core.dorun.cljs$lang$arity$2(a, b);
    return b
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$1 = b;
  a.cljs$lang$arity$2 = c;
  return a
}();
cljs.core.regexp_QMARK_ = function(a) {
  return a instanceof RegExp
};
cljs.core.re_matches = function(a, b) {
  var c = a.exec(b);
  return cljs.core._EQ_.cljs$lang$arity$2(cljs.core.first(c), b) ? 1 === cljs.core.count(c) ? cljs.core.first(c) : cljs.core.vec(c) : null
};
cljs.core.re_find = function(a, b) {
  var c = a.exec(b);
  return null == c ? null : 1 === cljs.core.count(c) ? cljs.core.first(c) : cljs.core.vec(c)
};
cljs.core.re_seq = function re_seq(b, c) {
  var d = cljs.core.re_find(b, c), e = c.search(b), f = cljs.core.coll_QMARK_(d) ? cljs.core.first(d) : d, g = cljs.core.subs.cljs$lang$arity$2(c, e + cljs.core.count(f));
  return cljs.core.truth_(d) ? new cljs.core.LazySeq(null, !1, function() {
    return cljs.core.cons(d, re_seq(b, g))
  }, null) : null
};
cljs.core.re_pattern = function(a) {
  var b = cljs.core.re_find(/^(?:\(\?([idmsux]*)\))?(.*)/, a);
  cljs.core.nth.cljs$lang$arity$3(b, 0, null);
  a = cljs.core.nth.cljs$lang$arity$3(b, 1, null);
  b = cljs.core.nth.cljs$lang$arity$3(b, 2, null);
  return RegExp(b, a)
};
cljs.core.pr_sequential = function(a, b, c, d, e, f) {
  return cljs.core.concat.cljs$lang$arity$variadic(cljs.core.PersistentVector.fromArray([b], !0), cljs.core.flatten1(cljs.core.interpose(cljs.core.PersistentVector.fromArray([c], !0), cljs.core.map.cljs$lang$arity$2(function(b) {
    return a.cljs$lang$arity$2 ? a.cljs$lang$arity$2(b, e) : a.call(null, b, e)
  }, f))), cljs.core.array_seq([cljs.core.PersistentVector.fromArray([d], !0)], 0))
};
cljs.core.pr_sequential_writer = function(a, b, c, d, e, f, g) {
  cljs.core._write(a, c);
  cljs.core.seq(g) && (b.cljs$lang$arity$3 ? b.cljs$lang$arity$3(cljs.core.first(g), a, f) : b.call(null, cljs.core.first(g), a, f));
  for(c = cljs.core.seq(cljs.core.next(g));;) {
    if(c) {
      g = cljs.core.first(c), cljs.core._write(a, d), b.cljs$lang$arity$3 ? b.cljs$lang$arity$3(g, a, f) : b.call(null, g, a, f), c = cljs.core.next(c)
    }else {
      break
    }
  }
  return cljs.core._write(a, e)
};
cljs.core.write_all = function() {
  var a = function(a, b) {
    for(var e = cljs.core.seq(b);;) {
      if(e) {
        var f = cljs.core.first(e);
        cljs.core._write(a, f);
        e = cljs.core.next(e)
      }else {
        return null
      }
    }
  }, b = function(b, d) {
    var e = null;
    goog.isDef(d) && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return a.call(this, b, e)
  };
  b.cljs$lang$maxFixedArity = 1;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), b = cljs.core.rest(b);
    return a(d, b)
  };
  b.cljs$lang$arity$variadic = a;
  return b
}();
cljs.core.string_print = function(a) {
  cljs.core._STAR_print_fn_STAR_.cljs$lang$arity$1 ? cljs.core._STAR_print_fn_STAR_.cljs$lang$arity$1(a) : cljs.core._STAR_print_fn_STAR_.call(null, a);
  return null
};
cljs.core.flush = function() {
  return null
};
cljs.core.StringBufferWriter = function(a) {
  this.sb = a;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 1073741824
};
cljs.core.StringBufferWriter.cljs$lang$type = !0;
cljs.core.StringBufferWriter.cljs$lang$ctorPrSeq = function() {
  return cljs.core.list.cljs$lang$arity$1("cljs.core/StringBufferWriter")
};
cljs.core.StringBufferWriter.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/StringBufferWriter")
};
cljs.core.StringBufferWriter.prototype.cljs$core$IWriter$_write$arity$2 = function(a, b) {
  return this.sb.append(b)
};
cljs.core.StringBufferWriter.prototype.cljs$core$IWriter$_flush$arity$1 = function() {
  return null
};
cljs.core.pr_seq = function pr_seq(b, c) {
  return null == b ? cljs.core.list.cljs$lang$arity$1("nil") : void 0 === b ? cljs.core.list.cljs$lang$arity$1("#<undefined>") : cljs.core.concat.cljs$lang$arity$2(cljs.core.truth_(function() {
    var d = cljs.core._lookup.cljs$lang$arity$3(c, "\ufdd0:meta", null);
    return cljs.core.truth_(d) ? (d = b ? cljs.core.truth_(function() {
      var c = b.cljs$lang$protocol_mask$partition0$ & 131072;
      return c ? c : b.cljs$core$IMeta$
    }()) ? !0 : b.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.type_satisfies_(cljs.core.IMeta, b) : cljs.core.type_satisfies_(cljs.core.IMeta, b), cljs.core.truth_(d) ? cljs.core.meta(b) : d) : d
  }()) ? cljs.core.concat.cljs$lang$arity$variadic(cljs.core.PersistentVector.fromArray(["^"], !0), pr_seq(cljs.core.meta(b), c), cljs.core.array_seq([cljs.core.PersistentVector.fromArray([" "], !0)], 0)) : null, cljs.core.truth_(function() {
    var c = null != b;
    return c ? b.cljs$lang$type : c
  }()) ? b.cljs$lang$ctorPrSeq(b) : cljs.core.truth_(b ? cljs.core.truth_(function() {
    var c = b.cljs$lang$protocol_mask$partition0$ & 536870912;
    return c ? c : b.cljs$core$IPrintable$
  }()) ? !0 : b.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.type_satisfies_(cljs.core.IPrintable, b) : cljs.core.type_satisfies_(cljs.core.IPrintable, b)) ? cljs.core._pr_seq(b, c) : cljs.core.truth_(cljs.core.regexp_QMARK_(b)) ? cljs.core.list.cljs$lang$arity$3('#"', b.source, '"') : cljs.core.list.cljs$lang$arity$3("#<", "" + cljs.core.str(b), ">"))
};
cljs.core.pr_writer = function pr_writer(b, c, d) {
  if(null == b) {
    return cljs.core._write(c, "nil")
  }
  if(void 0 === b) {
    return cljs.core._write(c, "#<undefined>")
  }
  cljs.core.truth_(function() {
    var c = cljs.core._lookup.cljs$lang$arity$3(d, "\ufdd0:meta", null);
    return cljs.core.truth_(c) ? (c = b ? cljs.core.truth_(function() {
      var c = b.cljs$lang$protocol_mask$partition0$ & 131072;
      return c ? c : b.cljs$core$IMeta$
    }()) ? !0 : b.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.type_satisfies_(cljs.core.IMeta, b) : cljs.core.type_satisfies_(cljs.core.IMeta, b), cljs.core.truth_(c) ? cljs.core.meta(b) : c) : c
  }()) && (cljs.core._write(c, "^"), pr_writer(cljs.core.meta(b), c, d), cljs.core._write(c, " "));
  return cljs.core.truth_(function() {
    var c = null != b;
    return c ? b.cljs$lang$type : c
  }()) ? b.cljs$lang$ctorPrWriter(b, c, d) : cljs.core.truth_(b ? cljs.core.truth_(function() {
    var c = b.cljs$lang$protocol_mask$partition0$ & 2147483648;
    return c ? c : b.cljs$core$IPrintWithWriter$
  }()) ? !0 : b.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.type_satisfies_(cljs.core.IPrintWithWriter, b) : cljs.core.type_satisfies_(cljs.core.IPrintWithWriter, b)) ? cljs.core._pr_writer(b, c, d) : cljs.core.truth_(b ? cljs.core.truth_(function() {
    var c = b.cljs$lang$protocol_mask$partition0$ & 536870912;
    return c ? c : b.cljs$core$IPrintable$
  }()) ? !0 : b.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.type_satisfies_(cljs.core.IPrintable, b) : cljs.core.type_satisfies_(cljs.core.IPrintable, b)) ? cljs.core.apply.cljs$lang$arity$3(cljs.core.write_all, c, cljs.core._pr_seq(b, d)) : cljs.core.truth_(cljs.core.regexp_QMARK_(b)) ? cljs.core.write_all.cljs$lang$arity$variadic(c, cljs.core.array_seq(['#"', b.source, '"'], 0)) : cljs.core.write_all.cljs$lang$arity$variadic(c, cljs.core.array_seq(["#<", "" + cljs.core.str(b), ">"], 0))
};
cljs.core.pr_seq_writer = function(a, b, c) {
  cljs.core.pr_writer(cljs.core.first(a), b, c);
  for(a = cljs.core.seq(cljs.core.next(a));;) {
    if(a) {
      var d = cljs.core.first(a);
      cljs.core._write(b, " ");
      cljs.core.pr_writer(d, b, c);
      a = cljs.core.next(a)
    }else {
      return null
    }
  }
};
cljs.core.pr_sb_with_opts = function(a, b) {
  var c = new goog.string.StringBuffer, d = new cljs.core.StringBufferWriter(c);
  cljs.core.pr_seq_writer(a, d, b);
  cljs.core._flush(d);
  return c
};
cljs.core.pr_str_with_opts = function(a, b) {
  return cljs.core.empty_QMARK_(a) ? "" : "" + cljs.core.str(cljs.core.pr_sb_with_opts(a, b))
};
cljs.core.prn_str_with_opts = function(a, b) {
  if(cljs.core.empty_QMARK_(a)) {
    return"\n"
  }
  var c = cljs.core.pr_sb_with_opts(a, b);
  c.append("\n");
  return"" + cljs.core.str(c)
};
cljs.core.pr_with_opts = function(a, b) {
  return cljs.core.string_print(cljs.core.pr_str_with_opts(a, b))
};
cljs.core.newline = function(a) {
  cljs.core.string_print("\n");
  return cljs.core.truth_(cljs.core._lookup.cljs$lang$arity$3(a, "\ufdd0:flush-on-newline", null)) ? cljs.core.flush() : null
};
cljs.core._STAR_flush_on_newline_STAR_ = !0;
cljs.core._STAR_print_readably_STAR_ = !0;
cljs.core._STAR_print_meta_STAR_ = !1;
cljs.core._STAR_print_dup_STAR_ = !1;
cljs.core.pr_opts = function() {
  return cljs.core.ObjMap.fromObject(["\ufdd0:flush-on-newline", "\ufdd0:readably", "\ufdd0:meta", "\ufdd0:dup"], {"\ufdd0:flush-on-newline":cljs.core._STAR_flush_on_newline_STAR_, "\ufdd0:readably":cljs.core._STAR_print_readably_STAR_, "\ufdd0:meta":cljs.core._STAR_print_meta_STAR_, "\ufdd0:dup":cljs.core._STAR_print_dup_STAR_})
};
cljs.core.pr_str = function() {
  var a = function(a) {
    return cljs.core.pr_str_with_opts(a, cljs.core.pr_opts())
  }, b = function(b) {
    var d = null;
    goog.isDef(b) && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a(b)
  };
  b.cljs$lang$arity$variadic = a;
  return b
}();
cljs.core.prn_str = function() {
  var a = function(a) {
    return cljs.core.prn_str_with_opts(a, cljs.core.pr_opts())
  }, b = function(b) {
    var d = null;
    goog.isDef(b) && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a(b)
  };
  b.cljs$lang$arity$variadic = a;
  return b
}();
cljs.core.pr = function() {
  var a = function(a) {
    return cljs.core.pr_with_opts(a, cljs.core.pr_opts())
  }, b = function(b) {
    var d = null;
    goog.isDef(b) && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a(b)
  };
  b.cljs$lang$arity$variadic = a;
  return b
}();
cljs.core.print = function() {
  var a = function(a) {
    return cljs.core.pr_with_opts(a, cljs.core.assoc.cljs$lang$arity$3(cljs.core.pr_opts(), "\ufdd0:readably", !1))
  }, b = function(b) {
    var d = null;
    goog.isDef(b) && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a(b)
  };
  b.cljs$lang$arity$variadic = a;
  return b
}();
cljs.core.print_str = function() {
  var a = function(a) {
    return cljs.core.pr_str_with_opts(a, cljs.core.assoc.cljs$lang$arity$3(cljs.core.pr_opts(), "\ufdd0:readably", !1))
  }, b = function(b) {
    var d = null;
    goog.isDef(b) && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a(b)
  };
  b.cljs$lang$arity$variadic = a;
  return b
}();
cljs.core.println = function() {
  var a = function(a) {
    cljs.core.pr_with_opts(a, cljs.core.assoc.cljs$lang$arity$3(cljs.core.pr_opts(), "\ufdd0:readably", !1));
    return cljs.core.newline(cljs.core.pr_opts())
  }, b = function(b) {
    var d = null;
    goog.isDef(b) && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a(b)
  };
  b.cljs$lang$arity$variadic = a;
  return b
}();
cljs.core.println_str = function() {
  var a = function(a) {
    return cljs.core.prn_str_with_opts(a, cljs.core.assoc.cljs$lang$arity$3(cljs.core.pr_opts(), "\ufdd0:readably", !1))
  }, b = function(b) {
    var d = null;
    goog.isDef(b) && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a(b)
  };
  b.cljs$lang$arity$variadic = a;
  return b
}();
cljs.core.prn = function() {
  var a = function(a) {
    cljs.core.pr_with_opts(a, cljs.core.pr_opts());
    return cljs.core.newline(cljs.core.pr_opts())
  }, b = function(b) {
    var d = null;
    goog.isDef(b) && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a(b)
  };
  b.cljs$lang$arity$variadic = a;
  return b
}();
cljs.core.printf = function() {
  var a = function(a, b) {
    return cljs.core.print.cljs$lang$arity$variadic(cljs.core.array_seq([cljs.core.apply.cljs$lang$arity$3(cljs.core.format, a, b)], 0))
  }, b = function(b, d) {
    var e = null;
    goog.isDef(d) && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return a.call(this, b, e)
  };
  b.cljs$lang$maxFixedArity = 1;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), b = cljs.core.rest(b);
    return a(d, b)
  };
  b.cljs$lang$arity$variadic = a;
  return b
}();
cljs.core.char_escapes = cljs.core.ObjMap.fromObject('"\\\b\f\n\r\t'.split(""), {'"':'\\"', "\\":"\\\\", "\b":"\\b", "\f":"\\f", "\n":"\\n", "\r":"\\r", "\t":"\\t"});
cljs.core.quote_string = function(a) {
  return[cljs.core.str('"'), cljs.core.str(a.replace(RegExp('[\\\\"\b\f\n\r\t]', "g"), function(a) {
    return cljs.core._lookup.cljs$lang$arity$3(cljs.core.char_escapes, a, null)
  })), cljs.core.str('"')].join("")
};
cljs.core.HashMap.prototype.cljs$core$IPrintable$ = !0;
cljs.core.HashMap.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(a, b) {
  return cljs.core.pr_sequential(function(a) {
    return cljs.core.pr_sequential(cljs.core.pr_seq, "", " ", "", b, a)
  }, "{", ", ", "}", b, a)
};
cljs.core.IPrintable.number = !0;
cljs.core._pr_seq.number = function(a) {
  return cljs.core.list.cljs$lang$arity$1("" + cljs.core.str(a))
};
cljs.core.IndexedSeq.prototype.cljs$core$IPrintable$ = !0;
cljs.core.IndexedSeq.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(a, b) {
  return cljs.core.pr_sequential(cljs.core.pr_seq, "(", " ", ")", b, a)
};
cljs.core.Subvec.prototype.cljs$core$IPrintable$ = !0;
cljs.core.Subvec.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(a, b) {
  return cljs.core.pr_sequential(cljs.core.pr_seq, "[", " ", "]", b, a)
};
cljs.core.ChunkedCons.prototype.cljs$core$IPrintable$ = !0;
cljs.core.ChunkedCons.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(a, b) {
  return cljs.core.pr_sequential(cljs.core.pr_seq, "(", " ", ")", b, a)
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IPrintable$ = !0;
cljs.core.PersistentTreeMap.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(a, b) {
  return cljs.core.pr_sequential(function(a) {
    return cljs.core.pr_sequential(cljs.core.pr_seq, "", " ", "", b, a)
  }, "{", ", ", "}", b, a)
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IPrintable$ = !0;
cljs.core.PersistentArrayMap.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(a, b) {
  return cljs.core.pr_sequential(function(a) {
    return cljs.core.pr_sequential(cljs.core.pr_seq, "", " ", "", b, a)
  }, "{", ", ", "}", b, a)
};
cljs.core.PersistentQueue.prototype.cljs$core$IPrintable$ = !0;
cljs.core.PersistentQueue.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(a, b) {
  return cljs.core.pr_sequential(cljs.core.pr_seq, "#queue [", " ", "]", b, cljs.core.seq(a))
};
cljs.core.LazySeq.prototype.cljs$core$IPrintable$ = !0;
cljs.core.LazySeq.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(a, b) {
  return cljs.core.pr_sequential(cljs.core.pr_seq, "(", " ", ")", b, a)
};
cljs.core.RSeq.prototype.cljs$core$IPrintable$ = !0;
cljs.core.RSeq.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(a, b) {
  return cljs.core.pr_sequential(cljs.core.pr_seq, "(", " ", ")", b, a)
};
cljs.core.PersistentTreeSet.prototype.cljs$core$IPrintable$ = !0;
cljs.core.PersistentTreeSet.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(a, b) {
  return cljs.core.pr_sequential(cljs.core.pr_seq, "#{", " ", "}", b, a)
};
cljs.core.IPrintable["boolean"] = !0;
cljs.core._pr_seq["boolean"] = function(a) {
  return cljs.core.list.cljs$lang$arity$1("" + cljs.core.str(a))
};
cljs.core.IPrintable.string = !0;
cljs.core._pr_seq.string = function(a, b) {
  return cljs.core.keyword_QMARK_(a) ? cljs.core.list.cljs$lang$arity$1([cljs.core.str(":"), cljs.core.str(function() {
    var b = cljs.core.namespace(a);
    return cljs.core.truth_(b) ? [cljs.core.str(b), cljs.core.str("/")].join("") : null
  }()), cljs.core.str(cljs.core.name(a))].join("")) : cljs.core.symbol_QMARK_(a) ? cljs.core.list.cljs$lang$arity$1([cljs.core.str(function() {
    var b = cljs.core.namespace(a);
    return cljs.core.truth_(b) ? [cljs.core.str(b), cljs.core.str("/")].join("") : null
  }()), cljs.core.str(cljs.core.name(a))].join("")) : cljs.core.list.cljs$lang$arity$1(cljs.core.truth_((new cljs.core.Keyword("\ufdd0:readably")).call(null, b)) ? cljs.core.quote_string(a) : a)
};
cljs.core.NodeSeq.prototype.cljs$core$IPrintable$ = !0;
cljs.core.NodeSeq.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(a, b) {
  return cljs.core.pr_sequential(cljs.core.pr_seq, "(", " ", ")", b, a)
};
cljs.core.RedNode.prototype.cljs$core$IPrintable$ = !0;
cljs.core.RedNode.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(a, b) {
  return cljs.core.pr_sequential(cljs.core.pr_seq, "[", " ", "]", b, a)
};
cljs.core.ChunkedSeq.prototype.cljs$core$IPrintable$ = !0;
cljs.core.ChunkedSeq.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(a, b) {
  return cljs.core.pr_sequential(cljs.core.pr_seq, "(", " ", ")", b, a)
};
cljs.core.PersistentHashMap.prototype.cljs$core$IPrintable$ = !0;
cljs.core.PersistentHashMap.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(a, b) {
  return cljs.core.pr_sequential(function(a) {
    return cljs.core.pr_sequential(cljs.core.pr_seq, "", " ", "", b, a)
  }, "{", ", ", "}", b, a)
};
cljs.core.Vector.prototype.cljs$core$IPrintable$ = !0;
cljs.core.Vector.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(a, b) {
  return cljs.core.pr_sequential(cljs.core.pr_seq, "[", " ", "]", b, a)
};
cljs.core.PersistentHashSet.prototype.cljs$core$IPrintable$ = !0;
cljs.core.PersistentHashSet.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(a, b) {
  return cljs.core.pr_sequential(cljs.core.pr_seq, "#{", " ", "}", b, a)
};
cljs.core.PersistentVector.prototype.cljs$core$IPrintable$ = !0;
cljs.core.PersistentVector.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(a, b) {
  return cljs.core.pr_sequential(cljs.core.pr_seq, "[", " ", "]", b, a)
};
cljs.core.List.prototype.cljs$core$IPrintable$ = !0;
cljs.core.List.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(a, b) {
  return cljs.core.pr_sequential(cljs.core.pr_seq, "(", " ", ")", b, a)
};
cljs.core.IPrintable.array = !0;
cljs.core._pr_seq.array = function(a, b) {
  return cljs.core.pr_sequential(cljs.core.pr_seq, "#<Array [", ", ", "]>", b, a)
};
cljs.core.IPrintable["function"] = !0;
cljs.core._pr_seq["function"] = function(a) {
  return cljs.core.list.cljs$lang$arity$3("#<", "" + cljs.core.str(a), ">")
};
cljs.core.EmptyList.prototype.cljs$core$IPrintable$ = !0;
cljs.core.EmptyList.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function() {
  return cljs.core.list.cljs$lang$arity$1("()")
};
cljs.core.BlackNode.prototype.cljs$core$IPrintable$ = !0;
cljs.core.BlackNode.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(a, b) {
  return cljs.core.pr_sequential(cljs.core.pr_seq, "[", " ", "]", b, a)
};
Date.prototype.cljs$core$IPrintable$ = !0;
Date.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(a) {
  var b = function(a, b) {
    for(var e = "" + cljs.core.str(a);;) {
      if(cljs.core.count(e) < b) {
        e = [cljs.core.str("0"), cljs.core.str(e)].join("")
      }else {
        return e
      }
    }
  };
  return cljs.core.list.cljs$lang$arity$1([cljs.core.str('#inst "'), cljs.core.str(a.getUTCFullYear()), cljs.core.str("-"), cljs.core.str(b(a.getUTCMonth() + 1, 2)), cljs.core.str("-"), cljs.core.str(b(a.getUTCDate(), 2)), cljs.core.str("T"), cljs.core.str(b(a.getUTCHours(), 2)), cljs.core.str(":"), cljs.core.str(b(a.getUTCMinutes(), 2)), cljs.core.str(":"), cljs.core.str(b(a.getUTCSeconds(), 2)), cljs.core.str("."), cljs.core.str(b(a.getUTCMilliseconds(), 3)), cljs.core.str("-"), cljs.core.str('00:00"')].join(""))
};
cljs.core.Cons.prototype.cljs$core$IPrintable$ = !0;
cljs.core.Cons.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(a, b) {
  return cljs.core.pr_sequential(cljs.core.pr_seq, "(", " ", ")", b, a)
};
cljs.core.Range.prototype.cljs$core$IPrintable$ = !0;
cljs.core.Range.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(a, b) {
  return cljs.core.pr_sequential(cljs.core.pr_seq, "(", " ", ")", b, a)
};
cljs.core.ArrayNodeSeq.prototype.cljs$core$IPrintable$ = !0;
cljs.core.ArrayNodeSeq.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(a, b) {
  return cljs.core.pr_sequential(cljs.core.pr_seq, "(", " ", ")", b, a)
};
cljs.core.ObjMap.prototype.cljs$core$IPrintable$ = !0;
cljs.core.ObjMap.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(a, b) {
  return cljs.core.pr_sequential(function(a) {
    return cljs.core.pr_sequential(cljs.core.pr_seq, "", " ", "", b, a)
  }, "{", ", ", "}", b, a)
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$IPrintable$ = !0;
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(a, b) {
  return cljs.core.pr_sequential(cljs.core.pr_seq, "(", " ", ")", b, a)
};
cljs.core.HashMap.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.HashMap.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer(b, function(a) {
    return cljs.core.pr_sequential_writer(b, cljs.core.pr_writer, "", " ", "", c, a)
  }, "{", ", ", "}", c, a)
};
cljs.core.IPrintWithWriter.number = !0;
cljs.core._pr_writer.number = function(a, b) {
  1 / 0;
  return cljs.core._write(b, "" + cljs.core.str(a))
};
cljs.core.IndexedSeq.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.IndexedSeq.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer(b, cljs.core.pr_writer, "(", " ", ")", c, a)
};
cljs.core.Subvec.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.Subvec.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer(b, cljs.core.pr_writer, "[", " ", "]", c, a)
};
cljs.core.ChunkedCons.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.ChunkedCons.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer(b, cljs.core.pr_writer, "(", " ", ")", c, a)
};
cljs.core.PersistentTreeMap.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.PersistentTreeMap.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer(b, function(a) {
    return cljs.core.pr_sequential_writer(b, cljs.core.pr_writer, "", " ", "", c, a)
  }, "{", ", ", "}", c, a)
};
cljs.core.PersistentArrayMap.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.PersistentArrayMap.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer(b, function(a) {
    return cljs.core.pr_sequential_writer(b, cljs.core.pr_writer, "", " ", "", c, a)
  }, "{", ", ", "}", c, a)
};
cljs.core.PersistentQueue.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.PersistentQueue.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer(b, cljs.core.pr_writer, "#queue [", " ", "]", c, cljs.core.seq(a))
};
cljs.core.LazySeq.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.LazySeq.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer(b, cljs.core.pr_writer, "(", " ", ")", c, a)
};
cljs.core.RSeq.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.RSeq.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer(b, cljs.core.pr_writer, "(", " ", ")", c, a)
};
cljs.core.PersistentTreeSet.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.PersistentTreeSet.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer(b, cljs.core.pr_writer, "#{", " ", "}", c, a)
};
cljs.core.IPrintWithWriter["boolean"] = !0;
cljs.core._pr_writer["boolean"] = function(a, b) {
  return cljs.core._write(b, "" + cljs.core.str(a))
};
cljs.core.IPrintWithWriter.string = !0;
cljs.core._pr_writer.string = function(a, b, c) {
  return cljs.core.keyword_QMARK_(a) ? (cljs.core._write(b, ":"), c = cljs.core.namespace(a), cljs.core.truth_(c) && cljs.core.write_all.cljs$lang$arity$variadic(b, cljs.core.array_seq(["" + cljs.core.str(c), "/"], 0)), cljs.core._write(b, cljs.core.name(a))) : cljs.core.symbol_QMARK_(a) ? (c = cljs.core.namespace(a), cljs.core.truth_(c) && cljs.core.write_all.cljs$lang$arity$variadic(b, cljs.core.array_seq(["" + cljs.core.str(c), "/"], 0)), cljs.core._write(b, cljs.core.name(a))) : cljs.core.truth_((new cljs.core.Keyword("\ufdd0:readably")).call(null, 
  c)) ? cljs.core._write(b, cljs.core.quote_string(a)) : cljs.core._write(b, a)
};
cljs.core.NodeSeq.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.NodeSeq.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer(b, cljs.core.pr_writer, "(", " ", ")", c, a)
};
cljs.core.RedNode.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.RedNode.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer(b, cljs.core.pr_writer, "[", " ", "]", c, a)
};
cljs.core.ChunkedSeq.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.ChunkedSeq.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer(b, cljs.core.pr_writer, "(", " ", ")", c, a)
};
cljs.core.PersistentHashMap.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.PersistentHashMap.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer(b, function(a) {
    return cljs.core.pr_sequential_writer(b, cljs.core.pr_writer, "", " ", "", c, a)
  }, "{", ", ", "}", c, a)
};
cljs.core.Vector.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.Vector.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer(b, cljs.core.pr_writer, "[", " ", "]", c, a)
};
cljs.core.PersistentHashSet.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.PersistentHashSet.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer(b, cljs.core.pr_writer, "#{", " ", "}", c, a)
};
cljs.core.PersistentVector.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.PersistentVector.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer(b, cljs.core.pr_writer, "[", " ", "]", c, a)
};
cljs.core.List.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.List.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer(b, cljs.core.pr_writer, "(", " ", ")", c, a)
};
cljs.core.IPrintWithWriter.array = !0;
cljs.core._pr_writer.array = function(a, b, c) {
  return cljs.core.pr_sequential_writer(b, cljs.core.pr_writer, "#<Array [", ", ", "]>", c, a)
};
cljs.core.IPrintWithWriter["function"] = !0;
cljs.core._pr_writer["function"] = function(a, b) {
  return cljs.core.write_all.cljs$lang$arity$variadic(b, cljs.core.array_seq(["#<", "" + cljs.core.str(a), ">"], 0))
};
cljs.core.EmptyList.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.EmptyList.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b) {
  return cljs.core._write(b, "()")
};
cljs.core.BlackNode.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.BlackNode.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer(b, cljs.core.pr_writer, "[", " ", "]", c, a)
};
Date.prototype.cljs$core$IPrintWithWriter$ = !0;
Date.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b) {
  var c = function(a, b) {
    for(var c = "" + cljs.core.str(a);;) {
      if(cljs.core.count(c) < b) {
        c = [cljs.core.str("0"), cljs.core.str(c)].join("")
      }else {
        return c
      }
    }
  };
  return cljs.core.write_all.cljs$lang$arity$variadic(b, cljs.core.array_seq(['#inst "', "" + cljs.core.str(a.getUTCFullYear()), "-", c(a.getUTCMonth() + 1, 2), "-", c(a.getUTCDate(), 2), "T", c(a.getUTCHours(), 2), ":", c(a.getUTCMinutes(), 2), ":", c(a.getUTCSeconds(), 2), ".", c(a.getUTCMilliseconds(), 3), "-", '00:00"'], 0))
};
cljs.core.Cons.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.Cons.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer(b, cljs.core.pr_writer, "(", " ", ")", c, a)
};
cljs.core.Range.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.Range.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer(b, cljs.core.pr_writer, "(", " ", ")", c, a)
};
cljs.core.ArrayNodeSeq.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.ArrayNodeSeq.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer(b, cljs.core.pr_writer, "(", " ", ")", c, a)
};
cljs.core.ObjMap.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.ObjMap.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer(b, function(a) {
    return cljs.core.pr_sequential_writer(b, cljs.core.pr_writer, "", " ", "", c, a)
  }, "{", ", ", "}", c, a)
};
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$IPrintWithWriter$ = !0;
cljs.core.PersistentTreeMapSeq.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  return cljs.core.pr_sequential_writer(b, cljs.core.pr_writer, "(", " ", ")", c, a)
};
cljs.core.PersistentVector.prototype.cljs$core$IComparable$ = !0;
cljs.core.PersistentVector.prototype.cljs$core$IComparable$_compare$arity$2 = function(a, b) {
  return cljs.core.compare_indexed.cljs$lang$arity$2(a, b)
};
cljs.core.Atom = function(a, b, c, d) {
  this.state = a;
  this.meta = b;
  this.validator = c;
  this.watches = d;
  this.cljs$lang$protocol_mask$partition0$ = 2690809856;
  this.cljs$lang$protocol_mask$partition1$ = 2
};
cljs.core.Atom.cljs$lang$type = !0;
cljs.core.Atom.cljs$lang$ctorPrSeq = function() {
  return cljs.core.list.cljs$lang$arity$1("cljs.core/Atom")
};
cljs.core.Atom.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/Atom")
};
cljs.core.Atom.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  return goog.getUid(a)
};
cljs.core.Atom.prototype.cljs$core$IWatchable$_notify_watches$arity$3 = function(a, b, c) {
  for(var d = cljs.core.seq(this.watches);;) {
    if(d) {
      var e = cljs.core.first(d), f = cljs.core.nth.cljs$lang$arity$3(e, 0, null), e = cljs.core.nth.cljs$lang$arity$3(e, 1, null);
      e.cljs$lang$arity$4 ? e.cljs$lang$arity$4(f, a, b, c) : e.call(null, f, a, b, c);
      d = cljs.core.next(d)
    }else {
      return null
    }
  }
};
cljs.core.Atom.prototype.cljs$core$IWatchable$_add_watch$arity$3 = function(a, b, c) {
  return a.watches = cljs.core.assoc.cljs$lang$arity$3(this.watches, b, c)
};
cljs.core.Atom.prototype.cljs$core$IWatchable$_remove_watch$arity$2 = function(a, b) {
  return a.watches = cljs.core.dissoc.cljs$lang$arity$2(this.watches, b)
};
cljs.core.Atom.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b, c) {
  cljs.core._write(b, "#<Atom: ");
  cljs.core._pr_writer(this.state, b, c);
  return cljs.core._write(b, ">")
};
cljs.core.Atom.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function(a, b) {
  return cljs.core.concat.cljs$lang$arity$variadic(cljs.core.PersistentVector.fromArray(["#<Atom: "], !0), cljs.core._pr_seq(this.state, b), cljs.core.array_seq([">"], 0))
};
cljs.core.Atom.prototype.cljs$core$IMeta$_meta$arity$1 = function() {
  return this.meta
};
cljs.core.Atom.prototype.cljs$core$IDeref$_deref$arity$1 = function() {
  return this.state
};
cljs.core.Atom.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  return a === b
};
cljs.core.atom = function() {
  var a = null, b = function(a) {
    return new cljs.core.Atom(a, null, null, null)
  }, c = function(a, b) {
    var c = cljs.core.seq_QMARK_(b) ? cljs.core.apply.cljs$lang$arity$2(cljs.core.hash_map, b) : b, d = cljs.core._lookup.cljs$lang$arity$3(c, "\ufdd0:validator", null), c = cljs.core._lookup.cljs$lang$arity$3(c, "\ufdd0:meta", null);
    return new cljs.core.Atom(a, c, d, null)
  }, d = function(a, b) {
    var d = null;
    goog.isDef(b) && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return c.call(this, a, d)
  };
  d.cljs$lang$maxFixedArity = 1;
  d.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), a = cljs.core.rest(a);
    return c(b, a)
  };
  d.cljs$lang$arity$variadic = c;
  a = function(a, c) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      default:
        return d.cljs$lang$arity$variadic(a, cljs.core.array_seq(arguments, 1))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 1;
  a.cljs$lang$applyTo = d.cljs$lang$applyTo;
  a.cljs$lang$arity$1 = b;
  a.cljs$lang$arity$variadic = d.cljs$lang$arity$variadic;
  return a
}();
cljs.core.reset_BANG_ = function(a, b) {
  var c = a.validator;
  if(cljs.core.truth_(c) && !cljs.core.truth_(c.cljs$lang$arity$1 ? c.cljs$lang$arity$1(b) : c.call(null, b))) {
    throw Error([cljs.core.str("Assert failed: "), cljs.core.str("Validator rejected reference state"), cljs.core.str("\n"), cljs.core.str(cljs.core.pr_str.cljs$lang$arity$variadic(cljs.core.array_seq([cljs.core.with_meta(cljs.core.list("\ufdd1'validate", "\ufdd1'new-value"), cljs.core.hash_map("\ufdd0:line", 6752, "\ufdd0:column", 13))], 0)))].join(""));
  }
  c = a.state;
  a.state = b;
  cljs.core._notify_watches(a, c, b);
  return b
};
cljs.core.swap_BANG_ = function() {
  var a = null, b = function(a, b) {
    return cljs.core.reset_BANG_(a, b.cljs$lang$arity$1 ? b.cljs$lang$arity$1(a.state) : b.call(null, a.state))
  }, c = function(a, b, c) {
    return cljs.core.reset_BANG_(a, b.cljs$lang$arity$2 ? b.cljs$lang$arity$2(a.state, c) : b.call(null, a.state, c))
  }, d = function(a, b, c, d) {
    return cljs.core.reset_BANG_(a, b.cljs$lang$arity$3 ? b.cljs$lang$arity$3(a.state, c, d) : b.call(null, a.state, c, d))
  }, e = function(a, b, c, d, e) {
    return cljs.core.reset_BANG_(a, b.cljs$lang$arity$4 ? b.cljs$lang$arity$4(a.state, c, d, e) : b.call(null, a.state, c, d, e))
  }, f = function(a, b, c, d, e, f) {
    return cljs.core.reset_BANG_(a, cljs.core.apply.cljs$lang$arity$variadic(b, a.state, c, d, e, cljs.core.array_seq([f], 0)))
  }, g = function(a, b, c, d, e, g) {
    var n = null;
    goog.isDef(g) && (n = cljs.core.array_seq(Array.prototype.slice.call(arguments, 5), 0));
    return f.call(this, a, b, c, d, e, n)
  };
  g.cljs$lang$maxFixedArity = 5;
  g.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), c = cljs.core.first(cljs.core.next(a)), d = cljs.core.first(cljs.core.next(cljs.core.next(a))), e = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(a)))), g = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(cljs.core.next(a))))), a = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(cljs.core.next(a)))));
    return f(b, c, d, e, g, a)
  };
  g.cljs$lang$arity$variadic = f;
  a = function(a, f, j, l, m, k) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, f);
      case 3:
        return c.call(this, a, f, j);
      case 4:
        return d.call(this, a, f, j, l);
      case 5:
        return e.call(this, a, f, j, l, m);
      default:
        return g.cljs$lang$arity$variadic(a, f, j, l, m, cljs.core.array_seq(arguments, 5))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 5;
  a.cljs$lang$applyTo = g.cljs$lang$applyTo;
  a.cljs$lang$arity$2 = b;
  a.cljs$lang$arity$3 = c;
  a.cljs$lang$arity$4 = d;
  a.cljs$lang$arity$5 = e;
  a.cljs$lang$arity$variadic = g.cljs$lang$arity$variadic;
  return a
}();
cljs.core.compare_and_set_BANG_ = function(a, b, c) {
  return cljs.core._EQ_.cljs$lang$arity$2(a.state, b) ? (cljs.core.reset_BANG_(a, c), !0) : !1
};
cljs.core.deref = function(a) {
  return cljs.core._deref(a)
};
cljs.core.set_validator_BANG_ = function(a, b) {
  return a.validator = b
};
cljs.core.get_validator = function(a) {
  return a.validator
};
cljs.core.alter_meta_BANG_ = function() {
  var a = function(a, b, e) {
    return a.meta = cljs.core.apply.cljs$lang$arity$3(b, a.meta, e)
  }, b = function(b, d, e) {
    var f = null;
    goog.isDef(e) && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return a.call(this, b, d, f)
  };
  b.cljs$lang$maxFixedArity = 2;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), e = cljs.core.first(cljs.core.next(b)), b = cljs.core.rest(cljs.core.next(b));
    return a(d, e, b)
  };
  b.cljs$lang$arity$variadic = a;
  return b
}();
cljs.core.reset_meta_BANG_ = function(a, b) {
  return a.meta = b
};
cljs.core.add_watch = function(a, b, c) {
  return cljs.core._add_watch(a, b, c)
};
cljs.core.remove_watch = function(a, b) {
  return cljs.core._remove_watch(a, b)
};
cljs.core.gensym_counter = null;
cljs.core.gensym = function() {
  var a = null, b = function() {
    return a.cljs$lang$arity$1("G__")
  }, c = function(a) {
    null == cljs.core.gensym_counter && (cljs.core.gensym_counter = cljs.core.atom.cljs$lang$arity$1(0));
    return cljs.core.symbol.cljs$lang$arity$1([cljs.core.str(a), cljs.core.str(cljs.core.swap_BANG_.cljs$lang$arity$2(cljs.core.gensym_counter, cljs.core.inc))].join(""))
  }, a = function(a) {
    switch(arguments.length) {
      case 0:
        return b.call(this);
      case 1:
        return c.call(this, a)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$0 = b;
  a.cljs$lang$arity$1 = c;
  return a
}();
cljs.core.fixture1 = 1;
cljs.core.fixture2 = 2;
cljs.core.Delay = function(a, b) {
  this.state = a;
  this.f = b;
  this.cljs$lang$protocol_mask$partition1$ = 1;
  this.cljs$lang$protocol_mask$partition0$ = 32768
};
cljs.core.Delay.cljs$lang$type = !0;
cljs.core.Delay.cljs$lang$ctorPrSeq = function() {
  return cljs.core.list.cljs$lang$arity$1("cljs.core/Delay")
};
cljs.core.Delay.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/Delay")
};
cljs.core.Delay.prototype.cljs$core$IPending$_realized_QMARK_$arity$1 = function() {
  return(new cljs.core.Keyword("\ufdd0:done")).call(null, cljs.core.deref(this.state))
};
cljs.core.Delay.prototype.cljs$core$IDeref$_deref$arity$1 = function() {
  var a = this;
  return(new cljs.core.Keyword("\ufdd0:value")).call(null, cljs.core.swap_BANG_.cljs$lang$arity$2(a.state, function(b) {
    var b = cljs.core.seq_QMARK_(b) ? cljs.core.apply.cljs$lang$arity$2(cljs.core.hash_map, b) : b, c = cljs.core._lookup.cljs$lang$arity$3(b, "\ufdd0:done", null);
    return cljs.core.truth_(c) ? b : cljs.core.ObjMap.fromObject(["\ufdd0:done", "\ufdd0:value"], {"\ufdd0:done":!0, "\ufdd0:value":a.f.cljs$lang$arity$0 ? a.f.cljs$lang$arity$0() : a.f.call(null)})
  }))
};
cljs.core.delay_QMARK_ = function(a) {
  return cljs.core.instance_QMARK_(cljs.core.Delay, a)
};
cljs.core.force = function(a) {
  return cljs.core.delay_QMARK_(a) ? cljs.core.deref(a) : a
};
cljs.core.realized_QMARK_ = function(a) {
  return cljs.core._realized_QMARK_(a)
};
cljs.core.IEncodeJS = {};
cljs.core._clj__GT_js = function(a) {
  var b;
  b = a ? a.cljs$core$IEncodeJS$_clj__GT_js$arity$1 : a;
  if(b) {
    return a.cljs$core$IEncodeJS$_clj__GT_js$arity$1(a)
  }
  b = cljs.core._clj__GT_js[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._clj__GT_js._, !b)) {
    throw cljs.core.missing_protocol("IEncodeJS.-clj->js", a);
  }
  return b.call(null, a)
};
cljs.core._key__GT_js = function(a) {
  var b;
  b = a ? a.cljs$core$IEncodeJS$_key__GT_js$arity$1 : a;
  if(b) {
    return a.cljs$core$IEncodeJS$_key__GT_js$arity$1(a)
  }
  b = cljs.core._key__GT_js[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._key__GT_js._, !b)) {
    throw cljs.core.missing_protocol("IEncodeJS.-key->js", a);
  }
  return b.call(null, a)
};
cljs.core.IEncodeJS["null"] = !0;
cljs.core._clj__GT_js["null"] = function() {
  return null
};
cljs.core.IEncodeJS._ = !0;
cljs.core._key__GT_js._ = function(a) {
  return cljs.core.truth_(function() {
    var b = cljs.core.string_QMARK_(a);
    return b || (b = cljs.core.number_QMARK_(a)) ? b : (b = cljs.core.keyword_QMARK_(a)) ? b : cljs.core.symbol_QMARK_(a)
  }()) ? cljs.core._clj__GT_js(a) : cljs.core.pr_str.cljs$lang$arity$variadic(cljs.core.array_seq([a], 0))
};
cljs.core._clj__GT_js._ = function(a) {
  if(cljs.core.keyword_QMARK_(a)) {
    return cljs.core.name(a)
  }
  if(cljs.core.symbol_QMARK_(a)) {
    return"" + cljs.core.str(a)
  }
  if(cljs.core.map_QMARK_(a)) {
    for(var b = {}, a = cljs.core.seq(a);;) {
      if(a) {
        var c = cljs.core.first(a), d = cljs.core.nth.cljs$lang$arity$3(c, 0, null), c = cljs.core.nth.cljs$lang$arity$3(c, 1, null);
        b[cljs.core._key__GT_js(d)] = cljs.core._clj__GT_js(c);
        a = cljs.core.next(a)
      }else {
        break
      }
    }
    return b
  }
  return cljs.core.coll_QMARK_(a) ? cljs.core.apply.cljs$lang$arity$2(cljs.core.array, cljs.core.map.cljs$lang$arity$2(cljs.core._clj__GT_js, a)) : a
};
cljs.core.clj__GT_js = function(a) {
  return cljs.core._clj__GT_js(a)
};
cljs.core.IEncodeClojure = {};
cljs.core._js__GT_clj = function() {
  var a = null, b = function(a) {
    var b;
    b = a ? a.cljs$core$IEncodeClojure$_js__GT_clj$arity$1 : a;
    if(b) {
      return a.cljs$core$IEncodeClojure$_js__GT_clj$arity$1(a)
    }
    b = cljs.core._js__GT_clj[goog.typeOf(null == a ? null : a)];
    if(!b && (b = cljs.core._js__GT_clj._, !b)) {
      throw cljs.core.missing_protocol("IEncodeClojure.-js->clj", a);
    }
    return b.call(null, a)
  }, c = function(a, b) {
    var c;
    c = a ? a.cljs$core$IEncodeClojure$_js__GT_clj$arity$2 : a;
    if(c) {
      return a.cljs$core$IEncodeClojure$_js__GT_clj$arity$2(a, b)
    }
    c = cljs.core._js__GT_clj[goog.typeOf(null == a ? null : a)];
    if(!c && (c = cljs.core._js__GT_clj._, !c)) {
      throw cljs.core.missing_protocol("IEncodeClojure.-js->clj", a);
    }
    return c.call(null, a, b)
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$1 = b;
  a.cljs$lang$arity$2 = c;
  return a
}();
cljs.core.IEncodeClojure._ = !0;
cljs.core._js__GT_clj._ = function() {
  var a = null;
  return a = function(a, c) {
    switch(arguments.length) {
      case 1:
        return cljs.core._js__GT_clj.cljs$lang$arity$2(a, cljs.core.ObjMap.fromObject(["\ufdd0:keywordize-keys"], {"\ufdd0:keywordize-keys":!1}));
      case 2:
        var d = cljs.core.seq_QMARK_(c) ? cljs.core.apply.cljs$lang$arity$2(cljs.core.hash_map, c) : c, e = cljs.core._lookup.cljs$lang$arity$3(d, "\ufdd0:keywordize-keys", null), f = cljs.core.truth_(e) ? cljs.core.keyword : cljs.core.str;
        return function h(a) {
          return cljs.core.seq_QMARK_(a) ? cljs.core.doall.cljs$lang$arity$1(cljs.core.map.cljs$lang$arity$2(h, a)) : cljs.core.coll_QMARK_(a) ? cljs.core.into(cljs.core.empty(a), cljs.core.map.cljs$lang$arity$2(h, a)) : cljs.core.truth_(goog.isArray(a)) ? cljs.core.vec(cljs.core.map.cljs$lang$arity$2(h, a)) : cljs.core.type(a) === Object ? cljs.core.into(cljs.core.ObjMap.EMPTY, function(b, c, d, e) {
            return function p(b) {
              return new cljs.core.LazySeq(null, !1, function() {
                for(;;) {
                  var c = cljs.core.seq(b);
                  return c ? (c = cljs.core.first(c), cljs.core.cons(cljs.core.PersistentVector.fromArray([e.cljs$lang$arity$1 ? e.cljs$lang$arity$1(c) : e.call(null, c), h(a[c])], !0), p(cljs.core.rest(b)))) : null
                }
              }, null)
            }
          }(c, d, e, f)(cljs.core.js_keys(a))) : a
        }(a)
    }
    throw Error("Invalid arity: " + arguments.length);
  }
}();
cljs.core.js__GT_clj = function() {
  var a = function(a, b) {
    return cljs.core._js__GT_clj.cljs$lang$arity$2(a, cljs.core.apply.cljs$lang$arity$2(cljs.core.array_map, b))
  }, b = function(b, d) {
    var e = null;
    goog.isDef(d) && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return a.call(this, b, e)
  };
  b.cljs$lang$maxFixedArity = 1;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), b = cljs.core.rest(b);
    return a(d, b)
  };
  b.cljs$lang$arity$variadic = a;
  return b
}();
cljs.core.memoize = function(a) {
  var b = cljs.core.atom.cljs$lang$arity$1(cljs.core.ObjMap.EMPTY), c = function(c) {
    var d = cljs.core._lookup.cljs$lang$arity$3(cljs.core.deref(b), c, null);
    if(cljs.core.truth_(d)) {
      return d
    }
    d = cljs.core.apply.cljs$lang$arity$2(a, c);
    cljs.core.swap_BANG_.cljs$lang$arity$4(b, cljs.core.assoc, c, d);
    return d
  }, d = function(a) {
    var b = null;
    goog.isDef(a) && (b = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return c.call(this, b)
  };
  d.cljs$lang$maxFixedArity = 0;
  d.cljs$lang$applyTo = function(a) {
    a = cljs.core.seq(a);
    return c(a)
  };
  d.cljs$lang$arity$variadic = c;
  return d
};
cljs.core.trampoline = function() {
  var a = null, b = function(a) {
    for(;;) {
      if(a = a.cljs$lang$arity$0 ? a.cljs$lang$arity$0() : a.call(null), !cljs.core.fn_QMARK_(a)) {
        return a
      }
    }
  }, c = function(b, c) {
    return a.cljs$lang$arity$1(function() {
      return cljs.core.apply.cljs$lang$arity$2(b, c)
    })
  }, d = function(a, b) {
    var d = null;
    goog.isDef(b) && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return c.call(this, a, d)
  };
  d.cljs$lang$maxFixedArity = 1;
  d.cljs$lang$applyTo = function(a) {
    var b = cljs.core.first(a), a = cljs.core.rest(a);
    return c(b, a)
  };
  d.cljs$lang$arity$variadic = c;
  a = function(a, c) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      default:
        return d.cljs$lang$arity$variadic(a, cljs.core.array_seq(arguments, 1))
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$maxFixedArity = 1;
  a.cljs$lang$applyTo = d.cljs$lang$applyTo;
  a.cljs$lang$arity$1 = b;
  a.cljs$lang$arity$variadic = d.cljs$lang$arity$variadic;
  return a
}();
cljs.core.rand = function() {
  var a = null, b = function() {
    return a.cljs$lang$arity$1(1)
  }, c = function(a) {
    return(Math.random.cljs$lang$arity$0 ? Math.random.cljs$lang$arity$0() : Math.random.call(null)) * a
  }, a = function(a) {
    switch(arguments.length) {
      case 0:
        return b.call(this);
      case 1:
        return c.call(this, a)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$0 = b;
  a.cljs$lang$arity$1 = c;
  return a
}();
cljs.core.rand_int = function(a) {
  return Math.floor.cljs$lang$arity$1 ? Math.floor.cljs$lang$arity$1((Math.random.cljs$lang$arity$0 ? Math.random.cljs$lang$arity$0() : Math.random.call(null)) * a) : Math.floor.call(null, (Math.random.cljs$lang$arity$0 ? Math.random.cljs$lang$arity$0() : Math.random.call(null)) * a)
};
cljs.core.rand_nth = function(a) {
  return cljs.core.nth.cljs$lang$arity$2(a, cljs.core.rand_int(cljs.core.count(a)))
};
cljs.core.group_by = function(a, b) {
  return cljs.core.reduce.cljs$lang$arity$3(function(b, d) {
    var e = a.cljs$lang$arity$1 ? a.cljs$lang$arity$1(d) : a.call(null, d);
    return cljs.core.assoc.cljs$lang$arity$3(b, e, cljs.core.conj.cljs$lang$arity$2(cljs.core._lookup.cljs$lang$arity$3(b, e, cljs.core.PersistentVector.EMPTY), d))
  }, cljs.core.ObjMap.EMPTY, b)
};
cljs.core.make_hierarchy = function() {
  return cljs.core.ObjMap.fromObject(["\ufdd0:parents", "\ufdd0:descendants", "\ufdd0:ancestors"], {"\ufdd0:parents":cljs.core.ObjMap.EMPTY, "\ufdd0:descendants":cljs.core.ObjMap.EMPTY, "\ufdd0:ancestors":cljs.core.ObjMap.EMPTY})
};
cljs.core.global_hierarchy = cljs.core.atom.cljs$lang$arity$1(cljs.core.make_hierarchy());
cljs.core.isa_QMARK_ = function() {
  var a = null, b = function(b, c) {
    return a.cljs$lang$arity$3(cljs.core.deref(cljs.core.global_hierarchy), b, c)
  }, c = function(b, c, f) {
    var g = cljs.core._EQ_.cljs$lang$arity$2(c, f);
    if(!g && !(g = cljs.core.contains_QMARK_((new cljs.core.Keyword("\ufdd0:ancestors")).call(null, b).call(null, c), f)) && (g = cljs.core.vector_QMARK_(f))) {
      if(g = cljs.core.vector_QMARK_(c)) {
        if(g = cljs.core.count(f) === cljs.core.count(c)) {
          for(var h = !0, i = 0;;) {
            if(cljs.core.truth_(function() {
              var a = cljs.core.not(h);
              return a ? a : i === cljs.core.count(f)
            }())) {
              return h
            }
            var g = a.cljs$lang$arity$3(b, c.cljs$lang$arity$1 ? c.cljs$lang$arity$1(i) : c.call(null, i), f.cljs$lang$arity$1 ? f.cljs$lang$arity$1(i) : f.call(null, i)), j = i + 1, h = g, i = j
          }
        }else {
          return g
        }
      }else {
        return g
      }
    }else {
      return g
    }
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$2 = b;
  a.cljs$lang$arity$3 = c;
  return a
}();
cljs.core.parents = function() {
  var a = null, b = function(b) {
    return a.cljs$lang$arity$2(cljs.core.deref(cljs.core.global_hierarchy), b)
  }, c = function(a, b) {
    return cljs.core.not_empty(cljs.core._lookup.cljs$lang$arity$3((new cljs.core.Keyword("\ufdd0:parents")).call(null, a), b, null))
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$1 = b;
  a.cljs$lang$arity$2 = c;
  return a
}();
cljs.core.ancestors = function() {
  var a = null, b = function(b) {
    return a.cljs$lang$arity$2(cljs.core.deref(cljs.core.global_hierarchy), b)
  }, c = function(a, b) {
    return cljs.core.not_empty(cljs.core._lookup.cljs$lang$arity$3((new cljs.core.Keyword("\ufdd0:ancestors")).call(null, a), b, null))
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$1 = b;
  a.cljs$lang$arity$2 = c;
  return a
}();
cljs.core.descendants = function() {
  var a = null, b = function(b) {
    return a.cljs$lang$arity$2(cljs.core.deref(cljs.core.global_hierarchy), b)
  }, c = function(a, b) {
    return cljs.core.not_empty(cljs.core._lookup.cljs$lang$arity$3((new cljs.core.Keyword("\ufdd0:descendants")).call(null, a), b, null))
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$1 = b;
  a.cljs$lang$arity$2 = c;
  return a
}();
cljs.core.derive = function() {
  var a = null, b = function(b, c) {
    if(!cljs.core.truth_(cljs.core.namespace(c))) {
      throw Error([cljs.core.str("Assert failed: "), cljs.core.str(cljs.core.pr_str.cljs$lang$arity$variadic(cljs.core.array_seq([cljs.core.with_meta(cljs.core.list("\ufdd1'namespace", "\ufdd1'parent"), cljs.core.hash_map("\ufdd0:line", 7082, "\ufdd0:column", 12))], 0)))].join(""));
    }
    cljs.core.swap_BANG_.cljs$lang$arity$4(cljs.core.global_hierarchy, a, b, c);
    return null
  }, c = function(a, b, c) {
    if(!cljs.core.not_EQ_.cljs$lang$arity$2(b, c)) {
      throw Error([cljs.core.str("Assert failed: "), cljs.core.str(cljs.core.pr_str.cljs$lang$arity$variadic(cljs.core.array_seq([cljs.core.with_meta(cljs.core.list("\ufdd1'not=", "\ufdd1'tag", "\ufdd1'parent"), cljs.core.hash_map("\ufdd0:line", 7086, "\ufdd0:column", 12))], 0)))].join(""));
    }
    var g = (new cljs.core.Keyword("\ufdd0:parents")).call(null, a), h = (new cljs.core.Keyword("\ufdd0:descendants")).call(null, a), i = (new cljs.core.Keyword("\ufdd0:ancestors")).call(null, a), j;
    j = function(a, b, c, d, e) {
      return cljs.core.reduce.cljs$lang$arity$3(function(a, b) {
        return cljs.core.assoc.cljs$lang$arity$3(a, b, cljs.core.reduce.cljs$lang$arity$3(cljs.core.conj, cljs.core._lookup.cljs$lang$arity$3(e, b, cljs.core.PersistentHashSet.EMPTY), cljs.core.cons(d, e.cljs$lang$arity$1 ? e.cljs$lang$arity$1(d) : e.call(null, d))))
      }, a, cljs.core.cons(b, c.cljs$lang$arity$1 ? c.cljs$lang$arity$1(b) : c.call(null, b)))
    };
    if(cljs.core.contains_QMARK_(g.cljs$lang$arity$1 ? g.cljs$lang$arity$1(b) : g.call(null, b), c)) {
      b = null
    }else {
      if(cljs.core.contains_QMARK_(i.cljs$lang$arity$1 ? i.cljs$lang$arity$1(b) : i.call(null, b), c)) {
        throw Error([cljs.core.str(b), cljs.core.str("already has"), cljs.core.str(c), cljs.core.str("as ancestor")].join(""));
      }
      if(cljs.core.contains_QMARK_(i.cljs$lang$arity$1 ? i.cljs$lang$arity$1(c) : i.call(null, c), b)) {
        throw Error([cljs.core.str("Cyclic derivation:"), cljs.core.str(c), cljs.core.str("has"), cljs.core.str(b), cljs.core.str("as ancestor")].join(""));
      }
      b = cljs.core.ObjMap.fromObject(["\ufdd0:parents", "\ufdd0:ancestors", "\ufdd0:descendants"], {"\ufdd0:parents":cljs.core.assoc.cljs$lang$arity$3((new cljs.core.Keyword("\ufdd0:parents")).call(null, a), b, cljs.core.conj.cljs$lang$arity$2(cljs.core._lookup.cljs$lang$arity$3(g, b, cljs.core.PersistentHashSet.EMPTY), c)), "\ufdd0:ancestors":j((new cljs.core.Keyword("\ufdd0:ancestors")).call(null, a), b, h, c, i), "\ufdd0:descendants":j((new cljs.core.Keyword("\ufdd0:descendants")).call(null, 
      a), c, i, b, h)})
    }
    return cljs.core.truth_(b) ? b : a
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$2 = b;
  a.cljs$lang$arity$3 = c;
  return a
}();
cljs.core.underive = function() {
  var a = null, b = function(b, c) {
    cljs.core.swap_BANG_.cljs$lang$arity$4(cljs.core.global_hierarchy, a, b, c);
    return null
  }, c = function(a, b, c) {
    var g = (new cljs.core.Keyword("\ufdd0:parents")).call(null, a), h = cljs.core.truth_(g.cljs$lang$arity$1 ? g.cljs$lang$arity$1(b) : g.call(null, b)) ? cljs.core.disj.cljs$lang$arity$2(g.cljs$lang$arity$1 ? g.cljs$lang$arity$1(b) : g.call(null, b), c) : cljs.core.PersistentHashSet.EMPTY, h = cljs.core.truth_(cljs.core.not_empty(h)) ? cljs.core.assoc.cljs$lang$arity$3(g, b, h) : cljs.core.dissoc.cljs$lang$arity$2(g, b), h = cljs.core.flatten(cljs.core.map.cljs$lang$arity$2(function(a) {
      return cljs.core.cons(cljs.core.first(a), cljs.core.interpose(cljs.core.first(a), cljs.core.second(a)))
    }, cljs.core.seq(h)));
    return cljs.core.contains_QMARK_(g.cljs$lang$arity$1 ? g.cljs$lang$arity$1(b) : g.call(null, b), c) ? cljs.core.reduce.cljs$lang$arity$3(function(a, b) {
      return cljs.core.apply.cljs$lang$arity$3(cljs.core.derive, a, b)
    }, cljs.core.make_hierarchy(), cljs.core.partition.cljs$lang$arity$2(2, h)) : a
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$2 = b;
  a.cljs$lang$arity$3 = c;
  return a
}();
cljs.core.reset_cache = function(a, b, c, d) {
  cljs.core.swap_BANG_.cljs$lang$arity$2(a, function() {
    return cljs.core.deref(b)
  });
  return cljs.core.swap_BANG_.cljs$lang$arity$2(c, function() {
    return cljs.core.deref(d)
  })
};
cljs.core.prefers_STAR_ = function prefers_STAR_(b, c, d) {
  var e = cljs.core.deref(d).call(null, b), e = cljs.core.truth_(cljs.core.truth_(e) ? e.cljs$lang$arity$1 ? e.cljs$lang$arity$1(c) : e.call(null, c) : e) ? !0 : null;
  if(cljs.core.truth_(e)) {
    return e
  }
  a: {
    for(e = cljs.core.parents.cljs$lang$arity$1(c);;) {
      if(0 < cljs.core.count(e)) {
        cljs.core.truth_(prefers_STAR_(b, cljs.core.first(e), d)), e = cljs.core.rest(e)
      }else {
        e = null;
        break a
      }
    }
    e = void 0
  }
  if(cljs.core.truth_(e)) {
    return e
  }
  a: {
    for(b = cljs.core.parents.cljs$lang$arity$1(b);;) {
      if(0 < cljs.core.count(b)) {
        cljs.core.truth_(prefers_STAR_(cljs.core.first(b), c, d)), b = cljs.core.rest(b)
      }else {
        c = null;
        break a
      }
    }
    c = void 0
  }
  return cljs.core.truth_(c) ? c : !1
};
cljs.core.dominates = function(a, b, c) {
  c = cljs.core.prefers_STAR_(a, b, c);
  return cljs.core.truth_(c) ? c : cljs.core.isa_QMARK_.cljs$lang$arity$2(a, b)
};
cljs.core.find_and_cache_best_method = function find_and_cache_best_method(b, c, d, e, f, g, h) {
  var i = cljs.core.reduce.cljs$lang$arity$3(function(e, g) {
    var h = cljs.core.nth.cljs$lang$arity$3(g, 0, null);
    cljs.core.nth.cljs$lang$arity$3(g, 1, null);
    if(cljs.core.isa_QMARK_.cljs$lang$arity$3(cljs.core.deref(d), c, h)) {
      var i = cljs.core.truth_(function() {
        var b = null == e;
        return b ? b : cljs.core.dominates(h, cljs.core.first(e), f)
      }()) ? g : e;
      if(!cljs.core.truth_(cljs.core.dominates(cljs.core.first(i), h, f))) {
        throw Error([cljs.core.str("Multiple methods in multimethod '"), cljs.core.str(b), cljs.core.str("' match dispatch value: "), cljs.core.str(c), cljs.core.str(" -> "), cljs.core.str(h), cljs.core.str(" and "), cljs.core.str(cljs.core.first(i)), cljs.core.str(", and neither is preferred")].join(""));
      }
      return i
    }
    return e
  }, null, cljs.core.deref(e));
  if(cljs.core.truth_(i)) {
    if(cljs.core._EQ_.cljs$lang$arity$2(cljs.core.deref(h), cljs.core.deref(d))) {
      return cljs.core.swap_BANG_.cljs$lang$arity$4(g, cljs.core.assoc, c, cljs.core.second(i)), cljs.core.second(i)
    }
    cljs.core.reset_cache(g, e, h, d);
    return find_and_cache_best_method(b, c, d, e, f, g, h)
  }
  return null
};
cljs.core.IMultiFn = {};
cljs.core._reset = function(a) {
  var b;
  b = a ? a.cljs$core$IMultiFn$_reset$arity$1 : a;
  if(b) {
    return a.cljs$core$IMultiFn$_reset$arity$1(a)
  }
  b = cljs.core._reset[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._reset._, !b)) {
    throw cljs.core.missing_protocol("IMultiFn.-reset", a);
  }
  return b.call(null, a)
};
cljs.core._add_method = function(a, b, c) {
  var d;
  d = a ? a.cljs$core$IMultiFn$_add_method$arity$3 : a;
  if(d) {
    return a.cljs$core$IMultiFn$_add_method$arity$3(a, b, c)
  }
  d = cljs.core._add_method[goog.typeOf(null == a ? null : a)];
  if(!d && (d = cljs.core._add_method._, !d)) {
    throw cljs.core.missing_protocol("IMultiFn.-add-method", a);
  }
  return d.call(null, a, b, c)
};
cljs.core._remove_method = function(a, b) {
  var c;
  c = a ? a.cljs$core$IMultiFn$_remove_method$arity$2 : a;
  if(c) {
    return a.cljs$core$IMultiFn$_remove_method$arity$2(a, b)
  }
  c = cljs.core._remove_method[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.core._remove_method._, !c)) {
    throw cljs.core.missing_protocol("IMultiFn.-remove-method", a);
  }
  return c.call(null, a, b)
};
cljs.core._prefer_method = function(a, b, c) {
  var d;
  d = a ? a.cljs$core$IMultiFn$_prefer_method$arity$3 : a;
  if(d) {
    return a.cljs$core$IMultiFn$_prefer_method$arity$3(a, b, c)
  }
  d = cljs.core._prefer_method[goog.typeOf(null == a ? null : a)];
  if(!d && (d = cljs.core._prefer_method._, !d)) {
    throw cljs.core.missing_protocol("IMultiFn.-prefer-method", a);
  }
  return d.call(null, a, b, c)
};
cljs.core._get_method = function(a, b) {
  var c;
  c = a ? a.cljs$core$IMultiFn$_get_method$arity$2 : a;
  if(c) {
    return a.cljs$core$IMultiFn$_get_method$arity$2(a, b)
  }
  c = cljs.core._get_method[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.core._get_method._, !c)) {
    throw cljs.core.missing_protocol("IMultiFn.-get-method", a);
  }
  return c.call(null, a, b)
};
cljs.core._methods = function(a) {
  var b;
  b = a ? a.cljs$core$IMultiFn$_methods$arity$1 : a;
  if(b) {
    return a.cljs$core$IMultiFn$_methods$arity$1(a)
  }
  b = cljs.core._methods[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._methods._, !b)) {
    throw cljs.core.missing_protocol("IMultiFn.-methods", a);
  }
  return b.call(null, a)
};
cljs.core._prefers = function(a) {
  var b;
  b = a ? a.cljs$core$IMultiFn$_prefers$arity$1 : a;
  if(b) {
    return a.cljs$core$IMultiFn$_prefers$arity$1(a)
  }
  b = cljs.core._prefers[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.core._prefers._, !b)) {
    throw cljs.core.missing_protocol("IMultiFn.-prefers", a);
  }
  return b.call(null, a)
};
cljs.core._dispatch = function(a, b) {
  var c;
  c = a ? a.cljs$core$IMultiFn$_dispatch$arity$2 : a;
  if(c) {
    return a.cljs$core$IMultiFn$_dispatch$arity$2(a, b)
  }
  c = cljs.core._dispatch[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.core._dispatch._, !c)) {
    throw cljs.core.missing_protocol("IMultiFn.-dispatch", a);
  }
  return c.call(null, a, b)
};
cljs.core.do_dispatch = function(a, b, c) {
  b = cljs.core.apply.cljs$lang$arity$2(b, c);
  a = cljs.core._get_method(a, b);
  if(!cljs.core.truth_(a)) {
    throw Error([cljs.core.str("No method in multimethod '"), cljs.core.str(cljs.core.name), cljs.core.str("' for dispatch value: "), cljs.core.str(b)].join(""));
  }
  return cljs.core.apply.cljs$lang$arity$2(a, c)
};
cljs.core.MultiFn = function(a, b, c, d, e, f, g, h) {
  this.name = a;
  this.dispatch_fn = b;
  this.default_dispatch_val = c;
  this.hierarchy = d;
  this.method_table = e;
  this.prefer_table = f;
  this.method_cache = g;
  this.cached_hierarchy = h;
  this.cljs$lang$protocol_mask$partition0$ = 4194304;
  this.cljs$lang$protocol_mask$partition1$ = 256
};
cljs.core.MultiFn.cljs$lang$type = !0;
cljs.core.MultiFn.cljs$lang$ctorPrSeq = function() {
  return cljs.core.list.cljs$lang$arity$1("cljs.core/MultiFn")
};
cljs.core.MultiFn.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/MultiFn")
};
cljs.core.MultiFn.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  return goog.getUid(a)
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_reset$arity$1 = function(a) {
  cljs.core.swap_BANG_.cljs$lang$arity$2(this.method_table, function() {
    return cljs.core.ObjMap.EMPTY
  });
  cljs.core.swap_BANG_.cljs$lang$arity$2(this.method_cache, function() {
    return cljs.core.ObjMap.EMPTY
  });
  cljs.core.swap_BANG_.cljs$lang$arity$2(this.prefer_table, function() {
    return cljs.core.ObjMap.EMPTY
  });
  cljs.core.swap_BANG_.cljs$lang$arity$2(this.cached_hierarchy, function() {
    return null
  });
  return a
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_add_method$arity$3 = function(a, b, c) {
  cljs.core.swap_BANG_.cljs$lang$arity$4(this.method_table, cljs.core.assoc, b, c);
  cljs.core.reset_cache(this.method_cache, this.method_table, this.cached_hierarchy, this.hierarchy);
  return a
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_remove_method$arity$2 = function(a, b) {
  cljs.core.swap_BANG_.cljs$lang$arity$3(this.method_table, cljs.core.dissoc, b);
  cljs.core.reset_cache(this.method_cache, this.method_table, this.cached_hierarchy, this.hierarchy);
  return a
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_get_method$arity$2 = function(a, b) {
  cljs.core._EQ_.cljs$lang$arity$2(cljs.core.deref(this.cached_hierarchy), cljs.core.deref(this.hierarchy)) || cljs.core.reset_cache(this.method_cache, this.method_table, this.cached_hierarchy, this.hierarchy);
  var c = cljs.core.deref(this.method_cache).call(null, b);
  if(cljs.core.truth_(c)) {
    return c
  }
  c = cljs.core.find_and_cache_best_method(this.name, b, this.hierarchy, this.method_table, this.prefer_table, this.method_cache, this.cached_hierarchy);
  return cljs.core.truth_(c) ? c : cljs.core.deref(this.method_table).call(null, this.default_dispatch_val)
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_prefer_method$arity$3 = function(a, b, c) {
  if(cljs.core.truth_(cljs.core.prefers_STAR_(b, c, this.prefer_table))) {
    throw Error([cljs.core.str("Preference conflict in multimethod '"), cljs.core.str(this.name), cljs.core.str("': "), cljs.core.str(c), cljs.core.str(" is already preferred to "), cljs.core.str(b)].join(""));
  }
  cljs.core.swap_BANG_.cljs$lang$arity$2(this.prefer_table, function(a) {
    return cljs.core.assoc.cljs$lang$arity$3(a, b, cljs.core.conj.cljs$lang$arity$2(cljs.core._lookup.cljs$lang$arity$3(a, b, cljs.core.PersistentHashSet.EMPTY), c))
  });
  return cljs.core.reset_cache(this.method_cache, this.method_table, this.cached_hierarchy, this.hierarchy)
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_methods$arity$1 = function() {
  return cljs.core.deref(this.method_table)
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_prefers$arity$1 = function() {
  return cljs.core.deref(this.prefer_table)
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_dispatch$arity$2 = function(a, b) {
  return cljs.core.do_dispatch(a, this.dispatch_fn, b)
};
cljs.core.MultiFn.prototype.call = function() {
  var a = function(a, b) {
    return cljs.core._dispatch(this, b)
  }, b = function(a, b) {
    var e = null;
    goog.isDef(b) && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return cljs.core._dispatch(this, e)
  };
  b.cljs$lang$maxFixedArity = 1;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), b = cljs.core.rest(b);
    return a(d, b)
  };
  b.cljs$lang$arity$variadic = a;
  return b
}();
cljs.core.MultiFn.prototype.apply = function(a, b) {
  return cljs.core._dispatch(this, b)
};
cljs.core.remove_all_methods = function(a) {
  return cljs.core._reset(a)
};
cljs.core.remove_method = function(a, b) {
  return cljs.core._remove_method(a, b)
};
cljs.core.prefer_method = function(a, b, c) {
  return cljs.core._prefer_method(a, b, c)
};
cljs.core.methods$ = function(a) {
  return cljs.core._methods(a)
};
cljs.core.get_method = function(a, b) {
  return cljs.core._get_method(a, b)
};
cljs.core.prefers = function(a) {
  return cljs.core._prefers(a)
};
cljs.core.UUID = function(a) {
  this.uuid = a;
  this.cljs$lang$protocol_mask$partition1$ = 0;
  this.cljs$lang$protocol_mask$partition0$ = 2690646016
};
cljs.core.UUID.cljs$lang$type = !0;
cljs.core.UUID.cljs$lang$ctorPrSeq = function() {
  return cljs.core.list.cljs$lang$arity$1("cljs.core/UUID")
};
cljs.core.UUID.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/UUID")
};
cljs.core.UUID.prototype.cljs$core$IHash$_hash$arity$1 = function(a) {
  return goog.string.hashCode(cljs.core.pr_str.cljs$lang$arity$variadic(cljs.core.array_seq([a], 0)))
};
cljs.core.UUID.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = function(a, b) {
  return cljs.core._write(b, [cljs.core.str('#uuid "'), cljs.core.str(this.uuid), cljs.core.str('"')].join(""))
};
cljs.core.UUID.prototype.cljs$core$IPrintable$_pr_seq$arity$2 = function() {
  return cljs.core.list.cljs$lang$arity$1([cljs.core.str('#uuid "'), cljs.core.str(this.uuid), cljs.core.str('"')].join(""))
};
cljs.core.UUID.prototype.cljs$core$IEquiv$_equiv$arity$2 = function(a, b) {
  var c = cljs.core.instance_QMARK_(cljs.core.UUID, b);
  return c ? this.uuid === b.uuid : c
};
cljs.core.UUID.prototype.toString = function() {
  return cljs.core.pr_str.cljs$lang$arity$variadic(cljs.core.array_seq([this], 0))
};
cljs.core.ExceptionInfo = function(a, b, c) {
  this.message = a;
  this.data = b;
  this.cause = c
};
cljs.core.ExceptionInfo.cljs$lang$type = !0;
cljs.core.ExceptionInfo.cljs$lang$ctorPrSeq = function() {
  return cljs.core.list.cljs$lang$arity$1("cljs.core/ExceptionInfo")
};
cljs.core.ExceptionInfo.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.core/ExceptionInfo")
};
cljs.core.ExceptionInfo.prototype = Error();
cljs.core.ExceptionInfo.prototype.constructor = cljs.core.ExceptionInfo;
cljs.core.ex_info = function() {
  var a = null, b = function(a, b) {
    return new cljs.core.ExceptionInfo(a, b, null)
  }, c = function(a, b, c) {
    return new cljs.core.ExceptionInfo(a, b, c)
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$2 = b;
  a.cljs$lang$arity$3 = c;
  return a
}();
cljs.core.ex_data = function(a) {
  return cljs.core.instance_QMARK_(cljs.core.ExceptionInfo, a) ? a.data : null
};
cljs.core.ex_message = function(a) {
  return cljs.core.instance_QMARK_(Error, a) ? a.message : null
};
cljs.core.ex_cause = function(a) {
  return cljs.core.instance_QMARK_(cljs.core.ExceptionInfo, a) ? a.cause : null
};
cljs.core.comparator = function(a) {
  return function(b, c) {
    return cljs.core.truth_(a.cljs$lang$arity$2 ? a.cljs$lang$arity$2(b, c) : a.call(null, b, c)) ? -1 : cljs.core.truth_(a.cljs$lang$arity$2 ? a.cljs$lang$arity$2(c, b) : a.call(null, c, b)) ? 1 : 0
  }
};
cljs.reader = {};
cljs.reader.PushbackReader = {};
cljs.reader.read_char = function(a) {
  var b;
  b = a ? a.cljs$reader$PushbackReader$read_char$arity$1 : a;
  if(b) {
    return a.cljs$reader$PushbackReader$read_char$arity$1(a)
  }
  b = cljs.reader.read_char[goog.typeOf(null == a ? null : a)];
  if(!b && (b = cljs.reader.read_char._, !b)) {
    throw cljs.core.missing_protocol("PushbackReader.read-char", a);
  }
  return b.call(null, a)
};
cljs.reader.unread = function(a, b) {
  var c;
  c = a ? a.cljs$reader$PushbackReader$unread$arity$2 : a;
  if(c) {
    return a.cljs$reader$PushbackReader$unread$arity$2(a, b)
  }
  c = cljs.reader.unread[goog.typeOf(null == a ? null : a)];
  if(!c && (c = cljs.reader.unread._, !c)) {
    throw cljs.core.missing_protocol("PushbackReader.unread", a);
  }
  return c.call(null, a, b)
};
cljs.reader.StringPushbackReader = function(a, b, c) {
  this.s = a;
  this.index_atom = b;
  this.buffer_atom = c
};
cljs.reader.StringPushbackReader.cljs$lang$type = !0;
cljs.reader.StringPushbackReader.cljs$lang$ctorPrSeq = function() {
  return cljs.core.list.cljs$lang$arity$1("cljs.reader/StringPushbackReader")
};
cljs.reader.StringPushbackReader.cljs$lang$ctorPrWriter = function(a, b) {
  return cljs.core._write(b, "cljs.reader/StringPushbackReader")
};
cljs.reader.StringPushbackReader.prototype.cljs$reader$PushbackReader$ = !0;
cljs.reader.StringPushbackReader.prototype.cljs$reader$PushbackReader$read_char$arity$1 = function() {
  if(cljs.core.empty_QMARK_(cljs.core.deref(this.buffer_atom))) {
    var a = cljs.core.deref(this.index_atom);
    cljs.core.swap_BANG_.cljs$lang$arity$2(this.index_atom, cljs.core.inc);
    return this.s[a]
  }
  a = cljs.core.deref(this.buffer_atom);
  cljs.core.swap_BANG_.cljs$lang$arity$2(this.buffer_atom, cljs.core.rest);
  return cljs.core.first(a)
};
cljs.reader.StringPushbackReader.prototype.cljs$reader$PushbackReader$unread$arity$2 = function(a, b) {
  return cljs.core.swap_BANG_.cljs$lang$arity$2(this.buffer_atom, function(a) {
    return cljs.core.cons(b, a)
  })
};
cljs.reader.push_back_reader = function(a) {
  return new cljs.reader.StringPushbackReader(a, cljs.core.atom.cljs$lang$arity$1(0), cljs.core.atom.cljs$lang$arity$1(null))
};
cljs.reader.whitespace_QMARK_ = function(a) {
  var b = goog.string.isBreakingWhitespace(a);
  return cljs.core.truth_(b) ? b : "," === a
};
cljs.reader.numeric_QMARK_ = function(a) {
  return goog.string.isNumeric(a)
};
cljs.reader.comment_prefix_QMARK_ = function(a) {
  return";" === a
};
cljs.reader.number_literal_QMARK_ = function(a, b) {
  var c = cljs.reader.numeric_QMARK_(b);
  if(c) {
    return c
  }
  c = (c = "+" === b) ? c : "-" === b;
  return cljs.core.truth_(c) ? cljs.reader.numeric_QMARK_(function() {
    var b = cljs.reader.read_char(a);
    cljs.reader.unread(a, b);
    return b
  }()) : c
};
cljs.reader.read = void 0;
cljs.reader.macros = void 0;
cljs.reader.dispatch_macros = void 0;
cljs.reader.reader_error = function() {
  var a = function(a, b) {
    throw Error(cljs.core.apply.cljs$lang$arity$2(cljs.core.str, b));
  }, b = function(b, d) {
    var e = null;
    goog.isDef(d) && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return a.call(this, b, e)
  };
  b.cljs$lang$maxFixedArity = 1;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), b = cljs.core.rest(b);
    return a(d, b)
  };
  b.cljs$lang$arity$variadic = a;
  return b
}();
cljs.reader.macro_terminating_QMARK_ = function(a) {
  var b = "#" !== a;
  return b && (b = "'" !== a) ? (b = ":" !== a) ? cljs.reader.macros.cljs$lang$arity$1 ? cljs.reader.macros.cljs$lang$arity$1(a) : cljs.reader.macros.call(null, a) : b : b
};
cljs.reader.read_token = function(a, b) {
  for(var c = new goog.string.StringBuffer(b), d = cljs.reader.read_char(a);;) {
    if(cljs.core.truth_(function() {
      var a = null == d;
      return a ? a : (a = cljs.reader.whitespace_QMARK_(d)) ? a : cljs.reader.macro_terminating_QMARK_(d)
    }())) {
      return cljs.reader.unread(a, d), c.toString()
    }
    c.append(d);
    var e = cljs.reader.read_char(a), d = e
  }
};
cljs.reader.skip_line = function(a) {
  for(;;) {
    var b = cljs.reader.read_char(a);
    if(cljs.core.truth_(function() {
      var a = "n" === b;
      return a ? a : (a = "r" === b) ? a : null == b
    }())) {
      return a
    }
  }
};
cljs.reader.int_pattern = cljs.core.re_pattern("([-+]?)(?:(0)|([1-9][0-9]*)|0[xX]([0-9A-Fa-f]+)|0([0-7]+)|([1-9][0-9]?)[rR]([0-9A-Za-z]+)|0[0-9]+)(N)?");
cljs.reader.ratio_pattern = cljs.core.re_pattern("([-+]?[0-9]+)/([0-9]+)");
cljs.reader.float_pattern = cljs.core.re_pattern("([-+]?[0-9]+(\\.[0-9]*)?([eE][-+]?[0-9]+)?)(M)?");
cljs.reader.symbol_pattern = cljs.core.re_pattern("[:]?([^0-9/].*/)?([^0-9/][^/]*)");
cljs.reader.re_find_STAR_ = function(a, b) {
  var c = a.exec(b);
  return null == c ? null : 1 === c.length ? c[0] : c
};
cljs.reader.match_int = function(a) {
  var b = cljs.reader.re_find_STAR_(cljs.reader.int_pattern, a), c = b[2];
  if(cljs.core.not(function() {
    var a = null == c;
    return a ? a : 1 > c.length
  }())) {
    return 0
  }
  var a = "-" === b[1] ? -1 : 1, d = cljs.core.truth_(b[3]) ? [b[3], 10] : cljs.core.truth_(b[4]) ? [b[4], 16] : cljs.core.truth_(b[5]) ? [b[5], 8] : cljs.core.truth_(b[7]) ? [b[7], parseInt(b[7])] : [null, null], b = d[0], d = d[1];
  return null == b ? null : a * parseInt(b, d)
};
cljs.reader.match_ratio = function(a) {
  var a = cljs.reader.re_find_STAR_(cljs.reader.ratio_pattern, a), b = a[2];
  return parseInt(a[1]) / parseInt(b)
};
cljs.reader.match_float = function(a) {
  return parseFloat(a)
};
cljs.reader.re_matches_STAR_ = function(a, b) {
  var c = a.exec(b);
  return cljs.core.truth_(function() {
    var a = null != c;
    return a ? c[0] === b : a
  }()) ? 1 === c.length ? c[0] : c : null
};
cljs.reader.match_number = function(a) {
  return cljs.core.truth_(cljs.reader.re_matches_STAR_(cljs.reader.int_pattern, a)) ? cljs.reader.match_int(a) : cljs.core.truth_(cljs.reader.re_matches_STAR_(cljs.reader.ratio_pattern, a)) ? cljs.reader.match_ratio(a) : cljs.core.truth_(cljs.reader.re_matches_STAR_(cljs.reader.float_pattern, a)) ? cljs.reader.match_float(a) : null
};
cljs.reader.escape_char_map = function(a) {
  return"t" === a ? "\t" : "r" === a ? "\r" : "n" === a ? "\n" : "\\" === a ? "\\" : '"' === a ? '"' : "b" === a ? "\b" : "f" === a ? "\f" : null
};
cljs.reader.read_2_chars = function(a) {
  return(new goog.string.StringBuffer(cljs.reader.read_char(a), cljs.reader.read_char(a))).toString()
};
cljs.reader.read_4_chars = function(a) {
  return(new goog.string.StringBuffer(cljs.reader.read_char(a), cljs.reader.read_char(a), cljs.reader.read_char(a), cljs.reader.read_char(a))).toString()
};
cljs.reader.unicode_2_pattern = cljs.core.re_pattern("[0-9A-Fa-f]{2}");
cljs.reader.unicode_4_pattern = cljs.core.re_pattern("[0-9A-Fa-f]{4}");
cljs.reader.validate_unicode_escape = function(a, b, c, d) {
  return cljs.core.truth_(cljs.core.re_matches(a, d)) ? d : cljs.reader.reader_error.cljs$lang$arity$variadic(b, cljs.core.array_seq(["Unexpected unicode escape \\", c, d], 0))
};
cljs.reader.make_unicode_char = function(a) {
  a = parseInt(a, 16);
  return String.fromCharCode(a)
};
cljs.reader.escape_char = function(a, b) {
  var c = cljs.reader.read_char(b), d = cljs.reader.escape_char_map(c);
  return cljs.core.truth_(d) ? d : "x" === c ? cljs.reader.make_unicode_char(cljs.reader.validate_unicode_escape(cljs.reader.unicode_2_pattern, b, c, cljs.reader.read_2_chars(b))) : "u" === c ? cljs.reader.make_unicode_char(cljs.reader.validate_unicode_escape(cljs.reader.unicode_4_pattern, b, c, cljs.reader.read_4_chars(b))) : cljs.reader.numeric_QMARK_(c) ? String.fromCharCode(c) : cljs.reader.reader_error.cljs$lang$arity$variadic(b, cljs.core.array_seq(["Unexpected unicode escape \\", c], 0))
};
cljs.reader.read_past = function(a, b) {
  for(var c = cljs.reader.read_char(b);;) {
    if(cljs.core.truth_(a.cljs$lang$arity$1 ? a.cljs$lang$arity$1(c) : a.call(null, c))) {
      c = cljs.reader.read_char(b)
    }else {
      return c
    }
  }
};
cljs.reader.read_delimited_list = function(a, b, c) {
  for(var d = cljs.core.transient$(cljs.core.PersistentVector.EMPTY);;) {
    var e = cljs.reader.read_past(cljs.reader.whitespace_QMARK_, b);
    cljs.core.truth_(e) || cljs.reader.reader_error.cljs$lang$arity$variadic(b, cljs.core.array_seq(["EOF while reading"], 0));
    if(a === e) {
      return cljs.core.persistent_BANG_(d)
    }
    var f = cljs.reader.macros.cljs$lang$arity$1 ? cljs.reader.macros.cljs$lang$arity$1(e) : cljs.reader.macros.call(null, e);
    cljs.core.truth_(f) ? e = f.cljs$lang$arity$2 ? f.cljs$lang$arity$2(b, e) : f.call(null, b, e) : (cljs.reader.unread(b, e), e = cljs.reader.read.cljs$lang$arity$4 ? cljs.reader.read.cljs$lang$arity$4(b, !0, null, c) : cljs.reader.read.call(null, b, !0, null, c));
    d = e === b ? d : cljs.core.conj_BANG_(d, e)
  }
};
cljs.reader.not_implemented = function(a, b) {
  return cljs.reader.reader_error.cljs$lang$arity$variadic(a, cljs.core.array_seq(["Reader for ", b, " not implemented yet"], 0))
};
cljs.reader.maybe_read_tagged_type = void 0;
cljs.reader.read_dispatch = function(a, b) {
  var c = cljs.reader.read_char(a), d = cljs.reader.dispatch_macros.cljs$lang$arity$1 ? cljs.reader.dispatch_macros.cljs$lang$arity$1(c) : cljs.reader.dispatch_macros.call(null, c);
  if(cljs.core.truth_(d)) {
    return d.cljs$lang$arity$2 ? d.cljs$lang$arity$2(a, b) : d.call(null, a, b)
  }
  d = cljs.reader.maybe_read_tagged_type.cljs$lang$arity$2 ? cljs.reader.maybe_read_tagged_type.cljs$lang$arity$2(a, c) : cljs.reader.maybe_read_tagged_type.call(null, a, c);
  return cljs.core.truth_(d) ? d : cljs.reader.reader_error.cljs$lang$arity$variadic(a, cljs.core.array_seq(["No dispatch macro for ", c], 0))
};
cljs.reader.read_unmatched_delimiter = function(a, b) {
  return cljs.reader.reader_error.cljs$lang$arity$variadic(a, cljs.core.array_seq(["Unmached delimiter ", b], 0))
};
cljs.reader.read_list = function(a) {
  return cljs.core.apply.cljs$lang$arity$2(cljs.core.list, cljs.reader.read_delimited_list(")", a, !0))
};
cljs.reader.read_comment = cljs.reader.skip_line;
cljs.reader.read_vector = function(a) {
  return cljs.reader.read_delimited_list("]", a, !0)
};
cljs.reader.read_map = function(a) {
  var b = cljs.reader.read_delimited_list("}", a, !0);
  cljs.core.odd_QMARK_(cljs.core.count(b)) && cljs.reader.reader_error.cljs$lang$arity$variadic(a, cljs.core.array_seq(["Map literal must contain an even number of forms"], 0));
  return cljs.core.apply.cljs$lang$arity$2(cljs.core.hash_map, b)
};
cljs.reader.read_number = function(a, b) {
  for(var c = new goog.string.StringBuffer(b), d = cljs.reader.read_char(a);;) {
    if(cljs.core.truth_(function() {
      var a = null == d;
      return a ? a : (a = cljs.reader.whitespace_QMARK_(d)) ? a : cljs.reader.macros.cljs$lang$arity$1 ? cljs.reader.macros.cljs$lang$arity$1(d) : cljs.reader.macros.call(null, d)
    }())) {
      cljs.reader.unread(a, d);
      var e = c.toString(), c = cljs.reader.match_number(e);
      return cljs.core.truth_(c) ? c : cljs.reader.reader_error.cljs$lang$arity$variadic(a, cljs.core.array_seq(["Invalid number format [", e, "]"], 0))
    }
    c.append(d);
    d = e = cljs.reader.read_char(a)
  }
};
cljs.reader.read_string_STAR_ = function(a) {
  for(var b = new goog.string.StringBuffer, c = cljs.reader.read_char(a);;) {
    if(null == c) {
      return cljs.reader.reader_error.cljs$lang$arity$variadic(a, cljs.core.array_seq(["EOF while reading"], 0))
    }
    if("\\" === c) {
      b.append(cljs.reader.escape_char(b, a))
    }else {
      if('"' === c) {
        return b.toString()
      }
      b.append(c)
    }
    c = cljs.reader.read_char(a)
  }
};
cljs.reader.special_symbols = function(a, b) {
  return"nil" === a ? null : "true" === a ? !0 : "false" === a ? !1 : b
};
cljs.reader.read_symbol = function(a, b) {
  var c = cljs.reader.read_token(a, b);
  return cljs.core.truth_(goog.string.contains(c, "/")) ? cljs.core.symbol.cljs$lang$arity$2(cljs.core.subs.cljs$lang$arity$3(c, 0, c.indexOf("/")), cljs.core.subs.cljs$lang$arity$3(c, c.indexOf("/") + 1, c.length)) : cljs.reader.special_symbols(c, cljs.core.symbol.cljs$lang$arity$1(c))
};
cljs.reader.read_keyword = function(a) {
  var b = cljs.reader.read_token(a, cljs.reader.read_char(a)), b = cljs.reader.re_matches_STAR_(cljs.reader.symbol_pattern, b), c = b[0], d = b[1], e = b[2];
  return cljs.core.truth_(function() {
    var a;
    a = (a = void 0 !== d) ? ":/" === d.substring(d.length - 2, d.length) : a;
    return cljs.core.truth_(a) ? a : (a = ":" === e[e.length - 1]) ? a : -1 !== c.indexOf("::", 1)
  }()) ? cljs.reader.reader_error.cljs$lang$arity$variadic(a, cljs.core.array_seq(["Invalid token: ", c], 0)) : cljs.core.truth_(function() {
    var a = null != d;
    return a ? 0 < d.length : a
  }()) ? cljs.core.keyword.cljs$lang$arity$2(d.substring(0, d.indexOf("/")), e) : cljs.core.keyword.cljs$lang$arity$1(c)
};
cljs.reader.desugar_meta = function(a) {
  return cljs.core.symbol_QMARK_(a) ? cljs.core.ObjMap.fromObject(["\ufdd0:tag"], {"\ufdd0:tag":a}) : cljs.core.string_QMARK_(a) ? cljs.core.ObjMap.fromObject(["\ufdd0:tag"], {"\ufdd0:tag":a}) : cljs.core.keyword_QMARK_(a) ? cljs.core.PersistentArrayMap.fromArrays([a], [!0]) : a
};
cljs.reader.wrapping_reader = function(a) {
  return function(b) {
    return cljs.core.list.cljs$lang$arity$2(a, cljs.reader.read.cljs$lang$arity$4 ? cljs.reader.read.cljs$lang$arity$4(b, !0, null, !0) : cljs.reader.read.call(null, b, !0, null, !0))
  }
};
cljs.reader.throwing_reader = function(a) {
  return function(b) {
    return cljs.reader.reader_error.cljs$lang$arity$variadic(b, cljs.core.array_seq([a], 0))
  }
};
cljs.reader.read_meta = function(a) {
  var b = cljs.reader.desugar_meta(cljs.reader.read.cljs$lang$arity$4 ? cljs.reader.read.cljs$lang$arity$4(a, !0, null, !0) : cljs.reader.read.call(null, a, !0, null, !0));
  cljs.core.map_QMARK_(b) || cljs.reader.reader_error.cljs$lang$arity$variadic(a, cljs.core.array_seq(["Metadata must be Symbol,Keyword,String or Map"], 0));
  var c = cljs.reader.read.cljs$lang$arity$4 ? cljs.reader.read.cljs$lang$arity$4(a, !0, null, !0) : cljs.reader.read.call(null, a, !0, null, !0);
  return cljs.core.truth_(c ? cljs.core.truth_(function() {
    var a = c.cljs$lang$protocol_mask$partition0$ & 262144;
    return a ? a : c.cljs$core$IWithMeta$
  }()) ? !0 : c.cljs$lang$protocol_mask$partition0$ ? !1 : cljs.core.type_satisfies_(cljs.core.IWithMeta, c) : cljs.core.type_satisfies_(cljs.core.IWithMeta, c)) ? cljs.core.with_meta(c, cljs.core.merge.cljs$lang$arity$variadic(cljs.core.array_seq([cljs.core.meta(c), b], 0))) : cljs.reader.reader_error.cljs$lang$arity$variadic(a, cljs.core.array_seq(["Metadata can only be applied to IWithMetas"], 0))
};
cljs.reader.read_set = function(a) {
  return cljs.core.set(cljs.reader.read_delimited_list("}", a, !0))
};
cljs.reader.read_regex = function(a, b) {
  return cljs.core.re_pattern(cljs.reader.read_string_STAR_(a, b))
};
cljs.reader.read_discard = function(a) {
  cljs.reader.read.cljs$lang$arity$4 ? cljs.reader.read.cljs$lang$arity$4(a, !0, null, !0) : cljs.reader.read.call(null, a, !0, null, !0);
  return a
};
cljs.reader.macros = function(a) {
  return'"' === a ? cljs.reader.read_string_STAR_ : ":" === a ? cljs.reader.read_keyword : ";" === a ? cljs.reader.not_implemented : "'" === a ? cljs.reader.wrapping_reader("\ufdd1'quote") : "@" === a ? cljs.reader.wrapping_reader("\ufdd1'deref") : "^" === a ? cljs.reader.read_meta : "`" === a ? cljs.reader.not_implemented : "~" === a ? cljs.reader.not_implemented : "(" === a ? cljs.reader.read_list : ")" === a ? cljs.reader.read_unmatched_delimiter : "[" === a ? cljs.reader.read_vector : "]" === 
  a ? cljs.reader.read_unmatched_delimiter : "{" === a ? cljs.reader.read_map : "}" === a ? cljs.reader.read_unmatched_delimiter : "\\" === a ? cljs.reader.read_char : "%" === a ? cljs.reader.not_implemented : "#" === a ? cljs.reader.read_dispatch : null
};
cljs.reader.dispatch_macros = function(a) {
  return"{" === a ? cljs.reader.read_set : "<" === a ? cljs.reader.throwing_reader("Unreadable form") : '"' === a ? cljs.reader.read_regex : "!" === a ? cljs.reader.read_comment : "_" === a ? cljs.reader.read_discard : null
};
cljs.reader.read = function(a, b, c) {
  for(;;) {
    var d = cljs.reader.read_char(a);
    if(null == d) {
      return cljs.core.truth_(b) ? cljs.reader.reader_error.cljs$lang$arity$variadic(a, cljs.core.array_seq(["EOF while reading"], 0)) : c
    }
    if(!cljs.reader.whitespace_QMARK_(d)) {
      if(cljs.reader.comment_prefix_QMARK_(d)) {
        a = cljs.reader.read_comment.cljs$lang$arity$2 ? cljs.reader.read_comment.cljs$lang$arity$2(a, d) : cljs.reader.read_comment.call(null, a, d)
      }else {
        var e = cljs.reader.macros(d), d = cljs.core.truth_(e) ? e.cljs$lang$arity$2 ? e.cljs$lang$arity$2(a, d) : e.call(null, a, d) : cljs.reader.number_literal_QMARK_(a, d) ? cljs.reader.read_number(a, d) : cljs.reader.read_symbol(a, d);
        if(d !== a) {
          return d
        }
      }
    }
  }
};
cljs.reader.read_string = function(a) {
  a = cljs.reader.push_back_reader(a);
  return cljs.reader.read(a, !0, null, !1)
};
cljs.reader.zero_fill_right = function(a, b) {
  if(cljs.core._EQ_.cljs$lang$arity$2(b, cljs.core.count(a))) {
    return a
  }
  if(b < cljs.core.count(a)) {
    return a.substring(0, b)
  }
  for(var c = new goog.string.StringBuffer(a);;) {
    if(c.getLength() < b) {
      c = c.append("0")
    }else {
      return c.toString()
    }
  }
};
cljs.reader.divisible_QMARK_ = function(a, b) {
  return 0 === cljs.core.mod(a, b)
};
cljs.reader.indivisible_QMARK_ = function(a, b) {
  return cljs.core.not(cljs.reader.divisible_QMARK_(a, b))
};
cljs.reader.leap_year_QMARK_ = function(a) {
  var b = cljs.reader.divisible_QMARK_(a, 4);
  return cljs.core.truth_(b) ? (b = cljs.reader.indivisible_QMARK_(a, 100), cljs.core.truth_(b) ? b : cljs.reader.divisible_QMARK_(a, 400)) : b
};
cljs.reader.days_in_month = function() {
  var a = cljs.core.PersistentVector.fromArray([null, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], !0), b = cljs.core.PersistentVector.fromArray([null, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], !0);
  return function(c, d) {
    return cljs.core._lookup.cljs$lang$arity$3(cljs.core.truth_(d) ? b : a, c, null)
  }
}();
cljs.reader.parse_and_validate_timestamp = function() {
  var a = /(\d\d\d\d)(?:-(\d\d)(?:-(\d\d)(?:[T](\d\d)(?::(\d\d)(?::(\d\d)(?:[.](\d+))?)?)?)?)?)?(?:[Z]|([-+])(\d\d):(\d\d))?/, b = function(a, b, e, f) {
    if(!cljs.core.truth_(function() {
      var f = a <= b;
      return f ? b <= e : f
    }())) {
      throw Error([cljs.core.str("Assert failed: "), cljs.core.str([cljs.core.str(f), cljs.core.str(" Failed:  "), cljs.core.str(a), cljs.core.str("<="), cljs.core.str(b), cljs.core.str("<="), cljs.core.str(e)].join("")), cljs.core.str("\n"), cljs.core.str(cljs.core.pr_str.cljs$lang$arity$variadic(cljs.core.array_seq([cljs.core.with_meta(cljs.core.list("\ufdd1'<=", "\ufdd1'low", "\ufdd1'n", "\ufdd1'high"), cljs.core.hash_map("\ufdd0:line", 474, "\ufdd0:column", 25))], 0)))].join(""));
    }
    return b
  };
  return function(c) {
    var d = cljs.core.map.cljs$lang$arity$2(cljs.core.vec, cljs.core.split_at(8, cljs.core.re_matches(a, c)));
    if(cljs.core.truth_(d)) {
      var e = cljs.core.nth.cljs$lang$arity$3(d, 0, null);
      cljs.core.nth.cljs$lang$arity$3(e, 0, null);
      var c = cljs.core.nth.cljs$lang$arity$3(e, 1, null), f = cljs.core.nth.cljs$lang$arity$3(e, 2, null), g = cljs.core.nth.cljs$lang$arity$3(e, 3, null), h = cljs.core.nth.cljs$lang$arity$3(e, 4, null), i = cljs.core.nth.cljs$lang$arity$3(e, 5, null), j = cljs.core.nth.cljs$lang$arity$3(e, 6, null), e = cljs.core.nth.cljs$lang$arity$3(e, 7, null), l = cljs.core.nth.cljs$lang$arity$3(d, 1, null);
      cljs.core.nth.cljs$lang$arity$3(l, 0, null);
      cljs.core.nth.cljs$lang$arity$3(l, 1, null);
      cljs.core.nth.cljs$lang$arity$3(l, 2, null);
      var m = cljs.core.map.cljs$lang$arity$2(function(a) {
        return cljs.core.map.cljs$lang$arity$2(function(a) {
          return parseInt(a, 10)
        }, a)
      }, cljs.core.map.cljs$lang$arity$3(function(a, b) {
        return cljs.core.update_in(b, cljs.core.PersistentVector.fromArray([0], !0), a)
      }, cljs.core.PersistentVector.fromArray([cljs.core.constantly(null), function(a) {
        return cljs.core._EQ_.cljs$lang$arity$2(a, "-") ? "-1" : "1"
      }], !0), d)), k = cljs.core.nth.cljs$lang$arity$3(m, 0, null);
      cljs.core.nth.cljs$lang$arity$3(k, 0, null);
      var d = cljs.core.nth.cljs$lang$arity$3(k, 1, null), l = cljs.core.nth.cljs$lang$arity$3(k, 2, null), n = cljs.core.nth.cljs$lang$arity$3(k, 3, null), p = cljs.core.nth.cljs$lang$arity$3(k, 4, null), q = cljs.core.nth.cljs$lang$arity$3(k, 5, null), r = cljs.core.nth.cljs$lang$arity$3(k, 6, null), k = cljs.core.nth.cljs$lang$arity$3(k, 7, null), s = cljs.core.nth.cljs$lang$arity$3(m, 1, null), m = cljs.core.nth.cljs$lang$arity$3(s, 0, null), t = cljs.core.nth.cljs$lang$arity$3(s, 1, null), s = 
      cljs.core.nth.cljs$lang$arity$3(s, 2, null);
      return cljs.core.PersistentVector.fromArray([cljs.core.not(c) ? 1970 : d, cljs.core.not(f) ? 1 : b(1, l, 12, "timestamp month field must be in range 1..12"), cljs.core.not(g) ? 1 : b(1, n, cljs.reader.days_in_month.cljs$lang$arity$2 ? cljs.reader.days_in_month.cljs$lang$arity$2(l, cljs.reader.leap_year_QMARK_(d)) : cljs.reader.days_in_month.call(null, l, cljs.reader.leap_year_QMARK_(d)), "timestamp day field must be in range 1..last day in month"), cljs.core.not(h) ? 0 : b(0, p, 23, "timestamp hour field must be in range 0..23"), 
      cljs.core.not(i) ? 0 : b(0, q, 59, "timestamp minute field must be in range 0..59"), cljs.core.not(j) ? 0 : b(0, r, cljs.core._EQ_.cljs$lang$arity$2(q, 59) ? 60 : 59, "timestamp second field must be in range 0..60"), cljs.core.not(e) ? 0 : b(0, k, 999, "timestamp millisecond field must be in range 0..999"), m * (60 * t + s)], !0)
    }
    return null
  }
}();
cljs.reader.parse_timestamp = function(a) {
  var b = cljs.reader.parse_and_validate_timestamp.cljs$lang$arity$1 ? cljs.reader.parse_and_validate_timestamp.cljs$lang$arity$1(a) : cljs.reader.parse_and_validate_timestamp.call(null, a);
  if(cljs.core.truth_(b)) {
    var a = cljs.core.nth.cljs$lang$arity$3(b, 0, null), c = cljs.core.nth.cljs$lang$arity$3(b, 1, null), d = cljs.core.nth.cljs$lang$arity$3(b, 2, null), e = cljs.core.nth.cljs$lang$arity$3(b, 3, null), f = cljs.core.nth.cljs$lang$arity$3(b, 4, null), g = cljs.core.nth.cljs$lang$arity$3(b, 5, null), h = cljs.core.nth.cljs$lang$arity$3(b, 6, null), b = cljs.core.nth.cljs$lang$arity$3(b, 7, null);
    return new Date(Date.UTC(a, c - 1, d, e, f, g, h) - 6E4 * b)
  }
  return cljs.reader.reader_error.cljs$lang$arity$variadic(null, cljs.core.array_seq([[cljs.core.str("Unrecognized date/time syntax: "), cljs.core.str(a)].join("")], 0))
};
cljs.reader.read_date = function(a) {
  return cljs.core.string_QMARK_(a) ? cljs.reader.parse_timestamp(a) : cljs.reader.reader_error.cljs$lang$arity$variadic(null, cljs.core.array_seq(["Instance literal expects a string for its timestamp."], 0))
};
cljs.reader.read_queue = function(a) {
  return cljs.core.vector_QMARK_(a) ? cljs.core.into(cljs.core.PersistentQueue.EMPTY, a) : cljs.reader.reader_error.cljs$lang$arity$variadic(null, cljs.core.array_seq(["Queue literal expects a vector for its elements."], 0))
};
cljs.reader.read_uuid = function(a) {
  return cljs.core.string_QMARK_(a) ? new cljs.core.UUID(a) : cljs.reader.reader_error.cljs$lang$arity$variadic(null, cljs.core.array_seq(["UUID literal expects a string as its representation."], 0))
};
cljs.reader._STAR_tag_table_STAR_ = cljs.core.atom.cljs$lang$arity$1(cljs.core.ObjMap.fromObject(["inst", "uuid", "queue"], {inst:cljs.reader.read_date, uuid:cljs.reader.read_uuid, queue:cljs.reader.read_queue}));
cljs.reader._STAR_default_data_reader_fn_STAR_ = cljs.core.atom.cljs$lang$arity$1(null);
cljs.reader.maybe_read_tagged_type = function(a, b) {
  var c = cljs.reader.read_symbol(a, b), d = cljs.core._lookup.cljs$lang$arity$3(cljs.core.deref(cljs.reader._STAR_tag_table_STAR_), "" + cljs.core.str(c), null), e = cljs.core.deref(cljs.reader._STAR_default_data_reader_fn_STAR_);
  return cljs.core.truth_(d) ? d.cljs$lang$arity$1 ? d.cljs$lang$arity$1(cljs.reader.read(a, !0, null, !1)) : d.call(null, cljs.reader.read(a, !0, null, !1)) : cljs.core.truth_(e) ? e.cljs$lang$arity$2 ? e.cljs$lang$arity$2(c, cljs.reader.read(a, !0, null, !1)) : e.call(null, c, cljs.reader.read(a, !0, null, !1)) : cljs.reader.reader_error.cljs$lang$arity$variadic(a, cljs.core.array_seq(["Could not find tag parser for ", "" + cljs.core.str(c), " in ", cljs.core.pr_str.cljs$lang$arity$variadic(cljs.core.array_seq([cljs.core.keys(cljs.core.deref(cljs.reader._STAR_tag_table_STAR_))], 
  0))], 0))
};
cljs.reader.register_tag_parser_BANG_ = function(a, b) {
  var c = "" + cljs.core.str(a), d = cljs.core._lookup.cljs$lang$arity$3(cljs.core.deref(cljs.reader._STAR_tag_table_STAR_), c, null);
  cljs.core.swap_BANG_.cljs$lang$arity$4(cljs.reader._STAR_tag_table_STAR_, cljs.core.assoc, c, b);
  return d
};
cljs.reader.deregister_tag_parser_BANG_ = function(a) {
  var a = "" + cljs.core.str(a), b = cljs.core._lookup.cljs$lang$arity$3(cljs.core.deref(cljs.reader._STAR_tag_table_STAR_), a, null);
  cljs.core.swap_BANG_.cljs$lang$arity$3(cljs.reader._STAR_tag_table_STAR_, cljs.core.dissoc, a);
  return b
};
cljs.reader.register_default_tag_parser_BANG_ = function(a) {
  var b = cljs.core.deref(cljs.reader._STAR_default_data_reader_fn_STAR_);
  cljs.core.swap_BANG_.cljs$lang$arity$2(cljs.reader._STAR_default_data_reader_fn_STAR_, function() {
    return a
  });
  return b
};
cljs.reader.deregister_default_tag_parser_BANG_ = function() {
  var a = cljs.core.deref(cljs.reader._STAR_default_data_reader_fn_STAR_);
  cljs.core.swap_BANG_.cljs$lang$arity$2(cljs.reader._STAR_default_data_reader_fn_STAR_, function() {
    return null
  });
  return a
};
var jayq = {util:{}};
jayq.util.wait = function(a, b) {
  return setTimeout(b, a)
};
jayq.util.log = function() {
  var a = function(a, b) {
    var e = cljs.core.string_QMARK_(a) ? cljs.core.apply.cljs$lang$arity$3(cljs.core.str, a, b) : a;
    console.log(e);
    return a
  }, b = function(b, d) {
    var e = null;
    goog.isDef(d) && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return a.call(this, b, e)
  };
  b.cljs$lang$maxFixedArity = 1;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), b = cljs.core.rest(b);
    return a(d, b)
  };
  b.cljs$lang$arity$variadic = a;
  return b
}();
var clojure = {string:{}};
clojure.string.seq_reverse = function(a) {
  return cljs.core.reduce.call(null, cljs.core.conj, cljs.core.List.EMPTY, a)
};
clojure.string.reverse = function(a) {
  return a.split("").reverse().join("")
};
clojure.string.replace = function(a, b, c) {
  if(cljs.core.string_QMARK_.call(null, b)) {
    return a.replace(RegExp(goog.string.regExpEscape(b), "g"), c)
  }
  if(cljs.core.truth_(b.hasOwnProperty("source"))) {
    return a.replace(RegExp(b.source, "g"), c)
  }
  throw[cljs.core.str("Invalid match arg: "), cljs.core.str(b)].join("");
};
clojure.string.replace_first = function(a, b, c) {
  return a.replace(b, c)
};
clojure.string.join = function() {
  var a = null, b = function(a) {
    return cljs.core.apply.call(null, cljs.core.str, a)
  }, c = function(a, b) {
    return cljs.core.apply.call(null, cljs.core.str, cljs.core.interpose.call(null, a, b))
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$1 = b;
  a.cljs$lang$arity$2 = c;
  return a
}();
clojure.string.upper_case = function(a) {
  return a.toUpperCase()
};
clojure.string.lower_case = function(a) {
  return a.toLowerCase()
};
clojure.string.capitalize = function(a) {
  return 2 > cljs.core.count.call(null, a) ? clojure.string.upper_case.call(null, a) : [cljs.core.str(clojure.string.upper_case.call(null, cljs.core.subs.call(null, a, 0, 1))), cljs.core.str(clojure.string.lower_case.call(null, cljs.core.subs.call(null, a, 1)))].join("")
};
clojure.string.split = function() {
  var a = null, b = function(a, b) {
    return cljs.core.vec.call(null, ("" + cljs.core.str(a)).split(b))
  }, c = function(a, b, c) {
    if(1 > c) {
      return cljs.core.vec.call(null, ("" + cljs.core.str(a)).split(b))
    }
    for(var g = cljs.core.PersistentVector.EMPTY;;) {
      if(cljs.core._EQ_.call(null, c, 1)) {
        return cljs.core.conj.call(null, g, a)
      }
      var h = cljs.core.re_find.call(null, b, a);
      if(cljs.core.truth_(h)) {
        var i = h, h = a.indexOf(i), i = a.substring(h + cljs.core.count.call(null, i)), c = c - 1, g = cljs.core.conj.call(null, g, a.substring(0, h)), a = i
      }else {
        return cljs.core.conj.call(null, g, a)
      }
    }
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$2 = b;
  a.cljs$lang$arity$3 = c;
  return a
}();
clojure.string.split_lines = function(a) {
  return clojure.string.split.call(null, a, /\n|\r\n/)
};
clojure.string.trim = function(a) {
  return goog.string.trim(a)
};
clojure.string.triml = function(a) {
  return goog.string.trimLeft(a)
};
clojure.string.trimr = function(a) {
  return goog.string.trimRight(a)
};
clojure.string.trim_newline = function(a) {
  for(var b = a.length;;) {
    if(0 === b) {
      return""
    }
    var c = cljs.core._lookup.call(null, a, b - 1, null);
    if(cljs.core.truth_(function() {
      var a = cljs.core._EQ_.call(null, c, "\n");
      return a ? a : cljs.core._EQ_.call(null, c, "\r")
    }())) {
      b -= 1
    }else {
      return a.substring(0, b)
    }
  }
};
clojure.string.blank_QMARK_ = function(a) {
  return goog.string.isEmptySafe(a)
};
clojure.string.escape = function(a, b) {
  for(var c = new goog.string.StringBuffer, d = a.length, e = 0;;) {
    if(cljs.core._EQ_.call(null, d, e)) {
      return c.toString()
    }
    var f = a.charAt(e), g = cljs.core._lookup.call(null, b, f, null);
    cljs.core.truth_(g) ? c.append("" + cljs.core.str(g)) : c.append(f);
    e += 1
  }
};
jayq.core = {};
jayq.core.crate_meta = function(a) {
  return a.prototype._crateGroup
};
jayq.core.__GT_selector = function(a) {
  if(cljs.core.string_QMARK_.call(null, a)) {
    return a
  }
  if(cljs.core.fn_QMARK_.call(null, a)) {
    var b = jayq.core.crate_meta.call(null, a);
    return cljs.core.truth_(b) ? [cljs.core.str("[crateGroup="), cljs.core.str(b), cljs.core.str("]")].join("") : a
  }
  return cljs.core.keyword_QMARK_.call(null, a) ? cljs.core.name.call(null, a) : a
};
jayq.core.$ = function() {
  var a = null, b = function(a) {
    return jQuery(jayq.core.__GT_selector.call(null, a))
  }, c = function(a, b) {
    return jQuery(jayq.core.__GT_selector.call(null, a), b)
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$1 = b;
  a.cljs$lang$arity$2 = c;
  return a
}();
jQuery.prototype.cljs$core$IFn$ = !0;
jQuery.prototype.call = function() {
  var a = null;
  return a = function(a, c, d) {
    switch(arguments.length) {
      case 2:
        return cljs.core._lookup.call(null, this, c);
      case 3:
        return cljs.core._lookup.call(null, this, c, d)
    }
    throw Error("Invalid arity: " + arguments.length);
  }
}();
jQuery.prototype.apply = function(a, b) {
  return a.call.apply(a, [a].concat(b.slice()))
};
jQuery.prototype.cljs$core$IReduce$ = !0;
jQuery.prototype.cljs$core$IReduce$_reduce$arity$2 = function(a, b) {
  return cljs.core.ci_reduce.call(null, a, b)
};
jQuery.prototype.cljs$core$IReduce$_reduce$arity$3 = function(a, b, c) {
  return cljs.core.ci_reduce.call(null, a, b, c)
};
jQuery.prototype.cljs$core$ILookup$ = !0;
jQuery.prototype.cljs$core$ILookup$_lookup$arity$2 = function(a, b) {
  var c = a.slice(b, b + 1);
  return cljs.core.truth_(c) ? c : null
};
jQuery.prototype.cljs$core$ILookup$_lookup$arity$3 = function(a, b, c) {
  return cljs.core._nth.call(null, a, b, c)
};
jQuery.prototype.cljs$core$ISequential$ = !0;
jQuery.prototype.cljs$core$IIndexed$ = !0;
jQuery.prototype.cljs$core$IIndexed$_nth$arity$2 = function(a, b) {
  return b < cljs.core.count.call(null, a) ? a.slice(b, b + 1) : null
};
jQuery.prototype.cljs$core$IIndexed$_nth$arity$3 = function(a, b, c) {
  return b < cljs.core.count.call(null, a) ? a.slice(b, b + 1) : void 0 === c ? null : c
};
jQuery.prototype.cljs$core$ICounted$ = !0;
jQuery.prototype.cljs$core$ICounted$_count$arity$1 = function(a) {
  return a.length
};
jQuery.prototype.cljs$core$ISeq$ = !0;
jQuery.prototype.cljs$core$ISeq$_first$arity$1 = function(a) {
  return a.get(0)
};
jQuery.prototype.cljs$core$ISeq$_rest$arity$1 = function(a) {
  return 1 < cljs.core.count.call(null, a) ? a.slice(1) : cljs.core.list.call(null)
};
jQuery.prototype.cljs$core$ISeqable$ = !0;
jQuery.prototype.cljs$core$ISeqable$_seq$arity$1 = function(a) {
  return cljs.core.truth_(a.get(0)) ? a : null
};
jayq.core.anim = function(a, b, c) {
  return a.animate(cljs.core.clj__GT_js.call(null, b), c)
};
jayq.core.text = function() {
  var a = null, b = function(a) {
    return a.text()
  }, a = function(a, d) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return a.text(d)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$1 = b;
  a.cljs$lang$arity$2 = function(a, b) {
    return a.text(b)
  };
  return a
}();
jayq.core.css = function() {
  var a = null, b = function(a, b) {
    return a.css(cljs.core.clj__GT_js.call(null, b))
  }, c = function(a, b, c) {
    return a.css(cljs.core.name.call(null, b), c)
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$2 = b;
  a.cljs$lang$arity$3 = c;
  return a
}();
jayq.core.attr = function() {
  var a = null, b = function(a, b) {
    return a.attr(cljs.core.clj__GT_js.call(null, b))
  }, c = function(a, b, c) {
    return a.attr(cljs.core.name.call(null, b), c)
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$2 = b;
  a.cljs$lang$arity$3 = c;
  return a
}();
jayq.core.prop = function() {
  var a = null, b = function(a, b) {
    return a.prop(cljs.core.clj__GT_js.call(null, b))
  }, c = function(a, b, c) {
    return a.prop(cljs.core.name.call(null, b), c)
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$2 = b;
  a.cljs$lang$arity$3 = c;
  return a
}();
jayq.core.remove_attr = function(a, b) {
  return a.removeAttr(cljs.core.name.call(null, b))
};
jayq.core.remove_prop = function(a, b) {
  return a.removeProp(cljs.core.name.call(null, b))
};
jayq.core.data = function() {
  var a = null, b = function(a, b) {
    return a.data(cljs.core.clj__GT_js.call(null, b))
  }, c = function(a, b, c) {
    return a.data(cljs.core.name.call(null, b), c)
  }, a = function(a, e, f) {
    switch(arguments.length) {
      case 2:
        return b.call(this, a, e);
      case 3:
        return c.call(this, a, e, f)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$2 = b;
  a.cljs$lang$arity$3 = c;
  return a
}();
jayq.core.add_class = function(a, b) {
  return a.addClass(cljs.core.name.call(null, b))
};
jayq.core.remove_class = function(a, b) {
  return a.removeClass(cljs.core.name.call(null, b))
};
jayq.core.toggle_class = function(a, b) {
  return a.toggleClass(cljs.core.name.call(null, b))
};
jayq.core.has_class = function(a, b) {
  return a.hasClass(cljs.core.name.call(null, b))
};
jayq.core.is = function(a, b) {
  return a.is(jayq.core.__GT_selector.call(null, b))
};
jayq.core.after = function(a, b) {
  return a.after(b)
};
jayq.core.before = function(a, b) {
  return a.before(b)
};
jayq.core.append = function(a, b) {
  return a.append(b)
};
jayq.core.prepend = function(a, b) {
  return a.prepend(b)
};
jayq.core.append_to = function(a, b) {
  return a.appendTo(jayq.core.__GT_selector.call(null, b))
};
jayq.core.prepend_to = function(a, b) {
  return a.prependTo(jayq.core.__GT_selector.call(null, b))
};
jayq.core.insert_before = function(a, b) {
  return a.insertBefore(jayq.core.__GT_selector.call(null, b))
};
jayq.core.insert_after = function(a, b) {
  return a.insertAfter(jayq.core.__GT_selector.call(null, b))
};
jayq.core.replace_with = function(a, b) {
  return a.replaceWith(b)
};
jayq.core.remove = function(a) {
  return a.remove()
};
jayq.core.hide = function() {
  var a = function(a, b) {
    var e = cljs.core.nth.call(null, b, 0, null), f = cljs.core.nth.call(null, b, 1, null);
    return a.hide(e, f)
  }, b = function(b, d) {
    var e = null;
    goog.isDef(d) && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return a.call(this, b, e)
  };
  b.cljs$lang$maxFixedArity = 1;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), b = cljs.core.rest(b);
    return a(d, b)
  };
  b.cljs$lang$arity$variadic = a;
  return b
}();
jayq.core.show = function() {
  var a = function(a, b) {
    var e = cljs.core.nth.call(null, b, 0, null), f = cljs.core.nth.call(null, b, 1, null);
    return a.show(e, f)
  }, b = function(b, d) {
    var e = null;
    goog.isDef(d) && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return a.call(this, b, e)
  };
  b.cljs$lang$maxFixedArity = 1;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), b = cljs.core.rest(b);
    return a(d, b)
  };
  b.cljs$lang$arity$variadic = a;
  return b
}();
jayq.core.toggle = function() {
  var a = function(a, b) {
    var e = cljs.core.nth.call(null, b, 0, null), f = cljs.core.nth.call(null, b, 1, null);
    return a.toggle(e, f)
  }, b = function(b, d) {
    var e = null;
    goog.isDef(d) && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return a.call(this, b, e)
  };
  b.cljs$lang$maxFixedArity = 1;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), b = cljs.core.rest(b);
    return a(d, b)
  };
  b.cljs$lang$arity$variadic = a;
  return b
}();
jayq.core.fade_out = function() {
  var a = function(a, b) {
    var e = cljs.core.nth.call(null, b, 0, null), f = cljs.core.nth.call(null, b, 1, null);
    return a.fadeOut(e, f)
  }, b = function(b, d) {
    var e = null;
    goog.isDef(d) && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return a.call(this, b, e)
  };
  b.cljs$lang$maxFixedArity = 1;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), b = cljs.core.rest(b);
    return a(d, b)
  };
  b.cljs$lang$arity$variadic = a;
  return b
}();
jayq.core.fade_in = function() {
  var a = function(a, b) {
    var e = cljs.core.nth.call(null, b, 0, null), f = cljs.core.nth.call(null, b, 1, null);
    return a.fadeIn(e, f)
  }, b = function(b, d) {
    var e = null;
    goog.isDef(d) && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return a.call(this, b, e)
  };
  b.cljs$lang$maxFixedArity = 1;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), b = cljs.core.rest(b);
    return a(d, b)
  };
  b.cljs$lang$arity$variadic = a;
  return b
}();
jayq.core.slide_up = function() {
  var a = function(a, b) {
    var e = cljs.core.nth.call(null, b, 0, null), f = cljs.core.nth.call(null, b, 1, null);
    return a.slideUp(e, f)
  }, b = function(b, d) {
    var e = null;
    goog.isDef(d) && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return a.call(this, b, e)
  };
  b.cljs$lang$maxFixedArity = 1;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), b = cljs.core.rest(b);
    return a(d, b)
  };
  b.cljs$lang$arity$variadic = a;
  return b
}();
jayq.core.slide_down = function() {
  var a = function(a, b) {
    var e = cljs.core.nth.call(null, b, 0, null), f = cljs.core.nth.call(null, b, 1, null);
    return a.slideDown(e, f)
  }, b = function(b, d) {
    var e = null;
    goog.isDef(d) && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return a.call(this, b, e)
  };
  b.cljs$lang$maxFixedArity = 1;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), b = cljs.core.rest(b);
    return a(d, b)
  };
  b.cljs$lang$arity$variadic = a;
  return b
}();
jayq.core.siblings = function() {
  var a = null, b = function(a) {
    return a.siblings()
  }, c = function(a, b) {
    return a.siblings(cljs.core.name.call(null, b))
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$1 = b;
  a.cljs$lang$arity$2 = c;
  return a
}();
jayq.core.parent = function(a) {
  return a.parent()
};
jayq.core.parents = function() {
  var a = null, b = function(a) {
    return a.parents()
  }, c = function(a, b) {
    return a.parents(cljs.core.name.call(null, b))
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$1 = b;
  a.cljs$lang$arity$2 = c;
  return a
}();
jayq.core.parents_until = function() {
  var a = null, b = function(a) {
    return a.parentsUntil()
  }, c = function(a, b) {
    return a.parentsUntil(jayq.core.__GT_selector.call(null, b))
  }, d = function(a, b, c) {
    return a.parentsUntil(jayq.core.__GT_selector.call(null, b), cljs.core.name.call(null, c))
  }, a = function(a, f, g) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, f);
      case 3:
        return d.call(this, a, f, g)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$1 = b;
  a.cljs$lang$arity$2 = c;
  a.cljs$lang$arity$3 = d;
  return a
}();
jayq.core.children = function() {
  var a = null, b = function(a) {
    return a.children()
  }, c = function(a, b) {
    return a.children(cljs.core.name.call(null, b))
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$1 = b;
  a.cljs$lang$arity$2 = c;
  return a
}();
jayq.core.next = function() {
  var a = null, b = function(a) {
    return a.next()
  }, c = function(a, b) {
    return a.next(cljs.core.name.call(null, b))
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$1 = b;
  a.cljs$lang$arity$2 = c;
  return a
}();
jayq.core.prev = function() {
  var a = null, b = function(a) {
    return a.prev()
  }, c = function(a, b) {
    return a.prev(cljs.core.name.call(null, b))
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$1 = b;
  a.cljs$lang$arity$2 = c;
  return a
}();
jayq.core.next_all = function() {
  var a = null, b = function(a) {
    return a.nextAll()
  }, c = function(a, b) {
    return a.nextAll(cljs.core.name.call(null, b))
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$1 = b;
  a.cljs$lang$arity$2 = c;
  return a
}();
jayq.core.prev_all = function() {
  var a = null, b = function(a) {
    return a.prevAll()
  }, c = function(a, b) {
    return a.prevAll(cljs.core.name.call(null, b))
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$1 = b;
  a.cljs$lang$arity$2 = c;
  return a
}();
jayq.core.next_until = function() {
  var a = null, b = function(a) {
    return a.nextUntil()
  }, c = function(a, b) {
    return a.nextUntil(jayq.core.__GT_selector.call(null, b))
  }, d = function(a, b, c) {
    return a.nextUntil(jayq.core.__GT_selector.call(null, b), cljs.core.name.call(null, c))
  }, a = function(a, f, g) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, f);
      case 3:
        return d.call(this, a, f, g)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$1 = b;
  a.cljs$lang$arity$2 = c;
  a.cljs$lang$arity$3 = d;
  return a
}();
jayq.core.prev_until = function() {
  var a = null, b = function(a) {
    return a.prevUntil()
  }, c = function(a, b) {
    return a.prevUntil(jayq.core.__GT_selector.call(null, b))
  }, d = function(a, b, c) {
    return a.prevUntil(jayq.core.__GT_selector.call(null, b), cljs.core.name.call(null, c))
  }, a = function(a, f, g) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, f);
      case 3:
        return d.call(this, a, f, g)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$1 = b;
  a.cljs$lang$arity$2 = c;
  a.cljs$lang$arity$3 = d;
  return a
}();
jayq.core.find = function(a, b) {
  return a.find(cljs.core.name.call(null, b))
};
jayq.core.closest = function() {
  var a = function(a, b, e) {
    e = cljs.core.nth.call(null, e, 0, null);
    return a.closest(jayq.core.__GT_selector.call(null, b), e)
  }, b = function(b, d, e) {
    var f = null;
    goog.isDef(e) && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return a.call(this, b, d, f)
  };
  b.cljs$lang$maxFixedArity = 2;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), e = cljs.core.first(cljs.core.next(b)), b = cljs.core.rest(cljs.core.next(b));
    return a(d, e, b)
  };
  b.cljs$lang$arity$variadic = a;
  return b
}();
jayq.core.clone = function(a) {
  return a.clone()
};
jayq.core.inner = function() {
  var a = null, b = function(a) {
    return a.html()
  }, a = function(a, d) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return a.html(d)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$1 = b;
  a.cljs$lang$arity$2 = function(a, b) {
    return a.html(b)
  };
  return a
}();
jayq.core.empty = function(a) {
  return a.empty()
};
jayq.core.val = function() {
  var a = null, b = function(a) {
    return a.val()
  }, a = function(a, d) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return a.val(d)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$1 = b;
  a.cljs$lang$arity$2 = function(a, b) {
    return a.val(b)
  };
  return a
}();
jayq.core.serialize = function(a) {
  return a.serialize()
};
jayq.core.queue = function() {
  var a = null, b = function(a) {
    return a.queue()
  }, a = function(a, d, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return a.queue(d);
      case 3:
        return a.queue(d, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$1 = b;
  a.cljs$lang$arity$2 = function(a, b) {
    return a.queue(b)
  };
  a.cljs$lang$arity$3 = function(a, b, e) {
    return a.queue(b, e)
  };
  return a
}();
jayq.core.dequeue = function() {
  var a = null, b = function(a) {
    return a.dequeue()
  }, a = function(a, d) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return a.dequeue(d)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$1 = b;
  a.cljs$lang$arity$2 = function(a, b) {
    return a.dequeue(b)
  };
  return a
}();
jayq.core.document_ready = function(a) {
  return jayq.core.$.call(null, document).ready(a)
};
jayq.core.mimetype_converter = function(a) {
  return cljs.reader.read_string.call(null, "" + cljs.core.str(a))
};
jQuery.ajaxSetup(cljs.core.clj__GT_js.call(null, cljs.core.ObjMap.fromObject(["\ufdd0:accepts", "\ufdd0:contents", "\ufdd0:converters"], {"\ufdd0:accepts":cljs.core.ObjMap.fromObject(["\ufdd0:edn", "\ufdd0:clojure"], {"\ufdd0:edn":"application/edn, text/edn", "\ufdd0:clojure":"application/clojure, text/clojure"}), "\ufdd0:contents":cljs.core.ObjMap.fromObject(["clojure"], {clojure:/edn|clojure/}), "\ufdd0:converters":cljs.core.ObjMap.fromObject(["text edn", "text clojure"], {"text edn":jayq.core.mimetype_converter, 
"text clojure":jayq.core.mimetype_converter})})));
jayq.core.clj_content_type_QMARK_ = function(a) {
  return cljs.core.re_find.call(null, /^(text|application)\/(clojure|edn)/, a)
};
jayq.core.__GT_content_type = function(a) {
  return cljs.core.string_QMARK_.call(null, a) ? a : cljs.core.keyword_QMARK_.call(null, a) ? cljs.core.subs.call(null, "" + cljs.core.str(a), 1) : null
};
jayq.core.preprocess_request = function(a) {
  var a = cljs.core.seq_QMARK_.call(null, a) ? cljs.core.apply.call(null, cljs.core.hash_map, a) : a, b = cljs.core._lookup.call(null, a, "\ufdd0:contentType", null), c = cljs.core._lookup.call(null, a, "\ufdd0:data", null), d = jayq.core.__GT_content_type.call(null, b);
  return function(a) {
    return cljs.core.truth_(jayq.core.clj_content_type_QMARK_.call(null, d)) ? cljs.core.assoc.call(null, a, "\ufdd0:data", cljs.core.pr_str.call(null, c)) : a
  }.call(null, function(a) {
    return cljs.core.truth_(d) ? cljs.core.assoc.call(null, a, "\ufdd0:contentType", d) : a
  }.call(null, a))
};
jayq.core.__GT_ajax_settings = function(a) {
  return cljs.core.clj__GT_js.call(null, jayq.core.preprocess_request.call(null, a))
};
jayq.core.ajax = function() {
  var a = null, b = function(a) {
    return jQuery.ajax(jayq.core.__GT_ajax_settings.call(null, a))
  }, c = function(a, b) {
    return jQuery.ajax(a, jayq.core.__GT_ajax_settings.call(null, b))
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$1 = b;
  a.cljs$lang$arity$2 = c;
  return a
}();
jayq.core.xhr = function(a, b, c) {
  var d = cljs.core.nth.call(null, a, 0, null), a = cljs.core.nth.call(null, a, 1, null), b = cljs.core.clj__GT_js.call(null, cljs.core.ObjMap.fromObject(["\ufdd0:type", "\ufdd0:data", "\ufdd0:success"], {"\ufdd0:type":clojure.string.upper_case.call(null, cljs.core.name.call(null, d)), "\ufdd0:data":cljs.core.clj__GT_js.call(null, b), "\ufdd0:success":c}));
  return jQuery.ajax(a, b)
};
jayq.core.read = function(a) {
  return cljs.reader.read_string.call(null, jayq.core.inner.call(null, a))
};
jayq.core.bind = function(a, b, c) {
  return a.bind(cljs.core.name.call(null, b), c)
};
jayq.core.unbind = function() {
  var a = function(a, b, e) {
    e = cljs.core.nth.call(null, e, 0, null);
    return a.unbind(cljs.core.name.call(null, b), e)
  }, b = function(b, d, e) {
    var f = null;
    goog.isDef(e) && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return a.call(this, b, d, f)
  };
  b.cljs$lang$maxFixedArity = 2;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), e = cljs.core.first(cljs.core.next(b)), b = cljs.core.rest(cljs.core.next(b));
    return a(d, e, b)
  };
  b.cljs$lang$arity$variadic = a;
  return b
}();
jayq.core.trigger = function(a, b) {
  return a.trigger(cljs.core.name.call(null, b))
};
jayq.core.delegate = function(a, b, c, d) {
  return a.delegate(jayq.core.__GT_selector.call(null, b), cljs.core.name.call(null, c), d)
};
jayq.core.__GT_event = function(a) {
  return cljs.core.coll_QMARK_.call(null, a) ? clojure.string.join.call(null, " ", cljs.core.map.call(null, cljs.core.name, a)) : cljs.core.clj__GT_js.call(null, a)
};
jayq.core.on = function() {
  var a = function(a, b, e) {
    var f = cljs.core.nth.call(null, e, 0, null), g = cljs.core.nth.call(null, e, 1, null), e = cljs.core.nth.call(null, e, 2, null);
    return a.on(jayq.core.__GT_event.call(null, b), jayq.core.__GT_selector.call(null, f), g, e)
  }, b = function(b, d, e) {
    var f = null;
    goog.isDef(e) && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return a.call(this, b, d, f)
  };
  b.cljs$lang$maxFixedArity = 2;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), e = cljs.core.first(cljs.core.next(b)), b = cljs.core.rest(cljs.core.next(b));
    return a(d, e, b)
  };
  b.cljs$lang$arity$variadic = a;
  return b
}();
jayq.core.one = function() {
  var a = function(a, b, e) {
    var f = cljs.core.nth.call(null, e, 0, null), g = cljs.core.nth.call(null, e, 1, null), e = cljs.core.nth.call(null, e, 2, null);
    return a.one(jayq.core.__GT_event.call(null, b), jayq.core.__GT_selector.call(null, f), g, e)
  }, b = function(b, d, e) {
    var f = null;
    goog.isDef(e) && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return a.call(this, b, d, f)
  };
  b.cljs$lang$maxFixedArity = 2;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), e = cljs.core.first(cljs.core.next(b)), b = cljs.core.rest(cljs.core.next(b));
    return a(d, e, b)
  };
  b.cljs$lang$arity$variadic = a;
  return b
}();
jayq.core.off = function() {
  var a = function(a, b, e) {
    var f = cljs.core.nth.call(null, e, 0, null), e = cljs.core.nth.call(null, e, 1, null);
    return a.off(jayq.core.__GT_event.call(null, b), jayq.core.__GT_selector.call(null, f), e)
  }, b = function(b, d, e) {
    var f = null;
    goog.isDef(e) && (f = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0));
    return a.call(this, b, d, f)
  };
  b.cljs$lang$maxFixedArity = 2;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), e = cljs.core.first(cljs.core.next(b)), b = cljs.core.rest(cljs.core.next(b));
    return a(d, e, b)
  };
  b.cljs$lang$arity$variadic = a;
  return b
}();
jayq.core.prevent = function(a) {
  return a.preventDefault()
};
jayq.core.height = function() {
  var a = null, b = function(a) {
    return a.height()
  }, a = function(a, d) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return a.height(d)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$1 = b;
  a.cljs$lang$arity$2 = function(a, b) {
    return a.height(b)
  };
  return a
}();
jayq.core.width = function() {
  var a = null, b = function(a) {
    return a.width()
  }, a = function(a, d) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return a.width(d)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$1 = b;
  a.cljs$lang$arity$2 = function(a, b) {
    return a.width(b)
  };
  return a
}();
jayq.core.inner_height = function(a) {
  return a.innerHeight()
};
jayq.core.inner_width = function(a) {
  return a.innerWidth()
};
jayq.core.outer_height = function(a) {
  return a.outerHeight()
};
jayq.core.outer_width = function(a) {
  return a.outerWidth()
};
jayq.core.offset = function() {
  var a = null, b = function(a) {
    return cljs.core.js__GT_clj.call(null, a.offset(), "\ufdd0:keywordize-keys", !0)
  }, c = function(a, b) {
    return cljs.core.clj__GT_js.call(null, b).offset()
  }, a = function(a, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return c.call(this, a, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$1 = b;
  a.cljs$lang$arity$2 = c;
  return a
}();
jayq.core.offset_parent = function(a) {
  return a.offsetParent()
};
jayq.core.position = function(a) {
  return cljs.core.js__GT_clj.call(null, a.position(), "\ufdd0:keywordize-keys", !0)
};
jayq.core.scroll_left = function() {
  var a = null, b = function(a) {
    return a.scrollLeft()
  }, a = function(a, d) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return a.scrollLeft(d)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$1 = b;
  a.cljs$lang$arity$2 = function(a, b) {
    return a.scrollLeft(b)
  };
  return a
}();
jayq.core.scroll_top = function() {
  var a = null, b = function(a) {
    return a.scrollTop()
  }, a = function(a, d) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return a.scrollTop(d)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$1 = b;
  a.cljs$lang$arity$2 = function(a, b) {
    return a.scrollTop(b)
  };
  return a
}();
jayq.core.$deferred = $.Deferred;
jayq.core.$when = $.when;
jayq.core.then = function() {
  var a = null, b = function(a, b, c) {
    return a.then(cljs.core.clj__GT_js.call(null, b), cljs.core.clj__GT_js.call(null, c))
  }, c = function(a, b, c, g) {
    return a.then(cljs.core.clj__GT_js.call(null, b), cljs.core.clj__GT_js.call(null, c), cljs.core.clj__GT_js.call(null, g))
  }, a = function(a, e, f, g) {
    switch(arguments.length) {
      case 3:
        return b.call(this, a, e, f);
      case 4:
        return c.call(this, a, e, f, g)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$3 = b;
  a.cljs$lang$arity$4 = c;
  return a
}();
jayq.core.done = function() {
  var a = function(a, b) {
    return a.done.apply(a, cljs.core.clj__GT_js.call(null, b))
  }, b = function(b, d) {
    var e = null;
    goog.isDef(d) && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return a.call(this, b, e)
  };
  b.cljs$lang$maxFixedArity = 1;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), b = cljs.core.rest(b);
    return a(d, b)
  };
  b.cljs$lang$arity$variadic = a;
  return b
}();
jayq.core.fail = function() {
  var a = function(a, b) {
    return a.fail.apply(a, cljs.core.clj__GT_js.call(null, b))
  }, b = function(b, d) {
    var e = null;
    goog.isDef(d) && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return a.call(this, b, e)
  };
  b.cljs$lang$maxFixedArity = 1;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), b = cljs.core.rest(b);
    return a(d, b)
  };
  b.cljs$lang$arity$variadic = a;
  return b
}();
jayq.core.progress = function(a, b) {
  return a.progress(cljs.core.clj__GT_js.call(null, b))
};
jayq.core.promise = function() {
  var a = null, b = function(a) {
    return a.promise()
  }, a = function(a, d, e) {
    switch(arguments.length) {
      case 1:
        return b.call(this, a);
      case 2:
        return a.promise(d);
      case 3:
        return a.promise(d, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$1 = b;
  a.cljs$lang$arity$2 = function(a, b) {
    return a.promise(b)
  };
  a.cljs$lang$arity$3 = function(a, b, e) {
    return a.promise(b, e)
  };
  return a
}();
jayq.core.always = function() {
  var a = function(a, b) {
    return a.always.apply(a, cljs.core.clj__GT_js.call(null, b))
  }, b = function(b, d) {
    var e = null;
    goog.isDef(d) && (e = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0));
    return a.call(this, b, e)
  };
  b.cljs$lang$maxFixedArity = 1;
  b.cljs$lang$applyTo = function(b) {
    var d = cljs.core.first(b), b = cljs.core.rest(b);
    return a(d, b)
  };
  b.cljs$lang$arity$variadic = a;
  return b
}();
jayq.core.reject = function(a, b) {
  return a.reject(b)
};
jayq.core.reject_with = function(a, b, c) {
  return a.rejectWith(b, c)
};
jayq.core.notify = function(a, b) {
  return a.notify(b)
};
jayq.core.notify_with = function(a, b, c) {
  return a.notifyWith(b, c)
};
jayq.core.resolve = function(a, b) {
  return a.resolve(b)
};
jayq.core.resolve_with = function(a, b, c) {
  return a.resolveWith(b, c)
};
jayq.core.pipe = function() {
  var a = null, a = function(a, c, d, e) {
    switch(arguments.length) {
      case 2:
        return a.pipe(c);
      case 3:
        return a.pipe(c, d);
      case 4:
        return a.pipe(c, d, e)
    }
    throw Error("Invalid arity: " + arguments.length);
  };
  a.cljs$lang$arity$2 = function(a, c) {
    return a.pipe(c)
  };
  a.cljs$lang$arity$3 = function(a, c, d) {
    return a.pipe(c, d)
  };
  a.cljs$lang$arity$4 = function(a, c, d, e) {
    return a.pipe(c, d, e)
  };
  return a
}();
jayq.core.state = function(a) {
  return cljs.core.keyword.call(null, a.state())
};
jayq.core.deferred_m = cljs.core.ObjMap.fromObject(["\ufdd0:return", "\ufdd0:bind", "\ufdd0:zero"], {"\ufdd0:return":jayq.core.$when, "\ufdd0:bind":function(a, b) {
  var c = jayq.core.$deferred.call(null);
  jayq.core.done.call(null, a, function(a) {
    return jayq.core.done.call(null, b.call(null, a), cljs.core.partial.call(null, jayq.core.resolve, c))
  });
  return jayq.core.promise.call(null, c)
}, "\ufdd0:zero":cljs.core.identity});
jayq.core.ajax_m = cljs.core.ObjMap.fromObject(["\ufdd0:return", "\ufdd0:bind", "\ufdd0:zero"], {"\ufdd0:return":cljs.core.identity, "\ufdd0:bind":function(a, b) {
  return jayq.core.done.call(null, jayq.core.ajax.call(null, a), b)
}, "\ufdd0:zero":cljs.core.identity});
var xo_game = {core:{}};
xo_game.core.id = cljs.core.atom.call(null, null);
xo_game.core.players = cljs.core.atom.call(null, null);
xo_game.core.turn_QMARK_ = cljs.core.atom.call(null, !1);
xo_game.core.player_QMARK_ = cljs.core.atom.call(null, !1);
xo_game.core.show_board = function() {
  return jayq.core.show.call(null, jayq.core.$.call(null, "#board"))
};
xo_game.core.status = function(a) {
  return jayq.core.inner.call(null, jayq.core.$.call(null, "#status"), a)
};
xo_game.core.process_message = function() {
  var a = cljs.core.atom.call(null, cljs.core.ObjMap.EMPTY), b = cljs.core.atom.call(null, cljs.core.ObjMap.EMPTY), c = cljs.core.atom.call(null, cljs.core.ObjMap.EMPTY), d = cljs.core.atom.call(null, cljs.core.ObjMap.EMPTY), e = cljs.core._lookup.call(null, cljs.core.ObjMap.EMPTY, "\ufdd0:hierarchy", cljs.core.global_hierarchy);
  return new cljs.core.MultiFn("process-message", "\ufdd0:action", "\ufdd0:default", e, a, b, c, d)
}();
cljs.core._add_method.call(null, xo_game.core.process_message, "\ufdd0:get-id", function(a) {
  return cljs.core.reset_BANG_.call(null, xo_game.core.id, (new cljs.core.Keyword("\ufdd0:id")).call(null, a))
});
cljs.core._add_method.call(null, xo_game.core.process_message, "\ufdd0:start", function(a) {
  var b = cljs.core.seq_QMARK_.call(null, a) ? cljs.core.apply.call(null, cljs.core.hash_map, a) : a, a = cljs.core._lookup.call(null, b, "\ufdd0:player?", null), b = cljs.core._lookup.call(null, b, "\ufdd0:players", null);
  cljs.core.reset_BANG_.call(null, xo_game.core.player_QMARK_, a);
  cljs.core.reset_BANG_.call(null, xo_game.core.players, cljs.core.zipmap.call(null, b, cljs.core.PersistentVector.fromArray(["x", "o"], !0)));
  cljs.core.truth_(a) ? xo_game.core.status.call(null, "Game in progress") : xo_game.core.status.call(null, "Game in progress (spectating)");
  return xo_game.core.show_board.call(null)
});
cljs.core._add_method.call(null, xo_game.core.process_message, "\ufdd0:start-turn", function() {
  cljs.core.reset_BANG_.call(null, xo_game.core.turn_QMARK_, !0);
  return xo_game.core.status.call(null, "Your turn")
});
cljs.core._add_method.call(null, xo_game.core.process_message, "\ufdd0:end-turn", function() {
  cljs.core.reset_BANG_.call(null, xo_game.core.turn_QMARK_, !1);
  return xo_game.core.status.call(null, "Waiting for other player turn")
});
cljs.core._add_method.call(null, xo_game.core.process_message, "\ufdd0:move", function(a) {
  var b = cljs.core.seq_QMARK_.call(null, a) ? cljs.core.apply.call(null, cljs.core.hash_map, a) : a, a = cljs.core._lookup.call(null, b, "\ufdd0:player-id", null), b = cljs.core._lookup.call(null, b, "\ufdd0:cell-to", null);
  return jayq.core.inner.call(null, jayq.core.$.call(null, [cljs.core.str("div#"), cljs.core.str(b), cljs.core.str(".cell")].join("")), cljs.core.deref.call(null, xo_game.core.players).call(null, a))
});
cljs.core._add_method.call(null, xo_game.core.process_message, "\ufdd0:default", function(a) {
  return jayq.util.log.call(null, "Wrong message ", a)
});
xo_game.core.get_id = function(a) {
  return a.send("" + cljs.core.str(cljs.core.ObjMap.fromObject(["\ufdd0:action"], {"\ufdd0:action":"\ufdd0:get-id"})))
};
xo_game.core.conn = new WebSocket("ws://127.0.0.1:3000/ws");
xo_game.core.onopen = function() {
  return xo_game.core.get_id.call(null, xo_game.core.conn)
};
xo_game.core.onerror = function() {
  var a = function(a) {
    return jayq.util.log.call(null, a)
  }, b = function(b) {
    var d = null;
    goog.isDef(b) && (d = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0));
    return a.call(this, d)
  };
  b.cljs$lang$maxFixedArity = 0;
  b.cljs$lang$applyTo = function(b) {
    b = cljs.core.seq(b);
    return a(b)
  };
  b.cljs$lang$arity$variadic = a;
  return b
}();
xo_game.core.onmessage = function(a) {
  jayq.util.log.call(null, a.data);
  return xo_game.core.process_message.call(null, cljs.reader.read_string.call(null, a.data))
};
xo_game.core.conn.onopen = xo_game.core.onopen;
xo_game.core.conn.onerror = xo_game.core.onerror;
xo_game.core.conn.onmessage = xo_game.core.onmessage;
xo_game.core.cell_click = function(a) {
  return cljs.core.truth_(function() {
    var a = cljs.core.deref.call(null, xo_game.core.turn_QMARK_);
    return cljs.core.truth_(a) ? cljs.core.deref.call(null, xo_game.core.player_QMARK_) : a
  }()) ? xo_game.core.conn.send("" + cljs.core.str(cljs.core.ObjMap.fromObject(["\ufdd0:action", "\ufdd0:cell-to", "\ufdd0:player-id"], {"\ufdd0:action":"\ufdd0:move", "\ufdd0:cell-to":a, "\ufdd0:player-id":cljs.core.deref.call(null, xo_game.core.id)}))) : null
};
jayq.core.on.call(null, jayq.core.$.call(null, "div.cell"), "click", function(a) {
  return xo_game.core.cell_click.call(null, jayq.core.attr.call(null, jayq.core.$.call(null, a.currentTarget), "id"))
});
