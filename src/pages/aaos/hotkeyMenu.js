import Core from "@core/core";
import { debugLog } from "@core/debugger";
import { debugState } from "@core/debugger";
import SettingsModalCore from "@core/settingsModal/modalCore";

const core = new Core();
const debugMessage = debugState();

function settingsButton() {
    const settingsButton = document.createElement('button');
    settingsButton.classList.add('btn', 'btn-xs', 'btn-info');
    settingsButton.innerHTML = 'Hotkey+ Settings';
    settingsButton.addEventListener('click', () => {
        const modal = new SettingsModalCore();
        modal.open();
    });
    return settingsButton;
}

function showButton() {
    const showButton = document.createElement('button');
    showButton.classList.add('btn', 'btn-xs');
    let state = core.loadSetting('showHotkeysAAO', debugMessage);

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
        state = core.toggleSetting('showHotkeysAAO', debugMessage);
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
        debugLog('State:', state);
        core.updateAAOConfigButtons(state);
    });
    return showButton;
}


export function placeButtonGroup() {
    const aaoRegion = document.querySelector('#mission-aao-group');
    debugLog('aaoRegion:', aaoRegion);

    const showBtn = showButton();
    const settingsBtn = settingsButton();

    const buttonGroup = document.createElement('div');
    buttonGroup.classList.add('btn-group');

    buttonGroup.appendChild(showBtn);
    buttonGroup.appendChild(settingsBtn);
    
    if (aaoRegion) {
        aaoRegion.appendChild(buttonGroup);
    }
}



