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
            projects: []
        }

    },
    methods: {
        getProjects(url) {
            axios.get(url).then(response => {
                console.log(response);
            }).catch(error => console.log(error))
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
            <div class="row">
                vlog
            </div>
        </div>
    </section>
</template>

<style lang="scss"></style>
