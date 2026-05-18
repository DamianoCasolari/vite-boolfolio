<script>
import * as bootstrap from "bootstrap";
import { languageState, cookieBannerDismissed } from "../assets/js/language.js";

export default {
    name: "OfferToast",
    data() {
        return {
            languageState,
            visible: false,
            _timerId: null,
        };
    },
    methods: {
        startTimer() {
            this._timerId = setTimeout(() => {
                this.visible = true;
            }, 5000);
        },
        dismiss() {
            this.visible = false;
            localStorage.setItem("offerToastShown", "1");
        },
        openModal() {
            this.dismiss();
            const el = document.getElementById("welcomeModal");
            if (!el) return;
            const instance = bootstrap.Modal.getInstance(el) || new bootstrap.Modal(el);
            instance.show();
        },
    },
    mounted() {
        if (localStorage.getItem("offerToastShown") === "1") return;

        this.$watch(
            () => cookieBannerDismissed.value,
            (dismissed) => {
                if (dismissed) this.startTimer();
            },
            { immediate: true }
        );
    },
    unmounted() {
        if (this._timerId) clearTimeout(this._timerId);
    },
};
</script>

<template>
    <Transition name="toast_slide">
        <div v-if="visible" class="offer_toast" role="status" aria-live="polite">
            <div class="offer_toast_body" @click="openModal">
                <div class="offer_toast_badge">%</div>
                <div class="offer_toast_text">
                    <div class="offer_toast_title">
                        {{ languageState.eng_lan ? "2026 Special Offer" : "Offerta 2026" }}
                    </div>
                    <div class="offer_toast_sub">
                        {{ languageState.eng_lan
                            ? "Tap to discover"
                            : "Tocca per scoprire" }}
                    </div>
                </div>
            </div>
            <button class="offer_toast_close" @click.stop="dismiss" aria-label="Chiudi">×</button>
        </div>
    </Transition>
</template>

<style scoped>
.offer_toast {
    position: fixed;
    bottom: 92px;
    right: 24px;
    z-index: 9998;
    display: flex;
    align-items: center;
    gap: 8px;
    background: rgba(18, 18, 18, 0.90);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-radius: 18px;
    padding: 12px 12px 12px 14px;
    color: #fff;
    max-width: 290px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.22);
}

/* Mobile: stesso stile del cookie banner, full-width in fondo */
@media (max-width: 767px) {
    .offer_toast {
        right: 10px;
        left: 10px;
        bottom: 20px;
        max-width: none;
        border-radius: 16px;
    }
}

.offer_toast_body {
    display: flex;
    align-items: center;
    gap: 12px;
    flex: 1;
    cursor: pointer;
}

.offer_toast_badge {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.12);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
    font-size: 16px;
    flex-shrink: 0;
}

.offer_toast_title {
    font-weight: 700;
    font-size: 13px;
    line-height: 1.2;
}

.offer_toast_sub {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.55);
    margin-top: 2px;
}

.offer_toast_close {
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.4);
    font-size: 22px;
    line-height: 1;
    padding: 0 4px;
    cursor: pointer;
    flex-shrink: 0;
    transition: color 0.2s;
}

.offer_toast_close:hover {
    color: #fff;
}

.toast_slide-enter-active {
    transition: transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease;
}

.toast_slide-leave-active {
    transition: transform 0.22s ease-in, opacity 0.18s ease;
}

.toast_slide-enter-from,
.toast_slide-leave-to {
    transform: translateY(24px);
    opacity: 0;
}
</style>
