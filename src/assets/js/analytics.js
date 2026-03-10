const GA_ID = 'G-CDZPGX7L7Z';

export function hasAnalyticsConsent() {
    return localStorage.getItem('cookie_consent') === 'accepted';
}

export function loadGoogleAnalytics() {
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

export function acceptCookies() {
    localStorage.setItem('cookie_consent', 'accepted');
    loadGoogleAnalytics();
}

export function rejectCookies() {
    localStorage.setItem('cookie_consent', 'rejected');
}

export function getCookieChoice() {
    return localStorage.getItem('cookie_consent');
}