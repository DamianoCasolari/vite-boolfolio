import { createApp, watch } from 'vue';
import './styles/general.scss';
import App from './App.vue';
import * as bootstrap from 'bootstrap';
import { router } from './router.js';
import { hasAnalyticsConsent, loadGoogleAnalytics } from './assets/js/analytics';
import { setPageMeta } from './assets/js/seo.js';
import { appReady } from './assets/js/language.js';

const app = createApp(App);

// Se l'utente aveva già accettato, carica GA
if (hasAnalyticsConsent()) {
    loadGoogleAnalytics();
}

// Tracciamento viste pagina solo se GA esiste + title/meta per-pagina
router.afterEach((to) => {
    if (window.gtag) {
        window.gtag('config', 'G-CDZPGX7L7Z', {
            page_path: to.fullPath,
        });
    }

    setPageMeta({
        title: to.meta?.title,
        description: to.meta?.description,
        robots: to.meta?.robots,
        path: to.path,
    });
});

// Lo shell loader sta nell'HTML (index.html) ed e' a schermo dal primo
// paint: va tolto solo quando c'e' una pagina completa da mostrare. Il
// rAF serve a far partire la dissolvenza nel frame in cui Vue ha gia'
// applicato il suo ultimo aggiornamento, senza stati intermedi visibili.
function removeShellLoader() {
    const shell = document.getElementById('app_shell_loader');
    if (!shell) return;

    requestAnimationFrame(() => {
        shell.classList.add('is-hidden');
        shell.addEventListener('transitionend', () => shell.remove(), { once: true });
        // se la transizione non parte (tab in background, reduced motion)
        setTimeout(() => shell.remove(), 1000);
    });
}

app.use(router);

// Si monta solo a rotta risolta: prima, `$route.name` e' `undefined` e i
// controlli "rotta diversa da home" sparsi in App.vue risultano veri su una
// rotta che ancora non esiste, montando header/footer/banner su una pagina
// senza contenuto.
router.isReady().then(() => {
    app.mount('#app');

    // La home si dichiara pronta da sola (dati + foto hero) via `appReady`;
    // le altre rotte non hanno nulla da attendere oltre al mount.
    if (router.currentRoute.value.name !== 'home' || appReady.value) {
        removeShellLoader();
        return;
    }

    const stopWaiting = watch(
        appReady,
        (ready) => {
            if (!ready) return;
            stopWaiting();
            removeShellLoader();
        },
        { flush: 'post' }
    );
});