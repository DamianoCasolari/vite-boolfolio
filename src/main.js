import { createApp } from 'vue';
import './styles/general.scss';
import App from './App.vue';
import * as bootstrap from 'bootstrap';
import { router } from './router.js';
import { hasAnalyticsConsent, loadGoogleAnalytics } from './assets/js/analytics';

const app = createApp(App);

// Se l'utente aveva già accettato, carica GA
if (hasAnalyticsConsent()) {
    loadGoogleAnalytics();
}

// Tracciamento viste pagina solo se GA esiste
router.afterEach((to) => {
    if (window.gtag) {
        window.gtag('config', 'G-CDZPGX7L7Z', {
            page_path: to.fullPath,
        });
    }
});

app.use(router).mount('#app');