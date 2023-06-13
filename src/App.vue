<script>
import axios from 'axios';
import SiteHeader from './components/SiteHeader.vue';
import SiteMain from './components/SiteMain.vue';


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
        SiteHeader,
        SiteMain,

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
    <SiteHeader />
    <SiteMain />
</template>

<style lang="scss"></style>
