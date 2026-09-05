# 🗺️ 旅遊行程互動網頁 - 未來優化規格與開發指南 (Future Optimization Spec)

本規範記錄了旅遊行程規劃網頁（Travel Itinerary & Map Web App）的未來功能擴充與 UI/UX 升級藍圖。本專案維持 **純靜態網頁架構**（無需繁重的後端伺服器，可直接部署於 GitHub Pages / Netlify）。

---

## 🌟 1. UI 視覺與資訊擴充 (Visual & Info Polish)

### 1.1 分類標籤色彩化 (Category Badges)
* **目標**：提升時間軸卡片中各類別的辨識度。
* **實作設計**：
  * **美食 (food)**：琥珀色/橘色系 (`bg-amber-500/20 text-amber-300 border-amber-500/30`)
  * **景點 (spot)**：天空藍/青色系 (`bg-sky-500/20 text-sky-300 border-sky-500/30`)
  * **住宿 (hotel)**：紫色/靛色系 (`bg-purple-500/20 text-purple-300 border-purple-500/30`)
  * **交通 (transport)**：綠色/翡翠色系 (`bg-emerald-500/20 text-emerald-300 border-emerald-500/30`)
  * **購物 (shopping)**：粉紅/玫瑰色系 (`bg-rose-500/20 text-rose-300 border-rose-500/30`)

### 1.2 天氣與溫度預報小卡 (Weather & Temperature Widget)
* **目標**：提供目的地即時天氣與穿搭/晨跑參考。
* **實作設計**：
  * 於頂端 Header 資訊列加入氣象小卡。
  * 可串接免費輕量天氣 API（如 Open-Meteo，無需 API Key），根據各日停留城市的經緯度自動抓取當日預估氣溫與天氣圖示。

---

## 📱 2. 行動裝置體驗升級 (Mobile UX Enhancements)

### 2.1 地圖與時間軸雙模式切換 (Map / Timeline View Toggle)
* **目標**：解決手機直立螢幕時上下並排空間受限的問題。
* **實作設計**：
  * 在手機版（sm 螢幕以下）加入切換開關：「🗺️ 地圖模式」與「📋 清單模式」。
  * 點擊地圖模式時，Leaflet 地圖滿版顯示；點擊清單模式時，時間軸與路徑順序滿版顯示。

### 2.2 快速導航與置頂浮動按鈕 (Floating Action Button, FAB)
* **目標**：提升手機單手操作便利性。
* **實作設計**：
  * 於畫面右下角固定浮動按鈕群組：
    1. **一鍵導航**：快速開啟當日第一站或下一個行程的 Google 導航。
    2. **回到頂部**：長行程捲動時快速返回頁首。

---

## 🛠️ 3. 進階實用功能 (Advanced Utilities)

### 3.1 離線快取與 PWA 支援 (Offline Cache / PWA)
* **目標**：確保在國外無訊號、無網路或 eSIM 流量用盡時，網頁依然能完整運作。
* **實作設計**：
  * 編寫極簡的 `sw.js` (Service Worker) 與 `manifest.json`。
  * 快取所有靜態資產（`index.html`, `style.css`, `data.js`, `map.js`, Tailwind CDN, Leaflet CSS/JS 及圖標），實現完全離線瀏覽地圖與行程。

---

## 📂 4. 建議檔案擴充架構 (Future File Tree)
```
my-travel-itinerary/
├── README.md            # 專案導覽入口
├── web/
│   ├── index.html       # 網頁骨架 (含行動版模式切換按鈕)
│   ├── style.css        # 樣式定義 (含 FAB 與色彩化 Badges 樣式)
│   ├── data.js          # 行程資料庫 (可擴充 weather 欄位)
│   ├── map.js           # 地圖引擎 (含手機全螢幕切換邏輯)
│   ├── sw.js            # Service Worker (PWA 離線快取)
│   └── manifest.json    # PWA 應用程式清單
└── docs/                # GitHub Pages 同步發布目錄
