<template>
    <transition name="cookie-slide">
        <div v-if="showBanner" ref="bannerEl" class="cookie-banner">

            <div class="cookie-content  ">

                <div class="cookie-text ">
                    <h4 class="text-white">Cookie</h4>
                    <p class="text-white">
                       {{!languageState.eng_lan ?  `Questo sito utilizza cookie analytics per migliorare l’esperienza utente.
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
    import { ref, watch, nextTick, onMounted, onUnmounted } from "vue";
    import { languageState, cookieBannerDismissed, reopenCookieBanner } from "../assets/js/language";
    import { acceptCookies, rejectCookies, getCookieChoice } from '../assets/js/analytics';

    const showBanner = ref(false);
    const bannerEl = ref(null);
    let bannerResizeObserver = null;

    // Il banner è fisso sopra al contenuto: pubblica il proprio bordo inferiore
    // come variabile CSS globale, così le pagine che altrimenti gli finirebbero
    // sotto (es. le policy su mobile) possono lasciargli lo spazio esatto e
    // richiuderlo da sole quando sparisce. Vale 0px quando non è a schermo.
    function publishBannerBottom(px) {
        document.documentElement.style.setProperty('--cookie-banner-bottom', `${px}px`);
    }

    function measureBanner() {
        const el = bannerEl.value;
        if (!el) return;
        // offsetTop/offsetHeight e non getBoundingClientRect(): il primo ignora
        // la transform dell'animazione di entrata, che altrimenti farebbe
        // misurare il banner 40px piu' in alto della sua posizione finale.
        publishBannerBottom(el.offsetTop + el.offsetHeight);
    }

    watch(showBanner, async (visible) => {
        if (!visible) {
            bannerResizeObserver?.disconnect();
            bannerResizeObserver = null;
            publishBannerBottom(0);
            return;
        }

        await nextTick();
        measureBanner();
        // l'altezza cambia con la larghezza dello schermo e con la lingua
        bannerResizeObserver = new ResizeObserver(measureBanner);
        bannerResizeObserver.observe(bannerEl.value);
    });

    onMounted(() => {
        if (!getCookieChoice()) {
            showBanner.value = true;
        } else {
            cookieBannerDismissed.value = true;
        }
    });

    onUnmounted(() => {
        bannerResizeObserver?.disconnect();
        publishBannerBottom(0);
    });

    watch(reopenCookieBanner, (val) => {
        if (val) {
            showBanner.value = true;
            reopenCookieBanner.value = false;
        }
    });

    function onAccept() {
        acceptCookies();
        cookieBannerDismissed.value = true;
        showBanner.value = false;
    }

    function onReject() {
        rejectCookies();
        cookieBannerDismissed.value = true;
        showBanner.value = false;
    }
</script>

<style scoped>

    .cookie-banner {
        position: fixed;
        top: 50px;
        left: 0;
        right: 0;
        display: flex;
        justify-content: center;
        z-index: 9999;
        padding: 0 10px;
    }

    .cookie-content {
        max-width: 1320px;
        width: 100%;
        background: rgba(30, 30, 30, 0.85);
        backdrop-filter: blur(14px);
        border-radius: 16px;
        padding: 15px 15px;
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

    .btn-reject,
    .btn-accept {
        background: rgba(255, 255, 255, 0.12);
        border: 1px solid rgba(255, 255, 255, 0.35);
        color: white;
        padding: 8px 18px;
        border-radius: 8px;
        font-weight: 500;
        transition: 0.2s;
        font-size: 13px;
    }

    .btn-reject:hover,
    .btn-accept:hover {
        background: rgba(255, 255, 255, 0.2);
        border-color: white;
    }

    /* animazione */

    .cookie-slide-enter-active {
        transition: all .4s ease;
    }

    .cookie-slide-enter-from {
        opacity: 0;
        transform: translateY(-40px);
    }

</style>