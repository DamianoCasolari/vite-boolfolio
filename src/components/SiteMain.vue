<script>
    import * as bootstrap from "bootstrap";
    import projectsJson from "../assets/data/info_projects.json";
    import { appearWithScroll, arrowAppearWithScroll } from "../assets/js/utility_functions.js";
    import { languageState } from "../assets/js/language.js";
    import { nextTick } from "vue";

    const techIcons = {
        js: new URL("../assets/img/javascript-ar21.svg", import.meta.url).href,
        bootstrap: new URL("../assets/img/getbootstrap-ar21.svg", import.meta.url).href,
        laravel: new URL("../assets/img/laravel-ar21.svg", import.meta.url).href,
        git: new URL("../assets/img/git-scm-ar21.svg", import.meta.url).href,
        mysql: new URL("../assets/img/mysql-ar21.svg", import.meta.url).href,
        node: new URL("../assets/img/nodejs-ar21.svg", import.meta.url).href,
        npm: new URL("../assets/img/npmjs-ar21.svg", import.meta.url).href,
        php: new URL("../assets/img/php-ar21.svg", import.meta.url).href,
        sass: new URL("../assets/img/sass-lang-ar21.svg", import.meta.url).href,
        pma: new URL("../assets/img/phpmyadmin-ar21.svg", import.meta.url).href,
        vue: new URL("../assets/img/vuejs-ar21.svg", import.meta.url).href,
        css: new URL("../assets/img/w3_css-ar21.svg", import.meta.url).href,
        html: new URL("../assets/img/w3_html5-ar21.svg", import.meta.url).href,
        github: new URL("../assets/img/github-ar21.svg", import.meta.url).href,
        docker: new URL("../assets/img/docker-icon.svg", import.meta.url).href,
        express: new URL("../assets/img/expressjs-ar21.svg", import.meta.url).href,
        kubernetes: new URL("../assets/img/kubernetes-ar21.svg", import.meta.url).href,
        react: new URL("../assets/img/reactjs-ar21.svg", import.meta.url).href,
        tailwind: new URL("../assets/img/tailwindcss-icon.svg", import.meta.url).href,
    };

    export default {
        data() {
            return {
                loading: true,
                projects: [],
                error: null,

                project_button: true,
                ghost: true,

                index: 1,
                intervalId: null,

                onScrollHandler: null,

                languageState,
                techIcons,
            };
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

            getProjects() {
                try {
                    this.projects = projectsJson.projects ?? [];
                } catch (e) {
                    this.error = e?.message ?? "Errore caricamento progetti";
                } finally {
                    this.loading = false;
                }
            },

            setupScrollEffects() {
                const section = document.querySelector(".main_container");
                if (section) appearWithScroll(section);

                this.$nextTick(() => {
                    const arrow = document.querySelector(".arrow");
                    const sectionNow = document.querySelector(".main_container");
                    if (sectionNow && arrow) arrowAppearWithScroll(sectionNow, arrow);
                });

                this.onScrollHandler = () => {
                    const container = document.querySelector(".main_container");
                    if (!container) return;

                    const viewportHeight = (window.innerHeight / 10) * 8.5;
                    const top = container.getBoundingClientRect().top;

                    if (top < viewportHeight) {
                        this.project_button = false;
                        this.ghost = false;
                    } else {
                        this.project_button = true;
                    }
                };

                window.addEventListener("scroll", this.onScrollHandler, { passive: true });
                // trigger immediato
                this.onScrollHandler();
            },

            startRollingWords() {
                this.intervalId = window.setInterval(() => {
                    const word1 = document.querySelector(".word" + this.index);
                    const word2 = document.querySelector(".word" + ((this.index % 3) + 1));
                    if (!word1 || !word2) return;

                    word1.classList.add("d-none");
                    word1.classList.remove("drop_animation");

                    word2.classList.add("drop_animation");
                    word2.classList.remove("d-none");

                    this.index = (this.index % 3) + 1;
                }, 3000);
            },
        },

        mounted() {
            this.getProjects();
            this.setupScrollEffects();
            setTimeout(() => this.startRollingWords(), 500);

            // ❌ tolto carousel_roll (jQuery)
            // se vuoi, ti propongo una versione CSS-only
        },

        unmounted() {
            if (this.intervalId) clearInterval(this.intervalId);
            if (this.onScrollHandler) window.removeEventListener("scroll", this.onScrollHandler);
        },
    };
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
                        <div class="position-relative offer-wrap">
                            <button type="button" class="badge rounded-pill fs-6 text-bg-dark border-0"
                                @click="openWelcomeModal">
                                {{ languageState.eng_lan ? "Explore the 2026 Offer" : "Scopri l'offerta 2026" }}
                            </button>
                            <div>
                                <div class="fancy_arrow2" aria-hidden="true"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="scroll_element mb-4 d-flex" style="position: sticky;top: 86px;">
                    <div class="col">
                        <div class=" d-flex justify-content-center mt-4" style="position: sticky;"
                            v-for="(project, index) in projects" :style="{ top: `calc(86px + ${index + 1}rem)` }">

                            <!-- Define a single project in its own specific route-link  -->

                            <router-link :to="{ name: 'single-project', params: { 'slug': project.slug } }"
                                class="w-100 d-flex move_up">
                                <div class="card col-md-5 rounded-5 border-0 my_card open_img bg-transparent w-100">
                                    <div class="scroll_effect_image text-center bg-transparent position-relative h-100">
                                        <div
                                            class="d-flex justify-content-center align-items-center bg_dark_trnsp rounded-5 opacity_hover pointer p-2 h-100">
                                            <h4 class="card-title position-absolute z-4 text-white p-2 fw-semibold text_shadow2">
                                                {{ project.name }}</h4>

                                        </div>
                                        <img :src="project.image"
                                            class="card-img-top moving_image pointer card_shadow h-100"
                                            :alt="project.name + ' image'" loading="lazy">
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
                            <div class="mt-4 hide-on-ultrawide">
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

       <!-- CAROUSEL (CSS only) -->
        <div class="carousel_container">
            <div class="container h-100 position-relative carousel_mask">
                <div class="shadow_element position-absolute h-100 left-0 bg_snow"></div>
                <div class="shadow_element2 position-absolute h-100 left-0 bg_snow"></div>

                <div class="tech_marquee" aria-label="Tech stack carousel">
                    <div class="tech_track">
                        <!-- SET 1 -->
                       <div class="tech_item"><img :src="techIcons.js" alt="JavaScript"></div>
                        <div class="tech_item"><img :src="techIcons.bootstrap" alt="Bootstrap"></div>
                        <div class="tech_item"><img :src="techIcons.laravel" alt="Laravel"></div>
                        <div class="tech_item"><img :src="techIcons.git" alt="Git"></div>
                        <div class="tech_item"><img :src="techIcons.mysql" alt="MySQL"></div>
                        <div class="tech_item"><img :src="techIcons.node" alt="Node.js"></div>
                        <div class="tech_item"><img :src="techIcons.npm" alt="npm"></div>
                        <div class="tech_item"><img :src="techIcons.php" alt="PHP"></div>
                        <div class="tech_item"><img :src="techIcons.sass" alt="Sass"></div>
                        <div class="tech_item"><img :src="techIcons.pma" alt="phpMyAdmin"></div>
                        <div class="tech_item"><img :src="techIcons.vue" alt="Vue"></div>
                        <div class="tech_item"><img :src="techIcons.css" alt="CSS"></div>
                        <div class="tech_item"><img :src="techIcons.html" alt="HTML5"></div>
                        <div class="tech_item"><img :src="techIcons.github" alt="GitHub"></div>
                        <div class="tech_item"><img :src="techIcons.docker" alt="Docker"></div>
                        <div class="tech_item"><img :src="techIcons.express" alt="Express"></div>
                        <div class="tech_item"><img :src="techIcons.kubernetes" alt="Kubernetes"></div>
                        <div class="tech_item"><img :src="techIcons.react" alt="React"></div>
                        <div class="tech_item"><img :src="techIcons.tailwind" alt="Tailwind CSS"></div>

                        <!-- SET 2 (duplicato identico per loop infinito) -->
                       <div class="tech_item" aria-hidden="true"><img :src="techIcons.js" alt=""></div>
                        <div class="tech_item" aria-hidden="true"><img :src="techIcons.bootstrap" alt=""></div>
                        <div class="tech_item" aria-hidden="true"><img :src="techIcons.laravel" alt=""></div>
                        <div class="tech_item" aria-hidden="true"><img :src="techIcons.git" alt=""></div>
                        <div class="tech_item" aria-hidden="true"><img :src="techIcons.mysql" alt=""></div>
                        <div class="tech_item" aria-hidden="true"><img :src="techIcons.node" alt=""></div>
                        <div class="tech_item" aria-hidden="true"><img :src="techIcons.npm" alt=""></div>
                        <div class="tech_item" aria-hidden="true"><img :src="techIcons.php" alt=""></div>
                        <div class="tech_item" aria-hidden="true"><img :src="techIcons.sass" alt=""></div>
                        <div class="tech_item" aria-hidden="true"><img :src="techIcons.pma" alt=""></div>
                        <div class="tech_item" aria-hidden="true"><img :src="techIcons.vue" alt=""></div>
                        <div class="tech_item" aria-hidden="true"><img :src="techIcons.css" alt=""></div>
                        <div class="tech_item" aria-hidden="true"><img :src="techIcons.html" alt=""></div>
                        <div class="tech_item" aria-hidden="true"><img :src="techIcons.github" alt=""></div>
                        <div class="tech_item" aria-hidden="true"><img :src="techIcons.docker" alt=""></div>
                        <div class="tech_item" aria-hidden="true"><img :src="techIcons.express" alt=""></div>
                        <div class="tech_item" aria-hidden="true"><img :src="techIcons.kubernetes" alt=""></div>
                        <div class="tech_item" aria-hidden="true"><img :src="techIcons.react" alt=""></div>
                        <div class="tech_item" aria-hidden="true"><img :src="techIcons.tailwind" alt=""></div>
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
        width: 58px;
        height: 100px;
        right: -66px;
        top: -64px;

        background-image: url('/fancyArrow.png');
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;

        opacity: 0.7;
        transform: rotate(90deg);
        -webkit-transform: rotate(90deg);
        pointer-events: none; // evita click strani
    }

    .offer-wrap {
        overflow: visible;
    }

    // Per la lista finale di step lavoro su certi schermi lo togliamo
    @media (min-aspect-ratio: 2 / 1) {
        .hide-on-ultrawide {
            display: none !important;
        }
    }

    .carousel_mask {
        overflow: hidden;
    }

    /* contenitore */
    .tech_marquee {
        position: relative;
        overflow: hidden;
        height: 90px;
        /* regola a gusto */
        display: flex;
        align-items: center;
    }

    /* track infinito */
    .tech_track {
        display: flex;
        align-items: center;
        width: max-content;
        gap: 34px;
        /* spazio tra loghi */
        will-change: transform;
        animation: techScroll 28s linear infinite;
    }

    /* singolo item */
    .tech_item {
        flex: 0 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .tech_item img {
        height: 42px;
        /* regola dimensione icone */
        width: auto;
        opacity: 0.9;
        filter: grayscale(0.1);
        transform: translateZ(0);
    }

    /* effetto hover (opzionale) */
    .tech_item img:hover {
        opacity: 1;
        filter: grayscale(0);
    }

    /* animazione: spostiamo il track di metà lunghezza (perché è duplicato 2x) */
    @keyframes techScroll {
        from {
            transform: translateX(0);
        }

        to {
            transform: translateX(-50%);
        }
    }

    /* accessibilità: se l'utente preferisce ridurre le animazioni */
    @media (prefers-reduced-motion: reduce) {
        .tech_track {
            animation: none;
            transform: none;
        }
    }
</style>