<script>
import axios from 'axios';


export default {
    name: 'SingleProject',
    data() {
        return {
            base_URL: 'http://127.0.0.1:8000/',
            projects_API: 'api/projects',
            loading: true,
            project: [],
            error: null

        }

    },
    methods: {
        // const url = this.base_URL + projects_API + this.$route.params.slug;
        // console.log(url);
    },


    components: {

    },
    mounted() {
    }
}


</script>

<template></template>

<style lang="scss"></style>
