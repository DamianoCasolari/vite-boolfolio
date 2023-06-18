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
                    this.project = response.data.result
                    // console.log(this.project);
                    this.loading = false

                } else {
                    this.error = response.data.result
                    console.log(this.error);
                }

            }).catch(error => {
                console.log(error)
                this.error = error.message
            }
            )
        },
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
    <div class="single_project">
        <div v-if="project">
            <div>{{ project.title }}</div>

        </div>
        <div v-else>
            {{ error }}

        </div>
        <!-- <div>{{ $route.fullPath }}</div>
        <div>{{ $route.hash }}</div>
        <div>{{ $route.path }}</div>
        <div>{{ $route.name }}</div> -->
    </div>
</template>

<style lang="scss"></style>
