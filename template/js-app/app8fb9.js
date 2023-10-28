!(function (n) {
  var o = {};

  function i(e) {
    if (o[e]) return o[e].exports;
    var t = (o[e] = {
      i: e,
      l: !1,
      exports: {},
    });
    return n[e].call(t.exports, t, t.exports, i), (t.l = !0), t.exports;
  }
  (i.m = n),
    (i.c = o),
    (i.d = function (e, t, n) {
      i.o(e, t) ||
        Object.defineProperty(e, t, {
          enumerable: !0,
          get: n,
        });
    }),
    (i.r = function (e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, {
          value: "Module",
        }),
        Object.defineProperty(e, "__esModule", {
          value: !0,
        });
    }),
    (i.t = function (t, e) {
      if ((1 & e && (t = i(t)), 8 & e)) return t;
      if (4 & e && "object" == typeof t && t && t.__esModule) return t;
      var n = Object.create(null);
      if (
        (i.r(n),
        Object.defineProperty(n, "default", {
          enumerable: !0,
          value: t,
        }),
        2 & e && "string" != typeof t)
      )
        for (var o in t)
          i.d(
            n,
            o,
            function (e) {
              return t[e];
            }.bind(null, o)
          );
      return n;
    }),
    (i.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
              return e.default;
            }
          : function () {
              return e;
            };
      return i.d(t, "a", t), t;
    }),
    (i.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (i.p = ""),
    i((i.s = 4));
})([
  ,
  ,
  ,
  ,
  function (e, t, n) {
    var o, i;
    angular.module("appweb", [
      "ngMessageFormat",
      "ngSanitize",
      "angularFileUpload",
      "pascalprecht.translate",
      "angularSpinner",
      "ngCookies",
      "ngMd5",
    ]),
      ((o = function (e, t, n) {
        return (
          (e.defaults.withCredentials = !0),
          delete sessionStorage.galaxyCountTime,
          (e = $("html").attr("lang")),
          $.ajax({
            url: "/language/en.json",
          }).done(function (e) {
            return t.translations("en", e);
          }),
          $.ajax({
            url: "/language/vi.json",
          }).done(function (e) {
            return t.translations("vi", e);
          }),
          t.preferredLanguage(e || "vi"),
          n.setDefaults({
            color: "white",
            position: "fixed",
          })
        );
      }).$inject = [
        "$httpProvider",
        "$translateProvider",
        "usSpinnerConfigProvider",
      ]),
      ((i = function (e, t, n) {
        var o, i;
        return (
          (t.startSpinner = function () {
            return n.spin("spinner-1"), $("#overlay").show();
          }),
          (t.stopSpinner = function () {
            return n.stop("spinner-1"), $("#overlay").hide();
          }),
          (t.isMobile = !1),
          (navigator.userAgent.match(/Android/i) ||
            navigator.userAgent.match(/webOS/i) ||
            navigator.userAgent.match(/iPhone/i) ||
            navigator.userAgent.match(/iPad/i) ||
            navigator.userAgent.match(/iPod/i) ||
            navigator.userAgent.match(/BlackBerry/i) ||
            navigator.userAgent.match(/Windows Phone/i)) &&
            (t.isMobile = !0),
          (t.showLogin = !0),
          (t.showForget = !1),
          (t.showSuccess = !1),
          (i = 0),
          (o = function () {
            if (!(60 < i))
              return window.ga && window.ga.getAll
                ? window.ga.getAll().forEach(function (e) {
                    return (window.gacid = e.get("clientId"));
                  })
                : (i++, setTimeout(o, 500));
          })()
        );
      }).$inject = ["UtitService", "$rootScope", "usSpinnerService"]),
      angular.module("appweb").config(o).run(i),
      angular.element(document).ready(function () {}),
      n(5),
      n(6),
      n(7),
      n(8),
      n(9),
      n(10),
      n(11),
      n(12),
      n(13),
      n(14),
      n(15),
      n(16),
      n(17),
      n(18),
      n(19),
      n(20),
      n(21),
      n(22),
      n(23),
      n(24);
  },
  function (e, t) {
    var n = function (n, o) {
      return (
        (this.requestSuccess = function (e, t) {
          return n.stopSpinner(), e(null, t.data);
        }),
        (this.requestError = function (e, t) {
          return (
            n.stopSpinner(),
            null === t.data &&
              (t.data = {
                message: "Unknown error",
              }),
            e(t.data, null)
          );
        }),
        (this.request = function (e, t) {
          return (
            null == e && (e = {}),
            "GET" ===
              (e = _.extend(e, {
                headers: {
                  clientid: window.clientid,
                },
              })).method &&
              e.data &&
              ((e.url = e.url + "?" + $.param(e.data)), delete e.data),
            n.startSpinner(),
            o(e).then(
              this.requestSuccess.bind(this, t),
              this.requestError.bind(this, t)
            )
          );
        }),
        null
      );
    };
    (n.$inject = ["$rootScope", "$http"]),
      angular.module("appweb").service("ApiService", n);
  },
  function (e, t) {
    var n = function (a, o, i) {
      var r, c, u, s, l, d, m, p, g;
      return (
        (this.pageTracking = function (e, t) {
          var e = c(e, t),
            t = (window.dataLayer = window.dataLayer || []),
            n = {
              Page: {
                pageType: e,
              },
            };
          return (
            null != a.userInfo && (n.Customer = u(a.userInfo)),
            "NowShowing" === e && (n.Movies = l(a.movieShowing)),
            "ComingSoon" === e && (n.Movies = l(a.movieComingSoon)),
            "Actor" === e && (n.Actor = d(a.people)),
            "Director" === e && (n.Director = d(a.people)),
            ("MovieBooking" !== e && "MovieDetail" !== e) ||
              (n.Movie = s(a.movieDetail)),
            t.push(n)
          );
        }),
        (this.checkoutTracking = function (e, t, n) {
          var o = (window.dataLayer = window.dataLayer || []),
            i = {};
          return (
            null != a.userInfo && (i.Customer = u(a.userInfo)),
            (i.Movie = s(a.movieDetail)),
            "add" === e &&
              ((i.event = "addToCart"),
              (i.ecommerce = {
                currencyCode: "VND",
                subTotal: a.cartSubTotal,
                add: {
                  products: m(t, n, a.movieDetail.name),
                },
              })),
            "remove" === e &&
              ((i.event = "removeFromCart"),
              (i.ecommerce = {
                currencyCode: "VND",
                subTotal: a.cartSubTotal,
                remove: {
                  products: m(t, n, a.movieDetail.name),
                },
              })),
            o.push(i)
          );
        }),
        (this.purchaseTracking = function (e) {
          var t = (window.dataLayer = window.dataLayer || []),
            n = {},
            o = e.cinemaId + "-" + e.vistaTransNumber;
          if (r(o))
            return (
              null != a.userInfo && (n.Customer = u(a.userInfo)),
              (n.Movie = {
                title: e.movieName,
                titleID: e.movieId,
              }),
              (n.Cinema = {
                cinemaName: e.cinemaName,
                screenName: e.screenNumber,
              }),
              (n.ecommerce = {
                purchase: {
                  actionField: {
                    id: o,
                    affiliation: "Galaxy Cinema",
                    revenue: e.price,
                    tax: 0,
                    shipping: 0,
                    coupon: "",
                  },
                  products: g(e),
                },
              }),
              t.push(n),
              console.log("purchaseTracking", n, t)
            );
        }),
        (c = function (e, t) {
          var n;
          switch (e) {
            case "trang-chu":
              n = "Home";
              break;
            case "phim-dang-chieu":
              n = "NowShowing";
              break;
            case "phim-sap-chieu":
              n = "ComingSoon";
              break;
            case "dat-ve":
              n = "MovieBooking";
              break;
            case "dien-anh":
              n = "MovieListing";
              break;
            case "phim":
              n = "MovieDetail";
              break;
            case "rap-gia-ve":
              n = "Cinema";
              break;
            case "khuyen-mai":
              n = "Promotion";
              break;
            case "phim-hay":
              n = "MovieNews";
              break;
            case "dien-vien":
              n = "undefined" !== t ? "Actor" : "ActorListing";
              break;
            case "dao-dien":
              n = "undefined" !== t ? "Director" : "DirectorListing";
              break;
            case "binh-luan-phim":
              n = "undefined" !== t ? "MovieReview" : "MovieReviewListing";
              break;
            case "movie-blog":
              n = "undefined" !== t ? "MovieBlog" : "MovieBlogListing";
          }
          return n;
        }),
        (u = function (e) {
          var t = {
            customerId: e.memberId,
            customerGender: e.gender,
            customerCity: e.city,
          };
          return (
            null !== e.balanceList
              ? ((t.customerPoint = e.balanceList[0].pointsRemaining),
                (t.customerLifePoint =
                  e.balanceList[0].lifetimePointsBalanceDisplay))
              : ((t.customerPoint = 0), (t.customerLifePoint = 0)),
            t
          );
        }),
        (l = function (e) {
          for (var t, n = [], o = 0, i = e.length; o < i; o++)
            (t = e[o]),
              n.push({
                title: t.name,
                titleID: t.id,
              });
          return n;
        }),
        (s = function (e) {
          var t,
            n,
            o,
            i,
            a,
            r,
            c,
            u,
            s,
            l,
            d,
            m,
            p,
            g,
            f,
            h,
            v,
            b,
            w,
            y,
            S,
            k,
            C = {};
          if (
            ((C.title = e.name),
            (C.titleID = e.id),
            null != e.metadata.country &&
              (C.country = e.metadata.country[0].name),
            (y = new Date(e.startdate)),
            (C.releaseDate =
              y.getFullYear() + "/" + (y.getMonth() + 1) + "/" + y.getDate()),
            null != e.metadata.category)
          ) {
            for (
              c = [], u = 0, m = (h = e.metadata.category).length;
              u < m;
              u++
            )
              (r = h[u]), c.push(r.name);
            C.genre = c;
          }
          if (null != e.metadata.cast) {
            for (o = [], s = 0, p = (v = e.metadata.cast).length; s < p; s++)
              (n = v[s]),
                (t = new Date(n.birthday)),
                o.push({
                  name: n.name,
                  birthDate:
                    t.getFullYear() +
                    "/" +
                    (t.getMonth() + 1) +
                    "/" +
                    t.getDate(),
                });
            C.cast = o;
          }
          if (null != e.metadata.director) {
            for (
              a = [], l = 0, g = (b = e.metadata.director).length;
              l < g;
              l++
            )
              (i = b[l]),
                (t = new Date(i.birthday)),
                a.push({
                  name: i.name,
                  birthDate:
                    t.getFullYear() +
                    "/" +
                    (t.getMonth() + 1) +
                    "/" +
                    t.getDate(),
                });
            C.director = a;
          }
          if (null != e.metadata.studio) {
            for (k = [], d = 0, f = (w = e.metadata.studio).length; d < f; d++)
              (S = w[d]), k.push(S.name);
            C.studio = k;
          }
          return C;
        }),
        (d = function (e) {
          var t = new Date(e.birthday);
          return {
            name: e.name,
            birthDate:
              t.getFullYear() + "/" + (t.getMonth() + 1) + "/" + t.getDate(),
            bornCountry: e.country,
          };
        }),
        (m = function (e, t, n) {
          var o = "",
            i = "";
          return (
            "ticket" === e
              ? ((o = n + "/" + t.name + " - " + t.description),
                (i = t.ticketTypeCode))
              : "concession" === e &&
                ((o = n + "/" + t.description + " - " + t.extendedDescription),
                (i = t.vistaConcessionId)),
            (n = {
              name: o,
              id: i,
              price: t.displayPrice,
              brand: "",
              category: e,
              variant: "",
              quantity: 1,
            }),
            (o = []).push(n),
            o
          );
        }),
        (g = function (e) {
          for (
            var t,
              n,
              o,
              i,
              a,
              r,
              c = e.movieName,
              u = e.cinemaName,
              s = [],
              l = e.tickets,
              d = 0,
              m = l.length;
            d < m;
            d++
          )
            (i = {
              name: u + "/" + c + "/" + (r = l[d]).description,
              id: r.ticketTypeCode,
              price: r.priceInCents,
              brand: "",
              category: "ticket",
              variant: "",
              quantity: r.totalItem,
              ticketType: r.description,
              seats: p(e.seats),
            }),
              s.push(i);
          for (n = 0, o = (a = e.concessions).length; n < o; n++)
            (i = {
              name: u + "/" + c + "/" + (t = a[n]).description,
              id: t.itemId,
              price: t.priceInCents,
              brand: "",
              category: "concession",
              variant: "",
              quantity: t.totalItem,
            }),
              s.push(i);
          return s;
        }),
        (p = function (e) {
          for (var t, n = [], o = 0, i = e.length; o < i; o++)
            (t = {
              rowID: (t = e[o]).substr(0, 1),
              seatNumber: t.substr(1, t.length),
            }),
              n.push(t);
          return n;
        }),
        (r = function (e) {
          var t, n;
          return (
            (e = i.createHash(e)),
            (n = !1),
            ("undefined" !== (t = o.get("glx_tx")) && t === e) ||
              (o.put("glx_tx", e), (n = !0)),
            n
          );
        }),
        null
      );
    };
    (n.$inject = ["$rootScope", "$cookies", "md5"]),
      angular.module("appweb").service("GTMService", n);
  },
  function (e, t) {
    var n = function (o, e) {
      var t = this;
      return (
        (t.lang = function () {
          return $("html").attr("lang");
        }),
        (t.apply = function (e) {
          return setTimeout(function () {
            return e.$apply();
          }, 1);
        }),
        (t.notify = function (e, t, n) {
          return o.$broadcast(
            "show-dialog",
            {
              message: t,
              title: n,
            },
            e
          );
        }),
        (t.formatSessionDate = function (e) {
          var t = [
              "Chủ nhật",
              "Thứ hai",
              "Thứ ba",
              "Thứ tư",
              "Thứ năm",
              "Thứ sáu",
              "Thứ bảy",
            ],
            n = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"],
            o = new Date(e.replace(".000Z", ""));
          return {
            dayOfWeekLabel: t[o.getDay()],
            dayOfWeekKey: n[o.getDay()],
            showDate:
              o.getDate() + "/" + (o.getMonth() + 1) + "/" + o.getFullYear(),
            showTime: o.getHours() + ":" + o.getMinutes(),
            originDate: e,
          };
        }),
        (t.getHrefSearch = function (e) {
          var t = "phim";
          switch (e.modelType) {
            case "post":
              switch (e.type) {
                case "review":
                  t = "binh-luan-phim";
                  break;
                case "promotion":
                  t = "khuyen-mai";
              }
              break;
            case "metadata":
              switch (e.type) {
                case "cast":
                  t = "dien-vien";
                  break;
                case "directore":
                  t = "dao-dien";
              }
              break;
            case "cinema":
              t = "rap-gia-ve";
          }
          return "/" + t + "/" + e.slug;
        }),
        (t.disableRedirectBooking = function () {
          return localStorage.setItem("disableRedirectBooking", !0);
        }),
        (t.resetRedirectBooking = function () {
          return localStorage.removeItem("disableRedirectBooking");
        }),
        (t.isDisableRedirectBooking = function () {
          return localStorage.getItem("disableRedirectBooking") || !1;
        }),
        (t.setBookingTicketUrl = function (e) {
          if ("undefined" != typeof Storage)
            return localStorage.setItem("bookingTicketUrl", e);
        }),
        (t.redirectBookingTicketUrl = function () {
          var e;
          if (
            "undefined" != typeof Storage &&
            (e = localStorage.getItem("bookingTicketUrl"))
          )
            return (
              localStorage.removeItem("bookingTicketUrl"),
              (window.location.href = e)
            );
        }),
        (t.removeBookingTicketUrl = function () {
          if (
            "undefined" != typeof Storage &&
            localStorage.getItem("bookingTicketUrl")
          )
            return localStorage.removeItem("bookingTicketUrl");
        }),
        (t.createUUID = function () {
          var n = new Date().getTime();
          return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
            /[xy]/g,
            function (e) {
              var t = (n + 16 * Math.random()) % 16 | 0;
              return (
                (n = Math.floor(n / 16)),
                ("x" === e ? t : (3 & t) | 8).toString(16)
              );
            }
          );
        }),
        null
      );
    };
    (n.$inject = ["$rootScope", "$http"]),
      angular.module("appweb").service("UtitService", n);
  },
  function (e, t) {
    var n = function (e, n, t, o) {
      return (
        e.request(
          {
            url: "/api/movie/showAndComming",
            method: "GET",
            data: {},
          },
          function (e, t) {
            if (!e) return (n.item = t);
          }
        ),
        (n.openLinkVIG = function (e) {
          return "taptap" === e
            ? window.open("https://taptap.com.vn")
            : "android" === e
            ? window.open(
                "https://play.google.com/store/apps/details?id=com.vui.taptapandroid&hl=en"
              )
            : "ios" === e
            ? window.open(
                "https://apps.apple.com/vn/app/taptap-by-vui-vietnam/id1487758263"
              )
            : void 0;
        })
      );
    };
    (n.$inject = ["ApiService", "$scope", "UtitService", "$rootScope"]),
      angular.module("appweb").controller("navbarController", n);
  },
  function (e, t) {
    var n = function (t, u, n, s, o, a) {
      var l,
        e,
        i,
        r = null;
      (u.init = function (e, t, n, o, i, a, r, c) {
        return (
          (u.slug = e),
          (u.slugQuery = t),
          (u.userSessionId = n),
          (s.movieShowing = o),
          (s.movieComingSoon = i),
          (s.movieDetail = a),
          (s.people = r),
          c && (u.transactionInfo = c),
          l()
        );
      }),
        (e = function () {
          var e, t, o, i;
          try {
            return (
              (i = window.popupService),
              (o = i.client),
              (e = new i.MemberData()).setPlatform(""),
              (t = {
                token: a.get("sessionId"),
                "x-api-key": window.grpApiKey,
              }),
              (r = o.join(e, t, function (e, t) {})).on("data", function (e) {
                var t = e.toObject().msgId,
                  t = new i.MessageData([t]),
                  n = {
                    token: a.get("sessionId"),
                    "x-api-key": window.grpApiKey,
                  };
                return (
                  o.received(t, n, function (e) {}),
                  "undefined" != typeof Storage &&
                    localStorage.setItem(
                      "gp-popup",
                      JSON.stringify(e.toObject())
                    ),
                  $("#gp-service-modal").modal()
                );
              }),
              r.on("error", function (e) {
                return console.error("[Error] Stream e", e);
              })
            );
          } catch (e) {
            return console.error("[Error] Join e", e);
          }
        });
      try {
        e();
      } catch (e) {
        (i = e), console.log(i);
      }
      return (
        $("#gp-service-modal").on("shown.bs.modal", function () {
          var e;
          if ("undefined" != typeof Storage) {
            e = null;
            try {
              e = JSON.parse(localStorage.getItem("gp-popup"));
            } catch (e) {
              (i = e), console.log(i);
            }
            if (e) return (u.gpPopup = e), n.apply(u);
          }
        }),
        (u.closeGPModal = function () {
          return $("#gp-service-modal").modal("hide");
        }),
        (u.clickButton = function (e) {
          var t;
          return 1 === e.action
            ? $("#gp-service-modal").modal("hide")
            : 2 === (t = e.action) || 3 === t || 4 === t
            ? (window.open(e.webLink), $("#gp-service-modal").modal("hide"))
            : void 0;
        }),
        (u.logout = function () {
          return t.request(
            {
              url: "/api/auth/logout",
              method: "POST",
              data: {},
            },
            function (e, t) {
              return e
                ? n.notify(null, e.message)
                : ((s.userInfo = {}),
                  s.$broadcast("$logoutSuccess", t),
                  1 === window.location.pathname.indexOf("thanh-vien") &&
                    (window.location.href = "/"),
                  1 === window.location.pathname.indexOf("book-ticket")
                    ? window.location.reload()
                    : void 0);
            }
          );
        }),
        (u.openLogin = function () {
          return s.$broadcast("$openLogin"), $("#login-modal").modal("show");
        }),
        (l = function () {
          var e = {
            url: "/api/user/info",
            method: "GET",
            data: {
              userSessionId: u.userSessionId,
            },
          };
          return t.request(e, function (e, t) {
            if (
              (e || (s.userInfo = t),
              s.$broadcast("getUserInfo", t),
              o.pageTracking(u.slug, u.slugQuery),
              u.transactionInfo)
            )
              return o.purchaseTracking(u.transactionInfo);
          });
        })
      );
    };
    (n.$inject = [
      "ApiService",
      "$scope",
      "UtitService",
      "$rootScope",
      "GTMService",
      "$cookies",
    ]),
      angular.module("appweb").controller("headerController", n);
  },
  function (e, t) {
    var n = function (e, t, n, o) {
      return (t.closeModel = function () {
        return $("#popupPolicies").modal("hide");
      });
    };
    (n.$inject = ["ApiService", "$scope", "$rootScope", "$location"]),
      angular.module("appweb").controller("policiesPopupController", n);
  },
  function (e, t) {
    var n = function (e, n, t, o) {
      return (
        n.info,
        t.$on("$openPolicy", function () {
          return e.request(
            {
              url: "/api/policy/info",
              method: "GET",
            },
            function (e, t) {
              return (n.info = t);
            }
          );
        })
      );
    };
    (n.$inject = ["ApiService", "$scope", "$rootScope", "$location"]),
      angular.module("appweb").controller("policyController", n);
  },
  function (e, t) {
    var n = function (t, n, o) {
      return (
        (n.getHref = o.getHrefSearch),
        n.$watch("keyword", function (e) {
          if (((n.dataSearch = []), e))
            return t.request(
              {
                url: "/api/search/find",
                method: "GET",
                data: {
                  keyword: e,
                  limit: 10,
                },
              },
              function (e, t) {
                return e
                  ? o.notify(null, e.message)
                  : t
                  ? (n.dataSearch = t)
                  : void 0;
              }
            );
        })
      );
    };
    (n.$inject = ["ApiService", "$scope", "UtitService"]),
      angular.module("appweb").controller("searchController", n);
  },
  function (e, t) {
    var n = function (n, t, g, o, i, a) {
      var e,
        r,
        c,
        u,
        s = void 0,
        l = void 0,
        d = "";
      return (
        (g.activeTab = "byMovie"),
        (g.flagShowBlockTicket = !1),
        (g.clickTabNavTicket = function (e) {
          return (
            (g.activeTab = e),
            a(function () {
              return d === e
                ? ((g.flagShowBlockTicket = !1), void (d = ""))
                : ((d = e), (g.flagShowBlockTicket = !0));
            }, 500)
          );
        }),
        (r = function (e) {
          var n = [];
          return (
            _.map(e, function (t) {
              return _.map(t.sessions, function (e) {
                return (
                  (e.name =
                    e.showTime +
                    ", " +
                    i("translate")(t.version.toUpperCase()) +
                    " - " +
                    i("translate")(t.caption)),
                  n.push(e)
                );
              });
            }),
            n
          );
        }),
        g.$watch("activeTab", function (e) {
          if (void 0 !== e) {
            switch (e) {
              case "byMovie":
                (g.cinemaConfig.options = []), (g.dateConfig.options = []);
                break;
              case "byDate":
                (g.cinemaConfig.options = []), (g.movieConfig.options = []);
                break;
              case "byCinema":
                (g.movieConfig.options = []), (g.dateConfig.options = []);
            }
            return (g[e].currentValue = "all"), (g.sessionConfig.options = []);
          }
        }),
        (g.byMovie = {
          class: "btn-select-light",
          currentValue: "all",
          options: [],
          placeholder: {
            name: "Chọn phim",
            id: "all",
          },
          keyValue: "id",
          keyName: "name",
          disablePlaceholder: !0,
          onChange: function (e) {
            if (void 0 !== e) return (s = e.slug), u(e.id);
          },
        }),
        (g.byDate = {
          class: "btn-select-light",
          currentValue: "all",
          options: [],
          placeholder: {
            name: "Chọn ngày",
            id: "all",
          },
          keyValue: "id",
          keyName: "name",
          disablePlaceholder: !0,
          onChange: function (e) {
            if (void 0 !== e) return g.getCinemaByDate(e);
          },
        }),
        (g.byCinema = {
          class: "btn-select-light",
          currentValue: "all",
          options: [],
          placeholder: {
            name: "Chọn rạp",
            id: "all",
          },
          keyValue: "id",
          keyName: "name",
          disablePlaceholder: !0,
          onChange: function (e) {
            if (void 0 !== e) return c(e.code);
          },
        }),
        (g.movieConfig = {
          class: "btn-select-light",
          currentValue: "all",
          options: [],
          placeholder: {
            name: "Chọn phim",
            id: "all",
          },
          keyValue: "id",
          keyName: "name",
          disablePlaceholder: !0,
          onChange: function (e) {
            var t, n;
            if (void 0 !== e)
              if (((s = e.slug), "byCinema" === g.activeTab))
                g.setDates(e.dates);
              else if (
                (t = _.find(g.byDate.options, function (e) {
                  return e.id === g.byDate.currentValue;
                })) &&
                ((n = t.showDate),
                (t = _.find(e.dates, function (e) {
                  return e.showDate === n;
                })))
              )
                return (g.sessionConfig.options = r(t.bundles));
          },
        }),
        (g.cinemaConfig = {
          class: "btn-select-light",
          currentValue: "all",
          options: [],
          placeholder: {
            name: "Chọn rạp",
            id: "all",
          },
          keyValue: "id",
          keyName: "name",
          disablePlaceholder: !0,
          onChange: function (e) {
            if (void 0 !== e)
              return (g.movieConfig.options = e.movies), g.setDates(e.dates);
          },
        }),
        (g.dateConfig = {
          class: "btn-select-light",
          currentValue: "all",
          options: [],
          placeholder: {
            name: "Chọn ngày",
            id: "all",
          },
          keyValue: "id",
          keyName: "name",
          disablePlaceholder: !0,
          onChange: function (e) {
            if (void 0 !== e) return (g.sessionConfig.options = r(e.data));
          },
        }),
        (g.sessionConfig = {
          class: "btn-select-light",
          currentValue: "all",
          options: [],
          placeholder: {
            name: "Chọn suất",
            sessionId: "all",
          },
          keyValue: "sessionId",
          keyName: "name",
          disablePlaceholder: !0,
          onChange: function (e) {
            if (void 0 !== e)
              return (l = e), g.triggerBuy ? g.buyTicket() : void 0;
          },
        }),
        (u = function (e) {
          if (void 0 !== e)
            return t.request(
              {
                url: "/api/session/movie/" + e,
                method: "GET",
                data: {},
              },
              function (e, t) {
                var n, o, i, a, r, c, u, s, l, d, m, p;
                if (e) return console.error(e);
                for (a = [], r = 0, s = t.length; r < s; r++) {
                  if (((n = !1), 0 < (o = t[r]).dates.length))
                    for (c = 0, l = (m = o.dates).length; c < l; c++)
                      if (0 < (i = m[c]).bundles.length)
                        for (u = 0, d = (p = i.bundles).length; u < d; u++)
                          0 < p[u].sessions.length && (n = !0);
                  n && a.push(o);
                }
                return (g.cinemaConfig.options = a);
              }
            );
        }),
        (c = function (e) {
          if (void 0 !== e)
            return t.request(
              {
                url: "/api/session/cinema/" + e,
                method: "GET",
                data: {},
              },
              function (e, t) {
                return e ? console.error(e) : (g.movieConfig.options = t);
              }
            );
        }),
        (g.getCinemaByDate = function (e) {
          e = {
            url: "/api/session/date",
            method: "GET",
            data: {
              movieIds: e.movieIds,
              cinemaIds: e.cinemaIds,
            },
          };
          return t.request(e, function (e, t) {
            return e ? console.error(e) : (g.cinemaConfig.options = t);
          });
        }),
        (g.buyTicket = function () {
          var e, t;
          return void 0 === l
            ? alert("Bạn chưa chọn suất chiếu")
            : ((e =
                "/book-ticket/" +
                s +
                "?cinemaId=" +
                l.cinemaId +
                "&sessionId=" +
                l.sessionId),
              null != (t = n.userInfo) && t.memberId
                ? (location.href = e)
                : (o.setBookingTicketUrl(e),
                  void n.$broadcast("open-login", null, {
                    enableSkip: !1,
                  })));
        }),
        (g.setDates = function (e, t) {
          var n = [];
          return (
            _.map(e, function (e) {
              return n.push({
                id: e.showDate,
                name: e.dayOfWeekLabel + ", " + e.showDate,
                data: e.bundles,
              });
            }),
            (g.dateConfig.options = n)
          );
        }),
        (e = function (e, t) {
          return e
            ? o.notify(null, e.message)
            : ((g.items = t),
              (g.byMovie.options = t.movies),
              (g.byDate.options = t.dates),
              (g.byCinema.options = t.cinemas),
              g.reviewId &&
              ((e = _.findWhere(t.movies, {
                reviewId: g.reviewId,
              })),
              !_.isEmpty(e))
                ? (g.byMovie.currentValue = e.id)
                : void 0);
        }),
        (function () {
          return t.request(
            {
              url: "/api/booking/list",
              method: "GET",
              data: {},
            },
            e
          );
        })()
      );
    };
    (n.$inject = [
      "$rootScope",
      "ApiService",
      "$scope",
      "UtitService",
      "$filter",
      "$timeout",
    ]),
      angular.module("appweb").controller("quickBuyTicket", n);
  },
  function (e, t) {
    var n = function (t, n, o) {
      return (
        (n.init = function (e) {
          return (
            (n.item = e), (n.item.point = Math.round(100 * n.item.point) / 100)
          );
        }),
        (n.showRating = function (e) {
          return (
            null == e && (e = !0),
            console.log(n.item.activeRating),
            (n.item.activeRating = e)
          );
        }),
        (n.submit = function (e) {
          return (
            n.showRating(!1),
            (e = {
              url: "/api/post/rating/" + n.item.id,
              method: "GET",
              data: {
                point: e,
              },
            }),
            t.request(e, function (e, t) {
              return e
                ? o.notify(null, e.message)
                : (console.log(e, t),
                  (n.item.point = Math.round(100 * t.point) / 100),
                  (n.item.totalVotes = t.totalVotes));
            })
          );
        })
      );
    };
    (n.$inject = ["ApiService", "$scope", "UtitService"]),
      angular.module("appweb").controller("postController", n);
  },
  function (e, t) {
    var n = function (e, t) {};
    (n.$inject = ["$scope", "$rootScope"]),
      angular.module("appweb").controller("contentMovieController", n);
  },
  function (e, t) {
    var n = function (n, t, o, i, e) {
      var a;
      return (
        (o.isSubmit = !1),
        (o.enableSkip = !1),
        (o.callbackBuyTicket = void 0),
        (o.userNotActive = !1),
        (o.openLogin = !1),
        i.$on("$openLogin", function () {
          return (o.openLogin = !0);
        }),
        (o.openForgetPass = function () {
          return (
            $(".modal").modal("hide"),
            setTimeout(function () {
              return $("#forgetpass-modal").modal("show");
            }, 500)
          );
        }),
        (o.closeModel = function () {
          return $("#login-modal").modal("hide");
        }),
        (o.openModel = function () {
          return $("#login-modal").modal("show");
        }),
        (function () {
          if (
            ($("#login-modal").on("hidden.bs.modal", function () {
              return (
                n.removeBookingTicketUrl(),
                (o.enableSkip = !1),
                _.isFunction(o.callbackBuyTicket) && o.callbackBuyTicket(),
                (o.callbackBuyTicket = void 0),
                o.$apply()
              );
            }),
            i.$on("open-login", function (e, t, n) {
              return (
                n.enableSkip && (o.callbackBuyTicket = t),
                (o.enableSkip = n.enableSkip),
                i.$broadcast("$openLogin"),
                o.openModel()
              );
            }),
            (-1 === e.absUrl().indexOf("#tab_login_1") &&
              -1 === e.absUrl().indexOf("qac=login")) ||
              (i.$broadcast("$openLogin"),
              o.openModel(),
              setTimeout(function () {
                return (
                  angular
                    .element(document.querySelector("#tab_login_2"))
                    .removeClass("active"),
                  angular
                    .element(document.querySelector("#tab_login_1"))
                    .addClass("active"),
                  angular
                    .element(document.querySelector("#a_tab_login_2"))
                    .parent()
                    .removeClass("active"),
                  angular
                    .element(document.querySelector("#a_tab_login_1"))
                    .parent()
                    .addClass("active")
                );
              }, 250)),
            -1 !== e.absUrl().indexOf("#tab_login_2") ||
              -1 !== e.absUrl().indexOf("qac=register"))
          )
            return (
              i.$broadcast("$openLogin"),
              o.openModel(),
              setTimeout(function () {
                return (
                  angular
                    .element(document.querySelector("#tab_login_2"))
                    .addClass("active"),
                  angular
                    .element(document.querySelector("#tab_login_1"))
                    .removeClass("active"),
                  angular
                    .element(document.querySelector("#a_tab_login_2"))
                    .parent()
                    .addClass("active"),
                  angular
                    .element(document.querySelector("#a_tab_login_1"))
                    .parent()
                    .removeClass("active")
                );
              }, 250)
            );
        })(),
        (o.userInfo = {
          email: "",
          password: "",
          fullName: "",
          mobielPhone: "",
          confirmPassword: "",
          city: "",
          suburb: "",
          remember: !1,
        }),
        (o.submit = function () {
          var e;
          if (((o.message = null), !o.isSubmit))
            return (
              (o.isSubmit = !0),
              (o.userNotActive = !1),
              (e = {
                url: "/api/auth/login",
                method: "POST",
                data: o.userInfo,
              }),
              t.request(e, a)
            );
        }),
        (a = function (e, t) {
          return (
            (o.isSubmit = !1),
            e
              ? (4001 === e.code && (o.userNotActive = !0),
                void (o.message = e.message))
              : ((i.userInfo = t),
                i.$broadcast("$loginSuccess", t),
                o.closeModel(),
                (window.dataLayer || []).push({
                  event: "login",
                  customer: {
                    customerId: t.cardNumber,
                    customerGender: t.gender,
                    customerCity: t.city,
                  },
                }),
                0 < window.location.href.indexOf("book-ticket") ||
                0 < window.location.href.indexOf("thanh-toan-goi-dang-ky")
                  ? window.location.reload()
                  : n.redirectBookingTicketUrl())
          );
        }),
        (o.reSendActiveCode = function () {
          var e = {
            url: "/api/auth/reSendActiveCode",
            method: "POST",
            data: o.userInfo,
          };
          return t.request(e, function (e, t) {
            return (o.message = t.message);
          });
        })
      );
    };
    (n.$inject = [
      "UtitService",
      "ApiService",
      "$scope",
      "$rootScope",
      "$location",
    ]),
      angular.module("appweb").controller("loginController", n);
  },
  function (e, t) {
    var n = function (a, r, e, n) {
      var c;
      return (
        (r.message = ""),
        (r.isSubmit = !1),
        (r.isCountdownRefresh = !0),
        (r.captchaConfig = {
          type: "register",
          refesh: function () {
            return console.log("init Refesh");
          },
        }),
        (r.openPolicy = function () {
          return e.$broadcast("$openPolicy");
        }),
        (r.user = {
          email: "",
          password: "",
          fullName: "",
          mobilePhone: "",
          confirmPassword: "",
          suburb: "",
          dateOfBirth: "",
          platform: "",
          coordinate: "",
        }),
        (r.genderSelect = {
          currentValue: "3d",
          options: [
            {
              id: "Male",
              name: "Nam",
            },
            {
              id: "Female",
              name: "Nữ",
            },
          ],
          disablePlaceholder: !0,
          placeholder: {
            name: "Chọn giới tính",
            id: "3d",
          },
          keyValue: "id",
          keyName: "name",
        }),
        (r.registerStep = "register"),
        (r.otpCountDown = 0),
        (r.otpCountDownTime = 0),
        (r.otpCountDownTimer = null),
        (r.otpSender = ""),
        r.$watch("genderSelect.currentValue", function (e) {
          return (r.user.gender = e);
        }),
        (c = {
          url: "/api/city/find",
          method: "GET",
          data: {},
        }),
        a.request(c, function (e, t) {
          return e
            ? n.notify(null, e.message)
            : ((r.citySelect.options = t),
              (e = _.findWhere(t, {
                name: r.user.city,
              }))
                ? ((r.citySelect.currentValue = e.id),
                  (r.districtSelect.currentValue = r.user.suburb))
                : void 0);
        }),
        (r.submit = function () {
          var e, n, o;
          if (((r.message = null), (e = r.user.code), r.user.code)) {
            if (
              ((n = {
                fullName: r.user.fullName,
                email: r.user.email,
                mobilePhone: r.user.mobilePhone,
                password: r.user.password,
                confirmPassword: r.user.confirmPassword,
                gender: r.user.gender,
                dateOfBirth: r.user.dateOfBirth,
                platform: "website",
                coordinate: localStorage.getItem("geoCoords") || "",
              }),
              (o = window.dataLayer || []),
              "zalo" === r.otpSender)
            )
              return (
                (c = {
                  url: "/api/v2/mobile/sms/validate-otp",
                  method: "POST",
                  data: {
                    phone: r.user.mobilePhone,
                    pinCode: e,
                  },
                }),
                void a.request(c, function (e, t) {
                  if (!e && 0 === t.response.code)
                    return (
                      (c = {
                        url: "/api/auth/register",
                        method: "POST",
                        data: n,
                      }),
                      a.request(c, function (e, t) {
                        if (((r.isSubmit = !1), !e && 0 === t.code))
                          return (
                            o.push({
                              event: "sign_up",
                              customer: {
                                customerId: t.memberId,
                                customerGender: n.gender,
                              },
                            }),
                            (r.message = ""),
                            (r.user = {
                              email: "",
                              password: "",
                              fullName: "",
                              mobilePhone: "",
                              confirmPassword: "",
                              city: "",
                              suburb: "",
                              dateOfBirth: "",
                              address: "",
                            }),
                            r.closeModel(),
                            $(".btn-select-input.date").datepicker(
                              "setDate",
                              null
                            ),
                            $("#success-modal").modal("show")
                          );
                        r.message = e.message;
                      })
                    );
                  r.message = e.message;
                })
              );
            window.confirmationResult
              ? window.confirmationResult
                  .confirm(e)
                  .then(function (e) {
                    return (
                      (c = {
                        url: "/api/auth/register",
                        method: "POST",
                        data: n,
                      }),
                      a.request(c, function (e, t) {
                        if (((r.isSubmit = !1), !e && 0 === t.code))
                          return (
                            o.push({
                              event: "sign_up",
                              customer: {
                                customerId: t.memberId,
                                customerGender: n.gender,
                              },
                            }),
                            (r.message = ""),
                            (r.user = {
                              email: "",
                              password: "",
                              fullName: "",
                              mobilePhone: "",
                              confirmPassword: "",
                              city: "",
                              suburb: "",
                              dateOfBirth: "",
                              address: "",
                            }),
                            r.closeModel(),
                            $(".btn-select-input.date").datepicker(
                              "setDate",
                              null
                            ),
                            $("#success-modal").modal("show")
                          );
                        r.message = e.message;
                      })
                    );
                  })
                  .catch(function (e) {
                    (r.message = "Mã OTP không hợp lệ, vui lòng thử lại"),
                      (r.isSubmit = !1);
                  })
              : (r.message = "Captcha hết hiệu lực, vui lòng thử lại");
          } else r.message = "Chưa nhập code OTP!";
        }),
        (r.submitOTP = function () {
          var e, i;
          if (((r.message = null), !r.isSubmit)) {
            if (
              ((r.isSubmit = !0),
              r.user.mobilePhone.match(/^(\+84|0)(\d{9}|\d{10})$/i))
            )
              return r.user.gender && "3d" !== r.user.gender
                ? r.user.dateOfBirth
                  ? r.user.password.length < 8
                    ? ((r.message = "Vui lòng mật khẩu trên 8 ký tự."),
                      void (r.isSubmit = !1))
                    : r.user.password !== r.user.confirmPassword
                    ? ((r.message = "Mật khẩu xác nhận không khớp"),
                      void (r.isSubmit = !1))
                    : ((i = r.user.mobilePhone.replace(/^0/i, "+84")),
                      (e = moment(r.user.dateOfBirth, "DD/MM/YYYY").format(
                        "YYYY-MM-DD"
                      )),
                      (e = {
                        fullName: r.user.fullName,
                        email: r.user.email,
                        phone: i,
                        password: r.user.password,
                        gender: r.user.gender,
                        birthDay: e,
                        platform: "website",
                      }),
                      (c = {
                        url: "/api/v2/mobile/user/send-otp",
                        method: "POST",
                        data: e,
                      }),
                      a.request(c, function (e, t) {
                        var n, o;
                        if (((r.isSubmit = !1), !e && 0 === t.response.code))
                          return (
                            (r.otpSender =
                              null != t && null != (o = t.data)
                                ? o.sender
                                : void 0),
                            "zalo" === r.otpSender
                              ? ((r.registerStep = "otp"),
                                (r.otpCountDownTime = t.data.countTime),
                                (r.otpCountDown = r.otpCountDownTime),
                                void (r.otpCountDownTimer = setInterval(
                                  function () {
                                    if (
                                      (r.otpCountDown--,
                                      r.$apply(),
                                      r.otpCountDown <= 0)
                                    )
                                      return clearInterval(r.otpCountDownTimer);
                                  },
                                  1e3
                                )))
                              : (firebase.apps.length
                                  ? firebase.app()
                                  : firebase.initializeApp(
                                      window.firebaseConfig
                                    ),
                                $("#recaptcha-container").remove(),
                                $("<div>", {
                                  id: "recaptcha-container",
                                }).appendTo($("body")),
                                (n = new firebase.auth.RecaptchaVerifier(
                                  "recaptcha-container",
                                  {
                                    size: "invisible",
                                    callback: function (e) {
                                      return {};
                                    },
                                    "expired-callback": function () {
                                      return {};
                                    },
                                  }
                                )),
                                firebase
                                  .auth()
                                  .signInWithPhoneNumber(i, n)
                                  .then(function (e) {
                                    return (
                                      (window.confirmationResult = e),
                                      n && n.clear(),
                                      (r.registerStep = "otp"),
                                      (r.otpCountDownTime = t.data.countTime),
                                      (r.otpCountDown = r.otpCountDownTime),
                                      (r.otpCountDownTimer = setInterval(
                                        function () {
                                          if (
                                            (r.otpCountDown--,
                                            r.$apply(),
                                            r.otpCountDown <= 0)
                                          )
                                            return clearInterval(
                                              r.otpCountDownTimer
                                            );
                                        },
                                        1e3
                                      ))
                                    );
                                  })
                                  .catch(function (e) {
                                    (r.message =
                                      "Hệ thống không thể gửi OTP đến số điện thoại đăng ký, vui lòng thử lại"),
                                      (r.isSubmit = !1);
                                  }))
                          );
                        r.message = e.data.message;
                      }))
                  : ((r.message = "Chưa chọn ngày sinh!"),
                    void (r.isSubmit = !1))
                : ((r.message = "Chưa chọn giới tính!"),
                  void (r.isSubmit = !1));
            (r.message = "Số điện thoại chưa đúng!"), void (r.isSubmit = !1);
          }
        }),
        (r.recallOTP = function () {
          var o = r.user.mobilePhone.replace(/^0/i, "+84");
          return "zalo" === r.otpSender
            ? ((r.isSubmit = !0),
              (c = {
                url: "/api/v2/mobile/sms/send-otp",
                method: "POST",
                data: {
                  phone: window.registerUser.phone,
                },
              }),
              void a.request(c, function (e, t) {
                if (((r.isSubmit = !1), !e && 0 === t.response.code))
                  return (
                    (r.otpCountDown = r.otpCountDownTime),
                    (r.otpCountDownTimer = setInterval(function () {
                      if ((r.otpCountDown--, r.$apply(), r.otpCountDown <= 0))
                        return clearInterval(r.otpCountDownTimer);
                    }, 1e3))
                  );
                r.message = e.data.message;
              }))
            : (firebase.apps.length
                ? firebase.app()
                : firebase.initializeApp(window.firebaseConfig),
              (c = {
                url: "/api/v2/mobile/user/send-otp",
                method: "POST",
                data: window.registerUser,
              }),
              a.request(c, function (e, t) {
                var n;
                if (((r.isSubmit = !1), !e))
                  return 0 === t.response.code
                    ? (firebase.apps.length
                        ? firebase.app()
                        : firebase.initializeApp(window.firebaseConfig),
                      $("#recaptcha-container").remove(),
                      $("<div>", {
                        id: "recaptcha-container",
                      }).appendTo($("body")),
                      (n = new firebase.auth.RecaptchaVerifier(
                        "recaptcha-container",
                        {
                          size: "invisible",
                          callback: function (e) {
                            return {};
                          },
                          "expired-callback": function () {
                            return {};
                          },
                        }
                      )),
                      firebase
                        .auth()
                        .signInWithPhoneNumber(o, n)
                        .then(function (e) {
                          return (
                            (window.confirmationResult = e),
                            (r.otpCountDown = t.data.countTime),
                            n && n.clear(),
                            (r.otpCountDownTimer = setInterval(function () {
                              if (
                                (r.otpCountDown--,
                                r.$apply(),
                                r.otpCountDown <= 0)
                              )
                                return clearInterval(r.otpCountDownTimer);
                            }, 1e3))
                          );
                        })
                        .catch(function (e) {
                          (r.message =
                            "Hệ thống không thể gửi OTP đến số điện thoại đăng ký, vui lòng thử lại"),
                            (r.isSubmit = !1);
                        }))
                    : void 0;
                r.message = e.data.message;
              }));
        }),
        (r.closeModelSuccess = function () {
          return $("#success-modal").modal("hide");
        }),
        navigator.geolocation.getCurrentPosition(
          function (e) {
            return localStorage.setItem(
              "geoCoords",
              e.coords.latitude + "," + e.coords.longitude
            );
          },
          function (e) {
            return localStorage.setItem("geoCoords", "");
          }
        )
      );
    };
    (n.$inject = ["ApiService", "$scope", "$rootScope", "UtitService"]),
      angular.module("appweb").controller("registerController", n);
  },
  function (e, t) {
    var n = function (t, n, e) {
      return (
        (n.message = ""),
        (n.isSubmit = !1),
        (n.captchaConfig = {
          type: "forgetPass",
          refesh: function () {
            return console.log("init Refesh");
          },
        }),
        (n.item = {
          email: "",
          captcha: "",
        }),
        (n.closeModelForget = function () {
          return $("#forgetpass-modal").modal("hide");
        }),
        (n.submit = function () {
          var e;
          if (((n.message = null), !n.isSubmit))
            return (
              (n.isSubmit = !0),
              (e = {
                url: "/api/auth/forgetPassword",
                method: "POST",
                data: n.item,
              }),
              t.request(e, function (e, t) {
                return (
                  (n.isSubmit = !1),
                  n.captchaConfig.refesh(),
                  e
                    ? ((n.message = e.message), void (n.item.captcha = ""))
                    : ((n.message = t.message), console.log(t))
                );
              })
            );
        })
      );
    };
    (n.$inject = ["ApiService", "$scope", "$rootScope"]),
      angular.module("appweb").controller("forgetPassController", n);
  },
  function (e, t) {
    var n = function (e, t) {
      return {
        restrict: "E",
        scope: {
          model: "=ngModel",
        },
        template:
          "<a class=\"btn btn-select {{model.class ||'login location'}}\">\n\n   <span class=\"btn-select-value\">{{items[curentIndex][model.keyName] || model.placeholder[model.keyName] | translate}}</span>\n   <span class=\"btn-select-arrow\"></span>\n   <select ng-change='onChange()' ng-model=\"curentIndex\">\n     <option ng-if='!model.disablePlaceholder'\n       ng-selected='model.placeholder[model.keyValue] == model.currentValue'\n       ng-value='-1'>\n       {{model.placeholder[model.keyName] | translate}}\n     </option>\n     <option ng-repeat='item in items' \n       ng-selected='item[model.keyValue] == model.currentValue'\n       ng-value='{{$index}}'>\n       {{item[model.keyName] | translate}}\n     </option>\n   </select>\n </a>",
        link: function (n, e, t) {
          return (
            (n.curentIndex = -1),
            (n.model.changeCurrentIndex = function (e) {
              return (n.curentIndex = e);
            }),
            (n.onChange = function () {
              var e = (
                -1 < parseInt(n.curentIndex)
                  ? n.items[n.curentIndex]
                  : n.model.placeholder
              )[n.model.keyValue];
              if (((n.model.currentValue = e), _.isFunction(n.model.gotoHref)))
                return n.model.gotoHref(e);
            }),
            n.$watch(
              "model",
              function (e) {
                var t;
                if (void 0 !== e)
                  return (
                    (n.items = e.options),
                    ((t = {})[e.keyValue] = e.currentValue.toString()),
                    _.isFunction(n.model.onChange) &&
                      ((e = _.findWhere(n.model.options, t)),
                      n.model.onChange(e)),
                    (e = _.findIndex(n.items, t)),
                    (n.curentIndex = e)
                  );
              },
              !0
            )
          );
        },
      };
    };
    (n.$inject = ["$rootScope", "$document"]),
      angular.module("appweb").directive("galaxySelect", n);
  },
  function (e, t) {
    var n = function (o, i) {
      return {
        restrict: "E",
        scope: {
          config: "=",
        },
        template:
          '<div class="captcha-wrap">\n  <div ng-bind-html="captchaImage" class="captcha"></div>\n  <div class="captcha-refesh">\n    <a ng-click="refeshCaptcha()"><i class="icon-loading"></i></a>\n  </div>\n</div>',
        link: function (n, e, t) {
          return (
            (n.refeshCaptcha = function () {
              var e = {
                url:
                  "/api/auth/captcha/" +
                  ((null != (e = n.config) ? e.type : void 0) || "support"),
                method: "GET",
                data: {},
              };
              return o.request(e, function (e, t) {
                return (n.captchaImage = i.trustAsHtml(t));
              });
            }),
            n.$watch(
              "config",
              function (e) {
                if (void 0 !== e)
                  return (n.config.refesh = n.refeshCaptcha), n.refeshCaptcha();
              },
              !0
            )
          );
        },
      };
    };
    (n.$inject = ["ApiService", "$sce"]),
      angular.module("appweb").directive("galaxyCaptcha", n);
  },
  function (e, t) {
    var n = function (e, t) {
      return {
        restrict: "E",
        scope: {
          model: "=ngModel",
          onChange: "=ngOnChange",
        },
        template:
          '<a class="btn btn-select login location datepicker">\n   <input type="text" id=\'galaxy-datepicker\' name="" class="btn-select-input date" placeholder="Chọn ngày (dd/mm/yyyy)" readonly="readonly"/>\n   <span class="select-calendar">\n     <i class="icon-calendar"></i>\n   </span>\n</a>',
        link: function (i, a, e) {
          var t = function (t) {
            var n,
              e,
              o = $(a).find(".datepicker");
            if (
              (o.datepicker({
                format: "dd/mm/yyyy",
                autoclose: !0,
                constrainInput: !1,
              }),
              o.off("changeDate"),
              o.on("changeDate", function (e) {
                var t = moment(e.date).format("DD/MM/YYYY");
                return (
                  (i.model = t),
                  i.onChange && i.onChange(t),
                  setTimeout(function () {
                    return (
                      i.$apply(),
                      (document.getElementById("galaxy-datepicker").value = t)
                    );
                  }, 1)
                );
              }),
              (n = $(a).find(".btn-select-input.date")).keyup(
                (e = function () {
                  var e = n.val();
                  if (moment(e, "DD/MM/YYYY", !0).isValid())
                    return (t = e), o.datepicker("setDate", e);
                })
              ),
              n.focus(e),
              t)
            )
              return o.datepicker("setDate", t);
          };
          return i.$watch("model", function (e) {
            return (
              void 0 === e && (e = moment(new Date()).format("DD/MM/YYYY")),
              t(e)
            );
          });
        },
      };
    };
    (n.$inject = ["$rootScope", "$document"]),
      angular.module("appweb").directive("galaxyDatepicker", n);
  },
  function (e, t) {
    var n = function (e, t) {
      return {
        restrict: "E",
        scope: {
          title: "=",
          trailer: "=ngTrailer",
        },
        template:
          "<a class='btn primary animated fadeInUp' ng-click='submit()'> trailer</a>",
        link: function (t, e, n) {
          return (
            (t.submit = function () {
              var e =
                "<iframe width='100%', height='100%', src='" +
                t.trailer.replace("watch?v=", "embed/") +
                "?autoplay=1&controls=1&showinfo=1', frameborder='0', allowfullscreen=''/>";
              return (
                $("#trailerModal").modal("show"),
                $("#galaxyVideo").html(e),
                console.log(t.title),
                $("#trailerModal .modal-title").text(t.title)
              );
            }),
            $("#trailerModal").on("hide.bs.modal", function () {
              return $("#galaxyVideo").empty();
            })
          );
        },
      };
    };
    (n.$inject = ["$rootScope", "$document"]),
      angular.module("appweb").directive("galaxyWatchTrailer", n);
  },
  function (e, t) {
    var n = function (e, t, o, i, a) {
      return {
        restrict: "E",
        scope: {
          slug: "=ngMovieSlug",
        },
        template:
          '<form class="search-form" ng-submit=\'submit()\'>\n  <div class="input-append">\n    <input\n    placeholder="{{\'Tìm tên phim, diễn viên\' | translate}}..."\n    class="search-box"\n    type=\'text\'\n    autocomplete=\'off\'\n    ng-model=\'searchKey\'\n    ng-model-options=\'{ updateOn: "default blur", debounce: { default: 500, blur: 0 } }\',\n    ng-change=\'search(searchKey)\'\n    />\n    <button type="submit" class="search-btn"><i class="icon-search"></i></button>\n    <ul id="search-list" class="search-list" ng-if=\'dataSearch && dataSearch.items && dataSearch.items.length>0\'>\n      <li ng-repeat="item in dataSearch.items | limitTo:10">\n        <a href=\'{{getHref(item)}}\'>{{item.name}}</a>\n      </li>\n    </ul>\n  </div>\n</form>',
        link: function (n, e, t) {
          return (
            (n.dataSearch = []),
            (n.searchKey = ""),
            (n.submit = function () {
              return (location.href = "/tim-kiem?keyword=" + n.searchKey);
            }),
            (n.getHref = a.getHrefSearch),
            (n.search = function (e) {
              return _.isEmpty(e)
                ? (n.dataSearch = [])
                : o.request(
                    {
                      url: "/api/search/find",
                      method: "GET",
                      data: {
                        keyword: e,
                        limit: 10,
                      },
                    },
                    function (e, t) {
                      if (!e)
                        return i(function () {
                          if (t) return (n.dataSearch = t);
                        }, 1);
                    }
                  );
            })
          );
        },
      };
    };
    (n.$inject = [
      "$rootScope",
      "$document",
      "ApiService",
      "$timeout",
      "UtitService",
    ]),
      angular.module("appweb").directive("galaxySearchBar", n);
  },
  function (e, t) {
    var n = function () {
      return {
        restrict: "E",
        scope: {
          age: "=ngAge",
        },
        template: "<span ng-if='rating' class='age-rating'>{{ rating }}</span>",
        link: function (t, e, n) {
          return (
            (t.rating = null),
            t.$watch("age", function (e) {
              switch (e) {
                case "18":
                  return (t.rating = "T18");
                case "16":
                  return (t.rating = "T16");
                case "13":
                  return (t.rating = "T13");
                case "k":
                  return (t.rating = "K");
                case "c":
                  return (t.rating = "C");
                default:
                  return (t.rating = "");
              }
            })
          );
        },
      };
    };
    angular.module("appweb").directive("galaxyAgeRating", n);
  },
]);
