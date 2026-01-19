<script>
    import * as bootstrap from "bootstrap";
    import PaginationController from './PaginationController.vue';
    import { appearWithScroll, arrowAppearWithScroll } from '../assets/js/utility_functions.js';
    import $ from 'jquery';
    import { languageState } from "../assets/js/language.js";
    import axios from 'axios';
    import { nextTick } from 'vue';

    export default {

        data() {
            return {
                base_URL: 'https://back.damianocasolari.com/',
                projects_API: 'api/projects',
                loading: true,
                projects: [],
                error: null,
                project_button: true,
                ghost: true,
                index: 1,
                intervalFunction: null,
                languageState
            }

        },
        components: {
            PaginationController
        },
        methods: {
            openWelcomeModal() {
                nextTick(() => {
                    const el = document.getElementById("welcomeModal");
                    if (!el) return;

                    const instance = bootstrap.Modal.getInstance(el) || new bootstrap.Modal(el);
                    instance.show();
                });
            },
            getProjects(url) {
                axios.get(url).then(response => {
                    // console.log(response);
                    this.projects = response.data.projects
                    this.loading = false
                }).catch(error => {
                    // console.log(error)
                    this.error = error.message
                })
            },
            getImagePath(path) {
                return this.base_URL + 'storage/' + path
            },
            handleClick() {
                this.project_button = false
            },
            scrollFunction() {
                const section = document.querySelector(".main_container")
                appearWithScroll(section)
            },
            arrowAppearWithScroll() {
                const section = document.querySelector(".main_container")
                const arrow = document.querySelector(".arrow")
                arrowAppearWithScroll(section, arrow)
            },
            toggleAppearWithScroll() {
                window.addEventListener('scroll', () => {

                    if (document.querySelector(".main_container")) {

                        const viewportHeight = window.innerHeight / 10 * 8.5;
                        let div2Position = document.querySelector(".main_container").getBoundingClientRect().top;

                        if (div2Position < viewportHeight) {
                            this.project_button = false;
                            this.ghost = false;
                        } else {
                            this.project_button = true;
                        }
                    }
                });


            },
            rollWord() {

                this.intervalFunction = setInterval(() => {
                    const word1 = document.querySelector(".word" + this.index);
                    // console.log(word1);
                    const word2 = document.querySelector(".word" + ((this.index % 3) + 1));
                    // console.log(word2);
                    word1.classList.add("d-none")
                    word1.classList.remove("drop_animation")
                    word2.classList.add("drop_animation");
                    word2.classList.remove("d-none")
                    this.index = (this.index % 3) + 1

                }, 3000)

            },
            stopIntervalFunction() {
                clearInterval(this.intervalFunction)
            },
            carousel_roll() {
                $(document).ready(function () {
                    function startCarousel() {
                        $(".carousel").animate(
                            {
                                marginLeft: "-150px",
                            },
                            2000,
                            "linear",
                            function () {
                                $(this).css("margin-left", "0");
                                $(this).append($(this).children().first());
                            }
                        );
                    }
                    setInterval(startCarousel, 2000);
                });
            }
        },
        mounted() {

            this.getProjects(this.base_URL + this.projects_API)
            this.scrollFunction()
            this.$nextTick(() => {
                this.arrowAppearWithScroll()
                this.toggleAppearWithScroll()
            })
            setTimeout(() => {
                this.rollWord()
            }, 500);
            this.carousel_roll();


        }, unmounted() {
            clearInterval(this.stopIntervalFunction())
        }

    }
</script>

<template>
    <div v-if="loading" class="bg_snow vh100 d-flex flex-column align-items-center justify-content-center ">
        <div class="spinner">
            <div class="cube1"></div>
            <div class="cube2"></div>
        </div>
    </div>
    <div class="bg_snow" v-show="!loading">

        <div id="top"
            class="jumbotron container rounded-3 vh100 d-flex flex-column align-items-center justify-content-center position-relative">
            <div class="shape_container position-absolute position1">
                <div class="shape "></div>
            </div>
            <div class="shape_container position-absolute position2">
                <div class="shape "></div>
            </div>
            <div
                class="container py-4 mt-0 mt-md-4 mb-2 d-flex flex-wrap  flex-column flex-md-row align-items-center justify-content-center">
                <div class=" ghost3 col-lg-6 z_inde49">
                    <img src="../assets/img/photo.jpg" alt="DC Logo" class="rounded-4 z_inde49 main_photo shadow">
                </div>

                <div class="info_contaienr px-2 pt-3 text-center text-sm-start z_index50">


                    <!-- NEW TITLE -->
                    <div class="animated-title">
                        <div class="text-top ghost3">
                            <div v-if="languageState.eng_lan">
                                <span class="title_size fw-semibold" style="color: #393939;">Hi,</span>
                                <span class="title_size fw-semibold" style="color: #656565;">I'm Damiano</span>
                            </div>
                            <div v-else>
                                <span class="title_size fw-semibold" style="color: #393939;">Ciao,</span>
                                <span class="title_size fw-semibold" style="color: #656565;">Sono Damiano</span>
                            </div>
                        </div>
                        <div class="text-bottom t_duration">
                            <div class="title_size d-flex no-wrap">
                                <div class="wordContainer d-flex roll_container fw-semibold text overflow-hidden"
                                    style="white-space: nowrap; height: 2em;">
                                    <span class="word1 wisteria position-relative"
                                        style="color: #acacac;">Fullstack</span>
                                    <span class="word2 d-none wisteria position-relative"
                                        style="color: #959595;">Backend</span>
                                    <span class="word3 d-none wisteria position-relative"
                                        style="color: #959595;">Frontend</span>
                                </div>
                                &nbsp;
                                <div class="fw-semibold shrink-1" style="color: #acacac;white-space: nowrap;">
                                    web developer
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </div>


        <!-- PROJECTS SIDE  -->

        <section class=" m_main main_container bg-snow" :class="{ 'opacity-0': ghost }">
            <div class="container p_bottom_30" style="position: sticky;top: 86px;">
                <div class="position-sticky d-block d-lg-none" style="top:20px; z-index:10">
                    <h1 class="text-center fw-semibold" style="color:#393939" id="projects">
                        Portfolio
                    </h1>

                    <div class="d-flex justify-content-center mt-4 position-relative">
                        <div class="position-relative">
                            <button type="button" class="badge rounded-pill fs-6 text-bg-dark border-0"
                                @click="openWelcomeModal">
                                {{ languageState.eng_lan ? "2026 Special Offer" : "Offerta 2026" }}
                            </button>
                            <div>
                                <img src="/public/fancyArrow.png" class="fancy_arrow2" alt="">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="scroll_element mb-4 d-flex" style="position: sticky;top: 86px;">
                    <div class="col">
                        <div class=" d-flex justify-content-center mt-4" style="position: sticky;"
                            v-for="(project, index) in projects.data" :style="{ top: `calc(86px + ${index + 1}rem)` }">

                            <!-- Define a single project in its own specific route-link  -->

                            <router-link :to="{ name: 'single-project', params: { 'slug': project.slug } }"
                                class="w-100 d-flex move_up">
                                <div class="card col-md-5 rounded-5 border-0 my_card open_img bg-transparent w-100">
                                    <div class="scroll_effect_image text-center bg-transparent position-relative h-100">
                                        <div
                                            class="d-flex justify-content-center align-items-center bg_dark_trnsp rounded-5 opacity_hover pointer p-2 h-100">
                                            <h4 class="card-title text-white p-2 fw-semibold text_shadow2">
                                                {{ project.title }}</h4>

                                        </div>
                                        <img :src="getImagePath(project.logo)"
                                            class="card-img-top moving_image pointer card_shadow h-100"
                                            :alt="project.title + ' image'" loading="lazy">
                                        <div
                                            class="p-3 fw-semibold text_shadow2 text-white position-absolute top-0 end-0">
                                            {{
                                                project.type.name
                                            }}
                                        </div>
                                    </div>
                                </div>
                            </router-link>

                        </div>
                    </div>
                    <div class="right_main_side col-7 d-none d-lg-flex flex-column justify-content-center align-items-center px-4 py-5"
                        :class="{ 'd-none': ghost }" style="position: sticky;top: 250px;">
                        <div class="right_main_side d-md-flex flex-column justify-content-center align-items-start p-3  "
                            style="position: sticky;top: 250px;">
                            <div class="d-flex justify-content-between align-items-center w-100 mb-2">

                                <h1 class="position-relative fw-semibold mb-0">
                                    {{ languageState.eng_lan ? `Services` : `Servizi` }}
                                </h1>
                                <div
                                    class="d-flex justify-content-center align-items-center pointer position-relative ">
                                    <div>
                                        <img src="/public/fancyArrow.png" class="fancy_arrow" alt="">
                                    </div>
                                    <button type="button"
                                        class="badge rounded-pill offer-badge fs-6 text-bg-dark border-0 d-none d-md-block"
                                        style="cursor:pointer" @click="openWelcomeModal">
                                        {{ languageState.eng_lan ? "2026 Special Offer" : "Offerta 2026" }}
                                    </button>
                                </div>
                            </div>

                            <p class="position-relative">
                                <span v-if="languageState.eng_lan">
                                    I design and develop <b>custom-made websites</b>, tailored to your <b>business
                                        goals</b> and <b>real needs</b>.
                                </span>
                                <span v-else>
                                    Progetto e realizzo <b>siti web su misura</b>, costruiti attorno agli
                                    <b>obiettivi</b> e alle <b>reali esigenze</b> del tuo business.
                                </span>
                            </p>

                            <p class="position-relative">
                                <span v-if="languageState.eng_lan">
                                    Each project is <b>unique</b>: no templates, no <b>pre-packaged solutions</b>. From
                                    the <b>initial idea</b> to the <b>final online release</b>, everything is designed
                                    specifically for you.
                                </span>
                                <span v-else>
                                    Ogni progetto e' <b>unico</b>: niente <b>template preconfezionati</b>, niente
                                    <b>soluzioni standard</b>. Dall'<b>idea iniziale</b> fino alla <b>pubblicazione
                                        online</b>, tutto e' pensato appositamente per te.
                                </span>
                            </p>

                            <p class="position-relative">
                                <span v-if="languageState.eng_lan">
                                    I focus on <b>performance</b>, <b>clarity</b>, <b>responsive design</b> and <b>clean
                                        code</b>, to deliver <b>fast</b>, <b>effective</b> and <b>scalable websites</b>.
                                </span>
                                <span v-else>
                                    Lavoro su <b>performance</b>, <b>chiarezza</b>, <b>design responsive</b> e <b>codice
                                        pulito</b>, per offrire <b>siti veloci</b>, <b>efficaci</b> e <b>pronti a
                                        crescere</b> nel tempo.
                                </span>
                            </p>

                            <!-- COME LAVORO -->
                            <div class="mt-4">
                                <h4 class="position-relative fw-semibold">
                                    {{ languageState.eng_lan ? `How I work` : `Come lavoro` }}
                                </h4>

                                <ul class="work_steps mt-3">
                                    <li class="position-relative">
                                        <strong>1.</strong>
                                        <span v-if="languageState.eng_lan">
                                            <b>Analysis</b> of goals and requirements
                                        </span>
                                        <span v-else>
                                            <b>Analisi</b> degli obiettivi e delle esigenze
                                        </span>
                                    </li>

                                    <li class="position-relative">
                                        <strong>2.</strong>
                                        <span v-if="languageState.eng_lan">
                                            <b>Design</b> of structure and <b>user experience</b>
                                        </span>
                                        <span v-else>
                                            <b>Progettazione</b> della struttura e dell'<b>esperienza utente</b>
                                        </span>
                                    </li>

                                    <li class="position-relative">
                                        <strong>3.</strong>
                                        <span v-if="languageState.eng_lan">
                                            <b>Front-end</b> and <b>back-end development</b>
                                        </span>
                                        <span v-else>
                                            <b>Sviluppo front-end</b> e <b>back-end</b>
                                        </span>
                                    </li>

                                    <li class="position-relative">
                                        <strong>4.</strong>
                                        <span v-if="languageState.eng_lan">
                                            <b>Testing</b>, <b>optimization</b> and <b>online release</b>
                                        </span>
                                        <span v-else>
                                            <b>Test</b>, <b>ottimizzazione</b> e <b>messa online</b>
                                        </span>
                                    </li>
                                </ul>
                            </div>

                            <div class="shape_container position-absolute position3">
                                <div class="shape "></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- PAGINATION SIDE  -->


        <!-- CAROUSEL  -->
        <div class="carousel_container ">
            <div class="container h-100 overflow-hidden d-flex position-relative">
                <div class="shadow_element position-absolute h-100 left-0 bg_snow"></div>
                <div class="shadow_element2 position-absolute h-100 left-0 bg_snow"></div>
                <div class="carousel position-relative">
                    <div class="img_container ">
                        <img src="../assets/img/javascript-ar21.svg" alt="">
                    </div>
                    <div class="img_container">
                        <img src="../assets/img/getbootstrap-ar21.svg" alt="">
                    </div>
                    <div class="img_container">
                        <img src="../assets/img/laravel-ar21.svg " alt="">
                    </div>
                    <div class="img_container">
                        <img src="../assets/img/git-scm-ar21.svg " alt="">
                    </div>
                    <div class="img_container">
                        <img src="../assets/img/mysql-ar21.svg" alt="">
                    </div>
                    <div class="img_container">
                        <img src="../assets/img/nodejs-ar21.svg" alt="">
                    </div>
                    <div class="img_container">
                        <img src="../assets/img/npmjs-ar21.svg" alt="">
                    </div>
                    <div class="img_container">
                        <img src="../assets/img/php-ar21.svg" alt="">
                    </div>
                    <div class="img_container">
                        <img src="../assets/img/sass-lang-ar21.svg" alt="">
                    </div>
                    <div class="img_container">
                        <img src="../assets/img/phpmyadmin-ar21.svg" alt="">
                    </div>
                    <div class="img_container">
                        <img src="../assets/img/vuejs-ar21.svg" alt="">
                    </div>
                    <div class="img_container">
                        <img src="../assets/img/w3_css-ar21.svg" alt="">
                    </div>
                    <div class="img_container ">
                        <img src="../assets/img/w3_html5-ar21.svg" alt="">
                    </div>
                    <div class="img_container ">
                        <img src="../assets/img/github-ar21.svg" alt="">
                    </div>
                    <div class="img_container ">
                        <img src="../assets/img/docker-icon.svg" alt="">
                    </div>
                    <div class="img_container ">
                        <img src="../assets/img/expressjs-ar21.svg" alt="">
                    </div>
                    <div class="img_container ">
                        <img src="../assets/img/kubernetes-ar21.svg" alt="">
                    </div>
                    <div class="img_container ">
                        <img src="../assets/img/reactjs-ar21.svg" alt="">
                    </div>
                    <div class="img_container ">
                        <img src="../assets/img/tailwindcss-icon.svg" alt="">
                    </div>

                </div>
            </div>
        </div>

        <!-- ARROW TO GO BACK  -->

        <div class="arrow position-fixed bottom-0 light_shadow mx-3 scale_hover_less z-3" style="margin-bottom: 31px;">

            <a href="#top" class="cl_light_street">
                <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" fill="gray" class="bi bi-arrow-up-short"
                    viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                        d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z" />
                </svg>
            </a>


        </div>
    </div>
</template>

<style lang="scss">

    .pointer {
        cursor: pointer;
    }

    .offer-badge {
        box-shadow: 0 0px 0px rgba(0, 0, 0, 0.3);
        transition: box-shadow 0.3s ease;
    }

    @keyframes thrilled {
        0% {
            transform: translateX(0) translateY(-1);
        }

        20% {
            transform: translateX(-1px);
        }

        40% {
            transform: translateX(1px);
        }

        60% {
            transform: translateX(-1px);
        }

        80% {
            transform: translateX(1px);
        }

        100% {
            transform: translateX(-1px);
        }
    }


    .offer-badge:hover {
        animation: thrilled 0.45s;
        // box-shadow: 0 5px 14px rgba(0, 0, 0, 0.3);
    }

    .fancy_arrow {
        position: absolute;
        width: 100px;
        top: -127px;
        right: 53px;
        overflow: visible;
        opacity: 0.7;
    }

    .fancy_arrow2 {
        position: absolute;
        width: 100px;
        overflow: visible;
        opacity: 0.7;
        rotate: 90deg;
        right: -122px;
        top: -75px;
    }
</style>