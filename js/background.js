var filterData = {};


(function () {

  // Setup switch states and main icon based on filter settings
  chrome.storage.sync.get(['coronaOn'], function (item) {
    coronaOn = item["coronaOn"];
    if (coronaOn == undefined) {
      coronaOn = false;
    }

    if (coronaOn) {
      chrome.browserAction.setIcon({ path: "images/icon128.png" });

    } else {
      chrome.browserAction.setIcon({ path: "images/iconoff128.png" });
    }
  });
})();

// Load Data if necessary
var xhr = new XMLHttpRequest();
xhr.onload = function () {
  console.log("Load data from file");
  var json = xhr.responseText;                         // Response
  json = json.replace(/^[^(]*\(([\S\s]+)\);?$/, '$1'); // Turn JSONP in JSON
  json = JSON.parse(json);                             // Parse JSON
  for (var key in json) {
    filterData[key] = json[key];
  }

  chrome.storage.sync.set({ 'data': filterData }, null);
};

chrome.storage.sync.get(['data'], function (item) {
  if (Object.keys(item).length == 0) {
    xhr.open('GET', '/data/data.json');
    xhr.send();
  } else {
    filterData = item['data'];
  }
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  switch (message.operation) {
    case 'passData':
      sendResponse({
        filters: filterData
      });
  }
  if (message.badgeText) {
    chrome.tabs.get(sender.tab.id, function (tab) {
      if (chrome.runtime.lastError) {
        return;
      }
      if (tab.index >= 0) { // tab is visible
        chrome.browserAction.setBadgeText({ tabId: tab.id, text: message.badgeText });
      }
    });
  }
  return true;
});