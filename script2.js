! function(e) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = e();
    else if ("function" == typeof define && define.amd) define([], e);
    else {
        var t;
        t = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, t.Hls = e()
    }
}(function() {
    var e;
    return function e(t, r, i) {
        function a(s, o) {
            if (!r[s]) {
                if (!t[s]) {
                    var l = "function" == typeof require && require;
                    if (!o && l) return l(s, !0);
                    if (n) return n(s, !0);
                    var u = new Error("Cannot find module '" + s + "'");
                    throw u.code = "MODULE_NOT_FOUND", u
                }
                var d = r[s] = {
                    exports: {}
                };
                t[s][0].call(d.exports, function(e) {
                    var r = t[s][1][e];
                    return a(r ? r : e)
                }, d, d.exports, e, t, r, i)
            }
            return r[s].exports
        }
        for (var n = "function" == typeof require && require, s = 0; s < i.length; s++) a(i[s]);
        return a
    }({
        1: [function(e, t, r) {
            function i() {
                this._events = this._events || {}, this._maxListeners = this._maxListeners || void 0
            }

            function a(e) {
                return "function" == typeof e
            }

            function n(e) {
                return "number" == typeof e
            }

            function s(e) {
                return "object" == typeof e && null !== e
            }

            function o(e) {
                return void 0 === e
            }
            t.exports = i, i.EventEmitter = i, i.prototype._events = void 0, i.prototype._maxListeners = void 0, i.defaultMaxListeners = 10, i.prototype.setMaxListeners = function(e) {
                if (!n(e) || e < 0 || isNaN(e)) throw TypeError("n must be a positive number");
                return this._maxListeners = e, this
            }, i.prototype.emit = function(e) {
                var t, r, i, n, l, u;
                if (this._events || (this._events = {}), "error" === e && (!this._events.error || s(this._events.error) && !this._events.error.length)) {
                    if (t = arguments[1], t instanceof Error) throw t;
                    var d = new Error('Uncaught, unspecified "error" event. (' + t + ")");
                    throw d.context = t, d
                }
                if (r = this._events[e], o(r)) return !1;
                if (a(r)) switch (arguments.length) {
                    case 1:
                        r.call(this);
                        break;
                    case 2:
                        r.call(this, arguments[1]);
                        break;
                    case 3:
                        r.call(this, arguments[1], arguments[2]);
                        break;
                    default:
                        n = Array.prototype.slice.call(arguments, 1), r.apply(this, n)
                } else if (s(r))
                    for (n = Array.prototype.slice.call(arguments, 1), u = r.slice(), i = u.length, l = 0; l < i; l++) u[l].apply(this, n);
                return !0
            }, i.prototype.addListener = function(e, t) {
                var r;
                if (!a(t)) throw TypeError("listener must be a function");
                return this._events || (this._events = {}), this._events.newListener && this.emit("newListener", e, a(t.listener) ? t.listener : t), this._events[e] ? s(this._events[e]) ? this._events[e].push(t) : this._events[e] = [this._events[e], t] : this._events[e] = t, s(this._events[e]) && !this._events[e].warned && (r = o(this._maxListeners) ? i.defaultMaxListeners : this._maxListeners, r && r > 0 && this._events[e].length > r && (this._events[e].warned = !0, "function" == typeof console.trace)), this
            }, i.prototype.on = i.prototype.addListener, i.prototype.once = function(e, t) {
                function r() {
                    this.removeListener(e, r), i || (i = !0, t.apply(this, arguments))
                }
                if (!a(t)) throw TypeError("listener must be a function");
                var i = !1;
                return r.listener = t, this.on(e, r), this
            }, i.prototype.removeListener = function(e, t) {
                var r, i, n, o;
                if (!a(t)) throw TypeError("listener must be a function");
                if (!this._events || !this._events[e]) return this;
                if (r = this._events[e], n = r.length, i = -1, r === t || a(r.listener) && r.listener === t) delete this._events[e], this._events.removeListener && this.emit("removeListener", e, t);
                else if (s(r)) {
                    for (o = n; o-- > 0;)
                        if (r[o] === t || r[o].listener && r[o].listener === t) {
                            i = o;
                            break
                        }
                    if (i < 0) return this;
                    1 === r.length ? (r.length = 0, delete this._events[e]) : r.splice(i, 1), this._events.removeListener && this.emit("removeListener", e, t)
                }
                return this
            }, i.prototype.removeAllListeners = function(e) {
                var t, r;
                if (!this._events) return this;
                if (!this._events.removeListener) return 0 === arguments.length ? this._events = {} : this._events[e] && delete this._events[e], this;
                if (0 === arguments.length) {
                    for (t in this._events) "removeListener" !== t && this.removeAllListeners(t);
                    return this.removeAllListeners("removeListener"), this._events = {}, this
                }
                if (r = this._events[e], a(r)) this.removeListener(e, r);
                else if (r)
                    for (; r.length;) this.removeListener(e, r[r.length - 1]);
                return delete this._events[e], this
            }, i.prototype.listeners = function(e) {
                var t;
                return t = this._events && this._events[e] ? a(this._events[e]) ? [this._events[e]] : this._events[e].slice() : []
            }, i.prototype.listenerCount = function(e) {
                if (this._events) {
                    var t = this._events[e];
                    if (a(t)) return 1;
                    if (t) return t.length
                }
                return 0
            }, i.listenerCount = function(e, t) {
                return e.listenerCount(t)
            }
        }, {}],
        2: [function(t, r, i) {
            ! function(t) {
                var a = {
                    buildAbsoluteURL: function(e, t) {
                        if (t = t.trim(), /^[a-z]+:/i.test(t)) return t;
                        var r = null,
                            i = null,
                            n = /^([^#]*)(.*)$/.exec(t);
                        n && (i = n[2], t = n[1]);
                        var s = /^([^\?]*)(.*)$/.exec(t);
                        s && (r = s[2], t = s[1]);
                        var o = /^([^#]*)(.*)$/.exec(e);
                        o && (e = o[1]);
                        var l = /^([^\?]*)(.*)$/.exec(e);
                        l && (e = l[1]);
                        var u = /^(([a-z]+:)?\/\/[a-z0-9\.\-_~]+(:[0-9]+)?)?(\/.*)$/i.exec(e);
                        if (!u) throw new Error("Error trying to parse base URL.");
                        var d = u[2] || "",
                            f = u[1] || "",
                            h = u[4],
                            c = null;
                        return c = /^\/\//.test(t) ? d + "//" + a.buildAbsolutePath("", t.substring(2)) : /^\//.test(t) ? f + "/" + a.buildAbsolutePath("", t.substring(1)) : a.buildAbsolutePath(f + h, t), r && (c += r), i && (c += i), c
                    },
                    buildAbsolutePath: function(e, t) {
                        for (var r, i, a = t, n = "", s = e.replace(/[^\/]*$/, a.replace(/(\/|^)(?:\.?\/+)+/g, "$1")), o = 0; i = s.indexOf("/../", o), i > -1; o = i + r) r = /^\/(?:\.\.\/)*/.exec(s.slice(i))[0].length, n = (n + s.substring(o, i)).replace(new RegExp("(?:\\/+[^\\/]*){0," + (r - 1) / 3 + "}$"), "/");
                        return n + s.substr(o)
                    }
                };
                "object" == typeof i && "object" == typeof r ? r.exports = a : "function" == typeof e && e.amd ? e([], function() {
                    return a
                }) : "object" == typeof i ? i.URLToolkit = a : t.URLToolkit = a
            }(this)
        }, {}],
        3: [function(e, t, r) {
            var i = arguments[3],
                a = arguments[4],
                n = arguments[5],
                s = JSON.stringify;
            t.exports = function(e, t) {
                function r(e) {
                    p[e] = !0;
                    for (var t in a[e][1]) {
                        var i = a[e][1][t];
                        p[i] || r(i)
                    }
                }
                for (var o, l = Object.keys(n), u = 0, d = l.length; u < d; u++) {
                    var f = l[u],
                        h = n[f].exports;
                    if (h === e || h && h.default === e) {
                        o = f;
                        break
                    }
                }
                if (!o) {
                    o = Math.floor(Math.pow(16, 8) * Math.random()).toString(16);
                    for (var c = {}, u = 0, d = l.length; u < d; u++) {
                        var f = l[u];
                        c[f] = f
                    }
                    a[o] = [Function(["require", "module", "exports"], "(" + e + ")(self)"), c]
                }
                var v = Math.floor(Math.pow(16, 8) * Math.random()).toString(16),
                    g = {};
                g[o] = o, a[v] = [Function(["require"], "var f = require(" + s(o) + ");(f.default ? f.default : f)(self);"), g];
                var p = {};
                r(v);
                var y = "(" + i + ")({" + Object.keys(p).map(function(e) {
                        return s(e) + ":[" + a[e][0] + "," + s(a[e][1]) + "]"
                    }).join(",") + "},{},[" + s(v) + "])",
                    m = window.URL || window.webkitURL || window.mozURL || window.msURL,
                    E = new Blob([y], {
                        type: "text/javascript"
                    });
                if (t && t.bare) return E;
                var b = m.createObjectURL(E),
                    R = new Worker(b);
                return R.objectURL = b, R
            }
        }, {}],
        4: [function(e, t, r) {
            "use strict";

            function i(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }

            function a(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }

            function n(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }

            function s(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var o = function() {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var i = t[r];
                            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                        }
                    }
                    return function(t, r, i) {
                        return r && e(t.prototype, r), i && e(t, i), t
                    }
                }(),
                l = e(28),
                u = i(l),
                d = e(27),
                f = i(d),
                h = e(30),
                c = i(h),
                v = e(26),
                g = e(45),
                p = e(9),
                y = i(p),
                m = function(e) {
                    function t(e) {
                        a(this, t);
                        var r = n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, u.default.FRAG_LOADING, u.default.FRAG_LOADED, u.default.FRAG_BUFFERED, u.default.ERROR));
                        return r.lastLoadedFragLevel = 0, r._autoLevelCapping = -1, r._nextAutoLevel = -1, r.hls = e, r.onCheck = r.abandonRulesCheck.bind(r), r
                    }
                    return s(t, e), o(t, [{
                        key: "destroy",
                        value: function() {
                            this.clearTimer(), f.default.prototype.destroy.call(this)
                        }
                    }, {
                        key: "onFragLoading",
                        value: function(e) {
                            var t = e.frag;
                            if ("main" === t.type) {
                                if (this.timer || (this.timer = setInterval(this.onCheck, 100)), !this.bwEstimator) {
                                    var r = this.hls,
                                        i = e.frag.level,
                                        a = r.levels[i].details.live,
                                        n = r.config,
                                        s = void 0,
                                        o = void 0;
                                    a ? (s = n.abrEwmaFastLive, o = n.abrEwmaSlowLive) : (s = n.abrEwmaFastVoD, o = n.abrEwmaSlowVoD), this.bwEstimator = new y.default(r, o, s, n.abrEwmaDefaultEstimate)
                                }
                                this.fragCurrent = t
                            }
                        }
                    }, {
                        key: "abandonRulesCheck",
                        value: function() {
                            var e = this.hls,
                                t = e.media,
                                r = this.fragCurrent,
                                i = r.loader,
                                a = this.minAutoLevel;
                            if (!i || i.stats && i.stats.aborted) return g.logger.warn("frag loader destroy or aborted, disarm abandonRules"), void this.clearTimer();
                            var n = i.stats;
                            if (t && (!t.paused && 0 !== t.playbackRate || !t.readyState) && r.autoLevel && r.level) {
                                var s = performance.now() - n.trequest,
                                    o = Math.abs(t.playbackRate);
                                if (s > 500 * r.duration / o) {
                                    var l = e.levels,
                                        d = Math.max(1, n.bw ? n.bw / 8 : 1e3 * n.loaded / s),
                                        f = n.total ? n.total : Math.max(n.loaded, Math.round(r.duration * l[r.level].bitrate / 8)),
                                        h = t.currentTime,
                                        v = (f - n.loaded) / d,
                                        p = (c.default.bufferInfo(t, h, e.config.maxBufferHole).end - h) / o;
                                    if (p < 2 * r.duration / o && v > p) {
                                        var y = void 0,
                                            m = void 0;
                                        for (m = r.level - 1; m > a && (y = r.duration * l[m].bitrate / (6.4 * d), !(y < p)); m--);
                                        y < v && (g.logger.warn("loading too slow, abort fragment loading and switch to level " + m + ":fragLoadedDelay[" + m + "]<fragLoadedDelay[" + (r.level - 1) + "];bufferStarvationDelay:" + y.toFixed(1) + "<" + v.toFixed(1) + ":" + p.toFixed(1)), e.nextLoadLevel = m, this.bwEstimator.sample(s, n.loaded), i.abort(), this.clearTimer(), e.trigger(u.default.FRAG_LOAD_EMERGENCY_ABORTED, {
                                            frag: r,
                                            stats: n
                                        }))
                                    }
                                }
                            }
                        }
                    }, {
                        key: "onFragLoaded",
                        value: function(e) {
                            var t = e.frag;
                            if ("main" === t.type && (this.clearTimer(), this.lastLoadedFragLevel = t.level, this._nextAutoLevel = -1, e.frag.bitrateTest)) {
                                var r = e.stats;
                                r.tparsed = r.tbuffered = r.tload, this.onFragBuffered(e)
                            }
                        }
                    }, {
                        key: "onFragBuffered",
                        value: function(e) {
                            var t = e.stats,
                                r = e.frag;
                            if (t.aborted !== !0 && 1 === r.loadCounter && "main" === r.type && (!r.bitrateTest || t.tload === t.tbuffered)) {
                                var i = t.tparsed - t.trequest;
                                g.logger.log("latency/loading/parsing/append/kbps:" + Math.round(t.tfirst - t.trequest) + "/" + Math.round(t.tload - t.tfirst) + "/" + Math.round(t.tparsed - t.tload) + "/" + Math.round(t.tbuffered - t.tparsed) + "/" + Math.round(8 * t.loaded / (t.tbuffered - t.trequest))), this.bwEstimator.sample(i, t.loaded), r.bitrateTest ? this.bitrateTestDelay = i / 1e3 : this.bitrateTestDelay = 0
                            }
                        }
                    }, {
                        key: "onError",
                        value: function(e) {
                            switch (e.details) {
                                case v.ErrorDetails.FRAG_LOAD_ERROR:
                                case v.ErrorDetails.FRAG_LOAD_TIMEOUT:
                                    this.clearTimer()
                            }
                        }
                    }, {
                        key: "clearTimer",
                        value: function() {
                            this.timer && (clearInterval(this.timer), this.timer = null)
                        }
                    }, {
                        key: "findBestLevel",
                        value: function(e, t, r, i, a, n, s, o, l) {
                            for (var u = a; u >= i; u--) {
                                var d = l[u],
                                    f = d.details,
                                    h = f ? f.totalduration / f.fragments.length : t,
                                    c = !!f && f.live,
                                    v = void 0;
                                v = u <= e ? s * r : o * r;
                                var p = l[u].bitrate,
                                    y = p * h / v;
                                if (g.logger.trace("level/adjustedbw/bitrate/avgDuration/maxFetchDuration/fetchDuration: " + u + "/" + Math.round(v) + "/" + p + "/" + h + "/" + n + "/" + y), v > p && (!y || c || y < n)) return u
                            }
                            return -1
                        }
                    }, {
                        key: "autoLevelCapping",
                        get: function() {
                            return this._autoLevelCapping
                        },
                        set: function(e) {
                            this._autoLevelCapping = e
                        }
                    }, {
                        key: "nextAutoLevel",
                        get: function() {
                            var e = this._nextAutoLevel,
                                t = this.bwEstimator,
                                r = this.hls,
                                i = r.levels,
                                a = r.config.minAutoBitrate;
                            if (!(e === -1 || t && t.canEstimate())) return Math.min(e, this.maxAutoLevel);
                            var n = this.nextABRAutoLevel;
                            if (e !== -1 && (n = Math.min(e, n)), void 0 !== a)
                                for (; i[n].bitrate < a;) n++;
                            return n
                        },
                        set: function(e) {
                            this._nextAutoLevel = e
                        }
                    }, {
                        key: "minAutoLevel",
                        get: function() {
                            for (var e = this.hls, t = e.levels, r = e.config.minAutoBitrate, i = t ? t.length : 0, a = 0; a < i; a++)
                                if (t[a].bitrate > r) return a;
                            return 0
                        }
                    }, {
                        key: "maxAutoLevel",
                        get: function() {
                            var e, t = this.hls.levels,
                                r = this._autoLevelCapping;
                            return e = r === -1 && t && t.length ? t.length - 1 : r
                        }
                    }, {
                        key: "nextABRAutoLevel",
                        get: function() {
                            var e = this.hls,
                                t = this.maxAutoLevel,
                                r = e.levels,
                                i = e.config,
                                a = this.minAutoLevel,
                                n = e.media,
                                s = this.lastLoadedFragLevel,
                                o = this.fragCurrent ? this.fragCurrent.duration : 0,
                                l = n ? n.currentTime : 0,
                                u = n && 0 !== n.playbackRate ? Math.abs(n.playbackRate) : 1,
                                d = this.bwEstimator ? this.bwEstimator.getEstimate() : i.abrEwmaDefaultEstimate,
                                f = (c.default.bufferInfo(n, l, i.maxBufferHole).end - l) / u,
                                h = this.findBestLevel(s, o, d, a, t, f, i.abrBandWidthFactor, i.abrBandWidthUpFactor, r);
                            if (h >= 0) return h;
                            g.logger.trace("rebuffering expected to happen, lets try to find a quality level minimizing the rebuffering");
                            var v = i.maxStarvationDelay,
                                p = i.abrBandWidthFactor,
                                y = i.abrBandWidthUpFactor;
                            if (0 === f) {
                                var m = this.bitrateTestDelay;
                                m && (v = i.maxLoadingDelay - m, g.logger.trace("bitrate test took " + Math.round(1e3 * m) + "ms, set first fragment max fetchDuration to " + Math.round(1e3 * v) + " ms"), p = y = 1)
                            }
                            return h = this.findBestLevel(s, o, d, a, t, f + v, p, y, r), Math.max(h, 0)
                        }
                    }]), t
                }(f.default);
            r.default = m
        }, {
            26: 26,
            27: 27,
            28: 28,
            30: 30,
            45: 45,
            9: 9
        }],
        5: [function(e, t, r) {
            "use strict";

            function i(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }

            function a(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }

            function n(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }

            function s(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var o = function() {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var i = t[r];
                            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                        }
                    }
                    return function(t, r, i) {
                        return r && e(t.prototype, r), i && e(t, i), t
                    }
                }(),
                l = e(41),
                u = i(l),
                d = e(30),
                f = i(d),
                h = e(22),
                c = i(h),
                v = e(28),
                g = i(v),
                p = e(27),
                y = i(p),
                m = e(31),
                E = i(m),
                b = e(46),
                R = i(b),
                _ = e(26),
                k = e(45),
                A = {
                    STOPPED: "STOPPED",
                    STARTING: "STARTING",
                    IDLE: "IDLE",
                    PAUSED: "PAUSED",
                    KEY_LOADING: "KEY_LOADING",
                    FRAG_LOADING: "FRAG_LOADING",
                    FRAG_LOADING_WAITING_RETRY: "FRAG_LOADING_WAITING_RETRY",
                    WAITING_TRACK: "WAITING_TRACK",
                    PARSING: "PARSING",
                    PARSED: "PARSED",
                    ENDED: "ENDED",
                    ERROR: "ERROR"
                },
                T = function(e) {
                    function t(e) {
                        a(this, t);
                        var r = n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, g.default.MEDIA_ATTACHED, g.default.MEDIA_DETACHING, g.default.AUDIO_TRACKS_UPDATED, g.default.AUDIO_TRACK_SWITCH, g.default.AUDIO_TRACK_LOADED, g.default.KEY_LOADED, g.default.FRAG_LOADED, g.default.FRAG_PARSING_INIT_SEGMENT, g.default.FRAG_PARSING_DATA, g.default.FRAG_PARSED, g.default.ERROR, g.default.BUFFER_CREATED, g.default.BUFFER_APPENDED, g.default.BUFFER_FLUSHED));
                        return r.config = e.config, r.audioCodecSwap = !1, r.ticks = 0, r.ontick = r.tick.bind(r), r
                    }
                    return s(t, e), o(t, [{
                        key: "destroy",
                        value: function() {
                            this.stopLoad(), this.timer && (clearInterval(this.timer), this.timer = null), y.default.prototype.destroy.call(this), this.state = A.STOPPED
                        }
                    }, {
                        key: "startLoad",
                        value: function(e) {
                            if (this.tracks) {
                                var t = this.lastCurrentTime;
                                this.stopLoad(), this.timer || (this.timer = setInterval(this.ontick, 100)), this.fragLoadError = 0, t > 0 && e === -1 ? (k.logger.log("audio:override startPosition with lastCurrentTime @" + t.toFixed(3)), this.state = A.IDLE) : (this.lastCurrentTime = this.startPosition ? this.startPosition : e, this.state = A.STARTING), this.nextLoadPosition = this.startPosition = this.lastCurrentTime, this.tick()
                            } else this.startPosition = e, this.state = A.STOPPED
                        }
                    }, {
                        key: "stopLoad",
                        value: function() {
                            var e = this.fragCurrent;
                            e && (e.loader && e.loader.abort(), this.fragCurrent = null), this.fragPrevious = null, this.demuxer && (this.demuxer.destroy(), this.demuxer = null), this.state = A.STOPPED
                        }
                    }, {
                        key: "tick",
                        value: function() {
                            this.ticks++, 1 === this.ticks && (this.doTick(), this.ticks > 1 && setTimeout(this.tick, 1), this.ticks = 0)
                        }
                    }, {
                        key: "doTick",
                        value: function() {
                            var e, t, r, i = this.hls,
                                a = i.config;
                            switch (this.state) {
                                case A.ERROR:
                                case A.PAUSED:
                                    break;
                                case A.STARTING:
                                    this.state = A.WAITING_TRACK, this.loadedmetadata = !1;
                                    break;
                                case A.IDLE:
                                    if (!this.media && (this.startFragRequested || !a.startFragPrefetch)) break;
                                    e = this.loadedmetadata ? this.media.currentTime : this.nextLoadPosition;
                                    var n = this.mediaBuffer ? this.mediaBuffer : this.media,
                                        s = f.default.bufferInfo(n, e, a.maxBufferHole),
                                        o = s.len,
                                        l = s.end,
                                        d = this.fragPrevious,
                                        h = a.maxMaxBufferLength;
                                    if (o < h && this.trackId < this.tracks.length) {
                                        if (r = this.tracks[this.trackId].details, "undefined" == typeof r) {
                                            this.state = A.WAITING_TRACK;
                                            break
                                        }
                                        if (!r.live && d && d.sn === r.endSN && (!this.media.seeking || this.media.duration - l < d.duration / 2)) {
                                            this.hls.trigger(g.default.BUFFER_EOS, {
                                                type: "audio"
                                            }), this.state = A.ENDED;
                                            break
                                        }
                                        var c = r.fragments,
                                            v = c.length,
                                            p = c[0].start,
                                            y = c[v - 1].start + c[v - 1].duration,
                                            m = void 0;
                                        if (l < p ? m = c[0] : ! function() {
                                                var e = void 0,
                                                    t = a.maxFragLookUpTolerance;
                                                l < y ? (l > y - t && (t = 0), e = u.default.search(c, function(e) {
                                                    return e.start + e.duration - t <= l ? 1 : e.start - t > l ? -1 : 0
                                                })) : e = c[v - 1], e && (m = e, p = e.start, d && m.level === d.level && m.sn === d.sn && (m.sn < r.endSN ? (m = c[m.sn + 1 - r.startSN], k.logger.log("SN just loaded, load next one: " + m.sn)) : m = null))
                                            }(), m)
                                            if (null != m.decryptdata.uri && null == m.decryptdata.key) k.logger.log("Loading key for " + m.sn + " of [" + r.startSN + " ," + r.endSN + "],track " + this.trackId), this.state = A.KEY_LOADING, i.trigger(g.default.KEY_LOADING, {
                                                frag: m
                                            });
                                            else {
                                                if (k.logger.log("Loading " + m.sn + " of [" + r.startSN + " ," + r.endSN + "],track " + this.trackId + ", currentTime:" + e + ",bufferEnd:" + l.toFixed(3)), void 0 !== this.fragLoadIdx ? this.fragLoadIdx++ : this.fragLoadIdx = 0, m.loadCounter) {
                                                    m.loadCounter++;
                                                    var E = a.fragLoadingLoopThreshold;
                                                    if (m.loadCounter > E && Math.abs(this.fragLoadIdx - m.loadIdx) < E) return void i.trigger(g.default.ERROR, {
                                                        type: _.ErrorTypes.MEDIA_ERROR,
                                                        details: _.ErrorDetails.FRAG_LOOP_LOADING_ERROR,
                                                        fatal: !1,
                                                        frag: m
                                                    })
                                                } else m.loadCounter = 1;
                                                m.loadIdx = this.fragLoadIdx, this.fragCurrent = m, this.startFragRequested = !0, this.nextLoadPosition = m.start + m.duration, i.trigger(g.default.FRAG_LOADING, {
                                                    frag: m
                                                }), this.state = A.FRAG_LOADING
                                            }
                                    }
                                    break;
                                case A.WAITING_TRACK:
                                    t = this.tracks[this.trackId], t && t.details && (this.state = A.IDLE);
                                    break;
                                case A.FRAG_LOADING_WAITING_RETRY:
                                    var b = performance.now(),
                                        R = this.retryDate;
                                    n = this.media;
                                    var T = n && n.seeking;
                                    (!R || b >= R || T) && (k.logger.log("audioStreamController: retryDate reached, switch back to IDLE state"), this.state = A.IDLE);
                                    break;
                                case A.STOPPED:
                                case A.FRAG_LOADING:
                                case A.PARSING:
                                case A.PARSED:
                                case A.ENDED:
                            }
                        }
                    }, {
                        key: "onMediaAttached",
                        value: function(e) {
                            var t = this.media = this.mediaBuffer = e.media;
                            this.onvseeking = this.onMediaSeeking.bind(this), this.onvended = this.onMediaEnded.bind(this), t.addEventListener("seeking", this.onvseeking), t.addEventListener("ended", this.onvended);
                            var r = this.config;
                            this.tracks && r.autoStartLoad && this.startLoad(r.startPosition)
                        }
                    }, {
                        key: "onMediaDetaching",
                        value: function() {
                            var e = this.media;
                            e && e.ended && (k.logger.log("MSE detaching and video ended, reset startPosition"), this.startPosition = this.lastCurrentTime = 0);
                            var t = this.tracks;
                            t && t.forEach(function(e) {
                                e.details && e.details.fragments.forEach(function(e) {
                                    e.loadCounter = void 0
                                })
                            }), e && (e.removeEventListener("seeking", this.onvseeking), e.removeEventListener("ended", this.onvended), this.onvseeking = this.onvseeked = this.onvended = null), this.media = this.mediaBuffer = null, this.loadedmetadata = !1, this.stopLoad()
                        }
                    }, {
                        key: "onMediaSeeking",
                        value: function() {
                            this.state === A.ENDED && (this.state = A.IDLE), this.media && (this.lastCurrentTime = this.media.currentTime), void 0 !== this.fragLoadIdx && (this.fragLoadIdx += 2 * this.config.fragLoadingLoopThreshold), this.tick()
                        }
                    }, {
                        key: "onMediaEnded",
                        value: function() {
                            this.startPosition = this.lastCurrentTime = 0
                        }
                    }, {
                        key: "onAudioTracksUpdated",
                        value: function(e) {
                            k.logger.log("audio tracks updated"), this.tracks = e.audioTracks
                        }
                    }, {
                        key: "onAudioTrackSwitch",
                        value: function(e) {
                            var t = !!e.url;
                            this.trackId = e.id, this.state = A.IDLE, this.fragCurrent = null, this.state = A.PAUSED, t ? this.timer || (this.timer = setInterval(this.ontick, 100)) : this.demuxer && (this.demuxer.destroy(), this.demuxer = null), this.hls.trigger(g.default.BUFFER_FLUSHING, {
                                startOffset: 0,
                                endOffset: Number.POSITIVE_INFINITY,
                                type: "audio"
                            }), this.tick()
                        }
                    }, {
                        key: "onAudioTrackLoaded",
                        value: function(e) {
                            var t = e.details,
                                r = e.id,
                                i = this.tracks[r],
                                a = t.totalduration;
                            if (k.logger.log("track " + r + " loaded [" + t.startSN + "," + t.endSN + "],duration:" + a), t.PTSKnown = !1, i.details = t, !this.startFragRequested) {
                                if (this.startPosition === -1) {
                                    var n = t.startTimeOffset;
                                    isNaN(n) ? this.startPosition = 0 : (k.logger.log("start time offset found in playlist, adjust startPosition to " + n), this.startPosition = n)
                                }
                                this.nextLoadPosition = this.startPosition
                            }
                            this.state === A.WAITING_TRACK && (this.state = A.IDLE), this.tick()
                        }
                    }, {
                        key: "onKeyLoaded",
                        value: function() {
                            this.state === A.KEY_LOADING && (this.state = A.IDLE, this.tick())
                        }
                    }, {
                        key: "onFragLoaded",
                        value: function(e) {
                            var t = this.fragCurrent;
                            if (this.state === A.FRAG_LOADING && t && "audio" === e.frag.type && e.frag.level === t.level && e.frag.sn === t.sn) {
                                this.state = A.PARSING, this.stats = e.stats;
                                var r = this.tracks[this.trackId],
                                    i = r.details,
                                    a = i.totalduration,
                                    n = t.start,
                                    s = t.level,
                                    o = t.sn,
                                    l = this.config.defaultAudioCodec || r.audioCodec;
                                this.pendingAppending = 0, this.demuxer || (this.demuxer = new c.default(this.hls, "audio")), k.logger.log("Demuxing " + o + " of [" + i.startSN + " ," + i.endSN + "],track " + s);
                                var u = i.PTSKnown || !i.live;
                                this.demuxer.push(e.payload, l, null, n, t.cc, s, o, a, t.decryptdata, u)
                            }
                            this.fragLoadError = 0
                        }
                    }, {
                        key: "onFragParsingInitSegment",
                        value: function(e) {
                            var t = this.fragCurrent;
                            if (t && "audio" === e.id && e.sn === t.sn && e.level === t.level && this.state === A.PARSING) {
                                var r = e.tracks,
                                    i = void 0;
                                if (i = r.audio) {
                                    i.levelCodec = "mp4a.40.2", i.id = e.id, this.hls.trigger(g.default.BUFFER_CODECS, r), k.logger.log("audio track:audio,container:" + i.container + ",codecs[level/parsed]=[" + i.levelCodec + "/" + i.codec + "]");
                                    var a = i.initSegment;
                                    a && (this.pendingAppending++, this.hls.trigger(g.default.BUFFER_APPENDING, {
                                        type: "audio",
                                        data: a,
                                        parent: "audio",
                                        content: "initSegment"
                                    })), this.tick()
                                }
                            }
                        }
                    }, {
                        key: "onFragParsingData",
                        value: function(e) {
                            var t = this,
                                r = this.fragCurrent;
                            if (r && "audio" === e.id && e.sn === r.sn && e.level === r.level && this.state === A.PARSING) {
                                var i = this.tracks[this.trackId],
                                    a = this.fragCurrent;
                                k.logger.log("parsed " + e.type + ",PTS:[" + e.startPTS.toFixed(3) + "," + e.endPTS.toFixed(3) + "],DTS:[" + e.startDTS.toFixed(3) + "/" + e.endDTS.toFixed(3) + "],nb:" + e.nb), E.default.updateFragPTSDTS(i.details, a.sn, e.startPTS, e.endPTS), [e.data1, e.data2].forEach(function(r) {
                                    r && (t.pendingAppending++, t.hls.trigger(g.default.BUFFER_APPENDING, {
                                        type: e.type,
                                        data: r,
                                        parent: "audio",
                                        content: "data"
                                    }))
                                }), this.tick()
                            }
                        }
                    }, {
                        key: "onFragParsed",
                        value: function(e) {
                            var t = this.fragCurrent;
                            t && "audio" === e.id && e.sn === t.sn && e.level === t.level && this.state === A.PARSING && (this.stats.tparsed = performance.now(), this.state = A.PARSED, this._checkAppendedParsed())
                        }
                    }, {
                        key: "onBufferCreated",
                        value: function(e) {
                            var t = e.tracks.audio;
                            t && (this.mediaBuffer = t.buffer, this.loadedmetadata = !0)
                        }
                    }, {
                        key: "onBufferAppended",
                        value: function(e) {
                            if ("audio" === e.parent) switch (this.state) {
                                case A.PARSING:
                                case A.PARSED:
                                    this.pendingAppending--, this._checkAppendedParsed()
                            }
                        }
                    }, {
                        key: "_checkAppendedParsed",
                        value: function() {
                            if (this.state === A.PARSED && 0 === this.pendingAppending) {
                                var e = this.fragCurrent,
                                    t = this.stats;
                                if (e) {
                                    this.fragPrevious = e, t.tbuffered = performance.now(), this.hls.trigger(g.default.FRAG_BUFFERED, {
                                        stats: t,
                                        frag: e,
                                        id: "audio"
                                    });
                                    var r = this.mediaBuffer ? this.mediaBuffer : this.media;
                                    k.logger.log("audio buffered : " + R.default.toString(r.buffered)), this.state = A.IDLE
                                }
                                this.tick()
                            }
                        }
                    }, {
                        key: "onError",
                        value: function(e) {
                            var t = e.frag;
                            if (!t || "audio" === t.type) switch (e.details) {
                                case _.ErrorDetails.FRAG_LOAD_ERROR:
                                case _.ErrorDetails.FRAG_LOAD_TIMEOUT:
                                    if (!e.fatal) {
                                        var r = this.fragLoadError;
                                        r ? r++ : r = 1;
                                        var i = this.config;
                                        if (r <= i.fragLoadingMaxRetry) {
                                            this.fragLoadError = r, t.loadCounter = 0;
                                            var a = Math.min(Math.pow(2, r - 1) * i.fragLoadingRetryDelay, i.fragLoadingMaxRetryTimeout);
                                            k.logger.warn("audioStreamController: frag loading failed, retry in " + a + " ms"), this.retryDate = performance.now() + a, this.state = A.FRAG_LOADING_WAITING_RETRY
                                        } else k.logger.error("audioStreamController: " + e.details + " reaches max retry, redispatch as fatal ..."), e.fatal = !0, this.hls.trigger(g.default.ERROR, e), this.state = A.ERROR
                                    }
                                    break;
                                case _.ErrorDetails.FRAG_LOOP_LOADING_ERROR:
                                case _.ErrorDetails.AUDIO_TRACK_LOAD_ERROR:
                                case _.ErrorDetails.AUDIO_TRACK_LOAD_TIMEOUT:
                                case _.ErrorDetails.KEY_LOAD_ERROR:
                                case _.ErrorDetails.KEY_LOAD_TIMEOUT:
                                    this.state !== A.ERROR && (this.state = e.fatal ? A.ERROR : A.IDLE, k.logger.warn("audioStreamController: " + e.details + " while loading frag,switch to " + this.state + " state ..."))
                            }
                        }
                    }, {
                        key: "onBufferFlushed",
                        value: function() {
                            this.fragLoadIdx += 2 * this.config.fragLoadingLoopThreshold, this.state = A.IDLE, this.fragPrevious = null, this.tick()
                        }
                    }]), t
                }(y.default);
            r.default = T
        }, {
            22: 22,
            26: 26,
            27: 27,
            28: 28,
            30: 30,
            31: 31,
            41: 41,
            45: 45,
            46: 46
        }],
        6: [function(e, t, r) {
            "use strict";

            function i(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }

            function a(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }

            function n(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }

            function s(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var o = function() {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var i = t[r];
                            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                        }
                    }
                    return function(t, r, i) {
                        return r && e(t.prototype, r), i && e(t, i), t
                    }
                }(),
                l = e(28),
                u = i(l),
                d = e(27),
                f = i(d),
                h = e(45),
                c = function(e) {
                    function t(e) {
                        return a(this, t), n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, u.default.MANIFEST_LOADING, u.default.MANIFEST_LOADED, u.default.AUDIO_TRACK_LOADED))
                    }
                    return s(t, e), o(t, [{
                        key: "destroy",
                        value: function() {
                            f.default.prototype.destroy.call(this)
                        }
                    }, {
                        key: "onManifestLoading",
                        value: function() {
                            this.tracks = [], this.trackId = -1
                        }
                    }, {
                        key: "onManifestLoaded",
                        value: function(e) {
                            var t = this,
                                r = e.audioTracks || [],
                                i = !1;
                            this.tracks = r, this.hls.trigger(u.default.AUDIO_TRACKS_UPDATED, {
                                audioTracks: r
                            });
                            var a = 0;
                            r.forEach(function(e) {
                                return e.default ? (t.audioTrack = a, void(i = !0)) : void a++
                            }), i === !1 && r.length && (h.logger.log("no default audio track defined, use first audio track as default"), this.audioTrack = 0)
                        }
                    }, {
                        key: "onAudioTrackLoaded",
                        value: function(e) {
                            e.id < this.tracks.length && (h.logger.log("audioTrack " + e.id + " loaded"), this.tracks[e.id].details = e.details, e.details.live && !this.timer && (this.timer = setInterval(this.ontick, 1e3 * e.details.targetduration)), !e.details.live && this.timer && (clearInterval(this.timer), this.timer = null))
                        }
                    }, {
                        key: "setAudioTrackInternal",
                        value: function(e) {
                            if (e >= 0 && e < this.tracks.length) {
                                this.timer && (clearInterval(this.timer), this.timer = null), this.trackId = e, h.logger.log("switching to audioTrack " + e);
                                var t = this.tracks[e],
                                    r = t.type,
                                    i = t.url;
                                this.hls.trigger(u.default.AUDIO_TRACK_SWITCH, {
                                    id: e,
                                    type: r,
                                    url: i
                                });
                                var a = t.details;
                                !i || void 0 !== a && a.live !== !0 || (h.logger.log("(re)loading playlist for audioTrack " + e), this.hls.trigger(u.default.AUDIO_TRACK_LOADING, {
                                    url: i,
                                    id: e
                                }))
                            }
                        }
                    }, {
                        key: "audioTracks",
                        get: function() {
                            return this.tracks
                        }
                    }, {
                        key: "audioTrack",
                        get: function() {
                            return this.trackId
                        },
                        set: function(e) {
                            this.trackId === e && void 0 !== this.tracks[e].details || this.setAudioTrackInternal(e)
                        }
                    }]), t
                }(f.default);
            r.default = c
        }, {
            27: 27,
            28: 28,
            45: 45
        }],
        7: [function(e, t, r) {
            "use strict";

            function i(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }

            function a(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }

            function n(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }

            function s(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var o = function() {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var i = t[r];
                            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                        }
                    }
                    return function(t, r, i) {
                        return r && e(t.prototype, r), i && e(t, i), t
                    }
                }(),
                l = e(28),
                u = i(l),
                d = e(27),
                f = i(d),
                h = e(45),
                c = e(26),
                v = function(e) {
                    function t(e) {
                        a(this, t);
                        var r = n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, u.default.MEDIA_ATTACHING, u.default.MEDIA_DETACHING, u.default.MANIFEST_PARSED, u.default.BUFFER_RESET, u.default.BUFFER_APPENDING, u.default.BUFFER_CODECS, u.default.BUFFER_EOS, u.default.BUFFER_FLUSHING, u.default.LEVEL_PTS_UPDATED, u.default.LEVEL_UPDATED));
                        return r._msDuration = null, r._levelDuration = null, r.onsbue = r.onSBUpdateEnd.bind(r), r.onsbe = r.onSBUpdateError.bind(r), r.pendingTracks = {}, r.tracks = {}, r
                    }
                    return s(t, e), o(t, [{
                        key: "destroy",
                        value: function() {
                            f.default.prototype.destroy.call(this)
                        }
                    }, {
                        key: "onLevelPtsUpdated",
                        value: function(e) {
                            var t = e.type,
                                r = this.tracks.audio;
                            if ("audio" === t && r && "audio/mpeg" === r.container) {
                                var i = this.sourceBuffer.audio,
                                    a = Math.abs(i.timestampOffset - e.start);
                                if (a > .1) {
                                    var n = i.updating;
                                    try {
                                        i.abort()
                                    } catch (e) {
                                        n = !0, h.logger.warn("can not abort audio buffer: " + e)
                                    }
                                    n ? this.audioTimestampOffset = e.start : (h.logger.warn("change mpeg audio timestamp offset from " + i.timestampOffset + " to " + e.start), i.timestampOffset = e.start)
                                }
                            }
                        }
                    }, {
                        key: "onManifestParsed",
                        value: function(e) {
                            var t = e.audio,
                                r = e.video,
                                i = 0;
                            e.altAudio && (t || r) && (i = (t ? 1 : 0) + (r ? 1 : 0), h.logger.log(i + " sourceBuffer(s) expected")), this.sourceBufferNb = i
                        }
                    }, {
                        key: "onMediaAttaching",
                        value: function(e) {
                            var t = this.media = e.media;
                            if (t) {
                                var r = this.mediaSource = new MediaSource;
                                this.onmso = this.onMediaSourceOpen.bind(this), this.onmse = this.onMediaSourceEnded.bind(this), this.onmsc = this.onMediaSourceClose.bind(this), r.addEventListener("sourceopen", this.onmso), r.addEventListener("sourceended", this.onmse), r.addEventListener("sourceclose", this.onmsc), t.src = URL.createObjectURL(r)
                            }
                        }
                    }, {
                        key: "onMediaDetaching",
                        value: function() {
                            h.logger.log("media source detaching");
                            var e = this.mediaSource;
                            if (e) {
                                if ("open" === e.readyState) try {
                                    e.endOfStream()
                                } catch (e) {
                                    h.logger.warn("onMediaDetaching:" + e.message + " while calling endOfStream")
                                }
                                e.removeEventListener("sourceopen", this.onmso), e.removeEventListener("sourceended", this.onmse), e.removeEventListener("sourceclose", this.onmsc), this.media && (URL.revokeObjectURL(this.media.src), this.media.removeAttribute("src"), this.media.load()), this.mediaSource = null, this.media = null, this.pendingTracks = {}, this.tracks = {}, this.sourceBuffer = {}, this.flushRange = [], this.segments = [], this.appended = 0
                            }
                            this.onmso = this.onmse = this.onmsc = null, this.hls.trigger(u.default.MEDIA_DETACHED)
                        }
                    }, {
                        key: "onMediaSourceOpen",
                        value: function() {
                            h.logger.log("media source opened"), this.hls.trigger(u.default.MEDIA_ATTACHED, {
                                media: this.media
                            });
                            var e = this.mediaSource;
                            e && e.removeEventListener("sourceopen", this.onmso), this.checkPendingTracks()
                        }
                    }, {
                        key: "checkPendingTracks",
                        value: function() {
                            var e = this.pendingTracks,
                                t = Object.keys(e).length;
                            t && (this.sourceBufferNb <= t || 0 === this.sourceBufferNb) && (this.createSourceBuffers(e), this.pendingTracks = {}, this.doAppending())
                        }
                    }, {
                        key: "onMediaSourceClose",
                        value: function() {
                            h.logger.log("media source closed")
                        }
                    }, {
                        key: "onMediaSourceEnded",
                        value: function() {
                            h.logger.log("media source ended")
                        }
                    }, {
                        key: "onSBUpdateEnd",
                        value: function() {
                            if (this.audioTimestampOffset) {
                                var e = this.sourceBuffer.audio;
                                h.logger.warn("change mpeg audio timestamp offset from " + e.timestampOffset + " to " + this.audioTimestampOffset), e.timestampOffset = this.audioTimestampOffset, delete this.audioTimestampOffset
                            }
                            this._needsFlush && this.doFlush(), this._needsEos && this.checkEos(), this.appending = !1, this.hls.trigger(u.default.BUFFER_APPENDED, {
                                parent: this.parent
                            }), this._needsFlush || this.doAppending(), this.updateMediaElementDuration()
                        }
                    }, {
                        key: "onSBUpdateError",
                        value: function(e) {
                            h.logger.error("sourceBuffer error:" + e), this.hls.trigger(u.default.ERROR, {
                                type: c.ErrorTypes.MEDIA_ERROR,
                                details: c.ErrorDetails.BUFFER_APPENDING_ERROR,
                                fatal: !1
                            })
                        }
                    }, {
                        key: "onBufferReset",
                        value: function() {
                            var e = this.sourceBuffer;
                            for (var t in e) {
                                var r = e[t];
                                try {
                                    this.mediaSource.removeSourceBuffer(r), r.removeEventListener("updateend", this.onsbue), r.removeEventListener("error", this.onsbe)
                                } catch (e) {}
                            }
                            this.sourceBuffer = {}, this.flushRange = [], this.segments = [], this.appended = 0
                        }
                    }, {
                        key: "onBufferCodecs",
                        value: function(e) {
                            if (0 === Object.keys(this.sourceBuffer).length) {
                                for (var t in e) this.pendingTracks[t] = e[t];
                                var r = this.mediaSource;
                                r && "open" === r.readyState && this.checkPendingTracks()
                            }
                        }
                    }, {
                        key: "createSourceBuffers",
                        value: function(e) {
                            var t = this.sourceBuffer,
                                r = this.mediaSource;
                            for (var i in e)
                                if (!t[i]) {
                                    var a = e[i],
                                        n = a.levelCodec || a.codec,
                                        s = a.container + ";codecs=" + n;
                                    h.logger.log("creating sourceBuffer(" + s + ")");
                                    try {
                                        var o = t[i] = r.addSourceBuffer(s);
                                        o.addEventListener("updateend", this.onsbue), o.addEventListener("error", this.onsbe), this.tracks[i] = {
                                            codec: n,
                                            container: a.container
                                        }, a.buffer = o
                                    } catch (e) {
                                        h.logger.error("error while trying to add sourceBuffer:" + e.message), this.hls.trigger(u.default.ERROR, {
                                            type: c.ErrorTypes.MEDIA_ERROR,
                                            details: c.ErrorDetails.BUFFER_ADD_CODEC_ERROR,
                                            fatal: !1,
                                            err: e,
                                            mimeType: s
                                        })
                                    }
                                }
                            this.hls.trigger(u.default.BUFFER_CREATED, {
                                tracks: e
                            })
                        }
                    }, {
                        key: "onBufferAppending",
                        value: function(e) {
                            this._needsFlush || (this.segments ? this.segments.push(e) : this.segments = [e], this.doAppending())
                        }
                    }, {
                        key: "onBufferAppendFail",
                        value: function(e) {
                            h.logger.error("sourceBuffer error:" + e.event), this.hls.trigger(u.default.ERROR, {
                                type: c.ErrorTypes.MEDIA_ERROR,
                                details: c.ErrorDetails.BUFFER_APPENDING_ERROR,
                                fatal: !1,
                                frag: this.fragCurrent
                            })
                        }
                    }, {
                        key: "onBufferEos",
                        value: function(e) {
                            var t = this.sourceBuffer,
                                r = e.type;
                            for (var i in t) r && i !== r || t[i].ended || (t[i].ended = !0, h.logger.log(i + " sourceBuffer now EOS"));
                            this.checkEos()
                        }
                    }, {
                        key: "checkEos",
                        value: function() {
                            var e = this.sourceBuffer,
                                t = this.mediaSource;
                            if (!t || "open" !== t.readyState) return void(this._needsEos = !1);
                            for (var r in e) {
                                var i = e[r];
                                if (!i.ended) return;
                                if (i.updating) return void(this._needsEos = !0)
                            }
                            h.logger.log("all media data available, signal endOfStream() to MediaSource and stop loading fragment");
                            try {
                                t.endOfStream()
                            } catch (e) {
                                h.logger.warn("exception while calling mediaSource.endOfStream()")
                            }
                            this._needsEos = !1
                        }
                    }, {
                        key: "onBufferFlushing",
                        value: function(e) {
                            this.flushRange.push({
                                start: e.startOffset,
                                end: e.endOffset,
                                type: e.type
                            }), this.flushBufferCounter = 0, this.doFlush()
                        }
                    }, {
                        key: "onLevelUpdated",
                        value: function(e) {
                            var t = e.details;
                            0 !== t.fragments.length && (this._levelDuration = t.totalduration + t.fragments[0].start, this.updateMediaElementDuration())
                        }
                    }, {
                        key: "updateMediaElementDuration",
                        value: function() {
                            var e = this.media,
                                t = this.mediaSource,
                                r = this.sourceBuffer,
                                i = this._levelDuration;
                            if (null !== i && e && t && r && 0 !== e.readyState && "open" === t.readyState) {
                                for (var a in r)
                                    if (r[a].updating) return;
                                null === this._msDuration && (this._msDuration = t.duration), i > this._msDuration && i > e.duration && (h.logger.log("Updating mediasource duration to " + i.toFixed(3)), this._msDuration = t.duration = i)
                            }
                        }
                    }, {
                        key: "doFlush",
                        value: function() {
                            for (; this.flushRange.length;) {
                                var e = this.flushRange[0];
                                if (!this.flushBuffer(e.start, e.end, e.type)) return void(this._needsFlush = !0);
                                this.flushRange.shift(), this.flushBufferCounter = 0
                            }
                            if (0 === this.flushRange.length) {
                                this._needsFlush = !1;
                                var t = 0,
                                    r = this.sourceBuffer;
                                try {
                                    for (var i in r) t += r[i].buffered.length
                                } catch (e) {
                                    h.logger.error("error while accessing sourceBuffer.buffered")
                                }
                                this.appended = t, this.hls.trigger(u.default.BUFFER_FLUSHED)
                            }
                        }
                    }, {
                        key: "doAppending",
                        value: function() {
                            var e = this.hls,
                                t = this.sourceBuffer,
                                r = this.segments;
                            if (Object.keys(t).length) {
                                if (this.media.error) return this.segments = [], void h.logger.error("trying to append although a media error occured, flush segment and abort");
                                if (this.appending) return;
                                if (r && r.length) {
                                    var i = r.shift();
                                    try {
                                        var a = i.type;
                                        t[a] ? (t[a].ended = !1, this.parent = i.parent, t[a].appendBuffer(i.data), this.appendError = 0, this.appended++, this.appending = !0) : this.onSBUpdateEnd()
                                    } catch (t) {
                                        h.logger.error("error while trying to append buffer:" + t.message), r.unshift(i);
                                        var n = {
                                            type: c.ErrorTypes.MEDIA_ERROR
                                        };
                                        if (22 === t.code) return this.segments = [], n.details = c.ErrorDetails.BUFFER_FULL_ERROR, void e.trigger(u.default.ERROR, n);
                                        if (this.appendError ? this.appendError++ : this.appendError = 1, n.details = c.ErrorDetails.BUFFER_APPEND_ERROR, n.frag = this.fragCurrent, this.appendError > e.config.appendErrorMaxRetry) return h.logger.log("fail " + e.config.appendErrorMaxRetry + " times to append segment in sourceBuffer"), r = [], n.fatal = !0, void e.trigger(u.default.ERROR, n);
                                        n.fatal = !1, e.trigger(u.default.ERROR, n)
                                    }
                                }
                            }
                        }
                    }, {
                        key: "flushBuffer",
                        value: function(e, t, r) {
                            var i, a, n, s, o, l, u = this.sourceBuffer;
                            if (Object.keys(u).length) {
                                if (h.logger.log("flushBuffer,pos/start/end: " + this.media.currentTime + "/" + e + "/" + t), this.flushBufferCounter < this.appended) {
                                    for (var d in u)
                                        if (!r || d === r) {
                                            if (i = u[d], i.ended = !1, i.updating) return h.logger.warn("cannot flush, sb updating in progress"), !1;
                                            try {
                                                for (a = 0; a < i.buffered.length; a++)
                                                    if (n = i.buffered.start(a), s = i.buffered.end(a), navigator.userAgent.toLowerCase().indexOf("firefox") !== -1 && t === Number.POSITIVE_INFINITY ? (o = e, l = t) : (o = Math.max(n, e), l = Math.min(s, t)), Math.min(l, s) - o > .5) return this.flushBufferCounter++, h.logger.log("flush " + d + " [" + o + "," + l + "], of [" + n + "," + s + "], pos:" + this.media.currentTime), i.remove(o, l), !1
                                            } catch (e) {
                                                h.logger.warn("exception while accessing sourcebuffer, it might have been removed from MediaSource")
                                            }
                                        }
                                } else h.logger.warn("abort flushing too many retries");
                                h.logger.log("buffer flushed")
                            }
                            return !0
                        }
                    }]), t
                }(f.default);
            r.default = v
        }, {
            26: 26,
            27: 27,
            28: 28,
            45: 45
        }],
        8: [function(e, t, r) {
            "use strict";

            function i(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }

            function a(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }

            function n(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }

            function s(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var o = function() {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var i = t[r];
                            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                        }
                    }
                    return function(t, r, i) {
                        return r && e(t.prototype, r), i && e(t, i), t
                    }
                }(),
                l = e(28),
                u = i(l),
                d = e(27),
                f = i(d),
                h = function(e) {
                    function t(e) {
                        return a(this, t), n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, u.default.FPS_DROP_LEVEL_CAPPING, u.default.MEDIA_ATTACHING, u.default.MANIFEST_PARSED))
                    }
                    return s(t, e), o(t, [{
                        key: "destroy",
                        value: function() {
                            this.hls.config.capLevelToPlayerSize && (this.media = this.restrictedLevels = null, this.autoLevelCapping = Number.POSITIVE_INFINITY, this.timer && (this.timer = clearInterval(this.timer)))
                        }
                    }, {
                        key: "onFpsDropLevelCapping",
                        value: function(e) {
                            this.restrictedLevels || (this.restrictedLevels = []), this.isLevelRestricted(e.droppedLevel) || this.restrictedLevels.push(e.droppedLevel)
                        }
                    }, {
                        key: "onMediaAttaching",
                        value: function(e) {
                            this.media = e.media instanceof HTMLVideoElement ? e.media : null
                        }
                    }, {
                        key: "onManifestParsed",
                        value: function(e) {
                            this.hls.config.capLevelToPlayerSize && (this.autoLevelCapping = Number.POSITIVE_INFINITY, this.levels = e.levels, this.hls.firstLevel = this.getMaxLevel(e.firstLevel), clearInterval(this.timer), this.timer = setInterval(this.detectPlayerSize.bind(this), 1e3), this.detectPlayerSize())
                        }
                    }, {
                        key: "detectPlayerSize",
                        value: function() {
                            if (this.media) {
                                var e = this.levels ? this.levels.length : 0;
                                e && (this.hls.autoLevelCapping = this.getMaxLevel(e - 1), this.hls.autoLevelCapping > this.autoLevelCapping && this.hls.streamController.nextLevelSwitch(), this.autoLevelCapping = this.hls.autoLevelCapping)
                            }
                        }
                    }, {
                        key: "getMaxLevel",
                        value: function(e) {
                            var t = 0,
                                r = void 0,
                                i = void 0,
                                a = this.mediaWidth,
                                n = this.mediaHeight,
                                s = 0,
                                o = 0;
                            for (r = 0; r <= e && (i = this.levels[r], !this.isLevelRestricted(r)) && (t = r, s = i.width, o = i.height, !(a <= s || n <= o)); r++);
                            return t
                        }
                    }, {
                        key: "isLevelRestricted",
                        value: function(e) {
                            return !(!this.restrictedLevels || this.restrictedLevels.indexOf(e) === -1)
                        }
                    }, {
                        key: "contentScaleFactor",
                        get: function() {
                            var e = 1;
                            try {
                                e = window.devicePixelRatio
                            } catch (e) {}
                            return e
                        }
                    }, {
                        key: "mediaWidth",
                        get: function() {
                            var e = void 0;
                            return this.media && (e = this.media.width || this.media.clientWidth || this.media.offsetWidth, e *= this.contentScaleFactor), e
                        }
                    }, {
                        key: "mediaHeight",
                        get: function() {
                            var e = void 0;
                            return this.media && (e = this.media.height || this.media.clientHeight || this.media.offsetHeight, e *= this.contentScaleFactor), e
                        }
                    }]), t
                }(f.default);
            r.default = h
        }, {
            27: 27,
            28: 28
        }],
        9: [function(e, t, r) {
            "use strict";

            function i(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }

            function a(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var n = function() {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var i = t[r];
                            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                        }
                    }
                    return function(t, r, i) {
                        return r && e(t.prototype, r), i && e(t, i), t
                    }
                }(),
                s = e(44),
                o = i(s),
                l = function() {
                    function e(t, r, i, n) {
                        a(this, e), this.hls = t, this.defaultEstimate_ = n, this.minWeight_ = .001, this.minDelayMs_ = 50, this.slow_ = new o.default(r), this.fast_ = new o.default(i)
                    }
                    return n(e, [{
                        key: "sample",
                        value: function(e, t) {
                            e = Math.max(e, this.minDelayMs_);
                            var r = 8e3 * t / e,
                                i = e / 1e3;
                            this.fast_.sample(i, r), this.slow_.sample(i, r)
                        }
                    }, {
                        key: "canEstimate",
                        value: function() {
                            var e = this.fast_;
                            return e && e.getTotalWeight() >= this.minWeight_
                        }
                    }, {
                        key: "getEstimate",
                        value: function() {
                            return this.canEstimate() ? Math.min(this.fast_.getEstimate(), this.slow_.getEstimate()) : this.defaultEstimate_
                        }
                    }, {
                        key: "destroy",
                        value: function() {}
                    }]), e
                }();
            r.default = l
        }, {
            44: 44
        }],
        10: [function(e, t, r) {
            "use strict";

            function i(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }

            function a(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }

            function n(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }

            function s(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var o = function() {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var i = t[r];
                            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                        }
                    }
                    return function(t, r, i) {
                        return r && e(t.prototype, r), i && e(t, i), t
                    }
                }(),
                l = e(28),
                u = i(l),
                d = e(27),
                f = i(d),
                h = e(45),
                c = function(e) {
                    function t(e) {
                        return a(this, t), n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, u.default.MEDIA_ATTACHING))
                    }
                    return s(t, e), o(t, [{
                        key: "destroy",
                        value: function() {
                            this.timer && clearInterval(this.timer), this.isVideoPlaybackQualityAvailable = !1
                        }
                    }, {
                        key: "onMediaAttaching",
                        value: function(e) {
                            this.hls.config.capLevelOnFPSDrop && (this.video = e.media instanceof HTMLVideoElement ? e.media : null, "function" == typeof this.video.getVideoPlaybackQuality && (this.isVideoPlaybackQualityAvailable = !0), clearInterval(this.timer), this.timer = setInterval(this.checkFPSInterval.bind(this), this.hls.config.fpsDroppedMonitoringPeriod))
                        }
                    }, {
                        key: "checkFPS",
                        value: function(e, t, r) {
                            var i = performance.now();
                            if (t) {
                                if (this.lastTime) {
                                    var a = i - this.lastTime,
                                        n = r - this.lastDroppedFrames,
                                        s = t - this.lastDecodedFrames,
                                        o = 1e3 * n / a;
                                    if (this.hls.trigger(u.default.FPS_DROP, {
                                            currentDropped: n,
                                            currentDecoded: s,
                                            totalDroppedFrames: r
                                        }), o > 0 && n > this.hls.config.fpsDroppedMonitoringThreshold * s) {
                                        var l = this.hls.currentLevel;
                                        h.logger.warn("drop FPS ratio greater than max allowed value for currentLevel: " + l), l > 0 && (this.hls.autoLevelCapping === -1 || this.hls.autoLevelCapping >= l) && (l -= 1, this.hls.trigger(u.default.FPS_DROP_LEVEL_CAPPING, {
                                            level: l,
                                            droppedLevel: this.hls.currentLevel
                                        }), this.hls.autoLevelCapping = l, this.hls.streamController.nextLevelSwitch())
                                    }
                                }
                                this.lastTime = i, this.lastDroppedFrames = r, this.lastDecodedFrames = t
                            }
                        }
                    }, {
                        key: "checkFPSInterval",
                        value: function() {
                            if (this.video)
                                if (this.isVideoPlaybackQualityAvailable) {
                                    var e = this.video.getVideoPlaybackQuality();
                                    this.checkFPS(this.video, e.totalVideoFrames, e.droppedVideoFrames)
                                } else this.checkFPS(this.video, this.video.webkitDecodedFrameCount, this.video.webkitDroppedFrameCount)
                        }
                    }]), t
                }(f.default);
            r.default = c
        }, {
            27: 27,
            28: 28,
            45: 45
        }],
        11: [function(e, t, r) {
            "use strict";

            function i(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }

            function a(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }

            function n(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }

            function s(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var o = function() {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var i = t[r];
                            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                        }
                    }
                    return function(t, r, i) {
                        return r && e(t.prototype, r), i && e(t, i), t
                    }
                }(),
                l = e(28),
                u = i(l),
                d = e(27),
                f = i(d),
                h = e(45),
                c = e(26),
                v = e(30),
                g = i(v),
                p = function(e) {
                    function t(e) {
                        a(this, t);
                        var r = n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, u.default.MANIFEST_LOADED, u.default.LEVEL_LOADED, u.default.ERROR));
                        return r.ontick = r.tick.bind(r), r._manualLevel = r._autoLevelCapping = -1, r
                    }
                    return s(t, e), o(t, [{
                        key: "destroy",
                        value: function() {
                            this.timer && (clearTimeout(this.timer), this.timer = null), this._manualLevel = -1
                        }
                    }, {
                        key: "startLoad",
                        value: function() {
                            this.canload = !0, this.timer && this.tick()
                        }
                    }, {
                        key: "stopLoad",
                        value: function() {
                            this.canload = !1
                        }
                    }, {
                        key: "onManifestLoaded",
                        value: function(e) {
                            var t, r = [],
                                i = [],
                                a = {},
                                n = !1,
                                s = !1,
                                o = this.hls,
                                l = /chrome|firefox/.test(navigator.userAgent.toLowerCase()),
                                d = function(e, t) {
                                    return MediaSource.isTypeSupported(e + "/mp4;codecs=" + t)
                                };
                            if (e.levels.forEach(function(e) {
                                    e.videoCodec && (n = !0), l && e.audioCodec && e.audioCodec.indexOf("mp4a.40.34") !== -1 && (e.audioCodec = void 0), (e.audioCodec || e.attrs && e.attrs.AUDIO) && (s = !0);
                                    var t = a[e.bitrate];
                                    void 0 === t ? (a[e.bitrate] = r.length, e.url = [e.url], e.urlId = 0, r.push(e)) : r[t].url.push(e.url)
                                }), n && s ? r.forEach(function(e) {
                                    e.videoCodec && i.push(e)
                                }) : i = r, i = i.filter(function(e) {
                                    var t = e.audioCodec,
                                        r = e.videoCodec;
                                    return (!t || d("audio", t)) && (!r || d("video", r))
                                }), i.length) {
                                t = i[0].bitrate, i.sort(function(e, t) {
                                    return e.bitrate - t.bitrate
                                }), this._levels = i;
                                for (var f = 0; f < i.length; f++)
                                    if (i[f].bitrate === t) {
                                        this._firstLevel = f, h.logger.log("manifest loaded," + i.length + " level(s) found, first bitrate:" + t);
                                        break
                                    }
                                o.trigger(u.default.MANIFEST_PARSED, {
                                    levels: i,
                                    firstLevel: this._firstLevel,
                                    stats: e.stats,
                                    audio: s,
                                    video: n,
                                    altAudio: e.audioTracks.length > 0
                                })
                            } else o.trigger(u.default.ERROR, {
                                type: c.ErrorTypes.MEDIA_ERROR,
                                details: c.ErrorDetails.MANIFEST_INCOMPATIBLE_CODECS_ERROR,
                                fatal: !0,
                                url: o.url,
                                reason: "no level with compatible codecs found in manifest"
                            })
                        }
                    }, {
                        key: "setLevelInternal",
                        value: function(e) {
                            var t = this._levels;
                            if (e >= 0 && e < t.length) {
                                this.timer && (clearTimeout(this.timer), this.timer = null), this._level !== e && (h.logger.log("switching to level " + e), this._level = e, this.hls.trigger(u.default.LEVEL_SWITCH, {
                                    level: e
                                }));
                                var r = t[e],
                                    i = r.details;
                                if (!i || i.live === !0) {
                                    var a = r.urlId;
                                    this.hls.trigger(u.default.LEVEL_LOADING, {
                                        url: r.url[a],
                                        level: e,
                                        id: a
                                    })
                                }
                            } else this.hls.trigger(u.default.ERROR, {
                                type: c.ErrorTypes.OTHER_ERROR,
                                details: c.ErrorDetails.LEVEL_SWITCH_ERROR,
                                level: e,
                                fatal: !1,
                                reason: "invalid level idx"
                            })
                        }
                    }, {
                        key: "onError",
                        value: function(e) {
                            if (!e.fatal) {
                                var t = e.details,
                                    r = this.hls,
                                    i = void 0,
                                    a = void 0,
                                    n = !1,
                                    s = r.abrController,
                                    o = s.minAutoLevel;
                                switch (t) {
                                    case c.ErrorDetails.FRAG_LOAD_ERROR:
                                    case c.ErrorDetails.FRAG_LOAD_TIMEOUT:
                                    case c.ErrorDetails.FRAG_LOOP_LOADING_ERROR:
                                    case c.ErrorDetails.KEY_LOAD_ERROR:
                                    case c.ErrorDetails.KEY_LOAD_TIMEOUT:
                                        i = e.frag.level;
                                        break;
                                    case c.ErrorDetails.LEVEL_LOAD_ERROR:
                                    case c.ErrorDetails.LEVEL_LOAD_TIMEOUT:
                                        i = e.context.level, n = !0;
                                        break;
                                    case c.ErrorDetails.REMUX_ALLOC_ERROR:
                                        i = e.level
                                }
                                if (void 0 !== i)
                                    if (a = this._levels[i], a.urlId < a.url.length - 1) a.urlId++, a.details = void 0, h.logger.warn("level controller," + t + " for level " + i + ": switching to redundant stream id " + a.urlId);
                                    else {
                                        var l = this._manualLevel === -1 && i;
                                        if (l) h.logger.warn("level controller," + t + ": switch-down for next fragment"), s.nextAutoLevel = Math.max(o, i - 1);
                                        else if (a && a.details && a.details.live) h.logger.warn("level controller," + t + " on live stream, discard"), n && (this._level = void 0);
                                        else if (t === c.ErrorDetails.LEVEL_LOAD_ERROR || t === c.ErrorDetails.LEVEL_LOAD_TIMEOUT) {
                                            var d = r.media,
                                                f = d && g.default.isBuffered(d, d.currentTime) && g.default.isBuffered(d, d.currentTime + .5);
                                            if (f) {
                                                var v = r.config.levelLoadingRetryDelay;
                                                h.logger.warn("level controller," + t + ", but media buffered, retry in " + v + "ms"), this.timer = setTimeout(this.ontick, v)
                                            } else h.logger.error("cannot recover " + t + " error"), this._level = void 0, this.timer && (clearTimeout(this.timer), this.timer = null), e.fatal = !0, r.trigger(u.default.ERROR, e)
                                        }
                                    }
                            }
                        }
                    }, {
                        key: "onLevelLoaded",
                        value: function(e) {
                            if (e.level === this._level) {
                                var t = e.details;
                                if (t.live) {
                                    var r = 1e3 * (t.averagetargetduration ? t.averagetargetduration : t.targetduration),
                                        i = this._levels[e.level],
                                        a = i.details;
                                    a && t.endSN === a.endSN && (r /= 2, h.logger.log("same live playlist, reload twice faster")), r -= performance.now() - e.stats.trequest, r = Math.max(1e3, Math.round(r)), h.logger.log("live playlist, reload in " + r + " ms"), this.timer = setTimeout(this.ontick, r)
                                } else this.timer = null
                            }
                        }
                    }, {
                        key: "tick",
                        value: function() {
                            var e = this._level;
                            if (void 0 !== e && this.canload) {
                                var t = this._levels[e],
                                    r = t.urlId;
                                this.hls.trigger(u.default.LEVEL_LOADING, {
                                    url: t.url[r],
                                    level: e,
                                    id: r
                                })
                            }
                        }
                    }, {
                        key: "levels",
                        get: function() {
                            return this._levels
                        }
                    }, {
                        key: "level",
                        get: function() {
                            return this._level
                        },
                        set: function(e) {
                            var t = this._levels;
                            t && t.length > e && (this._level === e && void 0 !== t[e].details || this.setLevelInternal(e))
                        }
                    }, {
                        key: "manualLevel",
                        get: function() {
                            return this._manualLevel
                        },
                        set: function(e) {
                            this._manualLevel = e, void 0 === this._startLevel && (this._startLevel = e), e !== -1 && (this.level = e)
                        }
                    }, {
                        key: "firstLevel",
                        get: function() {
                            return this._firstLevel
                        },
                        set: function(e) {
                            this._firstLevel = e
                        }
                    }, {
                        key: "startLevel",
                        get: function() {
                            if (void 0 === this._startLevel) {
                                var e = this.hls.config.startLevel;
                                return void 0 !== e ? e : this._firstLevel
                            }
                            return this._startLevel
                        },
                        set: function(e) {
                            e !== -1 && (e = Math.max(e, this.hls.abrController.minAutoLevel)), this._startLevel = e
                        }
                    }, {
                        key: "nextLoadLevel",
                        get: function() {
                            return this._manualLevel !== -1 ? this._manualLevel : this.hls.abrController.nextAutoLevel
                        },
                        set: function(e) {
                            this.level = e, this._manualLevel === -1 && (this.hls.abrController.nextAutoLevel = e)
                        }
                    }]), t
                }(f.default);
            r.default = p
        }, {
            26: 26,
            27: 27,
            28: 28,
            30: 30,
            45: 45
        }],
        12: [function(e, t, r) {
            "use strict";

            function i(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }

            function a(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }

            function n(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }

            function s(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var o = function() {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var i = t[r];
                            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                        }
                    }
                    return function(t, r, i) {
                        return r && e(t.prototype, r), i && e(t, i), t
                    }
                }(),
                l = e(41),
                u = i(l),
                d = e(30),
                f = i(d),
                h = e(22),
                c = i(h),
                v = e(28),
                g = i(v),
                p = e(27),
                y = i(p),
                m = e(31),
                E = i(m),
                b = e(46),
                R = i(b),
                _ = e(26),
                k = e(45),
                A = {
                    STOPPED: "STOPPED",
                    IDLE: "IDLE",
                    KEY_LOADING: "KEY_LOADING",
                    FRAG_LOADING: "FRAG_LOADING",
                    FRAG_LOADING_WAITING_RETRY: "FRAG_LOADING_WAITING_RETRY",
                    WAITING_LEVEL: "WAITING_LEVEL",
                    PARSING: "PARSING",
                    PARSED: "PARSED",
                    BUFFER_FLUSHING: "BUFFER_FLUSHING",
                    ENDED: "ENDED",
                    ERROR: "ERROR"
                },
                T = function(e) {
                    function t(e) {
                        a(this, t);
                        var r = n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, g.default.MEDIA_ATTACHED, g.default.MEDIA_DETACHING, g.default.MANIFEST_LOADING, g.default.MANIFEST_PARSED, g.default.LEVEL_LOADED, g.default.KEY_LOADED, g.default.FRAG_LOADED, g.default.FRAG_LOAD_EMERGENCY_ABORTED, g.default.FRAG_PARSING_INIT_SEGMENT, g.default.FRAG_PARSING_DATA, g.default.FRAG_PARSED, g.default.ERROR, g.default.AUDIO_TRACK_SWITCH, g.default.BUFFER_CREATED, g.default.BUFFER_APPENDED, g.default.BUFFER_FLUSHED));
                        return r.config = e.config, r.audioCodecSwap = !1, r.ticks = 0, r.ontick = r.tick.bind(r), r
                    }
                    return s(t, e), o(t, [{
                        key: "destroy",
                        value: function() {
                            this.stopLoad(), this.timer && (clearInterval(this.timer), this.timer = null), y.default.prototype.destroy.call(this), this.state = A.STOPPED
                        }
                    }, {
                        key: "startLoad",
                        value: function(e) {
                            if (this.levels) {
                                var t = this.lastCurrentTime,
                                    r = this.hls;
                                if (this.stopLoad(), this.timer || (this.timer = setInterval(this.ontick, 100)), this.level = -1, this.fragLoadError = 0, !this.startFragRequested) {
                                    var i = r.startLevel;
                                    i === -1 && (i = 0, this.bitrateTest = !0), this.level = r.nextLoadLevel = i, this.loadedmetadata = !1
                                }
                                t > 0 && e === -1 && (k.logger.log("override startPosition with lastCurrentTime @" + t.toFixed(3)), e = t), this.state = A.IDLE, this.nextLoadPosition = this.startPosition = this.lastCurrentTime = e, this.tick()
                            } else k.logger.warn("cannot start loading as manifest not parsed yet"), this.state = A.STOPPED
                        }
                    }, {
                        key: "stopLoad",
                        value: function() {
                            var e = this.fragCurrent;
                            e && (e.loader && e.loader.abort(), this.fragCurrent = null), this.fragPrevious = null, this.demuxer && (this.demuxer.destroy(), this.demuxer = null), this.state = A.STOPPED
                        }
                    }, {
                        key: "tick",
                        value: function() {
                            this.ticks++, 1 === this.ticks && (this.doTick(), this.ticks > 1 && setTimeout(this.tick, 1), this.ticks = 0)
                        }
                    }, {
                        key: "doTick",
                        value: function() {
                            switch (this.state) {
                                case A.ERROR:
                                    break;
                                case A.BUFFER_FLUSHING:
                                    this.fragLoadError = 0;
                                    break;
                                case A.IDLE:
                                    if (!this._doTickIdle()) return;
                                    break;
                                case A.WAITING_LEVEL:
                                    var e = this.levels[this.level];
                                    e && e.details && (this.state = A.IDLE);
                                    break;
                                case A.FRAG_LOADING_WAITING_RETRY:
                                    var t = performance.now(),
                                        r = this.retryDate;
                                    (!r || t >= r || this.media && this.media.seeking) && (k.logger.log("mediaController: retryDate reached, switch back to IDLE state"), this.state = A.IDLE);
                                    break;
                                case A.ERROR:
                                case A.PAUSED:
                                case A.STOPPED:
                                case A.FRAG_LOADING:
                                case A.PARSING:
                                case A.PARSED:
                                case A.ENDED:
                            }
                            this._checkBuffer(), this._checkFragmentChanged()
                        }
                    }, {
                        key: "_doTickIdle",
                        value: function() {
                            var e = this.hls,
                                t = e.config,
                                r = this.media;
                            if (void 0 !== this.levelLastLoaded && !r && (this.startFragRequested || !t.startFragPrefetch)) return !0;
                            var i = void 0;
                            i = this.loadedmetadata ? r.currentTime : this.nextLoadPosition;
                            var a = e.nextLoadLevel,
                                n = this.levels[a],
                                s = n.bitrate,
                                o = void 0;
                            o = s ? Math.max(8 * t.maxBufferSize / s, t.maxBufferLength) : t.maxBufferLength, o = Math.min(o, t.maxMaxBufferLength);
                            var l = f.default.bufferInfo(this.mediaBuffer ? this.mediaBuffer : r, i, t.maxBufferHole),
                                u = l.len;
                            if (u >= o) return !0;
                            k.logger.trace("buffer length of " + u.toFixed(3) + " is below max of " + o.toFixed(3) + ". checking for more payload ..."), this.level = e.nextLoadLevel = a;
                            var d = n.details;
                            if ("undefined" == typeof d || d.live && this.levelLastLoaded !== a) return this.state = A.WAITING_LEVEL, !0;
                            var h = this.fragPrevious;
                            if (!d.live && h && h.sn === d.endSN && (!r.seeking && l.len || r.duration - l.end <= h.duration / 2)) {
                                var c = {};
                                return this.altAudio && (c.type = "video"), this.hls.trigger(g.default.BUFFER_EOS, c), this.state = A.ENDED, !0
                            }
                            return this._fetchPayloadOrEos({
                                pos: i,
                                bufferInfo: l,
                                levelDetails: d
                            })
                        }
                    }, {
                        key: "_fetchPayloadOrEos",
                        value: function(e) {
                            var t = e.pos,
                                r = e.bufferInfo,
                                i = e.levelDetails,
                                a = this.fragPrevious,
                                n = this.level,
                                s = i.fragments,
                                o = s.length;
                            if (0 === o) return !1;
                            var l = s[0].start,
                                u = s[o - 1].start + s[o - 1].duration,
                                d = r.end,
                                f = void 0;
                            if (i.live) {
                                var h = this.config.initialLiveManifestSize;
                                if (o < h) return k.logger.warn("Can not start playback of a level, reason: not enough fragments " + o + " < " + h), !1;
                                if (f = this._ensureFragmentAtLivePoint({
                                        levelDetails: i,
                                        bufferEnd: d,
                                        start: l,
                                        end: u,
                                        fragPrevious: a,
                                        fragments: s,
                                        fragLen: o
                                    }), null === f) return !1
                            } else d < l && (f = s[0]);
                            return f || (f = this._findFragment({
                                start: l,
                                fragPrevious: a,
                                fragLen: o,
                                fragments: s,
                                bufferEnd: d,
                                end: u,
                                levelDetails: i
                            })), !f || this._loadFragmentOrKey({
                                frag: f,
                                level: n,
                                levelDetails: i,
                                pos: t,
                                bufferEnd: d
                            })
                        }
                    }, {
                        key: "_ensureFragmentAtLivePoint",
                        value: function(e) {
                            var t = e.levelDetails,
                                r = e.bufferEnd,
                                i = e.start,
                                a = e.end,
                                n = e.fragPrevious,
                                s = e.fragments,
                                o = e.fragLen,
                                l = this.hls.config,
                                u = this.media,
                                d = void 0,
                                f = void 0 !== l.liveMaxLatencyDuration ? l.liveMaxLatencyDuration : l.liveMaxLatencyDurationCount * t.targetduration;
                            if (r < Math.max(i, a - f)) {
                                var h = this.liveSyncPosition = this.computeLivePosition(i, t);
                                k.logger.log("buffer end: " + r.toFixed(3) + " is located too far from the end of live sliding playlist, reset currentTime to : " + h.toFixed(3)), r = h, u && u.readyState && u.duration > h && (u.currentTime = h)
                            }
                            if (t.PTSKnown && r > a && u && u.readyState) return null;
                            if (this.startFragRequested && !t.PTSKnown) {
                                if (n) {
                                    var c = n.sn + 1;
                                    c >= t.startSN && c <= t.endSN && (d = s[c - t.startSN], k.logger.log("live playlist, switching playlist, load frag with next SN: " + d.sn))
                                }
                                d || (d = s[Math.min(o - 1, Math.round(o / 2))], k.logger.log("live playlist, switching playlist, unknown, load middle frag : " + d.sn))
                            }
                            return d
                        }
                    }, {
                        key: "_findFragment",
                        value: function(e) {
                            var t = e.start,
                                r = e.fragPrevious,
                                i = e.fragLen,
                                a = e.fragments,
                                n = e.bufferEnd,
                                s = e.end,
                                o = e.levelDetails,
                                l = this.hls.config,
                                d = void 0,
                                f = void 0,
                                h = l.maxFragLookUpTolerance;
                            if (n < s ? (n > s - h && (h = 0), f = u.default.search(a, function(e) {
                                    return e.start + e.duration - h <= n ? 1 : e.start - h > n && e.start ? -1 : 0
                                })) : f = a[i - 1], f && (d = f, t = f.start, r && d.level === r.level && d.sn === r.sn))
                                if (d.sn < o.endSN) {
                                    var c = r.deltaPTS,
                                        v = d.sn - o.startSN;
                                    c && c > l.maxBufferHole && r.dropped && v ? (d = a[v - 1], k.logger.warn("SN just loaded, with large PTS gap between audio and video, maybe frag is not starting with a keyframe ? load previous one to try to overcome this"), r.loadCounter--) : (d = a[v + 1], k.logger.log("SN just loaded, load next one: " + d.sn))
                                } else d = null;
                            return d
                        }
                    }, {
                        key: "_loadFragmentOrKey",
                        value: function(e) {
                            var t = e.frag,
                                r = e.level,
                                i = e.levelDetails,
                                a = e.pos,
                                n = e.bufferEnd,
                                s = this.hls,
                                o = s.config;
                            if (null == t.decryptdata.uri || null != t.decryptdata.key) {
                                if (k.logger.log("Loading " + t.sn + " of [" + i.startSN + " ," + i.endSN + "],level " + r + ", currentTime:" + a.toFixed(3) + ",bufferEnd:" + n.toFixed(3)), void 0 !== this.fragLoadIdx ? this.fragLoadIdx++ : this.fragLoadIdx = 0, t.loadCounter) {
                                    t.loadCounter++;
                                    var l = o.fragLoadingLoopThreshold;
                                    if (t.loadCounter > l && Math.abs(this.fragLoadIdx - t.loadIdx) < l) return s.trigger(g.default.ERROR, {
                                        type: _.ErrorTypes.MEDIA_ERROR,
                                        details: _.ErrorDetails.FRAG_LOOP_LOADING_ERROR,
                                        fatal: !1,
                                        frag: t
                                    }), !1
                                } else t.loadCounter = 1;
                                return t.loadIdx = this.fragLoadIdx, this.fragCurrent = t, this.startFragRequested = !0, this.nextLoadPosition = t.start + t.duration, t.autoLevel = s.autoLevelEnabled, t.bitrateTest = this.bitrateTest, s.trigger(g.default.FRAG_LOADING, {
                                    frag: t
                                }), this.demuxer || (this.demuxer = new c.default(s, "main")), this.state = A.FRAG_LOADING, !0
                            }
                            k.logger.log("Loading key for " + t.sn + " of [" + i.startSN + " ," + i.endSN + "],level " + r), this.state = A.KEY_LOADING, s.trigger(g.default.KEY_LOADING, {
                                frag: t
                            })
                        }
                    }, {
                        key: "getBufferRange",
                        value: function(e) {
                            var t, r, i = this.bufferRange;
                            if (i)
                                for (t = i.length - 1; t >= 0; t--)
                                    if (r = i[t], e >= r.start && e <= r.end) return r;
                            return null
                        }
                    }, {
                        key: "followingBufferRange",
                        value: function(e) {
                            return e ? this.getBufferRange(e.end + .5) : null
                        }
                    }, {
                        key: "_checkFragmentChanged",
                        value: function() {
                            var e, t, r = this.media;
                            if (r && r.readyState && r.seeking === !1 && (t = r.currentTime, t > r.playbackRate * this.lastCurrentTime && (this.lastCurrentTime = t), f.default.isBuffered(r, t) ? e = this.getBufferRange(t) : f.default.isBuffered(r, t + .1) && (e = this.getBufferRange(t + .1)), e)) {
                                var i = e.frag;
                                i !== this.fragPlaying && (this.fragPlaying = i, this.hls.trigger(g.default.FRAG_CHANGED, {
                                    frag: i
                                }))
                            }
                        }
                    }, {
                        key: "immediateLevelSwitch",
                        value: function() {
                            if (k.logger.log("immediateLevelSwitch"), !this.immediateSwitch) {
                                this.immediateSwitch = !0;
                                var e = this.media,
                                    t = void 0;
                                e ? (t = e.paused, e.pause()) : t = !0, this.previouslyPaused = t
                            }
                            var r = this.fragCurrent;
                            r && r.loader && r.loader.abort(), this.fragCurrent = null, this.fragLoadIdx += 2 * this.config.fragLoadingLoopThreshold, this.state = A.BUFFER_FLUSHING, this.hls.trigger(g.default.BUFFER_FLUSHING, {
                                startOffset: 0,
                                endOffset: Number.POSITIVE_INFINITY
                            })
                        }
                    }, {
                        key: "immediateLevelSwitchEnd",
                        value: function() {
                            var e = this.media;
                            e && e.buffered.length && (this.immediateSwitch = !1, f.default.isBuffered(e, e.currentTime) && (e.currentTime -= 1e-4), this.previouslyPaused || e.play())
                        }
                    }, {
                        key: "nextLevelSwitch",
                        value: function() {
                            var e = this.media;
                            if (e && e.readyState) {
                                var t = void 0,
                                    r = void 0,
                                    i = void 0;
                                if (this.fragLoadIdx += 2 * this.config.fragLoadingLoopThreshold, r = this.getBufferRange(e.currentTime), r && r.start > 1 && (this.state = A.BUFFER_FLUSHING, this.hls.trigger(g.default.BUFFER_FLUSHING, {
                                        startOffset: 0,
                                        endOffset: r.start - 1
                                    })), e.paused) t = 0;
                                else {
                                    var a = this.hls.nextLoadLevel,
                                        n = this.levels[a],
                                        s = this.fragLastKbps;
                                    t = s && this.fragCurrent ? this.fragCurrent.duration * n.bitrate / (1e3 * s) + 1 : 0
                                }
                                if (i = this.getBufferRange(e.currentTime + t), i && (i = this.followingBufferRange(i))) {
                                    var o = this.fragCurrent;
                                    o && o.loader && o.loader.abort(), this.fragCurrent = null, this.state = A.BUFFER_FLUSHING, this.hls.trigger(g.default.BUFFER_FLUSHING, {
                                        startOffset: i.start,
                                        endOffset: Number.POSITIVE_INFINITY
                                    })
                                }
                            }
                        }
                    }, {
                        key: "onMediaAttached",
                        value: function(e) {
                            var t = this.media = this.mediaBuffer = e.media;
                            this.onvseeking = this.onMediaSeeking.bind(this), this.onvseeked = this.onMediaSeeked.bind(this), this.onvended = this.onMediaEnded.bind(this), t.addEventListener("seeking", this.onvseeking), t.addEventListener("seeked", this.onvseeked), t.addEventListener("ended", this.onvended);
                            var r = this.config;
                            this.levels && r.autoStartLoad && this.hls.startLoad(r.startPosition)
                        }
                    }, {
                        key: "onMediaDetaching",
                        value: function() {
                            var e = this.media;
                            e && e.ended && (k.logger.log("MSE detaching and video ended, reset startPosition"), this.startPosition = this.lastCurrentTime = 0);
                            var t = this.levels;
                            t && t.forEach(function(e) {
                                e.details && e.details.fragments.forEach(function(e) {
                                    e.loadCounter = void 0
                                })
                            }), e && (e.removeEventListener("seeking", this.onvseeking), e.removeEventListener("seeked", this.onvseeked), e.removeEventListener("ended", this.onvended), this.onvseeking = this.onvseeked = this.onvended = null), this.media = this.mediaBuffer = null, this.loadedmetadata = !1, this.stopLoad()
                        }
                    }, {
                        key: "onMediaSeeking",
                        value: function() {
                            var e = this.media,
                                t = e ? e.currentTime : void 0,
                                r = this.config;
                            if (k.logger.log("media seeking to " + t.toFixed(3)), this.state === A.FRAG_LOADING) {
                                var i = f.default.bufferInfo(e, t, this.config.maxBufferHole),
                                    a = this.fragCurrent;
                                if (0 === i.len && a) {
                                    var n = r.maxFragLookUpTolerance,
                                        s = a.start - n,
                                        o = a.start + a.duration + n;
                                    t < s || t > o ? (a.loader && (k.logger.log("seeking outside of buffer while fragment load in progress, cancel fragment load"), a.loader.abort()), this.fragCurrent = null, this.fragPrevious = null, this.state = A.IDLE) : k.logger.log("seeking outside of buffer but within currently loaded fragment range")
                                }
                            } else this.state === A.ENDED && (this.state = A.IDLE);
                            e && (this.lastCurrentTime = t), this.state !== A.FRAG_LOADING && void 0 !== this.fragLoadIdx && (this.fragLoadIdx += 2 * r.fragLoadingLoopThreshold), this.loadedmetadata || (this.nextLoadPosition = this.startPosition = t), this.tick()
                        }
                    }, {
                        key: "onMediaSeeked",
                        value: function() {
                            k.logger.log("media seeked to " + this.media.currentTime.toFixed(3)), this.tick()
                        }
                    }, {
                        key: "onMediaEnded",
                        value: function() {
                            k.logger.log("media ended"), this.startPosition = this.lastCurrentTime = 0
                        }
                    }, {
                        key: "onManifestLoading",
                        value: function() {
                            k.logger.log("trigger BUFFER_RESET"), this.hls.trigger(g.default.BUFFER_RESET), this.bufferRange = [], this.stalled = !1, this.startPosition = this.lastCurrentTime = 0
                        }
                    }, {
                        key: "onManifestParsed",
                        value: function(e) {
                            var t, r = !1,
                                i = !1;
                            e.levels.forEach(function(e) {
                                t = e.audioCodec, t && (t.indexOf("mp4a.40.2") !== -1 && (r = !0), t.indexOf("mp4a.40.5") !== -1 && (i = !0))
                            }), this.audioCodecSwitch = r && i, this.audioCodecSwitch && k.logger.log("both AAC/HE-AAC audio found in levels; declaring level codec as HE-AAC"), this.levels = e.levels, this.startLevelLoaded = !1, this.startFragRequested = !1;
                            var a = this.config;
                            a.autoStartLoad && this.hls.startLoad(a.startPosition)
                        }
                    }, {
                        key: "onLevelLoaded",
                        value: function(e) {
                            var t = e.details,
                                r = e.level,
                                i = this.levels[r],
                                a = t.totalduration,
                                n = 0;
                            if (k.logger.log("level " + r + " loaded [" + t.startSN + "," + t.endSN + "],duration:" + a), this.levelLastLoaded = r, t.live) {
                                var s = i.details;
                                s && t.fragments.length > 0 ? (E.default.mergeDetails(s, t), n = t.fragments[0].start, this.liveSyncPosition = this.computeLivePosition(n, s), t.PTSKnown ? k.logger.log("live playlist sliding:" + n.toFixed(3)) : k.logger.log("live playlist - outdated PTS, unknown sliding")) : (t.PTSKnown = !1,
                                    k.logger.log("live playlist - first load, unknown sliding"))
                            } else t.PTSKnown = !1;
                            if (i.details = t, this.hls.trigger(g.default.LEVEL_UPDATED, {
                                    details: t,
                                    level: r
                                }), this.startFragRequested === !1) {
                                if (this.startPosition === -1 || this.lastCurrentTime === -1) {
                                    var o = t.startTimeOffset;
                                    isNaN(o) ? t.live ? (this.startPosition = this.computeLivePosition(n, t), k.logger.log("configure startPosition to " + this.startPosition)) : this.startPosition = 0 : (o < 0 && (k.logger.log("negative start time offset " + o + ", count from end of last fragment"), o = n + a + o), k.logger.log("start time offset found in playlist, adjust startPosition to " + o), this.startPosition = o), this.lastCurrentTime = this.startPosition
                                }
                                this.nextLoadPosition = this.startPosition
                            }
                            this.state === A.WAITING_LEVEL && (this.state = A.IDLE), this.tick()
                        }
                    }, {
                        key: "onKeyLoaded",
                        value: function() {
                            this.state === A.KEY_LOADING && (this.state = A.IDLE, this.tick())
                        }
                    }, {
                        key: "onFragLoaded",
                        value: function(e) {
                            var t = this.fragCurrent,
                                r = e.frag;
                            if (this.state === A.FRAG_LOADING && t && "main" === r.type && r.level === t.level && r.sn === t.sn) {
                                var i = e.stats,
                                    a = this.levels[t.level],
                                    n = a.details;
                                if (k.logger.log("Loaded  " + t.sn + " of [" + n.startSN + " ," + n.endSN + "],level " + t.level), this.bitrateTest = !1, r.bitrateTest === !0 && this.hls.nextLoadLevel) this.state = A.IDLE, this.startFragRequested = !1, i.tparsed = i.tbuffered = performance.now(), this.hls.trigger(g.default.FRAG_BUFFERED, {
                                    stats: i,
                                    frag: t,
                                    id: "main"
                                }), this.tick();
                                else {
                                    this.state = A.PARSING, this.stats = i;
                                    var s = n.totalduration,
                                        o = isNaN(t.startDTS) ? t.start : t.startDTS,
                                        l = t.level,
                                        u = t.sn,
                                        d = this.config.defaultAudioCodec || a.audioCodec;
                                    this.audioCodecSwap && (k.logger.log("swapping playlist audio codec"), void 0 === d && (d = this.lastAudioCodec), d && (d = d.indexOf("mp4a.40.5") !== -1 ? "mp4a.40.2" : "mp4a.40.5")), this.pendingAppending = 0, k.logger.log("Parsing " + u + " of [" + n.startSN + " ," + n.endSN + "],level " + l + ", cc " + t.cc);
                                    var f = this.demuxer;
                                    f || (f = this.demuxer = new c.default(this.hls, "main"));
                                    var h = n.PTSKnown || !n.live;
                                    f.push(e.payload, d, a.videoCodec, o, t.cc, l, u, s, t.decryptdata, h)
                                }
                            }
                            this.fragLoadError = 0
                        }
                    }, {
                        key: "onFragParsingInitSegment",
                        value: function(e) {
                            var t = this.fragCurrent;
                            if (t && "main" === e.id && e.sn === t.sn && e.level === t.level && this.state === A.PARSING) {
                                var r, i, a = e.tracks;
                                if (a.audio && this.altAudio && delete a.audio, i = a.audio) {
                                    var n = this.levels[this.level].audioCodec,
                                        s = navigator.userAgent.toLowerCase();
                                    n && this.audioCodecSwap && (k.logger.log("swapping playlist audio codec"), n = n.indexOf("mp4a.40.5") !== -1 ? "mp4a.40.2" : "mp4a.40.5"), this.audioCodecSwitch && 1 !== i.metadata.channelCount && s.indexOf("firefox") === -1 && (n = "mp4a.40.5"), s.indexOf("android") !== -1 && "audio/mpeg" !== i.container && (n = "mp4a.40.2", k.logger.log("Android: force audio codec to " + n)), i.levelCodec = n, i.id = e.id
                                }
                                if (i = a.video, i && (i.levelCodec = this.levels[this.level].videoCodec, i.id = e.id), e.unique) {
                                    var o = {
                                        codec: "",
                                        levelCodec: ""
                                    };
                                    for (r in e.tracks) i = a[r], o.container = i.container, o.codec && (o.codec += ",", o.levelCodec += ","), i.codec && (o.codec += i.codec), i.levelCodec && (o.levelCodec += i.levelCodec);
                                    a = {
                                        audiovideo: o
                                    }
                                }
                                this.hls.trigger(g.default.BUFFER_CODECS, a);
                                for (r in a) {
                                    i = a[r], k.logger.log("main track:" + r + ",container:" + i.container + ",codecs[level/parsed]=[" + i.levelCodec + "/" + i.codec + "]");
                                    var l = i.initSegment;
                                    l && (this.pendingAppending++, this.hls.trigger(g.default.BUFFER_APPENDING, {
                                        type: r,
                                        data: l,
                                        parent: "main",
                                        content: "initSegment"
                                    }))
                                }
                                this.tick()
                            }
                        }
                    }, {
                        key: "onFragParsingData",
                        value: function(e) {
                            var t = this,
                                r = this.fragCurrent;
                            if (r && "main" === e.id && e.sn === r.sn && e.level === r.level && ("audio" !== e.type || !this.altAudio) && this.state === A.PARSING) {
                                var i = this.levels[this.level],
                                    a = this.fragCurrent;
                                k.logger.log("Parsed " + e.type + ",PTS:[" + e.startPTS.toFixed(3) + "," + e.endPTS.toFixed(3) + "],DTS:[" + e.startDTS.toFixed(3) + "/" + e.endDTS.toFixed(3) + "],nb:" + e.nb + ",dropped:" + (e.dropped || 0));
                                var n = E.default.updateFragPTSDTS(i.details, a.sn, e.startPTS, e.endPTS, e.startDTS, e.endDTS),
                                    s = this.hls;
                                s.trigger(g.default.LEVEL_PTS_UPDATED, {
                                    details: i.details,
                                    level: this.level,
                                    drift: n,
                                    type: e.type,
                                    start: e.startPTS,
                                    end: e.endPTS
                                }), "video" === e.type && (a.dropped = e.dropped), [e.data1, e.data2].forEach(function(r) {
                                    r && (t.pendingAppending++, s.trigger(g.default.BUFFER_APPENDING, {
                                        type: e.type,
                                        data: r,
                                        parent: "main",
                                        content: "data"
                                    }))
                                }), this.bufferRange.push({
                                    type: e.type,
                                    start: e.startPTS,
                                    end: e.endPTS,
                                    frag: a
                                }), this.tick()
                            }
                        }
                    }, {
                        key: "onFragParsed",
                        value: function(e) {
                            var t = this.fragCurrent;
                            t && "main" === e.id && e.sn === t.sn && e.level === t.level && this.state === A.PARSING && (this.stats.tparsed = performance.now(), this.state = A.PARSED, this._checkAppendedParsed())
                        }
                    }, {
                        key: "onAudioTrackSwitch",
                        value: function(e) {
                            var t = !!e.url;
                            if (t) this.videoBuffer && this.mediaBuffer !== this.videoBuffer && (k.logger.log("switching on alternate audio, use video.buffered to schedule main fragment loading"), this.mediaBuffer = this.videoBuffer);
                            else if (this.mediaBuffer !== this.media) {
                                k.logger.log("switching on main audio, use media.buffered to schedule main fragment loading"), this.mediaBuffer = this.media;
                                var r = this.fragCurrent;
                                r.loader && (k.logger.log("switching to main audio track, cancel main fragment load"), r.loader.abort()), this.fragCurrent = null, this.fragPrevious = null, this.demuxer && (this.demuxer.destroy(), this.demuxer = null), this.state = A.IDLE
                            }
                            this.altAudio = t
                        }
                    }, {
                        key: "onBufferCreated",
                        value: function(e) {
                            var t = e.tracks,
                                r = void 0,
                                i = void 0,
                                a = !1;
                            for (var n in t) {
                                var s = t[n];
                                "main" === s.id ? (i = n, r = s, "video" === n && (this.videoBuffer = t[n].buffer)) : a = !0
                            }
                            a && r ? (k.logger.log("alternate track found, use " + i + ".buffered to schedule main fragment loading"), this.mediaBuffer = r.buffer) : this.mediaBuffer = this.media
                        }
                    }, {
                        key: "onBufferAppended",
                        value: function(e) {
                            if ("main" === e.parent) switch (this.state) {
                                case A.PARSING:
                                case A.PARSED:
                                    this.pendingAppending--, this._checkAppendedParsed()
                            }
                        }
                    }, {
                        key: "_checkAppendedParsed",
                        value: function() {
                            if (this.state === A.PARSED && 0 === this.pendingAppending) {
                                var e = this.fragCurrent,
                                    t = this.stats;
                                if (e) {
                                    this.fragPrevious = e, t.tbuffered = performance.now(), this.fragLastKbps = Math.round(8 * t.total / (t.tbuffered - t.tfirst)), this.hls.trigger(g.default.FRAG_BUFFERED, {
                                        stats: t,
                                        frag: e,
                                        id: "main"
                                    });
                                    var r = this.mediaBuffer ? this.mediaBuffer : this.media;
                                    k.logger.log("main buffered : " + R.default.toString(r.buffered)), this.state = A.IDLE
                                }
                                this.tick()
                            }
                        }
                    }, {
                        key: "onError",
                        value: function(e) {
                            var t = e.frag || this.fragCurrent;
                            if (!t || "main" === t.type) {
                                var r = this.media,
                                    i = r && f.default.isBuffered(r, r.currentTime) && f.default.isBuffered(r, r.currentTime + .5);
                                switch (e.details) {
                                    case _.ErrorDetails.FRAG_LOAD_ERROR:
                                    case _.ErrorDetails.FRAG_LOAD_TIMEOUT:
                                    case _.ErrorDetails.KEY_LOAD_ERROR:
                                    case _.ErrorDetails.KEY_LOAD_TIMEOUT:
                                        if (!e.fatal) {
                                            var a = this.fragLoadError;
                                            a ? a++ : a = 1;
                                            var n = this.config;
                                            if (a <= n.fragLoadingMaxRetry || i || t.autoLevel && t.level) {
                                                this.fragLoadError = a, t.loadCounter = 0;
                                                var s = Math.min(Math.pow(2, a - 1) * n.fragLoadingRetryDelay, n.fragLoadingMaxRetryTimeout);
                                                k.logger.warn("mediaController: frag loading failed, retry in " + s + " ms"), this.retryDate = performance.now() + s, this.state = A.FRAG_LOADING_WAITING_RETRY
                                            } else k.logger.error("mediaController: " + e.details + " reaches max retry, redispatch as fatal ..."), e.fatal = !0, this.hls.trigger(g.default.ERROR, e), this.state = A.ERROR
                                        }
                                        break;
                                    case _.ErrorDetails.FRAG_LOOP_LOADING_ERROR:
                                        e.fatal || (i ? (this._reduceMaxBufferLength(t.duration), this.state = A.IDLE) : t.autoLevel && 0 !== t.level || (e.fatal = !0, this.hls.trigger(g.default.ERROR, e), this.state = A.ERROR));
                                        break;
                                    case _.ErrorDetails.LEVEL_LOAD_ERROR:
                                    case _.ErrorDetails.LEVEL_LOAD_TIMEOUT:
                                        this.state !== A.ERROR && (e.fatal ? (this.state = A.ERROR, k.logger.warn("streamController: " + e.details + ",switch to " + this.state + " state ...")) : this.state === A.WAITING_LEVEL && (this.state = A.IDLE));
                                        break;
                                    case _.ErrorDetails.BUFFER_FULL_ERROR:
                                        this.state !== A.PARSING && this.state !== A.PARSED || (i ? (this._reduceMaxBufferLength(t.duration), this.state = A.IDLE) : (k.logger.warn("buffer full error also media.currentTime is not buffered, flush everything"), this.fragCurrent = null, this.state = A.PAUSED, this.hls.trigger(g.default.BUFFER_FLUSHING, {
                                            startOffset: 0,
                                            endOffset: Number.POSITIVE_INFINITY
                                        })))
                                }
                            }
                        }
                    }, {
                        key: "_reduceMaxBufferLength",
                        value: function(e) {
                            var t = this.config;
                            t.maxMaxBufferLength >= e && (t.maxMaxBufferLength /= 2, k.logger.warn("reduce max buffer length to " + t.maxMaxBufferLength + "s and switch to IDLE state"), this.fragLoadIdx += 2 * t.fragLoadingLoopThreshold)
                        }
                    }, {
                        key: "_checkBuffer",
                        value: function() {
                            var e = this.media;
                            if (e && e.readyState) {
                                var t = e.currentTime,
                                    r = e.buffered;
                                if (this.loadedmetadata || !r.length || e.seeking)
                                    if (this.immediateSwitch) this.immediateLevelSwitchEnd();
                                    else {
                                        var i = f.default.bufferInfo(e, t, 0),
                                            a = !(e.paused || e.ended || 0 === e.buffered.length),
                                            n = .5,
                                            s = t > e.playbackRate * this.lastCurrentTime,
                                            o = this.config;
                                        if (this.stalled && s && (this.stalled = !1, k.logger.log("playback not stuck anymore @" + t)), a && i.len <= n && (s ? (n = 0, this.seekHoleNudgeDuration = 0) : this.stalled ? this.seekHoleNudgeDuration += o.seekHoleNudgeDuration : (this.seekHoleNudgeDuration = 0, k.logger.log("playback seems stuck @" + t), this.hls.trigger(g.default.ERROR, {
                                                type: _.ErrorTypes.MEDIA_ERROR,
                                                details: _.ErrorDetails.BUFFER_STALLED_ERROR,
                                                fatal: !1
                                            }), this.stalled = !0), i.len <= n)) {
                                            var l = i.nextStart,
                                                u = l - t;
                                            if (l && u < o.maxSeekHole && u > 0) {
                                                k.logger.log("adjust currentTime from " + e.currentTime + " to next buffered @ " + l + " + nudge " + this.seekHoleNudgeDuration);
                                                var d = l + this.seekHoleNudgeDuration - e.currentTime;
                                                e.currentTime = l + this.seekHoleNudgeDuration, this.hls.trigger(g.default.ERROR, {
                                                    type: _.ErrorTypes.MEDIA_ERROR,
                                                    details: _.ErrorDetails.BUFFER_SEEK_OVER_HOLE,
                                                    fatal: !1,
                                                    hole: d
                                                })
                                            }
                                        }
                                    } else {
                                    this.loadedmetadata = !0;
                                    var h = this.startPosition,
                                        c = f.default.isBuffered(e, h);
                                    t === h && c || (k.logger.log("target start position:" + h), c || (h = r.start(0), k.logger.log("target start position not buffered, seek to buffered.start(0) " + h)), k.logger.log("adjust currentTime from " + t + " to " + h), e.currentTime = h)
                                }
                            }
                        }
                    }, {
                        key: "onFragLoadEmergencyAborted",
                        value: function() {
                            this.state = A.IDLE, this.loadedmetadata || (this.startFragRequested = !1), this.tick()
                        }
                    }, {
                        key: "onBufferFlushed",
                        value: function() {
                            var e = this.mediaBuffer ? this.mediaBuffer : this.media,
                                t = this.bufferRange,
                                r = [],
                                i = void 0,
                                a = void 0;
                            for (a = 0; a < t.length; a++) i = t[a], f.default.isBuffered(e, (i.start + i.end) / 2) && r.push(i);
                            this.bufferRange = r, this.fragLoadIdx += 2 * this.config.fragLoadingLoopThreshold, this.state = A.IDLE, this.fragPrevious = null
                        }
                    }, {
                        key: "swapAudioCodec",
                        value: function() {
                            this.audioCodecSwap = !this.audioCodecSwap
                        }
                    }, {
                        key: "computeLivePosition",
                        value: function(e, t) {
                            var r = void 0 !== this.config.liveSyncDuration ? this.config.liveSyncDuration : this.config.liveSyncDurationCount * t.targetduration;
                            return e + Math.max(0, t.totalduration - r)
                        }
                    }, {
                        key: "state",
                        set: function(e) {
                            if (this.state !== e) {
                                var t = this.state;
                                this._state = e, k.logger.log("engine state transition from " + t + " to " + e), this.hls.trigger(g.default.STREAM_STATE_TRANSITION, {
                                    previousState: t,
                                    nextState: e
                                })
                            }
                        },
                        get: function() {
                            return this._state
                        }
                    }, {
                        key: "currentLevel",
                        get: function() {
                            var e = this.media;
                            if (e) {
                                var t = this.getBufferRange(e.currentTime);
                                if (t) return t.frag.level
                            }
                            return -1
                        }
                    }, {
                        key: "nextBufferRange",
                        get: function() {
                            var e = this.media;
                            return e ? this.followingBufferRange(this.getBufferRange(e.currentTime)) : null
                        }
                    }, {
                        key: "nextLevel",
                        get: function() {
                            var e = this.nextBufferRange;
                            return e ? e.frag.level : -1
                        }
                    }, {
                        key: "liveSyncPosition",
                        get: function() {
                            return this._liveSyncPosition
                        },
                        set: function(e) {
                            this._liveSyncPosition = e
                        }
                    }]), t
                }(y.default);
            r.default = T
        }, {
            22: 22,
            26: 26,
            27: 27,
            28: 28,
            30: 30,
            31: 31,
            41: 41,
            45: 45,
            46: 46
        }],
        13: [function(e, t, r) {
            "use strict";

            function i(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }

            function a(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }

            function n(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }

            function s(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var o = function() {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var i = t[r];
                            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                        }
                    }
                    return function(t, r, i) {
                        return r && e(t.prototype, r), i && e(t, i), t
                    }
                }(),
                l = e(28),
                u = i(l),
                d = e(27),
                f = i(d),
                h = e(42),
                c = i(h),
                v = function(e) {
                    function t(e) {
                        a(this, t);
                        var r = n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, u.default.MEDIA_ATTACHING, u.default.MEDIA_DETACHING, u.default.FRAG_PARSING_USERDATA, u.default.MANIFEST_LOADING, u.default.FRAG_LOADED, u.default.LEVEL_SWITCH));
                        if (r.hls = e, r.config = e.config, r.enabled = !0, r.Cues = e.config.cueHandler, r.config.enableCEA708Captions) {
                            var i = r,
                                s = function(e, t) {
                                    var r = null;
                                    try {
                                        r = new window.Event("addtrack")
                                    } catch (e) {
                                        r = document.createEvent("Event"), r.initEvent("addtrack", !1, !1)
                                    }
                                    r.track = e, t.dispatchEvent(r)
                                },
                                o = {
                                    newCue: function(e, t, r) {
                                        if (!i.textTrack1) {
                                            var a = i.getExistingTrack("1");
                                            a ? (i.textTrack1 = a, i.clearCurrentCues(i.textTrack1), s(i.textTrack1, i.media)) : (i.textTrack1 = i.createTextTrack("captions", "English", "en"), i.textTrack1.textTrack1 = !0)
                                        }
                                        i.Cues.newCue(i.textTrack1, e, t, r)
                                    }
                                },
                                l = {
                                    newCue: function(e, t, r) {
                                        if (!i.textTrack2) {
                                            var a = i.getExistingTrack("2");
                                            a ? (i.textTrack2 = a, i.clearCurrentCues(i.textTrack2), s(i.textTrack2, i.media)) : (i.textTrack2 = i.createTextTrack("captions", "Spanish", "es"), i.textTrack2.textTrack2 = !0)
                                        }
                                        i.Cues.newCue(i.textTrack2, e, t, r)
                                    }
                                };
                            r.cea608Parser = new c.default(0, o, l)
                        }
                        return r
                    }
                    return s(t, e), o(t, [{
                        key: "clearCurrentCues",
                        value: function(e) {
                            if (e && e.cues)
                                for (; e.cues.length > 0;) e.removeCue(e.cues[0])
                        }
                    }, {
                        key: "getExistingTrack",
                        value: function(e) {
                            var t = this.media;
                            if (t)
                                for (var r = 0; r < t.textTracks.length; r++) {
                                    var i = t.textTracks[r],
                                        a = "textTrack" + e;
                                    if (i[a] === !0) return i
                                }
                            return null
                        }
                    }, {
                        key: "createTextTrack",
                        value: function(e, t, r) {
                            if (this.media) return this.media.addTextTrack(e, t, r)
                        }
                    }, {
                        key: "destroy",
                        value: function() {
                            f.default.prototype.destroy.call(this)
                        }
                    }, {
                        key: "onMediaAttaching",
                        value: function(e) {
                            this.media = e.media
                        }
                    }, {
                        key: "onMediaDetaching",
                        value: function() {
                            this.clearCurrentCues(this.textTrack1), this.clearCurrentCues(this.textTrack2)
                        }
                    }, {
                        key: "onManifestLoading",
                        value: function() {
                            this.lastPts = Number.NEGATIVE_INFINITY
                        }
                    }, {
                        key: "onLevelSwitch",
                        value: function() {
                            "NONE" === this.hls.currentLevel.closedCaptions ? this.enabled = !1 : this.enabled = !0
                        }
                    }, {
                        key: "onFragLoaded",
                        value: function(e) {
                            if ("main" === e.frag.type) {
                                var t = e.frag.start;
                                t <= this.lastPts && (this.clearCurrentCues(this.textTrack1), this.clearCurrentCues(this.textTrack2)), this.lastPts = t
                            }
                        }
                    }, {
                        key: "onFragParsingUserdata",
                        value: function(e) {
                            if (this.enabled && this.config.enableCEA708Captions)
                                for (var t = 0; t < e.samples.length; t++) {
                                    var r = this.extractCea608Data(e.samples[t].bytes);
                                    this.cea608Parser.addData(e.samples[t].pts, r)
                                }
                        }
                    }, {
                        key: "extractCea608Data",
                        value: function(e) {
                            for (var t, r, i, a, n, s = 31 & e[0], o = 2, l = [], u = 0; u < s; u++) t = e[o++], r = 127 & e[o++], i = 127 & e[o++], a = 0 !== (4 & t), n = 3 & t, 0 === r && 0 === i || a && 0 === n && (l.push(r), l.push(i));
                            return l
                        }
                    }]), t
                }(f.default);
            r.default = v
        }, {
            27: 27,
            28: 28,
            42: 42
        }],
        14: [function(e, t, r) {
            "use strict";

            function i(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var a = function() {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var i = t[r];
                            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                        }
                    }
                    return function(t, r, i) {
                        return r && e(t.prototype, r), i && e(t, i), t
                    }
                }(),
                n = function() {
                    function e(t, r) {
                        i(this, e), this.subtle = t, this.aesIV = r
                    }
                    return a(e, [{
                        key: "decrypt",
                        value: function(e, t) {
                            return this.subtle.decrypt({
                                name: "AES-CBC",
                                iv: this.aesIV
                            }, t, e)
                        }
                    }]), e
                }();
            r.default = n
        }, {}],
        15: [function(e, t, r) {
            "use strict";

            function i(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var a = function() {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var i = t[r];
                            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                        }
                    }
                    return function(t, r, i) {
                        return r && e(t.prototype, r), i && e(t, i), t
                    }
                }(),
                n = function() {
                    function e() {
                        i(this, e), this.rcon = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54], this.subMix = [], this.subMix[0] = new Uint32Array(256), this.subMix[1] = new Uint32Array(256), this.subMix[2] = new Uint32Array(256), this.subMix[3] = new Uint32Array(256), this.invSubMix = [], this.invSubMix[0] = new Uint32Array(256), this.invSubMix[1] = new Uint32Array(256), this.invSubMix[2] = new Uint32Array(256), this.invSubMix[3] = new Uint32Array(256), this.sBox = new Uint32Array(256), this.invSBox = new Uint32Array(256), this.key = new Uint32Array(0), this.initTable()
                    }
                    return a(e, [{
                        key: "uint8ArrayToUint32Array_",
                        value: function(e) {
                            for (var t = new DataView(e), r = new Uint32Array(4), i = 0; i < r.length; i++) r[i] = t.getUint32(4 * i);
                            return r
                        }
                    }, {
                        key: "initTable",
                        value: function() {
                            var e = this.sBox,
                                t = this.invSBox,
                                r = this.subMix[0],
                                i = this.subMix[1],
                                a = this.subMix[2],
                                n = this.subMix[3],
                                s = this.invSubMix[0],
                                o = this.invSubMix[1],
                                l = this.invSubMix[2],
                                u = this.invSubMix[3],
                                d = new Uint32Array(256),
                                f = 0,
                                h = 0,
                                c = 0;
                            for (c = 0; c < 256; c++) c < 128 ? d[c] = c << 1 : d[c] = c << 1 ^ 283;
                            for (c = 0; c < 256; c++) {
                                var v = h ^ h << 1 ^ h << 2 ^ h << 3 ^ h << 4;
                                v = v >>> 8 ^ 255 & v ^ 99, e[f] = v, t[v] = f;
                                var g = d[f],
                                    p = d[g],
                                    y = d[p],
                                    m = 257 * d[v] ^ 16843008 * v;
                                r[f] = m << 24 | m >>> 8, i[f] = m << 16 | m >>> 16, a[f] = m << 8 | m >>> 24, n[f] = m, m = 16843009 * y ^ 65537 * p ^ 257 * g ^ 16843008 * f, s[v] = m << 24 | m >>> 8, o[v] = m << 16 | m >>> 16, l[v] = m << 8 | m >>> 24, u[v] = m, f ? (f = g ^ d[d[d[y ^ g]]], h ^= d[d[h]]) : f = h = 1
                            }
                        }
                    }, {
                        key: "expandKey",
                        value: function(e) {
                            for (var t = this.uint8ArrayToUint32Array_(e), r = !0, i = 0; i < t.length && r;) r = t[i] === this.key[i], i++;
                            if (!r) {
                                this.key = t;
                                var a = this.keySize = t.length;
                                if (4 !== a && 6 !== a && 8 !== a) throw new Error("Invalid aes key size=" + a);
                                var n = this.ksRows = 4 * (a + 6 + 1),
                                    s = void 0,
                                    o = void 0,
                                    l = this.keySchedule = new Uint32Array(this.ksRows),
                                    u = this.invKeySchedule = new Uint32Array(this.ksRows),
                                    d = this.sBox,
                                    f = this.rcon,
                                    h = this.invSubMix[0],
                                    c = this.invSubMix[1],
                                    v = this.invSubMix[2],
                                    g = this.invSubMix[3],
                                    p = void 0,
                                    y = void 0;
                                for (s = 0; s < n; s++) s < a ? p = l[s] = t[s] : (y = p, s % a === 0 ? (y = y << 8 | y >>> 24, y = d[y >>> 24] << 24 | d[y >>> 16 & 255] << 16 | d[y >>> 8 & 255] << 8 | d[255 & y], y ^= f[s / a | 0] << 24) : a > 6 && s % a === 4 && (y = d[y >>> 24] << 24 | d[y >>> 16 & 255] << 16 | d[y >>> 8 & 255] << 8 | d[255 & y]), l[s] = p = (l[s - a] ^ y) >>> 0);
                                for (o = 0; o < n; o++) s = n - o, y = 3 & o ? l[s] : l[s - 4], o < 4 || s <= 4 ? u[o] = y : u[o] = h[d[y >>> 24]] ^ c[d[y >>> 16 & 255]] ^ v[d[y >>> 8 & 255]] ^ g[d[255 & y]], u[o] = u[o] >>> 0
                            }
                        }
                    }, {
                        key: "networkToHostOrderSwap",
                        value: function(e) {
                            return e << 24 | (65280 & e) << 8 | (16711680 & e) >> 8 | e >>> 24
                        }
                    }, {
                        key: "decrypt",
                        value: function(e, t, r) {
                            for (var i, a, n = this.keySize + 6, s = this.invKeySchedule, o = this.invSBox, l = this.invSubMix[0], u = this.invSubMix[1], d = this.invSubMix[2], f = this.invSubMix[3], h = this.uint8ArrayToUint32Array_(r), c = h[0], v = h[1], g = h[2], p = h[3], y = new Int32Array(e), m = new Int32Array(y.length), E = void 0, b = void 0, R = void 0, _ = void 0, k = void 0, A = void 0, T = void 0, S = void 0, L = void 0, D = void 0, w = void 0, O = void 0; t < y.length;) {
                                for (L = this.networkToHostOrderSwap(y[t]), D = this.networkToHostOrderSwap(y[t + 1]), w = this.networkToHostOrderSwap(y[t + 2]), O = this.networkToHostOrderSwap(y[t + 3]), k = L ^ s[0], A = O ^ s[1], T = w ^ s[2], S = D ^ s[3], i = 4, a = 1; a < n; a++) E = l[k >>> 24] ^ u[A >> 16 & 255] ^ d[T >> 8 & 255] ^ f[255 & S] ^ s[i], b = l[A >>> 24] ^ u[T >> 16 & 255] ^ d[S >> 8 & 255] ^ f[255 & k] ^ s[i + 1], R = l[T >>> 24] ^ u[S >> 16 & 255] ^ d[k >> 8 & 255] ^ f[255 & A] ^ s[i + 2], _ = l[S >>> 24] ^ u[k >> 16 & 255] ^ d[A >> 8 & 255] ^ f[255 & T] ^ s[i + 3], k = E, A = b, T = R, S = _, i += 4;
                                E = o[k >>> 24] << 24 ^ o[A >> 16 & 255] << 16 ^ o[T >> 8 & 255] << 8 ^ o[255 & S] ^ s[i], b = o[A >>> 24] << 24 ^ o[T >> 16 & 255] << 16 ^ o[S >> 8 & 255] << 8 ^ o[255 & k] ^ s[i + 1], R = o[T >>> 24] << 24 ^ o[S >> 16 & 255] << 16 ^ o[k >> 8 & 255] << 8 ^ o[255 & A] ^ s[i + 2], _ = o[S >>> 24] << 24 ^ o[k >> 16 & 255] << 16 ^ o[A >> 8 & 255] << 8 ^ o[255 & T] ^ s[i + 3], i += 3, m[t] = this.networkToHostOrderSwap(E ^ c), m[t + 1] = this.networkToHostOrderSwap(_ ^ v), m[t + 2] = this.networkToHostOrderSwap(R ^ g), m[t + 3] = this.networkToHostOrderSwap(b ^ p), c = L, v = D, g = w, p = O, t += 4
                            }
                            return m.buffer
                        }
                    }, {
                        key: "destroy",
                        value: function() {
                            this.key = void 0, this.keySize = void 0, this.ksRows = void 0, this.sBox = void 0, this.invSBox = void 0, this.subMix = void 0, this.invSubMix = void 0, this.keySchedule = void 0, this.invKeySchedule = void 0, this.rcon = void 0
                        }
                    }]), e
                }();
            r.default = n
        }, {}],
        16: [function(e, t, r) {
            "use strict";

            function i(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }

            function a(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var n = function() {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var i = t[r];
                            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                        }
                    }
                    return function(t, r, i) {
                        return r && e(t.prototype, r), i && e(t, i), t
                    }
                }(),
                s = e(14),
                o = i(s),
                l = e(17),
                u = i(l),
                d = e(15),
                f = i(d),
                h = e(26),
                c = e(45),
                v = function() {
                    function e(t) {
                        a(this, e), this.hls = t;
                        try {
                            var r = window ? window.crypto : crypto;
                            this.subtle = r.subtle || r.webkitSubtle
                        } catch (e) {}
                        this.disableWebCrypto = !this.supportsWebCrypto()
                    }
                    return n(e, [{
                        key: "supportsWebCrypto",
                        value: function() {
                            return this.subtle && "https:" === window.location.protocol
                        }
                    }, {
                        key: "decrypt",
                        value: function(e, t, r, i) {
                            var a = this;
                            this.disableWebCrypto && this.hls.config.enableSoftwareAES ? (c.logger.log("decrypting by JavaScript Implementation"), this.decryptor || (this.decryptor = new f.default), this.decryptor.expandKey(t), i(this.decryptor.decrypt(e, 0, r))) : ! function() {
                                c.logger.log("decrypting by WebCrypto API");
                                var n = a.subtle;
                                a.key !== t && (a.key = t, a.fastAesKey = new u.default(n, t)), a.fastAesKey.expandKey().then(function(t) {
                                    var a = new o.default(n, r);
                                    a.decrypt(e, t).then(function(e) {
                                        i(e)
                                    })
                                }).catch(function(n) {
                                    a.onWebCryptoError(n, e, t, r, i)
                                })
                            }()
                        }
                    }, {
                        key: "onWebCryptoError",
                        value: function(e, t, r, i, a) {
                            var n = this.hls;
                            n.config.enableSoftwareAES ? (c.logger.log("disabling to use WebCrypto API"), this.disableWebCrypto = !0, this.decrypt(t, r, i, a)) : (c.logger.error("decrypting error : " + e.message), n.trigger(Event.ERROR, {
                                type: h.ErrorTypes.MEDIA_ERROR,
                                details: h.ErrorDetails.FRAG_DECRYPT_ERROR,
                                fatal: !0,
                                reason: e.message
                            }))
                        }
                    }, {
                        key: "destroy",
                        value: function() {
                            var e = this.decryptor;
                            e && (e.destroy(), this.decryptor = void 0)
                        }
                    }]), e
                }();
            r.default = v
        }, {
            14: 14,
            15: 15,
            17: 17,
            26: 26,
            45: 45
        }],
        17: [function(e, t, r) {
            "use strict";

            function i(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var a = function() {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var i = t[r];
                            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                        }
                    }
                    return function(t, r, i) {
                        return r && e(t.prototype, r), i && e(t, i), t
                    }
                }(),
                n = function() {
                    function e(t, r) {
                        i(this, e), this.subtle = t, this.key = r
                    }
                    return a(e, [{
                        key: "expandKey",
                        value: function() {
                            return this.subtle.importKey("raw", this.key, {
                                name: "AES-CBC"
                            }, !1, ["encrypt", "decrypt"])
                        }
                    }]), e
                }();
            r.default = n
        }, {}],
        18: [function(e, t, r) {
            "use strict";

            function i(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }

            function a(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var n = function() {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var i = t[r];
                            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                        }
                    }
                    return function(t, r, i) {
                        return r && e(t.prototype, r), i && e(t, i), t
                    }
                }(),
                s = e(19),
                o = i(s),
                l = e(45),
                u = e(24),
                d = i(u),
                f = function() {
                    function e(t, r, i, n, s) {
                        a(this, e), this.observer = t, this.id = r, this.remuxerClass = i, this.config = n, this.remuxer = new this.remuxerClass(t, r, n, s), this.insertDiscontinuity()
                    }
                    return n(e, [{
                        key: "insertDiscontinuity",
                        value: function() {
                            this._aacTrack = {
                                container: "audio/adts",
                                type: "audio",
                                id: -1,
                                sequenceNumber: 0,
                                isAAC: !0,
                                samples: [],
                                len: 0
                            }
                        }
                    }, {
                        key: "push",
                        value: function(e, t, r, i, a, n, s, u, f) {
                            var h, c, v, g, p, y, m, E, b, R, _ = new d.default(e),
                                k = 90 * _.timeStamp,
                                A = !1;
                            for (a !== this.lastCC ? (l.logger.log(this.id + " discontinuity detected"), this.lastCC = a, this.insertDiscontinuity(), this.remuxer.switchLevel(), this.remuxer.insertDiscontinuity()) : n !== this.lastLevel ? (l.logger.log("audio track switch detected"), this.lastLevel = n, this.remuxer.switchLevel(), this.insertDiscontinuity()) : s === this.lastSN + 1 && (A = !0), h = this._aacTrack, this.lastSN = s, this.lastLevel = n, y = _.length, b = e.length; y < b - 1 && (255 !== e[y] || 240 !== (240 & e[y + 1])); y++);
                            for (h.audiosamplerate || (c = o.default.getAudioConfig(this.observer, e, y, t), h.config = c.config, h.audiosamplerate = c.samplerate, h.channelCount = c.channelCount, h.codec = c.codec, h.duration = u, l.logger.log("parsed codec:" + h.codec + ",rate:" + c.samplerate + ",nb channel:" + c.channelCount)), p = 0, g = 9216e4 / h.audiosamplerate; y + 5 < b && (m = 1 & e[y + 1] ? 7 : 9, v = (3 & e[y + 3]) << 11 | e[y + 4] << 3 | (224 & e[y + 5]) >>> 5, v -= m, v > 0 && y + m + v <= b);)
                                for (E = k + p * g, R = {
                                        unit: e.subarray(y + m, y + m + v),
                                        pts: E,
                                        dts: E
                                    }, h.samples.push(R), h.len += v, y += v + m, p++; y < b - 1 && (255 !== e[y] || 240 !== (240 & e[y + 1])); y++);
                            this.remuxer.remux(n, s, this._aacTrack, {
                                samples: []
                            }, {
                                samples: [{
                                    pts: k,
                                    dts: k,
                                    unit: _.payload
                                }]
                            }, {
                                samples: []
                            }, i, A, f)
                        }
                    }, {
                        key: "destroy",
                        value: function() {}
                    }], [{
                        key: "probe",
                        value: function(e) {
                            var t, r, i = new d.default(e);
                            if (i.hasTimeStamp)
                                for (t = i.length, r = e.length; t < r - 1; t++)
                                    if (255 === e[t] && 240 === (240 & e[t + 1])) return !0;
                            return !1
                        }
                    }]), e
                }();
            r.default = f
        }, {
            19: 19,
            24: 24,
            45: 45
        }],
        19: [function(e, t, r) {
            "use strict";

            function i(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var a = function() {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var i = t[r];
                            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                        }
                    }
                    return function(t, r, i) {
                        return r && e(t.prototype, r), i && e(t, i), t
                    }
                }(),
                n = e(45),
                s = e(26),
                o = function() {
                    function e() {
                        i(this, e)
                    }
                    return a(e, null, [{
                        key: "getAudioConfig",
                        value: function(e, t, r, i) {
                            var a, o, l, u, d, f = navigator.userAgent.toLowerCase(),
                                h = [96e3, 88200, 64e3, 48e3, 44100, 32e3, 24e3, 22050, 16e3, 12e3, 11025, 8e3, 7350];
                            return a = ((192 & t[r + 2]) >>> 6) + 1, o = (60 & t[r + 2]) >>> 2, o > h.length - 1 ? void e.trigger(Event.ERROR, {
                                type: s.ErrorTypes.MEDIA_ERROR,
                                details: s.ErrorDetails.FRAG_PARSING_ERROR,
                                fatal: !0,
                                reason: "invalid ADTS sampling index:" + o
                            }) : (u = (1 & t[r + 2]) << 2, u |= (192 & t[r + 3]) >>> 6, n.logger.log("manifest codec:" + i + ",ADTS data:type:" + a + ",sampleingIndex:" + o + "[" + h[o] + "Hz],channelConfig:" + u), /firefox|OPR/i.test(f) ? o >= 6 ? (a = 5, d = new Array(4), l = o - 3) : (a = 2, d = new Array(2), l = o) : f.indexOf("android") !== -1 ? (a = 2, d = new Array(2), l = o) : (a = 5, d = new Array(4), i && (i.indexOf("mp4a.40.29") !== -1 || i.indexOf("mp4a.40.5") !== -1) || !i && o >= 6 ? l = o - 3 : ((i && i.indexOf("mp4a.40.2") !== -1 && o >= 6 && 1 === u || !i && 1 === u) && (a = 2, d = new Array(2)), l = o)), d[0] = a << 3, d[0] |= (14 & o) >> 1, d[1] |= (1 & o) << 7, d[1] |= u << 3, 5 === a && (d[1] |= (14 & l) >> 1, d[2] = (1 & l) << 7, d[2] |= 8, d[3] = 0), {
                                config: d,
                                samplerate: h[o],
                                channelCount: u,
                                codec: "mp4a.40." + a
                            })
                        }
                    }]), e
                }();
            r.default = o
        }, {
            26: 26,
            45: 45
        }],
        20: [function(e, t, r) {
            "use strict";

            function i(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }

            function a(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var n = function() {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var i = t[r];
                            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                        }
                    }
                    return function(t, r, i) {
                        return r && e(t.prototype, r), i && e(t, i), t
                    }
                }(),
                s = e(28),
                o = i(s),
                l = e(26),
                u = e(18),
                d = i(u),
                f = e(25),
                h = i(f),
                c = e(38),
                v = i(c),
                g = e(39),
                p = i(g),
                y = function() {
                    function e(t, r, i) {
                        var n = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : null;
                        a(this, e), this.hls = t, this.id = r, this.config = this.hls.config || n, this.typeSupported = i
                    }
                    return n(e, [{
                        key: "destroy",
                        value: function() {
                            var e = this.demuxer;
                            e && e.destroy()
                        }
                    }, {
                        key: "push",
                        value: function(e, t, r, i, a, n, s, u, f) {
                            var c = this.demuxer;
                            if (!c) {
                                var g = this.hls,
                                    y = this.id,
                                    m = this.config,
                                    E = this.typeSupported;
                                if (h.default.probe(e)) c = this.typeSupported.mp2t === !0 ? new h.default(g, y, p.default, m, E) : new h.default(g, y, v.default, m, E);
                                else {
                                    if (!d.default.probe(e)) return void g.trigger(o.default.ERROR, {
                                        type: l.ErrorTypes.MEDIA_ERROR,
                                        id: y,
                                        details: l.ErrorDetails.FRAG_PARSING_ERROR,
                                        fatal: !0,
                                        reason: "no demux matching with content found"
                                    });
                                    c = new d.default(g, y, v.default, m, E)
                                }
                                this.demuxer = c
                            }
                            c.push(e, t, r, i, a, n, s, u, f)
                        }
                    }]), e
                }();
            r.default = y
        }, {
            18: 18,
            25: 25,
            26: 26,
            28: 28,
            38: 38,
            39: 39
        }],
        21: [function(e, t, r) {
            "use strict";

            function i(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var a = e(20),
                n = i(a),
                s = e(28),
                o = i(s),
                l = e(45),
                u = e(1),
                d = i(u),
                f = function(e) {
                    var t = new d.default;
                    t.trigger = function(e) {
                        for (var r = arguments.length, i = Array(r > 1 ? r - 1 : 0), a = 1; a < r; a++) i[a - 1] = arguments[a];
                        t.emit.apply(t, [e, e].concat(i))
                    }, t.off = function(e) {
                        for (var r = arguments.length, i = Array(r > 1 ? r - 1 : 0), a = 1; a < r; a++) i[a - 1] = arguments[a];
                        t.removeListener.apply(t, [e].concat(i))
                    };
                    var r = function(t, r) {
                        e.postMessage({
                            event: t,
                            data: r
                        })
                    };
                    e.addEventListener("message", function(i) {
                        var a = i.data;
                        switch (a.cmd) {
                            case "init":
                                var s = JSON.parse(a.config);
                                e.demuxer = new n.default(t, a.id, a.typeSupported, s);
                                try {
                                    (0, l.enableLogs)(s.debug === !0)
                                } catch (e) {}
                                r("init", null);
                                break;
                            case "demux":
                                e.demuxer.push(new Uint8Array(a.data), a.audioCodec, a.videoCodec, a.timeOffset, a.cc, a.level, a.sn, a.duration, a.accurateTimeOffset)
                        }
                    }), t.on(o.default.FRAG_PARSING_INIT_SEGMENT, r), t.on(o.default.FRAG_PARSED, r), t.on(o.default.ERROR, r), t.on(o.default.FRAG_PARSING_METADATA, r), t.on(o.default.FRAG_PARSING_USERDATA, r), t.on(o.default.FRAG_PARSING_DATA, function(t, r) {
                        var i = r.data1.buffer,
                            a = r.data2.buffer;
                        delete r.data1, delete r.data2, e.postMessage({
                            event: t,
                            data: r,
                            data1: i,
                            data2: a
                        }, [i, a])
                    })
                };
            r.default = f
        }, {
            1: 1,
            20: 20,
            28: 28,
            45: 45
        }],
        22: [function(e, t, r) {
            "use strict";

            function i(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }

            function a(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var n = function() {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var i = t[r];
                            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                        }
                    }
                    return function(t, r, i) {
                        return r && e(t.prototype, r), i && e(t, i), t
                    }
                }(),
                s = e(28),
                o = i(s),
                l = e(20),
                u = i(l),
                d = e(21),
                f = i(d),
                h = e(45),
                c = e(16),
                v = i(c),
                g = e(26),
                p = function() {
                    function t(r, i) {
                        a(this, t), this.hls = r, this.id = i;
                        var n = {
                            mp4: MediaSource.isTypeSupported("video/mp4"),
                            mp2t: r.config.enableMP2TPassThrough && MediaSource.isTypeSupported("video/mp2t"),
                            mpeg: MediaSource.isTypeSupported("audio/mpeg"),
                            mp3: MediaSource.isTypeSupported('audio/mp4; codecs="mp3"')
                        };
                        if (r.config.enableWorker && "undefined" != typeof Worker) {
                            h.logger.log("demuxing in webworker");
                            var s = void 0;
                            try {
                                var l = e(3);
                                s = this.w = l(f.default), this.onwmsg = this.onWorkerMessage.bind(this), s.addEventListener("message", this.onwmsg), s.onerror = function(e) {
                                    r.trigger(o.default.ERROR, {
                                        type: g.ErrorTypes.OTHER_ERROR,
                                        details: g.ErrorDetails.INTERNAL_EXCEPTION,
                                        fatal: !0,
                                        event: "demuxerWorker",
                                        err: {
                                            message: e.message + " (" + e.filename + ":" + e.lineno + ")"
                                        }
                                    })
                                }, s.postMessage({
                                    cmd: "init",
                                    typeSupported: n,
                                    id: i,
                                    config: JSON.stringify(r.config)
                                })
                            } catch (e) {
                                h.logger.error("error while initializing DemuxerWorker, fallback on DemuxerInline"), s && URL.revokeObjectURL(s.objectURL), this.demuxer = new u.default(r, i, n)
                            }
                        } else this.demuxer = new u.default(r, i, n);
                        this.demuxInitialized = !0
                    }
                    return n(t, [{
                        key: "destroy",
                        value: function() {
                            var e = this.w;
                            if (e) e.removeEventListener("message", this.onwmsg), e.terminate(), this.w = null;
                            else {
                                var t = this.demuxer;
                                t && (t.destroy(), this.demuxer = null)
                            }
                            var r = this.decrypter;
                            r && (r.destroy(), this.decrypter = null)
                        }
                    }, {
                        key: "pushDecrypted",
                        value: function(e, t, r, i, a, n, s, o, l) {
                            var u = this.w;
                            if (u) u.postMessage({
                                cmd: "demux",
                                data: e,
                                audioCodec: t,
                                videoCodec: r,
                                timeOffset: i,
                                cc: a,
                                level: n,
                                sn: s,
                                duration: o,
                                accurateTimeOffset: l
                            }, [e]);
                            else {
                                var d = this.demuxer;
                                d && d.push(new Uint8Array(e), t, r, i, a, n, s, o, l)
                            }
                        }
                    }, {
                        key: "push",
                        value: function(e, t, r, i, a, n, s, l, u, d) {
                            if (e.byteLength > 0 && null != u && null != u.key && "AES-128" === u.method) {
                                null == this.decrypter && (this.decrypter = new v.default(this.hls));
                                var f = this,
                                    h = performance.now();
                                this.decrypter.decrypt(e, u.key.buffer, u.iv.buffer, function(e) {
                                    f.hls.trigger(o.default.FRAG_DECRYPTED, {
                                        level: n,
                                        sn: s,
                                        stats: {
                                            tstart: h,
                                            tdecrypt: performance.now()
                                        }
                                    }), f.pushDecrypted(e, t, r, i, a, n, s, l, d)
                                })
                            } else this.pushDecrypted(e, t, r, i, a, n, s, l, d)
                        }
                    }, {
                        key: "onWorkerMessage",
                        value: function(e) {
                            var t = e.data,
                                r = this.hls;
                            switch (t.event) {
                                case "init":
                                    URL.revokeObjectURL(this.w.objectURL);
                                    break;
                                case o.default.FRAG_PARSING_DATA:
                                    t.data.data1 = new Uint8Array(t.data1), t.data.data2 = new Uint8Array(t.data2);
                                default:
                                    r.trigger(t.event, t.data)
                            }
                        }
                    }]), t
                }();
            r.default = p
        }, {
            16: 16,
            20: 20,
            21: 21,
            26: 26,
            28: 28,
            3: 3,
            45: 45
        }],
        23: [function(e, t, r) {
            "use strict";

            function i(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var a = function() {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var i = t[r];
                            i.enumerable = i.enumerable || !1,
                                i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                        }
                    }
                    return function(t, r, i) {
                        return r && e(t.prototype, r), i && e(t, i), t
                    }
                }(),
                n = e(45),
                s = function() {
                    function e(t) {
                        i(this, e), this.data = t, this.bytesAvailable = t.byteLength, this.word = 0, this.bitsAvailable = 0
                    }
                    return a(e, [{
                        key: "loadWord",
                        value: function() {
                            var e = this.data,
                                t = this.bytesAvailable,
                                r = e.byteLength - t,
                                i = new Uint8Array(4),
                                a = Math.min(4, t);
                            if (0 === a) throw new Error("no bytes available");
                            i.set(e.subarray(r, r + a)), this.word = new DataView(i.buffer).getUint32(0), this.bitsAvailable = 8 * a, this.bytesAvailable -= a
                        }
                    }, {
                        key: "skipBits",
                        value: function(e) {
                            var t;
                            this.bitsAvailable > e ? (this.word <<= e, this.bitsAvailable -= e) : (e -= this.bitsAvailable, t = e >> 3, e -= t >> 3, this.bytesAvailable -= t, this.loadWord(), this.word <<= e, this.bitsAvailable -= e)
                        }
                    }, {
                        key: "readBits",
                        value: function(e) {
                            var t = Math.min(this.bitsAvailable, e),
                                r = this.word >>> 32 - t;
                            return e > 32 && n.logger.error("Cannot read more than 32 bits at a time"), this.bitsAvailable -= t, this.bitsAvailable > 0 ? this.word <<= t : this.bytesAvailable > 0 && this.loadWord(), t = e - t, t > 0 && this.bitsAvailable ? r << t | this.readBits(t) : r
                        }
                    }, {
                        key: "skipLZ",
                        value: function() {
                            var e;
                            for (e = 0; e < this.bitsAvailable; ++e)
                                if (0 !== (this.word & 2147483648 >>> e)) return this.word <<= e, this.bitsAvailable -= e, e;
                            return this.loadWord(), e + this.skipLZ()
                        }
                    }, {
                        key: "skipUEG",
                        value: function() {
                            this.skipBits(1 + this.skipLZ())
                        }
                    }, {
                        key: "skipEG",
                        value: function() {
                            this.skipBits(1 + this.skipLZ())
                        }
                    }, {
                        key: "readUEG",
                        value: function() {
                            var e = this.skipLZ();
                            return this.readBits(e + 1) - 1
                        }
                    }, {
                        key: "readEG",
                        value: function() {
                            var e = this.readUEG();
                            return 1 & e ? 1 + e >>> 1 : -1 * (e >>> 1)
                        }
                    }, {
                        key: "readBoolean",
                        value: function() {
                            return 1 === this.readBits(1)
                        }
                    }, {
                        key: "readUByte",
                        value: function() {
                            return this.readBits(8)
                        }
                    }, {
                        key: "readUShort",
                        value: function() {
                            return this.readBits(16)
                        }
                    }, {
                        key: "readUInt",
                        value: function() {
                            return this.readBits(32)
                        }
                    }, {
                        key: "skipScalingList",
                        value: function(e) {
                            var t, r, i = 8,
                                a = 8;
                            for (t = 0; t < e; t++) 0 !== a && (r = this.readEG(), a = (i + r + 256) % 256), i = 0 === a ? i : a
                        }
                    }, {
                        key: "readSPS",
                        value: function() {
                            var e, t, r, i, a, n, s, o, l, u = 0,
                                d = 0,
                                f = 0,
                                h = 0,
                                c = 1,
                                v = this.readUByte.bind(this),
                                g = this.readBits.bind(this),
                                p = this.readUEG.bind(this),
                                y = this.readBoolean.bind(this),
                                m = this.skipBits.bind(this),
                                E = this.skipEG.bind(this),
                                b = this.skipUEG.bind(this),
                                R = this.skipScalingList.bind(this);
                            if (v(), e = v(), t = g(5), m(3), r = v(), b(), 100 === e || 110 === e || 122 === e || 244 === e || 44 === e || 83 === e || 86 === e || 118 === e || 128 === e) {
                                var _ = p();
                                if (3 === _ && m(1), b(), b(), m(1), y())
                                    for (o = 3 !== _ ? 8 : 12, l = 0; l < o; l++) y() && R(l < 6 ? 16 : 64)
                            }
                            b();
                            var k = p();
                            if (0 === k) p();
                            else if (1 === k)
                                for (m(1), E(), E(), i = p(), l = 0; l < i; l++) E();
                            if (b(), m(1), a = p(), n = p(), s = g(1), 0 === s && m(1), m(1), y() && (u = p(), d = p(), f = p(), h = p()), y() && y()) {
                                var A = void 0,
                                    T = v();
                                switch (T) {
                                    case 1:
                                        A = [1, 1];
                                        break;
                                    case 2:
                                        A = [12, 11];
                                        break;
                                    case 3:
                                        A = [10, 11];
                                        break;
                                    case 4:
                                        A = [16, 11];
                                        break;
                                    case 5:
                                        A = [40, 33];
                                        break;
                                    case 6:
                                        A = [24, 11];
                                        break;
                                    case 7:
                                        A = [20, 11];
                                        break;
                                    case 8:
                                        A = [32, 11];
                                        break;
                                    case 9:
                                        A = [80, 33];
                                        break;
                                    case 10:
                                        A = [18, 11];
                                        break;
                                    case 11:
                                        A = [15, 11];
                                        break;
                                    case 12:
                                        A = [64, 33];
                                        break;
                                    case 13:
                                        A = [160, 99];
                                        break;
                                    case 14:
                                        A = [4, 3];
                                        break;
                                    case 15:
                                        A = [3, 2];
                                        break;
                                    case 16:
                                        A = [2, 1];
                                        break;
                                    case 255:
                                        A = [v() << 8 | v(), v() << 8 | v()]
                                }
                                A && (c = A[0] / A[1])
                            }
                            return {
                                width: Math.ceil((16 * (a + 1) - 2 * u - 2 * d) * c),
                                height: (2 - s) * (n + 1) * 16 - (s ? 2 : 4) * (f + h)
                            }
                        }
                    }, {
                        key: "readSliceType",
                        value: function() {
                            return this.readUByte(), this.readUEG(), this.readUEG()
                        }
                    }]), e
                }();
            r.default = s
        }, {
            45: 45
        }],
        24: [function(e, t, r) {
            "use strict";

            function i(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var a = function() {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var i = t[r];
                            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                        }
                    }
                    return function(t, r, i) {
                        return r && e(t.prototype, r), i && e(t, i), t
                    }
                }(),
                n = e(45),
                s = function() {
                    function e(t) {
                        i(this, e), this._hasTimeStamp = !1;
                        for (var r, a, s, o, l, u, d, f, h = 0;;)
                            if (d = this.readUTF(t, h, 3), h += 3, "ID3" === d) h += 3, r = 127 & t[h++], a = 127 & t[h++], s = 127 & t[h++], o = 127 & t[h++], l = (r << 21) + (a << 14) + (s << 7) + o, u = h + l, this._parseID3Frames(t, h, u), h = u;
                            else {
                                if ("3DI" !== d) return h -= 3, f = h, void(f && (this.hasTimeStamp || n.logger.warn("ID3 tag found, but no timestamp"), this._length = f, this._payload = t.subarray(0, f)));
                                h += 7, n.logger.log("3DI footer found, end: " + h)
                            }
                    }
                    return a(e, [{
                        key: "readUTF",
                        value: function(e, t, r) {
                            var i = "",
                                a = t,
                                n = t + r;
                            do i += String.fromCharCode(e[a++]); while (a < n);
                            return i
                        }
                    }, {
                        key: "_parseID3Frames",
                        value: function(e, t, r) {
                            for (var i, a, s, o, l; t + 8 <= r;) switch (i = this.readUTF(e, t, 4), t += 4, a = e[t++] << 24 + e[t++] << 16 + e[t++] << 8 + e[t++], o = e[t++] << 8 + e[t++], s = t, i) {
                                case "PRIV":
                                    if ("com.apple.streaming.transportStreamTimestamp" === this.readUTF(e, t, 44)) {
                                        t += 44, t += 4;
                                        var u = 1 & e[t++];
                                        this._hasTimeStamp = !0, l = ((e[t++] << 23) + (e[t++] << 15) + (e[t++] << 7) + e[t++]) / 45, u && (l += 47721858.84), l = Math.round(l), n.logger.trace("ID3 timestamp found: " + l), this._timeStamp = l
                                    }
                            }
                        }
                    }, {
                        key: "hasTimeStamp",
                        get: function() {
                            return this._hasTimeStamp
                        }
                    }, {
                        key: "timeStamp",
                        get: function() {
                            return this._timeStamp
                        }
                    }, {
                        key: "length",
                        get: function() {
                            return this._length
                        }
                    }, {
                        key: "payload",
                        get: function() {
                            return this._payload
                        }
                    }]), e
                }();
            r.default = s
        }, {
            45: 45
        }],
        25: [function(e, t, r) {
            "use strict";

            function i(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }

            function a(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var n = function() {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var i = t[r];
                            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                        }
                    }
                    return function(t, r, i) {
                        return r && e(t.prototype, r), i && e(t, i), t
                    }
                }(),
                s = e(19),
                o = i(s),
                l = e(28),
                u = i(l),
                d = e(23),
                f = i(d),
                h = e(45),
                c = e(26),
                v = function() {
                    function e(t, r, i, n, s) {
                        a(this, e), this.observer = t, this.id = r, this.remuxerClass = i, this.config = n, this.typeSupported = s, this.lastCC = 0, this.remuxer = new this.remuxerClass(t, r, n, s)
                    }
                    return n(e, [{
                        key: "switchLevel",
                        value: function() {
                            this.pmtParsed = !1, this._pmtId = -1, this._avcTrack = {
                                container: "video/mp2t",
                                type: "video",
                                id: -1,
                                sequenceNumber: 0,
                                samples: [],
                                len: 0,
                                dropped: 0
                            }, this._audioTrack = {
                                container: "video/mp2t",
                                type: "audio",
                                id: -1,
                                sequenceNumber: 0,
                                samples: [],
                                len: 0,
                                isAAC: !0
                            }, this._id3Track = {
                                type: "id3",
                                id: -1,
                                sequenceNumber: 0,
                                samples: [],
                                len: 0
                            }, this._txtTrack = {
                                type: "text",
                                id: -1,
                                sequenceNumber: 0,
                                samples: [],
                                len: 0
                            }, this.aacOverFlow = null, this.aacLastPTS = null, this.avcSample = null, this.remuxer.switchLevel()
                        }
                    }, {
                        key: "insertDiscontinuity",
                        value: function() {
                            this.switchLevel(), this.remuxer.insertDiscontinuity()
                        }
                    }, {
                        key: "push",
                        value: function(e, t, r, i, a, n, s, o, l) {
                            var d, f, v, g, p, y, m = e.length,
                                E = this.remuxer.passthrough,
                                b = !1;
                            this.audioCodec = t, this.videoCodec = r, this._duration = o, this.contiguous = !1, this.accurateTimeOffset = l, a !== this.lastCC && (h.logger.log("discontinuity detected"), this.insertDiscontinuity(), this.lastCC = a), n !== this.lastLevel ? (h.logger.log("level switch detected"), this.switchLevel(), this.lastLevel = n) : s === this.lastSN + 1 && (this.contiguous = !0), this.lastSN = s;
                            var R = this.pmtParsed,
                                _ = this._avcTrack,
                                k = this._audioTrack,
                                A = this._id3Track,
                                T = _.id,
                                S = k.id,
                                L = A.id,
                                D = this._pmtId,
                                w = _.pesData,
                                O = k.pesData,
                                C = A.pesData,
                                P = this._parsePAT,
                                I = this._parsePMT,
                                M = this._parsePES,
                                x = this._parseAVCPES.bind(this),
                                F = this._parseAACPES.bind(this),
                                N = this._parseMPEGPES.bind(this),
                                U = this._parseID3PES.bind(this);
                            for (m -= m % 188, d = 0; d < m; d += 188)
                                if (71 === e[d]) {
                                    if (f = !!(64 & e[d + 1]), v = ((31 & e[d + 1]) << 8) + e[d + 2], g = (48 & e[d + 3]) >> 4, g > 1) {
                                        if (p = d + 5 + e[d + 4], p === d + 188) continue
                                    } else p = d + 4;
                                    switch (v) {
                                        case T:
                                            if (f) {
                                                if (w && (y = M(w)) && (x(y, !1), E && _.codec && (S === -1 || k.codec))) return void this.remux(n, s, e, i);
                                                w = {
                                                    data: [],
                                                    size: 0
                                                }
                                            }
                                            w && (w.data.push(e.subarray(p, d + 188)), w.size += d + 188 - p);
                                            break;
                                        case S:
                                            if (f) {
                                                if (O && (y = M(O)) && (k.isAAC ? F(y) : N(y), E && k.codec && (T === -1 || _.codec))) return void this.remux(n, s, e, i);
                                                O = {
                                                    data: [],
                                                    size: 0
                                                }
                                            }
                                            O && (O.data.push(e.subarray(p, d + 188)), O.size += d + 188 - p);
                                            break;
                                        case L:
                                            f && (C && (y = M(C)) && U(y), C = {
                                                data: [],
                                                size: 0
                                            }), C && (C.data.push(e.subarray(p, d + 188)), C.size += d + 188 - p);
                                            break;
                                        case 0:
                                            f && (p += e[p] + 1), D = this._pmtId = P(e, p);
                                            break;
                                        case D:
                                            f && (p += e[p] + 1);
                                            var G = I(e, p, this.typeSupported.mpeg === !0 || this.typeSupported.mp3 === !0);
                                            T = G.avc, T > 0 && (_.id = T), S = G.audio, S > 0 && (k.id = S, k.isAAC = G.isAAC), L = G.id3, L > 0 && (A.id = L), b && !R && (h.logger.log("reparse from beginning"), b = !1, d = -188), R = this.pmtParsed = !0;
                                            break;
                                        case 17:
                                        case 8191:
                                            break;
                                        default:
                                            b = !0
                                    }
                                } else this.observer.trigger(u.default.ERROR, {
                                    type: c.ErrorTypes.MEDIA_ERROR,
                                    id: this.id,
                                    details: c.ErrorDetails.FRAG_PARSING_ERROR,
                                    fatal: !1,
                                    reason: "TS packet did not start with 0x47"
                                });
                            w && (y = M(w)) ? (x(y, !0), _.pesData = null) : _.pesData = w, O && (y = M(O)) ? (k.isAAC ? F(y) : N(y), k.pesData = null) : (O && O.size && h.logger.log("last AAC PES packet truncated,might overlap between fragments"), k.pesData = O), C && (y = M(C)) ? (U(y), A.pesData = null) : A.pesData = C, this.remux(n, s, null, i)
                        }
                    }, {
                        key: "remux",
                        value: function(e, t, r, i) {
                            for (var a = this._avcTrack, n = a.samples, s = 0, o = 0, l = 0; l < n.length; l++) {
                                for (var u = n[l], d = u.units.units, f = d.length, h = 0, c = 0; c < f; c++) h += d[c].data.length;
                                o += h, s += f, u.length = h
                            }
                            a.len = o, a.nbNalu = s, this.remuxer.remux(e, t, this._audioTrack, this._avcTrack, this._id3Track, this._txtTrack, i, this.contiguous, this.accurateTimeOffset, r)
                        }
                    }, {
                        key: "destroy",
                        value: function() {
                            this.switchLevel(), this._initPTS = this._initDTS = void 0, this._duration = 0
                        }
                    }, {
                        key: "_parsePAT",
                        value: function(e, t) {
                            return (31 & e[t + 10]) << 8 | e[t + 11]
                        }
                    }, {
                        key: "_parsePMT",
                        value: function(e, t, r) {
                            var i, a, n, s, o = {
                                audio: -1,
                                avc: -1,
                                id3: -1,
                                isAAC: !0
                            };
                            for (i = (15 & e[t + 1]) << 8 | e[t + 2], a = t + 3 + i - 4, n = (15 & e[t + 10]) << 8 | e[t + 11], t += 12 + n; t < a;) {
                                switch (s = (31 & e[t + 1]) << 8 | e[t + 2], e[t]) {
                                    case 15:
                                        o.audio === -1 && (o.audio = s);
                                        break;
                                    case 21:
                                        o.id3 === -1 && (o.id3 = s);
                                        break;
                                    case 27:
                                        o.avc === -1 && (o.avc = s);
                                        break;
                                    case 3:
                                    case 4:
                                        r ? o.audio === -1 && (o.audio = s, o.isAAC = !1) : h.logger.log("MPEG audio found, not supported in this browser for now");
                                        break;
                                    case 36:
                                        h.logger.warn("HEVC stream type found, not supported for now");
                                        break;
                                    default:
                                        h.logger.log("unkown stream type:" + e[t])
                                }
                                t += ((15 & e[t + 3]) << 8 | e[t + 4]) + 5
                            }
                            return o
                        }
                    }, {
                        key: "_parsePES",
                        value: function(e) {
                            var t, r, i, a, n, s, o, l, u, d = 0,
                                f = e.data;
                            if (!e || 0 === e.size) return null;
                            for (; f[0].length < 19 && f.length > 1;) {
                                var h = new Uint8Array(f[0].length + f[1].length);
                                h.set(f[0]), h.set(f[1], f[0].length), f[0] = h, f.splice(1, 1)
                            }
                            if (t = f[0], i = (t[0] << 16) + (t[1] << 8) + t[2], 1 === i) {
                                if (a = (t[4] << 8) + t[5], a && a > e.size - 6) return null;
                                for (r = t[7], 192 & r && (o = 536870912 * (14 & t[9]) + 4194304 * (255 & t[10]) + 16384 * (254 & t[11]) + 128 * (255 & t[12]) + (254 & t[13]) / 2, o > 4294967295 && (o -= 8589934592), 64 & r ? (l = 536870912 * (14 & t[14]) + 4194304 * (255 & t[15]) + 16384 * (254 & t[16]) + 128 * (255 & t[17]) + (254 & t[18]) / 2, l > 4294967295 && (l -= 8589934592)) : l = o), n = t[8], u = n + 9, e.size -= u, s = new Uint8Array(e.size); f.length;) {
                                    t = f.shift();
                                    var c = t.byteLength;
                                    if (u) {
                                        if (u > c) {
                                            u -= c;
                                            continue
                                        }
                                        t = t.subarray(u), c -= u, u = 0
                                    }
                                    s.set(t, d), d += c
                                }
                                return a && (a -= n + 3), {
                                    data: s,
                                    pts: o,
                                    dts: l,
                                    len: a
                                }
                            }
                            return null
                        }
                    }, {
                        key: "pushAccesUnit",
                        value: function(e, t) {
                            e.units.units.length && e.frame && (!this.config.forceKeyFrameOnDiscontinuity || e.key === !0 || t.sps && (t.samples.length || this.contiguous) ? t.samples.push(e) : t.dropped++), e.debug.length && h.logger.log(e.pts + "/" + e.dts + ":" + e.debug + "," + e.units.length)
                        }
                    }, {
                        key: "_parseAVCPES",
                        value: function(e, t) {
                            var r, i, a, n = this,
                                s = this._avcTrack,
                                o = this._parseAVCNALu(e.data),
                                l = !1,
                                u = this.avcSample;
                            e.data = null, o.forEach(function(t) {
                                switch (t.type) {
                                    case 1:
                                        i = !0, l && u && (u.debug += "NDR "), u.frame = !0;
                                        var o = t.data;
                                        if (o.length > 1) {
                                            var d = new f.default(o).readSliceType();
                                            2 !== d && 4 !== d && 7 !== d && 9 !== d || (u.key = !0)
                                        }
                                        break;
                                    case 5:
                                        i = !0, u || (u = n.avcSample = n._createAVCSample(!0, e.pts, e.dts, "")), l && (u.debug += "IDR "), u.key = !0, u.frame = !0;
                                        break;
                                    case 6:
                                        i = !0, l && u && (u.debug += "SEI "), r = new f.default(n.discardEPB(t.data)), r.readUByte();
                                        for (var h = 0, c = 0, v = !1, g = 0; !v && r.bytesAvailable > 1;) {
                                            h = 0;
                                            do g = r.readUByte(), h += g; while (255 === g);
                                            c = 0;
                                            do g = r.readUByte(), c += g; while (255 === g);
                                            if (4 === h && 0 !== r.bytesAvailable) {
                                                v = !0;
                                                var p = r.readUByte();
                                                if (181 === p) {
                                                    var y = r.readUShort();
                                                    if (49 === y) {
                                                        var m = r.readUInt();
                                                        if (1195456820 === m) {
                                                            var E = r.readUByte();
                                                            if (3 === E) {
                                                                var b = r.readUByte(),
                                                                    R = r.readUByte(),
                                                                    _ = 31 & b,
                                                                    k = [b, R];
                                                                for (a = 0; a < _; a++) k.push(r.readUByte()), k.push(r.readUByte()), k.push(r.readUByte());
                                                                n._insertSampleInOrder(n._txtTrack.samples, {
                                                                    type: 3,
                                                                    pts: e.pts,
                                                                    bytes: k
                                                                })
                                                            }
                                                        }
                                                    }
                                                }
                                            } else if (c < r.bytesAvailable)
                                                for (a = 0; a < c; a++) r.readUByte()
                                        }
                                        break;
                                    case 7:
                                        if (i = !0, l && u && (u.debug += "SPS "), !s.sps) {
                                            r = new f.default(t.data);
                                            var A = r.readSPS();
                                            s.width = A.width, s.height = A.height, s.sps = [t.data], s.duration = n._duration;
                                            var T = t.data.subarray(1, 4),
                                                S = "avc1.";
                                            for (a = 0; a < 3; a++) {
                                                var L = T[a].toString(16);
                                                L.length < 2 && (L = "0" + L), S += L
                                            }
                                            s.codec = S
                                        }
                                        break;
                                    case 8:
                                        i = !0, l && u && (u.debug += "PPS "), s.pps || (s.pps = [t.data]);
                                        break;
                                    case 9:
                                        i = !1, u && n.pushAccesUnit(u, s), u = n.avcSample = n._createAVCSample(!1, e.pts, e.dts, l ? "AUD " : "");
                                        break;
                                    case 12:
                                        i = !1;
                                        break;
                                    default:
                                        i = !1, u && (u.debug += "unknown NAL " + t.type + " ")
                                }
                                if (u && i) {
                                    var D = u.units;
                                    D.units.push(t)
                                }
                            }), t && u && (this.pushAccesUnit(u, s), this.avcSample = null)
                        }
                    }, {
                        key: "_createAVCSample",
                        value: function(e, t, r, i) {
                            return {
                                key: e,
                                pts: t,
                                dts: r,
                                units: {
                                    units: [],
                                    length: 0
                                },
                                debug: i
                            }
                        }
                    }, {
                        key: "_insertSampleInOrder",
                        value: function(e, t) {
                            var r = e.length;
                            if (r > 0) {
                                if (t.pts >= e[r - 1].pts) e.push(t);
                                else
                                    for (var i = r - 1; i >= 0; i--)
                                        if (t.pts < e[i].pts) {
                                            e.splice(i, 0, t);
                                            break
                                        }
                            } else e.push(t)
                        }
                    }, {
                        key: "_getLastNalUnit",
                        value: function() {
                            var e = this.avcSample,
                                t = void 0;
                            if (!e || 0 === e.units.units.length) {
                                var r = this._avcTrack,
                                    i = r.samples;
                                e = i[i.length - 1]
                            }
                            if (e) {
                                var a = e.units.units;
                                t = a[a.length - 1]
                            }
                            return t
                        }
                    }, {
                        key: "_parseAVCNALu",
                        value: function(e) {
                            for (var t, r, i, a, n, s = 0, o = e.byteLength, l = this._avcTrack, u = l.naluState || 0, d = u, f = [], h = -1; s < o;)
                                if (t = e[s++], u)
                                    if (1 !== u) switch (u) {
                                        case 2:
                                        case 3:
                                            if (0 === t) u = 3;
                                            else if (1 === t) {
                                                if (h >= 0) i = {
                                                    data: e.subarray(h, s - u - 1),
                                                    type: n
                                                }, f.push(i);
                                                else {
                                                    var c = this._getLastNalUnit();
                                                    if (c && (d && s <= 4 - d && c.state && (c.data = c.data.subarray(0, c.data.byteLength - d)), r = s - u - 1, r > 0)) {
                                                        var v = new Uint8Array(c.data.byteLength + r);
                                                        v.set(c.data, 0), v.set(e.subarray(0, r), c.data.byteLength), c.data = v
                                                    }
                                                }
                                                s < o ? (a = 31 & e[s], h = s, n = a, u = 0) : u = -1
                                            } else u = 0;
                                            break;
                                        case -1:
                                            h = 0, n = 31 & t, u = 0
                                    } else u = t ? 0 : 2;
                                    else u = t ? 0 : 1;
                            if (h >= 0 && u >= 0 && (i = {
                                    data: e.subarray(h, o),
                                    type: n,
                                    state: u
                                }, f.push(i)), 0 === f.length) {
                                var g = this._getLastNalUnit();
                                if (g) {
                                    var p = new Uint8Array(g.data.byteLength + e.byteLength);
                                    p.set(g.data, 0), p.set(e, g.data.byteLength), g.data = p
                                }
                            }
                            return l.naluState = u, f
                        }
                    }, {
                        key: "discardEPB",
                        value: function(e) {
                            for (var t, r, i = e.byteLength, a = [], n = 1; n < i - 2;) 0 === e[n] && 0 === e[n + 1] && 3 === e[n + 2] ? (a.push(n + 2), n += 2) : n++;
                            if (0 === a.length) return e;
                            t = i - a.length, r = new Uint8Array(t);
                            var s = 0;
                            for (n = 0; n < t; s++, n++) s === a[0] && (s++, a.shift()), r[n] = e[s];
                            return r
                        }
                    }, {
                        key: "_parseAACPES",
                        value: function(e) {
                            var t, r, i, a, n, s, l, d, f, v = this._audioTrack,
                                g = e.data,
                                p = e.pts,
                                y = 0,
                                m = this.aacOverFlow,
                                E = this.aacLastPTS;
                            if (m) {
                                var b = new Uint8Array(m.byteLength + g.byteLength);
                                b.set(m, 0), b.set(g, m.byteLength), g = b
                            }
                            for (n = y, d = g.length; n < d - 1 && (255 !== g[n] || 240 !== (240 & g[n + 1])); n++);
                            if (n) {
                                var R, _;
                                if (n < d - 1 ? (R = "AAC PES did not start with ADTS header,offset:" + n, _ = !1) : (R = "no ADTS header found in AAC PES", _ = !0), h.logger.warn("parsing error:" + R), this.observer.trigger(u.default.ERROR, {
                                        type: c.ErrorTypes.MEDIA_ERROR,
                                        id: this.id,
                                        details: c.ErrorDetails.FRAG_PARSING_ERROR,
                                        fatal: _,
                                        reason: R
                                    }), _) return
                            }
                            if (v.audiosamplerate || (t = o.default.getAudioConfig(this.observer, g, n, this.audioCodec), v.config = t.config, v.audiosamplerate = t.samplerate, v.channelCount = t.channelCount, v.codec = t.codec, v.duration = this._duration, h.logger.log("parsed codec:" + v.codec + ",rate:" + t.samplerate + ",nb channel:" + t.channelCount)), a = 0, i = 9216e4 / v.audiosamplerate, m && E) {
                                var k = E + i;
                                Math.abs(k - p) > 1 && (h.logger.log("AAC: align PTS for overlapping frames by " + Math.round((k - p) / 90)), p = k)
                            }
                            for (; n + 5 < d && (s = 1 & g[n + 1] ? 7 : 9, r = (3 & g[n + 3]) << 11 | g[n + 4] << 3 | (224 & g[n + 5]) >>> 5, r -= s, r > 0 && n + s + r <= d);)
                                for (l = p + a * i, f = {
                                        unit: g.subarray(n + s, n + s + r),
                                        pts: l,
                                        dts: l
                                    }, v.samples.push(f), v.len += r, n += r + s, a++; n < d - 1 && (255 !== g[n] || 240 !== (240 & g[n + 1])); n++);
                            m = n < d ? g.subarray(n, d) : null, this.aacOverFlow = m, this.aacLastPTS = l
                        }
                    }, {
                        key: "_parseMPEGPES",
                        value: function(e) {
                            for (var t, r = e.data, i = e.pts, a = r.length, n = 0, s = 0; s < a && (t = this._parseMpeg(r, s, a, n++, i)) > 0;) s += t
                        }
                    }, {
                        key: "_onMpegFrame",
                        value: function(e, t, r, i, a, n) {
                            var s = 1152 / r * 1e3,
                                o = n + a * s,
                                l = this._audioTrack;
                            l.config = [], l.channelCount = i, l.audiosamplerate = r, l.duration = this._duration, l.samples.push({
                                unit: e,
                                pts: o,
                                dts: o
                            }), l.len += e.length
                        }
                    }, {
                        key: "_onMpegNoise",
                        value: function(e) {
                            h.logger.warn("mpeg audio has noise: " + e.length + " bytes")
                        }
                    }, {
                        key: "_parseMpeg",
                        value: function(e, t, r, i, a) {
                            var n = [32, 64, 96, 128, 160, 192, 224, 256, 288, 320, 352, 384, 416, 448, 32, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 384, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 32, 48, 56, 64, 80, 96, 112, 128, 144, 160, 176, 192, 224, 256, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160],
                                s = [44100, 48e3, 32e3, 22050, 24e3, 16e3, 11025, 12e3, 8e3];
                            if (t + 2 > r) return -1;
                            if (255 === e[t] || 224 === (224 & e[t + 1])) {
                                if (t + 24 > r) return -1;
                                var o = e[t + 1] >> 3 & 3,
                                    l = e[t + 1] >> 1 & 3,
                                    u = e[t + 2] >> 4 & 15,
                                    d = e[t + 2] >> 2 & 3,
                                    f = !!(2 & e[t + 2]);
                                if (1 !== o && 0 !== u && 15 !== u && 3 !== d) {
                                    var h = 3 === o ? 3 - l : 3 === l ? 3 : 4,
                                        c = 1e3 * n[14 * h + u - 1],
                                        v = 3 === o ? 0 : 2 === o ? 1 : 2,
                                        g = s[3 * v + d],
                                        p = f ? 1 : 0,
                                        y = e[t + 3] >> 6 === 3 ? 1 : 2,
                                        m = 3 === l ? (3 === o ? 12 : 6) * c / g + p << 2 : (3 === o ? 144 : 72) * c / g + p | 0;
                                    return t + m > r ? -1 : (this._onMpegFrame && this._onMpegFrame(e.subarray(t, t + m), c, g, y, i, a), m)
                                }
                            }
                            for (var E = t + 2; E < r;) {
                                if (255 === e[E - 1] && 224 === (224 & e[E])) return this._onMpegNoise && this._onMpegNoise(e.subarray(t, E - 1)), E - t - 1;
                                E++
                            }
                            return -1
                        }
                    }, {
                        key: "_parseID3PES",
                        value: function(e) {
                            this._id3Track.samples.push(e)
                        }
                    }], [{
                        key: "probe",
                        value: function(e) {
                            return e.length >= 564 && 71 === e[0] && 71 === e[188] && 71 === e[376]
                        }
                    }]), e
                }();
            r.default = v
        }, {
            19: 19,
            23: 23,
            26: 26,
            28: 28,
            45: 45
        }],
        26: [function(e, t, r) {
            "use strict";
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            r.ErrorTypes = {
                NETWORK_ERROR: "networkError",
                MEDIA_ERROR: "mediaError",
                MUX_ERROR: "muxError",
                OTHER_ERROR: "otherError"
            }, r.ErrorDetails = {
                MANIFEST_LOAD_ERROR: "manifestLoadError",
                MANIFEST_LOAD_TIMEOUT: "manifestLoadTimeOut",
                MANIFEST_PARSING_ERROR: "manifestParsingError",
                MANIFEST_INCOMPATIBLE_CODECS_ERROR: "manifestIncompatibleCodecsError",
                LEVEL_LOAD_ERROR: "levelLoadError",
                LEVEL_LOAD_TIMEOUT: "levelLoadTimeOut",
                LEVEL_SWITCH_ERROR: "levelSwitchError",
                AUDIO_TRACK_LOAD_ERROR: "audioTrackLoadError",
                AUDIO_TRACK_LOAD_TIMEOUT: "audioTrackLoadTimeOut",
                FRAG_LOAD_ERROR: "fragLoadError",
                FRAG_LOOP_LOADING_ERROR: "fragLoopLoadingError",
                FRAG_LOAD_TIMEOUT: "fragLoadTimeOut",
                FRAG_DECRYPT_ERROR: "fragDecryptError",
                FRAG_PARSING_ERROR: "fragParsingError",
                REMUX_ALLOC_ERROR: "remuxAllocError",
                KEY_LOAD_ERROR: "keyLoadError",
                KEY_LOAD_TIMEOUT: "keyLoadTimeOut",
                BUFFER_ADD_CODEC_ERROR: "bufferAddCodecError",
                BUFFER_APPEND_ERROR: "bufferAppendError",
                BUFFER_APPENDING_ERROR: "bufferAppendingError",
                BUFFER_STALLED_ERROR: "bufferStalledError",
                BUFFER_FULL_ERROR: "bufferFullError",
                BUFFER_SEEK_OVER_HOLE: "bufferSeekOverHole",
                INTERNAL_EXCEPTION: "internalException"
            }
        }, {}],
        27: [function(e, t, r) {
            "use strict";

            function i(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }

            function a(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                },
                s = function() {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var i = t[r];
                            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                        }
                    }
                    return function(t, r, i) {
                        return r && e(t.prototype, r), i && e(t, i), t
                    }
                }(),
                o = e(45),
                l = e(26),
                u = e(28),
                d = i(u),
                f = function() {
                    function e(t) {
                        a(this, e), this.hls = t, this.onEvent = this.onEvent.bind(this);
                        for (var r = arguments.length, i = Array(r > 1 ? r - 1 : 0), n = 1; n < r; n++) i[n - 1] = arguments[n];
                        this.handledEvents = i, this.useGenericHandler = !0, this.registerListeners()
                    }
                    return s(e, [{
                        key: "destroy",
                        value: function() {
                            this.unregisterListeners()
                        }
                    }, {
                        key: "isEventHandler",
                        value: function() {
                            return "object" === n(this.handledEvents) && this.handledEvents.length && "function" == typeof this.onEvent
                        }
                    }, {
                        key: "registerListeners",
                        value: function() {
                            this.isEventHandler() && this.handledEvents.forEach(function(e) {
                                if ("hlsEventGeneric" === e) throw new Error("Forbidden event name: " + e);
                                this.hls.on(e, this.onEvent)
                            }.bind(this))
                        }
                    }, {
                        key: "unregisterListeners",
                        value: function() {
                            this.isEventHandler() && this.handledEvents.forEach(function(e) {
                                this.hls.off(e, this.onEvent)
                            }.bind(this))
                        }
                    }, {
                        key: "onEvent",
                        value: function(e, t) {
                            this.onEventGeneric(e, t)
                        }
                    }, {
                        key: "onEventGeneric",
                        value: function(e, t) {
                            var r = function(e, t) {
                                var r = "on" + e.replace("hls", "");
                                if ("function" != typeof this[r]) throw new Error("Event " + e + " has no generic handler in this " + this.constructor.name + " class (tried " + r + ")");
                                return this[r].bind(this, t)
                            };
                            try {
                                r.call(this, e, t).call()
                            } catch (t) {
                                o.logger.error("internal error happened while processing " + e + ":" + t.message), this.hls.trigger(d.default.ERROR, {
                                    type: l.ErrorTypes.OTHER_ERROR,
                                    details: l.ErrorDetails.INTERNAL_EXCEPTION,
                                    fatal: !1,
                                    event: e,
                                    err: t
                                })
                            }
                        }
                    }]), e
                }();
            r.default = f
        }, {
            26: 26,
            28: 28,
            45: 45
        }],
        28: [function(e, t, r) {
            "use strict";
            t.exports = {
                MEDIA_ATTACHING: "hlsMediaAttaching",
                MEDIA_ATTACHED: "hlsMediaAttached",
                MEDIA_DETACHING: "hlsMediaDetaching",
                MEDIA_DETACHED: "hlsMediaDetached",
                BUFFER_RESET: "hlsBufferReset",
                BUFFER_CODECS: "hlsBufferCodecs",
                BUFFER_CREATED: "hlsBufferCreated",
                BUFFER_APPENDING: "hlsBufferAppending",
                BUFFER_APPENDED: "hlsBufferAppended",
                BUFFER_EOS: "hlsBufferEos",
                BUFFER_FLUSHING: "hlsBufferFlushing",
                BUFFER_FLUSHED: "hlsBufferFlushed",
                MANIFEST_LOADING: "hlsManifestLoading",
                MANIFEST_LOADED: "hlsManifestLoaded",
                MANIFEST_PARSED: "hlsManifestParsed",
                LEVEL_LOADING: "hlsLevelLoading",
                LEVEL_LOADED: "hlsLevelLoaded",
                LEVEL_UPDATED: "hlsLevelUpdated",
                LEVEL_PTS_UPDATED: "hlsLevelPtsUpdated",
                LEVEL_SWITCH: "hlsLevelSwitch",
                AUDIO_TRACKS_UPDATED: "hlsAudioTracksUpdated",
                AUDIO_TRACK_SWITCH: "hlsAudioTrackSwitch",
                AUDIO_TRACK_LOADING: "hlsAudioTrackLoading",
                AUDIO_TRACK_LOADED: "hlsAudioTrackLoaded",
                FRAG_LOADING: "hlsFragLoading",
                FRAG_LOAD_PROGRESS: "hlsFragLoadProgress",
                FRAG_LOAD_EMERGENCY_ABORTED: "hlsFragLoadEmergencyAborted",
                FRAG_LOADED: "hlsFragLoaded",
                FRAG_DECRYPTED: "hlsFragDecrypted",
                FRAG_PARSING_INIT_SEGMENT: "hlsFragParsingInitSegment",
                FRAG_PARSING_USERDATA: "hlsFragParsingUserdata",
                FRAG_PARSING_METADATA: "hlsFragParsingMetadata",
                FRAG_PARSING_DATA: "hlsFragParsingData",
                FRAG_PARSED: "hlsFragParsed",
                FRAG_BUFFERED: "hlsFragBuffered",
                FRAG_CHANGED: "hlsFragChanged",
                FPS_DROP: "hlsFpsDrop",
                FPS_DROP_LEVEL_CAPPING: "hlsFpsDropLevelCapping",
                ERROR: "hlsError",
                DESTROYING: "hlsDestroying",
                KEY_LOADING: "hlsKeyLoading",
                KEY_LOADED: "hlsKeyLoaded",
                STREAM_STATE_TRANSITION: "hlsStreamStateTransition"
            }
        }, {}],
        29: [function(e, t, r) {
            "use strict";

            function i(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var a = function() {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var i = t[r];
                            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                        }
                    }
                    return function(t, r, i) {
                        return r && e(t.prototype, r), i && e(t, i), t
                    }
                }(),
                n = function() {
                    function e() {
                        i(this, e)
                    }
                    return a(e, null, [{
                        key: "getSilentFrame",
                        value: function(e) {
                            return 1 === e ? new Uint8Array([0, 200, 0, 128, 35, 128]) : 2 === e ? new Uint8Array([33, 0, 73, 144, 2, 25, 0, 35, 128]) : 3 === e ? new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 142]) : 4 === e ? new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 128, 44, 128, 8, 2, 56]) : 5 === e ? new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 130, 48, 4, 153, 0, 33, 144, 2, 56]) : 6 === e ? new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 130, 48, 4, 153, 0, 33, 144, 2, 0, 178, 0, 32, 8, 224]) : null
                        }
                    }]), e
                }();
            r.default = n
        }, {}],
        30: [function(e, t, r) {
            "use strict";

            function i(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var a = function() {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var i = t[r];
                            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                        }
                    }
                    return function(t, r, i) {
                        return r && e(t.prototype, r), i && e(t, i), t
                    }
                }(),
                n = function() {
                    function e() {
                        i(this, e)
                    }
                    return a(e, null, [{
                        key: "isBuffered",
                        value: function(e, t) {
                            if (e)
                                for (var r = e.buffered, i = 0; i < r.length; i++)
                                    if (t >= r.start(i) && t <= r.end(i)) return !0;
                            return !1
                        }
                    }, {
                        key: "bufferInfo",
                        value: function(e, t, r) {
                            if (e) {
                                var i, a = e.buffered,
                                    n = [];
                                for (i = 0; i < a.length; i++) n.push({
                                    start: a.start(i),
                                    end: a.end(i)
                                });
                                return this.bufferedInfo(n, t, r)
                            }
                            return {
                                len: 0,
                                start: 0,
                                end: 0,
                                nextStart: void 0
                            }
                        }
                    }, {
                        key: "bufferedInfo",
                        value: function(e, t, r) {
                            var i, a, n, s, o, l = [];
                            for (e.sort(function(e, t) {
                                    var r = e.start - t.start;
                                    return r ? r : t.end - e.end
                                }), o = 0; o < e.length; o++) {
                                var u = l.length;
                                if (u) {
                                    var d = l[u - 1].end;
                                    e[o].start - d < r ? e[o].end > d && (l[u - 1].end = e[o].end) : l.push(e[o])
                                } else l.push(e[o])
                            }
                            for (o = 0, i = 0, a = n = t; o < l.length; o++) {
                                var f = l[o].start,
                                    h = l[o].end;
                                if (t + r >= f && t < h) a = f, n = h, i = n - t;
                                else if (t + r < f) {
                                    s = f;
                                    break
                                }
                            }
                            return {
                                len: i,
                                start: a,
                                end: n,
                                nextStart: s
                            }
                        }
                    }]), e
                }();
            r.default = n
        }, {}],
        31: [function(e, t, r) {
            "use strict";

            function i(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var a = function() {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var i = t[r];
                            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                        }
                    }
                    return function(t, r, i) {
                        return r && e(t.prototype, r), i && e(t, i), t
                    }
                }(),
                n = e(45),
                s = function() {
                    function e() {
                        i(this, e)
                    }
                    return a(e, null, [{
                        key: "mergeDetails",
                        value: function(t, r) {
                            var i, a = Math.max(t.startSN, r.startSN) - r.startSN,
                                s = Math.min(t.endSN, r.endSN) - r.startSN,
                                o = r.startSN - t.startSN,
                                l = t.fragments,
                                u = r.fragments,
                                d = 0;
                            if (s < a) return void(r.PTSKnown = !1);
                            for (var f = a; f <= s; f++) {
                                var h = l[o + f],
                                    c = u[f];
                                c && h && (d = h.cc - c.cc, isNaN(h.startPTS) || (c.start = c.startPTS = h.startPTS, c.endPTS = h.endPTS, c.duration = h.duration, i = c))
                            }
                            if (d)
                                for (n.logger.log("discontinuity sliding from playlist, take drift into account"), f = 0; f < u.length; f++) u[f].cc += d;
                            if (i) e.updateFragPTSDTS(r, i.sn, i.startPTS, i.endPTS, i.startDTS, i.endDTS);
                            else if (o >= 0 && o < l.length) {
                                var v = l[o].start;
                                for (f = 0; f < u.length; f++) u[f].start += v
                            }
                            r.PTSKnown = t.PTSKnown
                        }
                    }, {
                        key: "updateFragPTSDTS",
                        value: function(t, r, i, a, n, s) {
                            var o, l, u, d;
                            if (!t || r < t.startSN || r > t.endSN) return 0;
                            if (o = r - t.startSN, l = t.fragments, u = l[o], !isNaN(u.startPTS)) {
                                var f = Math.abs(u.startPTS - i);
                                isNaN(u.deltaPTS) ? u.deltaPTS = f : u.deltaPTS = Math.max(f, u.deltaPTS), i = Math.min(i, u.startPTS), a = Math.max(a, u.endPTS), n = Math.min(n, u.startDTS), s = Math.max(s, u.endDTS)
                            }
                            var h = i - u.start;
                            for (u.start = u.startPTS = i, u.endPTS = a, u.startDTS = n, u.endDTS = s, u.duration = a - i, d = o; d > 0; d--) e.updatePTS(l, d, d - 1);
                            for (d = o; d < l.length - 1; d++) e.updatePTS(l, d, d + 1);
                            return t.PTSKnown = !0, h
                        }
                    }, {
                        key: "updatePTS",
                        value: function(e, t, r) {
                            var i = e[t],
                                a = e[r],
                                s = a.startPTS;
                            isNaN(s) ? r > t ? a.start = i.start + i.duration : a.start = i.start - a.duration : r > t ? (i.duration = s - i.start, i.duration < 0 && n.logger.warn("negative duration computed for frag " + i.sn + ",level " + i.level + ", there should be some duration drift between playlist and fragment!")) : (a.duration = i.start - s, a.duration < 0 && n.logger.warn("negative duration computed for frag " + a.sn + ",level " + a.level + ", there should be some duration drift between playlist and fragment!"))
                        }
                    }]), e
                }();
            r.default = s
        }, {
            45: 45
        }],
        32: [function(e, t, r) {
            "use strict";

            function i(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }

            function a(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var n = function() {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var i = t[r];
                            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                        }
                    }
                    return function(t, r, i) {
                        return r && e(t.prototype, r), i && e(t, i), t
                    }
                }(),
                s = e(28),
                o = i(s),
                l = e(26),
                u = e(36),
                d = i(u),
                f = e(34),
                h = i(f),
                c = e(4),
                v = i(c),
                g = e(7),
                p = i(g),
                y = e(8),
                m = i(y),
                E = e(5),
                b = i(E),
                R = e(12),
                _ = i(R),
                k = e(11),
                A = i(k),
                T = e(13),
                S = i(T),
                L = e(10),
                D = i(L),
                w = e(6),
                O = i(w),
                C = e(45),
                P = e(47),
                I = i(P),
                M = e(1),
                x = i(M),
                F = e(35),
                N = i(F),
                U = e(43),
                G = i(U),
                B = function() {
                    function e() {
                        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                        a(this, e);
                        var r = e.DefaultConfig;
                        if ((t.liveSyncDurationCount || t.liveMaxLatencyDurationCount) && (t.liveSyncDuration || t.liveMaxLatencyDuration)) throw new Error("Illegal hls.js config: don't mix up liveSyncDurationCount/liveMaxLatencyDurationCount and liveSyncDuration/liveMaxLatencyDuration");
                        for (var i in r) i in t || (t[i] = r[i]);
                        if (void 0 !== t.liveMaxLatencyDurationCount && t.liveMaxLatencyDurationCount <= t.liveSyncDurationCount) throw new Error('Illegal hls.js config: "liveMaxLatencyDurationCount" must be gt "liveSyncDurationCount"');
                        if (void 0 !== t.liveMaxLatencyDuration && (t.liveMaxLatencyDuration <= t.liveSyncDuration || void 0 === t.liveSyncDuration)) throw new Error('Illegal hls.js config: "liveMaxLatencyDuration" must be gt "liveSyncDuration"');
                        (0, C.enableLogs)(t.debug), this.config = t;
                        var n = this.observer = new x.default;
                        n.trigger = function(e) {
                            for (var t = arguments.length, r = Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++) r[i - 1] = arguments[i];
                            n.emit.apply(n, [e, e].concat(r))
                        }, n.off = function(e) {
                            for (var t = arguments.length, r = Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++) r[i - 1] = arguments[i];
                            n.removeListener.apply(n, [e].concat(r))
                        }, this.on = n.on.bind(n), this.off = n.off.bind(n), this.trigger = n.trigger.bind(n), this.playlistLoader = new d.default(this), this.fragmentLoader = new h.default(this), this.levelController = new A.default(this), this.abrController = new t.abrController(this), this.bufferController = new t.bufferController(this), this.capLevelController = new t.capLevelController(this), this.fpsController = new t.fpsController(this), this.streamController = new t.streamController(this), this.audioStreamController = new t.audioStreamController(this), this.timelineController = new t.timelineController(this), this.audioTrackController = new O.default(this), this.keyLoader = new N.default(this)
                    }
                    return n(e, null, [{
                        key: "isSupported",
                        value: function() {
                            return window.MediaSource = window.MediaSource || window.WebKitMediaSource, window.MediaSource && "function" == typeof window.MediaSource.isTypeSupported && window.MediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"')
                        }
                    }, {
                        key: "version",
                        get: function() {
                            return "0.6.14"
                        }
                    }, {
                        key: "Events",
                        get: function() {
                            return o.default
                        }
                    }, {
                        key: "ErrorTypes",
                        get: function() {
                            return l.ErrorTypes
                        }
                    }, {
                        key: "ErrorDetails",
                        get: function() {
                            return l.ErrorDetails
                        }
                    }, {
                        key: "DefaultConfig",
                        get: function() {
                            return e.defaultConfig || (e.defaultConfig = {
                                autoStartLoad: !0,
                                startPosition: -1,
                                defaultAudioCodec: void 0,
                                debug: !1,
                                capLevelOnFPSDrop: !1,
                                capLevelToPlayerSize: !1,
                                initialLiveManifestSize: 1,
                                maxBufferLength: 30,
                                maxBufferSize: 6e7,
                                maxBufferHole: .5,
                                maxSeekHole: 2,
                                seekHoleNudgeDuration: .01,
                                stalledInBufferedNudgeThreshold: 10,
                                maxFragLookUpTolerance: .2,
                                liveSyncDurationCount: 3,
                                liveMaxLatencyDurationCount: 1 / 0,
                                liveSyncDuration: void 0,
                                liveMaxLatencyDuration: void 0,
                                maxMaxBufferLength: 600,
                                enableWorker: !0,
                                enableSoftwareAES: !0,
                                enableLazyURLResolve: !1,
                                manifestLoadingTimeOut: 1e4,
                                manifestLoadingMaxRetry: 1,
                                manifestLoadingRetryDelay: 1e3,
                                manifestLoadingMaxRetryTimeout: 64e3,
                                startLevel: void 0,
                                levelLoadingTimeOut: 1e4,
                                levelLoadingMaxRetry: 4,
                                levelLoadingRetryDelay: 1e3,
                                levelLoadingMaxRetryTimeout: 64e3,
                                fragLoadingTimeOut: 2e4,
                                fragLoadingMaxRetry: 6,
                                fragLoadingRetryDelay: 1e3,
                                fragLoadingMaxRetryTimeout: 64e3,
                                fragLoadingLoopThreshold: 3,
                                startFragPrefetch: !1,
                                fpsDroppedMonitoringPeriod: 5e3,
                                fpsDroppedMonitoringThreshold: .2,
                                appendErrorMaxRetry: 3,
                                loader: I.default,
                                fLoader: void 0,
                                pLoader: void 0,
                                xhrSetup: void 0,
                                fetchSetup: void 0,
                                abrController: v.default,
                                bufferController: p.default,
                                capLevelController: m.default,
                                fpsController: D.default,
                                streamController: _.default,
                                audioStreamController: b.default,
                                timelineController: S.default,
                                cueHandler: G.default,
                                enableCEA708Captions: !0,
                                enableMP2TPassThrough: !1,
                                stretchShortVideoTrack: !1,
                                forceKeyFrameOnDiscontinuity: !0,
                                abrEwmaFastLive: 3,
                                abrEwmaSlowLive: 9,
                                abrEwmaFastVoD: 3,
                                abrEwmaSlowVoD: 9,
                                abrEwmaDefaultEstimate: 5e5,
                                abrBandWidthFactor: .95,
                                abrBandWidthUpFactor: .7,
                                maxStarvationDelay: 4,
                                maxLoadingDelay: 4,
                                minAutoBitrate: 0
                            }), e.defaultConfig
                        },
                        set: function(t) {
                            e.defaultConfig = t
                        }
                    }]), n(e, [{
                        key: "destroy",
                        value: function() {
                            C.logger.log("destroy"), this.trigger(o.default.DESTROYING), this.detachMedia(), this.playlistLoader.destroy(), this.fragmentLoader.destroy(), this.levelController.destroy(), this.abrController.destroy(), this.bufferController.destroy(), this.capLevelController.destroy(), this.fpsController.destroy(), this.streamController.destroy(), this.audioStreamController.destroy(), this.timelineController.destroy(), this.audioTrackController.destroy(), this.keyLoader.destroy(), this.url = null, this.observer.removeAllListeners()
                        }
                    }, {
                        key: "attachMedia",
                        value: function(e) {
                            C.logger.log("attachMedia"), this.media = e, this.trigger(o.default.MEDIA_ATTACHING, {
                                media: e
                            })
                        }
                    }, {
                        key: "detachMedia",
                        value: function() {
                            C.logger.log("detachMedia"), this.trigger(o.default.MEDIA_DETACHING), this.media = null;
                        }
                    }, {
                        key: "loadSource",
                        value: function(e) {
                            C.logger.log("loadSource:" + e), this.url = e, this.trigger(o.default.MANIFEST_LOADING, {
                                url: e
                            })
                        }
                    }, {
                        key: "startLoad",
                        value: function() {
                            var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : -1;
                            C.logger.log("startLoad(" + e + ")"), this.levelController.startLoad(), this.streamController.startLoad(e), this.audioStreamController.startLoad(e)
                        }
                    }, {
                        key: "stopLoad",
                        value: function() {
                            C.logger.log("stopLoad"), this.levelController.stopLoad(), this.streamController.stopLoad(), this.audioStreamController.stopLoad()
                        }
                    }, {
                        key: "swapAudioCodec",
                        value: function() {
                            C.logger.log("swapAudioCodec"), this.streamController.swapAudioCodec()
                        }
                    }, {
                        key: "recoverMediaError",
                        value: function() {
                            C.logger.log("recoverMediaError");
                            var e = this.media;
                            this.detachMedia(), this.attachMedia(e)
                        }
                    }, {
                        key: "levels",
                        get: function() {
                            return this.levelController.levels
                        }
                    }, {
                        key: "currentLevel",
                        get: function() {
                            return this.streamController.currentLevel
                        },
                        set: function(e) {
                            C.logger.log("set currentLevel:" + e), this.loadLevel = e, this.streamController.immediateLevelSwitch()
                        }
                    }, {
                        key: "nextLevel",
                        get: function() {
                            return this.streamController.nextLevel
                        },
                        set: function(e) {
                            C.logger.log("set nextLevel:" + e), this.levelController.manualLevel = e, this.streamController.nextLevelSwitch()
                        }
                    }, {
                        key: "loadLevel",
                        get: function() {
                            return this.levelController.level
                        },
                        set: function(e) {
                            C.logger.log("set loadLevel:" + e), this.levelController.manualLevel = e
                        }
                    }, {
                        key: "nextLoadLevel",
                        get: function() {
                            return this.levelController.nextLoadLevel
                        },
                        set: function(e) {
                            this.levelController.nextLoadLevel = e
                        }
                    }, {
                        key: "firstLevel",
                        get: function() {
                            return Math.max(this.levelController.firstLevel, this.abrController.minAutoLevel)
                        },
                        set: function(e) {
                            C.logger.log("set firstLevel:" + e), this.levelController.firstLevel = e
                        }
                    }, {
                        key: "startLevel",
                        get: function() {
                            return this.levelController.startLevel
                        },
                        set: function(e) {
                            C.logger.log("set startLevel:" + e), this.levelController.startLevel = e
                        }
                    }, {
                        key: "autoLevelCapping",
                        get: function() {
                            return this.abrController.autoLevelCapping
                        },
                        set: function(e) {
                            C.logger.log("set autoLevelCapping:" + e), this.abrController.autoLevelCapping = e
                        }
                    }, {
                        key: "autoLevelEnabled",
                        get: function() {
                            return this.levelController.manualLevel === -1
                        }
                    }, {
                        key: "manualLevel",
                        get: function() {
                            return this.levelController.manualLevel
                        }
                    }, {
                        key: "audioTracks",
                        get: function() {
                            return this.audioTrackController.audioTracks
                        }
                    }, {
                        key: "audioTrack",
                        get: function() {
                            return this.audioTrackController.audioTrack
                        },
                        set: function(e) {
                            this.audioTrackController.audioTrack = e
                        }
                    }, {
                        key: "liveSyncPosition",
                        get: function() {
                            return this.streamController.liveSyncPosition
                        }
                    }]), e
                }();
            r.default = B
        }, {
            1: 1,
            10: 10,
            11: 11,
            12: 12,
            13: 13,
            26: 26,
            28: 28,
            34: 34,
            35: 35,
            36: 36,
            4: 4,
            43: 43,
            45: 45,
            47: 47,
            5: 5,
            6: 6,
            7: 7,
            8: 8
        }],
        33: [function(e, t, r) {
            "use strict";
            t.exports = e(32).default
        }, {
            32: 32
        }],
        34: [function(e, t, r) {
            "use strict";

            function i(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }

            function a(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }

            function n(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }

            function s(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var o = function() {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var i = t[r];
                            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                        }
                    }
                    return function(t, r, i) {
                        return r && e(t.prototype, r), i && e(t, i), t
                    }
                }(),
                l = e(28),
                u = i(l),
                d = e(27),
                f = i(d),
                h = e(26),
                c = e(45),
                v = e(2),
                g = i(v),
                p = function(e) {
                    function t(e) {
                        a(this, t);
                        var r = n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, u.default.FRAG_LOADING));
                        return r.loaders = {}, r
                    }
                    return s(t, e), o(t, [{
                        key: "destroy",
                        value: function() {
                            var e = this.loaders;
                            for (var t in e) {
                                var r = e[t];
                                r && r.destroy()
                            }
                            this.loaders = {}, f.default.prototype.destroy.call(this)
                        }
                    }, {
                        key: "onFragLoading",
                        value: function(e) {
                            var t = e.frag,
                                r = t.type,
                                i = this.loaders[r],
                                a = this.hls.config;
                            t.loaded = 0, i && (c.logger.warn("abort previous fragment loader for type:" + r), i.abort()), i = this.loaders[r] = t.loader = "undefined" != typeof a.fLoader ? new a.fLoader(a) : new a.loader(a);
                            var n = void 0,
                                s = void 0,
                                o = void 0,
                                l = t.url ? t.url : g.default.buildAbsoluteURL(t.baseurl, t.relurl);
                            n = {
                                url: l,
                                frag: t,
                                responseType: "arraybuffer",
                                progressData: !1
                            };
                            var u = t.byteRangeStartOffset,
                                d = t.byteRangeEndOffset;
                            isNaN(u) || isNaN(d) || (n.rangeStart = u, n.rangeEnd = d), s = {
                                timeout: a.fragLoadingTimeOut,
                                maxRetry: 0,
                                retryDelay: 0,
                                maxRetryDelay: a.fragLoadingMaxRetryTimeout
                            }, o = {
                                onSuccess: this.loadsuccess.bind(this),
                                onError: this.loaderror.bind(this),
                                onTimeout: this.loadtimeout.bind(this),
                                onProgress: this.loadprogress.bind(this)
                            }, i.load(n, s, o)
                        }
                    }, {
                        key: "loadsuccess",
                        value: function(e, t, r) {
                            var i = e.data,
                                a = r.frag;
                            a.loader = void 0, this.loaders[a.type] = void 0, this.hls.trigger(u.default.FRAG_LOADED, {
                                payload: i,
                                frag: a,
                                stats: t
                            })
                        }
                    }, {
                        key: "loaderror",
                        value: function(e, t) {
                            var r = t.loader;
                            r && r.abort(), this.loaders[t.type] = void 0, this.hls.trigger(u.default.ERROR, {
                                type: h.ErrorTypes.NETWORK_ERROR,
                                details: h.ErrorDetails.FRAG_LOAD_ERROR,
                                fatal: !1,
                                frag: t.frag,
                                response: e
                            })
                        }
                    }, {
                        key: "loadtimeout",
                        value: function(e, t) {
                            var r = t.loader;
                            r && r.abort(), this.loaders[t.type] = void 0, this.hls.trigger(u.default.ERROR, {
                                type: h.ErrorTypes.NETWORK_ERROR,
                                details: h.ErrorDetails.FRAG_LOAD_TIMEOUT,
                                fatal: !1,
                                frag: t.frag
                            })
                        }
                    }, {
                        key: "loadprogress",
                        value: function(e, t, r) {
                            var i = t.frag;
                            i.loaded = e.loaded, this.hls.trigger(u.default.FRAG_LOAD_PROGRESS, {
                                frag: i,
                                stats: e
                            })
                        }
                    }]), t
                }(f.default);
            r.default = p
        }, {
            2: 2,
            26: 26,
            27: 27,
            28: 28,
            45: 45
        }],
        35: [function(e, t, r) {
            "use strict";

            function i(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }

            function a(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }

            function n(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }

            function s(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var o = function() {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var i = t[r];
                            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                        }
                    }
                    return function(t, r, i) {
                        return r && e(t.prototype, r), i && e(t, i), t
                    }
                }(),
                l = e(28),
                u = i(l),
                d = e(27),
                f = i(d),
                h = e(26),
                c = e(45),
                v = e(2),
                g = i(v),
                p = function(e) {
                    function t(e) {
                        a(this, t);
                        var r = n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, u.default.KEY_LOADING));
                        return r.loaders = {}, r.decryptkey = null, r.decrypturl = null, r
                    }
                    return s(t, e), o(t, [{
                        key: "destroy",
                        value: function() {
                            for (var e in this.loaders) {
                                var t = this.loaders[e];
                                t && t.destroy()
                            }
                            this.loaders = {}, f.default.prototype.destroy.call(this)
                        }
                    }, {
                        key: "onKeyLoading",
                        value: function(e) {
                            var t = e.frag,
                                r = t.type,
                                i = this.loaders[r],
                                a = t.decryptdata,
                                n = a.uri ? a.uri : g.default.buildAbsoluteURL(a.baseuri, a.reluri);
                            if (n !== this.decrypturl || null === this.decryptkey) {
                                var s = this.hls.config;
                                i && (c.logger.warn("abort previous key loader for type:" + r), i.abort()), t.loader = this.loaders[r] = new s.loader(s), this.decrypturl = n, this.decryptkey = null;
                                var o = void 0,
                                    l = void 0,
                                    d = void 0;
                                o = {
                                    url: n,
                                    frag: t,
                                    responseType: "arraybuffer"
                                }, l = {
                                    timeout: s.fragLoadingTimeOut,
                                    maxRetry: s.fragLoadingMaxRetry,
                                    retryDelay: s.fragLoadingRetryDelay,
                                    maxRetryDelay: s.fragLoadingMaxRetryTimeout
                                }, d = {
                                    onSuccess: this.loadsuccess.bind(this),
                                    onError: this.loaderror.bind(this),
                                    onTimeout: this.loadtimeout.bind(this)
                                }, t.loader.load(o, l, d)
                            } else this.decryptkey && (a.key = this.decryptkey, this.hls.trigger(u.default.KEY_LOADED, {
                                frag: t
                            }))
                        }
                    }, {
                        key: "loadsuccess",
                        value: function(e, t, r) {
                            var i = r.frag;
                            this.decryptkey = i.decryptdata.key = new Uint8Array(e.data), i.loader = void 0, this.loaders[i.type] = void 0, this.hls.trigger(u.default.KEY_LOADED, {
                                frag: i
                            })
                        }
                    }, {
                        key: "loaderror",
                        value: function(e, t) {
                            var r = t.frag,
                                i = r.loader;
                            i && i.abort(), this.loaders[t.type] = void 0, this.hls.trigger(u.default.ERROR, {
                                type: h.ErrorTypes.NETWORK_ERROR,
                                details: h.ErrorDetails.KEY_LOAD_ERROR,
                                fatal: !1,
                                frag: r,
                                response: e
                            })
                        }
                    }, {
                        key: "loadtimeout",
                        value: function(e, t) {
                            var r = t.frag,
                                i = r.loader;
                            i && i.abort(), this.loaders[t.type] = void 0, this.hls.trigger(u.default.ERROR, {
                                type: h.ErrorTypes.NETWORK_ERROR,
                                details: h.ErrorDetails.KEY_LOAD_TIMEOUT,
                                fatal: !1,
                                frag: r
                            })
                        }
                    }]), t
                }(f.default);
            r.default = p
        }, {
            2: 2,
            26: 26,
            27: 27,
            28: 28,
            45: 45
        }],
        36: [function(e, t, r) {
            "use strict";

            function i(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }

            function a(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }

            function n(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }

            function s(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var o = function() {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var i = t[r];
                            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                        }
                    }
                    return function(t, r, i) {
                        return r && e(t.prototype, r), i && e(t, i), t
                    }
                }(),
                l = e(2),
                u = i(l),
                d = e(28),
                f = i(d),
                h = e(27),
                c = i(h),
                v = e(26),
                g = e(40),
                p = i(g),
                y = e(45),
                m = /#EXT-X-STREAM-INF:([^\n\r]*)[\r\n]+([^\r\n]+)/g,
                E = /#EXT-X-MEDIA:(.*)/g,
                b = /(?:#EXT(INF): *(\d*(?:\.\d+)?)(?:,(.*))?)|(?:(?!#)()(\S.+))|(?:(?:#(EXTM3U))|(?:#EXT-X-(PLAYLIST-TYPE):(.+))|(?:#EXT-X-(MEDIA-SEQUENCE): *(\d+))|(?:#EXT-X-(TARGETDURATION): *(\d+))|(?:#EXT-X-(KEY):(.+))|(?:#EXT-X-(START):(.+))|(?:#EXT-X-(BYTERANGE): *(\d+(?:@\d+(?:\.\d+)?)?)|(?:#EXT-X-(ENDLIST))|(?:#EXT-X-(DISCONTINUITY-SEQ)UENCE:(\d+))|(?:#EXT-X-(DIS)CONTINUITY))|(?:#EXT-X-(PROGRAM-DATE-TIME):(.+))|(?:#EXT-X-(VERSION):(\d+))|(?:(#)(.*):(.*))|(?:(#)(.*)))(?:.*)\r?\n?/g,
                R = function(e) {
                    function t(e) {
                        a(this, t);
                        var r = n(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e, f.default.MANIFEST_LOADING, f.default.LEVEL_LOADING, f.default.AUDIO_TRACK_LOADING));
                        return r.loaders = {}, r
                    }
                    return s(t, e), o(t, [{
                        key: "destroy",
                        value: function() {
                            for (var e in this.loaders) {
                                var t = this.loaders[e];
                                t && t.destroy()
                            }
                            this.loaders = {}, c.default.prototype.destroy.call(this)
                        }
                    }, {
                        key: "onManifestLoading",
                        value: function(e) {
                            this.load(e.url, {
                                type: "manifest"
                            })
                        }
                    }, {
                        key: "onLevelLoading",
                        value: function(e) {
                            this.load(e.url, {
                                type: "level",
                                level: e.level,
                                id: e.id
                            })
                        }
                    }, {
                        key: "onAudioTrackLoading",
                        value: function(e) {
                            this.load(e.url, {
                                type: "audioTrack",
                                id: e.id
                            })
                        }
                    }, {
                        key: "load",
                        value: function(e, t) {
                            var r = this.loaders[t.type];
                            if (r) {
                                var i = r.context;
                                if (i && i.url === e) return void y.logger.trace("playlist request ongoing");
                                y.logger.warn("abort previous loader for type:" + t.type), r.abort()
                            }
                            var a = this.hls.config,
                                n = void 0,
                                s = void 0,
                                o = void 0,
                                l = void 0;
                            "manifest" === t.type ? (n = a.manifestLoadingMaxRetry, s = a.manifestLoadingTimeOut, o = a.manifestLoadingRetryDelay, l = a.manifestLoadingMaxRetryTimeout) : (n = a.levelLoadingMaxRetry, s = a.levelLoadingTimeOut, o = a.levelLoadingRetryDelay, l = a.levelLoadingMaxRetryTimeout, y.logger.log("loading playlist for level " + t.level)), r = this.loaders[t.type] = t.loader = "undefined" != typeof a.pLoader ? new a.pLoader(a) : new a.loader(a), t.url = e, t.responseType = "";
                            var u = void 0,
                                d = void 0;
                            u = {
                                timeout: s,
                                maxRetry: n,
                                retryDelay: o,
                                maxRetryDelay: l
                            }, d = {
                                onSuccess: this.loadsuccess.bind(this),
                                onError: this.loaderror.bind(this),
                                onTimeout: this.loadtimeout.bind(this)
                            }, r.load(t, u, d)
                        }
                    }, {
                        key: "resolve",
                        value: function(e, t) {
                            return u.default.buildAbsoluteURL(t, e)
                        }
                    }, {
                        key: "parseMasterPlaylist",
                        value: function(e, t) {
                            var r = [],
                                i = void 0;
                            for (m.lastIndex = 0; null != (i = m.exec(e));) {
                                var a = {},
                                    n = a.attrs = new p.default(i[1]);
                                a.url = this.resolve(i[2], t);
                                var s = n.decimalResolution("RESOLUTION");
                                s && (a.width = s.width, a.height = s.height), a.bitrate = n.decimalInteger("AVERAGE-BANDWIDTH") || n.decimalInteger("BANDWIDTH"), a.name = n.NAME;
                                var o = n.CODECS;
                                if (o) {
                                    o = o.split(/[ ,]+/);
                                    for (var l = 0; l < o.length; l++) {
                                        var u = o[l];
                                        u.indexOf("avc1") !== -1 ? a.videoCodec = this.avc1toavcoti(u) : a.audioCodec = u
                                    }
                                }
                                r.push(a)
                            }
                            return r
                        }
                    }, {
                        key: "parseMasterPlaylistMedia",
                        value: function(e, t, r) {
                            var i = void 0,
                                a = [];
                            for (E.lastIndex = 0; null != (i = E.exec(e));) {
                                var n = {},
                                    s = new p.default(i[1]);
                                s.TYPE === r && (n.groupId = s["GROUP-ID"], n.name = s.NAME, n.type = r, n.default = "YES" === s.DEFAULT, n.autoselect = "YES" === s.AUTOSELECT, n.forced = "YES" === s.FORCED, s.URI && (n.url = this.resolve(s.URI, t)), n.lang = s.LANGUAGE, n.name || (n.name = n.lang), a.push(n))
                            }
                            return a
                        }
                    }, {
                        key: "createInitializationVector",
                        value: function(e) {
                            for (var t = new Uint8Array(16), r = 12; r < 16; r++) t[r] = e >> 8 * (15 - r) & 255;
                            return t
                        }
                    }, {
                        key: "fragmentDecryptdataFromLevelkey",
                        value: function(e, t) {
                            var r = e;
                            return e && e.method && e.uri && !e.iv && (r = this.cloneObj(e), r.iv = this.createInitializationVector(t)), r
                        }
                    }, {
                        key: "avc1toavcoti",
                        value: function(e) {
                            var t, r = e.split(".");
                            return r.length > 2 ? (t = r.shift() + ".", t += parseInt(r.shift()).toString(16), t += ("000" + parseInt(r.shift()).toString(16)).substr(-4)) : t = e, t
                        }
                    }, {
                        key: "cloneObj",
                        value: function(e) {
                            return JSON.parse(JSON.stringify(e))
                        }
                    }, {
                        key: "parseLevelPlaylist",
                        value: function(e, t, r, i) {
                            var a, n, s, o = 0,
                                l = 0,
                                u = {
                                    type: null,
                                    version: null,
                                    url: t,
                                    fragments: [],
                                    live: !0,
                                    startSN: 0
                                },
                                d = {
                                    method: null,
                                    key: null,
                                    iv: null,
                                    uri: null
                                },
                                f = 0,
                                h = null,
                                c = null,
                                v = null,
                                g = null,
                                m = null,
                                E = null,
                                R = [],
                                _ = this.hls.config,
                                k = !!_ && _.enableLazyURLResolve;
                            for (b.lastIndex = 0; null !== (n = b.exec(e));) {
                                for (s = 1; s < n.length && void 0 === n[s]; s++);
                                var A = n[s],
                                    T = n[s + 1],
                                    S = n[s + 2];
                                switch (A) {
                                    case "PLAYLIST-TYPE":
                                        u.type = T.toUpperCase();
                                        break;
                                    case "MEDIA-SEQUENCE":
                                        o = u.startSN = parseInt(T);
                                        break;
                                    case "TARGETDURATION":
                                        u.targetduration = parseFloat(T);
                                        break;
                                    case "VERSION":
                                        u.version = parseInt(T);
                                        break;
                                    case "EXTM3U":
                                        break;
                                    case "ENDLIST":
                                        u.live = !1;
                                        break;
                                    case "DIS":
                                        f++, R.push([A]);
                                        break;
                                    case "DISCONTINUITY-SEQ":
                                        f = parseInt(T);
                                        break;
                                    case "BYTERANGE":
                                        var L = T.split("@");
                                        E = 1 === L.length ? m : parseInt(L[1]), m = parseInt(L[0]) + E;
                                        break;
                                    case "INF":
                                        v = parseFloat(T), g = S ? S : null, R.push(S ? [A, T, S] : [A, T]);
                                        break;
                                    case "":
                                        if (!isNaN(v)) {
                                            var D = o++;
                                            a = this.fragmentDecryptdataFromLevelkey(d, D), c = {
                                                type: i,
                                                duration: v,
                                                title: g,
                                                start: l,
                                                sn: D,
                                                level: r,
                                                cc: f,
                                                decryptdata: a,
                                                programDateTime: h,
                                                tagList: R
                                            }, k ? (c.relurl = T, c.baseurl = t) : c.url = T ? this.resolve(T, t) : null, null !== E && (c.byteRangeStartOffset = E, c.byteRangeEndOffset = m), u.fragments.push(c), l += v, v = null, g = null, E = null, h = null, R = []
                                        }
                                        break;
                                    case "KEY":
                                        var w = T,
                                            O = new p.default(w),
                                            C = O.enumeratedString("METHOD"),
                                            P = O.URI,
                                            I = O.hexadecimalInteger("IV");
                                        C && (d = {
                                            method: null,
                                            key: null,
                                            iv: null,
                                            uri: null
                                        }, P && "AES-128" === C && (d.method = C, k ? (d.baseuri = t, d.reluri = P) : d.uri = this.resolve(P, t), d.key = null, d.iv = I));
                                        break;
                                    case "START":
                                        var M = T,
                                            x = new p.default(M),
                                            F = x.decimalFloatingPoint("TIME-OFFSET");
                                        isNaN(F) || (u.startTimeOffset = F);
                                        break;
                                    case "PROGRAM-DATE-TIME":
                                        h = new Date(Date.parse(T)), R.push([A, T]);
                                        break;
                                    case "#":
                                        R.push(S ? [T, S] : [T]);
                                        break;
                                    default:
                                        y.logger.warn("line parsed but not handled: " + n)
                                }
                            }
                            return !c || c.url || c.relurl || (u.fragments.pop(), l -= c.duration), u.totalduration = l, u.averagetargetduration = l / u.fragments.length, u.endSN = o - 1, u
                        }
                    }, {
                        key: "loadsuccess",
                        value: function(e, t, r) {
                            var i = e.data,
                                a = e.url,
                                n = r.type,
                                s = r.id,
                                o = r.level,
                                l = this.hls;
                            if (this.loaders[n] = void 0, void 0 !== a && 0 !== a.indexOf("data:") || (a = r.url), t.tload = performance.now(), 0 === i.indexOf("#EXTM3U"))
                                if (i.indexOf("#EXTINF:") > 0) {
                                    var u = "audioTrack" !== n,
                                        d = this.parseLevelPlaylist(i, a, (u ? o : s) || 0, u ? "main" : "audio");
                                    "manifest" === n && l.trigger(f.default.MANIFEST_LOADED, {
                                        levels: [{
                                            url: a,
                                            details: d
                                        }],
                                        audioTracks: [],
                                        url: a,
                                        stats: t
                                    }), t.tparsed = performance.now(), d.targetduration ? u ? l.trigger(f.default.LEVEL_LOADED, {
                                        details: d,
                                        level: o || 0,
                                        id: s || 0,
                                        stats: t
                                    }) : l.trigger(f.default.AUDIO_TRACK_LOADED, {
                                        details: d,
                                        id: s,
                                        stats: t
                                    }) : l.trigger(f.default.ERROR, {
                                        type: v.ErrorTypes.NETWORK_ERROR,
                                        details: v.ErrorDetails.MANIFEST_PARSING_ERROR,
                                        fatal: !0,
                                        url: a,
                                        reason: "invalid targetduration"
                                    })
                                } else {
                                    var h = this.parseMasterPlaylist(i, a);
                                    if (h.length) {
                                        var c = this.parseMasterPlaylistMedia(i, a, "AUDIO");
                                        if (c.length) {
                                            var g = !1;
                                            c.forEach(function(e) {
                                                e.url || (g = !0)
                                            }), g === !1 && h[0].audioCodec && !h[0].attrs.AUDIO && (y.logger.log("audio codec signaled in quality level, but no embedded audio track signaled, create one"), c.unshift({
                                                type: "main",
                                                name: "main"
                                            }))
                                        }
                                        l.trigger(f.default.MANIFEST_LOADED, {
                                            levels: h,
                                            audioTracks: c,
                                            url: a,
                                            stats: t
                                        })
                                    } else l.trigger(f.default.ERROR, {
                                        type: v.ErrorTypes.NETWORK_ERROR,
                                        details: v.ErrorDetails.MANIFEST_PARSING_ERROR,
                                        fatal: !0,
                                        url: a,
                                        reason: "no level found in manifest"
                                    })
                                } else l.trigger(f.default.ERROR, {
                                type: v.ErrorTypes.NETWORK_ERROR,
                                details: v.ErrorDetails.MANIFEST_PARSING_ERROR,
                                fatal: !0,
                                url: a,
                                reason: "no EXTM3U delimiter"
                            })
                        }
                    }, {
                        key: "loaderror",
                        value: function(e, t) {
                            var r, i, a = t.loader;
                            switch (t.type) {
                                case "manifest":
                                    r = v.ErrorDetails.MANIFEST_LOAD_ERROR, i = !0;
                                    break;
                                case "level":
                                    r = v.ErrorDetails.LEVEL_LOAD_ERROR, i = !1;
                                    break;
                                case "audioTrack":
                                    r = v.ErrorDetails.AUDIO_TRACK_LOAD_ERROR, i = !1
                            }
                            a && (a.abort(), this.loaders[t.type] = void 0), this.hls.trigger(f.default.ERROR, {
                                type: v.ErrorTypes.NETWORK_ERROR,
                                details: r,
                                fatal: i,
                                url: a.url,
                                loader: a,
                                response: e,
                                context: t
                            })
                        }
                    }, {
                        key: "loadtimeout",
                        value: function(e, t) {
                            var r, i, a = t.loader;
                            switch (t.type) {
                                case "manifest":
                                    r = v.ErrorDetails.MANIFEST_LOAD_TIMEOUT, i = !0;
                                    break;
                                case "level":
                                    r = v.ErrorDetails.LEVEL_LOAD_TIMEOUT, i = !1;
                                    break;
                                case "audioTrack":
                                    r = v.ErrorDetails.AUDIO_TRACK_LOAD_TIMEOUT, i = !1
                            }
                            a && (a.abort(), this.loaders[t.type] = void 0), this.hls.trigger(f.default.ERROR, {
                                type: v.ErrorTypes.NETWORK_ERROR,
                                details: r,
                                fatal: i,
                                url: a.url,
                                loader: a,
                                context: t
                            })
                        }
                    }]), t
                }(c.default);
            r.default = R
        }, {
            2: 2,
            26: 26,
            27: 27,
            28: 28,
            40: 40,
            45: 45
        }],
        37: [function(e, t, r) {
            "use strict";

            function i(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var a = function() {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var i = t[r];
                            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                        }
                    }
                    return function(t, r, i) {
                        return r && e(t.prototype, r), i && e(t, i), t
                    }
                }(),
                n = function() {
                    function e() {
                        i(this, e)
                    }
                    return a(e, null, [{
                        key: "init",
                        value: function() {
                            e.types = {
                                avc1: [],
                                avcC: [],
                                btrt: [],
                                dinf: [],
                                dref: [],
                                esds: [],
                                ftyp: [],
                                hdlr: [],
                                mdat: [],
                                mdhd: [],
                                mdia: [],
                                mfhd: [],
                                minf: [],
                                moof: [],
                                moov: [],
                                mp4a: [],
                                ".mp3": [],
                                mvex: [],
                                mvhd: [],
                                sdtp: [],
                                stbl: [],
                                stco: [],
                                stsc: [],
                                stsd: [],
                                stsz: [],
                                stts: [],
                                tfdt: [],
                                tfhd: [],
                                traf: [],
                                trak: [],
                                trun: [],
                                trex: [],
                                tkhd: [],
                                vmhd: [],
                                smhd: []
                            };
                            var t;
                            for (t in e.types) e.types.hasOwnProperty(t) && (e.types[t] = [t.charCodeAt(0), t.charCodeAt(1), t.charCodeAt(2), t.charCodeAt(3)]);
                            var r = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 118, 105, 100, 101, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 86, 105, 100, 101, 111, 72, 97, 110, 100, 108, 101, 114, 0]),
                                i = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 115, 111, 117, 110, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 83, 111, 117, 110, 100, 72, 97, 110, 100, 108, 101, 114, 0]);
                            e.HDLR_TYPES = {
                                video: r,
                                audio: i
                            };
                            var a = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 12, 117, 114, 108, 32, 0, 0, 0, 1]),
                                n = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]);
                            e.STTS = e.STSC = e.STCO = n, e.STSZ = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]), e.VMHD = new Uint8Array([0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]), e.SMHD = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]), e.STSD = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1]);
                            var s = new Uint8Array([105, 115, 111, 109]),
                                o = new Uint8Array([97, 118, 99, 49]),
                                l = new Uint8Array([0, 0, 0, 1]);
                            e.FTYP = e.box(e.types.ftyp, s, l, s, o), e.DINF = e.box(e.types.dinf, e.box(e.types.dref, a))
                        }
                    }, {
                        key: "box",
                        value: function(e) {
                            for (var t, r = Array.prototype.slice.call(arguments, 1), i = 8, a = r.length, n = a; a--;) i += r[a].byteLength;
                            for (t = new Uint8Array(i), t[0] = i >> 24 & 255, t[1] = i >> 16 & 255, t[2] = i >> 8 & 255, t[3] = 255 & i, t.set(e, 4), a = 0, i = 8; a < n; a++) t.set(r[a], i), i += r[a].byteLength;
                            return t
                        }
                    }, {
                        key: "hdlr",
                        value: function(t) {
                            return e.box(e.types.hdlr, e.HDLR_TYPES[t])
                        }
                    }, {
                        key: "mdat",
                        value: function(t) {
                            return e.box(e.types.mdat, t)
                        }
                    }, {
                        key: "mdhd",
                        value: function(t, r) {
                            return r *= t, e.box(e.types.mdhd, new Uint8Array([0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 3, t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, 255 & t, r >> 24, r >> 16 & 255, r >> 8 & 255, 255 & r, 85, 196, 0, 0]))
                        }
                    }, {
                        key: "mdia",
                        value: function(t) {
                            return e.box(e.types.mdia, e.mdhd(t.timescale, t.duration), e.hdlr(t.type), e.minf(t))
                        }
                    }, {
                        key: "mfhd",
                        value: function(t) {
                            return e.box(e.types.mfhd, new Uint8Array([0, 0, 0, 0, t >> 24, t >> 16 & 255, t >> 8 & 255, 255 & t]))
                        }
                    }, {
                        key: "minf",
                        value: function(t) {
                            return "audio" === t.type ? e.box(e.types.minf, e.box(e.types.smhd, e.SMHD), e.DINF, e.stbl(t)) : e.box(e.types.minf, e.box(e.types.vmhd, e.VMHD), e.DINF, e.stbl(t))
                        }
                    }, {
                        key: "moof",
                        value: function(t, r, i) {
                            return e.box(e.types.moof, e.mfhd(t), e.traf(i, r))
                        }
                    }, {
                        key: "moov",
                        value: function(t) {
                            for (var r = t.length, i = []; r--;) i[r] = e.trak(t[r]);
                            return e.box.apply(null, [e.types.moov, e.mvhd(t[0].timescale, t[0].duration)].concat(i).concat(e.mvex(t)))
                        }
                    }, {
                        key: "mvex",
                        value: function(t) {
                            for (var r = t.length, i = []; r--;) i[r] = e.trex(t[r]);
                            return e.box.apply(null, [e.types.mvex].concat(i))
                        }
                    }, {
                        key: "mvhd",
                        value: function(t, r) {
                            r *= t;
                            var i = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 2, t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, 255 & t, r >> 24 & 255, r >> 16 & 255, r >> 8 & 255, 255 & r, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 255, 255, 255, 255]);
                            return e.box(e.types.mvhd, i)
                        }
                    }, {
                        key: "sdtp",
                        value: function(t) {
                            var r, i, a = t.samples || [],
                                n = new Uint8Array(4 + a.length);
                            for (i = 0; i < a.length; i++) r = a[i].flags, n[i + 4] = r.dependsOn << 4 | r.isDependedOn << 2 | r.hasRedundancy;
                            return e.box(e.types.sdtp, n)
                        }
                    }, {
                        key: "stbl",
                        value: function(t) {
                            return e.box(e.types.stbl, e.stsd(t), e.box(e.types.stts, e.STTS), e.box(e.types.stsc, e.STSC), e.box(e.types.stsz, e.STSZ), e.box(e.types.stco, e.STCO))
                        }
                    }, {
                        key: "avc1",
                        value: function(t) {
                            var r, i, a, n = [],
                                s = [];
                            for (r = 0; r < t.sps.length; r++) i = t.sps[r], a = i.byteLength, n.push(a >>> 8 & 255), n.push(255 & a), n = n.concat(Array.prototype.slice.call(i));
                            for (r = 0; r < t.pps.length; r++) i = t.pps[r], a = i.byteLength, s.push(a >>> 8 & 255), s.push(255 & a), s = s.concat(Array.prototype.slice.call(i));
                            var o = e.box(e.types.avcC, new Uint8Array([1, n[3], n[4], n[5], 255, 224 | t.sps.length].concat(n).concat([t.pps.length]).concat(s))),
                                l = t.width,
                                u = t.height;
                            return e.box(e.types.avc1, new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, l >> 8 & 255, 255 & l, u >> 8 & 255, 255 & u, 0, 72, 0, 0, 0, 72, 0, 0, 0, 0, 0, 0, 0, 1, 18, 100, 97, 105, 108, 121, 109, 111, 116, 105, 111, 110, 47, 104, 108, 115, 46, 106, 115, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 24, 17, 17]), o, e.box(e.types.btrt, new Uint8Array([0, 28, 156, 128, 0, 45, 198, 192, 0, 45, 198, 192])))
                        }
                    }, {
                        key: "esds",
                        value: function(e) {
                            var t = e.config.length;
                            return new Uint8Array([0, 0, 0, 0, 3, 23 + t, 0, 1, 0, 4, 15 + t, 64, 21, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 5].concat([t]).concat(e.config).concat([6, 1, 2]))
                        }
                    }, {
                        key: "mp4a",
                        value: function(t) {
                            var r = t.audiosamplerate;
                            return e.box(e.types.mp4a, new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, t.channelCount, 0, 16, 0, 0, 0, 0, r >> 8 & 255, 255 & r, 0, 0]), e.box(e.types.esds, e.esds(t)))
                        }
                    }, {
                        key: "mp3",
                        value: function(t) {
                            var r = t.audiosamplerate;
                            return e.box(e.types[".mp3"], new Uint8Array([0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, t.channelCount, 0, 16, 0, 0, 0, 0, r >> 8 & 255, 255 & r, 0, 0]))
                        }
                    }, {
                        key: "stsd",
                        value: function(t) {
                            return "audio" === t.type ? t.isAAC || "mp3" !== t.codec ? e.box(e.types.stsd, e.STSD, e.mp4a(t)) : e.box(e.types.stsd, e.STSD, e.mp3(t)) : e.box(e.types.stsd, e.STSD, e.avc1(t))
                        }
                    }, {
                        key: "tkhd",
                        value: function(t) {
                            var r = t.id,
                                i = t.duration * t.timescale,
                                a = t.width,
                                n = t.height;
                            return e.box(e.types.tkhd, new Uint8Array([0, 0, 0, 7, 0, 0, 0, 0, 0, 0, 0, 0, r >> 24 & 255, r >> 16 & 255, r >> 8 & 255, 255 & r, 0, 0, 0, 0, i >> 24, i >> 16 & 255, i >> 8 & 255, 255 & i, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 64, 0, 0, 0, a >> 8 & 255, 255 & a, 0, 0, n >> 8 & 255, 255 & n, 0, 0]))
                        }
                    }, {
                        key: "traf",
                        value: function(t, r) {
                            var i = e.sdtp(t),
                                a = t.id;
                            return e.box(e.types.traf, e.box(e.types.tfhd, new Uint8Array([0, 0, 0, 0, a >> 24, a >> 16 & 255, a >> 8 & 255, 255 & a])), e.box(e.types.tfdt, new Uint8Array([0, 0, 0, 0, r >> 24, r >> 16 & 255, r >> 8 & 255, 255 & r])), e.trun(t, i.length + 16 + 16 + 8 + 16 + 8 + 8), i)
                        }
                    }, {
                        key: "trak",
                        value: function(t) {
                            return t.duration = t.duration || 4294967295, e.box(e.types.trak, e.tkhd(t), e.mdia(t))
                        }
                    }, {
                        key: "trex",
                        value: function(t) {
                            var r = t.id;
                            return e.box(e.types.trex, new Uint8Array([0, 0, 0, 0, r >> 24, r >> 16 & 255, r >> 8 & 255, 255 & r, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1]))
                        }
                    }, {
                        key: "trun",
                        value: function(t, r) {
                            var i, a, n, s, o, l, u = t.samples || [],
                                d = u.length,
                                f = 12 + 16 * d,
                                h = new Uint8Array(f);
                            for (r += 8 + f, h.set([0, 0, 15, 1, d >>> 24 & 255, d >>> 16 & 255, d >>> 8 & 255, 255 & d, r >>> 24 & 255, r >>> 16 & 255, r >>> 8 & 255, 255 & r], 0), i = 0; i < d; i++) a = u[i], n = a.duration, s = a.size, o = a.flags, l = a.cts, h.set([n >>> 24 & 255, n >>> 16 & 255, n >>> 8 & 255, 255 & n, s >>> 24 & 255, s >>> 16 & 255, s >>> 8 & 255, 255 & s, o.isLeading << 2 | o.dependsOn, o.isDependedOn << 6 | o.hasRedundancy << 4 | o.paddingValue << 1 | o.isNonSync, 61440 & o.degradPrio, 15 & o.degradPrio, l >>> 24 & 255, l >>> 16 & 255, l >>> 8 & 255, 255 & l], 12 + 16 * i);
                            return e.box(e.types.trun, h)
                        }
                    }, {
                        key: "initSegment",
                        value: function(t) {
                            e.types || e.init();
                            var r, i = e.moov(t);
                            return r = new Uint8Array(e.FTYP.byteLength + i.byteLength), r.set(e.FTYP), r.set(i, e.FTYP.byteLength), r
                        }
                    }]), e
                }();
            r.default = n
        }, {}],
        38: [function(e, t, r) {
            "use strict";

            function i(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }

            function a(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var n = function() {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var i = t[r];
                            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                        }
                    }
                    return function(t, r, i) {
                        return r && e(t.prototype, r), i && e(t, i), t
                    }
                }(),
                s = e(29),
                o = i(s),
                l = e(28),
                u = i(l),
                d = e(45),
                f = e(37),
                h = i(f),
                c = e(26),
                v = function() {
                    function e(t, r, i, n) {
                        a(this, e), this.observer = t, this.id = r, this.config = i, this.typeSupported = n, this.ISGenerated = !1, this.PES2MP4SCALEFACTOR = 4, this.PES_TIMESCALE = 9e4, this.MP4_TIMESCALE = this.PES_TIMESCALE / this.PES2MP4SCALEFACTOR
                    }
                    return n(e, [{
                        key: "destroy",
                        value: function() {}
                    }, {
                        key: "insertDiscontinuity",
                        value: function() {
                            this._initPTS = this._initDTS = void 0
                        }
                    }, {
                        key: "switchLevel",
                        value: function() {
                            this.ISGenerated = !1
                        }
                    }, {
                        key: "remux",
                        value: function(e, t, r, i, a, n, s, o, l) {
                            if (this.level = e, this.sn = t, this.ISGenerated || this.generateIS(r, i, s), this.ISGenerated)
                                if (r.samples.length) {
                                    var d = this.remuxAudio(r, s, o, l);
                                    if (i.samples.length) {
                                        var f = void 0;
                                        d && (f = d.endPTS - d.startPTS), this.remuxVideo(i, s, o, f)
                                    }
                                } else {
                                    var h = void 0;
                                    i.samples.length && (h = this.remuxVideo(i, s, o)), h && r.codec && this.remuxEmptyAudio(r, s, o, h)
                                }
                            a.samples.length && this.remuxID3(a, s), n.samples.length && this.remuxText(n, s), this.observer.trigger(u.default.FRAG_PARSED, {
                                id: this.id,
                                level: this.level,
                                sn: this.sn
                            })
                        }
                    }, {
                        key: "generateIS",
                        value: function(e, t, r) {
                            var i, a, n = this.observer,
                                s = e.samples,
                                o = t.samples,
                                l = this.PES_TIMESCALE,
                                f = this.typeSupported,
                                v = "audio/mp4",
                                g = {},
                                p = {
                                    id: this.id,
                                    level: this.level,
                                    sn: this.sn,
                                    tracks: g,
                                    unique: !1
                                },
                                y = void 0 === this._initPTS;
                            y && (i = a = 1 / 0), e.config && s.length && (e.timescale = e.audiosamplerate, e.timescale * e.duration > Math.pow(2, 32) && ! function() {
                                var t = function e(t, r) {
                                    return r ? e(r, t % r) : t
                                };
                                e.timescale = e.audiosamplerate / t(e.audiosamplerate, e.isAAC ? 1024 : 1152)
                            }(), d.logger.log("audio mp4 timescale :" + e.timescale), e.isAAC || (f.mpeg ? (v = "audio/mpeg", e.codec = "") : f.mp3 && (e.codec = "mp3")), g.audio = {
                                container: v,
                                codec: e.codec,
                                initSegment: !e.isAAC && f.mpeg ? new Uint8Array : h.default.initSegment([e]),
                                metadata: {
                                    channelCount: e.channelCount
                                }
                            }, y && (i = a = s[0].pts - l * r)), t.sps && t.pps && o.length && (t.timescale = this.MP4_TIMESCALE, g.video = {
                                container: "video/mp4",
                                codec: t.codec,
                                initSegment: h.default.initSegment([t]),
                                metadata: {
                                    width: t.width,
                                    height: t.height
                                }
                            }, y && (i = Math.min(i, o[0].pts - l * r), a = Math.min(a, o[0].dts - l * r))), Object.keys(g).length ? (n.trigger(u.default.FRAG_PARSING_INIT_SEGMENT, p), this.ISGenerated = !0, y && (this._initPTS = i, this._initDTS = a)) : n.trigger(u.default.ERROR, {
                                type: c.ErrorTypes.MEDIA_ERROR,
                                id: this.id,
                                details: c.ErrorDetails.FRAG_PARSING_ERROR,
                                fatal: !1,
                                reason: "no audio/video samples found"
                            })
                        }
                    }, {
                        key: "remuxVideo",
                        value: function(e, t, r, i) {
                            var a, n, s, o, l, f, v, g, p = 8,
                                y = this.PES_TIMESCALE,
                                m = this.PES2MP4SCALEFACTOR,
                                E = e.samples,
                                b = [],
                                R = this._PTSNormalize,
                                _ = this._initDTS;
                            E.sort(function(e, t) {
                                return e.dts - t.dts
                            });
                            var k = E.reduce(function(e, t) {
                                return Math.max(Math.min(e, t.pts - t.dts), -18e3)
                            }, 0);
                            if (k < 0) {
                                d.logger.warn("PTS < DTS detected in video samples, shifting DTS by " + Math.round(k / 90) + " ms to overcome this issue");
                                for (var A = 0; A < E.length; A++) E[A].dts += k
                            }
                            var T = void 0;
                            T = r ? this.nextAvcDts : t * y;
                            var S = E[0];
                            l = Math.max(R(S.dts - _, T), 0), o = Math.max(R(S.pts - _, T), 0);
                            var L = Math.round((l - T) / 90);
                            r && L && (L > 1 ? d.logger.log("AVC:" + L + " ms hole between fragments detected,filling it") : L < -1 && d.logger.log("AVC:" + -L + " ms overlapping between fragments detected"), l = T, E[0].dts = l + _, o = Math.max(o - L, T), E[0].pts = o + _, d.logger.log("Video/PTS/DTS adjusted: " + Math.round(o / 90) + "/" + Math.round(l / 90) + ",delta:" + L + " ms")), f = l, S = E[E.length - 1], g = Math.max(R(S.dts - _, T), 0), v = Math.max(R(S.pts - _, T), 0), v = Math.max(v, g);
                            var D = navigator.vendor,
                                w = navigator.userAgent,
                                O = D && D.indexOf("Apple") > -1 && w && !w.match("CriOS");
                            O && (a = Math.round((g - l) / (m * (E.length - 1))));
                            for (var C = 0; C < E.length; C++) {
                                var P = E[C];
                                O ? P.dts = l + C * m * a : (P.dts = Math.max(R(P.dts - _, T), l), P.dts = Math.round(P.dts / m) * m), P.pts = Math.max(R(P.pts - _, T), P.dts), P.pts = Math.round(P.pts / m) * m
                            }
                            var I = e.len + 4 * e.nbNalu + 8;
                            try {
                                n = new Uint8Array(I)
                            } catch (e) {
                                return void this.observer.trigger(u.default.ERROR, {
                                    type: c.ErrorTypes.MUX_ERROR,
                                    level: this.level,
                                    id: this.id,
                                    details: c.ErrorDetails.REMUX_ALLOC_ERROR,
                                    fatal: !1,
                                    bytes: I,
                                    reason: "fail allocating video mdat " + I
                                })
                            }
                            var M = new DataView(n.buffer);
                            M.setUint32(0, n.byteLength), n.set(h.default.types.mdat, 4);
                            for (var x = 0; x < E.length; x++) {
                                for (var F = E[x], N = 0, U = void 0; F.units.units.length;) {
                                    var G = F.units.units.shift();
                                    M.setUint32(p, G.data.byteLength), p += 4, n.set(G.data, p), p += G.data.byteLength, N += 4 + G.data.byteLength
                                }
                                if (O) U = Math.max(0, a * Math.round((F.pts - F.dts) / (m * a)));
                                else {
                                    if (x < E.length - 1) a = E[x + 1].dts - F.dts;
                                    else {
                                        var B = this.config,
                                            j = F.dts - E[x > 0 ? x - 1 : x].dts;
                                        if (B.stretchShortVideoTrack) {
                                            var H = B.maxBufferHole,
                                                K = B.maxSeekHole,
                                                V = Math.floor(Math.min(H, K) * y),
                                                W = (i ? o + i * y : this.nextAudioPts) - F.pts;
                                            W > V ? (a = W - j, a < 0 && (a = j), d.logger.log("It is approximately " + W / 90 + " ms to the next segment; using duration " + a / 90 + " ms for the last video frame.")) : a = j
                                        } else a = j
                                    }
                                    a /= m, U = Math.round((F.pts - F.dts) / m)
                                }
                                b.push({
                                    size: N,
                                    duration: a,
                                    cts: U,
                                    flags: {
                                        isLeading: 0,
                                        isDependedOn: 0,
                                        hasRedundancy: 0,
                                        degradPrio: 0,
                                        dependsOn: F.key ? 2 : 1,
                                        isNonSync: F.key ? 0 : 1
                                    }
                                })
                            }
                            this.nextAvcDts = g + a * m;
                            var Y = e.dropped;
                            if (e.len = 0, e.nbNalu = 0, e.dropped = 0, b.length && navigator.userAgent.toLowerCase().indexOf("chrome") > -1) {
                                var q = b[0].flags;
                                q.dependsOn = 2, q.isNonSync = 0
                            }
                            e.samples = b, s = h.default.moof(e.sequenceNumber++, l / m, e), e.samples = [];
                            var X = {
                                id: this.id,
                                level: this.level,
                                sn: this.sn,
                                data1: s,
                                data2: n,
                                startPTS: o / y,
                                endPTS: (v + m * a) / y,
                                startDTS: l / y,
                                endDTS: this.nextAvcDts / y,
                                type: "video",
                                nb: b.length,
                                dropped: Y
                            };
                            return this.observer.trigger(u.default.FRAG_PARSING_DATA, X), X
                        }
                    }, {
                        key: "remuxAudio",
                        value: function(e, t, r, i) {
                            var a, n, s, l, f, v, g, p, y, m, E, b, R, _, k, A, T = this.PES_TIMESCALE,
                                S = e.timescale,
                                L = T / S,
                                D = e.timescale * (e.isAAC ? 1024 : 1152) / e.audiosamplerate,
                                w = D * L,
                                O = this._PTSNormalize,
                                C = this._initDTS,
                                P = !e.isAAC && this.typeSupported.mpeg,
                                I = P ? 0 : 8,
                                M = [],
                                x = [];
                            if (e.samples.sort(function(e, t) {
                                    return e.pts - t.pts
                                }), x = e.samples, A = this.nextAudioPts, r |= x.length && A && (Math.abs(t - A / T) < .1 || Math.abs(x[0].pts - A - this._initDTS) < 20 * w), r || (A = t * T), i && e.isAAC)
                                for (var F = 0, N = A; F < x.length;) {
                                    var U = x[F],
                                        G = O(U.pts - C, A),
                                        B = G - N;
                                    if (B <= -w) d.logger.warn("Dropping 1 audio frame @ " + Math.round(N / 90) / 1e3 + "s due to " + Math.round(Math.abs(B / 90)) + " ms overlap."), x.splice(F, 1), e.len -= U.unit.length;
                                    else if (B >= w) {
                                        var j = Math.round(B / w);
                                        d.logger.warn("Injecting " + j + " audio frame @ " + Math.round(N / 90) / 1e3 + "s due to " + Math.round(B / 90) + " ms gap.");
                                        for (var H = 0; H < j; H++) k = N + C, k = Math.max(k, C), _ = o.default.getSilentFrame(e.channelCount), _ || (d.logger.log("Unable to get silent frame for given audio codec; duplicating last frame instead."), _ = U.unit.subarray()), x.splice(F, 0, {
                                            unit: _,
                                            pts: k,
                                            dts: k
                                        }), e.len += _.length, N += w, F += 1;
                                        U.pts = U.dts = N + C, N += w, F += 1
                                    } else Math.abs(B) > .1 * w, N += w, 0 === F ? U.pts = U.dts = C + A : U.pts = U.dts = x[F - 1].pts + w, F += 1
                                }
                            for (; x.length;) {
                                if (n = x.shift(), l = n.unit, m = n.pts - C, E = n.dts - C, void 0 !== y) b = O(m, y), R = O(E, y), s.duration = Math.round((R - y) / L);
                                else {
                                    b = O(m, A), R = O(E, A);
                                    var K = Math.round(1e3 * (b - A) / T),
                                        V = 0;
                                    if (r && e.isAAC && K) {
                                        if (K > 0) V = Math.round((b - A) / w), d.logger.log(K + " ms hole between AAC samples detected,filling it"), V > 0 && (_ = o.default.getSilentFrame(e.channelCount), _ || (_ = l.subarray()), e.len += V * _.length);
                                        else if (K < -12) {
                                            d.logger.log(-K + " ms overlapping between AAC samples detected, drop frame"), e.len -= l.byteLength;
                                            continue
                                        }
                                        b = R = A
                                    }
                                    if (g = Math.max(0, b), p = Math.max(0, R), !(e.len > 0)) return;
                                    var W = P ? e.len : e.len + 8;
                                    try {
                                        f = new Uint8Array(W)
                                    } catch (e) {
                                        return void this.observer.trigger(u.default.ERROR, {
                                            type: c.ErrorTypes.MUX_ERROR,
                                            level: this.level,
                                            id: this.id,
                                            details: c.ErrorDetails.REMUX_ALLOC_ERROR,
                                            fatal: !1,
                                            bytes: W,
                                            reason: "fail allocating audio mdat " + W
                                        })
                                    }
                                    P || (a = new DataView(f.buffer), a.setUint32(0, f.byteLength), f.set(h.default.types.mdat, 4));
                                    for (var Y = 0; Y < V; Y++) k = b - (V - Y) * w, _ = o.default.getSilentFrame(e.channelCount), _ || (d.logger.log("Unable to get silent frame for given audio codec; duplicating this frame instead."), _ = l.subarray()), f.set(_, I), I += _.byteLength, s = {
                                        size: _.byteLength,
                                        cts: 0,
                                        duration: 1024,
                                        flags: {
                                            isLeading: 0,
                                            isDependedOn: 0,
                                            hasRedundancy: 0,
                                            degradPrio: 0,
                                            dependsOn: 1
                                        }
                                    }, M.push(s)
                                }
                                f.set(l, I), I += l.byteLength, s = {
                                    size: l.byteLength,
                                    cts: 0,
                                    duration: 0,
                                    flags: {
                                        isLeading: 0,
                                        isDependedOn: 0,
                                        hasRedundancy: 0,
                                        degradPrio: 0,
                                        dependsOn: 1
                                    }
                                }, M.push(s), y = R
                            }
                            var q = 0,
                                X = M.length;
                            if (X >= 2 && (q = M[X - 2].duration, s.duration = q), X) {
                                this.nextAudioPts = b + L * q, e.len = 0, e.samples = M, v = P ? new Uint8Array : h.default.moof(e.sequenceNumber++, p / L, e), e.samples = [];
                                var z = {
                                    id: this.id,
                                    level: this.level,
                                    sn: this.sn,
                                    data1: v,
                                    data2: f,
                                    startPTS: g / T,
                                    endPTS: this.nextAudioPts / T,
                                    startDTS: p / T,
                                    endDTS: (R + L * q) / T,
                                    type: "audio",
                                    nb: X
                                };
                                return this.observer.trigger(u.default.FRAG_PARSING_DATA, z), z
                            }
                            return null
                        }
                    }, {
                        key: "remuxEmptyAudio",
                        value: function(e, t, r, i) {
                            var a = this.PES_TIMESCALE,
                                n = e.timescale ? e.timescale : e.audiosamplerate,
                                s = a / n,
                                l = this.nextAudioPts,
                                u = (void 0 !== l ? l : i.startDTS * a) + this._initDTS,
                                f = i.endDTS * a + this._initDTS,
                                h = 1024,
                                c = s * h,
                                v = Math.ceil((f - u) / c),
                                g = o.default.getSilentFrame(e.channelCount);
                            if (d.logger.warn("remux empty Audio"), !g) return void d.logger.trace("Unable to remuxEmptyAudio since we were unable to get a silent frame for given audio codec!");
                            for (var p = [], y = 0; y < v; y++) {
                                var m = u + y * c;
                                p.push({
                                    unit: g,
                                    pts: m,
                                    dts: m
                                }), e.len += g.length
                            }
                            e.samples = p, this.remuxAudio(e, t, r)
                        }
                    }, {
                        key: "remuxID3",
                        value: function(e, t) {
                            var r, i = e.samples.length;
                            if (i) {
                                for (var a = 0; a < i; a++) r = e.samples[a], r.pts = (r.pts - this._initPTS) / this.PES_TIMESCALE, r.dts = (r.dts - this._initDTS) / this.PES_TIMESCALE;
                                this.observer.trigger(u.default.FRAG_PARSING_METADATA, {
                                    id: this.id,
                                    level: this.level,
                                    sn: this.sn,
                                    samples: e.samples
                                })
                            }
                            e.samples = [], t = t
                        }
                    }, {
                        key: "remuxText",
                        value: function(e, t) {
                            e.samples.sort(function(e, t) {
                                return e.pts - t.pts
                            });
                            var r, i = e.samples.length;
                            if (i) {
                                for (var a = 0; a < i; a++) r = e.samples[a], r.pts = (r.pts - this._initPTS) / this.PES_TIMESCALE;
                                this.observer.trigger(u.default.FRAG_PARSING_USERDATA, {
                                    id: this.id,
                                    level: this.level,
                                    sn: this.sn,
                                    samples: e.samples
                                })
                            }
                            e.samples = [], t = t
                        }
                    }, {
                        key: "_PTSNormalize",
                        value: function(e, t) {
                            var r;
                            if (void 0 === t) return e;
                            for (r = t < e ? -8589934592 : 8589934592; Math.abs(e - t) > 4294967296;) e += r;
                            return e
                        }
                    }, {
                        key: "passthrough",
                        get: function() {
                            return !1
                        }
                    }]), e
                }();
            r.default = v
        }, {
            26: 26,
            28: 28,
            29: 29,
            37: 37,
            45: 45
        }],
        39: [function(e, t, r) {
            "use strict";

            function i(e) {
                return e && e.__esModule ? e : {
                    default: e
                }
            }

            function a(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var n = function() {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var i = t[r];
                            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                        }
                    }
                    return function(t, r, i) {
                        return r && e(t.prototype, r), i && e(t, i), t
                    }
                }(),
                s = e(28),
                o = i(s),
                l = function() {
                    function e(t, r) {
                        a(this, e), this.observer = t, this.id = r, this.ISGenerated = !1
                    }
                    return n(e, [{
                        key: "destroy",
                        value: function() {}
                    }, {
                        key: "insertDiscontinuity",
                        value: function() {}
                    }, {
                        key: "switchLevel",
                        value: function() {
                            this.ISGenerated = !1
                        }
                    }, {
                        key: "remux",
                        value: function(e, t, r, i, a, n) {
                            var s = this.observer;
                            if (!this.ISGenerated) {
                                var l = {},
                                    u = {
                                        id: this.id,
                                        tracks: l,
                                        unique: !0
                                    },
                                    d = t,
                                    f = d.codec;
                                f && (u.tracks.video = {
                                    container: d.container,
                                    codec: f,
                                    metadata: {
                                        width: d.width,
                                        height: d.height
                                    }
                                }), d = e, f = d.codec, f && (u.tracks.audio = {
                                    container: d.container,
                                    codec: f,
                                    metadata: {
                                        channelCount: d.channelCount
                                    }
                                }), this.ISGenerated = !0, s.trigger(o.default.FRAG_PARSING_INIT_SEGMENT, u)
                            }
                            s.trigger(o.default.FRAG_PARSING_DATA, {
                                id: this.id,
                                data1: n,
                                startPTS: a,
                                startDTS: a,
                                type: "audiovideo",
                                nb: 1,
                                dropped: 0
                            })
                        }
                    }, {
                        key: "passthrough",
                        get: function() {
                            return !0
                        }
                    }]), e
                }();
            r.default = l
        }, {
            28: 28
        }],
        40: [function(e, t, r) {
            "use strict";

            function i(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var a = function() {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var i = t[r];
                            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                        }
                    }
                    return function(t, r, i) {
                        return r && e(t.prototype, r), i && e(t, i), t
                    }
                }(),
                n = /^(\d+)x(\d+)$/,
                s = /\s*(.+?)\s*=((?:\".*?\")|.*?)(?:,|$)/g,
                o = function() {
                    function e(t) {
                        i(this, e), "string" == typeof t && (t = e.parseAttrList(t));
                        for (var r in t) t.hasOwnProperty(r) && (this[r] = t[r])
                    }
                    return a(e, [{
                        key: "decimalInteger",
                        value: function(e) {
                            var t = parseInt(this[e], 10);
                            return t > Number.MAX_SAFE_INTEGER ? 1 / 0 : t
                        }
                    }, {
                        key: "hexadecimalInteger",
                        value: function(e) {
                            if (this[e]) {
                                var t = (this[e] || "0x").slice(2);
                                t = (1 & t.length ? "0" : "") + t;
                                for (var r = new Uint8Array(t.length / 2), i = 0; i < t.length / 2; i++) r[i] = parseInt(t.slice(2 * i, 2 * i + 2), 16);
                                return r
                            }
                            return null
                        }
                    }, {
                        key: "hexadecimalIntegerAsNumber",
                        value: function(e) {
                            var t = parseInt(this[e], 16);
                            return t > Number.MAX_SAFE_INTEGER ? 1 / 0 : t
                        }
                    }, {
                        key: "decimalFloatingPoint",
                        value: function(e) {
                            return parseFloat(this[e])
                        }
                    }, {
                        key: "enumeratedString",
                        value: function(e) {
                            return this[e]
                        }
                    }, {
                        key: "decimalResolution",
                        value: function(e) {
                            var t = n.exec(this[e]);
                            if (null !== t) return {
                                width: parseInt(t[1], 10),
                                height: parseInt(t[2], 10)
                            }
                        }
                    }], [{
                        key: "parseAttrList",
                        value: function(e) {
                            var t, r = {};
                            for (s.lastIndex = 0; null !== (t = s.exec(e));) {
                                var i = t[2],
                                    a = '"';
                                0 === i.indexOf(a) && i.lastIndexOf(a) === i.length - 1 && (i = i.slice(1, -1)), r[t[1]] = i
                            }
                            return r
                        }
                    }]), e
                }();
            r.default = o
        }, {}],
        41: [function(e, t, r) {
            "use strict";
            var i = {
                search: function(e, t) {
                    for (var r = 0, i = e.length - 1, a = null, n = null; r <= i;) {
                        a = (r + i) / 2 | 0, n = e[a];
                        var s = t(n);
                        if (s > 0) r = a + 1;
                        else {
                            if (!(s < 0)) return n;
                            i = a - 1
                        }
                    }
                    return null
                }
            };
            t.exports = i
        }, {}],
        42: [function(e, t, r) {
            "use strict";

            function i(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var a = function() {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var i = t[r];
                            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                        }
                    }
                    return function(t, r, i) {
                        return r && e(t.prototype, r), i && e(t, i), t
                    }
                }(),
                n = {
                    42: 225,
                    92: 233,
                    94: 237,
                    95: 243,
                    96: 250,
                    123: 231,
                    124: 247,
                    125: 209,
                    126: 241,
                    127: 9608,
                    128: 174,
                    129: 176,
                    130: 189,
                    131: 191,
                    132: 8482,
                    133: 162,
                    134: 163,
                    135: 9834,
                    136: 224,
                    137: 32,
                    138: 232,
                    139: 226,
                    140: 234,
                    141: 238,
                    142: 244,
                    143: 251,
                    144: 193,
                    145: 201,
                    146: 211,
                    147: 218,
                    148: 220,
                    149: 252,
                    150: 8216,
                    151: 161,
                    152: 42,
                    153: 8217,
                    154: 9473,
                    155: 169,
                    156: 8480,
                    157: 8226,
                    158: 8220,
                    159: 8221,
                    160: 192,
                    161: 194,
                    162: 199,
                    163: 200,
                    164: 202,
                    165: 203,
                    166: 235,
                    167: 206,
                    168: 207,
                    169: 239,
                    170: 212,
                    171: 217,
                    172: 249,
                    173: 219,
                    174: 171,
                    175: 187,
                    176: 195,
                    177: 227,
                    178: 205,
                    179: 204,
                    180: 236,
                    181: 210,
                    182: 242,
                    183: 213,
                    184: 245,
                    185: 123,
                    186: 125,
                    187: 92,
                    188: 94,
                    189: 95,
                    190: 124,
                    191: 8764,
                    192: 196,
                    193: 228,
                    194: 214,
                    195: 246,
                    196: 223,
                    197: 165,
                    198: 164,
                    199: 9475,
                    200: 197,
                    201: 229,
                    202: 216,
                    203: 248,
                    204: 9487,
                    205: 9491,
                    206: 9495,
                    207: 9499
                },
                s = function(e) {
                    var t = e;
                    return n.hasOwnProperty(e) && (t = n[e]), String.fromCharCode(t)
                },
                o = 15,
                l = 32,
                u = {
                    17: 1,
                    18: 3,
                    21: 5,
                    22: 7,
                    23: 9,
                    16: 11,
                    19: 12,
                    20: 14
                },
                d = {
                    17: 2,
                    18: 4,
                    21: 6,
                    22: 8,
                    23: 10,
                    19: 13,
                    20: 15
                },
                f = {
                    25: 1,
                    26: 3,
                    29: 5,
                    30: 7,
                    31: 9,
                    24: 11,
                    27: 12,
                    28: 14
                },
                h = {
                    25: 2,
                    26: 4,
                    29: 6,
                    30: 8,
                    31: 10,
                    27: 13,
                    28: 15
                },
                c = ["white", "green", "blue", "cyan", "red", "yellow", "magenta", "black", "transparent"],
                v = {
                    verboseFilter: {
                        DATA: 3,
                        DEBUG: 3,
                        INFO: 2,
                        WARNING: 2,
                        TEXT: 1,
                        ERROR: 0
                    },
                    time: null,
                    verboseLevel: 0,
                    setTime: function(e) {
                        this.time = e
                    },
                    log: function(e, t) {
                        var r = this.verboseFilter[e];
                        this.verboseLevel >= r
                    }
                },
                g = function(e) {
                    for (var t = [], r = 0; r < e.length; r++) t.push(e[r].toString(16));
                    return t
                },
                p = function() {
                    function e(t, r, a, n, s) {
                        i(this, e), this.foreground = t || "white", this.underline = r || !1, this.italics = a || !1, this.background = n || "black", this.flash = s || !1
                    }
                    return a(e, [{
                        key: "reset",
                        value: function() {
                            this.foreground = "white", this.underline = !1, this.italics = !1, this.background = "black", this.flash = !1
                        }
                    }, {
                        key: "setStyles",
                        value: function(e) {
                            for (var t = ["foreground", "underline", "italics", "background", "flash"], r = 0; r < t.length; r++) {
                                var i = t[r];
                                e.hasOwnProperty(i) && (this[i] = e[i])
                            }
                        }
                    }, {
                        key: "isDefault",
                        value: function() {
                            return "white" === this.foreground && !this.underline && !this.italics && "black" === this.background && !this.flash
                        }
                    }, {
                        key: "equals",
                        value: function(e) {
                            return this.foreground === e.foreground && this.underline === e.underline && this.italics === e.italics && this.background === e.background && this.flash === e.flash
                        }
                    }, {
                        key: "copy",
                        value: function(e) {
                            this.foreground = e.foreground, this.underline = e.underline, this.italics = e.italics, this.background = e.background, this.flash = e.flash
                        }
                    }, {
                        key: "toString",
                        value: function() {
                            return "color=" + this.foreground + ", underline=" + this.underline + ", italics=" + this.italics + ", background=" + this.background + ", flash=" + this.flash
                        }
                    }]), e
                }(),
                y = function() {
                    function e(t, r, a, n, s, o) {
                        i(this, e), this.uchar = t || " ", this.penState = new p(r, a, n, s, o)
                    }
                    return a(e, [{
                        key: "reset",
                        value: function() {
                            this.uchar = " ", this.penState.reset()
                        }
                    }, {
                        key: "setChar",
                        value: function(e, t) {
                            this.uchar = e, this.penState.copy(t)
                        }
                    }, {
                        key: "setPenState",
                        value: function(e) {
                            this.penState.copy(e)
                        }
                    }, {
                        key: "equals",
                        value: function(e) {
                            return this.uchar === e.uchar && this.penState.equals(e.penState)
                        }
                    }, {
                        key: "copy",
                        value: function(e) {
                            this.uchar = e.uchar, this.penState.copy(e.penState)
                        }
                    }, {
                        key: "isEmpty",
                        value: function() {
                            return " " === this.uchar && this.penState.isDefault()
                        }
                    }]), e
                }(),
                m = function() {
                    function e() {
                        i(this, e), this.chars = [];
                        for (var t = 0; t < l; t++) this.chars.push(new y);
                        this.pos = 0, this.currPenState = new p
                    }
                    return a(e, [{
                        key: "equals",
                        value: function(e) {
                            for (var t = !0, r = 0; r < l; r++)
                                if (!this.chars[r].equals(e.chars[r])) {
                                    t = !1;
                                    break
                                }
                            return t
                        }
                    }, {
                        key: "copy",
                        value: function(e) {
                            for (var t = 0; t < l; t++) this.chars[t].copy(e.chars[t])
                        }
                    }, {
                        key: "isEmpty",
                        value: function() {
                            for (var e = !0, t = 0; t < l; t++)
                                if (!this.chars[t].isEmpty()) {
                                    e = !1;
                                    break
                                }
                            return e
                        }
                    }, {
                        key: "setCursor",
                        value: function(e) {
                            this.pos !== e && (this.pos = e), this.pos < 0 ? (v.log("ERROR", "Negative cursor position " + this.pos), this.pos = 0) : this.pos > l && (v.log("ERROR", "Too large cursor position " + this.pos), this.pos = l)
                        }
                    }, {
                        key: "moveCursor",
                        value: function(e) {
                            var t = this.pos + e;
                            if (e > 1)
                                for (var r = this.pos + 1; r < t + 1; r++) this.chars[r].setPenState(this.currPenState);
                            this.setCursor(t)
                        }
                    }, {
                        key: "backSpace",
                        value: function() {
                            this.moveCursor(-1), this.chars[this.pos].setChar(" ", this.currPenState)
                        }
                    }, {
                        key: "insertChar",
                        value: function(e) {
                            e >= 144 && this.backSpace();
                            var t = s(e);
                            return this.pos >= l ? void v.log("ERROR", "Cannot insert " + e.toString(16) + " (" + t + ") at position " + this.pos + ". Skipping it!") : (this.chars[this.pos].setChar(t, this.currPenState), void this.moveCursor(1))
                        }
                    }, {
                        key: "clearFromPos",
                        value: function(e) {
                            var t;
                            for (t = e; t < l; t++) this.chars[t].reset()
                        }
                    }, {
                        key: "clear",
                        value: function() {
                            this.clearFromPos(0), this.pos = 0, this.currPenState.reset()
                        }
                    }, {
                        key: "clearToEndOfRow",
                        value: function() {
                            this.clearFromPos(this.pos)
                        }
                    }, {
                        key: "getTextString",
                        value: function() {
                            for (var e = [], t = !0, r = 0; r < l; r++) {
                                var i = this.chars[r].uchar;
                                " " !== i && (t = !1), e.push(i)
                            }
                            return t ? "" : e.join("")
                        }
                    }, {
                        key: "setPenStyles",
                        value: function(e) {
                            this.currPenState.setStyles(e);
                            var t = this.chars[this.pos];
                            t.setPenState(this.currPenState)
                        }
                    }]), e
                }(),
                E = function() {
                    function e() {
                        i(this, e), this.rows = [];
                        for (var t = 0; t < o; t++) this.rows.push(new m);
                        this.currRow = o - 1, this.nrRollUpRows = null, this.reset()
                    }
                    return a(e, [{
                        key: "reset",
                        value: function() {
                            for (var e = 0; e < o; e++) this.rows[e].clear();
                            this.currRow = o - 1
                        }
                    }, {
                        key: "equals",
                        value: function(e) {
                            for (var t = !0, r = 0; r < o; r++)
                                if (!this.rows[r].equals(e.rows[r])) {
                                    t = !1;
                                    break
                                }
                            return t
                        }
                    }, {
                        key: "copy",
                        value: function(e) {
                            for (var t = 0; t < o; t++) this.rows[t].copy(e.rows[t])
                        }
                    }, {
                        key: "isEmpty",
                        value: function() {
                            for (var e = !0, t = 0; t < o; t++)
                                if (!this.rows[t].isEmpty()) {
                                    e = !1;
                                    break
                                }
                            return e
                        }
                    }, {
                        key: "backSpace",
                        value: function() {
                            var e = this.rows[this.currRow];
                            e.backSpace()
                        }
                    }, {
                        key: "clearToEndOfRow",
                        value: function() {
                            var e = this.rows[this.currRow];
                            e.clearToEndOfRow()
                        }
                    }, {
                        key: "insertChar",
                        value: function(e) {
                            var t = this.rows[this.currRow];
                            t.insertChar(e)
                        }
                    }, {
                        key: "setPen",
                        value: function(e) {
                            var t = this.rows[this.currRow];
                            t.setPenStyles(e)
                        }
                    }, {
                        key: "moveCursor",
                        value: function(e) {
                            var t = this.rows[this.currRow];
                            t.moveCursor(e)
                        }
                    }, {
                        key: "setCursor",
                        value: function(e) {
                            v.log("INFO", "setCursor: " + e);
                            var t = this.rows[this.currRow];
                            t.setCursor(e)
                        }
                    }, {
                        key: "setPAC",
                        value: function(e, t) {
                            v.log("INFO", "pacData = " + JSON.stringify(e));
                            var r = e.row - 1;
                            if (this.nrRollUpRows && r < this.nrRollUpRows - 1 && (r = this.nrRollUpRows - 1), this.nrRollUpRows && this.currRow !== r) {
                                for (var i = 0; i < o; i++) this.rows[i].clear();
                                var a = this.currRow + 1 - this.nrRollUpRows,
                                    n = t.rows[a].cueStartTime;
                                if (n && n < v.time)
                                    for (i = 0; i < this.nrRollUpRows; i++) this.rows[r - this.nrRollUpRows + i + 1].copy(t.rows[a + i])
                            }
                            this.currRow = r;
                            var s = this.rows[this.currRow];
                            if (null !== e.indent) {
                                var l = e.indent,
                                    u = Math.max(l - 1, 0);
                                s.setCursor(e.indent), e.color = s.chars[u].penState.foreground
                            }
                            var d = {
                                foreground: e.color,
                                underline: e.underline,
                                italics: e.italics,
                                background: "black",
                                flash: !1
                            };
                            this.setPen(d)
                        }
                    }, {
                        key: "setBkgData",
                        value: function(e) {
                            v.log("INFO", "bkgData = " + JSON.stringify(e)), this.backSpace(), this.setPen(e), this.insertChar(32)
                        }
                    }, {
                        key: "setRollUpRows",
                        value: function(e) {
                            this.nrRollUpRows = e
                        }
                    }, {
                        key: "rollUp",
                        value: function() {
                            if (null === this.nrRollUpRows) return void v.log("DEBUG", "roll_up but nrRollUpRows not set yet");
                            v.log("TEXT", this.getDisplayText());
                            var e = this.currRow + 1 - this.nrRollUpRows,
                                t = this.rows.splice(e, 1)[0];
                            t.clear(), this.rows.splice(this.currRow, 0, t), v.log("INFO", "Rolling up")
                        }
                    }, {
                        key: "getDisplayText",
                        value: function(e) {
                            e = e || !1;
                            for (var t = [], r = "", i = -1, a = 0; a < o; a++) {
                                var n = this.rows[a].getTextString();
                                n && (i = a + 1, e ? t.push("Row " + i + ": '" + n + "'") : t.push(n.trim()))
                            }
                            return t.length > 0 && (r = e ? "[" + t.join(" | ") + "]" : t.join("\n")), r
                        }
                    }, {
                        key: "getTextAndFormat",
                        value: function() {
                            return this.rows
                        }
                    }]), e
                }(),
                b = function() {
                    function e(t, r) {
                        i(this, e), this.chNr = t, this.outputFilter = r, this.mode = null, this.verbose = 0, this.displayedMemory = new E, this.nonDisplayedMemory = new E, this.lastOutputScreen = new E, this.currRollUpRow = this.displayedMemory.rows[o - 1], this.writeScreen = this.displayedMemory, this.mode = null, this.cueStartTime = null
                    }
                    return a(e, [{
                        key: "reset",
                        value: function() {
                            this.mode = null, this.displayedMemory.reset(), this.nonDisplayedMemory.reset(), this.lastOutputScreen.reset(), this.currRollUpRow = this.displayedMemory.rows[o - 1], this.writeScreen = this.displayedMemory, this.mode = null, this.cueStartTime = null, this.lastCueEndTime = null
                        }
                    }, {
                        key: "getHandler",
                        value: function() {
                            return this.outputFilter
                        }
                    }, {
                        key: "setHandler",
                        value: function(e) {
                            this.outputFilter = e
                        }
                    }, {
                        key: "setPAC",
                        value: function(e) {
                            this.writeScreen.setPAC(e, this.lastOutputScreen)
                        }
                    }, {
                        key: "setBkgData",
                        value: function(e) {
                            this.writeScreen.setBkgData(e)
                        }
                    }, {
                        key: "setMode",
                        value: function(e) {
                            e !== this.mode && (this.mode = e, v.log("INFO", "MODE=" + e), "MODE_POP-ON" === this.mode ? this.writeScreen = this.nonDisplayedMemory : (this.writeScreen = this.displayedMemory, this.writeScreen.reset(), this.lastOutputScreen.reset()), "MODE_ROLL-UP" !== this.mode && (this.displayedMemory.nrRollUpRows = null, this.nonDisplayedMemory.nrRollUpRows = null), this.mode = e)
                        }
                    }, {
                        key: "insertChars",
                        value: function(e) {
                            for (var t = 0; t < e.length; t++) this.writeScreen.insertChar(e[t]);
                            var r = this.writeScreen === this.displayedMemory ? "DISP" : "NON_DISP";
                            v.log("INFO", r + ": " + this.writeScreen.getDisplayText(!0)), "MODE_PAINT-ON" !== this.mode && "MODE_ROLL-UP" !== this.mode || (v.log("TEXT", "DISPLAYED: " + this.displayedMemory.getDisplayText(!0)), this.outputDataUpdate())
                        }
                    }, {
                        key: "ccRCL",
                        value: function() {
                            v.log("INFO", "RCL - Resume Caption Loading"), this.setMode("MODE_POP-ON")
                        }
                    }, {
                        key: "ccBS",
                        value: function() {
                            v.log("INFO", "BS - BackSpace"), "MODE_TEXT" !== this.mode && (this.writeScreen.backSpace(), this.writeScreen === this.displayedMemory && this.outputDataUpdate())
                        }
                    }, {
                        key: "ccAOF",
                        value: function() {}
                    }, {
                        key: "ccAON",
                        value: function() {}
                    }, {
                        key: "ccDER",
                        value: function() {
                            v.log("INFO", "DER- Delete to End of Row"), this.writeScreen.clearToEndOfRow(), this.outputDataUpdate()
                        }
                    }, {
                        key: "ccRU",
                        value: function(e) {
                            v.log("INFO", "RU(" + e + ") - Roll Up"), this.writeScreen = this.displayedMemory, this.setMode("MODE_ROLL-UP"), this.writeScreen.setRollUpRows(e)
                        }
                    }, {
                        key: "ccFON",
                        value: function() {
                            v.log("INFO", "FON - Flash On"), this.writeScreen.setPen({
                                flash: !0
                            })
                        }
                    }, {
                        key: "ccRDC",
                        value: function() {
                            v.log("INFO", "RDC - Resume Direct Captioning"), this.setMode("MODE_PAINT-ON")
                        }
                    }, {
                        key: "ccTR",
                        value: function() {
                            v.log("INFO", "TR"), this.setMode("MODE_TEXT")
                        }
                    }, {
                        key: "ccRTD",
                        value: function() {
                            v.log("INFO", "RTD"), this.setMode("MODE_TEXT")
                        }
                    }, {
                        key: "ccEDM",
                        value: function() {
                            v.log("INFO", "EDM - Erase Displayed Memory"), this.displayedMemory.reset(), this.outputDataUpdate()
                        }
                    }, {
                        key: "ccCR",
                        value: function() {
                            v.log("CR - Carriage Return"), this.writeScreen.rollUp(), this.outputDataUpdate()
                        }
                    }, {
                        key: "ccENM",
                        value: function() {
                            v.log("INFO", "ENM - Erase Non-displayed Memory"), this.nonDisplayedMemory.reset()
                        }
                    }, {
                        key: "ccEOC",
                        value: function() {
                            if (v.log("INFO", "EOC - End Of Caption"), "MODE_POP-ON" === this.mode) {
                                var e = this.displayedMemory;
                                this.displayedMemory = this.nonDisplayedMemory, this.nonDisplayedMemory = e, this.writeScreen = this.nonDisplayedMemory, v.log("TEXT", "DISP: " + this.displayedMemory.getDisplayText())
                            }
                            this.outputDataUpdate()
                        }
                    }, {
                        key: "ccTO",
                        value: function(e) {
                            v.log("INFO", "TO(" + e + ") - Tab Offset"), this.writeScreen.moveCursor(e)
                        }
                    }, {
                        key: "ccMIDROW",
                        value: function(e) {
                            var t = {
                                flash: !1
                            };
                            if (t.underline = e % 2 === 1, t.italics = e >= 46, t.italics) t.foreground = "white";
                            else {
                                var r = Math.floor(e / 2) - 16,
                                    i = ["white", "green", "blue", "cyan", "red", "yellow", "magenta"];
                                t.foreground = i[r]
                            }
                            v.log("INFO", "MIDROW: " + JSON.stringify(t)), this.writeScreen.setPen(t)
                        }
                    }, {
                        key: "outputDataUpdate",
                        value: function() {
                            var e = v.time;
                            null !== e && this.outputFilter && (this.outputFilter.updateData && this.outputFilter.updateData(e, this.displayedMemory), null !== this.cueStartTime || this.displayedMemory.isEmpty() ? this.displayedMemory.equals(this.lastOutputScreen) || (this.outputFilter.newCue && this.outputFilter.newCue(this.cueStartTime, e, this.lastOutputScreen), this.cueStartTime = this.displayedMemory.isEmpty() ? null : e) : this.cueStartTime = e, this.lastOutputScreen.copy(this.displayedMemory))
                        }
                    }, {
                        key: "cueSplitAtTime",
                        value: function(e) {
                            this.outputFilter && (this.displayedMemory.isEmpty() || (this.outputFilter.newCue && this.outputFilter.newCue(this.cueStartTime, e, this.displayedMemory), this.cueStartTime = e))
                        }
                    }]), e
                }(),
                R = function() {
                    function e(t, r, a) {
                        i(this, e), this.field = t || 1, this.outputs = [r, a], this.channels = [new b(1, r), new b(2, a)], this.currChNr = -1, this.lastCmdA = null, this.lastCmdB = null, this.bufferedData = [], this.startTime = null, this.lastTime = null, this.dataCounters = {
                            padding: 0,
                            char: 0,
                            cmd: 0,
                            other: 0
                        }
                    }
                    return a(e, [{
                        key: "getHandler",
                        value: function(e) {
                            return this.channels[e].getHandler()
                        }
                    }, {
                        key: "setHandler",
                        value: function(e, t) {
                            this.channels[e].setHandler(t)
                        }
                    }, {
                        key: "addData",
                        value: function(e, t) {
                            var r, i, a, n = !1;
                            this.lastTime = e, v.setTime(e);
                            for (var s = 0; s < t.length; s += 2)
                                if (i = 127 & t[s], a = 127 & t[s + 1], 0 !== i || 0 !== a) {
                                    if (v.log("DATA", "[" + g([t[s], t[s + 1]]) + "] -> (" + g([i, a]) + ")"), r = this.parseCmd(i, a), r || (r = this.parseMidrow(i, a)), r || (r = this.parsePAC(i, a)), r || (r = this.parseBackgroundAttributes(i, a)), !r && (n = this.parseChars(i, a)))
                                        if (this.currChNr && this.currChNr >= 0) {
                                            var o = this.channels[this.currChNr - 1];
                                            o.insertChars(n)
                                        } else v.log("WARNING", "No channel found yet. TEXT-MODE?");
                                    r ? this.dataCounters.cmd += 2 : n ? this.dataCounters.char += 2 : (this.dataCounters.other += 2, v.log("WARNING", "Couldn't parse cleaned data " + g([i, a]) + " orig: " + g([t[s], t[s + 1]])))
                                } else this.dataCounters.padding += 2
                        }
                    }, {
                        key: "parseCmd",
                        value: function(e, t) {
                            var r = null,
                                i = (20 === e || 28 === e) && 32 <= t && t <= 47,
                                a = (23 === e || 31 === e) && 33 <= t && t <= 35;
                            if (!i && !a) return !1;
                            if (e === this.lastCmdA && t === this.lastCmdB) return this.lastCmdA = null, this.lastCmdB = null, v.log("DEBUG", "Repeated command (" + g([e, t]) + ") is dropped"), !0;
                            r = 20 === e || 23 === e ? 1 : 2;
                            var n = this.channels[r - 1];
                            return 20 === e || 28 === e ? 32 === t ? n.ccRCL() : 33 === t ? n.ccBS() : 34 === t ? n.ccAOF() : 35 === t ? n.ccAON() : 36 === t ? n.ccDER() : 37 === t ? n.ccRU(2) : 38 === t ? n.ccRU(3) : 39 === t ? n.ccRU(4) : 40 === t ? n.ccFON() : 41 === t ? n.ccRDC() : 42 === t ? n.ccTR() : 43 === t ? n.ccRTD() : 44 === t ? n.ccEDM() : 45 === t ? n.ccCR() : 46 === t ? n.ccENM() : 47 === t && n.ccEOC() : n.ccTO(t - 32), this.lastCmdA = e, this.lastCmdB = t, this.currChNr = r, !0
                        }
                    }, {
                        key: "parseMidrow",
                        value: function(e, t) {
                            var r = null;
                            if ((17 === e || 25 === e) && 32 <= t && t <= 47) {
                                if (r = 17 === e ? 1 : 2, r !== this.currChNr) return v.log("ERROR", "Mismatch channel in midrow parsing"), !1;
                                var i = this.channels[r - 1];
                                return i.ccMIDROW(t), v.log("DEBUG", "MIDROW (" + g([e, t]) + ")"), !0
                            }
                            return !1
                        }
                    }, {
                        key: "parsePAC",
                        value: function(e, t) {
                            var r = null,
                                i = null,
                                a = (17 <= e && e <= 23 || 25 <= e && e <= 31) && 64 <= t && t <= 127,
                                n = (16 === e || 24 === e) && 64 <= t && t <= 95;
                            if (!a && !n) return !1;
                            if (e === this.lastCmdA && t === this.lastCmdB) return this.lastCmdA = null, this.lastCmdB = null, !0;
                            r = e <= 23 ? 1 : 2, i = 64 <= t && t <= 95 ? 1 === r ? u[e] : f[e] : 1 === r ? d[e] : h[e];
                            var s = this.interpretPAC(i, t),
                                o = this.channels[r - 1];
                            return o.setPAC(s), this.lastCmdA = e, this.lastCmdB = t, this.currChNr = r, !0
                        }
                    }, {
                        key: "interpretPAC",
                        value: function(e, t) {
                            var r = t,
                                i = {
                                    color: null,
                                    italics: !1,
                                    indent: null,
                                    underline: !1,
                                    row: e
                                };
                            return r = t > 95 ? t - 96 : t - 64, i.underline = 1 === (1 & r), r <= 13 ? i.color = ["white", "green", "blue", "cyan", "red", "yellow", "magenta", "white"][Math.floor(r / 2)] : r <= 15 ? (i.italics = !0, i.color = "white") : i.indent = 4 * Math.floor((r - 16) / 2), i
                        }
                    }, {
                        key: "parseChars",
                        value: function(e, t) {
                            var r = null,
                                i = null,
                                a = null;
                            if (e >= 25 ? (r = 2, a = e - 8) : (r = 1, a = e), 17 <= a && a <= 19) {
                                var n = t;
                                n = 17 === a ? t + 80 : 18 === a ? t + 112 : t + 144, v.log("INFO", "Special char '" + s(n) + "' in channel " + r), i = [n]
                            } else 32 <= e && e <= 127 && (i = 0 === t ? [e] : [e, t]);
                            if (i) {
                                var o = g(i);
                                v.log("DEBUG", "Char codes =  " + o.join(",")), this.lastCmdA = null, this.lastCmdB = null
                            }
                            return i
                        }
                    }, {
                        key: "parseBackgroundAttributes",
                        value: function(e, t) {
                            var r, i, a, n, s = (16 === e || 24 === e) && 32 <= t && t <= 47,
                                o = (23 === e || 31 === e) && 45 <= t && t <= 47;
                            return !(!s && !o) && (r = {}, 16 === e || 24 === e ? (i = Math.floor((t - 32) / 2), r.background = c[i], t % 2 === 1 && (r.background = r.background + "_semi")) : 45 === t ? r.background = "transparent" : (r.foreground = "black", 47 === t && (r.underline = !0)), a = e < 24 ? 1 : 2, n = this.channels[a - 1], n.setBkgData(r), this.lastCmdA = null, this.lastCmdB = null, !0)
                        }
                    }, {
                        key: "reset",
                        value: function() {
                            for (var e = 0; e < this.channels.length; e++) this.channels[e] && this.channels[e].reset();
                            this.lastCmdA = null, this.lastCmdB = null
                        }
                    }, {
                        key: "cueSplitAtTime",
                        value: function(e) {
                            for (var t = 0; t < this.channels.length; t++) this.channels[t] && this.channels[t].cueSplitAtTime(e)
                        }
                    }]), e
                }();
            r.default = R
        }, {}],
        43: [function(e, t, r) {
            "use strict";
            var i = {
                newCue: function(e, t, r, i) {
                    for (var a, n, s, o, l, u = window.VTTCue || window.TextTrackCue, d = 0; d < i.rows.length; d++)
                        if (a = i.rows[d], s = !0, o = 0, l = "", !a.isEmpty()) {
                            for (var f = 0; f < a.chars.length; f++) a.chars[f].uchar.match(/\s/) && s ? o++ : (l += a.chars[f].uchar, s = !1);
                            a.cueStartTime = t, n = new u(t, r, l.trim()), o >= 16 ? o-- : o++, navigator.userAgent.match(/Firefox\//) ? n.line = d + 1 : n.line = d > 7 ? d - 2 : d + 1, n.align = "left", n.position = Math.max(0, Math.min(100, 100 * (o / 32) + (navigator.userAgent.match(/Firefox\//) ? 50 : 0))), e.addCue(n)
                        }
                }
            };
            t.exports = i
        }, {}],
        44: [function(e, t, r) {
            "use strict";

            function i(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var a = function() {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var i = t[r];
                            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                        }
                    }
                    return function(t, r, i) {
                        return r && e(t.prototype, r), i && e(t, i), t
                    }
                }(),
                n = function() {
                    function e(t) {
                        i(this, e), this.alpha_ = t ? Math.exp(Math.log(.5) / t) : 0, this.estimate_ = 0, this.totalWeight_ = 0
                    }
                    return a(e, [{
                        key: "sample",
                        value: function(e, t) {
                            var r = Math.pow(this.alpha_, e);
                            this.estimate_ = t * (1 - r) + r * this.estimate_, this.totalWeight_ += e
                        }
                    }, {
                        key: "getTotalWeight",
                        value: function() {
                            return this.totalWeight_
                        }
                    }, {
                        key: "getEstimate",
                        value: function() {
                            if (this.alpha_) {
                                var e = 1 - Math.pow(this.alpha_, this.totalWeight_);
                                return this.estimate_ / e
                            }
                            return this.estimate_
                        }
                    }]), e
                }();
            r.default = n
        }, {}],
        45: [function(e, t, r) {
            "use strict";

            function i() {}

            function a(e, t) {
                return t = "[" + e + "] > " + t
            }

            function n(e) {
                var t = self.console[e];
                return t ? function() {
                    for (var r = arguments.length, i = Array(r), n = 0; n < r; n++) i[n] = arguments[n];
                    i[0] && (i[0] = a(e, i[0])), t.apply(self.console, i)
                } : i
            }

            function s(e) {
                for (var t = arguments.length, r = Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++) r[i - 1] = arguments[i];
                r.forEach(function(t) {
                    u[t] = e[t] ? e[t].bind(e) : n(t)
                })
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
                    return typeof e
                } : function(e) {
                    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
                },
                l = {
                    trace: i,
                    debug: i,
                    log: i,
                    warn: i,
                    info: i,
                    error: i
                },
                u = l;
            r.enableLogs = function(e) {
                if (e === !0 || "object" === ("undefined" == typeof e ? "undefined" : o(e))) {
                    s(e, "debug", "log", "info", "warn", "error");
                    try {
                        u.log()
                    } catch (e) {
                        u = l
                    }
                } else u = l
            }, r.logger = u
        }, {}],
        46: [function(e, t, r) {
            "use strict";

            function i(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var a = function() {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var i = t[r];
                            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                        }
                    }
                    return function(t, r, i) {
                        return r && e(t.prototype, r), i && e(t, i), t
                    }
                }(),
                n = function() {
                    function e() {
                        i(this, e)
                    }
                    return a(e, null, [{
                        key: "toString",
                        value: function(e) {
                            for (var t = "", r = e.length, i = 0; i < r; i++) t += "[" + e.start(i).toFixed(3) + "," + e.end(i).toFixed(3) + "]";
                            return t
                        }
                    }]), e
                }();
            r.default = n
        }, {}],
        47: [function(e, t, r) {
            "use strict";

            function i(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }
            Object.defineProperty(r, "__esModule", {
                value: !0
            });
            var a = function() {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var i = t[r];
                            i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
                        }
                    }
                    return function(t, r, i) {
                        return r && e(t.prototype, r), i && e(t, i), t
                    }
                }(),
                n = e(45),
                s = function() {
                    function e(t) {
                        i(this, e), t && t.xhrSetup && (this.xhrSetup = t.xhrSetup)
                    }
                    return a(e, [{
                        key: "destroy",
                        value: function() {
                            this.abort(), this.loader = null
                        }
                    }, {
                        key: "abort",
                        value: function() {
                            var e = this.loader;
                            e && 4 !== e.readyState && (this.stats.aborted = !0, e.abort()), window.clearTimeout(this.requestTimeout), this.requestTimeout = null, window.clearTimeout(this.retryTimeout), this.retryTimeout = null
                        }
                    }, {
                        key: "load",
                        value: function(e, t, r) {
                            this.context = e, this.config = t, this.callbacks = r, this.stats = {
                                trequest: performance.now(),
                                retry: 0
                            }, this.retryDelay = t.retryDelay, this.loadInternal()
                        }
                    }, {
                        key: "loadInternal",
                        value: function() {
                            var e, t = this.context;
                            e = "undefined" != typeof XDomainRequest ? this.loader = new XDomainRequest : this.loader = new XMLHttpRequest, e.onreadystatechange = this.readystatechange.bind(this), e.onprogress = this.loadprogress.bind(this), e.open("GET", t.url, !0), t.rangeEnd && e.setRequestHeader("Range", "bytes=" + t.rangeStart + "-" + (t.rangeEnd - 1)), e.responseType = t.responseType;
                            var r = this.stats;
                            r.tfirst = 0, r.loaded = 0, this.xhrSetup && this.xhrSetup(e, t.url), this.requestTimeout = window.setTimeout(this.loadtimeout.bind(this), this.config.timeout), e.send()
                        }
                    }, {
                        key: "readystatechange",
                        value: function(e) {
                            var t = e.currentTarget,
                                r = t.readyState,
                                i = this.stats,
                                a = this.context,
                                s = this.config;
                            if (!i.aborted && (window.clearTimeout(this.requestTimeout), r >= 2 && (0 === i.tfirst && (i.tfirst = Math.max(performance.now(), i.trequest), this.requestTimeout = window.setTimeout(this.loadtimeout.bind(this), s.timeout - (i.tfirst - i.trequest))), 4 === r))) {
                                var o = t.status;
                                if (o >= 200 && o < 300) {
                                    i.tload = Math.max(i.tfirst, performance.now());
                                    var l = void 0,
                                        u = void 0;
                                    "arraybuffer" === a.responseType ? (l = t.response, u = l.byteLength) : (l = t.responseText, u = l.length), i.loaded = i.total = u;
                                    var d = {
                                        url: t.responseURL,
                                        data: l
                                    };
                                    this.callbacks.onSuccess(d, i, a)
                                } else i.retry >= s.maxRetry || o >= 400 && o < 499 ? (n.logger.error(o + " while loading " + a.url), this.callbacks.onError({
                                    code: o,
                                    text: t.statusText
                                }, a)) : (n.logger.warn(o + " while loading " + a.url + ", retrying in " + this.retryDelay + "..."), this.destroy(), this.retryTimeout = window.setTimeout(this.loadInternal.bind(this), this.retryDelay), this.retryDelay = Math.min(2 * this.retryDelay, s.maxRetryDelay), i.retry++)
                            }
                        }
                    }, {
                        key: "loadtimeout",
                        value: function() {
                            n.logger.warn("timeout while loading " + this.context.url), this.callbacks.onTimeout(this.stats, this.context)
                        }
                    }, {
                        key: "loadprogress",
                        value: function(e) {
                            var t = this.stats;
                            t.loaded = e.loaded, e.lengthComputable && (t.total = e.total);
                            var r = this.callbacks.onProgress;
                            r && r(t, this.context, null)
                        }
                    }]), e
                }();
            r.default = s
        }, {
            45: 45
        }]
    }, {}, [33])(33)
});