"use strict";
this.Element && function (t) {
	t.matches = t.matches || t.matchesSelector || t.webkitMatchesSelector || t.msMatchesSelector || function (t) {
		for (var e = (this.parentNode || this.document).querySelectorAll(t), n = -1; e[++n] && e[n] != this;) ;
		return !!e[n]
	}
}(Element.prototype), this.Element && function (t) {
	t.closest = t.closest || function (t) {
		for (var e = this; e.matches && !e.matches(t);) e = e.parentNode;
		return e.matches ? e : null
	}
}(Element.prototype), "remove" in Element.prototype || (Element.prototype.remove = function () {
	this.parentNode && this.parentNode.removeChild(this)
}), this.Element && function (t) {
	t.matches = t.matches || t.matchesSelector || t.webkitMatchesSelector || t.msMatchesSelector || function (t) {
		for (var e = (this.parentNode || this.document).querySelectorAll(t), n = -1; e[++n] && e[n] != this;) ;
		return !!e[n]
	}
}(Element.prototype), function () {
	for (var t = 0, e = ["webkit", "moz"], n = 0; n < e.length && !window.requestAnimationFrame; ++n) window.requestAnimationFrame = window[e[n] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[e[n] + "CancelAnimationFrame"] || window[e[n] + "CancelRequestAnimationFrame"];
	window.requestAnimationFrame || (window.requestAnimationFrame = function (e) {
		var n = (new Date).getTime(), i = Math.max(0, 16 - (n - t)), o = window.setTimeout(function () {
			e(n + i)
		}, i);
		return t = n + i, o
	}), window.cancelAnimationFrame || (window.cancelAnimationFrame = function (t) {
		clearTimeout(t)
	})
}(), [Element.prototype, Document.prototype, DocumentFragment.prototype].forEach(function (t) {
	t.hasOwnProperty("prepend") || Object.defineProperty(t, "prepend", {
		configurable: !0,
		enumerable: !0,
		writable: !0,
		value: function () {
			var t = Array.prototype.slice.call(arguments), e = document.createDocumentFragment();
			t.forEach(function (t) {
				var n = t instanceof Node;
				e.appendChild(n ? t : document.createTextNode(String(t)))
			}), this.insertBefore(e, this.firstChild)
		}
	})
}), window.KTUtilElementDataStore = {}, window.KTUtilElementDataStoreID = 0, window.KTUtilDelegatedEventHandlers = {};
var KTUtil = function () {
	var t = [], e = {sm: 544, md: 768, lg: 1024, xl: 1200}, n = function () {
		var e = !1;
		window.addEventListener("resize", function () {
			clearTimeout(e), e = setTimeout(function () {
				!function () {
					for (var e = 0; e < t.length; e++) t[e].call()
				}()
			}, 250)
		})
	};
	return {
		init: function (t) {
			t && t.breakpoints && (e = t.breakpoints), n()
		}, addResizeHandler: function (e) {
			t.push(e)
		}, removeResizeHandler: function (e) {
			for (var n = 0; n < t.length; n++) e === t[n] && delete t[n]
		}, runResizeHandlers: function () {
			_runResizeHandlers()
		}, resize: function () {
			if ("function" == typeof Event) window.dispatchEvent(new Event("resize")); else {
				var t = window.document.createEvent("UIEvents");
				t.initUIEvent("resize", !0, !1, window, 0), window.dispatchEvent(t)
			}
		}, getURLParam: function (t) {
			var e, n, i = window.location.search.substring(1).split("&");
			for (e = 0; e < i.length; e++) if ((n = i[e].split("="))[0] == t) return unescape(n[1]);
			return null
		}, isMobileDevice: function () {
			return this.getViewPort().width < this.getBreakpoint("lg")
		}, isDesktopDevice: function () {
			return !KTUtil.isMobileDevice()
		}, getViewPort: function () {
			var t = window, e = "inner";
			return "innerWidth" in window || (e = "client", t = document.documentElement || document.body), {
				width: t[e + "Width"],
				height: t[e + "Height"]
			}
		}, isInResponsiveRange: function (t) {
			var e = this.getViewPort().width;
			return "general" == t || ("desktop" == t && e >= this.getBreakpoint("lg") + 1 || ("tablet" == t && e >= this.getBreakpoint("md") + 1 && e < this.getBreakpoint("lg") || ("mobile" == t && e <= this.getBreakpoint("md") || ("desktop-and-tablet" == t && e >= this.getBreakpoint("md") + 1 || ("tablet-and-mobile" == t && e <= this.getBreakpoint("lg") || "minimal-desktop-and-below" == t && e <= this.getBreakpoint("xl"))))))
		}, getUniqueID: function (t) {
			return t + Math.floor(Math.random() * (new Date).getTime())
		}, getBreakpoint: function (t) {
			return e[t]
		}, isset: function (t, e) {
			var n;
			if (-1 !== (e = e || "").indexOf("[")) throw new Error("Unsupported object path notation.");
			e = e.split(".");
			do {
				if (void 0 === t) return !1;
				if (n = e.shift(), !t.hasOwnProperty(n)) return !1;
				t = t[n]
			} while (e.length);
			return !0
		}, getHighestZindex: function (t) {
			for (var e, n, i = KTUtil.get(t); i && i !== document;) {
				if (("absolute" === (e = KTUtil.css(i, "position")) || "relative" === e || "fixed" === e) && (n = parseInt(KTUtil.css(i, "z-index")), !isNaN(n) && 0 !== n)) return n;
				i = i.parentNode
			}
			return null
		}, hasFixedPositionedParent: function (t) {
			for (; t && t !== document;) {
				if (position = KTUtil.css(t, "position"), "fixed" === position) return !0;
				t = t.parentNode
			}
			return !1
		}, sleep: function (t) {
			for (var e = (new Date).getTime(), n = 0; n < 1e7 && !((new Date).getTime() - e > t); n++) ;
		}, getRandomInt: function (t, e) {
			return Math.floor(Math.random() * (e - t + 1)) + t
		}, isAngularVersion: function () {
			return void 0 !== window.Zone
		}, deepExtend: function (t) {
			t = t || {};
			for (var e = 1; e < arguments.length; e++) {
				var n = arguments[e];
				if (n) for (var i in n) n.hasOwnProperty(i) && ("object" == typeof n[i] ? t[i] = KTUtil.deepExtend(t[i], n[i]) : t[i] = n[i])
			}
			return t
		}, extend: function (t) {
			t = t || {};
			for (var e = 1; e < arguments.length; e++) if (arguments[e]) for (var n in arguments[e]) arguments[e].hasOwnProperty(n) && (t[n] = arguments[e][n]);
			return t
		}, get: function (t) {
			var e;
			return t === document ? document : t && 1 === t.nodeType ? t : (e = document.getElementById(t)) ? e : (e = document.getElementsByTagName(t)) ? e[0] : (e = document.getElementsByClassName(t)) ? e[0] : null
		}, getByID: function (t) {
			return t && 1 === t.nodeType ? t : document.getElementById(t)
		}, getByTag: function (t) {
			var e;
			return (e = document.getElementsByTagName(t)) ? e[0] : null
		}, getByClass: function (t) {
			var e;
			return (e = document.getElementsByClassName(t)) ? e[0] : null
		}, hasClasses: function (t, e) {
			if (t) {
				for (var n = e.split(" "), i = 0; i < n.length; i++) if (0 == KTUtil.hasClass(t, KTUtil.trim(n[i]))) return !1;
				return !0
			}
		}, hasClass: function (t, e) {
			if (t) return t.classList ? t.classList.contains(e) : new RegExp("\\b" + e + "\\b").test(t.className)
		}, addClass: function (t, e) {
			if (t && void 0 !== e) {
				var n = e.split(" ");
				if (t.classList) for (var i = 0; i < n.length; i++) n[i] && n[i].length > 0 && t.classList.add(KTUtil.trim(n[i])); else if (!KTUtil.hasClass(t, e)) for (i = 0; i < n.length; i++) t.className += " " + KTUtil.trim(n[i])
			}
		}, removeClass: function (t, e) {
			if (t && void 0 !== e) {
				var n = e.split(" ");
				if (t.classList) for (var i = 0; i < n.length; i++) t.classList.remove(KTUtil.trim(n[i])); else if (KTUtil.hasClass(t, e)) for (i = 0; i < n.length; i++) t.className = t.className.replace(new RegExp("\\b" + KTUtil.trim(n[i]) + "\\b", "g"), "")
			}
		}, triggerCustomEvent: function (t, e, n) {
			if (window.CustomEvent) var i = new CustomEvent(e, {detail: n}); else (i = document.createEvent("CustomEvent")).initCustomEvent(e, !0, !0, n);
			t.dispatchEvent(i)
		}, triggerEvent: function (t, e) {
			var n;
			if (t.ownerDocument) n = t.ownerDocument; else {
				if (9 != t.nodeType) throw new Error("Invalid node passed to fireEvent: " + t.id);
				n = t
			}
			if (t.dispatchEvent) {
				var i = "";
				switch (e) {
					case"click":
					case"mouseenter":
					case"mouseleave":
					case"mousedown":
					case"mouseup":
						i = "MouseEvents";
						break;
					case"focus":
					case"change":
					case"blur":
					case"select":
						i = "HTMLEvents";
						break;
					default:
						throw"fireEvent: Couldn't find an event class for event '" + e + "'."
				}
				var o = "change" != e;
				(r = n.createEvent(i)).initEvent(e, o, !0), r.synthetic = !0, t.dispatchEvent(r, !0)
			} else if (t.fireEvent) {
				var r;
				(r = n.createEventObject()).synthetic = !0, t.fireEvent("on" + e, r)
			}
		}, index: function (t) {
			for (var e = (t = KTUtil.get(t)).parentNode.children, n = 0; n < e.length; n++) if (e[n] == t) return n
		}, trim: function (t) {
			return t.trim()
		}, eventTriggered: function (t) {
			return !!t.currentTarget.dataset.triggered || (t.currentTarget.dataset.triggered = !0, !1)
		}, remove: function (t) {
			t && t.parentNode && t.parentNode.removeChild(t)
		}, find: function (t, e) {
			if (t = KTUtil.get(t)) return t.querySelector(e)
		}, findAll: function (t, e) {
			if (t = KTUtil.get(t)) return t.querySelectorAll(e)
		}, insertAfter: function (t, e) {
			return e.parentNode.insertBefore(t, e.nextSibling)
		}, parents: function (t, e) {
			Element.prototype.matches || (Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function (t) {
				for (var e = (this.document || this.ownerDocument).querySelectorAll(t), n = e.length; --n >= 0 && e.item(n) !== this;) ;
				return n > -1
			});
			for (var n = []; t && t !== document; t = t.parentNode) e ? t.matches(e) && n.push(t) : n.push(t);
			return n
		}, children: function (t, e, n) {
			if (t && t.childNodes) {
				for (var i = [], o = 0, r = t.childNodes.length; o < r; ++o) 1 == t.childNodes[o].nodeType && KTUtil.matches(t.childNodes[o], e, n) && i.push(t.childNodes[o]);
				return i
			}
		}, child: function (t, e, n) {
			var i = KTUtil.children(t, e, n);
			return i ? i[0] : null
		}, matches: function (t, e, n) {
			var i = Element.prototype,
				o = i.matches || i.webkitMatchesSelector || i.mozMatchesSelector || i.msMatchesSelector || function (t) {
					return -1 !== [].indexOf.call(document.querySelectorAll(t), this)
				};
			return !(!t || !t.tagName) && o.call(t, e)
		}, data: function (t) {
			return t = KTUtil.get(t), {
				set: function (e, n) {
					void 0 !== t && (void 0 === t.customDataTag && (KTUtilElementDataStoreID++, t.customDataTag = KTUtilElementDataStoreID), void 0 === KTUtilElementDataStore[t.customDataTag] && (KTUtilElementDataStore[t.customDataTag] = {}), KTUtilElementDataStore[t.customDataTag][e] = n)
				}, get: function (e) {
					if (void 0 !== t) return void 0 === t.customDataTag ? null : this.has(e) ? KTUtilElementDataStore[t.customDataTag][e] : null
				}, has: function (e) {
					return void 0 !== t && (void 0 !== t.customDataTag && !(!KTUtilElementDataStore[t.customDataTag] || !KTUtilElementDataStore[t.customDataTag][e]))
				}, remove: function (e) {
					t && this.has(e) && delete KTUtilElementDataStore[t.customDataTag][e]
				}
			}
		}, outerWidth: function (t, e) {
			if (!0 === e) {
				var n = parseFloat(t.offsetWidth);
				return n += parseFloat(KTUtil.css(t, "margin-left")) + parseFloat(KTUtil.css(t, "margin-right")), parseFloat(n)
			}
			return n = parseFloat(t.offsetWidth)
		}, offset: function (t) {
			var e, n;
			if (t = KTUtil.get(t)) return t.getClientRects().length ? (e = t.getBoundingClientRect(), n = t.ownerDocument.defaultView, {
				top: e.top + n.pageYOffset,
				left: e.left + n.pageXOffset
			}) : {top: 0, left: 0}
		}, height: function (t) {
			return KTUtil.css(t, "height")
		}, visible: function (t) {
			return !(0 === t.offsetWidth && 0 === t.offsetHeight)
		}, attr: function (t, e, n) {
			if (null != (t = KTUtil.get(t))) return void 0 === n ? t.getAttribute(e) : void t.setAttribute(e, n)
		}, hasAttr: function (t, e) {
			if (null != (t = KTUtil.get(t))) return !!t.getAttribute(e)
		}, removeAttr: function (t, e) {
			null != (t = KTUtil.get(t)) && t.removeAttribute(e)
		}, animate: function (t, e, n, i, o, r) {
			var l = {};
			if (l.linear = function (t, e, n, i) {
				return n * t / i + e
			}, o = l.linear, "number" == typeof t && "number" == typeof e && "number" == typeof n && "function" == typeof i) {
				"function" != typeof r && (r = function () {
				});
				var a = window.requestAnimationFrame || function (t) {
					window.setTimeout(t, 20)
				}, s = e - t;
				i(t);
				var u = window.performance && window.performance.now ? window.performance.now() : +new Date;
				a(function l(d) {
					var c = (d || +new Date) - u;
					c >= 0 && i(o(c, t, s, n)), c >= 0 && c >= n ? (i(e), r()) : a(l)
				})
			}
		}, actualCss: function (t, e, n) {
			var i, o = "";
			if ((t = KTUtil.get(t)) instanceof HTMLElement != !1) return t.getAttribute("kt-hidden-" + e) && !1 !== n ? parseFloat(t.getAttribute("kt-hidden-" + e)) : (o = t.style.cssText, t.style.cssText = "position: absolute; visibility: hidden; display: block;", "width" == e ? i = t.offsetWidth : "height" == e && (i = t.offsetHeight), t.style.cssText = o, t.setAttribute("kt-hidden-" + e, i), parseFloat(i))
		}, actualHeight: function (t, e) {
			return KTUtil.actualCss(t, "height", e)
		}, actualWidth: function (t, e) {
			return KTUtil.actualCss(t, "width", e)
		}, getScroll: function (t, e) {
			return e = "scroll" + e, t == window || t == document ? self["scrollTop" == e ? "pageYOffset" : "pageXOffset"] || browserSupportsBoxModel && document.documentElement[e] || document.body[e] : t[e]
		}, css: function (t, e, n) {
			if (t = KTUtil.get(t)) if (void 0 !== n) t.style[e] = n; else {
				var i = (t.ownerDocument || document).defaultView;
				if (i && i.getComputedStyle) return e = e.replace(/([A-Z])/g, "-$1").toLowerCase(), i.getComputedStyle(t, null).getPropertyValue(e);
				if (t.currentStyle) return e = e.replace(/\-(\w)/g, function (t, e) {
					return e.toUpperCase()
				}), n = t.currentStyle[e], /^\d+(em|pt|%|ex)?$/i.test(n) ? function (e) {
					var n = t.style.left, i = t.runtimeStyle.left;
					return t.runtimeStyle.left = t.currentStyle.left, t.style.left = e || 0, e = t.style.pixelLeft + "px", t.style.left = n, t.runtimeStyle.left = i, e
				}(n) : n
			}
		}, slide: function (t, e, n, i, o) {
			if (!(!t || "up" == e && !1 === KTUtil.visible(t) || "down" == e && !0 === KTUtil.visible(t))) {
				n = n || 600;
				var r = KTUtil.actualHeight(t), l = !1, a = !1;
				KTUtil.css(t, "padding-top") && !0 !== KTUtil.data(t).has("slide-padding-top") && KTUtil.data(t).set("slide-padding-top", KTUtil.css(t, "padding-top")), KTUtil.css(t, "padding-bottom") && !0 !== KTUtil.data(t).has("slide-padding-bottom") && KTUtil.data(t).set("slide-padding-bottom", KTUtil.css(t, "padding-bottom")), KTUtil.data(t).has("slide-padding-top") && (l = parseInt(KTUtil.data(t).get("slide-padding-top"))), KTUtil.data(t).has("slide-padding-bottom") && (a = parseInt(KTUtil.data(t).get("slide-padding-bottom"))), "up" == e ? (t.style.cssText = "display: block; overflow: hidden;", l && KTUtil.animate(0, l, n, function (e) {
					t.style.paddingTop = l - e + "px"
				}, "linear"), a && KTUtil.animate(0, a, n, function (e) {
					t.style.paddingBottom = a - e + "px"
				}, "linear"), KTUtil.animate(0, r, n, function (e) {
					t.style.height = r - e + "px"
				}, "linear", function () {
					i(), t.style.height = "", t.style.display = "none"
				})) : "down" == e && (t.style.cssText = "display: block; overflow: hidden;", l && KTUtil.animate(0, l, n, function (e) {
					t.style.paddingTop = e + "px"
				}, "linear", function () {
					t.style.paddingTop = ""
				}), a && KTUtil.animate(0, a, n, function (e) {
					t.style.paddingBottom = e + "px"
				}, "linear", function () {
					t.style.paddingBottom = ""
				}), KTUtil.animate(0, r, n, function (e) {
					t.style.height = e + "px"
				}, "linear", function () {
					i(), t.style.height = "", t.style.display = "", t.style.overflow = ""
				}))
			}
		}, slideUp: function (t, e, n) {
			KTUtil.slide(t, "up", e, n)
		}, slideDown: function (t, e, n) {
			KTUtil.slide(t, "down", e, n)
		}, show: function (t, e) {
			void 0 !== t && (t.style.display = e || "block")
		}, hide: function (t) {
			void 0 !== t && (t.style.display = "none")
		}, addEvent: function (t, e, n, i) {
			void 0 !== (t = KTUtil.get(t)) && t.addEventListener(e, n)
		}, removeEvent: function (t, e, n) {
			(t = KTUtil.get(t)).removeEventListener(e, n)
		}, on: function (t, e, n, i) {
			if (e) {
				var o = KTUtil.getUniqueID("event");
				return KTUtilDelegatedEventHandlers[o] = function (n) {
					for (var o = t.querySelectorAll(e), r = n.target; r && r !== t;) {
						for (var l = 0, a = o.length; l < a; l++) r === o[l] && i.call(r, n);
						r = r.parentNode
					}
				}, KTUtil.addEvent(t, n, KTUtilDelegatedEventHandlers[o]), o
			}
		}, off: function (t, e, n) {
			t && KTUtilDelegatedEventHandlers[n] && (KTUtil.removeEvent(t, e, KTUtilDelegatedEventHandlers[n]), delete KTUtilDelegatedEventHandlers[n])
		}, one: function (t, e, n) {
			(t = KTUtil.get(t)).addEventListener(e, function t(e) {
				return e.target && e.target.removeEventListener && e.target.removeEventListener(e.type, t), n(e)
			})
		}, hash: function (t) {
			var e, n = 0;
			if (0 === t.length) return n;
			for (e = 0; e < t.length; e++) n = (n << 5) - n + t.charCodeAt(e), n |= 0;
			return n
		}, animateClass: function (t, e, n) {
			var i, o = {
				animation: "animationend",
				OAnimation: "oAnimationEnd",
				MozAnimation: "mozAnimationEnd",
				WebkitAnimation: "webkitAnimationEnd",
				msAnimation: "msAnimationEnd"
			};
			for (var r in o) void 0 !== t.style[r] && (i = o[r]);
			KTUtil.addClass(t, "animated " + e), KTUtil.one(t, i, function () {
				KTUtil.removeClass(t, "animated " + e)
			}), n && KTUtil.one(t, i, n)
		}, transitionEnd: function (t, e) {
			var n, i = {
				transition: "transitionend",
				OTransition: "oTransitionEnd",
				MozTransition: "mozTransitionEnd",
				WebkitTransition: "webkitTransitionEnd",
				msTransition: "msTransitionEnd"
			};
			for (var o in i) void 0 !== t.style[o] && (n = i[o]);
			KTUtil.one(t, n, e)
		}, animationEnd: function (t, e) {
			var n, i = {
				animation: "animationend",
				OAnimation: "oAnimationEnd",
				MozAnimation: "mozAnimationEnd",
				WebkitAnimation: "webkitAnimationEnd",
				msAnimation: "msAnimationEnd"
			};
			for (var o in i) void 0 !== t.style[o] && (n = i[o]);
			KTUtil.one(t, n, e)
		}, animateDelay: function (t, e) {
			for (var n = ["webkit-", "moz-", "ms-", "o-", ""], i = 0; i < n.length; i++) KTUtil.css(t, n[i] + "animation-delay", e)
		}, animateDuration: function (t, e) {
			for (var n = ["webkit-", "moz-", "ms-", "o-", ""], i = 0; i < n.length; i++) KTUtil.css(t, n[i] + "animation-duration", e)
		}, scrollTo: function (t, e, n) {
			n = n || 500;
			var i, o, r = (t = KTUtil.get(t)) ? KTUtil.offset(t).top : 0,
				l = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
			r > l ? (i = r, o = l) : (i = l, o = r), e && (o += e), KTUtil.animate(i, o, n, function (t) {
				document.documentElement.scrollTop = t, document.body.parentNode.scrollTop = t, document.body.scrollTop = t
			})
		}, scrollTop: function (t, e) {
			KTUtil.scrollTo(null, t, e)
		}, isArray: function (t) {
			return t && Array.isArray(t)
		}, ready: function (t) {
			(document.attachEvent ? "complete" === document.readyState : "loading" !== document.readyState) ? t() : document.addEventListener("DOMContentLoaded", t)
		}, isEmpty: function (t) {
			for (var e in t) if (t.hasOwnProperty(e)) return !1;
			return !0
		}, numberString: function (t) {
			for (var e = (t += "").split("."), n = e[0], i = e.length > 1 ? "." + e[1] : "", o = /(\d+)(\d{3})/; o.test(n);) n = n.replace(o, "$1,$2");
			return n + i
		}, detectIE: function () {
			var t = window.navigator.userAgent, e = t.indexOf("MSIE ");
			if (e > 0) return parseInt(t.substring(e + 5, t.indexOf(".", e)), 10);
			if (t.indexOf("Trident/") > 0) {
				var n = t.indexOf("rv:");
				return parseInt(t.substring(n + 3, t.indexOf(".", n)), 10)
			}
			var i = t.indexOf("Edge/");
			return i > 0 && parseInt(t.substring(i + 5, t.indexOf(".", i)), 10)
		}, isRTL: function () {
			return "rtl" == KTUtil.attr(KTUtil.get("html"), "direction")
		}, scrollInit: function (t, e) {
			function n() {
				var n, i;
				if (i = e.height instanceof Function ? parseInt(e.height.call()) : parseInt(e.height), (e.mobileNativeScroll || e.disableForMobile) && KTUtil.isInResponsiveRange("tablet-and-mobile")) (n = KTUtil.data(t).get("ps")) ? (e.resetHeightOnDestroy ? KTUtil.css(t, "height", "auto") : (KTUtil.css(t, "overflow", "auto"), i > 0 && KTUtil.css(t, "height", i + "px")), n.destroy(), n = KTUtil.data(t).remove("ps")) : i > 0 && (KTUtil.css(t, "overflow", "auto"), KTUtil.css(t, "height", i + "px")); else if (i > 0 && KTUtil.css(t, "height", i + "px"), e.desktopNativeScroll) KTUtil.css(t, "overflow", "auto"); else {
					KTUtil.css(t, "overflow", "hidden"), (n = KTUtil.data(t).get("ps")) ? n.update() : (KTUtil.addClass(t, "kt-scroll"), n = new PerfectScrollbar(t, {
						wheelSpeed: .5,
						swipeEasing: !0,
						wheelPropagation: !1 !== e.windowScroll,
						minScrollbarLength: 40,
						maxScrollbarLength: 300,
						suppressScrollX: "true" != KTUtil.attr(t, "data-scroll-x")
					}), KTUtil.data(t).set("ps", n));
					var o = KTUtil.attr(t, "id");
					if (!0 === e.rememberPosition && Cookies && o) {
						if (Cookies.get(o)) {
							var r = parseInt(Cookies.get(o));
							r > 0 && (t.scrollTop = r)
						}
						t.addEventListener("ps-scroll-y", function () {
							Cookies.set(o, t.scrollTop)
						})
					}
				}
			}

			t && (n(), e.handleWindowResize && KTUtil.addResizeHandler(function () {
				n()
			}))
		}, scrollUpdate: function (t) {
			var e;
			(e = KTUtil.data(t).get("ps")) && e.update()
		}, scrollUpdateAll: function (t) {
			for (var e = KTUtil.findAll(t, ".ps"), n = 0, i = e.length; n < i; n++) KTUtil.scrollerUpdate(e[n])
		}, scrollDestroy: function (t) {
			var e;
			(e = KTUtil.data(t).get("ps")) && (e.destroy(), e = KTUtil.data(t).remove("ps"))
		}, setHTML: function (t, e) {
			KTUtil.get(t) && (KTUtil.get(t).innerHTML = e)
		}, getHTML: function (t) {
			if (KTUtil.get(t)) return KTUtil.get(t).innerHTML
		}
	}
}();
KTUtil.ready(function () {
	KTUtil.init()
}), window.onload = function () {
	KTUtil.removeClass(KTUtil.get("body"), "kt-page--loading")
};
var KTHeader = function (t, e) {
	var n = this, i = KTUtil.get(t), o = KTUtil.get("body");
	if (void 0 !== i) {
		var r = {classic: !1, offset: {mobile: 150, desktop: 200}, minimize: {mobile: !1, desktop: !1}}, l = {
			construct: function (t) {
				return KTUtil.data(i).has("header") ? n = KTUtil.data(i).get("header") : (l.init(t), l.build(), KTUtil.data(i).set("header", n)), n
			}, init: function (t) {
				n.events = [], n.options = KTUtil.deepExtend({}, r, t)
			}, build: function () {
				var t = 0, e = !0;
				KTUtil.getViewPort().height;
				!1 === n.options.minimize.mobile && !1 === n.options.minimize.desktop || window.addEventListener("scroll", function () {
					var i, r, a, s = 0;
					KTUtil.isInResponsiveRange("desktop") ? (s = n.options.offset.desktop, i = n.options.minimize.desktop.on, r = n.options.minimize.desktop.off) : KTUtil.isInResponsiveRange("tablet-and-mobile") && (s = n.options.offset.mobile, i = n.options.minimize.mobile.on, r = n.options.minimize.mobile.off), a = window.pageYOffset, KTUtil.isInResponsiveRange("tablet-and-mobile") && n.options.classic && n.options.classic.mobile || KTUtil.isInResponsiveRange("desktop") && n.options.classic && n.options.classic.desktop ? a > s ? (KTUtil.addClass(o, i), KTUtil.removeClass(o, r), e && (l.eventTrigger("minimizeOn", n), e = !1)) : (KTUtil.addClass(o, r), KTUtil.removeClass(o, i), 0 == e && (l.eventTrigger("minimizeOff", n), e = !0)) : (a > s && t < a ? (KTUtil.addClass(o, i), KTUtil.removeClass(o, r), e && (l.eventTrigger("minimizeOn", n), e = !1)) : (KTUtil.addClass(o, r), KTUtil.removeClass(o, i), 0 == e && (l.eventTrigger("minimizeOff", n), e = !0)), t = a)
				})
			}, eventTrigger: function (t, e) {
				for (var i = 0; i < n.events.length; i++) {
					var o = n.events[i];
					o.name == t && (1 == o.one ? 0 == o.fired && (n.events[i].fired = !0, o.handler.call(this, n, e)) : o.handler.call(this, n, e))
				}
			}, addEvent: function (t, e, i) {
				n.events.push({name: t, handler: e, one: i, fired: !1})
			}
		};
		return n.setDefaults = function (t) {
			r = t
		}, n.on = function (t, e) {
			return l.addEvent(t, e)
		}, l.construct.apply(n, [e]), !0, n
	}
}, KTMenu = function (t, e) {
	var n = this, i = !1, o = KTUtil.get(t), r = KTUtil.get("body");
	if (o) {
		var l = {
			scroll: {rememberPosition: !1},
			accordion: {slideSpeed: 200, autoScroll: !1, autoScrollSpeed: 1200, expandAll: !0},
			dropdown: {timeout: 500}
		}, a = {
			construct: function (t) {
				return KTUtil.data(o).has("menu") ? n = KTUtil.data(o).get("menu") : (a.init(t), a.reset(), a.build(), KTUtil.data(o).set("menu", n)), n
			}, init: function (t) {
				n.events = [], n.eventHandlers = {}, n.options = KTUtil.deepExtend({}, l, t), n.pauseDropdownHoverTime = 0, n.uid = KTUtil.getUniqueID()
			}, update: function (t) {
				n.options = KTUtil.deepExtend({}, l, t), n.pauseDropdownHoverTime = 0, a.reset(), n.eventHandlers = {}, a.build(), KTUtil.data(o).set("menu", n)
			}, reload: function () {
				a.reset(), a.build(), a.resetSubmenuProps()
			}, build: function () {
				n.eventHandlers.event_1 = KTUtil.on(o, ".kt-menu__toggle", "click", a.handleSubmenuAccordion), ("dropdown" === a.getSubmenuMode() || a.isConditionalSubmenuDropdown()) && (n.eventHandlers.event_2 = KTUtil.on(o, '[data-ktmenu-submenu-toggle="hover"]', "mouseover", a.handleSubmenuDrodownHoverEnter), n.eventHandlers.event_3 = KTUtil.on(o, '[data-ktmenu-submenu-toggle="hover"]', "mouseout", a.handleSubmenuDrodownHoverExit), n.eventHandlers.event_4 = KTUtil.on(o, '[data-ktmenu-submenu-toggle="click"] > .kt-menu__toggle, [data-ktmenu-submenu-toggle="click"] > .kt-menu__link .kt-menu__toggle', "click", a.handleSubmenuDropdownClick), n.eventHandlers.event_5 = KTUtil.on(o, '[data-ktmenu-submenu-toggle="tab"] > .kt-menu__toggle, [data-ktmenu-submenu-toggle="tab"] > .kt-menu__link .kt-menu__toggle', "click", a.handleSubmenuDropdownTabClick)), n.eventHandlers.event_6 = KTUtil.on(o, ".kt-menu__item > .kt-menu__link:not(.kt-menu__toggle):not(.kt-menu__link--toggle-skip)", "click", a.handleLinkClick), n.options.scroll && n.options.scroll.height && a.scrollInit()
			}, reset: function () {
				KTUtil.off(o, "click", n.eventHandlers.event_1), KTUtil.off(o, "mouseover", n.eventHandlers.event_2), KTUtil.off(o, "mouseout", n.eventHandlers.event_3), KTUtil.off(o, "click", n.eventHandlers.event_4), KTUtil.off(o, "click", n.eventHandlers.event_5), KTUtil.off(o, "click", n.eventHandlers.event_6)
			}, scrollInit: function () {
				n.options.scroll && n.options.scroll.height ? (KTUtil.scrollDestroy(o), KTUtil.scrollInit(o, {
					disableForMobile: !0,
					resetHeightOnDestroy: !0,
					handleWindowResize: !0,
					height: n.options.scroll.height,
					rememberPosition: n.options.scroll.rememberPosition
				})) : KTUtil.scrollDestroy(o)
			}, scrollUpdate: function () {
				n.options.scroll && n.options.scroll.height && KTUtil.scrollUpdate(o)
			}, scrollTop: function () {
				n.options.scroll && n.options.scroll.height && KTUtil.scrollTop(o)
			}, getSubmenuMode: function (t) {
				return KTUtil.isInResponsiveRange("desktop") ? t && KTUtil.hasAttr(t, "data-ktmenu-submenu-toggle") && "hover" == KTUtil.attr(t, "data-ktmenu-submenu-toggle") ? "dropdown" : KTUtil.isset(n.options.submenu, "desktop.state.body") ? KTUtil.hasClasses(r, n.options.submenu.desktop.state.body) ? n.options.submenu.desktop.state.mode : n.options.submenu.desktop.default : KTUtil.isset(n.options.submenu, "desktop") ? n.options.submenu.desktop : void 0 : KTUtil.isInResponsiveRange("tablet") && KTUtil.isset(n.options.submenu, "tablet") ? n.options.submenu.tablet : !(!KTUtil.isInResponsiveRange("mobile") || !KTUtil.isset(n.options.submenu, "mobile")) && n.options.submenu.mobile
			}, isConditionalSubmenuDropdown: function () {
				return !(!KTUtil.isInResponsiveRange("desktop") || !KTUtil.isset(n.options.submenu, "desktop.state.body"))
			}, resetSubmenuProps: function (t) {
				var e = KTUtil.findAll(o, ".kt-menu__submenu");
				if (e) for (var n = 0, i = e.length; n < i; n++) KTUtil.css(e[0], "display", ""), KTUtil.css(e[0], "overflow", "")
			}, handleSubmenuDrodownHoverEnter: function (t) {
				if ("accordion" !== a.getSubmenuMode(this) && !1 !== n.resumeDropdownHover()) {
					"1" == this.getAttribute("data-hover") && (this.removeAttribute("data-hover"), clearTimeout(this.getAttribute("data-timeout")), this.removeAttribute("data-timeout")), a.showSubmenuDropdown(this)
				}
			}, handleSubmenuDrodownHoverExit: function (t) {
				if (!1 !== n.resumeDropdownHover() && "accordion" !== a.getSubmenuMode(this)) {
					var e = this, i = n.options.dropdown.timeout, o = setTimeout(function () {
						"1" == e.getAttribute("data-hover") && a.hideSubmenuDropdown(e, !0)
					}, i);
					e.setAttribute("data-hover", "1"), e.setAttribute("data-timeout", o)
				}
			}, handleSubmenuDropdownClick: function (t) {
				if ("accordion" !== a.getSubmenuMode(this)) {
					var e = this.closest(".kt-menu__item");
					"accordion" != e.getAttribute("data-ktmenu-submenu-mode") && (!1 === KTUtil.hasClass(e, "kt-menu__item--hover") ? (KTUtil.addClass(e, "kt-menu__item--open-dropdown"), a.showSubmenuDropdown(e)) : (KTUtil.removeClass(e, "kt-menu__item--open-dropdown"), a.hideSubmenuDropdown(e, !0)), t.preventDefault())
				}
			}, handleSubmenuDropdownTabClick: function (t) {
				if ("accordion" !== a.getSubmenuMode(this)) {
					var e = this.closest(".kt-menu__item");
					"accordion" != e.getAttribute("data-ktmenu-submenu-mode") && (0 == KTUtil.hasClass(e, "kt-menu__item--hover") && (KTUtil.addClass(e, "kt-menu__item--open-dropdown"), a.showSubmenuDropdown(e)), t.preventDefault())
				}
			}, handleLinkClick: function (t) {
				var e = this.closest(".kt-menu__item.kt-menu__item--submenu");
				e && "dropdown" === a.getSubmenuMode(e) && a.hideSubmenuDropdowns()
			}, handleSubmenuDropdownClose: function (t, e) {
				if ("accordion" !== a.getSubmenuMode(e)) {
					var n = o.querySelectorAll(".kt-menu__item.kt-menu__item--submenu.kt-menu__item--hover:not(.kt-menu__item--tabs)");
					if (n.length > 0 && !1 === KTUtil.hasClass(e, "kt-menu__toggle") && 0 === e.querySelectorAll(".kt-menu__toggle").length) for (var i = 0, r = n.length; i < r; i++) a.hideSubmenuDropdown(n[0], !0)
				}
			}, handleSubmenuAccordion: function (t, e) {
				var i, o = e || this;
				if ("dropdown" === a.getSubmenuMode(e) && (i = o.closest(".kt-menu__item")) && "accordion" != i.getAttribute("data-ktmenu-submenu-mode")) t.preventDefault(); else {
					var r = o.closest(".kt-menu__item"), l = KTUtil.child(r, ".kt-menu__submenu, .kt-menu__inner");
					if (!KTUtil.hasClass(o.closest(".kt-menu__item"), "kt-menu__item--open-always") && r && l) {
						t.preventDefault();
						var s = n.options.accordion.slideSpeed;
						if (!1 === KTUtil.hasClass(r, "kt-menu__item--open")) {
							if (!1 === n.options.accordion.expandAll) {
								var u = o.closest(".kt-menu__nav, .kt-menu__subnav"),
									d = KTUtil.children(u, ".kt-menu__item.kt-menu__item--open.kt-menu__item--submenu:not(.kt-menu__item--here):not(.kt-menu__item--open-always)");
								if (u && d) for (var c = 0, m = d.length; c < m; c++) {
									var f = d[0], g = KTUtil.child(f, ".kt-menu__submenu");
									g && KTUtil.slideUp(g, s, function () {
										a.scrollUpdate(), KTUtil.removeClass(f, "kt-menu__item--open")
									})
								}
							}
							KTUtil.slideDown(l, s, function () {
								a.scrollToItem(o), a.scrollUpdate(), a.eventTrigger("submenuToggle", l)
							}), KTUtil.addClass(r, "kt-menu__item--open")
						} else KTUtil.slideUp(l, s, function () {
							a.scrollToItem(o), a.eventTrigger("submenuToggle", l)
						}), KTUtil.removeClass(r, "kt-menu__item--open")
					}
				}
			}, scrollToItem: function (t) {
				KTUtil.isInResponsiveRange("desktop") && n.options.accordion.autoScroll && "1" !== o.getAttribute("data-ktmenu-scroll") && KTUtil.scrollTo(t, n.options.accordion.autoScrollSpeed)
			}, hideSubmenuDropdown: function (t, e) {
				e && (KTUtil.removeClass(t, "kt-menu__item--hover"), KTUtil.removeClass(t, "kt-menu__item--active-tab")), t.removeAttribute("data-hover"), t.getAttribute("data-ktmenu-dropdown-toggle-class") && KTUtil.removeClass(r, t.getAttribute("data-ktmenu-dropdown-toggle-class"));
				var n = t.getAttribute("data-timeout");
				t.removeAttribute("data-timeout"), clearTimeout(n)
			}, hideSubmenuDropdowns: function () {
				var t;
				if (t = o.querySelectorAll('.kt-menu__item--submenu.kt-menu__item--hover:not(.kt-menu__item--tabs):not([data-ktmenu-submenu-toggle="tab"])')) for (var e = 0, n = t.length; e < n; e++) a.hideSubmenuDropdown(t[e], !0)
			}, showSubmenuDropdown: function (t) {
				var e = o.querySelectorAll(".kt-menu__item--submenu.kt-menu__item--hover, .kt-menu__item--submenu.kt-menu__item--active-tab");
				if (e) for (var n = 0, i = e.length; n < i; n++) {
					var l = e[n];
					t !== l && !1 === l.contains(t) && !1 === t.contains(l) && a.hideSubmenuDropdown(l, !0)
				}
				KTUtil.addClass(t, "kt-menu__item--hover"), t.getAttribute("data-ktmenu-dropdown-toggle-class") && KTUtil.addClass(r, t.getAttribute("data-ktmenu-dropdown-toggle-class"))
			}, createSubmenuDropdownClickDropoff: function (t) {
				var e, n = (e = KTUtil.child(t, ".kt-menu__submenu") ? KTUtil.css(e, "z-index") : 0) - 1,
					i = document.createElement('<div class="kt-menu__dropoff" style="background: transparent; position: fixed; top: 0; bottom: 0; left: 0; right: 0; z-index: ' + n + '"></div>');
				r.appendChild(i), KTUtil.addEvent(i, "click", function (e) {
					e.stopPropagation(), e.preventDefault(), KTUtil.remove(this), a.hideSubmenuDropdown(t, !0)
				})
			}, pauseDropdownHover: function (t) {
				var e = new Date;
				n.pauseDropdownHoverTime = e.getTime() + t
			}, resumeDropdownHover: function () {
				return (new Date).getTime() > n.pauseDropdownHoverTime
			}, resetActiveItem: function (t) {
				for (var e, i, r = 0, l = (e = o.querySelectorAll(".kt-menu__item--active")).length; r < l; r++) {
					var a = e[0];
					KTUtil.removeClass(a, "kt-menu__item--active"), KTUtil.hide(KTUtil.child(a, ".kt-menu__submenu"));
					for (var s = 0, u = (i = KTUtil.parents(a, ".kt-menu__item--submenu") || []).length; s < u; s++) {
						var d = i[r];
						KTUtil.removeClass(d, "kt-menu__item--open"), KTUtil.hide(KTUtil.child(d, ".kt-menu__submenu"))
					}
				}
				if (!1 === n.options.accordion.expandAll && (e = o.querySelectorAll(".kt-menu__item--open"))) for (r = 0, l = e.length; r < l; r++) KTUtil.removeClass(i[0], "kt-menu__item--open")
			}, setActiveItem: function (t) {
				a.resetActiveItem();
				for (var e = KTUtil.parents(t, ".kt-menu__item--submenu") || [], n = 0, i = e.length; n < i; n++) KTUtil.addClass(KTUtil.get(e[n]), "kt-menu__item--open");
				KTUtil.addClass(KTUtil.get(t), "kt-menu__item--active")
			}, getBreadcrumbs: function (t) {
				var e, n = [], i = KTUtil.child(t, ".kt-menu__link");
				n.push({
					text: e = KTUtil.child(i, ".kt-menu__link-text") ? e.innerHTML : "",
					title: i.getAttribute("title"),
					href: i.getAttribute("href")
				});
				for (var o = KTUtil.parents(t, ".kt-menu__item--submenu"), r = 0, l = o.length; r < l; r++) {
					var a = KTUtil.child(o[r], ".kt-menu__link");
					n.push({
						text: e = KTUtil.child(a, ".kt-menu__link-text") ? e.innerHTML : "",
						title: a.getAttribute("title"),
						href: a.getAttribute("href")
					})
				}
				return n.reverse()
			}, getPageTitle: function (t) {
				var e;
				return KTUtil.child(t, ".kt-menu__link-text") ? e.innerHTML : ""
			}, eventTrigger: function (t, e) {
				for (var i = 0; i < n.events.length; i++) {
					var o = n.events[i];
					o.name == t && (1 == o.one ? 0 == o.fired && (n.events[i].fired = !0, o.handler.call(this, n, e)) : o.handler.call(this, n, e))
				}
			}, addEvent: function (t, e, i) {
				n.events.push({name: t, handler: e, one: i, fired: !1})
			}, removeEvent: function (t) {
				n.events[t] && delete n.events[t]
			}
		};
		return n.setDefaults = function (t) {
			l = t
		}, n.scrollUpdate = function () {
			return a.scrollUpdate()
		}, n.scrollReInit = function () {
			return a.scrollInit()
		}, n.scrollTop = function () {
			return a.scrollTop()
		}, n.setActiveItem = function (t) {
			return a.setActiveItem(t)
		}, n.reload = function () {
			return a.reload()
		}, n.update = function (t) {
			return a.update(t)
		}, n.getBreadcrumbs = function (t) {
			return a.getBreadcrumbs(t)
		}, n.getPageTitle = function (t) {
			return a.getPageTitle(t)
		}, n.getSubmenuMode = function (t) {
			return a.getSubmenuMode(t)
		}, n.hideDropdown = function (t) {
			a.hideSubmenuDropdown(t, !0)
		}, n.hideDropdowns = function () {
			a.hideSubmenuDropdowns()
		}, n.pauseDropdownHover = function (t) {
			a.pauseDropdownHover(t)
		}, n.resumeDropdownHover = function () {
			return a.resumeDropdownHover()
		}, n.on = function (t, e) {
			return a.addEvent(t, e)
		}, n.off = function (t) {
			return a.removeEvent(t)
		}, n.one = function (t, e) {
			return a.addEvent(t, e, !0)
		}, a.construct.apply(n, [e]), KTUtil.addResizeHandler(function () {
			i && n.reload()
		}), i = !0, n
	}
};
document.addEventListener("click", function (t) {
	var e;
	if (e = KTUtil.get("body").querySelectorAll('.kt-menu__nav .kt-menu__item.kt-menu__item--submenu.kt-menu__item--hover:not(.kt-menu__item--tabs)[data-ktmenu-submenu-toggle="click"]')) for (var n = 0, i = e.length; n < i; n++) {
		var o = e[n].closest(".kt-menu__nav").parentNode;
		if (o) {
			var r = KTUtil.data(o).get("menu");
			if (!r) break;
			if (!r || "dropdown" !== r.getSubmenuMode()) break;
			t.target !== o && !1 === o.contains(t.target) && r.hideDropdowns()
		}
	}
});
var KTOffcanvas = function (t, e) {
	var n = this, i = KTUtil.get(t), o = KTUtil.get("body");
	if (i) {
		var r = {}, l = {
			construct: function (t) {
				return KTUtil.data(i).has("offcanvas") ? n = KTUtil.data(i).get("offcanvas") : (l.init(t), l.build(), KTUtil.data(i).set("offcanvas", n)), n
			}, init: function (t) {
				n.events = [], n.options = KTUtil.deepExtend({}, r, t), n.overlay, n.classBase = n.options.baseClass, n.classShown = n.classBase + "--on", n.classOverlay = n.classBase + "-overlay", n.state = KTUtil.hasClass(i, n.classShown) ? "shown" : "hidden"
			}, build: function () {
				if (n.options.toggleBy) if ("string" == typeof n.options.toggleBy) KTUtil.addEvent(n.options.toggleBy, "click", function (t) {
					t.preventDefault(), l.toggle()
				}); else if (n.options.toggleBy && n.options.toggleBy[0]) if (n.options.toggleBy[0].target) for (var t in n.options.toggleBy) KTUtil.addEvent(n.options.toggleBy[t].target, "click", function (t) {
					t.preventDefault(), l.toggle()
				}); else for (var t in n.options.toggleBy) KTUtil.addEvent(n.options.toggleBy[t], "click", function (t) {
					t.preventDefault(), l.toggle()
				}); else n.options.toggleBy && n.options.toggleBy.target && KTUtil.addEvent(n.options.toggleBy.target, "click", function (t) {
					t.preventDefault(), l.toggle()
				});
				var e = KTUtil.get(n.options.closeBy);
				e && KTUtil.addEvent(e, "click", function (t) {
					t.preventDefault(), l.hide()
				}), KTUtil.addResizeHandler(function () {
					(parseInt(KTUtil.css(i, "left")) >= 0 || parseInt(KTUtil.css(i, "right") >= 0) || "fixed" != KTUtil.css(i, "position")) && KTUtil.css(i, "opacity", "1")
				})
			}, isShown: function (t) {
				return "shown" == n.state
			}, toggle: function () {
				l.eventTrigger("toggle"), "shown" == n.state ? l.hide(this) : l.show(this)
			}, show: function (t) {
				"shown" != n.state && (l.eventTrigger("beforeShow"), l.togglerClass(t, "show"), KTUtil.addClass(o, n.classShown), KTUtil.addClass(i, n.classShown), KTUtil.css(i, "opacity", "1"), n.state = "shown", n.options.overlay && (n.overlay = KTUtil.insertAfter(document.createElement("DIV"), i), KTUtil.addClass(n.overlay, n.classOverlay), KTUtil.addEvent(n.overlay, "click", function (e) {
					e.stopPropagation(), e.preventDefault(), l.hide(t)
				})), l.eventTrigger("afterShow"))
			}, hide: function (t) {
				"hidden" != n.state && (l.eventTrigger("beforeHide"), l.togglerClass(t, "hide"), KTUtil.removeClass(o, n.classShown), KTUtil.removeClass(i, n.classShown), n.state = "hidden", n.options.overlay && n.overlay && KTUtil.remove(n.overlay), KTUtil.transitionEnd(i, function () {
					KTUtil.css(i, "opacity", "0")
				}), l.eventTrigger("afterHide"))
			}, togglerClass: function (t, e) {
				var i, o = KTUtil.attr(t, "id");
				if (n.options.toggleBy && n.options.toggleBy[0] && n.options.toggleBy[0].target) for (var r in n.options.toggleBy) n.options.toggleBy[r].target === o && (i = n.options.toggleBy[r]); else n.options.toggleBy && n.options.toggleBy.target && (i = n.options.toggleBy);
				if (i) {
					var l = KTUtil.get(i.target);
					"show" === e && KTUtil.addClass(l, i.state), "hide" === e && KTUtil.removeClass(l, i.state)
				}
			}, eventTrigger: function (t, e) {
				for (var i = 0; i < n.events.length; i++) {
					var o = n.events[i];
					o.name == t && (1 == o.one ? 0 == o.fired && (n.events[i].fired = !0, o.handler.call(this, n, e)) : o.handler.call(this, n, e))
				}
			}, addEvent: function (t, e, i) {
				n.events.push({name: t, handler: e, one: i, fired: !1})
			}
		};
		return n.setDefaults = function (t) {
			r = t
		}, n.isShown = function () {
			return l.isShown()
		}, n.hide = function () {
			return l.hide()
		}, n.show = function () {
			return l.show()
		}, n.on = function (t, e) {
			return l.addEvent(t, e)
		}, n.one = function (t, e) {
			return l.addEvent(t, e, !0)
		}, l.construct.apply(n, [e]), !0, n
	}
}, KTScrolltop = function (t, e) {
	var n = this, i = KTUtil.get(t), o = KTUtil.get("body");
	if (i) {
		var r = {offset: 300, speed: 600, toggleClass: "kt-scrolltop--on"}, l = {
			construct: function (t) {
				return KTUtil.data(i).has("scrolltop") ? n = KTUtil.data(i).get("scrolltop") : (l.init(t), l.build(), KTUtil.data(i).set("scrolltop", n)), n
			}, init: function (t) {
				n.events = [], n.options = KTUtil.deepExtend({}, r, t)
			}, build: function () {
				navigator.userAgent.match(/iPhone|iPad|iPod/i) ? (window.addEventListener("touchend", function () {
					l.handle()
				}), window.addEventListener("touchcancel", function () {
					l.handle()
				}), window.addEventListener("touchleave", function () {
					l.handle()
				})) : window.addEventListener("scroll", function () {
					l.handle()
				}), KTUtil.addEvent(i, "click", l.scroll)
			}, handle: function () {
				window.pageYOffset > n.options.offset ? KTUtil.addClass(o, n.options.toggleClass) : KTUtil.removeClass(o, n.options.toggleClass)
			}, scroll: function (t) {
				t.preventDefault(), KTUtil.scrollTop(0, n.options.speed)
			}, eventTrigger: function (t, e) {
				for (var i = 0; i < n.events.length; i++) {
					var o = n.events[i];
					o.name == t && (1 == o.one ? 0 == o.fired && (n.events[i].fired = !0, o.handler.call(this, n, e)) : o.handler.call(this, n, e))
				}
			}, addEvent: function (t, e, i) {
				n.events.push({name: t, handler: e, one: i, fired: !1})
			}
		};
		return n.setDefaults = function (t) {
			r = t
		}, n.on = function (t, e) {
			return l.addEvent(t, e)
		}, n.one = function (t, e) {
			return l.addEvent(t, e, !0)
		}, l.construct.apply(n, [e]), !0, n
	}
}, KTToggle = function (t, e) {
	var n = this, i = KTUtil.get(t);
	KTUtil.get("body");
	if (i) {
		var o = {togglerState: "", targetState: ""}, r = {
			construct: function (t) {
				return KTUtil.data(i).has("toggle") ? n = KTUtil.data(i).get("toggle") : (r.init(t), r.build(), KTUtil.data(i).set("toggle", n)), n
			}, init: function (t) {
				n.element = i, n.events = [], n.options = KTUtil.deepExtend({}, o, t), n.target = KTUtil.get(n.options.target), n.targetState = n.options.targetState, n.togglerState = n.options.togglerState, n.state = KTUtil.hasClasses(n.target, n.targetState) ? "on" : "off"
			}, build: function () {
				KTUtil.addEvent(i, "mouseup", r.toggle)
			}, toggle: function (t) {
				return r.eventTrigger("beforeToggle"), "off" == n.state ? r.toggleOn() : r.toggleOff(), r.eventTrigger("afterToggle"), t.preventDefault(), n
			}, toggleOn: function () {
				return r.eventTrigger("beforeOn"), KTUtil.addClass(n.target, n.targetState), n.togglerState && KTUtil.addClass(i, n.togglerState), n.state = "on", r.eventTrigger("afterOn"), r.eventTrigger("toggle"), n
			}, toggleOff: function () {
				return r.eventTrigger("beforeOff"), KTUtil.removeClass(n.target, n.targetState), n.togglerState && KTUtil.removeClass(i, n.togglerState), n.state = "off", r.eventTrigger("afterOff"), r.eventTrigger("toggle"), n
			}, eventTrigger: function (t) {
				for (var e = 0; e < n.events.length; e++) {
					var i = n.events[e];
					i.name == t && (1 == i.one ? 0 == i.fired && (n.events[e].fired = !0, i.handler.call(this, n)) : i.handler.call(this, n))
				}
			}, addEvent: function (t, e, i) {
				return n.events.push({name: t, handler: e, one: i, fired: !1}), n
			}
		};
		return n.setDefaults = function (t) {
			o = t
		}, n.getState = function () {
			return n.state
		}, n.toggle = function () {
			return r.toggle()
		}, n.toggleOn = function () {
			return r.toggleOn()
		}, n.toggleOff = function () {
			return r.toggleOff()
		}, n.on = function (t, e) {
			return r.addEvent(t, e)
		}, n.one = function (t, e) {
			return r.addEvent(t, e, !0)
		}, r.construct.apply(n, [e]), n
	}
}, KTDialog = function (t) {
	var e, n = this, i = KTUtil.get("body"),
		o = {placement: "top center", type: "loader", width: 100, state: "default", message: "Loading..."}, r = {
			construct: function (t) {
				return r.init(t), n
			}, init: function (t) {
				n.events = [], n.options = KTUtil.deepExtend({}, o, t), n.state = !1
			}, show: function () {
				return r.eventTrigger("show"), e = document.createElement("DIV"), KTUtil.setHTML(e, n.options.message), KTUtil.addClass(e, "kt-dialog kt-dialog--shown"), KTUtil.addClass(e, "kt-dialog--" + n.options.state), KTUtil.addClass(e, "kt-dialog--" + n.options.type), "top center" == n.options.placement && KTUtil.addClass(e, "kt-dialog--top-center"), i.appendChild(e), n.state = "shown", r.eventTrigger("shown"), n
			}, hide: function () {
				return e && (r.eventTrigger("hide"), e.remove(), n.state = "hidden", r.eventTrigger("hidden")), n
			}, eventTrigger: function (t) {
				for (var e = 0; e < n.events.length; e++) {
					var i = n.events[e];
					i.name == t && (1 == i.one ? 0 == i.fired && (n.events[e].fired = !0, i.handler.call(this, n)) : i.handler.call(this, n))
				}
			}, addEvent: function (t, e, i) {
				return n.events.push({name: t, handler: e, one: i, fired: !1}), n
			}
		};
	return n.setDefaults = function (t) {
		o = t
	}, n.shown = function () {
		return "shown" == n.state
	}, n.hidden = function () {
		return "hidden" == n.state
	}, n.show = function () {
		return r.show()
	}, n.hide = function () {
		return r.hide()
	}, n.on = function (t, e) {
		return r.addEvent(t, e)
	}, n.one = function (t, e) {
		return r.addEvent(t, e, !0)
	}, r.construct.apply(n, [t]), n
};
