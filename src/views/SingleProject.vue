<script>
import axios from 'axios';


export default {
    name: 'SingleProject',
    data() {
        return {
            base_URL: 'http://127.0.0.1:8000/',
            projects_API: 'api/projects/',
            loading: true,
            project: [],
            error: null

        }

    },
    methods: {
        getProjects(url) {
            axios.get(url).then(response => {

                if (response.data.success) {
                    console.log(response.data.success);
                    this.project = response.data.result
                    this.loading = false

                } else {
                    this.$router.push({ name: 'PageNotFound' })
                }

            }).catch(error => {
                console.log(error)
                this.error = error.message
            }
            )
        },
        getImageFromPath(path) {
            return this.base_URL + 'storage/' + path
        },
        ImgAndInfoSameHeight() {
            const longerDiv = document.querySelector('.info_container');
            const shorterDiv = document.querySelector('.cover_container');
            const shorterDivHeight = shorterDiv.offsetHeight;

            longerDiv.style.height = shorterDivHeight + 'px';
        }
    },

    components: {

    },
    mounted() {
        const url = this.base_URL + this.projects_API + this.$route.params.slug;
        this.getProjects(url)
    }
}


</script>

<template>
    <div class="single_project d-flex justify-content-center align-items-center " v-if="project.length != 0">

        <div class="container position-relative">

            <div class="main_info d-flex justify-content-between flex-wrap align-items-center">

                <!-- ROUTER TO HOME PAGE -->
                <div class="wrap">

                    <!-- TOP SIDE -->

                    <h2 class="project_title pt-3 fw-semibold text_shadow">
                        <router-link :to="{ name: 'home' }" class="back_to_home text-decoration-none position-relative"><svg
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#393939"
                                class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
                                <path
                                    d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
                            </svg>
                        </router-link>
                        {{ project.title }}
                    </h2>
                    <h5 style="left: -10px;position: relative;">

                        <div v-for="(tecnology, index) in project.tags "
                            class=" badge lng_badge mb-2 text_shadow3 fs-6 rounded-4"
                            :class="{ 'zoom_appearance': index >= 0 }" :style="{ 'animation-delay': index * 0.1 + 's' }">
                            {{
                                tecnology.name
                            }}</div>
                    </h5>
                    <!-- <div class="py-1 fw-semibold"><a :href="project.link" target="_blank">{{ project.link }}</a></div> -->
                </div>
                <div
                    class="end-0 top-0 px-3 py-2 rounded-5 type_project text-dark fw-semibold my-2 d-none d-sm-flex justify-content-between align-items-center t_duration">
                    {{ project.type?.name

                    }}
                </div>
            </div>
            <div class="row ">
                <!-- IMG SIDE -->
                <div class="cover_container col-12 col-md-5 py-3 px-3 h-100 position-relative">
                    <a :href="project.link" target="_blank" class="h-100 d-inline-block w-100 position-relative slide_up">
                        <div
                            class=" overlay text-light opacity_hover z_index50 position-absolute w-100 h-100 rounded-5 border-0 d-flex justify-content-center align-items-center t_duration">
                            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="currentColor"
                                class="bi bi-eye-fill rotate_animation position-relative" viewBox="0 0 16 16">
                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                                <path
                                    d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                            </svg>
                        </div>

                        <img class=" rounded-5 border-0 w-100 card_shadow" :src="getImageFromPath(project.logo)"
                            :alt="project.title + image" @load="ImgAndInfoSameHeight()">
                    </a>
                </div>
                <!-- INFO SIDE -->
                <div class="info_container col-12 col-md-7 py-3 px-3 slide_down position-relative">
                    <div class="card border border-0 rounded-5 w-100 h-100 overflow-hidden">

                        <div class="card-body h-100">
                            <div class="h-100 overflow-auto">
                                <p class="description text_carbon h-100 position-relative fs-5 p-4">
                                <div class="element1 "></div>
                                {{
                                    project.functionality
                                }}
                                <div class="element2"></div>
                                </p>
                                <!-- <div class="element2"></div> -->
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
        transform: translateX(-5px)
    }
}

.project_title {
    color: #393939;
}


.lng_badge {
    opacity: 0;
    // color: #393939;
}
</style>
