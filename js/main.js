/**
 * BIS JAPAN - Master Client Application Logic
 * Implements bilingual toggling, interactive subsidy calculator, mobile drawer, and booking form.
 */

document.addEventListener('DOMContentLoaded', () => {
  initLanguageSwitcher();
  initMobileNavigation();
  initFaqAccordion();
  initSubsidyCalculator();
  initBookingForm();
  initStageTabs();
});

/**
 * 1. BILINGUAL LANGUAGE SWITCHER (JA / EN)
 * Dynamically toggles all text elements marked with data-ja and data-en
 * Persists language via both localStorage and URL parameters across page transitions
 */
function getInitialLanguage() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    if (urlLang === 'en' || urlLang === 'ja') {
      localStorage.setItem('bisjapan_lang', urlLang);
      return urlLang;
    }
    if (window.__INITIAL_LANG__ === 'en' || window.__INITIAL_LANG__ === 'ja') {
      return window.__INITIAL_LANG__;
    }
    const stored = localStorage.getItem('bisjapan_lang');
    if (stored === 'en' || stored === 'ja') {
      return stored;
    }
  } catch (e) {
    console.warn('Storage or URL parsing error:', e);
  }
  return 'ja';
}

function initLanguageSwitcher() {
  const currentLang = getInitialLanguage();
  setLanguage(currentLang);

  // Delegated click handler for all language toggle buttons across header, utility bar, and drawer
  document.addEventListener('click', (e) => {
    const langBtn = e.target.closest('.lang-btn');
    if (langBtn) {
      e.preventDefault();
      e.stopPropagation();
      const selected = langBtn.getAttribute('data-lang');
      if (selected) {
        setLanguage(selected);
      }
    }
  });

  // Capture clicks on all internal links to guarantee the selected language travels with navigation
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href]');
    if (!link) return;
    const href = link.getAttribute('href');
    if (!href) return;
    if (href.startsWith('http://') || href.startsWith('https://') || 
        href.startsWith('tel:') || href.startsWith('mailto:') || 
        href.startsWith('javascript:') || href.startsWith('#')) {
      return;
    }
    const activeLang = localStorage.getItem('bisjapan_lang') || 'ja';
    try {
      const parts = href.split('#');
      const [path, query] = parts[0].split('?');
      const hash = parts[1] ? '#' + parts[1] : '';
      const params = new URLSearchParams(query || '');
      params.set('lang', activeLang);
      link.setAttribute('href', `${path}?${params.toString()}${hash}`);
    } catch (err) {}
  }, { capture: true });
}

function setLanguage(lang) {
  try {
    localStorage.setItem('bisjapan_lang', lang);
  } catch (e) {
    console.warn('Could not save to localStorage:', e);
  }

  document.documentElement.setAttribute('lang', lang);

  // Update button active state
  document.querySelectorAll('.lang-btn').forEach(btn => {
    if (btn.getAttribute('data-lang') === lang) {
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
    } else {
      btn.classList.remove('active');
      btn.setAttribute('aria-pressed', 'false');
    }
  });

  // Switch all bilingual text elements
  const bilingualElements = document.querySelectorAll('[data-ja]');
  bilingualElements.forEach(el => {
    const text = el.getAttribute(`data-${lang}`);
    if (text) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.setAttribute('placeholder', text);
      } else {
        el.innerHTML = text;
      }
    }
    const phText = el.getAttribute(`data-placeholder-${lang}`);
    if (phText) {
      el.setAttribute('placeholder', phText);
    }
  });

  // Also update any elements that only have data-placeholder-ja / data-placeholder-en
  document.querySelectorAll('[data-placeholder-ja]').forEach(el => {
    const ph = el.getAttribute(`data-placeholder-${lang}`);
    if (ph) {
      el.setAttribute('placeholder', ph);
    }
  });

  // Update document title if present
  const docTitleEl = document.querySelector('title[data-ja]');
  if (docTitleEl) {
    const titleText = docTitleEl.getAttribute(`data-${lang}`);
    if (titleText) document.title = titleText;
  }

  // Update URL search parameter smoothly without reload
  if (window.history && window.history.replaceState) {
    try {
      const currentUrl = new URL(window.location.href);
      if (currentUrl.searchParams.get('lang') !== lang) {
        currentUrl.searchParams.set('lang', lang);
        window.history.replaceState({}, '', currentUrl.toString());
      }
    } catch (e) {
      // Ignore in non-standard URL environments
    }
  }

  // Update all internal navigation links so clicking any menu link preserves ?lang=...
  updateInternalLinks(lang);
}

function updateInternalLinks(lang) {
  const links = document.querySelectorAll('a[href]');
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    // Skip external URLs, protocol links, or bare in-page hash anchors
    if (href.startsWith('http://') || href.startsWith('https://') || 
        href.startsWith('tel:') || href.startsWith('mailto:') || 
        href.startsWith('javascript:') || href.startsWith('#')) {
      return;
    }

    try {
      const parts = href.split('#');
      const pathAndQuery = parts[0];
      const hash = parts[1] ? '#' + parts[1] : '';

      const [path, query] = pathAndQuery.split('?');
      const params = new URLSearchParams(query || '');
      params.set('lang', lang);

      link.setAttribute('href', `${path}?${params.toString()}${hash}`);
    } catch (e) {
      // Fallback
    }
  });
}

/**
 * 2. MOBILE NAVIGATION DRAWER
 */
function initMobileNavigation() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const drawer = document.getElementById('mobileDrawer');
  const closeBtn = document.getElementById('mobileDrawerClose');
  const drawerLinks = document.querySelectorAll('.drawer-nav-link');

  if (!toggleBtn || !drawer) return;

  function openDrawer() {
    const activeLang = localStorage.getItem('bisjapan_lang') || document.documentElement.getAttribute('lang') || 'ja';
    
    // Ensure active state of language buttons in drawer reflects activeLang
    drawer.querySelectorAll('.lang-btn').forEach(btn => {
      const bLang = btn.getAttribute('data-lang');
      if (bLang === activeLang) {
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      }
    });

    // Ensure all drawer link hrefs carry activeLang
    updateInternalLinks(activeLang);

    drawer.style.display = 'block';
    setTimeout(() => {
      drawer.classList.add('active');
    }, 10);
    document.body.style.overflow = 'hidden';
    toggleBtn.setAttribute('aria-expanded', 'true');
  }

  function closeDrawer() {
    drawer.classList.remove('active');
    setTimeout(() => {
      drawer.style.display = 'none';
    }, 200);
    document.body.style.overflow = '';
    toggleBtn.setAttribute('aria-expanded', 'false');
  }

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

  // Close when clicking the dark backdrop outside content
  drawer.addEventListener('click', (e) => {
    if (e.target === drawer) {
      closeDrawer();
    }
  });

  // Handle drawer navigation links: preserve language parameter on mobile navigation
  drawerLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href) return;

      // Telephone or external links: close drawer and let default browser action proceed
      if (href.startsWith('tel:') || href.startsWith('mailto:') || href.startsWith('http://') || href.startsWith('https://')) {
        closeDrawer();
        return;
      }

      const activeLang = localStorage.getItem('bisjapan_lang') || document.documentElement.getAttribute('lang') || 'ja';

      // In-page hash on current page (e.g. #booking)
      if (href.startsWith('#')) {
        closeDrawer();
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
        return;
      }

      // Check if it's the current page with a hash (e.g. index.html#teachers while on index.html)
      const parts = href.split('#');
      const targetPath = parts[0].split('?')[0];
      const targetHash = parts[1] ? '#' + parts[1] : '';
      const currentPath = window.location.pathname.split('/').pop() || 'index.html';

      if ((targetPath === currentPath || (currentPath === '' && targetPath === 'index.html')) && targetHash) {
        closeDrawer();
        const target = document.querySelector(targetHash);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
        return;
      }

      // Navigation to another page: explicitly navigate to target with ?lang=...
      e.preventDefault();
      closeDrawer();
      const finalUrl = `${targetPath}?lang=${activeLang}${targetHash}`;
      window.location.href = finalUrl;
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('active')) {
      closeDrawer();
    }
  });
}

/**
 * 3. FAQ ACCORDION
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close other accordions for neatness
      faqItems.forEach(i => i.classList.remove('active'));

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/**
 * 4. INTERACTIVE SUBSIDY CALCULATOR
 */
function initSubsidyCalculator() {
  const ageSelect = document.getElementById('calcAgeSelect');
  const subsidyTypeSelect = document.getElementById('calcSubsidySelect');
  const tuitionDisplay = document.getElementById('calcTuitionDisplay');
  const subsidyDisplay = document.getElementById('calcSubsidyDisplay');
  const netDisplay = document.getElementById('calcNetDisplay');

  if (!ageSelect || !subsidyTypeSelect || !netDisplay) return;

  function calculate() {
    const age = ageSelect.value;
    const subsidyType = subsidyTypeSelect.value;
    let baseTuition = 37000;
    let subsidyAmount = 0;

    if (age === 'primary') {
      baseTuition = 35000;
      subsidyAmount = 0; // Primary school not covered by pre-primary free subsidy
    } else if (age === 'secondary') {
      baseTuition = 37000;
      subsidyAmount = 0;
    } else {
      // Pre-primary (3-5 years old)
      baseTuition = 37000;
      if (subsidyType === 'mushouka') {
        subsidyAmount = 37000;
      } else if (subsidyType === 'tayona') {
        subsidyAmount = 20000;
      } else if (subsidyType === 'corporate') {
        baseTuition = 51000;
        subsidyAmount = 51000;
      } else {
        subsidyAmount = 0;
      }
    }

    const netTuition = Math.max(0, baseTuition - subsidyAmount);

    if (tuitionDisplay) tuitionDisplay.textContent = `¥${baseTuition.toLocaleString()}`;
    if (subsidyDisplay) subsidyDisplay.textContent = `-¥${subsidyAmount.toLocaleString()}`;
    netDisplay.textContent = `¥${netTuition.toLocaleString()}`;
  }

  ageSelect.addEventListener('change', calculate);
  subsidyTypeSelect.addEventListener('change', calculate);
}

/**
 * 5. TRIAL LESSON BOOKING FORM
 */
function initBookingForm() {
  const form = document.getElementById('trialBookingForm');
  const successModal = document.getElementById('bookingSuccessModal');
  const closeModalBtn = document.getElementById('closeModalBtn');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const parentName = document.getElementById('parentName')?.value.trim();
    const phone = document.getElementById('phone')?.value.trim();
    const childAge = document.getElementById('childAge')?.value;

    if (!parentName || !phone || !childAge) {
      alert('必須項目をすべてご入力ください。(Please fill in all required fields.)');
      return;
    }

    // Show friendly success confirmation
    if (successModal) {
      successModal.style.display = 'flex';
      successModal.setAttribute('aria-modal', 'true');
      successModal.setAttribute('role', 'dialog');
      if (closeModalBtn) closeModalBtn.focus();
    } else {
      alert(`ご予約ありがとうございます！${parentName}様宛に、担当スタッフより24時間以内に確認のご連絡（お電話またはメール）を差し上げます。`);
    }

    form.reset();
  });

  if (closeModalBtn && successModal) {
    closeModalBtn.addEventListener('click', () => {
      successModal.style.display = 'none';
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && successModal.style.display === 'flex') {
        successModal.style.display = 'none';
      }
    });
  }
}

/**
 * 6. INTERACTIVE STAGE TABS (BST / Rugby School Japan Pattern)
 */
function initStageTabs() {
  const tabButtons = document.querySelectorAll('.stage-tab-btn');
  const panels = document.querySelectorAll('.stage-panel');

  if (!tabButtons.length || !panels.length) return;

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const stage = btn.getAttribute('data-stage');

      tabButtons.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      panels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const targetPanel = document.getElementById(`stage-${stage}`);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });
}

