<script>
import axios from 'axios';
import SiteHeader from '../components/SiteHeader.vue';
import SiteMain from '../components/SiteMain.vue';


export default {
    name: 'HomeView',
    data() {
        return {

        }

    },
    components: {
        SiteHeader,
        SiteMain,

    },
    methods: {

    },
    mounted() {
    }

}
</script>

<template>
    <!-- <SiteHeader /> -->
    <SiteMain />
</template>

<style lang="scss"></style>
