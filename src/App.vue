<script>

// import HomeView from './views/HomeView.vue';
import SiteHeader from './components/SiteHeader.vue';



export default {

    data() {
        return {

        }

    },
    components: {
        SiteHeader
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
</template>

<style lang="scss"></style>
