<script>

    // import HomeView from './views/HomeView.vue';
    import SiteHeader from './components/SiteHeader.vue';
    import SiteFooter from './components/SiteFooter.vue';
    import CookieBanner from './components/CookieBanner.vue';



    export default {

        data() {
            return {

            }

        },
        components: {
            SiteHeader,
            SiteFooter,
            CookieBanner
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
</template>

<style lang="scss"></style>
