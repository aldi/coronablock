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


// Transfers data to other scripts
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  switch (request.operation) {
    case 'passData':
      sendResponse({
        filters: filterData
      });
      break;
  }
  // Support asynchronous response.
  return true;
});