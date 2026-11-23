// JS/shared.js - Zentrale Konfiguration für Navigation, Kontext-Tools & Footer

const SITE_CONFIG = {
    // 1. Hauptseiten (erscheinen im Menü & im Footer)
    pages: [
        { id: 'dashboard', label: 'Startseite', href: 'index.html', icon: 'layout-dashboard' },
        { id: 'vorrunde',  label: 'Vorrunde', href: 'Vorrunde2027.html', icon: 'list-ordered' },
       // { id: 'hauptrunde', label: 'Hauptrunde', href: 'Hauptrunde2027.html', icon: 'trophy' },
		{ id: 'gegner', label: 'Gegner-Analyse', href: 'Gegner.html', icon: 'bar-chart' }
    ],

    // 2. Externe Links (erscheinen im Menü & im Footer)
    externalLinks: [
        { label: 'QuizNations Tabelle', href: 'https://results.quiznations.com/gerix', icon: 'podium' },
        { label: 'Dateiablage', href: 'https://drive.google.com/drive/folders/1G6lD1a31IvCIhSxtoDvyEQSxyDYKhWyU?usp=drive_link', icon: 'folder-open' },
		//{ label: 'Termine', href: 'https://docs.google.com/spreadsheets/d/10579llo24tiTx4tbRTlYVezNB5G735TMe5cULdpR9VM/edit?gid=1937655390#gid=1937655390', icon: 'calendar-1' },
		{ label: 'Termine', href: 'https://www.quizverein.de/termine-2027', icon: 'calendar-1' },
        { label: 'Vorbesprechung in Zoom starten', href: 'https://us05web.zoom.us/j/5511865993?pwd=SGV3WTJENFIrdk8zSi8wRjExVkFXUT09', icon: 'video' }		
        // Hier weitere externe Links ergänzen (z. B. QuizNations, Dateiablage)
    ],

    // 3. Mittlerer Bereich im Menü: Seitenspezifische Aktionen / Tools
    // Ruft bestehende JS-Funktionen der jeweiligen Seite auf
    contextualTools: {
        'index.html': [
            { label: 'Daten neu laden', onclick: 'loadDashboardData(true)', icon: 'refresh-cw' }
        ],
        'Vorrunde2027.html': [
            { label: 'Teams verwalten', onclick: 'openTeamManager(); toggleMenu()', icon: 'users' },
            { label: 'Exportieren', onclick: 'exportState(); toggleMenu()', icon: 'upload' },
            { label: 'Importieren', onclick: 'importStatePrompt(); toggleMenu()', icon: 'download' },
            { label: 'Zurücksetzen', onclick: 'resetTournament(); toggleMenu()', icon: 'rotate-ccw', danger: true }
        ],
        'Hauptrunde2027.html': [
        //    { label: 'Exportieren', onclick: 'exportData(); toggleMenu()', icon: 'upload' },
        //   { label: 'Importieren', onclick: 'importData(data); toggleMenu()', icon: 'download' },
            { label: 'Zurücksetzen', onclick: 'applyPreset(\'reset\'); toggleMenu()', icon: 'rotate-ccw', danger: true }
        ],
        'Gegner.html': [
            { label: 'Exportieren', onclick: 'exportData(); toggleMenu()', icon: 'upload' },
            { label: 'Importieren', onclick: 'importDataPrompt(); toggleMenu()', icon: 'download' },
            { label: 'Beispieldaten', onclick: 'loadDemoData(); toggleMenu()', icon: 'users', danger: false }
        ]		
    }
};

// Ermittelt den aktuellen Dateinamen (Fallback auf 'index.html' bei Root-Aufruf '/')
function getCurrentPageFile() {
    const path = window.location.pathname;
    const file = path.substring(path.lastIndexOf('/') + 1);
    return file === '' ? 'index.html' : file;
}

// Globale Steuerung für das Hamburger-Menü (Drawer)
window.toggleMenu = function() {
    const drawer = document.getElementById('mobile-drawer');
    const backdrop = document.getElementById('mobile-backdrop');
    if (!drawer || !backdrop) return;

    const isClosed = drawer.classList.contains('translate-x-full');
    if (isClosed) {
        backdrop.classList.remove('hidden');
        requestAnimationFrame(() => {
            backdrop.classList.remove('opacity-0');
            drawer.classList.remove('translate-x-full');
        });
    } else {
        backdrop.classList.add('opacity-0');
        drawer.classList.add('translate-x-full');
        setTimeout(() => backdrop.classList.add('hidden'), 200);
    }
};

function injectSharedComponents() {
    const currentFile = getCurrentPageFile();

    // --- A. HAMBURGER-MENÜ (DRAWER) RENDERN ---
    const navPlaceholder = document.getElementById('site-drawer');
    if (navPlaceholder) {
        // 1. Hauptseiten-Links (aktuelle Seite hervorheben)
        const pagesHtml = SITE_CONFIG.pages.map(page => {
            const isActive = currentFile.toLowerCase() === page.href.toLowerCase();
            const activeClasses = isActive
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60';
            return `
                <a href="${page.href}" class="flex items-center justify-between px-3 py-2.5 rounded-lg text-xs transition ${activeClasses}">
                    <span class="flex items-center gap-2.5">
                        <i data-lucide="${page.icon}" class="w-4 h-4 ${isActive ? 'text-sky-500' : 'text-slate-400'}"></i>
                        ${page.label}
                    </span>
                    ${isActive ? '<span class="w-1.5 h-1.5 rounded-full bg-sky-500"></span>' : ''}
                </a>`;
        }).join('');

        // 2. Mittlerer Bereich: Seitenspezifische Tools
        // Fallback-Matching (falls Dateiname leicht abweicht, z. B. lowercase)
        const toolKey = Object.keys(SITE_CONFIG.contextualTools).find(
            k => k.toLowerCase() === currentFile.toLowerCase()
        );
        const tools = toolKey ? SITE_CONFIG.contextualTools[toolKey] : [];

        const toolsSectionHtml = tools.length > 0 ? `
            <div class="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-1">
                <p class="px-3 pb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Funktionen
                </p>
                ${tools.map(tool => `
                    <button onclick="${tool.onclick}" class="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs text-left transition ${
                        tool.danger
                            ? 'text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40'
                            : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                    }">
                        <i data-lucide="${tool.icon}" class="w-4 h-4 ${tool.danger ? 'text-rose-500' : 'text-slate-400'}"></i>
                        <span>${tool.label}</span>
                    </button>
                `).join('')}
            </div>` : '';

        // 3. Externe Links
        const externalHtml = SITE_CONFIG.externalLinks.map(link => `
            <a href="${link.href}" target="_blank" rel="noopener noreferrer" class="flex items-center justify-between px-3 py-2 rounded-lg text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition">
                <span class="flex items-center gap-2.5">
                    <i data-lucide="${link.icon}" class="w-4 h-4 text-slate-400"></i>
                    ${link.label}
                </span>
                <i data-lucide="arrow-up-right" class="w-3.5 h-3.5 text-slate-400"></i>
            </a>
        `).join('');

        navPlaceholder.innerHTML = `
            <!-- Backdrop -->
            <div id="mobile-backdrop" onclick="toggleMenu()" class="fixed inset-0 bg-slate-950/40 backdrop-blur-[1px] z-40 hidden opacity-0 transition-opacity duration-200"></div>
            
            <!-- Slide-Over Drawer -->
            <aside id="mobile-drawer" class="fixed top-0 right-0 h-full w-72 max-w-[85vw] bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 z-50 transform translate-x-full transition-transform duration-200 flex flex-col justify-between">
                <div class="p-4 space-y-5 overflow-y-auto">
                    <!-- Drawer Header -->
                    <div class="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                        <span class="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Navigation</span>
                        <button onclick="toggleMenu()" class="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition" aria-label="Menü schließen">
                            <i data-lucide="x" class="w-4 h-4"></i>
                        </button>
                    </div>

                    <!-- Bereich 1: Seiten (immer gleich) -->
                    <div class="space-y-1">
                        <p class="px-3 pb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">Seiten</p>
                        ${pagesHtml}
                    </div>

                    <!-- Bereich 2: Mittlerer Bereich (dynamisch je nach Seite) -->
                    ${toolsSectionHtml}

                    <!-- Bereich 3: Externe Links (immer gleich) -->
                    <div class="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-1">
                        <p class="px-3 pb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">Externe Links</p>
                        ${externalHtml}
                    </div>
                </div>

                <!-- Drawer Fußzeile -->
                <div class="p-4 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-400 flex justify-between items-center">
                    <span>DQV Online-Liga 2027</span>
                    <span class="font-mono">Amnesiophobie</span>
                </div>
            </aside>
        `;
    }

    // --- B. FOOTER RENDERN (nutzt dieselben Arrays wie das Menü) ---
    const footerPlaceholder = document.getElementById('site-footer');
    if (footerPlaceholder) {
        const footerPagesHtml = SITE_CONFIG.pages.map(p =>
            `<li><a href="${p.href}" class="hover:text-sky-600 dark:hover:text-sky-400 transition">${p.label}</a></li>`
        ).join('');

        const footerExtHtml = SITE_CONFIG.externalLinks.map(l =>
            `<li><a href="${l.href}" target="_blank" rel="noopener noreferrer" class="hover:text-sky-600 dark:hover:text-sky-400 transition inline-flex items-center gap-1">${l.label} <i data-lucide="external-link" class="w-3 h-3 text-slate-400"></i></a></li>`
        ).join('');

        footerPlaceholder.innerHTML = `
        <footer class="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-8 mt-auto text-xs text-slate-600 dark:text-slate-400">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                <div class="space-y-3">
                    <div class="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                        <i data-lucide="brain" class="w-4 h-4 text-sky-500"></i>
                        <span>Amnesiophobie</span>
                    </div>
                    <!--p class="text-slate-500 dark:text-slate-400 leading-relaxed">
                        Interaktive Tabellenrechner und Simulatoren für die DQV Online-Liga Saison 2027.
                    </p-->
                </div>
                <div class="space-y-2">
                    <h4 class="font-semibold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">Seiten & Tools</h4>
                    <ul class="space-y-1.5">${footerPagesHtml}</ul>
                </div>
                <div class="space-y-2">
                    <h4 class="font-semibold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">Externe Links</h4>
                    <ul class="space-y-1.5">${footerExtHtml}</ul>
                </div>
                <!--div class="space-y-2">
                    <h4 class="font-semibold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">System</h4>
                    <div class="flex items-center gap-2">
                        <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                        <span class="text-slate-500 dark:text-slate-400">GitHub Live-Sync</span>
                    </div-->
                </div>
            </div>
            <!--div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-400">
                <p>© 2027 DQV Online-Liga • Amnesiophobie</p>
            </div-->
        </footer>`;
    }

    if (window.lucide) {
        lucide.createIcons();
    }
}

window.addEventListener('DOMContentLoaded', injectSharedComponents);
