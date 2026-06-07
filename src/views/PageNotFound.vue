<script>
    import { languageState } from "../assets/js/language";
    export default {
        name: 'PageNotFound',
        setup() {


            return { languageState }
        }
    }
</script>

<template>
    <div class="policy-page position-relative overflow-hidden d-flex justify-content-center align-items-center flex-column" style="min-height: 100vh; background: #1a1a1a;">

        <div class="shape_container position-absolute policy-blob-pos1">
            <div class="policy-blob policy-blob--1"></div>
        </div>
        <div class="shape_container position-absolute policy-blob-pos2">
            <div class="policy-blob policy-blob--2"></div>
        </div>

        <div class="z-3 position-relative d-flex flex-column align-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor"
                class="bi bi-exclamation-triangle text-white flash m-4 text_shadow" viewBox="0 0 16 16">
                <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z" />
                <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z" />
            </svg>
            <h2 class="text-white h2">404</h2>
            <h2 class="text-white h2">{{ languageState.eng_lan ? 'Page not found' : 'Pagina non trovata' }}</h2>
            <router-link :to="{ name: 'home' }" class="text-decoration-none">
                <div class="px-4 py-2 border border-0 back_button rounded-4 fs-6 mt-4">{{ languageState.eng_lan ? 'Back to home' : 'Torna alla home' }}</div>
            </router-link>
        </div>

    </div>
</template>


<style lang="scss" scoped>
    .back_button {
        background-color: rgba(255, 255, 255, 0.671);
        color: rgba(51, 48, 48, 0.715);
        ;
        transition-duration: 0.7s;
        z-index: 100;
        position: relative;


    }


    .back_button:hover {

        background-color: transparent;
        color: rgb(250, 250, 250);

        border: 0 !important;
        letter-spacing: 3px;
        font-weight: bold;
        font-size: 18x;
        border-top: 1px solid rgb(250, 250, 250) !important;
        border-bottom: 1px solid rgb(250, 250, 250) !important;
        border-radius: 0 !important;
    }

    .policy-blob-pos1 {
        left: -60px;
        bottom: -200px;
    }

    .policy-blob-pos2 {
        right: -80px;
        top: -150px;
    }

    .policy-blob {
        animation: morph 8s ease-in-out infinite;
        border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
        transition: all 1s ease-in-out;
    }

    .policy-blob--1 {
        background: linear-gradient(#3a3a3a 25%, #505050 55%);
        height: 300px;
        width: 300px;
        opacity: 0.7;
    }

    .policy-blob--2 {
        background: linear-gradient(#2e2e2e 25%, #424242 55%);
        height: 500px;
        width: 500px;
        opacity: 0.5;
    }

    @keyframes morph {
        0%   { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
        50%  { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
        100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
    }
</style>