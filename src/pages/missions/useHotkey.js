// AAO auslösen
function triggerAao(id) {
    const aaoButton = document.querySelector(`#aao_${id}`);
    if (aaoButton) aaoButton.click();
}

// Event Listener für Hotkey
document.addEventListener('keydown', function(e) {
    const hotkeys = loadHotkeys();
    const pressedKey = `${e.ctrlKey ? 'Ctrl+' : ''}${e.shiftKey ? 'Shift+' : ''}${e.altKey ? 'Alt+' : ''}${e.key.toUpperCase()}`;

    Object.keys(hotkeys).forEach(id => {
        if (hotkeys[id] === pressedKey) {
            e.preventDefault();
            triggerAao(id);
        }
    });
});