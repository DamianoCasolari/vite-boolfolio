<script>
import PaginationController from './PaginationController.vue';
import { appearWithScroll, arrowAppearWithScroll } from '../assets/js/utility_functions.js';

import axios from 'axios';

export default {

    data() {
        return {
            base_URL: 'http://127.0.0.1:8000/',
            projects_API: 'api/projects',
            loading: true,
            projects: [],
            error: null,
            project_button: true
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
        },
        handleClick() {
            this.project_button = false
        },
        cascadeTitle() {
            const heading = document.getElementById('cascading-effect-heading');
            const letters = heading.textContent.split('');

            heading.textContent = '';

            letters.forEach((letter, index) => {
                const span = document.createElement('span');
                span.textContent = letter;

                setTimeout(() => {
                    span.style.opacity = '1';
                    span.style.top = '0';
                }, 1000 + index * 100);

                heading.appendChild(span);
            })
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

    },
    mounted() {
        this.getProjects(this.base_URL + this.projects_API)
        this.cascadeTitle()
        this.scrollFunction()
        this.arrowAppearWithScroll()
    }

}
</script>

<template>
    <div id="top"
        class="jumbotron p-5 bg_snow rounded-3 vh_100 d-flex flex-column align-items-center justify-content-center">

        <div class="container py-4 mt-0 mt-md-4 mb-2 d-flex flex-wrap align-items-center justify-content-center">
            <div class=" text-end pe-3 ghost col-sm-6">
                <img src="../assets/img/photo.jpg" alt="DC Logo" height="300" class="rounded-4 shadow">
            </div>

            <div class="info_contaienr px-2 py-3 col-sm-6 text-center text-sm-start">
                <h1 id="myText">
                    <!-- <span class="fade_in position-relative fs-1 text_shadow">Hi, I'm Damiano</span> -->
                    <h1 id="cascading-effect-heading" class="fs-1 text_shadow">Hi, I'm Damiano</h1>

                </h1>

                <p class="fade_right position-relative text_shadow"><i>
                        My job is to create <b>tailor-made sites</b> for <span class="text-primary">you</span>,
                    </i></p>
            </div>
        </div>

        <a class="text-dark mx-2 mt-sm-5 underline-on-hover z_index50 text_shadow position-relative ghost2 t_duration"
            :class="{ 'opacity-0': !project_button }" href="#projects" @click="handleClick">Projects</a>
    </div>
    <svg class="wave-1hkxOo w-100 rotate_180" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100"
        preserveAspectRatio="none">
        <path class="wavePath-haxJK1 animationPaused-2hZ4IO"
            d="M826.337463,25.5396311 C670.970254,58.655965 603.696181,68.7870267 447.802481,35.1443383 C293.342778,1.81111414 137.33377,1.81111414 0,1.81111414 L0,150 L1920,150 L1920,1.81111414 C1739.53523,-16.6853983 1679.86404,73.1607868 1389.7826,37.4859505 C1099.70117,1.81111414 981.704672,-7.57670281 826.337463,25.5396311 Z"
            fill="rgb(244, 244, 244)"></path>
    </svg>
    <section class=" m_main main_container bg-white">
        <div class="container ">
            <h1 class="text-center " :class="!project_button ? 'opacity-1' : 'opacity-0'" id="projects">Projects </h1>

            <div class="scroll_element row row-cols-1 row-cols-sm-2 row-cols-md-3 mb-4">
                <div class="col mt-4" v-for=" project  in  projects.data ">
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
                    </div>
                </div>
            </div>
        </div>
    </section>
    <PaginationController @prev="getProjects(projects.prev_page_url)" @next="getProjects(projects.next_page_url)"
        :prev_condition="projects.prev_page_url" :next_condition="projects.next_page_url" />
    <div class="arrow position-fixed bottom-0 light_shadow m-2 ">

        <a href="#top" class="cl_light_street">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="gray" class="bi bi-arrow-up-short"
                viewBox="0 0 16 16">
                <path fill-rule="evenodd"
                    d="M8 12a.5.5 0 0 0 .5-.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 .5.5z" />
            </svg>
        </a>


    </div>
</template>

<style lang="scss"></style>