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
        console.log(this.project);
        // this.ImgAndInfoSameHeight()
    }
}


</script>

<template>
    <div class="single_project d-flex justify-content-center align-items-center " v-if="project.length != 0">

        <div class="container position-relative">

            <div class="main_info d-flex justify-content-between flex-wrap align-items-center">

                <!-- ROUTER TO HOME PAGE -->
                <div class="wrap">
                    <router-link :to="{ name: 'home' }"
                        class="text-decoration-none pt-3 d-inline-block underline-on-hover text-dark fw-semibold appear_with_scale"><svg
                            xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-house scale_0 " viewBox="0 0 16 16">
                            <path
                                d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z" />
                        </svg> <span>Back to home</span></router-link>

                    <!-- TOP SIDE -->

                    <h2 class="pt-3 fw-semibold text_shadow">{{ project.title }}</h2>
                    <!-- <div class="py-1 fw-semibold"><a :href="project.link" target="_blank">{{ project.link }}</a></div> -->
                </div>
                <div
                    class="end-0 top-0 p-3 type_project text-dark fw-semibold my-2 shadow d-flex justify-content-between align-items-center">
                    {{ project.type?.name

                    }}
                </div>
            </div>
            <div class="row ">
                <!-- IMG SIDE -->
                <div class="cover_container col-12 col-md-5 py-3 px-3 h-100 position-relative">
                    <a :href="project.link" target="_blank" class="h-100 d-inline-block w-100 position-relative">
                        <div
                            class=" overlay text-light opacity_hover z_index50 position-absolute w-100 h-100 rounded-5 border-0 d-flex justify-content-center align-items-center t_duration">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor"
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
                <div class="info_container col-12 col-md-7 py-3 px-3 ">
                    <div class="card  border border-0 rounded-5 w-100 h-100 overflow-hidden">
                        <div class="card-body h-100">
                            <h5 class="card-title text-center">
                                <div v-for="tecnology in project.tags "
                                    class="text-center badge text-bg-dark me-2 mb-2 p-2 card_shadow">{{
                                        tecnology.name
                                    }}</div>
                            </h5>
                            <p class="description card-text h-100 position-relative">
                            <div class="element1"></div>
                            {{
                                project.functionality
                            }}
                            <div class="element2"></div>
                            <div class="element2"></div>
                            </p>
                            <div class="element2"></div>
                        </div>
                    </div>
                </div>


            </div>

        </div>
        <!-- <div v-else>
            {{ error }}

        </div> -->
        <!-- <div>{{ $route.fullPath }}</div>
        <div>{{ $route.hash }}</div>
        <div>{{ $route.path }}</div>
        <div>{{ $route.name }}</div> -->
    </div>
</template>

<style lang="scss"></style>
