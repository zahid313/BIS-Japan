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
 */
function initLanguageSwitcher() {
  const currentLang = localStorage.getItem('bisjapan_lang') || 'ja';
  setLanguage(currentLang);

  const langButtons = document.querySelectorAll('.lang-btn');
  langButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const selected = e.currentTarget.getAttribute('data-lang');
      setLanguage(selected);
    });
  });
}

function setLanguage(lang) {
  localStorage.setItem('bisjapan_lang', lang);
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
    drawer.classList.add('active');
    document.body.style.overflow = 'hidden';
    toggleBtn.setAttribute('aria-expanded', 'true');
  }

  function closeDrawer() {
    drawer.classList.remove('active');
    document.body.style.overflow = '';
    toggleBtn.setAttribute('aria-expanded', 'false');
  }

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
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

