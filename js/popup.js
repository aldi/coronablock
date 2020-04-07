$(document).ready(function () {
    $('a#donation').click(donation);
    $('a#share').click(share);
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { type: "getCount" }, function (count) {
            document.querySelector(".blocked").textContent = count;
        });
    });
});
function share() {
    chrome.tabs.create({ url: "https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fchrome.google.com%2Fwebstore%2Fdetail%2Fremove-all-politics-from%2Fgbbfjddgaoffjkpjgbpnfkmmepgpmdcl%3Fhl%3Den&amp;src=sdkpreparse" });
}
function donation() {
    chrome.tabs.create({ url: "https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=7TYGLYKXSR9NQ&source=url" });
}