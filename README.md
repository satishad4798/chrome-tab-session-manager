# Tab Management Chrome Extension

An enhanced, production-ready session and tab manager extension for Google Chrome, built on top of [Tablerone](https://tabler.one/) with critical workflow enhancements: **persistent Chrome Tab Groups**, **instant real-time auto-saving**, and **zero-data-loss delta protection on browser close**.

---

## 🌟 Highlights & Added Features

This repository builds upon the foundational architecture of the popular [Tablerone](https://tabler.one/) Chrome extension and addresses its core limitations:

### 1. 🏷️ Full Chrome Tab Groups Persistence & Restoration
- **The Problem:** In standard Tablerone, Chrome Tab Groups were completely ignored. When a session with tab groups was saved and reopened, all tabs opened as normal flat tabs, losing organization, names, and color tags.
- **The Solution:** 
  - Tabs in Chrome Tab Groups are now tagged with their group metadata (`groupName`, `groupTitle`, `groupColor`, and `groupCollapsed`).
  - Upon saving (or auto-saving), group metadata is preserved in IndexedDB.
  - Upon session reopening (in a new or existing window), the extension automatically calls Chrome's Tab Groups API (`chrome.tabs.group` and `chrome.tabGroups.update`) to recreate each tab group with its original name, color, and state.

### 2. ⚡ Continuous Real-Time Auto-Save on Change
- **The Problem:** Adding, closing, or reorganizing tabs in an active session did not save changes unless explicitly clicking "Save", causing newly added tabs to disappear.
- **The Solution:**
  - An instant auto-save listener triggers on `chrome.tabs.onCreated`, `onUpdated`, `onRemoved`, `onMoved`, `onAttached`, `onDetached`, and `chrome.tabGroups.*`.
  - Changes are written to IndexedDB within 50ms – 100ms.
  - Both the active opened session and the persistent saved session stay synchronized in real time.
  - The dashboard (`tab.html`) receives `clusters.db.updated` and refreshes instantly.

### 3. 🛡️ Delta Protection on Browser Close (Zero Data Loss)
- **The Problem:** Closing Chrome (`Cmd + Q` or window close) before manual saving resulted in all delta changes (newly opened tabs, closed tabs) being lost.
- **The Solution:**
  - Detects `removeInfo.isWindowClosing`: when a window closes, tabs are preserved rather than cleared.
  - Registers `chrome.runtime.onSuspend` to immediately flush in-flight saves before Chrome shuts down.
  - Because state updates within 100ms of any tab action, sessions are already persisted to disk before the browser exits.

### 4. 🧹 Session Deduplication
- Automatically detects and removes duplicate saved sessions in IndexedDB, keeping the newest and most complete version so your session timeline remains clean.

### 5. 🛠️ Unpacked Chrome Extension Ready
- Cleaned of proprietary store metadata (`_metadata/`) and `update_url` which block local developer loading in Chrome.
- Manifest updated with the official `tabGroups` permission.

---

## 🚀 How to Install and Use

### Step 1: Clone the Repository
```bash
git clone https://github.com/satishad4798/tab-management-chrome-extension.git
cd tab-management-chrome-extension
```

### Step 2: Load into Google Chrome
1. Open Google Chrome and navigate to:
   ```
   chrome://extensions/
   ```
2. Enable **Developer mode** using the toggle switch in the top-right corner.
3. Click the **Load unpacked** button in the top-left corner.
4. Select the `andpjllgocabfacjlelkfpdemfklpfpo` folder (or the `extension` symlink folder) inside this repository.
5. The extension will appear in your Chrome toolbar.

### Step 3: Pin the Extension & Open Dashboard
- Pin the extension icon to your toolbar.
- Click the icon or open a new tab to access the dashboard.
- You can create, name, organize, and reopen your tab sessions.

---

## 🧪 Testing the New Features

1. **Tab Groups:**
   - Open a few tabs and create 1 or 2 Chrome Tab Groups (e.g., name one `"Trading"` in green, and another `"Research"` in blue).
   - Click **Save & close** on that session in Tablerone.
   - Click to **Reopen** the session: observe that the tabs are restored and organized into their colored, named Chrome Tab Groups.

2. **Auto-Save on Change:**
   - With an active session open, open 2 new tabs and close 1 tab.
   - Open your Tablerone tab: the session list reflects the new tabs and updated count immediately.

3. **Close Chrome Without Saving:**
   - Open new tabs in an active session.
   - Quit Chrome completely (`Cmd + Q` on macOS or close all windows).
   - Relaunch Chrome and open Tablerone: verify all your added tabs are still saved in the session.

---

## 📁 Repository Structure

```
tab-management-chrome-extension/
├── andpjllgocabfacjlelkfpdemfklpfpo/   # The enhanced Chrome Extension (Manifest V3)
│   ├── manifest.json                  # Extension manifest (with tabGroups permission)
│   ├── service-worker.mjs             # Service worker with tab group & auto-save engine
│   ├── tab/                           # Dashboard UI (Vue.js application)
│   ├── popup/                         # Browser action popup
│   ├── styles/                        # Dashboard stylesheets
│   ├── icons/                         # Extension icons
│   └── _locales/                      # Internationalization files
├── extension                          # Symlink to andpjllgocabfacjlelkfpdemfklpfpo
├── .gitignore                         # Git ignore configuration
└── README.md                          # Documentation and usage guide
```

---

## 📄 License & Attribution

This project is an enhancement of the open-source client codebase of [Tablerone](https://tabler.one/). All original Tablerone assets and code remain under their respective licenses.
