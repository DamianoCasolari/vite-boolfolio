<script>
// import axios from 'axios';
import { languageState, reopenCookieBanner } from "../assets/js/language";

export default {
    name: "SiteFooter",
    data() {
        return {
            languageState
        }
    },
    components: {
    },
    methods: {
        openCookieSettings() {
            reopenCookieBanner.value = true;
        }
    },
    mounted() {
    }

}
</script>

<template>
    <div class="site_footer d-flex justify-content-center bg_carbon position-relative" style="height: 80px;">
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
                <span class="font_s9"> · </span>
                <button type="button" class="footer_cookie_settings_btn text-white font_s9" @click="openCookieSettings">
                    {{ languageState.eng_lan ? 'Manage cookies' : 'Gestisci cookie' }}
                </button>
            </div>
        </nav>
    </div>
</template>

<style lang="scss" scoped>
    .footer_cookie_settings_btn {
        background: none;
        border: none;
        padding: 0;
        font: inherit;
        text-decoration: none;
        cursor: pointer;
    }
</style>