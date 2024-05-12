import Storage from '@core/storage';
import Toast from '@core/toasts';
import Pkg from '@package';

class Settings {

    constructor() {
        this.storage = new Storage();
        this.toast = new Toast();
    }

    getVersion(){
        return Pkg.version;
    }
    // Einstellungen laden und speichern
    getSettings(){
        return this.storage.get().settings;
    }

    saveSettings(settings){
        this.storage.set('settings', settings);
    }

    loadSetting(key, msg = false){
        if(this.getSettings()[key] == undefined || this.getSettings()[key] == null){
            if(msg) this.toast.error('Ungültige Einstellung.');
            return false;
        }
        if(msg) this.toast.success('Einstellung geladen.');
        return this.getSettings()[key];
    }

    toggleSetting(key, msg = false){
        const settings = this.getSettings();
        if(typeof settings[key] !== 'boolean') {
            if(msg) this.toast.error('Ungültige Einstellung.');
            return false;
        }
        settings[key] = !settings[key];
        this.saveSettings(settings);
        if(msg) this.toast.success('Einstellung gespeichert.');
        return settings[key];
    }

    saveSetting(key, value, msg = false){
        const settings = this.getSettings();
        settings[key] = value;
        this.saveSettings(settings);
        if(msg) this.toast.success('Einstellung gespeichert.');
    }
}

export default Settings;