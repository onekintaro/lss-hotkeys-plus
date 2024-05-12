import HotkeyCore from "@core/hotkey";
import Settings from "@core/settings";

// TODO: Unfinished Class, needs to be completed

// Aliases Class
class Core {
  constructor() {
    this.hotkeys = new HotkeyCore();
    this.settings = new Settings();
  }

  // Hotkeys
  getHotkeys() {
    return this.hotkeys.getHotkeys();
  }

  getHotkey(id) {
    return this.hotkeys.getHotkey(id);
  }

  // Settings
  loadSetting(key, msg = false) {
    return this.settings.loadSetting(key, msg);
  }

  toggleSetting(key, msg = false) {
    return this.settings.toggleSetting(key, msg);
  }


  // Update Buttons
  updateAAOConfigButtons(state = this.settings.loadSetting("showHotkeysAAO")) {
    this.hotkeys.updateAAOConfigButtons(state);
  }

  updateHotkeysButtons() {
    this.hotkeys.updateHotkeysButtons();
  }


}

export default Core;