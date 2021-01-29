function _t(t, e) {
    var r = function() {
        return e(arguments.length), t.apply(void 0, arguments)
    };
    return r.original = t, r
};
function St(t, e) {
    return function(t) {
        if (Array.isArray(t)) return t
    }(t) || function(t, e) {
        if (Symbol.iterator in Object(t) || "[object Arguments]" === Object.prototype.toString.call(t)) {
            var r = [],
                n = !0,
                i = !1,
                o = void 0;
            try {
                for (var a, s = t[Symbol.iterator](); !(n = (a = s.next()).done) && (r.push(a.value), !e || r.length !== e); n = !0);
            } catch (t) {
                i = !0, o = t
            } finally {
                try {
                    n || null == s.return || s.return()
                } finally {
                    if (i) throw o
                }
            }
            return r
        }
    }(t, e) || function() {
        throw new TypeError("Invalid attempt to destructure non-iterable instance")
    }()
}
var Ct = "undefined" != typeof BigUint64Array,
        kt = Symbol(),
xt = function(t, e) {
    var r, n, i, o, a, s, u, l, c, f, d, h = e.exports,
        p = h.memory,
        g = h.table,
        A = h.__alloc,
        v = h.__retain,
        y = h.__rtti_base || -1;

    function m() {
        r !== p.buffer && (r = p.buffer, n = new Int8Array(r), i = new Uint8Array(r), o = new Int16Array(r), a = new Uint16Array(r), s = new Int32Array(r), u = new Uint32Array(r), Ct && (f = new BigInt64Array(r), d = new BigUint64Array(r)), l = new Float32Array(r), c = new Float64Array(r))
    }

    function b(t) {
        if ((t >>>= 0) >= u[y >>> 2]) throw Error("invalid id: " + t);
        return u[(y + 4 >>> 2) + 2 * t]
    }

    function E(t) {
        if ((t >>>= 0) >= u[y >>> 2]) throw Error("invalid id: " + t);
        return u[(y + 4 >>> 2) + 2 * t + 1]
    }

    function w(t, e) {
        return 31 - Math.clz32(e / t & 31)
    }

    function T(t, e, r) {
        if (r) switch (t) {
            case 2:
                return l;
            case 3:
                return c
        } else switch (t) {
            case 0:
                return e ? n : i;
            case 1:
                return e ? o : a;
            case 2:
                return e ? s : u;
            case 3:
                return e ? f : d
        }
        throw Error("unsupported align: " + t)
    }

    function S(t) {
        m();
        var e = u[t + -8 >>> 2],
            r = b(e);
        if (!(1 & r)) throw Error("not an array: " + e);
        var n = w(32, r),
            i = u[t + 4 >>> 2],
            o = 2 & r ? u[t + 12 >>> 2] : u[i + -4 >>> 2] >>> n;
        return T(n, 1024 & r, 2048 & r).slice(i >>>= n, i + o)
    }
    return m(), t.__allocString = function(t) {
            var e = t.length,
                r = A(e << 1, 1);
            m();
            for (var n = 0, i = r >>> 1; n < e; ++n) a[i + n] = t.charCodeAt(n);
            return r
        }, t.__getString = function(t) {
            if (m(), 1 !== u[t + -8 >>> 2]) throw Error("not a string: " + t);
            return function(t, e, r) {
                var n = t[r + -4 >>> 2] >>> 1,
                    i = r >>> 1;
                if (n <= 1024) return String.fromCharCode.apply(String, e.subarray(i, i + n));
                var o = [];
                do {
                    var a = e[i + 1024 - 1],
                        s = a >= 55296 && a < 56320 ? 1023 : 1024;
                    o.push(String.fromCharCode.apply(String, e.subarray(i, i += s))), n -= s
                } while (n > 1024);
                return o.join("") + String.fromCharCode.apply(String, e.subarray(i, i + n))
            }(u, a, t)
        }, t.__allocArray = function(t, e) {
            var r = b(t);
            if (!(3 & r)) throw Error("not an array: " + t + " @ " + r);
            var n = w(32, r),
                i = e.length,
                o = A(i << n, 0),
                a = A(2 & r ? 16 : 12, t);
            m(), u[a + 0 >>> 2] = v(o), u[a + 4 >>> 2] = o, u[a + 8 >>> 2] = i << n, 2 & r && (u[a + 12 >>> 2] = i);
            for (var s = T(n, 1024 & r, 2048 & r), l = 0; l < i; ++l) s[(o >> n) + l] = e[l];
            if (8192 & r)
                for (var c = 0; c < i; ++c) v(e[c]);
            return a
        }, t.__getArrayView = S, t.__getArray = function(t) {
            return Array.from(S(t))
        }, t.__instanceof = function(t, e) {
            var r = u[t + -8 >>> 2];
            if (r <= u[y >>> 2])
                do {
                    if (r == e) return !0
                } while (r = E(r));
            return !1
        }, t.memory = t.memory || p, t.table = t.table || g,
        function(t, e) {
            var r = e ? Object.create(e) : {},
                n = t.__setargc || function() {};

            function i(t, e) {
                return Object.prototype.hasOwnProperty.call(t, e)
            }
            var o = function(e) {
                if (!i(t, e)) return "continue";
                for (var o = t[e], a = e.split("."), s = r; a.length > 1;) {
                    var u = a.shift();
                    i(s, u) || (s[u] = {}), s = s[u]
                }
                var l = a[0],
                    c = l.indexOf("#");
                if (c >= 0) {
                    var f = l.substring(0, c),
                        d = s[f];
                    if (void 0 === d || !d.prototype) {
                        var h = function t() {
                            for (var e, r = arguments.length, n = new Array(r), i = 0; i < r; i++) n[i] = arguments[i];
                            return t.wrap((e = t.prototype).constructor.apply(e, [0].concat(n)))
                        };
                        h.prototype = {
                            valueOf: function() {
                                return this[kt]
                            }
                        }, h.wrap = function(t) {
                            return Object.create(h.prototype, Tt({}, kt, {
                                value: t,
                                writable: !1
                            }))
                        }, d && Object.getOwnPropertyNames(d).forEach((function(t) {
                            return Object.defineProperty(h, t, Object.getOwnPropertyDescriptor(d, t))
                        })), s[f] = h
                    }
                    if (l = l.substring(c + 1), s = s[f].prototype, /^(get|set):/.test(l)) {
                        if (!i(s, l = l.substring(4))) {
                            var p = t[e.replace("set:", "get:")],
                                g = t[e.replace("get:", "set:")];
                            Object.defineProperty(s, l, {
                                get: function() {
                                    return p(this[kt])
                                },
                                set: function(t) {
                                    g(this[kt], t)
                                },
                                enumerable: !0
                            })
                        }
                    } else "constructor" === l ? s[l] = _t(o, n) : Object.defineProperty(s, l, {
                        value: function() {
                            for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++) e[r] = arguments[r];
                            return n(e.length), o.apply(void 0, [this[kt]].concat(e))
                        }
                    })
                } else /^(get|set):/.test(l) ? i(s, l = l.substring(4)) || Object.defineProperty(s, l, {
                    get: t[e.replace("set:", "get:")],
                    set: t[e.replace("get:", "set:")],
                    enumerable: !0
                }) : s[l] = "function" == typeof o ? _t(o, n) : o
            };
            for (var a in t) o(a);
            return r
        }(h, Object.defineProperties(t, {
            I8: {
                get: function() {
                    return m(), n
                }
            },
            U8: {
                get: function() {
                    return m(), i
                }
            },
            I16: {
                get: function() {
                    return m(), o
                }
            },
            U16: {
                get: function() {
                    return m(), a
                }
            },
            I32: {
                get: function() {
                    return m(), s
                }
            },
            U32: {
                get: function() {
                    return m(), u
                }
            },
            I64: {
                get: function() {
                    return m(), f
                }
            },
            U64: {
                get: function() {
                    return m(), d
                }
            },
            F32: {
                get: function() {
                    return m(), l
                }
            },
            F64: {
                get: function() {
                    return m(), c
                }
            }
        }))
};

var It, Ot, Rt = function() {
    return "undefined" != typeof window ? window : "undefined" != typeof self ? self : Function("return this")()
}();


function Tt(t, e, r) {
    return e in t ? Object.defineProperty(t, e, {
        value: r,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = r, t
}
function Pt(t, e, r) {
    var n = new t.Int8Array(r),
        i = new t.Int16Array(r),
        o = new t.Int32Array(r),
        a = new t.Uint8Array(r),
        s = new t.Uint16Array(r),
        u = (new t.Uint32Array(r), new t.Float32Array(r), new t.Float64Array(r), t.Math.imul),
        l = (t.Math.fround, t.Math.abs, t.Math.clz32),
        c = (t.Math.min, t.Math.max, t.Math.floor, t.Math.ceil),
        f = (t.Math.sqrt, e.abort),
        d = (t.NaN, t.Infinity, e.abort),
        h = 0,
        p = 0,
        g = 0,
        A = 0,
        v = 0,
        y = 0;

    function m(t, e) {
        var r, n = 0,
            i = 0,
            a = 0;
        1 & (n = o[e >> 2]) | 0 || (d(0, 24, 277, 13), f()), (i = (n = -4 & n | 0) >>> 0 >= 16 ? n >>> 0 < 1073741808 : 0) || (d(0, 24, 279, 13), f()), n >>> 0 < 256 ? (a = n >>> 4 | 0, n = 0) : (a = 16 ^ ((i = n) >>> ((n = 31 - l(n) | 0) - 4 | 0) | 0) | 0, n = n - 7 | 0), (i = n >>> 0 < 23 ? a >>> 0 < 16 : 0) || (d(0, 24, 292, 13), f()), i = o[(e + 20 | 0) >> 2], (r = o[(e + 16 | 0) >> 2]) && (o[(r + 20 | 0) >> 2] = i), i && (o[(i + 16 | 0) >> 2] = r), (0 | o[(96 + ((((n << 4 | 0) + a | 0) << 2 | 0) + t | 0) | 0) >> 2]) == (0 | e) && (o[(96 + ((((n << 4 | 0) + a | 0) << 2 | 0) + t | 0) | 0) >> 2] = i, i || (e = o[(4 + (i = (n << 2 | 0) + t | 0) | 0) >> 2] & (-1 ^ (1 << a | 0) | 0) | 0, o[(i + 4 | 0) >> 2] = e, e || (o[t >> 2] = o[t >> 2] & (-1 ^ (1 << n | 0) | 0) | 0)))
    }

    function b(t, e) {
        var r = 0,
            n = 0,
            i = 0,
            a = 0,
            s = 0,
            u = 0;
        e || (d(0, 24, 205, 13), f()), 1 & (n = o[e >> 2]) | 0 || (d(0, 24, 207, 13), f()), i = (e + 16 | 0) + (-4 & o[e >> 2] | 0) | 0, 1 & (a = o[i >> 2]) | 0 && (r = (16 + (-4 & n | 0) | 0) + (-4 & a | 0) | 0) >>> 0 < 1073741808 && (m(t, i), n = r | 3 & n | 0, o[e >> 2] = n, i = (e + 16 | 0) + (-4 & o[e >> 2] | 0) | 0, a = o[i >> 2]), 2 & n | 0 && (r = o[(e - 4 | 0) >> 2], 1 & (s = o[r >> 2]) | 0 || (d(0, 24, 228, 15), f()), (u = (16 + (-4 & s | 0) | 0) + (-4 & n | 0) | 0) >>> 0 < 1073741808 && (m(t, r), n = 3 & s | 0 | u | 0, o[r >> 2] = n, e = r)), o[i >> 2] = 2 | a, (n = (r = -4 & n | 0) >>> 0 >= 16 ? r >>> 0 < 1073741808 : 0) || (d(0, 24, 243, 13), f()), (0 | r + (e + 16 | 0)) != (0 | i) && (d(0, 24, 244, 13), f()), o[(i - 4 | 0) >> 2] = e, r >>> 0 < 256 ? (i = r >>> 4 | 0, r = 0) : (i = 16 ^ ((n = r) >>> ((r = 31 - l(r) | 0) - 4 | 0) | 0) | 0, r = r - 7 | 0), (n = r >>> 0 < 23 ? i >>> 0 < 16 : 0) || (d(0, 24, 260, 13), f()), n = o[(96 + ((((r << 4 | 0) + i | 0) << 2 | 0) + t | 0) | 0) >> 2], o[(e + 16 | 0) >> 2] = 0, o[(e + 20 | 0) >> 2] = n, n && (o[(n + 16 | 0) >> 2] = e), o[(96 + ((((r << 4 | 0) + i | 0) << 2 | 0) + t | 0) | 0) >> 2] = e, o[t >> 2] = o[t >> 2] | 1 << r | 0, e = o[(4 + (t = (r << 2 | 0) + t | 0) | 0) >> 2] | 1 << i | 0, o[(t + 4 | 0) >> 2] = e
    }

    function E(t, e, r) {
        var n, i = 0;
        (!(e >>> 0 <= r >>> 0) || 15 & e | 0 || 15 & r | 0) && (d(0, 24, 386, 4), f()), (n = o[(t + 1568 | 0) >> 2]) ? (e >>> 0 < (n + 16 | 0) >>> 0 && (d(0, 24, 396, 15), f()), (0 | e - 16) == (0 | n) && (i = o[n >> 2], e = e - 16 | 0)) : e >>> 0 < (t + 1572 | 0) >>> 0 && (d(0, 24, 408, 4), f()), (r = r - e | 0) >>> 0 < 48 || (o[e >> 2] = 1 | 2 & i | r - 32 | 0, o[(e + 16 | 0) >> 2] = 0, o[(e + 20 | 0) >> 2] = 0, o[(r = (e + r | 0) - 16 | 0) >> 2] = 2, o[(t + 1568 | 0) >> 2] = r, b(t, e))
    }

    function w(t) {
        return t >>> 0 >= 1073741808 && (d(72, 24, 457, 29), f()), (t = -16 & (t + 15 | 0) | 0) >>> 0 > 16 ? t : 16
    }

    function T(t, e) {
        var r = 0;
        return e >>> 0 < 256 ? (e = e >>> 4 | 0, r = 0) : (e = 16 ^ ((e = e >>> 0 < 536870904 ? ((1 << (27 - l(e) | 0) | 0) + e | 0) - 1 | 0 : e) >>> ((r = 31 - l(e) | 0) - 4 | 0) | 0) | 0, r = r - 7 | 0), (r >>> 0 < 23 ? e >>> 0 < 16 : 0) || (d(0, 24, 338, 13), f()), (e = o[(4 + ((r << 2 | 0) + t | 0) | 0) >> 2] & (-1 << e | 0) | 0) ? t = o[(96 + (((at(e) + (r << 4 | 0) | 0) << 2 | 0) + t | 0) | 0) >> 2] : (e = o[t >> 2] & (-1 << (r + 1 | 0) | 0) | 0) ? (r = at(e), (e = o[(4 + ((r << 2 | 0) + t | 0) | 0) >> 2]) || (d(0, 24, 351, 17), f()), t = o[(96 + (((at(e) + (r << 4 | 0) | 0) << 2 | 0) + t | 0) | 0) >> 2]) : t = 0, t
    }

    function S(t, e, r) {
        var n, i;
        n = o[e >> 2], 15 & r | 0 && (d(0, 24, 365, 13), f()), (i = (-4 & n | 0) - r | 0) >>> 0 >= 32 ? (o[e >> 2] = 2 & n | 0 | r | 0, o[(e = (e + 16 | 0) + r | 0) >> 2] = 1 | i - 16, b(t, e)) : (o[e >> 2] = -2 & n | 0, r = o[((t = e + 16 | 0) + (-4 & o[e >> 2] | 0) | 0) >> 2], o[((-4 & o[e >> 2] | 0) + t | 0) >> 2] = -3 & r | 0)
    }

    function C(t, e) {
        var r, n = 0;
        return (n = T(t, r = w(e))) || (function(t, e) {
            var r, n = 0;
            n = (r = ut()) << 16 | 0, (0 | st(0 | ((n = (0 | r) > (0 | (e = (-65536 & (65535 + ((16 << ((0 | o[(t + 1568 | 0) >> 2]) != (0 | n - 16)) | 0) + (e >>> 0 < 536870904 ? ((1 << (27 - l(e) | 0) | 0) - 1 | 0) + e | 0 : e) | 0) | 0) | 0) >>> 16 | 0))) ? r : e))) < 0 && (0 | st(0 | e)) < 0 && f(), E(t, r << 16 | 0, ut() << 16 | 0)
        }(t, r), (n = T(t, r)) || (d(0, 24, 487, 15), f())), (-4 & o[n >> 2] | 0) >>> 0 < r >>> 0 && (d(0, 24, 489, 13), f()), o[(n + 4 | 0) >> 2] = 0, o[(n + 12 | 0) >> 2] = e, m(t, n), S(t, n, r), n
    }

    function k(t, e) {
        t |= 0, e |= 0;
        var r = 0;
        return (r = h) || (function() {
            var t = 0,
                e = 0;
            for ((t = 1 > (0 | (t = ut())) ? (0 | st(0 | 1 - t)) < 0 : 0) && f(), o[868] = 0, o[1260] = 0, t = 0; t >>> 0 < 23;) {
                for (o[(4 + (3472 + (t << 2 | 0) | 0) | 0) >> 2] = 0, e = 0; e >>> 0 < 16;) o[(96 + (3472 + (((t << 4 | 0) + e | 0) << 2 | 0) | 0) | 0) >> 2] = 0, e = e + 1 | 0;
                t = t + 1 | 0
            }
            E(3472, 5056, ut() << 16 | 0), h = 3472
        }(), r = h), t = C(r, t), o[(t + 8 | 0) >> 2] = e, 0 | t + 16
    }

    function x(t) {
        return (t |= 0) >>> 0 > 3468 && function(t) {
            var e;
            (0 | -268435456 & (e = o[(t + 4 | 0) >> 2])) != (0 | -268435456 & (e + 1 | 0)) && (d(0, 128, 104, 2), f()), o[(t + 4 | 0) >> 2] = e + 1 | 0, 1 & o[t >> 2] | 0 && (d(0, 128, 107, 13), f())
        }(t - 16 | 0), 0 | t
    }

    function _(t, e) {
        var r;
        1 & (r = o[e >> 2]) | 0 && (d(0, 24, 546, 2), f()), o[e >> 2] = 1 | r, b(t, e)
    }

    function I(t, e, r) {
        var i = 0,
            s = 0,
            u = 0;
        i = r;
        t: if ((0 | t) != (0 | e))
            if (t >>> 0 < e >>> 0) {
                if ((0 | 7 & e) == (0 | 7 & t)) {
                    for (; 7 & t | 0;) {
                        if (!i) break t;
                        i = i - 1 | 0, r = t, t = t + 1 | 0, s = e, e = e + 1 | 0, n[r >> 0] = a[s >> 0]
                    }
                    for (; i >>> 0 >= 8;) r = o[(e + 4 | 0) >> 2], o[t >> 2] = o[e >> 2], o[(t + 4 | 0) >> 2] = r, i = i - 8 | 0, t = t + 8 | 0, e = e + 8 | 0
                }
                for (; i;) r = t, t = t + 1 | 0, s = e, e = e + 1 | 0, n[r >> 0] = a[s >> 0], i = i - 1 | 0
            } else {
                if ((0 | 7 & e) == (0 | 7 & t)) {
                    for (; 7 & (t + i | 0) | 0;) {
                        if (!i) break t;
                        r = (i = i - 1 | 0) + e | 0, n[(t + i | 0) >> 0] = a[r >> 0]
                    }
                    for (; i >>> 0 >= 8;) s = o[(4 + (r = (i = i - 8 | 0) + e | 0) | 0) >> 2], o[(u = t + i | 0) >> 2] = o[r >> 2], o[(u + 4 | 0) >> 2] = s
                }
                for (; i;) r = (i = i - 1 | 0) + e | 0, n[(t + i | 0) >> 0] = a[r >> 0]
            }
    }

    function O() {
        var t, e, r = 0,
            n = 0;
        I(r = k(n = (n = (r = (e = p - (t = A) | 0) << 1 | 0) >>> 0 > 256) ? r : 256, 0), t, e), t && function(t) {
            h || (d(0, 24, 576, 13), f()), (!t || 15 & t | 0) && (d(0, 24, 577, 2), f()), _(h, t - 16 | 0)
        }(t), A = r, p = r + e | 0, g = r + n | 0
    }

    function R(t) {
        var e, r;
        r = 268435455 & (e = o[(t + 4 | 0) >> 2]) | 0, 1 & o[t >> 2] | 0 && (d(0, 128, 115, 13), f()), 1 == (0 | r) ? (ot(t + 16 | 0, 1), -2147483648 & e | 0 ? o[(t + 4 | 0) >> 2] = -2147483648 : _(h, t)) : (r >>> 0 <= 0 && (d(0, 128, 124, 15), f()), 16 & function(t) {
            return t >>> 0 > o[854] >>> 0 && (d(176, 232, 22, 27), f()), o[(3420 + (t << 3 | 0) | 0) >> 2]
        }(o[(t + 8 | 0) >> 2]) | 0 ? o[(t + 4 | 0) >> 2] = r - 1 | 0 | -268435456 & e | 0 : (o[(t + 4 | 0) >> 2] = r - 1 | 0 | -1342177280 | 0, -2147483648 & e | 0 || function(t) {
            var e = 0;
            (e = p) >>> 0 >= g >>> 0 && (O(), e = p), o[e >> 2] = t, p = e + 4 | 0
        }(t)))
    }

    function P(t) {
        (t |= 0) >>> 0 > 3468 && R(t - 16 | 0)
    }

    function B(t) {
        var e;
        268435456 != (0 | 1879048192 & (e = o[(t + 4 | 0) >> 2])) && (o[(t + 4 | 0) >> 2] = 268435456 | -1879048193 & e, ot(t + 16 | 0, 2))
    }

    function D(t) {
        o[(t + 4 | 0) >> 2] = -1879048193 & o[(t + 4 | 0) >> 2] | 0, ot(t + 16 | 0, 4)
    }

    function L(t) {
        var e;
        268435456 == (0 | 1879048192 & (e = o[(t + 4 | 0) >> 2])) && ((268435455 & e | 0) >>> 0 > 0 ? D(t) : (o[(t + 4 | 0) >> 2] = 536870912 | -1879048193 & e, ot(t + 16 | 0, 3)))
    }

    function M(t) {
        var e;
        536870912 == (0 | 1879048192 & (e = o[(t + 4 | 0) >> 2])) && !(-2147483648 & e | 0) && (o[(t + 4 | 0) >> 2] = -1879048193 & e | 0, ot(t + 16 | 0, 5), _(h, t))
    }

    function N(t, e, r, n) {
        var i, a, s;
        return a = r = k(16, r), s = x(i = k(e = t << e | 0, 0)), o[a >> 2] = s, o[(r + 4 | 0) >> 2] = i, o[(r + 8 | 0) >> 2] = e, o[(r + 12 | 0) >> 2] = t, n && I(i, n, e), r
    }

    function F(t, e) {
        var result= e >>> 0 >= o[(t + 8 | 0) >> 2] >>> 0;
        console.log(t, e);
        // return result;
        return a[(o[(t + 4 | 0) >> 2] + e | 0) >> 0];
    }

    function U(t, e) {
        return h || (d(0, 24, 568, 13), f()), (!t || 15 & t | 0) && (d(0, 24, 569, 2), f()),
            function(t, e, r) {
                var n, i, a = 0,
                    s = 0;
                return a = w(r), (s = 1 & (n = o[e >> 2]) | 0 ? 0 : !(-268435456 & o[(e + 4 | 0) >> 2] | 0)) || (d(0, 24, 504, 4), f()), a >>> 0 <= (-4 & n | 0) >>> 0 ? (S(t, e, a), o[(e + 12 | 0) >> 2] = r, e) : (i = (e + 16 | 0) + (-4 & o[e >> 2] | 0) | 0, 1 & (s = o[i >> 2]) | 0 && (s = (16 + (-4 & n | 0) | 0) + (-4 & s | 0) | 0) >>> 0 >= a >>> 0 ? (m(t, i), o[e >> 2] = s | 3 & n | 0, o[(e + 12 | 0) >> 2] = r, S(t, e, a), e) : (a = C(t, r), o[(a + 8 | 0) >> 2] = o[(e + 8 | 0) >> 2], I(a + 16 | 0, e + 16 | 0, r), o[e >> 2] = 1 | n, b(t, e), a))
            }(h, t - 16 | 0, e) + 16 | 0
    }

    function Q(t, e) {
        var r = 0;
        if (e && (n[t >> 0] = 0, n[((t + e | 0) - 1 | 0) >> 0] = 0, !(e >>> 0 <= 2 || (n[(t + 1 | 0) >> 0] = 0, n[(t + 2 | 0) >> 0] = 0, n[((r = t + e | 0) - 2 | 0) >> 0] = 0, n[(r - 3 | 0) >> 0] = 0, e >>> 0 <= 6 || (n[(t + 3 | 0) >> 0] = 0, n[((t + e | 0) - 4 | 0) >> 0] = 0, e >>> 0 <= 8 || (r = (r = e) - (e = 3 & (0 - t | 0) | 0) | 0, o[(t = t + e | 0) >> 2] = 0, o[(((e = -4 & r | 0) + t | 0) - 4 | 0) >> 2] = 0, e >>> 0 <= 8 || (o[(t + 4 | 0) >> 2] = 0, o[(t + 8 | 0) >> 2] = 0, o[((r = t + e | 0) - 12 | 0) >> 2] = 0, o[(r - 8 | 0) >> 2] = 0, e >>> 0 <= 24)))))))
            for (o[(t + 12 | 0) >> 2] = 0, o[(t + 16 | 0) >> 2] = 0, o[(t + 20 | 0) >> 2] = 0, o[(t + 24 | 0) >> 2] = 0, o[((r = t + e | 0) - 28 | 0) >> 2] = 0, o[(r - 24 | 0) >> 2] = 0, o[(r - 20 | 0) >> 2] = 0, o[(r - 16 | 0) >> 2] = 0, t = (r = 24 + (4 & t | 0) | 0) + t | 0, e = e - r | 0; e >>> 0 >= 32;) o[t >> 2] = 0, o[(t + 4 | 0) >> 2] = 0, o[(r = t + 8 | 0) >> 2] = 0, o[(r + 4 | 0) >> 2] = 0, o[(r = t + 16 | 0) >> 2] = 0, o[(r + 4 | 0) >> 2] = 0, o[(r = t + 24 | 0) >> 2] = 0, o[(r + 4 | 0) >> 2] = 0, e = e - 32 | 0, t = t + 32 | 0
    }

    function j(t, e, r) {
        var n, i = 0,
            a = 0,
            s = 0;
        e >>> 0 > ((n = o[(t + 8 | 0) >> 2]) >>> r | 0) >>> 0 && (e >>> 0 > (1073741808 >>> r | 0) >>> 0 && (d(2864, 2816, 14, 47), f()), Q((e = U(i = o[t >> 2], r = e << r | 0)) + n | 0, r - n | 0), (0 | e) != (0 | i) && (a = t, s = x(e), o[a >> 2] = s, o[(t + 4 | 0) >> 2] = e), o[(t + 8 | 0) >> 2] = r)
    }

    function H(t, e, r) {
        var i;
        i = o[(t + 12 | 0) >> 2], j(t, e + 1 | 0, 0), n[(o[(t + 4 | 0) >> 2] + e | 0) >> 0] = r, (0 | e) >= (0 | i) && (o[(t + 12 | 0) >> 2] = e + 1 | 0)
    }

    function G(t) {
        return o[(12 + (t - 16 | 0) | 0) >> 2] >>> 1 | 0
    }

    function V(t, e) {
        return e >>> 0 >= G(t) >>> 0 ? -1 : s[((e << 1 | 0) + t | 0) >> 1]
    }

    function Y(t, e) {
        return e >>> 0 >= (o[(t + 8 | 0) >> 2] >>> 2 | 0) >>> 0 && (d(176, 2816, 109, 61), f()), o[(o[(t + 4 | 0) >> 2] + (e << 2 | 0) | 0) >> 2]
    }

    function W(t) {
        var e = 0;
        t: switch (0 | y - 1) {
            default:
                f();
            case 0:
                e = -1;
            case 1:
        }
        return function(t, e) {
            var r, n;
            return r = k(2 << (n = (0 | e) > 0) | 0, 1), i[r >> 1] = t, n && (i[(r + 2 | 0) >> 1] = e), x(r)
        }(t, e)
    }

    function z(t, e) {
        var r;
        return x(t), x(e), r = function(t, e) {
            var r, n, i = 0;
            return x(e), e || (3232 != (0 | e) && (x(3232), P(e)), e = 3232), (i = (r = G(t) << 1 | 0) + (n = G(e) << 1 | 0) | 0) ? (I(i = x(k(i, 1)), t, r), I(i + r | 0, e, n), P(e), i) : (t = x(3216), P(e), t)
        }(t || 3232, e), P(t), P(e), r
    }

    function K(t) {
        var e, r = 0,
            n = 0,
            i = 0,
            o = 0,
            a = 0,
            s = 0,
            u = 0,
            l = 0,
            c = 0;
        x(t), n = x(3216), e = G(t);
        t: for (;;) {
            if (!((0 | i) >= (0 | e))) {
                for (; o = Y(800, 255 & V(t, i) | 0), (r = (0 | (i = i + 1 | 0)) < (0 | e)) && (r = -1 == (0 | o)), r;);
                if (-1 != (0 | o)) {
                    for (; a = Y(800, 255 & V(t, i) | 0), (r = (0 | (i = i + 1 | 0)) < (0 | e)) && (r = -1 == (0 | a)), r;);
                    if (-1 != (0 | a)) {
                        y = 1, (0 | n) != (0 | (r = o = z(n, u = W(o << 2 | 0 | (48 & a | 0) >> 4 | 0)))) && (x(r), P(n)), n = r;
                        e: for (;;) {
                            if (i = (r = i) + 1 | 0, 61 == (0 | (r = 255 & V(t, r) | 0))) return P(t), P(u), P(o), n;
                            if (s = Y(800, r), (r = (0 | i) < (0 | e)) && (r = -1 == (0 | s)), !r) break e
                        }
                        if (-1 != (0 | s)) {
                            y = 1, (0 | n) != (0 | (r = a = z(n, c = W((15 & a | 0) << 4 | 0 | (60 & s | 0) >> 2 | 0)))) && (x(r), P(n)), n = r;
                            e: for (;;) {
                                if (i = (r = i) + 1 | 0, 61 == (0 | (r = 255 & V(t, r) | 0))) return P(t), P(u), P(o), P(c), P(a), n;
                                if (l = Y(800, r), (r = (0 | i) < (0 | e)) && (r = -1 == (0 | l)), !r) break e
                            }
                            if (-1 != (0 | l)) {
                                y = 1, (0 | (n = l = z(r = n, s = W(l | (3 & s | 0) << 6 | 0)))) != (0 | r) && (x(n), P(r)), P(u), P(o), P(c), P(a), P(s), P(l);
                                continue t
                            }
                            P(u), P(o), P(c), P(a)
                        } else P(u), P(o)
                    }
                }
            }
            break t
        }
        return P(t), n
    }

    function X(t, e, r) {
        var n = 0,
            i = 0;
        for (x(t), x(3216), e = (e << 1 | 0) + t | 0, n = 3216; r && !(i = s[e >> 1] - s[n >> 1] | 0);) r = r - 1 | 0, e = e + 2 | 0, n = n + 2 | 0;
        return P(t), P(3216), i
    }

    function q(t, e) {
        var r, n = 0;
        if (x(3216), !(r = G(3216))) return P(3216), 0;
        if (!(n = G(t))) return P(3216), -1;
        e = (0 | (e = (0 | e) > 0 ? e : 0)) < (0 | n) ? e : n, n = n - r | 0;
        t: for (;;) {
            if ((0 | e) <= (0 | n)) {
                if (X(t, e, r)) {
                    e = e + 1 | 0;
                    continue t
                }
                return P(3216), e
            }
            break t
        }
        return P(3216), -1
    }

    function J(t, e) {
        var r, n, i, a;
        x(e), j(t, n = (r = o[(t + 12 | 0) >> 2]) + 1 | 0, 2), i = o[(t + 4 | 0) >> 2] + (r << 2 | 0) | 0, a = x(e), o[i >> 2] = a, o[(t + 12 | 0) >> 2] = n, P(e)
    }

    function $(t) {
        var e = 0,
            r = 0,
            n = 0,
            a = 0,
            u = 0,
            l = 0,
            c = 0,
            f = 0;
        x(3216);
        t: {
            e = G(t);e: {
                r: {
                    if (!(l = G(3216))) {
                        if (!e) break r;
                        for (a = N(e = (0 | e) < 2147483647 ? e : 2147483647, 2, 5, 0), l = o[(a + 4 | 0) >> 2];
                            (0 | r) < (0 | e);) n = k(2, 1), i[n >> 1] = s[((r << 1 | 0) + t | 0) >> 1], o[(l + (r << 2 | 0) | 0) >> 2] = n, x(n), r = r + 1 | 0;
                        t = x(a);
                        break e
                    }
                    if (!e) {
                        t = N(1, 2, 5, 0), o[o[(t + 4 | 0) >> 2] >> 2] = 3216, t = x(t);
                        break e
                    }
                    for (r = x(N(0, 2, 5, 0)); - 1 ^ (a = q(t, n)) | 0;) {
                        if ((0 | (u = a - n | 0)) > 0 ? (I(c = k(u = u << 1 | 0, 1), (n << 1 | 0) + t | 0, u), J(r, c)) : J(r, 3216), 2147483647 == (0 | (f = f + 1 | 0))) break t;
                        n = a + l | 0
                    }
                    if (!n) {
                        J(r, t);
                        break t
                    }(0 | (e = e - n | 0)) > 0 ? (I(a = k(e = e << 1 | 0, 1), (n << 1 | 0) + t | 0, e), J(r, a)) : J(r, 3216);
                    break t
                }
                t = x(N(0, 2, 5, 0))
            }
            return P(3216),
            t
        }
        return P(3216), r
    }

    function Z(t, e) {
        return e >>> 0 >= o[(t + 12 | 0) >> 2] >>> 0 && (d(3272, 2816, 106, 45), f()), e >>> 0 >= (o[(t + 8 | 0) >> 2] >>> 2 | 0) >>> 0 && (d(176, 2816, 109, 61), f()), x(o[(o[(t + 4 | 0) >> 2] + (e << 2 | 0) | 0) >> 2])
    }

    function tt(t, e, r) {
        var n = 0,
            i = 0,
            o = 0;
        for (x(e), x(r);
            (0 | i) < 4;) {
            for (n = 0;
                (0 | n) < 4;) H(e, o = (i << 2 | 0) + n | 0, F(e, o) ^ F(r, o + (t << 4 | 0) | 0) | 0), n = n + 1 | 0;
            i = i + 1 | 0
        }
        P(e), P(r)
    }

    function et(t, e) {
        var r = 0,
            n = 0,
            i = 0,
            o = 0,
            a = 0,
            s = 0,
            u = 0,
            l = 0,
            c = 0,
            f = 0,
            d = 0;
        for (x(t), x(e), tt(10, t, e), i = 9;
            (0 | i) > 0;) {
            for (n = F(r = x(t), 1), H(r, 1, F(r, 13)), H(r, 13, F(r, 9)), H(r, 9, F(r, 5)), H(r, 5, n), n = F(r, 2), H(r, 2, F(r, 10)), H(r, 10, n), n = F(r, 6), H(r, 6, F(r, 14)), H(r, 14, n), n = F(r, 3), H(r, 3, F(r, 7)), H(r, 7, F(r, 11)), H(r, 11, F(r, 15)), H(r, 15, n), P(r), o = x(t), r = 0;
                (0 | r) < 4;) {
                for (n = 0;
                    (0 | n) < 4;) H(o, a = (r << 2 | 0) + n | 0, s = F(1408, F(o, a))), n = n + 1 | 0;
                r = r + 1 | 0
            }
            for (P(o), tt(i, t, e), r = x(t), n = 0;
                (0 | n) < 4;) a = F(r, o = n << 2 | 0), s = F(r, c = o + 1 | 0), u = F(r, f = o + 2 | 0), l = F(r, d = o + 3 | 0), H(r, o, ((F(2688, a) ^ F(2080, s) | 0) ^ F(2384, u) | 0) ^ F(1776, l) | 0), H(r, c, ((F(1776, a) ^ F(2688, s) | 0) ^ F(2080, u) | 0) ^ F(2384, l) | 0), H(r, f, ((F(2384, a) ^ F(1776, s) | 0) ^ F(2688, u) | 0) ^ F(2080, l) | 0), H(r, d, ((F(2080, a) ^ F(2384, s) | 0) ^ F(1776, u) | 0) ^ F(2688, l) | 0), n = n + 1 | 0;
            P(r), i = i - 1 | 0
        }
        for (i = F(r = x(t), 1), H(r, 1, F(r, 13)), H(r, 13, F(r, 9)), H(r, 9, F(r, 5)), H(r, 5, i), i = F(r, 2), H(r, 2, F(r, 10)), H(r, 10, i), i = F(r, 6), H(r, 6, F(r, 14)), H(r, 14, i), i = F(r, 3), H(r, 3, F(r, 7)), H(r, 7, F(r, 11)), H(r, 11, F(r, 15)), H(r, 15, i), P(r), n = x(t), r = 0;
            (0 | r) < 4;) {
            for (i = 0;
                (0 | i) < 4;) H(n, o = (r << 2 | 0) + i | 0, a = F(1408, F(n, o))), i = i + 1 | 0;
            r = r + 1 | 0
        }
        P(n), tt(0, t, e), P(t), P(e)
    }

    function rt(t, e, r) {
        var n;
        n = o[(t + 12 | 0) >> 2], j(t, e + 1 | 0, 2), o[(o[(t + 4 | 0) >> 2] + (e << 2 | 0) | 0) >> 2] = r, (0 | e) >= (0 | n) && (o[(t + 12 | 0) >> 2] = e + 1 | 0)
    }

    function nt() {
        var t;
        return t = x(N(256, 2, 3, 0)), o[(t + 12 | 0) >> 2] = 0, Q(o[(t + 4 | 0) >> 2], o[(t + 8 | 0) >> 2]), t
    }

    function it(t, e) {
        if (!(t >>> 0 < 3468)) {
            t = t - 16 | 0;
            t: {
                e: {
                    r: {
                        n: {
                            i: {
                                o: {
                                    if (1 != (0 | e)) {
                                        if (2 == (0 | e)) break o;
                                        a: switch (0 | e - 3) {
                                            case 0:
                                                break i;
                                            case 1:
                                                break n;
                                            case 2:
                                                break r
                                        }
                                        break e
                                    }
                                    R(t);
                                    break t
                                }(268435455 & o[(t + 4 | 0) >> 2] | 0) >>> 0 <= 0 && (d(0, 128, 75, 17), f()),
                                o[(t + 4 | 0) >> 2] = o[(t + 4 | 0) >> 2] - 1 | 0,
                                B(t);
                                break t
                            }
                            L(t);
                            break t
                        }(0 | -268435456 & (e = o[(t + 4 | 0) >> 2])) != (0 | -268435456 & (e + 1 | 0)) && (d(0, 128, 86, 6), f()),
                        o[(t + 4 | 0) >> 2] = e + 1 | 0,
                        1879048192 & e | 0 && D(t);
                        break t
                    }
                    M(t);
                    break t
                }
                d(0, 128, 97, 24),
                f()
            }
        }
    }

    function ot(t, e) {
        t: {
            e: switch (0 | o[(t - 8 | 0) >> 2]) {
                case 0:
                case 1:
                    return;
                case 5:
                    ! function(t, e) {
                        var r = 0,
                            n = 0;
                        for (t = (r = o[(t + 4 | 0) >> 2]) + (o[(t + 12 | 0) >> 2] << 2 | 0) | 0; r >>> 0 < t >>> 0;)(n = o[r >> 2]) && it(n, e), r = r + 4 | 0
                    }(t, e);
                    break t;
                case 2:
                case 3:
                case 4:
                    break t
            }
            f()
        }(t = o[t >> 2]) && it(t, e)
    }

    function at(t) {
        return t ? 31 - l((t + -1 | 0) ^ t | 0) | 0 : 32
    }

    function st(e) {
        e |= 0;
        var l = 0 | ut(),
            c = l + e | 0;
        if (l < c && c < 65536) {
            var f = new ArrayBuffer(u(c, 65536)),
                d = new t.Int8Array(f);
            d.set(n), n = d, n = new t.Int8Array(f), i = new t.Int16Array(f), o = new t.Int32Array(f), a = new t.Uint8Array(f), s = new t.Uint16Array(f), new t.Uint32Array(f), new t.Float32Array(f), new t.Float64Array(f), r = f
        }
        return l
    }

    function ut() {
        return r.byteLength / 65536 | 0
    }
    return v = function() {
        var t, e, r, n, i = 0,
            o = 0,
            a = 0;
        for (x(2752), r = x(N(0, 0, 4, 2784)), e = x(r), n = x(N(0, 0, 4, 2800)), t = x(n);
            (0 | a) < 4;) H(e, i = a << 2 | 0, o = F(2752, i)), H(e, o = i + 1 | 0, F(2752, o)), H(e, o = i + 2 | 0, F(2752, o)), H(e, i = i + 3 | 0, o = F(2752, i)), a = a + 1 | 0;
        for (a = 4;
            (0 | a) < 44;) H(t, 0, F(e, i = (a - 1 | 0) << 2 | 0)), H(t, 1, F(e, i + 1 | 0)), H(t, 2, F(e, i + 2 | 0)), H(t, 3, F(e, i + 3 | 0)), (0 | a) % 4 | 0 || (i = F(t, 0), H(t, 0, F(t, 1)), H(t, 1, F(t, 2)), H(t, 2, F(t, 3)), H(t, 3, i), H(t, 0, F(1104, F(t, 0))), H(t, 1, F(1104, F(t, 1))), H(t, 2, F(1104, F(t, 2))), H(t, 3, F(1104, F(t, 3))), H(t, 0, F(t, 0) ^ F(1472, (0 | a) / 4 | 0) | 0)), H(e, i = a << 2 | 0, F(e, o = (a - 4 | 0) << 2 | 0) ^ F(t, 0) | 0), H(e, i + 1 | 0, F(e, o + 1 | 0) ^ F(t, 1) | 0), H(e, i + 2 | 0, F(e, o + 2 | 0) ^ F(t, 2) | 0), H(e, i + 3 | 0, F(e, o + 3 | 0) ^ F(t, 3) | 0), a = a + 1 | 0;
        return P(r), P(n), P(t), P(2752), e
    }(), {
        memory: Object.create(Object.prototype, {
            grow: {
                value: st
            },
            buffer: {
                get: function() {
                    return r
                }
            }
        }),
        __alloc: k,
        __retain: x,
        __release: P,
        __collect: function() {
            var t, e = 0,
                r = 0,
                n = 0,
                i = 0,
                a = 0;
            for (a = n = t = A, e = p; a >>> 0 < e >>> 0;) i = o[a >> 2], 805306368 == (0 | 1879048192 & (r = o[(i + 4 | 0) >> 2])) && (268435455 & r | 0) >>> 0 > 0 ? (B(i), o[n >> 2] = i, n = n + 4 | 0) : 1879048192 & r | 0 || 268435455 & r | 0 ? o[(i + 4 | 0) >> 2] = 2147483647 & r | 0 : _(h, i), a = a + 4 | 0;
            for (p = n, e = t; e >>> 0 < n >>> 0;) L(o[e >> 2]), e = e + 4 | 0;
            for (e = t; e >>> 0 < n >>> 0;) r = o[e >> 2], i = 2147483647 & o[(r + 4 | 0) >> 2] | 0, o[(r + 4 | 0) >> 2] = i, M(r), e = e + 4 | 0;
            p = t
        },
        getFileName: function(t) {
            var e, r, n, i, a, s, u = 0,
                l = 0,
                f = 0,
                d = 0,
                h = 0;
            for (x(t |= 0), n = $(i = K(t)), a = x(N(0, 0, 4, 3256)), e = x(a), f = o[(n + 12 | 0) >> 2];
                (0 | l) < (0 | f);) H(e, l, V(u = Z(n, l), 0)), l = l + 1 | 0, P(u);
            for (s = x(N(0, 0, 4, 3384)), r = x(s), d = ~~c(+(0 | (0 | f) / 16)), l = 0;
                (0 | l) < (0 | d);) {
                for (u = 0;
                    (0 | u) < 16;) H(r, u, F(e, (l << 4 | 0) + u | 0)), u = u + 1 | 0;
                for (x(r), et(r, v), P(r), u = 0;
                    (0 | u) < 16;) H(e, (l << 4 | 0) + u | 0, F(r, u)), u = u + 1 | 0;
                l = l + 1 | 0
            }
            for (l = x(3216), u = f - 1 | 0;
                (0 | u) > -1;) 14 != (0 | F(e, u)) && (y = 1, f = l, (0 | (l = h = z(d = W(F(e, u)), l))) != (0 | f) && (x(l), P(f)), P(d), P(h)), u = u - 1 | 0;
            return P(i), P(n), P(a), P(e), P(s), P(r), P(t), 0 | l
        },
        getFileParams: function(t) {
            var e, r, n, i, a, s = 0,
                u = 0,
                l = 0,
                c = 0,
                f = 0;
            for (x(t |= 0), r = $(n = K(t)), i = x(N(0, 2, 3, 3400)), e = x(i), a = o[(r + 12 | 0) >> 2];
                (0 | u) < (0 | a);) rt(e, u, V(s = Z(r, u), 0)), u = u + 1 | 0, P(s);
            for (s = o[(r + 12 | 0) >> 2], x(e), l = function() {
                    var t, e, r = 0,
                        n = 0,
                        i = 0;
                    for (x(2992), x(3184), t = x(N(0, 2, 3, 3416)), e = x(t);
                        (0 | i) < (0 | o[751]);) {
                        (n = (0 | (r = Y(2992, i))) >= 97) && (n = (0 | r) <= 122), n = n ? r - 97 | 0 : r + -22 | 0, r = 0;
                        t: {
                            e: for (;;) {
                                if (36 <= (0 | r)) break t;
                                if ((0 | Y(3184, r)) == (0 | n)) break e;
                                r = r + 1 | 0
                            }
                            n = r
                        }
                        rt(e, i, (0 | n) > 25 ? n + 22 | 0 : n + 97 | 0), i = i + 1 | 0
                    }
                    return P(t), P(2992), P(3184), e
                }(), function(t, e, r) {
                    var n, i = 0,
                        a = 0,
                        s = 0,
                        u = 0,
                        l = 0,
                        c = 0;
                    for (x(t), x(e), u = x(e), n = nt(), s = nt(), a = o[(u + 12 | 0) >> 2];
                        (0 | i) < 256;) rt(n, i, i), rt(s, i, Y(u, (0 | i) % (0 | a) | 0)), i = i + 1 | 0;
                    for (i = 0, a = 0;
                        (0 | i) < 256;) a = (Y(n, i) + a | 0) + Y(s, i) | 0, l = Y(n, i), rt(n, i, Y(n, a = (0 | a) % 256 | 0)), rt(n, a, l), i = i + 1 | 0;
                    for (P(u), P(s), l = x(t), i = x(n), a = 0, s = 0, u = 0;
                        (0 | u) < (0 | r);) s = Y(i, a = (0 | a + 1) % 256 | 0) + s | 0, c = Y(i, a), rt(i, a, Y(i, s = (0 | s) % 256 | 0)), rt(i, s, c), c = (0 | Y(i, a) + Y(i, s)) % 256 | 0, rt(l, u, Y(l, u) ^ Y(i, c) | 0), u = u + 1 | 0;
                    P(i), P(l), P(n), P(t), P(e)
                }(e, l, s), P(l), P(e), s = x(3216), u = 0;
                (0 | u) < (0 | a);) y = 1, l = s, (0 | (s = f = z(s, c = W(Y(e, u))))) != (0 | l) && (x(s), P(l)), u = u + 1 | 0, P(c), P(f);
            return P(n), P(r), P(i), P(e), P(t), 0 | s
        },
        __rtti_base: 3416
    }
};
It = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", Ot = /^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/, "function" == typeof Rt.atob || (Rt.atob = function(t) {
    if (t = String(t).replace(/[\t\n\f\r ]+/g, ""), !Ot.test(t)) throw new TypeError("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
    t += "==".slice(2 - (3 & t.length));
    for (var e, r, n, i = "", o = 0; o < t.length;) e = It.indexOf(t.charAt(o++)) << 18 | It.indexOf(t.charAt(o++)) << 12 | (r = It.indexOf(t.charAt(o++))) << 6 | (n = It.indexOf(t.charAt(o++))), i += 64 === r ? String.fromCharCode(e >> 16 & 255) : 64 === n ? String.fromCharCode(e >> 16 & 255, e >> 8 & 255) : String.fromCharCode(e >> 16 & 255, e >> 8 & 255, 255 & e);
    return i
});


function Iu(t, e, r, n) {
    this.tag = t, this.key = r, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = e, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = n, this.effectTag = 0, this.lastEffect = this.firstEffect = this.nextEffect = null, this.childExpirationTime = this.expirationTime = 0, this.alternate = null
}

function Ou(t, e, r, n) {
    return new Iu(t, e, r, n)
}


function Pu(t, e) {
    var r = t.alternate;
    return null === r ? ((r = Ou(t.tag, e, t.key, t.mode)).elementType = t.elementType, r.type = t.type, r.stateNode = t.stateNode, r.alternate = t, t.alternate = r) : (r.pendingProps = e, r.effectTag = 0, r.nextEffect = null, r.firstEffect = null, r.lastEffect = null), r.childExpirationTime = t.childExpirationTime, r.expirationTime = t.expirationTime, r.child = t.child, r.memoizedProps = t.memoizedProps, r.memoizedState = t.memoizedState, r.updateQueue = t.updateQueue, e = t.dependencies, r.dependencies = null === e ? null : {
        expirationTime: e.expirationTime,
        firstContext: e.firstContext,
        responders: e.responders
    }, r.sibling = t.sibling, r.index = t.index, r.ref = t.ref, r
}

function i(t, e, r) {
    return (t = Pu(t, e)).index = 0, t.sibling = null, t
}


function l(t, e, r, n) {
    return null !== e && e.elementType === r.type ? ((n = i(e, r.props)).ref = Oo(t, e, r), n.return = t, n) : ((n = Bu(r.type, r.key, r.props, null, t.mode, n)).ref = Oo(t, e, r), n.return = t, n)
}

function u(t, e, r) {
    if (!(u.TYPED_ARRAY_SUPPORT || this instanceof u)) return new u(t, e, r);
    if ("number" == typeof t) {
        if ("string" == typeof e) throw new Error("If encoding is specified then the first argument must be a string");
        return f(this, t)
    }
    return l(this, t, e, r)
}
u._augment = function(t) {
    return t.__proto__ = u.prototype, t
}, u.from = function(t, e, r) {
    return l(null, t, e, r)
}, u.TYPED_ARRAY_SUPPORT && (u.prototype.__proto__ = Uint8Array.prototype, u.__proto__ = Uint8Array, "undefined" != typeof Symbol && Symbol.species && u[Symbol.species] === u && Object.defineProperty(u, Symbol.species, {
    value: null,
    configurable: !0
})), u.alloc = function(t, e, r) {
    return function(t, e, r, n) {
        return c(e), e <= 0 ? s(t, e) : void 0 !== r ? "string" == typeof n ? s(t, e).fill(r, n) : s(t, e).fill(r) : s(t, e)
    }(null, t, e, r)
}, u.allocUnsafe = function(t) {
    return f(null, t)
}, u.allocUnsafeSlow = function(t) {
    return f(null, t)
}, u.isBuffer = function(t) {
    return !(null == t || !t._isBuffer)
}, u.compare = function(t, e) {
    if (!u.isBuffer(t) || !u.isBuffer(e)) throw new TypeError("Arguments must be Buffers");
    if (t === e) return 0;
    for (var r = t.length, n = e.length, i = 0, o = Math.min(r, n); i < o; ++i)
        if (t[i] !== e[i]) {
            r = t[i], n = e[i];
            break
        } return r < n ? -1 : n < r ? 1 : 0
}, u.isEncoding = function(t) {
    switch (String(t).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
            return !0;
        default:
            return !1
    }
}, u.concat = function(t, e) {
    if (!o(t)) throw new TypeError('"list" argument must be an Array of Buffers');
    if (0 === t.length) return u.alloc(0);
    var r;
    if (void 0 === e)
        for (e = 0, r = 0; r < t.length; ++r) e += t[r].length;
    var n = u.allocUnsafe(e),
        i = 0;
    for (r = 0; r < t.length; ++r) {
        var a = t[r];
        if (!u.isBuffer(a)) throw new TypeError('"list" argument must be an Array of Buffers');
        a.copy(n, i), i += a.length
    }
    return n
},
//  u.byteLength = p,
  u.prototype._isBuffer = !0, u.prototype.swap16 = function() {
    var t = this.length;
    if (t % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
    for (var e = 0; e < t; e += 2) A(this, e, e + 1);
    return this
}, u.prototype.swap32 = function() {
    var t = this.length;
    if (t % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
    for (var e = 0; e < t; e += 4) A(this, e, e + 3), A(this, e + 1, e + 2);
    return this
}, u.prototype.swap64 = function() {
    var t = this.length;
    if (t % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
    for (var e = 0; e < t; e += 8) A(this, e, e + 7), A(this, e + 1, e + 6), A(this, e + 2, e + 5), A(this, e + 3, e + 4);
    return this
}, u.prototype.toString = function() {
    var t = 0 | this.length;
    return 0 === t ? "" : 0 === arguments.length ? k(this, 0, t) : g.apply(this, arguments)
}, u.prototype.equals = function(t) {
    if (!u.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
    return this === t || 0 === u.compare(this, t)
}, u.prototype.inspect = function() {
    var t = "",
        r = e.INSPECT_MAX_BYTES;
    return this.length > 0 && (t = this.toString("hex", 0, r).match(/.{2}/g).join(" "), this.length > r && (t += " ... ")), "<Buffer " + t + ">"
}, u.prototype.compare = function(t, e, r, n, i) {
    if (!u.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
    if (void 0 === e && (e = 0), void 0 === r && (r = t ? t.length : 0), void 0 === n && (n = 0), void 0 === i && (i = this.length), e < 0 || r > t.length || n < 0 || i > this.length) throw new RangeError("out of range index");
    if (n >= i && e >= r) return 0;
    if (n >= i) return -1;
    if (e >= r) return 1;
    if (this === t) return 0;
    for (var o = (i >>>= 0) - (n >>>= 0), a = (r >>>= 0) - (e >>>= 0), s = Math.min(o, a), l = this.slice(n, i), c = t.slice(e, r), f = 0; f < s; ++f)
        if (l[f] !== c[f]) {
            o = l[f], a = c[f];
            break
        } return o < a ? -1 : a < o ? 1 : 0
}, u.prototype.includes = function(t, e, r) {
    return -1 !== this.indexOf(t, e, r)
}, u.prototype.indexOf = function(t, e, r) {
    return v(this, t, e, r, !0)
}, u.prototype.lastIndexOf = function(t, e, r) {
    return v(this, t, e, r, !1)
}, u.prototype.write = function(t, e, r, n) {
    if (void 0 === e) n = "utf8", r = this.length, e = 0;
    else if (void 0 === r && "string" == typeof e) n = e, r = this.length, e = 0;
    else {
        if (!isFinite(e)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
        e |= 0, isFinite(r) ? (r |= 0, void 0 === n && (n = "utf8")) : (n = r, r = void 0)
    }
    var i = this.length - e;
    if ((void 0 === r || r > i) && (r = i), t.length > 0 && (r < 0 || e < 0) || e > this.length) throw new RangeError("Attempt to write outside buffer bounds");
    n || (n = "utf8");
    for (var o = !1;;) switch (n) {
        case "hex":
            return m(this, t, e, r);
        case "utf8":
        case "utf-8":
            return b(this, t, e, r);
        case "ascii":
            return E(this, t, e, r);
        case "latin1":
        case "binary":
            return w(this, t, e, r);
        case "base64":
            return T(this, t, e, r);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
            return S(this, t, e, r);
        default:
            if (o) throw new TypeError("Unknown encoding: " + n);
            n = ("" + n).toLowerCase(), o = !0
    }
}, u.prototype.toJSON = function() {
    return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
    }
};
var n=u;
var Bt = new ArrayBuffer(65536);
    // Dt = function(t) {
    //     var e = new Uint8Array(t);
    //     return function(t, r) {
    //         var i;
    //         if (void 0 === n) {
    //             i = Rt.atob(r);
    //             for (var o = 0; o < i.length; o++) e[t + o] = i.charCodeAt(o)
    //         } else
    //             for (i = n.from(r, "base64"), o = 0; o < i.length; o++) e[t + o] = i[o]
    //     }
    // }(Bt);
// Dt(8, "HgAAAAEAAAABAAAAHgAAAH4AbABpAGIALwByAHQALwB0AGwAcwBmAC4AdABz"), Dt(56, "KAAAAAEAAAABAAAAKAAAAGEAbABsAG8AYwBhAHQAaQBvAG4AIAB0AG8AbwAgAGwAYQByAGcAZQ=="), Dt(112, "HgAAAAEAAAABAAAAHgAAAH4AbABpAGIALwByAHQALwBwAHUAcgBlAC4AdABz"), Dt(160, "JAAAAAEAAAABAAAAJAAAAEkAbgBkAGUAeAAgAG8AdQB0ACAAbwBmACAAcgBhAG4AZwBl"), Dt(216, "FAAAAAEAAAABAAAAFAAAAH4AbABpAGIALwByAHQALgB0AHM="), Dt(257, "AgAAAQ=="), Dt(269, "AgAA/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////z4AAAD///////////////8/AAAANAAAADUAAAA2AAAANwAAADgAAAA5AAAAOgAAADsAAAA8AAAAPQAAAP////////////////////////////////////8AAAAAAQAAAAIAAAADAAAABAAAAAUAAAAGAAAABwAAAAgAAAAJAAAACgAAAAsAAAAMAAAADQAAAA4AAAAPAAAAEAAAABEAAAASAAAAEwAAABQAAAAVAAAAFgAAABcAAAAYAAAAGQAAAP///////////////////////////////xoAAAAbAAAAHAAAAB0AAAAeAAAAHwAAACAAAAAhAAAAIgAAACMAAAAkAAAAJQAAACYAAAAnAAAAKAAAACkAAAAqAAAAKwAAACwAAAAtAAAALgAAAC8AAAAwAAAAMQAAADIAAAAzAAAA//////////////////////////8="), Dt(784, "EAAAAAEAAAADAAAAEAAAABABAAAQAQAAAAIAAIA="), Dt(817, "AQAAAQ=="), Dt(829, "AQAAY3x3e/Jrb8UwAWcr/terdsqCyX36WUfwrdSir5ykcsC3/ZMmNj/3zDSl5fFx2DEVBMcjwxiWBZoHEoDi6yeydQmDLBobblqgUjvWsynjL4RT0QDtIPyxW2rLvjlKTFjP0O+q+0NNM4VF+QJ/UDyfqFGjQI+SnTj1vLbaIRD/89LNDBPsX5dEF8Snfj1kXRlzYIFP3CIqkIhG7rgU3l4L2+AyOgpJBiRcwtOsYpGV5HnnyDdtjdVOqWxW9Opleq4IunglLhymtMbo3XQfS72LinA+tWZIA/YOYTVXuYbBHZ7h+JgRadmOlJseh+nOVSjfjKGJDb/mQmhBmS0PsFS7Fg=="), Dt(1088, "EAAAAAEAAAAEAAAAEAAAAEADAABAAwAAAAEAAAAB"), Dt(1121, "AQAAAQ=="), Dt(1133, "AQAAUglq1TA2pTi/QKOegfPX+3zjOYKbL/+HNI5DRMTe6ctUe5QypsIjPe5MlQtC+sNOCC6hZijZJLJ2W6JJbYvRJXL49mSGaJgW1KRczF1ltpJscEhQ/e252l4VRlenjZ2EkNirAIy80wr35FgFuLNFBtAsHo/KPw8Cwa+9AwETims6kRFBT2fc6pfyz87wtOZzlqx0IuetNYXi+TfoHHXfbkfxGnEdKcWJb7diDqoYvhv8Vj5LxtJ5IJrbwP54zVr0H92oM4gHxzGxEhBZJ4DsX2BRf6kZtUoNLeV6n5PJnO+g4DtNrir1sMjruzyDU5lhFysEfrp31ibhaRRjVSEMfQ=="), Dt(1392, "EAAAAAEAAAAEAAAAEAAAAHAEAABwBAAAAAEAAAAB"), Dt(1424, "CwAAAAEAAAAAAAAACwAAAI0BAgQIECBAgBs2"), Dt(1456, "EAAAAAEAAAAEAAAAEAAAAKAFAACgBQAACwAAAAs="), Dt(1489, "AQAAAQ=="), Dt(1501, "AQAAAAkSGyQtNj9IQVpTbGV+d5CZgou0vaav2NHKw/z17uc7MikgHxYNBHN6YWhXXkVMq6K5sI+GnZTj6vH4x87V3HZ/ZG1SW0BJPjcsJRoTCAHm7/T9wsvQ2a6nvLWKg5iRTURfVmlge3IFDBceISgzOt3Uz8b58OvilZyHjrG4o6rs5f73yMHa06Sttr+AiZKbfHVuZ1hRSkM0PSYvEBkCC9fexczz+uHon5aNhLuyqaBHTlVcY2pxeA8GHRQrIjkwmpOIgb63rKXS28DJ9v/k7QoDGBEuJzw1QktQWWZvdH2hqLO6hYyXnung+/LNxN/WMTgjKhUcBw55cGtiXVRPRg=="), Dt(1760, "EAAAAAEAAAAEAAAAEAAAAOAFAADgBQAAAAEAAAAB"), Dt(1793, "AQAAAQ=="), Dt(1805, "AQAAAAsWHSwnOjFYU05FdH9iabC7pq2cl4qB6OP+9cTP0tl7cG1mV1xBSiMoNT4PBBkSy8Dd1ufs8fqTmIWOv7Spovb94Ova0czHrqW4s4KJlJ9GTVBbamF8dx4VCAMyOSQvjYabkKGqt7zV3sPI+fLv5D02KyARGgcMZW5zeElCX1T3/OHq29DNxq+kubKDiJWeR0xRWmtgfXYfFAkCMzglLoyHmpGgq7a91N/Cyfjz7uU8NyohEBsGDWRvcnlIQ15VAQoXHC0mOzBZUk9EdX5jaLG6p6ydlouA6eL/9MXO09h6cWxnVl1ASyIpND8OBRgTysHc1+bt8PuSmYSPvrWoow=="), Dt(2064, "EAAAAAEAAAAEAAAAEAAAABAHAAAQBwAAAAEAAAAB"), Dt(2097, "AQAAAQ=="), Dt(2109, "AQAAAA0aFzQ5LiNoZXJ/XFFGS9Ddysfk6f7zuLWir4yBlpu7tqGsj4KVmNPeycTn6v3wa2ZxfF9SRUgDDhkUNzotIG1gd3pZVENOBQgfEjE8Kya9sKeqiYSTntXYz8Lh7Pv21tvMweLv+PW+s6SpioeQnQYLHBEyPyglbmN0eVpXQE3a18DN7uP0+bK/qKWGi5yRCgcQHT4zJClib3h1VltMQWFse3ZVWE9CCQQTHj0wJyqxvKumhYifktnUw87t4Pf6t7qtoIOOmZTf0sXI6+bx/GdqfXBTXklEDwIVGDs2ISwMARYbODUiL2RpfnNQXUpH3NHGy+jl8v+0ua6jgI2alw=="), Dt(2368, "EAAAAAEAAAAEAAAAEAAAAEAIAABACAAAAAEAAAAB"), Dt(2401, "AQAAAQ=="), Dt(2413, "AQAAAA4cEjg2JCpwfmxiSEZUWuDu/PLY1sTKkJ6MgqimtLrb1cfJ4+3/8ault7mTnY+BOzUnKQMNHxFLRVdZc31vYa2jsb+Vm4mH3dPBz+Xr+fdNQ1FfdXtpZz0zIS8FCxkXdnhqZE5AUlwGCBoUPjAiLJaYioSuoLK85uj69N7QwsxBT11TeXdlazE/LSMJBxUboa+9s5mXhYvR383D6ef1+5qUhoiirL6w6uT2+NLczsB6dGZoQkxeUAoEFhgyPC4g7OLw/tTayMackoCOpKq4tgwCEB40OigmfHJgbkRKWFY3OSslDwETHUdJW1V/cWNt19nLxe/h8/2nqbu1n5GDjQ=="), Dt(2672, "EAAAAAEAAAAEAAAAEAAAAHAJAABwCQAAAAEAAAAB"), Dt(2704, "EAAAAAEAAAAAAAAAEAAAAGQ0MWQ4Y2Q5OGYwMGIyMDQ="), Dt(2736, "EAAAAAEAAAAEAAAAEAAAAKAKAACgCgAAEAAAABA="), Dt(2772, "AQ=="), Dt(2788, "AQ=="), Dt(2800, "GgAAAAEAAAABAAAAGgAAAH4AbABpAGIALwBhAHIAcgBhAHkALgB0AHM="), Dt(2848, "HAAAAAEAAAABAAAAHAAAAEkAbgB2AGEAbABpAGQAIABsAGUAbgBnAHQAaA=="), Dt(2896, "QAAAAAEAAAAAAAAAQAAAAGUAAAA5AAAAOAAAADAAAAAwAAAAOQAAADkAAAA4AAAAZQAAAGMAAABmAAAAOAAAADQAAAAyAAAANwAAAGU="), Dt(2976, "EAAAAAEAAAADAAAAEAAAAGALAABgCwAAQAAAABA="), Dt(3008, "kAAAAAEAAAAAAAAAkAAAABMAAAABAAAABAAAAAcAAAAeAAAADgAAABwAAAAIAAAAGAAAABEAAAAGAAAAIwAAACIAAAAQAAAACQAAAAoAAAANAAAAFgAAACAAAAAdAAAAHwAAABUAAAASAAAAAwAAAAIAAAAXAAAAGQAAABsAAAALAAAAFAAAAAUAAAAPAAAADAAAAAAAAAAhAAAAGg=="), Dt(3168, "EAAAAAEAAAADAAAAEAAAANALAADQCwAAkAAAACQ="), Dt(3204, "AQAAAAE="), Dt(3216, "CAAAAAEAAAABAAAACAAAAG4AdQBsAGw="), Dt(3244, "AQ=="), Dt(3256, "XgAAAAEAAAABAAAAXgAAAEUAbABlAG0AZQBuAHQAIAB0AHkAcABlACAAbQB1AHMAdAAgAGIAZQAgAG4AdQBsAGwAYQBiAGwAZQAgAGkAZgAgAGEAcgByAGEAeQAgAGkAcwAgAGgAbwBsAGUAeQ=="), Dt(3372, "AQ=="), Dt(3388, "AQ=="), Dt(3404, "AQ=="), Dt(3416, "BgAAABAAAAAAAAAAEAAAAAAAAAAQAAAAAAAAAJMEAAACAAAAMwAAAAIAAACTIAAAAg==");
var Lt = Pt({
        Math: Math,
        Int8Array: Int8Array,
        Uint8Array: Uint8Array,
        Int16Array: Int16Array,
        Uint16Array: Uint16Array,
        Int32Array: Int32Array,
        Uint32Array: Uint32Array,
        Float32Array: Float32Array,
        Float64Array: Float64Array,
        NaN: NaN,
        Infinity: 1 / 0
    }, Tt({
        abort: function() {
            throw new Error("abort")
        }
    }), Bt),
    Mt = {
        memory: Lt.memory,
        __alloc: Lt.__alloc,
        __retain: Lt.__retain,
        __release: Lt.__release,
        __collect: Lt.__collect,
        getFileName: Lt.getFileName,
        getFileParams: Lt.getFileParams,
        __rtti_base: Lt.__rtti_base
    };

    function Nt() {
        var t = xt({}, {
            exports: Mt
        });
        return Promise.resolve(t)
    }

console.log(Mt)

t=Mt;

var ie, oe;

Nt().then((function(t) {
    var e = t.__allocString,
        r = t.__getString;
    return {
        getFileName: function(n) {
            var i = e(n),
                o = t.getFileName(i);
            return r(o).replace(/[^\w\d\-/.]+$/g, "")
        },
        getFileParams: function(n) {
            var i = e(n),
                o = t.getFileParams(i),
                a = St(r(o).split("-"), 4);
            return {
                buy_key: a[0],
                sign: a[1],
                token: a[2],
                timestamp: a[3]
            }
        }
    }
})).then((function(t) {
    ie = t.getFileName, oe = t.getFileParams;
    console.log(ie, oe,'ieoe')
    // fileId: ,
    console.log(ie('i4YRgi+dy0PmHKoyQ3TSY9cbMQq7XZnVpdxbYC9J6DzCpCufEjMtsNB9fbEG+eAhFKyQ0BDatTs6GyrWGOqptw=='),'ieeee')
})).catch((function(t) {
    throw new Error(t)
}));


function Wt(t) {
    return Object.keys(t).map((function(e) {
        return "".concat(e, "=").concat(t[e])
    })).join("&")
}

var Kt = function(t) {
    return t
};
var linkProtectorCDN = '';

var decode = function(t) {
    if (ie === Kt) return "";
    var e = linkProtectorCDN,
        r = t.fileId,
        n = t.ep,
        i = t.duration,
        o = t.domain,
        a = t.apiVersion,
        s = ie(r),
        u = oe(n),
        l = o || e,
        c = Wt({
            buy_key: u.buy_key,
            sign: u.sign,
            token: u.token,
            timestamp: u.timestamp,
            duration: i
        });
        console.log(s,'filename',c)
    return "".concat(l, "/download/").concat(a, "/").concat(s, "?").concat(c)
}

setTimeout(()=>{
    console.log(decode(res))
}, 1000)
var res= {
    ret: 0,
    msg: '0',
    trackId: 286253638,
    uid: 69149360,
    albumId: 35822288,
    title: '01 小径分岔的花园（上）：博尔赫斯最著名作品，穿越时空的庞大花园迷宫',
    domain: 'http://audiopay.cos.tx.xmcdn.com',
    totalLength: 10636759,
    sampleDuration: 180,
    sampleLength: 1676467,
    isAuthorized: true,
    apiVersion: '1.0.0',
    seed: 6555,
    k1: '',
    k2: '',
    fileId: 'i4YRgi+dy0PmHKoyQ3TSY9cbMQq7XZnVpdxbYC9J6DzCpCufEjMtsNB9fbEG+eAhFKyQ0BDatTs6GyrWGOqptw==',
    buyKey: '143289152',
    duration: 1300,
    ep: 'KFRXhx+UTkwBo6Tfd47xCOzcurTIPAKL4wM9Diaq621wZEfGxAZB6xZEMSHAgq3B+J7kXbX6+rKsjg==',
    highestQualityLevel: 2,
    downloadQualityLevel: 1,
    authorizedType: 1,
    volumeGain: 2.1999999999999993
  }

//   console.log(decode(res))
module.exports = decode; 
