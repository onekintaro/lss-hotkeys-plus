
import { placeEditButton } from "@aaos/editBtn";
import { warnDefault } from "@aaosEdit/warnDefault";
import { placeButtonGroup } from "@aaos/hotkeyMenu";
import { loadHotkeysMission } from "@missions/useHotkey";
import { debugLog } from '@core/debugger';
import Core from "./core";

const core = new Core();

class UrlCheck {
    // Überprüft, ob die aktuelle Seite genau /aaos ist.
    isAaoPage(url = null) {
        return /^\/aaos\/?$/.test(url);
    }

    // Prüft, ob die aktuelle Seite eine Edit-Seite innerhalb von /aaos ist.
    isAaoEditPage(url) {
        return /^\/aaos\/\d+\/edit\/?$/.test(url);
    }

    // Prüft, ob die aktuelle Seite eine Missions-Seite ist.
    isMissionsPage(url) {
        return /^\/missions/.test(url);
    }

    initSelf(fullUrl = null) {
        let url;
        if(fullUrl === null) {
            url = window.location.pathname;
        }else if (typeof fullUrl === "string") {
            const uri = new URL(fullUrl);
            url = uri.pathname;
        }
        debugLog("initSelf aufgerufen mit URL:", url);
        if (this.isAaoPage(url)) {
            // Code für die AAO-Seite
            debugLog("Auf der AAO-Seite");
            placeButtonGroup();
            placeEditButton();
            core.updateAAOConfigButtons()
            return true;
        } else if (this.isAaoEditPage(url)) {
            // Code für die AAO-Bearbeiten-Seite
            debugLog("Auf einer AAO-Bearbeiten-Seite");
            warnDefault();
            return true;
        } else if (this.isMissionsPage(url)) {
            // Code für die Missions-Seite
            debugLog("Auf einer Missions-Seite");
            loadHotkeysMission();
            return true;
        }
        return false;
    }
} 

export default UrlCheck;