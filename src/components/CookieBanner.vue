<template>
    <transition name="cookie-slide">
        <div v-if="showBanner" class="cookie-banner">

            <div class="cookie-content">

                <div class="cookie-text">
                    <h4 class="text-white">Cookie</h4>
                    <p class="text-white">
                       {{languageState.eng_lan ?  `Questo sito utilizza cookie analytics per migliorare l’esperienza utente.
                        Per maggiori informazioni, consulta la nostra` : `This website uses analytics cookies to enhance the user experience. For more information, please refer to our`}}
                        <router-link :to="{ name: 'cookiePolicy' }" class="text-decoration-none">
                            <span class="text-white fw-bold">Cookie Policy</span>
                        </router-link>.
                    </p>
                </div>

                <div class="cookie-actions">
                    <button class="btn-reject" @click="onReject">
                        Rifiuta
                    </button>

                    <button class="btn-accept" @click="onAccept">
                        Accetta
                    </button>
                </div>

            </div>

        </div>
    </transition>
</template>

<script setup>
    import { ref, onMounted } from "vue";
    import { languageState } from "../assets/js/language";
    import { acceptCookies, rejectCookies, getCookieChoice } from '../assets/js/analytics';

    const showBanner = ref(false);

    onMounted(() => {
        if (!getCookieChoice()) {
            showBanner.value = true;
        }
    });

    function onAccept() {
        acceptCookies();
        showBanner.value = false;
    }

    function onReject() {
        rejectCookies();
        showBanner.value = false;
    }
</script>

<style scoped>

    .cookie-banner {
        position: fixed;
        bottom: 20px;
        left: 0;
        right: 0;
        display: flex;
        justify-content: center;
        z-index: 9999;
        padding: 0 10px;
    }

    .cookie-content {
        max-width: 900px;
        width: 100%;
        background: rgba(30, 30, 30, 0.85);
        backdrop-filter: blur(14px);
        border-radius: 16px;
        padding: 22px 22px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: start;
        gap: 0px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
    }

    .cookie-text h4 {
        font-size: 15px;
        margin-bottom: 6px;
        font-weight: 600;
    }

    .cookie-text p {
        font-size: 14px;
        opacity: 0.85;
    }

    .cookie-actions {
        display: flex;
        gap: 12px;
        justify-content: end;
        width: 100%;
    }

    .btn-reject {
        background: transparent;
        border: 1px solid rgba(255, 255, 255, 0.25);
        color: white;
        padding: 8px 16px;
        border-radius: 8px;
        transition: 0.2s;
    }

    .btn-reject:hover {
        border-color: white;
    }

    .btn-accept {
        background: white;
        color: black;
        padding: 8px 18px;
        border-radius: 8px;
        font-weight: 500;
        transition: 0.2s;
    }

    .btn-accept:hover {
        transform: translateY(-1px);
        box-shadow: 0 6px 14px rgba(0, 0, 0, 0.2);
    }

    /* animazione */

    .cookie-slide-enter-active {
        transition: all .4s ease;
    }

    .cookie-slide-enter-from {
        opacity: 0;
        transform: translateY(40px);
    }

</style>