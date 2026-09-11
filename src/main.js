import { createApp } from 'vue';
import './styles/general.scss';
import App from './App.vue';
import * as bootstrap from 'bootstrap';
import { router } from './router.js';
import { hasAnalyticsConsent, loadGoogleAnalytics } from './assets/js/analytics';
import { setPageMeta, setLocalBusinessJsonLd } from './assets/js/seo.js';

const app = createApp(App);

// Se l'utente aveva già accettato, carica GA
if (hasAnalyticsConsent()) {
    loadGoogleAnalytics();
}

setLocalBusinessJsonLd();

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
        path: to.fullPath,
    });
});

app.use(router).mount('#app');