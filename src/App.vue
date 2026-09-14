<script>

    // import HomeView from './views/HomeView.vue';
    import SiteHeader from './components/SiteHeader.vue';
    import SiteFooter from './components/SiteFooter.vue';
    import CookieBanner from './components/CookieBanner.vue';
    import OfferToast from './components/OfferToast.vue';
    import SiteWelcomeModal from './components/SiteWelcomeModal.vue';
    import { appReady, languageState } from './assets/js/language.js';



    export default {

        data() {
            return {
                appReady,
                languageState,
            }
        },
        computed: {
            isReady() {
                return this.appReady || this.$route.name !== 'home';
            },
        },
        components: {
            SiteHeader,
            SiteFooter,
            CookieBanner,
            OfferToast,
            SiteWelcomeModal,
        },
        methods: {},
        mounted() {
            console.log("SEGUI IL CONIGLIO BIANCO 🐇");
        }

    }
</script>

<template>
    <!-- Invisibile finché non ci si arriva col Tab: permette di saltare l'intestazione -->
    <a href="#main-content" class="visually-hidden-focusable skip_link">{{ languageState.eng_lan ? 'Skip to content' : 'Vai al contenuto' }}</a>
    <SiteHeader v-if="isReady" />
    <main id="main-content" tabindex="-1">
        <router-view></router-view>
    </main>
    <SiteFooter v-if="isReady && $route.name !== 'services' && $route.name !== 'contacts' && $route.name !== 'about' && $route.name !== 'privacyPolicy' && $route.name !== 'cookiePolicy' && $route.name !== 'PageNotFound'" />
    <CookieBanner v-if="isReady" />
    <OfferToast />
    <SiteWelcomeModal />
</template>

<style lang="scss">
    .skip_link:focus {
        position: fixed !important;
        top: 8px;
        left: 8px;
        z-index: 10001;
        background: #1c1c1c;
        color: #fff;
        padding: 8px 16px;
        border-radius: 999px;
        text-decoration: none;
    }

    // il contenitore riceve il focus solo dal link "Vai al contenuto": nessun bordo attorno alla pagina
    #main-content:focus {
        outline: none;
    }
</style>
