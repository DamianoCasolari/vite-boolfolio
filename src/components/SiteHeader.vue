<script>
    import { languageState } from "../assets/js/language.js";

    export default {


        name: "SiteHeader",
        data() {
            return {
                headerScroll: true,
                lastPosition: 0,
                languageState 
            }
        },
        components: {


        },

        methods: {
            scrollFunction() {
                const currentPosition = window.scrollY;
                if (currentPosition > 66) {
                    if (currentPosition > this.lastPosition) {
                        this.headerScroll = false;
                    } else {
                        this.headerScroll = true;
                    }
                    this.lastPosition = currentPosition;
                }
            },
            resetHeader() {
                this.headerScroll = true;

            },
            toggleLang() {
                this.languageState.toggle();
            }
        },
        watch: {
            $route(to, from) {
                this.resetHeader();
            }
        },

        mounted() {
            window.addEventListener('scroll', this.scrollFunction);
            window.addEventListener('scroll', function () {
                var scrollTop = window.scrollY || document.documentElement.scrollTop;
                var opacity = 0.8 - (scrollTop / 1000); // Regola il valore 1000 per determinare la velocità di dissolvenza

                var shadowLine = document.querySelector('.shadow_line');
                shadowLine.style.opacity = opacity;
            });
        }
    }

</script>
<template>
    <div class="shadow_line"></div>
    <header>
        <nav class="navbar navbar-expand-md shadow-sm position-fixed w-100 top-0 z_index header_shadow bg_color"
            :class="headerScroll ? 'header_on' : 'header_off'">
            <div class="container d-flex justify-content-between">
                <nav class="d-flex">
                    <router-link :to="{ 'name': 'home' }" class="nav-link">
                        <span class="fw-semibold text-dark mx-2 underline-on-hover  "
                            :class="{ 'selected_link': $route.name === 'home' }">Home</span>
                    </router-link>
                    <router-link :to="{ 'name': 'about' }" class="nav-link about_me_link">
                        <span class=" fw-semibold text-dark mx-2 underline-on-hover"
                            :class="{ 'selected_link': $route.name === 'about' }">{{ languageState.eng_lan ? 'About me' : 'Chi sono' }}</span>
                    </router-link>
                    <router-link :to="{ 'name': 'contacts' }" class="nav-link ">
                        <span class="fw-semibold text-dark mx-2 underline-on-hover"
                            :class="{ 'selected_link': $route.name === 'contacts' }">{{ languageState.eng_lan ? 'Contacts' : 'Contatti' }}</span>
                    </router-link>
                </nav>
                <!-- <div class="logo_container">
                    <a class="navbar-brand d-flex align-items-center justify-content-start mx-1 logo_filter" href="#">
                        <img class="opacity-0" src="../assets/img/logocd_gray.png " alt="DC Logo" height="60">

                    </a>
                </div> -->
                <div class="logo_container d-flex">
                    <button @click="toggleLang"
                        class="navbar-brand border-0 bg-transparent d-flex align-items-center justify-content-start mx-2 p-0 logo_filter lighter scale_hover">
                        <svg v-if="!languageState.eng_lan" xmlns="http://www.w3.org/2000/svg" width="35" height="60" fill="#212529"
                            viewBox="0 -960 960 960">
                            <path
                                d="M160-120v-66.67h640V-120H160Zm154-146.67q-64 0-109-44.66Q160-356 160-420v-420h653.33q27.5 0 47.09 19.58Q880-800.83 880-773.33v146.66q0 27.5-19.58 47.09Q840.83-560 813.33-560h-90.66v140q0 64-45 108.67-45 44.66-109 44.66H314Zm0-506.66h342-429.33H314Zm408.67 146.66h90.66v-146.66h-90.66v146.66ZM568.65-333.33q35.02 0 61.18-26.17Q656-385.67 656-420v-353.33H398V-746l71.33 58q1.34 1.33 8.67 17.33V-514q0 9.07-6.67 15.87-6.66 6.8-16.66 6.8h-154q-10 0-16.67-6.8-6.67-6.8-6.67-15.87v-156.67q0-3.33 8.67-17.33l72-58v-27.33H226.67V-420q0 34.33 26.5 60.5T314-333.33h254.65ZM358-773.33h40-40Z" />
                        </svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" width="35" height="60" fill="#212529"
                            viewBox="0 -960 960 960">
                            <path
                                d="M480-80 80-683.33q85.67-72 187.5-114.34Q369.33-840 480-840t212.5 42.17q101.83 42.16 187.5 114.5L480-80Zm0-119.33L791.33-668q-69.66-46.33-148.44-75.83-78.79-29.5-162.89-29.5-84.36 0-162.85 29.5-78.48 29.5-148.48 75.83L480-199.33Zm-106.63-364q23.63 0 40.13-16.54 16.5-16.54 16.5-40.17 0-23.63-16.54-40.13-16.54-16.5-40.17-16.5-23.62 0-40.12 16.54-16.5 16.54-16.5 40.17 0 23.63 16.54 40.13 16.53 16.5 40.16 16.5Zm106.67 210q23.63 0 40.13-16.54 16.5-16.54 16.5-40.17 0-23.63-16.54-40.13-16.54-16.5-40.17-16.5-23.63 0-40.13 16.54-16.5 16.54-16.5 40.17 0 23.63 16.54 40.13 16.54 16.5 40.17 16.5Zm1.96 154Z" />
                        </svg>
                    </button>
                    <a class="navbar-brand d-flex align-items-center justify-content-start mx-2 logo_filter lighter scale_hover"
                        href="https://www.linkedin.com/in/damiano-casolari/" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="60" fill="#212529"
                            class="bi bi-linkedin lighter" viewBox="0 0 16 16">
                            <path
                                d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                        </svg>

                    </a>
                    <!-- <a class="navbar-brand  media_none align-items-center justify-content-start mx-2 logo_filter lighter scale_hover"
                        href="https://github.com/DamianoCasolari?tab=repositories" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="60" fill="#212529"
                            class="bi bi-github lighter" viewBox="0 0 16 16">
                            <path
                                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                        </svg>

                    </a> -->
                </div>

            </div>
        </nav>
    </header>
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
        // background-image: url(../assets/img/Default_minimal_brush_strokes_with_very_bright_colorsadss_on_to_ba_0.jpg);
        background: linear-gradient(141deg, #ccc 25%, #eee 40%, #ddd 55%);
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
