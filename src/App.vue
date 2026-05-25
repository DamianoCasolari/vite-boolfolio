<script>

    // import HomeView from './views/HomeView.vue';
    import SiteHeader from './components/SiteHeader.vue';
    import SiteFooter from './components/SiteFooter.vue';
    import CookieBanner from './components/CookieBanner.vue';
    import OfferToast from './components/OfferToast.vue';
    import SiteWelcomeModal from './components/SiteWelcomeModal.vue';
    import { appReady } from './assets/js/language.js';



    export default {

        data() {
            return {
                appReady,
                firstLoad: true,
            }
        },
        computed: {
            isReady() {
                return this.appReady || this.$route.name !== 'home';
            },
            showInitialLoader() {
                return this.firstLoad && this.$route.name !== 'home';
            }
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
            setTimeout(() => { this.firstLoad = false; }, 600);
        }

    }
</script>

<template>
    <div v-if="showInitialLoader" class="bg_snow vh100 d-flex flex-column align-items-center justify-content-center">
        <div class="dc-loader" role="status" aria-label="Loading">
            <div class="dc-loader__glow"></div>
            <div class="dc-loader__logo-wrap">
                <img src="/dc-loader2.png" alt="DC Logo" class="dc-loader__logo" />
            </div>
            <span class="dc-loader__pixel dc-loader__pixel--1"></span>
            <span class="dc-loader__pixel dc-loader__pixel--2"></span>
            <span class="dc-loader__pixel dc-loader__pixel--3"></span>
            <span class="dc-loader__pixel dc-loader__pixel--4"></span>
            <span class="dc-loader__pixel dc-loader__pixel--5"></span>
        </div>
    </div>
    <template v-else>
        <SiteHeader v-if="isReady" />
        <router-view></router-view>
        <SiteFooter v-if="isReady && $route.name !== 'services' && $route.name !== 'contacts'" />
    </template>
    <CookieBanner />
    <OfferToast />
    <SiteWelcomeModal />
</template>

<style lang="scss"></style>
