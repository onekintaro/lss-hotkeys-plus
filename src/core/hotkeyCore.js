import Toastify from '@lib/toastify';
import { APP_NAME } from '@config';

const appDefault = {
    settings: {
        showHotkeys: true,
        showEditBtn: true, // Not in use
        warnDefault: true  // Not in use
    },
    hotkeys: []
};

// Basisfunktionen
function get(){
    const data = localStorage.getItem(APP_NAME);
    if (data) {
        return JSON.parse(data);
    } else {
        localStorage.setItem(APP_NAME, JSON.stringify(appDefault));
        return appDefault;
    }
}

function save(key, data){
    const appData = get();
    appData[key] = data;
    localStorage.setItem(APP_NAME, JSON.stringify(appData));
}

// Einstellungen laden und speichern
export function getSettings(){
    return get().settings;
}

function saveSettings(setting){
    save('settings', setting);
}

export function loadSetting(key){
    return getSettings()[key];
}

export function toggleSetting(key){
    const settings = getSettings();
    settings[key] = !settings[key];
    saveSettings(settings);
    return settings[key];
}

export function saveSetting(key, value){
    const settings = getSettings();
    settings[key] = value;
    saveSettings(settings);
    successToast('Einstellungen gespeichert.');
}

// Hotkeys laden und speichern
export function getHotkeys() {
    return get().hotkeys;
}

export function saveHotkeys(hotkeys) {
    save('hotkeys', hotkeys);
}

function deleteHotkeysOK() {
    saveHotkeys([]);
    errorToast('Alle Hotkeys wurden gelöscht.');
}

// Einzelne Hotkeys laden und speichern
export function addHotkey(id, name, newHotkey) {
    if (!id || !name || !newHotkey) {
        errorToast('Ein Fehler ist aufgetreten. Bitte versuche es erneut.');
        return false;
    }
    const hotkeys = getHotkeys();

    // Findet den Index des Eintrags mit der gleichen ID
    const existingIndex = hotkeys.findIndex(h => h.id === id);

    // Überprüft, ob der neue Hotkey bereits verwendet wird, und zwar von einem anderen Eintrag
    const isHotkeyInUse = hotkeys.some(h => h.hotkey === newHotkey && h.id !== id);

    if (isHotkeyInUse) {
        errorToast('Hotkey ist bereits in Verwendung.');
        return false;
    }
    if (existingIndex > -1) {
        // Existierender Hotkey-Eintrag wird aktualisiert
        hotkeys[existingIndex].name = name;
        hotkeys[existingIndex].hotkey = newHotkey;
    } else {
        // Neuer Hotkey-Eintrag wird hinzugefügt
        hotkeys.push({ id, name, hotkey: newHotkey });
    }

    saveHotkeys(hotkeys);
    successToast(`Hotkey für "${name}" ${existingIndex > -1 ? 'aktualisiert' : 'gespeichert'}.`);
    return true;

}

export function getHotkey(id) {
    const hotkey = getHotkeys().find(h => h.id === id);
    return hotkey ? hotkey.hotkey : null;
}

function deleteHotkeyOK(id) {
    const hotkeys = getHotkeys();
    const newHotkeys = hotkeys.filter(h => h.id !== id);
    saveHotkeys(newHotkeys);
}

function deleteHotkeyMsg(id) {
    deleteHotkeyOK(id);
    successToast('Hotkey gelöscht.');
}


// Toastify Messages
export function errorToast(message) {
    Toastify({
        text: message,
        duration: 3000,
        close: true,
        gravity: 'top',
        position: 'center',
        style: {
            background: 'linear-gradient(to right, #ff4b2b, #ff416c)'
        }
    }).showToast();
}

export function successToast(message) {
    Toastify({
        text: message,
        duration: 3000,
        close: true,
        gravity: 'top',
        position: 'center',
        style: {
            background: 'linear-gradient(to right, #00b09b, #96c93d)'
        }
    }).showToast();
}

// Hotkey Toastify Messages
export function deleteHotkey(id, callback) {
    const hotkey = getHotkeys().find(h => h.id === id);
    let re = false;
    if (!hotkey) {
        errorToast('Hotkey nicht gefunden.');
        return;
    }
    Toastify({
        text: `Möchtest du den Hotkey für "${hotkey.name}" wirklich löschen?`,
        duration: -1,
        close: true,
        gravity: 'top',
        position: 'center',
        style: {
            background: 'linear-gradient(to right, #ff4b2b, #ff416c)'
        },
        actions: [
            {
                text: 'Ja',
                className: 'btn btn-danger',
                onClick: () => {
                    deleteHotkeyMsg(id);
                    if (typeof callback === 'function') {
                        callback(true); // Rufe den Callback auf und gib `true` weiter, um Erfolg anzuzeigen
                    }
                },
                close: true
            },
            {
                text: 'Nein',
                className: 'btn btn-success',
                close: true,
            }
        ]
    }).showToast();
    return re;
}

export function deleteHotkeys() {
    Toastify({
        text: 'Möchtest du wirklich alle Hotkeys löschen?',
        duration: -1,
        close: true,
        gravity: 'top',
        position: 'center',
        style: {
            background: 'linear-gradient(to right, #ff4b2b, #ff416c)'
        },
        actions: [
            {
                text: 'Ja',
                className: 'btn btn-danger',
                onClick: () => deleteHotkeysOK(),
                close: true
            },
            {
                text: 'Nein',
                className: 'btn btn-success',
                close: true,
            }
        ]
    }).showToast();
}