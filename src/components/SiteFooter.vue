<script>
// import axios from 'axios';

export default {
    name: "SiteFooter",
    data() {


    },
    components: {
    },
    mounted() {
    }

}
</script>

<template>
    <div class="d-flex justify-content-center bg_carbon position-relative" style="height: 80px;">
        <nav class="example d-flex flex-column justify-content-center align-items-center text-light font_s11">
           <div> 
               Copyright &copy; Damiano Casolari
           </div> 
           <div>
               <router-link :to="{ name: 'cookiePolicy' }" class="text-decoration-none">
                   <span class="text-white font_s9">Cookie Policy  </span>
                </router-link>
                <span class="font_s9"> · </span>
                <router-link :to="{ name: 'privacyPolicy' }" class="text-decoration-none">
                    <span class="text-white font_s9"> Privacy Policy</span>
                </router-link>
            </div>
        </nav>
    </div>
</template>

<style lang="scss"></style>