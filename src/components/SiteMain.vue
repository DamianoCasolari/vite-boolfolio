<script>
import * as bootstrap from "bootstrap";
import projectsJson from "../assets/data/info_projects.json";
import { appearWithScroll } from "../assets/js/utility_functions.js";
import {
  firstLoading,
  languageState,
  heroSeen,
  appReady,
} from "../assets/js/language.js";
import { nextTick } from "vue";

const techIcons = {
  js: new URL("../assets/img/javascript-ar21.svg", import.meta.url).href,
  bootstrap: new URL("../assets/img/getbootstrap-ar21.svg", import.meta.url)
    .href,
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
  kubernetes: new URL("../assets/img/kubernetes-ar21.svg", import.meta.url)
    .href,
  react: new URL("../assets/img/reactjs-ar21.svg", import.meta.url).href,
  tailwind: new URL("../assets/img/tailwindcss-icon.svg", import.meta.url).href,
};

export default {
  data() {
    return {
      loading: false,
      projects: [],
      error: null,

      project_button: true,
      ghost: true,

      index: 1,
      intervalId: null,

      onScrollHandler: null,
      arrowScrollHandler: null,
      showArrow: false,

      languageState,
      techIcons,

      isFirstLoad: !heroSeen.value,
    };
  },

  methods: {
    openWelcomeModal() {
      nextTick(() => {
        const el = document.getElementById("welcomeModal");
        if (!el) return;
        const instance =
          bootstrap.Modal.getInstance(el) || new bootstrap.Modal(el);
        instance.show();
      });
    },

    getProjects() {
      this.loading = true;

      const run = () => {
        try {
          this.projects = projectsJson.projects ?? [];
        } catch (e) {
          this.error = e?.message ?? "Errore caricamento progetti";
        } finally {
          this.loading = false;
          appReady.value = true;
        }
      };

      if (firstLoading.value) {
        firstLoading.value = false;
        setTimeout(run, 1000);
        return;
      }

      run();
    },

    setupScrollEffects() {
      const section = document.querySelector(".main_container");
      if (section) appearWithScroll(section);

      this.arrowScrollHandler = () => {
        this.showArrow =
          window.scrollY + window.innerHeight >=
          document.documentElement.scrollHeight - 120;
      };
      window.addEventListener("scroll", this.arrowScrollHandler, {
        passive: true,
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

      window.addEventListener("scroll", this.onScrollHandler, {
        passive: true,
      });
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
    heroSeen.value = true;
    this.getProjects();
    this.setupScrollEffects();
    setTimeout(() => this.startRollingWords(), 500);
  },

  unmounted() {
    if (this.intervalId) clearInterval(this.intervalId);
    if (this.onScrollHandler)
      window.removeEventListener("scroll", this.onScrollHandler);
    if (this.arrowScrollHandler)
      window.removeEventListener("scroll", this.arrowScrollHandler);
  },
};
</script>

<template>
  <div
    v-if="loading"
    class="bg_snow vh100 d-flex flex-column align-items-center justify-content-center"
  >
    <div class="dc-loader" role="status" aria-label="Loading">
      <div class="dc-loader__glow"></div>

      <div class="dc-loader__logo-wrap">
        <img src="/dc-loader2.png" alt="DC Logo" class="dc-loader__logo" />
      </div>

      <span class="dc-loader__pixel dc-loader__pixel--1"></span>
      <span class="dc-loader__pixel dc-loader__pixel--2"></span>
      <span class="dc-loader__pixel dc-loader__pixel--3"></span>
      <span class="dc-loader__pixel dc-loader__pixel--4"></span>
      <span class="dc-loader__pixel dc-loader__pixel--5"></span>
    </div>
  </div>
  <div class="bg_snow" v-else>
    <div
      id="top"
      class="jumbotron container rounded-3 d-flex flex-column align-items-center justify-content-center position-relative"
    >
      <div class="shape_container position-absolute position1">
        <div class="shape"></div>
      </div>
      <div class="shape_container position-absolute position2">
        <div class="shape"></div>
      </div>
      <div
        class="container py-4 mt-0 mt-md-4 mb-2 d-flex flex-wrap flex-column flex-md-row align-items-center justify-content-center"
      >
        <div :class="['col-lg-6', 'z_inde49', { ghost3: isFirstLoad }]">
          <img
            src="../assets/img/photo.jpg"
            alt="DC Logo"
            class="rounded-4 z_inde49 main_photo shadow"
            loading="eager"
            decoding="sync"
            fetchpriority="high"
          />
        </div>

        <div
          class="info_contaienr px-2 pt-3 text-center text-sm-start z_index50 position-relative col-lg-6"
        >
          <div class="mb-3">
            <span class="title_size fw-semibold dc_sign" style="color: #393939">
              <img
                src="/public/f2dc.svg"
                alt="sign of dc"
                style="height: 7.8em"
                :class="{ sign_draw_anim: isFirstLoad }"
              />
            </span>
          </div>
          <!-- NEW TITLE -->
          <div :class="['animated-title', { animate: isFirstLoad }]">
            <div :class="['text-top', { ghost3: isFirstLoad }]">
              <div v-if="languageState.eng_lan">
                <!-- <span class="title_size fw-semibold" style="color: #393939;">Hi,</span> -->
                <!-- <span class="title_size fw-semibold" style="color: #656565;">I'm Damiano</span> -->
              </div>
              <div v-else>
                <!-- <span class="title_size fw-semibold" style="color: #393939;">Ciao,</span> -->
                <!-- <span class="title_size fw-semibold" style="color: #656565;">Sono Damiano</span> -->
              </div>
            </div>
            <div class="text-bottom t_duration">
              <div class="title_size d-flex no-wrap">
                <div
                  class="wordContainer d-flex roll_container fw-semibold text"
                  style="white-space: nowrap; height: 2em"
                >
                  <span
                    class="word1 wisteria position-relative"
                    style="color: #acacac"
                    >Fullstack</span
                  >
                  <span
                    class="word2 d-none wisteria position-relative"
                    style="color: #959595"
                    >Software</span
                  >
                  <span
                    class="word3 d-none wisteria position-relative"
                    style="color: #959595"
                    >Web app</span
                  >
                </div>
                &nbsp;
                <div
                  class="fw-normal shrink-1"
                  style="color: #acacac; white-space: nowrap"
                >
                  developer
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- PROJECTS SIDE  -->

    <section
      class="m_main main_container bg-snow"
      :class="{ 'opacity-0': ghost }"
    >
      <div class="container p_bottom_30 pb-lg-5" style="position: sticky; top: 86px">
        <div
          class="position-sticky d-block d-lg-none"
          style="top: 40px; z-index: 10"
        >
          <h1
            class="text-center fw-semibold"
            style="color: #393939"
            id="projects"
          >
            Portfolio
          </h1>

          <div v-if="false" class="d-flex justify-content-center mt-4 position-relative">
            <div class="position-relative offer-wrap">
              <button
                type="button"
                class="badge rounded-pill fs-6 special_offert_bg border-0"
                @click="openWelcomeModal"
              >
                {{
                  languageState.eng_lan
                    ? "Explore the 2026 Offer"
                    : "Scopri l'offerta 2026"
                }}
              </button>
              <div>
                <div class="fancy_arrow2" aria-hidden="true"></div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="scroll_element mb-4 d-flex"
          style="position: sticky; top: 86px"
        >
          <div class="col">
            <div
              class="d-flex justify-content-center mt-3 mt-lg-4"
              style="position: sticky"
              v-for="(project, index) in projects"
              :style="{ top: `calc(82px + ${index + 1}rem)` }"
            >
              <!-- Define a single project in its own specific route-link  -->

              <router-link
                :to="{ name: 'single-project', params: { slug: project.slug } }"
                class="w-100 d-flex move_up"
              >
                <div
                  class="card col-md-5 rounded-5 border-0 my_card open_img bg-transparent w-100"
                >
                  <div
                    class="scroll_effect_image text-center bg-transparent position-relative h-100"
                  >
                    <!-- <div
                                            class="d-flex justify-content-center align-items-center bg_dark_trnsp rounded-5 opacity_hover pointer p-2 h-100">
                                            <h4
                                                class="card-title position-absolute z-4 text-white p-2 fw-semibold text_shadow2">
                                                {{ project.name }}</h4>

                                        </div> -->
                    <img
                      :src="project.logo ?? project.image"
                      class="card-img-top moving_image pointer card_shadow h-100"
                      :alt="project.name + ' image'"
                      loading="lazy"
                    />
                    <!-- <div
                                            class="p-3 fw-semibold text_shadow2 text-white position-absolute top-0 end-0">
                                            {{
                                                project.type.name
                                            }}
                                        </div> -->
                  </div>
                </div>
              </router-link>
            </div>
          </div>
          <div
            class="right_main_side col-7 d-none d-lg-flex flex-column justify-content-center align-items-center px-4 py-5"
            :class="{ 'd-none': ghost }"
            style="position: sticky; top: 250px"
          >
            <div
              class="right_main_side d-md-flex flex-column justify-content-center align-items-center text-center p-3"
              style="position: sticky; top: 250px"
            >
              <div
                class="d-flex justify-content-between align-items-center w-100 mb-2"
              >
                <h1 class="position-relative fw-semibold mb-0">
                  {{ languageState.eng_lan ? `About me` : `Chi sono` }}
                </h1>
                <div
                  class="d-flex justify-content-center align-items-center pointer position-relative"
                >
                  <div>
                    <img
                      src="/public/fancyArrow.png"
                      class="fancy_arrow"
                      alt=""
                    />
                  </div>
                  <button 
                  v-if="false"
                    type="button"
                    class="badge rounded-pill offer-badge fs-6 special_offert_bg border-0 d-none d-md-block"
                    style="cursor: pointer"
                    @click="openWelcomeModal"
                  >
                    {{
                      languageState.eng_lan
                        ? "2026 Special Offer"
                        : "Offerta 2026"
                    }}
                  </button>
                </div>
              </div>

              <p class="position-relative">
                <span v-if="languageState.eng_lan">
                  I help <strong>businesses and professionals</strong> build
                  their online presence — custom websites and web applications,
                  <strong>fast, modern and built to convert</strong>, not just
                  to look good.
                </span>
                <span v-else>
                  Aiuto <strong>aziende e professionisti</strong> a costruire la
                  loro presenza online — siti web e applicazioni su misura,
                  <strong>veloci, moderni e pensati per convertire</strong>, non
                  solo per fare bella figura.
                </span>
              </p>

              <p class="position-relative">
                <span v-if="languageState.eng_lan">
                  I manage every project <strong>from brief to launch</strong>:
                  design, code and performance — so you get a
                  <strong>product that actually works</strong> and that you can
                  run independently from day one.
                </span>
                <span v-else>
                  Seguo ogni progetto <strong>dal brief al lancio</strong>:
                  design, codice e performance — così ottieni un
                  <strong>prodotto che funziona davvero</strong> e che puoi
                  gestire in autonomia dal primo giorno.
                </span>
              </p>

              <p class="position-relative">
                <span v-if="languageState.eng_lan">
                  I also build <strong>AI integrations</strong> and
                  <strong>custom automations</strong> — chatbots, smart
                  assistants and automated workflows — to put technology to work
                  for you and <strong>multiply your results</strong> without
                  multiplying your workload.
                </span>
                <span v-else>
                  Realizzo anche <strong>integrazioni AI</strong> e
                  <strong>automazioni su misura</strong> — chatbot, assistenti
                  intelligenti e flussi automatici — per far lavorare la
                  tecnologia al posto tuo e
                  <strong>moltiplicare i risultati</strong> senza moltiplicare
                  il carico di lavoro.
                </span>
              </p>

              <div class="shape_container position-absolute position3">
                <div class="shape"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- PAGINATION SIDE  -->

    <!-- CAROUSEL (CSS only) -->
    <!-- <div class="carousel_container">
            <div class="container h-100 position-relative carousel_mask">
                <div class="shadow_element position-absolute h-100 left-0 bg_snow"></div>
                <div class="shadow_element2 position-absolute h-100 left-0 bg_snow"></div>

                <div class="tech_marquee" aria-label="Tech stack carousel">
                    <div class="tech_track">
                    
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
        </div> -->

    <!-- ARROW TO GO BACK  -->

    <div
      class="arrow position-fixed bottom-0 light_shadow mx-3 scale_hover_less z-3"
      :style="{
        right: showArrow ? '0' : '-100px',
        opacity: showArrow ? '1' : '0',
      }"
      style="margin-bottom: 31px"
    >
      <a href="#top" class="cl_light_street">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="38"
          height="38"
          fill="gray"
          class="bi bi-arrow-up-short"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z"
          />
        </svg>
      </a>
    </div>
  </div>
</template>

<style lang="scss">
.pointer {
  cursor: pointer;
}

.offer-badge,
.special_offert_bg {
  position: relative;
  isolation: isolate;

  color: #1f2937;
  background: linear-gradient(135deg, #ffffff 0%, #d9d9d9 100%);

  border: 1px solid rgba(255, 255, 255, 0.55) !important;

  backdrop-filter: blur(14px);
  overflow: hidden;
  cursor: pointer;

  transition:
    transform 0.28s ease,
    box-shadow 0.28s ease,
    background 0.28s ease,
    letter-spacing 0.28s ease,
    color 0.28s ease;
}

.offer-badge::before,
.special_offert_bg::before {
  content: "";
  position: absolute;
  inset: 0;

  background: linear-gradient(
    120deg,
    transparent 0%,
    rgba(255, 255, 255, 0.75) 45%,
    transparent 70%
  );

  transform: translateX(-120%);
  transition: transform 0.75s ease;
  z-index: -1;
}

.offer-badge:hover,
.special_offert_bg:hover {
  color: #111827;
  background: linear-gradient(135deg, #ffffff 0%, #eeeeee 45%, #cfcfcf 100%);
}

.offer-badge:hover::before,
.special_offert_bg:hover::before {
  transform: translateX(120%);
}

.offer-badge:active,
.special_offert_bg:active {
  transform: translateY(-1px) scale(0.99);
}

.dc_sign {
  position: absolute;
  top: -60px;
  left: -50px;
  opacity: 0.8;

  @media (min-width: 992px) {
    top: -78px;
  }

  @media (min-width: 1200px) {
    top: -138px;
  }
}

.sign_draw_anim {
  animation: sign_draw 1.4s cubic-bezier(0.4, 0, 0.2, 1) 0.4s both;
}

@keyframes sign_draw {
  from {
    clip-path: inset(0 100% 0 0);
    opacity: 0.4;
  }
  to {
    clip-path: inset(0 0% 0 0);
    opacity: 1;
  }
}

.fancy_arrow {
  display: none;
  position: absolute;
  width: 100px;
  top: -109px;
  right: -88px;
  overflow: visible;
  opacity: 0.7;
  transform: rotate(65deg);
}

.fancy_arrow2 {
  display: none;
  position: absolute;
  width: 58px;
  height: 100px;
  right: -66px;
  top: -64px;

  background-image: url("/fancyArrow.png");
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
