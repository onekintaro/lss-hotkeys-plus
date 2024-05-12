// import {
//   errorToast,
//   getHotkey,
//   addHotkey,
//   deleteHotkey,
//   loadSetting,
// } from "@core/hotkeyCore";

import Core from "@core/core";
import HotkeyCore from "@core/hotkey";
import Toast from "@core/toasts";
import Settings from "@core/settings";

import HotkeyModalLayout from "./modalLayout";

// Spezielle Tastennamen anpassen
const specialKeys = {
  Backspace: "backspace",
  Tab: "tab",
  Clear: "clear",
  Enter: "return",
  Return: "return",
  Esc: "escape",
  Escape: "escape",
  Space: "space",
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
  Home: "home",
  End: "end",
  PageUp: "pageup",
  PageDown: "pagedown",
  Delete: "delete",
};

class HotkeyModalCore extends HotkeyModalLayout {
  constructor(aaoId, name) {
    super(); // Ruft den Konstruktor der Basisklasse auf
    this.aaoId = aaoId;
    this.name = name;

    this.hotkeyCore = new HotkeyCore();
    this.toast = new Toast();
    this.settings = new Settings();

    this.setupModal();
  }

  updateModal(hotkey = this.hotkeyCore.getHotkey(this.aaoId)) {

    // Actual Hotkey Text
    if (hotkey) {
      this.actualHotkey.innerHTML = `Aktueller Hotkey: <strong>${hotkey}</strong>`;
      this.buttons.delete.disabled = false;
    } else {
      this.actualHotkey.innerHTML = "Aktueller Hotkey: <strong>Keiner</strong>";
      this.buttons.delete.disabled = true;
    }
  }

  saveHotkey() {
    const hotkey = this.input.value;
    if (!hotkey) {
      this.toast.error("Bitte gib einen Hotkey ein.");
      return false;
    }
    const add = this.hotkeyCore.addHotkey(this.aaoId, this.name, this.input.value);
    if (add) {
      this.updateModal();
      this.core.updateAAOConfigButtons(this.settings.loadSetting("showHotkeys"));
      return true;
    }
  }

  setupModal() {
    //get Hotkey
    const hotkey = this.hotkeyCore.getHotkey(this.aaoId);

    // Modal Title Text
    this.title.textContent = `Hotkey für: ${this.name}`;

    // Actual Hotkey Text
    if (hotkey) {
      this.actualHotkey.innerHTML = `Aktueller Hotkey: <strong>${hotkey}</strong>`;
      this.buttons.delete.disabled = false;
    } else {
      this.actualHotkey.innerHTML = "Aktueller Hotkey: <strong>Keiner</strong>";
      this.buttons.delete.disabled = true;
    }
    // Event-Handler für Löschen-Button
    this.buttons.delete.addEventListener("click", () => {
      this.hotkeyCore.deleteHotkey(this.aaoId, (success) => {
          if(success) {
              this.updateModal();
              this.core.updateAAOConfigButtons();
          }
          // Optional: Füge hier den Code ein, um das Modal zu schließen, falls nötig
      });
      //this.destroy();
    });

    // Event-Handler für Close-Buttons
    this.buttons.close.addEventListener("click", () => this.destroy());
    this.buttons.cancel.addEventListener("click", () => this.destroy());

    // Event-Handler für Reset-Button
    this.buttons.reset.addEventListener("click", () => {
      this.input.value = "";
    });

    // Event-Handler für Speichern-Button
    this.buttons.save.addEventListener("click", () => {
      const save = this.saveHotkey();
    });

    this.buttons.saveClose.addEventListener("click", () => {
      const save = this.saveHotkey();
      if (save) {
        this.destroy();
      }
    });

    // Hotkey-Event-Handler
    this.input.addEventListener("keydown", (event) => {
      // Hole den Namen der gedrück
      let keyName = event.key;
      // Verhindere die Standardaktion, um z.B. das Auslösen von Shortcuts zu stoppen
      event.preventDefault();

      // Berücksichtige spezielle Aktionen basierend auf der gedrückten Taste
      if (keyName === "Enter") {
        // Führe die Aktion des Speichern-Buttons aus
        this.buttons.save.click();
      } else if (keyName === "Escape") {
        // Schließe das Modal
        this.destroy();
      } else if (keyName === "Delete") {
        // Führe die Aktion des Löschen-Buttons aus, falls vorhanden und nicht deaktiviert
        if (!this.buttons.delete.disabled) {
          this.buttons.delete.click();
        }
      } else if (keyName === "Backspace") {
        // Setze das Input-Feld zurück, falls vorhanden
        this.input.value = "";
      } else {
        // Erstelle die Tastenkombination
        const modifiers = [
          event.metaKey ? "⌘" : "", // Für Command(⌘) auf macOS
          event.ctrlKey ? "Ctrl" : "",
          event.shiftKey ? "Shift" : "",
          event.altKey ? "Alt" : "",
        ];

        // Konvertiere spezielle Tasten oder normalisiere die Eingabe
        const isModifierKey =
          keyName === "Control" ||
          keyName === "Shift" ||
          keyName === "Alt" ||
          keyName === "Meta";
        if (isModifierKey) {
          keyName = ""; // Setze key auf einen leeren String, wenn es eine Modifikator-Taste ist
        } else {
          keyName = specialKeys[keyName] || keyName;
        }

        keyName =
          keyName.length === 1 ? keyName.toUpperCase() : keyName.toLowerCase();

        // Kombiniere die Modifikatoren mit der Taste
        const hotkey = [...modifiers.filter(Boolean), keyName].join("+").trim();

        // Setze den Text des Input-Feldes auf die Tastenkombination
        this.input.value = hotkey;
      }
    });
  }
}

export default HotkeyModalCore;
