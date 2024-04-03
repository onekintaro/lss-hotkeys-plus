const warnMsg = `<div style="margin-bottom: 3px;"><strong>Warnung:</strong></div>
<div style="margin-bottom: 3px;">
Zusätzlich lassen sich auch die Standard-Hotkeys verwenden.<br>
Es sollte jedoch darauf geachtet werden, keine Konflikte zwischen den Hotkeys zu verursachen, da die ursprünglichen Hotkeys aktiv bleiben.<br>
Es wird empfohlen, die Standard-Hotkeys nicht zu verwenden, wenn AAO Hotkeys Plus genutzt wird.
</div>`;

export function warnDefault() {
    const aaopHotkey = "Ctrl+Alt+S[PH]";
    const hotkey = document.querySelector('.aao_hotkey');
    const warn = document.createElement('div');
    warn.className = 'alert alert-warning';
    warn.style.fontSize = '12px';
    warn.style.marginBottom = '0';
    warn.style.padding = '10px';
    if(aaopHotkey){
        warn.innerHTML = warnMsg + '<div>In AAO Hotkeys Plus wurde folgender Hotkey für diese AAO gesetzt: <strong>' + aaopHotkey + '</strong></div>';
    } else {
        warn.innerHTML = warnMsg + '<div>In AAO Hotkeys Plus wurde noch kein Hotkey für diese AAO gesetzt.</div>';
    }
    hotkey.querySelector('.col-sm-9').appendChild(warn)

}