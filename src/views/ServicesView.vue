<script>
    import ServicesDesktop from "./ServicesDesktop.vue";
    import ServicesMobile from "./ServicesMobile.vue";
    import { languageState } from "../assets/js/language.js";

    export default {
        name: "ServicesView",
        components: { ServicesDesktop, ServicesMobile },
        data() {
            return {
                isDesktop: window.innerWidth >= 992,
                languageState,
            };
        },
        methods: {
            onResize() {
                this.isDesktop = window.innerWidth >= 992;
            },
        },
        mounted() {
            window.addEventListener("resize", this.onResize, { passive: true });
        },
        unmounted() {
            window.removeEventListener("resize", this.onResize);
        },
    };
</script>

<template>
    <h1 class="visually-hidden">{{ languageState.eng_lan ? 'Services: landing pages, showcase websites and website restyling in Ravenna' : 'Servizi: landing page, siti vetrina e restyling a Ravenna' }}</h1>
    <ServicesDesktop v-if="isDesktop" />
    <ServicesMobile v-else />
</template>
