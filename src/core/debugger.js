import { debug_mode } from "@config";
import Settings from "@core/settings";

const settings = new Settings();

const debugForce = process.env.DEBUG_MODE 

export function debugState() {
    if(debugForce) return true;
    if(debug_mode) return true;
    if(settings.loadSetting("debugMode")) return true;
    return false;
}

export function debugInfo() {
    const modes = {
        debugConf: debug_mode,
        debugForceDev: debugForce,
        debugSetting: settings.loadSetting("debugMode")
    }
    return modes;
}

export function debugMsg(type = "log", ...message) {
    if(!debugState()) return;
    if(type === "log") console.log(...message);
    if(type === "warn") console.warn(...message);
    if(type === "error") console.error(...message);
    if(type === "info") console.info(...message);
}

export function debugGroupBegin(groupName = "Debug-Gruppe") {
    if(!debugState()) return;
    console.group(groupName);
}

export function debugGroupEnd() {
    if(!debugState()) return;
    console.groupEnd();
}

export function debugLog(...message) {
    debugMsg("log", ...message);
}

export function debugWarn(...message) {
    debugMsg("warn", ...message);
}

export function debugError(...message) {
    debugMsg("error", ...message);
}

