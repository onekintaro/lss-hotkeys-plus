import SVG_hotkey_icon from "@assets/svg/hotkeyIcon.svg";
import ModalCore from "@core/modal/modalCore";
import { getHotkey, loadSetting } from "@core/hotkeyCore";

export function placeEditButton() {
    const aaoButtons = document.querySelectorAll('.aao_btn_group');

    aaoButtons.forEach(group => {
        const editButton = group.querySelector('a[href$="/edit"]');
        if (editButton) {
            const url = editButton.getAttribute('href');
            const match = /aaos\/(\d+)\/edit/.exec(url);
            if (match) {
                const aaoId = match[1]; // Die ID ist im ersten Capturing-Group
                const name = editButton.textContent.trim();
                const configButton = addHotkeyConfigButton(group, aaoId, name, editButton.style.cssText);
                editButton.after(configButton);
            }
        }
        // const aaoId = editButton.href.split('/').pop();
        // console.log(editButton.href);
        //
        // const configButton = addHotkeyConfigButton(group, aaoId, name, editButton.style.cssText);
        // editButton.after(configButton);
    });
}

function addHotkeyConfigButton(group, aaoId, name, style) {
    const hotkey = getHotkey(aaoId);
    const hotkeyVisible = loadSetting('showHotkeys');
    const hotkeyText = document.createElement('span');
    if(hotkey) {
        hotkeyText.textContent = hotkey ? `[${hotkey}]` : '[none]';
    } else {
        hotkeyText.textContent = ' [none]';
    }
    // Erstelle den Button
    const configButton = document.createElement('button');

    if (hotkeyVisible) {
        configButton.innerHTML = `${SVG_hotkey_icon} ${hotkeyText.textContent}`;
    }else {
        configButton.innerHTML = SVG_hotkey_icon;
    }
    const svgElement = configButton.querySelector('svg');
    svgElement.style.width = '12px';
    svgElement.style.height = '12px';
    svgElement.style.fill = 'currentColor';

    configButton.setAttribute('data-aao-id', aaoId);
    configButton.classList.add('hotkeyConfigButton','btn', 'btn-xs', 'btn-default');
    configButton.style.cssText = style

    //configButton.addEventListener('click', () => openHotkeyModal(aaoId, name));
    configButton.addEventListener('click', () => {
        const modal = new ModalCore(aaoId, name);
        modal.open();
        modal.input.focus();
    });

    return configButton;
}
