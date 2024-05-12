import Toastify from '@lib/toastify';
import Storage from '@core/storage';
import Toast from '@core/toasts';
import SVG_hotkey_icon from "@assets/svg/hotkeyIcon.svg";


class HotkeyCore {

    constructor() {
        this.storage = new Storage();
        this.toast = new Toast();
    }

    // Hotkeys laden und speichern
    getHotkeys() {
        return this.storage.get().hotkeys;
    }

    saveHotkeys(hotkeys) {
        this.storage.set('hotkeys', hotkeys);
    }

    deleteHotkeysOK() {
        this.saveHotkeys([]);
        this.updateHotkeysButtons();
        this.toast.error('Alle Hotkeys wurden gelöscht.');
    }

    // Einzelne Hotkeys laden und speichern
    addHotkey(id, name, newHotkey) {
        if (!id || !name || !newHotkey) {
            this.toast.error('Ein Fehler ist aufgetreten. Bitte versuche es erneut.');
            return false;
        }
        const hotkeys = this.getHotkeys();

        // Findet den Index des Eintrags mit der gleichen ID
        const existingIndex = hotkeys.findIndex(h => h.id === id);

        // Überprüft, ob der neue Hotkey bereits verwendet wird, und zwar von einem anderen Eintrag
        const isHotkeyInUse = hotkeys.some(h => h.hotkey === newHotkey && h.id !== id);

        if (isHotkeyInUse) {
            this.toast.error('Hotkey ist bereits in Verwendung.');
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

        this.saveHotkeys(hotkeys);
        this.toast.success(`Hotkey für "${name}" ${existingIndex > -1 ? 'aktualisiert' : 'gespeichert'}.`);
        return true;

    }

    getHotkey(id) {
        const hotkey = this.getHotkeys().find(h => h.id === id);
        return hotkey ? hotkey.hotkey : null;
    }

    deleteHotkeyOK(id) {
        const hotkeys = this.getHotkeys();
        const newHotkeys = hotkeys.filter(h => h.id !== id);
        this.saveHotkeys(newHotkeys);
    }

    deleteHotkeyMsg(id) {
        this.deleteHotkeyOK(id);
        this.toast.success('Hotkey gelöscht.');
    }

    // Hotkey Toastify Messages
    deleteHotkey(id, callback) {
        const hotkey = this.getHotkeys().find(h => h.id === id);
        let re = false;
        if (!hotkey) {
            this.toast.error('Hotkey nicht gefunden.');
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
                        this.deleteHotkeyMsg(id);
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

    deleteHotkeys() {
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
                    onClick: () => this.deleteHotkeysOK(),
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

    exportHotkeys() {
        const hotkeys = this.getHotkeys();
        const hotkeysString = JSON.stringify(hotkeys);
        const hotkeysBlob = new Blob([hotkeysString], { type: 'application/json' });
        const hotkeysUrl = URL.createObjectURL(hotkeysBlob);
        const hotkeysLink = document.createElement('a');
        hotkeysLink.href = hotkeysUrl;
        hotkeysLink.download = 'hotkeys.json';
        hotkeysLink.click();
    }

    importHotkeys(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const hotkeys = JSON.parse(e.target.result);
                this.saveHotkeys(hotkeys);
                this.updateHotkeysButtons();
                this.toast.success('Hotkeys importiert.');
            } catch (error) {
                this.toast.error('Fehler beim Importieren der Hotkeys.');
            }
        };
        reader.readAsText(file);
    }

    updateAAOConfigButtons(state = this.settings.loadSetting("showHotkeysAAO")) {
        const configButtons = document.querySelectorAll('.hotkeyConfigButton');
        configButtons.forEach(button => {
            const aaoId = button.getAttribute('data-aao-id');
            let hotkey = this.getHotkey(aaoId);
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
    
      updateHotkeysButtons() {
        const hotkeyList = this.getHotkeys();
        const configButtons = document.querySelectorAll('.hotkeyBtn');
        configButtons.forEach(span => {
            const id = span.getAttribute('data-aao-id');
            const hotkey = hotkeyList.find(h => h.id === id);
            span.textContent = hotkey ? `[${hotkey.hotkey}]` : `[none]`;
        });
      }

}

export default HotkeyCore;
