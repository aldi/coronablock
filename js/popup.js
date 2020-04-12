$(document).ready(function () {
    $('a#donation').click(donation);
    $('a#share').click(share);
    $('a#report').click(report);
});
function share() {
    chrome.tabs.create({ url: "https://www.facebook.com/sharer/sharer.php?u=https://chrome.google.com/webstore/detail/coronablock-for-facebook/mmlaobnmgfaidfhebeijbeehkdibpiae/" });
}
function donation() {
    chrome.tabs.create({ url: "https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=7TYGLYKXSR9NQ&source=url" });
}

function report() {
    chrome.tabs.create({ url: "https://forms.gle/KS9EeYtchGMhRxP67" });
}

//ΑΥΤΟ ΤΟ ΠΑΠΑΡΙ ΕΔΩ ΘΑ ΜΑΣ ΧΑΛΑΣΕΙ ΤΗ ΔΟΥΛΕΙΑ ΟΛΗ
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { type: "getCount" }, function (count) {
        if (chrome.runtime.lastError) {
            document.querySelector(".warning").style.display = "block";
            document.querySelector("body").style.opacity = "0.5";
        }
        if (count != undefined) {
            document.querySelector(".blocked").textContent = count;
            document.querySelector(".warning").style.display = "none";
        }
    });
});