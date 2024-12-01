import { createApp } from 'vue';
import './styles/general.scss';
import App from './App.vue';
// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap';
import { router } from './router.js';

const app = createApp(App);

// Tracciamento delle viste di pagina con Google Analytics
router.afterEach((to) => {
    if (window.gtag) {
        window.gtag('config', 'G-CDZPGX7L7Z', {
            page_path: to.fullPath,
        });
    }
});

// Usa il router e monta l'app
app.use(router).mount('#app');

