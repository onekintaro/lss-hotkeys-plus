// Überprüft, ob die aktuelle Seite genau /aaos ist.
export function isAaoPage() {
    return /^\/aaos\/?$/.test(window.location.pathname);
}

// Prüft, ob die aktuelle Seite eine Edit-Seite innerhalb von /aaos ist.
export function isAaoEditPage() {
    return /^\/aaos\/\d+\/edit\/?$/.test(window.location.pathname);
}

// Prüft, ob die aktuelle Seite eine Missions-Seite ist.
export function isMissionsPage() {
    return /^\/missions/.test(window.location.pathname);
}