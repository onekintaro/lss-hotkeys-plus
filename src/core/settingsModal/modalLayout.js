import Core from "@core/core";

class SettingsModalLayout {

  constructor() {
    this.core = new Core();

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
    //modalDialog.style.maxWidth = "350px";

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
      

    // Modal Footer
    const closeButtonFooter = document.createElement("button");
    closeButtonFooter.type = "button";
    closeButtonFooter.className = "btn btn-default btn-xs";
    closeButtonFooter.setAttribute("data-dismiss", "modal");
    closeButtonFooter.setAttribute("aria-label", "Close");
    closeButtonFooter.textContent = "Close";



    modalFooter.appendChild(closeButtonFooter);

    this.container = modalContainer,
    this.title = modalTitle,
    this.base = {
      header: modalHeader,
      body: modalBody,
      footer: modalFooter
    }
    this.buttons = {
      close: closeButton,
      cancel: closeButtonFooter,
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
    //this.core.updateAAOConfigButtons();
  }

}

export default SettingsModalLayout;