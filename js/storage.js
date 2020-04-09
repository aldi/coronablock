document.addEventListener('DOMContentLoaded', function () {
	document.getElementById("onoff").addEventListener("click", updateOptions);
	setSwitch();
});


function setSwitch() {
	if (document.selection) {
		document.selection.empty();
	} else if (window.getSelection) {
		window.getSelection().removeAllRanges();
	}

	chrome.storage.sync.get(['coronaOn'], function (item) {
		coronaOn = item.coronaOn;
		if (coronaOn == undefined) {
			coronaOn = false;
		}

		// var select = document.getElementById("myonoffswitch");
		var select = document.getElementById("onoff");
		select.checked = coronaOn;
		if (coronaOn) {
			chrome.browserAction.setIcon({ path: "images/icon128.png" });
			document.getElementById("subtext").innerHTML = "Coronavirus posts <b>won't</b> appear on your Facebook feed";
		} else {
			chrome.browserAction.setIcon({ path: "images/iconoff128.png" });
			document.getElementById("subtext").innerHTML = "Coronavirus posts <b>will</b> appear on your Facebook feed";
		}
	});
}

function updateOptions() {
	// var select = document.getElementById("myonoffswitch");
	var select = document.getElementById("onoff");
	chrome.storage.sync.set({ 'coronaOn': select.checked }, function () {
		if (select.checked) {
			chrome.browserAction.setIcon({ path: "images/icon128.png" });
			document.getElementById("subtext").innerHTML = "Coronavirus posts <b>won't</b> appear on your Facebook feed <b>*reload facebook*</b>";
			document.getElementById("subtext2").style.display = "block";
			document.getElementById("subtext3").style.display = "none";
		} else {
			chrome.browserAction.setIcon({ path: "images/iconoff128.png" });
			document.getElementById("subtext").innerHTML = "Coronavirus posts <b>will</b> appear on your Facebook feed <b>*reload facebook*</b>";
			document.getElementById("subtext2").style.display = "none";
			document.getElementById("subtext3").style.display = "block";
		}
	});
}


