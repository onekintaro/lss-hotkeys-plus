import { loadSetting, toggleSetting, getHotkey } from "@core/hotkeyCore";
import SVG_hotkey_icon from "@assets/svg/hotkeyIcon.svg";

export function placeShowButton() {
    const aaoRegion = document.querySelector('#mission-aao-group');
    const showButton = document.createElement('button');
    showButton.classList.add('btn', 'btn-xs');
    let state = loadSetting('showHotkeys');

    // Setze den initialen Button-Text basierend auf dem aktuellen Zustand
    if (state) {
        showButton.innerHTML = 'Hotkeys verstecken';
        showButton.classList.add('btn-danger');
    } else {
        showButton.innerHTML = 'Hotkeys anzeigen';
        showButton.classList.add('btn-success');
    }

    showButton.addEventListener('click', () => {
        // Umschalten des Zustands
        state = toggleSetting('showHotkeys');
        // Button-Text basierend auf dem neuen Zustand aktualisieren
        if (state) {
            showButton.innerHTML = 'Hotkeys verstecken';
            showButton.classList.remove('btn-success');
            showButton.classList.add('btn-danger');
        } else {
            showButton.innerHTML = 'Hotkeys anzeigen';
            showButton.classList.remove('btn-danger');
            showButton.classList.add('btn-success');
        }
        console.log('State:', state);
        updateAllConfigButtons(state);
    });

    aaoRegion.appendChild(showButton);
}

export function updateAllConfigButtons(state = loadSetting("showHotkeys")) {
    const configButtons = document.querySelectorAll('.hotkeyConfigButton');
    configButtons.forEach(button => {
        const aaoId = button.getAttribute('data-aao-id');
        let hotkey = getHotkey(aaoId);
        const svgHtml = SVG_hotkey_icon;
        if (!hotkey) {
            hotkey = 'none';
        }

        if (state) {
            button.innerHTML = `${svgHtml} [${hotkey}]`;
        } else {
            button.innerHTML = svgHtml;
        }

        const svgElement = button.querySelector('svg');
        svgElement.style.width = '12px';
        svgElement.style.height = '12px';
        svgElement.style.fill = 'currentColor';
    });
}

