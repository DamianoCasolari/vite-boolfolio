<script>
export default {


    name: "SiteHeader",
    data() {
        return {
            headerScroll: true,
            lastPosition: 0,
            shadow_on: false,
        }
    },
    components: {


    },
    methods: {
        scrollFunction() {
            this.shadow_on = false
            const currentPosition = window.pageYOffset;
            if (currentPosition > 145.56) {
                this.shadow_on = true
                if (currentPosition > this.lastPosition) {
                    this.headerScroll = false;
                } else {
                    this.headerScroll = true;
                }
                this.lastPosition = currentPosition;
            }
        }
    },

    mounted() {
        window.addEventListener('scroll', this.scrollFunction);
    }
}

</script >
<template>
    <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm position-sticky top-0 z_index">
        <div class="container">
            <a class="navbar-brand d-flex align-items-center" href="#">
                <img src="../assets/img/dc.jpg " alt="DC Logo" height="40">
            </a>

        </div>
    </nav>
</template>


