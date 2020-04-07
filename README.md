<p align="center">
  <img width="120" src="https://aldi.st/static/images/projects/coronablock/icon.webp" alt="CoronaBLOCK Logo">
</p>

<h1 align="center">CoronaBLOCK for Facebook</h1>

<p align="center">
  <strong>Reclaim your feed. Reduce COVID-19 doomscrolling.</strong><br />
  A lightweight Chrome extension that hides Facebook posts/comments matching COVID-19 keywords.
</p>

<p align="center">
  <a href="https://www.producthunt.com/posts/coronablock-for-facebook"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=192265&theme=light" alt="Product Hunt" style="height: 25px;"></a>
</p>

---

## Overview

**CoronaBLOCK** gives you control over your Facebook feed by automatically hiding posts and comments that contain COVID-19 related keywords.

It runs entirely on your machine (no servers, no analytics), and works by scanning the page as you scroll.

## Key Features

* **Real-time filtering:** Watches the feed and hides matching items as they appear.
* **Toggle on/off:** Enable or disable from the extension popup.
* **Counter + badge:** See how many items were hidden (popup + extension badge).
* **Privacy-first:** Keyword matching happens locally; nothing is sent anywhere.

---

## Installation

### Chrome Web Store

Install from the Chrome Web Store:

* Chrome Web Store listing: <https://chrome.google.com/webstore/detail/coronablock-for-facebook/mmlaobnmgfaidfhebeijbeehkdibpiae/>

### Developer Mode

1. **Download:** Clone `https://github.com/aldi/coronablock` (or download as ZIP and extract).
2. **Open Extensions:** Go to `chrome://extensions/`.
3. **Enable:** Turn on **Developer mode** (top right).
4. **Load:** Click **Load unpacked** and select this project folder.

---

## Usage

1. Open Facebook in Chrome.
2. Click the CoronaBLOCK icon to toggle filtering.
3. Reload the Facebook tab when prompted.

Tip: The extension badge and popup show how many items were hidden on the current tab.

---

## Customize Keywords (Optional)

The keyword list lives in `js/filters.js`. To customize it:

1. Edit the term arrays (for example `coreTerms`, `variantTerms`, etc.).
2. Go to `chrome://extensions/` and click **Reload** on CoronaBLOCK.
3. Reload Facebook.

---

## Screenshots

<p align="center">
  <a href="https://aldi.st/static/images/projects/coronablock/screenshot-1.webp">
    <img src="https://aldi.st/static/images/projects/coronablock/screenshot-1.webp" width="900" alt="CoronaBLOCK screenshot 1">
  </a>
  <br />
  <br />
  <a href="https://aldi.st/static/images/projects/coronablock/screenshot-2.webp">
    <img src="https://aldi.st/static/images/projects/coronablock/screenshot-2.webp" width="900" alt="CoronaBLOCK screenshot 2">
  </a>
  <br />
  <br />
  <a href="https://aldi.st/static/images/projects/coronablock/screenshot-3.webp">
    <img src="https://aldi.st/static/images/projects/coronablock/screenshot-3.webp" width="900" alt="CoronaBLOCK screenshot 3">
  </a>
</p>

## FAQ

**Where can I report a missed post or a bug?** We use a dedicated form to improve our keyword list. You can report issues [here](https://forms.gle/XiVBz1Xw9SdrnUwy6).

**Does it work on other platforms (Twitter, Instagram)?** Currently, CoronaBLOCK is specifically optimized for the Facebook DOM structure.

**Why did a post disappear while I was reading?** This can happen when new comments load (e.g. after clicking “View more comments”) and a matching keyword appears in the post thread.

---

## Privacy & Security

* **No Data Collection:** We do not track your browsing history or Facebook activity.
* **Runs Locally:** The content script matches keywords in-page; no data is sent to external servers.
* **Privacy Policy:** See `PRIVACY_POLICY.md`.

### Permissions (Why They’re Needed)

* `https://*.facebook.com/*` — only runs on Facebook.
* `storage` — saves the on/off toggle state.
* `tabs` — used by the popup to reload the current tab and open share/report links.

---

## Disclaimer

CoronaBLOCK is not affiliated with Facebook/Meta.

---

<p align="center">
  Made with ❤️ for a calmer internet.
</p>
