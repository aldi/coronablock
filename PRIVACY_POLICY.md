# Privacy Policy — CoronaBLOCK for Facebook (Chrome Extension)

**Effective date:** January 31, 2026

CoronaBLOCK for Facebook (“CoronaBLOCK”, “we”, “our”, or “us”) is a Chrome extension that hides Facebook posts and comments that match COVID‑19 related keywords. This policy explains what information the extension accesses, how it is used, and what is (and isn’t) collected.

## Summary

- **No data collection:** CoronaBLOCK does not collect, sell, or transfer personal data to the developer.
- **Local processing:** Keyword matching happens on your device, in your browser.
- **Minimal storage:** The extension stores a single setting (`coronaOn`) using Chrome Sync to remember whether filtering is enabled.

## Information We Access

### Facebook page content (on-device only)

When you visit `facebook.com`, CoronaBLOCK reads the text content of posts and comments shown in the page **only to determine whether they match the keyword list** so it can hide matching items. This processing stays on your device.

- We do **not** transmit Facebook content to any server.
- We do **not** store Facebook content.

### Extension setting stored in Chrome Sync

CoronaBLOCK stores one preference in `chrome.storage.sync`:

- `coronaOn` (boolean): whether filtering is enabled.

Chrome Sync is provided by Google/Chrome and may sync this preference across your signed-in Chrome browsers. We only use this value to enable/disable filtering.

## Information We Do Not Collect

CoronaBLOCK does not collect or store:

- Your name, email address, or other identifiers
- Your browsing history
- Your Facebook account information (e.g., username, friends, messages)
- The text of posts/comments you view
- Analytics, telemetry, or crash reports

## Third-Party Services / External Links

CoronaBLOCK can open external pages **only when you click a link in the extension popup**:

- **“Share this on Facebook”** opens Facebook’s share dialog.
- **“Report”** opens a Google Forms page where you may choose to submit feedback.

Any information you provide on those pages is governed by the respective third party’s privacy policies (Facebook/Meta and Google).

## Permissions

CoronaBLOCK requests the following permissions:

- `https://*.facebook.com/*` (host permission): run the content script on Facebook pages only.
- `storage`: store the on/off preference (`coronaOn`).
- `tabs`: reload the active tab when you click refresh, and open the Share/Report links in a new tab.

## Data Retention

The only stored data is `coronaOn` in Chrome Sync. It remains until you change it, clear extension/site data, disable Chrome Sync, or uninstall the extension.

## Security

CoronaBLOCK does not operate any backend servers and does not send your browsing data anywhere. As with any software, no method of transmission or storage can be guaranteed 100% secure, but the extension is designed to minimize data handling.

## Children’s Privacy

CoronaBLOCK is not directed to children under 13 and does not knowingly collect personal information from children.

## Changes to This Policy

We may update this policy from time to time. The “Effective date” at the top indicates when it was last updated.

## Contact

If you have questions about this policy, contact:

- aldi (project author)  
