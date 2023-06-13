<script>
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
    <section class="vue-home">
        <div class="container">
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 mb-4">
                <div class="col mt-4" v-for="project in projects">
                    <div class="card h-100 ">

                        <img :src="getImagePath(project.logo)" class="card-img-top" :alt="project.title + ' image'">
                        <div class="card-body">
                            <h5 class="card-title">{{ project.title }}</h5>
                            <a href="{{ project.link }}">
                                <h6 class="card-subtitle mb-2 text-muted ">{{ project.link }}</h6>
                            </a>
                            <p class="card-text">{{ project.functionality }}.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style lang="scss">
@use'../styles/general.scss'
</style>