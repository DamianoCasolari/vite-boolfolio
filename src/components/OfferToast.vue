<script>
import * as bootstrap from "bootstrap";
import { languageState, cookieBannerDismissed } from "../assets/js/language.js";

const MOBILE_BREAKPOINT = 767;
const MOBILE_BOTTOM_OFFSET = 20; // deve combaciare col "bottom" di .offer_toast su mobile (CSS)
const DOCK_GAP = 12; // spazio tra la card e il footer quando è "agganciata"
const WA_LINK =
    "https://wa.me/3477952189?text=Buongiorno%2C%0Asono%20%5BNome%5D%20e%20vi%20contatto%20per%20avere%20informazioni%20sulla%20realizzazione%20di%20un%20sito%20web%20per%20la%20mia%20attivit%C3%A0.%0AResto%20in%20attesa%20di%20un%20vostro%20riscontro%2C%20grazie.";

export default {
    name: "OfferToast",
    data() {
        return {
            languageState,
            isMobileView: false,
            cookieDismissed: false,
            heroRevealed: false, // scrollato oltre metà hero (rilevante solo in modalità "offer")
            manuallyDismissed: false,
            modalOpen: false,
            docked: false,
            dockTop: 0,
            waLink: WA_LINK,
        };
    },
    computed: {
        // Desktop: sempre l'offerta, su ogni pagina (comportamento invariato).
        // Mobile: l'offerta resta solo nella home; nella pagina Servizi c'è già
        // una sua CTA WhatsApp contestuale (non la duplichiamo); altrove mostriamo
        // sempre e solo la CTA WhatsApp.
        mode() {
            if (!this.isMobileView) return "offer";
            if (this.$route.name === "home") return "offer";
            if (this.$route.name === "services") return "none";
            if (this.$route.name === "about") return "none"; // troppo invasiva su questa pagina
            if (this.$route.name === "single-project") return "none"; // ha già la sua CTA WA sotto la descrizione
            if (this.$route.name === "privacyPolicy") return "none"; // non ha senso contattare via WA da qui
            if (this.$route.name === "cookiePolicy") return "none"; // idem
            return "wa";
        },
        // Su Contatti c'è già il form: la CTA WA si presenta come alternativa,
        // non come doppione — leva il form invece di ripetere "scrivimi su WhatsApp".
        waCopy() {
            if (this.$route.name === "contacts") {
                return this.languageState.eng_lan
                    ? { title: "Prefer WhatsApp?", sub: "Skip the form, quick reply" }
                    : { title: "Preferisci WhatsApp?", sub: "Salta il form, risposta rapida" };
            }
            return this.languageState.eng_lan
                ? { title: "WhatsApp", sub: "Message me" }
                : { title: "WhatsApp", sub: "Scrivimi un messaggio" };
        },
        visible() {
            if (this.mode === "none") return false;
            if (this.modalOpen) return false; // sparisce del tutto, non solo coperta, mentre la modale è aperta
            if (!this.cookieDismissed) return false;
            if (this.manuallyDismissed) return false;
            if (this.mode === "wa") return true; // sempre visibile finché non la si chiude a mano
            return this.heroRevealed;
        },
    },
    methods: {
        updateMobileFlag() {
            this.isMobileView = window.innerWidth <= MOBILE_BREAKPOINT;
        },

        // "offer": compare dopo che si è scrollato metà della hero, al posto di un timer fisso.
        // È un "una volta sola": una volta comparsa resta lì, non deve sparire se si
        // torna a scrollare verso l'alto (niente effetto on/off legato alla direzione).
        updateHeroRevealed() {
            if (this.heroRevealed) return;
            const hero = document.querySelector(".jumbotron");
            const threshold = hero ? hero.offsetHeight * 0.5 : window.innerHeight * 0.5;
            if (window.scrollY >= threshold) this.heroRevealed = true;
        },

        // su mobile la card è "fixed" in fondo, ma non deve mai coprire il footer:
        // quando il footer si avvicina al punto dove la card fixed la coprirebbe,
        // la si aggancia (position: absolute) subito sopra di esso, così scorre
        // via col resto della pagina invece di restarci sopra.
        updateDock() {
            if (!this.isMobileView) {
                this.docked = false;
                return;
            }
            const el = this.$refs.toastEl;
            const footer = document.querySelector(".site_footer");
            if (!el || !footer) {
                this.docked = false;
                return;
            }

            const toastHeight = el.offsetHeight;
            const naturalBottomEdge = window.innerHeight - MOBILE_BOTTOM_OFFSET;
            const footerTop = footer.getBoundingClientRect().top;
            const limitBottomEdge = footerTop - DOCK_GAP;

            if (limitBottomEdge < naturalBottomEdge) {
                this.docked = true;
                this.dockTop = limitBottomEdge - toastHeight + window.scrollY;
            } else {
                this.docked = false;
            }
        },

        handleScrollOrResize() {
            this.updateMobileFlag();
            this.updateHeroRevealed();
            this.updateDock();
        },

        dismiss() {
            this.manuallyDismissed = true;
        },
        openModal() {
            const el = document.getElementById("welcomeModal");
            if (!el) return;
            const instance = bootstrap.Modal.getInstance(el) || new bootstrap.Modal(el);
            instance.show();
        },
    },
    watch: {
        "$route.name"(name) {
            // ogni nuovo arrivo in home è una "visita" a sé: se l'offerta era stata
            // chiusa (o già mostrata) in una visita precedente, deve poter ricomparire
            // scrollando di nuovo, altrimenti resta muta per sempre dopo la prima volta
            if (name === "home") {
                this.manuallyDismissed = false;
                this.heroRevealed = false;
            }
            this.$nextTick(this.handleScrollOrResize);
        },
        visible(isVisible) {
            if (isVisible) this.$nextTick(this.updateDock);
        },
    },
    mounted() {
        this.$watch(
            () => cookieBannerDismissed.value,
            (dismissed) => {
                this.cookieDismissed = dismissed;
            },
            { immediate: true }
        );
        this.handleScrollOrResize();
        window.addEventListener("scroll", this.handleScrollOrResize, { passive: true });
        window.addEventListener("resize", this.handleScrollOrResize, { passive: true });

        // la card deve sparire del tutto mentre la modale offerta è aperta, non
        // solo restarci coperta sotto
        this._onModalShow = () => { this.modalOpen = true; };
        this._onModalHidden = () => { this.modalOpen = false; };
        this._modalEl = document.getElementById("welcomeModal");
        if (this._modalEl) {
            this._modalEl.addEventListener("show.bs.modal", this._onModalShow);
            this._modalEl.addEventListener("hidden.bs.modal", this._onModalHidden);
        }
    },
    unmounted() {
        window.removeEventListener("scroll", this.handleScrollOrResize);
        window.removeEventListener("resize", this.handleScrollOrResize);
        if (this._modalEl) {
            this._modalEl.removeEventListener("show.bs.modal", this._onModalShow);
            this._modalEl.removeEventListener("hidden.bs.modal", this._onModalHidden);
        }
    },
};
</script>

<template>
    <Transition name="toast_slide">
        <div
            v-if="visible"
            ref="toastEl"
            class="offer_toast"
            :class="{ offer_toast__wa: mode === 'wa' }"
            :style="docked ? { position: 'absolute', top: dockTop + 'px', bottom: 'auto' } : null"
            role="status"
            aria-live="polite"
        >
            <component
                :is="mode === 'wa' ? 'a' : 'div'"
                class="offer_toast_body"
                v-bind="mode === 'wa' ? { href: waLink, target: '_blank', rel: 'noopener noreferrer' } : {}"
                @click="mode === 'offer' && openModal()"
            >
                <div class="offer_toast_badge">
                    <svg v-if="mode === 'wa'" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    <template v-else>%</template>
                </div>
                <div class="offer_toast_text">
                    <div class="offer_toast_title">
                        <template v-if="mode === 'wa'">{{ waCopy.title }}</template>
                        <template v-else>{{ languageState.eng_lan ? "2026 Special Offer" : "Offerta 2026" }}</template>
                    </div>
                    <div class="offer_toast_sub">
                        <template v-if="mode === 'wa'">{{ waCopy.sub }}</template>
                        <template v-else>{{ languageState.eng_lan ? "Tap to discover" : "Tocca per scoprire" }}</template>
                    </div>
                </div>
            </component>
            <button v-if="mode === 'offer' || mode === 'wa'" class="offer_toast_close" @click.stop="dismiss" aria-label="Chiudi">×</button>
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

    /* niente chiusura manuale per l'offerta su mobile: la comparsa è automatica.
       La variante WhatsApp invece resta chiudibile — può capitare copra un
       bottone della pagina (es. l'invio del form in Contatti). */
    .offer_toast:not(.offer_toast__wa) .offer_toast_close {
        display: none;
    }
}

.offer_toast_body {
    display: flex;
    align-items: center;
    gap: 12px;
    flex: 1;
    cursor: pointer;
    text-decoration: none;
    color: inherit;
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

.offer_toast__wa .offer_toast_badge {
    background: rgba(37, 211, 102, 0.22);
    color: #25d366;
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
