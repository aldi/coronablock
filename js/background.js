var filterData = {};

(function () {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);


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

// Setup Google Analytics
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-82075252-1']);
_gaq.push(['_trackPageview']);
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  _gaq.push(['_trackEvent', request.action, 'removed']);
});

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

// chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//   // tabs is a single-element array after this filtering
//   chrome.runtime.sendMessage({ type: "getCount", id: tabs[0].id }, function (count) {
//     console.log("Count is: " + count);
//   });
// });
