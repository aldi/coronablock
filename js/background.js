const onIconPaths = {
  16: chrome.runtime.getURL('images/icon16.png'),
  48: chrome.runtime.getURL('images/icon48.png'),
  128: chrome.runtime.getURL('images/icon128.png'),
};
const offIconPaths = {
  16: chrome.runtime.getURL('images/iconoff128.png'),
  48: chrome.runtime.getURL('images/iconoff128.png'),
  128: chrome.runtime.getURL('images/iconoff128.png'),
};

function setActionIcon(isOn) {
  chrome.action.setIcon({ path: isOn ? onIconPaths : offIconPaths });
}

// Setup switch states and main icon based on filter settings
chrome.storage.sync.get(['coronaOn'], function (item) {
  let coronaOn = item.coronaOn;
  if (coronaOn === undefined) {
    coronaOn = true; // enable filtering by default
    chrome.storage.sync.set({ coronaOn: true });
  }

  setActionIcon(coronaOn);
});

chrome.storage.onChanged.addListener(function (changes, area) {
  if (area !== 'sync' || !changes.coronaOn) {
    return;
  }
  setActionIcon(changes.coronaOn.newValue !== false);
});

chrome.runtime.onMessage.addListener(function (message, sender) {
  if (message && Object.prototype.hasOwnProperty.call(message, 'badgeText')) {
    const tabId = sender && sender.tab && sender.tab.id;
    if (typeof tabId === 'number') {
      chrome.action.setBadgeText({ tabId: tabId, text: String(message.badgeText || '') });
    }
  }
});
