!(function (e) {
  function h(c, k) {
    (b(c, k) ? a : d)(c, k);
  }
  var b, d, a;
  "classList" in document.documentElement
    ? ((b = function (a, b) {
        return a.classList.contains(b);
      }),
      (d = function (a, b) {
        a.classList.add(b);
      }),
      (a = function (a, b) {
        a.classList.remove(b);
      }))
    : ((b = function (a, b) {
        return new RegExp("(^|\\s+)" + b + "(\\s+|$)").test(a.className);
      }),
      (d = function (a, c) {
        b(a, c) || (a.className = a.className + " " + c);
      }),
      (a = function (a, b) {
        a.className = a.className.replace(
          new RegExp("(^|\\s+)" + b + "(\\s+|$)"),
          " "
        );
      }));
  var c = {
    hasClass: b,
    addClass: d,
    removeClass: a,
    toggleClass: h,
    has: b,
    add: d,
    remove: a,
    toggle: h,
  };
  "function" == typeof define && define.amd ? define(c) : (e.classie = c);
})(window);
(function (e) {
  e.fn.appear = function (h, b) {
    var d = e.extend({ data: void 0, one: !0, accX: 0, accY: 0 }, b);
    return this.each(function () {
      var a = e(this);
      if (((a.appeared = !1), !h)) return void a.trigger("appear", d.data);
      var b = e(window),
        n = function () {
          if (!a.is(":visible")) return void (a.appeared = !1);
          var n = b.scrollLeft(),
            m = b.scrollTop(),
            f = a.offset(),
            k = f.left,
            f = f.top,
            h = d.accX,
            e = d.accY,
            B = a.height(),
            E = b.height(),
            r = a.width(),
            t = b.width();
          f + B + e >= m && m + E + e >= f && k + r + h >= n && n + t + h >= k
            ? a.appeared || a.trigger("appear", d.data)
            : (a.appeared = !1);
        },
        k = function () {
          if (((a.appeared = !0), d.one)) {
            b.unbind("scroll", n);
            var p = e.inArray(n, e.fn.appear.checks);
            0 <= p && e.fn.appear.checks.splice(p, 1);
          }
          h.apply(this, arguments);
        };
      d.one ? a.one("appear", d.data, k) : a.bind("appear", d.data, k);
      b.scroll(n);
      e.fn.appear.checks.push(n);
      n();
    });
  };
  e.extend(e.fn.appear, {
    checks: [],
    timeout: null,
    checkAll: function () {
      var h = e.fn.appear.checks.length;
      if (0 < h) for (; h--; ) e.fn.appear.checks[h]();
    },
    run: function () {
      e.fn.appear.timeout && clearTimeout(e.fn.appear.timeout);
      e.fn.appear.timeout = setTimeout(e.fn.appear.checkAll, 20);
    },
  });
  e.each(
    "append prepend after before attr removeAttr addClass removeClass toggleClass remove css show hide".split(
      " "
    ),
    function (h, b) {
      var d = e.fn[b];
      d &&
        (e.fn[b] = function () {
          var a = d.apply(this, arguments);
          return e.fn.appear.run(), a;
        });
    }
  );
})(jQuery);
!(function (e) {
  var h,
    b,
    d = /[\.\/]/,
    a = function () {},
    c = function (a, b) {
      return a - b;
    },
    n = { n: {} },
    k = function (a, d) {
      a = String(a);
      var f,
        n = b,
        e = Array.prototype.slice.call(arguments, 2),
        H = k.listeners(a),
        B = 0,
        E = [],
        r = {},
        t = [],
        L = h;
      h = a;
      for (var v = (b = 0), K = H.length; K > v; v++)
        "zIndex" in H[v] &&
          (E.push(H[v].zIndex), 0 > H[v].zIndex && (r[H[v].zIndex] = H[v]));
      for (E.sort(c); 0 > E[B]; )
        if (((f = r[E[B++]]), t.push(f.apply(d, e)), b)) return (b = n), t;
      for (v = 0; K > v; v++)
        if (((f = H[v]), "zIndex" in f))
          if (f.zIndex == E[B]) {
            if ((t.push(f.apply(d, e)), b)) break;
            do if ((B++, (f = r[E[B]]), f && t.push(f.apply(d, e)), b)) break;
            while (f);
          } else r[f.zIndex] = f;
        else if ((t.push(f.apply(d, e)), b)) break;
      return (b = n), (h = L), t.length ? t : null;
    };
  k._events = n;
  k.listeners = function (a) {
    var b,
      c,
      k,
      h,
      e,
      B,
      E,
      r = a.split(d);
    b = n;
    var t = [b],
      L = [];
    a = 0;
    for (h = r.length; h > a; a++) {
      E = [];
      e = 0;
      for (B = t.length; B > e; e++)
        for (b = t[e].n, c = [b[r[a]], b["*"]], k = 2; k--; )
          (b = c[k]) && (E.push(b), (L = L.concat(b.f || [])));
      t = E;
    }
    return L;
  };
  k.on = function (b, c) {
    if (((b = String(b)), "function" != typeof c)) return function () {};
    for (var f = b.split(d), k = n, e = 0, h = f.length; h > e; e++)
      (k = k.n),
        (k = (k.hasOwnProperty(f[e]) && k[f[e]]) || (k[f[e]] = { n: {} }));
    k.f = k.f || [];
    e = 0;
    for (h = k.f.length; h > e; e++) if (k.f[e] == c) return a;
    return (
      k.f.push(c),
      function (a) {
        +a == +a && (c.zIndex = +a);
      }
    );
  };
  k.f = function (a) {
    var b = [].slice.call(arguments, 1);
    return function () {
      k.apply(null, [a, null].concat(b).concat([].slice.call(arguments, 0)));
    };
  };
  k.stop = function () {
    b = 1;
  };
  k.nt = function (a) {
    return a ? new RegExp("(?:\\.|\\/|^)" + a + "(?:\\.|\\/|$)").test(h) : h;
  };
  k.nts = function () {
    return h.split(d);
  };
  k.off = k.unbind = function (a, b) {
    if (!a) return (k._events = n = { n: {} }), void 0;
    var c,
      e,
      h,
      H,
      B,
      E,
      r = a.split(d),
      t = [n];
    H = 0;
    for (B = r.length; B > H; H++)
      for (E = 0; E < t.length; E += h.length - 2) {
        if (((h = [E, 1]), (c = t[E].n), "*" != r[H]))
          c[r[H]] && h.push(c[r[H]]);
        else for (e in c) c.hasOwnProperty(e) && h.push(c[e]);
        t.splice.apply(t, h);
      }
    H = 0;
    for (B = t.length; B > H; H++)
      for (c = t[H]; c.n; ) {
        if (b) {
          if (c.f) {
            E = 0;
            for (h = c.f.length; h > E; E++)
              if (c.f[E] == b) {
                c.f.splice(E, 1);
                break;
              }
            !c.f.length && delete c.f;
          }
          for (e in c.n)
            if (c.n.hasOwnProperty(e) && c.n[e].f) {
              r = c.n[e].f;
              E = 0;
              for (h = r.length; h > E; E++)
                if (r[E] == b) {
                  r.splice(E, 1);
                  break;
                }
              !r.length && delete c.n[e].f;
            }
        } else
          for (e in (delete c.f, c.n))
            c.n.hasOwnProperty(e) && c.n[e].f && delete c.n[e].f;
        c = c.n;
      }
  };
  k.once = function (a, b) {
    var c = function () {
      return k.unbind(a, c), b.apply(this, arguments);
    };
    return k.on(a, c);
  };
  k.version = "0.4.2";
  k.toString = function () {
    return "You are running Eve 0.4.2";
  };
  "undefined" != typeof module && module.exports
    ? (module.exports = k)
    : "undefined" != typeof define
    ? define("eve", [], function () {
        return k;
      })
    : (e.eve = k);
})(this);
(function (e, h) {
  "function" == typeof define && define.amd
    ? define(["eve"], function (b) {
        return h(e, b);
      })
    : h(e, e.eve);
})(this, function (e, h) {
  var b = (function (a) {
      var b = {},
        d =
          e.requestAnimationFrame ||
          e.webkitRequestAnimationFrame ||
          e.mozRequestAnimationFrame ||
          e.oRequestAnimationFrame ||
          e.msRequestAnimationFrame ||
          function (a) {
            setTimeout(a, 16);
          },
        k =
          Array.isArray ||
          function (a) {
            return (
              a instanceof Array ||
              "[object Array]" == Object.prototype.toString.call(a)
            );
          },
        h = 0,
        m = "M" + (+new Date()).toString(36),
        f = function (a) {
          if (null == a) return this.s;
          var b = this.s - a;
          this.b += this.dur * b;
          this.B += this.dur * b;
          this.s = a;
        },
        q = function (a) {
          return null == a ? this.spd : ((this.spd = a), void 0);
        },
        u = function (a) {
          return null == a
            ? this.dur
            : ((this.s = (this.s * a) / this.dur), (this.dur = a), void 0);
        },
        H = function () {
          delete b[this.id];
          a("mina.stop." + this.id, this);
        },
        B = function () {
          this.pdif || (delete b[this.id], (this.pdif = this.get() - this.b));
        },
        E = function () {
          this.pdif &&
            ((this.b = this.get() - this.pdif),
            delete this.pdif,
            (b[this.id] = this));
        },
        r = function () {
          var f = 0,
            e;
          for (e in b)
            if (b.hasOwnProperty(e)) {
              var h,
                m = b[e];
              h = m.get();
              if (
                (f++,
                (m.s = (h - m.b) / (m.dur / m.spd)),
                1 <= m.s &&
                  (delete b[e],
                  (m.s = 1),
                  f--,
                  (function (b) {
                    setTimeout(function () {
                      a("mina.finish." + b.id, b);
                    });
                  })(m)),
                k(m.start))
              ) {
                h = [];
                for (var p = 0, q = m.start.length; q > p; p++)
                  h[p] = +m.start[p] + (m.end[p] - m.start[p]) * m.easing(m.s);
              } else h = +m.start + (m.end - m.start) * m.easing(m.s);
              m.set(h);
            }
          f && d(r);
        },
        t = function (a, k, e, I, w, T, C) {
          a = {
            id: m + (h++).toString(36),
            start: a,
            end: k,
            b: e,
            s: 0,
            dur: I - e,
            spd: 1,
            get: w,
            set: T,
            easing: C || t.linear,
            status: f,
            speed: q,
            duration: u,
            stop: H,
            pause: B,
            resume: E,
          };
          b[a.id] = a;
          var X;
          k = 0;
          for (X in b) if (b.hasOwnProperty(X) && (k++, 2 == k)) break;
          return 1 == k && d(r), a;
        };
      return (
        (t.time =
          Date.now ||
          function () {
            return +new Date();
          }),
        (t.getById = function (a) {
          return b[a] || null;
        }),
        (t.linear = function (a) {
          return a;
        }),
        (t.easeout = function (a) {
          return Math.pow(a, 1.7);
        }),
        (t.easein = function (a) {
          return Math.pow(a, 0.48);
        }),
        (t.easeinout = function (a) {
          if (1 == a) return 1;
          if (0 == a) return 0;
          var b = 0.48 - a / 1.04,
            c = Math.sqrt(0.1734 + b * b);
          a = c - b;
          a = Math.pow(Math.abs(a), 1 / 3) * (0 > a ? -1 : 1);
          b = -c - b;
          b = Math.pow(Math.abs(b), 1 / 3) * (0 > b ? -1 : 1);
          a = a + b + 0.5;
          return 3 * (1 - a) * a * a + a * a * a;
        }),
        (t.backin = function (a) {
          return 1 == a ? 1 : a * a * (2.70158 * a - 1.70158);
        }),
        (t.backout = function (a) {
          if (0 == a) return 0;
          --a;
          return a * a * (2.70158 * a + 1.70158) + 1;
        }),
        (t.elastic = function (a) {
          return a == !!a
            ? a
            : Math.pow(2, -10 * a) *
                Math.sin((2 * (a - 0.075) * Math.PI) / 0.3) +
                1;
        }),
        (t.bounce = function (a) {
          var b;
          return (
            1 / 2.75 > a
              ? (b = 7.5625 * a * a)
              : 2 / 2.75 > a
              ? ((a -= 1.5 / 2.75), (b = 7.5625 * a * a + 0.75))
              : 2.5 / 2.75 > a
              ? ((a -= 2.25 / 2.75), (b = 7.5625 * a * a + 0.9375))
              : ((a -= 2.625 / 2.75), (b = 7.5625 * a * a + 0.984375)),
            b
          );
        }),
        (e.mina = t),
        t
      );
    })("undefined" == typeof h ? function () {} : h),
    d = (function () {
      function a(a, b) {
        if (a) {
          if (a.tagName) return C(a);
          if (a instanceof v) return a;
          if (null == b) return (a = M.doc.querySelector(a)), C(a);
        }
        return (
          (a = null == a ? "100%" : a),
          (b = null == b ? "100%" : b),
          new T(a, b)
        );
      }
      function c(a, b) {
        if (b) {
          if (("string" == typeof a && (a = c(a)), "string" == typeof b))
            return "xlink:" == b.substring(0, 6)
              ? a.getAttributeNS(ua, b.substring(6))
              : "xml:" == b.substring(0, 4)
              ? a.getAttributeNS(oa, b.substring(4))
              : a.getAttribute(b);
          for (var d in b)
            if (b[P](d)) {
              var x = D(b[d]);
              x
                ? "xlink:" == d.substring(0, 6)
                  ? a.setAttributeNS(ua, d.substring(6), x)
                  : "xml:" == d.substring(0, 4)
                  ? a.setAttributeNS(oa, d.substring(4), x)
                  : a.setAttribute(d, x)
                : a.removeAttribute(d);
            }
        } else a = M.doc.createElementNS(oa, a);
        return a;
      }
      function d(a, b) {
        return (
          (b = D.prototype.toLowerCase.call(b)),
          "finite" == b
            ? isFinite(a)
            : "array" == b &&
              (a instanceof Array || (Array.isArray && Array.isArray(a)))
            ? !0
            : ("null" == b && null === a) ||
              (b == typeof a && null !== a) ||
              ("object" == b && a === Object(a)) ||
              ea.call(a).slice(8, -1).toLowerCase() == b
        );
      }
      function k(a) {
        if ("function" == typeof a || Object(a) !== a) return a;
        var b = new a.constructor(),
          d;
        for (d in a) a[P](d) && (b[d] = k(a[d]));
        return b;
      }
      function p(a, b, d) {
        function x() {
          var c = Array.prototype.slice.call(arguments, 0),
            l = c.join("\u2400"),
            f = (x.cache = x.cache || {}),
            F = (x.count = x.count || []);
          if (f[P](l)) {
            a: for (var c = F, F = l, A = 0, n = c.length; n > A; A++)
              if (c[A] === F) {
                c.push(c.splice(A, 1)[0]);
                break a;
              }
            l = d ? d(f[l]) : f[l];
          } else
            l =
              (1e3 <= F.length && delete f[F.shift()],
              F.push(l),
              (f[l] = a.apply(b, c)),
              d ? d(f[l]) : f[l]);
          return l;
        }
        return x;
      }
      function m(a, b, d, x, c, l) {
        return null == c
          ? ((a -= d),
            (b -= x),
            a || b ? ((180 * J.atan2(-b, -a)) / fa + 540) % 360 : 0)
          : m(a, b, c, l) - m(d, x, c, l);
      }
      function f(a) {
        return ((a % 360) * fa) / 180;
      }
      function q(a) {
        return ((180 * a) / fa) % 360;
      }
      function u(a, b, d, x, c, l) {
        return null == b && "[object SVGMatrix]" == ea.call(a)
          ? ((this.a = a.a),
            (this.b = a.b),
            (this.c = a.c),
            (this.d = a.d),
            (this.e = a.e),
            (this.f = a.f),
            void 0)
          : (null != a
              ? ((this.a = +a),
                (this.b = +b),
                (this.c = +d),
                (this.d = +x),
                (this.e = +c),
                (this.f = +l))
              : ((this.a = 1),
                (this.b = 0),
                (this.c = 0),
                (this.d = 1),
                (this.e = 0),
                (this.f = 0)),
            void 0);
      }
      function H(a) {
        var b = [];
        return (
          (a = a.replace(/(?:^|\s)(\w+)\(([^)]+)\)/g, function (a, z, d) {
            return (
              (d = d.split(/\s*,\s*|\s+/)),
              "rotate" == z && 1 == d.length && d.push(0, 0),
              "scale" == z &&
                (2 == d.length && d.push(0, 0),
                1 == d.length && d.push(d[0], 0, 0)),
              "skewX" == z
                ? b.push(["m", 1, 0, J.tan(f(d[0])), 1, 0, 0])
                : "skewY" == z
                ? b.push(["m", 1, J.tan(f(d[0])), 0, 1, 0, 0])
                : b.push([z.charAt(0)].concat(d)),
              a
            );
          })),
          b
        );
      }
      function B(a, b) {
        var d = za(a),
          x = new u();
        if (d)
          for (var c = 0, l = d.length; l > c; c++) {
            var f,
              F,
              A,
              n,
              k,
              e = d[c],
              y = e.length,
              h = D(e[0]).toLowerCase(),
              m = e[0] != h,
              Q = m ? x.invert() : 0;
            "t" == h && 2 == y
              ? x.translate(e[1], 0)
              : "t" == h && 3 == y
              ? m
                ? ((f = Q.x(0, 0)),
                  (F = Q.y(0, 0)),
                  (A = Q.x(e[1], e[2])),
                  (n = Q.y(e[1], e[2])),
                  x.translate(A - f, n - F))
                : x.translate(e[1], e[2])
              : "r" == h
              ? 2 == y
                ? ((k = k || b),
                  x.rotate(e[1], k.x + k.width / 2, k.y + k.height / 2))
                : 4 == y &&
                  (m
                    ? ((A = Q.x(e[2], e[3])),
                      (n = Q.y(e[2], e[3])),
                      x.rotate(e[1], A, n))
                    : x.rotate(e[1], e[2], e[3]))
              : "s" == h
              ? 2 == y || 3 == y
                ? ((k = k || b),
                  x.scale(
                    e[1],
                    e[y - 1],
                    k.x + k.width / 2,
                    k.y + k.height / 2
                  ))
                : 4 == y
                ? m
                  ? ((A = Q.x(e[2], e[3])),
                    (n = Q.y(e[2], e[3])),
                    x.scale(e[1], e[1], A, n))
                  : x.scale(e[1], e[1], e[2], e[3])
                : 5 == y &&
                  (m
                    ? ((A = Q.x(e[3], e[4])),
                      (n = Q.y(e[3], e[4])),
                      x.scale(e[1], e[2], A, n))
                    : x.scale(e[1], e[2], e[3], e[4]))
              : "m" == h && 7 == y && x.add(e[1], e[2], e[3], e[4], e[5], e[6]);
          }
        return x;
      }
      function E(z, b) {
        if (null == b) {
          var c = !0;
          if (
            ((b =
              "linearGradient" == z.type || "radialGradient" == z.type
                ? z.node.getAttribute("gradientTransform")
                : "pattern" == z.type
                ? z.node.getAttribute("patternTransform")
                : z.node.getAttribute("transform")),
            !b)
          )
            return new u();
          b = H(b);
        } else
          (b = a._.rgTransform.test(b)
            ? D(b).replace(/\.{3}|\u2026/g, z._.transform || R)
            : H(b)),
            d(b, "array") && (b = a.path ? a.path.toString.call(b) : D(b)),
            (z._.transform = b);
        var x = B(b, z.getBBox(1));
        return c ? x : ((z.matrix = x), void 0);
      }
      function r(z) {
        var b = a._.someDefs;
        if (b && Aa(b.ownerDocument.documentElement, b)) return b;
        z =
          (z.node.ownerSVGElement && C(z.node.ownerSVGElement)) ||
          (z.node.parentNode && C(z.node.parentNode)) ||
          a.select("svg") ||
          a(0, 0);
        b = z.select("defs");
        b = null == b ? !1 : b.node;
        return b || (b = w("defs", z.node).node), (a._.someDefs = b), b;
      }
      function t(a, b, d) {
        function x(a) {
          return null == a
            ? R
            : a == +a
            ? a
            : (c(A, { width: a }), A.getBBox().width);
        }
        function l(a) {
          return null == a
            ? R
            : a == +a
            ? a
            : (c(A, { height: a }), A.getBBox().height);
        }
        function f(x, c) {
          null == b
            ? (F[x] = c(a.attr(x)))
            : x == b && (F = c(null == d ? a.attr(x) : d));
        }
        var e = r(a),
          F = {},
          A = e.querySelector(".svg---mgr");
        switch (
          (A ||
            ((A = c("rect")),
            c(A, { width: 10, height: 10, class: "svg---mgr" }),
            e.appendChild(A)),
          a.type)
        ) {
          case "rect":
            f("rx", x), f("ry", l);
          case "image":
            f("width", x), f("height", l);
          case "text":
            f("x", x);
            f("y", l);
            break;
          case "circle":
            f("cx", x);
            f("cy", l);
            f("r", x);
            break;
          case "ellipse":
            f("cx", x);
            f("cy", l);
            f("rx", x);
            f("ry", l);
            break;
          case "line":
            f("x1", x);
            f("x2", x);
            f("y1", l);
            f("y2", l);
            break;
          case "marker":
            f("refX", x);
            f("markerWidth", x);
            f("refY", l);
            f("markerHeight", l);
            break;
          case "radialGradient":
            f("fx", x);
            f("fy", l);
            break;
          case "tspan":
            f("dx", x);
            f("dy", l);
            break;
          default:
            f(b, x);
        }
        return F;
      }
      function L(a) {
        d(a, "array") || (a = Array.prototype.slice.call(arguments, 0));
        for (var b = 0, c = 0, x = this.node; this[b]; ) delete this[b++];
        for (b = 0; b < a.length; b++)
          "set" == a[b].type
            ? a[b].forEach(function (a) {
                x.appendChild(a.node);
              })
            : x.appendChild(a[b].node);
        for (var l = x.childNodes, b = 0; b < l.length; b++)
          this[c++] = C(l[b]);
        return this;
      }
      function v(a) {
        if (a.snap in pa) return pa[a.snap];
        var b,
          d = (this.id = Z());
        try {
          b = a.ownerSVGElement;
        } catch (x) {}
        if (
          ((this.node = a),
          b && (this.paper = new T(b)),
          (this.type = a.tagName),
          (this.anims = {}),
          (this._ = { transform: [] }),
          (a.snap = d),
          (pa[d] = this),
          "g" == this.type)
        ) {
          this.add = L;
          for (var c in T.prototype)
            T.prototype[P](c) && (this[c] = T.prototype[c]);
        }
      }
      function K(a) {
        for (var b, d = 0, c = a.length; c > d; d++)
          if ((b = b || a[d])) return b;
      }
      function I(a) {
        this.node = a;
      }
      function w(a, b) {
        var d = c(a);
        b.appendChild(d);
        d = C(d);
        return (d.type = a), d;
      }
      function T(a, b) {
        var d,
          x,
          l,
          f = T.prototype;
        if (a && "svg" == a.tagName) {
          if (a.snap in pa) return pa[a.snap];
          d = new v(a);
          x = a.getElementsByTagName("desc")[0];
          l = a.getElementsByTagName("defs")[0];
          x ||
            ((x = c("desc")),
            x.appendChild(M.doc.createTextNode("AMR")),
            d.node.appendChild(x));
          l || ((l = c("defs")), d.node.appendChild(l));
          d.defs = l;
          for (var e in f) f[P](e) && (d[e] = f[e]);
          d.paper = d.root = d;
        } else
          (d = w("svg", M.doc.body)),
            c(d.node, { height: b, version: 1.1, width: a, xmlns: oa });
        return d;
      }
      function C(a) {
        return a
          ? a instanceof v || a instanceof I
            ? a
            : "svg" == a.tagName
            ? new T(a)
            : new v(a)
          : a;
      }
      function X() {
        return this.selectAll("stop");
      }
      function N(b, d) {
        var l = c("stop"),
          x = { offset: +d + "%" };
        return (
          (b = a.color(b)),
          (x["stop-color"] = b.hex),
          1 > b.opacity && (x["stop-opacity"] = b.opacity),
          c(l, x),
          this.node.appendChild(l),
          this
        );
      }
      function G() {
        if ("linearGradient" == this.type) {
          var b = c(this.node, "x1") || 0,
            d = c(this.node, "x2") || 1,
            l = c(this.node, "y1") || 0,
            x = c(this.node, "y2") || 0;
          return a._.box(b, l, J.abs(d - b), J.abs(x - l));
        }
        b = this.node.r || 0;
        return a._.box(
          (this.node.cx || 0.5) - b,
          (this.node.cy || 0.5) - b,
          2 * b,
          2 * b
        );
      }
      function S(a, b) {
        function d(a, b) {
          for (var z = (b - e) / (a - F), c = F; a > c; c++)
            f[c].offset = +(+e + z * (c - F)).toFixed(2);
          F = a;
          e = b;
        }
        var x,
          l = K(h("snap.util.grad.parse", null, b));
        if (!l) return null;
        l.params.unshift(a);
        x =
          "l" == l.type.toLowerCase()
            ? aa.apply(0, l.params)
            : ha.apply(0, l.params);
        l.type != l.type.toLowerCase() &&
          c(x.node, { gradientUnits: "userSpaceOnUse" });
        var f = l.stops,
          l = f.length,
          e = 0,
          F = 0;
        l--;
        for (var A = 0; l > A; A++) "offset" in f[A] && d(A, f[A].offset);
        f[l].offset = f[l].offset || 100;
        d(l, f[l].offset);
        for (A = 0; l >= A; A++) {
          var n = f[A];
          x.addStop(n.color, n.offset);
        }
        return x;
      }
      function aa(a, b, d, l, f) {
        a = w("linearGradient", a);
        return (
          (a.stops = X),
          (a.addStop = N),
          (a.getBBox = G),
          null != b && c(a.node, { x1: b, y1: d, x2: l, y2: f }),
          a
        );
      }
      function ha(a, b, d, l, f, e) {
        a = w("radialGradient", a);
        return (
          (a.stops = X),
          (a.addStop = N),
          (a.getBBox = G),
          null != b && c(a.node, { cx: b, cy: d, r: l }),
          null != f && null != e && c(a.node, { fx: f, fy: e }),
          a
        );
      }
      function U(b) {
        return function (d) {
          if (
            (h.stop(),
            d instanceof I &&
              1 == d.node.childNodes.length &&
              ("radialGradient" == d.node.firstChild.tagName ||
                "linearGradient" == d.node.firstChild.tagName ||
                "pattern" == d.node.firstChild.tagName) &&
              ((d = d.node.firstChild), r(this).appendChild(d), (d = C(d))),
            d instanceof v)
          )
            if (
              "radialGradient" == d.type ||
              "linearGradient" == d.type ||
              "pattern" == d.type
            ) {
              d.node.id || c(d.node, { id: d.id });
              var l = na(d.node.id);
            } else l = d.attr(b);
          else if (((l = a.color(d)), l.error)) {
            var x = S(r(this), d);
            x
              ? (x.node.id || c(x.node, { id: x.id }), (l = na(x.node.id)))
              : (l = d);
          } else l = D(l);
          d = {};
          d[b] = l;
          c(this.node, d);
          this.node.style[b] = R;
        };
      }
      function ca(a) {
        var b = [];
        a = a.childNodes;
        for (var d = 0, l = a.length; l > d; d++) {
          var c = a[d];
          3 == c.nodeType && b.push(c.nodeValue);
          "tspan" == c.tagName &&
            (1 == c.childNodes.length && 3 == c.firstChild.nodeType
              ? b.push(c.firstChild.nodeValue)
              : b.push(ca(c)));
        }
        return b;
      }
      a.version = "0.2.0";
      a.toString = function () {
        return "Snap v" + this.version;
      };
      a._ = {};
      var M = { win: e, doc: e.document };
      a._.glob = M;
      var P = "hasOwnProperty",
        D = String,
        O = parseFloat,
        W = parseInt,
        J = Math,
        V = J.max,
        Y = J.min,
        ba = J.abs,
        fa = (J.pow, J.PI),
        R = (J.round, ""),
        ea = Object.prototype.toString,
        l =
          /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?%?)\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?%?)\s*\))\s*$/i,
        ia = /^url\(#?([^)]+)\)$/,
        Q = RegExp(
          "[,  \n\x0B\f\r \u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]+"
        ),
        A =
          (RegExp(
            "[  \n\x0B\f\r \u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]",
            "g"
          ),
          RegExp(
            "[  \n\x0B\f\r \u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[  \n\x0B\f\r \u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*"
          )),
        ga = { hs: 1, rg: 1 },
        ra = RegExp(
          "([a-z])[  \n\x0B\f\r \u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\\d*\\.?\\d*(?:e[\\-+]?\\d+)?[  \n\x0B\f\r \u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[  \n\x0B\f\r \u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)",
          "ig"
        ),
        Ba = RegExp(
          "([rstm])[  \n\x0B\f\r \u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\\d*\\.?\\d*(?:e[\\-+]?\\d+)?[  \n\x0B\f\r \u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[  \n\x0B\f\r \u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)",
          "ig"
        ),
        va = RegExp(
          "(-?\\d*\\.?\\d*(?:e[\\-+]?\\d+)?)[  \n\x0B\f\r \u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[  \n\x0B\f\r \u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*",
          "ig"
        ),
        y = 0,
        Ca = "S" + (+new Date()).toString(36),
        Z = function () {
          return Ca + (y++).toString(36);
        },
        ua = "http://www.w3.org/1999/xlink",
        oa = "http://www.w3.org/2000/svg",
        pa = {},
        na = (a.url = function (a) {
          return "url('#" + a + "')";
        });
      a._.$ = c;
      a._.id = Z;
      a.format = (function () {
        var a = /\{([^\}]+)\}/g,
          b = /(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g,
          d = function (a, d, z) {
            var c = z;
            return (
              d.replace(b, function (a, b, d, z, l) {
                b = b || z;
                c &&
                  (b in c && (c = c[b]),
                  "function" == typeof c && l && (c = c()));
              }),
              (c = (null == c || c == z ? a : c) + "")
            );
          };
        return function (b, c) {
          return D(b).replace(a, function (a, b) {
            return d(a, b, c);
          });
        };
      })();
      var Da = (function () {
        function a() {
          this.parentNode.removeChild(this);
        }
        return function (b, d) {
          var c = M.doc.createElement("img"),
            l = M.doc.body;
          c.style.cssText = "position:absolute;left:-9999em;top:-9999em";
          c.onload = function () {
            d.call(c);
            c.onload = c.onerror = null;
            l.removeChild(c);
          };
          c.onerror = a;
          l.appendChild(c);
          c.src = b;
        };
      })();
      a._.clone = k;
      a._.cacher = p;
      a.rad = f;
      a.deg = q;
      a.angle = m;
      a.is = d;
      a.snapTo = function (a, b, c) {
        if (((c = d(c, "finite") ? c : 10), d(a, "array")))
          for (var l = a.length; l--; ) {
            if (ba(a[l] - b) <= c) return a[l];
          }
        else {
          a = +a;
          l = b % a;
          if (c > l) return b - l;
          if (l > a - c) return b - l + a;
        }
        return b;
      };
      (function (a) {
        function b(a) {
          return a[0] * a[0] + a[1] * a[1];
        }
        function d(a) {
          var z = J.sqrt(b(a));
          a[0] && (a[0] /= z);
          a[1] && (a[1] /= z);
        }
        a.add = function (a, b, d, z, c, l) {
          var da = [[], [], []],
            f = [
              [this.a, this.c, this.e],
              [this.b, this.d, this.f],
              [0, 0, 1],
            ];
          b = [
            [a, d, c],
            [b, z, l],
            [0, 0, 1],
          ];
          a &&
            a instanceof u &&
            (b = [
              [a.a, a.c, a.e],
              [a.b, a.d, a.f],
              [0, 0, 1],
            ]);
          for (a = 0; 3 > a; a++)
            for (d = 0; 3 > d; d++) {
              for (z = c = 0; 3 > z; z++) c += f[a][z] * b[z][d];
              da[a][d] = c;
            }
          return (
            (this.a = da[0][0]),
            (this.b = da[1][0]),
            (this.c = da[0][1]),
            (this.d = da[1][1]),
            (this.e = da[0][2]),
            (this.f = da[1][2]),
            this
          );
        };
        a.invert = function () {
          var a = this.a * this.d - this.b * this.c;
          return new u(
            this.d / a,
            -this.b / a,
            -this.c / a,
            this.a / a,
            (this.c * this.f - this.d * this.e) / a,
            (this.b * this.e - this.a * this.f) / a
          );
        };
        a.clone = function () {
          return new u(this.a, this.b, this.c, this.d, this.e, this.f);
        };
        a.translate = function (a, b) {
          return this.add(1, 0, 0, 1, a, b);
        };
        a.scale = function (a, b, d, z) {
          return (
            null == b && (b = a),
            (d || z) && this.add(1, 0, 0, 1, d, z),
            this.add(a, 0, 0, b, 0, 0),
            (d || z) && this.add(1, 0, 0, 1, -d, -z),
            this
          );
        };
        a.rotate = function (a, b, d) {
          a = f(a);
          b = b || 0;
          d = d || 0;
          var z = +J.cos(a).toFixed(9);
          a = +J.sin(a).toFixed(9);
          return this.add(z, a, -a, z, b, d), this.add(1, 0, 0, 1, -b, -d);
        };
        a.x = function (a, b) {
          return a * this.a + b * this.c + this.e;
        };
        a.y = function (a, b) {
          return a * this.b + b * this.d + this.f;
        };
        a.get = function (a) {
          return +this[D.fromCharCode(97 + a)].toFixed(4);
        };
        a.toString = function () {
          return (
            "matrix(" +
            [
              this.get(0),
              this.get(1),
              this.get(2),
              this.get(3),
              this.get(4),
              this.get(5),
            ].join() +
            ")"
          );
        };
        a.offset = function () {
          return [this.e.toFixed(4), this.f.toFixed(4)];
        };
        a.split = function () {
          var a = {};
          a.dx = this.e;
          a.dy = this.f;
          var z = [
            [this.a, this.c],
            [this.b, this.d],
          ];
          a.scalex = J.sqrt(b(z[0]));
          d(z[0]);
          a.shear = z[0][0] * z[1][0] + z[0][1] * z[1][1];
          z[1] = [z[1][0] - z[0][0] * a.shear, z[1][1] - z[0][1] * a.shear];
          a.scaley = J.sqrt(b(z[1]));
          d(z[1]);
          a.shear /= a.scaley;
          var c = -z[0][1],
            z = z[1][1];
          return (
            0 > z
              ? ((a.rotate = q(J.acos(z))),
                0 > c && (a.rotate = 360 - a.rotate))
              : (a.rotate = q(J.asin(c))),
            (a.isSimple = !(
              +a.shear.toFixed(9) ||
              (a.scalex.toFixed(9) != a.scaley.toFixed(9) && a.rotate)
            )),
            (a.isSuperSimple =
              !+a.shear.toFixed(9) &&
              a.scalex.toFixed(9) == a.scaley.toFixed(9) &&
              !a.rotate),
            (a.noRotation = !+a.shear.toFixed(9) && !a.rotate),
            a
          );
        };
        a.toTransformString = function (a) {
          a = a || this.split();
          return a.isSimple
            ? ((a.scalex = +a.scalex.toFixed(4)),
              (a.scaley = +a.scaley.toFixed(4)),
              (a.rotate = +a.rotate.toFixed(4)),
              (a.dx || a.dy ? "t" + [+a.dx.toFixed(4), +a.dy.toFixed(4)] : R) +
                (1 != a.scalex || 1 != a.scaley
                  ? "s" + [a.scalex, a.scaley, 0, 0]
                  : R) +
                (a.rotate ? "r" + [+a.rotate.toFixed(4), 0, 0] : R))
            : "m" +
                [
                  this.get(0),
                  this.get(1),
                  this.get(2),
                  this.get(3),
                  this.get(4),
                  this.get(5),
                ];
        };
      })(u.prototype);
      a.Matrix = u;
      a.getRGB = p(function (b) {
        if (!b || (b = D(b)).indexOf("-") + 1)
          return { r: -1, g: -1, b: -1, hex: "none", error: 1, toString: ma };
        if ("none" == b)
          return { r: -1, g: -1, b: -1, hex: "none", toString: ma };
        if (
          (!(ga[P](b.toLowerCase().substring(0, 2)) || "#" == b.charAt()) &&
            (b = sa(b)),
          !b)
        )
          return { r: -1, g: -1, b: -1, hex: "none", error: 1, toString: ma };
        var c, f, e, k, y, h;
        return (b = b.match(l))
          ? (b[2] &&
              ((e = W(b[2].substring(5), 16)),
              (f = W(b[2].substring(3, 5), 16)),
              (c = W(b[2].substring(1, 3), 16))),
            b[3] &&
              ((e = W((y = b[3].charAt(3)) + y, 16)),
              (f = W((y = b[3].charAt(2)) + y, 16)),
              (c = W((y = b[3].charAt(1)) + y, 16))),
            b[4] &&
              ((h = b[4].split(A)),
              (c = O(h[0])),
              "%" == h[0].slice(-1) && (c *= 2.55),
              (f = O(h[1])),
              "%" == h[1].slice(-1) && (f *= 2.55),
              (e = O(h[2])),
              "%" == h[2].slice(-1) && (e *= 2.55),
              "rgba" == b[1].toLowerCase().slice(0, 4) && (k = O(h[3])),
              h[3] && "%" == h[3].slice(-1) && (k /= 100)),
            b[5]
              ? ((h = b[5].split(A)),
                (c = O(h[0])),
                "%" == h[0].slice(-1) && (c /= 100),
                (f = O(h[1])),
                "%" == h[1].slice(-1) && (f /= 100),
                (e = O(h[2])),
                "%" == h[2].slice(-1) && (e /= 100),
                ("deg" == h[0].slice(-3) || "\u00b0" == h[0].slice(-1)) &&
                  (c /= 360),
                "hsba" == b[1].toLowerCase().slice(0, 4) && (k = O(h[3])),
                h[3] && "%" == h[3].slice(-1) && (k /= 100),
                a.hsb2rgb(c, f, e, k))
              : b[6]
              ? ((h = b[6].split(A)),
                (c = O(h[0])),
                "%" == h[0].slice(-1) && (c /= 100),
                (f = O(h[1])),
                "%" == h[1].slice(-1) && (f /= 100),
                (e = O(h[2])),
                "%" == h[2].slice(-1) && (e /= 100),
                ("deg" == h[0].slice(-3) || "\u00b0" == h[0].slice(-1)) &&
                  (c /= 360),
                "hsla" == b[1].toLowerCase().slice(0, 4) && (k = O(h[3])),
                h[3] && "%" == h[3].slice(-1) && (k /= 100),
                a.hsl2rgb(c, f, e, k))
              : ((c = Y(J.round(c), 255)),
                (f = Y(J.round(f), 255)),
                (e = Y(J.round(e), 255)),
                (k = Y(V(k, 0), 1)),
                (b = { r: c, g: f, b: e, toString: ma }),
                (b.hex =
                  "#" +
                  (16777216 | e | (f << 8) | (c << 16)).toString(16).slice(1)),
                (b.opacity = d(k, "finite") ? k : 1),
                b))
          : { r: -1, g: -1, b: -1, hex: "none", error: 1, toString: ma };
      }, a);
      a.hsb = p(function (b, d, c) {
        return a.hsb2rgb(b, d, c).hex;
      });
      a.hsl = p(function (b, d, c) {
        return a.hsl2rgb(b, d, c).hex;
      });
      a.rgb = p(function (a, b, c, l) {
        if (d(l, "finite")) {
          var f = J.round;
          return "rgba(" + [f(a), f(b), f(c), +l.toFixed(2)] + ")";
        }
        return (
          "#" + (16777216 | c | (b << 8) | (a << 16)).toString(16).slice(1)
        );
      });
      var sa = function (a) {
          var b = M.doc.getElementsByTagName("head")[0];
          return (
            (sa = p(function (a) {
              if ("red" == a.toLowerCase()) return "rgb(255, 0, 0)";
              b.style.color = "rgb(255, 0, 0)";
              b.style.color = a;
              a = M.doc.defaultView
                .getComputedStyle(b, R)
                .getPropertyValue("color");
              return "rgb(255, 0, 0)" == a ? null : a;
            })),
            sa(a)
          );
        },
        ta = function () {
          return "hsb(" + [this.h, this.s, this.b] + ")";
        },
        Ea = function () {
          return "hsl(" + [this.h, this.s, this.l] + ")";
        },
        ma = function () {
          return 1 == this.opacity || null == this.opacity
            ? this.hex
            : "rgba(" + [this.r, this.g, this.b, this.opacity] + ")";
        },
        wa = function (b, c, l) {
          if (
            (null == c &&
              d(b, "object") &&
              "r" in b &&
              "g" in b &&
              "b" in b &&
              ((l = b.b), (c = b.g), (b = b.r)),
            null == c && d(b, string))
          )
            (l = a.getRGB(b)), (b = l.r), (c = l.g), (l = l.b);
          return (
            (1 < b || 1 < c || 1 < l) && ((b /= 255), (c /= 255), (l /= 255)),
            [b, c, l]
          );
        },
        xa = function (b, c, l, f) {
          b = J.round(255 * b);
          c = J.round(255 * c);
          l = J.round(255 * l);
          b = {
            r: b,
            g: c,
            b: l,
            opacity: d(f, "finite") ? f : 1,
            hex: a.rgb(b, c, l),
            toString: ma,
          };
          return d(f, "finite") && (b.opacity = f), b;
        };
      a.color = function (b) {
        var c;
        return (
          d(b, "object") && "h" in b && "s" in b && "b" in b
            ? ((c = a.hsb2rgb(b)),
              (b.r = c.r),
              (b.g = c.g),
              (b.b = c.b),
              (b.opacity = 1),
              (b.hex = c.hex))
            : d(b, "object") && "h" in b && "s" in b && "l" in b
            ? ((c = a.hsl2rgb(b)),
              (b.r = c.r),
              (b.g = c.g),
              (b.b = c.b),
              (b.opacity = 1),
              (b.hex = c.hex))
            : (d(b, "string") && (b = a.getRGB(b)),
              d(b, "object") &&
              "r" in b &&
              "g" in b &&
              "b" in b &&
              !("error" in b)
                ? ((c = a.rgb2hsl(b)),
                  (b.h = c.h),
                  (b.s = c.s),
                  (b.l = c.l),
                  (c = a.rgb2hsb(b)),
                  (b.v = c.b))
                : ((b = { hex: "none" }),
                  (b.r = b.g = b.b = b.h = b.s = b.v = b.l = -1),
                  (b.error = 1))),
          (b.toString = ma),
          b
        );
      };
      a.hsb2rgb = function (a, b, c, l) {
        d(a, "object") &&
          "h" in a &&
          "s" in a &&
          "b" in a &&
          ((c = a.b), (b = a.s), (a = a.h), (l = a.o));
        a *= 360;
        var f, e, A, F, k;
        return (
          (a = (a % 360) / 60),
          (k = c * b),
          (F = k * (1 - ba((a % 2) - 1))),
          (f = e = A = c - k),
          (a = ~~a),
          (f += [k, F, 0, 0, F, k][a]),
          (e += [F, k, k, F, 0, 0][a]),
          (A += [0, 0, F, k, k, F][a]),
          xa(f, e, A, l)
        );
      };
      a.hsl2rgb = function (a, b, c, l) {
        d(a, "object") &&
          "h" in a &&
          "s" in a &&
          "l" in a &&
          ((c = a.l), (b = a.s), (a = a.h));
        (1 < a || 1 < b || 1 < c) && ((a /= 360), (b /= 100), (c /= 100));
        a *= 360;
        var f, e, A, F, k;
        return (
          (a = (a % 360) / 60),
          (k = 2 * b * (0.5 > c ? c : 1 - c)),
          (F = k * (1 - ba((a % 2) - 1))),
          (f = e = A = c - k / 2),
          (a = ~~a),
          (f += [k, F, 0, 0, F, k][a]),
          (e += [F, k, k, F, 0, 0][a]),
          (A += [0, 0, F, k, k, F][a]),
          xa(f, e, A, l)
        );
      };
      a.rgb2hsb = function (a, b, c) {
        c = wa(a, b, c);
        a = c[0];
        b = c[1];
        c = c[2];
        var d, l, f, e;
        return (
          (f = V(a, b, c)),
          (e = f - Y(a, b, c)),
          (d =
            0 == e
              ? null
              : f == a
              ? (b - c) / e
              : f == b
              ? (c - a) / e + 2
              : (a - b) / e + 4),
          (d = (((d + 360) % 6) * 60) / 360),
          (l = 0 == e ? 0 : e / f),
          { h: d, s: l, b: f, toString: ta }
        );
      };
      a.rgb2hsl = function (a, b, c) {
        c = wa(a, b, c);
        a = c[0];
        b = c[1];
        c = c[2];
        var d, l, f, e, F, A;
        return (
          (e = V(a, b, c)),
          (F = Y(a, b, c)),
          (A = e - F),
          (d =
            0 == A
              ? null
              : e == a
              ? (b - c) / A
              : e == b
              ? (c - a) / A + 2
              : (a - b) / A + 4),
          (d = (((d + 360) % 6) * 60) / 360),
          (f = (e + F) / 2),
          (l = 0 == A ? 0 : 0.5 > f ? A / (2 * f) : A / (2 - 2 * f)),
          { h: d, s: l, l: f, toString: Ea }
        );
      };
      a.parsePathString = function (b) {
        if (!b) return null;
        var c = a.path(b);
        if (c.arr) return a.path.clone(c.arr);
        var l = {
            a: 7,
            c: 6,
            o: 2,
            h: 1,
            l: 2,
            m: 2,
            r: 4,
            q: 4,
            s: 4,
            t: 2,
            v: 1,
            u: 3,
            z: 0,
          },
          f = [];
        return (
          d(b, "array") && d(b[0], "array") && (f = a.path.clone(b)),
          f.length ||
            D(b).replace(ra, function (a, b, c) {
              var d = [];
              a = b.toLowerCase();
              if (
                (c.replace(va, function (a, b) {
                  b && d.push(+b);
                }),
                "m" == a &&
                  2 < d.length &&
                  (f.push([b].concat(d.splice(0, 2))),
                  (a = "l"),
                  (b = "m" == b ? "l" : "L")),
                "o" == a && 1 == d.length && f.push([b, d[0]]),
                "r" == a)
              )
                f.push([b].concat(d));
              else
                for (
                  ;
                  d.length >= l[a] &&
                  (f.push([b].concat(d.splice(0, l[a]))), l[a]);

                );
            }),
          (f.toString = a.path.toString),
          (c.arr = a.path.clone(f)),
          f
        );
      };
      var za = (a.parseTransformString = function (b) {
        if (!b) return null;
        var c = [];
        return (
          d(b, "array") && d(b[0], "array") && (c = a.path.clone(b)),
          c.length ||
            D(b).replace(Ba, function (a, b, d) {
              var l = [];
              b.toLowerCase();
              d.replace(va, function (a, b) {
                b && l.push(+b);
              });
              c.push([b].concat(l));
            }),
          (c.toString = a.path.toString),
          c
        );
      });
      a._.svgTransform2string = H;
      a._.rgTransform = RegExp(
        "^[a-z][  \n\x0B\f\r \u00a0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*-?\\.?\\d",
        "i"
      );
      a._.transform2matrix = B;
      a._unit2px = t;
      var Aa =
        M.doc.contains || M.doc.compareDocumentPosition
          ? function (a, b) {
              var c = 9 == a.nodeType ? a.documentElement : a,
                d = b && b.parentNode;
              return (
                a == d ||
                !(
                  !d ||
                  1 != d.nodeType ||
                  !(c.contains
                    ? c.contains(d)
                    : a.compareDocumentPosition &&
                      16 & a.compareDocumentPosition(d))
                )
              );
            }
          : function (a, b) {
              if (b) for (; b; ) if (((b = b.parentNode), b == a)) return !0;
              return !1;
            };
      a._.getSomeDefs = r;
      a.select = function (a) {
        return C(M.doc.querySelector(a));
      };
      a.selectAll = function (b) {
        b = M.doc.querySelectorAll(b);
        for (var c = (a.set || Array)(), d = 0; d < b.length; d++)
          c.push(C(b[d]));
        return c;
      };
      (function (l) {
        function f(a) {
          function b(a, d) {
            var l = c(a.node, d);
            (l = (l = l && l.match(A)) && l[2]) &&
              "#" == l.charAt() &&
              ((l = l.substring(1)),
              l &&
                (k[l] = (k[l] || []).concat(function (b) {
                  var l = {};
                  l[d] = na(b);
                  c(a.node, l);
                })));
          }
          function d(a) {
            var b = c(a.node, "xlink:href");
            b &&
              "#" == b.charAt() &&
              ((b = b.substring(1)),
              b &&
                (k[b] = (k[b] || []).concat(function (b) {
                  a.attr("xlink:href", "#" + b);
                })));
          }
          var l,
            e = a.selectAll("*"),
            A = /^\s*url\(("|'|)(.*)\1\)\s*$/;
          a = [];
          for (var k = {}, z = 0, h = e.length; h > z; z++) {
            l = e[z];
            b(l, "fill");
            b(l, "stroke");
            b(l, "filter");
            b(l, "mask");
            b(l, "clip-path");
            d(l);
            var n = c(l.node, "id");
            n && (c(l.node, { id: l.id }), a.push({ old: n, id: l.id }));
          }
          z = 0;
          for (h = a.length; h > z; z++)
            if ((l = k[a[z].old]))
              for (e = 0, n = l.length; n > e; e++) l[e](a[z].id);
        }
        function e(a, b, c) {
          return function (d) {
            d = d.slice(a, b);
            return 1 == d.length && (d = d[0]), c ? c(d) : d;
          };
        }
        function A(a) {
          return function () {
            var b = a ? "<" + this.type : "",
              c = this.node.attributes,
              d = this.node.childNodes;
            if (a)
              for (var l = 0, f = c.length; f > l; l++)
                b +=
                  " " +
                  c[l].name +
                  '="' +
                  c[l].value.replace(/"/g, '\\"') +
                  '"';
            if (d.length) {
              a && (b += ">");
              l = 0;
              for (f = d.length; f > l; l++)
                3 == d[l].nodeType
                  ? (b += d[l].nodeValue)
                  : 1 == d[l].nodeType && (b += C(d[l]).toString());
              a && (b += "</" + this.type + ">");
            } else a && (b += "/>");
            return b;
          };
        }
        l.attr = function (a, b) {
          if ((this.node, !a)) return this;
          if (d(a, "string")) {
            if (!(1 < arguments.length))
              return K(h("snap.util.getattr." + a, this));
            var c = {};
            c[a] = b;
            a = c;
          }
          for (var l in a) a[P](l) && h("snap.util.attr." + l, this, a[l]);
          return this;
        };
        l.getBBox = function (b) {
          var c = this;
          if (("use" == c.type && (c = c.original), c.removed)) return {};
          var d = c._;
          return b
            ? ((d.bboxwt = a.path.get[c.type]
                ? a.path.getBBox((c.realPath = a.path.get[c.type](c)))
                : a._.box(c.node.getBBox())),
              a._.box(d.bboxwt))
            : ((c.realPath = (a.path.get[c.type] || a.path.get.deflt)(c)),
              (d.bbox = a.path.getBBox(a.path.map(c.realPath, c.matrix))),
              a._.box(d.bbox));
        };
        var k = function () {
          return this.string;
        };
        l.transform = function (a) {
          var b = this._;
          if (null == a) {
            a = new u(this.node.getCTM());
            var d = E(this),
              l = d.toTransformString();
            return {
              string: D(d) == D(this.matrix) ? b.transform : l,
              globalMatrix: a,
              localMatrix: d,
              diffMatrix: a.clone().add(d.invert()),
              global: a.toTransformString(),
              local: l,
              toString: k,
            };
          }
          return (
            a instanceof u && (a = a.toTransformString()),
            E(this, a),
            this.node &&
              ("linearGradient" == this.type || "radialGradient" == this.type
                ? c(this.node, { gradientTransform: this.matrix })
                : "pattern" == this.type
                ? c(this.node, { patternTransform: this.matrix })
                : c(this.node, { transform: this.matrix })),
            this
          );
        };
        l.parent = function () {
          return C(this.node.parentNode);
        };
        l.append = l.add = function (a) {
          if (a) {
            if ("set" == a.type) {
              var b = this;
              return (
                a.forEach(function (a) {
                  b.add(a);
                }),
                this
              );
            }
            a = C(a);
            this.node.appendChild(a.node);
            a.paper = this.paper;
          }
          return this;
        };
        l.appendTo = function (a) {
          return a && ((a = C(a)), a.append(this)), this;
        };
        l.prepend = function (a) {
          if (a) {
            a = C(a);
            var b = a.parent();
            this.node.insertBefore(a.node, this.node.firstChild);
            this.add && this.add();
            a.paper = this.paper;
            this.parent() && this.parent().add();
            b && b.add();
          }
          return this;
        };
        l.prependTo = function (a) {
          return (a = C(a)), a.prepend(this), this;
        };
        l.before = function (a) {
          if ("set" == a.type) {
            var b = this;
            return (
              a.forEach(function (a) {
                var c = a.parent();
                b.node.parentNode.insertBefore(a.node, b.node);
                c && c.add();
              }),
              this.parent().add(),
              this
            );
          }
          a = C(a);
          var c = a.parent();
          return (
            this.node.parentNode.insertBefore(a.node, this.node),
            this.parent() && this.parent().add(),
            c && c.add(),
            (a.paper = this.paper),
            this
          );
        };
        l.after = function (a) {
          a = C(a);
          var b = a.parent();
          return (
            this.node.nextSibling
              ? this.node.parentNode.insertBefore(a.node, this.node.nextSibling)
              : this.node.parentNode.appendChild(a.node),
            this.parent() && this.parent().add(),
            b && b.add(),
            (a.paper = this.paper),
            this
          );
        };
        l.insertBefore = function (a) {
          a = C(a);
          var b = this.parent();
          return (
            a.node.parentNode.insertBefore(this.node, a.node),
            (this.paper = a.paper),
            b && b.add(),
            a.parent() && a.parent().add(),
            this
          );
        };
        l.insertAfter = function (a) {
          a = C(a);
          var b = this.parent();
          return (
            a.node.parentNode.insertBefore(this.node, a.node.nextSibling),
            (this.paper = a.paper),
            b && b.add(),
            a.parent() && a.parent().add(),
            this
          );
        };
        l.remove = function () {
          var a = this.parent();
          return (
            this.node.parentNode && this.node.parentNode.removeChild(this.node),
            delete this.paper,
            (this.removed = !0),
            a && a.add(),
            this
          );
        };
        l.select = function (a) {
          return C(this.node.querySelector(a));
        };
        l.selectAll = function (b) {
          b = this.node.querySelectorAll(b);
          for (var c = (a.set || Array)(), d = 0; d < b.length; d++)
            c.push(C(b[d]));
          return c;
        };
        l.asPX = function (a, b) {
          return null == b && (b = this.attr(a)), +t(this, a, b);
        };
        l.use = function () {
          var a,
            b = this.node.id;
          return (
            b || ((b = this.id), c(this.node, { id: b })),
            (a =
              "linearGradient" == this.type ||
              "radialGradient" == this.type ||
              "pattern" == this.type
                ? w(this.type, this.node.parentNode)
                : w("use", this.node.parentNode)),
            c(a.node, { "xlink:href": "#" + b }),
            (a.original = this),
            a
          );
        };
        l.clone = function () {
          var a = C(this.node.cloneNode(!0));
          return (
            c(a.node, "id") && c(a.node, { id: a.id }),
            f(a),
            a.insertAfter(this),
            a
          );
        };
        l.toDefs = function () {
          return r(this).appendChild(this.node), this;
        };
        l.pattern = function (a, b, l, f) {
          var e = w("pattern", r(this));
          return (
            null == a && (a = this.getBBox()),
            d(a, "object") &&
              "x" in a &&
              ((b = a.y), (l = a.width), (f = a.height), (a = a.x)),
            c(e.node, {
              x: a,
              y: b,
              width: l,
              height: f,
              patternUnits: "userSpaceOnUse",
              id: e.id,
              viewBox: [a, b, l, f].join(" "),
            }),
            e.node.appendChild(this.node),
            e
          );
        };
        l.marker = function (a, b, l, f, e, A) {
          var z = w("marker", r(this));
          return (
            null == a && (a = this.getBBox()),
            d(a, "object") &&
              "x" in a &&
              ((b = a.y),
              (l = a.width),
              (f = a.height),
              (e = a.refX || a.cx),
              (A = a.refY || a.cy),
              (a = a.x)),
            c(z.node, {
              viewBox: [a, b, l, f].join(" "),
              markerWidth: l,
              markerHeight: f,
              orient: "auto",
              refX: e || 0,
              refY: A || 0,
              id: z.id,
            }),
            z.node.appendChild(this.node),
            z
          );
        };
        var y = function (a, c, d, l) {
          "function" != typeof d || d.length || ((l = d), (d = b.linear));
          this.attr = a;
          this.dur = c;
          d && (this.easing = d);
          l && (this.callback = l);
        };
        a.animation = function (a, b, c, d) {
          return new y(a, b, c, d);
        };
        l.inAnim = function () {
          var a = [],
            b;
          for (b in this.anims)
            this.anims[P](b) &&
              !(function (b) {
                a.push({
                  anim: new y(b._attrs, b.dur, b.easing, b._callback),
                  curStatus: b.status(),
                  status: function (a) {
                    return b.status(a);
                  },
                  stop: function () {
                    b.stop();
                  },
                });
              })(this.anims[b]);
          return a;
        };
        a.animate = function (a, c, d, l, f, e) {
          "function" != typeof f || f.length || ((e = f), (f = b.linear));
          var A = b.time();
          a = b(a, c, A, A + l, b.time, d, f);
          return e && h.once("mina.finish." + a.id, e), a;
        };
        l.stop = function () {
          for (var a = this.inAnim(), b = 0, c = a.length; c > b; b++)
            a[b].stop();
          return this;
        };
        l.animate = function (a, c, l, f) {
          "function" != typeof l || l.length || ((f = l), (l = b.linear));
          a instanceof y &&
            ((f = a.callback), (l = a.easing), (c = l.dur), (a = a.attr));
          var A,
            z,
            k,
            da,
            Q = [],
            m = [],
            x = {},
            ga = this,
            ia;
          for (ia in a)
            if (a[P](ia)) {
              ga.equal
                ? ((da = ga.equal(ia, D(a[ia]))),
                  (A = da.from),
                  (z = da.to),
                  (k = da.f))
                : ((A = +ga.attr(ia)), (z = +a[ia]));
              var ra = d(A, "array") ? A.length : 1;
              x[ia] = e(Q.length, Q.length + ra, k);
              Q = Q.concat(A);
              m = m.concat(z);
            }
          A = b.time();
          var p = b(
            Q,
            m,
            A,
            A + c,
            b.time,
            function (a) {
              var b = {},
                c;
              for (c in x) x[P](c) && (b[c] = x[c](a));
              ga.attr(b);
            },
            l
          );
          return (
            (ga.anims[p.id] = p),
            (p._attrs = a),
            (p._callback = f),
            h.once("mina.finish." + p.id, function () {
              delete ga.anims[p.id];
              f && f.call(ga);
            }),
            h.once("mina.stop." + p.id, function () {
              delete ga.anims[p.id];
            }),
            ga
          );
        };
        var Q = {};
        l.data = function (b, c) {
          var d = (Q[this.id] = Q[this.id] || {});
          if (0 == arguments.length)
            return h("snap.data.get." + this.id, this, d, null), d;
          if (1 == arguments.length) {
            if (a.is(b, "object")) {
              for (var l in b) b[P](l) && this.data(l, b[l]);
              return this;
            }
            return h("snap.data.get." + this.id, this, d[b], b), d[b];
          }
          return (d[b] = c), h("snap.data.set." + this.id, this, c, b), this;
        };
        l.removeData = function (a) {
          return (
            null == a ? (Q[this.id] = {}) : Q[this.id] && delete Q[this.id][a],
            this
          );
        };
        l.outerSVG = l.toString = A(1);
        l.innerSVG = A();
      })(v.prototype);
      a.parse = function (a) {
        var b = M.doc.createDocumentFragment(),
          c = !0,
          d = M.doc.createElement("div");
        if (
          ((a = D(a)),
          a.match(/^\s*<\s*svg(?:\s|>)/) ||
            ((a = "<svg>" + a + "</svg>"), (c = !1)),
          (d.innerHTML = a),
          (a = d.getElementsByTagName("svg")[0]))
        )
          if (c) b = a;
          else for (; a.firstChild; ) b.appendChild(a.firstChild);
        return (d.innerHTML = R), new I(b);
      };
      I.prototype.select = v.prototype.select;
      I.prototype.selectAll = v.prototype.selectAll;
      a.fragment = function () {
        for (
          var b = Array.prototype.slice.call(arguments, 0),
            c = M.doc.createDocumentFragment(),
            d = 0,
            l = b.length;
          l > d;
          d++
        ) {
          var f = b[d];
          f.node && f.node.nodeType && c.appendChild(f.node);
          f.nodeType && c.appendChild(f);
          "string" == typeof f && c.appendChild(a.parse(f).node);
        }
        return new I(c);
      };
      (function (a) {
        a.el = function (a, b) {
          return w(a, this.node).attr(b);
        };
        a.rect = function (a, b, c, l, f, e) {
          var A;
          return (
            null == e && (e = f),
            d(a, "object") && "x" in a
              ? (A = a)
              : null != a &&
                ((A = { x: a, y: b, width: c, height: l }),
                null != f && ((A.rx = f), (A.ry = e))),
            this.el("rect", A)
          );
        };
        a.circle = function (a, b, c) {
          var l;
          return (
            d(a, "object") && "cx" in a
              ? (l = a)
              : null != a && (l = { cx: a, cy: b, r: c }),
            this.el("circle", l)
          );
        };
        a.image = function (a, b, l, f, e) {
          var A = w("image", this.node);
          if (d(a, "object") && "src" in a) A.attr(a);
          else if (null != a) {
            var k = { "xlink:href": a, preserveAspectRatio: "none" };
            null != b && null != l && ((k.x = b), (k.y = l));
            null != f && null != e
              ? ((k.width = f), (k.height = e))
              : Da(a, function () {
                  c(A.node, {
                    width: this.offsetWidth,
                    height: this.offsetHeight,
                  });
                });
            c(A.node, k);
          }
          return A;
        };
        a.ellipse = function (a, b, c, l) {
          var f = w("ellipse", this.node);
          return (
            d(a, "object") && "cx" in a
              ? f.attr(a)
              : null != a && f.attr({ cx: a, cy: b, rx: c, ry: l }),
            f
          );
        };
        a.path = function (a) {
          var b = w("path", this.node);
          return (
            d(a, "object") && !d(a, "array")
              ? b.attr(a)
              : a && b.attr({ d: a }),
            b
          );
        };
        a.group = a.g = function (b) {
          var c = w("g", this.node);
          c.add = L;
          for (var d in a) a[P](d) && (c[d] = a[d]);
          return (
            1 == arguments.length && b && !b.type
              ? c.attr(b)
              : arguments.length &&
                c.add(Array.prototype.slice.call(arguments, 0)),
            c
          );
        };
        a.text = function (a, b, c) {
          var l = w("text", this.node);
          return (
            d(a, "object")
              ? l.attr(a)
              : null != a && l.attr({ x: a, y: b, text: c || "" }),
            l
          );
        };
        a.line = function (a, b, c, l) {
          var f = w("line", this.node);
          return (
            d(a, "object")
              ? f.attr(a)
              : null != a && f.attr({ x1: a, x2: c, y1: b, y2: l }),
            f
          );
        };
        a.polyline = function (a) {
          1 < arguments.length &&
            (a = Array.prototype.slice.call(arguments, 0));
          var b = w("polyline", this.node);
          return (
            d(a, "object") && !d(a, "array")
              ? b.attr(a)
              : null != a && b.attr({ points: a }),
            b
          );
        };
        a.polygon = function (a) {
          1 < arguments.length &&
            (a = Array.prototype.slice.call(arguments, 0));
          var b = w("polygon", this.node);
          return (
            d(a, "object") && !d(a, "array")
              ? b.attr(a)
              : null != a && b.attr({ points: a }),
            b
          );
        };
        (function () {
          a.gradient = function (a) {
            return S(this.defs, a);
          };
          a.gradientLinear = function (a, b, c, d) {
            return aa(this.defs, a, b, c, d);
          };
          a.gradientRadial = function (a, b, c, d, l) {
            return ha(this.defs, a, b, c, d, l);
          };
          a.toString = function () {
            var a,
              b = M.doc.createDocumentFragment(),
              d = M.doc.createElement("div"),
              l = this.node.cloneNode(!0);
            return (
              b.appendChild(d),
              d.appendChild(l),
              c(l, { xmlns: oa }),
              (a = d.innerHTML),
              b.removeChild(b.firstChild),
              a
            );
          };
          a.clear = function () {
            for (var a, b = this.node.firstChild; b; )
              (a = b.nextSibling),
                "defs" != b.tagName && b.parentNode.removeChild(b),
                (b = a);
          };
        })();
      })(T.prototype);
      a.ajax = function (a, b, c, l) {
        var f = new XMLHttpRequest(),
          e = Z();
        if (f) {
          if (d(b, "function")) (l = c), (c = b), (b = null);
          else if (d(b, "object")) {
            var A = [],
              k;
            for (k in b)
              b.hasOwnProperty(k) &&
                A.push(encodeURIComponent(k) + "=" + encodeURIComponent(b[k]));
            b = A.join("&");
          }
          return (
            f.open(b ? "POST" : "GET", a, !0),
            f.setRequestHeader("X-Requested-With", "XMLHttpRequest"),
            b &&
              f.setRequestHeader(
                "Content-type",
                "application/x-www-form-urlencoded"
              ),
            c &&
              (h.once("snap.ajax." + e + ".0", c),
              h.once("snap.ajax." + e + ".200", c),
              h.once("snap.ajax." + e + ".304", c)),
            (f.onreadystatechange = function () {
              4 == f.readyState && h("snap.ajax." + e + "." + f.status, l, f);
            }),
            4 == f.readyState ? f : (f.send(b), f)
          );
        }
      };
      a.load = function (b, c, d) {
        a.ajax(b, function (b) {
          b = a.parse(b.responseText);
          d ? c.call(d, b) : c(b);
        });
      };
      h.on("snap.util.attr.mask", function (a) {
        if (a instanceof v || a instanceof I) {
          if (
            (h.stop(),
            a instanceof I &&
              1 == a.node.childNodes.length &&
              ((a = a.node.firstChild), r(this).appendChild(a), (a = C(a))),
            "mask" == a.type)
          )
            var b = a;
          else
            (b = w("mask", r(this))),
              b.node.appendChild(a.node),
              !b.node.id && c(b.node, { id: b.id });
          c(this.node, { mask: na(b.id) });
        }
      });
      (function (a) {
        h.on("snap.util.attr.clip", a);
        h.on("snap.util.attr.clip-path", a);
        h.on("snap.util.attr.clipPath", a);
      })(function (a) {
        if (a instanceof v || a instanceof I) {
          if ((h.stop(), "clipPath" == a.type)) var b = a;
          else
            (b = w("clipPath", r(this))),
              b.node.appendChild(a.node),
              !b.node.id && c(b.node, { id: b.id });
          c(this.node, { "clip-path": na(b.id) });
        }
      });
      h.on("snap.util.attr.fill", U("fill"));
      h.on("snap.util.attr.stroke", U("stroke"));
      var Fa = /^([lr])(?:\(([^)]*)\))?(.*)$/i;
      h.on("snap.util.grad.parse", function (a) {
        a = D(a);
        var b = a.match(Fa);
        if (!b) return null;
        a = b[1];
        var c = b[2],
          b = b[3];
        return (
          (c = c.split(/\s*,\s*/).map(function (a) {
            return +a == a ? +a : a;
          })),
          1 == c.length && 0 == c[0] && (c = []),
          (b = b.split("-")),
          (b = b.map(function (a) {
            a = a.split(":");
            var b = { color: a[0] };
            return a[1] && (b.offset = a[1]), b;
          })),
          { type: a, params: c, stops: b }
        );
      });
      h.on("snap.util.attr.d", function (b) {
        h.stop();
        d(b, "array") && d(b[0], "array") && (b = a.path.toString.call(b));
        b = D(b);
        b.match(/[ruo]/i) && (b = a.path.toAbsolute(b));
        c(this.node, { d: b });
      })(-1);
      h.on("snap.util.attr.#text", function (a) {
        h.stop();
        a = D(a);
        for (a = M.doc.createTextNode(a); this.node.firstChild; )
          this.node.removeChild(this.node.firstChild);
        this.node.appendChild(a);
      })(-1);
      h.on("snap.util.attr.path", function (a) {
        h.stop();
        this.attr({ d: a });
      })(-1);
      h.on("snap.util.attr.viewBox", function (a) {
        a =
          d(a, "object") && "x" in a
            ? [a.x, a.y, a.width, a.height].join(" ")
            : d(a, "array")
            ? a.join(" ")
            : a;
        c(this.node, { viewBox: a });
        h.stop();
      })(-1);
      h.on("snap.util.attr.transform", function (a) {
        this.transform(a);
        h.stop();
      })(-1);
      h.on("snap.util.attr.r", function (a) {
        "rect" == this.type && (h.stop(), c(this.node, { rx: a, ry: a }));
      })(-1);
      h.on("snap.util.attr.textpath", function (a) {
        if ((h.stop(), "text" == this.type)) {
          var b, l;
          if (!a && this.textPath) {
            for (l = this.textPath; l.node.firstChild; )
              this.node.appendChild(l.node.firstChild);
            return l.remove(), delete this.textPath, void 0;
          }
          d(a, "string")
            ? ((b = r(this)),
              (a = C(b.parentNode).path(a)),
              b.appendChild(a.node),
              (b = a.id),
              a.attr({ id: b }))
            : ((a = C(a)),
              a instanceof v &&
                ((b = a.attr("id")), b || ((b = a.id), a.attr({ id: b }))));
          if (b)
            if (((l = this.textPath), (a = this.node), l))
              l.attr({ "xlink:href": "#" + b });
            else {
              for (l = c("textPath", { "xlink:href": "#" + b }); a.firstChild; )
                l.appendChild(a.firstChild);
              a.appendChild(l);
              this.textPath = C(l);
            }
        }
      })(-1);
      h.on("snap.util.attr.text", function (a) {
        if ("text" == this.type) {
          for (
            var b = this.node,
              l = function (a) {
                var b = c("tspan");
                if (d(a, "array"))
                  for (var f = 0; f < a.length; f++) b.appendChild(l(a[f]));
                else b.appendChild(M.doc.createTextNode(a));
                return b.normalize && b.normalize(), b;
              };
            b.firstChild;

          )
            b.removeChild(b.firstChild);
          for (a = l(a); a.firstChild; ) b.appendChild(a.firstChild);
        }
        h.stop();
      })(-1);
      var ya = {
        "alignment-baseline": 0,
        "baseline-shift": 0,
        clip: 0,
        "clip-path": 0,
        "clip-rule": 0,
        color: 0,
        "color-interpolation": 0,
        "color-interpolation-filters": 0,
        "color-profile": 0,
        "color-rendering": 0,
        cursor: 0,
        direction: 0,
        display: 0,
        "dominant-baseline": 0,
        "enable-background": 0,
        fill: 0,
        "fill-opacity": 0,
        "fill-rule": 0,
        filter: 0,
        "flood-color": 0,
        "flood-opacity": 0,
        font: 0,
        "font-family": 0,
        "font-size": 0,
        "font-size-adjust": 0,
        "font-stretch": 0,
        "font-style": 0,
        "font-variant": 0,
        "font-weight": 0,
        "glyph-orientation-horizontal": 0,
        "glyph-orientation-vertical": 0,
        "image-rendering": 0,
        kerning: 0,
        "letter-spacing": 0,
        "lighting-color": 0,
        marker: 0,
        "marker-end": 0,
        "marker-mid": 0,
        "marker-start": 0,
        mask: 0,
        opacity: 0,
        overflow: 0,
        "pointer-events": 0,
        "shape-rendering": 0,
        "stop-color": 0,
        "stop-opacity": 0,
        stroke: 0,
        "stroke-dasharray": 0,
        "stroke-dashoffset": 0,
        "stroke-linecap": 0,
        "stroke-linejoin": 0,
        "stroke-miterlimit": 0,
        "stroke-opacity": 0,
        "stroke-width": 0,
        "text-anchor": 0,
        "text-decoration": 0,
        "text-rendering": 0,
        "unicode-bidi": 0,
        visibility: 0,
        "word-spacing": 0,
        "writing-mode": 0,
      };
      h.on("snap.util.attr", function (a) {
        var b = h.nt(),
          d = {},
          b = b.substring(b.lastIndexOf(".") + 1);
        d[b] = a;
        var l = b.replace(/-(\w)/gi, function (a, b) {
            return b.toUpperCase();
          }),
          b = b.replace(/[A-Z]/g, function (a) {
            return "-" + a.toLowerCase();
          });
        ya[P](b) ? (this.node.style[l] = null == a ? R : a) : c(this.node, d);
      });
      h.on("snap.util.getattr.transform", function () {
        return h.stop(), this.transform();
      })(-1);
      h.on("snap.util.getattr.textpath", function () {
        return h.stop(), this.textPath;
      })(-1);
      (function () {
        function b(c) {
          return function () {
            h.stop();
            var b = M.doc.defaultView
              .getComputedStyle(this.node, null)
              .getPropertyValue("marker-" + c);
            return "none" == b ? b : a(M.doc.getElementById(b.match(ia)[1]));
          };
        }
        function d(a) {
          return function (b) {
            h.stop();
            var d = "marker" + a.charAt(0).toUpperCase() + a.substring(1);
            if ("" == b || !b) return (this.node.style[d] = "none"), void 0;
            if ("marker" == b.type) {
              var l = b.node.id;
              return (
                l || c(b.node, { id: b.id }),
                (this.node.style[d] = na(l)),
                void 0
              );
            }
          };
        }
        h.on("snap.util.getattr.marker-end", b("end"))(-1);
        h.on("snap.util.getattr.markerEnd", b("end"))(-1);
        h.on("snap.util.getattr.marker-start", b("start"))(-1);
        h.on("snap.util.getattr.markerStart", b("start"))(-1);
        h.on("snap.util.getattr.marker-mid", b("mid"))(-1);
        h.on("snap.util.getattr.markerMid", b("mid"))(-1);
        h.on("snap.util.attr.marker-end", d("end"))(-1);
        h.on("snap.util.attr.markerEnd", d("end"))(-1);
        h.on("snap.util.attr.marker-start", d("start"))(-1);
        h.on("snap.util.attr.markerStart", d("start"))(-1);
        h.on("snap.util.attr.marker-mid", d("mid"))(-1);
        h.on("snap.util.attr.markerMid", d("mid"))(-1);
      })();
      h.on("snap.util.getattr.r", function () {
        return "rect" == this.type && c(this.node, "rx") == c(this.node, "ry")
          ? (h.stop(), c(this.node, "rx"))
          : void 0;
      })(-1);
      h.on("snap.util.getattr.text", function () {
        if ("text" == this.type || "tspan" == this.type) {
          h.stop();
          var a = ca(this.node);
          return 1 == a.length ? a[0] : a;
        }
      })(-1);
      h.on("snap.util.getattr.#text", function () {
        return this.node.textContent;
      })(-1);
      h.on("snap.util.getattr.viewBox", function () {
        h.stop();
        var b = c(this.node, "viewBox").split(Q);
        return a._.box(+b[0], +b[1], +b[2], +b[3]);
      })(-1);
      h.on("snap.util.getattr.points", function () {
        var a = c(this.node, "points");
        return h.stop(), a.split(Q);
      });
      h.on("snap.util.getattr.path", function () {
        var a = c(this.node, "d");
        return h.stop(), a;
      });
      h.on("snap.util.getattr", function () {
        var a = h.nt(),
          a = a.substring(a.lastIndexOf(".") + 1),
          b = a.replace(/[A-Z]/g, function (a) {
            return "-" + a.toLowerCase();
          });
        return ya[P](b)
          ? M.doc.defaultView
              .getComputedStyle(this.node, null)
              .getPropertyValue(b)
          : c(this.node, a);
      });
      return (
        (a.getElementByPoint = function (a, b) {
          var c,
            d,
            l = (this.canvas, M.doc.elementFromPoint(a, b));
          if (M.win.opera && "svg" == l.tagName) {
            c = l;
            d = c.getBoundingClientRect();
            c = c.ownerDocument;
            var f = c.body,
              e = c.documentElement;
            c =
              d.top +
              (g.win.pageYOffset || e.scrollTop || f.scrollTop) -
              (e.clientTop || f.clientTop || 0);
            d =
              d.left +
              (g.win.pageXOffset || e.scrollLeft || f.scrollLeft) -
              (e.clientLeft || f.clientLeft || 0);
            f = l.createSVGRect();
            f.x = a - d;
            f.y = b - c;
            f.width = f.height = 1;
            c = l.getIntersectionList(f, null);
            c.length && (l = c[c.length - 1]);
          }
          return l ? C(l) : null;
        }),
        (a.plugin = function (b) {
          b(a, v, T, M);
        }),
        (M.win.Snap = a),
        a
      );
    })();
  return (
    d.plugin(function (a, b) {
      function d(a) {
        var b = (d.ps = d.ps || {});
        return (
          b[a] ? (b[a].sleep = 100) : (b[a] = { sleep: 100 }),
          setTimeout(function () {
            for (var c in b)
              b[ca](c) && c != a && (b[c].sleep--, !b[c].sleep && delete b[c]);
          }),
          b[a]
        );
      }
      function e(a, b, c, d) {
        return (
          null == a && (a = b = c = d = 0),
          null == b && ((b = a.y), (c = a.width), (d = a.height), (a = a.x)),
          {
            x: a,
            y: b,
            width: c,
            w: c,
            height: d,
            h: d,
            x2: a + c,
            y2: b + d,
            cx: a + c / 2,
            cy: b + d / 2,
            r1: D.min(c, d) / 2,
            r2: D.max(c, d) / 2,
            r0: D.sqrt(c * c + d * d) / 2,
            path: v(a, b, c, d),
            vb: [a, b, c, d].join(" "),
          }
        );
      }
      function h() {
        return this.join(",").replace(M, "$1");
      }
      function m(a) {
        a = U(a);
        return (a.toString = h), a;
      }
      function f(a, b, c, d, f, e, k, h, n) {
        if (null == n) a = r(a, b, c, d, f, e, k, h);
        else {
          if (0 > n || r(a, b, c, d, f, e, k, h) < n) n = void 0;
          else {
            var m,
              p = 0.5,
              q = 1 - p;
            for (m = r(a, b, c, d, f, e, k, h, q); 0.01 < Y(m - n); )
              (p /= 2),
                (q += (n > m ? 1 : -1) * p),
                (m = r(a, b, c, d, f, e, k, h, q));
            n = q;
          }
          a = u(a, b, c, d, f, e, k, h, n);
        }
        return a;
      }
      function q(d, e) {
        function k(a) {
          return +(+a).toFixed(3);
        }
        return a._.cacher(
          function (a, h, n) {
            a instanceof b && (a = a.attr("d"));
            a = G(a);
            for (
              var m, p, y, q, Z, t = "", r = {}, w = 0, I = 0, v = a.length;
              v > I;
              I++
            ) {
              if (((y = a[I]), "M" == y[0])) (m = +y[1]), (p = +y[2]);
              else {
                if (
                  ((q = f(m, p, y[1], y[2], y[3], y[4], y[5], y[6])), w + q > h)
                ) {
                  if (e && !r.start) {
                    if (
                      ((Z = f(m, p, y[1], y[2], y[3], y[4], y[5], y[6], h - w)),
                      (t += [
                        "C" + k(Z.start.x),
                        k(Z.start.y),
                        k(Z.m.x),
                        k(Z.m.y),
                        k(Z.x),
                        k(Z.y),
                      ]),
                      n)
                    )
                      return t;
                    r.start = t;
                    t = [
                      "M" + k(Z.x),
                      k(Z.y) + "C" + k(Z.n.x),
                      k(Z.n.y),
                      k(Z.end.x),
                      k(Z.end.y),
                      k(y[5]),
                      k(y[6]),
                    ].join();
                    w += q;
                    m = +y[5];
                    p = +y[6];
                    continue;
                  }
                  if (!d && !e)
                    return f(m, p, y[1], y[2], y[3], y[4], y[5], y[6], h - w);
                }
                w += q;
                m = +y[5];
                p = +y[6];
              }
              t += y.shift() + y;
            }
            return (
              (r.end = t),
              d ? w : e ? r : u(m, p, y[0], y[1], y[2], y[3], y[4], y[5], 1)
            );
          },
          null,
          a._.clone
        );
      }
      function u(a, b, c, d, f, e, k, h, n) {
        var m = 1 - n,
          p = V(m, 3),
          q = V(m, 2),
          t = n * n,
          r = t * n,
          G = p * a + 3 * q * n * c + 3 * m * n * n * f + r * k,
          p = p * b + 3 * q * n * d + 3 * m * n * n * e + r * h,
          q = a + 2 * n * (c - a) + t * (f - 2 * c + a),
          r = b + 2 * n * (d - b) + t * (e - 2 * d + b),
          w = c + 2 * n * (f - c) + t * (k - 2 * f + c),
          t = d + 2 * n * (e - d) + t * (h - 2 * e + d);
        a = m * a + n * c;
        b = m * b + n * d;
        f = m * f + n * k;
        e = m * e + n * h;
        h = 90 - (180 * D.atan2(q - w, r - t)) / O;
        return {
          x: G,
          y: p,
          m: { x: q, y: r },
          n: { x: w, y: t },
          start: { x: a, y: b },
          end: { x: f, y: e },
          alpha: h,
        };
      }
      function H(b, c, d, f, h, n, m, p) {
        a.is(b, "array") || (b = [b, c, d, f, h, n, m, p]);
        b = N.apply(null, b);
        return e(b.min.x, b.min.y, b.max.x - b.min.x, b.max.y - b.min.y);
      }
      function B(a, b, c) {
        return (
          b >= a.x && b <= a.x + a.width && c >= a.y && c <= a.y + a.height
        );
      }
      function E(a, b) {
        return (
          (a = e(a)),
          (b = e(b)),
          B(b, a.x, a.y) ||
            B(b, a.x2, a.y) ||
            B(b, a.x, a.y2) ||
            B(b, a.x2, a.y2) ||
            B(a, b.x, b.y) ||
            B(a, b.x2, b.y) ||
            B(a, b.x, b.y2) ||
            B(a, b.x2, b.y2) ||
            (((a.x < b.x2 && a.x > b.x) || (b.x < a.x2 && b.x > a.x)) &&
              ((a.y < b.y2 && a.y > b.y) || (b.y < a.y2 && b.y > a.y)))
        );
      }
      function r(a, b, c, d, f, e, k, h, n) {
        null == n && (n = 1);
        n = (1 < n ? 1 : 0 > n ? 0 : n) / 2;
        for (
          var m = [
              -0.1252, 0.1252, -0.3678, 0.3678, -0.5873, 0.5873, -0.7699,
              0.7699, -0.9041, 0.9041, -0.9816, 0.9816,
            ],
            p = [
              0.2491, 0.2491, 0.2335, 0.2335, 0.2032, 0.2032, 0.1601, 0.1601,
              0.1069, 0.1069, 0.0472, 0.0472,
            ],
            q = 0,
            t = 0;
          12 > t;
          t++
        )
          var r = n * m[t] + n,
            G =
              r *
                (r * (-3 * a + 9 * c - 9 * f + 3 * k) +
                  6 * a -
                  12 * c +
                  6 * f) -
              3 * a +
              3 * c,
            r =
              r *
                (r * (-3 * b + 9 * d - 9 * e + 3 * h) +
                  6 * b -
                  12 * d +
                  6 * e) -
              3 * b +
              3 * d,
            q = q + p[t] * D.sqrt(G * G + r * r);
        return n * q;
      }
      function t(a, b, c) {
        a = G(a);
        b = G(b);
        for (
          var d, f, e, k, n, h, m, p, q, t, w = c ? 0 : [], I = 0, v = a.length;
          v > I;
          I++
        ) {
          var S = a[I];
          if ("M" == S[0]) (d = n = S[1]), (f = h = S[2]);
          else {
            "C" == S[0]
              ? ((q = [d, f].concat(S.slice(1))), (d = q[6]), (f = q[7]))
              : ((q = [d, f, d, f, n, h, n, h]), (d = n), (f = h));
            for (var S = 0, ta = b.length; ta > S; S++) {
              var C = b[S];
              if ("M" == C[0]) (e = m = C[1]), (k = p = C[2]);
              else {
                "C" == C[0]
                  ? ((t = [e, k].concat(C.slice(1))), (e = t[6]), (k = t[7]))
                  : ((t = [e, k, e, k, m, p, m, p]), (e = m), (k = p));
                var aa = q,
                  B = t,
                  C = c,
                  D = H(aa),
                  L = H(B);
                if (E(D, L)) {
                  for (
                    var D = r.apply(0, aa),
                      L = r.apply(0, B),
                      D = ~~(D / 5),
                      L = ~~(L / 5),
                      T = [],
                      ha = [],
                      K = {},
                      z = C ? 0 : [],
                      U = 0;
                    D + 1 > U;
                    U++
                  ) {
                    var N = u.apply(0, aa.concat(U / D));
                    T.push({ x: N.x, y: N.y, t: U / D });
                  }
                  for (U = 0; L + 1 > U; U++)
                    (N = u.apply(0, B.concat(U / L))),
                      ha.push({ x: N.x, y: N.y, t: U / L });
                  for (U = 0; D > U; U++)
                    for (aa = 0; L > aa; aa++) {
                      var x = T[U],
                        M = T[U + 1],
                        B = ha[aa],
                        N = ha[aa + 1],
                        X = 0.001 > Y(M.x - x.x) ? "y" : "x",
                        O = 0.001 > Y(N.x - B.x) ? "y" : "x",
                        F;
                      b: {
                        F = x.x;
                        var V = x.y,
                          P = M.x,
                          R = M.y,
                          ba = B.x,
                          ca = B.y,
                          ja = N.x,
                          ka = N.y;
                        if (
                          !(
                            J(F, P) < W(ba, ja) ||
                            W(F, P) > J(ba, ja) ||
                            J(V, R) < W(ca, ka) ||
                            W(V, R) > J(ca, ka)
                          )
                        ) {
                          var ea =
                              (F * R - V * P) * (ba - ja) -
                              (F - P) * (ba * ka - ca * ja),
                            fa =
                              (F * R - V * P) * (ca - ka) -
                              (V - R) * (ba * ka - ca * ja),
                            la = (F - P) * (ca - ka) - (V - R) * (ba - ja);
                          if (la) {
                            var ea = ea / la,
                              fa = fa / la,
                              la = +ea.toFixed(2),
                              qa = +fa.toFixed(2);
                            if (
                              !(
                                la < +W(F, P).toFixed(2) ||
                                la > +J(F, P).toFixed(2) ||
                                la < +W(ba, ja).toFixed(2) ||
                                la > +J(ba, ja).toFixed(2) ||
                                qa < +W(V, R).toFixed(2) ||
                                qa > +J(V, R).toFixed(2) ||
                                qa < +W(ca, ka).toFixed(2) ||
                                qa > +J(ca, ka).toFixed(2)
                              )
                            ) {
                              F = { x: ea, y: fa };
                              break b;
                            }
                          }
                        }
                        F = void 0;
                      }
                      F &&
                        K[F.x.toFixed(4)] != F.y.toFixed(4) &&
                        ((K[F.x.toFixed(4)] = F.y.toFixed(4)),
                        (x =
                          x.t + Y((F[X] - x[X]) / (M[X] - x[X])) * (M.t - x.t)),
                        (B =
                          B.t + Y((F[O] - B[O]) / (N[O] - B[O])) * (N.t - B.t)),
                        0 <= x &&
                          1 >= x &&
                          0 <= B &&
                          1 >= B &&
                          (C ? z++ : z.push({ x: F.x, y: F.y, t1: x, t2: B })));
                    }
                  C = z;
                } else C = C ? 0 : [];
                if (c) w += C;
                else {
                  D = 0;
                  for (L = C.length; L > D; D++)
                    (C[D].segment1 = I),
                      (C[D].segment2 = S),
                      (C[D].bez1 = q),
                      (C[D].bez2 = t);
                  w = w.concat(C);
                }
              }
            }
          }
        }
        return w;
      }
      function L(a) {
        var b = d(a);
        if (b.bbox) return U(b.bbox);
        if (!a) return e();
        a = G(a);
        for (
          var c, f = 0, h = 0, m = [], p = [], q = 0, y = a.length;
          y > q;
          q++
        )
          ((c = a[q]), "M" == c[0])
            ? ((f = c[1]), (h = c[2]), m.push(f), p.push(h))
            : ((f = N(f, h, c[1], c[2], c[3], c[4], c[5], c[6])),
              (m = m.concat(f.min.x, f.max.x)),
              (p = p.concat(f.min.y, f.max.y)),
              (f = c[5]),
              (h = c[6]));
        a = W.apply(0, m);
        c = W.apply(0, p);
        m = J.apply(0, m);
        p = J.apply(0, p);
        p = e(a, c, m - a, p - c);
        return (b.bbox = U(p)), p;
      }
      function v(a, b, c, d, f) {
        if (f)
          return [
            ["M", a + f, b],
            ["l", c - 2 * f, 0],
            ["a", f, f, 0, 0, 1, f, f],
            ["l", 0, d - 2 * f],
            ["a", f, f, 0, 0, 1, -f, f],
            ["l", 2 * f - c, 0],
            ["a", f, f, 0, 0, 1, -f, -f],
            ["l", 0, 2 * f - d],
            ["a", f, f, 0, 0, 1, f, -f],
            ["z"],
          ];
        a = [["M", a, b], ["l", c, 0], ["l", 0, d], ["l", -c, 0], ["z"]];
        return (a.toString = h), a;
      }
      function K(a, b, c, d, f) {
        if ((null == f && null == d && (d = c), null != f)) {
          var e = Math.PI / 180,
            k = a + c * Math.cos(-d * e);
          a += c * Math.cos(-f * e);
          var n = b + c * Math.sin(-d * e);
          b += c * Math.sin(-f * e);
          c = [
            ["M", k, n],
            ["A", c, c, 0, +(180 < f - d), 0, a, b],
          ];
        } else c = [["M", a, b], ["m", 0, -d], ["a", c, d, 0, 1, 1, 0, 2 * d], ["a", c, d, 0, 1, 1, 0, -2 * d], ["z"]];
        return (c.toString = h), c;
      }
      function I(b) {
        var c = d(b);
        if (c.abs) return m(c.abs);
        if (
          ((ha(b, "array") && ha(b && b[0], "array")) ||
            (b = a.parsePathString(b)),
          !b || !b.length)
        )
          return [["M", 0, 0]];
        var f,
          e = [],
          k = 0,
          q = 0,
          t = 0,
          r = 0,
          y = 0;
        "M" == b[0][0] &&
          ((k = +b[0][1]),
          (q = +b[0][2]),
          (t = k),
          (r = q),
          y++,
          (e[0] = ["M", k, q]));
        for (
          var w,
            G =
              3 == b.length &&
              "M" == b[0][0] &&
              "R" == b[1][0].toUpperCase() &&
              "Z" == b[2][0].toUpperCase(),
            I = y,
            u = b.length;
          u > I;
          I++
        ) {
          if ((e.push((y = [])), (w = b[I]), (f = w[0]), f != f.toUpperCase()))
            switch (((y[0] = f.toUpperCase()), y[0])) {
              case "A":
                y[1] = w[1];
                y[2] = w[2];
                y[3] = w[3];
                y[4] = w[4];
                y[5] = w[5];
                y[6] = +(w[6] + k);
                y[7] = +(w[7] + q);
                break;
              case "V":
                y[1] = +w[1] + q;
                break;
              case "H":
                y[1] = +w[1] + k;
                break;
              case "R":
                for (
                  var v = [k, q].concat(w.slice(1)), C = 2, B = v.length;
                  B > C;
                  C++
                )
                  (v[C] = +v[C] + k), (v[++C] = +v[C] + q);
                e.pop();
                e = e.concat(S(v, G));
                break;
              case "O":
                e.pop();
                v = K(k, q, w[1], w[2]);
                v.push(v[0]);
                e = e.concat(v);
                break;
              case "U":
                e.pop();
                e = e.concat(K(k, q, w[1], w[2], w[3]));
                y = ["U"].concat(e[e.length - 1].slice(-2));
                break;
              case "M":
                (t = +w[1] + k), (r = +w[2] + q);
              default:
                for (C = 1, B = w.length; B > C; C++)
                  y[C] = +w[C] + (C % 2 ? k : q);
            }
          else if ("R" == f)
            (v = [k, q].concat(w.slice(1))),
              e.pop(),
              (e = e.concat(S(v, G))),
              (y = ["R"].concat(w.slice(-2)));
          else if ("O" == f)
            e.pop(), (v = K(k, q, w[1], w[2])), v.push(v[0]), (e = e.concat(v));
          else if ("U" == f)
            e.pop(),
              (e = e.concat(K(k, q, w[1], w[2], w[3]))),
              (y = ["U"].concat(e[e.length - 1].slice(-2)));
          else for (v = 0, C = w.length; C > v; v++) y[v] = w[v];
          if (((f = f.toUpperCase()), "O" != f))
            switch (y[0]) {
              case "Z":
                k = t;
                q = r;
                break;
              case "H":
                k = y[1];
                break;
              case "V":
                q = y[1];
                break;
              case "M":
                (t = y[y.length - 2]), (r = y[y.length - 1]);
              default:
                (k = y[y.length - 2]), (q = y[y.length - 1]);
            }
        }
        return (e.toString = h), (c.abs = m(e)), e;
      }
      function w(a, b, c, d) {
        return [a, b, c, d, c, d];
      }
      function T(a, b, c, d, f, e) {
        var k = 1 / 3,
          h = 2 / 3;
        return [
          k * a + h * c,
          k * b + h * d,
          k * f + h * c,
          k * e + h * d,
          f,
          e,
        ];
      }
      function C(b, c, d, f, e, k, h, n, m, p) {
        var q,
          t = (120 * O) / 180,
          w = (O / 180) * (+e || 0),
          r = [],
          G = a._.cacher(function (a, b, c) {
            var d = a * D.cos(c) - b * D.sin(c);
            a = a * D.sin(c) + b * D.cos(c);
            return { x: d, y: a };
          });
        if (p) (u = p[0]), (q = p[1]), (k = p[2]), (v = p[3]);
        else {
          q = G(b, c, -w);
          b = q.x;
          c = q.y;
          q = G(n, m, -w);
          n = q.x;
          m = q.y;
          q = (D.cos((O / 180) * e), D.sin((O / 180) * e), (b - n) / 2);
          u = (c - m) / 2;
          v = (q * q) / (d * d) + (u * u) / (f * f);
          1 < v && ((v = D.sqrt(v)), (d *= v), (f *= v));
          var v = d * d,
            I = f * f,
            v =
              (k == h ? -1 : 1) *
              D.sqrt(
                Y((v * I - v * u * u - I * q * q) / (v * u * u + I * q * q))
              );
          k = (v * d * u) / f + (b + n) / 2;
          var v = (v * -f * q) / d + (c + m) / 2,
            u = D.asin(((c - v) / f).toFixed(9));
          q = D.asin(((m - v) / f).toFixed(9));
          u = k > b ? O - u : u;
          q = k > n ? O - q : q;
          0 > u && (u = 2 * O + u);
          0 > q && (q = 2 * O + q);
          h && u > q && (u -= 2 * O);
          !h && q > u && (q -= 2 * O);
        }
        if (Y(q - u) > t) {
          var r = q,
            I = n,
            S = m;
          q = u + t * (h && q > u ? 1 : -1);
          n = k + d * D.cos(q);
          m = v + f * D.sin(q);
          r = C(n, m, d, f, e, 0, h, I, S, [q, r, k, v]);
        }
        k = q - u;
        e = D.cos(u);
        t = D.sin(u);
        h = D.cos(q);
        q = D.sin(q);
        k = D.tan(k / 4);
        d = (4 / 3) * d * k;
        k *= (4 / 3) * f;
        f = [b, c];
        b = [b + d * t, c - k * e];
        c = [n + d * q, m - k * h];
        n = [n, m];
        if (((b[0] = 2 * f[0] - b[0]), (b[1] = 2 * f[1] - b[1]), p))
          return [b, c, n].concat(r);
        r = [b, c, n].concat(r).join().split(",");
        p = [];
        n = 0;
        for (m = r.length; m > n; n++)
          p[n] = n % 2 ? G(r[n - 1], r[n], w).y : G(r[n], r[n + 1], w).x;
        return p;
      }
      function X(a, b, c, d, f, e, k, n, h) {
        var m = 1 - h;
        return {
          x:
            V(m, 3) * a + 3 * V(m, 2) * h * c + 3 * m * h * h * f + V(h, 3) * k,
          y:
            V(m, 3) * b + 3 * V(m, 2) * h * d + 3 * m * h * h * e + V(h, 3) * n,
        };
      }
      function N(a, b, c, d, f, e, k, h) {
        var n,
          m = f - 2 * c + a - (k - 2 * f + c),
          q = 2 * (c - a) - 2 * (f - c),
          p = a - c,
          t = (-q + D.sqrt(q * q - 4 * m * p)) / 2 / m,
          w = (-q - D.sqrt(q * q - 4 * m * p)) / 2 / m,
          r = [b, h],
          v = [a, k];
        return (
          "1e12" < Y(t) && (t = 0.5),
          "1e12" < Y(w) && (w = 0.5),
          0 < t &&
            1 > t &&
            ((n = X(a, b, c, d, f, e, k, h, t)), v.push(n.x), r.push(n.y)),
          0 < w &&
            1 > w &&
            ((n = X(a, b, c, d, f, e, k, h, w)), v.push(n.x), r.push(n.y)),
          (m = e - 2 * d + b - (h - 2 * e + d)),
          (q = 2 * (d - b) - 2 * (e - d)),
          (p = b - d),
          (t = (-q + D.sqrt(q * q - 4 * m * p)) / 2 / m),
          (w = (-q - D.sqrt(q * q - 4 * m * p)) / 2 / m),
          "1e12" < Y(t) && (t = 0.5),
          "1e12" < Y(w) && (w = 0.5),
          0 < t &&
            1 > t &&
            ((n = X(a, b, c, d, f, e, k, h, t)), v.push(n.x), r.push(n.y)),
          0 < w &&
            1 > w &&
            ((n = X(a, b, c, d, f, e, k, h, w)), v.push(n.x), r.push(n.y)),
          {
            min: { x: W.apply(0, v), y: W.apply(0, r) },
            max: { x: J.apply(0, v), y: J.apply(0, r) },
          }
        );
      }
      function G(a, b) {
        var c = !b && d(a);
        if (!b && c.curve) return m(c.curve);
        var f = I(a),
          e = b && I(b),
          k = { x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null },
          h = { x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null },
          q = function (a, b) {
            var c, d;
            if (!a) return ["C", b.x, b.y, b.x, b.y, b.x, b.y];
            switch ((!(a[0] in { T: 1, Q: 1 }) && (b.qx = b.qy = null), a[0])) {
              case "M":
                b.X = a[1];
                b.Y = a[2];
                break;
              case "A":
                a = ["C"].concat(C.apply(0, [b.x, b.y].concat(a.slice(1))));
                break;
              case "S":
                c = b.x + (b.x - (b.bx || b.x));
                d = b.y + (b.y - (b.by || b.y));
                a = ["C", c, d].concat(a.slice(1));
                break;
              case "T":
                b.qx = b.x + (b.x - (b.qx || b.x));
                b.qy = b.y + (b.y - (b.qy || b.y));
                a = ["C"].concat(T(b.x, b.y, b.qx, b.qy, a[1], a[2]));
                break;
              case "Q":
                b.qx = a[1];
                b.qy = a[2];
                a = ["C"].concat(T(b.x, b.y, a[1], a[2], a[3], a[4]));
                break;
              case "L":
                a = ["C"].concat(w(b.x, b.y, a[1], a[2]));
                break;
              case "H":
                a = ["C"].concat(w(b.x, b.y, a[1], b.y));
                break;
              case "V":
                a = ["C"].concat(w(b.x, b.y, b.x, a[1]));
                break;
              case "Z":
                a = ["C"].concat(w(b.x, b.y, b.X, b.Y));
            }
            return a;
          },
          p = function (a, b) {
            if (7 < a[b].length) {
              a[b].shift();
              for (var c = a[b]; c.length; )
                a.splice(b++, 0, ["C"].concat(c.splice(0, 6)));
              a.splice(b, 1);
              v = J(f.length, (e && e.length) || 0);
            }
          },
          t = function (a, b, c, d, l) {
            a &&
              b &&
              "M" == a[l][0] &&
              "M" != b[l][0] &&
              (b.splice(l, 0, ["M", d.x, d.y]),
              (c.bx = 0),
              (c.by = 0),
              (c.x = a[l][1]),
              (c.y = a[l][2]),
              (v = J(f.length, (e && e.length) || 0)));
          },
          r = 0,
          v = J(f.length, (e && e.length) || 0);
        for (; v > r; r++) {
          f[r] = q(f[r], k);
          p(f, r);
          e && (e[r] = q(e[r], h));
          e && p(e, r);
          t(f, e, k, h, r);
          t(e, f, h, k, r);
          var u = f[r],
            G = e && e[r],
            S = u.length,
            B = e && G.length;
          k.x = u[S - 2];
          k.y = u[S - 1];
          k.bx = P(u[S - 4]) || k.x;
          k.by = P(u[S - 3]) || k.y;
          h.bx = e && (P(G[B - 4]) || h.x);
          h.by = e && (P(G[B - 3]) || h.y);
          h.x = e && G[B - 2];
          h.y = e && G[B - 1];
        }
        return e || (c.curve = m(f)), e ? [f, e] : f;
      }
      function S(a, b) {
        for (var c = [], d = 0, f = a.length; f - 2 * !b > d; d += 2) {
          var e = [
            { x: +a[d - 2], y: +a[d - 1] },
            { x: +a[d], y: +a[d + 1] },
            { x: +a[d + 2], y: +a[d + 3] },
            { x: +a[d + 4], y: +a[d + 5] },
          ];
          b
            ? d
              ? f - 4 == d
                ? (e[3] = { x: +a[0], y: +a[1] })
                : f - 2 == d &&
                  ((e[2] = { x: +a[0], y: +a[1] }),
                  (e[3] = { x: +a[2], y: +a[3] }))
              : (e[0] = { x: +a[f - 2], y: +a[f - 1] })
            : f - 4 == d
            ? (e[3] = e[2])
            : d || (e[0] = { x: +a[d], y: +a[d + 1] });
          c.push([
            "C",
            (-e[0].x + 6 * e[1].x + e[2].x) / 6,
            (-e[0].y + 6 * e[1].y + e[2].y) / 6,
            (e[1].x + 6 * e[2].x - e[3].x) / 6,
            (e[1].y + 6 * e[2].y - e[3].y) / 6,
            e[2].x,
            e[2].y,
          ]);
        }
        return c;
      }
      var aa = b.prototype,
        ha = a.is,
        U = a._.clone,
        ca = "hasOwnProperty",
        M = /,?([a-z]),?/gi,
        P = parseFloat,
        D = Math,
        O = D.PI,
        W = D.min,
        J = D.max,
        V = D.pow,
        Y = D.abs,
        ba = q(1),
        fa = q(),
        R = q(0, 1),
        ea = a._unit2px;
      a.path = d;
      a.path.getTotalLength = ba;
      a.path.getPointAtLength = fa;
      a.path.getSubpath = function (a, b, c) {
        if (1e-6 > this.getTotalLength(a) - c) return R(a, b).end;
        a = R(a, c, 1);
        return b ? R(a, b).end : a;
      };
      aa.getTotalLength = function () {
        return this.node.getTotalLength ? this.node.getTotalLength() : void 0;
      };
      aa.getPointAtLength = function (a) {
        return fa(this.attr("d"), a);
      };
      aa.getSubpath = function (b, c) {
        return a.path.getSubpath(this.attr("d"), b, c);
      };
      a._.box = e;
      a.path.findDotsAtSegment = u;
      a.path.bezierBBox = H;
      a.path.isPointInsideBBox = B;
      a.path.isBBoxIntersect = E;
      a.path.intersection = function (a, b) {
        return t(a, b);
      };
      a.path.intersectionNumber = function (a, b) {
        return t(a, b, 1);
      };
      a.path.isPointInside = function (a, b, c) {
        var d = L(a);
        return (
          B(d, b, c) &&
          1 ==
            t(
              a,
              [
                ["M", b, c],
                ["H", d.x2 + 10],
              ],
              1
            ) %
              2
        );
      };
      a.path.getBBox = L;
      a.path.get = {
        path: function (a) {
          return a.attr("path");
        },
        circle: function (a) {
          a = ea(a);
          return K(a.cx, a.cy, a.r);
        },
        ellipse: function (a) {
          a = ea(a);
          return K(a.cx, a.cy, a.rx, a.ry);
        },
        rect: function (a) {
          a = ea(a);
          return v(a.x, a.y, a.width, a.height, a.rx, a.ry);
        },
        image: function (a) {
          a = ea(a);
          return v(a.x, a.y, a.width, a.height);
        },
        text: function (a) {
          a = a.node.getBBox();
          return v(a.x, a.y, a.width, a.height);
        },
        g: function (a) {
          a = a.node.getBBox();
          return v(a.x, a.y, a.width, a.height);
        },
        symbol: function (a) {
          a = a.getBBox();
          return v(a.x, a.y, a.width, a.height);
        },
        line: function (a) {
          return "M" + [a.attr("x1"), a.attr("y1"), a.attr("x2"), a.attr("y2")];
        },
        polyline: function (a) {
          return "M" + a.attr("points");
        },
        polygon: function (a) {
          return "M" + a.attr("points") + "z";
        },
        svg: function (a) {
          a = a.node.getBBox();
          return v(a.x, a.y, a.width, a.height);
        },
        deflt: function (a) {
          a = a.node.getBBox();
          return v(a.x, a.y, a.width, a.height);
        },
      };
      a.path.toRelative = function (b) {
        var c = d(b),
          f = String.prototype.toLowerCase;
        if (c.rel) return m(c.rel);
        (a.is(b, "array") && a.is(b && b[0], "array")) ||
          (b = a.parsePathString(b));
        var e = [],
          k = 0,
          q = 0,
          t = 0,
          w = 0,
          r = 0;
        "M" == b[0][0] &&
          ((k = b[0][1]),
          (q = b[0][2]),
          (t = k),
          (w = q),
          r++,
          e.push(["M", k, q]));
        for (var v = b.length; v > r; r++) {
          var u = (e[r] = []),
            G = b[r];
          if (G[0] != f.call(G[0]))
            switch (((u[0] = f.call(G[0])), u[0])) {
              case "a":
                u[1] = G[1];
                u[2] = G[2];
                u[3] = G[3];
                u[4] = G[4];
                u[5] = G[5];
                u[6] = +(G[6] - k).toFixed(3);
                u[7] = +(G[7] - q).toFixed(3);
                break;
              case "v":
                u[1] = +(G[1] - q).toFixed(3);
                break;
              case "m":
                (t = G[1]), (w = G[2]);
              default:
                for (var I = 1, C = G.length; C > I; I++)
                  u[I] = +(G[I] - (I % 2 ? k : q)).toFixed(3);
            }
          else
            for (
              e[r] = [],
                "m" == G[0] && ((t = G[1] + k), (w = G[2] + q)),
                u = 0,
                I = G.length;
              I > u;
              u++
            )
              e[r][u] = G[u];
          G = e[r].length;
          switch (e[r][0]) {
            case "z":
              k = t;
              q = w;
              break;
            case "h":
              k += +e[r][G - 1];
              break;
            case "v":
              q += +e[r][G - 1];
              break;
            default:
              (k += +e[r][G - 2]), (q += +e[r][G - 1]);
          }
        }
        return (e.toString = h), (c.rel = m(e)), e;
      };
      a.path.toAbsolute = I;
      a.path.toCubic = G;
      a.path.map = function (a, b) {
        if (!b) return a;
        var c, d, f, e, k, h, n;
        a = G(a);
        f = 0;
        for (k = a.length; k > f; f++)
          for (n = a[f], e = 1, h = n.length; h > e; e += 2)
            (c = b.x(n[e], n[e + 1])),
              (d = b.y(n[e], n[e + 1])),
              (n[e] = c),
              (n[e + 1] = d);
        return a;
      };
      a.path.toString = h;
      a.path.clone = m;
    }),
    d.plugin(function (a) {
      var b = Math.max,
        d = Math.min,
        e = function (a) {
          if (((this.items = []), (this.length = 0), (this.type = "set"), a))
            for (var b = 0, c = a.length; c > b; b++)
              a[b] &&
                ((this[this.items.length] = this.items[this.items.length] =
                  a[b]),
                this.length++);
        },
        h = e.prototype;
      h.push = function () {
        for (var a, b, c = 0, d = arguments.length; d > c; c++)
          (a = arguments[c]) &&
            ((b = this.items.length),
            (this[b] = this.items[b] = a),
            this.length++);
        return this;
      };
      h.pop = function () {
        return this.length && delete this[this.length--], this.items.pop();
      };
      h.forEach = function (a, b) {
        for (
          var c = 0, d = this.items.length;
          d > c && !1 !== a.call(b, this.items[c], c);
          c++
        );
        return this;
      };
      h.remove = function () {
        for (; this.length; ) this.pop().remove();
        return this;
      };
      h.attr = function (a) {
        for (var b = 0, c = this.items.length; c > b; b++)
          this.items[b].attr(a);
        return this;
      };
      h.clear = function () {
        for (; this.length; ) this.pop();
      };
      h.splice = function (a, f) {
        a = 0 > a ? b(this.length + a, 0) : a;
        f = b(0, d(this.length - a, f));
        var h,
          p = [],
          H = [],
          B = [];
        for (h = 2; h < arguments.length; h++) B.push(arguments[h]);
        for (h = 0; f > h; h++) H.push(this[a + h]);
        for (; h < this.length - a; h++) p.push(this[a + h]);
        var E = B.length;
        for (h = 0; h < E + p.length; h++)
          this.items[a + h] = this[a + h] = E > h ? B[h] : p[h - E];
        for (h = this.items.length = this.length -= f - E; this[h]; )
          delete this[h++];
        return new e(H);
      };
      h.exclude = function (a) {
        for (var b = 0, c = this.length; c > b; b++)
          if (this[b] == a) return this.splice(b, 1), !0;
        return !1;
      };
      h.insertAfter = function (a) {
        for (var b = this.items.length; b--; ) this.items[b].insertAfter(a);
        return this;
      };
      h.getBBox = function () {
        for (var a = [], f = [], e = [], k = [], h = this.items.length; h--; )
          if (!this.items[h].removed) {
            var p = this.items[h].getBBox();
            a.push(p.x);
            f.push(p.y);
            e.push(p.x + p.width);
            k.push(p.y + p.height);
          }
        return (
          (a = d.apply(0, a)),
          (f = d.apply(0, f)),
          (e = b.apply(0, e)),
          (k = b.apply(0, k)),
          {
            x: a,
            y: f,
            x2: e,
            y2: k,
            width: e - a,
            height: k - f,
            cx: a + (e - a) / 2,
            cy: f + (k - f) / 2,
          }
        );
      };
      h.clone = function (a) {
        a = new e();
        for (var b = 0, c = this.items.length; c > b; b++)
          a.push(this.items[b].clone());
        return a;
      };
      h.toString = function () {
        return "Snap\u2018s set";
      };
      h.type = "set";
      a.set = function () {
        var a = new e();
        return (
          arguments.length &&
            a.push.apply(a, Array.prototype.slice.call(arguments, 0)),
          a
        );
      };
    }),
    d.plugin(function (a, b) {
      function d(a) {
        var b = a[0];
        switch (b.toLowerCase()) {
          case "t":
            return [b, 0, 0];
          case "m":
            return [b, 1, 0, 0, 1, 0, 0];
          case "r":
            return 4 == a.length ? [b, 0, a[2], a[3]] : [b, 0];
          case "s":
            return 5 == a.length
              ? [b, 1, 1, a[3], a[4]]
              : 3 == a.length
              ? [b, 1, 1]
              : [b, 1];
        }
      }
      function e(b, c, f) {
        c = E(c).replace(/\.{3}|\u2026/g, b);
        b = a.parseTransformString(b) || [];
        c = a.parseTransformString(c) || [];
        for (
          var k,
            h,
            m,
            p,
            B = Math.max(b.length, c.length),
            C = [],
            H = [],
            N = 0;
          B > N;
          N++
        ) {
          if (
            ((m = b[N] || d(c[N])),
            (p = c[N] || d(m)),
            m[0] != p[0] ||
              ("r" == m[0].toLowerCase() && (m[2] != p[2] || m[3] != p[3])) ||
              ("s" == m[0].toLowerCase() && (m[3] != p[3] || m[4] != p[4])))
          ) {
            b = a._.transform2matrix(b, f());
            c = a._.transform2matrix(c, f());
            C = [["m", b.a, b.b, b.c, b.d, b.e, b.f]];
            H = [["m", c.a, c.b, c.c, c.d, c.e, c.f]];
            break;
          }
          C[N] = [];
          H[N] = [];
          k = 0;
          for (h = Math.max(m.length, p.length); h > k; k++)
            k in m && (C[N][k] = m[k]), k in p && (H[N][k] = p[k]);
        }
        return { from: u(C), to: u(H), f: q(C) };
      }
      function h(a) {
        return a;
      }
      function m(a) {
        return function (b) {
          return +b.toFixed(3) + a;
        };
      }
      function f(b) {
        return a.rgb(b[0], b[1], b[2]);
      }
      function q(a) {
        var b,
          c,
          d,
          f,
          e,
          k,
          h = 0,
          n = [];
        b = 0;
        for (c = a.length; c > b; b++) {
          e = "[";
          k = ['"' + a[b][0] + '"'];
          d = 1;
          for (f = a[b].length; f > d; d++) k[d] = "val[" + h++ + "]";
          e += k + "]";
          n[b] = e;
        }
        return Function("val", "return Snap.path.toString.call([" + n + "])");
      }
      function u(a) {
        for (var b = [], c = 0, d = a.length; d > c; c++)
          for (var f = 1, e = a[c].length; e > f; f++) b.push(a[c][f]);
        return b;
      }
      var H = {},
        B = /[a-z]+$/i,
        E = String;
      H.stroke = H.fill = "colour";
      b.prototype.equal = function (b, c) {
        var d,
          n,
          K = E(this.attr(b) || ""),
          I = this;
        if (K == +K && c == +c) return { from: +K, to: +c, f: h };
        if ("colour" == H[b])
          return (
            (d = a.color(K)),
            (n = a.color(c)),
            {
              from: [d.r, d.g, d.b, d.opacity],
              to: [n.r, n.g, n.b, n.opacity],
              f: f,
            }
          );
        if (
          "transform" == b ||
          "gradientTransform" == b ||
          "patternTransform" == b
        )
          return (
            c instanceof a.Matrix && (c = c.toTransformString()),
            a._.rgTransform.test(c) || (c = a._.svgTransform2string(c)),
            e(K, c, function () {
              return I.getBBox(1);
            })
          );
        if ("d" == b || "path" == b)
          return (
            (d = a.path.toCubic(K, c)),
            { from: u(d[0]), to: u(d[1]), f: q(d[0]) }
          );
        if ("points" == b)
          return (
            (d = E(K).split(",")),
            (n = E(c).split(",")),
            {
              from: d,
              to: n,
              f: function (a) {
                return a;
              },
            }
          );
        d = K.match(B);
        n = E(c).match(B);
        return d && d == n
          ? { from: parseFloat(K), to: parseFloat(c), f: m(d) }
          : { from: this.asPX(b), to: this.asPX(b, c), f: h };
      };
    }),
    d.plugin(function (a, b, d, e) {
      var p = b.prototype,
        m = "createTouch" in e.doc;
      b =
        "click dblclick mousedown mousemove mouseout mouseover mouseup touchstart touchmove touchend touchcancel".split(
          " "
        );
      var f = {
          mousedown: "touchstart",
          mousemove: "touchmove",
          mouseup: "touchend",
        },
        q = function (a) {
          a = "y" == a ? "scrollTop" : "scrollLeft";
          return e.doc.documentElement[a] || e.doc.body[a];
        },
        u = function () {
          this.returnValue = !1;
        },
        H = function () {
          return this.originalEvent.preventDefault();
        },
        B = function () {
          this.cancelBubble = !0;
        },
        E = function () {
          return this.originalEvent.stopPropagation();
        },
        r = (function () {
          return e.doc.addEventListener
            ? function (a, b, c, d) {
                var e = m && f[b] ? f[b] : b,
                  k = function (e) {
                    var k = q("y"),
                      h = q("x");
                    if (m && f.hasOwnProperty(b))
                      for (
                        var n = 0,
                          p = e.targetTouches && e.targetTouches.length;
                        p > n;
                        n++
                      )
                        if (
                          e.targetTouches[n].target == a ||
                          a.contains(e.targetTouches[n].target)
                        ) {
                          p = e;
                          e = e.targetTouches[n];
                          e.originalEvent = p;
                          e.preventDefault = H;
                          e.stopPropagation = E;
                          break;
                        }
                    return c.call(d, e, e.clientX + h, e.clientY + k);
                  };
                return (
                  b !== e && a.addEventListener(b, k, !1),
                  a.addEventListener(e, k, !1),
                  function () {
                    return (
                      b !== e && a.removeEventListener(b, k, !1),
                      a.removeEventListener(e, k, !1),
                      !0
                    );
                  }
                );
              }
            : e.doc.attachEvent
            ? function (a, b, c, d) {
                var f = function (a) {
                  a = a || e.win.event;
                  var b = q("y"),
                    f = q("x"),
                    f = a.clientX + f,
                    b = a.clientY + b;
                  return (
                    (a.preventDefault = a.preventDefault || u),
                    (a.stopPropagation = a.stopPropagation || B),
                    c.call(d, a, f, b)
                  );
                };
                a.attachEvent("on" + b, f);
                return function () {
                  return a.detachEvent("on" + b, f), !0;
                };
              }
            : void 0;
        })(),
        t = [],
        L = function (b) {
          for (
            var c,
              d = b.clientX,
              f = b.clientY,
              e = q("y"),
              k = q("x"),
              n = t.length;
            n--;

          ) {
            if (((c = t[n]), m))
              for (var p, u = b.touches && b.touches.length; u--; ) {
                if (
                  ((p = b.touches[u]),
                  p.identifier == c.el._drag.id || c.el.node.contains(p.target))
                ) {
                  d = p.clientX;
                  f = p.clientY;
                  (b.originalEvent ? b.originalEvent : b).preventDefault();
                  break;
                }
              }
            else b.preventDefault();
            u = c.el.node;
            a._.glob;
            u.nextSibling;
            u.parentNode;
            u.style.display;
            d += k;
            f += e;
            h(
              "snap.drag.move." + c.el.id,
              c.move_scope || c.el,
              d - c.el._drag.x,
              f - c.el._drag.y,
              d,
              f,
              b
            );
          }
        },
        v = function (b) {
          a.unmousemove(L).unmouseup(v);
          for (var c, d = t.length; d--; )
            (c = t[d]),
              (c.el._drag = {}),
              h(
                "snap.drag.end." + c.el.id,
                c.end_scope || c.start_scope || c.move_scope || c.el,
                b
              );
          t = [];
        };
      for (d = b.length; d--; )
        !(function (b) {
          a[b] = p[b] = function (c, d) {
            return (
              a.is(c, "function") &&
                ((this.events = this.events || []),
                this.events.push({
                  name: b,
                  f: c,
                  unbind: r(this.shape || this.node || e.doc, b, c, d || this),
                })),
              this
            );
          };
          a["un" + b] = p["un" + b] = function (a) {
            for (var c = this.events || [], d = c.length; d--; )
              if (c[d].name == b && (c[d].f == a || !a))
                return (
                  c[d].unbind(),
                  c.splice(d, 1),
                  !c.length && delete this.events,
                  this
                );
            return this;
          };
        })(b[d]);
      p.hover = function (a, b, c, d) {
        return this.mouseover(a, c).mouseout(b, d || c);
      };
      p.unhover = function (a, b) {
        return this.unmouseover(a).unmouseout(b);
      };
      var K = [];
      p.drag = function (b, c, d, f, e, k) {
        function n(p, m, q) {
          (p.originalEvent || p).preventDefault();
          this._drag.x = m;
          this._drag.y = q;
          this._drag.id = p.identifier;
          !t.length && a.mousemove(L).mouseup(v);
          t.push({ el: this, move_scope: f, start_scope: e, end_scope: k });
          c && h.on("snap.drag.start." + this.id, c);
          b && h.on("snap.drag.move." + this.id, b);
          d && h.on("snap.drag.end." + this.id, d);
          h("snap.drag.start." + this.id, e || f || this, m, q, p);
        }
        if (!arguments.length) {
          var p;
          return this.drag(
            function (a, b) {
              this.attr({ transform: p + (p ? "T" : "t") + [a, b] });
            },
            function () {
              p = this.transform().local;
            }
          );
        }
        return (
          (this._drag = {}),
          K.push({ el: this, start: n }),
          this.mousedown(n),
          this
        );
      };
      p.undrag = function () {
        for (var b = K.length; b--; )
          K[b].el == this &&
            (this.unmousedown(K[b].start),
            K.splice(b, 1),
            h.unbind("snap.drag.*." + this.id));
        return !K.length && a.unmousemove(L).unmouseup(v), this;
      };
    }),
    d.plugin(function (a, b, d) {
      d = (b.prototype, d.prototype);
      var e = /^\s*url\((.+)\)/,
        p = String,
        m = a._.$;
      a.filter = {};
      d.filter = function (d) {
        var e = this;
        "svg" != e.type && (e = e.paper);
        d = a.parse(p(d));
        var k = a._.id(),
          h = (e.node.offsetWidth, e.node.offsetHeight, m("filter"));
        return (
          m(h, { id: k, filterUnits: "userSpaceOnUse" }),
          h.appendChild(d.node),
          e.defs.appendChild(h),
          new b(h)
        );
      };
      h.on("snap.util.getattr.filter", function () {
        h.stop();
        var b = m(this.node, "filter");
        if (b) return (b = p(b).match(e)) && a.select(b[1]);
      });
      h.on("snap.util.attr.filter", function (d) {
        if (d instanceof b && "filter" == d.type) {
          h.stop();
          var e = d.node.id;
          e || (m(d.node, { id: d.id }), (e = d.id));
          m(this.node, { filter: a.url(e) });
        }
        (d && "none" != d) || (h.stop(), this.node.removeAttribute("filter"));
      });
      a.filter.blur = function (b, c) {
        null == b && (b = 2);
        return a.format('<feGaussianBlur stdDeviation="{def}"/>', {
          def: null == c ? b : [b, c],
        });
      };
      a.filter.blur.toString = function () {
        return this();
      };
      a.filter.shadow = function (b, c, d, e) {
        return (
          (e = e || "#000"),
          null == d && (d = 4),
          "string" == typeof d && ((e = d), (d = 4)),
          null == b && ((b = 0), (c = 2)),
          null == c && (c = b),
          (e = a.color(e)),
          a.format(
            '<feGaussianBlur in="SourceAlpha" stdDeviation="{blur}"/><feOffset dx="{dx}" dy="{dy}" result="offsetblur"/><feFlood flood-color="{color}"/><feComposite in2="offsetblur" operator="in"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>',
            { color: e, dx: b, dy: c, blur: d }
          )
        );
      };
      a.filter.shadow.toString = function () {
        return this();
      };
      a.filter.grayscale = function (b) {
        return (
          null == b && (b = 1),
          a.format(
            '<feColorMatrix type="matrix" values="{a} {b} {c} 0 0 {d} {e} {f} 0 0 {g} {b} {h} 0 0 0 0 0 1 0"/>',
            {
              a: 0.2126 + 0.7874 * (1 - b),
              b: 0.7152 - 0.7152 * (1 - b),
              c: 0.0722 - 0.0722 * (1 - b),
              d: 0.2126 - 0.2126 * (1 - b),
              e: 0.7152 + 0.2848 * (1 - b),
              f: 0.0722 - 0.0722 * (1 - b),
              g: 0.2126 - 0.2126 * (1 - b),
              h: 0.0722 + 0.9278 * (1 - b),
            }
          )
        );
      };
      a.filter.grayscale.toString = function () {
        return this();
      };
      a.filter.sepia = function (b) {
        return (
          null == b && (b = 1),
          a.format(
            '<feColorMatrix type="matrix" values="{a} {b} {c} 0 0 {d} {e} {f} 0 0 {g} {h} {i} 0 0 0 0 0 1 0"/>',
            {
              a: 0.393 + 0.607 * (1 - b),
              b: 0.769 - 0.769 * (1 - b),
              c: 0.189 - 0.189 * (1 - b),
              d: 0.349 - 0.349 * (1 - b),
              e: 0.686 + 0.314 * (1 - b),
              f: 0.168 - 0.168 * (1 - b),
              g: 0.272 - 0.272 * (1 - b),
              h: 0.534 - 0.534 * (1 - b),
              i: 0.131 + 0.869 * (1 - b),
            }
          )
        );
      };
      a.filter.sepia.toString = function () {
        return this();
      };
      a.filter.saturate = function (b) {
        return (
          null == b && (b = 1),
          a.format('<feColorMatrix type="saturate" values="{amount}"/>', {
            amount: 1 - b,
          })
        );
      };
      a.filter.saturate.toString = function () {
        return this();
      };
      a.filter.hueRotate = function (b) {
        return (
          (b = b || 0),
          a.format('<feColorMatrix type="hueRotate" values="{angle}"/>', {
            angle: b,
          })
        );
      };
      a.filter.hueRotate.toString = function () {
        return this();
      };
      a.filter.invert = function (b) {
        return (
          null == b && (b = 1),
          a.format(
            '<feComponentTransfer><feFuncR type="table" tableValues="{amount} {amount2}"/><feFuncG type="table" tableValues="{amount} {amount2}"/><feFuncB type="table" tableValues="{amount} {amount2}"/></feComponentTransfer>',
            { amount: b, amount2: 1 - b }
          )
        );
      };
      a.filter.invert.toString = function () {
        return this();
      };
      a.filter.brightness = function (b) {
        return (
          null == b && (b = 1),
          a.format(
            '<feComponentTransfer><feFuncR type="linear" slope="{amount}"/><feFuncG type="linear" slope="{amount}"/><feFuncB type="linear" slope="{amount}"/></feComponentTransfer>',
            { amount: b }
          )
        );
      };
      a.filter.brightness.toString = function () {
        return this();
      };
      a.filter.contrast = function (b) {
        return (
          null == b && (b = 1),
          a.format(
            '<feComponentTransfer><feFuncR type="linear" slope="{amount}" intercept="{amount2}"/><feFuncG type="linear" slope="{amount}" intercept="{amount2}"/><feFuncB type="linear" slope="{amount}" intercept="{amount2}"/></feComponentTransfer>',
            { amount: b, amount2: 0.5 - b / 2 }
          )
        );
      };
      a.filter.contrast.toString = function () {
        return this();
      };
    }),
    d
  );
});
!(function (e) {
  function h(b, a) {
    for (var c in a) a.hasOwnProperty(c) && (b[c] = a[c]);
    return b;
  }
  function b(b, a) {
    this.el = b;
    this.options = h({}, this.options);
    h(this.options, a);
    this._init();
  }
  b.prototype.options = { speedIn: 500, easingIn: mina.linear };
  b.prototype._init = function () {
    this.path = Snap(this.el.querySelector("svg")).select("path");
    this.initialPath = this.path.attr("d");
    var b = this.el.getAttribute("data-opening");
    if (
      ((this.openingSteps = b ? b.split(";") : ""),
      (this.openingStepsTotal = b ? this.openingSteps.length : 0),
      0 !== this.openingStepsTotal)
    )
      (this.closingSteps = (b = this.el.getAttribute("data-closing")
        ? this.el.getAttribute("data-closing")
        : this.initialPath)
        ? b.split(";")
        : ""),
        (this.closingStepsTotal = b ? this.closingSteps.length : 0),
        (this.isAnimating = !1),
        this.options.speedOut || (this.options.speedOut = this.options.speedIn),
        this.options.easingOut ||
          (this.options.easingOut = this.options.easingIn);
  };
  b.prototype.show = function () {
    if (this.isAnimating) return !1;
    this.isAnimating = !0;
    var b = this;
    this._animateSVG("in", function () {
      classie.addClass(b.el, "pageload-loading");
    });
    classie.add(this.el, "show");
  };
  b.prototype.hide = function () {
    var b = this;
    classie.removeClass(this.el, "pageload-loading");
    this._animateSVG("out", function () {
      b.path.attr("d", b.initialPath);
      classie.removeClass(b.el, "show");
      b.isAnimating = !1;
    });
  };
  b.prototype._animateSVG = function (b, a) {
    var c = this,
      e = "out" === b ? this.closingSteps : this.openingSteps,
      k = "out" === b ? this.closingStepsTotal : this.openingStepsTotal,
      h = "out" === b ? c.options.speedOut : c.options.speedIn,
      m = "out" === b ? c.options.easingOut : c.options.easingIn,
      f = function (b) {
        return b > k - 1
          ? (a && "function" == typeof a && a(), void 0)
          : (c.path.animate({ path: e[b] }, h, m, function () {
              f(b);
            }),
            b++,
            void 0);
      };
    f(0);
  };
  e.SVGLoader = b;
})(window);
!function () {
  function e(b, a) {
    var c = [],
      e = this.options;
    return (
      e.onProgress && b && e.onProgress.call(this, b, a, this.completed.length),
      this.completed.length + this.errors.length === this.queue.length &&
        (c.push(this.completed),
        this.errors.length && c.push(this.errors),
        e.onComplete.apply(this, c)),
      this
    );
  }
  var h = "addEventListener" in new Image(),
    b = function (b, a) {
      this.options = {
        pipeline: !1,
        auto: !0,
        prefetch: !1,
        onComplete: function () {},
      };
      a && "object" == typeof a && this.setOptions(a);
      this.addQueue(b);
      this.queue.length && this.options.auto && this.processQueue();
    };
  b.prototype.setOptions = function (b) {
    var a,
      c = this.options;
    for (a in b) b.hasOwnProperty(a) && (c[a] = b[a]);
    return this;
  };
  b.prototype.addQueue = function (b) {
    return (this.queue = b.slice()), this;
  };
  b.prototype.reset = function () {
    return (this.completed = []), (this.errors = []), this;
  };
  b.prototype._addEvents = function (b, a, c) {
    var n = this,
      k = this.options,
      p = function () {
        h
          ? (this.removeEventListener("error", m),
            this.removeEventListener("abort", m),
            this.removeEventListener("load", f))
          : (this.onerror = this.onabort = this.onload = null);
      },
      m = function () {
        p.call(this);
        n.errors.push(a);
        k.onError && k.onError.call(n, a);
        e.call(n, a);
        k.pipeline && n._loadNext(c);
      },
      f = function () {
        p.call(this);
        n.completed.push(a);
        e.call(n, a, this);
        k.pipeline && n._loadNext(c);
      };
    return (
      h
        ? (b.addEventListener("error", m, !1),
          b.addEventListener("abort", m, !1),
          b.addEventListener("load", f, !1))
        : ((b.onerror = b.onabort = m), (b.onload = f)),
      this
    );
  };
  b.prototype._load = function (b, a) {
    var c = new Image();
    return this._addEvents(c, b, a), (c.src = b), this;
  };
  b.prototype._loadNext = function (b) {
    return b++, this.queue[b] && this._load(this.queue[b], b), this;
  };
  b.prototype.processQueue = function () {
    var b = 0,
      a = this.queue,
      c = a.length;
    if ((this.reset(), this.options.pipeline)) this._load(a[0], 0);
    else for (; c > b; ++b) this._load(a[b], b);
    return this;
  };
  "function" == typeof define && define.amd
    ? define(function () {
        return b;
      })
    : (this.preLoader = b);
}.call(this);
!(function (e) {
  e.fn.countTo = function (h) {
    return (
      (h = h || {}),
      e(this).each(function () {
        function b(a) {
          a = d.formatter.call(n, a, d);
          k.text(a);
        }
        var d = e.extend(
            {},
            e.fn.countTo.defaults,
            {
              from: e(this).data("from"),
              to: e(this).data("to"),
              speed: e(this).data("speed"),
              refreshInterval: e(this).data("refresh-interval"),
              decimals: e(this).data("decimals"),
            },
            h
          ),
          a = Math.ceil(d.speed / d.refreshInterval),
          c = (d.to - d.from) / a,
          n = this,
          k = e(this),
          p = 0,
          m = d.from,
          f = k.data("countTo") || {};
        k.data("countTo", f);
        f.interval && clearInterval(f.interval);
        f.interval = setInterval(function () {
          m += c;
          p++;
          b(m);
          "function" == typeof d.onUpdate && d.onUpdate.call(n, m);
          p >= a &&
            (k.removeData("countTo"),
            clearInterval(f.interval),
            (m = d.to),
            "function" == typeof d.onComplete && d.onComplete.call(n, m));
        }, d.refreshInterval);
        b(m);
      })
    );
  };
  e.fn.countTo.defaults = {
    from: 0,
    to: 0,
    speed: 1e3,
    refreshInterval: 100,
    decimals: 0,
    formatter: function (e, b) {
      return e.toFixed(b.decimals);
    },
    onUpdate: null,
    onComplete: null,
  };
})(jQuery);
!(function (e, h) {
  e.MixItUp = function () {
    this._execAction("_constructor", 0);
    e.extend(this, {
      selectors: { target: ".mix", filter: ".filter", sort: ".sort" },
      animation: {
        enable: !0,
        effects: "fade scale",
        duration: 600,
        easing: "ease",
        perspectiveDistance: "3000",
        perspectiveOrigin: "50% 50%",
        queue: !0,
        queueLimit: 1,
        animateChangeLayout: !1,
        animateResizeContainer: !0,
        animateResizeTargets: !1,
        staggerSequence: !1,
        reverseOut: !1,
      },
      callbacks: {
        onMixLoad: !1,
        onMixStart: !1,
        onMixBusy: !1,
        onMixEnd: !1,
        onMixFail: !1,
        _user: !1,
      },
      controls: {
        enable: !0,
        live: !1,
        toggleFilterButtons: !1,
        toggleLogic: "or",
        activeClass: "active",
      },
      layout: {
        display: "inline-block",
        containerClass: "",
        containerClassFail: "fail",
      },
      load: { filter: "all", sort: !1 },
      _$body: null,
      _$container: null,
      _$targets: null,
      _$parent: null,
      _$sortButtons: null,
      _$filterButtons: null,
      _suckMode: !1,
      _mixing: !1,
      _sorting: !1,
      _clicking: !1,
      _loading: !0,
      _changingLayout: !1,
      _changingClass: !1,
      _changingDisplay: !1,
      _origOrder: [],
      _startOrder: [],
      _newOrder: [],
      _activeFilter: null,
      _toggleArray: [],
      _toggleString: "",
      _activeSort: "default:asc",
      _newSort: null,
      _startHeight: null,
      _newHeight: null,
      _incPadding: !0,
      _newDisplay: null,
      _newClass: null,
      _targetsBound: 0,
      _targetsDone: 0,
      _queue: [],
      _$show: e(),
      _$hide: e(),
    });
    this._execAction("_constructor", 1);
  };
  e.MixItUp.prototype = {
    constructor: e.MixItUp,
    _instances: {},
    _handled: { _filter: {}, _sort: {} },
    _bound: { _filter: {}, _sort: {} },
    _actions: {},
    _filters: {},
    extend: function (b) {
      for (var d in b) e.MixItUp.prototype[d] = b[d];
    },
    addAction: function (b, d, a, c) {
      e.MixItUp.prototype._addHook("_actions", b, d, a, c);
    },
    addFilter: function (b, d, a, c) {
      e.MixItUp.prototype._addHook("_filters", b, d, a, c);
    },
    _addHook: function (b, d, a, c, h) {
      b = e.MixItUp.prototype[b];
      var k = {};
      h = 1 === h || "post" === h ? "post" : "pre";
      k[d] = {};
      k[d][h] = {};
      k[d][h][a] = c;
      e.extend(!0, b, k);
    },
    _init: function (b, d) {
      if (
        (this._execAction("_init", 0, arguments),
        d && e.extend(!0, this, d),
        (this._$body = e("body")),
        (this._domNode = b),
        (this._$container = e(b)),
        this._$container.addClass(this.layout.containerClass),
        (this._id = b.id),
        this._platformDetect(),
        (this._brake = this._getPrefixedCSS("transition", "none")),
        this._refresh(!0),
        (this._$parent = this._$targets.parent().length
          ? this._$targets.parent()
          : this._$container),
        this.load.sort &&
          ((this._newSort = this._parseSort(this.load.sort)),
          (this._newSortString = this.load.sort),
          (this._activeSort = this.load.sort),
          this._sort(),
          this._printSort()),
        (this._activeFilter =
          "all" === this.load.filter
            ? this.selectors.target
            : "none" === this.load.filter
            ? ""
            : this.load.filter),
        this.controls.enable && this._bindHandlers(),
        this.controls.toggleFilterButtons)
      ) {
        this._buildToggleArray();
        for (var a = 0; a < this._toggleArray.length; a++)
          this._updateControls(
            { filter: this._toggleArray[a], sort: this._activeSort },
            !0
          );
      } else
        this.controls.enable &&
          this._updateControls({
            filter: this._activeFilter,
            sort: this._activeSort,
          });
      this._filter();
      this._init = !0;
      this._$container.data("mixItUp", this);
      this._execAction("_init", 1, arguments);
      this._buildState();
      this._$targets.css(this._brake);
      this._goMix(this.animation.enable);
    },
    _platformDetect: function () {
      var b = ["Webkit", "Moz", "O", "ms"],
        d = ["webkit", "moz"],
        a = window.navigator.appVersion.match(/Chrome\/(\d+)\./) || !1,
        c = "undefined" != typeof InstallTrigger,
        e = (function (a) {
          for (var c = 0; c < b.length; c++)
            if (b[c] + "Transition" in a.style)
              return { prefix: "-" + b[c].toLowerCase() + "-", vendor: b[c] };
          return "transition" in a.style ? "" : !1;
        })(this._domNode);
      this._execAction("_platformDetect", 0);
      this._chrome = a ? parseInt(a[1], 10) : !1;
      this._ff = c
        ? parseInt(window.navigator.userAgent.match(/rv:([^)]+)\)/)[1])
        : !1;
      this._prefix = e.prefix;
      this._vendor = e.vendor;
      (this._suckMode = window.atob && this._prefix ? !1 : !0) &&
        (this.animation.enable = !1);
      this._ff && 4 >= this._ff && (this.animation.enable = !1);
      for (a = 0; a < d.length && !window.requestAnimationFrame; a++)
        window.requestAnimationFrame = window[d[a] + "RequestAnimationFrame"];
      "function" != typeof Object.getPrototypeOf &&
        (Object.getPrototypeOf =
          "object" == typeof "test".__proto__
            ? function (a) {
                return a.__proto__;
              }
            : function (a) {
                return a.constructor.prototype;
              });
      this._domNode.nextElementSibling === h &&
        Object.defineProperty(Element.prototype, "nextElementSibling", {
          get: function () {
            for (var a = this.nextSibling; a; ) {
              if (1 === a.nodeType) return a;
              a = a.nextSibling;
            }
            return null;
          },
        });
      this._execAction("_platformDetect", 1);
    },
    _refresh: function (b, d) {
      this._execAction("_refresh", 0, arguments);
      this._$targets = this._$container.find(this.selectors.target);
      for (var a = 0; a < this._$targets.length; a++) {
        var c = this._$targets[a];
        if (c.dataset === h || d) {
          c.dataset = {};
          for (var e = 0; e < c.attributes.length; e++) {
            var k = c.attributes[e],
              p = k.name,
              k = k.value;
            -1 < p.indexOf("data-") &&
              ((p = this._helpers._camelCase(p.substring(5, p.length))),
              (c.dataset[p] = k));
          }
        }
        c.mixParent === h && (c.mixParent = this._id);
      }
      if (
        (this._$targets.length && b) ||
        (!this._origOrder.length && this._$targets.length)
      )
        for (this._origOrder = [], a = 0; a < this._$targets.length; a++)
          (c = this._$targets[a]), this._origOrder.push(c);
      this._execAction("_refresh", 1, arguments);
    },
    _bindHandlers: function () {
      var b = this,
        d = e.MixItUp.prototype._bound._filter,
        a = e.MixItUp.prototype._bound._sort;
      b._execAction("_bindHandlers", 0);
      b.controls.live
        ? b._$body
            .on("click.mixItUp." + b._id, b.selectors.sort, function () {
              b._processClick(e(this), "sort");
            })
            .on("click.mixItUp." + b._id, b.selectors.filter, function () {
              b._processClick(e(this), "filter");
            })
        : ((b._$sortButtons = e(b.selectors.sort)),
          (b._$filterButtons = e(b.selectors.filter)),
          b._$sortButtons.on("click.mixItUp." + b._id, function () {
            b._processClick(e(this), "sort");
          }),
          b._$filterButtons.on("click.mixItUp." + b._id, function () {
            b._processClick(e(this), "filter");
          }));
      d[b.selectors.filter] =
        d[b.selectors.filter] === h ? 1 : d[b.selectors.filter] + 1;
      a[b.selectors.sort] =
        a[b.selectors.sort] === h ? 1 : a[b.selectors.sort] + 1;
      b._execAction("_bindHandlers", 1);
    },
    _processClick: function (b, d) {
      var a = this,
        c = function (b, c, d) {
          var k = e.MixItUp.prototype;
          k._handled["_" + c][a.selectors[c]] =
            k._handled["_" + c][a.selectors[c]] === h
              ? 1
              : k._handled["_" + c][a.selectors[c]] + 1;
          k._handled["_" + c][a.selectors[c]] ===
            k._bound["_" + c][a.selectors[c]] &&
            (b[(d ? "remove" : "add") + "Class"](a.controls.activeClass),
            delete k._handled["_" + c][a.selectors[c]]);
        };
      if (
        (a._execAction("_processClick", 0, arguments),
        !a._mixing ||
          (a.animation.queue && a._queue.length < a.animation.queueLimit))
      ) {
        if (((a._clicking = !0), "sort" === d)) {
          var n = b.attr("data-sort");
          (!b.hasClass(a.controls.activeClass) || -1 < n.indexOf("random")) &&
            (e(a.selectors.sort).removeClass(a.controls.activeClass),
            c(b, d),
            a.sort(n));
        }
        if ("filter" === d) {
          var k,
            n = b.attr("data-filter"),
            p = "or" === a.controls.toggleLogic ? "," : "";
          a.controls.toggleFilterButtons
            ? (a._buildToggleArray(),
              b.hasClass(a.controls.activeClass)
                ? (c(b, d, !0),
                  (k = a._toggleArray.indexOf(n)),
                  a._toggleArray.splice(k, 1))
                : (c(b, d), a._toggleArray.push(n)),
              (a._toggleArray = e.grep(a._toggleArray, function (a) {
                return a;
              })),
              (a._toggleString = a._toggleArray.join(p)),
              a.filter(a._toggleString))
            : b.hasClass(a.controls.activeClass) ||
              (e(a.selectors.filter).removeClass(a.controls.activeClass),
              c(b, d),
              a.filter(n));
        }
        a._execAction("_processClick", 1, arguments);
      } else
        "function" == typeof a.callbacks.onMixBusy &&
          a.callbacks.onMixBusy.call(a._domNode, a._state, a),
          a._execAction("_processClickBusy", 1, arguments);
    },
    _buildToggleArray: function () {
      var b = this._activeFilter.replace(/\s/g, "");
      if (
        (this._execAction("_buildToggleArray", 0, arguments),
        "or" === this.controls.toggleLogic)
      )
        this._toggleArray = b.split(",");
      else {
        this._toggleArray = b.split(".");
        !this._toggleArray[0] && this._toggleArray.shift();
        for (var d = 0; (b = this._toggleArray[d]); d++)
          this._toggleArray[d] = "." + b;
      }
      this._execAction("_buildToggleArray", 1, arguments);
    },
    _updateControls: function (b, d) {
      var a = { filter: b.filter, sort: b.sort },
        c = "filter",
        n = null;
      this._execAction("_updateControls", 0, arguments);
      b.filter === h && (a.filter = this._activeFilter);
      b.sort === h && (a.sort = this._activeSort);
      a.filter === this.selectors.target && (a.filter = "all");
      for (var k = 0; 2 > k; k++) {
        if (
          (n = this.controls.live
            ? e(this.selectors[c])
            : this["_$" + c + "Buttons"])
        ) {
          var p = "[data-" + c + '="' + a[c] + '"]';
          d && "filter" == c && "none" !== a.filter && "" !== a.filter
            ? n.filter(p).addClass(this.controls.activeClass)
            : n
                .removeClass(this.controls.activeClass)
                .filter(p)
                .addClass(this.controls.activeClass);
        }
        c = "sort";
      }
      this._execAction("_updateControls", 1, arguments);
    },
    _filter: function () {
      this._execAction("_filter", 0);
      for (var b = 0; b < this._$targets.length; b++) {
        var d = e(this._$targets[b]);
        d.is(this._activeFilter)
          ? (this._$show = this._$show.add(d))
          : (this._$hide = this._$hide.add(d));
      }
      this._execAction("_filter", 1);
    },
    _sort: function () {
      var b = this,
        d = function (a) {
          a = a.slice();
          for (var b = a.length, d = b; d--; ) {
            var e = parseInt(Math.random() * b),
              h = a[d];
            a[d] = a[e];
            a[e] = h;
          }
          return a;
        };
      b._execAction("_sort", 0);
      b._startOrder = [];
      for (var a = 0; a < b._$targets.length; a++)
        b._startOrder.push(b._$targets[a]);
      switch (b._newSort[0].sortBy) {
        case "default":
          b._newOrder = b._origOrder;
          break;
        case "random":
          b._newOrder = d(b._startOrder);
          break;
        case "custom":
          b._newOrder = b._newSort[0].order;
          break;
        default:
          b._newOrder = b._startOrder.concat().sort(function (a, d) {
            return b._compare(a, d);
          });
      }
      b._execAction("_sort", 1);
    },
    _compare: function (b, d, a) {
      a = a ? a : 0;
      var c = this,
        e = c._newSort[a].order,
        k = function (b) {
          return b.dataset[c._newSort[a].sortBy] || 0;
        },
        h = isNaN(1 * k(b)) ? k(b).toLowerCase() : 1 * k(b),
        k = isNaN(1 * k(d)) ? k(d).toLowerCase() : 1 * k(d);
      return k > h
        ? "asc" == e
          ? -1
          : 1
        : h > k
        ? "asc" == e
          ? 1
          : -1
        : h == k && c._newSort.length > a + 1
        ? c._compare(b, d, a + 1)
        : 0;
    },
    _printSort: function (b) {
      var d = b ? this._startOrder : this._newOrder,
        a = this._$parent[0].querySelectorAll(this.selectors.target),
        c = a[a.length - 1].nextElementSibling,
        e = document.createDocumentFragment();
      this._execAction("_printSort", 0, arguments);
      for (var k = 0; k < a.length; k++) {
        var h = a[k],
          m = h.nextSibling;
        "absolute" !== h.style.position &&
          (m && "#text" == m.nodeName && this._$parent[0].removeChild(m),
          this._$parent[0].removeChild(h));
      }
      for (k = 0; k < d.length; k++)
        (a = d[k]),
          "default" != this._newSort[0].sortBy ||
          "desc" != this._newSort[0].order ||
          b
            ? (e.appendChild(a), e.appendChild(document.createTextNode(" ")))
            : (e.insertBefore(a, e.firstChild),
              e.insertBefore(document.createTextNode(" "), a));
      c ? this._$parent[0].insertBefore(e, c) : this._$parent[0].appendChild(e);
      this._execAction("_printSort", 1, arguments);
    },
    _parseSort: function (b) {
      for (
        var d = "string" == typeof b ? b.split(" ") : [b], a = [], c = 0;
        c < d.length;
        c++
      ) {
        var e = "string" == typeof b ? d[c].split(":") : ["custom", d[c]],
          e = { sortBy: this._helpers._camelCase(e[0]), order: e[1] || "asc" };
        if ((a.push(e), "default" == e.sortBy || "random" == e.sortBy)) break;
      }
      return this._execFilter("_parseSort", a, arguments);
    },
    _parseEffects: function () {
      var b = this,
        d = { opacity: "", transformIn: "", transformOut: "", filter: "" },
        a = function (a, c) {
          if (-1 < b.animation.effects.indexOf(a)) {
            if (c) {
              var d = b.animation.effects.indexOf(a + "(");
              if (-1 < d)
                return (
                  (d = b.animation.effects.substring(d)),
                  { val: /\(([^)]+)\)/.exec(d)[1] }
                );
            }
            return !0;
          }
          return !1;
        },
        c = function (b, c) {
          for (
            var e = [
                ["scale", ".01"],
                ["translateX", "20px"],
                ["translateY", "20px"],
                ["translateZ", "20px"],
                ["rotateX", "90deg"],
                ["rotateY", "90deg"],
                ["rotateZ", "180deg"],
              ],
              h = 0;
            h < e.length;
            h++
          ) {
            var f = e[h][0],
              q = e[h][1],
              u = c && "scale" !== f,
              H = d[b],
              B;
            a(f)
              ? ((B = f + "("),
                (f = a(f, !0).val || q),
                (u = u
                  ? "-" === f.charAt(0)
                    ? f.substr(1, f.length)
                    : "-" + f
                  : f),
                (B = B + u + ") "))
              : (B = "");
            d[b] = H + B;
          }
        };
      return (
        (d.opacity = a("fade") ? a("fade", !0).val || "0" : "1"),
        c("transformIn"),
        b.animation.reverseOut
          ? c("transformOut", !0)
          : (d.transformOut = d.transformIn),
        (d.transition = {}),
        (d.transition = b._getPrefixedCSS(
          "transition",
          "all " +
            b.animation.duration +
            "ms " +
            b.animation.easing +
            ", opacity " +
            b.animation.duration +
            "ms linear"
        )),
        (b.animation.stagger = a("stagger") ? !0 : !1),
        (b.animation.staggerDuration = parseInt(
          a("stagger") && a("stagger", !0).val ? a("stagger", !0).val : 100
        )),
        b._execFilter("_parseEffects", d)
      );
    },
    _buildState: function (b) {
      var d = {};
      return (
        this._execAction("_buildState", 0),
        (d = {
          activeFilter: "" === this._activeFilter ? "none" : this._activeFilter,
          activeSort:
            b && this._newSortString ? this._newSortString : this._activeSort,
          fail: !this._$show.length && "" !== this._activeFilter,
          $targets: this._$targets,
          $show: this._$show,
          $hide: this._$hide,
          totalTargets: this._$targets.length,
          totalShow: this._$show.length,
          totalHide: this._$hide.length,
          display:
            b && this._newDisplay ? this._newDisplay : this.layout.display,
        }),
        b
          ? this._execFilter("_buildState", d)
          : ((this._state = d), void this._execAction("_buildState", 1))
      );
    },
    _goMix: function (b) {
      var d = this,
        a = function () {
          if (d._chrome && 31 === d._chrome) {
            var a = d._$parent[0],
              b = a.parentElement,
              e = document.createElement("div"),
              h = document.createDocumentFragment();
            b.insertBefore(e, a);
            h.appendChild(a);
            b.replaceChild(a, e);
          }
          d._setInter();
          c();
        },
        c = function () {
          var a = window.pageYOffset,
            b = window.pageXOffset;
          document.documentElement.scrollHeight;
          d._getInterMixData();
          d._setFinal();
          d._getFinalMixData();
          window.pageYOffset !== a && window.scrollTo(b, a);
          d._prepTargets();
          window.requestAnimationFrame
            ? requestAnimationFrame(e)
            : setTimeout(function () {
                e();
              }, 20);
        },
        e = function () {
          d._animateTargets();
          0 === d._targetsBound && d._cleanUp();
        },
        h = d._buildState(!0);
      d._execAction("_goMix", 0, arguments);
      !d.animation.duration && (b = !1);
      d._mixing = !0;
      d._$container.removeClass(d.layout.containerClassFail);
      "function" == typeof d.callbacks.onMixStart &&
        d.callbacks.onMixStart.call(d._domNode, d._state, h, d);
      d._$container.trigger("mixStart", [d._state, h, d]);
      d._getOrigMixData();
      b && !d._suckMode
        ? window.requestAnimationFrame
          ? requestAnimationFrame(a)
          : a()
        : d._cleanUp();
      d._execAction("_goMix", 1, arguments);
    },
    _getTargetData: function (b, d) {
      var a;
      b.dataset[d + "PosX"] = b.offsetLeft;
      b.dataset[d + "PosY"] = b.offsetTop;
      this.animation.animateResizeTargets &&
        ((a = window.getComputedStyle(b)),
        (b.dataset[d + "MarginBottom"] = parseInt(a.marginBottom)),
        (b.dataset[d + "MarginRight"] = parseInt(a.marginRight)),
        (b.dataset[d + "Width"] = b.offsetWidth),
        (b.dataset[d + "Height"] = b.offsetHeight));
    },
    _getOrigMixData: function () {
      var b = this._suckMode
        ? { boxSizing: "" }
        : window.getComputedStyle(this._$parent[0]);
      this._incPadding =
        "border-box" === (b.boxSizing || b[this._vendor + "BoxSizing"]);
      this._execAction("_getOrigMixData", 0);
      !this._suckMode && (this.effects = this._parseEffects());
      this._$toHide = this._$hide.filter(":visible");
      this._$toShow = this._$show.filter(":hidden");
      this._$pre = this._$targets.filter(":visible");
      this._startHeight = this._incPadding
        ? this._$parent.outerHeight()
        : this._$parent.height();
      for (b = 0; b < this._$pre.length; b++)
        this._getTargetData(this._$pre[b], "orig");
      this._execAction("_getOrigMixData", 1);
    },
    _setInter: function () {
      this._execAction("_setInter", 0);
      this._changingLayout && this.animation.animateChangeLayout
        ? (this._$toShow.css("display", this._newDisplay),
          this._changingClass &&
            this._$container
              .removeClass(this.layout.containerClass)
              .addClass(this._newClass))
        : this._$toShow.css("display", this.layout.display);
      this._execAction("_setInter", 1);
    },
    _getInterMixData: function () {
      this._execAction("_getInterMixData", 0);
      for (var b = 0; b < this._$toShow.length; b++) {
        var d = this._$toShow[b];
        this._getTargetData(d, "inter");
      }
      for (b = 0; b < this._$pre.length; b++)
        (d = this._$pre[b]), this._getTargetData(d, "inter");
      this._execAction("_getInterMixData", 1);
    },
    _setFinal: function () {
      this._execAction("_setFinal", 0);
      this._sorting && this._printSort();
      this._$toHide.removeStyle("display");
      this._changingLayout &&
        this.animation.animateChangeLayout &&
        this._$pre.css("display", this._newDisplay);
      this._execAction("_setFinal", 1);
    },
    _getFinalMixData: function () {
      this._execAction("_getFinalMixData", 0);
      for (var b = 0; b < this._$toShow.length; b++) {
        var d = this._$toShow[b];
        this._getTargetData(d, "final");
      }
      for (b = 0; b < this._$pre.length; b++)
        (d = this._$pre[b]), this._getTargetData(d, "final");
      this._newHeight = this._incPadding
        ? this._$parent.outerHeight()
        : this._$parent.height();
      this._sorting && this._printSort(!0);
      this._$toShow.removeStyle("display");
      this._$pre.css("display", this.layout.display);
      this._changingClass &&
        this.animation.animateChangeLayout &&
        this._$container
          .removeClass(this._newClass)
          .addClass(this.layout.containerClass);
      this._execAction("_getFinalMixData", 1);
    },
    _prepTargets: function () {
      var b = {
        _in: this._getPrefixedCSS("transform", this.effects.transformIn),
        _out: this._getPrefixedCSS("transform", this.effects.transformOut),
      };
      this._execAction("_prepTargets", 0);
      this.animation.animateResizeContainer &&
        this._$parent.css("height", this._startHeight + "px");
      for (var d = 0; d < this._$toShow.length; d++) {
        var a = this._$toShow[d],
          c = e(a);
        a.style.opacity = this.effects.opacity;
        a.style.display =
          this._changingLayout && this.animation.animateChangeLayout
            ? this._newDisplay
            : this.layout.display;
        c.css(b._in);
        this.animation.animateResizeTargets &&
          ((a.style.width = a.dataset.finalWidth + "px"),
          (a.style.height = a.dataset.finalHeight + "px"),
          (a.style.marginRight =
            -(a.dataset.finalWidth - a.dataset.interWidth) +
            1 * a.dataset.finalMarginRight +
            "px"),
          (a.style.marginBottom =
            -(a.dataset.finalHeight - a.dataset.interHeight) +
            1 * a.dataset.finalMarginBottom +
            "px"));
      }
      for (d = 0; d < this._$pre.length; d++)
        (a = this._$pre[d]),
          (c = e(a)),
          (b = this._getPrefixedCSS(
            "transform",
            "translate(" +
              (a.dataset.origPosX - a.dataset.interPosX) +
              "px," +
              (a.dataset.origPosY - a.dataset.interPosY) +
              "px)"
          )),
          c.css(b),
          this.animation.animateResizeTargets &&
            ((a.style.width = a.dataset.origWidth + "px"),
            (a.style.height = a.dataset.origHeight + "px"),
            a.dataset.origWidth - a.dataset.finalWidth &&
              (a.style.marginRight =
                -(a.dataset.origWidth - a.dataset.interWidth) +
                1 * a.dataset.origMarginRight +
                "px"),
            a.dataset.origHeight - a.dataset.finalHeight &&
              (a.style.marginBottom =
                -(a.dataset.origHeight - a.dataset.interHeight) +
                1 * a.dataset.origMarginBottom +
                "px"));
      this._execAction("_prepTargets", 1);
    },
    _animateTargets: function () {
      var b, d;
      this._execAction("_animateTargets", 0);
      this._targetsBound = this._targetsDone = 0;
      this._$parent
        .css(
          this._getPrefixedCSS(
            "perspective",
            this.animation.perspectiveDistance + "px"
          )
        )
        .css(
          this._getPrefixedCSS(
            "perspective-origin",
            this.animation.perspectiveOrigin
          )
        );
      this.animation.animateResizeContainer &&
        this._$parent
          .css(
            this._getPrefixedCSS(
              "transition",
              "height " + this.animation.duration + "ms ease"
            )
          )
          .css("height", this._newHeight + "px");
      for (var a = 0; a < this._$toShow.length; a++) {
        var c = this._$toShow[a],
          h = e(c);
        b = c.dataset.finalPosX - c.dataset.interPosX;
        d = c.dataset.finalPosY - c.dataset.interPosY;
        var k = this._getDelay(a),
          p = {};
        c.style.opacity = "";
        for (c = 0; 2 > c; c++) {
          var m = 0 === c ? (m = this._prefix) : "";
          this._ff &&
            20 >= this._ff &&
            ((p[m + "transition-property"] = "all"),
            (p[m + "transition-timing-function"] =
              this.animation.easing + "ms"),
            (p[m + "transition-duration"] = this.animation.duration + "ms"));
          p[m + "transition-delay"] = k + "ms";
          p[m + "transform"] = "translate(" + b + "px," + d + "px)";
        }
        (this.effects.transform || this.effects.opacity) &&
          this._bindTargetDone(h);
        this._ff && 20 >= this._ff
          ? h.css(p)
          : h.css(this.effects.transition).css(p);
      }
      for (a = 0; a < this._$pre.length; a++)
        (c = this._$pre[a]),
          (h = e(c)),
          (b = c.dataset.finalPosX - c.dataset.interPosX),
          (d = c.dataset.finalPosY - c.dataset.interPosY),
          (k = this._getDelay(a)),
          (c.dataset.finalPosX === c.dataset.origPosX &&
            c.dataset.finalPosY === c.dataset.origPosY) ||
            this._bindTargetDone(h),
          h.css(
            this._getPrefixedCSS(
              "transition",
              "all " +
                this.animation.duration +
                "ms " +
                this.animation.easing +
                " " +
                k +
                "ms"
            )
          ),
          h.css(
            this._getPrefixedCSS(
              "transform",
              "translate(" + b + "px," + d + "px)"
            )
          ),
          this.animation.animateResizeTargets &&
            (c.dataset.origWidth - c.dataset.finalWidth &&
              1 * c.dataset.finalWidth &&
              ((c.style.width = c.dataset.finalWidth + "px"),
              (c.style.marginRight =
                -(c.dataset.finalWidth - c.dataset.interWidth) +
                1 * c.dataset.finalMarginRight +
                "px")),
            c.dataset.origHeight - c.dataset.finalHeight &&
              1 * c.dataset.finalHeight &&
              ((c.style.height = c.dataset.finalHeight + "px"),
              (c.style.marginBottom =
                -(c.dataset.finalHeight - c.dataset.interHeight) +
                1 * c.dataset.finalMarginBottom +
                "px")));
      this._changingClass &&
        this._$container
          .removeClass(this.layout.containerClass)
          .addClass(this._newClass);
      for (a = 0; a < this._$toHide.length; a++) {
        c = this._$toHide[a];
        h = e(c);
        k = this._getDelay(a);
        b = {};
        for (c = 0; 2 > c; c++)
          (m = 0 === c ? (m = this._prefix) : ""),
            (b[m + "transition-delay"] = k + "ms"),
            (b[m + "transform"] = this.effects.transformOut),
            (b.opacity = this.effects.opacity);
        h.css(this.effects.transition).css(b);
        (this.effects.transform || this.effects.opacity) &&
          this._bindTargetDone(h);
      }
      this._execAction("_animateTargets", 1);
    },
    _bindTargetDone: function (b) {
      var d = this,
        a = b[0];
      d._execAction("_bindTargetDone", 0, arguments);
      a.dataset.bound ||
        ((a.dataset.bound = !0),
        d._targetsBound++,
        b.on("webkitTransitionEnd.mixItUp transitionend.mixItUp", function (c) {
          (-1 < c.originalEvent.propertyName.indexOf("transform") ||
            -1 < c.originalEvent.propertyName.indexOf("opacity")) &&
            e(c.originalEvent.target).is(d.selectors.target) &&
            (b.off(".mixItUp"), delete a.dataset.bound, d._targetDone());
        }));
      d._execAction("_bindTargetDone", 1, arguments);
    },
    _targetDone: function () {
      this._execAction("_targetDone", 0);
      this._targetsDone++;
      this._targetsDone === this._targetsBound && this._cleanUp();
      this._execAction("_targetDone", 1);
    },
    _cleanUp: function () {
      var b = this,
        d = b.animation.animateResizeTargets
          ? "transform opacity width height margin-bottom margin-right"
          : "transform opacity";
      unBrake = function () {
        b._$targets.removeStyle("transition", b._prefix);
      };
      b._execAction("_cleanUp", 0);
      b._changingLayout
        ? b._$show.css("display", b._newDisplay)
        : b._$show.css("display", b.layout.display);
      b._$targets.css(b._brake);
      b._$targets
        .removeStyle(d, b._prefix)
        .removeAttr(
          "data-inter-pos-x data-inter-pos-y data-final-pos-x data-final-pos-y data-orig-pos-x data-orig-pos-y data-orig-height data-orig-width data-final-height data-final-width data-inter-width data-inter-height data-orig-margin-right data-orig-margin-bottom data-inter-margin-right data-inter-margin-bottom data-final-margin-right data-final-margin-bottom"
        );
      b._$hide.removeStyle("display");
      b._$parent.removeStyle(
        "height transition perspective-distance perspective perspective-origin-x perspective-origin-y perspective-origin perspectiveOrigin",
        b._prefix
      );
      b._sorting &&
        (b._printSort(), (b._activeSort = b._newSortString), (b._sorting = !1));
      b._changingLayout &&
        (b._changingDisplay &&
          ((b.layout.display = b._newDisplay), (b._changingDisplay = !1)),
        b._changingClass &&
          (b._$parent
            .removeClass(b.layout.containerClass)
            .addClass(b._newClass),
          (b.layout.containerClass = b._newClass),
          (b._changingClass = !1)),
        (b._changingLayout = !1));
      b._refresh();
      b._buildState();
      b._state.fail && b._$container.addClass(b.layout.containerClassFail);
      b._$show = e();
      b._$hide = e();
      window.requestAnimationFrame && requestAnimationFrame(unBrake);
      b._mixing = !1;
      "function" == typeof b.callbacks._user &&
        b.callbacks._user.call(b._domNode, b._state, b);
      "function" == typeof b.callbacks.onMixEnd &&
        b.callbacks.onMixEnd.call(b._domNode, b._state, b);
      b._$container.trigger("mixEnd", [b._state, b]);
      b._state.fail &&
        ("function" == typeof b.callbacks.onMixFail &&
          b.callbacks.onMixFail.call(b._domNode, b._state, b),
        b._$container.trigger("mixFail", [b._state, b]));
      b._loading &&
        ("function" == typeof b.callbacks.onMixLoad &&
          b.callbacks.onMixLoad.call(b._domNode, b._state, b),
        b._$container.trigger("mixLoad", [b._state, b]));
      b._queue.length &&
        (b._execAction("_queue", 0),
        b.multiMix(b._queue[0][0], b._queue[0][1], b._queue[0][2]),
        b._queue.splice(0, 1));
      b._execAction("_cleanUp", 1);
      b._loading = !1;
    },
    _getPrefixedCSS: function (b, d, a) {
      var c = {};
      for (i = 0; 2 > i; i++) {
        var e = 0 === i ? this._prefix : "";
        c[e + b] = a ? e + d : d;
      }
      return this._execFilter("_getPrefixedCSS", c, arguments);
    },
    _getDelay: function (b) {
      var d =
        "function" == typeof this.animation.staggerSequence
          ? this.animation.staggerSequence.call(this._domNode, b, this._state)
          : b;
      return this._execFilter(
        "_getDelay",
        this.animation.stagger ? d * this.animation.staggerDuration : 0,
        arguments
      );
    },
    _parseMultiMixArgs: function (b) {
      for (
        var d = {
            command: null,
            animate: this.animation.enable,
            callback: null,
          },
          a = 0;
        a < b.length;
        a++
      ) {
        var c = b[a];
        null !== c &&
          ("object" == typeof c || "string" == typeof c
            ? (d.command = c)
            : "boolean" == typeof c
            ? (d.animate = c)
            : "function" == typeof c && (d.callback = c));
      }
      return this._execFilter("_parseMultiMixArgs", d, arguments);
    },
    _parseInsertArgs: function (b) {
      for (
        var d = {
            index: 0,
            $object: e(),
            multiMix: { filter: this._state.activeFilter },
            callback: null,
          },
          a = 0;
        a < b.length;
        a++
      ) {
        var c = b[a];
        "number" == typeof c
          ? (d.index = c)
          : "object" == typeof c && c instanceof e
          ? (d.$object = c)
          : "object" == typeof c && this._helpers._isElement(c)
          ? (d.$object = e(c))
          : "object" == typeof c && null !== c
          ? (d.multiMix = c)
          : "boolean" != typeof c || c
          ? "function" == typeof c && (d.callback = c)
          : (d.multiMix = !1);
      }
      return this._execFilter("_parseInsertArgs", d, arguments);
    },
    _execAction: function (b, d, a) {
      d = d ? "post" : "pre";
      if (!this._actions.isEmptyObject && this._actions.hasOwnProperty(b))
        for (var c in this._actions[b][d]) this._actions[b][d][c].call(this, a);
    },
    _execFilter: function (b, d, a) {
      if (this._filters.isEmptyObject || !this._filters.hasOwnProperty(b))
        return d;
      for (var c in this._filters[b]) return this._filters[b][c].call(this, a);
    },
    _helpers: {
      _camelCase: function (b) {
        return b.replace(/-([a-z])/g, function (b) {
          return b[1].toUpperCase();
        });
      },
      _isElement: function (b) {
        return window.HTMLElement
          ? b instanceof HTMLElement
          : null !== b && 1 === b.nodeType && "string" === b.nodeName;
      },
    },
    isMixing: function () {
      return this._execFilter("isMixing", this._mixing);
    },
    filter: function () {
      var b = this._parseMultiMixArgs(arguments);
      this._clicking && (this._toggleString = "");
      this.multiMix({ filter: b.command }, b.animate, b.callback);
    },
    sort: function () {
      var b = this._parseMultiMixArgs(arguments);
      this.multiMix({ sort: b.command }, b.animate, b.callback);
    },
    changeLayout: function () {
      var b = this._parseMultiMixArgs(arguments);
      this.multiMix({ changeLayout: b.command }, b.animate, b.callback);
    },
    multiMix: function () {
      var b = this._parseMultiMixArgs(arguments);
      if ((this._execAction("multiMix", 0, arguments), this._mixing))
        this.animation.queue && this._queue.length < this.animation.queueLimit
          ? (this._queue.push(arguments),
            this.controls.enable &&
              !this._clicking &&
              this._updateControls(b.command),
            this._execAction("multiMixQueue", 1, arguments))
          : ("function" == typeof this.callbacks.onMixBusy &&
              this.callbacks.onMixBusy.call(this._domNode, this._state, this),
            this._$container.trigger("mixBusy", [this._state, this]),
            this._execAction("multiMixBusy", 1, arguments));
      else {
        this.controls.enable &&
          !this._clicking &&
          (this.controls.toggleFilterButtons && this._buildToggleArray(),
          this._updateControls(b.command, this.controls.toggleFilterButtons));
        2 > this._queue.length && (this._clicking = !1);
        delete this.callbacks._user;
        b.callback && (this.callbacks._user = b.callback);
        var d = b.command.sort,
          a = b.command.filter,
          c = b.command.changeLayout;
        this._refresh();
        d &&
          ((this._newSort = this._parseSort(d)),
          (this._newSortString = d),
          (this._sorting = !0),
          this._sort());
        a !== h &&
          ((a = "all" === a ? this.selectors.target : a),
          (this._activeFilter = a));
        this._filter();
        c &&
          ((this._newDisplay =
            "string" == typeof c ? c : c.display || this.layout.display),
          (this._newClass = c.containerClass || ""),
          (this._newDisplay !== this.layout.display ||
            this._newClass !== this.layout.containerClass) &&
            ((this._changingLayout = !0),
            (this._changingClass =
              this._newClass !== this.layout.containerClass),
            (this._changingDisplay =
              this._newDisplay !== this.layout.display)));
        this._$targets.css(this._brake);
        this._goMix(
          b.animate ^ this.animation.enable ? b.animate : this.animation.enable
        );
        this._execAction("multiMix", 1, arguments);
      }
    },
    insert: function () {
      var b = this._parseInsertArgs(arguments),
        d = "function" == typeof b.callback ? b.callback : null,
        a = document.createDocumentFragment(),
        c =
          (this._refresh(),
          this._$targets.length
            ? b.index < this._$targets.length || !this._$targets.length
              ? this._$targets[b.index]
              : this._$targets[this._$targets.length - 1].nextElementSibling
            : this._$parent[0].children[0]);
      if ((this._execAction("insert", 0, arguments), b.$object)) {
        for (var e = 0; e < b.$object.length; e++)
          a.appendChild(b.$object[e]),
            a.appendChild(document.createTextNode(" "));
        this._$parent[0].insertBefore(a, c);
      }
      this._execAction("insert", 1, arguments);
      "object" == typeof b.multiMix && this.multiMix(b.multiMix, d);
    },
    prepend: function () {
      var b = this._parseInsertArgs(arguments);
      this.insert(0, b.$object, b.multiMix, b.callback);
    },
    append: function () {
      var b = this._parseInsertArgs(arguments);
      this.insert(this._state.totalTargets, b.$object, b.multiMix, b.callback);
    },
    getOption: function (b) {
      var d = function (a, b) {
        for (
          var d = b.split("."), e = d.pop(), p = d.length, m = 1, f = d[0] || b;
          (a = a[f]) && p > m;

        )
          (f = d[m]), m++;
        return a !== h ? (a[e] !== h ? a[e] : a) : void 0;
      };
      return b ? this._execFilter("getOption", d(this, b), arguments) : this;
    },
    setOptions: function (b) {
      this._execAction("setOptions", 0, arguments);
      "object" == typeof b && e.extend(!0, this, b);
      this._execAction("setOptions", 1, arguments);
    },
    getState: function () {
      return this._execFilter("getState", this._state, this);
    },
    forceRefresh: function () {
      this._refresh(!1, !0);
    },
    destroy: function (b) {
      this._execAction("destroy", 0, arguments);
      this._$body
        .add(e(this.selectors.sort))
        .add(e(this.selectors.filter))
        .off(".mixItUp");
      for (var d = 0; d < this._$targets.length; d++) {
        var a = this._$targets[d];
        b && (a.style.display = "");
        delete a.mixParent;
      }
      this._execAction("destroy", 1, arguments);
      delete e.MixItUp.prototype._instances[this._id];
    },
  };
  e.fn.mixItUp = function () {
    var b,
      d = arguments,
      a = [],
      c = function (a, b) {
        var c = new e.MixItUp();
        c._execAction("_instantiate", 0, arguments);
        a.id = a.id
          ? a.id
          : "MixItUp" +
            ("00000" + ((16777216 * Math.random()) << 0).toString(16))
              .substr(-6)
              .toUpperCase();
        c._instances[a.id] || ((c._instances[a.id] = c), c._init(a, b));
        c._execAction("_instantiate", 1, arguments);
      };
    return (
      (b = this.each(function () {
        if (d && "string" == typeof d[0]) {
          var b = e.MixItUp.prototype._instances[this.id];
          "isLoaded" == d[0]
            ? a.push(b ? !0 : !1)
            : ((b = b[d[0]](d[1], d[2], d[3])), b !== h && a.push(b));
        } else c(this, d[0]);
      })),
      a.length ? (1 < a.length ? a : a[0]) : b
    );
  };
  e.fn.removeStyle = function (b, d) {
    return (
      (d = d ? d : ""),
      this.each(function () {
        for (var a = b.split(" "), c = 0; c < a.length; c++)
          for (var e = 0; 2 > e; e++) {
            var k = e ? a[c] : d + a[c];
            if (
              (this.style[k] !== h &&
                "unknown" != typeof this.style[k] &&
                0 < this.style[k].length &&
                (this.style[k] = ""),
              !d)
            )
              break;
          }
        this.attributes &&
          this.attributes.style &&
          this.attributes.style !== h &&
          "" === this.attributes.style.value &&
          this.attributes.removeNamedItem("style");
      })
    );
  };
})(jQuery);
!(function (e) {
  "function" == typeof define && define.amd ? define(["jquery"], e) : e(jQuery);
})(function (e) {
  function h(a) {
    return a.replace(/(:|\.|\/)/g, "\\$1");
  }
  var b = {},
    d = function (a) {
      var b = [],
        d = !1,
        h = a.dir && "left" === a.dir ? "scrollLeft" : "scrollTop";
      return (
        this.each(function () {
          if (this !== document && this !== window) {
            var a = e(this);
            0 < a[h]()
              ? b.push(this)
              : (a[h](1), (d = 0 < a[h]()), d && b.push(this), a[h](0));
          }
        }),
        b.length ||
          this.each(function () {
            "BODY" === this.nodeName && (b = [this]);
          }),
        "first" === a.el && 1 < b.length && (b = [b[0]]),
        b
      );
    };
  e.fn.extend({
    scrollable: function (a) {
      a = d.call(this, { dir: a });
      return this.pushStack(a);
    },
    firstScrollable: function (a) {
      a = d.call(this, { el: "first", dir: a });
      return this.pushStack(a);
    },
    smoothScroll: function (a, b) {
      if (((a = a || {}), "options" === a))
        return b
          ? this.each(function () {
              var a = e(this),
                a = e.extend(a.data("ssOpts") || {}, b);
              e(this).data("ssOpts", a);
            })
          : this.first().data("ssOpts");
      var d = e.extend({}, e.fn.smoothScroll.defaults, a),
        k = e.smoothScroll.filterPath(location.pathname);
      return (
        this.unbind("click.smoothscroll").bind(
          "click.smoothscroll",
          function (a) {
            var b = e(this),
              c = e.extend({}, d, b.data("ssOpts") || {}),
              q = d.exclude,
              u = c.excludeWithin,
              H = 0,
              B = 0,
              E = !0,
              r = {},
              t = location.hostname === this.hostname || !this.hostname,
              L =
                c.scrollTarget ||
                e.smoothScroll.filterPath(this.pathname) === k,
              v = h(this.hash);
            if (c.scrollTarget || (t && L && v)) {
              for (; E && H < q.length; ) b.is(h(q[H++])) && (E = !1);
              for (; E && B < u.length; ) b.closest(u[B++]).length && (E = !1);
            } else E = !1;
            E &&
              (c.preventDefault && a.preventDefault(),
              e.extend(r, c, { scrollTarget: c.scrollTarget || v, link: this }),
              e.smoothScroll(r));
          }
        ),
        this
      );
    },
  });
  e.smoothScroll = function (a, c) {
    if ("options" === a && "object" == typeof c) return e.extend(b, c);
    var d, h, p, m, f;
    m = 0;
    var q = "offset",
      u = "scrollTop",
      H = {};
    p = {};
    "number" == typeof a
      ? ((d = e.extend({ link: null }, e.fn.smoothScroll.defaults, b)), (p = a))
      : ((d = e.extend({ link: null }, e.fn.smoothScroll.defaults, a || {}, b)),
        d.scrollElement &&
          ((q = "position"),
          "static" === d.scrollElement.css("position") &&
            d.scrollElement.css("position", "relative")));
    u = "left" === d.direction ? "scrollLeft" : u;
    d.scrollElement
      ? ((h = d.scrollElement),
        /^(?:HTML|BODY)$/.test(h[0].nodeName) || (m = h[u]()))
      : (h = e("html, body").firstScrollable(d.direction));
    d.beforeScroll.call(h, d);
    p =
      "number" == typeof a
        ? a
        : c ||
          (e(d.scrollTarget)[q]() && e(d.scrollTarget)[q]()[d.direction]) ||
          0;
    H[u] = p + m + d.offset;
    m = d.speed;
    "auto" === m &&
      ((f = H[u] - h.scrollTop()),
      0 > f && (f *= -1),
      (m = f / d.autoCoefficient));
    p = {
      duration: m,
      easing: d.easing,
      complete: function () {
        d.afterScroll.call(d.link, d);
      },
    };
    d.step && (p.step = d.step);
    h.length ? h.stop().animate(H, p) : d.afterScroll.call(d.link, d);
  };
  e.smoothScroll.version = "1.5.4";
  e.smoothScroll.filterPath = function (a) {
    return (
      (a = a || ""),
      a
        .replace(/^\//, "")
        .replace(/(?:index|default).[a-zA-Z]{3,4}$/, "")
        .replace(/\/$/, "")
    );
  };
  e.fn.smoothScroll.defaults = {
    exclude: [],
    excludeWithin: [],
    offset: 0,
    direction: "top",
    scrollElement: null,
    scrollTarget: null,
    beforeScroll: function () {},
    afterScroll: function () {},
    easing: "swing",
    speed: 400,
    autoCoefficient: 2,
    preventDefault: !0,
  };
});
!(function () {
  function e() {
    if (document.body) {
      var a = document.body,
        b = document.documentElement,
        c = window.innerHeight,
        e = a.scrollHeight;
      t = 0 <= document.compatMode.indexOf("CSS") ? b : a;
      f = a;
      u.keyboardSupport && window.addEventListener("keydown", d, !1);
      if (((r = !0), top != self)) B = !0;
      else if (e > c && (a.offsetHeight <= c || b.offsetHeight <= c)) {
        var h = !1;
        if (
          ((b.style.height = "auto"),
          setTimeout(function () {
            h ||
              b.scrollHeight == document.height ||
              ((h = !0),
              setTimeout(function () {
                b.style.height = document.height + "px";
                h = !1;
              }, 500));
          }, 10),
          t.offsetHeight <= c)
        )
          (c = document.createElement("div")),
            (c.style.clear = "both"),
            a.appendChild(c);
      }
      u.fixedBackground ||
        H ||
        ((a.style.backgroundAttachment = "scroll"),
        (b.style.backgroundAttachment = "scroll"));
    }
  }
  function h(a, b, c, d) {
    if ((d || (d = 1e3), k(b, c), 1 != u.accelerationMax)) {
      var e = +new Date() - w;
      e < u.accelerationDelta &&
        ((e = (1 + 30 / e) / 2),
        1 < e && ((e = Math.min(e, u.accelerationMax)), (b *= e), (c *= e)));
      w = +new Date();
    }
    if (
      (K.push({
        x: b,
        y: c,
        lastX: 0 > b ? 0.99 : -0.99,
        lastY: 0 > c ? 0.99 : -0.99,
        start: +new Date(),
      }),
      !I)
    ) {
      var f = a === document.body,
        h = function () {
          for (var e = +new Date(), k = 0, n = 0, p = 0; p < K.length; p++) {
            var q = K[p],
              r = e - q.start,
              t = r >= u.animationTime,
              v = t ? 1 : r / u.animationTime;
            u.pulseAlgorithm &&
              ((r = v),
              (v =
                1 <= r
                  ? 1
                  : 0 >= r
                  ? 0
                  : (1 == u.pulseNormalize && (u.pulseNormalize /= m(1)),
                    m(r))));
            r = (q.x * v - q.lastX) >> 0;
            v = (q.y * v - q.lastY) >> 0;
            k += r;
            n += v;
            q.lastX += r;
            q.lastY += v;
            t && (K.splice(p, 1), p--);
          }
          f
            ? window.scrollBy(k, n)
            : (k && (a.scrollLeft += k), n && (a.scrollTop += n));
          b || c || (K = []);
          K.length ? N(h, a, d / u.frameRate + 1) : (I = !1);
        };
      N(h, a, 0);
      I = !0;
    }
  }
  function b(a) {
    r || e();
    var b = a.target,
      c = n(b);
    if (
      !c ||
      a.defaultPrevented ||
      "embed" === (f.nodeName || "").toLowerCase() ||
      ("embed" === (b.nodeName || "").toLowerCase() && /\.pdf/i.test(b.src))
    )
      return !0;
    var b = a.wheelDeltaX || 0,
      d = a.wheelDeltaY || 0;
    b || d || (d = a.wheelDelta || 0);
    var k;
    if ((k = !u.touchpadSupport))
      if ((k = d)) {
        k = Math.abs(k);
        L.push(k);
        L.shift();
        clearTimeout(C);
        k = L[0] == L[1] && L[1] == L[2];
        var m = p(L[0], 120) && p(L[1], 120) && p(L[2], 120);
        k = !(k || m);
      } else k = void 0;
    return k
      ? !0
      : (1.2 < Math.abs(b) && (b *= u.stepSize / 120),
        1.2 < Math.abs(d) && (d *= u.stepSize / 120),
        h(c, -b, -d),
        a.preventDefault(),
        void 0);
  }
  function d(a) {
    var b = a.target,
      c =
        a.ctrlKey ||
        a.altKey ||
        a.metaKey ||
        (a.shiftKey && a.keyCode !== v.spacebar);
    if (
      /input|textarea|select|embed/i.test(b.nodeName) ||
      b.isContentEditable ||
      a.defaultPrevented ||
      c ||
      ("button" === (b.nodeName || "").toLowerCase() &&
        a.keyCode === v.spacebar)
    )
      return !0;
    var d;
    d = b = 0;
    var c = n(f),
      e = c.clientHeight;
    switch ((c == document.body && (e = window.innerHeight), a.keyCode)) {
      case v.up:
        d = -u.arrowScroll;
        break;
      case v.down:
        d = u.arrowScroll;
        break;
      case v.spacebar:
        d = a.shiftKey ? 1 : -1;
        d = 0.9 * -d * e;
        break;
      case v.pageup:
        d = 0.9 * -e;
        break;
      case v.pagedown:
        d = 0.9 * e;
        break;
      case v.home:
        d = -c.scrollTop;
        break;
      case v.end:
        e = c.scrollHeight - c.scrollTop - e;
        d = 0 < e ? e + 10 : 0;
        break;
      case v.left:
        b = -u.arrowScroll;
        break;
      case v.right:
        b = u.arrowScroll;
        break;
      default:
        return !0;
    }
    h(c, b, d);
    a.preventDefault();
  }
  function a(a) {
    f = a.target;
  }
  function c(a, b) {
    for (var c = a.length; c--; ) T[X(a[c])] = b;
    return b;
  }
  function n(a) {
    var b = [],
      d = t.scrollHeight;
    do {
      var e = T[X(a)];
      if (e) return c(b, e);
      if ((b.push(a), d === a.scrollHeight)) {
        if (!B || t.clientHeight + 10 < d) return c(b, document.body);
      } else if (
        a.clientHeight + 10 < a.scrollHeight &&
        ((overflow = getComputedStyle(a, "").getPropertyValue("overflow-y")),
        "scroll" === overflow || "auto" === overflow)
      )
        return c(b, a);
    } while ((a = a.parentNode));
  }
  function k(a, b) {
    a = 0 < a ? 1 : -1;
    b = 0 < b ? 1 : -1;
    (E.x !== a || E.y !== b) && ((E.x = a), (E.y = b), (K = []), (w = 0));
  }
  function p(a, b) {
    return Math.floor(a / b) == a / b;
  }
  function m(a) {
    var b, c, d;
    return (
      (a *= u.pulseScale),
      1 > a
        ? (b = a - (1 - Math.exp(-a)))
        : ((c = Math.exp(-1)),
          --a,
          (d = 1 - Math.exp(-a)),
          (b = c + d * (1 - c))),
      b * u.pulseNormalize
    );
  }
  var f,
    q = {
      frameRate: 150,
      animationTime: 800,
      stepSize: 120,
      pulseAlgorithm: !0,
      pulseScale: 8,
      pulseNormalize: 1,
      accelerationDelta: 20,
      accelerationMax: 1,
      keyboardSupport: !0,
      arrowScroll: 50,
      touchpadSupport: !0,
      fixedBackground: !0,
      excluded: "",
    },
    u = q,
    H = !1,
    B = !1,
    E = { x: 0, y: 0 },
    r = !1,
    t = document.documentElement,
    L = [120, 120, 120],
    v = {
      left: 37,
      up: 38,
      right: 39,
      down: 40,
      spacebar: 32,
      pageup: 33,
      pagedown: 34,
      end: 35,
      home: 36,
    },
    u = q,
    K = [],
    I = !1,
    w = +new Date(),
    T = {};
  setInterval(function () {
    T = {};
  }, 1e4);
  var C,
    X = (function () {
      var a = 0;
      return function (b) {
        return b.uniqueID || (b.uniqueID = a++);
      };
    })(),
    N = (function () {
      return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        function (a, b, c) {
          window.setTimeout(a, c || 1e3 / 60);
        }
      );
    })(),
    q = /chrome/i.test(window.navigator.userAgent);
  "onmousewheel" in document &&
    q &&
    (window.addEventListener("mousedown", a, !1),
    window.addEventListener("mousewheel", b, !1),
    window.addEventListener("load", e, !1));
})();
