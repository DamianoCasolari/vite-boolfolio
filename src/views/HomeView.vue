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
    <!-- <div class="container position-relative"> -->
    <SiteMain />
    <!-- </div> -->
</template>

<style lang="scss"></style>
