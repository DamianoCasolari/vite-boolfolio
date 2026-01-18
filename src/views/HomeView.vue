<script>
import axios from 'axios';
    import * as bootstrap from 'bootstrap';
import SiteHeader from '../components/SiteHeader.vue';
import SiteMain from '../components/SiteMain.vue';
import SiteWelcomeModal from '../components/SiteWelcomeModal.vue';


export default {
    name: 'HomeView',
    data() {
        return {

        }

    },
    components: {
        SiteHeader,
        SiteMain,
        SiteWelcomeModal

    },
    methods: {

    },
    mounted() {
        // mostra la modale solo la prima volta
        if (localStorage.getItem('welcomeModalShown') === '1') return;

        const el = document.getElementById('welcomeModal');
        if (!el) return;

        const instance =
            bootstrap.Modal.getInstance(el) || new bootstrap.Modal(el);

        instance.show();

        localStorage.setItem('welcomeModalShown', '1');
    }

}
</script>

<template>
    <SiteMain />
    <SiteWelcomeModal />
</template>

<style lang="scss"></style>
