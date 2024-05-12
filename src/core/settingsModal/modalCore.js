// import {
//   errorToast,
//   getHotkey,
//   addHotkey,
//   deleteHotkey,
//   loadSetting,
// } from "@core/hotkeyCore";

import HotkeyCore from "@core/hotkey";
import Toast from "@core/toasts";
import Settings from "@core/settings";

import { debugInfo } from "@core/debugger";

import SettingsModalLayout from "./modalLayout";

// Spezielle Tastennamen anpassen

class SettingsModalCore extends SettingsModalLayout {
  constructor() {
    super(); // Ruft den Konstruktor der Basisklasse auf


    this.hotkeyCore = new HotkeyCore();
    this.toast = new Toast();
    this.settings = new Settings();

    this.setupModal();
  }

  settingsToggleButton(setting, options, colors) {

    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = options.state1;
    toggleBtn.className = `btn btn-xs ${colors.s1}`;
    toggleBtn.style = "margin-left: 10px;";

    const state = this.settings.loadSetting(setting);
    if (state) {
      toggleBtn.textContent = options.state2;
      toggleBtn.classList.remove(colors.s1);
      toggleBtn.classList.add(colors.s2);
    }

    toggleBtn.addEventListener("click", () => {
      const state = this.settings.toggleSetting(setting, true);
      if (state) {
        toggleBtn.textContent = options.state2;
        toggleBtn.classList.remove(colors.s1);
        toggleBtn.classList.add(colors.s2);
      } else {
        toggleBtn.textContent = options.state1;
        toggleBtn.classList.remove(colors.s2);
        toggleBtn.classList.add(colors.s1);
      }
      if (setting === "showHotkeysAAO") {
        const currentstate = this.settings.loadSetting(setting)
        this.core.updateAAOConfigButtons(currentstate);
      }

    });

    return toggleBtn;
  }

  settingsBtnRow(setting, label, labeltext = "", options = {state1: "Anzeigen", state2: "Verstecken", invert: false}) {
    const row = document.createElement("div");
    row.style = "display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;";
    const colors = {
      s1: options.invert ? "btn-danger" : "btn-success",
      s2: options.invert ? "btn-success" : "btn-danger"
    }

    const settingLabel = document.createElement("div");

    const settingLabelTitle = document.createElement("div");
    settingLabelTitle.style = "font-weight: bold;";

    const settingLabelText = document.createElement("div");

    settingLabelTitle.textContent = label;
    settingLabelText.textContent = labeltext;
    
    settingLabel.appendChild(settingLabelTitle);
    settingLabel.appendChild(settingLabelText);
    row.appendChild(settingLabel);

    const toggleBtn = this.settingsToggleButton(setting, options, colors);
    row.appendChild(toggleBtn);

    if(setting === "debugMode"){
      if(debugInfo().debugForceDev){
        toggleBtn.textContent = "Force Debug ist aktiviert";
        toggleBtn.classList.remove(colors.s1);
        toggleBtn.classList.add(colors.s2);
        toggleBtn.disabled = true;
        settingLabelText.textContent = "Force Debug-Modus wurde in webpack.dev.js aktiviert.";
      }
      if(debugInfo().debugConf){
        toggleBtn.textContent = "Config Debug-Modus ist aktiviert";
        toggleBtn.classList.remove(colors.s1);
        toggleBtn.classList.add(colors.s2);
        toggleBtn.disabled = true;
        settingLabelText.textContent = "Debug-Modus wurde config.js aktiviert.";
      }
    }

    return row;
  }

  settingsVersionRow() {
    const row = document.createElement("div");
    row.style = "display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;";

    const settingLabel = document.createElement("div");

    const settingLabelTitle = document.createElement("div");
    settingLabelTitle.style = "font-weight: bold;";

    settingLabelTitle.textContent = "Version";

    const version = document.createElement("div");
    version.textContent = this.settings.getVersion();
    
    settingLabel.appendChild(settingLabelTitle);
    row.appendChild(settingLabel);
    
    row.appendChild(version);

    return row;
  }

  settingsExportHotkeysRow() {
    const row = document.createElement("div");
    row.style = "display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;";

    const settingLabel = document.createElement("div");

    const settingLabelTitle = document.createElement("div");
    settingLabelTitle.style = "font-weight: bold;";

    settingLabelTitle.textContent = "Export";

    const exportBtn = document.createElement("button");
    exportBtn.textContent = "Export";
    exportBtn.className = "btn btn-xs btn-primary";
    exportBtn.style = "margin-left: 10px;";

    exportBtn.addEventListener("click", () => {
      this.hotkeyCore.exportHotkeys();
    });

    settingLabel.appendChild(settingLabelTitle);
    row.appendChild(settingLabel);
    row.appendChild(exportBtn);

    return row;
  }

  settingsImportHotkeysRow() {
    const row = document.createElement("div");
    row.style = "display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;";

    const settingLabel = document.createElement("div");

    const settingLabelTitle = document.createElement("div");
    settingLabelTitle.style = "font-weight: bold;";

    settingLabelTitle.textContent = "Import";

    const importBtn = document.createElement("button");
    importBtn.textContent = "Import";
    importBtn.className = "btn btn-xs btn-primary";
    importBtn.style = "margin-left: 10px;";

    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".json";
    fileInput.style.display = "none"; // Verstecke das Datei-Input-Element

    fileInput.addEventListener("change", (event) => {
      const file = event.target.files[0];
      if (file) {
          this.hotkeyCore.importHotkeys(file);
      } else {
          console.error("No file selected");
      }
    });

    importBtn.addEventListener("click", () => {
      fileInput.click(); // Öffne den Datei-Dialog
    });

    settingLabel.appendChild(settingLabelTitle);
    row.appendChild(settingLabel);
    row.appendChild(importBtn);
    row.appendChild(fileInput);

    return row;
  }

  settingsDeleteAllRow() {
    const row = document.createElement("div");
    row.style = "display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;";

    const settingLabel = document.createElement("div");

    const settingLabelTitle = document.createElement("div");
    settingLabelTitle.style = "font-weight: bold;";

    settingLabelTitle.textContent = "Alle Hotkeys löschen";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Löschen";
    deleteBtn.className = "btn btn-xs btn-danger";
    deleteBtn.style = "margin-left: 10px;";

    deleteBtn.addEventListener("click", () => {
      this.hotkeyCore.deleteHotkeys();
    });

    settingLabel.appendChild(settingLabelTitle);
    row.appendChild(settingLabel);
    row.appendChild(deleteBtn);

    return row;
  }

  setupModal() {

    // Modal Title Text
    this.title.textContent = `Hotkey+ Settings`;
    
    const body = this.base.body;

    const hr = document.createElement("hr");

    const settingsRow1 = this.settingsBtnRow("disableHotkeys", "Hotkeys Deaktivieren", "Hotkeys werden Deaktiviert, in Missionen Funktionieren keine Hotkeys mehr, können im AAO-Editor aber Bearbeitet werden.", {state1: "Anzeigen", state2: "Verstecken", invert: true});
    const settingsRow2 = this.settingsBtnRow("showHotkeysAAO", "Hotkeys in AAO Editor anzeigen", "Hotkeys werden im AAO-Editor angezeigt", {state1: "Anzeigen", state2: "Verstecken", invert: false});
    const settingsRow3 = this.settingsBtnRow("showHotkeysMission", "Hotkeys in Missionen anzeigen", "Hotkeys werden in den Missionen angezeigt", {state1: "Anzeigen", state2: "Verstecken", invert: false});
    const settingsRow4 = this.settingsBtnRow("debugMode", "Debug-Modus aktivieren", "Debug-Modus Temporär aktivieren", {state1: "Debug Aktivieren", state2: "Debug Deaktivieren", invert: false});

    const settingsVersionRow = this.settingsVersionRow();
    const settingsExportRow = this.settingsExportHotkeysRow();
    const settingsImportRow = this.settingsImportHotkeysRow();
    const settingsDeleteAllRow = this.settingsDeleteAllRow();

    body.appendChild(settingsRow1);
    body.appendChild(document.createElement("hr"));
    body.appendChild(settingsRow2);
    body.appendChild(document.createElement("hr"));
    body.appendChild(settingsRow3);
    body.appendChild(document.createElement("hr"));
    body.appendChild(settingsRow4);
    body.appendChild(document.createElement("hr"));
    body.appendChild(settingsVersionRow);
    body.appendChild(document.createElement("hr"));
    body.appendChild(settingsExportRow);
    body.appendChild(document.createElement("hr"));
    body.appendChild(settingsImportRow);
    body.appendChild(document.createElement("hr"));
    body.appendChild(settingsDeleteAllRow);

 
    

    // Event-Handler für Close-Buttons
    this.buttons.close.addEventListener("click", () => this.destroy());
    this.buttons.cancel.addEventListener("click", () => this.destroy());

  }
}

export default SettingsModalCore;
