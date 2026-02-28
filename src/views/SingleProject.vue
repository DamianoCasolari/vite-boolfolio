<script>
    import projectsJson from "../assets/data/info_projects.json";
    import { languageState } from "../assets/js/language.js";

    export default {
        name: "SingleProject",

        data() {
            return {
                loading: true,
                project: null,
                error: null,
                languageState,
            };
        },

        computed: {
            title() {
                if (!this.project) return "";
                return this.languageState.eng_lan
                    ? (this.project.name ?? "")
                    : (this.project.name_it ?? this.project.name ?? "");
            },

            descriptionText() {
                if (!this.project) return "";
                return this.languageState.eng_lan
                    ? (this.project.description ?? "")
                    : (this.project.description_it ?? this.project.description ?? "");
            },

            imageSrc() {
                return this.project?.image ?? "";
            },
        },

        methods: {
            loadProjectBySlug() {
                try {
                    const slug = this.$route.params.slug;
                    const list = projectsJson.projects ?? [];

                    const found = list.find((p) => p.slug === slug);

                    if (!found) {
                        this.$router.push({ name: "PageNotFound" });
                        return;
                    }

                    this.project = found;
                } catch (e) {
                    this.error = e?.message ?? "Errore caricamento progetto";
                } finally {
                    this.loading = false;
                }
            },

            ImgAndInfoSameHeight() {
                const longerDiv = document.querySelector(".info_container");
                const shorterDiv = document.querySelector(".cover_container");
                if (!longerDiv || !shorterDiv) return;

                const h = shorterDiv.offsetHeight;
                longerDiv.style.height = h + "px";
            },
        },

        watch: {
            // se navighi tra progetti senza ricreare il componente
            "$route.params.slug": {
                immediate: true,
                handler() {
                    this.loading = true;
                    this.project = null;
                    this.error = null;
                    this.loadProjectBySlug();
                },
            },
        },
    };
</script>

<template>
    <!-- puoi anche mettere uno skeleton/loader qui -->
    <div v-if="loading" class="d-flex justify-content-center align-items-center py-5">
        Loading...
    </div>

    <div v-else-if="error" class="text-center py-5">
        {{ error }}
    </div>

    <div v-else class="single_project d-flex justify-content-center align-items-center" v-if="project">
        <div class="container position-relative">
            <div class="main_info d-flex justify-content-between flex-wrap align-items-center">
                <div class="wrap">
                    <h2 class="project_title pt-3 fw-semibold text_shadow">
                        <button type="button" class="back_to_home text-decoration-none position-relative"
                            @click="$router.back()" aria-label="Back"
                            style="background: transparent; border: 0; padding: 0;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#393939"
                                class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
                                <path
                                    d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
                            </svg>
                        </button>

                        {{ title }}
                    </h2>

                    <h5 style="left: -10px; position: relative;">
                        <div v-for="(technology, index) in project.tags"
                            :key="technology.id ?? technology.name ?? index"
                            class="badge lng_badge mb-2 text_shadow3 fs-6 rounded-4"
                            :class="{ zoom_appearance: index >= 0 }" :style="{ animationDelay: index * 0.1 + 's' }">
                            {{ technology.name }}
                        </div>
                    </h5>

                  
                </div>

                <div
                    class="end-0 top-0 px-3 py-2 rounded-5 type_project text-dark fw-semibold my-2 d-none d-sm-flex justify-content-between align-items-center t_duration">
                    {{ project.type?.name }}
                </div>
            </div>

            <div class="row">
                <!-- IMG SIDE -->
                <div class="cover_container col-12 col-md-5 py-3 px-3 h-100 position-relative ">
                    <component :is="project.link ? 'a' : 'div'" :href="project.link || undefined" target="_blank"
                        rel="noopener" class="h-100 d-inline-block w-100 position-relative slide_up">
                        <div v-if="project.link"
                            class="overlay text-light opacity_hover z_index50 position-absolute w-100 h-100 rounded-5 border-0 d-flex justify-content-center align-items-center t_duration">
                            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor"
                                class="bi bi-eye-fill rotate_animation position-relative" viewBox="0 0 16 16">
                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                <path
                                    d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                            </svg>
                        </div>

                        <img class="rounded-5 border-0 w-100 card_shadow max-height-60vh img-contain" :src="imageSrc" :alt="`${title} cover`"
                            loading="lazy" @load="ImgAndInfoSameHeight" />
                    </component>
                </div>

                <!-- INFO SIDE -->
                <div class="info_container col-12 col-md-7 py-3 px-3 slide_down position-relative">
                    <div class="card border border-0 rounded-5 w-100 h-100 overflow-hidden">
                        <div class="card-body h-100">
                            <div class="h-100 overflow-auto">
                                <p class="description text_carbon h-100 position-relative fs-5 p-4">
                                    <span class="element1"></span>
                                    {{ descriptionText }}
                                    <span class="element2"></span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<style lang="scss">
    .back_to_home {
        color: #393939;

        svg {
            transition-duration: 0.5s;
        }

        &:hover svg {
            width: 28px;
        }
    }

    .project_title {
        color: #393939;
    }

    .lng_badge {
        opacity: 0;
    }

    .max-height-60vh {
        max-height: 60vh;
    }

    .img-contain {
        object-fit: contain;
        object-position: top;
    }
</style>