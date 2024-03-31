// Erstelle edit Modal
export function createModal() {
  // Modal Container
  const modalContainer = document.createElement("div");
  modalContainer.className = "modal fade";
  modalContainer.id = "hotkeyModal";
  modalContainer.tabIndex = -1;
  modalContainer.role = "dialog";
  modalContainer.innerHTML = `
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title" id="hotkeyModalLabel">Hotkey setzen</h4>
            </div>
            <div class="modal-body">
                <input type="text" class="form-control" id="hotkeyInput" placeholder="Hotkey eingeben (z.B. Ctrl+Alt+S)">
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" id="closeHotkeyModal">Schließen</button>
                <button type="button" class="btn btn-primary" id="saveHotkeyButton">Speichern</button>
            </div>
        </div>
    </div>`;

  // Event-Handler für Schließen-Button
  modalContainer.querySelector(".close").addEventListener("click", function () {
    modalContainer.classList.remove("in");
    modalContainer.style.display = "none";
  });

  // Event-Handler für Speichern-Button
  modalContainer
    .querySelector("#saveHotkeyButton")
    .addEventListener("click", function () {
      const hotkey = document.getElementById("hotkeyInput").value;
      const aaoId = modalContainer.getAttribute("data-aao-id");
      saveHotkey(aaoId, hotkey);
      modalContainer.classList.remove("in");
      modalContainer.style.display = "none";
    });

  modalContainer
    .querySelector("#closeHotkeyModal")
    .addEventListener("click", function () {
      modalContainer.classList.remove("in");
      modalContainer.style.display = "none";
    });

  document.body.appendChild(modalContainer);
}

export function openHotkeyModal(aaoId, name) {
    const modal = document.getElementById('hotkeyModal');
    const label = modal.querySelector('.modal-title');
    label.textContent = `Hotkey für ${name} setzen`;

    // Setze AAO-ID als Datenattribut für späteren Gebrauch
    modal.setAttribute('data-aao-id', aaoId);
    modal.style.display = 'block';
    modal.classList.add('in');
}