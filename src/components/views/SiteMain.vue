<script>
import PaginationController from '../PaginationController.vue';
import axios from 'axios';

export default {

    data() {
        return {
            base_URL: 'http://127.0.0.1:8000/',
            projects_API: 'api/projects',
            loading: true,
            projects: [],
            error: null
        }

    },
    components: {
        PaginationController
    },
    methods: {
        getProjects(url) {
            axios.get(url).then(response => {
                console.log(response);
                this.projects = response.data.projects
                this.loading = false
            }).catch(error => {
                console.log(error)
                this.error = error.message
            }
            )
        },
        getImagePath(path) {
            return this.base_URL + 'storage/' + path
        }
    },
    mounted() {
        this.getProjects(this.base_URL + this.projects_API)
    }

}
</script>

<template>
    <SiteHeader />
    <!-- <img class="fake_background"
        src="../../assets/img/Default_minimal_brush_strokes_with_very_bright_colorsadss_on_to_ba_0.jpg" alt="background"> -->
    <div class="jumbotron p-5 bg-light rounded-3 vh_100 d-flex align-items-center justify-content-center bg_color">
        <div class="container py-5 d-flex flex-wrap align-items-center justify-content-center">
            <div class=" text-end pe-3 ghost col-sm-6">
                <img src="../../assets/img/photo.jpg" alt="DC Logo" height="300" class="rounded-4 shadow">
            </div>

            <div class="info_contaienr p-2 col-sm-6 text-center text-sm-start">
                <h1 id="myText">
                    <span class="fade_in position-relative fs-1 text_shadow">Hi, I'm Damiano</span>

                </h1>

                <p class="fade_right position-relative text_shadow"><i>
                        My job is to create <b>tailor-made sites</b> for <span class="text-primary">you</span>,
                    </i></p>
            </div>
        </div>
    </div>
    <section class=" m_main main_container bg-light">
        <div class="container ">
            <h1 class="text-center">Projects </h1>

            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 mb-4">
                <div class="col mt-4" v-for="project in projects.data">
                    <div class="card h-100 rounded-5 border-0 my_card open_img bg-transparent">
                        <div class=" text-center bg-transparent position-relative">
                            <div
                                class="d-flex justify-content-center align-items-center bg_dark_trnsp rounded-5 opacity_hover pointer p-2">
                                <h4 class="card-title text-white p-2 fw-bold text_shadow2">
                                    {{ project.title }}</h4>

                            </div>
                            <img :src="getImagePath(project.logo)" class="card-img-top pointer card_shadow"
                                :alt="project.title + ' image'">
                            <div class="p-3 fw-bold text_shadow2 text-white position-absolute top-0 end-0"> {{
                                project.type.name
                            }}
                            </div>

                        </div>
                        <div class="card-body d-flex flex-column justify-content-between">
                            <!-- <h4 class="card-title text-center p-2 fw-bold">{{ project.title }}</h4> -->
                            <!-- <a :href="project.link" class="text-center text-decoration-none blu_hover">
                                <h6 class=" mb-2 font_s11 p-2 fw-bold text_blue_night underline_hover">{{ project.link }}
                                </h6>
                            </a> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <PaginationController @prev="getProjects(projects.prev_page_url)" @next="getProjects(projects.next_page_url)"
        :prev_condition="projects.prev_page_url" :next_condition="projects.next_page_url" />

    <!-- <div class="d-flex justify-content-center">
        <nav aria-label="Page navigation example ">
            <ul class="pagination pagination-sm">
                <li class="page-item" v-if="projects.prev_page_url">
                    <button class="page-link border border-0" aria-label="Previous"
                        @click="getProjects(projects.prev_page_url)">
                        <span aria-hidden="true" class="fs-4"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                    d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                            </svg> Prev</span>
                    </button>
                </li>

                <li class="page-item" v-if="projects.next_page_url">
                    <button class="page-link border border-0" @click="getProjects(projects.next_page_url)"
                        aria-label="Next">
                        <span aria-hidden="true" class="fs-4">Other projects <svg xmlns="http://www.w3.org/2000/svg"
                                width="16" height="16" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                    d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                            </svg></span>
                    </button>
                </li>
            </ul>
        </nav>
    </div> -->
</template>

<style lang="scss"></style>