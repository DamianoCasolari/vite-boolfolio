<script>
import axios from 'axios';



export default {
    components: {

    },
    data() {
        return {
            base_URL: 'http://127.0.0.1:8000/',
            projects_API: 'api/projects',
            loading: true,
            projects: [],
            error: null
        }

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
        }
    },
    mounted() {
        this.getProjects(this.base_URL + this.projects_API)
    }

}
</script>

<template>
    <section class="vue-home">
        <div class="container">
            <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3">
                <div class="col" v-for="project in projects">
                    <div class="card" style="width:18rem;">

                        <!-- <img src="https://images.unsplash.com/photo-1561154464-82e9adf32764?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
                        class="card-img-top" alt="..."> -->
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

<style lang="scss"></style>
