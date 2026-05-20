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
            }

        },
        computed: {
            isReady() {
                return this.appReady || this.$route.name !== 'home';
            }
        },
        components: {
            SiteHeader,
            SiteFooter,
            CookieBanner,
            OfferToast,
            SiteWelcomeModal,
        },
        methods: {

        },
        mounted() {
            console.log("SEGUI IL CONIGLIO BIANCO 🐇");

        }

    }
</script>

<template>
    <SiteHeader v-if="isReady" />
    <router-view></router-view>
    <SiteFooter v-if="isReady" />
    <CookieBanner />
    <OfferToast />
    <SiteWelcomeModal />
</template>

<style lang="scss"></style>
