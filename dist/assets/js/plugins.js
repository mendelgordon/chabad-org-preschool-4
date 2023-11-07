!(function (e, t) {
	"object" == typeof exports && "undefined" != typeof module ? (module.exports = t()) : "function" == typeof define && define.amd ? define(t) : ((e = "undefined" != typeof globalThis ? globalThis : e || self).bootstrap = t());
})(this, function () {
	"use strict";
	const i = new Map(),
		D = {
			set(e, t, s) {
				i.has(e) || i.set(e, new Map());
				e = i.get(e);
				e.has(t) || 0 === e.size ? e.set(t, s) : console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(e.keys())[0]}.`);
			},
			get(e, t) {
				return (i.has(e) && i.get(e).get(t)) || null;
			},
			remove(e, t) {
				var s;
				i.has(e) && ((s = i.get(e)).delete(t), 0 === s.size) && i.delete(e);
			},
		},
		j = 1e3,
		N = "transitionend",
		B = (e) => (e = e && window.CSS && window.CSS.escape ? e.replace(/#([^\s"#']+)/g, (e, t) => "#" + CSS.escape(t)) : e),
		H = (e) => {
			e.dispatchEvent(new Event(N));
		},
		r = (e) => !(!e || "object" != typeof e) && void 0 !== (e = void 0 !== e.jquery ? e[0] : e).nodeType,
		a = (e) => (r(e) ? (e.jquery ? e[0] : e) : "string" == typeof e && 0 < e.length ? document.querySelector(B(e)) : null),
		n = (e) => {
			if (!r(e) || 0 === e.getClientRects().length) return !1;
			var t = "visible" === getComputedStyle(e).getPropertyValue("visibility"),
				s = e.closest("details:not([open])");
			if (s && s !== e) {
				e = e.closest("summary");
				if (e && e.parentNode !== s) return !1;
				if (null === e) return !1;
			}
			return t;
		},
		o = (e) => !e || e.nodeType !== Node.ELEMENT_NODE || !!e.classList.contains("disabled") || (void 0 !== e.disabled ? e.disabled : e.hasAttribute("disabled") && "false" !== e.getAttribute("disabled")),
		F = (e) => {
			var t;
			return document.documentElement.attachShadow ? ("function" == typeof e.getRootNode ? ((t = e.getRootNode()) instanceof ShadowRoot ? t : null) : e instanceof ShadowRoot ? e : e.parentNode ? F(e.parentNode) : null) : null;
		},
		W = () => {},
		R = (e) => {
			e.offsetHeight;
		},
		q = () => (window.jQuery && !document.body.hasAttribute("data-bs-no-jquery") ? window.jQuery : null),
		Y = [],
		l = () => "rtl" === document.documentElement.dir;
	var e = (i) => {
		var e;
		(e = () => {
			const e = q();
			if (e) {
				const t = i.NAME,
					s = e.fn[t];
				(e.fn[t] = i.jQueryInterface), (e.fn[t].Constructor = i), (e.fn[t].noConflict = () => ((e.fn[t] = s), i.jQueryInterface));
			}
		}),
			"loading" === document.readyState
				? (Y.length ||
						document.addEventListener("DOMContentLoaded", () => {
							for (const e of Y) e();
						}),
				  Y.push(e))
				: e();
	};
	const d = (e, t = [], s = e) => ("function" == typeof e ? e(...t) : s),
		X = (s, i, e = !0) => {
			if (e) {
				e =
					((e) => {
						if (!e) return 0;
						let { transitionDuration: t, transitionDelay: s } = window.getComputedStyle(e);
						var e = Number.parseFloat(t),
							i = Number.parseFloat(s);
						return e || i ? ((t = t.split(",")[0]), (s = s.split(",")[0]), (Number.parseFloat(t) + Number.parseFloat(s)) * j) : 0;
					})(i) + 5;
				let t = !1;
				const a = ({ target: e }) => {
					e === i && ((t = !0), i.removeEventListener(N, a), d(s));
				};
				i.addEventListener(N, a),
					setTimeout(() => {
						t || H(i);
					}, e);
			} else d(s);
		},
		G = (e, t, s, i) => {
			var a = e.length;
			let r = e.indexOf(t);
			return -1 === r ? (!s && i ? e[a - 1] : e[0]) : ((r += s ? 1 : -1), i && (r = (r + a) % a), e[Math.max(0, Math.min(r, a - 1))]);
		},
		V = /[^.]*(?=\..*)\.|.*/,
		U = /\..*/,
		Q = /::\d+$/,
		K = {};
	let Z = 1;
	const J = { mouseenter: "mouseover", mouseleave: "mouseout" },
		ee = new Set(["click", "dblclick", "mouseup", "mousedown", "contextmenu", "mousewheel", "DOMMouseScroll", "mouseover", "mouseout", "mousemove", "selectstart", "selectend", "keydown", "keypress", "keyup", "orientationchange", "touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "pointermove", "pointerup", "pointerleave", "pointercancel", "gesturestart", "gesturechange", "gestureend", "focus", "blur", "change", "reset", "select", "submit", "focusin", "focusout", "load", "unload", "beforeunload", "resize", "move", "DOMContentLoaded", "readystatechange", "error", "abort", "scroll"]);
	function te(e, t) {
		return (t && t + "::" + Z++) || e.uidEvent || Z++;
	}
	function se(e) {
		var t = te(e);
		return (e.uidEvent = t), (K[t] = K[t] || {}), K[t];
	}
	function ie(e, t, s = null) {
		return Object.values(e).find((e) => e.callable === t && e.delegationSelector === s);
	}
	function ae(e, t, s) {
		var i = "string" == typeof t,
			t = (!i && t) || s;
		let a = oe(e);
		return [i, t, (a = ee.has(a) ? a : e)];
	}
	function re(i, a, r, n, o) {
		if ("string" == typeof a && i) {
			let [e, t, s] = ae(a, r, n);
			a in J &&
				(t =
					((l = t),
					function (e) {
						if (!e.relatedTarget || (e.relatedTarget !== e.delegateTarget && !e.delegateTarget.contains(e.relatedTarget))) return l.call(this, e);
					}));
			var l,
				d,
				c,
				p,
				u,
				h,
				n = se(i),
				n = n[s] || (n[s] = {}),
				m = ie(n, t, e ? r : null);
			m
				? (m.oneOff = m.oneOff && o)
				: ((m = te(t, a.replace(V, ""))),
				  ((a = e
						? ((p = i),
						  (u = r),
						  (h = t),
						  function t(s) {
								var i = p.querySelectorAll(u);
								for (let e = s["target"]; e && e !== this; e = e.parentNode) for (const a of i) if (a === e) return le(s, { delegateTarget: e }), t.oneOff && f.off(p, s.type, u, h), h.apply(e, [s]);
						  })
						: ((d = i),
						  (c = t),
						  function e(t) {
								return le(t, { delegateTarget: d }), e.oneOff && f.off(d, t.type, c), c.apply(d, [t]);
						  })).delegationSelector = e ? r : null),
				  (a.callable = t),
				  (a.oneOff = o),
				  (n[(a.uidEvent = m)] = a),
				  i.addEventListener(s, a, e));
		}
	}
	function ne(e, t, s, i, a) {
		i = ie(t[s], i, a);
		i && (e.removeEventListener(s, i, Boolean(a)), delete t[s][i.uidEvent]);
	}
	function oe(e) {
		return (e = e.replace(U, "")), J[e] || e;
	}
	const f = {
		on(e, t, s, i) {
			re(e, t, s, i, !1);
		},
		one(e, t, s, i) {
			re(e, t, s, i, !0);
		},
		off(e, t, s, i) {
			if ("string" == typeof t && e) {
				var a,
					r,
					[i, n, o] = ae(t, s, i),
					l = o !== t,
					d = se(e),
					c = d[o] || {},
					p = t.startsWith(".");
				if (void 0 !== n) return Object.keys(c).length ? void ne(e, d, o, n, i ? s : null) : void 0;
				if (p)
					for (const y of Object.keys(d)) {
						h = u = b = v = g = f = m = void 0;
						var u,
							h,
							m = e,
							f = d,
							g = y,
							v = t.slice(1),
							b = f[g] || {};
						for ([u, h] of Object.entries(b)) u.includes(v) && ne(m, f, g, h.callable, h.delegationSelector);
					}
				for ([a, r] of Object.entries(c)) {
					var w = a.replace(Q, "");
					(l && !t.includes(w)) || ne(e, d, o, r.callable, r.delegationSelector);
				}
			}
		},
		trigger(e, t, s) {
			if ("string" != typeof t || !e) return null;
			var i = q();
			let a = null,
				r = !0,
				n = !0,
				o = !1;
			t !== oe(t) && i && ((a = i.Event(t, s)), i(e).trigger(a), (r = !a.isPropagationStopped()), (n = !a.isImmediatePropagationStopped()), (o = a.isDefaultPrevented()));
			i = le(new Event(t, { bubbles: r, cancelable: !0 }), s);
			return o && i.preventDefault(), n && e.dispatchEvent(i), i.defaultPrevented && a && a.preventDefault(), i;
		},
	};
	function le(t, e = {}) {
		for (const [s, i] of Object.entries(e))
			try {
				t[s] = i;
			} catch (e) {
				Object.defineProperty(t, s, {
					configurable: !0,
					get() {
						return i;
					},
				});
			}
		return t;
	}
	function de(t) {
		if ("true" === t) return !0;
		if ("false" === t) return !1;
		if (t === Number(t).toString()) return Number(t);
		if ("" === t || "null" === t) return null;
		if ("string" != typeof t) return t;
		try {
			return JSON.parse(decodeURIComponent(t));
		} catch (e) {
			return t;
		}
	}
	function ce(e) {
		return e.replace(/[A-Z]/g, (e) => "-" + e.toLowerCase());
	}
	const c = {
		setDataAttribute(e, t, s) {
			e.setAttribute("data-bs-" + ce(t), s);
		},
		removeDataAttribute(e, t) {
			e.removeAttribute("data-bs-" + ce(t));
		},
		getDataAttributes(t) {
			if (!t) return {};
			var s = {};
			for (const i of Object.keys(t.dataset).filter((e) => e.startsWith("bs") && !e.startsWith("bsConfig"))) {
				let e = i.replace(/^bs/, "");
				s[(e = e.charAt(0).toLowerCase() + e.slice(1, e.length))] = de(t.dataset[i]);
			}
			return s;
		},
		getDataAttribute(e, t) {
			return de(e.getAttribute("data-bs-" + ce(t)));
		},
	};
	class pe {
		static get Default() {
			return {};
		}
		static get DefaultType() {
			return {};
		}
		static get NAME() {
			throw new Error('You have to implement the static method "NAME", for each component!');
		}
		_getConfig(e) {
			return (e = this._mergeConfigObj(e)), (e = this._configAfterMerge(e)), this._typeCheckConfig(e), e;
		}
		_configAfterMerge(e) {
			return e;
		}
		_mergeConfigObj(e, t) {
			var s = r(t) ? c.getDataAttribute(t, "config") : {};
			return { ...this.constructor.Default, ...("object" == typeof s ? s : {}), ...(r(t) ? c.getDataAttributes(t) : {}), ...("object" == typeof e ? e : {}) };
		}
		_typeCheckConfig(e, t = this.constructor.DefaultType) {
			for (var [s, i] of Object.entries(t)) {
				var a = e[s],
					a = r(a)
						? "element"
						: null == (a = a)
						? "" + a
						: Object.prototype.toString
								.call(a)
								.match(/\s([a-z]+)/i)[1]
								.toLowerCase();
				if (!new RegExp(i).test(a)) throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${s}" provided type "${a}" but expected type "${i}".`);
			}
		}
	}
	class t extends pe {
		constructor(e, t) {
			super(), (e = a(e)) && ((this._element = e), (this._config = this._getConfig(t)), D.set(this._element, this.constructor.DATA_KEY, this));
		}
		dispose() {
			D.remove(this._element, this.constructor.DATA_KEY), f.off(this._element, this.constructor.EVENT_KEY);
			for (const e of Object.getOwnPropertyNames(this)) this[e] = null;
		}
		_queueCallback(e, t, s = !0) {
			X(e, t, s);
		}
		_getConfig(e) {
			return (e = this._mergeConfigObj(e, this._element)), (e = this._configAfterMerge(e)), this._typeCheckConfig(e), e;
		}
		static getInstance(e) {
			return D.get(a(e), this.DATA_KEY);
		}
		static getOrCreateInstance(e, t = {}) {
			return this.getInstance(e) || new this(e, "object" == typeof t ? t : null);
		}
		static get VERSION() {
			return "5.3.2";
		}
		static get DATA_KEY() {
			return "bs." + this.NAME;
		}
		static get EVENT_KEY() {
			return "." + this.DATA_KEY;
		}
		static eventName(e) {
			return "" + e + this.EVENT_KEY;
		}
	}
	const ue = (t) => {
			let s = t.getAttribute("data-bs-target");
			if (!s || "#" === s) {
				let e = t.getAttribute("href");
				if (!e || (!e.includes("#") && !e.startsWith("."))) return null;
				e.includes("#") && !e.startsWith("#") && (e = "#" + e.split("#")[1]), (s = e && "#" !== e ? B(e.trim()) : null);
			}
			return s;
		},
		p = {
			find(e, t = document.documentElement) {
				return [].concat(...Element.prototype.querySelectorAll.call(t, e));
			},
			findOne(e, t = document.documentElement) {
				return Element.prototype.querySelector.call(t, e);
			},
			children(e, t) {
				return [].concat(...e.children).filter((e) => e.matches(t));
			},
			parents(e, t) {
				var s = [];
				let i = e.parentNode.closest(t);
				for (; i; ) s.push(i), (i = i.parentNode.closest(t));
				return s;
			},
			prev(e, t) {
				let s = e.previousElementSibling;
				for (; s; ) {
					if (s.matches(t)) return [s];
					s = s.previousElementSibling;
				}
				return [];
			},
			next(e, t) {
				let s = e.nextElementSibling;
				for (; s; ) {
					if (s.matches(t)) return [s];
					s = s.nextElementSibling;
				}
				return [];
			},
			focusableChildren(e) {
				var t = ["a", "button", "input", "textarea", "select", "details", "[tabindex]", '[contenteditable="true"]'].map((e) => e + ':not([tabindex^="-"])').join(",");
				return this.find(t, e).filter((e) => !o(e) && n(e));
			},
			getSelectorFromElement(e) {
				e = ue(e);
				return e && p.findOne(e) ? e : null;
			},
			getElementFromSelector(e) {
				e = ue(e);
				return e ? p.findOne(e) : null;
			},
			getMultipleElementsFromSelector(e) {
				e = ue(e);
				return e ? p.find(e) : [];
			},
		};
	var he = (t, s = "hide") => {
		var e = "click.dismiss" + t.EVENT_KEY;
		const i = t.NAME;
		f.on(document, e, `[data-bs-dismiss="${i}"]`, function (e) {
			["A", "AREA"].includes(this.tagName) && e.preventDefault(), o(this) || ((e = p.getElementFromSelector(this) || this.closest("." + i)), t.getOrCreateInstance(e)[s]());
		});
	};
	class me extends t {
		static get NAME() {
			return "alert";
		}
		close() {
			var e;
			f.trigger(this._element, "close.bs.alert").defaultPrevented || (this._element.classList.remove("show"), (e = this._element.classList.contains("fade")), this._queueCallback(() => this._destroyElement(), this._element, e));
		}
		_destroyElement() {
			this._element.remove(), f.trigger(this._element, "closed.bs.alert"), this.dispose();
		}
		static jQueryInterface(t) {
			return this.each(function () {
				var e = me.getOrCreateInstance(this);
				if ("string" == typeof t) {
					if (void 0 === e[t] || t.startsWith("_") || "constructor" === t) throw new TypeError(`No method named "${t}"`);
					e[t](this);
				}
			});
		}
	}
	he(me, "close"), e(me);
	const fe = '[data-bs-toggle="button"]';
	class ge extends t {
		static get NAME() {
			return "button";
		}
		toggle() {
			this._element.setAttribute("aria-pressed", this._element.classList.toggle("active"));
		}
		static jQueryInterface(t) {
			return this.each(function () {
				var e = ge.getOrCreateInstance(this);
				"toggle" === t && e[t]();
			});
		}
	}
	f.on(document, "click.bs.button.data-api", fe, (e) => {
		e.preventDefault();
		e = e.target.closest(fe);
		ge.getOrCreateInstance(e).toggle();
	}),
		e(ge);
	const s = ".bs.swipe",
		ve = (s, s, s, s, s, { endCallback: null, leftCallback: null, rightCallback: null }),
		be = { endCallback: "(function|null)", leftCallback: "(function|null)", rightCallback: "(function|null)" };
	class we extends pe {
		constructor(e, t) {
			super(), (this._element = e) && we.isSupported() && ((this._config = this._getConfig(t)), (this._deltaX = 0), (this._supportPointerEvents = Boolean(window.PointerEvent)), this._initEvents());
		}
		static get Default() {
			return ve;
		}
		static get DefaultType() {
			return be;
		}
		static get NAME() {
			return "swipe";
		}
		dispose() {
			f.off(this._element, s);
		}
		_start(e) {
			this._supportPointerEvents ? this._eventIsPointerPenTouch(e) && (this._deltaX = e.clientX) : (this._deltaX = e.touches[0].clientX);
		}
		_end(e) {
			this._eventIsPointerPenTouch(e) && (this._deltaX = e.clientX - this._deltaX), this._handleSwipe(), d(this._config.endCallback);
		}
		_move(e) {
			this._deltaX = e.touches && 1 < e.touches.length ? 0 : e.touches[0].clientX - this._deltaX;
		}
		_handleSwipe() {
			var e = Math.abs(this._deltaX);
			e <= 40 || ((e = e / this._deltaX), (this._deltaX = 0), e && d(0 < e ? this._config.rightCallback : this._config.leftCallback));
		}
		_initEvents() {
			this._supportPointerEvents ? (f.on(this._element, "pointerdown.bs.swipe", (e) => this._start(e)), f.on(this._element, "pointerup.bs.swipe", (e) => this._end(e)), this._element.classList.add("pointer-event")) : (f.on(this._element, "touchstart.bs.swipe", (e) => this._start(e)), f.on(this._element, "touchmove.bs.swipe", (e) => this._move(e)), f.on(this._element, "touchend.bs.swipe", (e) => this._end(e)));
		}
		_eventIsPointerPenTouch(e) {
			return this._supportPointerEvents && ("pen" === e.pointerType || "touch" === e.pointerType);
		}
		static isSupported() {
			return "ontouchstart" in document.documentElement || 0 < navigator.maxTouchPoints;
		}
	}
	var u = ".bs.carousel";
	const ye = "next",
		h = "prev",
		m = "left",
		_e = "right",
		Ee = "slid" + u;
	const xe = "carousel",
		Te = "active",
		Ce = ".active",
		Se = ".carousel-item";
	Ce, Se;
	const $e = { ArrowLeft: _e, ArrowRight: m },
		Me = { interval: 5e3, keyboard: !0, pause: "hover", ride: !1, touch: !0, wrap: !0 },
		Ae = { interval: "(number|boolean)", keyboard: "boolean", pause: "(string|boolean)", ride: "(boolean|string)", touch: "boolean", wrap: "boolean" };
	class ke extends t {
		constructor(e, t) {
			super(e, t), (this._interval = null), (this._activeElement = null), (this._isSliding = !1), (this.touchTimeout = null), (this._swipeHelper = null), (this._indicatorsElement = p.findOne(".carousel-indicators", this._element)), this._addEventListeners(), this._config.ride === xe && this.cycle();
		}
		static get Default() {
			return Me;
		}
		static get DefaultType() {
			return Ae;
		}
		static get NAME() {
			return "carousel";
		}
		next() {
			this._slide(ye);
		}
		nextWhenVisible() {
			!document.hidden && n(this._element) && this.next();
		}
		prev() {
			this._slide(h);
		}
		pause() {
			this._isSliding && H(this._element), this._clearInterval();
		}
		cycle() {
			this._clearInterval(), this._updateInterval(), (this._interval = setInterval(() => this.nextWhenVisible(), this._config.interval));
		}
		_maybeEnableCycle() {
			this._config.ride && (this._isSliding ? f.one(this._element, Ee, () => this.cycle()) : this.cycle());
		}
		to(e) {
			var t,
				s = this._getItems();
			e > s.length - 1 || e < 0 || (this._isSliding ? f.one(this._element, Ee, () => this.to(e)) : (t = this._getItemIndex(this._getActive())) !== e && ((t = t < e ? ye : h), this._slide(t, s[e])));
		}
		dispose() {
			this._swipeHelper && this._swipeHelper.dispose(), super.dispose();
		}
		_configAfterMerge(e) {
			return (e.defaultInterval = e.interval), e;
		}
		_addEventListeners() {
			this._config.keyboard && f.on(this._element, "keydown.bs.carousel", (e) => this._keydown(e)), "hover" === this._config.pause && (f.on(this._element, "mouseenter.bs.carousel", () => this.pause()), f.on(this._element, "mouseleave.bs.carousel", () => this._maybeEnableCycle())), this._config.touch && we.isSupported() && this._addTouchEventListeners();
		}
		_addTouchEventListeners() {
			for (const t of p.find(".carousel-item img", this._element)) f.on(t, "dragstart.bs.carousel", (e) => e.preventDefault());
			var e = {
				leftCallback: () => this._slide(this._directionToOrder(m)),
				rightCallback: () => this._slide(this._directionToOrder(_e)),
				endCallback: () => {
					"hover" === this._config.pause && (this.pause(), this.touchTimeout && clearTimeout(this.touchTimeout), (this.touchTimeout = setTimeout(() => this._maybeEnableCycle(), 500 + this._config.interval)));
				},
			};
			this._swipeHelper = new we(this._element, e);
		}
		_keydown(e) {
			var t;
			/input|textarea/i.test(e.target.tagName) || ((t = $e[e.key]) && (e.preventDefault(), this._slide(this._directionToOrder(t))));
		}
		_getItemIndex(e) {
			return this._getItems().indexOf(e);
		}
		_setActiveIndicatorElement(e) {
			var t;
			this._indicatorsElement && ((t = p.findOne(Ce, this._indicatorsElement)).classList.remove(Te), t.removeAttribute("aria-current"), (t = p.findOne(`[data-bs-slide-to="${e}"]`, this._indicatorsElement))) && (t.classList.add(Te), t.setAttribute("aria-current", "true"));
		}
		_updateInterval() {
			var e = this._activeElement || this._getActive();
			e && ((e = Number.parseInt(e.getAttribute("data-bs-interval"), 10)), (this._config.interval = e || this._config.defaultInterval));
		}
		_slide(t, e = null) {
			if (!this._isSliding) {
				const i = this._getActive();
				var s = t === ye;
				const a = e || G(this._getItems(), i, s, this._config.wrap);
				if (a !== i) {
					const r = this._getItemIndex(a),
						n = (e) => f.trigger(this._element, e, { relatedTarget: a, direction: this._orderToDirection(t), from: this._getItemIndex(i), to: r });
					e = n("slide.bs.carousel");
					if (!e.defaultPrevented && i && a) {
						e = Boolean(this._interval);
						this.pause(), (this._isSliding = !0), this._setActiveIndicatorElement(r), (this._activeElement = a);
						const o = s ? "carousel-item-start" : "carousel-item-end",
							l = s ? "carousel-item-next" : "carousel-item-prev";
						a.classList.add(l), R(a), i.classList.add(o), a.classList.add(o);
						this._queueCallback(
							() => {
								a.classList.remove(o, l), a.classList.add(Te), i.classList.remove(Te, l, o), (this._isSliding = !1), n(Ee);
							},
							i,
							this._isAnimated()
						),
							e && this.cycle();
					}
				}
			}
		}
		_isAnimated() {
			return this._element.classList.contains("slide");
		}
		_getActive() {
			return p.findOne(".active.carousel-item", this._element);
		}
		_getItems() {
			return p.find(Se, this._element);
		}
		_clearInterval() {
			this._interval && (clearInterval(this._interval), (this._interval = null));
		}
		_directionToOrder(e) {
			return l() ? (e === m ? h : ye) : e === m ? ye : h;
		}
		_orderToDirection(e) {
			return l() ? (e === h ? m : _e) : e === h ? _e : m;
		}
		static jQueryInterface(t) {
			return this.each(function () {
				var e = ke.getOrCreateInstance(this, t);
				if ("number" == typeof t) e.to(t);
				else if ("string" == typeof t) {
					if (void 0 === e[t] || t.startsWith("_") || "constructor" === t) throw new TypeError(`No method named "${t}"`);
					e[t]();
				}
			});
		}
	}
	f.on(document, "click.bs.carousel.data-api", "[data-bs-slide], [data-bs-slide-to]", function (e) {
		var t = p.getElementFromSelector(this);
		t && t.classList.contains(xe) && (e.preventDefault(), (e = ke.getOrCreateInstance(t)), (t = this.getAttribute("data-bs-slide-to")) ? e.to(t) : "next" === c.getDataAttribute(this, "slide") ? e.next() : e.prev(), e._maybeEnableCycle());
	}),
		f.on(window, "load.bs.carousel.data-api", () => {
			for (const e of p.find('[data-bs-ride="carousel"]')) ke.getOrCreateInstance(e);
		}),
		e(ke);
	const Oe = "show",
		g = "collapse",
		Pe = "collapsing",
		Le = (g, g, '[data-bs-toggle="collapse"]'),
		Ie = { parent: null, toggle: !0 },
		ze = { parent: "(null|element)", toggle: "boolean" };
	class De extends t {
		constructor(e, t) {
			super(e, t), (this._isTransitioning = !1), (this._triggerArray = []);
			for (const a of p.find(Le)) {
				var s = p.getSelectorFromElement(a),
					i = p.find(s).filter((e) => e === this._element);
				null !== s && i.length && this._triggerArray.push(a);
			}
			this._initializeChildren(), this._config.parent || this._addAriaAndCollapsedClass(this._triggerArray, this._isShown()), this._config.toggle && this.toggle();
		}
		static get Default() {
			return Ie;
		}
		static get DefaultType() {
			return ze;
		}
		static get NAME() {
			return "collapse";
		}
		toggle() {
			this._isShown() ? this.hide() : this.show();
		}
		show() {
			if (!this._isTransitioning && !this._isShown()) {
				let e = [];
				if (
					!(e = this._config.parent
						? this._getFirstLevelChildren(".collapse.show, .collapse.collapsing")
								.filter((e) => e !== this._element)
								.map((e) => De.getOrCreateInstance(e, { toggle: !1 }))
						: e).length ||
					!e[0]._isTransitioning
				) {
					var t = f.trigger(this._element, "show.bs.collapse");
					if (!t.defaultPrevented) {
						for (const i of e) i.hide();
						const s = this._getDimension();
						this._element.classList.remove(g), this._element.classList.add(Pe), (this._element.style[s] = 0), this._addAriaAndCollapsedClass(this._triggerArray, !0), (this._isTransitioning = !0);
						t = "scroll" + (s[0].toUpperCase() + s.slice(1));
						this._queueCallback(
							() => {
								(this._isTransitioning = !1), this._element.classList.remove(Pe), this._element.classList.add(g, Oe), (this._element.style[s] = ""), f.trigger(this._element, "shown.bs.collapse");
							},
							this._element,
							!0
						),
							(this._element.style[s] = this._element[t] + "px");
					}
				}
			}
		}
		hide() {
			if (!this._isTransitioning && this._isShown()) {
				var e = f.trigger(this._element, "hide.bs.collapse");
				if (!e.defaultPrevented) {
					e = this._getDimension();
					(this._element.style[e] = this._element.getBoundingClientRect()[e] + "px"), R(this._element), this._element.classList.add(Pe), this._element.classList.remove(g, Oe);
					for (const s of this._triggerArray) {
						var t = p.getElementFromSelector(s);
						t && !this._isShown(t) && this._addAriaAndCollapsedClass([s], !1);
					}
					this._isTransitioning = !0;
					(this._element.style[e] = ""),
						this._queueCallback(
							() => {
								(this._isTransitioning = !1), this._element.classList.remove(Pe), this._element.classList.add(g), f.trigger(this._element, "hidden.bs.collapse");
							},
							this._element,
							!0
						);
				}
			}
		}
		_isShown(e = this._element) {
			return e.classList.contains(Oe);
		}
		_configAfterMerge(e) {
			return (e.toggle = Boolean(e.toggle)), (e.parent = a(e.parent)), e;
		}
		_getDimension() {
			return this._element.classList.contains("collapse-horizontal") ? "width" : "height";
		}
		_initializeChildren() {
			if (this._config.parent)
				for (const t of this._getFirstLevelChildren(Le)) {
					var e = p.getElementFromSelector(t);
					e && this._addAriaAndCollapsedClass([t], this._isShown(e));
				}
		}
		_getFirstLevelChildren(e) {
			const t = p.find(":scope .collapse .collapse", this._config.parent);
			return p.find(e, this._config.parent).filter((e) => !t.includes(e));
		}
		_addAriaAndCollapsedClass(e, t) {
			if (e.length) for (const s of e) s.classList.toggle("collapsed", !t), s.setAttribute("aria-expanded", t);
		}
		static jQueryInterface(t) {
			const s = {};
			return (
				"string" == typeof t && /show|hide/.test(t) && (s.toggle = !1),
				this.each(function () {
					var e = De.getOrCreateInstance(this, s);
					if ("string" == typeof t) {
						if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
						e[t]();
					}
				})
			);
		}
	}
	f.on(document, "click.bs.collapse.data-api", Le, function (e) {
		("A" === e.target.tagName || (e.delegateTarget && "A" === e.delegateTarget.tagName)) && e.preventDefault();
		for (const t of p.getMultipleElementsFromSelector(this)) De.getOrCreateInstance(t, { toggle: !1 }).toggle();
	}),
		e(De);
	var $ = "top",
		M = "bottom",
		A = "right",
		k = "left",
		je = "auto",
		O = [$, M, A, k],
		P = "start",
		Ne = "end",
		Be = "clippingParents",
		He = "viewport",
		Fe = "popper",
		We = "reference",
		Re = O.reduce(function (e, t) {
			return e.concat([t + "-" + P, t + "-" + Ne]);
		}, []),
		qe = [].concat(O, [je]).reduce(function (e, t) {
			return e.concat([t, t + "-" + P, t + "-" + Ne]);
		}, []),
		u = "beforeRead",
		Ye = "afterRead",
		Xe = "beforeMain",
		Ge = "afterMain",
		Ve = "beforeWrite",
		Ue = "afterWrite",
		Qe = [u, "read", Ye, Xe, "main", Ge, Ve, "write", Ue];
	function v(e) {
		return e ? (e.nodeName || "").toLowerCase() : null;
	}
	function w(e) {
		var t;
		return null == e ? window : "[object Window]" !== e.toString() ? ((t = e.ownerDocument) && t.defaultView) || window : e;
	}
	function b(e) {
		return e instanceof w(e).Element || e instanceof Element;
	}
	function y(e) {
		return e instanceof w(e).HTMLElement || e instanceof HTMLElement;
	}
	function Ke(e) {
		return "undefined" != typeof ShadowRoot && (e instanceof w(e).ShadowRoot || e instanceof ShadowRoot);
	}
	var Ze = {
		name: "applyStyles",
		enabled: !0,
		phase: "write",
		fn: function (e) {
			var a = e.state;
			Object.keys(a.elements).forEach(function (e) {
				var t = a.styles[e] || {},
					s = a.attributes[e] || {},
					i = a.elements[e];
				y(i) &&
					v(i) &&
					(Object.assign(i.style, t),
					Object.keys(s).forEach(function (e) {
						var t = s[e];
						!1 === t ? i.removeAttribute(e) : i.setAttribute(e, !0 === t ? "" : t);
					}));
			});
		},
		effect: function (e) {
			var i = e.state,
				a = { popper: { position: i.options.strategy, left: "0", top: "0", margin: "0" }, arrow: { position: "absolute" }, reference: {} };
			return (
				Object.assign(i.elements.popper.style, a.popper),
				(i.styles = a),
				i.elements.arrow && Object.assign(i.elements.arrow.style, a.arrow),
				function () {
					Object.keys(i.elements).forEach(function (e) {
						var t = i.elements[e],
							s = i.attributes[e] || {},
							e = Object.keys((i.styles.hasOwnProperty(e) ? i.styles : a)[e]).reduce(function (e, t) {
								return (e[t] = ""), e;
							}, {});
						y(t) &&
							v(t) &&
							(Object.assign(t.style, e),
							Object.keys(s).forEach(function (e) {
								t.removeAttribute(e);
							}));
					});
				}
			);
		},
		requires: ["computeStyles"],
	};
	function L(e) {
		return e.split("-")[0];
	}
	var S = Math.max,
		Je = Math.min,
		et = Math.round;
	function tt() {
		var e = navigator.userAgentData;
		return null != e && e.brands && Array.isArray(e.brands)
			? e.brands
					.map(function (e) {
						return e.brand + "/" + e.version;
					})
					.join(" ")
			: navigator.userAgent;
	}
	function st() {
		return !/^((?!chrome|android).)*safari/i.test(tt());
	}
	function it(e, t, s) {
		void 0 === t && (t = !1), void 0 === s && (s = !1);
		var i = e.getBoundingClientRect(),
			a = 1,
			r = 1;
		t && y(e) && ((a = (0 < e.offsetWidth && et(i.width) / e.offsetWidth) || 1), (r = (0 < e.offsetHeight && et(i.height) / e.offsetHeight) || 1));
		(t = (b(e) ? w(e) : window).visualViewport), (e = !st() && s), (s = (i.left + (e && t ? t.offsetLeft : 0)) / a), (e = (i.top + (e && t ? t.offsetTop : 0)) / r), (t = i.width / a), (a = i.height / r);
		return { width: t, height: a, top: e, right: s + t, bottom: e + a, left: s, x: s, y: e };
	}
	function at(e) {
		var t = it(e),
			s = e.offsetWidth,
			i = e.offsetHeight;
		return Math.abs(t.width - s) <= 1 && (s = t.width), Math.abs(t.height - i) <= 1 && (i = t.height), { x: e.offsetLeft, y: e.offsetTop, width: s, height: i };
	}
	function rt(e, t) {
		var s = t.getRootNode && t.getRootNode();
		if (e.contains(t)) return !0;
		if (s && Ke(s)) {
			var i = t;
			do {
				if (i && e.isSameNode(i)) return !0;
			} while ((i = i.parentNode || i.host));
		}
		return !1;
	}
	function _(e) {
		return w(e).getComputedStyle(e);
	}
	function E(e) {
		return ((b(e) ? e.ownerDocument : e.document) || window.document).documentElement;
	}
	function nt(e) {
		return "html" === v(e) ? e : e.assignedSlot || e.parentNode || (Ke(e) ? e.host : null) || E(e);
	}
	function ot(e) {
		return y(e) && "fixed" !== _(e).position ? e.offsetParent : null;
	}
	function lt(e) {
		for (var t, s = w(e), i = ot(e); i && ((t = i), 0 <= ["table", "td", "th"].indexOf(v(t))) && "static" === _(i).position; ) i = ot(i);
		return (
			((!i || ("html" !== v(i) && ("body" !== v(i) || "static" !== _(i).position))) &&
				(i ||
					(function (e) {
						var t = /firefox/i.test(tt()),
							s = /Trident/i.test(tt());
						if (!s || !y(e) || "fixed" !== _(e).position) {
							var i = nt(e);
							for (Ke(i) && (i = i.host); y(i) && ["html", "body"].indexOf(v(i)) < 0; ) {
								var a = _(i);
								if ("none" !== a.transform || "none" !== a.perspective || "paint" === a.contain || -1 !== ["transform", "perspective"].indexOf(a.willChange) || (t && "filter" === a.willChange) || (t && a.filter && "none" !== a.filter)) return i;
								i = i.parentNode;
							}
						}
						return null;
					})(e))) ||
			s
		);
	}
	function dt(e) {
		return 0 <= ["top", "bottom"].indexOf(e) ? "x" : "y";
	}
	function ct(e, t, s) {
		return S(e, Je(t, s));
	}
	function pt() {
		return { top: 0, right: 0, bottom: 0, left: 0 };
	}
	function ut(e) {
		return Object.assign({}, pt(), e);
	}
	function ht(s, e) {
		return e.reduce(function (e, t) {
			return (e[t] = s), e;
		}, {});
	}
	var mt = {
		name: "arrow",
		enabled: !0,
		phase: "main",
		fn: function (e) {
			var t,
				s,
				i,
				a,
				r = e.state,
				n = e.name,
				e = e.options,
				o = r.elements.arrow,
				l = r.modifiersData.popperOffsets,
				d = dt((c = L(r.placement))),
				c = 0 <= [k, A].indexOf(c) ? "height" : "width";
			o && l && ((e = e.padding), (s = r), (s = ut("number" != typeof (e = "function" == typeof e ? e(Object.assign({}, s.rects, { placement: s.placement })) : e) ? e : ht(e, O))), (e = at(o)), (a = "y" === d ? $ : k), (i = "y" === d ? M : A), (t = r.rects.reference[c] + r.rects.reference[d] - l[d] - r.rects.popper[c]), (l = l[d] - r.rects.reference[d]), (o = (o = lt(o)) ? ("y" === d ? o.clientHeight || 0 : o.clientWidth || 0) : 0), (a = s[a]), (s = o - e[c] - s[i]), (a = ct(a, (i = o / 2 - e[c] / 2 + (t / 2 - l / 2)), s)), (r.modifiersData[n] = (((o = {})[d] = a), (o.centerOffset = a - i), o)));
		},
		effect: function (e) {
			var t = e.state;
			null != (e = void 0 === (e = e.options.element) ? "[data-popper-arrow]" : e) && ("string" != typeof e || (e = t.elements.popper.querySelector(e))) && rt(t.elements.popper, e) && (t.elements.arrow = e);
		},
		requires: ["popperOffsets"],
		requiresIfExists: ["preventOverflow"],
	};
	function ft(e) {
		return e.split("-")[1];
	}
	var gt = { top: "auto", right: "auto", bottom: "auto", left: "auto" };
	function vt(e) {
		var t,
			s = e.popper,
			i = e.popperRect,
			a = e.placement,
			r = e.variation,
			n = e.offsets,
			o = e.position,
			l = e.gpuAcceleration,
			d = e.adaptive,
			c = e.roundOffsets,
			e = e.isFixed,
			p = n.x,
			p = void 0 === p ? 0 : p,
			u = n.y,
			u = void 0 === u ? 0 : u,
			h = "function" == typeof c ? c({ x: p, y: u }) : { x: p, y: u },
			h = ((p = h.x), (u = h.y), n.hasOwnProperty("x")),
			n = n.hasOwnProperty("y"),
			m = k,
			f = $,
			g = window,
			v = (d && ((v = "clientHeight"), (t = "clientWidth"), (b = lt(s)) === w(s) && "static" !== _((b = E(s))).position && "absolute" === o && ((v = "scrollHeight"), (t = "scrollWidth")), (a !== $ && ((a !== k && a !== A) || r !== Ne)) || ((f = M), (u = (u - ((e && b === g && g.visualViewport ? g.visualViewport.height : b[v]) - i.height)) * (l ? 1 : -1))), (a !== k && ((a !== $ && a !== M) || r !== Ne)) || ((m = A), (p = (p - ((e && b === g && g.visualViewport ? g.visualViewport.width : b[t]) - i.width)) * (l ? 1 : -1)))), Object.assign({ position: o }, d && gt)),
			b = !0 === c ? ((a = { x: p, y: u }), (r = w(s)), (e = a.x), (a = a.y), (r = r.devicePixelRatio || 1), { x: et(e * r) / r || 0, y: et(a * r) / r || 0 }) : { x: p, y: u };
		return (p = b.x), (u = b.y), l ? Object.assign({}, v, (((t = {})[f] = n ? "0" : ""), (t[m] = h ? "0" : ""), (t.transform = (g.devicePixelRatio || 1) <= 1 ? "translate(" + p + "px, " + u + "px)" : "translate3d(" + p + "px, " + u + "px, 0)"), t)) : Object.assign({}, v, (((i = {})[f] = n ? u + "px" : ""), (i[m] = h ? p + "px" : ""), (i.transform = ""), i));
	}
	var bt = {
			name: "computeStyles",
			enabled: !0,
			phase: "beforeWrite",
			fn: function (e) {
				var t = e.state,
					e = e.options,
					s = void 0 === (s = e.gpuAcceleration) || s,
					i = void 0 === (i = e.adaptive) || i,
					e = void 0 === (e = e.roundOffsets) || e,
					s = { placement: L(t.placement), variation: ft(t.placement), popper: t.elements.popper, popperRect: t.rects.popper, gpuAcceleration: s, isFixed: "fixed" === t.options.strategy };
				null != t.modifiersData.popperOffsets && (t.styles.popper = Object.assign({}, t.styles.popper, vt(Object.assign({}, s, { offsets: t.modifiersData.popperOffsets, position: t.options.strategy, adaptive: i, roundOffsets: e })))), null != t.modifiersData.arrow && (t.styles.arrow = Object.assign({}, t.styles.arrow, vt(Object.assign({}, s, { offsets: t.modifiersData.arrow, position: "absolute", adaptive: !1, roundOffsets: e })))), (t.attributes.popper = Object.assign({}, t.attributes.popper, { "data-popper-placement": t.placement }));
			},
			data: {},
		},
		wt = { passive: !0 };
	var yt = {
			name: "eventListeners",
			enabled: !0,
			phase: "write",
			fn: function () {},
			effect: function (e) {
				var t = e.state,
					s = e.instance,
					i = (e = e.options).scroll,
					a = void 0 === i || i,
					r = void 0 === (i = e.resize) || i,
					n = w(t.elements.popper),
					o = [].concat(t.scrollParents.reference, t.scrollParents.popper);
				return (
					a &&
						o.forEach(function (e) {
							e.addEventListener("scroll", s.update, wt);
						}),
					r && n.addEventListener("resize", s.update, wt),
					function () {
						a &&
							o.forEach(function (e) {
								e.removeEventListener("scroll", s.update, wt);
							}),
							r && n.removeEventListener("resize", s.update, wt);
					}
				);
			},
			data: {},
		},
		_t = { left: "right", right: "left", bottom: "top", top: "bottom" };
	function Et(e) {
		return e.replace(/left|right|bottom|top/g, function (e) {
			return _t[e];
		});
	}
	var xt = { start: "end", end: "start" };
	function Tt(e) {
		return e.replace(/start|end/g, function (e) {
			return xt[e];
		});
	}
	function Ct(e) {
		e = w(e);
		return { scrollLeft: e.pageXOffset, scrollTop: e.pageYOffset };
	}
	function St(e) {
		return it(E(e)).left + Ct(e).scrollLeft;
	}
	function $t(e) {
		var e = _(e),
			t = e.overflow,
			s = e.overflowX,
			e = e.overflowY;
		return /auto|scroll|overlay|hidden/.test(t + e + s);
	}
	function Mt(e, t) {
		void 0 === t && (t = []);
		var s = (function e(t) {
				return 0 <= ["html", "body", "#document"].indexOf(v(t)) ? t.ownerDocument.body : y(t) && $t(t) ? t : e(nt(t));
			})(e),
			e = s === (null == (e = e.ownerDocument) ? void 0 : e.body),
			i = w(s),
			i = e ? [i].concat(i.visualViewport || [], $t(s) ? s : []) : s,
			s = t.concat(i);
		return e ? s : s.concat(Mt(nt(i)));
	}
	function At(e) {
		return Object.assign({}, e, { left: e.x, top: e.y, right: e.x + e.width, bottom: e.y + e.height });
	}
	function kt(e, t, s) {
		return t === He ? At(((a = s), (n = w((i = e))), (o = E(i)), (n = n.visualViewport), (l = o.clientWidth), (o = o.clientHeight), (c = d = 0), n && ((l = n.width), (o = n.height), (r = st()) || (!r && "fixed" === a)) && ((d = n.offsetLeft), (c = n.offsetTop)), { width: l, height: o, x: d + St(i), y: c })) : b(t) ? (((a = it((r = t), !1, "fixed" === (a = s))).top = a.top + r.clientTop), (a.left = a.left + r.clientLeft), (a.bottom = a.top + r.clientHeight), (a.right = a.left + r.clientWidth), (a.width = r.clientWidth), (a.height = r.clientHeight), (a.x = a.left), (a.y = a.top), a) : At(((n = E(e)), (l = E(n)), (o = Ct(n)), (d = null == (d = n.ownerDocument) ? void 0 : d.body), (i = S(l.scrollWidth, l.clientWidth, d ? d.scrollWidth : 0, d ? d.clientWidth : 0)), (c = S(l.scrollHeight, l.clientHeight, d ? d.scrollHeight : 0, d ? d.clientHeight : 0)), (n = -o.scrollLeft + St(n)), (o = -o.scrollTop), "rtl" === _(d || l).direction && (n += S(l.clientWidth, d ? d.clientWidth : 0) - i), { width: i, height: c, x: n, y: o }));
		var i, a, r, n, o, l, d, c;
	}
	function Ot(s, e, t, i) {
		var a,
			r =
				"clippingParents" === e
					? ((n = Mt(nt((r = s)))),
					  b((a = 0 <= ["absolute", "fixed"].indexOf(_(r).position) && y(r) ? lt(r) : r))
							? n.filter(function (e) {
									return b(e) && rt(e, a) && "body" !== v(e);
							  })
							: [])
					: [].concat(e),
			n = [].concat(r, [t]),
			e = n[0],
			t = n.reduce(function (e, t) {
				t = kt(s, t, i);
				return (e.top = S(t.top, e.top)), (e.right = Je(t.right, e.right)), (e.bottom = Je(t.bottom, e.bottom)), (e.left = S(t.left, e.left)), e;
			}, kt(s, e, i));
		return (t.width = t.right - t.left), (t.height = t.bottom - t.top), (t.x = t.left), (t.y = t.top), t;
	}
	function Pt(e) {
		var t,
			s = e.reference,
			i = e.element,
			e = e.placement,
			a = e ? L(e) : null,
			e = e ? ft(e) : null,
			r = s.x + s.width / 2 - i.width / 2,
			n = s.y + s.height / 2 - i.height / 2;
		switch (a) {
			case $:
				t = { x: r, y: s.y - i.height };
				break;
			case M:
				t = { x: r, y: s.y + s.height };
				break;
			case A:
				t = { x: s.x + s.width, y: n };
				break;
			case k:
				t = { x: s.x - i.width, y: n };
				break;
			default:
				t = { x: s.x, y: s.y };
		}
		var o = a ? dt(a) : null;
		if (null != o) {
			var l = "y" === o ? "height" : "width";
			switch (e) {
				case P:
					t[o] = t[o] - (s[l] / 2 - i[l] / 2);
					break;
				case Ne:
					t[o] = t[o] + (s[l] / 2 - i[l] / 2);
			}
		}
		return t;
	}
	function Lt(e, t) {
		var i,
			t = (t = void 0 === t ? {} : t),
			s = t.placement,
			s = void 0 === s ? e.placement : s,
			a = t.strategy,
			a = void 0 === a ? e.strategy : a,
			r = t.boundary,
			r = void 0 === r ? Be : r,
			n = t.rootBoundary,
			n = void 0 === n ? He : n,
			o = t.elementContext,
			o = void 0 === o ? Fe : o,
			l = t.altBoundary,
			l = void 0 !== l && l,
			t = t.padding,
			t = void 0 === t ? 0 : t,
			t = ut("number" != typeof t ? t : ht(t, O)),
			d = e.rects.popper,
			l = e.elements[l ? (o === Fe ? We : Fe) : o],
			l = Ot(b(l) ? l : l.contextElement || E(e.elements.popper), r, n, a),
			r = it(e.elements.reference),
			n = Pt({ reference: r, element: d, strategy: "absolute", placement: s }),
			a = At(Object.assign({}, d, n)),
			d = o === Fe ? a : r,
			c = { top: l.top - d.top + t.top, bottom: d.bottom - l.bottom + t.bottom, left: l.left - d.left + t.left, right: d.right - l.right + t.right },
			n = e.modifiersData.offset;
		return (
			o === Fe &&
				n &&
				((i = n[s]),
				Object.keys(c).forEach(function (e) {
					var t = 0 <= [A, M].indexOf(e) ? 1 : -1,
						s = 0 <= [$, M].indexOf(e) ? "y" : "x";
					c[e] += i[s] * t;
				})),
			c
		);
	}
	var It = {
		name: "flip",
		enabled: !0,
		phase: "main",
		fn: function (e) {
			var p = e.state,
				t = e.options,
				e = e.name;
			if (!p.modifiersData[e]._skip) {
				for (
					var s = t.mainAxis,
						i = void 0 === s || s,
						s = t.altAxis,
						a = void 0 === s || s,
						s = t.fallbackPlacements,
						u = t.padding,
						h = t.boundary,
						m = t.rootBoundary,
						r = t.altBoundary,
						n = t.flipVariations,
						f = void 0 === n || n,
						g = t.allowedAutoPlacements,
						n = p.options.placement,
						t = L(n),
						s = s || (t === n || !f ? [Et(n)] : L((s = n)) === je ? [] : ((t = Et(s)), [Tt(s), t, Tt(t)])),
						o = [n].concat(s).reduce(function (e, t) {
							return e.concat(
								L(t) === je
									? ((s = p),
									  (i = (e = e = void 0 === (e = { placement: t, boundary: h, rootBoundary: m, padding: u, flipVariations: f, allowedAutoPlacements: g }) ? {} : e).placement),
									  (a = e.boundary),
									  (r = e.rootBoundary),
									  (n = e.padding),
									  (o = e.flipVariations),
									  (l = void 0 === (e = e.allowedAutoPlacements) ? qe : e),
									  (d = ft(i)),
									  (e = d
											? o
												? Re
												: Re.filter(function (e) {
														return ft(e) === d;
												  })
											: O),
									  (c = (i =
											0 ===
											(i = e.filter(function (e) {
												return 0 <= l.indexOf(e);
											})).length
												? e
												: i).reduce(function (e, t) {
											return (e[t] = Lt(s, { placement: t, boundary: a, rootBoundary: r, padding: n })[L(t)]), e;
									  }, {})),
									  Object.keys(c).sort(function (e, t) {
											return c[e] - c[t];
									  }))
									: t
							);
							var s, i, a, r, n, o, l, d, c;
						}, []),
						l = p.rects.reference,
						d = p.rects.popper,
						c = new Map(),
						v = !0,
						b = o[0],
						w = 0;
					w < o.length;
					w++
				) {
					var y = o[w],
						_ = L(y),
						E = ft(y) === P,
						x = 0 <= [$, M].indexOf(_),
						T = x ? "width" : "height",
						C = Lt(p, { placement: y, boundary: h, rootBoundary: m, altBoundary: r, padding: u }),
						x = x ? (E ? A : k) : E ? M : $,
						E = (l[T] > d[T] && (x = Et(x)), Et(x)),
						T = [];
					if (
						(i && T.push(C[_] <= 0),
						a && T.push(C[x] <= 0, C[E] <= 0),
						T.every(function (e) {
							return e;
						}))
					) {
						(b = y), (v = !1);
						break;
					}
					c.set(y, T);
				}
				if (v)
					for (var S = f ? 3 : 1; 0 < S; S--)
						if (
							"break" ===
							(function (t) {
								var e = o.find(function (e) {
									e = c.get(e);
									if (e)
										return e.slice(0, t).every(function (e) {
											return e;
										});
								});
								if (e) return (b = e), "break";
							})(S)
						)
							break;
				p.placement !== b && ((p.modifiersData[e]._skip = !0), (p.placement = b), (p.reset = !0));
			}
		},
		requiresIfExists: ["offset"],
		data: { _skip: !1 },
	};
	function zt(e, t, s) {
		return { top: e.top - t.height - (s = void 0 === s ? { x: 0, y: 0 } : s).y, right: e.right - t.width + s.x, bottom: e.bottom - t.height + s.y, left: e.left - t.width - s.x };
	}
	function Dt(t) {
		return [$, A, M, k].some(function (e) {
			return 0 <= t[e];
		});
	}
	var jt = {
		name: "hide",
		enabled: !0,
		phase: "main",
		requiresIfExists: ["preventOverflow"],
		fn: function (e) {
			var t = e.state,
				e = e.name,
				s = t.rects.reference,
				i = t.rects.popper,
				a = t.modifiersData.preventOverflow,
				r = Lt(t, { elementContext: "reference" }),
				n = Lt(t, { altBoundary: !0 }),
				r = zt(r, s),
				s = zt(n, i, a),
				n = Dt(r),
				i = Dt(s);
			(t.modifiersData[e] = { referenceClippingOffsets: r, popperEscapeOffsets: s, isReferenceHidden: n, hasPopperEscaped: i }), (t.attributes.popper = Object.assign({}, t.attributes.popper, { "data-popper-reference-hidden": n, "data-popper-escaped": i }));
		},
	};
	var Nt = {
		name: "offset",
		enabled: !0,
		phase: "main",
		requires: ["popperOffsets"],
		fn: function (e) {
			var n = e.state,
				t = e.options,
				e = e.name,
				o = void 0 === (t = t.offset) ? [0, 0] : t,
				t = qe.reduce(function (e, t) {
					var s, i, a, r;
					return (e[t] = ((t = t), (s = n.rects), (i = o), (a = L(t)), (r = 0 <= [k, $].indexOf(a) ? -1 : 1), (t = (s = "function" == typeof i ? i(Object.assign({}, s, { placement: t })) : i)[0] || 0), (i = (s[1] || 0) * r), 0 <= [k, A].indexOf(a) ? { x: i, y: t } : { x: t, y: i })), e;
				}, {}),
				s = (i = t[n.placement]).x,
				i = i.y;
			null != n.modifiersData.popperOffsets && ((n.modifiersData.popperOffsets.x += s), (n.modifiersData.popperOffsets.y += i)), (n.modifiersData[e] = t);
		},
	};
	var Bt = {
		name: "popperOffsets",
		enabled: !0,
		phase: "read",
		fn: function (e) {
			var t = e.state,
				e = e.name;
			t.modifiersData[e] = Pt({ reference: t.rects.reference, element: t.rects.popper, strategy: "absolute", placement: t.placement });
		},
		data: {},
	};
	var Ht = {
		name: "preventOverflow",
		enabled: !0,
		phase: "main",
		fn: function (e) {
			var t,
				s,
				i,
				a,
				r,
				n,
				o,
				l,
				d,
				c = e.state,
				p = e.options,
				e = e.name,
				u = void 0 === (u = p.mainAxis) || u,
				h = void 0 !== (h = p.altAxis) && h,
				m = p.boundary,
				f = p.rootBoundary,
				g = p.altBoundary,
				v = p.padding,
				b = void 0 === (b = p.tether) || b,
				p = void 0 === (p = p.tetherOffset) ? 0 : p,
				m = Lt(c, { boundary: m, rootBoundary: f, padding: v, altBoundary: g }),
				f = L(c.placement),
				g = !(v = ft(c.placement)),
				w = dt(f),
				y = "x" === w ? "y" : "x",
				_ = c.modifiersData.popperOffsets,
				E = c.rects.reference,
				x = c.rects.popper,
				p = "number" == typeof (p = "function" == typeof p ? p(Object.assign({}, c.rects, { placement: c.placement })) : p) ? { mainAxis: p, altAxis: p } : Object.assign({ mainAxis: 0, altAxis: 0 }, p),
				T = c.modifiersData.offset ? c.modifiersData.offset[c.placement] : null,
				C = { x: 0, y: 0 };
			_ && (u && ((u = "y" === w ? "height" : "width"), (n = (o = _[w]) + m[(s = "y" === w ? $ : k)]), (l = o - m[(d = "y" === w ? M : A)]), (t = b ? -x[u] / 2 : 0), (a = (v === P ? E : x)[u]), (v = v === P ? -x[u] : -E[u]), (r = c.elements.arrow), (r = b && r ? at(r) : { width: 0, height: 0 }), (s = (i = c.modifiersData["arrow#persistent"] ? c.modifiersData["arrow#persistent"].padding : pt())[s]), (i = i[d]), (d = ct(0, E[u], r[u])), (r = g ? E[u] / 2 - t - d - s - p.mainAxis : a - d - s - p.mainAxis), (a = g ? -E[u] / 2 + t + d + i + p.mainAxis : v + d + i + p.mainAxis), (g = (s = c.elements.arrow && lt(c.elements.arrow)) ? ("y" === w ? s.clientTop || 0 : s.clientLeft || 0) : 0), (v = o + a - (t = null != (u = null == T ? void 0 : T[w]) ? u : 0)), (d = ct(b ? Je(n, o + r - t - g) : n, o, b ? S(l, v) : l)), (_[w] = d), (C[w] = d - o)), h && ((i = "y" == y ? "height" : "width"), (a = (s = _[y]) + m["x" === w ? $ : k]), (u = s - m["x" === w ? M : A]), (r = -1 !== [$, k].indexOf(f)), (g = null != (t = null == T ? void 0 : T[y]) ? t : 0), (n = r ? a : s - E[i] - x[i] - g + p.altAxis), (v = r ? s + E[i] + x[i] - g - p.altAxis : u), (o = b && r ? ((l = ct((l = n), s, (d = v))), d < l ? d : l) : ct(b ? n : a, s, b ? v : u)), (_[y] = o), (C[y] = o - s)), (c.modifiersData[e] = C));
		},
		requiresIfExists: ["offset"],
	};
	function Ft(e, t, s) {
		void 0 === s && (s = !1);
		var i = y(t),
			a = y(t) && ((n = (a = t).getBoundingClientRect()), (r = et(n.width) / a.offsetWidth || 1), (n = et(n.height) / a.offsetHeight || 1), 1 !== r || 1 !== n),
			r = E(t),
			n = it(e, a, s),
			e = { scrollLeft: 0, scrollTop: 0 },
			o = { x: 0, y: 0 };
		return (!i && s) || (("body" === v(t) && !$t(r)) || (e = (i = t) !== w(i) && y(i) ? { scrollLeft: i.scrollLeft, scrollTop: i.scrollTop } : Ct(i)), y(t) ? (((o = it(t, !0)).x += t.clientLeft), (o.y += t.clientTop)) : r && (o.x = St(r))), { x: n.left + e.scrollLeft - o.x, y: n.top + e.scrollTop - o.y, width: n.width, height: n.height };
	}
	function Wt(e) {
		var s = new Map(),
			i = new Set(),
			a = [];
		return (
			e.forEach(function (e) {
				s.set(e.name, e);
			}),
			e.forEach(function (e) {
				i.has(e.name) ||
					!(function t(e) {
						i.add(e.name),
							[].concat(e.requires || [], e.requiresIfExists || []).forEach(function (e) {
								i.has(e) || ((e = s.get(e)) && t(e));
							}),
							a.push(e);
					})(e);
			}),
			a
		);
	}
	var Rt = { placement: "bottom", modifiers: [], strategy: "absolute" };
	function qt() {
		for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++) t[s] = arguments[s];
		return !t.some(function (e) {
			return !(e && "function" == typeof e.getBoundingClientRect);
		});
	}
	function Yt(e) {
		var e = (e = void 0 === e ? {} : e),
			t = e.defaultModifiers,
			p = void 0 === t ? [] : t,
			t = e.defaultOptions,
			u = void 0 === t ? Rt : t;
		return function (i, a, t) {
			void 0 === t && (t = u);
			var s,
				r,
				n = { placement: "bottom", orderedModifiers: [], options: Object.assign({}, Rt, u), modifiersData: {}, elements: { reference: i, popper: a }, attributes: {}, styles: {} },
				o = [],
				l = !1,
				d = {
					state: n,
					setOptions: function (e) {
						var s,
							t,
							e = "function" == typeof e ? e(n.options) : e,
							e =
								(c(),
								(n.options = Object.assign({}, u, n.options, e)),
								(n.scrollParents = { reference: b(i) ? Mt(i) : i.contextElement ? Mt(i.contextElement) : [], popper: Mt(a) }),
								(e = [].concat(p, n.options.modifiers)),
								(t = e.reduce(function (e, t) {
									var s = e[t.name];
									return (e[t.name] = s ? Object.assign({}, s, t, { options: Object.assign({}, s.options, t.options), data: Object.assign({}, s.data, t.data) }) : t), e;
								}, {})),
								(e = Object.keys(t).map(function (e) {
									return t[e];
								})),
								(s = Wt(e)),
								Qe.reduce(function (e, t) {
									return e.concat(
										s.filter(function (e) {
											return e.phase === t;
										})
									);
								}, []));
						return (
							(n.orderedModifiers = e.filter(function (e) {
								return e.enabled;
							})),
							n.orderedModifiers.forEach(function (e) {
								var t = e.name,
									s = e.options,
									e = e.effect;
								"function" == typeof e && ((e = e({ state: n, name: t, instance: d, options: void 0 === s ? {} : s })), o.push(e || function () {}));
							}),
							d.update()
						);
					},
					forceUpdate: function () {
						if (!l) {
							var e = n.elements,
								t = e.reference,
								e = e.popper;
							if (qt(t, e)) {
								(n.rects = { reference: Ft(t, lt(e), "fixed" === n.options.strategy), popper: at(e) }),
									(n.reset = !1),
									(n.placement = n.options.placement),
									n.orderedModifiers.forEach(function (e) {
										return (n.modifiersData[e.name] = Object.assign({}, e.data));
									});
								for (var s, i, a, r = 0; r < n.orderedModifiers.length; r++) !0 === n.reset ? ((n.reset = !1), (r = -1)) : ((s = (a = n.orderedModifiers[r]).fn), (i = a.options), (a = a.name), "function" == typeof s && (n = s({ state: n, options: void 0 === i ? {} : i, name: a, instance: d }) || n));
							}
						}
					},
					update:
						((s = function () {
							return new Promise(function (e) {
								d.forceUpdate(), e(n);
							});
						}),
						function () {
							return (r =
								r ||
								new Promise(function (e) {
									Promise.resolve().then(function () {
										(r = void 0), e(s());
									});
								}));
						}),
					destroy: function () {
						c(), (l = !0);
					},
				};
			return (
				qt(i, a) &&
					d.setOptions(t).then(function (e) {
						!l && t.onFirstUpdate && t.onFirstUpdate(e);
					}),
				d
			);
			function c() {
				o.forEach(function (e) {
					return e();
				}),
					(o = []);
			}
		};
	}
	var Xt = Yt({ defaultModifiers: [yt, Bt, bt, Ze, Nt, It, Ht, mt, jt] });
	const Gt = Object.freeze(Object.defineProperty({ __proto__: null, afterMain: Ge, afterRead: Ye, afterWrite: Ue, applyStyles: Ze, arrow: mt, auto: je, basePlacements: O, beforeMain: Xe, beforeRead: u, beforeWrite: Ve, bottom: M, clippingParents: Be, computeStyles: bt, createPopper: Xt, createPopperBase: Yt(), createPopperLite: Yt({ defaultModifiers: [yt, Bt, bt, Ze] }), detectOverflow: Lt, end: Ne, eventListeners: yt, flip: It, hide: jt, left: k, main: "main", modifierPhases: Qe, offset: Nt, placements: qe, popper: Fe, popperGenerator: Yt, popperOffsets: Bt, preventOverflow: Ht, read: "read", reference: We, right: A, start: P, top: $, variationPlacements: Re, viewport: He, write: "write" }, Symbol.toStringTag, { value: "Module" })),
		Vt = "dropdown";
	(Ge = ".bs.dropdown"), (Ye = ".data-api");
	const Ut = "ArrowDown";
	(Ue = "click" + Ge + Ye), (mt = "keydown" + Ge + Ye);
	const Qt = "show",
		x = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)',
		Kt = (x, ".dropdown-menu"),
		Zt = l() ? "top-end" : "top-start",
		Jt = l() ? "top-start" : "top-end",
		es = l() ? "bottom-end" : "bottom-start",
		ts = l() ? "bottom-start" : "bottom-end",
		ss = l() ? "left-start" : "right-start",
		is = l() ? "right-start" : "left-start",
		as = { autoClose: !0, boundary: "clippingParents", display: "dynamic", offset: [0, 2], popperConfig: null, reference: "toggle" },
		rs = { autoClose: "(boolean|string)", boundary: "(string|element)", display: "string", offset: "(array|string|function)", popperConfig: "(null|object|function)", reference: "(string|element|object)" };
	class T extends t {
		constructor(e, t) {
			super(e, t), (this._popper = null), (this._parent = this._element.parentNode), (this._menu = p.next(this._element, Kt)[0] || p.prev(this._element, Kt)[0] || p.findOne(Kt, this._parent)), (this._inNavbar = this._detectNavbar());
		}
		static get Default() {
			return as;
		}
		static get DefaultType() {
			return rs;
		}
		static get NAME() {
			return Vt;
		}
		toggle() {
			return this._isShown() ? this.hide() : this.show();
		}
		show() {
			if (!o(this._element) && !this._isShown()) {
				var e = { relatedTarget: this._element },
					t = f.trigger(this._element, "show.bs.dropdown", e);
				if (!t.defaultPrevented) {
					if ((this._createPopper(), "ontouchstart" in document.documentElement && !this._parent.closest(".navbar-nav"))) for (const s of [].concat(...document.body.children)) f.on(s, "mouseover", W);
					this._element.focus(), this._element.setAttribute("aria-expanded", !0), this._menu.classList.add(Qt), this._element.classList.add(Qt), f.trigger(this._element, "shown.bs.dropdown", e);
				}
			}
		}
		hide() {
			var e;
			!o(this._element) && this._isShown() && ((e = { relatedTarget: this._element }), this._completeHide(e));
		}
		dispose() {
			this._popper && this._popper.destroy(), super.dispose();
		}
		update() {
			(this._inNavbar = this._detectNavbar()), this._popper && this._popper.update();
		}
		_completeHide(e) {
			var t = f.trigger(this._element, "hide.bs.dropdown", e);
			if (!t.defaultPrevented) {
				if ("ontouchstart" in document.documentElement) for (const s of [].concat(...document.body.children)) f.off(s, "mouseover", W);
				this._popper && this._popper.destroy(), this._menu.classList.remove(Qt), this._element.classList.remove(Qt), this._element.setAttribute("aria-expanded", "false"), c.removeDataAttribute(this._menu, "popper"), f.trigger(this._element, "hidden.bs.dropdown", e);
			}
		}
		_getConfig(e) {
			if ("object" != typeof (e = super._getConfig(e)).reference || r(e.reference) || "function" == typeof e.reference.getBoundingClientRect) return e;
			throw new TypeError(Vt.toUpperCase() + ': Option "reference" provided type "object" without a required "getBoundingClientRect" method.');
		}
		_createPopper() {
			if (void 0 === Gt) throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org)");
			let e = this._element;
			"parent" === this._config.reference ? (e = this._parent) : r(this._config.reference) ? (e = a(this._config.reference)) : "object" == typeof this._config.reference && (e = this._config.reference);
			var t = this._getPopperConfig();
			this._popper = Xt(e, this._menu, t);
		}
		_isShown() {
			return this._menu.classList.contains(Qt);
		}
		_getPlacement() {
			var e,
				t = this._parent;
			return t.classList.contains("dropend") ? ss : t.classList.contains("dropstart") ? is : t.classList.contains("dropup-center") ? "top" : t.classList.contains("dropdown-center") ? "bottom" : ((e = "end" === getComputedStyle(this._menu).getPropertyValue("--bs-position").trim()), t.classList.contains("dropup") ? (e ? Jt : Zt) : e ? ts : es);
		}
		_detectNavbar() {
			return null !== this._element.closest(".navbar");
		}
		_getOffset() {
			const t = this._config["offset"];
			return "string" == typeof t ? t.split(",").map((e) => Number.parseInt(e, 10)) : "function" == typeof t ? (e) => t(e, this._element) : t;
		}
		_getPopperConfig() {
			var e = {
				placement: this._getPlacement(),
				modifiers: [
					{ name: "preventOverflow", options: { boundary: this._config.boundary } },
					{ name: "offset", options: { offset: this._getOffset() } },
				],
			};
			return (!this._inNavbar && "static" !== this._config.display) || (c.setDataAttribute(this._menu, "popper", "static"), (e.modifiers = [{ name: "applyStyles", enabled: !1 }])), { ...e, ...d(this._config.popperConfig, [e]) };
		}
		_selectMenuItem({ key: e, target: t }) {
			var s = p.find(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)", this._menu).filter((e) => n(e));
			s.length && G(s, t, e === Ut, !s.includes(t)).focus();
		}
		static jQueryInterface(t) {
			return this.each(function () {
				var e = T.getOrCreateInstance(this, t);
				if ("string" == typeof t) {
					if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
					e[t]();
				}
			});
		}
		static clearMenus(e) {
			if (2 !== e.button && ("keyup" !== e.type || "Tab" === e.key))
				for (const a of p.find('[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled).show')) {
					var t,
						s,
						i = T.getInstance(a);
					i && !1 !== i._config.autoClose && ((t = (s = e.composedPath()).includes(i._menu)), s.includes(i._element) || ("inside" === i._config.autoClose && !t) || ("outside" === i._config.autoClose && t) || (i._menu.contains(e.target) && (("keyup" === e.type && "Tab" === e.key) || /input|select|option|textarea|form/i.test(e.target.tagName))) || ((s = { relatedTarget: i._element }), "click" === e.type && (s.clickEvent = e), i._completeHide(s)));
				}
		}
		static dataApiKeydownHandler(e) {
			var t = /input|textarea/i.test(e.target.tagName),
				s = "Escape" === e.key,
				i = ["ArrowUp", Ut].includes(e.key);
			(!i && !s) || (t && !s) || (e.preventDefault(), (t = this.matches(x) ? this : p.prev(this, x)[0] || p.next(this, x)[0] || p.findOne(x, e.delegateTarget.parentNode)), (s = T.getOrCreateInstance(t)), i ? (e.stopPropagation(), s.show(), s._selectMenuItem(e)) : s._isShown() && (e.stopPropagation(), s.hide(), t.focus()));
		}
	}
	f.on(document, mt, x, T.dataApiKeydownHandler),
		f.on(document, mt, Kt, T.dataApiKeydownHandler),
		f.on(document, Ue, T.clearMenus),
		f.on(document, "keyup.bs.dropdown.data-api", T.clearMenus),
		f.on(document, Ue, x, function (e) {
			e.preventDefault(), T.getOrCreateInstance(this).toggle();
		}),
		e(T);
	const ns = "backdrop",
		os = "mousedown.bs." + ns,
		ls = { className: "modal-backdrop", clickCallback: null, isAnimated: !1, isVisible: !0, rootElement: "body" },
		ds = { className: "string", clickCallback: "(function|null)", isAnimated: "boolean", isVisible: "boolean", rootElement: "(element|string)" };
	class cs extends pe {
		constructor(e) {
			super(), (this._config = this._getConfig(e)), (this._isAppended = !1), (this._element = null);
		}
		static get Default() {
			return ls;
		}
		static get DefaultType() {
			return ds;
		}
		static get NAME() {
			return ns;
		}
		show(e) {
			var t;
			this._config.isVisible
				? (this._append(),
				  (t = this._getElement()),
				  this._config.isAnimated && R(t),
				  t.classList.add("show"),
				  this._emulateAnimation(() => {
						d(e);
				  }))
				: d(e);
		}
		hide(e) {
			this._config.isVisible
				? (this._getElement().classList.remove("show"),
				  this._emulateAnimation(() => {
						this.dispose(), d(e);
				  }))
				: d(e);
		}
		dispose() {
			this._isAppended && (f.off(this._element, os), this._element.remove(), (this._isAppended = !1));
		}
		_getElement() {
			var e;
			return this._element || (((e = document.createElement("div")).className = this._config.className), this._config.isAnimated && e.classList.add("fade"), (this._element = e)), this._element;
		}
		_configAfterMerge(e) {
			return (e.rootElement = a(e.rootElement)), e;
		}
		_append() {
			var e;
			this._isAppended ||
				((e = this._getElement()),
				this._config.rootElement.append(e),
				f.on(e, os, () => {
					d(this._config.clickCallback);
				}),
				(this._isAppended = !0));
		}
		_emulateAnimation(e) {
			X(e, this._getElement(), this._config.isAnimated);
		}
	}
	const ps = ".bs.focustrap",
		us = (ps, ps, "backward"),
		hs = { autofocus: !0, trapElement: null },
		ms = { autofocus: "boolean", trapElement: "element" };
	class fs extends pe {
		constructor(e) {
			super(), (this._config = this._getConfig(e)), (this._isActive = !1), (this._lastTabNavDirection = null);
		}
		static get Default() {
			return hs;
		}
		static get DefaultType() {
			return ms;
		}
		static get NAME() {
			return "focustrap";
		}
		activate() {
			this._isActive || (this._config.autofocus && this._config.trapElement.focus(), f.off(document, ps), f.on(document, "focusin.bs.focustrap", (e) => this._handleFocusin(e)), f.on(document, "keydown.tab.bs.focustrap", (e) => this._handleKeydown(e)), (this._isActive = !0));
		}
		deactivate() {
			this._isActive && ((this._isActive = !1), f.off(document, ps));
		}
		_handleFocusin(e) {
			var t = this._config["trapElement"];
			e.target === document || e.target === t || t.contains(e.target) || (0 === (e = p.focusableChildren(t)).length ? t : this._lastTabNavDirection === us ? e[e.length - 1] : e[0]).focus();
		}
		_handleKeydown(e) {
			"Tab" === e.key && (this._lastTabNavDirection = e.shiftKey ? us : "forward");
		}
	}
	const gs = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
		vs = ".sticky-top",
		bs = "padding-right",
		ws = "margin-right";
	class ys {
		constructor() {
			this._element = document.body;
		}
		getWidth() {
			var e = document.documentElement.clientWidth;
			return Math.abs(window.innerWidth - e);
		}
		hide() {
			const t = this.getWidth();
			this._disableOverFlow(), this._setElementAttributes(this._element, bs, (e) => e + t), this._setElementAttributes(gs, bs, (e) => e + t), this._setElementAttributes(vs, ws, (e) => e - t);
		}
		reset() {
			this._resetElementAttributes(this._element, "overflow"), this._resetElementAttributes(this._element, bs), this._resetElementAttributes(gs, bs), this._resetElementAttributes(vs, ws);
		}
		isOverflowing() {
			return 0 < this.getWidth();
		}
		_disableOverFlow() {
			this._saveInitialAttribute(this._element, "overflow"), (this._element.style.overflow = "hidden");
		}
		_setElementAttributes(e, s, i) {
			const a = this.getWidth();
			this._applyManipulationCallback(e, (e) => {
				var t;
				(e !== this._element && window.innerWidth > e.clientWidth + a) || (this._saveInitialAttribute(e, s), (t = window.getComputedStyle(e).getPropertyValue(s)), e.style.setProperty(s, i(Number.parseFloat(t)) + "px"));
			});
		}
		_saveInitialAttribute(e, t) {
			var s = e.style.getPropertyValue(t);
			s && c.setDataAttribute(e, t, s);
		}
		_resetElementAttributes(e, s) {
			this._applyManipulationCallback(e, (e) => {
				var t = c.getDataAttribute(e, s);
				null === t ? e.style.removeProperty(s) : (c.removeDataAttribute(e, s), e.style.setProperty(s, t));
			});
		}
		_applyManipulationCallback(e, t) {
			if (r(e)) t(e);
			else for (const s of p.find(e, this._element)) t(s);
		}
	}
	const C = ".bs.modal";
	C, C;
	const _s = "hidden" + C,
		Es = "show" + C;
	C, C, C, C, C;
	C;
	const xs = "modal-open",
		Ts = "modal-static";
	const Cs = { backdrop: !0, focus: !0, keyboard: !0 },
		Ss = { backdrop: "(boolean|string)", focus: "boolean", keyboard: "boolean" };
	class $s extends t {
		constructor(e, t) {
			super(e, t), (this._dialog = p.findOne(".modal-dialog", this._element)), (this._backdrop = this._initializeBackDrop()), (this._focustrap = this._initializeFocusTrap()), (this._isShown = !1), (this._isTransitioning = !1), (this._scrollBar = new ys()), this._addEventListeners();
		}
		static get Default() {
			return Cs;
		}
		static get DefaultType() {
			return Ss;
		}
		static get NAME() {
			return "modal";
		}
		toggle(e) {
			return this._isShown ? this.hide() : this.show(e);
		}
		show(e) {
			this._isShown || this._isTransitioning || f.trigger(this._element, Es, { relatedTarget: e }).defaultPrevented || ((this._isShown = !0), (this._isTransitioning = !0), this._scrollBar.hide(), document.body.classList.add(xs), this._adjustDialog(), this._backdrop.show(() => this._showElement(e)));
		}
		hide() {
			!this._isShown || this._isTransitioning || f.trigger(this._element, "hide.bs.modal").defaultPrevented || ((this._isShown = !1), (this._isTransitioning = !0), this._focustrap.deactivate(), this._element.classList.remove("show"), this._queueCallback(() => this._hideModal(), this._element, this._isAnimated()));
		}
		dispose() {
			f.off(window, C), f.off(this._dialog, C), this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose();
		}
		handleUpdate() {
			this._adjustDialog();
		}
		_initializeBackDrop() {
			return new cs({ isVisible: Boolean(this._config.backdrop), isAnimated: this._isAnimated() });
		}
		_initializeFocusTrap() {
			return new fs({ trapElement: this._element });
		}
		_showElement(e) {
			document.body.contains(this._element) || document.body.append(this._element), (this._element.style.display = "block"), this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", !0), this._element.setAttribute("role", "dialog"), (this._element.scrollTop = 0);
			var t = p.findOne(".modal-body", this._dialog);
			t && (t.scrollTop = 0), R(this._element), this._element.classList.add("show");
			this._queueCallback(
				() => {
					this._config.focus && this._focustrap.activate(), (this._isTransitioning = !1), f.trigger(this._element, "shown.bs.modal", { relatedTarget: e });
				},
				this._dialog,
				this._isAnimated()
			);
		}
		_addEventListeners() {
			f.on(this._element, "keydown.dismiss.bs.modal", (e) => {
				"Escape" === e.key && (this._config.keyboard ? this.hide() : this._triggerBackdropTransition());
			}),
				f.on(window, "resize.bs.modal", () => {
					this._isShown && !this._isTransitioning && this._adjustDialog();
				}),
				f.on(this._element, "mousedown.dismiss.bs.modal", (t) => {
					f.one(this._element, "click.dismiss.bs.modal", (e) => {
						this._element === t.target && this._element === e.target && ("static" === this._config.backdrop ? this._triggerBackdropTransition() : this._config.backdrop && this.hide());
					});
				});
		}
		_hideModal() {
			(this._element.style.display = "none"),
				this._element.setAttribute("aria-hidden", !0),
				this._element.removeAttribute("aria-modal"),
				this._element.removeAttribute("role"),
				(this._isTransitioning = !1),
				this._backdrop.hide(() => {
					document.body.classList.remove(xs), this._resetAdjustments(), this._scrollBar.reset(), f.trigger(this._element, _s);
				});
		}
		_isAnimated() {
			return this._element.classList.contains("fade");
		}
		_triggerBackdropTransition() {
			var e = f.trigger(this._element, "hidePrevented.bs.modal");
			if (!e.defaultPrevented) {
				e = this._element.scrollHeight > document.documentElement.clientHeight;
				const t = this._element.style.overflowY;
				"hidden" === t ||
					this._element.classList.contains(Ts) ||
					(e || (this._element.style.overflowY = "hidden"),
					this._element.classList.add(Ts),
					this._queueCallback(() => {
						this._element.classList.remove(Ts),
							this._queueCallback(() => {
								this._element.style.overflowY = t;
							}, this._dialog);
					}, this._dialog),
					this._element.focus());
			}
		}
		_adjustDialog() {
			var e,
				t = this._element.scrollHeight > document.documentElement.clientHeight,
				s = this._scrollBar.getWidth(),
				i = 0 < s;
			i && !t && ((e = l() ? "paddingLeft" : "paddingRight"), (this._element.style[e] = s + "px")), !i && t && ((e = l() ? "paddingRight" : "paddingLeft"), (this._element.style[e] = s + "px"));
		}
		_resetAdjustments() {
			(this._element.style.paddingLeft = ""), (this._element.style.paddingRight = "");
		}
		static jQueryInterface(t, s) {
			return this.each(function () {
				var e = $s.getOrCreateInstance(this, t);
				if ("string" == typeof t) {
					if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
					e[t](s);
				}
			});
		}
	}
	f.on(document, "click.bs.modal.data-api", '[data-bs-toggle="modal"]', function (e) {
		const t = p.getElementFromSelector(this);
		["A", "AREA"].includes(this.tagName) && e.preventDefault(),
			f.one(t, Es, (e) => {
				e.defaultPrevented ||
					f.one(t, _s, () => {
						n(this) && this.focus();
					});
			});
		e = p.findOne(".modal.show");
		e && $s.getInstance(e).hide(), $s.getOrCreateInstance(t).toggle(this);
	}),
		he($s),
		e($s);
	Xe = ".bs.offcanvas";
	const Ms = "showing",
		As = ".offcanvas.show",
		ks = "hidePrevented" + Xe,
		Os = "hidden" + Xe;
	const Ps = { backdrop: !0, keyboard: !0, scroll: !1 },
		Ls = { backdrop: "(boolean|string)", keyboard: "boolean", scroll: "boolean" };
	class I extends t {
		constructor(e, t) {
			super(e, t), (this._isShown = !1), (this._backdrop = this._initializeBackDrop()), (this._focustrap = this._initializeFocusTrap()), this._addEventListeners();
		}
		static get Default() {
			return Ps;
		}
		static get DefaultType() {
			return Ls;
		}
		static get NAME() {
			return "offcanvas";
		}
		toggle(e) {
			return this._isShown ? this.hide() : this.show(e);
		}
		show(e) {
			this._isShown ||
				f.trigger(this._element, "show.bs.offcanvas", { relatedTarget: e }).defaultPrevented ||
				((this._isShown = !0),
				this._backdrop.show(),
				this._config.scroll || new ys().hide(),
				this._element.setAttribute("aria-modal", !0),
				this._element.setAttribute("role", "dialog"),
				this._element.classList.add(Ms),
				this._queueCallback(
					() => {
						(this._config.scroll && !this._config.backdrop) || this._focustrap.activate(), this._element.classList.add("show"), this._element.classList.remove(Ms), f.trigger(this._element, "shown.bs.offcanvas", { relatedTarget: e });
					},
					this._element,
					!0
				));
		}
		hide() {
			this._isShown &&
				!f.trigger(this._element, "hide.bs.offcanvas").defaultPrevented &&
				(this._focustrap.deactivate(),
				this._element.blur(),
				(this._isShown = !1),
				this._element.classList.add("hiding"),
				this._backdrop.hide(),
				this._queueCallback(
					() => {
						this._element.classList.remove("show", "hiding"), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._config.scroll || new ys().reset(), f.trigger(this._element, Os);
					},
					this._element,
					!0
				));
		}
		dispose() {
			this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose();
		}
		_initializeBackDrop() {
			var e = Boolean(this._config.backdrop);
			return new cs({
				className: "offcanvas-backdrop",
				isVisible: e,
				isAnimated: !0,
				rootElement: this._element.parentNode,
				clickCallback: e
					? () => {
							"static" === this._config.backdrop ? f.trigger(this._element, ks) : this.hide();
					  }
					: null,
			});
		}
		_initializeFocusTrap() {
			return new fs({ trapElement: this._element });
		}
		_addEventListeners() {
			f.on(this._element, "keydown.dismiss.bs.offcanvas", (e) => {
				"Escape" === e.key && (this._config.keyboard ? this.hide() : f.trigger(this._element, ks));
			});
		}
		static jQueryInterface(t) {
			return this.each(function () {
				var e = I.getOrCreateInstance(this, t);
				if ("string" == typeof t) {
					if (void 0 === e[t] || t.startsWith("_") || "constructor" === t) throw new TypeError(`No method named "${t}"`);
					e[t](this);
				}
			});
		}
	}
	f.on(document, "click.bs.offcanvas.data-api", '[data-bs-toggle="offcanvas"]', function (e) {
		var t = p.getElementFromSelector(this);
		["A", "AREA"].includes(this.tagName) && e.preventDefault(),
			o(this) ||
				(f.one(t, Os, () => {
					n(this) && this.focus();
				}),
				(e = p.findOne(As)) && e !== t && I.getInstance(e).hide(),
				I.getOrCreateInstance(t).toggle(this));
	}),
		f.on(window, "load.bs.offcanvas.data-api", () => {
			for (const e of p.find(As)) I.getOrCreateInstance(e).show();
		}),
		f.on(window, "resize.bs.offcanvas", () => {
			for (const e of p.find("[aria-modal][class*=show][class*=offcanvas-]")) "fixed" !== getComputedStyle(e).position && I.getOrCreateInstance(e).hide();
		}),
		he(I),
		e(I);
	u = { "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i], a: ["target", "href", "title", "rel"], area: [], b: [], br: [], col: [], code: [], div: [], em: [], hr: [], h1: [], h2: [], h3: [], h4: [], h5: [], h6: [], i: [], img: ["src", "srcset", "alt", "title", "width", "height"], li: [], ol: [], p: [], pre: [], s: [], small: [], span: [], sub: [], sup: [], strong: [], u: [], ul: [] };
	const Is = new Set(["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"]),
		zs = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i;
	function Ds(e, t, s) {
		if (!e.length) return e;
		if (s && "function" == typeof s) return s(e);
		s = new window.DOMParser().parseFromString(e, "text/html");
		for (const n of [].concat(...s.body.querySelectorAll("*"))) {
			var i = n.nodeName.toLowerCase();
			if (Object.keys(t).includes(i)) {
				var a = [].concat(...n.attributes),
					r = [].concat(t["*"] || [], t[i] || []);
				for (const o of a)
					((e, t) => {
						const s = e.nodeName.toLowerCase();
						return t.includes(s) ? !Is.has(s) || Boolean(zs.test(e.nodeValue)) : t.filter((e) => e instanceof RegExp).some((e) => e.test(s));
					})(o, r) || n.removeAttribute(o.nodeName);
			} else n.remove();
		}
		return s.body.innerHTML;
	}
	const js = { allowList: u, content: {}, extraClass: "", html: !1, sanitize: !0, sanitizeFn: null, template: "<div></div>" },
		Ns = { allowList: "object", content: "object", extraClass: "(string|function)", html: "boolean", sanitize: "boolean", sanitizeFn: "(null|function)", template: "string" },
		Bs = { entry: "(string|element|function|null)", selector: "(string|element)" };
	class Hs extends pe {
		constructor(e) {
			super(), (this._config = this._getConfig(e));
		}
		static get Default() {
			return js;
		}
		static get DefaultType() {
			return Ns;
		}
		static get NAME() {
			return "TemplateFactory";
		}
		getContent() {
			return Object.values(this._config.content)
				.map((e) => this._resolvePossibleFunction(e))
				.filter(Boolean);
		}
		hasContent() {
			return 0 < this.getContent().length;
		}
		changeContent(e) {
			return this._checkContent(e), (this._config.content = { ...this._config.content, ...e }), this;
		}
		toHtml() {
			var e,
				t,
				s = document.createElement("div");
			s.innerHTML = this._maybeSanitize(this._config.template);
			for ([e, t] of Object.entries(this._config.content)) this._setContent(s, t, e);
			var i = s.children[0],
				a = this._resolvePossibleFunction(this._config.extraClass);
			return a && i.classList.add(...a.split(" ")), i;
		}
		_typeCheckConfig(e) {
			super._typeCheckConfig(e), this._checkContent(e.content);
		}
		_checkContent(e) {
			for (var [t, s] of Object.entries(e)) super._typeCheckConfig({ selector: t, entry: s }, Bs);
		}
		_setContent(e, t, s) {
			s = p.findOne(s, e);
			s && ((t = this._resolvePossibleFunction(t)) ? (r(t) ? this._putElementInTemplate(a(t), s) : this._config.html ? (s.innerHTML = this._maybeSanitize(t)) : (s.textContent = t)) : s.remove());
		}
		_maybeSanitize(e) {
			return this._config.sanitize ? Ds(e, this._config.allowList, this._config.sanitizeFn) : e;
		}
		_resolvePossibleFunction(e) {
			return d(e, [this]);
		}
		_putElementInTemplate(e, t) {
			this._config.html ? ((t.innerHTML = ""), t.append(e)) : (t.textContent = e.textContent);
		}
	}
	const Fs = new Set(["sanitize", "allowList", "sanitizeFn"]),
		Ws = "fade";
	const Rs = "show",
		qs = "hide.bs.modal",
		Ys = "hover",
		Xs = "focus",
		Gs = { AUTO: "auto", TOP: "top", RIGHT: l() ? "left" : "right", BOTTOM: "bottom", LEFT: l() ? "right" : "left" },
		Vs = { allowList: u, animation: !0, boundary: "clippingParents", container: !1, customClass: "", delay: 0, fallbackPlacements: ["top", "right", "bottom", "left"], html: !1, offset: [0, 6], placement: "top", popperConfig: null, sanitize: !0, sanitizeFn: null, selector: !1, template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>', title: "", trigger: "hover focus" },
		Us = { allowList: "object", animation: "boolean", boundary: "(string|element)", container: "(string|element|boolean)", customClass: "(string|function)", delay: "(number|object)", fallbackPlacements: "array", html: "boolean", offset: "(array|string|function)", placement: "(string|function)", popperConfig: "(null|object|function)", sanitize: "boolean", sanitizeFn: "(null|function)", selector: "(string|boolean)", template: "string", title: "(string|element|function)", trigger: "string" };
	class Qs extends t {
		constructor(e, t) {
			if (void 0 === Gt) throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org)");
			super(e, t), (this._isEnabled = !0), (this._timeout = 0), (this._isHovered = null), (this._activeTrigger = {}), (this._popper = null), (this._templateFactory = null), (this._newContent = null), (this.tip = null), this._setListeners(), this._config.selector || this._fixTitle();
		}
		static get Default() {
			return Vs;
		}
		static get DefaultType() {
			return Us;
		}
		static get NAME() {
			return "tooltip";
		}
		enable() {
			this._isEnabled = !0;
		}
		disable() {
			this._isEnabled = !1;
		}
		toggleEnabled() {
			this._isEnabled = !this._isEnabled;
		}
		toggle() {
			this._isEnabled && ((this._activeTrigger.click = !this._activeTrigger.click), this._isShown() ? this._leave() : this._enter());
		}
		dispose() {
			clearTimeout(this._timeout), f.off(this._element.closest(".modal"), qs, this._hideModalHandler), this._element.getAttribute("data-bs-original-title") && this._element.setAttribute("title", this._element.getAttribute("data-bs-original-title")), this._disposePopper(), super.dispose();
		}
		show() {
			if ("none" === this._element.style.display) throw new Error("Please use show on visible elements");
			if (this._isWithContent() && this._isEnabled) {
				var e = f.trigger(this._element, this.constructor.eventName("show")),
					t = (F(this._element) || this._element.ownerDocument.documentElement).contains(this._element);
				if (!e.defaultPrevented && t) {
					this._disposePopper();
					(e = this._getTipElement()), (t = (this._element.setAttribute("aria-describedby", e.getAttribute("id")), this._config)["container"]);
					if ((this._element.ownerDocument.documentElement.contains(this.tip) || (t.append(e), f.trigger(this._element, this.constructor.eventName("inserted"))), (this._popper = this._createPopper(e)), e.classList.add(Rs), "ontouchstart" in document.documentElement)) for (const s of [].concat(...document.body.children)) f.on(s, "mouseover", W);
					this._queueCallback(
						() => {
							f.trigger(this._element, this.constructor.eventName("shown")), !1 === this._isHovered && this._leave(), (this._isHovered = !1);
						},
						this.tip,
						this._isAnimated()
					);
				}
			}
		}
		hide() {
			if (this._isShown()) {
				var e = f.trigger(this._element, this.constructor.eventName("hide"));
				if (!e.defaultPrevented) {
					if ((this._getTipElement().classList.remove(Rs), "ontouchstart" in document.documentElement)) for (const t of [].concat(...document.body.children)) f.off(t, "mouseover", W);
					(this._activeTrigger.click = !1), (this._activeTrigger[Xs] = !1), (this._activeTrigger[Ys] = !1), (this._isHovered = null);
					this._queueCallback(
						() => {
							this._isWithActiveTrigger() || (this._isHovered || this._disposePopper(), this._element.removeAttribute("aria-describedby"), f.trigger(this._element, this.constructor.eventName("hidden")));
						},
						this.tip,
						this._isAnimated()
					);
				}
			}
		}
		update() {
			this._popper && this._popper.update();
		}
		_isWithContent() {
			return Boolean(this._getTitle());
		}
		_getTipElement() {
			return this.tip || (this.tip = this._createTipElement(this._newContent || this._getContentForTemplate())), this.tip;
		}
		_createTipElement(e) {
			e = this._getTemplateFactory(e).toHtml();
			if (!e) return null;
			e.classList.remove(Ws, Rs), e.classList.add(`bs-${this.constructor.NAME}-auto`);
			var t = ((e) => {
				for (; (e += Math.floor(1e6 * Math.random())), document.getElementById(e); );
				return e;
			})(this.constructor.NAME).toString();
			return e.setAttribute("id", t), this._isAnimated() && e.classList.add(Ws), e;
		}
		setContent(e) {
			(this._newContent = e), this._isShown() && (this._disposePopper(), this.show());
		}
		_getTemplateFactory(e) {
			return this._templateFactory ? this._templateFactory.changeContent(e) : (this._templateFactory = new Hs({ ...this._config, content: e, extraClass: this._resolvePossibleFunction(this._config.customClass) })), this._templateFactory;
		}
		_getContentForTemplate() {
			return { ".tooltip-inner": this._getTitle() };
		}
		_getTitle() {
			return this._resolvePossibleFunction(this._config.title) || this._element.getAttribute("data-bs-original-title");
		}
		_initializeOnDelegatedTarget(e) {
			return this.constructor.getOrCreateInstance(e.delegateTarget, this._getDelegateConfig());
		}
		_isAnimated() {
			return this._config.animation || (this.tip && this.tip.classList.contains(Ws));
		}
		_isShown() {
			return this.tip && this.tip.classList.contains(Rs);
		}
		_createPopper(e) {
			var t = d(this._config.placement, [this, e, this._element]),
				t = Gs[t.toUpperCase()];
			return Xt(this._element, e, this._getPopperConfig(t));
		}
		_getOffset() {
			const t = this._config["offset"];
			return "string" == typeof t ? t.split(",").map((e) => Number.parseInt(e, 10)) : "function" == typeof t ? (e) => t(e, this._element) : t;
		}
		_resolvePossibleFunction(e) {
			return d(e, [this._element]);
		}
		_getPopperConfig(e) {
			e = {
				placement: e,
				modifiers: [
					{ name: "flip", options: { fallbackPlacements: this._config.fallbackPlacements } },
					{ name: "offset", options: { offset: this._getOffset() } },
					{ name: "preventOverflow", options: { boundary: this._config.boundary } },
					{ name: "arrow", options: { element: `.${this.constructor.NAME}-arrow` } },
					{
						name: "preSetPlacement",
						enabled: !0,
						phase: "beforeMain",
						fn: (e) => {
							this._getTipElement().setAttribute("data-popper-placement", e.state.placement);
						},
					},
				],
			};
			return { ...e, ...d(this._config.popperConfig, [e]) };
		}
		_setListeners() {
			var e, t;
			for (const s of this._config.trigger.split(" "))
				"click" === s
					? f.on(this._element, this.constructor.eventName("click"), this._config.selector, (e) => {
							this._initializeOnDelegatedTarget(e).toggle();
					  })
					: "manual" !== s &&
					  ((e = s === Ys ? this.constructor.eventName("mouseenter") : this.constructor.eventName("focusin")),
					  (t = s === Ys ? this.constructor.eventName("mouseleave") : this.constructor.eventName("focusout")),
					  f.on(this._element, e, this._config.selector, (e) => {
							var t = this._initializeOnDelegatedTarget(e);
							(t._activeTrigger["focusin" === e.type ? Xs : Ys] = !0), t._enter();
					  }),
					  f.on(this._element, t, this._config.selector, (e) => {
							var t = this._initializeOnDelegatedTarget(e);
							(t._activeTrigger["focusout" === e.type ? Xs : Ys] = t._element.contains(e.relatedTarget)), t._leave();
					  }));
			(this._hideModalHandler = () => {
				this._element && this.hide();
			}),
				f.on(this._element.closest(".modal"), qs, this._hideModalHandler);
		}
		_fixTitle() {
			var e = this._element.getAttribute("title");
			e && (this._element.getAttribute("aria-label") || this._element.textContent.trim() || this._element.setAttribute("aria-label", e), this._element.setAttribute("data-bs-original-title", e), this._element.removeAttribute("title"));
		}
		_enter() {
			this._isShown() || this._isHovered
				? (this._isHovered = !0)
				: ((this._isHovered = !0),
				  this._setTimeout(() => {
						this._isHovered && this.show();
				  }, this._config.delay.show));
		}
		_leave() {
			this._isWithActiveTrigger() ||
				((this._isHovered = !1),
				this._setTimeout(() => {
					this._isHovered || this.hide();
				}, this._config.delay.hide));
		}
		_setTimeout(e, t) {
			clearTimeout(this._timeout), (this._timeout = setTimeout(e, t));
		}
		_isWithActiveTrigger() {
			return Object.values(this._activeTrigger).includes(!0);
		}
		_getConfig(e) {
			var t = c.getDataAttributes(this._element);
			for (const s of Object.keys(t)) Fs.has(s) && delete t[s];
			return (e = { ...t, ...("object" == typeof e && e ? e : {}) }), (e = this._mergeConfigObj(e)), (e = this._configAfterMerge(e)), this._typeCheckConfig(e), e;
		}
		_configAfterMerge(e) {
			return (e.container = !1 === e.container ? document.body : a(e.container)), "number" == typeof e.delay && (e.delay = { show: e.delay, hide: e.delay }), "number" == typeof e.title && (e.title = e.title.toString()), "number" == typeof e.content && (e.content = e.content.toString()), e;
		}
		_getDelegateConfig() {
			var e,
				t,
				s = {};
			for ([e, t] of Object.entries(this._config)) this.constructor.Default[e] !== t && (s[e] = t);
			return (s.selector = !1), (s.trigger = "manual"), s;
		}
		_disposePopper() {
			this._popper && (this._popper.destroy(), (this._popper = null)), this.tip && (this.tip.remove(), (this.tip = null));
		}
		static jQueryInterface(t) {
			return this.each(function () {
				var e = Qs.getOrCreateInstance(this, t);
				if ("string" == typeof t) {
					if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
					e[t]();
				}
			});
		}
	}
	e(Qs);
	const Ks = { ...Qs.Default, content: "", offset: [0, 8], placement: "right", template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>', trigger: "click" },
		Zs = { ...Qs.DefaultType, content: "(null|string|element|function)" };
	class Js extends Qs {
		static get Default() {
			return Ks;
		}
		static get DefaultType() {
			return Zs;
		}
		static get NAME() {
			return "popover";
		}
		_isWithContent() {
			return this._getTitle() || this._getContent();
		}
		_getContentForTemplate() {
			return { ".popover-header": this._getTitle(), ".popover-body": this._getContent() };
		}
		_getContent() {
			return this._resolvePossibleFunction(this._config.content);
		}
		static jQueryInterface(t) {
			return this.each(function () {
				var e = Js.getOrCreateInstance(this, t);
				if ("string" == typeof t) {
					if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
					e[t]();
				}
			});
		}
	}
	e(Js);
	Ve = ".bs.scrollspy";
	const ei = "click" + Ve;
	const ti = "active",
		si = "[href]";
	const ii = { offset: null, rootMargin: "0px 0px -25%", smoothScroll: !1, target: null, threshold: [0.1, 0.5, 1] },
		ai = { offset: "(number|null)", rootMargin: "string", smoothScroll: "boolean", target: "element", threshold: "array" };
	class ri extends t {
		constructor(e, t) {
			super(e, t), (this._targetLinks = new Map()), (this._observableSections = new Map()), (this._rootElement = "visible" === getComputedStyle(this._element).overflowY ? null : this._element), (this._activeTarget = null), (this._observer = null), (this._previousScrollData = { visibleEntryTop: 0, parentScrollTop: 0 }), this.refresh();
		}
		static get Default() {
			return ii;
		}
		static get DefaultType() {
			return ai;
		}
		static get NAME() {
			return "scrollspy";
		}
		refresh() {
			this._initializeTargetsAndObservables(), this._maybeEnableSmoothScroll(), this._observer ? this._observer.disconnect() : (this._observer = this._getNewObserver());
			for (const e of this._observableSections.values()) this._observer.observe(e);
		}
		dispose() {
			this._observer.disconnect(), super.dispose();
		}
		_configAfterMerge(e) {
			return (e.target = a(e.target) || document.body), (e.rootMargin = e.offset ? e.offset + "px 0px -30%" : e.rootMargin), "string" == typeof e.threshold && (e.threshold = e.threshold.split(",").map((e) => Number.parseFloat(e))), e;
		}
		_maybeEnableSmoothScroll() {
			this._config.smoothScroll &&
				(f.off(this._config.target, ei),
				f.on(this._config.target, ei, si, (e) => {
					var t = this._observableSections.get(e.target.hash);
					t && (e.preventDefault(), (e = this._rootElement || window), (t = t.offsetTop - this._element.offsetTop), e.scrollTo ? e.scrollTo({ top: t, behavior: "smooth" }) : (e.scrollTop = t));
				}));
		}
		_getNewObserver() {
			var e = { root: this._rootElement, threshold: this._config.threshold, rootMargin: this._config.rootMargin };
			return new IntersectionObserver((e) => this._observerCallback(e), e);
		}
		_observerCallback(e) {
			const t = (e) => this._targetLinks.get("#" + e.target.id);
			var s = (e) => {
					(this._previousScrollData.visibleEntryTop = e.target.offsetTop), this._process(t(e));
				},
				i = (this._rootElement || document.documentElement).scrollTop,
				a = i >= this._previousScrollData.parentScrollTop;
			this._previousScrollData.parentScrollTop = i;
			for (const n of e)
				if (n.isIntersecting) {
					var r = n.target.offsetTop >= this._previousScrollData.visibleEntryTop;
					if (a && r) {
						if ((s(n), i)) continue;
						return;
					}
					a || r || s(n);
				} else (this._activeTarget = null), this._clearActiveClass(t(n));
		}
		_initializeTargetsAndObservables() {
			var e;
			(this._targetLinks = new Map()), (this._observableSections = new Map());
			for (const t of p.find(si, this._config.target)) t.hash && !o(t) && ((e = p.findOne(decodeURI(t.hash), this._element)), n(e)) && (this._targetLinks.set(decodeURI(t.hash), t), this._observableSections.set(t.hash, e));
		}
		_process(e) {
			this._activeTarget !== e && (this._clearActiveClass(this._config.target), (this._activeTarget = e).classList.add(ti), this._activateParents(e), f.trigger(this._element, "activate.bs.scrollspy", { relatedTarget: e }));
		}
		_activateParents(e) {
			if (e.classList.contains("dropdown-item")) p.findOne(".dropdown-toggle", e.closest(".dropdown")).classList.add(ti);
			else for (const t of p.parents(e, ".nav, .list-group")) for (const s of p.prev(t, ".nav-link, .nav-item > .nav-link, .list-group-item")) s.classList.add(ti);
		}
		_clearActiveClass(e) {
			e.classList.remove(ti);
			for (const t of p.find(si + "." + ti, e)) t.classList.remove(ti);
		}
		static jQueryInterface(t) {
			return this.each(function () {
				var e = ri.getOrCreateInstance(this, t);
				if ("string" == typeof t) {
					if (void 0 === e[t] || t.startsWith("_") || "constructor" === t) throw new TypeError(`No method named "${t}"`);
					e[t]();
				}
			});
		}
	}
	f.on(window, "load.bs.scrollspy.data-api", () => {
		for (const e of p.find('[data-bs-spy="scroll"]')) ri.getOrCreateInstance(e);
	}),
		e(ri);
	const ni = "ArrowRight",
		oi = "ArrowDown",
		li = "Home",
		z = "active",
		di = "show",
		ci = ".dropdown-toggle";
	ci;
	bt = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]';
	const pi = '.nav-link:not(.dropdown-toggle), .list-group-item:not(.dropdown-toggle), [role="tab"]:not(.dropdown-toggle), ' + bt;
	z, z, z;
	class ui extends t {
		constructor(e) {
			super(e), (this._parent = this._element.closest('.list-group, .nav, [role="tablist"]')), this._parent && (this._setInitialAttributes(this._parent, this._getChildren()), f.on(this._element, "keydown.bs.tab", (e) => this._keydown(e)));
		}
		static get NAME() {
			return "tab";
		}
		show() {
			var e,
				t,
				s = this._element;
			this._elemIsActive(s) || ((t = (e = this._getActiveElem()) ? f.trigger(e, "hide.bs.tab", { relatedTarget: s }) : null), f.trigger(s, "show.bs.tab", { relatedTarget: e }).defaultPrevented) || (t && t.defaultPrevented) || (this._deactivate(e, s), this._activate(s, e));
		}
		_activate(e, t) {
			e &&
				(e.classList.add(z),
				this._activate(p.getElementFromSelector(e)),
				this._queueCallback(
					() => {
						"tab" !== e.getAttribute("role") ? e.classList.add(di) : (e.removeAttribute("tabindex"), e.setAttribute("aria-selected", !0), this._toggleDropDown(e, !0), f.trigger(e, "shown.bs.tab", { relatedTarget: t }));
					},
					e,
					e.classList.contains("fade")
				));
		}
		_deactivate(e, t) {
			e &&
				(e.classList.remove(z),
				e.blur(),
				this._deactivate(p.getElementFromSelector(e)),
				this._queueCallback(
					() => {
						"tab" !== e.getAttribute("role") ? e.classList.remove(di) : (e.setAttribute("aria-selected", !1), e.setAttribute("tabindex", "-1"), this._toggleDropDown(e, !1), f.trigger(e, "hidden.bs.tab", { relatedTarget: t }));
					},
					e,
					e.classList.contains("fade")
				));
		}
		_keydown(t) {
			if (["ArrowLeft", ni, "ArrowUp", oi, li, "End"].includes(t.key)) {
				t.stopPropagation(), t.preventDefault();
				var s,
					i = this._getChildren().filter((e) => !o(e));
				let e;
				(e = [li, "End"].includes(t.key) ? i[t.key === li ? 0 : i.length - 1] : ((s = [ni, oi].includes(t.key)), G(i, t.target, s, !0))) && (e.focus({ preventScroll: !0 }), ui.getOrCreateInstance(e).show());
			}
		}
		_getChildren() {
			return p.find(pi, this._parent);
		}
		_getActiveElem() {
			return this._getChildren().find((e) => this._elemIsActive(e)) || null;
		}
		_setInitialAttributes(e, t) {
			this._setAttributeIfNotExists(e, "role", "tablist");
			for (const s of t) this._setInitialAttributesOnChild(s);
		}
		_setInitialAttributesOnChild(e) {
			e = this._getInnerElement(e);
			var t = this._elemIsActive(e),
				s = this._getOuterElement(e);
			e.setAttribute("aria-selected", t), s !== e && this._setAttributeIfNotExists(s, "role", "presentation"), t || e.setAttribute("tabindex", "-1"), this._setAttributeIfNotExists(e, "role", "tab"), this._setInitialAttributesOnTargetPanel(e);
		}
		_setInitialAttributesOnTargetPanel(e) {
			var t = p.getElementFromSelector(e);
			t && (this._setAttributeIfNotExists(t, "role", "tabpanel"), e.id) && this._setAttributeIfNotExists(t, "aria-labelledby", "" + e.id);
		}
		_toggleDropDown(e, s) {
			const i = this._getOuterElement(e);
			i.classList.contains("dropdown") &&
				((e = (e, t) => {
					e = p.findOne(e, i);
					e && e.classList.toggle(t, s);
				})(ci, z),
				e(".dropdown-menu", di),
				i.setAttribute("aria-expanded", s));
		}
		_setAttributeIfNotExists(e, t, s) {
			e.hasAttribute(t) || e.setAttribute(t, s);
		}
		_elemIsActive(e) {
			return e.classList.contains(z);
		}
		_getInnerElement(e) {
			return e.matches(pi) ? e : p.findOne(pi, e);
		}
		_getOuterElement(e) {
			return e.closest(".nav-item, .list-group-item") || e;
		}
		static jQueryInterface(t) {
			return this.each(function () {
				var e = ui.getOrCreateInstance(this);
				if ("string" == typeof t) {
					if (void 0 === e[t] || t.startsWith("_") || "constructor" === t) throw new TypeError(`No method named "${t}"`);
					e[t]();
				}
			});
		}
	}
	f.on(document, "click.bs.tab", bt, function (e) {
		["A", "AREA"].includes(this.tagName) && e.preventDefault(), o(this) || ui.getOrCreateInstance(this).show();
	}),
		f.on(window, "load.bs.tab", () => {
			for (const e of p.find('.active[data-bs-toggle="tab"], .active[data-bs-toggle="pill"], .active[data-bs-toggle="list"]')) ui.getOrCreateInstance(e);
		}),
		e(ui);
	const hi = "show",
		mi = "showing",
		fi = { animation: "boolean", autohide: "boolean", delay: "number" },
		gi = { animation: !0, autohide: !0, delay: 5e3 };
	class vi extends t {
		constructor(e, t) {
			super(e, t), (this._timeout = null), (this._hasMouseInteraction = !1), (this._hasKeyboardInteraction = !1), this._setListeners();
		}
		static get Default() {
			return gi;
		}
		static get DefaultType() {
			return fi;
		}
		static get NAME() {
			return "toast";
		}
		show() {
			f.trigger(this._element, "show.bs.toast").defaultPrevented ||
				(this._clearTimeout(),
				this._config.animation && this._element.classList.add("fade"),
				this._element.classList.remove("hide"),
				R(this._element),
				this._element.classList.add(hi, mi),
				this._queueCallback(
					() => {
						this._element.classList.remove(mi), f.trigger(this._element, "shown.bs.toast"), this._maybeScheduleHide();
					},
					this._element,
					this._config.animation
				));
		}
		hide() {
			this.isShown() &&
				!f.trigger(this._element, "hide.bs.toast").defaultPrevented &&
				(this._element.classList.add(mi),
				this._queueCallback(
					() => {
						this._element.classList.add("hide"), this._element.classList.remove(mi, hi), f.trigger(this._element, "hidden.bs.toast");
					},
					this._element,
					this._config.animation
				));
		}
		dispose() {
			this._clearTimeout(), this.isShown() && this._element.classList.remove(hi), super.dispose();
		}
		isShown() {
			return this._element.classList.contains(hi);
		}
		_maybeScheduleHide() {
			!this._config.autohide ||
				this._hasMouseInteraction ||
				this._hasKeyboardInteraction ||
				(this._timeout = setTimeout(() => {
					this.hide();
				}, this._config.delay));
		}
		_onInteraction(e, t) {
			switch (e.type) {
				case "mouseover":
				case "mouseout":
					this._hasMouseInteraction = t;
					break;
				case "focusin":
				case "focusout":
					this._hasKeyboardInteraction = t;
			}
			t ? this._clearTimeout() : ((e = e.relatedTarget), this._element === e || this._element.contains(e) || this._maybeScheduleHide());
		}
		_setListeners() {
			f.on(this._element, "mouseover.bs.toast", (e) => this._onInteraction(e, !0)), f.on(this._element, "mouseout.bs.toast", (e) => this._onInteraction(e, !1)), f.on(this._element, "focusin.bs.toast", (e) => this._onInteraction(e, !0)), f.on(this._element, "focusout.bs.toast", (e) => this._onInteraction(e, !1));
		}
		_clearTimeout() {
			clearTimeout(this._timeout), (this._timeout = null);
		}
		static jQueryInterface(t) {
			return this.each(function () {
				var e = vi.getOrCreateInstance(this, t);
				if ("string" == typeof t) {
					if (void 0 === e[t]) throw new TypeError(`No method named "${t}"`);
					e[t](this);
				}
			});
		}
	}
	return he(vi), e(vi), { Alert: me, Button: ge, Carousel: ke, Collapse: De, Dropdown: T, Modal: $s, Offcanvas: I, Popover: Js, ScrollSpy: ri, Tab: ui, Toast: vi, Tooltip: Qs };
}),
	(function (e, t) {
		"function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", t) : "object" == typeof module && module.exports ? (module.exports = t()) : (e.EvEmitter = t());
	})("undefined" != typeof window ? window : this, function () {
		function e() {}
		var t = e.prototype;
		return (
			(t.on = function (e, t) {
				var s;
				if (e && t) return -1 == (s = (s = this._events = this._events || {})[e] = s[e] || []).indexOf(t) && s.push(t), this;
			}),
			(t.once = function (e, t) {
				var s;
				if (e && t) return this.on(e, t), (((s = this._onceEvents = this._onceEvents || {})[e] = s[e] || {})[t] = !0), this;
			}),
			(t.off = function (e, t) {
				e = this._events && this._events[e];
				if (e && e.length) return -1 != (t = e.indexOf(t)) && e.splice(t, 1), this;
			}),
			(t.emitEvent = function (e, t) {
				var s = this._events && this._events[e];
				if (s && s.length) {
					(s = s.slice(0)), (t = t || []);
					for (var i = this._onceEvents && this._onceEvents[e], a = 0; a < s.length; a++) {
						var r = s[a];
						i && i[r] && (this.off(e, r), delete i[r]), r.apply(this, t);
					}
					return this;
				}
			}),
			(t.allOff = function () {
				delete this._events, delete this._onceEvents;
			}),
			e
		);
	}),
	(function (t, s) {
		"use strict";
		"function" == typeof define && define.amd
			? define(["ev-emitter/ev-emitter"], function (e) {
					return s(t, e);
			  })
			: "object" == typeof module && module.exports
			? (module.exports = s(t, require("ev-emitter")))
			: (t.imagesLoaded = s(t, t.EvEmitter));
	})("undefined" != typeof window ? window : this, function (t, e) {
		function r(e, t) {
			for (var s in t) e[s] = t[s];
			return e;
		}
		function n(e, t, s) {
			var i, a;
			return this instanceof n ? ((i = "string" == typeof (i = e) ? document.querySelectorAll(e) : i) ? ((this.elements = ((a = i), Array.isArray(a) ? a : "object" == typeof a && "number" == typeof a.length ? d.call(a) : [a])), (this.options = r({}, this.options)), "function" == typeof t ? (s = t) : r(this.options, t), s && this.on("always", s), this.getImages(), o && (this.jqDeferred = new o.Deferred()), void setTimeout(this.check.bind(this))) : void l.error("Bad element for imagesLoaded " + (i || e))) : new n(e, t, s);
		}
		function s(e) {
			this.img = e;
		}
		function i(e, t) {
			(this.url = e), (this.element = t), (this.img = new Image());
		}
		var o = t.jQuery,
			l = t.console,
			d = Array.prototype.slice,
			c =
				(((n.prototype = Object.create(e.prototype)).options = {}),
				(n.prototype.getImages = function () {
					(this.images = []), this.elements.forEach(this.addElementImages, this);
				}),
				(n.prototype.addElementImages = function (e) {
					"IMG" == e.nodeName && this.addImage(e), !0 === this.options.background && this.addElementBackgroundImages(e);
					var t = e.nodeType;
					if (t && c[t]) {
						for (var s = e.querySelectorAll("img"), i = 0; i < s.length; i++) {
							var a = s[i];
							this.addImage(a);
						}
						if ("string" == typeof this.options.background)
							for (var r = e.querySelectorAll(this.options.background), i = 0; i < r.length; i++) {
								var n = r[i];
								this.addElementBackgroundImages(n);
							}
					}
				}),
				{ 1: !0, 9: !0, 11: !0 });
		return (
			(n.prototype.addElementBackgroundImages = function (e) {
				var t = getComputedStyle(e);
				if (t)
					for (var s = /url\((['"])?(.*?)\1\)/gi, i = s.exec(t.backgroundImage); null !== i; ) {
						var a = i && i[2];
						a && this.addBackground(a, e), (i = s.exec(t.backgroundImage));
					}
			}),
			(n.prototype.addImage = function (e) {
				e = new s(e);
				this.images.push(e);
			}),
			(n.prototype.addBackground = function (e, t) {
				e = new i(e, t);
				this.images.push(e);
			}),
			(n.prototype.check = function () {
				function t(e, t, s) {
					setTimeout(function () {
						i.progress(e, t, s);
					});
				}
				var i = this;
				return (
					(this.progressedCount = 0),
					(this.hasAnyBroken = !1),
					this.images.length
						? void this.images.forEach(function (e) {
								e.once("progress", t), e.check();
						  })
						: void this.complete()
				);
			}),
			(n.prototype.progress = function (e, t, s) {
				this.progressedCount++, (this.hasAnyBroken = this.hasAnyBroken || !e.isLoaded), this.emitEvent("progress", [this, e, t]), this.jqDeferred && this.jqDeferred.notify && this.jqDeferred.notify(this, e), this.progressedCount == this.images.length && this.complete(), this.options.debug && l && l.log("progress: " + s, e, t);
			}),
			(n.prototype.complete = function () {
				var e = this.hasAnyBroken ? "fail" : "done";
				(this.isComplete = !0), this.emitEvent(e, [this]), this.emitEvent("always", [this]), this.jqDeferred && ((e = this.hasAnyBroken ? "reject" : "resolve"), this.jqDeferred[e](this));
			}),
			((s.prototype = Object.create(e.prototype)).check = function () {
				return this.getIsImageComplete() ? void this.confirm(0 !== this.img.naturalWidth, "naturalWidth") : ((this.proxyImage = new Image()), this.proxyImage.addEventListener("load", this), this.proxyImage.addEventListener("error", this), this.img.addEventListener("load", this), this.img.addEventListener("error", this), void (this.proxyImage.src = this.img.src));
			}),
			(s.prototype.getIsImageComplete = function () {
				return this.img.complete && this.img.naturalWidth;
			}),
			(s.prototype.confirm = function (e, t) {
				(this.isLoaded = e), this.emitEvent("progress", [this, this.img, t]);
			}),
			(s.prototype.handleEvent = function (e) {
				var t = "on" + e.type;
				this[t] && this[t](e);
			}),
			(s.prototype.onload = function () {
				this.confirm(!0, "onload"), this.unbindEvents();
			}),
			(s.prototype.onerror = function () {
				this.confirm(!1, "onerror"), this.unbindEvents();
			}),
			(s.prototype.unbindEvents = function () {
				this.proxyImage.removeEventListener("load", this), this.proxyImage.removeEventListener("error", this), this.img.removeEventListener("load", this), this.img.removeEventListener("error", this);
			}),
			((i.prototype = Object.create(s.prototype)).check = function () {
				this.img.addEventListener("load", this), this.img.addEventListener("error", this), (this.img.src = this.url), this.getIsImageComplete() && (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"), this.unbindEvents());
			}),
			(i.prototype.unbindEvents = function () {
				this.img.removeEventListener("load", this), this.img.removeEventListener("error", this);
			}),
			(i.prototype.confirm = function (e, t) {
				(this.isLoaded = e), this.emitEvent("progress", [this, this.element, t]);
			}),
			(n.makeJQueryPlugin = function (e) {
				(e = e || t.jQuery) &&
					((o = e).fn.imagesLoaded = function (e, t) {
						return new n(this, e, t).jqDeferred.promise(o(this));
					});
			})(),
			n
		);
	}),
	(function (e, t) {
		"function" == typeof define && define.amd ? define([], t) : "object" == typeof module && module.exports ? (module.exports = t()) : (e.Rellax = t());
	})("undefined" != typeof window ? window : global, function () {
		function p(e, t) {
			var x = Object.create(p.prototype),
				r = 0,
				T = 0,
				n = 0,
				C = 0,
				S = [],
				$ = !0,
				s =
					window.requestAnimationFrame ||
					window.webkitRequestAnimationFrame ||
					window.mozRequestAnimationFrame ||
					window.msRequestAnimationFrame ||
					window.oRequestAnimationFrame ||
					function (e) {
						return setTimeout(e, 1e3 / 60);
					},
				i = null,
				a = !1;
			try {
				var o = Object.defineProperty({}, "passive", {
					get: function () {
						a = !0;
					},
				});
				window.addEventListener("testPassive", null, o), window.removeEventListener("testPassive", null, o);
			} catch (e) {}
			var l = window.cancelAnimationFrame || window.mozCancelAnimationFrame || clearTimeout,
				d =
					window.transformProp ||
					(function () {
						var e = document.createElement("div");
						if (null === e.style.transform) {
							var t,
								s = ["Webkit", "Moz", "ms"];
							for (t in s) if (void 0 !== e.style[s[t] + "Transform"]) return s[t] + "Transform";
						}
						return "transform";
					})();
			if (
				((x.options = { speed: -2, verticalSpeed: null, horizontalSpeed: null, breakpoints: [576, 768, 1201], center: !1, wrapper: null, relativeToWrapper: !1, round: !0, vertical: !0, horizontal: !1, verticalScrollAxis: "y", horizontalScrollAxis: "x", callback: function () {} }),
				t &&
					Object.keys(t).forEach(function (e) {
						x.options[e] = t[e];
					}),
				t &&
					t.breakpoints &&
					(function () {
						if (3 === x.options.breakpoints.length && Array.isArray(x.options.breakpoints)) {
							var t,
								s = !0,
								i = !0;
							if (
								(x.options.breakpoints.forEach(function (e) {
									"number" != typeof e && (i = !1), null !== t && e < t && (s = !1), (t = e);
								}),
								s && i)
							)
								return;
						}
						(x.options.breakpoints = [576, 768, 1201]), console.warn("Rellax: You must pass an array of 3 numbers in ascending order to the breakpoints option. Defaults reverted");
					})(),
				0 < (o = "string" == typeof (e = e || ".rellax") ? document.querySelectorAll(e) : [e]).length)
			) {
				if (((x.elems = o), x.options.wrapper && !x.options.wrapper.nodeType)) {
					if (!(o = document.querySelector(x.options.wrapper))) return void console.warn("Rellax: The wrapper you're trying to use doesn't exist.");
					x.options.wrapper = o;
				}
				function M() {
					for (var e = 0; e < S.length; e++) x.elems[e].style.cssText = S[e].style;
					for (S = [], T = window.innerHeight, C = window.innerWidth, e = x.options.breakpoints, A = C < e[0] ? "xs" : C >= e[0] && C < e[1] ? "sm" : C >= e[1] && C < e[2] ? "md" : "lg", k(), e = 0; e < x.elems.length; e++) {
						var t = void 0,
							s = x.elems[e],
							i = s.getAttribute("data-rellax-percentage"),
							a = s.getAttribute("data-rellax-speed"),
							r = s.getAttribute("data-rellax-xs-speed"),
							n = s.getAttribute("data-rellax-mobile-speed"),
							o = s.getAttribute("data-rellax-tablet-speed"),
							l = s.getAttribute("data-rellax-desktop-speed"),
							d = s.getAttribute("data-rellax-vertical-speed"),
							c = s.getAttribute("data-rellax-horizontal-speed"),
							p = s.getAttribute("data-rellax-vertical-scroll-axis"),
							u = s.getAttribute("data-rellax-horizontal-scroll-axis"),
							h = s.getAttribute("data-rellax-zindex") || 0,
							m = s.getAttribute("data-rellax-min"),
							f = s.getAttribute("data-rellax-max"),
							g = s.getAttribute("data-rellax-min-x"),
							v = s.getAttribute("data-rellax-max-x"),
							b = s.getAttribute("data-rellax-min-y"),
							w = s.getAttribute("data-rellax-max-y"),
							y = !0,
							_ = (r || n || o || l ? (t = { xs: r, sm: n, md: o, lg: l }) : (y = !1), (r = x.options.wrapper ? x.options.wrapper.scrollTop : window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop), x.options.relativeToWrapper && (r = (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop) - x.options.wrapper.offsetTop), x.options.vertical && (i || x.options.center) ? r : 0),
							E = x.options.horizontal && (i || x.options.center) ? (x.options.wrapper ? x.options.wrapper.scrollLeft : window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft) : 0,
							r = _ + s.getBoundingClientRect().top,
							n = s.clientHeight || s.offsetHeight || s.scrollHeight,
							o = E + s.getBoundingClientRect().left,
							l = s.clientWidth || s.offsetWidth || s.scrollWidth,
							_ = i || (_ - r + T) / (n + T),
							i = i || (E - o + C) / (l + C);
						x.options.center && (_ = i = 0.5), (t = y && null !== t[A] ? Number(t[A]) : a || x.options.speed), (d = d || x.options.verticalSpeed), (c = c || x.options.horizontalSpeed), (p = p || x.options.verticalScrollAxis), (u = u || x.options.horizontalScrollAxis), (a = O(i, _, t, d, c)), (s = s.style.cssText), (y = ""), (i = /transform\s*:/i.exec(s)) && (y = (i = (y = s.slice(i.index)).indexOf(";")) ? " " + y.slice(11, i).replace(/\s/g, "") : " " + y.slice(11).replace(/\s/g, "")), S.push({ baseX: a.x, baseY: a.y, top: r, left: o, height: n, width: l, speed: t, verticalSpeed: d, horizontalSpeed: c, verticalScrollAxis: p, horizontalScrollAxis: u, style: s, transform: y, zindex: h, min: m, max: f, minX: g, maxX: v, minY: b, maxY: w });
					}
					L(), $ && (window.addEventListener("resize", M), ($ = !1), P());
				}
				var A,
					k = function () {
						var e = r,
							t = n;
						return (r = x.options.wrapper ? x.options.wrapper.scrollTop : (document.documentElement || document.body.parentNode || document.body).scrollTop || window.pageYOffset), (n = x.options.wrapper ? x.options.wrapper.scrollLeft : (document.documentElement || document.body.parentNode || document.body).scrollLeft || window.pageXOffset), !!((e != (r = x.options.relativeToWrapper ? ((document.documentElement || document.body.parentNode || document.body).scrollTop || window.pageYOffset) - x.options.wrapper.offsetTop : r) && x.options.vertical) || (t != n && x.options.horizontal));
					},
					O = function (e, t, s, i, a) {
						var r = {};
						return (e = 100 * (a || s) * (1 - e)), (t = 100 * (i || s) * (1 - t)), (r.x = x.options.round ? Math.round(e) : Math.round(100 * e) / 100), (r.y = x.options.round ? Math.round(t) : Math.round(100 * t) / 100), r;
					},
					c = function () {
						window.removeEventListener("resize", c), window.removeEventListener("orientationchange", c), (x.options.wrapper || window).removeEventListener("scroll", c), (x.options.wrapper || document).removeEventListener("touchmove", c), (i = s(P));
					},
					P = function () {
						k() && !1 === $ ? (L(), (i = s(P))) : ((i = null), window.addEventListener("resize", c), window.addEventListener("orientationchange", c), (x.options.wrapper || window).addEventListener("scroll", c, !!a && { passive: !0 }), (x.options.wrapper || document).addEventListener("touchmove", c, !!a && { passive: !0 }));
					},
					L = function () {
						for (var e = 0; e < x.elems.length; e++) {
							var t = S[e].verticalScrollAxis.toLowerCase(),
								s = S[e].horizontalScrollAxis.toLowerCase(),
								i = -1 != t.indexOf("x") ? r : 0,
								t = -1 != t.indexOf("y") ? r : 0,
								a = -1 != s.indexOf("x") ? n : 0,
								s = -1 != s.indexOf("y") ? n : 0;
							(s = (i = O((i + a - S[e].left + C) / (S[e].width + C), (t + s - S[e].top + T) / (S[e].height + T), S[e].speed, S[e].verticalSpeed, S[e].horizontalSpeed)).y - S[e].baseY), (t = i.x - S[e].baseX), null !== S[e].min && (x.options.vertical && !x.options.horizontal && (s = s <= S[e].min ? S[e].min : s), x.options.horizontal) && !x.options.vertical && (t = t <= S[e].min ? S[e].min : t), null != S[e].minY && (s = s <= S[e].minY ? S[e].minY : s), null != S[e].minX && (t = t <= S[e].minX ? S[e].minX : t), null !== S[e].max && (x.options.vertical && !x.options.horizontal && (s = s >= S[e].max ? S[e].max : s), x.options.horizontal) && !x.options.vertical && (t = t >= S[e].max ? S[e].max : t), null != S[e].maxY && (s = s >= S[e].maxY ? S[e].maxY : s), null != S[e].maxX && (t = t >= S[e].maxX ? S[e].maxX : t), (x.elems[e].style[d] = "translate3d(" + (x.options.horizontal ? t : "0") + "px," + (x.options.vertical ? s : "0") + "px," + S[e].zindex + "px) " + S[e].transform);
						}
						x.options.callback(i);
					};
				return (
					(x.destroy = function () {
						for (var e = 0; e < x.elems.length; e++) x.elems[e].style.cssText = S[e].style;
						$ || (window.removeEventListener("resize", M), ($ = !0)), l(i), (i = null);
					}),
					M(),
					(x.refresh = M),
					x
				);
			}
			console.warn("Rellax: The elements you're trying to select don't exist.");
		}
		return p;
	});
var $jscomp = $jscomp || {},
	$jscomp$lookupPolyfilledValue =
		(($jscomp.scope = {}),
		($jscomp.arrayIteratorImpl = function (e) {
			var t = 0;
			return function () {
				return t < e.length ? { done: !1, value: e[t++] } : { done: !0 };
			};
		}),
		($jscomp.arrayIterator = function (e) {
			return { next: $jscomp.arrayIteratorImpl(e) };
		}),
		($jscomp.ASSUME_ES5 = !1),
		($jscomp.ASSUME_NO_NATIVE_MAP = !1),
		($jscomp.ASSUME_NO_NATIVE_SET = !1),
		($jscomp.SIMPLE_FROUND_POLYFILL = !1),
		($jscomp.ISOLATE_POLYFILLS = !1),
		($jscomp.defineProperty =
			$jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties
				? Object.defineProperty
				: function (e, t, s) {
						return e != Array.prototype && e != Object.prototype && (e[t] = s.value), e;
				  }),
		($jscomp.getGlobal = function (e) {
			e = ["object" == typeof globalThis && globalThis, e, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
			for (var t = 0; t < e.length; ++t) {
				var s = e[t];
				if (s && s.Math == Math) return s;
			}
			throw Error("Cannot find global object");
		}),
		($jscomp.global = $jscomp.getGlobal(this)),
		($jscomp.IS_SYMBOL_NATIVE = "function" == typeof Symbol && "symbol" == typeof Symbol("x")),
		($jscomp.TRUST_ES6_POLYFILLS = !$jscomp.ISOLATE_POLYFILLS || $jscomp.IS_SYMBOL_NATIVE),
		($jscomp.polyfills = {}),
		($jscomp.propertyToPolyfillSymbol = {}),
		($jscomp.POLYFILL_PREFIX = "$jscp$"),
		function (e, t) {
			var s = $jscomp.propertyToPolyfillSymbol[t];
			return null != s && void 0 !== (s = e[s]) ? s : e[t];
		}),
	scrollCue =
		(($jscomp.polyfill = function (e, t, s, i) {
			t && ($jscomp.ISOLATE_POLYFILLS ? $jscomp.polyfillIsolated(e, t, s, i) : $jscomp.polyfillUnisolated(e, t, s, i));
		}),
		($jscomp.polyfillUnisolated = function (e, t, s, i) {
			for (s = $jscomp.global, e = e.split("."), i = 0; i < e.length - 1; i++) {
				var a = e[i];
				a in s || (s[a] = {}), (s = s[a]);
			}
			(t = t((i = s[(e = e[e.length - 1])]))) != i && null != t && $jscomp.defineProperty(s, e, { configurable: !0, writable: !0, value: t });
		}),
		($jscomp.polyfillIsolated = function (e, t, s, i) {
			var a = e.split(".");
			(e = 1 === a.length), (i = a[0]), (i = !e && i in $jscomp.polyfills ? $jscomp.polyfills : $jscomp.global);
			for (var r = 0; r < a.length - 1; r++) {
				var n = a[r];
				n in i || (i[n] = {}), (i = i[n]);
			}
			(a = a[a.length - 1]), null != (t = t((s = $jscomp.IS_SYMBOL_NATIVE && "es6" === s ? i[a] : null))) && (e ? $jscomp.defineProperty($jscomp.polyfills, a, { configurable: !0, writable: !0, value: t }) : t !== s && (($jscomp.propertyToPolyfillSymbol[a] = $jscomp.IS_SYMBOL_NATIVE ? $jscomp.global.Symbol(a) : $jscomp.POLYFILL_PREFIX + a), (a = $jscomp.propertyToPolyfillSymbol[a]), $jscomp.defineProperty(i, a, { configurable: !0, writable: !0, value: t })));
		}),
		($jscomp.initSymbol = function () {}),
		$jscomp.polyfill(
			"Symbol",
			function (e) {
				var t, s, i;
				return (
					e ||
					(((t = function (e, t) {
						(this.$jscomp$symbol$id_ = e), $jscomp.defineProperty(this, "description", { configurable: !0, writable: !0, value: t });
					}).prototype.toString = function () {
						return this.$jscomp$symbol$id_;
					}),
					(s = 0),
					(i = function (e) {
						if (this instanceof i) throw new TypeError("Symbol is not a constructor");
						return new t("jscomp_symbol_" + (e || "") + "_" + s++, e);
					}))
				);
			},
			"es6",
			"es3"
		),
		($jscomp.initSymbolIterator = function () {}),
		$jscomp.polyfill(
			"Symbol.iterator",
			function (e) {
				if (!e) {
					e = Symbol("Symbol.iterator");
					for (var t = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), s = 0; s < t.length; s++) {
						var i = $jscomp.global[t[s]];
						"function" == typeof i &&
							"function" != typeof i.prototype[e] &&
							$jscomp.defineProperty(i.prototype, e, {
								configurable: !0,
								writable: !0,
								value: function () {
									return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this));
								},
							});
					}
				}
				return e;
			},
			"es6",
			"es3"
		),
		($jscomp.initSymbolAsyncIterator = function () {}),
		($jscomp.iteratorPrototype = function (e) {
			return (
				((e = { next: e })[Symbol.iterator] = function () {
					return this;
				}),
				e
			);
		}),
		($jscomp.iteratorFromArray = function (t, s) {
			t instanceof String && (t += "");
			var i = 0,
				a = {
					next: function () {
						var e;
						return i < t.length
							? ((e = i++), { value: s(e, t[e]), done: !1 })
							: ((a.next = function () {
									return { done: !0, value: void 0 };
							  }),
							  a.next());
					},
				};
			return (
				(a[Symbol.iterator] = function () {
					return a;
				}),
				a
			);
		}),
		$jscomp.polyfill(
			"Array.prototype.keys",
			function (e) {
				return (
					e ||
					function () {
						return $jscomp.iteratorFromArray(this, function (e) {
							return e;
						});
					}
				);
			},
			"es6",
			"es3"
		),
		(function () {
			var r,
				a,
				n,
				o = {},
				i = 0,
				l = !0,
				d = !0,
				c = !1,
				t = !1,
				s = { duration: 600, interval: -0.7, percentage: 0.75, enable: !0, docSlider: !1, pageChangeReset: !1 },
				o = {
					setEvents: function (e) {
						function t() {
							l &&
								(requestAnimationFrame(function () {
									(l = !0), d && (o.setQuery(), o.runQuery());
								}),
								(l = !1));
						}
						if ((d && !e && window.addEventListener("load", o.runQuery), window.addEventListener("scroll", t), c)) {
							e = docSlider.getElements().pages;
							for (var s = 0; s < e.length; s++)
								e[s].addEventListener("scroll", function (e) {
									if (docSlider.getCurrentIndex() + "" !== (e = e.target.getAttribute("data-ds-index"))) return !1;
									docSlider._getWheelEnable() && t();
								});
						}
						window.addEventListener("resize", function () {
							0 < i && clearTimeout(i),
								(i = setTimeout(function () {
									d && (o.searchElements(), o.setQuery(), o.runQuery());
								}, 200));
						});
					},
					setOptions: function (t, s) {
						var i = {};
						if (void 0 !== t)
							return (
								Object.keys(t).forEach(function (e) {
									"[object Object]" === Object.prototype.toString.call(t[e]) ? (i[e] = o.setOptions(t[e], s[e])) : ((i[e] = t[e]), void 0 !== s && void 0 !== s[e] && (i[e] = s[e]));
								}),
								i
							);
					},
					searchElements: function () {
						r = [];
						for (var e = document.querySelectorAll("[data-cues]:not([data-disabled])"), t = 0; t < e.length; t++) {
							for (var s = e[t], i = 0; i < s.children.length; i++) {
								var a = s.children[i];
								o.setAttrPtoC(a, "data-cue", s, "data-cues", ""), o.setAttrPtoC(a, "data-duration", s, "data-duration", !1), o.setAttrPtoC(a, "data-interval", s, "data-interval", !1), o.setAttrPtoC(a, "data-sort", s, "data-sort", !1), o.setAttrPtoC(a, "data-addClass", s, "data-addClass", !1), o.setAttrPtoC(a, "data-group", s, "data-group", !1), o.setAttrPtoC(a, "data-delay", s, "data-delay", !1);
							}
							s.setAttribute("data-disabled", "true");
						}
						for (e = document.querySelectorAll('[data-cue]:not([data-show="true"])'), t = 0; t < e.length; t++) (s = e[t]), r.push({ elm: s, cue: o.getAttr(s, "data-cue", "fadeIn"), duration: Number(o.getAttr(s, "data-duration", n.duration)), interval: Number(o.getAttr(s, "data-interval", n.interval)), order: o.getOrderNumber(s), sort: o.getAttr(s, "data-sort", null), addClass: o.getAttr(s, "data-addClass", null), group: o.getAttr(s, "data-group", null), delay: Number(o.getAttr(s, "data-delay", 0)) });
						if (c) for (e = docSlider.getElements().pages.length, t = 0; t < e; t++) for (s = document.querySelectorAll('[data-ds-index="' + t + '"] [data-cue]:not([data-scpage])'), i = 0; i < s.length; i++) s[i].setAttribute("data-scpage", t);
					},
					sortElements: function () {
						for (var e = arguments[0], r = [].slice.call(arguments).slice(1), t = { $jscomp$loop$prop$i$4: 0 }; t.$jscomp$loop$prop$i$4 < r.length; (t = { $jscomp$loop$prop$i$4: t.$jscomp$loop$prop$i$4 }).$jscomp$loop$prop$i$4++)
							e.sort(
								(function (a) {
									return function (e, t) {
										var s = void 0 === r[a.$jscomp$loop$prop$i$4][1] || r[a.$jscomp$loop$prop$i$4][1],
											i = r[a.$jscomp$loop$prop$i$4][0];
										return e[i] > t[i] ? (s ? 1 : -1) : e[i] < t[i] ? (s ? -1 : 1) : 0;
									};
								})(t)
							);
					},
					randElements: function (e) {
						for (var t = e.length - 1; 0 < t; t--) {
							var s = Math.floor(Math.random() * (t + 1)),
								i = e[t];
							(e[t] = e[s]), (e[s] = i);
						}
						return e;
					},
					setDurationValue: function (e, t, s) {
						return void 0 !== t && ((t = t.duration), (e = -1 === (s + "").indexOf(".") ? e + t + s : e + t + t * s) < 0) ? 0 : e;
					},
					getOrderNumber: function (e) {
						return e.hasAttribute("data-order") ? (0 <= (e = Number(e.getAttribute("data-order"))) ? e : Math.pow(2, 53) - 1 + e) : Math.pow(2, 52) - 1;
					},
					setAttrPtoC: function (e, t, s, i, a) {
						s.hasAttribute(i) ? e.hasAttribute(t) || e.setAttribute(t, s.getAttribute(i)) : !1 !== a && e.setAttribute(t, a);
					},
					getAttr: function (e, t, s) {
						return e.hasAttribute(t) ? e.getAttribute(t) : s;
					},
					getOffsetTop: function (e) {
						return e.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop);
					},
					setClassNames: function (e, t) {
						if (t) {
							t = t.split(" ");
							for (var s = 0; s < t.length; s++) e.classList.add(t[s]);
						}
					},
					setQuery: function () {
						a = {};
						for (var e = 0; e < r.length; e++) {
							var t = r[e],
								s = t.group || "$" + o.getOffsetTop(t.elm);
							if (!t.elm.hasAttribute("data-show")) {
								if (c) {
									var i = t.elm.getAttribute("data-scpage");
									if (i !== docSlider.getCurrentIndex() + "" && null !== i) continue;
								}
								void 0 === a[s] && (a[s] = []), a[s].push(t);
							}
						}
					},
					runQuery: function () {
						for (var e = Object.keys(a), t = {}, s = 0; s < e.length; t = { $jscomp$loop$prop$elms$6: t.$jscomp$loop$prop$elms$6, $jscomp$loop$prop$interval$7: t.$jscomp$loop$prop$interval$7 }, s++)
							if (((t.$jscomp$loop$prop$elms$6 = a[e[s]]), o.isElementIn(t.$jscomp$loop$prop$elms$6[0].elm))) {
								"reverse" === t.$jscomp$loop$prop$elms$6[0].sort ? t.$jscomp$loop$prop$elms$6.reverse() : "random" === t.$jscomp$loop$prop$elms$6[0].sort && o.randElements(t.$jscomp$loop$prop$elms$6), o.sortElements(t.$jscomp$loop$prop$elms$6, ["order"]);
								for (var i = (t.$jscomp$loop$prop$interval$7 = 0); i < t.$jscomp$loop$prop$elms$6.length; i++)
									!(function (t) {
										return function (e) {
											t.$jscomp$loop$prop$elms$6[e].elm.setAttribute("data-show", "true"), o.setClassNames(t.$jscomp$loop$prop$elms$6[e].elm, t.$jscomp$loop$prop$elms$6[e].addClass), (t.$jscomp$loop$prop$interval$7 = o.setDurationValue(t.$jscomp$loop$prop$interval$7, t.$jscomp$loop$prop$elms$6[e - 1], t.$jscomp$loop$prop$elms$6[e].interval)), (t.$jscomp$loop$prop$elms$6[e].elm.style.animationName = t.$jscomp$loop$prop$elms$6[e].cue), (t.$jscomp$loop$prop$elms$6[e].elm.style.animationDuration = t.$jscomp$loop$prop$elms$6[e].duration + "ms"), (t.$jscomp$loop$prop$elms$6[e].elm.style.animationTimingFunction = "ease"), (t.$jscomp$loop$prop$elms$6[e].elm.style.animationDelay = t.$jscomp$loop$prop$interval$7 + t.$jscomp$loop$prop$elms$6[e].delay + "ms"), (t.$jscomp$loop$prop$elms$6[e].elm.style.animationDirection = "normal"), (t.$jscomp$loop$prop$elms$6[e].elm.style.animationFillMode = "both");
										};
									})(t)(i);
								delete a[e[s]];
							}
					},
					isElementIn: function (e) {
						var t = e.hasAttribute("data-scpage") ? o.isScrollEndWithDocSlider : o.isScrollEnd;
						return window.pageYOffset > o.getOffsetTop(e) - window.innerHeight * n.percentage || t();
					},
					isScrollEnd: function () {
						var e = window.document.documentElement;
						return (window.document.body.scrollTop || e.scrollTop) >= e.scrollHeight - e.clientHeight;
					},
					isScrollEndWithDocSlider: function () {
						var e = docSlider.getCurrentPage();
						return e.scrollTop >= e.scrollHeight - e.clientHeight;
					},
				};
			return {
				init: function (e) {
					(n = o.setOptions(s, e)), (d = n.enable), (c = n.docSlider), (t = n.pageChangeReset), c || (o.setEvents(), o.searchElements(), o.setQuery());
				},
				update: function () {
					d && (o.searchElements(), o.setQuery(), o.runQuery());
				},
				enable: function (e) {
					(d = void 0 === e ? !d : e), scrollCue.update();
				},
				_hasDocSlider: function () {
					return c;
				},
				_hasPageChangeReset: function () {
					return t;
				},
				_initWithDocSlider: function (e) {
					o.setEvents(e), o.searchElements(), o.setQuery();
				},
				_updateWithDocSlider: function () {
					d && (o.setQuery(), o.runQuery());
				},
				_searchElements: function () {
					o.searchElements();
				},
			};
		})());
!(function (e, t) {
	"object" == typeof exports && "undefined" != typeof module ? (module.exports = t()) : "function" == typeof define && define.amd ? define(t) : ((e = "undefined" != typeof globalThis ? globalThis : e || self).Swiper = t());
})(this, function () {
	"use strict";
	function i(e) {
		return null !== e && "object" == typeof e && "constructor" in e && e.constructor === Object;
	}
	function a(t, s) {
		void 0 === t && (t = {}),
			void 0 === s && (s = {}),
			Object.keys(s).forEach((e) => {
				void 0 === t[e] ? (t[e] = s[e]) : i(s[e]) && i(t[e]) && 0 < Object.keys(s[e]).length && a(t[e], s[e]);
			});
	}
	const t = { body: {}, addEventListener() {}, removeEventListener() {}, activeElement: { blur() {}, nodeName: "" }, querySelector: () => null, querySelectorAll: () => [], getElementById: () => null, createEvent: () => ({ initEvent() {} }), createElement: () => ({ children: [], childNodes: [], style: {}, setAttribute() {}, getElementsByTagName: () => [] }), createElementNS: () => ({}), importNode: () => null, location: { hash: "", host: "", hostname: "", href: "", origin: "", pathname: "", protocol: "", search: "" } };
	function T() {
		var e = "undefined" != typeof document ? document : {};
		return a(e, t), e;
	}
	const D = {
		document: t,
		navigator: { userAgent: "" },
		location: { hash: "", host: "", hostname: "", href: "", origin: "", pathname: "", protocol: "", search: "" },
		history: { replaceState() {}, pushState() {}, go() {}, back() {} },
		CustomEvent: function () {
			return this;
		},
		addEventListener() {},
		removeEventListener() {},
		getComputedStyle: () => ({ getPropertyValue: () => "" }),
		Image() {},
		Date() {},
		screen: {},
		setTimeout() {},
		clearTimeout() {},
		matchMedia: () => ({}),
		requestAnimationFrame: (e) => ("undefined" == typeof setTimeout ? (e(), null) : setTimeout(e, 0)),
		cancelAnimationFrame(e) {
			"undefined" != typeof setTimeout && clearTimeout(e);
		},
	};
	function O() {
		var e = "undefined" != typeof window ? window : {};
		return a(e, D), e;
	}
	class n extends Array {
		constructor(e) {
			if ("number" == typeof e) super(e);
			else {
				super(...(e || []));
				{
					e = this;
					const t = e.__proto__;
					Object.defineProperty(e, "__proto__", {
						get: () => t,
						set(e) {
							t.__proto__ = e;
						},
					});
				}
			}
		}
	}
	function r(e) {
		const t = [];
		return (
			(e = void 0 === e ? [] : e).forEach((e) => {
				Array.isArray(e) ? t.push(...r(e)) : t.push(e);
			}),
			t
		);
	}
	function o(e, t) {
		return Array.prototype.filter.call(e, t);
	}
	function P(e, i) {
		const t = O(),
			a = T();
		let s = [];
		if (!i && e instanceof n) return e;
		if (!e) return new n(s);
		if ("string" == typeof e) {
			const t = e.trim();
			if (0 <= t.indexOf("<") && 0 <= t.indexOf(">")) {
				let e = "div";
				0 === t.indexOf("<li") && (e = "ul"), 0 === t.indexOf("<tr") && (e = "tbody"), (0 !== t.indexOf("<td") && 0 !== t.indexOf("<th")) || (e = "tr"), 0 === t.indexOf("<tbody") && (e = "table"), 0 === t.indexOf("<option") && (e = "select");
				const i = a.createElement(e);
				i.innerHTML = t;
				for (let e = 0; e < i.childNodes.length; e += 1) s.push(i.childNodes[e]);
			} else
				s = (function (e) {
					if ("string" != typeof e) return [e];
					var t = [],
						s = (i || a).querySelectorAll(e);
					for (let e = 0; e < s.length; e += 1) t.push(s[e]);
					return t;
				})(e.trim());
		} else if (e.nodeType || e === t || e === a) s.push(e);
		else if (Array.isArray(e)) {
			if (e instanceof n) return e;
			s = e;
		}
		return new n(
			(function (t) {
				var s = [];
				for (let e = 0; e < t.length; e += 1) -1 === s.indexOf(t[e]) && s.push(t[e]);
				return s;
			})(s)
		);
	}
	P.fn = n.prototype;
	const s = {
		addClass: function () {
			for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++) t[s] = arguments[s];
			const i = r(t.map((e) => e.split(" ")));
			return (
				this.forEach((e) => {
					e.classList.add(...i);
				}),
				this
			);
		},
		removeClass: function () {
			for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++) t[s] = arguments[s];
			const i = r(t.map((e) => e.split(" ")));
			return (
				this.forEach((e) => {
					e.classList.remove(...i);
				}),
				this
			);
		},
		hasClass: function () {
			for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++) t[s] = arguments[s];
			const i = r(t.map((e) => e.split(" ")));
			return 0 < o(this, (t) => 0 < i.filter((e) => t.classList.contains(e)).length).length;
		},
		toggleClass: function () {
			for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++) t[s] = arguments[s];
			const i = r(t.map((e) => e.split(" ")));
			this.forEach((t) => {
				i.forEach((e) => {
					t.classList.toggle(e);
				});
			});
		},
		attr: function (t, s) {
			if (1 === arguments.length && "string" == typeof t) return this[0] ? this[0].getAttribute(t) : void 0;
			for (let e = 0; e < this.length; e += 1)
				if (2 === arguments.length) this[e].setAttribute(t, s);
				else for (const s in t) (this[e][s] = t[s]), this[e].setAttribute(s, t[s]);
			return this;
		},
		removeAttr: function (t) {
			for (let e = 0; e < this.length; e += 1) this[e].removeAttribute(t);
			return this;
		},
		transform: function (t) {
			for (let e = 0; e < this.length; e += 1) this[e].style.transform = t;
			return this;
		},
		transition: function (t) {
			for (let e = 0; e < this.length; e += 1) this[e].style.transitionDuration = "string" != typeof t ? t + "ms" : t;
			return this;
		},
		on: function () {
			for (var t = arguments.length, s = new Array(t), e = 0; e < t; e++) s[e] = arguments[e];
			let [i, a, r, n] = s;
			function o(t) {
				var e = t.target;
				if (e) {
					var s = t.target.dom7EventData || [];
					if ((s.indexOf(t) < 0 && s.unshift(t), P(e).is(a))) r.apply(e, s);
					else {
						const t = P(e).parents();
						for (let e = 0; e < t.length; e += 1) P(t[e]).is(a) && r.apply(t[e], s);
					}
				}
			}
			function l(e) {
				var t = (e && e.target && e.target.dom7EventData) || [];
				t.indexOf(e) < 0 && t.unshift(e), r.apply(this, t);
			}
			"function" == typeof s[1] && (([i, r, n] = s), (a = void 0)), (n = n || !1);
			var d = i.split(" ");
			let c;
			for (let e = 0; e < this.length; e += 1) {
				const s = this[e];
				if (a)
					for (c = 0; c < d.length; c += 1) {
						const t = d[c];
						s.dom7LiveListeners || (s.dom7LiveListeners = {}), s.dom7LiveListeners[t] || (s.dom7LiveListeners[t] = []), s.dom7LiveListeners[t].push({ listener: r, proxyListener: o }), s.addEventListener(t, o, n);
					}
				else
					for (c = 0; c < d.length; c += 1) {
						const t = d[c];
						s.dom7Listeners || (s.dom7Listeners = {}), s.dom7Listeners[t] || (s.dom7Listeners[t] = []), s.dom7Listeners[t].push({ listener: r, proxyListener: l }), s.addEventListener(t, l, n);
					}
			}
			return this;
		},
		off: function () {
			for (var e = arguments.length, s = new Array(e), i = 0; i < e; i++) s[i] = arguments[i];
			let [t, a, r, n] = s;
			"function" == typeof s[1] && (([t, r, n] = s), (a = void 0)), (n = n || !1);
			var o = t.split(" ");
			for (let e = 0; e < o.length; e += 1) {
				const s = o[e];
				for (let e = 0; e < this.length; e += 1) {
					const i = this[e];
					let t;
					if ((!a && i.dom7Listeners ? (t = i.dom7Listeners[s]) : a && i.dom7LiveListeners && (t = i.dom7LiveListeners[s]), t && t.length))
						for (let e = t.length - 1; 0 <= e; --e) {
							const a = t[e];
							((r && a.listener === r) || (r && a.listener && a.listener.dom7proxy && a.listener.dom7proxy === r) || !r) && (i.removeEventListener(s, a.proxyListener, n), t.splice(e, 1));
						}
				}
			}
			return this;
		},
		trigger: function () {
			for (var t = O(), s = arguments.length, i = new Array(s), a = 0; a < s; a++) i[a] = arguments[a];
			const r = i[0].split(" "),
				n = i[1];
			for (let e = 0; e < r.length; e += 1) {
				const a = r[e];
				for (let e = 0; e < this.length; e += 1) {
					const r = this[e];
					if (t.CustomEvent) {
						const s = new t.CustomEvent(a, { detail: n, bubbles: !0, cancelable: !0 });
						(r.dom7EventData = i.filter((e, t) => 0 < t)), r.dispatchEvent(s), (r.dom7EventData = []), delete r.dom7EventData;
					}
				}
			}
			return this;
		},
		transitionEnd: function (s) {
			const i = this;
			return (
				s &&
					i.on("transitionend", function e(t) {
						t.target === this && (s.call(this, t), i.off("transitionend", e));
					}),
				this
			);
		},
		outerWidth: function (e) {
			if (0 < this.length) {
				if (e) {
					const e = this.styles();
					return this[0].offsetWidth + parseFloat(e.getPropertyValue("margin-right")) + parseFloat(e.getPropertyValue("margin-left"));
				}
				return this[0].offsetWidth;
			}
			return null;
		},
		outerHeight: function (e) {
			if (0 < this.length) {
				if (e) {
					const e = this.styles();
					return this[0].offsetHeight + parseFloat(e.getPropertyValue("margin-top")) + parseFloat(e.getPropertyValue("margin-bottom"));
				}
				return this[0].offsetHeight;
			}
			return null;
		},
		styles: function () {
			var e = O();
			return this[0] ? e.getComputedStyle(this[0], null) : {};
		},
		offset: function () {
			var e, t, s, i, a, r;
			return 0 < this.length ? ((r = O()), (i = T()), (t = (e = this[0]).getBoundingClientRect()), (i = i.body), (s = e.clientTop || i.clientTop || 0), (i = e.clientLeft || i.clientLeft || 0), (a = e === r ? r.scrollY : e.scrollTop), (r = e === r ? r.scrollX : e.scrollLeft), { top: t.top + a - s, left: t.left + r - i }) : null;
		},
		css: function (e, t) {
			var s = O();
			let i;
			if (1 === arguments.length) {
				if ("string" != typeof e) {
					for (i = 0; i < this.length; i += 1) for (const t in e) this[i].style[t] = e[t];
					return this;
				}
				if (this[0]) return s.getComputedStyle(this[0], null).getPropertyValue(e);
			}
			if (2 === arguments.length && "string" == typeof e) for (i = 0; i < this.length; i += 1) this[i].style[e] = t;
			return this;
		},
		each: function (s) {
			return (
				s &&
					this.forEach((e, t) => {
						s.apply(e, [e, t]);
					}),
				this
			);
		},
		html: function (t) {
			if (void 0 === t) return this[0] ? this[0].innerHTML : null;
			for (let e = 0; e < this.length; e += 1) this[e].innerHTML = t;
			return this;
		},
		text: function (t) {
			if (void 0 === t) return this[0] ? this[0].textContent.trim() : null;
			for (let e = 0; e < this.length; e += 1) this[e].textContent = t;
			return this;
		},
		is: function (e) {
			var t = O(),
				s = T(),
				i = this[0];
			let a, r;
			if (i && void 0 !== e)
				if ("string" == typeof e) {
					if (i.matches) return i.matches(e);
					if (i.webkitMatchesSelector) return i.webkitMatchesSelector(e);
					if (i.msMatchesSelector) return i.msMatchesSelector(e);
					for (a = P(e), r = 0; r < a.length; r += 1) if (a[r] === i) return !0;
				} else {
					if (e === s) return i === s;
					if (e === t) return i === t;
					if (e.nodeType || e instanceof n) for (a = e.nodeType ? [e] : e, r = 0; r < a.length; r += 1) if (a[r] === i) return !0;
				}
			return !1;
		},
		index: function () {
			let e,
				t = this[0];
			if (t) {
				for (e = 0; null !== (t = t.previousSibling); ) 1 === t.nodeType && (e += 1);
				return e;
			}
		},
		eq: function (e) {
			var t;
			return void 0 === e ? this : P((t = this.length) - 1 < e ? [] : e < 0 ? ((t = t + e) < 0 ? [] : [this[t]]) : [this[e]]);
		},
		append: function () {
			var s,
				i = T();
			for (let e = 0; e < arguments.length; e += 1) {
				s = e < 0 || arguments.length <= e ? void 0 : arguments[e];
				for (let t = 0; t < this.length; t += 1)
					if ("string" == typeof s) {
						const T = i.createElement("div");
						for (T.innerHTML = s; T.firstChild; ) this[t].appendChild(T.firstChild);
					} else if (s instanceof n) for (let e = 0; e < s.length; e += 1) this[t].appendChild(s[e]);
					else this[t].appendChild(s);
			}
			return this;
		},
		prepend: function (e) {
			var t = T();
			let s, i;
			for (s = 0; s < this.length; s += 1)
				if ("string" == typeof e) {
					const T = t.createElement("div");
					for (T.innerHTML = e, i = T.childNodes.length - 1; 0 <= i; --i) this[s].insertBefore(T.childNodes[i], this[s].childNodes[0]);
				} else if (e instanceof n) for (i = 0; i < e.length; i += 1) this[s].insertBefore(e[i], this[s].childNodes[0]);
				else this[s].insertBefore(e, this[s].childNodes[0]);
			return this;
		},
		next: function (e) {
			return 0 < this.length ? (e ? (this[0].nextElementSibling && P(this[0].nextElementSibling).is(e) ? P([this[0].nextElementSibling]) : P([])) : this[0].nextElementSibling ? P([this[0].nextElementSibling]) : P([])) : P([]);
		},
		nextAll: function (e) {
			var t = [];
			let s = this[0];
			if (!s) return P([]);
			for (; s.nextElementSibling; ) {
				var i = s.nextElementSibling;
				(e && !P(i).is(e)) || t.push(i), (s = i);
			}
			return P(t);
		},
		prev: function (e) {
			var t;
			return 0 < this.length ? ((t = this[0]), e ? (t.previousElementSibling && P(t.previousElementSibling).is(e) ? P([t.previousElementSibling]) : P([])) : t.previousElementSibling ? P([t.previousElementSibling]) : P([])) : P([]);
		},
		prevAll: function (e) {
			var t = [];
			let s = this[0];
			if (!s) return P([]);
			for (; s.previousElementSibling; ) {
				var i = s.previousElementSibling;
				(e && !P(i).is(e)) || t.push(i), (s = i);
			}
			return P(t);
		},
		parent: function (t) {
			var s = [];
			for (let e = 0; e < this.length; e += 1) null === this[e].parentNode || (t && !P(this[e].parentNode).is(t)) || s.push(this[e].parentNode);
			return P(s);
		},
		parents: function (s) {
			var i = [];
			for (let t = 0; t < this.length; t += 1) {
				let e = this[t].parentNode;
				for (; e; ) (s && !P(e).is(s)) || i.push(e), (e = e.parentNode);
			}
			return P(i);
		},
		closest: function (e) {
			let t = this;
			return void 0 === e ? P([]) : (t = t.is(e) ? t : t.parents(e).eq(0));
		},
		find: function (t) {
			var s = [];
			for (let e = 0; e < this.length; e += 1) {
				var i = this[e].querySelectorAll(t);
				for (let e = 0; e < i.length; e += 1) s.push(i[e]);
			}
			return P(s);
		},
		children: function (t) {
			var s = [];
			for (let e = 0; e < this.length; e += 1) {
				var i = this[e].children;
				for (let e = 0; e < i.length; e += 1) (t && !P(i[e]).is(t)) || s.push(i[e]);
			}
			return P(s);
		},
		filter: function (e) {
			return P(o(this, e));
		},
		remove: function () {
			for (let e = 0; e < this.length; e += 1) this[e].parentNode && this[e].parentNode.removeChild(this[e]);
			return this;
		},
	};
	function C(e, t) {
		return void 0 === t && (t = 0), setTimeout(e, t);
	}
	function v() {
		return Date.now();
	}
	function L(e, t) {
		void 0 === t && (t = "x");
		var s = O();
		let i, a, r;
		e = (function (e) {
			var t = O();
			let s;
			return (s = (s = !(s = t.getComputedStyle ? t.getComputedStyle(e, null) : s) && e.currentStyle ? e.currentStyle : s) || e.style);
		})(e);
		return (
			s.WebKitCSSMatrix
				? (6 < (a = e.transform || e.webkitTransform).split(",").length &&
						(a = a
							.split(", ")
							.map((e) => e.replace(",", "."))
							.join(", ")),
				  (r = new s.WebKitCSSMatrix("none" === a ? "" : a)))
				: ((r = e.MozTransform || e.OTransform || e.MsTransform || e.msTransform || e.transform || e.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,")), (i = r.toString().split(","))),
			"x" === t && (a = s.WebKitCSSMatrix ? r.m41 : 16 === i.length ? parseFloat(i[12]) : parseFloat(i[4])),
			(a = "y" === t ? (s.WebKitCSSMatrix ? r.m42 : 16 === i.length ? parseFloat(i[13]) : parseFloat(i[5])) : a) || 0
		);
	}
	function d(e) {
		return "object" == typeof e && null !== e && e.constructor && "Object" === Object.prototype.toString.call(e).slice(8, -1);
	}
	function m(e) {
		const s = Object(arguments.length <= 0 ? void 0 : e),
			t = ["__proto__", "constructor", "prototype"];
		for (let e = 1; e < arguments.length; e += 1) {
			var i = e < 0 || arguments.length <= e ? void 0 : arguments[e];
			if (null != i && ((o = i), !("undefined" != typeof window && void 0 !== window.HTMLElement ? o instanceof HTMLElement : o && (1 === o.nodeType || 11 === o.nodeType)))) {
				var a = Object.keys(Object(i)).filter((e) => t.indexOf(e) < 0);
				for (let e = 0, t = a.length; e < t; e += 1) {
					var r = a[e],
						n = Object.getOwnPropertyDescriptor(i, r);
					void 0 !== n && n.enumerable && (d(s[r]) && d(i[r]) ? (i[r].__swiper__ ? (s[r] = i[r]) : m(s[r], i[r])) : d(s[r]) || !d(i[r]) || ((s[r] = {}), i[r].__swiper__) ? (s[r] = i[r]) : m(s[r], i[r]));
				}
			}
		}
		var o;
		return s;
	}
	function S(e, t, s) {
		e.style.setProperty(t, s);
	}
	function b(e) {
		let { swiper: s, targetPosition: i, side: a } = e;
		const r = O(),
			n = -s.translate;
		let o,
			l = null;
		const d = s.params.speed,
			c = ((s.wrapperEl.style.scrollSnapType = "none"), r.cancelAnimationFrame(s.cssModeFrameID), i > n ? "next" : "prev"),
			p = (e, t) => ("next" === c && t <= e) || ("prev" === c && e <= t),
			u = () => {
				(o = new Date().getTime()), null === l && (l = o);
				var e = Math.max(Math.min((o - l) / d, 1), 0),
					e = 0.5 - Math.cos(e * Math.PI) / 2;
				let t = n + e * (i - n);
				p(t, i) && (t = i),
					s.wrapperEl.scrollTo({ [a]: t }),
					p(t, i)
						? ((s.wrapperEl.style.overflow = "hidden"),
						  (s.wrapperEl.style.scrollSnapType = ""),
						  setTimeout(() => {
								(s.wrapperEl.style.overflow = ""), s.wrapperEl.scrollTo({ [a]: t });
						  }),
						  r.cancelAnimationFrame(s.cssModeFrameID))
						: (s.cssModeFrameID = r.requestAnimationFrame(u));
			};
		u();
	}
	let e, c, l;
	function u() {
		return (e =
			e ||
			(function () {
				const s = O(),
					e = T();
				return {
					smoothScroll: e.documentElement && "scrollBehavior" in e.documentElement.style,
					touch: !!("ontouchstart" in s || (s.DocumentTouch && e instanceof s.DocumentTouch)),
					passiveListener: (function () {
						let e = !1;
						try {
							var t = Object.defineProperty({}, "passive", {
								get() {
									e = !0;
								},
							});
							s.addEventListener("testPassiveListener", null, t);
						} catch (e) {}
						return e;
					})(),
					gestures: "ongesturestart" in s,
				};
			})());
	}
	function j() {
		return (l =
			l ||
			(function () {
				const e = O();
				return { isSafari: 0 <= (t = e.navigator.userAgent.toLowerCase()).indexOf("safari") && t.indexOf("chrome") < 0 && t.indexOf("android") < 0, isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(e.navigator.userAgent) };
				var t;
			})());
	}
	function p(e) {
		var { swiper: e, runCallbacks: t, direction: s, step: i } = e,
			{ activeIndex: a, previousIndex: r } = e;
		let n = s;
		if (((n = n || (r < a ? "next" : a < r ? "prev" : "reset")), e.emit("transition" + i), t && a !== r)) {
			if ("reset" === n) return e.emit("slideResetTransition" + i);
			e.emit("slideChangeTransition" + i), "next" === n ? e.emit("slideNextTransition" + i) : e.emit("slidePrevTransition" + i);
		}
	}
	function h() {
		var e,
			t,
			s = this,
			{ params: i, el: a } = s;
		(a && 0 === a.offsetWidth) || (i.breakpoints && s.setBreakpoint(), ({ allowSlideNext: a, allowSlidePrev: e, snapGrid: t } = s), (s.allowSlideNext = !0), (s.allowSlidePrev = !0), s.updateSize(), s.updateSlides(), s.updateSlidesClasses(), ("auto" === i.slidesPerView || 1 < i.slidesPerView) && s.isEnd && !s.isBeginning && !s.params.centeredSlides ? s.slideTo(s.slides.length - 1, 0, !1, !0) : s.slideTo(s.activeIndex, 0, !1, !0), s.autoplay && s.autoplay.running && s.autoplay.paused && s.autoplay.run(), (s.allowSlidePrev = e), (s.allowSlideNext = a), s.params.watchOverflow && t !== s.snapGrid && s.checkOverflow());
	}
	Object.keys(s).forEach((e) => {
		Object.defineProperty(P.fn, e, { value: s[e], writable: !0 });
	});
	let f = !1;
	function N() {}
	const g = (e, t) => {
			var s = T(),
				{ params: i, touchEvents: a, el: r, wrapperEl: n, device: o, support: l } = e,
				d = !!i.nested,
				c = "on" === t ? "addEventListener" : "removeEventListener";
			if (l.touch) {
				const t = !("touchstart" !== a.start || !l.passiveListener || !i.passiveListeners) && { passive: !0, capture: !1 };
				r[c](a.start, e.onTouchStart, t), r[c](a.move, e.onTouchMove, l.passiveListener ? { passive: !1, capture: d } : d), r[c](a.end, e.onTouchEnd, t), a.cancel && r[c](a.cancel, e.onTouchEnd, t);
			} else r[c](a.start, e.onTouchStart, !1), s[c](a.move, e.onTouchMove, d), s[c](a.end, e.onTouchEnd, !1);
			(i.preventClicks || i.preventClicksPropagation) && r[c]("click", e.onClick, !0), i.cssMode && n[c]("scroll", e.onScroll), i.updateOnWindowResize ? e[t](o.ios || o.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", h, !0) : e[t]("observerUpdate", h, !0);
		},
		w = (e, t) => e.grid && t.grid && 1 < t.grid.rows;
	var y = { init: !0, direction: "horizontal", touchEventsTarget: "wrapper", initialSlide: 0, speed: 300, cssMode: !1, updateOnWindowResize: !0, resizeObserver: !0, nested: !1, createElements: !1, enabled: !0, focusableElements: "input, select, option, textarea, button, video, label", width: null, height: null, preventInteractionOnTransition: !1, userAgent: null, url: null, edgeSwipeDetection: !1, edgeSwipeThreshold: 20, autoHeight: !1, setWrapperSize: !1, virtualTranslate: !1, effect: "slide", breakpoints: void 0, breakpointsBase: "window", spaceBetween: 0, slidesPerView: 1, slidesPerGroup: 1, slidesPerGroupSkip: 0, slidesPerGroupAuto: !1, centeredSlides: !1, centeredSlidesBounds: !1, slidesOffsetBefore: 0, slidesOffsetAfter: 0, normalizeSlideIndex: !0, centerInsufficientSlides: !1, watchOverflow: !0, roundLengths: !1, touchRatio: 1, touchAngle: 45, simulateTouch: !0, shortSwipes: !0, longSwipes: !0, longSwipesRatio: 0.5, longSwipesMs: 300, followFinger: !0, allowTouchMove: !0, threshold: 0, touchMoveStopPropagation: !1, touchStartPreventDefault: !0, touchStartForcePreventDefault: !1, touchReleaseOnEdges: !1, uniqueNavElements: !0, resistance: !0, resistanceRatio: 0.85, watchSlidesProgress: !1, grabCursor: !1, preventClicks: !0, preventClicksPropagation: !0, slideToClickedSlide: !1, preloadImages: !0, updateOnImagesReady: !0, loop: !1, loopAdditionalSlides: 0, loopedSlides: null, loopedSlidesLimit: !0, loopFillGroupWithBlank: !1, loopPreventsSlide: !0, rewind: !1, allowSlidePrev: !0, allowSlideNext: !0, swipeHandler: null, noSwiping: !0, noSwipingClass: "swiper-no-swiping", noSwipingSelector: null, passiveListeners: !0, maxBackfaceHiddenSlides: 10, containerModifierClass: "swiper-", slideClass: "swiper-slide", slideBlankClass: "swiper-slide-invisible-blank", slideActiveClass: "swiper-slide-active", slideDuplicateActiveClass: "swiper-slide-duplicate-active", slideVisibleClass: "swiper-slide-visible", slideDuplicateClass: "swiper-slide-duplicate", slideNextClass: "swiper-slide-next", slideDuplicateNextClass: "swiper-slide-duplicate-next", slidePrevClass: "swiper-slide-prev", slideDuplicatePrevClass: "swiper-slide-duplicate-prev", wrapperClass: "swiper-wrapper", runCallbacksOnInit: !0, _emitClasses: !1 };
	const _ = {
			eventsEmitter: {
				on(e, t, s) {
					const i = this;
					if (i.eventsListeners && !i.destroyed && "function" == typeof t) {
						const a = s ? "unshift" : "push";
						e.split(" ").forEach((e) => {
							i.eventsListeners[e] || (i.eventsListeners[e] = []), i.eventsListeners[e][a](t);
						});
					}
					return i;
				},
				once(i, a, e) {
					const r = this;
					return !r.eventsListeners || r.destroyed || "function" != typeof a ? r : ((n.__emitterProxy = a), r.on(i, n, e));
					function n() {
						r.off(i, n), n.__emitterProxy && delete n.__emitterProxy;
						for (var e = arguments.length, t = new Array(e), s = 0; s < e; s++) t[s] = arguments[s];
						a.apply(r, t);
					}
				},
				onAny(e, t) {
					var s = this;
					return s.eventsListeners && !s.destroyed && "function" == typeof e && ((t = t ? "unshift" : "push"), s.eventsAnyListeners.indexOf(e) < 0) && s.eventsAnyListeners[t](e), s;
				},
				offAny(e) {
					var t = this;
					return t.eventsListeners && !t.destroyed && t.eventsAnyListeners && 0 <= (e = t.eventsAnyListeners.indexOf(e)) && t.eventsAnyListeners.splice(e, 1), t;
				},
				off(e, i) {
					const a = this;
					return (
						!a.eventsListeners ||
							a.destroyed ||
							(a.eventsListeners &&
								e.split(" ").forEach((s) => {
									void 0 === i
										? (a.eventsListeners[s] = [])
										: a.eventsListeners[s] &&
										  a.eventsListeners[s].forEach((e, t) => {
												(e === i || (e.__emitterProxy && e.__emitterProxy === i)) && a.eventsListeners[s].splice(t, 1);
										  });
								})),
						a
					);
				},
				emit() {
					const a = this;
					if (a.eventsListeners && !a.destroyed && a.eventsListeners) {
						let e, s, i;
						for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++) r[n] = arguments[n];
						(i = "string" == typeof r[0] || Array.isArray(r[0]) ? ((e = r[0]), (s = r.slice(1, r.length)), a) : ((e = r[0].events), (s = r[0].data), r[0].context || a)),
							s.unshift(i),
							(Array.isArray(e) ? e : e.split(" ")).forEach((t) => {
								a.eventsAnyListeners &&
									a.eventsAnyListeners.length &&
									a.eventsAnyListeners.forEach((e) => {
										e.apply(i, [t, ...s]);
									}),
									a.eventsListeners &&
										a.eventsListeners[t] &&
										a.eventsListeners[t].forEach((e) => {
											e.apply(i, s);
										});
							});
					}
					return a;
				},
			},
			update: {
				updateSize: function () {
					var e = this;
					let t, s;
					var i = e.$el;
					(t = void 0 !== e.params.width && null !== e.params.width ? e.params.width : i[0].clientWidth), (s = void 0 !== e.params.height && null !== e.params.height ? e.params.height : i[0].clientHeight), (0 === t && e.isHorizontal()) || (0 === s && e.isVertical()) || ((t = t - parseInt(i.css("padding-left") || 0, 10) - parseInt(i.css("padding-right") || 0, 10)), (s = s - parseInt(i.css("padding-top") || 0, 10) - parseInt(i.css("padding-bottom") || 0, 10)), Number.isNaN(t) && (t = 0), Number.isNaN(s) && (s = 0), Object.assign(e, { width: t, height: s, size: e.isHorizontal() ? t : s }));
				},
				updateSlides: function () {
					const s = this;
					function i(e) {
						return s.isHorizontal() ? e : { width: "height", "margin-top": "margin-left", "margin-bottom ": "margin-right", "margin-left": "margin-top", "margin-right": "margin-bottom", "padding-left": "padding-top", "padding-right": "padding-bottom", marginRight: "marginBottom" }[e];
					}
					function a(e, t) {
						return parseFloat(e.getPropertyValue(i(t)) || 0);
					}
					const r = s.params,
						{ $wrapperEl: n, size: o, rtlTranslate: l, wrongRTL: d } = s,
						c = s.virtual && r.virtual.enabled,
						e = (c ? s.virtual : s).slides.length,
						p = n.children("." + s.params.slideClass),
						u = (c ? s.virtual.slides : p).length;
					let h = [];
					const m = [],
						f = [];
					let g = r.slidesOffsetBefore,
						v = ("function" == typeof g && (g = r.slidesOffsetBefore.call(s)), r.slidesOffsetAfter);
					"function" == typeof v && (v = r.slidesOffsetAfter.call(s));
					var b = s.snapGrid.length,
						w = s.slidesGrid.length;
					let y = r.spaceBetween,
						_ = -g,
						E = 0,
						x = 0;
					if (void 0 !== o) {
						"string" == typeof y && 0 <= y.indexOf("%") && (y = (parseFloat(y.replace("%", "")) / 100) * o), (s.virtualSize = -y), l ? p.css({ marginLeft: "", marginBottom: "", marginTop: "" }) : p.css({ marginRight: "", marginBottom: "", marginTop: "" }), r.centeredSlides && r.cssMode && (S(s.wrapperEl, "--swiper-centered-offset-before", ""), S(s.wrapperEl, "--swiper-centered-offset-after", ""));
						var T = r.grid && 1 < r.grid.rows && s.grid;
						let t;
						T && s.grid.initSlides(u);
						var C = "auto" === r.slidesPerView && r.breakpoints && 0 < Object.keys(r.breakpoints).filter((e) => void 0 !== r.breakpoints[e].slidesPerView).length;
						for (let e = 0; e < u; e += 1) {
							t = 0;
							const l = p.eq(e);
							if ((T && s.grid.updateSlide(e, l, u, i), "none" !== l.css("display"))) {
								if ("auto" === r.slidesPerView) {
									C && (p[e].style[i("width")] = "");
									const o = getComputedStyle(l[0]),
										d = l[0].style.transform,
										c = l[0].style.webkitTransform;
									if ((d && (l[0].style.transform = "none"), c && (l[0].style.webkitTransform = "none"), r.roundLengths)) t = s.isHorizontal() ? l.outerWidth(!0) : l.outerHeight(!0);
									else {
										const s = a(o, "width"),
											i = a(o, "padding-left"),
											r = a(o, "padding-right"),
											n = a(o, "margin-left"),
											d = a(o, "margin-right"),
											c = o.getPropertyValue("box-sizing");
										if (c && "border-box" === c) t = s + n + d;
										else {
											const { clientWidth: a, offsetWidth: o } = l[0];
											t = s + i + r + n + d + (o - a);
										}
									}
									d && (l[0].style.transform = d), c && (l[0].style.webkitTransform = c), r.roundLengths && (t = Math.floor(t));
								} else (t = (o - (r.slidesPerView - 1) * y) / r.slidesPerView), r.roundLengths && (t = Math.floor(t)), p[e] && (p[e].style[i("width")] = t + "px");
								p[e] && (p[e].swiperSlideSize = t), f.push(t), r.centeredSlides ? ((_ = _ + t / 2 + E / 2 + y), 0 === E && 0 !== e && (_ = _ - o / 2 - y), 0 === e && (_ = _ - o / 2 - y), Math.abs(_) < 0.001 && (_ = 0), r.roundLengths && (_ = Math.floor(_)), x % r.slidesPerGroup == 0 && h.push(_), m.push(_)) : (r.roundLengths && (_ = Math.floor(_)), (x - Math.min(s.params.slidesPerGroupSkip, x)) % s.params.slidesPerGroup == 0 && h.push(_), m.push(_), (_ = _ + t + y)), (s.virtualSize += t + y), (E = t), (x += 1);
							}
						}
						if (((s.virtualSize = Math.max(s.virtualSize, o) + v), l && d && ("slide" === r.effect || "coverflow" === r.effect) && n.css({ width: s.virtualSize + r.spaceBetween + "px" }), r.setWrapperSize && n.css({ [i("width")]: s.virtualSize + r.spaceBetween + "px" }), T && s.grid.updateWrapperSize(t, h, i), !r.centeredSlides)) {
							const i = [];
							for (let t = 0; t < h.length; t += 1) {
								let e = h[t];
								r.roundLengths && (e = Math.floor(e)), h[t] <= s.virtualSize - o && i.push(e);
							}
							(h = i), 1 < Math.floor(s.virtualSize - o) - Math.floor(h[h.length - 1]) && h.push(s.virtualSize - o);
						}
						if ((0 === h.length && (h = [0]), 0 !== r.spaceBetween)) {
							const a = s.isHorizontal() && l ? "marginLeft" : i("marginRight");
							p.filter((e, t) => !r.cssMode || t !== p.length - 1).css({ [a]: y + "px" });
						}
						if (r.centeredSlides && r.centeredSlidesBounds) {
							let t = 0;
							f.forEach((e) => {
								t += e + (r.spaceBetween || 0);
							});
							const i = (t -= r.spaceBetween) - o;
							h = h.map((e) => (e < 0 ? -g : e > i ? i + v : e));
						}
						if (r.centerInsufficientSlides) {
							let t = 0;
							if (
								(f.forEach((e) => {
									t += e + (r.spaceBetween || 0);
								}),
								(t -= r.spaceBetween) < o)
							) {
								const i = (o - t) / 2;
								h.forEach((e, t) => {
									h[t] = e - i;
								}),
									m.forEach((e, t) => {
										m[t] = e + i;
									});
							}
						}
						if ((Object.assign(s, { slides: p, snapGrid: h, slidesGrid: m, slidesSizesGrid: f }), r.centeredSlides && r.cssMode && !r.centeredSlidesBounds)) {
							S(s.wrapperEl, "--swiper-centered-offset-before", -h[0] + "px"), S(s.wrapperEl, "--swiper-centered-offset-after", s.size / 2 - f[f.length - 1] / 2 + "px");
							const i = -s.snapGrid[0],
								a = -s.slidesGrid[0];
							(s.snapGrid = s.snapGrid.map((e) => e + i)), (s.slidesGrid = s.slidesGrid.map((e) => e + a));
						}
						if ((u !== e && s.emit("slidesLengthChange"), h.length !== b && (s.params.watchOverflow && s.checkOverflow(), s.emit("snapGridLengthChange")), m.length !== w && s.emit("slidesGridLengthChange"), r.watchSlidesProgress && s.updateSlidesOffset(), !(c || r.cssMode || ("slide" !== r.effect && "fade" !== r.effect)))) {
							const i = r.containerModifierClass + "backface-hidden",
								a = s.$el.hasClass(i);
							u <= r.maxBackfaceHiddenSlides ? a || s.$el.addClass(i) : a && s.$el.removeClass(i);
						}
					}
				},
				updateAutoHeight: function (e) {
					const s = this,
						t = [],
						i = s.virtual && s.params.virtual.enabled;
					let a,
						r = 0;
					"number" == typeof e ? s.setTransition(e) : !0 === e && s.setTransition(s.params.speed);
					var n = (t) => (i ? s.slides.filter((e) => parseInt(e.getAttribute("data-swiper-slide-index"), 10) === t) : s.slides.eq(t))[0];
					if ("auto" !== s.params.slidesPerView && 1 < s.params.slidesPerView)
						if (s.params.centeredSlides)
							(s.visibleSlides || P([])).each((e) => {
								t.push(e);
							});
						else
							for (a = 0; a < Math.ceil(s.params.slidesPerView); a += 1) {
								const e = s.activeIndex + a;
								if (e > s.slides.length && !i) break;
								t.push(n(e));
							}
					else t.push(n(s.activeIndex));
					for (a = 0; a < t.length; a += 1)
						if (void 0 !== t[a]) {
							const e = t[a].offsetHeight;
							r = e > r ? e : r;
						}
					(!r && 0 !== r) || s.$wrapperEl.css("height", r + "px");
				},
				updateSlidesOffset: function () {
					var t = this.slides;
					for (let e = 0; e < t.length; e += 1) t[e].swiperSlideOffset = this.isHorizontal() ? t[e].offsetLeft : t[e].offsetTop;
				},
				updateSlidesProgress: function (e) {
					void 0 === e && (e = (this && this.translate) || 0);
					var i = this,
						a = i.params,
						{ slides: r, rtlTranslate: n, snapGrid: o } = i;
					if (0 !== r.length) {
						void 0 === r[0].swiperSlideOffset && i.updateSlidesOffset();
						let s = n ? e : -e;
						r.removeClass(a.slideVisibleClass), (i.visibleSlidesIndexes = []), (i.visibleSlides = []);
						for (let t = 0; t < r.length; t += 1) {
							var l = r[t];
							let e = l.swiperSlideOffset;
							a.cssMode && a.centeredSlides && (e -= r[0].swiperSlideOffset);
							const P = (s + (a.centeredSlides ? i.minTranslate() : 0) - e) / (l.swiperSlideSize + a.spaceBetween),
								d = (s - o[0] + (a.centeredSlides ? i.minTranslate() : 0) - e) / (l.swiperSlideSize + a.spaceBetween),
								c = -(s - e),
								p = c + i.slidesSizesGrid[t];
							((0 <= c && c < i.size - 1) || (1 < p && p <= i.size) || (c <= 0 && p >= i.size)) && (i.visibleSlides.push(l), i.visibleSlidesIndexes.push(t), r.eq(t).addClass(a.slideVisibleClass)), (l.progress = n ? -P : P), (l.originalProgress = n ? -d : d);
						}
						i.visibleSlides = P(i.visibleSlides);
					}
				},
				updateProgress: function (e) {
					var t = this;
					if (void 0 === e) {
						const s = t.rtlTranslate ? -1 : 1;
						e = (t && t.translate && t.translate * s) || 0;
					}
					const s = t.params,
						i = t.maxTranslate() - t.minTranslate();
					let { progress: a, isBeginning: r, isEnd: n } = t;
					var o = r,
						l = n;
					(n = 0 == i ? ((a = 0), (r = !0)) : ((a = (e - t.minTranslate()) / i), (r = a <= 0), 1 <= a)), Object.assign(t, { progress: a, isBeginning: r, isEnd: n }), (s.watchSlidesProgress || (s.centeredSlides && s.autoHeight)) && t.updateSlidesProgress(e), r && !o && t.emit("reachBeginning toEdge"), n && !l && t.emit("reachEnd toEdge"), ((o && !r) || (l && !n)) && t.emit("fromEdge"), t.emit("progress", a);
				},
				updateSlidesClasses: function () {
					var { slides: e, params: t, $wrapperEl: s, activeIndex: i, realIndex: a } = this,
						r = this.virtual && t.virtual.enabled;
					e.removeClass(`${t.slideActiveClass} ${t.slideNextClass} ${t.slidePrevClass} ${t.slideDuplicateActiveClass} ${t.slideDuplicateNextClass} ` + t.slideDuplicatePrevClass), (r = r ? this.$wrapperEl.find(`.${t.slideClass}[data-swiper-slide-index="${i}"]`) : e.eq(i)).addClass(t.slideActiveClass), t.loop && (r.hasClass(t.slideDuplicateClass) ? s.children(`.${t.slideClass}:not(.${t.slideDuplicateClass})[data-swiper-slide-index="${a}"]`) : s.children(`.${t.slideClass}.${t.slideDuplicateClass}[data-swiper-slide-index="${a}"]`)).addClass(t.slideDuplicateActiveClass);
					let n = r
							.nextAll("." + t.slideClass)
							.eq(0)
							.addClass(t.slideNextClass),
						o =
							(t.loop && 0 === n.length && (n = e.eq(0)).addClass(t.slideNextClass),
							r
								.prevAll("." + t.slideClass)
								.eq(0)
								.addClass(t.slidePrevClass));
					t.loop && 0 === o.length && (o = e.eq(-1)).addClass(t.slidePrevClass), t.loop && ((n.hasClass(t.slideDuplicateClass) ? s.children(`.${t.slideClass}:not(.${t.slideDuplicateClass})[data-swiper-slide-index="${n.attr("data-swiper-slide-index")}"]`) : s.children(`.${t.slideClass}.${t.slideDuplicateClass}[data-swiper-slide-index="${n.attr("data-swiper-slide-index")}"]`)).addClass(t.slideDuplicateNextClass), (o.hasClass(t.slideDuplicateClass) ? s.children(`.${t.slideClass}:not(.${t.slideDuplicateClass})[data-swiper-slide-index="${o.attr("data-swiper-slide-index")}"]`) : s.children(`.${t.slideClass}.${t.slideDuplicateClass}[data-swiper-slide-index="${o.attr("data-swiper-slide-index")}"]`)).addClass(t.slideDuplicatePrevClass)), this.emitSlidesClasses();
				},
				updateActiveIndex: function (e) {
					var t = this,
						s = t.rtlTranslate ? t.translate : -t.translate,
						{ slidesGrid: i, snapGrid: a, params: r, activeIndex: n, realIndex: o, snapIndex: l } = t;
					let d,
						c = e;
					if (void 0 === c) {
						for (let e = 0; e < i.length; e += 1) void 0 !== i[e + 1] ? (s >= i[e] && s < i[e + 1] - (i[e + 1] - i[e]) / 2 ? (c = e) : s >= i[e] && s < i[e + 1] && (c = e + 1)) : s >= i[e] && (c = e);
						r.normalizeSlideIndex && (c < 0 || void 0 === c) && (c = 0);
					}
					if (0 <= a.indexOf(s)) d = a.indexOf(s);
					else {
						const e = Math.min(r.slidesPerGroupSkip, c);
						d = e + Math.floor((c - e) / r.slidesPerGroup);
					}
					d >= a.length && (d = a.length - 1), c === n ? d !== l && ((t.snapIndex = d), t.emit("snapIndexChange")) : ((e = parseInt(t.slides.eq(c).attr("data-swiper-slide-index") || c, 10)), Object.assign(t, { snapIndex: d, realIndex: e, previousIndex: n, activeIndex: c }), t.emit("activeIndexChange"), t.emit("snapIndexChange"), o !== e && t.emit("realIndexChange"), (t.initialized || t.params.runCallbacksOnInit) && t.emit("slideChange"));
				},
				updateClickedSlide: function (e) {
					var t = this,
						s = t.params,
						i = P(e).closest("." + s.slideClass)[0];
					let a,
						r = !1;
					if (i)
						for (let e = 0; e < t.slides.length; e += 1)
							if (t.slides[e] === i) {
								(r = !0), (a = e);
								break;
							}
					i && r ? ((t.clickedSlide = i), t.virtual && t.params.virtual.enabled ? (t.clickedIndex = parseInt(P(i).attr("data-swiper-slide-index"), 10)) : (t.clickedIndex = a), s.slideToClickedSlide && void 0 !== t.clickedIndex && t.clickedIndex !== t.activeIndex && t.slideToClickedSlide()) : ((t.clickedSlide = void 0), (t.clickedIndex = void 0));
				},
			},
			translate: {
				getTranslate: function (e) {
					void 0 === e && (e = this.isHorizontal() ? "x" : "y");
					var { params: t, rtlTranslate: s, translate: i, $wrapperEl: a } = this;
					if (t.virtualTranslate) return s ? -i : i;
					if (t.cssMode) return i;
					let r = L(a[0], e);
					return (r = s ? -r : r) || 0;
				},
				setTranslate: function (e, t) {
					var s = this,
						{ rtlTranslate: i, params: a, $wrapperEl: r, wrapperEl: n, progress: o } = s;
					let l = 0,
						d = 0;
					s.isHorizontal() ? (l = i ? -e : e) : (d = e), a.roundLengths && ((l = Math.floor(l)), (d = Math.floor(d))), a.cssMode ? (n[s.isHorizontal() ? "scrollLeft" : "scrollTop"] = s.isHorizontal() ? -l : -d) : a.virtualTranslate || r.transform(`translate3d(${l}px, ${d}px, 0px)`), (s.previousTranslate = s.translate), (s.translate = s.isHorizontal() ? l : d);
					i = s.maxTranslate() - s.minTranslate();
					(0 == i ? 0 : (e - s.minTranslate()) / i) !== o && s.updateProgress(e), s.emit("setTranslate", s.translate, t);
				},
				minTranslate: function () {
					return -this.snapGrid[0];
				},
				maxTranslate: function () {
					return -this.snapGrid[this.snapGrid.length - 1];
				},
				translateTo: function (e, t, s, i, a) {
					void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === s && (s = !0), void 0 === i && (i = !0);
					const r = this,
						{ params: n, wrapperEl: o } = r;
					if (r.animating && n.preventInteractionOnTransition) return !1;
					var l = r.minTranslate(),
						d = r.maxTranslate(),
						l = i && l < e ? l : i && e < d ? d : e;
					if ((r.updateProgress(l), n.cssMode)) {
						const e = r.isHorizontal();
						if (0 === t) o[e ? "scrollLeft" : "scrollTop"] = -l;
						else {
							if (!r.support.smoothScroll) return b({ swiper: r, targetPosition: -l, side: e ? "left" : "top" }), !0;
							o.scrollTo({ [e ? "left" : "top"]: -l, behavior: "smooth" });
						}
					} else
						0 === t
							? (r.setTransition(0), r.setTranslate(l), s && (r.emit("beforeTransitionStart", t, a), r.emit("transitionEnd")))
							: (r.setTransition(t),
							  r.setTranslate(l),
							  s && (r.emit("beforeTransitionStart", t, a), r.emit("transitionStart")),
							  r.animating ||
									((r.animating = !0),
									r.onTranslateToWrapperTransitionEnd ||
										(r.onTranslateToWrapperTransitionEnd = function (e) {
											r && !r.destroyed && e.target === this && (r.$wrapperEl[0].removeEventListener("transitionend", r.onTranslateToWrapperTransitionEnd), r.$wrapperEl[0].removeEventListener("webkitTransitionEnd", r.onTranslateToWrapperTransitionEnd), (r.onTranslateToWrapperTransitionEnd = null), delete r.onTranslateToWrapperTransitionEnd, s) && r.emit("transitionEnd");
										}),
									r.$wrapperEl[0].addEventListener("transitionend", r.onTranslateToWrapperTransitionEnd),
									r.$wrapperEl[0].addEventListener("webkitTransitionEnd", r.onTranslateToWrapperTransitionEnd)));
					return !0;
				},
			},
			transition: {
				setTransition: function (e, t) {
					this.params.cssMode || this.$wrapperEl.transition(e), this.emit("setTransition", e, t);
				},
				transitionStart: function (e, t) {
					void 0 === e && (e = !0);
					var s = this["params"];
					s.cssMode || (s.autoHeight && this.updateAutoHeight(), p({ swiper: this, runCallbacks: e, direction: t, step: "Start" }));
				},
				transitionEnd: function (e, t) {
					void 0 === e && (e = !0);
					var s = this["params"];
					(this.animating = !1), s.cssMode || (this.setTransition(0), p({ swiper: this, runCallbacks: e, direction: t, step: "End" }));
				},
			},
			slide: {
				slideTo: function (e, t, s, i, a) {
					if ((void 0 === t && (t = this.params.speed), void 0 === s && (s = !0), "number" != typeof (e = void 0 === e ? 0 : e) && "string" != typeof e)) throw new Error(`The 'index' argument cannot have type other than 'number' or 'string'. [${typeof e}] given.`);
					if ("string" == typeof e) {
						const t = parseInt(e, 10);
						if (!isFinite(t)) throw new Error(`The passed-in 'index' (string) couldn't be converted to 'number'. [${e}] given.`);
						e = t;
					}
					const r = this;
					let n = e;
					n < 0 && (n = 0);
					var { params: e, snapGrid: o, slidesGrid: l, previousIndex: d, activeIndex: c, rtlTranslate: p, wrapperEl: u, enabled: h } = r;
					if ((r.animating && e.preventInteractionOnTransition) || (!h && !i && !a)) return !1;
					h = Math.min(r.params.slidesPerGroupSkip, n);
					let m = h + Math.floor((n - h) / r.params.slidesPerGroup);
					m >= o.length && (m = o.length - 1), (c || e.initialSlide || 0) === (d || 0) && s && r.emit("beforeSlideChangeStart");
					var f = -o[m];
					if ((r.updateProgress(f), e.normalizeSlideIndex))
						for (let e = 0; e < l.length; e += 1) {
							const t = -Math.floor(100 * f),
								s = Math.floor(100 * l[e]),
								i = Math.floor(100 * l[e + 1]);
							void 0 !== l[e + 1] ? (t >= s && t < i - (i - s) / 2 ? (n = e) : t >= s && t < i && (n = e + 1)) : t >= s && (n = e);
						}
					if (r.initialized && n !== c) {
						if (!r.allowSlideNext && f < r.translate && f < r.minTranslate()) return !1;
						if (!r.allowSlidePrev && f > r.translate && f > r.maxTranslate() && (c || 0) !== n) return !1;
					}
					let g;
					if (((g = n > c ? "next" : n < c ? "prev" : "reset"), (p && -f === r.translate) || (!p && f === r.translate))) return r.updateActiveIndex(n), e.autoHeight && r.updateAutoHeight(), r.updateSlidesClasses(), "slide" !== e.effect && r.setTranslate(f), "reset" != g && (r.transitionStart(s, g), r.transitionEnd(s, g)), !1;
					if (e.cssMode) {
						const e = r.isHorizontal(),
							s = p ? f : -f;
						if (0 === t) {
							const t = r.virtual && r.params.virtual.enabled;
							t && ((r.wrapperEl.style.scrollSnapType = "none"), (r._immediateVirtual = !0)),
								(u[e ? "scrollLeft" : "scrollTop"] = s),
								t &&
									requestAnimationFrame(() => {
										(r.wrapperEl.style.scrollSnapType = ""), (r._swiperImmediateVirtual = !1);
									});
						} else {
							if (!r.support.smoothScroll) return b({ swiper: r, targetPosition: s, side: e ? "left" : "top" }), !0;
							u.scrollTo({ [e ? "left" : "top"]: s, behavior: "smooth" });
						}
					} else
						r.setTransition(t),
							r.setTranslate(f),
							r.updateActiveIndex(n),
							r.updateSlidesClasses(),
							r.emit("beforeTransitionStart", t, i),
							r.transitionStart(s, g),
							0 === t
								? r.transitionEnd(s, g)
								: r.animating ||
								  ((r.animating = !0),
								  r.onSlideToWrapperTransitionEnd ||
										(r.onSlideToWrapperTransitionEnd = function (e) {
											r && !r.destroyed && e.target === this && (r.$wrapperEl[0].removeEventListener("transitionend", r.onSlideToWrapperTransitionEnd), r.$wrapperEl[0].removeEventListener("webkitTransitionEnd", r.onSlideToWrapperTransitionEnd), (r.onSlideToWrapperTransitionEnd = null), delete r.onSlideToWrapperTransitionEnd, r.transitionEnd(s, g));
										}),
								  r.$wrapperEl[0].addEventListener("transitionend", r.onSlideToWrapperTransitionEnd),
								  r.$wrapperEl[0].addEventListener("webkitTransitionEnd", r.onSlideToWrapperTransitionEnd));
					return !0;
				},
				slideToLoop: function (e, t, s, i) {
					if ((void 0 === t && (t = this.params.speed), void 0 === s && (s = !0), "string" == typeof (e = void 0 === e ? 0 : e))) {
						const t = parseInt(e, 10);
						if (!isFinite(t)) throw new Error(`The passed-in 'index' (string) couldn't be converted to 'number'. [${e}] given.`);
						e = t;
					}
					let a = e;
					return this.params.loop && (a += this.loopedSlides), this.slideTo(a, t, s, i);
				},
				slideNext: function (e, t, s) {
					void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
					var i = this,
						{ animating: a, enabled: r, params: n } = i;
					if (!r) return i;
					let o = n.slidesPerGroup;
					"auto" === n.slidesPerView && 1 === n.slidesPerGroup && n.slidesPerGroupAuto && (o = Math.max(i.slidesPerViewDynamic("current", !0), 1));
					r = i.activeIndex < n.slidesPerGroupSkip ? 1 : o;
					if (n.loop) {
						if (a && n.loopPreventsSlide) return !1;
						i.loopFix(), (i._clientLeft = i.$wrapperEl[0].clientLeft);
					}
					return n.rewind && i.isEnd ? i.slideTo(0, e, t, s) : i.slideTo(i.activeIndex + r, e, t, s);
				},
				slidePrev: function (e, t, s) {
					void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
					const i = this,
						{ params: a, animating: r, snapGrid: n, slidesGrid: o, rtlTranslate: l, enabled: d } = i;
					if (!d) return i;
					if (a.loop) {
						if (r && a.loopPreventsSlide) return !1;
						i.loopFix(), (i._clientLeft = i.$wrapperEl[0].clientLeft);
					}
					function c(e) {
						return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e);
					}
					const p = c(l ? i.translate : -i.translate),
						u = n.map((e) => c(e));
					let h = n[u.indexOf(p) - 1];
					if (void 0 === h && a.cssMode) {
						let s;
						n.forEach((e, t) => {
							p >= e && (s = t);
						}),
							void 0 !== s && (h = n[0 < s ? s - 1 : s]);
					}
					let m = 0;
					if ((void 0 !== h && ((m = o.indexOf(h)) < 0 && (m = i.activeIndex - 1), "auto" === a.slidesPerView) && 1 === a.slidesPerGroup && a.slidesPerGroupAuto && ((m = m - i.slidesPerViewDynamic("previous", !0) + 1), (m = Math.max(m, 0))), a.rewind && i.isBeginning)) {
						const a = i.params.virtual && i.params.virtual.enabled && i.virtual ? i.virtual.slides.length - 1 : i.slides.length - 1;
						return i.slideTo(a, e, t, s);
					}
					return i.slideTo(m, e, t, s);
				},
				slideReset: function (e, t, s) {
					return void 0 === e && (e = this.params.speed), this.slideTo(this.activeIndex, e, (t = void 0 === t ? !0 : t), s);
				},
				slideToClosest: function (e, t, s, i) {
					void 0 === e && (e = this.params.speed), void 0 === t && (t = !0), void 0 === i && (i = 0.5);
					var a = this;
					let r = a.activeIndex;
					var n = Math.min(a.params.slidesPerGroupSkip, r),
						n = n + Math.floor((r - n) / a.params.slidesPerGroup),
						o = a.rtlTranslate ? a.translate : -a.translate;
					if (o >= a.snapGrid[n]) {
						const e = a.snapGrid[n];
						o - e > (a.snapGrid[n + 1] - e) * i && (r += a.params.slidesPerGroup);
					} else {
						const e = a.snapGrid[n - 1];
						o - e <= (a.snapGrid[n] - e) * i && (r -= a.params.slidesPerGroup);
					}
					return (r = Math.max(r, 0)), (r = Math.min(r, a.slidesGrid.length - 1)), a.slideTo(r, e, t, s);
				},
				slideToClickedSlide: function () {
					const e = this,
						{ params: t, $wrapperEl: s } = e,
						i = "auto" === t.slidesPerView ? e.slidesPerViewDynamic() : t.slidesPerView;
					let a,
						r = e.clickedIndex;
					t.loop
						? e.animating ||
						  ((a = parseInt(P(e.clickedSlide).attr("data-swiper-slide-index"), 10)),
						  t.centeredSlides
								? r < e.loopedSlides - i / 2 || r > e.slides.length - e.loopedSlides + i / 2
									? (e.loopFix(),
									  (r = s.children(`.${t.slideClass}[data-swiper-slide-index="${a}"]:not(.${t.slideDuplicateClass})`).eq(0).index()),
									  C(() => {
											e.slideTo(r);
									  }))
									: e.slideTo(r)
								: r > e.slides.length - i
								? (e.loopFix(),
								  (r = s.children(`.${t.slideClass}[data-swiper-slide-index="${a}"]:not(.${t.slideDuplicateClass})`).eq(0).index()),
								  C(() => {
										e.slideTo(r);
								  }))
								: e.slideTo(r))
						: e.slideTo(r);
				},
			},
			loop: {
				loopCreate: function () {
					const t = this,
						s = T(),
						{ params: i, $wrapperEl: e } = t,
						a = 0 < e.children().length ? P(e.children()[0].parentNode) : e;
					a.children(`.${i.slideClass}.` + i.slideDuplicateClass).remove();
					let r = a.children("." + i.slideClass);
					if (i.loopFillGroupWithBlank) {
						const t = i.slidesPerGroup - (r.length % i.slidesPerGroup);
						if (t !== i.slidesPerGroup) {
							for (let e = 0; e < t; e += 1) {
								const t = P(s.createElement("div")).addClass(i.slideClass + " " + i.slideBlankClass);
								a.append(t);
							}
							r = a.children("." + i.slideClass);
						}
					}
					"auto" !== i.slidesPerView || i.loopedSlides || (i.loopedSlides = r.length), (t.loopedSlides = Math.ceil(parseFloat(i.loopedSlides || i.slidesPerView, 10))), (t.loopedSlides += i.loopAdditionalSlides), t.loopedSlides > r.length && t.params.loopedSlidesLimit && (t.loopedSlides = r.length);
					var n = [],
						o = [];
					r.each((e, t) => {
						P(e).attr("data-swiper-slide-index", t);
					});
					for (let e = 0; e < t.loopedSlides; e += 1) {
						const t = e - Math.floor(e / r.length) * r.length;
						o.push(r.eq(t)[0]), n.unshift(r.eq(r.length - t - 1)[0]);
					}
					for (let e = 0; e < o.length; e += 1) a.append(P(o[e].cloneNode(!0)).addClass(i.slideDuplicateClass));
					for (let e = n.length - 1; 0 <= e; --e) a.prepend(P(n[e].cloneNode(!0)).addClass(i.slideDuplicateClass));
				},
				loopFix: function () {
					var e = this,
						{ activeIndex: t, slides: s, loopedSlides: i, allowSlidePrev: a, allowSlideNext: r, snapGrid: n, rtlTranslate: o } = (e.emit("beforeLoopFix"), e);
					let l;
					(e.allowSlidePrev = !0), (e.allowSlideNext = !0);
					n = -n[t] - e.getTranslate();
					t < i ? ((l = s.length - 3 * i + t), (l += i), e.slideTo(l, 0, !1, !0) && 0 != n && e.setTranslate((o ? -e.translate : e.translate) - n)) : t >= s.length - i && ((l = -s.length + t + i), (l += i), e.slideTo(l, 0, !1, !0)) && 0 != n && e.setTranslate((o ? -e.translate : e.translate) - n), (e.allowSlidePrev = a), (e.allowSlideNext = r), e.emit("loopFix");
				},
				loopDestroy: function () {
					var { $wrapperEl: e, params: t, slides: s } = this;
					e.children(`.${t.slideClass}.${t.slideDuplicateClass},.${t.slideClass}.` + t.slideBlankClass).remove(), s.removeAttr("data-swiper-slide-index");
				},
			},
			grabCursor: {
				setGrabCursor: function (e) {
					var t = this;
					t.support.touch || !t.params.simulateTouch || (t.params.watchOverflow && t.isLocked) || t.params.cssMode || (((t = "container" === t.params.touchEventsTarget ? t.el : t.wrapperEl).style.cursor = "move"), (t.style.cursor = e ? "grabbing" : "grab"));
				},
				unsetGrabCursor: function () {
					var e = this;
					e.support.touch || (e.params.watchOverflow && e.isLocked) || e.params.cssMode || (e["container" === e.params.touchEventsTarget ? "el" : "wrapperEl"].style.cursor = "");
				},
			},
			events: {
				attachEvents: function () {
					var e = this,
						t = T(),
						{ params: s, support: i } = e;
					(e.onTouchStart = function (e) {
						var i = this,
							a = T(),
							r = O(),
							n = i.touchEventsData,
							{ params: o, touches: l, enabled: d } = i;
						if (d && (!i.animating || !o.preventInteractionOnTransition)) {
							!i.animating && o.cssMode && o.loop && i.loopFix();
							let t = e,
								s = P((t = t.originalEvent ? t.originalEvent : t).target);
							if (("wrapper" !== o.touchEventsTarget || s.closest(i.wrapperEl).length) && ((n.isTouchEvent = "touchstart" === t.type), n.isTouchEvent || !("which" in t) || 3 !== t.which) && !((!n.isTouchEvent && "button" in t && 0 < t.button) || (n.isTouched && n.isMoved))) {
								o.noSwipingClass && "" !== o.noSwipingClass && t.target && t.target.shadowRoot && e.path && e.path[0] && (s = P(e.path[0]));
								var d = o.noSwipingSelector || "." + o.noSwipingClass,
									c = !(!t.target || !t.target.shadowRoot);
								if (
									o.noSwiping &&
									(c
										? (function (i, e) {
												return (function e(t) {
													var s;
													return t && t !== T() && t !== O() && ((s = (t = t.assignedSlot ? t.assignedSlot : t).closest(i)) || t.getRootNode) ? s || e(t.getRootNode().host) : null;
												})((e = void 0 === e ? this : e));
										  })(d, s[0])
										: s.closest(d)[0])
								)
									i.allowClick = !0;
								else if (!o.swipeHandler || s.closest(o.swipeHandler)[0]) {
									(l.currentX = ("touchstart" === t.type ? t.targetTouches[0] : t).pageX), (l.currentY = ("touchstart" === t.type ? t.targetTouches[0] : t).pageY);
									var c = l.currentX,
										d = l.currentY,
										p = o.edgeSwipeDetection || o.iOSEdgeSwipeDetection,
										u = o.edgeSwipeThreshold || o.iOSEdgeSwipeThreshold;
									if (p && (c <= u || c >= r.innerWidth - u)) {
										if ("prevent" !== p) return;
										e.preventDefault();
									}
									if ((Object.assign(n, { isTouched: !0, isMoved: !1, allowTouchCallbacks: !0, isScrolling: void 0, startMoving: void 0 }), (l.startX = c), (l.startY = d), (n.touchStartTime = v()), (i.allowClick = !0), i.updateSize(), (i.swipeDirection = void 0), 0 < o.threshold && (n.allowThresholdMove = !1), "touchstart" !== t.type)) {
										let e = !0;
										s.is(n.focusableElements) && ((e = !1), "SELECT" === s[0].nodeName) && (n.isTouched = !1), a.activeElement && P(a.activeElement).is(n.focusableElements) && a.activeElement !== s[0] && a.activeElement.blur();
										const T = e && i.allowTouchMove && o.touchStartPreventDefault;
										(!o.touchStartForcePreventDefault && !T) || s[0].isContentEditable || t.preventDefault();
									}
									i.params.freeMode && i.params.freeMode.enabled && i.freeMode && i.animating && !o.cssMode && i.freeMode.onTouchStart(), i.emit("touchStart", t);
								}
							}
						}
					}.bind(e)),
						(e.onTouchMove = function (e) {
							var a = T(),
								r = this,
								n = r.touchEventsData,
								{ params: o, touches: l, rtlTranslate: d, enabled: t } = r;
							if (t) {
								let i = e;
								if ((i.originalEvent && (i = i.originalEvent), n.isTouched)) {
									if (!n.isTouchEvent || "touchmove" === i.type) {
										(t = "touchmove" === i.type && i.targetTouches && (i.targetTouches[0] || i.changedTouches[0])), (e = ("touchmove" === i.type ? t : i).pageX), (t = ("touchmove" === i.type ? t : i).pageY);
										if (i.preventedByNestedSwiper) (l.startX = e), (l.startY = t);
										else if (r.allowTouchMove) {
											if (n.isTouchEvent && o.touchReleaseOnEdges && !o.loop)
												if (r.isVertical()) {
													if ((t < l.startY && r.translate <= r.maxTranslate()) || (t > l.startY && r.translate >= r.minTranslate())) return (n.isTouched = !1), void (n.isMoved = !1);
												} else if ((e < l.startX && r.translate <= r.maxTranslate()) || (e > l.startX && r.translate >= r.minTranslate())) return;
											if (n.isTouchEvent && a.activeElement && i.target === a.activeElement && P(i.target).is(n.focusableElements)) (n.isMoved = !0), (r.allowClick = !1);
											else if ((n.allowTouchCallbacks && r.emit("touchMove", i), !(i.targetTouches && 1 < i.targetTouches.length))) {
												(l.currentX = e), (l.currentY = t);
												var s,
													a = l.currentX - l.startX,
													c = l.currentY - l.startY;
												if (!(r.params.threshold && Math.sqrt(a ** 2 + c ** 2) < r.params.threshold))
													if ((void 0 === n.isScrolling && ((r.isHorizontal() && l.currentY === l.startY) || (r.isVertical() && l.currentX === l.startX) ? (n.isScrolling = !1) : 25 <= a * a + c * c && ((s = (180 * Math.atan2(Math.abs(c), Math.abs(a))) / Math.PI), (n.isScrolling = r.isHorizontal() ? s > o.touchAngle : 90 - s > o.touchAngle))), n.isScrolling && r.emit("touchMoveOpposite", i), void 0 !== n.startMoving || (l.currentX === l.startX && l.currentY === l.startY) || (n.startMoving = !0), n.isScrolling)) n.isTouched = !1;
													else if (n.startMoving) {
														(r.allowClick = !1), !o.cssMode && i.cancelable && i.preventDefault(), o.touchMoveStopPropagation && !o.nested && i.stopPropagation(), n.isMoved || (o.loop && !o.cssMode && r.loopFix(), (n.startTranslate = r.getTranslate()), r.setTransition(0), r.animating && r.$wrapperEl.trigger("webkitTransitionEnd transitionend"), (n.allowMomentumBounce = !1), !o.grabCursor || (!0 !== r.allowSlideNext && !0 !== r.allowSlidePrev) || r.setGrabCursor(!0), r.emit("sliderFirstMove", i)), r.emit("sliderMove", i), (n.isMoved = !0);
														let e = r.isHorizontal() ? a : c,
															t = ((l.diff = e), (e *= o.touchRatio), d && (e = -e), (r.swipeDirection = 0 < e ? "prev" : "next"), (n.currentTranslate = e + n.startTranslate), !0),
															s = o.resistanceRatio;
														if ((o.touchReleaseOnEdges && (s = 0), 0 < e && n.currentTranslate > r.minTranslate() ? ((t = !1), o.resistance && (n.currentTranslate = r.minTranslate() - 1 + (-r.minTranslate() + n.startTranslate + e) ** s)) : e < 0 && n.currentTranslate < r.maxTranslate() && ((t = !1), o.resistance) && (n.currentTranslate = r.maxTranslate() + 1 - (r.maxTranslate() - n.startTranslate - e) ** s), t && (i.preventedByNestedSwiper = !0), !r.allowSlideNext && "next" === r.swipeDirection && n.currentTranslate < n.startTranslate && (n.currentTranslate = n.startTranslate), !r.allowSlidePrev && "prev" === r.swipeDirection && n.currentTranslate > n.startTranslate && (n.currentTranslate = n.startTranslate), r.allowSlidePrev || r.allowSlideNext || (n.currentTranslate = n.startTranslate), 0 < o.threshold)) {
															if (!(Math.abs(e) > o.threshold || n.allowThresholdMove)) return void (n.currentTranslate = n.startTranslate);
															if (!n.allowThresholdMove) return (n.allowThresholdMove = !0), (l.startX = l.currentX), (l.startY = l.currentY), (n.currentTranslate = n.startTranslate), void (l.diff = r.isHorizontal() ? l.currentX - l.startX : l.currentY - l.startY);
														}
														o.followFinger && !o.cssMode && (((o.freeMode && o.freeMode.enabled && r.freeMode) || o.watchSlidesProgress) && (r.updateActiveIndex(), r.updateSlidesClasses()), r.params.freeMode && o.freeMode.enabled && r.freeMode && r.freeMode.onTouchMove(), r.updateProgress(n.currentTranslate), r.setTranslate(n.currentTranslate));
													}
											}
										} else P(i.target).is(n.focusableElements) || (r.allowClick = !1), n.isTouched && (Object.assign(l, { startX: e, startY: t, currentX: e, currentY: t }), (n.touchStartTime = v()));
									}
								} else n.startMoving && n.isScrolling && r.emit("touchMoveOpposite", i);
							}
						}.bind(e)),
						(e.onTouchEnd = function (r) {
							const n = this,
								e = n.touchEventsData,
								{ params: o, touches: t, rtlTranslate: s, slidesGrid: l, enabled: i } = n;
							if (i) {
								let a = r;
								if ((a.originalEvent && (a = a.originalEvent), e.allowTouchCallbacks && n.emit("touchEnd", a), (e.allowTouchCallbacks = !1), e.isTouched)) {
									o.grabCursor && e.isMoved && e.isTouched && (!0 === n.allowSlideNext || !0 === n.allowSlidePrev) && n.setGrabCursor(!1);
									var d,
										c = v(),
										p = c - e.touchStartTime;
									if (n.allowClick) {
										const r = a.path || (a.composedPath && a.composedPath());
										n.updateClickedSlide((r && r[0]) || a.target), n.emit("tap click", a), p < 300 && c - e.lastClickTime < 300 && n.emit("doubleTap doubleClick", a);
									}
									if (
										((e.lastClickTime = v()),
										C(() => {
											n.destroyed || (n.allowClick = !0);
										}),
										e.isTouched && e.isMoved && n.swipeDirection && 0 !== t.diff && e.currentTranslate !== e.startTranslate)
									) {
										if (((e.isTouched = !1), (e.isMoved = !1), (e.startMoving = !1), (d = o.followFinger ? (s ? n.translate : -n.translate) : -e.currentTranslate), !o.cssMode))
											if (n.params.freeMode && o.freeMode.enabled) n.freeMode.onTouchEnd({ currentPos: d });
											else {
												let t = 0,
													s = n.slidesSizesGrid[0];
												for (let e = 0; e < l.length; e += e < o.slidesPerGroupSkip ? 1 : o.slidesPerGroup) {
													const n = e < o.slidesPerGroupSkip - 1 ? 1 : o.slidesPerGroup;
													void 0 !== l[e + n] ? d >= l[e] && d < l[e + n] && ((t = e), (s = l[e + n] - l[e])) : d >= l[e] && ((t = e), (s = l[l.length - 1] - l[l.length - 2]));
												}
												let e = null,
													i = null;
												o.rewind && (n.isBeginning ? (i = n.params.virtual && n.params.virtual.enabled && n.virtual ? n.virtual.slides.length - 1 : n.slides.length - 1) : n.isEnd && (e = 0));
												(r = (d - l[t]) / s), (c = t < o.slidesPerGroupSkip - 1 ? 1 : o.slidesPerGroup);
												p > o.longSwipesMs ? (o.longSwipes ? ("next" === n.swipeDirection && (r >= o.longSwipesRatio ? n.slideTo(o.rewind && n.isEnd ? e : t + c) : n.slideTo(t)), "prev" === n.swipeDirection && (r > 1 - o.longSwipesRatio ? n.slideTo(t + c) : null !== i && r < 0 && Math.abs(r) > o.longSwipesRatio ? n.slideTo(i) : n.slideTo(t))) : n.slideTo(n.activeIndex)) : o.shortSwipes ? (!n.navigation || (a.target !== n.navigation.nextEl && a.target !== n.navigation.prevEl) ? ("next" === n.swipeDirection && n.slideTo(null !== e ? e : t + c), "prev" === n.swipeDirection && n.slideTo(null !== i ? i : t)) : a.target === n.navigation.nextEl ? n.slideTo(t + c) : n.slideTo(t)) : n.slideTo(n.activeIndex);
											}
									} else (e.isTouched = !1), (e.isMoved = !1), (e.startMoving = !1);
								} else e.isMoved && o.grabCursor && n.setGrabCursor(!1), (e.isMoved = !1), (e.startMoving = !1);
							}
						}.bind(e)),
						s.cssMode &&
							(e.onScroll = function () {
								var e = this,
									{ wrapperEl: t, rtlTranslate: s, enabled: i } = e;
								i && ((e.previousTranslate = e.translate), e.isHorizontal() ? (e.translate = -t.scrollLeft) : (e.translate = -t.scrollTop), 0 === e.translate && (e.translate = 0), e.updateActiveIndex(), e.updateSlidesClasses(), (0 == (i = e.maxTranslate() - e.minTranslate()) ? 0 : (e.translate - e.minTranslate()) / i) !== e.progress && e.updateProgress(s ? -e.translate : e.translate), e.emit("setTranslate", e.translate, !1));
							}.bind(e)),
						(e.onClick = function (e) {
							var t = this;
							t.enabled && !t.allowClick && (t.params.preventClicks && e.preventDefault(), t.params.preventClicksPropagation) && t.animating && (e.stopPropagation(), e.stopImmediatePropagation());
						}.bind(e)),
						i.touch && !f && (t.addEventListener("touchstart", N), (f = !0)),
						g(e, "on");
				},
				detachEvents: function () {
					g(this, "off");
				},
			},
			breakpoints: {
				setBreakpoint: function () {
					const i = this,
						{ activeIndex: e, initialized: t, loopedSlides: s = 0, params: a, $el: r } = i,
						n = a.breakpoints;
					if (n && 0 !== Object.keys(n).length) {
						var o = i.getBreakpoint(n, i.params.breakpointsBase, i.el);
						if (o && i.currentBreakpoint !== o) {
							const c = (o in n ? n[o] : void 0) || i.originalParams,
								p = w(i, a),
								u = w(i, c),
								h = a.enabled;
							p && !u ? (r.removeClass(`${a.containerModifierClass}grid ${a.containerModifierClass}grid-column`), i.emitContainerClasses()) : !p && u && (r.addClass(a.containerModifierClass + "grid"), ((c.grid.fill && "column" === c.grid.fill) || (!c.grid.fill && "column" === a.grid.fill)) && r.addClass(a.containerModifierClass + "grid-column"), i.emitContainerClasses()),
								["navigation", "pagination", "scrollbar"].forEach((e) => {
									var t = a[e] && a[e].enabled,
										s = c[e] && c[e].enabled;
									t && !s && i[e].disable(), !t && s && i[e].enable();
								});
							var l = c.direction && c.direction !== a.direction,
								d = a.loop && (c.slidesPerView !== a.slidesPerView || l),
								l = (l && t && i.changeDirection(), m(i.params, c), i.params.enabled);
							Object.assign(i, { allowTouchMove: i.params.allowTouchMove, allowSlideNext: i.params.allowSlideNext, allowSlidePrev: i.params.allowSlidePrev }), h && !l ? i.disable() : !h && l && i.enable(), (i.currentBreakpoint = o), i.emit("_beforeBreakpoint", c), d && t && (i.loopDestroy(), i.loopCreate(), i.updateSlides(), i.slideTo(e - s + i.loopedSlides, 0, !1)), i.emit("breakpoint", c);
						}
					}
				},
				getBreakpoint: function (e, s, i) {
					if ((void 0 === s && (s = "window"), e && ("container" !== s || i))) {
						let t = !1;
						const a = O(),
							r = "window" === s ? a.innerHeight : i.clientHeight,
							n = Object.keys(e).map((e) => {
								var t;
								return "string" == typeof e && 0 === e.indexOf("@") ? ((t = parseFloat(e.substr(1))), { value: r * t, point: e }) : { value: e, point: e };
							});
						n.sort((e, t) => parseInt(e.value, 10) - parseInt(t.value, 10));
						for (let e = 0; e < n.length; e += 1) {
							const { point: O, value: r } = n[e];
							"window" === s ? a.matchMedia(`(min-width: ${r}px)`).matches && (t = O) : r <= i.clientWidth && (t = O);
						}
						return t || "max";
					}
				},
			},
			checkOverflow: {
				checkOverflow: function () {
					const e = this,
						{ isLocked: t, params: s } = e,
						i = s["slidesOffsetBefore"];
					if (i) {
						const t = e.slides.length - 1,
							s = e.slidesGrid[t] + e.slidesSizesGrid[t] + 2 * i;
						e.isLocked = e.size > s;
					} else e.isLocked = 1 === e.snapGrid.length;
					!0 === s.allowSlideNext && (e.allowSlideNext = !e.isLocked), !0 === s.allowSlidePrev && (e.allowSlidePrev = !e.isLocked), t && t !== e.isLocked && (e.isEnd = !1), t !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock");
				},
			},
			classes: {
				addClasses: function () {
					var { classNames: e, params: t, rtl: s, $el: i, device: a, support: r } = this,
						r = (function (e, s) {
							const i = [];
							return (
								e.forEach((t) => {
									"object" == typeof t
										? Object.keys(t).forEach((e) => {
												t[e] && i.push(s + e);
										  })
										: "string" == typeof t && i.push(s + t);
								}),
								i
							);
						})(["initialized", t.direction, { "pointer-events": !r.touch }, { "free-mode": this.params.freeMode && t.freeMode.enabled }, { autoheight: t.autoHeight }, { rtl: s }, { grid: t.grid && 1 < t.grid.rows }, { "grid-column": t.grid && 1 < t.grid.rows && "column" === t.grid.fill }, { android: a.android }, { ios: a.ios }, { "css-mode": t.cssMode }, { centered: t.cssMode && t.centeredSlides }, { "watch-progress": t.watchSlidesProgress }], t.containerModifierClass);
					e.push(...r), i.addClass([...e].join(" ")), this.emitContainerClasses();
				},
				removeClasses: function () {
					var { $el: e, classNames: t } = this;
					e.removeClass(t.join(" ")), this.emitContainerClasses();
				},
			},
			images: {
				loadImage: function (e, t, s, i, a, r) {
					var n = O();
					function o() {
						r && r();
					}
					!(P(e).parent("picture")[0] || (e.complete && a)) && t ? (((e = new n.Image()).onload = o), (e.onerror = o), i && (e.sizes = i), s && (e.srcset = s), t && (e.src = t)) : o();
				},
				preloadImages: function () {
					const t = this;
					function s() {
						null != t && t && !t.destroyed && (void 0 !== t.imagesLoaded && (t.imagesLoaded += 1), t.imagesLoaded === t.imagesToLoad.length) && (t.params.updateOnImagesReady && t.update(), t.emit("imagesReady"));
					}
					t.imagesToLoad = t.$el.find("img");
					for (let e = 0; e < t.imagesToLoad.length; e += 1) {
						var i = t.imagesToLoad[e];
						t.loadImage(i, i.currentSrc || i.getAttribute("src"), i.srcset || i.getAttribute("srcset"), i.sizes || i.getAttribute("sizes"), !0, s);
					}
				},
			},
		},
		E = {};
	class x {
		constructor() {
			let t, s;
			for (var p, e = arguments.length, i = new Array(e), a = 0; a < e; a++) i[a] = arguments[a];
			if ((1 === i.length && i[0].constructor && "Object" === Object.prototype.toString.call(i[0]).slice(8, -1) ? (s = i[0]) : ([t, s] = i), (s = m({}, (s = s || {}))), t && !s.el && (s.el = t), s.el && 1 < P(s.el).length)) {
				const t = [];
				return (
					P(s.el).each((e) => {
						e = m({}, s, { el: e });
						t.push(new x(e));
					}),
					t
				);
			}
			const r = this,
				n =
					((r.__swiper__ = !0),
					(r.support = u()),
					(r.device =
						(void 0 === (p = { userAgent: s.userAgent }) && (p = {}),
						(c =
							c ||
							(function () {
								var e = (void 0 === p ? {} : p)["userAgent"],
									t = u(),
									s = O(),
									i = s.navigator.platform,
									e = e || s.navigator.userAgent,
									a = { ios: !1, android: !1 },
									r = s.screen.width,
									s = s.screen.height,
									n = e.match(/(Android);?[\s\/]+([\d.]+)?/);
								let o = e.match(/(iPad).*OS\s([\d_]+)/);
								var l = e.match(/(iPod)(.*OS\s([\d_]+))?/),
									d = !o && e.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
									c = "Win32" === i,
									i = "MacIntel" === i;
								return !o && i && t.touch && 0 <= ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"].indexOf(r + "x" + s) && (o = (o = e.match(/(Version)\/([\d.]+)/)) || [0, 1, "13_0_0"]), n && !c && ((a.os = "android"), (a.android = !0)), (o || d || l) && ((a.os = "ios"), (a.ios = !0)), a;
							})()))),
					(r.browser = j()),
					(r.eventsListeners = {}),
					(r.eventsAnyListeners = []),
					(r.modules = [...r.__modules__]),
					s.modules && Array.isArray(s.modules) && r.modules.push(...s.modules),
					{});
			r.modules.forEach((e) => {
				var i, a;
				e({
					swiper: r,
					extendParams:
						((i = s),
						(a = n),
						function (e) {
							void 0 === e && (e = {});
							var t = Object.keys(e)[0],
								s = e[t];
							"object" == typeof s && null !== s && (0 <= ["navigation", "pagination", "scrollbar"].indexOf(t) && !0 === i[t] && (i[t] = { auto: !0 }), t in i) && "enabled" in s && (!0 === i[t] && (i[t] = { enabled: !0 }), "object" != typeof i[t] || "enabled" in i[t] || (i[t].enabled = !0), i[t] || (i[t] = { enabled: !1 })), m(a, e);
						}),
					on: r.on.bind(r),
					once: r.once.bind(r),
					off: r.off.bind(r),
					emit: r.emit.bind(r),
				});
			});
			var o,
				l = m({}, y, n);
			return (
				(r.params = m({}, l, E, s)),
				(r.originalParams = m({}, r.params)),
				(r.passedParams = m({}, s)),
				r.params &&
					r.params.on &&
					Object.keys(r.params.on).forEach((e) => {
						r.on(e, r.params.on[e]);
					}),
				r.params && r.params.onAny && r.onAny(r.params.onAny),
				(r.$ = P),
				Object.assign(r, { enabled: r.params.enabled, el: t, classNames: [], slides: P(), slidesGrid: [], snapGrid: [], slidesSizesGrid: [], isHorizontal: () => "horizontal" === r.params.direction, isVertical: () => "vertical" === r.params.direction, activeIndex: 0, realIndex: 0, isBeginning: !0, isEnd: !1, translate: 0, previousTranslate: 0, progress: 0, velocity: 0, animating: !1, allowSlideNext: r.params.allowSlideNext, allowSlidePrev: r.params.allowSlidePrev, touchEvents: ((l = ["touchstart", "touchmove", "touchend", "touchcancel"]), (o = ["pointerdown", "pointermove", "pointerup"]), (r.touchEventsTouch = { start: l[0], move: l[1], end: l[2], cancel: l[3] }), (r.touchEventsDesktop = { start: o[0], move: o[1], end: o[2] }), r.support.touch || !r.params.simulateTouch ? r.touchEventsTouch : r.touchEventsDesktop), touchEventsData: { isTouched: void 0, isMoved: void 0, allowTouchCallbacks: void 0, touchStartTime: void 0, isScrolling: void 0, currentTranslate: void 0, startTranslate: void 0, allowThresholdMove: void 0, focusableElements: r.params.focusableElements, lastClickTime: v(), clickTimeout: void 0, velocities: [], allowMomentumBounce: void 0, isTouchEvent: void 0, startMoving: void 0 }, allowClick: !0, allowTouchMove: r.params.allowTouchMove, touches: { startX: 0, startY: 0, currentX: 0, currentY: 0, diff: 0 }, imagesToLoad: [], imagesLoaded: 0 }),
				r.emit("_swiper"),
				r.params.init && r.init(),
				r
			);
		}
		enable() {
			var e = this;
			e.enabled || ((e.enabled = !0), e.params.grabCursor && e.setGrabCursor(), e.emit("enable"));
		}
		disable() {
			var e = this;
			e.enabled && ((e.enabled = !1), e.params.grabCursor && e.unsetGrabCursor(), e.emit("disable"));
		}
		setProgress(e, t) {
			var s = this,
				i = ((e = Math.min(Math.max(e, 0), 1)), s.minTranslate()),
				e = (s.maxTranslate() - i) * e + i;
			s.translateTo(e, void 0 === t ? 0 : t), s.updateActiveIndex(), s.updateSlidesClasses();
		}
		emitContainerClasses() {
			const t = this;
			var e;
			t.params._emitClasses && t.el && ((e = t.el.className.split(" ").filter((e) => 0 === e.indexOf("swiper") || 0 === e.indexOf(t.params.containerModifierClass))), t.emit("_containerClasses", e.join(" ")));
		}
		getSlideClasses(e) {
			const t = this;
			return t.destroyed
				? ""
				: e.className
						.split(" ")
						.filter((e) => 0 === e.indexOf("swiper-slide") || 0 === e.indexOf(t.params.slideClass))
						.join(" ");
		}
		emitSlidesClasses() {
			const s = this;
			if (s.params._emitClasses && s.el) {
				const i = [];
				s.slides.each((e) => {
					var t = s.getSlideClasses(e);
					i.push({ slideEl: e, classNames: t }), s.emit("_slideClass", e, t);
				}),
					s.emit("_slideClasses", i);
			}
		}
		slidesPerViewDynamic(e, t) {
			void 0 === e && (e = "current"), void 0 === t && (t = !1);
			var { params: s, slides: i, slidesGrid: a, slidesSizesGrid: r, size: n, activeIndex: o } = this;
			let l = 1;
			if (s.centeredSlides) {
				let t,
					s = i[o].swiperSlideSize;
				for (let e = o + 1; e < i.length; e += 1) i[e] && !t && ((s += i[e].swiperSlideSize), (l += 1), s > n) && (t = !0);
				for (let e = o - 1; 0 <= e; --e) i[e] && !t && ((s += i[e].swiperSlideSize), (l += 1), s > n) && (t = !0);
			} else if ("current" === e) for (let e = o + 1; e < i.length; e += 1) (t ? a[e] + r[e] - a[o] < n : a[e] - a[o] < n) && (l += 1);
			else for (let e = o - 1; 0 <= e; --e) a[o] - a[e] < n && (l += 1);
			return l;
		}
		update() {
			const t = this;
			var e, s;
			function i() {
				var e = t.rtlTranslate ? -1 * t.translate : t.translate,
					e = Math.min(Math.max(e, t.maxTranslate()), t.minTranslate());
				t.setTranslate(e), t.updateActiveIndex(), t.updateSlidesClasses();
			}
			t && !t.destroyed && (({ snapGrid: e, params: s } = t), s.breakpoints && t.setBreakpoint(), t.updateSize(), t.updateSlides(), t.updateProgress(), t.updateSlidesClasses(), t.params.freeMode && t.params.freeMode.enabled ? (i(), t.params.autoHeight && t.updateAutoHeight()) : (("auto" === t.params.slidesPerView || 1 < t.params.slidesPerView) && t.isEnd && !t.params.centeredSlides ? t.slideTo(t.slides.length - 1, 0, !1, !0) : t.slideTo(t.activeIndex, 0, !1, !0)) || i(), s.watchOverflow && e !== t.snapGrid && t.checkOverflow(), t.emit("update"));
		}
		changeDirection(t, e) {
			void 0 === e && (e = !0);
			var s = this,
				i = s.params.direction;
			return (
				(t = t || ("horizontal" === i ? "vertical" : "horizontal")) === i ||
					("horizontal" !== t && "vertical" !== t) ||
					(s.$el.removeClass("" + s.params.containerModifierClass + i).addClass("" + s.params.containerModifierClass + t),
					s.emitContainerClasses(),
					(s.params.direction = t),
					s.slides.each((e) => {
						"vertical" === t ? (e.style.width = "") : (e.style.height = "");
					}),
					s.emit("changeDirection"),
					e && s.update()),
				s
			);
		}
		changeLanguageDirection(e) {
			var t = this;
			(t.rtl && "rtl" === e) || (!t.rtl && "ltr" === e) || ((t.rtl = "rtl" === e), (t.rtlTranslate = "horizontal" === t.params.direction && t.rtl), t.rtl ? (t.$el.addClass(t.params.containerModifierClass + "rtl"), (t.el.dir = "rtl")) : (t.$el.removeClass(t.params.containerModifierClass + "rtl"), (t.el.dir = "ltr")), t.update());
		}
		mount(e) {
			const s = this;
			if (!s.mounted) {
				const a = P(e || s.params.el);
				if (!(e = a[0])) return !1;
				e.swiper = s;
				const r = () => "." + (s.params.wrapperClass || "").trim().split(" ").join(".");
				let t = e && e.shadowRoot && e.shadowRoot.querySelector ? (((i = P(e.shadowRoot.querySelector(r()))).children = (e) => a.children(e)), i) : (a.children ? a : P(a)).children(r());
				var i;
				if (0 === t.length && s.params.createElements) {
					const e = T().createElement("div");
					(t = P(e)),
						(e.className = s.params.wrapperClass),
						a.append(e),
						a.children("." + s.params.slideClass).each((e) => {
							t.append(e);
						});
				}
				Object.assign(s, { $el: a, el: e, $wrapperEl: t, wrapperEl: t[0], mounted: !0, rtl: "rtl" === e.dir.toLowerCase() || "rtl" === a.css("direction"), rtlTranslate: "horizontal" === s.params.direction && ("rtl" === e.dir.toLowerCase() || "rtl" === a.css("direction")), wrongRTL: "-webkit-box" === t.css("display") });
			}
			return !0;
		}
		init(e) {
			var t = this;
			return t.initialized || (!1 !== t.mount(e) && (t.emit("beforeInit"), t.params.breakpoints && t.setBreakpoint(), t.addClasses(), t.params.loop && t.loopCreate(), t.updateSize(), t.updateSlides(), t.params.watchOverflow && t.checkOverflow(), t.params.grabCursor && t.enabled && t.setGrabCursor(), t.params.preloadImages && t.preloadImages(), t.params.loop ? t.slideTo(t.params.initialSlide + t.loopedSlides, 0, t.params.runCallbacksOnInit, !1, !0) : t.slideTo(t.params.initialSlide, 0, t.params.runCallbacksOnInit, !1, !0), t.attachEvents(), (t.initialized = !0), t.emit("init"), t.emit("afterInit"))), t;
		}
		destroy(e, t) {
			void 0 === e && (e = !0), void 0 === t && (t = !0);
			const s = this,
				{ params: i, $el: a, $wrapperEl: r, slides: n } = s;
			if (void 0 !== s.params && !s.destroyed) {
				if (
					(s.emit("beforeDestroy"),
					(s.initialized = !1),
					s.detachEvents(),
					i.loop && s.loopDestroy(),
					t && (s.removeClasses(), a.removeAttr("style"), r.removeAttr("style"), n) && n.length && n.removeClass([i.slideVisibleClass, i.slideActiveClass, i.slideNextClass, i.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index"),
					s.emit("destroy"),
					Object.keys(s.eventsListeners).forEach((e) => {
						s.off(e);
					}),
					!1 !== e)
				) {
					s.$el[0].swiper = null;
					{
						const o = s;
						Object.keys(o).forEach((e) => {
							try {
								o[e] = null;
							} catch (e) {}
							try {
								delete o[e];
							} catch (e) {}
						});
					}
				}
				s.destroyed = !0;
			}
			return null;
		}
		static extendDefaults(e) {
			m(E, e);
		}
		static get extendedDefaults() {
			return E;
		}
		static get defaults() {
			return y;
		}
		static installModule(e) {
			x.prototype.__modules__ || (x.prototype.__modules__ = []);
			var t = x.prototype.__modules__;
			"function" == typeof e && t.indexOf(e) < 0 && t.push(e);
		}
		static use(e) {
			return Array.isArray(e) ? e.forEach((e) => x.installModule(e)) : x.installModule(e), x;
		}
	}
	function $(s, i, a, r) {
		const n = T();
		return (
			s.params.createElements &&
				Object.keys(r).forEach((t) => {
					if (!a[t] && !0 === a.auto) {
						let e = s.$el.children("." + r[t])[0];
						e || (((e = n.createElement("div")).className = r[t]), s.$el.append(e)), (a[t] = e), (i[t] = e);
					}
				}),
			a
		);
	}
	function M(e) {
		return (
			"." +
			(e = void 0 === e ? "" : e)
				.trim()
				.replace(/([\.:!\/])/g, "\\$1")
				.replace(/ /g, ".")
		);
	}
	function A(e) {
		const { effect: s, swiper: i, on: t, setTranslate: a, setTransition: r, overwriteParams: n, perspective: o, recreateShadows: l, getEffectParams: d } = e;
		let c;
		t("beforeInit", () => {
			var e;
			i.params.effect === s && (i.classNames.push("" + i.params.containerModifierClass + s), o && o() && i.classNames.push(i.params.containerModifierClass + "3d"), (e = n ? n() : {}), Object.assign(i.params, e), Object.assign(i.originalParams, e));
		}),
			t("setTranslate", () => {
				i.params.effect === s && a();
			}),
			t("setTransition", (e, t) => {
				i.params.effect === s && r(t);
			}),
			t("transitionEnd", () => {
				i.params.effect === s &&
					l &&
					d &&
					d().slideShadows &&
					(i.slides.each((e) => {
						i.$(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").remove();
					}),
					l());
			}),
			t("virtualUpdate", () => {
				i.params.effect === s &&
					(i.slides.length || (c = !0),
					requestAnimationFrame(() => {
						c && i.slides && i.slides.length && (a(), (c = !1));
					}));
			});
	}
	function k(e, t) {
		return e.transformEl ? t.find(e.transformEl).css({ "backface-visibility": "hidden", "-webkit-backface-visibility": "hidden" }) : t;
	}
	function I(e) {
		let { swiper: s, duration: t, transformEl: i, allSlides: a } = e;
		const { slides: r, activeIndex: n, $wrapperEl: o } = s;
		if (s.params.virtualTranslate && 0 !== t) {
			let e = !1;
			(a ? (i ? r.find(i) : r) : i ? r.eq(n).find(i) : r.eq(n)).transitionEnd(() => {
				if (!e && s && !s.destroyed) {
					(e = !0), (s.animating = !1);
					var t = ["webkitTransitionEnd", "transitionend"];
					for (let e = 0; e < t.length; e += 1) o.trigger(t[e]);
				}
			});
		}
	}
	function z(e, t, s) {
		var i = "swiper-slide-shadow" + (s ? "-" + s : ""),
			e = e.transformEl ? t.find(e.transformEl) : t;
		let a = e.children("." + i);
		return a.length || ((a = P(`<div class="swiper-slide-shadow${s ? "-" + s : ""}"></div>`)), e.append(a)), a;
	}
	return (
		Object.keys(_).forEach((t) => {
			Object.keys(_[t]).forEach((e) => {
				x.prototype[e] = _[t][e];
			});
		}),
		x.use([
			function (e) {
				let { swiper: r, on: t, emit: s } = e;
				const i = O();
				let a = null,
					n = null;
				const o = () => {
						r && !r.destroyed && r.initialized && (s("beforeResize"), s("resize"));
					},
					l = () => {
						r && !r.destroyed && r.initialized && s("orientationchange");
					};
				t("init", () => {
					r.params.resizeObserver && void 0 !== i.ResizeObserver
						? r &&
						  !r.destroyed &&
						  r.initialized &&
						  (a = new ResizeObserver((s) => {
								n = i.requestAnimationFrame(() => {
									var { width: e, height: t } = r;
									let i = e,
										a = t;
									s.forEach((e) => {
										var { contentBoxSize: e, contentRect: t, target: s } = e;
										(s && s !== r.el) || ((i = t ? t.width : (e[0] || e).inlineSize), (a = t ? t.height : (e[0] || e).blockSize));
									}),
										(i === e && a === t) || o();
								});
						  })).observe(r.el)
						: (i.addEventListener("resize", o), i.addEventListener("orientationchange", l));
				}),
					t("destroy", () => {
						n && i.cancelAnimationFrame(n), a && a.unobserve && r.el && (a.unobserve(r.el), (a = null)), i.removeEventListener("resize", o), i.removeEventListener("orientationchange", l);
					});
			},
			function (e) {
				let { swiper: s, extendParams: t, on: i, emit: a } = e;
				function r(e, t) {
					void 0 === t && (t = {});
					var s = new (o.MutationObserver || o.WebkitMutationObserver)((e) => {
						var t;
						1 === e.length
							? a("observerUpdate", e[0])
							: ((t = function () {
									a("observerUpdate", e[0]);
							  }),
							  o.requestAnimationFrame ? o.requestAnimationFrame(t) : o.setTimeout(t, 0));
					});
					s.observe(e, { attributes: void 0 === t.attributes || t.attributes, childList: void 0 === t.childList || t.childList, characterData: void 0 === t.characterData || t.characterData }), n.push(s);
				}
				const n = [],
					o = O();
				t({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
					i("init", () => {
						if (s.params.observer) {
							if (s.params.observeParents) {
								var t = s.$el.parents();
								for (let e = 0; e < t.length; e += 1) r(t[e]);
							}
							r(s.$el[0], { childList: s.params.observeSlideChildren }), r(s.$wrapperEl[0], { attributes: !1 });
						}
					}),
					i("destroy", () => {
						n.forEach((e) => {
							e.disconnect();
						}),
							n.splice(0, n.length);
					});
			},
		]),
		x.use([
			function (e) {
				let t,
					{ swiper: _, extendParams: s, on: i, emit: E } = e;
				function x(e, t) {
					var s = _.params.virtual;
					return s.cache && _.virtual.cache[t] ? _.virtual.cache[t] : ((e = s.renderSlide ? P(s.renderSlide.call(_, e, t)) : P(`<div class="${_.params.slideClass}" data-swiper-slide-index="${t}">${e}</div>`)).attr("data-swiper-slide-index") || e.attr("data-swiper-slide-index", t), s.cache && (_.virtual.cache[t] = e), e);
				}
				function n(t) {
					const { slidesPerView: e, slidesPerGroup: s, centeredSlides: i } = _.params,
						{ addSlidesBefore: a, addSlidesAfter: r } = _.params.virtual,
						{ from: n, to: o, slides: l, slidesGrid: d, offset: c } = _.virtual;
					_.params.cssMode || _.updateActiveIndex();
					var p = _.activeIndex || 0;
					let u, h, m;
					(u = _.rtlTranslate ? "right" : _.isHorizontal() ? "left" : "top"), (m = i ? ((h = Math.floor(e / 2) + s + r), Math.floor(e / 2) + s + a) : ((h = e + (s - 1) + r), s + a));
					const f = Math.max((p || 0) - m, 0),
						g = Math.min((p || 0) + h, l.length - 1),
						v = (_.slidesGrid[f] || 0) - (_.slidesGrid[0] || 0);
					function b() {
						_.updateSlides(), _.updateProgress(), _.updateSlidesClasses(), _.lazy && _.params.lazy.enabled && _.lazy.load(), E("virtualUpdate");
					}
					if ((Object.assign(_.virtual, { from: f, to: g, offset: v, slidesGrid: _.slidesGrid }), n !== f || o !== g || t))
						if (_.params.virtual.renderExternal)
							_.params.virtual.renderExternal.call(_, {
								offset: v,
								from: f,
								to: g,
								slides: (function () {
									var t = [];
									for (let e = f; e <= g; e += 1) t.push(l[e]);
									return t;
								})(),
							}),
								_.params.virtual.renderExternalUpdate ? b() : E("virtualUpdate");
						else {
							var w = [],
								y = [];
							if (t) _.$wrapperEl.find("." + _.params.slideClass).remove();
							else for (let e = n; e <= o; e += 1) (e < f || e > g) && _.$wrapperEl.find(`.${_.params.slideClass}[data-swiper-slide-index="${e}"]`).remove();
							for (let e = 0; e < l.length; e += 1) e >= f && e <= g && (void 0 === o || t ? y.push(e) : (e > o && y.push(e), e < n && w.push(e)));
							y.forEach((e) => {
								_.$wrapperEl.append(x(l[e], e));
							}),
								w
									.sort((e, t) => t - e)
									.forEach((e) => {
										_.$wrapperEl.prepend(x(l[e], e));
									}),
								_.$wrapperEl.children(".swiper-slide").css(u, v + "px"),
								b();
						}
					else _.slidesGrid !== d && v !== c && _.slides.css(u, v + "px"), _.updateProgress(), E("virtualUpdate");
				}
				s({ virtual: { enabled: !1, slides: [], cache: !0, renderSlide: null, renderExternal: null, renderExternalUpdate: !0, addSlidesBefore: 0, addSlidesAfter: 0 } }),
					(_.virtual = { cache: {}, from: void 0, to: void 0, slides: [], offset: 0, slidesGrid: [] }),
					i("beforeInit", () => {
						_.params.virtual.enabled && ((_.virtual.slides = _.params.virtual.slides), _.classNames.push(_.params.containerModifierClass + "virtual"), (_.params.watchSlidesProgress = !0), (_.originalParams.watchSlidesProgress = !0), _.params.initialSlide || n());
					}),
					i("setTranslate", () => {
						_.params.virtual.enabled &&
							(_.params.cssMode && !_._immediateVirtual
								? (clearTimeout(t),
								  (t = setTimeout(() => {
										n();
								  }, 100)))
								: n());
					}),
					i("init update resize", () => {
						_.params.virtual.enabled && _.params.cssMode && S(_.wrapperEl, "--swiper-virtual-size", _.virtualSize + "px");
					}),
					Object.assign(_.virtual, {
						appendSlide: function (t) {
							if ("object" == typeof t && "length" in t) for (let e = 0; e < t.length; e += 1) t[e] && _.virtual.slides.push(t[e]);
							else _.virtual.slides.push(t);
							n(!0);
						},
						prependSlide: function (i) {
							const a = _.activeIndex;
							let e = a + 1,
								r = 1;
							if (Array.isArray(i)) {
								for (let e = 0; e < i.length; e += 1) i[e] && _.virtual.slides.unshift(i[e]);
								(e = a + i.length), (r = i.length);
							} else _.virtual.slides.unshift(i);
							if (_.params.virtual.cache) {
								const i = _.virtual.cache,
									a = {};
								Object.keys(i).forEach((e) => {
									var t = i[e],
										s = t.attr("data-swiper-slide-index");
									s && t.attr("data-swiper-slide-index", parseInt(s, 10) + r), (a[parseInt(e, 10) + r] = t);
								}),
									(_.virtual.cache = a);
							}
							n(!0), _.slideTo(e, 0);
						},
						removeSlide: function (s) {
							if (null != s) {
								let t = _.activeIndex;
								if (Array.isArray(s)) for (let e = s.length - 1; 0 <= e; --e) _.virtual.slides.splice(s[e], 1), _.params.virtual.cache && delete _.virtual.cache[s[e]], s[e] < t && --t, (t = Math.max(t, 0));
								else _.virtual.slides.splice(s, 1), _.params.virtual.cache && delete _.virtual.cache[s], s < t && --t, (t = Math.max(t, 0));
								n(!0), _.slideTo(t, 0);
							}
						},
						removeAllSlides: function () {
							(_.virtual.slides = []), _.params.virtual.cache && (_.virtual.cache = {}), n(!0), _.slideTo(0, 0);
						},
						update: n,
					});
			},
			function (e) {
				let { swiper: p, extendParams: t, on: s, emit: u } = e;
				const h = T(),
					m = O();
				function i(t) {
					if (p.enabled) {
						const s = p["rtlTranslate"];
						let e = t;
						const i = (e = e.originalEvent ? e.originalEvent : e).keyCode || e.charCode,
							a = p.params.keyboard.pageUpDown,
							r = a && 33 === i,
							n = a && 34 === i,
							o = 37 === i,
							l = 39 === i,
							d = 38 === i,
							c = 40 === i;
						if (!p.allowSlideNext && ((p.isHorizontal() && l) || (p.isVertical() && c) || n)) return !1;
						if (!p.allowSlidePrev && ((p.isHorizontal() && o) || (p.isVertical() && d) || r)) return !1;
						if (!(e.shiftKey || e.altKey || e.ctrlKey || e.metaKey || (h.activeElement && h.activeElement.nodeName && ("input" === h.activeElement.nodeName.toLowerCase() || "textarea" === h.activeElement.nodeName.toLowerCase())))) {
							if (p.params.keyboard.onlyInViewport && (r || n || o || l || d || c)) {
								let t = !1;
								if (0 < p.$el.parents("." + p.params.slideClass).length && 0 === p.$el.parents("." + p.params.slideActiveClass).length) return;
								const e = p.$el,
									i = e[0].clientWidth,
									a = e[0].clientHeight,
									u = m.innerWidth,
									h = m.innerHeight,
									r = p.$el.offset(),
									n =
										(s && (r.left -= p.$el[0].scrollLeft),
										[
											[r.left, r.top],
											[r.left + i, r.top],
											[r.left, r.top + a],
											[r.left + i, r.top + a],
										]);
								for (let e = 0; e < n.length; e += 1) {
									const s = n[e];
									0 <= s[0] && s[0] <= u && 0 <= s[1] && s[1] <= h && ((0 === s[0] && 0 === s[1]) || (t = !0));
								}
								if (!t) return;
							}
							p.isHorizontal() ? ((r || n || o || l) && (e.preventDefault ? e.preventDefault() : (e.returnValue = !1)), (((n || l) && !s) || ((r || o) && s)) && p.slideNext(), (((r || o) && !s) || ((n || l) && s)) && p.slidePrev()) : ((r || n || d || c) && (e.preventDefault ? e.preventDefault() : (e.returnValue = !1)), (n || c) && p.slideNext(), (r || d) && p.slidePrev()), u("keyPress", i);
						}
					}
				}
				function a() {
					p.keyboard.enabled || (P(h).on("keydown", i), (p.keyboard.enabled = !0));
				}
				function r() {
					p.keyboard.enabled && (P(h).off("keydown", i), (p.keyboard.enabled = !1));
				}
				(p.keyboard = { enabled: !1 }),
					t({ keyboard: { enabled: !1, onlyInViewport: !0, pageUpDown: !0 } }),
					s("init", () => {
						p.params.keyboard.enabled && a();
					}),
					s("destroy", () => {
						p.keyboard.enabled && r();
					}),
					Object.assign(p.keyboard, { enable: a, disable: r });
			},
			function (e) {
				let { swiper: d, extendParams: t, on: s, emit: c } = e;
				const i = O();
				let p;
				t({ mousewheel: { enabled: !1, releaseOnEdges: !1, invert: !1, forceToAxis: !1, sensitivity: 1, eventsTarget: "container", thresholdDelta: null, thresholdTime: null } }), (d.mousewheel = { enabled: !1 });
				let u,
					a = v();
				const h = [];
				function r() {
					d.enabled && (d.mouseEntered = !0);
				}
				function n() {
					d.enabled && (d.mouseEntered = !1);
				}
				function m(e) {
					(d.params.mousewheel.thresholdDelta && e.delta < d.params.mousewheel.thresholdDelta) || (d.params.mousewheel.thresholdTime && v() - a < d.params.mousewheel.thresholdTime) || (6 <= e.delta && v() - a < 60) || (e.direction < 0 ? (d.isEnd && !d.params.loop) || d.animating || (d.slideNext(), c("scroll", e.raw)) : (d.isBeginning && !d.params.loop) || d.animating || (d.slidePrev(), c("scroll", e.raw)), (a = new i.Date().getTime()));
				}
				function o(i) {
					let a = i,
						r = !0;
					if (d.enabled) {
						var n = d.params.mousewheel;
						d.params.cssMode && a.preventDefault();
						let e = d.$el;
						if (("container" !== d.params.mousewheel.eventsTarget && (e = P(d.params.mousewheel.eventsTarget)), !d.mouseEntered && !e[0].contains(a.target) && !n.releaseOnEdges)) return !0;
						a.originalEvent && (a = a.originalEvent);
						let t = 0;
						var o = d.rtlTranslate ? -1 : 1,
							l = (function (e) {
								let t = 0,
									s = 0,
									i = 0,
									a = 0;
								return "detail" in e && (s = e.detail), "wheelDelta" in e && (s = -e.wheelDelta / 120), "wheelDeltaY" in e && (s = -e.wheelDeltaY / 120), "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120), "axis" in e && e.axis === e.HORIZONTAL_AXIS && ((t = s), (s = 0)), (i = 10 * t), (a = 10 * s), "deltaY" in e && (a = e.deltaY), "deltaX" in e && (i = e.deltaX), e.shiftKey && !i && ((i = a), (a = 0)), (i || a) && e.deltaMode && (1 === e.deltaMode ? ((i *= 40), (a *= 40)) : ((i *= 800), (a *= 800))), i && !t && (t = i < 1 ? -1 : 1), a && !s && (s = a < 1 ? -1 : 1), { spinX: t, spinY: s, pixelX: i, pixelY: a };
							})(a);
						if (n.forceToAxis)
							if (d.isHorizontal()) {
								if (!(Math.abs(l.pixelX) > Math.abs(l.pixelY))) return !0;
								t = -l.pixelX * o;
							} else {
								if (!(Math.abs(l.pixelY) > Math.abs(l.pixelX))) return !0;
								t = -l.pixelY;
							}
						else t = Math.abs(l.pixelX) > Math.abs(l.pixelY) ? -l.pixelX * o : -l.pixelY;
						if (0 === t) return !0;
						n.invert && (t = -t);
						let s = d.getTranslate() + t * n.sensitivity;
						if (((s = s >= d.minTranslate() ? d.minTranslate() : s) <= d.maxTranslate() && (s = d.maxTranslate()), (r = !!d.params.loop || !(s === d.minTranslate() || s === d.maxTranslate())) && d.params.nested && a.stopPropagation(), d.params.freeMode && d.params.freeMode.enabled)) {
							const i = { time: v(), delta: Math.abs(t), direction: Math.sign(t) },
								r = u && i.time < u.time + 500 && i.delta <= u.delta && i.direction === u.direction;
							if (!r) {
								(u = void 0), d.params.loop && d.loopFix();
								let e = d.getTranslate() + t * n.sensitivity;
								const P = d.isBeginning,
									v = d.isEnd;
								if (((e = e >= d.minTranslate() ? d.minTranslate() : e) <= d.maxTranslate() && (e = d.maxTranslate()), d.setTransition(0), d.setTranslate(e), d.updateProgress(), d.updateActiveIndex(), d.updateSlidesClasses(), ((!P && d.isBeginning) || (!v && d.isEnd)) && d.updateSlidesClasses(), d.params.freeMode.sticky)) {
									clearTimeout(p), (p = void 0), 15 <= h.length && h.shift();
									const a = h.length ? h[h.length - 1] : void 0,
										r = h[0];
									if ((h.push(i), a && (i.delta > a.delta || i.direction !== a.direction))) h.splice(0);
									else if (15 <= h.length && i.time - r.time < 500 && 1 <= r.delta - i.delta && i.delta <= 6) {
										const a = 0 < t ? 0.8 : 0.2;
										(u = i),
											h.splice(0),
											(p = C(() => {
												d.slideToClosest(d.params.speed, !0, void 0, a);
											}, 0));
									}
									p =
										p ||
										C(() => {
											(u = i), h.splice(0), d.slideToClosest(d.params.speed, !0, void 0, 0.5);
										}, 500);
								}
								if ((r || c("scroll", a), d.params.autoplay && d.params.autoplayDisableOnInteraction && d.autoplay.stop(), e === d.minTranslate() || e === d.maxTranslate())) return !0;
							}
						} else {
							const a = { time: v(), delta: Math.abs(t), direction: Math.sign(t), raw: i },
								r = (2 <= h.length && h.shift(), h.length ? h[h.length - 1] : void 0);
							if (
								(h.push(a),
								(!r || a.direction !== r.direction || a.delta > r.delta || a.time > r.time + 150) && m(a),
								(function (e) {
									var t = d.params.mousewheel;
									if (e.direction < 0) {
										if (d.isEnd && !d.params.loop && t.releaseOnEdges) return 1;
									} else if (d.isBeginning && !d.params.loop && t.releaseOnEdges) return 1;
								})(a))
							)
								return !0;
						}
						return a.preventDefault ? a.preventDefault() : (a.returnValue = !1), !1;
					}
				}
				function l(e) {
					let t = d.$el;
					(t = "container" !== d.params.mousewheel.eventsTarget ? P(d.params.mousewheel.eventsTarget) : t)[e]("mouseenter", r), t[e]("mouseleave", n), t[e]("wheel", o);
				}
				function f() {
					return d.params.cssMode ? (d.wrapperEl.removeEventListener("wheel", o), !0) : !d.mousewheel.enabled && (l("on"), (d.mousewheel.enabled = !0));
				}
				function g() {
					return d.params.cssMode ? (d.wrapperEl.addEventListener(event, o), !0) : !!d.mousewheel.enabled && (l("off"), !(d.mousewheel.enabled = !1));
				}
				s("init", () => {
					!d.params.mousewheel.enabled && d.params.cssMode && g(), d.params.mousewheel.enabled && f();
				}),
					s("destroy", () => {
						d.params.cssMode && f(), d.mousewheel.enabled && g();
					}),
					Object.assign(d.mousewheel, { enable: f, disable: g });
			},
			function (e) {
				let { swiper: a, extendParams: t, on: s, emit: r } = e;
				function i(e) {
					let t;
					return (t = e && ((t = P(e)), a.params.uniqueNavElements) && "string" == typeof e && 1 < t.length && 1 === a.$el.find(e).length ? a.$el.find(e) : t);
				}
				function n(e, t) {
					var s = a.params.navigation;
					e && 0 < e.length && (e[t ? "addClass" : "removeClass"](s.disabledClass), e[0] && "BUTTON" === e[0].tagName && (e[0].disabled = t), a.params.watchOverflow) && a.enabled && e[a.isLocked ? "addClass" : "removeClass"](s.lockClass);
				}
				function o() {
					var e, t;
					a.params.loop || (({ $nextEl: e, $prevEl: t } = a.navigation), n(t, a.isBeginning && !a.params.rewind), n(e, a.isEnd && !a.params.rewind));
				}
				function l(e) {
					e.preventDefault(), (a.isBeginning && !a.params.loop && !a.params.rewind) || (a.slidePrev(), r("navigationPrev"));
				}
				function d(e) {
					e.preventDefault(), (a.isEnd && !a.params.loop && !a.params.rewind) || (a.slideNext(), r("navigationNext"));
				}
				function c() {
					var e,
						t,
						s = a.params.navigation;
					(a.params.navigation = $(a, a.originalParams.navigation, a.params.navigation, { nextEl: "swiper-button-next", prevEl: "swiper-button-prev" })), (s.nextEl || s.prevEl) && ((e = i(s.nextEl)), (t = i(s.prevEl)), e && 0 < e.length && e.on("click", d), t && 0 < t.length && t.on("click", l), Object.assign(a.navigation, { $nextEl: e, nextEl: e && e[0], $prevEl: t, prevEl: t && t[0] }), a.enabled || (e && e.addClass(s.lockClass), t && t.addClass(s.lockClass)));
				}
				function p() {
					var { $nextEl: e, $prevEl: t } = a.navigation;
					e && e.length && (e.off("click", d), e.removeClass(a.params.navigation.disabledClass)), t && t.length && (t.off("click", l), t.removeClass(a.params.navigation.disabledClass));
				}
				t({ navigation: { nextEl: null, prevEl: null, hideOnClick: !1, disabledClass: "swiper-button-disabled", hiddenClass: "swiper-button-hidden", lockClass: "swiper-button-lock", navigationDisabledClass: "swiper-navigation-disabled" } }),
					(a.navigation = { nextEl: null, $nextEl: null, prevEl: null, $prevEl: null }),
					s("init", () => {
						(!1 === a.params.navigation.enabled ? u : (c(), o))();
					}),
					s("toEdge fromEdge lock unlock", () => {
						o();
					}),
					s("destroy", () => {
						p();
					}),
					s("enable disable", () => {
						var { $nextEl: e, $prevEl: t } = a.navigation;
						e && e[a.enabled ? "removeClass" : "addClass"](a.params.navigation.lockClass), t && t[a.enabled ? "removeClass" : "addClass"](a.params.navigation.lockClass);
					}),
					s("click", (e, t) => {
						var { $nextEl: s, $prevEl: i } = a.navigation,
							t = t.target;
						if (a.params.navigation.hideOnClick && !P(t).is(i) && !P(t).is(s) && (!(a.pagination && a.params.pagination && a.params.pagination.clickable) || (a.pagination.el !== t && !a.pagination.el.contains(t)))) {
							let e;
							s ? (e = s.hasClass(a.params.navigation.hiddenClass)) : i && (e = i.hasClass(a.params.navigation.hiddenClass)), r(!0 === e ? "navigationShow" : "navigationHide"), s && s.toggleClass(a.params.navigation.hiddenClass), i && i.toggleClass(a.params.navigation.hiddenClass);
						}
					});
				const u = () => {
					a.$el.addClass(a.params.navigation.navigationDisabledClass), p();
				};
				Object.assign(a.navigation, {
					enable: () => {
						a.$el.removeClass(a.params.navigation.navigationDisabledClass), c(), o();
					},
					disable: u,
					update: o,
					init: c,
					destroy: p,
				});
			},
			function (e) {
				let { swiper: l, extendParams: t, on: s, emit: d } = e;
				e = "swiper-pagination";
				let c,
					p = (t({ pagination: { el: null, bulletElement: "span", clickable: !1, hideOnClick: !1, renderBullet: null, renderProgressbar: null, renderFraction: null, renderCustom: null, progressbarOpposite: !1, type: "bullets", dynamicBullets: !1, dynamicMainBullets: 1, formatFractionCurrent: (e) => e, formatFractionTotal: (e) => e, bulletClass: e + "-bullet", bulletActiveClass: e + "-bullet-active", modifierClass: e + "-", currentClass: e + "-current", totalClass: e + "-total", hiddenClass: e + "-hidden", progressbarFillClass: e + "-progressbar-fill", progressbarOppositeClass: e + "-progressbar-opposite", clickableClass: e + "-clickable", lockClass: e + "-lock", horizontalClass: e + "-horizontal", verticalClass: e + "-vertical", paginationDisabledClass: e + "-disabled" } }), (l.pagination = { el: null, $el: null, bullets: [] }), 0);
				function u() {
					return !l.params.pagination.el || !l.pagination.el || !l.pagination.$el || 0 === l.pagination.$el.length;
				}
				function h(e, t) {
					var s = l.params.pagination["bulletActiveClass"];
					e[t]()
						.addClass(s + "-" + t)
						[t]()
						.addClass(s + `-${t}-` + t);
				}
				function i() {
					const t = l.rtl,
						r = l.params.pagination;
					if (!u()) {
						const n = (l.virtual && l.params.virtual.enabled ? l.virtual : l).slides.length,
							o = l.pagination.$el;
						let a;
						var s = l.params.loop ? Math.ceil((n - 2 * l.loopedSlides) / l.params.slidesPerGroup) : l.snapGrid.length;
						if ((l.params.loop ? ((a = Math.ceil((l.activeIndex - l.loopedSlides) / l.params.slidesPerGroup)) > n - 1 - 2 * l.loopedSlides && (a -= n - 2 * l.loopedSlides), a > s - 1 && (a -= s), a < 0 && "bullets" !== l.params.paginationType && (a = s + a)) : (a = void 0 !== l.snapIndex ? l.snapIndex : l.activeIndex || 0), "bullets" === r.type && l.pagination.bullets && 0 < l.pagination.bullets.length)) {
							const n = l.pagination.bullets;
							let s, i, e;
							if ((r.dynamicBullets && ((c = n.eq(0)[l.isHorizontal() ? "outerWidth" : "outerHeight"](!0)), o.css(l.isHorizontal() ? "width" : "height", c * (r.dynamicMainBullets + 4) + "px"), 1 < r.dynamicMainBullets && void 0 !== l.previousIndex && ((p += a - (l.previousIndex - l.loopedSlides || 0)) > r.dynamicMainBullets - 1 ? (p = r.dynamicMainBullets - 1) : p < 0 && (p = 0)), (s = Math.max(a - p, 0)), (i = s + (Math.min(n.length, r.dynamicMainBullets) - 1)), (e = (i + s) / 2)), n.removeClass(["", "-next", "-next-next", "-prev", "-prev-prev", "-main"].map((e) => "" + r.bulletActiveClass + e).join(" ")), 1 < o.length))
								n.each((e) => {
									var e = P(e),
										t = e.index();
									t === a && e.addClass(r.bulletActiveClass), r.dynamicBullets && (t >= s && t <= i && e.addClass(r.bulletActiveClass + "-main"), t === s && h(e, "prev"), t === i) && h(e, "next");
								});
							else {
								const t = n.eq(a),
									o = t.index();
								if ((t.addClass(r.bulletActiveClass), r.dynamicBullets)) {
									const t = n.eq(s),
										c = n.eq(i);
									for (let e = s; e <= i; e += 1) n.eq(e).addClass(r.bulletActiveClass + "-main");
									if (l.params.loop)
										if (o >= n.length) {
											for (let e = r.dynamicMainBullets; 0 <= e; --e) n.eq(n.length - e).addClass(r.bulletActiveClass + "-main");
											n.eq(n.length - r.dynamicMainBullets - 1).addClass(r.bulletActiveClass + "-prev");
										} else h(t, "prev"), h(c, "next");
									else h(t, "prev"), h(c, "next");
								}
							}
							if (r.dynamicBullets) {
								const d = Math.min(n.length, r.dynamicMainBullets + 4),
									o = (c * d - c) / 2 - e * c,
									p = t ? "right" : "left";
								n.css(l.isHorizontal() ? p : "top", o + "px");
							}
						}
						if (("fraction" === r.type && (o.find(M(r.currentClass)).text(r.formatFractionCurrent(a + 1)), o.find(M(r.totalClass)).text(r.formatFractionTotal(s))), "progressbar" === r.type)) {
							var i = r.progressbarOpposite ? (l.isHorizontal() ? "vertical" : "horizontal") : l.isHorizontal() ? "horizontal" : "vertical";
							const n = (a + 1) / s;
							let e = 1,
								t = 1;
							"horizontal" == i ? (e = n) : (t = n), o.find(M(r.progressbarFillClass)).transform(`translate3d(0,0,0) scaleX(${e}) scaleY(${t})`).transition(l.params.speed);
						}
						"custom" === r.type && r.renderCustom ? (o.html(r.renderCustom(l, a + 1, s)), d("paginationRender", o[0])) : d("paginationUpdate", o[0]), l.params.watchOverflow && l.enabled && o[l.isLocked ? "addClass" : "removeClass"](r.lockClass);
					}
				}
				function a() {
					var i = l.params.pagination;
					if (!u()) {
						var e = (l.virtual && l.params.virtual.enabled ? l.virtual : l).slides.length,
							a = l.pagination.$el;
						let s = "";
						if ("bullets" === i.type) {
							let t = l.params.loop ? Math.ceil((e - 2 * l.loopedSlides) / l.params.slidesPerGroup) : l.snapGrid.length;
							l.params.freeMode && l.params.freeMode.enabled && !l.params.loop && t > e && (t = e);
							for (let e = 0; e < t; e += 1) i.renderBullet ? (s += i.renderBullet.call(l, e, i.bulletClass)) : (s += `<${i.bulletElement} class="${i.bulletClass}"></${i.bulletElement}>`);
							a.html(s), (l.pagination.bullets = a.find(M(i.bulletClass)));
						}
						"fraction" === i.type && ((s = i.renderFraction ? i.renderFraction.call(l, i.currentClass, i.totalClass) : `<span class="${i.currentClass}"></span> / <span class="${i.totalClass}"></span>`), a.html(s)), "progressbar" === i.type && ((s = i.renderProgressbar ? i.renderProgressbar.call(l, i.progressbarFillClass) : `<span class="${i.progressbarFillClass}"></span>`), a.html(s)), "custom" !== i.type && d("paginationRender", l.pagination.$el[0]);
					}
				}
				function r() {
					l.params.pagination = $(l, l.originalParams.pagination, l.params.pagination, { el: "swiper-pagination" });
					var t = l.params.pagination;
					if (t.el) {
						let e = P(t.el);
						0 !== e.length &&
							(l.params.uniqueNavElements && "string" == typeof t.el && 1 < e.length && 1 < (e = l.$el.find(t.el)).length && (e = e.filter((e) => P(e).parents(".swiper")[0] === l.el)),
							"bullets" === t.type && t.clickable && e.addClass(t.clickableClass),
							e.addClass(t.modifierClass + t.type),
							e.addClass(l.isHorizontal() ? t.horizontalClass : t.verticalClass),
							"bullets" === t.type && t.dynamicBullets && (e.addClass("" + t.modifierClass + t.type + "-dynamic"), (p = 0), t.dynamicMainBullets < 1) && (t.dynamicMainBullets = 1),
							"progressbar" === t.type && t.progressbarOpposite && e.addClass(t.progressbarOppositeClass),
							t.clickable &&
								e.on("click", M(t.bulletClass), function (e) {
									e.preventDefault();
									let t = P(this).index() * l.params.slidesPerGroup;
									l.params.loop && (t += l.loopedSlides), l.slideTo(t);
								}),
							Object.assign(l.pagination, { $el: e, el: e[0] }),
							l.enabled || e.addClass(t.lockClass));
					}
				}
				function n() {
					var e,
						t = l.params.pagination;
					u() || ((e = l.pagination.$el).removeClass(t.hiddenClass), e.removeClass(t.modifierClass + t.type), e.removeClass(l.isHorizontal() ? t.horizontalClass : t.verticalClass), l.pagination.bullets && l.pagination.bullets.removeClass && l.pagination.bullets.removeClass(t.bulletActiveClass), t.clickable && e.off("click", M(t.bulletClass)));
				}
				s("init", () => {
					(!1 === l.params.pagination.enabled ? o : (r(), a(), i))();
				}),
					s("activeIndexChange", () => {
						(!l.params.loop && void 0 !== l.snapIndex) || i();
					}),
					s("snapIndexChange", () => {
						l.params.loop || i();
					}),
					s("slidesLengthChange", () => {
						l.params.loop && (a(), i());
					}),
					s("snapGridLengthChange", () => {
						l.params.loop || (a(), i());
					}),
					s("destroy", () => {
						n();
					}),
					s("enable disable", () => {
						var e = l.pagination["$el"];
						e && e[l.enabled ? "removeClass" : "addClass"](l.params.pagination.lockClass);
					}),
					s("lock unlock", () => {
						i();
					}),
					s("click", (e, t) => {
						var t = t.target,
							s = l.pagination["$el"];
						if (l.params.pagination.el && l.params.pagination.hideOnClick && s && 0 < s.length && !P(t).hasClass(l.params.pagination.bulletClass) && (!l.navigation || !((l.navigation.nextEl && t === l.navigation.nextEl) || (l.navigation.prevEl && t === l.navigation.prevEl)))) {
							const e = s.hasClass(l.params.pagination.hiddenClass);
							d(!0 === e ? "paginationShow" : "paginationHide"), s.toggleClass(l.params.pagination.hiddenClass);
						}
					});
				const o = () => {
					l.$el.addClass(l.params.pagination.paginationDisabledClass), l.pagination.$el && l.pagination.$el.addClass(l.params.pagination.paginationDisabledClass), n();
				};
				Object.assign(l.pagination, {
					enable: () => {
						l.$el.removeClass(l.params.pagination.paginationDisabledClass), l.pagination.$el && l.pagination.$el.removeClass(l.params.pagination.paginationDisabledClass), r(), a(), i();
					},
					disable: o,
					render: a,
					update: i,
					init: r,
					destroy: n,
				});
			},
			function (e) {
				let { swiper: l, extendParams: t, on: s, emit: r } = e;
				const o = T();
				let n,
					d,
					c,
					i,
					p = !1,
					u = null,
					h = null;
				function a() {
					if (l.params.scrollbar.el && l.scrollbar.el) {
						const { scrollbar: s, rtlTranslate: i, progress: a } = l,
							{ $dragEl: r, $el: n } = s,
							o = l.params.scrollbar;
						let e = d,
							t = (c - d) * a;
						i ? (0 < (t = -t) ? ((e = d - t), (t = 0)) : -t + d > c && (e = c + t)) : t < 0 ? ((e = d + t), (t = 0)) : t + d > c && (e = c - t),
							l.isHorizontal() ? (r.transform(`translate3d(${t}px, 0, 0)`), (r[0].style.width = e + "px")) : (r.transform(`translate3d(0px, ${t}px, 0)`), (r[0].style.height = e + "px")),
							o.hide &&
								(clearTimeout(u),
								(n[0].style.opacity = 1),
								(u = setTimeout(() => {
									(n[0].style.opacity = 0), n.transition(400);
								}, 1e3)));
					}
				}
				function m() {
					var e, t, s;
					l.params.scrollbar.el && l.scrollbar.el && ((e = l["scrollbar"]), ({ $dragEl: t, $el: s } = e), (t[0].style.width = ""), (t[0].style.height = ""), (c = l.isHorizontal() ? s[0].offsetWidth : s[0].offsetHeight), (i = l.size / (l.virtualSize + l.params.slidesOffsetBefore - (l.params.centeredSlides ? l.snapGrid[0] : 0))), (d = "auto" === l.params.scrollbar.dragSize ? c * i : parseInt(l.params.scrollbar.dragSize, 10)), l.isHorizontal() ? (t[0].style.width = d + "px") : (t[0].style.height = d + "px"), (s[0].style.display = 1 <= i ? "none" : ""), l.params.scrollbar.hide && (s[0].style.opacity = 0), l.params.watchOverflow) && l.enabled && e.$el[l.isLocked ? "addClass" : "removeClass"](l.params.scrollbar.lockClass);
				}
				function f(e) {
					return l.isHorizontal() ? ("touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0] : e).clientX : ("touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0] : e).clientY;
				}
				function g(e) {
					var { scrollbar: t, rtlTranslate: s } = l,
						t = t["$el"];
					let i;
					(i = (f(e) - t.offset()[l.isHorizontal() ? "left" : "top"] - (null !== n ? n : d / 2)) / (c - d)), (i = Math.max(Math.min(i, 1), 0)), s && (i = 1 - i);
					e = l.minTranslate() + (l.maxTranslate() - l.minTranslate()) * i;
					l.updateProgress(e), l.setTranslate(e), l.updateActiveIndex(), l.updateSlidesClasses();
				}
				function v(e) {
					var t = l.params.scrollbar,
						{ scrollbar: s, $wrapperEl: i } = l,
						{ $el: s, $dragEl: a } = s;
					(p = !0), (n = e.target === a[0] || e.target === a ? f(e) - e.target.getBoundingClientRect()[l.isHorizontal() ? "left" : "top"] : null), e.preventDefault(), e.stopPropagation(), i.transition(100), a.transition(100), g(e), clearTimeout(h), s.transition(0), t.hide && s.css("opacity", 1), l.params.cssMode && l.$wrapperEl.css("scroll-snap-type", "none"), r("scrollbarDragStart", e);
				}
				function b(e) {
					var { scrollbar: t, $wrapperEl: s } = l,
						{ $el: t, $dragEl: i } = t;
					p && (e.preventDefault ? e.preventDefault() : (e.returnValue = !1), g(e), s.transition(0), t.transition(0), i.transition(0), r("scrollbarDragMove", e));
				}
				function w(e) {
					const t = l.params.scrollbar,
						{ scrollbar: s, $wrapperEl: i } = l,
						a = s["$el"];
					p &&
						((p = !1),
						l.params.cssMode && (l.$wrapperEl.css("scroll-snap-type", ""), i.transition("")),
						t.hide &&
							(clearTimeout(h),
							(h = C(() => {
								a.css("opacity", 0), a.transition(400);
							}, 1e3))),
						r("scrollbarDragEnd", e),
						t.snapOnRelease) &&
						l.slideToClosest();
				}
				function y(e) {
					var t,
						{ scrollbar: s, touchEventsTouch: i, touchEventsDesktop: a, params: r, support: n } = l,
						s = s.$el;
					s && ((s = s[0]), (t = !(!n.passiveListener || !r.passiveListeners) && { passive: !1, capture: !1 }), (r = !(!n.passiveListener || !r.passiveListeners) && { passive: !0, capture: !1 }), s) && ((e = "on" === e ? "addEventListener" : "removeEventListener"), n.touch ? (s[e](i.start, v, t), s[e](i.move, b, t), s[e](i.end, w, r)) : (s[e](a.start, v, t), o[e](a.move, b, t), o[e](a.end, w, r)));
				}
				function _() {
					var { scrollbar: s, $el: i } = l,
						a = ((l.params.scrollbar = $(l, l.originalParams.scrollbar, l.params.scrollbar, { el: "swiper-scrollbar" })), l.params.scrollbar);
					if (a.el) {
						let e = P(a.el),
							t = ((e = l.params.uniqueNavElements && "string" == typeof a.el && 1 < e.length && 1 === i.find(a.el).length ? i.find(a.el) : e).addClass(l.isHorizontal() ? a.horizontalClass : a.verticalClass), e.find("." + l.params.scrollbar.dragClass));
						0 === t.length && ((t = P(`<div class="${l.params.scrollbar.dragClass}"></div>`)), e.append(t)), Object.assign(s, { $el: e, el: e[0], $dragEl: t, dragEl: t[0] }), a.draggable && l.params.scrollbar.el && l.scrollbar.el && y("on"), e && e[l.enabled ? "removeClass" : "addClass"](l.params.scrollbar.lockClass);
					}
				}
				function E() {
					var e = l.params.scrollbar,
						t = l.scrollbar.$el;
					t && t.removeClass(l.isHorizontal() ? e.horizontalClass : e.verticalClass), l.params.scrollbar.el && l.scrollbar.el && y("off");
				}
				t({ scrollbar: { el: null, dragSize: "auto", hide: !1, draggable: !1, snapOnRelease: !0, lockClass: "swiper-scrollbar-lock", dragClass: "swiper-scrollbar-drag", scrollbarDisabledClass: "swiper-scrollbar-disabled", horizontalClass: "swiper-scrollbar-horizontal", verticalClass: "swiper-scrollbar-vertical" } }),
					(l.scrollbar = { el: null, dragEl: null, $el: null, $dragEl: null }),
					s("init", () => {
						(!1 === l.params.scrollbar.enabled ? x : (_(), m(), a))();
					}),
					s("update resize observerUpdate lock unlock", () => {
						m();
					}),
					s("setTranslate", () => {
						a();
					}),
					s("setTransition", (e, t) => {
						(t = t), l.params.scrollbar.el && l.scrollbar.el && l.scrollbar.$dragEl.transition(t);
					}),
					s("enable disable", () => {
						var e = l.scrollbar["$el"];
						e && e[l.enabled ? "removeClass" : "addClass"](l.params.scrollbar.lockClass);
					}),
					s("destroy", () => {
						E();
					});
				const x = () => {
					l.$el.addClass(l.params.scrollbar.scrollbarDisabledClass), l.scrollbar.$el && l.scrollbar.$el.addClass(l.params.scrollbar.scrollbarDisabledClass), E();
				};
				Object.assign(l.scrollbar, {
					enable: () => {
						l.$el.removeClass(l.params.scrollbar.scrollbarDisabledClass), l.scrollbar.$el && l.scrollbar.$el.removeClass(l.params.scrollbar.scrollbarDisabledClass), _(), m(), a();
					},
					disable: x,
					updateSize: m,
					setTranslate: a,
					init: _,
					destroy: E,
				});
			},
			function (e) {
				let { swiper: l, extendParams: t, on: s } = e;
				t({ parallax: { enabled: !1 } });
				const r = (e, t) => {
						var s = l["rtl"],
							i = P(e),
							e = s ? -1 : 1,
							s = i.attr("data-swiper-parallax") || "0";
						let a = i.attr("data-swiper-parallax-x"),
							r = i.attr("data-swiper-parallax-y");
						var n = i.attr("data-swiper-parallax-scale"),
							o = i.attr("data-swiper-parallax-opacity");
						if ((a || r ? ((a = a || "0"), (r = r || "0")) : l.isHorizontal() ? ((a = s), (r = "0")) : ((r = s), (a = "0")), (a = 0 <= a.indexOf("%") ? parseInt(a, 10) * t * e + "%" : a * t * e + "px"), (r = 0 <= r.indexOf("%") ? parseInt(r, 10) * t + "%" : r * t + "px"), null != o)) {
							const e = o - (o - 1) * (1 - Math.abs(t));
							i[0].style.opacity = e;
						}
						if (null == n) i.transform(`translate3d(${a}, ${r}, 0px)`);
						else {
							const e = n - (n - 1) * (1 - Math.abs(t));
							i.transform(`translate3d(${a}, ${r}, 0px) scale(${e})`);
						}
					},
					i = () => {
						const { $el: e, slides: t, progress: i, snapGrid: a } = l;
						e.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each((e) => {
							r(e, i);
						}),
							t.each((e, t) => {
								let s = e.progress;
								1 < l.params.slidesPerGroup && "auto" !== l.params.slidesPerView && (s += Math.ceil(t / 2) - i * (a.length - 1)),
									(s = Math.min(Math.max(s, -1), 1)),
									P(e)
										.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]")
										.each((e) => {
											r(e, s);
										});
							});
					};
				s("beforeInit", () => {
					l.params.parallax.enabled && ((l.params.watchSlidesProgress = !0), (l.originalParams.watchSlidesProgress = !0));
				}),
					s("init", () => {
						l.params.parallax.enabled && i();
					}),
					s("setTranslate", () => {
						l.params.parallax.enabled && i();
					}),
					s("setTransition", (e, t) => {
						var s;
						l.params.parallax.enabled &&
							(void 0 === (s = t) && (s = l.params.speed),
							l.$el.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each((e) => {
								e = P(e);
								let t = parseInt(e.attr("data-swiper-parallax-duration"), 10) || s;
								0 === s && (t = 0), e.transition(t);
							}));
					});
			},
			function (e) {
				let { swiper: _, extendParams: t, on: s, emit: i } = e;
				const E = O();
				t({ zoom: { enabled: !1, maxRatio: 3, minRatio: 1, toggle: !0, containerClass: "swiper-zoom-container", zoomedSlideClass: "swiper-slide-zoomed" } }), (_.zoom = { enabled: !1 });
				let a,
					r,
					n,
					x = 1,
					o = !1;
				const T = { $slideEl: void 0, slideWidth: void 0, slideHeight: void 0, $imageEl: void 0, $imageWrapEl: void 0, maxRatio: 3 },
					C = { isTouched: void 0, isMoved: void 0, currentX: void 0, currentY: void 0, minX: void 0, minY: void 0, maxX: void 0, maxY: void 0, width: void 0, height: void 0, startX: void 0, startY: void 0, touchesStart: {}, touchesCurrent: {} },
					l = { x: void 0, y: void 0, prevPositionX: void 0, prevPositionY: void 0, prevTime: void 0 };
				let d = 1;
				function c(e) {
					var t, s, i;
					return e.targetTouches.length < 2 ? 1 : ((t = e.targetTouches[0].pageX), (s = e.targetTouches[0].pageY), (i = e.targetTouches[1].pageX), (e = e.targetTouches[1].pageY), Math.sqrt((i - t) ** 2 + (e - s) ** 2));
				}
				function p(e) {
					var t = _.support,
						s = _.params.zoom;
					if (((r = !1), (n = !1), !t.gestures)) {
						if ("touchstart" !== e.type || ("touchstart" === e.type && e.targetTouches.length < 2)) return;
						(r = !0), (T.scaleStart = c(e));
					}
					(T.$slideEl && T.$slideEl.length) ||
					((T.$slideEl = P(e.target).closest("." + _.params.slideClass)),
					0 === T.$slideEl.length && (T.$slideEl = _.slides.eq(_.activeIndex)),
					(T.$imageEl = T.$slideEl
						.find("." + s.containerClass)
						.eq(0)
						.find("picture, img, svg, canvas, .swiper-zoom-target")
						.eq(0)),
					(T.$imageWrapEl = T.$imageEl.parent("." + s.containerClass)),
					(T.maxRatio = T.$imageWrapEl.attr("data-swiper-zoom") || s.maxRatio),
					0 !== T.$imageWrapEl.length)
						? (T.$imageEl && T.$imageEl.transition(0), (o = !0))
						: (T.$imageEl = void 0);
				}
				function u(e) {
					var t = _.support,
						s = _.params.zoom,
						i = _.zoom;
					if (!t.gestures) {
						if ("touchmove" !== e.type || ("touchmove" === e.type && e.targetTouches.length < 2)) return;
						(n = !0), (T.scaleMove = c(e));
					}
					T.$imageEl && 0 !== T.$imageEl.length ? (t.gestures ? (i.scale = e.scale * x) : (i.scale = (T.scaleMove / T.scaleStart) * x), i.scale > T.maxRatio && (i.scale = T.maxRatio - 1 + (i.scale - T.maxRatio + 1) ** 0.5), i.scale < s.minRatio && (i.scale = s.minRatio + 1 - (s.minRatio - i.scale + 1) ** 0.5), T.$imageEl.transform(`translate3d(0,0,0) scale(${i.scale})`)) : "gesturechange" === e.type && p(e);
				}
				function h(e) {
					var t = _.device,
						s = _.support,
						i = _.params.zoom,
						a = _.zoom;
					if (!s.gestures) {
						if (!r || !n) return;
						if ("touchend" !== e.type || ("touchend" === e.type && e.changedTouches.length < 2 && !t.android)) return;
						(r = !1), (n = !1);
					}
					T.$imageEl && 0 !== T.$imageEl.length && ((a.scale = Math.max(Math.min(a.scale, T.maxRatio), i.minRatio)), T.$imageEl.transition(_.params.speed).transform(`translate3d(0,0,0) scale(${a.scale})`), (x = a.scale), (o = !1), 1 === a.scale) && (T.$slideEl = void 0);
				}
				function m(e) {
					var t = _.zoom;
					if (T.$imageEl && 0 !== T.$imageEl.length && ((_.allowClick = !1), C.isTouched) && T.$slideEl) {
						C.isMoved || ((C.width = T.$imageEl[0].offsetWidth), (C.height = T.$imageEl[0].offsetHeight), (C.startX = L(T.$imageWrapEl[0], "x") || 0), (C.startY = L(T.$imageWrapEl[0], "y") || 0), (T.slideWidth = T.$slideEl[0].offsetWidth), (T.slideHeight = T.$slideEl[0].offsetHeight), T.$imageWrapEl.transition(0));
						var s = C.width * t.scale,
							t = C.height * t.scale;
						if (!(s < T.slideWidth && t < T.slideHeight)) {
							if (((C.minX = Math.min(T.slideWidth / 2 - s / 2, 0)), (C.maxX = -C.minX), (C.minY = Math.min(T.slideHeight / 2 - t / 2, 0)), (C.maxY = -C.minY), (C.touchesCurrent.x = ("touchmove" === e.type ? e.targetTouches[0] : e).pageX), (C.touchesCurrent.y = ("touchmove" === e.type ? e.targetTouches[0] : e).pageY), !C.isMoved && !o)) {
								if (_.isHorizontal() && ((Math.floor(C.minX) === Math.floor(C.startX) && C.touchesCurrent.x < C.touchesStart.x) || (Math.floor(C.maxX) === Math.floor(C.startX) && C.touchesCurrent.x > C.touchesStart.x))) return void (C.isTouched = !1);
								if (!_.isHorizontal() && ((Math.floor(C.minY) === Math.floor(C.startY) && C.touchesCurrent.y < C.touchesStart.y) || (Math.floor(C.maxY) === Math.floor(C.startY) && C.touchesCurrent.y > C.touchesStart.y))) return void (C.isTouched = !1);
							}
							e.cancelable && e.preventDefault(), e.stopPropagation(), (C.isMoved = !0), (C.currentX = C.touchesCurrent.x - C.touchesStart.x + C.startX), (C.currentY = C.touchesCurrent.y - C.touchesStart.y + C.startY), C.currentX < C.minX && (C.currentX = C.minX + 1 - (C.minX - C.currentX + 1) ** 0.8), C.currentX > C.maxX && (C.currentX = C.maxX - 1 + (C.currentX - C.maxX + 1) ** 0.8), C.currentY < C.minY && (C.currentY = C.minY + 1 - (C.minY - C.currentY + 1) ** 0.8), C.currentY > C.maxY && (C.currentY = C.maxY - 1 + (C.currentY - C.maxY + 1) ** 0.8), l.prevPositionX || (l.prevPositionX = C.touchesCurrent.x), l.prevPositionY || (l.prevPositionY = C.touchesCurrent.y), l.prevTime || (l.prevTime = Date.now()), (l.x = (C.touchesCurrent.x - l.prevPositionX) / (Date.now() - l.prevTime) / 2), (l.y = (C.touchesCurrent.y - l.prevPositionY) / (Date.now() - l.prevTime) / 2), Math.abs(C.touchesCurrent.x - l.prevPositionX) < 2 && (l.x = 0), Math.abs(C.touchesCurrent.y - l.prevPositionY) < 2 && (l.y = 0), (l.prevPositionX = C.touchesCurrent.x), (l.prevPositionY = C.touchesCurrent.y), (l.prevTime = Date.now()), T.$imageWrapEl.transform(`translate3d(${C.currentX}px, ${C.currentY}px,0)`);
						}
					}
				}
				function f() {
					var e = _.zoom;
					T.$slideEl && _.previousIndex !== _.activeIndex && (T.$imageEl && T.$imageEl.transform("translate3d(0,0,0) scale(1)"), T.$imageWrapEl && T.$imageWrapEl.transform("translate3d(0,0,0)"), (e.scale = 1), (x = 1), (T.$slideEl = void 0), (T.$imageEl = void 0), (T.$imageWrapEl = void 0));
				}
				function g(b) {
					var w = _.zoom,
						y = _.params.zoom;
					if (
						(T.$slideEl ||
							(b && b.target && (T.$slideEl = P(b.target).closest("." + _.params.slideClass)),
							T.$slideEl || (_.params.virtual && _.params.virtual.enabled && _.virtual ? (T.$slideEl = _.$wrapperEl.children("." + _.params.slideActiveClass)) : (T.$slideEl = _.slides.eq(_.activeIndex))),
							(T.$imageEl = T.$slideEl
								.find("." + y.containerClass)
								.eq(0)
								.find("picture, img, svg, canvas, .swiper-zoom-target")
								.eq(0)),
							(T.$imageWrapEl = T.$imageEl.parent("." + y.containerClass))),
						T.$imageEl && 0 !== T.$imageEl.length && T.$imageWrapEl && 0 !== T.$imageWrapEl.length)
					) {
						let e, t, s, i, a, r, n, o, l, d, c, p, u, h, m, f, g, v;
						_.params.cssMode && ((_.wrapperEl.style.overflow = "hidden"), (_.wrapperEl.style.touchAction = "none")), T.$slideEl.addClass("" + y.zoomedSlideClass), (t = void 0 === C.touchesStart.x && b ? ((e = ("touchend" === b.type ? b.changedTouches[0] : b).pageX), ("touchend" === b.type ? b.changedTouches[0] : b).pageY) : ((e = C.touchesStart.x), C.touchesStart.y)), (w.scale = T.$imageWrapEl.attr("data-swiper-zoom") || y.maxRatio), (x = T.$imageWrapEl.attr("data-swiper-zoom") || y.maxRatio), b ? ((g = T.$slideEl[0].offsetWidth), (v = T.$slideEl[0].offsetHeight), (s = T.$slideEl.offset().left + E.scrollX), (i = T.$slideEl.offset().top + E.scrollY), (a = s + g / 2 - e), (r = i + v / 2 - t), (l = T.$imageEl[0].offsetWidth), (d = T.$imageEl[0].offsetHeight), (c = l * w.scale), (p = d * w.scale), (m = -(u = Math.min(g / 2 - c / 2, 0))), (f = -(h = Math.min(v / 2 - p / 2, 0))), (n = a * w.scale), (o = r * w.scale), (n = n < u ? u : n) > m && (n = m), (o = o < h ? h : o) > f && (o = f)) : ((n = 0), (o = 0)), T.$imageWrapEl.transition(300).transform(`translate3d(${n}px, ${o}px,0)`), T.$imageEl.transition(300).transform(`translate3d(0,0,0) scale(${w.scale})`);
					}
				}
				function v() {
					var e = _.zoom,
						t = _.params.zoom;
					T.$slideEl ||
						(_.params.virtual && _.params.virtual.enabled && _.virtual ? (T.$slideEl = _.$wrapperEl.children("." + _.params.slideActiveClass)) : (T.$slideEl = _.slides.eq(_.activeIndex)),
						(T.$imageEl = T.$slideEl
							.find("." + t.containerClass)
							.eq(0)
							.find("picture, img, svg, canvas, .swiper-zoom-target")
							.eq(0)),
						(T.$imageWrapEl = T.$imageEl.parent("." + t.containerClass))),
						T.$imageEl && 0 !== T.$imageEl.length && T.$imageWrapEl && 0 !== T.$imageWrapEl.length && (_.params.cssMode && ((_.wrapperEl.style.overflow = ""), (_.wrapperEl.style.touchAction = "")), (e.scale = 1), (x = 1), T.$imageWrapEl.transition(300).transform("translate3d(0,0,0)"), T.$imageEl.transition(300).transform("translate3d(0,0,0) scale(1)"), T.$slideEl.removeClass("" + t.zoomedSlideClass), (T.$slideEl = void 0));
				}
				function b(e) {
					var t = _.zoom;
					t.scale && 1 !== t.scale ? v() : g(e);
				}
				function w() {
					var e = _.support;
					return { passiveListener: !("touchstart" !== _.touchEvents.start || !e.passiveListener || !_.params.passiveListeners) && { passive: !0, capture: !1 }, activeListenerWithCapture: !e.passiveListener || { passive: !1, capture: !0 } };
				}
				function y() {
					return "." + _.params.slideClass;
				}
				function S(e) {
					var t = w()["passiveListener"],
						s = y();
					_.$wrapperEl[e]("gesturestart", s, p, t), _.$wrapperEl[e]("gesturechange", s, u, t), _.$wrapperEl[e]("gestureend", s, h, t);
				}
				function $() {
					a || ((a = !0), S("on"));
				}
				function M() {
					a && ((a = !1), S("off"));
				}
				function A() {
					var e,
						t,
						s,
						i = _.zoom;
					i.enabled || ((i.enabled = !0), (i = _.support), ({ passiveListener: e, activeListenerWithCapture: t } = w()), (s = y()), i.gestures ? (_.$wrapperEl.on(_.touchEvents.start, $, e), _.$wrapperEl.on(_.touchEvents.end, M, e)) : "touchstart" === _.touchEvents.start && (_.$wrapperEl.on(_.touchEvents.start, s, p, e), _.$wrapperEl.on(_.touchEvents.move, s, u, t), _.$wrapperEl.on(_.touchEvents.end, s, h, e), _.touchEvents.cancel) && _.$wrapperEl.on(_.touchEvents.cancel, s, h, e), _.$wrapperEl.on(_.touchEvents.move, "." + _.params.zoom.containerClass, m, t));
				}
				function k() {
					var e,
						t,
						s,
						i = _.zoom;
					i.enabled && ((e = _.support), ({ passiveListener: i, activeListenerWithCapture: t } = ((i.enabled = !1), w())), (s = y()), e.gestures ? (_.$wrapperEl.off(_.touchEvents.start, $, i), _.$wrapperEl.off(_.touchEvents.end, M, i)) : "touchstart" === _.touchEvents.start && (_.$wrapperEl.off(_.touchEvents.start, s, p, i), _.$wrapperEl.off(_.touchEvents.move, s, u, t), _.$wrapperEl.off(_.touchEvents.end, s, h, i), _.touchEvents.cancel) && _.$wrapperEl.off(_.touchEvents.cancel, s, h, i), _.$wrapperEl.off(_.touchEvents.move, "." + _.params.zoom.containerClass, m, t));
				}
				Object.defineProperty(_.zoom, "scale", {
					get: () => d,
					set(e) {
						var t, s;
						d !== e && ((t = T.$imageEl ? T.$imageEl[0] : void 0), (s = T.$slideEl ? T.$slideEl[0] : void 0), i("zoomChange", e, t, s)), (d = e);
					},
				}),
					s("init", () => {
						_.params.zoom.enabled && A();
					}),
					s("destroy", () => {
						k();
					}),
					s("touchStart", (e, t) => {
						var s;
						_.zoom.enabled && ((t = t), (s = _.device), T.$imageEl) && 0 !== T.$imageEl.length && !C.isTouched && (s.android && t.cancelable && t.preventDefault(), (C.isTouched = !0), (C.touchesStart.x = ("touchstart" === t.type ? t.targetTouches[0] : t).pageX), (C.touchesStart.y = ("touchstart" === t.type ? t.targetTouches[0] : t).pageY));
					}),
					s("touchEnd", (e, t) => {
						if (_.zoom.enabled) {
							var s = _.zoom;
							if (T.$imageEl && 0 !== T.$imageEl.length) {
								if (!C.isTouched || !C.isMoved) return void ((C.isTouched = !1), (C.isMoved = !1));
								(C.isTouched = !1), (C.isMoved = !1);
								let e = 300,
									t = 300;
								var i = l.x * e,
									i = C.currentX + i,
									a = l.y * t,
									a = C.currentY + a,
									r = (0 !== l.x && (e = Math.abs((i - C.currentX) / l.x)), 0 !== l.y && (t = Math.abs((a - C.currentY) / l.y)), Math.max(e, t)),
									i = ((C.currentX = i), (C.currentY = a), C.width * s.scale),
									a = C.height * s.scale;
								(C.minX = Math.min(T.slideWidth / 2 - i / 2, 0)), (C.maxX = -C.minX), (C.minY = Math.min(T.slideHeight / 2 - a / 2, 0)), (C.maxY = -C.minY), (C.currentX = Math.max(Math.min(C.currentX, C.maxX), C.minX)), (C.currentY = Math.max(Math.min(C.currentY, C.maxY), C.minY)), T.$imageWrapEl.transition(r).transform(`translate3d(${C.currentX}px, ${C.currentY}px,0)`);
							}
						}
					}),
					s("doubleTap", (e, t) => {
						!_.animating && _.params.zoom.enabled && _.zoom.enabled && _.params.zoom.toggle && b(t);
					}),
					s("transitionEnd", () => {
						_.zoom.enabled && _.params.zoom.enabled && f();
					}),
					s("slideChange", () => {
						_.zoom.enabled && _.params.zoom.enabled && _.params.cssMode && f();
					}),
					Object.assign(_.zoom, { enable: A, disable: k, in: g, out: v, toggle: b });
			},
			function (e) {
				let { swiper: c, extendParams: t, on: s, emit: p } = e,
					o = (t({ lazy: { checkInView: !1, enabled: !1, loadPrevNext: !1, loadPrevNextAmount: 1, loadOnTransitionStart: !1, scrollingElement: "", elementClass: "swiper-lazy", loadingClass: "swiper-lazy-loading", loadedClass: "swiper-lazy-loaded", preloaderClass: "swiper-lazy-preloader" } }), !(c.lazy = {})),
					d = !1;
				function u(e, o) {
					void 0 === o && (o = !0);
					const l = c.params.lazy;
					if (void 0 !== e && 0 !== c.slides.length) {
						const d = c.virtual && c.params.virtual.enabled ? c.$wrapperEl.children(`.${c.params.slideClass}[data-swiper-slide-index="${e}"]`) : c.slides.eq(e),
							t = d.find(`.${l.elementClass}:not(.${l.loadedClass}):not(.${l.loadingClass})`);
						!d.hasClass(l.elementClass) || d.hasClass(l.loadedClass) || d.hasClass(l.loadingClass) || t.push(d[0]),
							0 !== t.length &&
								t.each((e) => {
									const t = P(e),
										s = (t.addClass(l.loadingClass), t.attr("data-background")),
										i = t.attr("data-src"),
										a = t.attr("data-srcset"),
										r = t.attr("data-sizes"),
										n = t.parent("picture");
									c.loadImage(t[0], i || s, a, r, !1, () => {
										var e;
										null == c ||
											!c ||
											(c && !c.params) ||
											c.destroyed ||
											(s
												? (t.css("background-image", `url("${s}")`), t.removeAttr("data-background"))
												: (a && (t.attr("srcset", a), t.removeAttr("data-srcset")),
												  r && (t.attr("sizes", r), t.removeAttr("data-sizes")),
												  n.length &&
														n.children("source").each((e) => {
															e = P(e);
															e.attr("data-srcset") && (e.attr("srcset", e.attr("data-srcset")), e.removeAttr("data-srcset"));
														}),
												  i && (t.attr("src", i), t.removeAttr("data-src"))),
											t.addClass(l.loadedClass).removeClass(l.loadingClass),
											d.find("." + l.preloaderClass).remove(),
											c.params.loop && o && ((e = d.attr("data-swiper-slide-index")), d.hasClass(c.params.slideDuplicateClass) ? u(c.$wrapperEl.children(`[data-swiper-slide-index="${e}"]:not(.${c.params.slideDuplicateClass})`).index(), !1) : u(c.$wrapperEl.children(`.${c.params.slideDuplicateClass}[data-swiper-slide-index="${e}"]`).index(), !1)),
											p("lazyImageReady", d[0], t[0]),
											c.params.autoHeight && c.updateAutoHeight());
									}),
										p("lazyImageLoad", d[0], t[0]);
								});
					}
				}
				function l() {
					const { $wrapperEl: t, params: s, slides: i, activeIndex: a } = c,
						r = c.virtual && s.virtual.enabled,
						e = s.lazy;
					let n = s.slidesPerView;
					function o(e) {
						if (r) {
							if (t.children(`.${s.slideClass}[data-swiper-slide-index="${e}"]`).length) return 1;
						} else if (i[e]) return 1;
					}
					function l(e) {
						return r ? P(e).attr("data-swiper-slide-index") : P(e).index();
					}
					if (("auto" === n && (n = 0), (d = d || !0), c.params.watchSlidesProgress))
						t.children("." + s.slideVisibleClass).each((e) => {
							u(r ? P(e).attr("data-swiper-slide-index") : P(e).index());
						});
					else if (1 < n) for (let e = a; e < a + n; e += 1) o(e) && u(e);
					else u(a);
					if (e.loadPrevNext)
						if (1 < n || (e.loadPrevNextAmount && 1 < e.loadPrevNextAmount)) {
							const t = e.loadPrevNextAmount,
								c = Math.ceil(n),
								s = Math.min(a + c + Math.max(t, c), i.length),
								r = Math.max(a - Math.max(c, t), 0);
							for (let e = a + c; e < s; e += 1) o(e) && u(e);
							for (let e = r; e < a; e += 1) o(e) && u(e);
						} else {
							const c = t.children("." + s.slideNextClass),
								i = (0 < c.length && u(l(c)), t.children("." + s.slidePrevClass));
							0 < i.length && u(l(i));
						}
				}
				function h() {
					var e = O();
					if (c && !c.destroyed) {
						var s = c.params.lazy.scrollingElement ? P(c.params.lazy.scrollingElement) : P(e),
							i = s[0] === e,
							a = i ? e.innerWidth : s[0].offsetWidth,
							r = i ? e.innerHeight : s[0].offsetHeight,
							i = c.$el.offset(),
							e = c["rtlTranslate"];
						let t = !1;
						e && (i.left -= c.$el[0].scrollLeft);
						var n = [
							[i.left, i.top],
							[i.left + c.width, i.top],
							[i.left, i.top + c.height],
							[i.left + c.width, i.top + c.height],
						];
						for (let e = 0; e < n.length; e += 1) {
							const c = n[e];
							0 <= c[0] && c[0] <= a && 0 <= c[1] && c[1] <= r && ((0 === c[0] && 0 === c[1]) || (t = !0));
						}
						e = !("touchstart" !== c.touchEvents.start || !c.support.passiveListener || !c.params.passiveListeners) && { passive: !0, capture: !1 };
						t ? (l(), s.off("scroll", h, e)) : o || ((o = !0), s.on("scroll", h, e));
					}
				}
				s("beforeInit", () => {
					c.params.lazy.enabled && c.params.preloadImages && (c.params.preloadImages = !1);
				}),
					s("init", () => {
						c.params.lazy.enabled && (c.params.lazy.checkInView ? h : l)();
					}),
					s("scroll", () => {
						c.params.freeMode && c.params.freeMode.enabled && !c.params.freeMode.sticky && l();
					}),
					s("scrollbarDragMove resize _freeModeNoMomentumRelease", () => {
						c.params.lazy.enabled && (c.params.lazy.checkInView ? h : l)();
					}),
					s("transitionStart", () => {
						c.params.lazy.enabled && (c.params.lazy.loadOnTransitionStart || (!c.params.lazy.loadOnTransitionStart && !d)) && (c.params.lazy.checkInView ? h : l)();
					}),
					s("transitionEnd", () => {
						c.params.lazy.enabled && !c.params.lazy.loadOnTransitionStart && (c.params.lazy.checkInView ? h : l)();
					}),
					s("slideChange", () => {
						var { lazy: e, cssMode: t, watchSlidesProgress: s, touchReleaseOnEdges: i, resistanceRatio: a } = c.params;
						e.enabled && (t || (s && (i || 0 === a))) && l();
					}),
					s("destroy", () => {
						c.$el && c.$el.find("." + c.params.lazy.loadingClass).removeClass(c.params.lazy.loadingClass);
					}),
					Object.assign(c.lazy, { load: l, loadInSlide: u });
			},
			function (e) {
				let { swiper: o, extendParams: t, on: s } = e;
				function l(e, t) {
					const s = (function () {
						let s, i, a;
						return (e, t) => {
							for (i = -1, s = e.length; 1 < s - i; ) e[(a = (s + i) >> 1)] <= t ? (i = a) : (s = a);
							return s;
						};
					})();
					let i, a;
					return (
						(this.x = e),
						(this.y = t),
						(this.lastIndex = e.length - 1),
						(this.interpolate = function (e) {
							return e ? ((a = s(this.x, e)), (i = a - 1), ((e - this.x[i]) * (this.y[a] - this.y[i])) / (this.x[a] - this.x[i]) + this.y[i]) : 0;
						}),
						this
					);
				}
				function i() {
					o.controller.control && o.controller.spline && ((o.controller.spline = void 0), delete o.controller.spline);
				}
				t({ controller: { control: void 0, inverse: !1, by: "slide" } }),
					(o.controller = { control: void 0 }),
					s("beforeInit", () => {
						o.controller.control = o.params.controller.control;
					}),
					s("update", () => {
						i();
					}),
					s("resize", () => {
						i();
					}),
					s("observerUpdate", () => {
						i();
					}),
					s("setTranslate", (e, t, s) => {
						o.controller.control && o.controller.setTranslate(t, s);
					}),
					s("setTransition", (e, t, s) => {
						o.controller.control && o.controller.setTransition(t, s);
					}),
					Object.assign(o.controller, {
						setTranslate: function (e, t) {
							var s = o.controller.control;
							let i, a;
							var r = o.constructor;
							function n(e) {
								var t,
									s = o.rtlTranslate ? -o.translate : o.translate;
								"slide" === o.params.controller.by && ((t = e), o.controller.spline || (o.controller.spline = o.params.loop ? new l(o.slidesGrid, t.slidesGrid) : new l(o.snapGrid, t.snapGrid)), (a = -o.controller.spline.interpolate(-s))), (a && "container" !== o.params.controller.by) || ((i = (e.maxTranslate() - e.minTranslate()) / (o.maxTranslate() - o.minTranslate())), (a = (s - o.minTranslate()) * i + e.minTranslate())), o.params.controller.inverse && (a = e.maxTranslate() - a), e.updateProgress(a), e.setTranslate(a, o), e.updateActiveIndex(), e.updateSlidesClasses();
							}
							if (Array.isArray(s)) for (let e = 0; e < s.length; e += 1) s[e] !== t && s[e] instanceof r && n(s[e]);
							else s instanceof r && t !== s && n(s);
						},
						setTransition: function (t, e) {
							const s = o.constructor,
								i = o.controller.control;
							let a;
							function r(e) {
								e.setTransition(t, o),
									0 !== t &&
										(e.transitionStart(),
										e.params.autoHeight &&
											C(() => {
												e.updateAutoHeight();
											}),
										e.$wrapperEl.transitionEnd(() => {
											i && (e.params.loop && "slide" === o.params.controller.by && e.loopFix(), e.transitionEnd());
										}));
							}
							if (Array.isArray(i)) for (a = 0; a < i.length; a += 1) i[a] !== e && i[a] instanceof s && r(i[a]);
							else i instanceof s && e !== i && r(i);
						},
					});
			},
			function (e) {
				let { swiper: n, extendParams: t, on: s } = e,
					o = (t({ a11y: { enabled: !0, notificationClass: "swiper-notification", prevSlideMessage: "Previous slide", nextSlideMessage: "Next slide", firstSlideMessage: "This is the first slide", lastSlideMessage: "This is the last slide", paginationBulletMessage: "Go to slide {{index}}", slideLabelMessage: "{{index}} / {{slidesLength}}", containerMessage: null, containerRoleDescriptionMessage: null, itemRoleDescriptionMessage: null, slideRole: "group", id: null } }), null);
				function i(e) {
					var t = o;
					0 !== t.length && (t.html(""), t.html(e));
				}
				function a(e) {
					e.attr("tabIndex", "0");
				}
				function r(e) {
					e.attr("tabIndex", "-1");
				}
				function l(e, t) {
					e.attr("role", t);
				}
				function d(e, t) {
					e.attr("aria-roledescription", t);
				}
				function c(e, t) {
					e.attr("aria-label", t);
				}
				function p(e) {
					e.attr("aria-disabled", !0);
				}
				function u(e) {
					e.attr("aria-disabled", !1);
				}
				function h(e) {
					var t;
					(13 !== e.keyCode && 32 !== e.keyCode) || ((t = n.params.a11y), (e = P(e.target)), n.navigation && n.navigation.$nextEl && e.is(n.navigation.$nextEl) && ((n.isEnd && !n.params.loop) || n.slideNext(), n.isEnd ? i(t.lastSlideMessage) : i(t.nextSlideMessage)), n.navigation && n.navigation.$prevEl && e.is(n.navigation.$prevEl) && ((n.isBeginning && !n.params.loop) || n.slidePrev(), n.isBeginning ? i(t.firstSlideMessage) : i(t.prevSlideMessage)), n.pagination && e.is(M(n.params.pagination.bulletClass)) && e[0].click());
				}
				function m() {
					return n.pagination && n.pagination.bullets && n.pagination.bullets.length;
				}
				function f() {
					return m() && n.params.pagination.clickable;
				}
				const g = (e, t, s) => {
						a(e), "BUTTON" !== e[0].tagName && (l(e, "button"), e.on("keydown", h)), c(e, s), e.attr("aria-controls", t);
					},
					v = (e) => {
						var t,
							s,
							e = e.target.closest("." + n.params.slideClass);
						e && n.slides.includes(e) && ((t = n.slides.indexOf(e) === n.activeIndex), (s = n.params.watchSlidesProgress && n.visibleSlides && n.visibleSlides.includes(e)), t || s || (n.isHorizontal() ? (n.el.scrollLeft = 0) : (n.el.scrollTop = 0), n.slideTo(n.slides.indexOf(e), 0)));
					},
					b = () => {
						const s = n.params.a11y,
							i = (s.itemRoleDescriptionMessage && d(P(n.slides), s.itemRoleDescriptionMessage), s.slideRole && l(P(n.slides), s.slideRole), (n.params.loop ? n.slides.filter((e) => !e.classList.contains(n.params.slideDuplicateClass)) : n.slides).length);
						s.slideLabelMessage &&
							n.slides.each((e, t) => {
								(e = P(e)), (t = n.params.loop ? parseInt(e.attr("data-swiper-slide-index"), 10) : t);
								c(e, s.slideLabelMessage.replace(/\{\{index\}\}/, t + 1).replace(/\{\{slidesLength\}\}/, i));
							});
					};
				s("beforeInit", () => {
					o = P(`<span class="${n.params.a11y.notificationClass}" aria-live="assertive" aria-atomic="true"></span>`);
				}),
					s("afterInit", () => {
						if (n.params.a11y.enabled) {
							var s = n.params.a11y,
								i = (n.$el.append(o), n.$el),
								i = (s.containerRoleDescriptionMessage && d(i, s.containerRoleDescriptionMessage), s.containerMessage && c(i, s.containerMessage), n.$wrapperEl),
								a = s.id || i.attr("id") || "swiper-wrapper-" + "x".repeat((a = void 0 === (a = 16) ? 16 : a)).replace(/x/g, () => Math.round(16 * Math.random()).toString(16)),
								r = n.params.autoplay && n.params.autoplay.enabled ? "off" : "polite";
							let e, t;
							i.attr("id", a), i.attr("aria-live", r), b(), n.navigation && n.navigation.$nextEl && (e = n.navigation.$nextEl), n.navigation && n.navigation.$prevEl && (t = n.navigation.$prevEl), e && e.length && g(e, a, s.nextSlideMessage), t && t.length && g(t, a, s.prevSlideMessage), f() && n.pagination.$el.on("keydown", M(n.params.pagination.bulletClass), h), n.$el.on("focus", v, !0);
						}
					}),
					s("slidesLengthChange snapGridLengthChange slidesGridLengthChange", () => {
						n.params.a11y.enabled && b();
					}),
					s("fromEdge toEdge afterInit lock unlock", () => {
						var e, t;
						n.params.a11y.enabled && !n.params.loop && !n.params.rewind && n.navigation && (({ $nextEl: e, $prevEl: t } = n.navigation), t && 0 < t.length && (n.isBeginning ? (p(t), r) : (u(t), a))(t), e && 0 < e.length) && (n.isEnd ? (p(e), r) : (u(e), a))(e);
					}),
					s("paginationUpdate", () => {
						if (n.params.a11y.enabled) {
							const t = n.params.a11y;
							m() &&
								n.pagination.bullets.each((e) => {
									e = P(e);
									n.params.pagination.clickable && (a(e), n.params.pagination.renderBullet || (l(e, "button"), c(e, t.paginationBulletMessage.replace(/\{\{index\}\}/, e.index() + 1)))), e.is("." + n.params.pagination.bulletActiveClass) ? e.attr("aria-current", "true") : e.removeAttr("aria-current");
								});
						}
					}),
					s("destroy", () => {
						if (n.params.a11y.enabled) {
							let e, t;
							o && 0 < o.length && o.remove(), n.navigation && n.navigation.$nextEl && (e = n.navigation.$nextEl), n.navigation && n.navigation.$prevEl && (t = n.navigation.$prevEl), e && e.off("keydown", h), t && t.off("keydown", h), f() && n.pagination.$el.off("keydown", M(n.params.pagination.bulletClass), h), n.$el.off("focus", v, !0);
						}
					});
			},
			function (e) {
				let { swiper: n, extendParams: t, on: s } = e,
					r = (t({ history: { enabled: !1, root: "", replaceState: !1, key: "slides", keepQuery: !1 } }), !1),
					i = {};
				const o = (e) =>
						e
							.toString()
							.replace(/\s+/g, "-")
							.replace(/[^\w-]+/g, "")
							.replace(/--+/g, "-")
							.replace(/^-+/, "")
							.replace(/-+$/, ""),
					a = (e) => {
						var t = O(),
							e = (e ? new URL(e) : t.location).pathname
								.slice(1)
								.split("/")
								.filter((e) => "" !== e),
							t = e.length;
						return { key: e[t - 2], value: e[t - 1] };
					},
					l = (s, e) => {
						var i = O();
						if (r && n.params.history.enabled) {
							var a = n.params.url ? new URL(n.params.url) : i.location,
								e = n.slides.eq(e);
							let t = o(e.attr("data-history"));
							if (0 < n.params.history.root.length) {
								let e = n.params.history.root;
								"/" === e[e.length - 1] && (e = e.slice(0, e.length - 1)), (t = e + `/${s}/` + t);
							} else a.pathname.includes(s) || (t = s + "/" + t);
							n.params.history.keepQuery && (t += a.search);
							e = i.history.state;
							(e && e.value === t) || (n.params.history.replaceState ? i.history.replaceState({ value: t }, null, t) : i.history.pushState({ value: t }, null, t));
						}
					},
					d = (s, i, a) => {
						if (i)
							for (let e = 0, t = n.slides.length; e < t; e += 1) {
								var r = n.slides.eq(e);
								if (o(r.attr("data-history")) === i && !r.hasClass(n.params.slideDuplicateClass)) {
									const i = r.index();
									n.slideTo(i, s, a);
								}
							}
						else n.slideTo(0, s, a);
					},
					c = () => {
						(i = a(n.params.url)), d(n.params.speed, i.value, !1);
					};
				s("init", () => {
					var e;
					n.params.history.enabled && ((e = O()), n.params.history) && (e.history && e.history.pushState ? ((r = !0), ((i = a(n.params.url)).key || i.value) && (d(0, i.value, n.params.runCallbacksOnInit), n.params.history.replaceState || e.addEventListener("popstate", c))) : ((n.params.history.enabled = !1), (n.params.hashNavigation.enabled = !0)));
				}),
					s("destroy", () => {
						var e;
						n.params.history.enabled && ((e = O()), n.params.history.replaceState || e.removeEventListener("popstate", c));
					}),
					s("transitionEnd _freeModeNoMomentumRelease", () => {
						r && l(n.params.history.key, n.activeIndex);
					}),
					s("slideChange", () => {
						r && n.params.cssMode && l(n.params.history.key, n.activeIndex);
					});
			},
			function (e) {
				let { swiper: a, extendParams: t, emit: s, on: i } = e,
					r = !1;
				const n = T(),
					o = O(),
					l =
						(t({ hashNavigation: { enabled: !1, replaceState: !1, watchState: !1 } }),
						() => {
							s("hashChange");
							var e = n.location.hash.replace("#", "");
							e !== a.slides.eq(a.activeIndex).attr("data-hash") && void 0 !== (e = a.$wrapperEl.children(`.${a.params.slideClass}[data-hash="${e}"]`).index()) && a.slideTo(e);
						}),
					d = () => {
						var e;
						r && a.params.hashNavigation.enabled && (a.params.hashNavigation.replaceState && o.history && o.history.replaceState ? o.history.replaceState(null, null, "#" + a.slides.eq(a.activeIndex).attr("data-hash") || "") : ((e = (e = a.slides.eq(a.activeIndex)).attr("data-hash") || e.attr("data-history")), (n.location.hash = e || "")), s("hashSet"));
					};
				i("init", () => {
					if (a.params.hashNavigation.enabled && !(!a.params.hashNavigation.enabled || (a.params.history && a.params.history.enabled))) {
						r = !0;
						const i = n.location.hash.replace("#", "");
						if (i)
							for (let e = 0, t = a.slides.length; e < t; e += 1) {
								var s = a.slides.eq(e);
								if ((s.attr("data-hash") || s.attr("data-history")) === i && !s.hasClass(a.params.slideDuplicateClass)) {
									const i = s.index();
									a.slideTo(i, 0, a.params.runCallbacksOnInit, !0);
								}
							}
						a.params.hashNavigation.watchState && P(o).on("hashchange", l);
					}
				}),
					i("destroy", () => {
						a.params.hashNavigation.enabled && a.params.hashNavigation.watchState && P(o).off("hashchange", l);
					}),
					i("transitionEnd _freeModeNoMomentumRelease", () => {
						r && d();
					}),
					i("slideChange", () => {
						r && a.params.cssMode && d();
					});
			},
			function (e) {
				let s,
					{ swiper: i, extendParams: t, on: a, emit: r } = e;
				function n() {
					if (i.size) {
						var t = i.slides.eq(i.activeIndex);
						let e = i.params.autoplay.delay;
						t.attr("data-swiper-autoplay") && (e = t.attr("data-swiper-autoplay") || i.params.autoplay.delay),
							clearTimeout(s),
							(s = C(() => {
								let e;
								i.params.autoplay.reverseDirection ? (i.params.loop ? (i.loopFix(), (e = i.slidePrev(i.params.speed, !0, !0)), r("autoplay")) : i.isBeginning ? (i.params.autoplay.stopOnLastSlide ? l() : ((e = i.slideTo(i.slides.length - 1, i.params.speed, !0, !0)), r("autoplay"))) : ((e = i.slidePrev(i.params.speed, !0, !0)), r("autoplay"))) : i.params.loop ? (i.loopFix(), (e = i.slideNext(i.params.speed, !0, !0)), r("autoplay")) : i.isEnd ? (i.params.autoplay.stopOnLastSlide ? l() : ((e = i.slideTo(0, i.params.speed, !0, !0)), r("autoplay"))) : ((e = i.slideNext(i.params.speed, !0, !0)), r("autoplay")), ((i.params.cssMode && i.autoplay.running) || !1 === e) && n();
							}, e));
					} else (i.autoplay.running = !1), (i.autoplay.paused = !1);
				}
				function o() {
					return void 0 === s && !i.autoplay.running && ((i.autoplay.running = !0), r("autoplayStart"), n(), !0);
				}
				function l() {
					return !!i.autoplay.running && void 0 !== s && (s && (clearTimeout(s), (s = void 0)), (i.autoplay.running = !1), r("autoplayStop"), !0);
				}
				function d(e) {
					!i.autoplay.running ||
						i.autoplay.paused ||
						(s && clearTimeout(s),
						(i.autoplay.paused = !0),
						0 !== e && i.params.autoplay.waitForTransition
							? ["transitionend", "webkitTransitionEnd"].forEach((e) => {
									i.$wrapperEl[0].addEventListener(e, p);
							  })
							: ((i.autoplay.paused = !1), n()));
				}
				function c() {
					var e = T();
					"hidden" === e.visibilityState && i.autoplay.running && d(), "visible" === e.visibilityState && i.autoplay.paused && (n(), (i.autoplay.paused = !1));
				}
				function p(e) {
					i &&
						!i.destroyed &&
						i.$wrapperEl &&
						e.target === i.$wrapperEl[0] &&
						(["transitionend", "webkitTransitionEnd"].forEach((e) => {
							i.$wrapperEl[0].removeEventListener(e, p);
						}),
						(i.autoplay.paused = !1),
						(i.autoplay.running ? n : l)());
				}
				function u() {
					(i.params.autoplay.disableOnInteraction ? l : (r("autoplayPause"), d))(),
						["transitionend", "webkitTransitionEnd"].forEach((e) => {
							i.$wrapperEl[0].removeEventListener(e, p);
						});
				}
				function h() {
					i.params.autoplay.disableOnInteraction || ((i.autoplay.paused = !1), r("autoplayResume"), n());
				}
				(i.autoplay = { running: !1, paused: !1 }),
					t({ autoplay: { enabled: !1, delay: 3e3, waitForTransition: !0, disableOnInteraction: !0, stopOnLastSlide: !1, reverseDirection: !1, pauseOnMouseEnter: !1 } }),
					a("init", () => {
						i.params.autoplay.enabled && (o(), T().addEventListener("visibilitychange", c), i.params.autoplay.pauseOnMouseEnter) && (i.$el.on("mouseenter", u), i.$el.on("mouseleave", h));
					}),
					a("beforeTransitionStart", (e, t, s) => {
						i.autoplay.running && (s || !i.params.autoplay.disableOnInteraction ? i.autoplay.pause(t) : l());
					}),
					a("sliderFirstMove", () => {
						i.autoplay.running && (i.params.autoplay.disableOnInteraction ? l : d)();
					}),
					a("touchEnd", () => {
						i.params.cssMode && i.autoplay.paused && !i.params.autoplay.disableOnInteraction && n();
					}),
					a("destroy", () => {
						i.$el.off("mouseenter", u), i.$el.off("mouseleave", h), i.autoplay.running && l(), T().removeEventListener("visibilitychange", c);
					}),
					Object.assign(i.autoplay, { pause: d, run: n, start: o, stop: l });
			},
			function (e) {
				let { swiper: l, extendParams: t, on: s } = e,
					i = (t({ thumbs: { swiper: null, multipleActiveThumbs: !0, autoScrollOffset: 0, slideThumbActiveClass: "swiper-slide-thumb-active", thumbsContainerClass: "swiper-thumbs" } }), !1),
					a = !1;
				function r() {
					var e = l.thumbs.swiper;
					if (e && !e.destroyed) {
						const s = e.clickedIndex,
							i = e.clickedSlide;
						if (!((i && P(i).hasClass(l.params.thumbs.slideThumbActiveClass)) || null == s)) {
							let t;
							if (((t = e.params.loop ? parseInt(P(e.clickedSlide).attr("data-swiper-slide-index"), 10) : s), l.params.loop)) {
								let e = l.activeIndex;
								l.slides.eq(e).hasClass(l.params.slideDuplicateClass) && (l.loopFix(), (l._clientLeft = l.$wrapperEl[0].clientLeft), (e = l.activeIndex));
								const s = l.slides.eq(e).prevAll(`[data-swiper-slide-index="${t}"]`).eq(0).index(),
									i = l.slides.eq(e).nextAll(`[data-swiper-slide-index="${t}"]`).eq(0).index();
								t = void 0 === s || (void 0 !== i && i - e < e - s) ? i : s;
							}
							l.slideTo(t);
						}
					}
				}
				function n() {
					var e = l.params["thumbs"];
					if (i) return !1;
					i = !0;
					var t = l.constructor;
					return e.swiper instanceof t ? ((l.thumbs.swiper = e.swiper), Object.assign(l.thumbs.swiper.originalParams, { watchSlidesProgress: !0, slideToClickedSlide: !1 }), Object.assign(l.thumbs.swiper.params, { watchSlidesProgress: !0, slideToClickedSlide: !1 })) : d(e.swiper) && ((e = Object.assign({}, e.swiper)), Object.assign(e, { watchSlidesProgress: !0, slideToClickedSlide: !1 }), (l.thumbs.swiper = new t(e)), (a = !0)), l.thumbs.swiper.$el.addClass(l.params.thumbs.thumbsContainerClass), l.thumbs.swiper.on("tap", r), !0;
				}
				function o(i) {
					var a = l.thumbs.swiper;
					if (a && !a.destroyed) {
						const o = "auto" === a.params.slidesPerView ? a.slidesPerViewDynamic() : a.params.slidesPerView;
						let t = 1;
						var s = l.params.thumbs.slideThumbActiveClass;
						if ((1 < l.params.slidesPerView && !l.params.centeredSlides && (t = l.params.slidesPerView), l.params.thumbs.multipleActiveThumbs || (t = 1), (t = Math.floor(t)), a.slides.removeClass(s), a.params.loop || (a.params.virtual && a.params.virtual.enabled))) for (let e = 0; e < t; e += 1) a.$wrapperEl.children(`[data-swiper-slide-index="${l.realIndex + e}"]`).addClass(s);
						else for (let e = 0; e < t; e += 1) a.slides.eq(l.realIndex + e).addClass(s);
						var r = l.params.thumbs.autoScrollOffset,
							n = r && !a.params.loop;
						if (l.realIndex !== a.realIndex || n) {
							let e,
								t,
								s = a.activeIndex;
							if (a.params.loop) {
								a.slides.eq(s).hasClass(a.params.slideDuplicateClass) && (a.loopFix(), (a._clientLeft = a.$wrapperEl[0].clientLeft), (s = a.activeIndex));
								const i = a.slides.eq(s).prevAll(`[data-swiper-slide-index="${l.realIndex}"]`).eq(0).index(),
									o = a.slides.eq(s).nextAll(`[data-swiper-slide-index="${l.realIndex}"]`).eq(0).index();
								(e = void 0 === i ? o : void 0 === o ? i : o - s == s - i ? (1 < a.params.slidesPerGroup ? o : s) : o - s < s - i ? o : i), (t = l.activeIndex > l.previousIndex ? "next" : "prev");
							} else (e = l.realIndex), (t = e > l.previousIndex ? "next" : "prev");
							n && (e += "next" === t ? r : -1 * r), a.visibleSlidesIndexes && a.visibleSlidesIndexes.indexOf(e) < 0 && (a.params.centeredSlides ? (e = e > s ? e - Math.floor(o / 2) + 1 : e + Math.floor(o / 2) - 1) : e > s && a.params.slidesPerGroup, a.slideTo(e, i ? 0 : void 0));
						}
					}
				}
				(l.thumbs = { swiper: null }),
					s("beforeInit", () => {
						var e = l.params["thumbs"];
						e && e.swiper && (n(), o(!0));
					}),
					s("slideChange update resize observerUpdate", () => {
						o();
					}),
					s("setTransition", (e, t) => {
						var s = l.thumbs.swiper;
						s && !s.destroyed && s.setTransition(t);
					}),
					s("beforeDestroy", () => {
						var e = l.thumbs.swiper;
						e && !e.destroyed && a && e.destroy();
					}),
					Object.assign(l.thumbs, { init: n, update: o });
			},
			function (e) {
				let { swiper: u, extendParams: t, emit: h, once: m } = e;
				t({ freeMode: { enabled: !1, momentum: !0, momentumRatio: 1, momentumBounce: !0, momentumBounceRatio: 1, momentumVelocityRatio: 1, sticky: !1, minimumVelocity: 0.02 } }),
					Object.assign(u, {
						freeMode: {
							onTouchStart: function () {
								var e = u.getTranslate();
								u.setTranslate(e), u.setTransition(0), (u.touchEventsData.velocities.length = 0), u.freeMode.onTouchEnd({ currentPos: u.rtl ? u.translate : -u.translate });
							},
							onTouchMove: function () {
								var { touchEventsData: e, touches: t } = u;
								0 === e.velocities.length && e.velocities.push({ position: t[u.isHorizontal() ? "startX" : "startY"], time: e.touchStartTime }), e.velocities.push({ position: t[u.isHorizontal() ? "currentX" : "currentY"], time: v() });
							},
							onTouchEnd: function (r) {
								let n = r["currentPos"];
								const { params: o, $wrapperEl: l, rtlTranslate: d, snapGrid: c, touchEventsData: p } = u,
									e = v() - p.touchStartTime;
								if (n < -u.minTranslate()) u.slideTo(u.activeIndex);
								else if (n > -u.maxTranslate()) u.slides.length < c.length ? u.slideTo(c.length - 1) : u.slideTo(u.slides.length - 1);
								else {
									if (o.freeMode.momentum) {
										if (1 < p.velocities.length) {
											const r = p.velocities.pop(),
												n = p.velocities.pop(),
												h = r.position - n.position,
												m = r.time - n.time;
											(u.velocity = h / m), (u.velocity /= 2), Math.abs(u.velocity) < o.freeMode.minimumVelocity && (u.velocity = 0), (150 < m || 300 < v() - r.time) && (u.velocity = 0);
										} else u.velocity = 0;
										(u.velocity *= o.freeMode.momentumVelocityRatio), (p.velocities.length = 0);
										let e = 1e3 * o.freeMode.momentumRatio;
										const n = u.velocity * e;
										let s = u.translate + n;
										d && (s = -s);
										let t,
											i = !1;
										r = 20 * Math.abs(u.velocity) * o.freeMode.momentumBounceRatio;
										let a;
										if (s < u.maxTranslate()) o.freeMode.momentumBounce ? (s + u.maxTranslate() < -r && (s = u.maxTranslate() - r), (t = u.maxTranslate()), (i = !0), (p.allowMomentumBounce = !0)) : (s = u.maxTranslate()), o.loop && o.centeredSlides && (a = !0);
										else if (s > u.minTranslate()) o.freeMode.momentumBounce ? (s - u.minTranslate() > r && (s = u.minTranslate() + r), (t = u.minTranslate()), (i = !0), (p.allowMomentumBounce = !0)) : (s = u.minTranslate()), o.loop && o.centeredSlides && (a = !0);
										else if (o.freeMode.sticky) {
											let t;
											for (let e = 0; e < c.length; e += 1)
												if (c[e] > -s) {
													t = e;
													break;
												}
											s = -(s = Math.abs(c[t] - s) < Math.abs(c[t - 1] - s) || "next" === u.swipeDirection ? c[t] : c[t - 1]);
										}
										if (
											(a &&
												m("transitionEnd", () => {
													u.loopFix();
												}),
											0 !== u.velocity)
										) {
											if (((e = d ? Math.abs((-s - u.translate) / u.velocity) : Math.abs((s - u.translate) / u.velocity)), o.freeMode.sticky)) {
												const n = Math.abs((d ? -s : s) - u.translate),
													h = u.slidesSizesGrid[u.activeIndex];
												e = n < h ? o.speed : n < 2 * h ? 1.5 * o.speed : 2.5 * o.speed;
											}
										} else if (o.freeMode.sticky) return void u.slideToClosest();
										o.freeMode.momentumBounce && i
											? (u.updateProgress(t),
											  u.setTransition(e),
											  u.setTranslate(s),
											  u.transitionStart(!0, u.swipeDirection),
											  (u.animating = !0),
											  l.transitionEnd(() => {
													u &&
														!u.destroyed &&
														p.allowMomentumBounce &&
														(h("momentumBounce"),
														u.setTransition(o.speed),
														setTimeout(() => {
															u.setTranslate(t),
																l.transitionEnd(() => {
																	u && !u.destroyed && u.transitionEnd();
																});
														}, 0));
											  }))
											: u.velocity
											? (h("_freeModeNoMomentumRelease"),
											  u.updateProgress(s),
											  u.setTransition(e),
											  u.setTranslate(s),
											  u.transitionStart(!0, u.swipeDirection),
											  u.animating ||
													((u.animating = !0),
													l.transitionEnd(() => {
														u && !u.destroyed && u.transitionEnd();
													})))
											: u.updateProgress(s),
											u.updateActiveIndex(),
											u.updateSlidesClasses();
									} else {
										if (o.freeMode.sticky) return void u.slideToClosest();
										o.freeMode && h("_freeModeNoMomentumRelease");
									}
									(!o.freeMode.momentum || e >= o.longSwipesMs) && (u.updateProgress(), u.updateActiveIndex(), u.updateSlidesClasses());
								}
							},
						},
					});
			},
			function (e) {
				let p,
					u,
					h,
					{ swiper: m, extendParams: t } = e;
				t({ grid: { rows: 1, fill: "column" } }),
					(m.grid = {
						initSlides: (e) => {
							var t = m.params["slidesPerView"],
								{ rows: s, fill: i } = m.params.grid;
							(u = p / s), (h = Math.floor(e / s)), (p = Math.floor(e / s) === e / s ? e : Math.ceil(e / s) * s), "auto" !== t && "row" === i && (p = Math.max(p, t * s));
						},
						updateSlide: (e, t, s, i) => {
							var { slidesPerGroup: a, spaceBetween: r } = m.params,
								{ rows: n, fill: o } = m.params.grid;
							let l, d, c;
							if ("row" === o && 1 < a) {
								const u = Math.floor(e / (a * n)),
									h = e - n * a * u,
									m = 0 === u ? a : Math.min(Math.ceil((s - u * n * a) / n), a);
								(c = Math.floor(h / m)), (l = (d = h - c * m + u * a) + (c * p) / n), t.css({ "-webkit-order": l, order: l });
							} else "column" === o ? ((d = Math.floor(e / n)), (c = e - d * n), (d > h || (d === h && c === n - 1)) && (c += 1) >= n && ((c = 0), (d += 1))) : ((c = Math.floor(e / u)), (d = e - c * u));
							t.css(i("margin-top"), 0 !== c ? r && r + "px" : "");
						},
						updateWrapperSize: (s, i, e) => {
							var { spaceBetween: t, centeredSlides: a, roundLengths: r } = m.params,
								n = m.params.grid["rows"];
							if (((m.virtualSize = (s + t) * p), (m.virtualSize = Math.ceil(m.virtualSize / n) - t), m.$wrapperEl.css({ [e("width")]: m.virtualSize + t + "px" }), a)) {
								i.splice(0, i.length);
								const s = [];
								for (let t = 0; t < i.length; t += 1) {
									let e = i[t];
									r && (e = Math.floor(e)), i[t] < m.virtualSize + i[0] && s.push(e);
								}
								i.push(...s);
							}
						},
					});
			},
			function (e) {
				e = e.swiper;
				Object.assign(e, {
					appendSlide: function (t) {
						var { $wrapperEl: s, params: e } = this;
						if ((e.loop && this.loopDestroy(), "object" == typeof t && "length" in t)) for (let e = 0; e < t.length; e += 1) t[e] && s.append(t[e]);
						else s.append(t);
						e.loop && this.loopCreate(), e.observer || this.update();
					}.bind(e),
					prependSlide: function (t) {
						var e = this,
							{ params: s, $wrapperEl: i, activeIndex: a } = e;
						s.loop && e.loopDestroy();
						let r = a + 1;
						if ("object" == typeof t && "length" in t) {
							for (let e = 0; e < t.length; e += 1) t[e] && i.prepend(t[e]);
							r = a + t.length;
						} else i.prepend(t);
						s.loop && e.loopCreate(), s.observer || e.update(), e.slideTo(r, 0, !1);
					}.bind(e),
					addSlide: function (t, s) {
						var i = this,
							{ $wrapperEl: a, params: r, activeIndex: n } = i;
						let o = n;
						if ((r.loop && ((o -= i.loopedSlides), i.loopDestroy(), (i.slides = a.children("." + r.slideClass))), (n = i.slides.length), t <= 0)) i.prependSlide(s);
						else if (n <= t) i.appendSlide(s);
						else {
							let e = o > t ? o + 1 : o;
							var l = [];
							for (let e = n - 1; e >= t; --e) {
								const t = i.slides.eq(e);
								t.remove(), l.unshift(t);
							}
							if ("object" == typeof s && "length" in s) {
								for (let e = 0; e < s.length; e += 1) s[e] && a.append(s[e]);
								e = o > t ? o + s.length : o;
							} else a.append(s);
							for (let e = 0; e < l.length; e += 1) a.append(l[e]);
							r.loop && i.loopCreate(), r.observer || i.update(), r.loop ? i.slideTo(e + i.loopedSlides, 0, !1) : i.slideTo(e, 0, !1);
						}
					}.bind(e),
					removeSlide: function (t) {
						var s = this,
							{ params: e, $wrapperEl: i, activeIndex: a } = s;
						let r = a;
						e.loop && ((r -= s.loopedSlides), s.loopDestroy(), (s.slides = i.children("." + e.slideClass)));
						let n,
							o = r;
						if ("object" == typeof t && "length" in t) for (let e = 0; e < t.length; e += 1) (n = t[e]), s.slides[n] && s.slides.eq(n).remove(), n < o && --o;
						else (n = t), s.slides[n] && s.slides.eq(n).remove(), n < o && --o;
						(o = Math.max(o, 0)), e.loop && s.loopCreate(), e.observer || s.update(), e.loop ? s.slideTo(o + s.loopedSlides, 0, !1) : s.slideTo(o, 0, !1);
					}.bind(e),
					removeAllSlides: function () {
						var t = [];
						for (let e = 0; e < this.slides.length; e += 1) t.push(e);
						this.removeSlide(t);
					}.bind(e),
				});
			},
			function (e) {
				let { swiper: n, extendParams: t, on: s } = e;
				t({ fadeEffect: { crossFade: !1, transformEl: null } }),
					A({
						effect: "fade",
						swiper: n,
						on: s,
						setTranslate: () => {
							const i = n["slides"],
								a = n.params.fadeEffect;
							for (let s = 0; s < i.length; s += 1) {
								const i = n.slides.eq(s);
								let e = -i[0].swiperSlideOffset,
									t = (n.params.virtualTranslate || (e -= n.translate), 0);
								n.isHorizontal() || ((t = e), (e = 0));
								var r = n.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(i[0].progress), 0) : 1 + Math.min(Math.max(i[0].progress, -1), 0);
								k(a, i).css({ opacity: r }).transform(`translate3d(${e}px, ${t}px, 0px)`);
							}
						},
						setTransition: (e) => {
							var t = n.params.fadeEffect["transformEl"];
							(t ? n.slides.find(t) : n.slides).transition(e), I({ swiper: n, duration: e, transformEl: t, allSlides: !0 });
						},
						overwriteParams: () => ({ slidesPerView: 1, slidesPerGroup: 1, watchSlidesProgress: !0, spaceBetween: 0, virtualTranslate: !n.params.cssMode }),
					});
			},
			function (e) {
				let { swiper: f, extendParams: t, on: s } = e;
				t({ cubeEffect: { slideShadows: !0, shadow: !0, shadowOffset: 20, shadowScale: 0.94 } });
				const g = (e, t, s) => {
					let i = s ? e.find(".swiper-slide-shadow-left") : e.find(".swiper-slide-shadow-top"),
						a = s ? e.find(".swiper-slide-shadow-right") : e.find(".swiper-slide-shadow-bottom");
					0 === i.length && ((i = P(`<div class="swiper-slide-shadow-${s ? "left" : "top"}"></div>`)), e.append(i)), 0 === a.length && ((a = P(`<div class="swiper-slide-shadow-${s ? "right" : "bottom"}"></div>`)), e.append(a)), i.length && (i[0].style.opacity = Math.max(-t, 0)), a.length && (a[0].style.opacity = Math.max(t, 0));
				};
				A({
					effect: "cube",
					swiper: f,
					on: s,
					setTranslate: () => {
						const { $el: e, $wrapperEl: t, slides: o, width: s, height: i, rtlTranslate: l, size: d, browser: a } = f,
							c = f.params.cubeEffect,
							p = f.isHorizontal(),
							u = f.virtual && f.params.virtual.enabled;
						let r,
							h = 0;
						c.shadow && (p ? (0 === (r = t.find(".swiper-cube-shadow")).length && ((r = P('<div class="swiper-cube-shadow"></div>')), t.append(r)), r.css({ height: s + "px" })) : 0 === (r = e.find(".swiper-cube-shadow")).length && ((r = P('<div class="swiper-cube-shadow"></div>')), e.append(r)));
						for (let n = 0; n < o.length; n += 1) {
							const f = o.eq(n);
							let e = n,
								t = 90 * (e = u ? parseInt(f.attr("data-swiper-slide-index"), 10) : e),
								s = Math.floor(t / 360);
							l && ((t = -t), (s = Math.floor(-t / 360)));
							const P = Math.max(Math.min(f[0].progress, 1), -1);
							let i = 0,
								a = 0,
								r = 0;
							e % 4 == 0 ? ((i = 4 * -s * d), (r = 0)) : (e - 1) % 4 == 0 ? ((i = 0), (r = 4 * -s * d)) : (e - 2) % 4 == 0 ? ((i = d + 4 * s * d), (r = d)) : (e - 3) % 4 == 0 && ((i = -d), (r = 3 * d + 4 * d * s)), l && (i = -i), p || ((a = i), (i = 0));
							var m = `rotateX(${p ? 0 : -t}deg) rotateY(${p ? t : 0}deg) translate3d(${i}px, ${a}px, ${r}px)`;
							P <= 1 && -1 < P && ((h = 90 * e + 90 * P), l) && (h = 90 * -e - 90 * P), f.transform(m), c.slideShadows && g(f, P, p);
						}
						if ((t.css({ "-webkit-transform-origin": `50% 50% -${d / 2}px`, "transform-origin": `50% 50% -${d / 2}px` }), c.shadow))
							if (p) r.transform(`translate3d(0px, ${s / 2 + c.shadowOffset}px, ${-s / 2}px) rotateX(90deg) rotateZ(0deg) scale(${c.shadowScale})`);
							else {
								const e = Math.abs(h) - 90 * Math.floor(Math.abs(h) / 90),
									f = 1.5 - (Math.sin((2 * e * Math.PI) / 360) / 2 + Math.cos((2 * e * Math.PI) / 360) / 2),
									t = c.shadowScale,
									o = c.shadowScale / f,
									g = c.shadowOffset;
								r.transform(`scale3d(${t}, 1, ${o}) translate3d(0px, ${i / 2 + g}px, ${-i / 2 / o}px) rotateX(-90deg)`);
							}
						var n = a.isSafari || a.isWebView ? -d / 2 : 0;
						t.transform(`translate3d(0px,0,${n}px) rotateX(${f.isHorizontal() ? 0 : h}deg) rotateY(${f.isHorizontal() ? -h : 0}deg)`), t[0].style.setProperty("--swiper-cube-translate-z", n + "px");
					},
					setTransition: (e) => {
						var { $el: t, slides: s } = f;
						s.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), f.params.cubeEffect.shadow && !f.isHorizontal() && t.find(".swiper-cube-shadow").transition(e);
					},
					recreateShadows: () => {
						const s = f.isHorizontal();
						f.slides.each((e) => {
							var t = Math.max(Math.min(e.progress, 1), -1);
							g(P(e), t, s);
						});
					},
					getEffectParams: () => f.params.cubeEffect,
					perspective: () => !0,
					overwriteParams: () => ({ slidesPerView: 1, slidesPerGroup: 1, watchSlidesProgress: !0, resistanceRatio: 0, spaceBetween: 0, centeredSlides: !1, virtualTranslate: !0 }),
				});
			},
			function (e) {
				let { swiper: p, extendParams: t, on: s } = e;
				t({ flipEffect: { slideShadows: !0, limitRotation: !0, transformEl: null } });
				const u = (e, t, s) => {
					let i = p.isHorizontal() ? e.find(".swiper-slide-shadow-left") : e.find(".swiper-slide-shadow-top"),
						a = p.isHorizontal() ? e.find(".swiper-slide-shadow-right") : e.find(".swiper-slide-shadow-bottom");
					0 === i.length && (i = z(s, e, p.isHorizontal() ? "left" : "top")), 0 === a.length && (a = z(s, e, p.isHorizontal() ? "right" : "bottom")), i.length && (i[0].style.opacity = Math.max(-t, 0)), a.length && (a[0].style.opacity = Math.max(t, 0));
				};
				A({
					effect: "flip",
					swiper: p,
					on: s,
					setTranslate: () => {
						var { slides: n, rtlTranslate: o } = p,
							l = p.params.flipEffect;
						for (let r = 0; r < n.length; r += 1) {
							var d = n.eq(r);
							let e = d[0].progress;
							p.params.flipEffect.limitRotation && (e = Math.max(Math.min(d[0].progress, 1), -1));
							var c = d[0].swiperSlideOffset;
							let t = -180 * e,
								s = 0,
								i = p.params.cssMode ? -c - p.translate : -c,
								a = 0;
							p.isHorizontal() ? o && (t = -t) : ((a = i), (i = 0), (s = -t), (t = 0)), (d[0].style.zIndex = -Math.abs(Math.round(e)) + n.length), l.slideShadows && u(d, e, l);
							c = `translate3d(${i}px, ${a}px, 0px) rotateX(${s}deg) rotateY(${t}deg)`;
							k(l, d).transform(c);
						}
					},
					setTransition: (e) => {
						var t = p.params.flipEffect["transformEl"];
						(t ? p.slides.find(t) : p.slides).transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), I({ swiper: p, duration: e, transformEl: t });
					},
					recreateShadows: () => {
						const i = p.params.flipEffect;
						p.slides.each((e) => {
							var t = P(e);
							let s = t[0].progress;
							p.params.flipEffect.limitRotation && (s = Math.max(Math.min(e.progress, 1), -1)), u(t, s, i);
						});
					},
					getEffectParams: () => p.params.flipEffect,
					perspective: () => !0,
					overwriteParams: () => ({ slidesPerView: 1, slidesPerGroup: 1, watchSlidesProgress: !0, spaceBetween: 0, virtualTranslate: !p.params.cssMode }),
				});
			},
			function (e) {
				let { swiper: w, extendParams: t, on: s } = e;
				t({ coverflowEffect: { rotate: 50, stretch: 0, depth: 100, scale: 1, modifier: 1, slideShadows: !0, transformEl: null } }),
					A({
						effect: "coverflow",
						swiper: w,
						on: s,
						setTranslate: () => {
							const { width: e, height: l, slides: d, slidesSizesGrid: c } = w,
								p = w.params.coverflowEffect,
								u = w.isHorizontal(),
								h = w.translate,
								m = u ? e / 2 - h : l / 2 - h,
								f = u ? p.rotate : -p.rotate,
								g = p.depth;
							for (let o = 0, e = d.length; o < e; o += 1) {
								const w = d.eq(o),
									l = c[o],
									h = (m - w[0].swiperSlideOffset - l / 2) / l,
									b = "function" == typeof p.modifier ? p.modifier(h) : h * p.modifier;
								let e = u ? f * b : 0,
									t = u ? 0 : f * b,
									s = -g * Math.abs(b),
									i = p.stretch,
									a = ("string" == typeof i && -1 !== i.indexOf("%") && (i = (parseFloat(p.stretch) / 100) * l), u ? 0 : i * b),
									r = u ? i * b : 0,
									n = 1 - (1 - p.scale) * Math.abs(b);
								Math.abs(r) < 0.001 && (r = 0), Math.abs(a) < 0.001 && (a = 0), Math.abs(s) < 0.001 && (s = 0), Math.abs(e) < 0.001 && (e = 0), Math.abs(t) < 0.001 && (t = 0), Math.abs(n) < 0.001 && (n = 0);
								var v = `translate3d(${r}px,${a}px,${s}px)  rotateX(${t}deg) rotateY(${e}deg) scale(${n})`;
								if ((k(p, w).transform(v), (w[0].style.zIndex = 1 - Math.abs(Math.round(b))), p.slideShadows)) {
									let e = u ? w.find(".swiper-slide-shadow-left") : w.find(".swiper-slide-shadow-top"),
										t = u ? w.find(".swiper-slide-shadow-right") : w.find(".swiper-slide-shadow-bottom");
									0 === e.length && (e = z(p, w, u ? "left" : "top")), 0 === t.length && (t = z(p, w, u ? "right" : "bottom")), e.length && (e[0].style.opacity = 0 < b ? b : 0), t.length && (t[0].style.opacity = 0 < -b ? -b : 0);
								}
							}
						},
						setTransition: (e) => {
							var t = w.params.coverflowEffect["transformEl"];
							(t ? w.slides.find(t) : w.slides).transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e);
						},
						perspective: () => !0,
						overwriteParams: () => ({ watchSlidesProgress: !0 }),
					});
			},
			function (e) {
				let { swiper: b, extendParams: t, on: s } = e;
				t({ creativeEffect: { transformEl: null, limitProgress: 1, shadowPerProgress: !1, progressMultiplier: 1, perspective: !0, prev: { translate: [0, 0, 0], rotate: [0, 0, 0], opacity: 1, scale: 1 }, next: { translate: [0, 0, 0], rotate: [0, 0, 0], opacity: 1, scale: 1 } } });
				A({
					effect: "creative",
					swiper: b,
					on: s,
					setTranslate: () => {
						const { slides: a, $wrapperEl: e, slidesSizesGrid: r } = b,
							n = b.params.creativeEffect,
							o = n["progressMultiplier"],
							l = b.params.centeredSlides;
						if (l) {
							const a = r[0] / 2 - b.params.slidesOffsetBefore || 0;
							e.transform(`translateX(calc(50% - ${a}px))`);
						}
						for (let i = 0; i < a.length; i += 1) {
							const r = a.eq(i),
								h = r[0].progress,
								m = Math.min(Math.max(r[0].progress, -n.limitProgress), n.limitProgress);
							let e = m;
							l || (e = Math.min(Math.max(r[0].originalProgress, -n.limitProgress), n.limitProgress));
							const f = r[0].swiperSlideOffset,
								g = [b.params.cssMode ? -f - b.translate : -f, 0, 0],
								v = [0, 0, 0];
							let t = !1,
								s = (b.isHorizontal() || ((g[1] = g[0]), (g[0] = 0)), { translate: [0, 0, 0], rotate: [0, 0, 0], scale: 1, opacity: 1 });
							m < 0 ? ((s = n.next), (t = !0)) : 0 < m && ((s = n.prev), (t = !0)),
								g.forEach((e, t) => {
									g[t] = `calc(${e}px + (${((e = s.translate[t]), "string" == typeof e ? e : e + "px")} * ${Math.abs(m * o)}))`;
								}),
								v.forEach((e, t) => {
									v[t] = s.rotate[t] * Math.abs(m * o);
								}),
								(r[0].style.zIndex = -Math.abs(Math.round(h)) + a.length);
							var d = g.join(", "),
								c = `rotateX(${v[0]}deg) rotateY(${v[1]}deg) rotateZ(${v[2]}deg)`,
								p = e < 0 ? `scale(${1 + (1 - s.scale) * e * o})` : `scale(${1 - (1 - s.scale) * e * o})`,
								u = e < 0 ? 1 + (1 - s.opacity) * e * o : 1 - (1 - s.opacity) * e * o,
								d = `translate3d(${d}) ${c} ` + p;
							if ((t && s.shadow) || !t) {
								let e = r.children(".swiper-slide-shadow");
								if ((e = 0 === e.length && s.shadow ? z(n, r) : e).length) {
									const b = n.shadowPerProgress ? m * (1 / n.limitProgress) : m;
									e[0].style.opacity = Math.min(Math.max(Math.abs(b), 0), 1);
								}
							}
							c = k(n, r);
							c.transform(d).css({ opacity: u }), s.origin && c.css("transform-origin", s.origin);
						}
					},
					setTransition: (e) => {
						var t = b.params.creativeEffect["transformEl"];
						(t ? b.slides.find(t) : b.slides).transition(e).find(".swiper-slide-shadow").transition(e), I({ swiper: b, duration: e, transformEl: t, allSlides: !0 });
					},
					perspective: () => b.params.creativeEffect.perspective,
					overwriteParams: () => ({ watchSlidesProgress: !0, virtualTranslate: !b.params.cssMode }),
				});
			},
			function (e) {
				let { swiper: w, extendParams: t, on: s } = e;
				t({ cardsEffect: { slideShadows: !0, transformEl: null, rotate: !0 } }),
					A({
						effect: "cards",
						swiper: w,
						on: s,
						setTranslate: () => {
							const { slides: o, activeIndex: l } = w,
								d = w.params.cardsEffect,
								{ startTranslate: c, isTouched: p } = w.touchEventsData,
								u = w.translate;
							for (let n = 0; n < o.length; n += 1) {
								var h = o.eq(n),
									m = h[0].progress,
									f = Math.min(Math.max(m, -4), 4);
								let e = h[0].swiperSlideOffset,
									t = (w.params.centeredSlides && !w.params.cssMode && w.$wrapperEl.transform(`translateX(${w.minTranslate()}px)`), w.params.centeredSlides && w.params.cssMode && (e -= o[0].swiperSlideOffset), w.params.cssMode ? -e - w.translate : -e),
									s = 0;
								var g = -100 * Math.abs(f);
								let i = 1,
									a = -2 * f,
									r = 8 - 0.75 * Math.abs(f);
								var v = w.virtual && w.params.virtual.enabled ? w.virtual.from + n : n,
									b = (v === l || v === l - 1) && 0 < f && f < 1 && (p || w.params.cssMode) && u < c,
									v = (v === l || v === l + 1) && f < 0 && -1 < f && (p || w.params.cssMode) && c < u;
								if (b || v) {
									const o = (1 - Math.abs((Math.abs(f) - 0.5) / 0.5)) ** 0.5;
									(a += -28 * f * o), (i += -0.5 * o), (r += 96 * o), (s = -25 * o * Math.abs(f) + "%");
								}
								if (((t = f < 0 ? `calc(${t}px + (${r * Math.abs(f)}%))` : 0 < f ? `calc(${t}px + (-${r * Math.abs(f)}%))` : t + "px"), !w.isHorizontal())) {
									const o = s;
									(s = t), (t = o);
								}
								(b = f < 0 ? "" + (1 + (1 - i) * f) : "" + (1 - (1 - i) * f)),
									(v = `
        translate3d(${t}, ${s}, ${g}px)
        rotateZ(${d.rotate ? a : 0}deg)
        scale(${b})
      `);
								if (d.slideShadows) {
									let e = h.find(".swiper-slide-shadow");
									(e = 0 === e.length ? z(d, h) : e).length && (e[0].style.opacity = Math.min(Math.max((Math.abs(f) - 0.5) / 0.5, 0), 1));
								}
								(h[0].style.zIndex = -Math.abs(Math.round(m)) + o.length), k(d, h).transform(v);
							}
						},
						setTransition: (e) => {
							var t = w.params.cardsEffect["transformEl"];
							(t ? w.slides.find(t) : w.slides).transition(e).find(".swiper-slide-shadow").transition(e), I({ swiper: w, duration: e, transformEl: t });
						},
						perspective: () => !0,
						overwriteParams: () => ({ watchSlidesProgress: !0, virtualTranslate: !w.params.cssMode }),
					});
			},
		]),
		x
	);
});
