<script>
    import SiteMain from '../components/SiteMain.vue';
    import SiteWelcomeModal from '../components/SiteWelcomeModal.vue';
    import OfferToast from '../components/OfferToast.vue';

    export default {
        name: 'HomeView',
        components: {
            SiteMain,
            SiteWelcomeModal,
            OfferToast,
        },
    }
</script>

<template>
    <SiteMain />
    <SiteWelcomeModal />
    <OfferToast />
</template>

<style lang="scss"></style>
