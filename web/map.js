/**
 * Travel Itinerary Map & UI Engine
 * Dynamically renders timeline components and Leaflet map instances based on data.js
 */

const darkTileUrl = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
const tileOptions = {
    attribution: '&copy; <a href="https://carto.com/">CARTO</a> | &copy; OpenStreetMap',
    subdomains: 'abcd',
    maxZoom: 19
};

// Store map instances & bounds
const mapInstances = {};
const boundsMap = {};
let overviewMap = null;
let overviewBounds = null;

// Custom Glowing Pin Generator
function createMarkerIcon(num, color) {
    return L.divIcon({
        className: 'custom-pin-container',
        html: `
            <div class="custom-pin" style="background-color: ${color}; color: #0f172a; width: 26px; height: 26px; border: 2px solid #ffffff; box-shadow: 0 0 10px ${color}88;">
                ${num}
            </div>
        `,
        iconSize: [26, 26],
        iconAnchor: [13, 13],
        popupAnchor: [0, -14]
    });
}

// Focus and fly to marker
function focusLocation(mapId, lat, lng) {
    const map = mapInstances[mapId];
    if (!map) return;
    map.flyTo([lat, lng], 15, { duration: 1.0 });
    map.eachLayer(layer => {
        if (layer.getPopup && layer.getLatLng) {
            const p = layer.getLatLng();
            if (Math.abs(p.lat - lat) < 0.0005 && Math.abs(p.lng - lng) < 0.0005) {
                layer.openPopup();
            }
        }
    });
}

// Reset bounds helper
function resetMapView(map, bounds) {
    if (map && bounds) {
        map.fitBounds(bounds, { animate: true });
    }
}

// Tab Switcher
function switchTab(targetId) {
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.add('hidden'));
    const targetPanel = document.getElementById(`panel-${targetId}`);
    if (targetPanel) targetPanel.classList.remove('hidden');

    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('bg-sky-600', 'text-white', 'border-sky-500');
        btn.classList.add('bg-slate-900', 'text-slate-300', 'border-slate-800');
    });

    const activeBtn = document.querySelector(`[data-target="${targetId}"]`);
    if (activeBtn) {
        activeBtn.classList.remove('bg-slate-900', 'text-slate-300', 'border-slate-800');
        activeBtn.classList.add('bg-sky-600', 'text-white', 'border-sky-500');
    }

    // Panoramic view fit on tab change
    setTimeout(() => {
        if (targetId === 'overview' && overviewMap && overviewBounds) {
            overviewMap.invalidateSize();
            overviewMap.fitBounds(overviewBounds, { animate: false });
        } else if (mapInstances[targetId] && boundsMap[targetId]) {
            const m = mapInstances[targetId];
            m.invalidateSize();
            m.fitBounds(boundsMap[targetId], { animate: false });
        }
    }, 120);

    if (window.lucide) lucide.createIcons();
}

// Initialize Application
window.addEventListener('DOMContentLoaded', () => {
    // 1. Populate Header & Metadata
    document.getElementById('trip-title').innerText = tripData.config.title;
    document.getElementById('trip-subtitle').innerText = tripData.config.subtitle;
    document.getElementById('trip-dates').innerText = tripData.config.dates;
    document.getElementById('trip-travelers').innerText = tripData.config.travelers;

    // 2. Render Nav Tabs
    const navTabsContainer = document.getElementById('nav-tabs');
    const panelsContainer = document.getElementById('panels-container');

    // Add Overview Tab Button
    const overviewBtn = document.createElement('button');
    overviewBtn.className = 'tab-btn px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 border bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800';
    overviewBtn.setAttribute('data-target', 'overview');
    overviewBtn.innerHTML = `<i data-lucide="map" class="w-4 h-4 text-sky-400"></i> 全島總覽`;
    overviewBtn.onclick = () => switchTab('overview');
    navTabsContainer.appendChild(overviewBtn);

    // Add Daily Tab Buttons
    tripData.days.forEach((day, idx) => {
        const btn = document.createElement('button');
        const isActive = idx === 0;
        btn.className = `tab-btn px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 border ${
            isActive ? 'bg-sky-600 text-white border-sky-500' : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
        }`;
        btn.setAttribute('data-target', day.id);
        btn.innerHTML = `<span class="w-2 h-2 rounded-full inline-block" style="background-color: ${day.color}"></span> Day ${day.dayNum}`;
        btn.onclick = () => switchTab(day.id);
        navTabsContainer.appendChild(btn);
    });

    // Add Checklist Tab Button
    const checklistBtn = document.createElement('button');
    checklistBtn.className = 'tab-btn px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 border bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800 text-amber-400';
    checklistBtn.setAttribute('data-target', 'checklist');
    checklistBtn.innerHTML = `<i data-lucide="check-square" class="w-4 h-4"></i> 行前備忘`;
    checklistBtn.onclick = () => switchTab('checklist');
    navTabsContainer.appendChild(checklistBtn);

    // 3. Render Daily Tab Panels
    tripData.days.forEach((day, idx) => {
        const isDefault = idx === 0;
        const panel = document.createElement('div');
        panel.id = `panel-${day.id}`;
        panel.className = `tab-panel space-y-6 ${isDefault ? '' : 'hidden'}`;

        panel.innerHTML = `
            <div class="bg-slate-900/80 backdrop-blur rounded-2xl p-4 sm:p-6 border border-slate-800 shadow-xl">
                <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
                    <div>
                        <span class="px-2.5 py-1 rounded-full text-xs font-black tracking-wider uppercase" style="background-color: ${day.color}22; color: ${day.color};">
                            Day ${day.dayNum} · ${day.date}
                        </span>
                        <h2 class="text-xl sm:text-2xl font-black text-white mt-1.5">${day.title}</h2>
                    </div>
                    <div class="flex items-center gap-3">
                        <button onclick="resetMapView(mapInstances['${day.id}'], boundsMap['${day.id}'])" class="bg-slate-800 hover:bg-sky-700 text-sky-300 hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 border border-slate-700 shadow">
                            <i data-lucide="maximize-2" class="w-3.5 h-3.5"></i> 重設全景視野
                        </button>
                    </div>
                </div>

                <!-- Route Flow Bar -->
                <div class="mt-5 mb-5 bg-slate-950/80 p-3.5 sm:p-4 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs md:text-sm">
                    <div class="flex flex-wrap items-center gap-1.5 sm:gap-2">
                        <span class="text-slate-400 font-bold flex items-center gap-1">
                            <i data-lucide="milestone" class="w-4 h-4 text-sky-400"></i> 路徑順序：
                        </span>
                        ${day.stops.map((s, sIdx) => `
                            <button onclick="focusLocation('${day.id}', ${s.lat}, ${s.lng})" class="bg-slate-800 hover:bg-sky-700 text-sky-300 hover:text-white px-2.5 py-1.5 rounded-lg transition text-xs flex items-center gap-1 font-medium">
                                ${s.shortName || s.name}
                            </button>
                            ${sIdx < day.stops.length - 1 ? '<span class="text-slate-600 text-xs">➔</span>' : ''}
                        `).join('')}
                    </div>
                    ${day.googleMapsUrl ? `
                        <a href="${day.googleMapsUrl}" target="_blank" class="bg-sky-600 hover:bg-sky-500 text-white font-bold px-3.5 py-1.5 rounded-xl transition flex items-center gap-1.5 shadow text-xs shrink-0">
                            <i data-lucide="navigation" class="w-3.5 h-3.5"></i> 開啟 Google 完整導航
                        </a>
                    ` : ''}
                </div>

                <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
                    <!-- Timeline (Left) -->
                    <div class="lg:col-span-6 space-y-4 max-h-[620px] overflow-y-auto pr-1">
                        ${day.stops.map(stop => `
                            <div onclick="focusLocation('${day.id}', ${stop.lat}, ${stop.lng})" class="cursor-pointer bg-slate-950/70 hover:bg-slate-800/80 border border-slate-800/80 hover:border-sky-500/50 rounded-xl p-4 transition-all duration-200">
                                <div class="flex items-center justify-between gap-2 mb-1.5">
                                    <div class="flex items-center gap-2">
                                        <span class="w-6 h-6 rounded-full flex items-center justify-center font-black text-xs text-slate-950" style="background-color: ${day.color}">
                                            ${stop.id}
                                        </span>
                                        <span class="text-xs font-mono text-slate-400 font-bold">${stop.time}</span>
                                        <span class="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-medium">${stop.categoryLabel || stop.category}</span>
                                    </div>
                                    <span class="text-xs text-slate-400">停留 ${stop.stay}</span>
                                </div>
                                <h3 class="text-base font-bold text-white mb-1">${stop.name}</h3>
                                <p class="text-xs text-slate-300 mb-2.5 leading-relaxed">${stop.desc}</p>
                                <div class="flex items-center justify-between pt-2 border-t border-slate-800/60 text-xs">
                                    <span class="text-amber-400 flex items-center gap-1">
                                        <i data-lucide="info" class="w-3 h-3"></i> ${stop.tips}
                                    </span>
                                    ${stop.mapsUrl ? `<a href="${stop.mapsUrl}" target="_blank" onclick="event.stopPropagation()" class="text-sky-400 hover:text-sky-300 flex items-center gap-1 font-bold">導航 <i data-lucide="external-link" class="w-3 h-3"></i></a>` : ''}
                                </div>
                            </div>
                        `).join('')}
                    </div>

                    <!-- Map Container (Right) -->
                    <div class="lg:col-span-6">
                        <div id="map-${day.id}" class="w-full h-[380px] lg:h-[620px] rounded-xl overflow-hidden border border-slate-800 shadow-inner"></div>
                    </div>
                </div>
            </div>
        `;
        panelsContainer.appendChild(panel);

        // Initialize Leaflet for this day
        const map = L.map(`map-${day.id}`, { zoomControl: true, scrollWheelZoom: false });
        L.tileLayer(darkTileUrl, tileOptions).addTo(map);

        const latLngs = [];
        day.stops.forEach(s => {
            const pos = [s.lat, s.lng];
            latLngs.push(pos);
            const marker = L.marker(pos, { icon: createMarkerIcon(s.id, day.color) }).addTo(map);
            marker.bindPopup(`
                <div class="text-xs">
                    <strong class="text-sm font-bold text-white block mb-1">${s.name}</strong>
                    <span class="text-slate-300">${s.desc}</span>
                </div>
            `);
        });

        // Draw Route Polyline
        const polyline = L.polyline(latLngs, {
            color: day.color,
            weight: 4,
            opacity: 0.85,
            dashArray: '8, 8',
            lineJoin: 'round'
        }).addTo(map);

        const bounds = polyline.getBounds().pad(0.15);
        map.fitBounds(bounds);

        mapInstances[day.id] = map;
        boundsMap[day.id] = bounds;
    });

    // 4. Render Overview Map Panel
    const overviewPanel = document.createElement('div');
    overviewPanel.id = 'panel-overview';
    overviewPanel.className = 'tab-panel space-y-6 hidden';
    overviewPanel.innerHTML = `
        <div class="bg-slate-900/80 backdrop-blur rounded-2xl p-4 sm:p-6 border border-slate-800 shadow-xl">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-4 mb-4">
                <div>
                    <span class="px-2.5 py-1 rounded-full text-xs font-black tracking-wider uppercase bg-sky-500/20 text-sky-400">
                        Overview Map
                    </span>
                    <h2 class="text-xl sm:text-2xl font-black text-white mt-1.5">全島行程路徑總覽</h2>
                </div>
                <div class="flex flex-wrap items-center gap-4">
                    <div class="text-xs text-slate-400 flex items-center gap-3">
                        ${tripData.days.map(d => `
                            <span class="flex items-center gap-1.5">
                                <span class="w-3 h-3 rounded-full inline-block" style="background-color: ${d.color}"></span> Day ${d.dayNum}
                            </span>
                        `).join('')}
                    </div>
                    <button onclick="resetMapView(overviewMap, overviewBounds)" class="bg-slate-800 hover:bg-sky-700 text-sky-300 hover:text-white px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 border border-slate-700 shadow">
                        <i data-lucide="maximize-2" class="w-3.5 h-3.5"></i> 重設全景視野
                    </button>
                </div>
            </div>
            <div id="map-overview" class="w-full h-[620px] rounded-xl overflow-hidden border border-slate-800 shadow-inner"></div>
        </div>
    `;
    panelsContainer.appendChild(overviewPanel);

    // Setup Overview Leaflet Map
    overviewMap = L.map('map-overview', { zoomControl: true, scrollWheelZoom: false });
    L.tileLayer(darkTileUrl, tileOptions).addTo(overviewMap);

    const allPoints = [];
    tripData.days.forEach(d => {
        const latLngs = [];
        d.stops.forEach(s => {
            const pos = [s.lat, s.lng];
            latLngs.push(pos);
            allPoints.push(pos);
            const marker = L.marker(pos, { icon: createMarkerIcon(s.id, d.color) }).addTo(overviewMap);
            marker.bindPopup(`
                <div class="text-xs">
                    <span class="text-[10px] uppercase font-bold text-sky-400 block mb-0.5">Day ${d.dayNum}</span>
                    <strong class="text-sm font-bold text-white block mb-1">${s.name}</strong>
                    <span class="text-slate-300">${s.desc}</span>
                </div>
            `);
        });
        L.polyline(latLngs, { color: d.color, weight: 3, opacity: 0.65, dashArray: '6, 6' }).addTo(overviewMap);
    });

    if (allPoints.length > 0) {
        overviewBounds = L.latLngBounds(allPoints).pad(0.12);
        overviewMap.fitBounds(overviewBounds);
    }

    // 5. Render Checklist Panel
    const checklistPanel = document.createElement('div');
    checklistPanel.id = 'panel-checklist';
    checklistPanel.className = 'tab-panel space-y-6 hidden';
    checklistPanel.innerHTML = `
        <div class="bg-slate-900/80 backdrop-blur rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
                <div>
                    <span class="px-2.5 py-1 rounded-full text-xs font-black tracking-wider uppercase bg-amber-500/20 text-amber-400">
                        Preparation & Gear
                    </span>
                    <h2 class="text-2xl font-black text-white mt-1.5">行前準備與隨身裝備清單</h2>
                </div>
                <button onclick="resetAllChecklist()" class="bg-slate-800 hover:bg-slate-700 text-amber-300 hover:text-white px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 border border-slate-700 shadow">
                    <i data-lucide="rotate-ccw" class="w-3.5 h-3.5"></i> 重設所有勾選
                </button>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                ${tripData.checklist.map((group, gIdx) => `
                    <div class="bg-slate-950/70 border border-slate-800/80 rounded-xl p-5">
                        <h3 class="text-base font-bold text-white mb-3 flex items-center gap-2">
                            <i data-lucide="check-circle" class="w-4 h-4 text-emerald-400"></i> ${group.category}
                        </h3>
                        <ul class="space-y-2.5 text-xs sm:text-sm text-slate-300">
                            ${group.items.map((item, iIdx) => {
                                const checkId = `chk-${gIdx}-${iIdx}`;
                                const isChecked = localStorage.getItem(checkId) === 'true';
                                return `
                                    <li class="flex items-start gap-3">
                                        <input type="checkbox" id="${checkId}" ${isChecked ? 'checked' : ''} onchange="toggleCheck('${checkId}')" class="mt-0.5 w-4 h-4 rounded bg-slate-900 border-slate-700 text-sky-500 focus:ring-sky-500 focus:ring-offset-slate-900 cursor-pointer accent-sky-500">
                                        <label for="${checkId}" class="cursor-pointer select-none leading-relaxed ${isChecked ? 'line-through text-slate-500' : 'text-slate-300'} transition-colors" id="lbl-${checkId}">
                                            ${item}
                                        </label>
                                    </li>
                                `;
                            }).join('')}
                        </ul>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    panelsContainer.appendChild(checklistPanel);

    // Checklist interactive helpers
    window.toggleCheck = function(id) {
        const checkbox = document.getElementById(id);
        const label = document.getElementById(`lbl-${id}`);
        if (checkbox && label) {
            if (checkbox.checked) {
                localStorage.setItem(id, 'true');
                label.classList.add('line-through', 'text-slate-500');
                label.classList.remove('text-slate-300');
            } else {
                localStorage.setItem(id, 'false');
                label.classList.remove('line-through', 'text-slate-500');
                label.classList.add('text-slate-300');
            }
        }
    };

    window.resetAllChecklist = function() {
        const checkboxes = document.querySelectorAll('#panel-checklist input[type="checkbox"]');
        checkboxes.forEach(chk => {
            chk.checked = false;
            localStorage.setItem(chk.id, 'false');
            const label = document.getElementById(`lbl-${chk.id}`);
            if (label) {
                label.classList.remove('line-through', 'text-slate-500');
                label.classList.add('text-slate-300');
            }
        });
    };

    // Initial icon render
    if (window.lucide) lucide.createIcons();

    // Ensure Day 1 fits bounds properly on start
    setTimeout(() => {
        const firstDayId = tripData.days[0].id;
        if (mapInstances[firstDayId] && boundsMap[firstDayId]) {
            mapInstances[firstDayId].invalidateSize();
            mapInstances[firstDayId].fitBounds(boundsMap[firstDayId], { animate: false });
        }
    }, 150);
});
