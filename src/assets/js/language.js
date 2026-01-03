import { reactive } from 'vue';

export const languageState = reactive({
    eng_lan: false,
    toggle() {
        this.eng_lan = !this.eng_lan;
    }
});