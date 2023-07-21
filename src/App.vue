<script>

// import HomeView from './views/HomeView.vue';
import SiteHeader from './components/SiteHeader.vue';
import SiteFooter from './components/SiteFooter.vue';



export default {

    data() {
        return {

        }

    },
    components: {
        SiteHeader,
        SiteFooter
    },
    methods: {

    },
    mounted() {
    }

}
</script>

<template>
    <SiteHeader />
    <router-view></router-view>
    <SiteFooter></SiteFooter>
</template>

<style lang="scss"></style>
