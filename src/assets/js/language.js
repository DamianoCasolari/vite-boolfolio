import { reactive, ref } from 'vue';

export const languageState = reactive({
    eng_lan: false,
    toggle() {
        this.eng_lan = !this.eng_lan;
        // i lettori di schermo scelgono lingua e pronuncia da <html lang>
        document.documentElement.lang = this.eng_lan ? 'en' : 'it';
    }
});

export const firstLoading = ref(true);

export const heroSeen = ref(false);

export const cookieBannerDismissed = ref(false);

export const reopenCookieBanner = ref(false);

export const appReady = ref(false);