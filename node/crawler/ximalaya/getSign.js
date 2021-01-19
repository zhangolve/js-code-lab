// 33700  3722
function l(t, e) {
    return t(e = {
        exports: {}
    }, e.exports), e.exports
}

var I = l((function(t) {
    var e = function(t) {
        var e = Object.prototype,
            r = e.hasOwnProperty,
            n = "function" == typeof Symbol ? Symbol : {},
            i = n.iterator || "@@iterator",
            o = n.asyncIterator || "@@asyncIterator",
            a = n.toStringTag || "@@toStringTag";

        function s(t, e, r, n) {
            var i = e && e.prototype instanceof c ? e : c,
                o = Object.create(i.prototype),
                a = new w(n || []);
            return o._invoke = function(t, e, r) {
                var n = "suspendedStart";
                return function(i, o) {
                    if ("executing" === n) throw new Error("Generator is already running");
                    if ("completed" === n) {
                        if ("throw" === i) throw o;
                        return {
                            value: void 0,
                            done: !0
                        }
                    }
                    for (r.method = i, r.arg = o;;) {
                        var a = r.delegate;
                        if (a) {
                            var s = m(a, r);
                            if (s) {
                                if (s === l) continue;
                                return s
                            }
                        }
                        if ("next" === r.method) r.sent = r._sent = r.arg;
                        else if ("throw" === r.method) {
                            if ("suspendedStart" === n) throw n = "completed", r.arg;
                            r.dispatchException(r.arg)
                        } else "return" === r.method && r.abrupt("return", r.arg);
                        n = "executing";
                        var c = u(t, e, r);
                        if ("normal" === c.type) {
                            if (n = r.done ? "completed" : "suspendedYield", c.arg === l) continue;
                            return {
                                value: c.arg,
                                done: r.done
                            }
                        }
                        "throw" === c.type && (n = "completed", r.method = "throw", r.arg = c.arg)
                    }
                }
            }(t, r, a), o
        }

        function u(t, e, r) {
            try {
                return {
                    type: "normal",
                    arg: t.call(e, r)
                }
            } catch (t) {
                return {
                    type: "throw",
                    arg: t
                }
            }
        }
        t.wrap = s;
        var l = {};

        function c() {}

        function f() {}

        function d() {}
        var h = {};
        h[i] = function() {
            return this
        };
        var p = Object.getPrototypeOf,
            g = p && p(p(T([])));
        g && g !== e && r.call(g, i) && (h = g);
        var A = d.prototype = c.prototype = Object.create(h);

        function v(t) {
            ["next", "throw", "return"].forEach((function(e) {
                t[e] = function(t) {
                    return this._invoke(e, t)
                }
            }))
        }

        function y(t) {
            var e;
            this._invoke = function(n, i) {
                function o() {
                    return new Promise((function(e, o) {
                        ! function e(n, i, o, a) {
                            var s = u(t[n], t, i);
                            if ("throw" !== s.type) {
                                var l = s.arg,
                                    c = l.value;
                                return c && "object" == typeof c && r.call(c, "__await") ? Promise.resolve(c.__await).then((function(t) {
                                    e("next", t, o, a)
                                }), (function(t) {
                                    e("throw", t, o, a)
                                })) : Promise.resolve(c).then((function(t) {
                                    l.value = t, o(l)
                                }), (function(t) {
                                    return e("throw", t, o, a)
                                }))
                            }
                            a(s.arg)
                        }(n, i, e, o)
                    }))
                }
                return e = e ? e.then(o, o) : o()
            }
        }

        function m(t, e) {
            var r = t.iterator[e.method];
            if (void 0 === r) {
                if (e.delegate = null, "throw" === e.method) {
                    if (t.iterator.return && (e.method = "return", e.arg = void 0, m(t, e), "throw" === e.method)) return l;
                    e.method = "throw", e.arg = new TypeError("The iterator does not provide a 'throw' method")
                }
                return l
            }
            var n = u(r, t.iterator, e.arg);
            if ("throw" === n.type) return e.method = "throw", e.arg = n.arg, e.delegate = null, l;
            var i = n.arg;
            return i ? i.done ? (e[t.resultName] = i.value, e.next = t.nextLoc, "return" !== e.method && (e.method = "next", e.arg = void 0), e.delegate = null, l) : i : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, l)
        }

        function b(t) {
            var e = {
                tryLoc: t[0]
            };
            1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e)
        }

        function E(t) {
            var e = t.completion || {};
            e.type = "normal", delete e.arg, t.completion = e
        }

        function w(t) {
            this.tryEntries = [{
                tryLoc: "root"
            }], t.forEach(b, this), this.reset(!0)
        }

        function T(t) {
            if (t) {
                var e = t[i];
                if (e) return e.call(t);
                if ("function" == typeof t.next) return t;
                if (!isNaN(t.length)) {
                    var n = -1,
                        o = function e() {
                            for (; ++n < t.length;)
                                if (r.call(t, n)) return e.value = t[n], e.done = !1, e;
                            return e.value = void 0, e.done = !0, e
                        };
                    return o.next = o
                }
            }
            return {
                next: S
            }
        }

        function S() {
            return {
                value: void 0,
                done: !0
            }
        }
        return f.prototype = A.constructor = d, d.constructor = f, d[a] = f.displayName = "GeneratorFunction", t.isGeneratorFunction = function(t) {
            var e = "function" == typeof t && t.constructor;
            return !!e && (e === f || "GeneratorFunction" === (e.displayName || e.name))
        }, t.mark = function(t) {
            return Object.setPrototypeOf ? Object.setPrototypeOf(t, d) : (t.__proto__ = d, a in t || (t[a] = "GeneratorFunction")), t.prototype = Object.create(A), t
        }, t.awrap = function(t) {
            return {
                __await: t
            }
        }, v(y.prototype), y.prototype[o] = function() {
            return this
        }, t.AsyncIterator = y, t.async = function(e, r, n, i) {
            var o = new y(s(e, r, n, i));
            return t.isGeneratorFunction(r) ? o : o.next().then((function(t) {
                return t.done ? t.value : o.next()
            }))
        }, v(A), A[a] = "Generator", A[i] = function() {
            return this
        }, A.toString = function() {
            return "[object Generator]"
        }, t.keys = function(t) {
            var e = [];
            for (var r in t) e.push(r);
            return e.reverse(),
                function r() {
                    for (; e.length;) {
                        var n = e.pop();
                        if (n in t) return r.value = n, r.done = !1, r
                    }
                    return r.done = !0, r
                }
        }, t.values = T, w.prototype = {
            constructor: w,
            reset: function(t) {
                if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = !1, this.delegate = null, this.method = "next", this.arg = void 0, this.tryEntries.forEach(E), !t)
                    for (var e in this) "t" === e.charAt(0) && r.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = void 0)
            },
            stop: function() {
                this.done = !0;
                var t = this.tryEntries[0].completion;
                if ("throw" === t.type) throw t.arg;
                return this.rval
            },
            dispatchException: function(t) {
                if (this.done) throw t;
                var e = this;

                function n(r, n) {
                    return a.type = "throw", a.arg = t, e.next = r, n && (e.method = "next", e.arg = void 0), !!n
                }
                for (var i = this.tryEntries.length - 1; i >= 0; --i) {
                    var o = this.tryEntries[i],
                        a = o.completion;
                    if ("root" === o.tryLoc) return n("end");
                    if (o.tryLoc <= this.prev) {
                        var s = r.call(o, "catchLoc"),
                            u = r.call(o, "finallyLoc");
                        if (s && u) {
                            if (this.prev < o.catchLoc) return n(o.catchLoc, !0);
                            if (this.prev < o.finallyLoc) return n(o.finallyLoc)
                        } else if (s) {
                            if (this.prev < o.catchLoc) return n(o.catchLoc, !0)
                        } else {
                            if (!u) throw new Error("try statement without catch or finally");
                            if (this.prev < o.finallyLoc) return n(o.finallyLoc)
                        }
                    }
                }
            },
            abrupt: function(t, e) {
                for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                    var i = this.tryEntries[n];
                    if (i.tryLoc <= this.prev && r.call(i, "finallyLoc") && this.prev < i.finallyLoc) {
                        var o = i;
                        break
                    }
                }
                o && ("break" === t || "continue" === t) && o.tryLoc <= e && e <= o.finallyLoc && (o = null);
                var a = o ? o.completion : {};
                return a.type = t, a.arg = e, o ? (this.method = "next", this.next = o.finallyLoc, l) : this.complete(a)
            },
            complete: function(t, e) {
                if ("throw" === t.type) throw t.arg;
                return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), l
            },
            finish: function(t) {
                for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                    var r = this.tryEntries[e];
                    if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), E(r), l
                }
            },
            catch: function(t) {
                for (var e = this.tryEntries.length - 1; e >= 0; --e) {
                    var r = this.tryEntries[e];
                    if (r.tryLoc === t) {
                        var n = r.completion;
                        if ("throw" === n.type) {
                            var i = n.arg;
                            E(r)
                        }
                        return i
                    }
                }
                throw new Error("illegal catch attempt")
            },
            delegateYield: function(t, e, r) {
                return this.delegate = {
                    iterator: T(t),
                    resultName: e,
                    nextLoc: r
                }, "next" === this.method && (this.arg = void 0), l
            }
        }, t
    }(t.exports);
    try {
        regeneratorRuntime = e
    } catch (t) {
        Function("r", "regeneratorRuntime = r")(e)
    }
}));


// 3775
function u(t, e, r) {
    try {
        return {
            type: "normal",
            arg: t.call(e, r)
        }
    } catch (t) {
        return {
            type: "throw",
            arg: t
        }
    }
}


var U = new(l((function(t, e) {
    var r, n, i = ["now", "concat", "_instance", "URL", "initServerTimeUrl", "INISTAL_TIME", "CLOCK_UPDATE_INTERVAL", "start", "XM_SERVER_CLOCK", "getServerDate", "then", "test", "location", "https:", "/revision/time", "getSign", "open", "GET", "send", "onreadystatechange", "updateClock", "clockTimer", "RESET_SERVER_CLOCK_LIMIT", "hidden", "undefined", "exports", "amd", "Cannot call a class as a function", "length", "enumerable", "configurable", "value", "defineProperty", "key", "prototype", "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", "rotl", "endian", "floor", "push", "toString", "join", "substr", "charAt", "replace", "indexOf", "pow", "bin", "stringToBytes", "bytesToString", "charCodeAt", "fromCharCode", "constructor", "isBuffer", "slice", "utf8", "encoding", "binary", "bytesToWords", "_ff", "_gg", "_hh", "_ii", "_digestsize", "Illegal argument ", "asBytes", "bytesToHex", "random"];
    r = i, n = 228,
        function(t) {
            for (; --t;) r.push(r.shift())
        }(++n);
    var o, a, s = function(t, e) {
        return i[t -= 0]
    };
    o = u, a = function() {
        var t = function(t, e) {
            if (!(t instanceof e)) throw new TypeError(s("0x3"))
        };

        function e(t, e) {
            for (var r = 0; r < e[s("0x4")]; r++) {
                var n = e[r];
                n[s("0x5")] = n[s("0x5")] || !1, n[s("0x6")] = !0, s("0x7") in n && (n.writable = !0), Object[s("0x8")](t, n[s("0x9")], n)
            }
        }
        var r = function(t, r, n) {
            return r && e(t[s("0xa")], r), n && e(t, n), t
        };

        function n(t, e) {
            return t(e = {
                exports: {}
            }, e.exports), e.exports
        }
        var i = n((function(t) {
                ! function() {
                    var e = s("0xb"),
                        r = {
                            rotl: function(t, e) {
                                return t << e | t >>> 32 - e
                            },
                            rotr: function(t, e) {
                                return t << 32 - e | t >>> e
                            },
                            endian: function(t) {
                                if (t.constructor == Number) return 16711935 & r[s("0xc")](t, 8) | 4278255360 & r[s("0xc")](t, 24);
                                for (var e = 0; e < t[s("0x4")]; e++) t[e] = r[s("0xd")](t[e]);
                                return t
                            },
                            randomBytes: function(t) {
                                for (var e = []; t > 0; t--) e.push(Math[s("0xe")](256 * Math.random()));
                                return e
                            },
                            bytesToWords: function(t) {
                                for (var e = [], r = 0, n = 0; r < t[s("0x4")]; r++, n += 8) e[n >>> 5] |= t[r] << 24 - n % 32;
                                return e
                            },
                            wordsToBytes: function(t) {
                                for (var e = [], r = 0; r < 32 * t[s("0x4")]; r += 8) e[s("0xf")](t[r >>> 5] >>> 24 - r % 32 & 255);
                                return e
                            },
                            bytesToHex: function(t) {
                                for (var e = [], r = 0; r < t[s("0x4")]; r++) e[s("0xf")]((t[r] >>> 4)[s("0x10")](16)), e[s("0xf")]((15 & t[r]).toString(16));
                                return e[s("0x11")]("")
                            },
                            hexToBytes: function(t) {
                                for (var e = [], r = 0; r < t[s("0x4")]; r += 2) e[s("0xf")](parseInt(t[s("0x12")](r, 2), 16));
                                return e
                            },
                            bytesToBase64: function(t) {
                                for (var r = [], n = 0; n < t[s("0x4")]; n += 3)
                                    for (var i = t[n] << 16 | t[n + 1] << 8 | t[n + 2], o = 0; o < 4; o++) 8 * n + 6 * o <= 8 * t[s("0x4")] ? r[s("0xf")](e[s("0x13")](i >>> 6 * (3 - o) & 63)) : r[s("0xf")]("=");
                                return r[s("0x11")]("")
                            },
                            base64ToBytes: function(t) {
                                t = t[s("0x14")](/[^A-Z0-9+\/]/gi, "");
                                for (var r = [], n = 0, i = 0; n < t[s("0x4")]; i = ++n % 4) 0 != i && r[s("0xf")]((e[s("0x15")](t[s("0x13")](n - 1)) & Math[s("0x16")](2, -2 * i + 8) - 1) << 2 * i | e[s("0x15")](t[s("0x13")](n)) >>> 6 - 2 * i);
                                return r
                            }
                        };
                    t[s("0x1")] = r
                }()
            })),
            o = {
                utf8: {
                    stringToBytes: function(t) {
                        return o[s("0x17")][s("0x18")](unescape(encodeURIComponent(t)))
                    },
                    bytesToString: function(t) {
                        return decodeURIComponent(escape(o[s("0x17")][s("0x19")](t)))
                    }
                },
                bin: {
                    stringToBytes: function(t) {
                        for (var e = [], r = 0; r < t[s("0x4")]; r++) e[s("0xf")](255 & t[s("0x1a")](r));
                        return e
                    },
                    bytesToString: function(t) {
                        for (var e = [], r = 0; r < t[s("0x4")]; r++) e[s("0xf")](String[s("0x1b")](t[r]));
                        return e.join("")
                    }
                }
            },
            a = o,
            u = function(t) {
                return null != t && (l(t) || "function" == typeof(e = t).readFloatLE && "function" == typeof e[s("0x1e")] && l(e[s("0x1e")](0, 0)) || !!t._isBuffer);
                var e
            };

        function l(t) {
            return !!t.constructor && "function" == typeof t[s("0x1c")][s("0x1d")] && t[s("0x1c")][s("0x1d")](t)
        }
        var c = n((function(t) {
                ! function() {
                    var e = i,
                        r = a[s("0x1f")],
                        n = u,
                        o = a[s("0x17")],
                        l = function(t, i) {
                            t[s("0x1c")] == String ? t = i && i[s("0x20")] === s("0x21") ? o[s("0x18")](t) : r[s("0x18")](t) : n(t) ? t = Array[s("0xa")][s("0x1e")].call(t, 0) : Array.isArray(t) || (t = t.toString());
                            for (var a = e[s("0x22")](t), u = 8 * t.length, c = 1732584193, f = -271733879, d = -1732584194, h = 271733878, p = 0; p < a[s("0x4")]; p++) a[p] = 16711935 & (a[p] << 8 | a[p] >>> 24) | 4278255360 & (a[p] << 24 | a[p] >>> 8);
                            a[u >>> 5] |= 128 << u % 32, a[14 + (u + 64 >>> 9 << 4)] = u;
                            var g = l[s("0x23")],
                                A = l[s("0x24")],
                                v = l[s("0x25")],
                                y = l[s("0x26")];
                            for (p = 0; p < a[s("0x4")]; p += 16) {
                                var m = c,
                                    b = f,
                                    E = d,
                                    w = h;
                                c = g(c, f, d, h, a[p + 0], 7, -680876936), h = g(h, c, f, d, a[p + 1], 12, -389564586), d = g(d, h, c, f, a[p + 2], 17, 606105819), f = g(f, d, h, c, a[p + 3], 22, -1044525330), c = g(c, f, d, h, a[p + 4], 7, -176418897), h = g(h, c, f, d, a[p + 5], 12, 1200080426), d = g(d, h, c, f, a[p + 6], 17, -1473231341), f = g(f, d, h, c, a[p + 7], 22, -45705983), c = g(c, f, d, h, a[p + 8], 7, 1770035416), h = g(h, c, f, d, a[p + 9], 12, -1958414417), d = g(d, h, c, f, a[p + 10], 17, -42063), f = g(f, d, h, c, a[p + 11], 22, -1990404162), c = g(c, f, d, h, a[p + 12], 7, 1804603682), h = g(h, c, f, d, a[p + 13], 12, -40341101), d = g(d, h, c, f, a[p + 14], 17, -1502002290), c = A(c, f = g(f, d, h, c, a[p + 15], 22, 1236535329), d, h, a[p + 1], 5, -165796510), h = A(h, c, f, d, a[p + 6], 9, -1069501632), d = A(d, h, c, f, a[p + 11], 14, 643717713), f = A(f, d, h, c, a[p + 0], 20, -373897302), c = A(c, f, d, h, a[p + 5], 5, -701558691), h = A(h, c, f, d, a[p + 10], 9, 38016083), d = A(d, h, c, f, a[p + 15], 14, -660478335), f = A(f, d, h, c, a[p + 4], 20, -405537848), c = A(c, f, d, h, a[p + 9], 5, 568446438), h = A(h, c, f, d, a[p + 14], 9, -1019803690), d = A(d, h, c, f, a[p + 3], 14, -187363961), f = A(f, d, h, c, a[p + 8], 20, 1163531501), c = A(c, f, d, h, a[p + 13], 5, -1444681467), h = A(h, c, f, d, a[p + 2], 9, -51403784), d = A(d, h, c, f, a[p + 7], 14, 1735328473), c = v(c, f = A(f, d, h, c, a[p + 12], 20, -1926607734), d, h, a[p + 5], 4, -378558), h = v(h, c, f, d, a[p + 8], 11, -2022574463), d = v(d, h, c, f, a[p + 11], 16, 1839030562), f = v(f, d, h, c, a[p + 14], 23, -35309556), c = v(c, f, d, h, a[p + 1], 4, -1530992060), h = v(h, c, f, d, a[p + 4], 11, 1272893353), d = v(d, h, c, f, a[p + 7], 16, -155497632), f = v(f, d, h, c, a[p + 10], 23, -1094730640), c = v(c, f, d, h, a[p + 13], 4, 681279174), h = v(h, c, f, d, a[p + 0], 11, -358537222), d = v(d, h, c, f, a[p + 3], 16, -722521979), f = v(f, d, h, c, a[p + 6], 23, 76029189), c = v(c, f, d, h, a[p + 9], 4, -640364487), h = v(h, c, f, d, a[p + 12], 11, -421815835), d = v(d, h, c, f, a[p + 15], 16, 530742520), c = y(c, f = v(f, d, h, c, a[p + 2], 23, -995338651), d, h, a[p + 0], 6, -198630844), h = y(h, c, f, d, a[p + 7], 10, 1126891415), d = y(d, h, c, f, a[p + 14], 15, -1416354905), f = y(f, d, h, c, a[p + 5], 21, -57434055), c = y(c, f, d, h, a[p + 12], 6, 1700485571), h = y(h, c, f, d, a[p + 3], 10, -1894986606), d = y(d, h, c, f, a[p + 10], 15, -1051523), f = y(f, d, h, c, a[p + 1], 21, -2054922799), c = y(c, f, d, h, a[p + 8], 6, 1873313359), h = y(h, c, f, d, a[p + 15], 10, -30611744), d = y(d, h, c, f, a[p + 6], 15, -1560198380), f = y(f, d, h, c, a[p + 13], 21, 1309151649), c = y(c, f, d, h, a[p + 4], 6, -145523070), h = y(h, c, f, d, a[p + 11], 10, -1120210379), d = y(d, h, c, f, a[p + 2], 15, 718787259), f = y(f, d, h, c, a[p + 9], 21, -343485551), c = c + m >>> 0, f = f + b >>> 0, d = d + E >>> 0, h = h + w >>> 0
                            }
                            return e[s("0xd")]([c, f, d, h])
                        };
                    l[s("0x23")] = function(t, e, r, n, i, o, a) {
                        var s = t + (e & r | ~e & n) + (i >>> 0) + a;
                        return (s << o | s >>> 32 - o) + e
                    }, l[s("0x24")] = function(t, e, r, n, i, o, a) {
                        var s = t + (e & n | r & ~n) + (i >>> 0) + a;
                        return (s << o | s >>> 32 - o) + e
                    }, l[s("0x25")] = function(t, e, r, n, i, o, a) {
                        var s = t + (e ^ r ^ n) + (i >>> 0) + a;
                        return (s << o | s >>> 32 - o) + e
                    }, l[s("0x26")] = function(t, e, r, n, i, o, a) {
                        var s = t + (r ^ (e | ~n)) + (i >>> 0) + a;
                        return (s << o | s >>> 32 - o) + e
                    }, l._blocksize = 16, l[s("0x27")] = 16, t[s("0x1")] = function(t, r) {
                        if (null == t) throw new Error(s("0x28") + t);
                        var n = e.wordsToBytes(l(t, r));
                        return r && r[s("0x29")] ? n : r && r.asString ? o[s("0x19")](n) : e[s("0x2a")](n)
                    }
                }()
            })),
            f = function() {
                return typeof window === s("0x0")
            },
            d = function(t) {
                return ~~(Math[s("0x2b")]() * t)
            };
        return function() {
            function e() {
                if (t(this, e), e._instance) return e[s("0x2e")];
                e[s("0x2e")] = this, this.clockTimer = null, this[s("0x2f")] = this[s("0x30")](), this[s("0x31")] = null, this[s("0x32")] = 3333, this.RESET_SERVER_CLOCK_LIMIT = 6e5, this[s("0x33")]()
            }
            return r(e, [{
                key: s("0x33"),
                value: function() {
                    var t = this,
                        e = arguments[s("0x4")] > 0 && void 0 !== arguments[0] && arguments[0];
                    f() || window[s("0x34")] && !e || this[s("0x35")]()[s("0x36")]((function(e) {
                        t[s("0x31")] = e, window[s("0x34")] = e, t.updateClock()
                    }))
                }
            }, {
                key: s("0x30"),
                value: function() {
                    var t = "https://www.ximalaya.com/revision/time";
                    if (f()) return t;
                    var e = /https?:/ [s("0x37")](window[s("0x38")].protocol) ? window[s("0x38")].protocol : s("0x39"),
                        r = /m.(test\.|uat\.)?ximalaya.com/ [s("0x37")](window[s("0x38")].host) ? window[s("0x38")].host : "www.ximalaya.com";
                    return t = "".concat(e, "//")[s("0x2d")](r, s("0x3a"))
                }
            }, {
                key: s("0x3b"),
                value: function() {
                    var t, e, r = "";
                    return r = f() ? Date[s("0x2c")]() : window[s("0x34")] || 0, t = r, e = Date[s("0x2c")](), "{himalaya-" [s("0x2d")](t, "}(")[s("0x2d")](d(100), ")")[s("0x2d")](t, "(")[s("0x2d")](d(100), ")")[s("0x2d")](e).replace(/{([\w-]+)}/, (function(t, e) {
                        return c(e)
                    }))
                }
            }, {
                key: "getServerDate",
                value: function() {
                    var t = this;
                    return new Promise((function(e, r) {
                        var n = new XMLHttpRequest;
                        n[s("0x3c")](s("0x3d"), t[s("0x2f")], !0), n[s("0x3e")](null), n[s("0x3f")] = function() {
                            if (4 === n.readyState) {
                                var t = Number(n.responseText);
                                t = isNaN(t) ? Date[s("0x2c")]() : t, e(t)
                            }
                        }
                    }))
                }
            }, {
                key: s("0x40"),
                value: function() {
                    var t = this;
                    this[s("0x41")] = setInterval((function() {
                        window[s("0x34")] - t[s("0x31")] <= t[s("0x42")] || document[s("0x43")] ? window.XM_SERVER_CLOCK += t[s("0x32")] : (clearInterval(t[s("0x41")]), t[s("0x41")] = null, t[s("0x33")](!0))
                    }), this[s("0x32")])
                }
            }]), e
        }()
    }, "object" !== s("0x0") ? t[s("0x1")] = a() : (o = o || self).xmSign = a()
})));

// console.log(U.getSign())
module.exports = U.getSign; 
