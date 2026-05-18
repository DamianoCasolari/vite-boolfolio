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
                    ? this.project.name ?? ""
                    : this.project.name_it ?? this.project.name ?? "";
            },

            descriptionText() {
                if (!this.project) return "";
                return this.languageState.eng_lan
                    ? this.project.description ?? ""
                    : this.project.description_it ?? this.project.description ?? "";
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
                    this.preloadProjectImage(found.image);
                } catch (e) {
                    this.error = e?.message ?? "Errore caricamento progetto";
                    this.loading = false;
                }
            },

            preloadProjectImage(src) {
                if (!src) {
                    this.loading = false;
                    return;
                }

                const img = new Image();

                img.onload = () => {
                    this.loading = false;
                };

                img.onerror = () => {
                    this.loading = false;
                };

                img.src = src;
            },
        },

        watch: {
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
    <div v-if="loading" class="bg_snow vh100 d-flex flex-column align-items-center justify-content-center">
        <div class="spinner">
            <div class="cube1"></div>
            <div class="cube2"></div>
        </div>
    </div>

    <div v-else-if="error" class="text-center py-5">
        {{ error }}
    </div>

    <div v-else-if="project" class="single_project d-flex justify-content-center align-items-center">
        <div class="container position-relative">
            <div class="main_info d-flex justify-content-between flex-wrap align-items-center">
                <div class="wrap ">
                    <div class="project_title pt-4 pb-2 fw-semibold text_shadow d-flex align-items-center gap-3">
                        <button type="button" class="back_to_home text-decoration-none position-relative"
                            @click="$router.back()" aria-label="Back"
                            style="background: transparent; border: 0; padding: 0;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24"
                                fill="none" stroke="#393939" stroke-width="1.5" stroke-linecap="round"
                                stroke-linejoin="round">
                                <path d="M15 18l-6-6 6-6" />
                            </svg>
                        </button>
                        <div class="fs-5">
                            {{ title }}
                        </div>
                    </div>

                    <div class="tags_row">
                        <span v-for="(technology, index) in project.tags"
                            :key="technology.id ?? technology.name ?? index"
                            class="tag_item zoom_appearance fw-semibold"
                            :style="{ animationDelay: index * 0.08 + 's' }">
                            <span class="tag_dot" aria-hidden="true"></span>
                            {{ technology.name }}
                        </span>
                    </div>
                </div>

                <div
                    class="end-0 top-0 px-3 py-2 rounded-5 type_project text-dark fw-semibold my-2 d-none d-md-flex justify-content-between align-items-center t_duration">
                    {{ project.type?.name }}
                </div>
            </div>

            <div class="row">
                <!-- IMG SIDE -->
                <div class="cover_container col-12 col-md-5 py-3 px-3 h-100 position-relative">
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

                        <img class="rounded-5 border-0 w-100 card_shadow max-height-60vh img-contain" :src="imageSrc"
                            :alt="`${title} cover`" loading="eager" fetchpriority="high" />
                    </component>
                </div>

                <!-- INFO SIDE -->
                <div class="info_container col-12 col-md-7 py-3 px-3 slide_down position-relative">
                    <div class="card border border-0 rounded-5 w-100 h-100 overflow-hidden">
                        <div class="card-body h-100">
                            <div class="h-100 overflow-auto">
                                <p class="description text_carbon h-100 position-relative fs-6 p-4">
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
            display: block;
            transition: transform 0.35s ease-out, opacity 0.35s ease-out;
        }

        &:hover svg {
            transform: translateX(-5px);
            opacity: 0.55;
        }
    }

    .project_title {
        color: #393939;
    }

    .tags_row {
        display: flex;
        flex-wrap: wrap;
        gap: 4px 18px;
        margin-top: 10px;
    }

    .tag_item {
        display: inline-flex;
        align-items: center;
        gap: 7px;
        font-size: 0.82rem;
        font-weight: 500;
        color: #555;
        letter-spacing: 0.01em;
    }

    .tag_dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #b0b0b0;
        flex-shrink: 0;
    }

    .max-height-60vh {
        max-height: 60vh;
    }

    .img-contain {
        object-fit: contain;
        object-position: top;
    }
</style>