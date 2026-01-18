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
                        <span class="fw-semibold text-dark mx-1 underline-on-hover  "
                            :class="{ 'selected_link': $route.name === 'home' }">Home</span>
                    </router-link>
                    <router-link :to="{ 'name': 'services' }" class="nav-link about_me_link">
                        <span class=" fw-semibold text-dark mx-1 underline-on-hover"
                            :class="{ 'selected_link': $route.name === 'services' }">{{ languageState.eng_lan ? 'Services' : 'Servizi' }}</span>
                    </router-link>
                    <router-link :to="{ 'name': 'contacts' }" class="nav-link ">
                        <span class="fw-semibold text-dark mx-1 underline-on-hover"
                            :class="{ 'selected_link': $route.name === 'contacts' }">{{ languageState.eng_lan ?
                            'Contact' : 'Contatti' }}</span>
                    </router-link>
                </nav>

                <div class="logo_container d-flex">
                    <a class="navbar-brand align-items-center justify-content-start mx-0 logo_filter lighter scale_hover"
                        href="https://wa.me/3477952189?text=MESSAGGIO" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="60" fill="#212529"
                            viewBox="0 0 640 640">
                            <path
                                d="M476.9 161.1C435 119.1 379.2 96 319.9 96C197.5 96 97.9 195.6 97.9 318C97.9 357.1 108.1 395.3 127.5 429L96 544L213.7 513.1C246.1 530.8 282.6 540.1 319.8 540.1L319.9 540.1C442.2 540.1 544 440.5 544 318.1C544 258.8 518.8 203.1 476.9 161.1zM319.9 502.7C286.7 502.7 254.2 493.8 225.9 477L219.2 473L149.4 491.3L168 423.2L163.6 416.2C145.1 386.8 135.4 352.9 135.4 318C135.4 216.3 218.2 133.5 320 133.5C369.3 133.5 415.6 152.7 450.4 187.6C485.2 222.5 506.6 268.8 506.5 318.1C506.5 419.9 421.6 502.7 319.9 502.7zM421.1 364.5C415.6 361.7 388.3 348.3 383.2 346.5C378.1 344.6 374.4 343.7 370.7 349.3C367 354.9 356.4 367.3 353.1 371.1C349.9 374.8 346.6 375.3 341.1 372.5C308.5 356.2 287.1 343.4 265.6 306.5C259.9 296.7 271.3 297.4 281.9 276.2C283.7 272.5 282.8 269.3 281.4 266.5C280 263.7 268.9 236.4 264.3 225.3C259.8 214.5 255.2 216 251.8 215.8C248.6 215.6 244.9 215.6 241.2 215.6C237.5 215.6 231.5 217 226.4 222.5C221.3 228.1 207 241.5 207 268.8C207 296.1 226.9 322.5 229.6 326.2C232.4 329.9 268.7 385.9 324.4 410C359.6 425.2 373.4 426.5 391 423.9C401.7 422.3 423.8 410.5 428.4 397.5C433 384.5 433 373.4 431.6 371.1C430.3 368.6 426.6 367.2 421.1 364.5z" />
                        </svg>

                    </a>
                    <a class="navbar-brand d-flex align-items-center justify-content-start mx-2 logo_filter lighter scale_hover"
                        href="https://www.linkedin.com/in/damiano-casolari/" target="_blank">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="60" fill="#212529"
                            class="bi bi-linkedin lighter" viewBox="0 0 16 16">
                            <path
                                d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                        </svg>

                    </a>
                    <button type="button" @click="toggleLang" data-bs-toggle="tooltip" data-bs-trigger="hover" 
                        title="Language"
                        class="navbar-brand border-0 bg-transparent d-flex align-items-center justify-content-start mx-0 p-0 logo_filter lighter scale_hover">
                        <svg v-if="!languageState.eng_lan" xmlns="http://www.w3.org/2000/svg" width="35" height="60"
                            fill="#212529" viewBox="0 -960 960 960">
                            <path
                                d="M160-120v-66.67h640V-120H160Zm154-146.67q-64 0-109-44.66Q160-356 160-420v-420h653.33q27.5 0 47.09 19.58Q880-800.83 880-773.33v146.66q0 27.5-19.58 47.09Q840.83-560 813.33-560h-90.66v140q0 64-45 108.67-45 44.66-109 44.66H314Zm0-506.66h342-429.33H314Zm408.67 146.66h90.66v-146.66h-90.66v146.66ZM568.65-333.33q35.02 0 61.18-26.17Q656-385.67 656-420v-353.33H398V-746l71.33 58q1.34 1.33 8.67 17.33V-514q0 9.07-6.67 15.87-6.66 6.8-16.66 6.8h-154q-10 0-16.67-6.8-6.67-6.8-6.67-15.87v-156.67q0-3.33 8.67-17.33l72-58v-27.33H226.67V-420q0 34.33 26.5 60.5T314-333.33h254.65ZM358-773.33h40-40Z" />
                        </svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" width="35" height="60" fill="#212529"
                            viewBox="0 -960 960 960">
                            <path
                                d="M480-80 80-683.33q85.67-72 187.5-114.34Q369.33-840 480-840t212.5 42.17q101.83 42.16 187.5 114.5L480-80Zm0-119.33L791.33-668q-69.66-46.33-148.44-75.83-78.79-29.5-162.89-29.5-84.36 0-162.85 29.5-78.48 29.5-148.48 75.83L480-199.33Zm-106.63-364q23.63 0 40.13-16.54 16.5-16.54 16.5-40.17 0-23.63-16.54-40.13-16.54-16.5-40.17-16.5-23.62 0-40.12 16.54-16.5 16.54-16.5 40.17 0 23.63 16.54 40.13 16.53 16.5 40.16 16.5Zm106.67 210q23.63 0 40.13-16.54 16.5-16.54 16.5-40.17 0-23.63-16.54-40.13-16.54-16.5-40.17-16.5-23.63 0-40.13 16.54-16.5 16.54-16.5 40.17 0 23.63 16.54 40.13 16.54 16.5 40.17 16.5Zm1.96 154Z" />
                        </svg>
                    </button>
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
