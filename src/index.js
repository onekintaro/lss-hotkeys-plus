import { loader } from '@core/loader';
import UrlCheck from '@core/urlCheck';
import { debugLog, debugInfo } from '@core/debugger';
import { addMenuEntry } from '@main/menu';
import { ToastifyCSS } from '@config';
import { HotkeyCSS } from '@config';
import pkg from '@package';

const urlCheck = new UrlCheck();

function loadToastifyCSS() {
    const link = document.createElement("link");
    link.href = ToastifyCSS;
    link.type = "text/css";
    link.rel = "stylesheet";
    document.head.appendChild(link);
}

function loadHotkeyCSS() {
    const link = document.createElement("link");
    link.href = HotkeyCSS;
    link.type = "text/css";
    link.rel = "stylesheet";
    document.head.appendChild(link);
}

window.addEventListener('load', () => {
    debugLog("%cHotkeys Plus v"+pkg.version+" wurde geladen, Debug Modus ist aktiviert.", "color:magenta")
    debugLog("%cDebug Info:", "color:magenta", debugInfo());
    loadToastifyCSS();
    loadHotkeyCSS();
    //add menu entry
    addMenuEntry();
    if (!urlCheck.initSelf()) {
        debugLog("Keine passende Seite gefunden.");
        debugLog("Verwende den MutationObserver.");
        loader();
    }
});