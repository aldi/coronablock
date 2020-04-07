(function () {
  if (globalThis.__coronablockInitialized) {
    return;
  }
  globalThis.__coronablockInitialized = true;

  let count = 0;
  let isOn = true;
  let observer = null;
  const pendingTargets = new Set();
  let scanScheduled = false;
  let badgeUpdateScheduled = false;
  let initialScanScheduled = false;

  const HIDE_TARGET_SELECTOR = [
    '[role="article"]',
    '.userContentWrapper',
    'div[data-pagelet^="FeedUnit"]',
    'div[data-testid="post_container"]',
    'div[aria-posinset]',
    'div[role="feed"] > div',
  ].join(',');

  // 1. Core Direct Terms
  const coreTerms = [
    '2019-ncov',
    'coronavirus',
    'coronaviridae',
    'cov-19',
    'covid',
    'covid-19',
    'covid19',
    'mers-cov',
    'n-cov',
    'novel coronavirus',
    'sars-cov-2',
  ];

  // 2. Variants & Medical Specifics
  const variantTerms = [
    'alpha variant',
    'beta variant',
    'delta variant',
    'flurona',
    'gamma variant',
    'long covid',
    'long-hauler',
    'omicron',
    'pcr test',
    'rapid test',
    'antigen test',
    'lateral flow',
  ];

  // 3. Vaccines & Brands
  const vaccineTerms = [
    'astrazeneca',
    'biontech',
    'booster shot',
    'covaxin',
    'janssen',
    'johnson & johnson',
    'moderna',
    'novavax',
    'pfizer',
    'sinopharm',
    'sinovac',
    'sputnik v',
    'mrna vaccine',
  ];

  // 4. Social Measures & Slang
  const socialTerms = [
    'anti-vax',
    'antivax',
    'chinavirus',
    'herd immunity',
    'lockdown',
    'mask mandate',
    'pandemic',
    'plandemic',
    'quarantine',
    'scamdemic',
    'self-isolation',
    'social distancing',
    'stay at home',
    'the vid',
    'wuhan virus',
  ];

  // 5. International/Translations
  const internationalTerms = [
    'coronav',
    'coronavirüs',
    'coronavírus',
    'korona',
    'koronav',
    'koronaviirus',
    'koronavirus',
    'koronavírus',
    'koronawirus',
    'kórónaveira',
    'neues coronavirus',
    'nouveau coronavirus',
    'nuevo coronavirus',
    'νέος κορωνοϊός',
    'κορονοϊός',
    'κορωνοϊός',
    'коронавирус',
    'коронавірус',
    'נגיף קורונה',
    'קורונה',
    'فيروس كورونا',
    'كورونا',
    'कोरोना',
    'कोरोनावाइरस',
    'कोविड',
    'কোভিড',
    'கொரோனா',
    'కరోనా',
    'ಕೊರೊನಾ',
    'കൊറോണ',
    'โควิด',
    '新冠病毒',
    '新冠肺炎',
    '武漢肺炎',
  ];

  const filterArray = [...coreTerms, ...variantTerms, ...vaccineTerms, ...socialTerms, ...internationalTerms];

  const filterTerms = filterArray.map((term) => term.toLowerCase());

  function runWhenIdle(callback) {
    if (typeof requestIdleCallback === 'function') {
      requestIdleCallback(callback, { timeout: 250 });
      return;
    }
    setTimeout(callback, 50);
  }

  function isExtensionAlive() {
    return typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.id;
  }

  function shouldHide(textContent) {
    if (!textContent) {
      return null;
    }
    const lower = textContent.toLowerCase();
    for (let i = 0; i < filterTerms.length; i++) {
      const term = filterTerms[i];
      if (lower.includes(term)) {
        return term;
      }
    }
    return null;
  }

  function scheduleBadgeUpdate() {
    if (badgeUpdateScheduled) {
      return;
    }
    badgeUpdateScheduled = true;
    const schedule =
      typeof requestAnimationFrame === 'function'
        ? requestAnimationFrame
        : (cb) => setTimeout(cb, 0);
    schedule(function () {
      badgeUpdateScheduled = false;
      safeSendMessage({ badgeText: count ? String(count) : '' });
    });
  }

  function markHidden(target) {
    if (!target || target.dataset.coronablockHidden === '1') {
      return;
    }
    if (target.dataset.coronablockDisplay === undefined) {
      target.dataset.coronablockDisplay = target.style.display || '';
    }
    target.style.display = 'none';
    target.dataset.coronablockHidden = '1';
    count += 1;
    scheduleBadgeUpdate();
  }

  function restoreHiddenTargets() {
    const hidden = document.querySelectorAll('[data-coronablock-hidden="1"]');
    for (let i = 0; i < hidden.length; i++) {
      const el = hidden[i];
      const original = el.getAttribute('data-coronablock-display');
      if (original === null) {
        el.style.removeProperty('display');
      } else {
        el.style.display = original;
      }
      el.removeAttribute('data-coronablock-hidden');
      el.removeAttribute('data-coronablock-display');
    }
  }

  function safeSendMessage(payload) {
    if (!chrome.runtime || !chrome.runtime.id) {
      return;
    }
    try {
      chrome.runtime.sendMessage(payload);
    } catch (e) {
      // ignore if the extension context is not available
    }
  }

  function queueTarget(target) {
    if (!target || target.dataset.coronablockHidden === '1') {
      return;
    }
    pendingTargets.add(target);
    scheduleScan();
  }

  function queueTargetsFromNode(node) {
    if (!node) {
      return;
    }

    if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      const children = node.childNodes;
      for (let i = 0; i < children.length; i++) {
        queueTargetsFromNode(children[i]);
      }
      return;
    }

    if (node.nodeType === Node.TEXT_NODE) {
      const parent = node.parentNode;
      if (parent && parent.closest) {
        const closestTarget = parent.closest(HIDE_TARGET_SELECTOR);
        if (closestTarget) {
          queueTarget(closestTarget);
        }
      }
      return;
    }

    if (node.nodeType !== Node.ELEMENT_NODE) {
      return;
    }

    const el = node;
    if (el.closest) {
      const closestTarget = el.closest(HIDE_TARGET_SELECTOR);
      if (closestTarget) {
        queueTarget(closestTarget);
        return;
      }
    }

    if (el.querySelectorAll) {
      const descendants = el.querySelectorAll(HIDE_TARGET_SELECTOR);
      for (let i = 0; i < descendants.length; i++) {
        queueTarget(descendants[i]);
      }
    }
  }

  function flushPendingTargets() {
    if (!isOn || !isExtensionAlive()) {
      return;
    }
    const targets = Array.from(pendingTargets);
    pendingTargets.clear();

    for (let i = 0; i < targets.length; i++) {
      const target = targets[i];
      if (!target || target.dataset.coronablockHidden === '1') {
        continue;
      }
      if (target.isConnected === false) {
        continue;
      }
      const matchedTerm = shouldHide(target.textContent);
      if (matchedTerm) {
        markHidden(target);
      }
    }
  }

  function scheduleScan() {
    if (scanScheduled) {
      return;
    }
    scanScheduled = true;
    runWhenIdle(function () {
      scanScheduled = false;
      flushPendingTargets();
    });
  }

  function scheduleInitialScan() {
    if (initialScanScheduled) {
      return;
    }
    initialScanScheduled = true;
    runWhenIdle(function () {
      initialScanScheduled = false;
      const root = document.body || document.documentElement;
      if (!root || !root.querySelectorAll) {
        return;
      }
      const targets = root.querySelectorAll(HIDE_TARGET_SELECTOR);
      for (let i = 0; i < targets.length; i++) {
        queueTarget(targets[i]);
      }
    });
  }

  function ensureObserver() {
    if (observer) {
      return;
    }
    const MAX_ADDED_NODES_PER_BATCH = 200;
    observer = new MutationObserver(function (mutations) {
      if (!isOn || !isExtensionAlive()) {
        return;
      }
      try {
        let addedNodes = 0;
        for (let i = 0; i < mutations.length; i++) {
          addedNodes += mutations[i].addedNodes.length;
          if (addedNodes > MAX_ADDED_NODES_PER_BATCH) {
            scheduleInitialScan();
            return;
          }
        }

        for (let i = 0; i < mutations.length; i++) {
          const mutation = mutations[i];
          for (let j = 0; j < mutation.addedNodes.length; j++) {
            queueTargetsFromNode(mutation.addedNodes[j]);
          }
        }
      } catch (e) {
        if (observer) {
          observer.disconnect();
          observer = null;
        }
      }
    });

    const root = document.documentElement || document;
    observer.observe(root, {
      childList: true,
      subtree: true,
      attributes: false,
      characterData: false,
    });
  }

  function setEnabled(nextIsOn) {
    isOn = nextIsOn !== false;
    if (!isOn) {
      if (observer) {
        observer.disconnect();
        observer = null;
      }
      pendingTargets.clear();
      restoreHiddenTargets();
      count = 0;
      scheduleBadgeUpdate();
      return;
    }

    ensureObserver();
    scheduleInitialScan();
  }

  function handleVisibilityChange() {
    if (!isOn || !isExtensionAlive()) {
      return;
    }
    if (document.hidden) {
      if (observer) {
        observer.disconnect();
        observer = null;
      }
      pendingTargets.clear();
      return;
    }
    ensureObserver();
    scheduleInitialScan();
  }

  document.addEventListener('visibilitychange', handleVisibilityChange, { passive: true });
  window.addEventListener(
    'pagehide',
    function () {
      if (observer) {
        observer.disconnect();
        observer = null;
      }
    },
    { passive: true }
  );

  chrome.storage.sync.get(['coronaOn'], function (item) {
    if (!isExtensionAlive()) {
      return;
    }
    if (item.coronaOn === undefined) {
      setEnabled(true);
      chrome.storage.sync.set({ coronaOn: true });
    } else {
      setEnabled(item.coronaOn);
    }
  });

  chrome.storage.onChanged.addListener(function (changes, area) {
    if (!isExtensionAlive()) {
      return;
    }
    if (area === 'sync' && changes.coronaOn) {
      setEnabled(changes.coronaOn.newValue);
    }
  });

  chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (!isExtensionAlive()) {
      return false;
    }
    switch (message.type) {
      case 'getCount':
        sendResponse(count);
        break;
      default:
        console.error('Unrecognised message: ', message);
    }
    return true;
  });

  document.addEventListener(
    'DOMContentLoaded',
    function () {
      if (isOn) {
        scheduleInitialScan();
      }
    },
    { once: true }
  );
})();
