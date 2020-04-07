'use strict';

let activeTabId = null;

const share = () => {
  chrome.tabs.create({
    url: 'https://www.facebook.com/sharer/sharer.php?u=https://chrome.google.com/webstore/detail/coronablock-for-facebook/mmlaobnmgfaidfhebeijbeehkdibpiae/',
  });
};

const report = () => {
  chrome.tabs.create({ url: 'https://forms.gle/XiVBz1Xw9SdrnUwy6' });
};

function updateWarning(show) {
  const warning = document.querySelector('.warning');
  if (warning) {
    warning.style.display = show ? 'block' : 'none';
  }
}

function setToggleEnabled(enabled) {
  const checkbox = document.getElementById('onoff');
  if (checkbox) {
    checkbox.disabled = !enabled;
  }
}

function setRefreshEnabled(enabled) {
  const refreshButton = document.getElementById('refresh-btn');
  if (refreshButton) {
    refreshButton.disabled = !enabled;
  }
}

function updateBlocked(count) {
  const blocked = document.querySelector('.blocked');
  if (blocked) {
    blocked.textContent = typeof count === 'number' ? count : '-';
  }
}

function enablePopup() {
  document.body.classList.remove('popup-disabled');
  updateWarning(false);
  setToggleEnabled(true);
  setRefreshEnabled(true);
}

function disablePopup() {
  document.body.classList.add('popup-disabled');
  updateWarning(true);
  setToggleEnabled(false);
  setRefreshEnabled(false);
  updateBlocked();
}

function requestCount(tabId) {
  if (typeof tabId !== 'number') {
    disablePopup();
    return;
  }
  chrome.tabs.sendMessage(tabId, { type: 'getCount' }, (count) => {
    if (chrome.runtime.lastError) {
      disablePopup();
      return;
    }
    enablePopup();
    if (count !== undefined) {
      updateBlocked(count);
    }
  });
}

function handleTabUpdated(tabId, changeInfo) {
  if (tabId !== activeTabId) {
    return;
  }
  if (changeInfo.status === 'loading') {
    window.close();
    return;
  }
  if (changeInfo.status === 'complete') {
    requestCount(tabId);
  }
}

function handleTabActivated(activeInfo) {
  activeTabId = activeInfo.tabId;
  requestCount(activeTabId);
}

function initPopup() {
  const shareLink = document.getElementById('share');
  const reportLink = document.getElementById('report');

  if (shareLink)
    shareLink.addEventListener('click', (e) => {
      e.preventDefault();
      share();
    });
  if (reportLink)
    reportLink.addEventListener('click', (e) => {
      e.preventDefault();
      report();
    });

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (!tabs || !tabs.length) {
      disablePopup();
      return;
    }
    activeTabId = tabs[0].id;
    requestCount(activeTabId);
  });

  chrome.tabs.onUpdated.addListener(handleTabUpdated);
  chrome.tabs.onActivated.addListener(handleTabActivated);
}

document.addEventListener('DOMContentLoaded', initPopup);
