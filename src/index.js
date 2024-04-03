import { isAaoPage, isAaoEditPage, isMissionsPage } from '@core/urlCheck';
import { placeEditButton } from '@aaos/editBtn';
import { warnDefault } from '@aaosEdit/warnDefault';
import { placeShowButton } from '@aaos/hotkeyMenu';
import { ToastifyCSS } from '@config';

function loadToastifyCSS() {
    const link = document.createElement("link");
    link.href = ToastifyCSS;
    link.type = "text/css";
    link.rel = "stylesheet";
    document.head.appendChild(link);
}

window.addEventListener('load', () => {
    if (isAaoPage()) {
        // Code für die AAO-Seite
        console.log('Auf der AAO-Seite');
        loadToastifyCSS();
        placeShowButton();
        placeEditButton();
    } else if (isAaoEditPage()) {
        // Code für die AAO-Bearbeiten-Seite
        console.log('Auf einer AAO-Bearbeiten-Seite');
        warnDefault();
    } else if (isMissionsPage()) {
        // Code für die Missions-Seite
        console.log('Auf einer Missions-Seite');
        loadToastifyCSS();
    }

});