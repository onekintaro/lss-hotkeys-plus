import Core from '@core/core';
import Toast from '@core/toasts';
import Settings from '@core/settings';
import hotkeys from 'hotkeys-js';


const core = new Core();
const toast = new Toast();
const settings = new Settings();

function showHotkeys(hotkeyList) {
    const timerClass = document.querySelectorAll('.aao_timer');
    timerClass.forEach(timer => {
        const id = timer.getAttribute('id').split('_')[2];
        const hotkey = hotkeyList.find(h => h.id === id);
        
        const hotkeySpan = document.createElement('span');
        hotkeySpan.className = 'hotkeyBtn';
        hotkeySpan.style = 'margin-left: 5px;';
        hotkeySpan.textContent = hotkey ? `[${hotkey.hotkey}]` : `[none]`;
        
        // Find the preceding sibling which is the name span
        const nameSpan = timer.previousElementSibling;
        if (nameSpan && nameSpan.tagName === 'SPAN') {
            // Insert hotkeySpan after nameSpan but before timer
            nameSpan.insertAdjacentElement('afterend', hotkeySpan);
        }
    });
}


// Hotkeys laden
export function loadHotkeysMission() {
    const hotkeyList = core.getHotkeys();
    if(settings.loadSetting('showHotkeysMission')){
        showHotkeys(hotkeyList);
    }
    if (!hotkeyList) return;
    hotkeyList.forEach(h => {
        hotkeys(h.hotkey, function(event, handler){
            event.preventDefault()
            triggerAao(h.id);
            toast.info(`Hotkey ${h.hotkey} - ${h.name} - ${h.id} wurde gedrückt!`, 1000);
        });
    });
}

// AAO auslösen
function triggerAao(id) {
    const aaoButton = document.querySelector(`#aao_${id}`);
    if (aaoButton) aaoButton.click();
}

// // Event Listener für Hotkey
// document.addEventListener('keydown', function(e) {
//     const hotkeys = loadHotkeys();
//     const pressedKey = `${e.ctrlKey ? 'Ctrl+' : ''}${e.shiftKey ? 'Shift+' : ''}${e.altKey ? 'Alt+' : ''}${e.key.toUpperCase()}`;

//     Object.keys(hotkeys).forEach(id => {
//         if (hotkeys[id] === pressedKey) {
//             e.preventDefault();
//             triggerAao(id);
//         }
//     });
// });