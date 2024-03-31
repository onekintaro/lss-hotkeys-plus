import { isAaoPage, isMissionsPage } from './urlCheck';
import { placeEditButton } from './editBtn';
import { createModal } from './modal';


window.addEventListener('load', () => {
    if (isAaoPage()) {
        // Code für die AAO-Seite
        console.log('Auf der AAO-Seite');
        placeEditButton();
        createModal();
    } else if (isMissionsPage()) {
        // Code für die Missions-Seite
        console.log('Auf einer Missions-Seite');
    }

});