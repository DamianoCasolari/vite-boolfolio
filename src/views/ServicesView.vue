<script>
    import ServicesDesktop from "./ServicesDesktop.vue";
    import ServicesMobile from "./ServicesMobile.vue";

    export default {
        name: "ServicesView",
        components: { ServicesDesktop, ServicesMobile },
        data() {
            return {
                isDesktop: window.innerWidth >= 992,
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
    <ServicesDesktop v-if="isDesktop" />
    <ServicesMobile v-else />
</template>
