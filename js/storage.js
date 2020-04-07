"use strict";

let coronaOn = true;
let toggleEl = null;
let refreshButtonEl = null;
let subtextVerbEl = null;
let reloadOnEl = null;
let reloadOffEl = null;

document.addEventListener('DOMContentLoaded', function () {
  toggleEl = document.getElementById('onoff');
  refreshButtonEl = document.getElementById('refresh-btn');
  subtextVerbEl = document.getElementById('subtext-verb');
  reloadOnEl = document.getElementById('subtext2');
  reloadOffEl = document.getElementById('subtext3');

  if (toggleEl) toggleEl.addEventListener('change', updateOptions);
  if (refreshButtonEl) {
    refreshButtonEl.addEventListener('click', refreshActiveTab);
    refreshButtonEl.style.display = 'none';
  }
  setSwitch();
});

function setVisible(el, visible) {
  if (!el) return;
  el.style.display = visible ? 'block' : 'none';
}

function setSubtextEnabled(enabled) {
  if (subtextVerbEl) {
    subtextVerbEl.textContent = enabled ? "won't" : 'will';
  }
}

function setSwitch() {
  chrome.storage.sync.get(['coronaOn'], function (item) {
    coronaOn = item.coronaOn;
    if (coronaOn === undefined) {
      coronaOn = true; // default to on
      chrome.storage.sync.set({ coronaOn: true });
    }

    if (toggleEl) {
      toggleEl.checked = coronaOn;
    }
    if (refreshButtonEl) {
      refreshButtonEl.style.display = 'none';
    }
    setSubtextEnabled(coronaOn);
  });
}

function updateOptions() {
  if (!toggleEl) {
    return;
  }
  const enabled = toggleEl.checked;
  chrome.storage.sync.set({ coronaOn: enabled }, function () {
    setSubtextEnabled(enabled);
    setVisible(reloadOnEl, enabled);
    setVisible(reloadOffEl, !enabled);
    setVisible(refreshButtonEl, true);
  });
}

function refreshActiveTab() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (tabs && tabs[0]) {
      chrome.tabs.reload(tabs[0].id);
      window.close();
    }
  });
}
