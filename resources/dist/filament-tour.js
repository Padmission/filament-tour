(() => {
  // ../../../filament-tour/node_modules/driver.js/dist/driver.js.mjs
  var z = {};
  var J;
  function F(e = {}) {
    z = {
      animate: true,
      allowClose: true,
      overlayClickBehavior: "close",
      overlayOpacity: 0.7,
      smoothScroll: false,
      disableActiveInteraction: false,
      showProgress: false,
      stagePadding: 10,
      stageRadius: 5,
      popoverOffset: 10,
      showButtons: ["next", "previous", "close"],
      disableButtons: [],
      overlayColor: "#000",
      ...e
    };
  }
  function s(e) {
    return e ? z[e] : z;
  }
  function le(e) {
    J = e;
  }
  function _() {
    return J;
  }
  var I = {};
  function N(e, o) {
    I[e] = o;
  }
  function L(e) {
    var o;
    (o = I[e]) == null || o.call(I);
  }
  function de() {
    I = {};
  }
  function O(e, o, t, i) {
    return (e /= i / 2) < 1 ? t / 2 * e * e + o : -t / 2 * (--e * (e - 2) - 1) + o;
  }
  function U(e) {
    const o = 'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])';
    return e.flatMap((t) => {
      const i = t.matches(o), d = Array.from(t.querySelectorAll(o));
      return [...i ? [t] : [], ...d];
    }).filter((t) => getComputedStyle(t).pointerEvents !== "none" && ve(t));
  }
  function ee(e) {
    if (!e || ue(e))
      return;
    const o = s("smoothScroll"), t = e.offsetHeight > window.innerHeight;
    e.scrollIntoView({
      // Removing the smooth scrolling for elements which exist inside the scrollable parent
      // This was causing the highlight to not properly render
      behavior: !o || pe(e) ? "auto" : "smooth",
      inline: "center",
      block: t ? "start" : "center"
    });
  }
  function pe(e) {
    if (!e || !e.parentElement)
      return;
    const o = e.parentElement;
    return o.scrollHeight > o.clientHeight;
  }
  function ue(e) {
    const o = e.getBoundingClientRect();
    return o.top >= 0 && o.left >= 0 && o.bottom <= (window.innerHeight || document.documentElement.clientHeight) && o.right <= (window.innerWidth || document.documentElement.clientWidth);
  }
  function ve(e) {
    return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length);
  }
  var D = {};
  function k(e, o) {
    D[e] = o;
  }
  function l(e) {
    return e ? D[e] : D;
  }
  function X() {
    D = {};
  }
  function fe(e, o, t, i) {
    let d = l("__activeStagePosition");
    const n = d || t.getBoundingClientRect(), f = i.getBoundingClientRect(), w = O(e, n.x, f.x - n.x, o), r = O(e, n.y, f.y - n.y, o), v = O(e, n.width, f.width - n.width, o), g = O(e, n.height, f.height - n.height, o);
    d = {
      x: w,
      y: r,
      width: v,
      height: g
    }, oe(d), k("__activeStagePosition", d);
  }
  function te(e) {
    if (!e)
      return;
    const o = e.getBoundingClientRect(), t = {
      x: o.x,
      y: o.y,
      width: o.width,
      height: o.height
    };
    k("__activeStagePosition", t), oe(t);
  }
  function he() {
    const e = l("__activeStagePosition"), o = l("__overlaySvg");
    if (!e)
      return;
    if (!o) {
      console.warn("No stage svg found.");
      return;
    }
    const t = window.innerWidth, i = window.innerHeight;
    o.setAttribute("viewBox", `0 0 ${t} ${i}`);
  }
  function ge(e) {
    const o = we(e);
    document.body.appendChild(o), re(o, (t) => {
      t.target.tagName === "path" && L("overlayClick");
    }), k("__overlaySvg", o);
  }
  function oe(e) {
    const o = l("__overlaySvg");
    if (!o) {
      ge(e);
      return;
    }
    const t = o.firstElementChild;
    if ((t == null ? void 0 : t.tagName) !== "path")
      throw new Error("no path element found in stage svg");
    t.setAttribute("d", ie(e));
  }
  function we(e) {
    const o = window.innerWidth, t = window.innerHeight, i = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    i.classList.add("driver-overlay", "driver-overlay-animated"), i.setAttribute("viewBox", `0 0 ${o} ${t}`), i.setAttribute("xmlSpace", "preserve"), i.setAttribute("xmlnsXlink", "http://www.w3.org/1999/xlink"), i.setAttribute("version", "1.1"), i.setAttribute("preserveAspectRatio", "xMinYMin slice"), i.style.fillRule = "evenodd", i.style.clipRule = "evenodd", i.style.strokeLinejoin = "round", i.style.strokeMiterlimit = "2", i.style.zIndex = "10000", i.style.position = "fixed", i.style.top = "0", i.style.left = "0", i.style.width = "100%", i.style.height = "100%";
    const d = document.createElementNS("http://www.w3.org/2000/svg", "path");
    return d.setAttribute("d", ie(e)), d.style.fill = s("overlayColor") || "rgb(0,0,0)", d.style.opacity = `${s("overlayOpacity")}`, d.style.pointerEvents = "auto", d.style.cursor = "auto", i.appendChild(d), i;
  }
  function ie(e) {
    const o = window.innerWidth, t = window.innerHeight, i = s("stagePadding") || 0, d = s("stageRadius") || 0, n = e.width + i * 2, f = e.height + i * 2, w = Math.min(d, n / 2, f / 2), r = Math.floor(Math.max(w, 0)), v = e.x - i + r, g = e.y - i, y = n - r * 2, a = f - r * 2;
    return `M${o},0L0,0L0,${t}L${o},${t}L${o},0Z
    M${v},${g} h${y} a${r},${r} 0 0 1 ${r},${r} v${a} a${r},${r} 0 0 1 -${r},${r} h-${y} a${r},${r} 0 0 1 -${r},-${r} v-${a} a${r},${r} 0 0 1 ${r},-${r} z`;
  }
  function me() {
    const e = l("__overlaySvg");
    e && e.remove();
  }
  function ye() {
    const e = document.getElementById("driver-dummy-element");
    if (e)
      return e;
    let o = document.createElement("div");
    return o.id = "driver-dummy-element", o.style.width = "0", o.style.height = "0", o.style.pointerEvents = "none", o.style.opacity = "0", o.style.position = "fixed", o.style.top = "50%", o.style.left = "50%", document.body.appendChild(o), o;
  }
  function j(e) {
    const { element: o } = e;
    let t = typeof o == "function" ? o() : typeof o == "string" ? document.querySelector(o) : o;
    t || (t = ye()), be(t, e);
  }
  function xe() {
    const e = l("__activeElement"), o = l("__activeStep");
    e && (te(e), he(), ae(e, o));
  }
  function be(e, o) {
    var C;
    const i = Date.now(), d = l("__activeStep"), n = l("__activeElement") || e, f = !n || n === e, w = e.id === "driver-dummy-element", r = n.id === "driver-dummy-element", v = s("animate"), g = o.onHighlightStarted || s("onHighlightStarted"), y = (o == null ? void 0 : o.onHighlighted) || s("onHighlighted"), a = (d == null ? void 0 : d.onDeselected) || s("onDeselected"), p = s(), c = l();
    !f && a && a(r ? void 0 : n, d, {
      config: p,
      state: c,
      driver: _()
    }), g && g(w ? void 0 : e, o, {
      config: p,
      state: c,
      driver: _()
    });
    const u = !f && v;
    let h = false;
    Se(), k("previousStep", d), k("previousElement", n), k("activeStep", o), k("activeElement", e);
    const m = () => {
      if (l("__transitionCallback") !== m)
        return;
      const b = Date.now() - i, E = 400 - b <= 400 / 2;
      o.popover && E && !h && u && (Q(e, o), h = true), s("animate") && b < 400 ? fe(b, 400, n, e) : (te(e), y && y(w ? void 0 : e, o, {
        config: s(),
        state: l(),
        driver: _()
      }), k("__transitionCallback", void 0), k("__previousStep", d), k("__previousElement", n), k("__activeStep", o), k("__activeElement", e)), window.requestAnimationFrame(m);
    };
    k("__transitionCallback", m), window.requestAnimationFrame(m), ee(e), !u && o.popover && Q(e, o), n.classList.remove("driver-active-element", "driver-no-interaction"), n.removeAttribute("aria-haspopup"), n.removeAttribute("aria-expanded"), n.removeAttribute("aria-controls"), ((C = o.disableActiveInteraction) != null ? C : s("disableActiveInteraction")) && e.classList.add("driver-no-interaction"), e.classList.add("driver-active-element"), e.setAttribute("aria-haspopup", "dialog"), e.setAttribute("aria-expanded", "true"), e.setAttribute("aria-controls", "driver-popover-content");
  }
  function Ce() {
    var e;
    (e = document.getElementById("driver-dummy-element")) == null || e.remove(), document.querySelectorAll(".driver-active-element").forEach((o) => {
      o.classList.remove("driver-active-element", "driver-no-interaction"), o.removeAttribute("aria-haspopup"), o.removeAttribute("aria-expanded"), o.removeAttribute("aria-controls");
    });
  }
  function M() {
    const e = l("__resizeTimeout");
    e && window.cancelAnimationFrame(e), k("__resizeTimeout", window.requestAnimationFrame(xe));
  }
  function Pe(e) {
    var r;
    if (!l("isInitialized") || !(e.key === "Tab" || e.keyCode === 9))
      return;
    const i = l("__activeElement"), d = (r = l("popover")) == null ? void 0 : r.wrapper, n = U([
      ...d ? [d] : [],
      ...i ? [i] : []
    ]), f = n[0], w = n[n.length - 1];
    if (e.preventDefault(), e.shiftKey) {
      const v = n[n.indexOf(document.activeElement) - 1] || w;
      v == null || v.focus();
    } else {
      const v = n[n.indexOf(document.activeElement) + 1] || f;
      v == null || v.focus();
    }
  }
  function ne(e) {
    var t;
    ((t = s("allowKeyboardControl")) == null || t) && (e.key === "Escape" ? L("escapePress") : e.key === "ArrowRight" ? L("arrowRightPress") : e.key === "ArrowLeft" && L("arrowLeftPress"));
  }
  function re(e, o, t) {
    const i = (n, f) => {
      const w = n.target;
      e.contains(w) && ((!t || t(w)) && (n.preventDefault(), n.stopPropagation(), n.stopImmediatePropagation()), f == null || f(n));
    };
    document.addEventListener("pointerdown", i, true), document.addEventListener("mousedown", i, true), document.addEventListener("pointerup", i, true), document.addEventListener("mouseup", i, true), document.addEventListener(
      "click",
      (n) => {
        i(n, o);
      },
      true
    );
  }
  function ke() {
    window.addEventListener("keyup", ne, false), window.addEventListener("keydown", Pe, false), window.addEventListener("resize", M), window.addEventListener("scroll", M);
  }
  function _e() {
    window.removeEventListener("keyup", ne), window.removeEventListener("resize", M), window.removeEventListener("scroll", M);
  }
  function Se() {
    const e = l("popover");
    e && (e.wrapper.style.display = "none");
  }
  function Q(e, o) {
    var b, P;
    let t = l("popover");
    t && document.body.removeChild(t.wrapper), t = Le(), document.body.appendChild(t.wrapper);
    const {
      title: i,
      description: d,
      showButtons: n,
      disableButtons: f,
      showProgress: w,
      nextBtnText: r = s("nextBtnText") || "Next &rarr;",
      prevBtnText: v = s("prevBtnText") || "&larr; Previous",
      progressText: g = s("progressText") || "{current} of {total}"
    } = o.popover || {};
    t.nextButton.innerHTML = r, t.previousButton.innerHTML = v, t.progress.innerHTML = g, i ? (t.title.innerHTML = i, t.title.style.display = "block") : t.title.style.display = "none", d ? (t.description.innerHTML = d, t.description.style.display = "block") : t.description.style.display = "none";
    const y = n || s("showButtons"), a = w || s("showProgress") || false, p = (y == null ? void 0 : y.includes("next")) || (y == null ? void 0 : y.includes("previous")) || a;
    t.closeButton.style.display = y.includes("close") ? "block" : "none", p ? (t.footer.style.display = "flex", t.progress.style.display = a ? "block" : "none", t.nextButton.style.display = y.includes("next") ? "block" : "none", t.previousButton.style.display = y.includes("previous") ? "block" : "none") : t.footer.style.display = "none";
    const c = f || s("disableButtons") || [];
    c != null && c.includes("next") && (t.nextButton.disabled = true, t.nextButton.classList.add("driver-popover-btn-disabled")), c != null && c.includes("previous") && (t.previousButton.disabled = true, t.previousButton.classList.add("driver-popover-btn-disabled")), c != null && c.includes("close") && (t.closeButton.disabled = true, t.closeButton.classList.add("driver-popover-btn-disabled"));
    const u = t.wrapper;
    u.style.display = "block", u.style.left = "", u.style.top = "", u.style.bottom = "", u.style.right = "", u.id = "driver-popover-content", u.setAttribute("role", "dialog"), u.setAttribute("aria-labelledby", "driver-popover-title"), u.setAttribute("aria-describedby", "driver-popover-description");
    const h = t.arrow;
    h.className = "driver-popover-arrow";
    const m = ((b = o.popover) == null ? void 0 : b.popoverClass) || s("popoverClass") || "";
    u.className = `driver-popover ${m}`.trim(), re(
      t.wrapper,
      (E) => {
        var B, R, W;
        const T = E.target, A = ((B = o.popover) == null ? void 0 : B.onNextClick) || s("onNextClick"), H = ((R = o.popover) == null ? void 0 : R.onPrevClick) || s("onPrevClick"), $ = ((W = o.popover) == null ? void 0 : W.onCloseClick) || s("onCloseClick");
        if (T.closest(".driver-popover-next-btn"))
          return A ? A(e, o, {
            config: s(),
            state: l(),
            driver: _()
          }) : L("nextClick");
        if (T.closest(".driver-popover-prev-btn"))
          return H ? H(e, o, {
            config: s(),
            state: l(),
            driver: _()
          }) : L("prevClick");
        if (T.closest(".driver-popover-close-btn"))
          return $ ? $(e, o, {
            config: s(),
            state: l(),
            driver: _()
          }) : L("closeClick");
      },
      (E) => !(t != null && t.description.contains(E)) && !(t != null && t.title.contains(E)) && typeof E.className == "string" && E.className.includes("driver-popover")
    ), k("popover", t);
    const x = ((P = o.popover) == null ? void 0 : P.onPopoverRender) || s("onPopoverRender");
    x && x(t, {
      config: s(),
      state: l(),
      driver: _()
    }), ae(e, o), ee(u);
    const C = e.classList.contains("driver-dummy-element"), S = U([u, ...C ? [] : [e]]);
    S.length > 0 && S[0].focus();
  }
  function se() {
    const e = l("popover");
    if (!(e != null && e.wrapper))
      return;
    const o = e.wrapper.getBoundingClientRect(), t = s("stagePadding") || 0, i = s("popoverOffset") || 0;
    return {
      width: o.width + t + i,
      height: o.height + t + i,
      realWidth: o.width,
      realHeight: o.height
    };
  }
  function Z(e, o) {
    const { elementDimensions: t, popoverDimensions: i, popoverPadding: d, popoverArrowDimensions: n } = o;
    return e === "start" ? Math.max(
      Math.min(
        t.top - d,
        window.innerHeight - i.realHeight - n.width
      ),
      n.width
    ) : e === "end" ? Math.max(
      Math.min(
        t.top - (i == null ? void 0 : i.realHeight) + t.height + d,
        window.innerHeight - (i == null ? void 0 : i.realHeight) - n.width
      ),
      n.width
    ) : e === "center" ? Math.max(
      Math.min(
        t.top + t.height / 2 - (i == null ? void 0 : i.realHeight) / 2,
        window.innerHeight - (i == null ? void 0 : i.realHeight) - n.width
      ),
      n.width
    ) : 0;
  }
  function G(e, o) {
    const { elementDimensions: t, popoverDimensions: i, popoverPadding: d, popoverArrowDimensions: n } = o;
    return e === "start" ? Math.max(
      Math.min(
        t.left - d,
        window.innerWidth - i.realWidth - n.width
      ),
      n.width
    ) : e === "end" ? Math.max(
      Math.min(
        t.left - (i == null ? void 0 : i.realWidth) + t.width + d,
        window.innerWidth - (i == null ? void 0 : i.realWidth) - n.width
      ),
      n.width
    ) : e === "center" ? Math.max(
      Math.min(
        t.left + t.width / 2 - (i == null ? void 0 : i.realWidth) / 2,
        window.innerWidth - (i == null ? void 0 : i.realWidth) - n.width
      ),
      n.width
    ) : 0;
  }
  function ae(e, o) {
    const t = l("popover");
    if (!t)
      return;
    const { align: i = "start", side: d = "left" } = (o == null ? void 0 : o.popover) || {}, n = i, f = e.id === "driver-dummy-element" ? "over" : d, w = s("stagePadding") || 0, r = se(), v = t.arrow.getBoundingClientRect(), g = e.getBoundingClientRect(), y = g.top - r.height;
    let a = y >= 0;
    const p = window.innerHeight - (g.bottom + r.height);
    let c = p >= 0;
    const u = g.left - r.width;
    let h = u >= 0;
    const m = window.innerWidth - (g.right + r.width);
    let x = m >= 0;
    const C = !a && !c && !h && !x;
    let S = f;
    if (f === "top" && a ? x = h = c = false : f === "bottom" && c ? x = h = a = false : f === "left" && h ? x = a = c = false : f === "right" && x && (h = a = c = false), f === "over") {
      const b = window.innerWidth / 2 - r.realWidth / 2, P = window.innerHeight / 2 - r.realHeight / 2;
      t.wrapper.style.left = `${b}px`, t.wrapper.style.right = "auto", t.wrapper.style.top = `${P}px`, t.wrapper.style.bottom = "auto";
    } else if (C) {
      const b = window.innerWidth / 2 - (r == null ? void 0 : r.realWidth) / 2, P = 10;
      t.wrapper.style.left = `${b}px`, t.wrapper.style.right = "auto", t.wrapper.style.bottom = `${P}px`, t.wrapper.style.top = "auto";
    } else if (h) {
      const b = Math.min(
        u,
        window.innerWidth - (r == null ? void 0 : r.realWidth) - v.width
      ), P = Z(n, {
        elementDimensions: g,
        popoverDimensions: r,
        popoverPadding: w,
        popoverArrowDimensions: v
      });
      t.wrapper.style.left = `${b}px`, t.wrapper.style.top = `${P}px`, t.wrapper.style.bottom = "auto", t.wrapper.style.right = "auto", S = "left";
    } else if (x) {
      const b = Math.min(
        m,
        window.innerWidth - (r == null ? void 0 : r.realWidth) - v.width
      ), P = Z(n, {
        elementDimensions: g,
        popoverDimensions: r,
        popoverPadding: w,
        popoverArrowDimensions: v
      });
      t.wrapper.style.right = `${b}px`, t.wrapper.style.top = `${P}px`, t.wrapper.style.bottom = "auto", t.wrapper.style.left = "auto", S = "right";
    } else if (a) {
      const b = Math.min(
        y,
        window.innerHeight - r.realHeight - v.width
      );
      let P = G(n, {
        elementDimensions: g,
        popoverDimensions: r,
        popoverPadding: w,
        popoverArrowDimensions: v
      });
      t.wrapper.style.top = `${b}px`, t.wrapper.style.left = `${P}px`, t.wrapper.style.bottom = "auto", t.wrapper.style.right = "auto", S = "top";
    } else if (c) {
      const b = Math.min(
        p,
        window.innerHeight - (r == null ? void 0 : r.realHeight) - v.width
      );
      let P = G(n, {
        elementDimensions: g,
        popoverDimensions: r,
        popoverPadding: w,
        popoverArrowDimensions: v
      });
      t.wrapper.style.left = `${P}px`, t.wrapper.style.bottom = `${b}px`, t.wrapper.style.top = "auto", t.wrapper.style.right = "auto", S = "bottom";
    }
    C ? t.arrow.classList.add("driver-popover-arrow-none") : Ee(n, S, e);
  }
  function Ee(e, o, t) {
    const i = l("popover");
    if (!i)
      return;
    const d = t.getBoundingClientRect(), n = se(), f = i.arrow, w = n.width, r = window.innerWidth, v = d.width, g = d.left, y = n.height, a = window.innerHeight, p = d.top, c = d.height;
    f.className = "driver-popover-arrow";
    let u = o, h = e;
    if (o === "top" ? (g + v <= 0 ? (u = "right", h = "end") : g + v - w <= 0 && (u = "top", h = "start"), g >= r ? (u = "left", h = "end") : g + w >= r && (u = "top", h = "end")) : o === "bottom" ? (g + v <= 0 ? (u = "right", h = "start") : g + v - w <= 0 && (u = "bottom", h = "start"), g >= r ? (u = "left", h = "start") : g + w >= r && (u = "bottom", h = "end")) : o === "left" ? (p + c <= 0 ? (u = "bottom", h = "end") : p + c - y <= 0 && (u = "left", h = "start"), p >= a ? (u = "top", h = "end") : p + y >= a && (u = "left", h = "end")) : o === "right" && (p + c <= 0 ? (u = "bottom", h = "start") : p + c - y <= 0 && (u = "right", h = "start"), p >= a ? (u = "top", h = "start") : p + y >= a && (u = "right", h = "end")), !u)
      f.classList.add("driver-popover-arrow-none");
    else {
      f.classList.add(`driver-popover-arrow-side-${u}`), f.classList.add(`driver-popover-arrow-align-${h}`);
      const m = t.getBoundingClientRect(), x = f.getBoundingClientRect(), C = s("stagePadding") || 0, S = m.left - C < window.innerWidth && m.right + C > 0 && m.top - C < window.innerHeight && m.bottom + C > 0;
      o === "bottom" && S && (x.x > m.x && x.x + x.width < m.x + m.width ? i.wrapper.style.transform = "translateY(0)" : (f.classList.remove(`driver-popover-arrow-align-${h}`), f.classList.add("driver-popover-arrow-none"), i.wrapper.style.transform = `translateY(-${C / 2}px)`));
    }
  }
  function Le() {
    const e = document.createElement("div");
    e.classList.add("driver-popover");
    const o = document.createElement("div");
    o.classList.add("driver-popover-arrow");
    const t = document.createElement("header");
    t.id = "driver-popover-title", t.classList.add("driver-popover-title"), t.style.display = "none", t.innerText = "Popover Title";
    const i = document.createElement("div");
    i.id = "driver-popover-description", i.classList.add("driver-popover-description"), i.style.display = "none", i.innerText = "Popover description is here";
    const d = document.createElement("button");
    d.type = "button", d.classList.add("driver-popover-close-btn"), d.setAttribute("aria-label", "Close"), d.innerHTML = "&times;";
    const n = document.createElement("footer");
    n.classList.add("driver-popover-footer");
    const f = document.createElement("span");
    f.classList.add("driver-popover-progress-text"), f.innerText = "";
    const w = document.createElement("span");
    w.classList.add("driver-popover-navigation-btns");
    const r = document.createElement("button");
    r.type = "button", r.classList.add("driver-popover-prev-btn"), r.innerHTML = "&larr; Previous";
    const v = document.createElement("button");
    return v.type = "button", v.classList.add("driver-popover-next-btn"), v.innerHTML = "Next &rarr;", w.appendChild(r), w.appendChild(v), n.appendChild(f), n.appendChild(w), e.appendChild(d), e.appendChild(o), e.appendChild(t), e.appendChild(i), e.appendChild(n), {
      wrapper: e,
      arrow: o,
      title: t,
      description: i,
      footer: n,
      previousButton: r,
      nextButton: v,
      closeButton: d,
      footerButtons: w,
      progress: f
    };
  }
  function Te() {
    var o;
    const e = l("popover");
    e && ((o = e.wrapper.parentElement) == null || o.removeChild(e.wrapper));
  }
  function Ae(e = {}) {
    F(e);
    function o() {
      s("allowClose") && g();
    }
    function t() {
      const a = s("overlayClickBehavior");
      if (s("allowClose") && a === "close") {
        g();
        return;
      }
      if (typeof a == "function") {
        const p = l("__activeStep"), c = l("__activeElement");
        a(c, p, {
          config: s(),
          state: l(),
          driver: _()
        });
        return;
      }
      a === "nextStep" && i();
    }
    function i() {
      const a = l("activeIndex"), p = s("steps") || [];
      if (typeof a == "undefined")
        return;
      const c = a + 1;
      p[c] ? v(c) : g();
    }
    function d() {
      const a = l("activeIndex"), p = s("steps") || [];
      if (typeof a == "undefined")
        return;
      const c = a - 1;
      p[c] ? v(c) : g();
    }
    function n(a) {
      (s("steps") || [])[a] ? v(a) : g();
    }
    function f() {
      var x;
      if (l("__transitionCallback"))
        return;
      const p = l("activeIndex"), c = l("__activeStep"), u = l("__activeElement");
      if (typeof p == "undefined" || typeof c == "undefined" || typeof l("activeIndex") == "undefined")
        return;
      const m = ((x = c.popover) == null ? void 0 : x.onPrevClick) || s("onPrevClick");
      if (m)
        return m(u, c, {
          config: s(),
          state: l(),
          driver: _()
        });
      d();
    }
    function w() {
      var m;
      if (l("__transitionCallback"))
        return;
      const p = l("activeIndex"), c = l("__activeStep"), u = l("__activeElement");
      if (typeof p == "undefined" || typeof c == "undefined")
        return;
      const h = ((m = c.popover) == null ? void 0 : m.onNextClick) || s("onNextClick");
      if (h)
        return h(u, c, {
          config: s(),
          state: l(),
          driver: _()
        });
      i();
    }
    function r() {
      l("isInitialized") || (k("isInitialized", true), document.body.classList.add("driver-active", s("animate") ? "driver-fade" : "driver-simple"), ke(), N("overlayClick", t), N("escapePress", o), N("arrowLeftPress", f), N("arrowRightPress", w));
    }
    function v(a = 0) {
      var $, B, R, W, V, q, K, Y;
      const p = s("steps");
      if (!p) {
        console.error("No steps to drive through"), g();
        return;
      }
      if (!p[a]) {
        g();
        return;
      }
      k("__activeOnDestroyed", document.activeElement), k("activeIndex", a);
      const c = p[a], u = p[a + 1], h = p[a - 1], m = (($ = c.popover) == null ? void 0 : $.doneBtnText) || s("doneBtnText") || "Done", x = s("allowClose"), C = typeof ((B = c.popover) == null ? void 0 : B.showProgress) != "undefined" ? (R = c.popover) == null ? void 0 : R.showProgress : s("showProgress"), b = (((W = c.popover) == null ? void 0 : W.progressText) || s("progressText") || "{{current}} of {{total}}").replace("{{current}}", `${a + 1}`).replace("{{total}}", `${p.length}`), P = ((V = c.popover) == null ? void 0 : V.showButtons) || s("showButtons"), E = [
        "next",
        "previous",
        ...x ? ["close"] : []
      ].filter((ce) => !(P != null && P.length) || P.includes(ce)), T = ((q = c.popover) == null ? void 0 : q.onNextClick) || s("onNextClick"), A = ((K = c.popover) == null ? void 0 : K.onPrevClick) || s("onPrevClick"), H = ((Y = c.popover) == null ? void 0 : Y.onCloseClick) || s("onCloseClick");
      j({
        ...c,
        popover: {
          showButtons: E,
          nextBtnText: u ? void 0 : m,
          disableButtons: [...h ? [] : ["previous"]],
          showProgress: C,
          progressText: b,
          onNextClick: T || (() => {
            u ? v(a + 1) : g();
          }),
          onPrevClick: A || (() => {
            v(a - 1);
          }),
          onCloseClick: H || (() => {
            g();
          }),
          ...(c == null ? void 0 : c.popover) || {}
        }
      });
    }
    function g(a = true) {
      const p = l("__activeElement"), c = l("__activeStep"), u = l("__activeOnDestroyed"), h = s("onDestroyStarted");
      if (a && h) {
        const C = !p || (p == null ? void 0 : p.id) === "driver-dummy-element";
        h(C ? void 0 : p, c, {
          config: s(),
          state: l(),
          driver: _()
        });
        return;
      }
      const m = (c == null ? void 0 : c.onDeselected) || s("onDeselected"), x = s("onDestroyed");
      if (document.body.classList.remove("driver-active", "driver-fade", "driver-simple"), _e(), Te(), Ce(), me(), de(), X(), p && c) {
        const C = p.id === "driver-dummy-element";
        m && m(C ? void 0 : p, c, {
          config: s(),
          state: l(),
          driver: _()
        }), x && x(C ? void 0 : p, c, {
          config: s(),
          state: l(),
          driver: _()
        });
      }
      u && u.focus();
    }
    const y = {
      isActive: () => l("isInitialized") || false,
      refresh: M,
      drive: (a = 0) => {
        r(), v(a);
      },
      setConfig: F,
      setSteps: (a) => {
        X(), F({
          ...s(),
          steps: a
        });
      },
      getConfig: s,
      getState: l,
      getActiveIndex: () => l("activeIndex"),
      isFirstStep: () => l("activeIndex") === 0,
      isLastStep: () => {
        const a = s("steps") || [], p = l("activeIndex");
        return p !== void 0 && p === a.length - 1;
      },
      getActiveStep: () => l("activeStep"),
      getActiveElement: () => l("activeElement"),
      getPreviousElement: () => l("previousElement"),
      getPreviousStep: () => l("previousStep"),
      moveNext: i,
      movePrevious: d,
      moveTo: n,
      hasNextStep: () => {
        const a = s("steps") || [], p = l("activeIndex");
        return p !== void 0 && !!a[p + 1];
      },
      hasPreviousStep: () => {
        const a = s("steps") || [], p = l("activeIndex");
        return p !== void 0 && !!a[p - 1];
      },
      highlight: (a) => {
        r(), j({
          ...a,
          popover: a.popover ? {
            showButtons: [],
            showProgress: false,
            progressText: "",
            ...a.popover
          } : void 0
        });
      },
      destroy: () => {
        g(false);
      }
    };
    return le(y), y;
  }

  // ../../../filament-tour/resources/js/css-selector.js
  var lastMouseX = 0;
  var lastMouseY = 0;
  var active = false;
  var hasNavigator = window.navigator.clipboard;
  var isInElement = false;
  var selected = null;
  var cursor = document.querySelector("#circle-cursor");
  function initCssSelector() {
    Livewire.on("filament-tour::change-css-selector-status", function({ enabled }) {
      if (enabled) {
        let release = function(event) {
          if (event.key !== "Escape") return;
          active = false;
          selected = null;
          cursor.style.display = "none";
        };
        document.onmousemove = handleMouseMove;
        document.onkeyup = release;
        document.onmouseover = enterCursor;
        document.onmouseleave = leaveCursor;
        document.addEventListener("keydown", function(event) {
          if (event.ctrlKey && event.code === "Space" && !active) {
            if (!hasNavigator) {
              new FilamentNotification().title("Filament Tour - CSS Selector").body("Your browser does not support the Clipboard API !<br>Don't forget to be in <b>https://</b> protocol").danger().send();
            } else {
              active = true;
              moveCursor(lastMouseX, lastMouseY);
              cursor.style.display = "block";
              new FilamentNotification().title("Filament Tour - CSS Selector").body("Activated !<br>Press Ctrl + C to copy the CSS Selector of the selected element !").success().send();
            }
          }
          if (event.ctrlKey && event.code === "KeyC" && active) {
            navigator.clipboard.writeText(getOptimizedSelector(selected) ?? "Nothing selected !");
            active = false;
            selected = null;
            cursor.style.display = "none";
            new FilamentNotification().title("Filament Tour - CSS Selector").body(`CSS Selector copied to clipboard !`).success().send();
          }
        });
      }
    });
  }
  function escapeCssSelector(str) {
    return str.replace(/([!"#$%&'()*+,./:;<=>?@[\]^`{|}~])/g, "\\$1");
  }
  function getOptimizedSelector(el) {
    let fullSelector = getCssSelector(el);
    return optimizeSelector(fullSelector);
  }
  function optimizeSelector(selector) {
    let parts = selector.split(" > ");
    for (let i = parts.length - 2; i >= 0; i--) {
      let testSelector = parts.slice(i).join(" > ");
      if (document.querySelectorAll(testSelector).length === 1) {
        return testSelector;
      }
    }
    return selector;
  }
  function getCssSelector(el) {
    if (!el) {
      return "";
    }
    if (el.id) {
      return "#" + escapeCssSelector(el.id);
    }
    if (el === document.body) {
      return "body";
    }
    let tag = el.tagName.toLowerCase();
    let validClasses = el.className.split(/\s+/).filter((cls) => cls && !cls.startsWith("--"));
    let classes = validClasses.length ? "." + validClasses.map(escapeCssSelector).join(".") : "";
    let selectorWithoutNthOfType = tag + classes;
    try {
      let siblingsWithSameSelector = Array.from(el.parentNode.querySelectorAll(selectorWithoutNthOfType));
      if (siblingsWithSameSelector.length === 1 && siblingsWithSameSelector[0] === el) {
        return getCssSelector(el.parentNode) + " > " + selectorWithoutNthOfType;
      }
      let siblings = Array.from(el.parentNode.children);
      let sameTagAndClassSiblings = siblings.filter((sib) => sib.tagName === el.tagName && sib.className === el.className);
      if (sameTagAndClassSiblings.length > 1) {
        let index = sameTagAndClassSiblings.indexOf(el) + 1;
        return getCssSelector(el.parentNode) + " > " + tag + classes + ":nth-of-type(" + index + ")";
      } else {
        return getCssSelector(el.parentNode) + " > " + tag + classes;
      }
    } catch (e) {
    }
  }
  function handleMouseMove(event) {
    lastMouseX = event.clientX;
    lastMouseY = event.clientY;
    moveCursor(event.clientX, event.clientY);
  }
  function moveCursor(pX, pY) {
    if (!active) return;
    let diff = 10;
    if (!isInElement) {
      cursor.style.left = pX - diff + "px";
      cursor.style.top = pY - diff + "px";
      cursor.style.width = "20px";
      cursor.style.height = "20px";
      cursor.style.borderRadius = "50%";
    }
  }
  function enterCursor(event) {
    event.stopPropagation();
    if (!active) return;
    isInElement = true;
    let elem = event.target;
    while (elem.lastElementChild) {
      elem = elem.lastElementChild;
    }
    if (elem) {
      let eX = elem.offsetParent ? elem.offsetLeft + elem.offsetParent.offsetLeft : elem.offsetLeft;
      let eY = elem.offsetParent ? elem.offsetTop + elem.offsetParent.offsetTop : elem.offsetTop;
      let eW = elem.offsetWidth;
      let eH = elem.offsetHeight;
      let diff = 6;
      selected = elem;
      cursor.style.left = eX - diff + "px";
      cursor.style.top = eY - diff + "px";
      cursor.style.width = eW + diff * 2 - 1 + "px";
      cursor.style.height = eH + diff * 2 - 1 + "px";
      cursor.style.borderRadius = "5px";
    }
  }
  function leaveCursor(event) {
    if (!active) return;
    isInElement = false;
  }

  // ../../../filament-tour/resources/js/index.js
  document.addEventListener("livewire:initialized", async function() {
    initCssSelector();
    let pluginData;
    let tours = [];
    let highlights = [];
    function waitForElement(selector, callback) {
      if (document.querySelector(selector)) {
        callback(document.querySelector(selector));
        return;
      }
      const observer = new MutationObserver(function(mutations) {
        if (document.querySelector(selector)) {
          callback(document.querySelector(selector));
          observer.disconnect();
        }
      });
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    }
    function parseId(params) {
      if (Array.isArray(params)) {
        return params[0];
      } else if (typeof params === "object") {
        return params.id;
      }
      return params;
    }
    function waitForStepTarget(steps, callback) {
      const selector = steps?.[0]?.element;
      if (!selector) {
        callback();
        return;
      }
      let attempts = 0;
      const maxAttempts = 40;
      const poll = () => {
        if (document.querySelector(selector) || attempts >= maxAttempts) {
          callback();
          return;
        }
        attempts += 1;
        window.setTimeout(poll, 100);
      };
      poll();
    }
    function moveToNextStepWhenReady(driverObj, steps) {
      const nextStep = steps?.[driverObj.getActiveIndex() + 1];
      if (!nextStep?.element) {
        driverObj.moveNext();
        return;
      }
      waitForStepTarget([nextStep], () => {
        driverObj.moveNext();
      });
    }
    Livewire.dispatch("filament-tour::load-elements", { request: window.location });
    Livewire.on("filament-tour::loaded-elements", function(data) {
      pluginData = data;
      pluginData.tours.forEach((tour) => {
        tours.push(tour);
        if (!localStorage.getItem("tours")) {
          localStorage.setItem("tours", "[]");
        }
      });
      selectTour(tours);
      pluginData.highlights.forEach((highlight) => {
        if (routeMatchesPattern(highlight.route, window.location.pathname)) {
          waitForElement(highlight.parent, function(selector) {
            selector.parentNode.style.position = "relative";
            let tempDiv = document.createElement("div");
            tempDiv.innerHTML = highlight.button;
            tempDiv.firstChild.classList.add(highlight.position);
            selector.parentNode.insertBefore(tempDiv.firstChild, selector);
          });
          highlights.push(highlight);
        }
      });
    });
    function routeMatchesPattern(pattern, pathname) {
      if (pattern === pathname) return true;
      if (!pattern.includes("{")) return false;
      const regexStr = "^" + pattern.replace(/\{[^}]+\}/g, "[^/]+") + "$";
      return new RegExp(regexStr).test(pathname);
    }
    function getPopoverWidthClasses() {
      return [
        "fi-width-xs",
        "fi-width-sm",
        "fi-width-md",
        "fi-width-lg",
        "fi-width-xl",
        "fi-width-2xl",
        "fi-width-3xl",
        "fi-width-4xl",
        "fi-width-5xl",
        "fi-width-6xl",
        "fi-width-7xl",
        "fi-width-full",
        "fi-width-min",
        "fi-width-max",
        "fi-width-fit",
        "fi-width-prose",
        "fi-width-screen-sm",
        "fi-width-screen-md",
        "fi-width-screen-lg",
        "fi-width-screen-xl",
        "fi-width-screen-2xl",
        "fi-width-screen"
      ];
    }
    function getPopoverWidthStyle(width) {
      const constrainedWidth = (value) => `min(calc(100vw - 2rem), ${value})`;
      switch (width) {
        case "xs":
          return constrainedWidth("var(--container-xs)");
        case "sm":
          return constrainedWidth("var(--container-sm)");
        case "md":
          return constrainedWidth("var(--container-md)");
        case "lg":
          return constrainedWidth("var(--container-lg)");
        case "xl":
          return constrainedWidth("var(--container-xl)");
        case "2xl":
          return constrainedWidth("var(--container-2xl)");
        case "3xl":
          return constrainedWidth("var(--container-3xl)");
        case "4xl":
          return constrainedWidth("var(--container-4xl)");
        case "5xl":
          return constrainedWidth("var(--container-5xl)");
        case "6xl":
          return constrainedWidth("var(--container-6xl)");
        case "7xl":
          return constrainedWidth("var(--container-7xl)");
        case "full":
        case "screen":
          return "calc(100vw - 2rem)";
        case "min":
          return "min-content";
        case "max":
          return constrainedWidth("max-content");
        case "fit":
          return constrainedWidth("fit-content");
        case "prose":
          return constrainedWidth("65ch");
        case "screen-sm":
          return constrainedWidth("var(--breakpoint-sm)");
        case "screen-md":
          return constrainedWidth("var(--breakpoint-md)");
        case "screen-lg":
          return constrainedWidth("var(--breakpoint-lg)");
        case "screen-xl":
          return constrainedWidth("var(--breakpoint-xl)");
        case "screen-2xl":
          return constrainedWidth("var(--breakpoint-2xl)");
        default:
          return null;
      }
    }
    function applyPopoverWidth(popover, width) {
      const wrapper = popover.footer?.parentElement;
      if (!wrapper) {
        return;
      }
      wrapper.classList.remove(...getPopoverWidthClasses());
      wrapper.style.removeProperty("width");
      wrapper.style.removeProperty("max-width");
      if (!width) {
        return;
      }
      wrapper.classList.add(`fi-width-${width}`);
      const widthStyle = getPopoverWidthStyle(width);
      if (!widthStyle) {
        return;
      }
      wrapper.style.setProperty("width", widthStyle, "important");
      wrapper.style.setProperty("max-width", widthStyle, "important");
    }
    function selectTour(tours2, startIndex = 0) {
      for (let i = startIndex; i < tours2.length; i++) {
        let tour = tours2[i];
        let conditionAlwaysShow = tour.alwaysShow;
        let conditionRoutesIgnored = tour.routesIgnored;
        let conditionRouteMatches = routeMatchesPattern(tour.route, window.location.pathname);
        let conditionVisibleOnce = !pluginData.only_visible_once || pluginData.only_visible_once && !localStorage.getItem("tours").includes(tour.id);
        if (conditionAlwaysShow && conditionRoutesIgnored || conditionAlwaysShow && !conditionRoutesIgnored && conditionRouteMatches || conditionRoutesIgnored && conditionVisibleOnce || conditionRouteMatches && conditionVisibleOnce) {
          openTour(tour);
          break;
        }
      }
    }
    Livewire.on("filament-tour::open-highlight", function(params) {
      const id = parseId(params);
      console.log(highlights);
      let highlight = highlights.find((element) => element.id === id);
      if (highlight) {
        Ae({
          overlayColor: localStorage.theme === "light" ? highlight.colors.light : highlight.colors.dark,
          onPopoverRender: (popover, { config, state }) => {
            const isDarkMode = document.documentElement.classList.contains("dark");
            popover.title.innerHTML = "";
            popover.title.innerHTML = state.activeStep.popover.title;
            if (!state.activeStep.popover.description) {
              popover.title.firstChild.style.justifyContent = "center";
            }
            let contentClasses = "dark:text-white fi-section rounded-xl bg-white shadow-sm ring-1 ring-gray-950/5 dark:bg-gray-900 dark:ring-white/10 mb-4";
            popover.footer.parentElement.classList.add(...contentClasses.split(" "));
            popover.footer.parentElement.classList.toggle("driver-popover-dark", isDarkMode);
            popover.arrow.classList.toggle("driver-popover-arrow-dark", isDarkMode);
            if (isDarkMode) {
              popover.footer.parentElement.style.background = "rgb(15 23 42)";
              popover.footer.parentElement.style.color = "rgb(248 250 252)";
              popover.footer.parentElement.style.borderColor = "color-mix(in oklab, rgb(255 255 255) 12%, transparent)";
              popover.footer.parentElement.style.boxShadow = "0 24px 50px -20px rgb(0 0 0 / 0.65)";
            } else {
              popover.footer.parentElement.style.background = "";
              popover.footer.parentElement.style.color = "";
              popover.footer.parentElement.style.borderColor = "";
              popover.footer.parentElement.style.boxShadow = "";
            }
            applyPopoverWidth(popover, state.activeStep.popover.width);
          }
        }).highlight(highlight);
      } else {
        console.error(`Highlight with id '${id}' not found`);
      }
    });
    Livewire.on("filament-tour::open-tour", function(params) {
      const id = parseId(params);
      let tour = tours.find((element) => element.id === `tour_${id}`);
      if (tour) {
        openTour(tour);
      } else {
        console.error(`Tour with id '${id}' not found`);
      }
    });
    function openTour(tour) {
      let steps = JSON.parse(tour.steps);
      if (steps.length > 0) {
        const previewStartIndex = Number.isFinite(Number(tour.previewStartIndex)) ? Number(tour.previewStartIndex) : 0;
        const driverObj = Ae({
          allowClose: true,
          disableActiveInteraction: true,
          overlayColor: localStorage.theme === "light" ? tour.colors.light : tour.colors.dark,
          onDeselected: ((element, step, { config, state }) => {
          }),
          onCloseClick: ((element, step, { config, state }) => {
            if (state.activeStep && (!state.activeStep.uncloseable || tour.uncloseable))
              driverObj.destroy();
            if (!localStorage.getItem("tours").includes(tour.id)) {
              localStorage.setItem("tours", JSON.stringify([...JSON.parse(localStorage.getItem("tours")), tour.id]));
            }
          }),
          onDestroyStarted: ((element, step, { config, state }) => {
            if (state.activeStep && !state.activeStep.uncloseable && !tour.uncloseable) {
              driverObj.destroy();
            }
          }),
          onDestroyed: ((element, step, { config, state }) => {
            if (pluginData.dismiss_on_overlay_click && !localStorage.getItem("tours").includes(tour.id)) {
              localStorage.setItem("tours", JSON.stringify([...JSON.parse(localStorage.getItem("tours")), tour.id]));
            }
          }),
          onNextClick: ((element, step, { config, state }) => {
            if (tours.length > 1 && driverObj.isLastStep()) {
              let index = tours.findIndex((objet) => objet.id === tour.id);
              if (index !== -1 && index < tours.length - 1) {
                let nextTourIndex = index + 1;
                selectTour(tours, nextTourIndex);
              }
            }
            if (driverObj.isLastStep()) {
              if (!localStorage.getItem("tours").includes(tour.id)) {
                localStorage.setItem("tours", JSON.stringify([...JSON.parse(localStorage.getItem("tours")), tour.id]));
              }
              driverObj.destroy();
            }
            if (step.events) {
              if (step.events.notifyOnNext) {
                new FilamentNotification().title(step.events.notifyOnNext.title).body(step.events.notifyOnNext.body).icon(step.events.notifyOnNext.icon).iconColor(step.events.notifyOnNext.iconColor).color(step.events.notifyOnNext.color).duration(step.events.notifyOnNext.duration).send();
              }
              if (step.events.dispatchOnNext) {
                Livewire.dispatch(step.events.dispatchOnNext.name, step.events.dispatchOnNext.params);
              }
              if (step.events.clickOnNext) {
                document.querySelector(step.events.clickOnNext)?.click();
              }
              if (step.events.redirectOnNext) {
                window.open(step.events.redirectOnNext.url, step.events.redirectOnNext.newTab ? "_blank" : "_self");
              }
            }
            moveToNextStepWhenReady(driverObj, steps);
          }),
          onPopoverRender: (popover, { config, state }) => {
            const isDarkMode = document.documentElement.classList.contains("dark");
            if (state.activeStep.uncloseable || tour.uncloseable)
              document.querySelector(".driver-popover-close-btn").remove();
            popover.title.innerHTML = "";
            popover.title.innerHTML = state.activeStep.popover.title;
            if (!state.activeStep.popover.description) {
              popover.title.firstChild.style.justifyContent = "center";
            }
            let contentClasses = "dark:text-white fi-section rounded-xl bg-white shadow-sm ring-1 ring-gray-950/5 dark:bg-gray-900 dark:ring-white/10 mb-4";
            popover.footer.parentElement.classList.add(...contentClasses.split(" "));
            popover.footer.parentElement.classList.toggle("driver-popover-dark", isDarkMode);
            popover.arrow.classList.toggle("driver-popover-arrow-dark", isDarkMode);
            if (isDarkMode) {
              popover.footer.parentElement.style.background = "rgb(15 23 42)";
              popover.footer.parentElement.style.color = "rgb(248 250 252)";
              popover.footer.parentElement.style.borderColor = "color-mix(in oklab, rgb(255 255 255) 12%, transparent)";
              popover.footer.parentElement.style.boxShadow = "0 24px 50px -20px rgb(0 0 0 / 0.65)";
            } else {
              popover.footer.parentElement.style.background = "";
              popover.footer.parentElement.style.color = "";
              popover.footer.parentElement.style.borderColor = "";
              popover.footer.parentElement.style.boxShadow = "";
            }
            applyPopoverWidth(popover, state.activeStep.popover.width);
            popover.footer.innerHTML = "";
            popover.footer.classList.add("flex", "mt-3");
            popover.footer.style.justifyContent = "space-evenly";
            popover.footer.classList.remove("driver-popover-footer");
            const nextButton = document.createElement("button");
            let nextClasses = "fi-color fi-color-primary fi-bg-color-400 hover:fi-bg-color-300 dark:fi-bg-color-600 dark:hover:fi-bg-color-700 fi-text-color-800 hover:fi-text-color-800 dark:fi-text-color-0 dark:hover:fi-text-color-0 fi-btn fi-size-md fi-ac-btn-action";
            nextButton.classList.add(...nextClasses.split(" "), "driver-popover-next-btn");
            nextButton.innerText = driverObj.isLastStep() ? tour.doneButtonLabel : tour.nextButtonLabel;
            const prevButton = document.createElement("button");
            let prevClasses = "fi-btn fi-btn-size-md relative grid-flow-col items-center justify-center font-semibold outline-none transition duration-75 focus:ring-2 disabled:pointer-events-none disabled:opacity-70 rounded-lg fi-btn-color-gray gap-1.5 px-3 py-2 text-sm inline-grid shadow-sm bg-white text-gray-950 hover:bg-gray-50 dark:bg-white/5 dark:text-white dark:hover:bg-white/10 ring-1 ring-gray-950/10 dark:ring-white/20 fi-ac-btn-action";
            prevButton.classList.add(...prevClasses.split(" "), "driver-popover-prev-btn");
            prevButton.innerText = tour.previousButtonLabel;
            if (isDarkMode) {
              prevButton.style.background = "rgb(30 41 59)";
              prevButton.style.color = "rgb(248 250 252)";
              prevButton.style.borderColor = "color-mix(in oklab, rgb(255 255 255) 14%, transparent)";
            }
            if (!driverObj.isFirstStep()) {
              popover.footer.appendChild(prevButton);
            }
            popover.footer.appendChild(nextButton);
          },
          steps
        });
        waitForStepTarget(steps, () => {
          driverObj.drive(previewStartIndex);
        });
      }
    }
  });
})();
