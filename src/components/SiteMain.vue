<script>
import PaginationController from './PaginationController.vue';
import { appearWithScroll, arrowAppearWithScroll } from '../assets/js/utility_functions.js';

import axios from 'axios';
import { nextTick } from 'vue';

export default {

    data() {
        return {
            base_URL: 'http://127.0.0.1:8000/',
            projects_API: 'api/projects',
            loading: true,
            projects: [],
            error: null,
            project_button: true,
            ghost: true,
            index: 1
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
            })
        },
        getImagePath(path) {
            return this.base_URL + 'storage/' + path
        },
        handleClick() {
            this.project_button = false
        },
        // cascadeTitle() {
        //     const heading = document.getElementById('cascading-effect-heading');
        //     const letters = heading.textContent.split('');

        //     heading.textContent = '';

        //     letters.forEach((letter, index) => {
        //         const span = document.createElement('span');
        //         span.textContent = letter;

        //         setTimeout(() => {
        //             span.style.opacity = '1';
        //             span.style.top = '0';
        //         }, 1000 + index * 100);

        //         heading.appendChild(span);
        //     })
        // },
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
            setInterval(() => {
                const word1 = document.querySelector(".word" + this.index);
                console.log(word1);
                const word2 = document.querySelector(".word" + ((this.index % 3) + 1));
                console.log(word2);

                word1.classList.add("d-none")
                word1.classList.remove("drop_animation")
                word2.classList.add("drop_animation");
                word2.classList.remove("d-none")
                this.index = (this.index % 3) + 1

            }, 3000)

        }

    },
    mounted() {

        this.getProjects(this.base_URL + this.projects_API)
        this.toggleAppearWithScroll()
        this.scrollFunction()
        this.arrowAppearWithScroll()
        setTimeout(() => {
            this.rollWord()
        }, 500);

    }
}
</script>

<template>
    <div class="bg_snow ">

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

                <div class="info_contaienr px-2 pt-3 col-lg-6 text-center text-sm-start z_index50">


                    <!-- NEW TITLE -->
                    <div class="animated-title">
                        <div class="text-top ghost3">
                            <div>
                                <span class="title_size fw-semibold" style="color: #393939;">Hi,</span>
                                <span class="title_size fw-semibold" style="color: #656565;">I'm Damiano</span>
                            </div>
                        </div>
                        <div class="text-bottom">
                            <div class="title_size d-flex no-wrap">
                                <div class="d-flex grow-1 fw-semibold text overflow-hidden"
                                    style="white-space: nowrap; height: 2em;">
                                    <span class="word1 grow-1 wisteria position-relative"
                                        style="color: #acacac;">Fullstack</span>
                                    <span class="word2 grow-1 d-none wisteria position-relative"
                                        style="color: #959595;">Backend</span>
                                    <span class="word3 grow-1 d-none wisteria position-relative"
                                        style="color: #959595;">Frontend</span>
                                </div>
                                &nbsp;
                                <div class="fw-semibold shrink-1" style="color: #acacac;white-space: nowrap;"> web developer
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
                <h1 class="text-center d-block d-md-none fw-semibold" style="position: sticky;top: 20px;color:  #393939;"
                    id="projects">
                    Porfolio
                </h1>


                <div class="scroll_element mb-4 d-flex" style="position: sticky;top: 86px;">
                    <div class="col">
                        <div class=" d-flex justify-content-center mt-4" style="position: sticky;"
                            v-for=" (project, index)   in   projects.data  "
                            :style="{ top: `calc(86px + ${index + 1}rem)` }">
                            <!-- :style="{ top: `calc(86px + ${index + 1}rem)`, transform: `rotate(${index * 0.6}deg)` }"> -->

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
                                            :alt="project.title + ' image'">
                                        <div class="p-3 fw-semibold text_shadow2 text-white position-absolute top-0 end-0">
                                            {{
                                                project.type.name
                                            }}
                                        </div>
                                    </div>
                                </div>
                            </router-link>

                        </div>
                    </div>
                    <div class="right_main_side col-7 d-none d-md-flex flex-column justify-content-center align-items-center px-4 py-5"
                        :class="{ 'd-none': ghost }" style="position: sticky;top: 250px;">
                        <div class="right_main_side d-md-flex flex-column justify-content-center align-items-start p-3  "
                            style="position: sticky;top: 250px;">

                            <h1 class="fw-semibold fade_right position-relative text-center" style="color: #393939;">About
                                me</h1>

                            <p class="fw-semibold  fade_right2 position-relative" style="color:  #393939;">I'm a passionate
                                web developer with a keen
                                interest in
                                modern web
                                technologies.</p>

                            <p class=" fw-semibold fade_right3 position-relative" style="color: #393939;">I am a
                                full-stack
                                developer, proficient in
                                both
                                front-end and backend programming, dedicated to crafting websites from conception to
                                implementation, ensuring a comprehensive and seamless user experience.</p>

                            <p class="fw-semibold  fade_right4 position-relative" style="color: #393939;">My goal is to
                                combine aesthetics with
                                functionality to
                                deliver an exceptional user
                                experience.</p>

                            <div class="shape_container position-absolute position3">
                                <div class="shape "></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- PAGINATION SIDE  -->

        <!-- <PaginationController @prev="getProjects(projects.prev_page_url)" @next="getProjects(projects.next_page_url)"
            :prev_condition="projects.prev_page_url" :next_condition="projects.next_page_url" /> -->

        <!-- CAROUSEL  -->

        <div class="carousel bg-dark d-flex">
            <div class="img_container">
                <img :src="getImagePath()" alt="">
            </div>

        </div>


        <!-- ARROW TO GO BACK  -->

        <div class="arrow position-fixed bottom-0 light_shadow m-2 scale_hover_less z-3">

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

<style lang="scss"></style>