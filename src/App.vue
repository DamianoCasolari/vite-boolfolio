<script>
import axios from 'axios';
import SiteHeader from './components/SiteHeader.vue';
import SiteMain from './components/views/SiteMain.vue';


export default {

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
    <SiteHeader />
    <SiteMain />
</template>

<style lang="scss"></style>
