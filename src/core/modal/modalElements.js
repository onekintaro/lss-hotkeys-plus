import SVG_deleteInput from "@assets/svg/hotkeyDeleteInput.svg";
import SVG_deleteIcon from "@assets/svg/hotkeyDelete.svg";
import { updateAllConfigButtons } from "@aaos/hotkeyMenu";

class ModalElements {

  constructor() {
    // Initialisiere das Modal beim Erstellen einer neuen Instanz
    this.modalBuilder();
  }

  modalBuilder() {

    // Modal Frame Structure
    const modalContainer = document.createElement("div");
    modalContainer.className = "modal fade";
    modalContainer.tabIndex = -1;
    modalContainer.role = "dialog";

    const modalDialog = document.createElement("div");
    modalDialog.className = "modal-dialog";
    modalDialog.role = "document";
    modalDialog.style.maxWidth = "350px";

    const modalContent = document.createElement("div");
    modalContent.className = "modal-content";

    modalContainer.appendChild(modalDialog);
    modalDialog.appendChild(modalContent);

    // Modal Content Structure
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";

    const modalBody = document.createElement("div");
    modalBody.className = "modal-body";

    const modalFooter = document.createElement("div");
    modalFooter.className = "modal-footer";

    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modalContent.appendChild(modalFooter);

    // Modal Header
    const closeButton = document.createElement("button");
    closeButton.type = "button";
    closeButton.className = "close";
    closeButton.setAttribute("data-dismiss", "modal");
    closeButton.setAttribute("aria-label", "Close");
    closeButton.innerHTML = `<span aria-hidden="true">&times;</span>`;

    // Modal Title
    const modalTitle = document.createElement("h4");
    modalTitle.className = "modal-title";

    modalHeader.appendChild(closeButton);
    modalHeader.appendChild(modalTitle);

    // Modal Body
    const actualHotkeyInfo = document.createElement("div");

    const inputGroup = document.createElement("div");
    inputGroup.className = "input-group";
    inputGroup.style.marginTop = '10px';
    modalBody.appendChild(actualHotkeyInfo);
    modalBody.appendChild(inputGroup);

      // Actual Hotkey Text
      const actualHotkey = document.createElement("span");

      // Hotkey Delete Button
      const deleteButton = document.createElement("button");
      deleteButton.className = "btn btn-danger btn-xs";
      deleteButton.style.paddingBottom = '0';
      deleteButton.style.paddingTop = '3px';
      deleteButton.style.marginLeft = '5px';
      deleteButton.innerHTML = SVG_deleteIcon;
      const svgElementDelete = deleteButton.querySelector('svg');
      svgElementDelete.style.width = '14px';
      svgElementDelete.style.height = '14px';

      actualHotkeyInfo.appendChild(actualHotkey);
      actualHotkeyInfo.appendChild(deleteButton);

      // Hotkey-Input
      const inputField = document.createElement("input");
      inputField.type = "text";
      inputField.className = "form-control";
      inputField.placeholder = "Hotkey eingeben (z.B. Ctrl+Alt+S)";

      // Hotkey-Input Delete Button
      const iDeleteButton = document.createElement("button");
      iDeleteButton.className = "btn btn-danger";
      iDeleteButton.style.paddingBottom = '3px';
      iDeleteButton.innerHTML = SVG_deleteInput;
      const svgElement = iDeleteButton.querySelector('svg');
      svgElement.style.width = '18px';
      svgElement.style.height = '18px';

      const idbSpan = document.createElement("span");
      idbSpan.className = "input-group-btn";

      inputGroup.appendChild(inputField);
      inputGroup.appendChild(idbSpan);
      idbSpan.appendChild(iDeleteButton);

    // Modal Footer
    const closeButtonFooter = document.createElement("button");
    closeButtonFooter.type = "button";
    closeButtonFooter.className = "btn btn-default btn-xs";
    closeButtonFooter.setAttribute("data-dismiss", "modal");
    closeButtonFooter.setAttribute("aria-label", "Close");
    closeButtonFooter.textContent = "Cancel";

    const saveButton = document.createElement("button");
    saveButton.type = "button";
    saveButton.className = "btn btn-success btn-xs";
    saveButton.textContent = "Save";

    const saveCloseButton = document.createElement("button");
    saveCloseButton.type = "button";
    saveCloseButton.className = "btn btn-success btn-xs";
    saveCloseButton.textContent = "Save & Close";

    modalFooter.appendChild(closeButtonFooter);
    modalFooter.appendChild(saveButton);
    modalFooter.appendChild(saveCloseButton);

    this.container = modalContainer,
    this.title = modalTitle,
    this.actualHotkey = actualHotkey,
    this.input = inputField,
    this.base = {
      header: modalHeader,
      body: modalBody,
      footer: modalFooter
    }
    this.buttons = {
      close: closeButton,
      delete: deleteButton,
      reset: iDeleteButton,
      cancel: closeButtonFooter,
      save: saveButton,
      saveClose: saveCloseButton
    }
  }

  open() {
    this.place();
    this.container.classList.add("in");
    this.container.style.display = "block";
  }

  close() {
    this.container.classList.remove("in");
    this.container.style.display = "none";
  }

  place() {
    document.body.appendChild(this.container);
  }

  destroy() {
    this.container.classList.remove("in");
    this.container.style.display = "none";
    this.container.remove();
    updateAllConfigButtons();
  }

}

export default ModalElements;