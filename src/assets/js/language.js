import { reactive, ref } from 'vue';

export const languageState = reactive({
    eng_lan: false,
    toggle() {
        this.eng_lan = !this.eng_lan;
    }
});

export const firstLoading = ref(true);