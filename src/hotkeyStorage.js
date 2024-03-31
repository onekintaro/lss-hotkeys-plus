// Hotkeys laden und speichern
function loadHotkeys() {
    return JSON.parse(localStorage.getItem('customAaoHotkeys') || '{}');
}

function saveHotkey(id, name, hotkey) {
    if (!id) return;

    const hotkeys = loadHotkeys();
    hotkeys[id] = {
        id: id,
        name: name,
        hotkey: hotkey
    };
    localStorage.setItem('customAaoHotkeys', JSON.stringify(hotkeys));
    return true
}