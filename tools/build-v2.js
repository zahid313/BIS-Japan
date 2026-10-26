#!/usr/bin/env node
/*
 * BIS Japan v2 — static page builder (no dependencies).
 *
 *   node tools/build-v2.js          build every page into the repo root
 *   node tools/build-v2.js --check  build in memory, fail if a file on disk differs (use in CI / before committing)
 *
 * Sources live in src/v2/:
 *   partials/*.html   shared chrome (head, header, footer, menu drawer, bottom bar, ...)
 *   pages/*.html      one file per page: a `<!--meta {json} -->` block followed by the <main> element
 *
 * Why a build step: the header, menu, footer and bottom bar are identical on every page. Editing them in one place
 * (and getting the same Japanese/English strings everywhere) is what keeps the site consistent as pages are added.
 * The output is plain static HTML — GitHub Pages serves the repo root as before.
 *
 * Template tokens
 *   {{name}}      a value from the page's meta block (or one of the computed values below)
 *   {{include:name}}  inlines src/v2/partials/name.html (e.g. the fee calculator shared by the home and tuition pages)
 *   {{to:key}}    href for a destination in ROUTES: `href="#faq"` on the page that owns the section, otherwise
 *                 `href="index-v2.html#faq" data-keeplang` (keeps the chosen language); adds aria-current for the page itself
 *   {{fontsUrl}}  Google Fonts URL whose text= subset covers every serif headline on THIS page (computed per page)
 *   {{cssV}} {{jsV}}  content hashes of css/v2.css and js/v2.js (cache-busting, computed)
 */
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'src', 'v2');
const CHECK = process.argv.includes('--check');

// destination key → the page that owns it and (optionally) the section on that page
const ROUTES = {
  home: { page: 'home' },
  about: { page: 'home', hash: '#about' },
  curriculum: { page: 'home', hash: '#curriculum' },
  admissions: { page: 'home', hash: '#admissions' },       // the fee summary on the home page
  tuition: { page: 'tuition' },                            // the full tuition & subsidy page
  teachers: { page: 'home', hash: '#teachers' },
  access: { page: 'home', hash: '#access' },
  faq: { page: 'home', hash: '#faq' },
  booking: { page: 'home', hash: '#booking' },
};

const read = (...p) => fs.readFileSync(path.join(...p), 'utf8').replace(/\r\n/g, '\n');
const hashOf = (file) => crypto.createHash('sha1').update(fs.readFileSync(path.join(ROOT, file))).digest('hex').slice(0, 8);

// ---------- load ----------
const partials = {};
for (const f of fs.readdirSync(path.join(SRC, 'partials'))) partials[f.replace(/\.html$/, '')] = read(SRC, 'partials', f);

const pages = fs.readdirSync(path.join(SRC, 'pages')).filter((f) => f.endsWith('.html')).sort().map((f) => {
  const raw = read(SRC, 'pages', f);
  const m = /^<!--meta\n([\s\S]*?)\n-->\n/.exec(raw);
  if (!m) throw new Error(`${f}: missing <!--meta … --> block`);
  const meta = JSON.parse(m[1]);
  for (const k of ['file', 'key', 'title', 'titleEn', 'description', 'ogUrl', 'ogTitle', 'ogDescription', 'ogAlt']) {
    if (typeof meta[k] !== 'string') throw new Error(`${f}: meta.${k} is required`);
  }
  return { src: f, meta, main: raw.slice(m[0].length) };
});

const fileOfPage = {};
for (const p of pages) fileOfPage[p.meta.key] = p.meta.file;
for (const [k, r] of Object.entries(ROUTES)) if (!fileOfPage[r.page]) throw new Error(`route "${k}" points to unknown page "${r.page}"`);

// ---------- serif headline subset ----------
// Only the headline face is a web font; it is subset to the characters the serif elements actually use.
// Serif elements = h1–h3, and the classes below (see css/v2.css where --font-serif is applied).
const SERIF_CLASSES = ['trust-num', 'reason-num', 'brand-name', 'quote-mark', 'ficon-text', 'calc-net', 'fact-num', 'price-num', 'route-net'];
const SERIF_STRONG_IN = ['fee-amount', 'lb-figure'];           // <strong> inside these is serif
const VOID = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr', 'use', 'path']);
const decode = (s) => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'");
const stripTags = (s) => s.replace(/<[^>]*>/g, '');

function serifText(html) {
  let out = '';
  const stack = [];                                  // open elements: {tag, serif}
  let depthSerif = 0;
  const tagRe = /<!--[\s\S]*?-->|<(\/?)([a-zA-Z][a-zA-Z0-9-]*)((?:"[^"]*"|'[^']*'|[^>"'])*)>/g;
  let last = 0, m;
  while ((m = tagRe.exec(html))) {
    if (depthSerif > 0) out += decode(html.slice(last, m.index));       // text node inside a serif element
    last = tagRe.lastIndex;
    if (m[0].startsWith('<!--')) continue;
    const [, closing, tag, attrs] = m; const t = tag.toLowerCase();
    if (closing) {
      for (let i = stack.length - 1; i >= 0; i--) {
        if (stack[i].tag === t) { const popped = stack.splice(i); for (const e of popped) if (e.serif) depthSerif--; break; }
      }
      continue;
    }
    const cls = (/\bclass="([^"]*)"/.exec(attrs) || [, ''])[1].split(/\s+/);
    const serif = /^h[1-3]$/.test(t) || cls.some((c) => SERIF_CLASSES.includes(c)) || (t === 'strong' && stack.some((e) => e.cls.some((c) => SERIF_STRONG_IN.includes(c))));
    // the English twin of a serif element (data-en holds HTML) and lightbox titles (data-title / data-title-en) are serif too
    if (serif || depthSerif > 0) for (const a of attrs.matchAll(/\bdata-en="([^"]*)"/g)) out += stripTags(decode(a[1]));
    if (cls.includes('life-tile')) for (const a of attrs.matchAll(/\bdata-title(?:-en)?="([^"]*)"/g)) out += decode(a[1]);
    if (!VOID.has(t) && !/\/\s*$/.test(attrs)) { stack.push({ tag: t, serif, cls }); if (serif) depthSerif++; }
  }
  return out;
}
const ASCII = Array.from({ length: 95 }, (_, i) => String.fromCharCode(32 + i)).join('');
const EXTRA = '¥円〜～、。・「」（）【】×–—−％…’“”※';      // JS-written values (calculator), punctuation used in headings

// ---------- assemble ----------
function assemble(page, ctx) {
  const { meta } = page;
  const parts = [
    partials.head, partials.sprite, partials.header, page.main, partials.footer, partials['action-bar'],
    partials.drawer, partials.sheet, meta.lightbox ? partials.lightbox : '', partials.scripts,
  ];
  const vars = { sheetHref: '', headExtra: '', ...meta, fontsUrl: ctx.fontsUrl, cssV: ctx.cssV, jsV: ctx.jsV };
  let html = parts.join('');
  for (let i = 0; i < 4 && /\{\{include:/.test(html); i++) {          // partials may include partials (max depth 4)
    html = html.replace(/\{\{include:([a-z-]+)\}\}/g, (_, name) => {
      if (!(name in partials)) throw new Error(`${meta.file}: unknown include {{include:${name}}}`);
      return partials[name].replace(/\n+$/, '');
    });
  }
  html = html.replace(/\{\{to:([a-z-]+)\}\}/g, (_, key) => {
    const r = ROUTES[key]; if (!r) throw new Error(`${meta.file}: unknown route {{to:${key}}}`);
    const own = r.page === meta.key;
    const href = r.hash && own ? r.hash : fileOfPage[r.page] + (r.hash || '');
    return `href="${href}"` + (r.hash && own ? '' : ' data-keeplang') + (!r.hash && own ? ' aria-current="page"' : '');
  });
  html = html.replace(/\{\{([A-Za-z]+)\}\}/g, (_, name) => {
    if (!(name in vars)) throw new Error(`${meta.file}: unknown token {{${name}}}`);
    return vars[name];
  });
  if (/\{\{/.test(html)) throw new Error(`${meta.file}: unresolved {{ token`);
  return html;
}

// Each page gets its own headline-font subset (only the glyphs that page uses), so a page never downloads characters from the others.
// First pass assembles with a placeholder URL so the serif text can be read from the real markup; the second pass writes the final URL.
const base = { cssV: hashOf('css/v2.css'), jsV: hashOf('js/v2.js') };
const fontsFor = (page) => {
  const chars = new Set(ASCII + EXTRA);
  for (const ch of serifText(assemble(page, { ...base, fontsUrl: 'FONTS' }))) if (ch.trim() || ch === ' ') chars.add(ch);
  return { count: chars.size, url: 'https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@700&amp;display=swap&amp;text=' + encodeURIComponent([...chars].sort().join('')) };
};

// ---------- write / check ----------
const BANNER = '<!-- GENERATED by tools/build-v2.js from src/v2 — edit the sources there, then run: node tools/build-v2.js -->\n';
let stale = 0;
for (const p of pages) {
  const fonts = fontsFor(p);
  const html = assemble(p, { ...base, fontsUrl: fonts.url }).replace(/^(<!DOCTYPE html>\n)/i, '$1' + BANNER);
  const out = path.join(ROOT, p.meta.file);
  const current = fs.existsSync(out) ? fs.readFileSync(out, 'utf8').replace(/\r\n/g, '\n') : null;
  if (CHECK) { if (current !== html) { console.error('STALE  ' + p.meta.file); stale++; } else console.log('ok     ' + p.meta.file); }
  else { fs.writeFileSync(out, html); console.log(`built  ${p.meta.file}  (${(Buffer.byteLength(html) / 1024).toFixed(1)} KB, headline font: ${fonts.count} glyphs)`); }
}
console.log(`css v=${base.cssV} · js v=${base.jsV}`);
if (stale) { console.error('Run: node tools/build-v2.js'); process.exit(1); }
