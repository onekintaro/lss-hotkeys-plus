import UrlCheck from '@core/urlCheck';
import { debugLog } from '@core/debugger';

const urlCheck = new UrlCheck();

// MutationObserver Callback-Funktion
const observerCallback = (mutationsList, observer) => {
    for (let mutation of mutationsList) {
        if (mutation.type === "childList" && mutation.target.id === 'lightbox_box') {
            debugLog("Mutation in #lightbox_box");
            mutation.addedNodes.forEach((node) => {
                if (node.classList && node.classList.contains("lightbox_iframe")) {
                    debugLog("Ein iframe wurde zum lightbox_box hinzugefügt.");
                    node.addEventListener('DOMContentLoaded', () => {
                        debugLog("iframe vollständig geladen.");
                        debugLog("iframe src:", node.src);
                        // Führe hier die Logik aus, die auf das geladene iframe wartet
                        urlCheck.initSelf(node.src);
                    });
                }

            });
        }
    }
};

export function loader() {
  // Observer-Konfiguration definieren
  const config = { childList: true, attributes: false, subtree: true };

  // Beobachtungsziel auswählen (der gesamte Dokumentenkörper)
  const target = document.body;

  // MutationObserver erstellen und starten
  const observer = new MutationObserver(observerCallback);
  observer.observe(target, config);
  debugLog("Beobachtung des gesamten body gestartet.");
}
