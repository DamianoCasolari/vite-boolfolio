const GA_ID = 'G-CDZPGX7L7Z';

export function hasAnalyticsConsent() {
    return localStorage.getItem('cookie_consent') === 'accepted';
}

export function loadGoogleAnalytics() {
    // flag ufficiale di opt-out di Google: se l'utente riaccetta dopo un rifiuto va rimesso a false
    window[`ga-disable-${GA_ID}`] = false;
    if (window.__gaLoaded) return;
    window.__gaLoaded = true;

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
        window.dataLayer.push(arguments);
    };

    window.gtag('js', new Date());

    window.gtag('config', GA_ID, {
        anonymize_ip: true,
    });
}

// Revoca: GA potrebbe essere già caricato in questa sessione e i suoi cookie già salvati.
// Il flag lo ferma subito; i cookie _ga vanno cancellati su ogni dominio possibile,
// perché GA li scrive sul dominio principale (.damianocasolari.com), non sull'host esatto.
function clearAnalyticsCookies() {
    const parts = window.location.hostname.split('.');
    const domains = [''];
    for (let i = 0; i < parts.length - 1; i++) domains.push('.' + parts.slice(i).join('.'));

    document.cookie
        .split(';')
        .map((c) => c.split('=')[0].trim())
        .filter((name) => /^_ga(_|$)|^_gid$|^_gat/.test(name))
        .forEach((name) => {
            domains.forEach((domain) => {
                document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ''}`;
            });
        });
}

export function acceptCookies() {
    localStorage.setItem('cookie_consent', 'accepted');
    loadGoogleAnalytics();
}

export function rejectCookies() {
    localStorage.setItem('cookie_consent', 'rejected');
    window[`ga-disable-${GA_ID}`] = true;
    clearAnalyticsCookies();
}

export function getCookieChoice() {
    return localStorage.getItem('cookie_consent');
}
