function injectSharedComponents() {
    // 1. Footer automatisch einfügen, wenn ein Container mit id="site-footer" da ist
    const footerPlaceholder = document.getElementById('site-footer');
    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = `
<footer class="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-8 mt-auto text-xs text-slate-600 dark:text-slate-400">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        
        <!-- Spalte 1: Über das Projekt -->
        <div class="space-y-3">
            <div class="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
                <i data-lucide="brain" class="w-4 h-4 text-sky-500"></i>
                <span>Gedächtnisteam</span>
            </div>
        </div>

        <!-- Spalte 2: Navigation / Deine verlinkten Seiten -->
        <div class="space-y-2">
            <h4 class="font-semibold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">Seiten & Tools</h4>
            <ul class="space-y-1.5">
                <li><a href="Vorrunde2027.html" class="hover:text-sky-600 dark:hover:text-sky-400 transition">Vorrunde 2027</a></li>			
                <li><a href="Gegner.html" class="hover:text-sky-600 dark:hover:text-sky-400 transition">Gegner-Analyse</a></li>
                <li><a href="Hauptrunde2027.html" class="hover:text-sky-600 dark:hover:text-sky-400 transition">Hauptrunde 2027</a></li>
				<!-- Füge hier weitere deiner Seiten hinzu -->
				
                <!-- <li><a href="deine-naechste-seite.html" class="hover:text-sky-600 dark:hover:text-sky-400 transition">Name der Seite</a></li> -->
            </ul>
        </div>

        <!-- Spalte 3: Externe Links / Offizielle Links -->
        <div class="space-y-2">
            <h4 class="font-semibold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">Links</h4>
            <ul class="space-y-1.5">
                <li>
                    <a href="https://results.quiznations.com/gerix" target="_blank" rel="noopener noreferrer" class="hover:text-sky-600 dark:hover:text-sky-400 transition flex items-center gap-1">
                        QuizNations Tabelle <i data-lucide="external-link" class="w-3 h-3 text-slate-400"></i>
                    </a>
                </li>
                <li>
                    <a href="https://drive.google.com/drive/folders/1G6lD1a31IvCIhSxtoDvyEQSxyDYKhWyU?usp=drive_link" target="_blank" rel="noopener noreferrer" class="hover:text-sky-600 dark:hover:text-sky-400 transition flex items-center gap-1">
                        Dateiablage <i data-lucide="external-link" class="w-3 h-3 text-slate-400"></i>
                    </a>
                </li>
                <li>
                    <a href="https://docs.google.com/spreadsheets/d/10579llo24tiTx4tbRTlYVezNB5G735TMe5cULdpR9VM/edit?gid=1937655390#gid=1937655390" target="_blank" rel="noopener noreferrer" class="hover:text-sky-600 dark:hover:text-sky-400 transition flex items-center gap-1">
                        Termine <i data-lucide="external-link" class="w-3 h-3 text-slate-400"></i>
                    </a>
                </li>				
            </ul>
        </div>

    </div>
</footer>`;
    }

    // Falls du auch das mobile Menü (Drawer) zentralisieren möchtest, 
    // kannst du hier analog einen Container befüllen.
    
    // Lucide Icons nach dem Injizieren neu laden
    if (window.lucide) {
        lucide.createIcons();
    }
}

// Automatisch beim Laden der Seite ausführen
window.addEventListener('DOMContentLoaded', injectSharedComponents);
