!(function (e, t) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = t())
    : "function" == typeof define && define.amd
    ? define([], t)
    : "object" == typeof exports
    ? (exports.lipalater = t())
    : (e.lipalater = t());
})(self, function () {
  return (() => {
    "use strict";
    var e = {
        d: (t, o) => {
          for (var i in o)
            e.o(o, i) &&
              !e.o(t, i) &&
              Object.defineProperty(t, i, { enumerable: !0, get: o[i] });
        },
        o: (e, t) => Object.prototype.hasOwnProperty.call(e, t),
        r: (e) => {
          "undefined" != typeof Symbol &&
            Symbol.toStringTag &&
            Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
            Object.defineProperty(e, "__esModule", { value: !0 });
        },
      },
      t = {};
    e.r(t), e.d(t, { openModal: () => l });
    const o = [
        "delivery_option",
        "facility_plan",
        "item_brand",
        "item_code",
        "item_decription",
        "item_type",
        "item_value",
        "preferred_option",
        "store_key",
      ],
      i = "https://d30dyjax4jl3gk.cloudfront.net";
    function n(e, t) {
      const o = document.createElement("input");
      return (o.type = "hidden"), (o.name = e), (o.value = t), o;
    }
    function r(e) {
      return !e;
    }
    function l(e) {
      const { orderDetails: t, api_key: l, onFail: a, onSuccess: c } = e;
      if (r(l)) throw "api_key missing. Please provide an api_key";
      if (r(t))
        throw "orderDetails missing. Please provide the orderDetails object";
      t.items.map((e) => {
        const t = Object.keys(e);
        let i = o.filter((e) => !t.includes(e));
        if (i.length > 0)
          throw `One of the object(s) is missing the ${i} property`;
      });
      const d = (function () {
          const e = document.createElement("div");
          return (
            (e.className = "lipa-later-checkout__overlay"),
            (e.style.position = "fixed"),
            (e.style.width = "100%"),
            (e.style.height = "100%"),
            (e.style.top = "0"),
            (e.style.left = "0"),
            (e.style.right = "0"),
            (e.style.bottom = "0"),
            (e.style.backgroundColor = "#f0f4f8"),
            e
          );
        })(),
        s = (function () {
          const e = document.createElement("iframe");
          return (
            (e.id = "lipa-later-checkout"),
            (e.name = "lipa-later-checkout"),
            (e.width = "100%"),
            (e.height = "100%"),
            e
          );
        })();
      d.appendChild(s);
      const p = document.getElementsByTagName("script"),
        u = p[p.length - 1];
      u.parentNode.insertBefore(d, u.nextSibling),
        (function (e, t) {
          const o = e.items,
            r = document.createElement("form");
          (r.id = "lipa-later-item-data"),
            (r.method = "post"),
            (r.target = "lipa-later-checkout"),
            (r.action = i);
          const l = n("order_id", e.order_id),
            a = n("api_key", t),
            c = n("client_url", location.href);
          r.appendChild(l),
            r.appendChild(a),
            r.appendChild(c),
            o.map((e, t) => {
              for (const [o, i] of Object.entries(e)) {
                const e = n(o + (t + 1), i);
                r.appendChild(e);
              }
            }),
            document.body.appendChild(r),
            r.submit();
        })(t, l),
        window.addEventListener(
          "message",
          (e) => {
            if (e.origin === i) {
              const t = e.data;
              return (
                document.querySelector(".lipa-later-checkout__overlay") &&
                  document
                    .querySelector(".lipa-later-checkout__overlay")
                    .remove(),
                void (t.success ? c(t) : a(t))
              );
            }
            throw e.origin + " is an invalid origin";
          },
          !1
        );
    }
    return t;
  })();
});
//theoderic generated
