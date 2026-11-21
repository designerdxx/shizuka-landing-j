"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const wa = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "");
/** WhatsApp deep link for every "Message us" action; falls back to the contact section until a number is set. */
const waHref = wa ? `https://wa.me/${wa}?text=${encodeURIComponent("Hello Shizuka, I'd like a valuation for my ")}` : "#j-contact";
const igHref = process.env.NEXT_PUBLIC_INSTAGRAM_URL || "#j-contact";
const liHref = process.env.NEXT_PUBLIC_LINKEDIN_URL || "#j-contact";

/* eslint-disable @typescript-eslint/no-explicit-any */
export function useSite() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [menu, setMenu] = useState(false);
  const [q, setQ] = useState(0);

  // One-time reveals. Content is visible without JavaScript; once this runs, anything below the fold waits
  // for its rise, while whatever is already on screen stays exactly as rendered (no flash).
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.setAttribute("data-in", ""); io.unobserve(e.target); } }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 },
    );
    root.querySelectorAll("[data-r],[data-m]").forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.92 && r.bottom > 0) el.setAttribute("data-in", "");
      else io.observe(el);
    });
    root.setAttribute("data-armed", "");
    return () => io.disconnect();
  }, []);

  // The phone menu: page scroll locks behind it, Escape closes it.
  useEffect(() => {
    document.documentElement.style.overflow = menu ? "hidden" : "";
    if (!menu) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMenu(false); };
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); document.documentElement.style.overflow = ""; };
  }, [menu]);

  const toggleMenu = useCallback(() => setMenu((m) => !m), []);
  const closeMenu = useCallback(() => setMenu(false), []);
  // Scroll choreography (the same script as the board): the hero draws in to a card, the statement darkens word by
  // word, the split holds while its photos wipe up, and the 72-hour arc fills. It writes only CSS variables and data
  // attributes, never React state, and only engages in a real browser window.
  useEffect(() => {
    const root: any = rootRef.current;

    var off = function () {};
    var whyT = root && root.querySelector('.why-track');
    var setK = function (k: any) {
      if (!whyT) return;
      whyT.setAttribute('data-k', String(k));
      whyT.querySelectorAll('.reasons button').forEach(function (b: any, i: any) { b.setAttribute('aria-pressed', String(i === k)); });
    };
    var onTab = function (e: any) {
      var b = e.target && e.target.closest ? e.target.closest('.reasons button') : null;
      if (!b) return;
      var k = Number(b.getAttribute('data-t')), run = parseFloat(whyT.style.getPropertyValue('--run')) || 0;
      if (whyT.hasAttribute('data-pin') && run) {
        var still = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({ top: Math.round(window.scrollY + whyT.getBoundingClientRect().top + run * [0.1, 0.5, 0.9][k]), behavior: still ? 'auto' : 'smooth' });
      } else setK(k);
    };
    if (whyT) whyT.addEventListener('click', onTab);
    if (root && window.innerHeight <= 1400) {
      root.setAttribute('data-live', '');
      var qs = function (s: any) { return root.querySelector(s); };
      var clamp = function (v: any) { return Math.min(1, Math.max(0, v)); };
      var hero = qs('.hero-track'), why = qs('.why-track'), arc = qs('.arc-track'), say = qs('.say p[aria-hidden]');
      var dot = qs('.dial .dot'), trk = qs('.dial .trk');
      var raf = 0;
      var hold = function (track: any, perScreen: any) {
        var wh = window.innerHeight;
        track.setAttribute('data-pin', '');
        var run = Math.round(wh * perScreen);
        track.style.setProperty('--run', run + 'px');
        return clamp(-track.getBoundingClientRect().top / run);
      };
      var measure = function () {
        raf = 0;
        var wh = window.innerHeight;
        root.toggleAttribute('data-solid', window.scrollY > 24);
        if (hero) hero.style.setProperty('--p', hold(hero, 0.7).toFixed(3));
        if (say) {
          var r = say.getBoundingClientRect();
          say.style.setProperty('--fp', clamp((wh * 0.86 - r.top) / (r.height + wh * 0.36)).toFixed(3));
        }
        if (why) {
          var pw = hold(why, 1.6);
          var a1 = clamp((pw - 0.22) / 0.2), a2 = clamp((pw - 0.6) / 0.2);
          why.style.setProperty('--a1', a1.toFixed(3));
          why.style.setProperty('--a2', a2.toFixed(3));
          setK(a2 > 0.5 ? 2 : a1 > 0.5 ? 1 : 0);
          why.style.setProperty('--f0', clamp(pw / 0.32).toFixed(3));
          why.style.setProperty('--f1', clamp((pw - 0.32) / 0.38).toFixed(3));
          why.style.setProperty('--f2', clamp((pw - 0.7) / 0.3).toFixed(3));
        }
        if (arc) {
          var pa = hold(arc, 2);
          arc.style.setProperty('--p', pa.toFixed(3));
          arc.setAttribute('data-s', String(Math.min(3, Math.floor(pa * 3 + 0.02))));
          if (dot && trk && trk.getTotalLength) {
            var len = trk.getTotalLength(), at = trk.getPointAtLength(len * pa);
            dot.setAttribute('cx', at.x.toFixed(1));
            dot.setAttribute('cy', at.y.toFixed(1));
          }
        }
      };
      var onScroll = function () { if (!raf) raf = requestAnimationFrame(measure); };
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll);
      measure();
      off = function () { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); if (raf) cancelAnimationFrame(raf); };
    }
    var off0 = off;
    off = function () { off0(); if (whyT) whyT.removeEventListener('click', onTab); };
    return off;
  }, []);

  const v = useMemo(() => {
    const v: Record<string, any> = {
      waHref, igHref, liHref,
      rootCls: menu ? "jj open" : "jj",
      menuOpen: menu ? "true" : "false",
      menuHidden: menu ? "false" : "true",
      menuLabel: menu ? "Close" : "Menu",
      toggleMenu, closeMenu,
    };
    for (let k = 0; k < 7; k++) {
      v["q" + k] = k === q ? "on" : "";
      v["qe" + k] = k === q ? "true" : "false";
      v["qt" + k] = () => setQ((cur) => (cur === k ? -1 : k));
    }
    return v;
  }, [menu, q, toggleMenu, closeMenu]);

  return { v, rootRef };
}
