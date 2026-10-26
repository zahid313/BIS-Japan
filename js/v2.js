/**
 * BIS JAPAN — v2 prototype behaviour (index-v2.html)
 * Vanilla JS, no dependencies. Sections:
 *   1 i18n (JA default, EN via data-en*)   6 Calculator
 *   2 Menu drawer (native <dialog>)         7 Photo lightbox
 *   3 Tabs (programmes, access)             8 Map (tap to load)
 *   4 Swipe-row dots                        9 Booking form (UI only — no endpoint yet)
 *   5 Reveal on scroll                     10 Action bar, footer, placeholder toggle
 */
(() => {
  'use strict';

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const root = document.documentElement;
  root.classList.add('js');

  const LANG_KEY = 'bisjapan_lang';          // shared with the existing inner pages
  let lang = 'ja';
  let onLangChanged = () => {};              // set by the header code below: language changes the font stack, so widths change

  /* ------------------------------------------------------------------ 1 · i18n */
  const ATTR_PAIRS = [['alt', 'data-en-alt'], ['aria-label', 'data-en-aria-label'], ['placeholder', 'data-en-placeholder']];

  function readLang() {
    try {
      const q = new URLSearchParams(location.search).get('lang');
      if (q === 'ja' || q === 'en') { localStorage.setItem(LANG_KEY, q); return q; }
      const s = localStorage.getItem(LANG_KEY);
      if (s === 'ja' || s === 'en') return s;
    } catch (e) { /* storage blocked: fall through */ }
    return 'ja';
  }

  // The page ships in Japanese. English is swapped in on demand, so the default
  // (Japanese) path does no DOM rewriting at all.
  let shown = 'ja';        // language currently rendered in the DOM
  let cached = false;

  // Remember the Japanese source text once, so English can be toggled back to Japanese.
  function cacheJapanese() {
    $$('[data-en]').forEach((el) => {
      el.setAttribute('data-ja', el.tagName === 'TITLE' ? el.textContent : el.innerHTML);
    });
    ATTR_PAIRS.forEach(([attr, enAttr]) => {
      $$(`[${enAttr}]`).forEach((el) => el.setAttribute(`data-ja-${attr}`, el.getAttribute(attr) || ''));
    });
    cached = true;
  }

  function swapContent(target) {
    if (!cached) cacheJapanese();
    $$('[data-en]').forEach((el) => {
      const text = target === 'en' ? el.getAttribute('data-en') : el.getAttribute('data-ja');
      if (el.tagName === 'TITLE') document.title = text; else el.innerHTML = text;
    });
    ATTR_PAIRS.forEach(([attr, enAttr]) => {
      $$(`[${enAttr}]`).forEach((el) => {
        el.setAttribute(attr, target === 'en' ? el.getAttribute(enAttr) : el.getAttribute(`data-ja-${attr}`));
      });
    });
    shown = target;
  }

  function setLang(next) {
    lang = next === 'en' ? 'en' : 'ja';
    root.lang = lang;
    if (lang !== shown) swapContent(lang);
    $$('.lang-btn').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
    $$('a[data-keeplang]').forEach((a) => {
      const base = a.getAttribute('data-href0');
      a.setAttribute('href', `${base}${base.includes('?') ? '&' : '?'}lang=${lang}`);
    });
    try {
      localStorage.setItem(LANG_KEY, lang);
      const url = new URL(location.href);
      url.searchParams.set('lang', lang);
      history.replaceState({}, '', url);
    } catch (e) { /* ignore */ }
    calc();            // keep the calculator labels/values coherent
    onLangChanged();
  }

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.lang-btn');
    if (btn) setLang(btn.dataset.lang);
  });

  /* ------------------------------------------------------------------ 2 · Drawer */
  const drawer = $('#nav-drawer');
  if (drawer) {
    const unlock = () => { document.body.style.overflow = ''; };
    $('#menu-open').addEventListener('click', () => { drawer.showModal(); document.body.style.overflow = 'hidden'; });
    $('#menu-close').addEventListener('click', () => drawer.close());
    drawer.addEventListener('close', unlock);
    drawer.addEventListener('click', (e) => {
      if (e.target === drawer) { drawer.close(); return; }          // backdrop tap
      const a = e.target.closest('a');
      if (a && (a.hasAttribute('data-close') || a.getAttribute('href').startsWith('#'))) { unlock(); drawer.close(); }
    });
    matchMedia('(min-width: 900px)').addEventListener('change', (m) => { if (m.matches && drawer.open) drawer.close(); });
  }

  /* ------------------------------------------------------------------ 2b · ※ note sheet */
  const sheet = $('#ast-sheet');
  if (sheet) {
    document.addEventListener('click', (e) => {
      if (e.target.closest('.ast')) { sheet.showModal(); document.body.style.overflow = 'hidden'; }
    });
    $('#ast-close').addEventListener('click', () => sheet.close());
    sheet.addEventListener('close', () => { document.body.style.overflow = ''; });
    sheet.addEventListener('click', (e) => {
      if (e.target === sheet) { sheet.close(); return; }                     // backdrop tap
      if (e.target.closest('a[href^="#"]')) { document.body.style.overflow = ''; sheet.close(); }
    });
  }

  /* ------------------------------------------------------------------ 3 · Tabs */
  $$('[data-tabs]').forEach((list) => {
    const tabs = $$('[role="tab"]', list);
    const select = (tab, focus) => {
      tabs.forEach((t) => {
        const on = t === tab;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        const panel = document.getElementById(t.getAttribute('aria-controls'));
        if (panel) panel.hidden = !on;
      });
      if (focus) tab.focus();
    };
    tabs.forEach((t) => t.addEventListener('click', () => select(t)));
    list.addEventListener('keydown', (e) => {
      const i = tabs.indexOf(document.activeElement);
      if (i < 0) return;
      const next = { ArrowRight: tabs[(i + 1) % tabs.length], ArrowLeft: tabs[(i - 1 + tabs.length) % tabs.length], Home: tabs[0], End: tabs[tabs.length - 1] }[e.key];
      if (next) { e.preventDefault(); select(next, true); }
    });
  });

  /* ------------------------------------------------------------------ 4 · Swipe-row dots */
  $$('.snap[data-dots]').forEach((row) => {
    const items = [...row.children];
    const dots = document.createElement('div');
    dots.className = 'dots';
    dots.setAttribute('aria-hidden', 'true');
    items.forEach(() => dots.appendChild(document.createElement('span')));
    row.after(dots);
    const update = () => {
      const atEnd = row.scrollLeft + row.clientWidth >= row.scrollWidth - 4;
      let idx = 0;
      if (atEnd) idx = items.length - 1;
      else {
        let best = Infinity;
        items.forEach((it, i) => {
          const d = Math.abs(it.offsetLeft - row.offsetLeft - row.scrollLeft - parseFloat(getComputedStyle(row).paddingLeft));
          if (d < best) { best = d; idx = i; }
        });
      }
      [...dots.children].forEach((d, i) => d.classList.toggle('is-on', i === idx));
    };
    let raf = 0;
    row.addEventListener('scroll', () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(update); }, { passive: true });
    update();
  });

  /* ------------------------------------------------------------------ 5 · Reveal */
  const reveals = $$('.reveal');
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px' });
    reveals.forEach((el) => io.observe(el));
    // Safety net: if the observer is slow (backgrounded tab, busy device), show whatever is already on screen.
    setTimeout(() => {
      reveals.forEach((el) => { if (el.getBoundingClientRect().top < innerHeight) el.classList.add('in'); });
    }, 1200);
  } else {
    reveals.forEach((el) => el.classList.add('in'));
  }

  /* ------------------------------------------------------------------ 6 · Calculator */
  const ageSel = $('#calc-age');
  const subSel = $('#calc-sub');
  const yen = (n) => `¥${n.toLocaleString('ja-JP')}`;
  function calc() {
    if (!ageSel || !subSel) return;
    const stage = ageSel.value;
    const pre = stage === 'preprimary';
    const tuition = stage === 'primary' ? 35000 : 37000;
    const subsidy = pre ? ({ mushouka: 37000, tayona: 20000, corporate: 37000, none: 0 }[subSel.value] || 0) : 0;
    subSel.disabled = !pre;
    $('#calc-note').hidden = pre;
    $('#calc-tuition').textContent = yen(tuition);
    const s = $('#calc-subsidy');
    s.textContent = subsidy ? `−${yen(subsidy)}` : yen(0);
    s.classList.toggle('is-minus', subsidy > 0);
    $('#calc-net').textContent = yen(Math.max(0, tuition - subsidy));
  }
  if (ageSel) { ageSel.addEventListener('change', calc); subSel.addEventListener('change', calc); }

  /* ------------------------------------------------------------------ 7 · Lightbox */
  const lb = $('#lightbox');
  const moreBtn = $('#life-more');
  if (moreBtn) {
    moreBtn.addEventListener('click', () => {
      $$('#life-grid .is-extra').forEach((li) => { li.hidden = false; });
      moreBtn.setAttribute('aria-expanded', 'true');
      moreBtn.parentElement.hidden = true;
    });
  }
  if (lb) {
    let list = [];
    let cur = 0;
    const show = (i) => {
      cur = (i + list.length) % list.length;
      const t = list[cur];
      const en = lang === 'en';
      const img = $('#lb-img');
      img.src = t.dataset.large;
      img.alt = $('img', t).alt;
      $('#lb-title').textContent = en ? t.dataset.titleEn : t.dataset.title;
      $('#lb-desc').textContent = en ? t.dataset.descEn : t.dataset.desc;
      $('#lb-count').textContent = `${cur + 1} / ${list.length}`;
    };
    $('#life-grid').addEventListener('click', (e) => {
      const tile = e.target.closest('.life-tile');
      if (!tile) return;
      list = $$('.life-tile', $('#life-grid')).filter((t) => !t.closest('[hidden]'));
      lb.showModal();
      document.body.style.overflow = 'hidden';
      show(list.indexOf(tile));
    });
    $('#lb-close').addEventListener('click', () => lb.close());
    $('#lb-prev').addEventListener('click', () => show(cur - 1));
    $('#lb-next').addEventListener('click', () => show(cur + 1));
    lb.addEventListener('close', () => { document.body.style.overflow = ''; });
    lb.addEventListener('click', (e) => { if (e.target === lb) lb.close(); });
    lb.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') show(cur - 1);
      if (e.key === 'ArrowRight') show(cur + 1);
    });
    let x0 = null;
    lb.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', (e) => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 50) show(cur + (dx < 0 ? 1 : -1));
      x0 = null;
    }, { passive: true });
  }

  /* ------------------------------------------------------------------ 8 · Map (tap to load) */
  const mapBtn = $('#map-load');
  if (mapBtn) {
    mapBtn.addEventListener('click', () => {
      const stage = $('#map-stage');
      const frame = document.createElement('iframe');
      frame.src = stage.dataset.mapSrc;
      frame.title = lang === 'en' ? 'Map of BIS Japan' : 'BIS Japan 周辺地図';
      frame.loading = 'lazy';
      frame.referrerPolicy = 'no-referrer-when-downgrade';
      stage.appendChild(frame);
      $('.map-fallback', stage).hidden = true;
    });
  }

  /* ------------------------------------------------------------------ 9 · Booking form (UI only) */
  const form = $('#booking-form');
  if (form) {
    const rules = [
      ['f-name', 'e-name', (v) => v.trim().length > 0],
      ['f-tel', 'e-tel', (v) => v.replace(/\D/g, '').length >= 9],
      ['f-age', 'e-age', (v) => v !== ''],
    ];
    const check = ([id, err, ok], quiet) => {
      const el = document.getElementById(id);
      const bad = !ok(el.value);
      el.setAttribute('aria-invalid', String(bad && !quiet));
      document.getElementById(err).hidden = !(bad && !quiet);
      return bad;
    };
    // Once an error is showing, re-check live so it clears as soon as the field is fixed.
    rules.forEach((r) => document.getElementById(r[0]).addEventListener('input', () => {
      if (!document.getElementById(r[1]).hidden) check(r, false);
    }));
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const bad = rules.filter((r) => check(r, false));
      if (bad.length) { document.getElementById(bad[0][0]).focus(); return; }
      // TODO(real data): POST the form to the school's endpoint here, then show success.
      form.hidden = true;
      const ok = $('#form-success');
      ok.hidden = false;
      ok.focus();
    });
    $('#form-again').addEventListener('click', () => {
      form.reset();
      $('#form-success').hidden = true;
      form.hidden = false;
      $('#f-name').focus();
    });
  }

  /* ------------------------------------------------------------------ 10 · Action bar, footer, placeholders */
  const bar = $('#action-bar');
  if (bar && 'IntersectionObserver' in window) {
    let heroOut = false; let inBooking = false; let inFooter = false; let typing = false; let tabsPinned = false;
    const sync = () => bar.classList.toggle('is-visible', heroOut && !inBooking && !inFooter && !typing && !tabsPinned);

    // While the stage tabs are pinned under the header, the bottom bar steps aside:
    // header + tabs + bar together would take ~27% of a phone screen.
    const tabs = $('.seg-sticky');
    const programmes = $('.programmes');
    const headerH = () => $('.site-header').offsetHeight;
    const checkPinned = () => {
      const t = tabs.getBoundingClientRect();
      const p = programmes.getBoundingClientRect();
      const now = getComputedStyle(tabs).position === 'sticky' && t.top <= headerH() + 1 && p.bottom > t.height + headerH() + 24;
      if (now !== tabsPinned) { tabsPinned = now; sync(); }
    };
    let pinRaf = 0;
    addEventListener('scroll', () => { cancelAnimationFrame(pinRaf); pinRaf = requestAnimationFrame(checkPinned); }, { passive: true });
    addEventListener('resize', checkPinned);
    checkPinned();
    new IntersectionObserver(([e]) => { heroOut = !e.isIntersecting && e.boundingClientRect.top < 0; sync(); }).observe($('#hero-cta'));
    new IntersectionObserver(([e]) => { inBooking = e.isIntersecting; sync(); }, { threshold: 0.08 }).observe($('#booking'));
    new IntersectionObserver(([e]) => { inFooter = e.isIntersecting; sync(); }).observe($('.site-footer'));
    document.addEventListener('focusin', (e) => { if (e.target.matches('input, textarea, select')) { typing = true; sync(); } });
    document.addEventListener('focusout', () => { setTimeout(() => { typing = document.activeElement?.matches?.('input, textarea, select') || false; sync(); }, 50); });
  }

  const wide = matchMedia('(min-width: 900px)');
  const footerGroups = () => $$('.footer-group').forEach((d) => { d.open = wide.matches; });
  footerGroups();
  wide.addEventListener('change', footerGroups);

  const phBtn = $('#ph-toggle');
  const setPh = (on) => {
    root.dataset.ph = on ? 'on' : 'off';
    phBtn.setAttribute('aria-pressed', String(on));
    phBtn.textContent = `Placeholders: ${on ? 'ON' : 'OFF'}`;
    try { sessionStorage.setItem('bis_ph', on ? 'on' : 'off'); } catch (e) { /* ignore */ }
  };
  if (phBtn) {
    const params = new URLSearchParams(location.search);
    const q = params.get('ph');
    let stored = null; let dev = false;
    try { stored = sessionStorage.getItem('bis_ph'); dev = sessionStorage.getItem('bis_dev') === '1'; } catch (e) { /* ignore */ }
    // The toggle is a reviewer tool: it only appears after opening the page with ?ph=on or ?ph=off.
    if (params.has('ph')) { dev = true; try { sessionStorage.setItem('bis_dev', '1'); } catch (e) { /* ignore */ } }
    phBtn.hidden = !dev;
    setPh((q || stored || 'on') !== 'off');
    phBtn.addEventListener('click', () => setPh(root.dataset.ph !== 'on'));
  }

  /* ------------------------------------------------------------------ header height → CSS variable */
  // With large text the header wraps to two rows; sticky tabs and anchor offsets must follow its real height.
  const siteHeader = $('.site-header');
  if (siteHeader) {
    const brandEl = $('.brand', siteHeader);
    const actionsEl = $('.header-actions', siteHeader);
    // Keep the header on one row when text is large: if the controls wrap below the brand, drop the wordmark
    // text and keep the crest. The wordmark is always re-measured first, so the decision is stable.
    const fitHeader = () => {
      siteHeader.classList.remove('brand-compact');
      const wrapped = actionsEl.offsetTop > brandEl.offsetTop + brandEl.offsetHeight / 2;
      if (wrapped) siteHeader.classList.add('brand-compact');
    };
    const syncHeader = () => {
      fitHeader();
      root.style.setProperty('--header-live', `${siteHeader.getBoundingClientRect().height}px`);
    };
    if ('ResizeObserver' in window) new ResizeObserver(syncHeader).observe(siteHeader);
    addEventListener('resize', syncHeader);
    addEventListener('load', syncHeader);
    if (document.fonts) {
      if (document.fonts.ready) document.fonts.ready.then(syncHeader);
      if (document.fonts.addEventListener) document.fonts.addEventListener('loadingdone', syncHeader);   // the web font arrives late: re-measure
    }
    onLangChanged = syncHeader;
    window.__syncHeader = syncHeader;   // handy for testing text-size changes without a resize event
    syncHeader();
  }

  /* ------------------------------------------------------------------ boot */
  $$('a[data-keeplang]').forEach((a) => a.setAttribute('data-href0', a.getAttribute('href')));
  setLang(readLang());
})();
