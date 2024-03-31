export function isAaoPage() {
    return window.location.href.includes('/aaos');
}

export function isMissionsPage() {
    const currentUrl = new URL(window.location.href);
    return currentUrl.pathname.startsWith('/missions');
}
