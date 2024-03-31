import { SVG_ICON } from "./const";
import { openHotkeyModal } from "./modal";

export function placeEditButton() {
    const aaoButtons = document.querySelectorAll('.aao_btn_group');

    aaoButtons.forEach(group => {
        const editButton = group.querySelector('a[href$="/edit"]');
        if (editButton) {
            const aaoId = editButton.href.split('/').pop();
            const name = editButton.textContent.trim();
            const configButton = addHotkeyConfigButton(group, aaoId, name, editButton.style.cssText);
            editButton.after(configButton);
        }
    });
}

function addHotkeyConfigButton(group, aaoId, name, style) {
    // Erstelle den Button
    const configButton = document.createElement('button');

    configButton.innerHTML = SVG_ICON;
    const svgElement = configButton.firstChild;
    svgElement.style.width = '10px';
    svgElement.style.height = '10px';
    svgElement.style.fill = 'currentColor';


    //configButton.textContent = '⚙️'; // Emoji für das Zahnrad-Symbol
    configButton.classList.add('btn', 'btn-xs', 'btn-default');
    configButton.style.cssText = style


    // Füge das Event hinzu, um das Modal zu öffnen
    configButton.addEventListener('click', () => openHotkeyModal(aaoId, name));

    return configButton;
}