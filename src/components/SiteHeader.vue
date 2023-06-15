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
            if (currentPosition > 66) {
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
    <nav class="navbar navbar-expand-md bg_color shadow-sm position-fixed w-100 top-0 z_index header_shadow disappear"
        :class="headerScroll ? 'header_on' : 'header_off'">
        <div class="container d-flex justify-content-between bg-transparent">
            <div class="logo_container">
                <a class="navbar-brand d-flex align-items-center justify-content-start mx-1" href="#">
                    <img class="" src="../assets/img/dc_trsp.png " alt="DC Logo" height="40">
                </a>
            </div>
            <nav>
                <span class="font_w500 text-dark mx-2">Projects</span>
                <span class="font_w500 text-dark mx-2">Contacts</span>
            </nav>


        </div>
    </nav>
</template>

<style lang="scss" scoped>
.header_on {
    animation: on 0.3s linear forwards;

}

.header_off {
    animation: off 0.3s linear forwards;
}

.header_shadow {
    filter: drop-shadow(3px 3px 4px rgb(77, 77, 77));
    border-radius: 0 0 15px 15px;
}

.bg_color {
    background-image: url(../assets/img/Default_minimal_brush_strokes_with_very_bright_colorsadss_on_to_ba_0.jpg);
    background-position: top;
}


@keyframes on {

    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@keyframes off {

    from {
        opacity: 1;

    }

    to {
        opacity: 0;


    }
}
</style>
