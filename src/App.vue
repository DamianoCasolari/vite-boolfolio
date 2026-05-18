<script>

    // import HomeView from './views/HomeView.vue';
    import SiteHeader from './components/SiteHeader.vue';
    import SiteFooter from './components/SiteFooter.vue';
    import CookieBanner from './components/CookieBanner.vue';
    import OfferToast from './components/OfferToast.vue';
    import SiteWelcomeModal from './components/SiteWelcomeModal.vue';



    export default {

        data() {
            return {

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
    <SiteHeader />
    <router-view></router-view>
    <SiteFooter></SiteFooter>
    <CookieBanner />
    <OfferToast />
    <SiteWelcomeModal />
</template>

<style lang="scss"></style>
