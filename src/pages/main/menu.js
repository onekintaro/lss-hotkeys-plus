import SettingsModalCore from "@core/settingsModal/modalCore";

export function addMenuEntry() {
  if(document.getElementById("logout_button") !== null) {
    const divider = document.createElement("li");
    divider.setAttribute("class", "divider");
    divider.setAttribute("role", "presentation");

    document.getElementById("logout_button").parentElement.parentElement.append(divider);

    const button = document.createElement("a");
    button.setAttribute("href", "javascript: void(0)");
    button.append(" Hotkeys+ Settings");
    button.addEventListener("click", event => menuEntryClick(event));

    const li = document.createElement("li");
    li.appendChild(button);

    document.getElementById("logout_button").parentElement.parentElement.append(li);
  }
}

function menuEntryClick(event) {
  event.preventDefault();
  const modal = new SettingsModalCore();
        modal.open();

}