<script>
    import { languageState } from "../assets/js/language.js";
    export default {
        name: "ServicesMobile",
        data() {
            return { languageState, entered: false, ready: false, selectedCard: null, ctaVisible: false, _ctaTimer: null };
        },
        methods: {
            selectCard(i) {
                if (!this.ready) return;
                this.selectedCard = this.selectedCard === i ? null : i;
                clearTimeout(this._ctaTimer);
                if (this.selectedCard !== null) {
                    this.ctaVisible = false;
                    this._ctaTimer = setTimeout(() => { this.ctaVisible = true; }, 1500);
                } else {
                    this.ctaVisible = false;
                }
            },
        },
        mounted() {
            requestAnimationFrame(() => {
                this.entered = true;
                setTimeout(() => {
                    this.entered = false;
                    this.ready = true;
                }, 950);
            });
        },
    };
</script>

<template>
    <div class="mob_services" :class="{ entered, ready, 'has-selection': selectedCard !== null }">

        <!-- CARD 1 — Sito Vetrina -->
        <div class="mob_card mob_card--light" @click="selectCard(0)" :class="{ 'is-selected': selectedCard === 0 }">
            <button v-if="selectedCard === 0" class="mob_close" @click.stop="selectedCard = null" aria-label="Chiudi">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
            <span class="mob_num" aria-hidden="true">01</span>
            <div class="mob_card__body">
                <h2 class="mob_title">
                    {{ languageState.eng_lan ? 'Showcase Website' : 'Sito Vetrina' }}
                </h2>
                <p class="mob_desc">
                    <span v-if="languageState.eng_lan">
                        A <strong>polished online presence</strong>, fast and built to
                        <strong>turn visitors into clients</strong>.
                    </span>
                    <span v-else>
                        Una <strong>presenza online curata</strong>, veloce e costruita per
                        <strong>convertire visitatori in clienti</strong>.
                    </span>
                </p>
            </div>
            <Transition name="mob-expand">
                <div v-show="selectedCard === 0" class="mob_expanded">
                    <div class="mob_feat_card">
                        <span class="mob_exp_label">{{ languageState.eng_lan ? "What's included" : 'Cosa include' }}</span>
                        <ul class="mob_feat_list">
                            <li>
                                <span v-if="languageState.eng_lan"><strong>Custom design</strong> tailored to your brand</span>
                                <span v-else><strong>Design personalizzato</strong> sul tuo brand</span>
                            </li>
                            <li>
                                <span v-if="languageState.eng_lan"><strong>Performance</strong> optimised (Lighthouse 90+)</span>
                                <span v-else><strong>Performance</strong> ottimizzate (Lighthouse 90+)</span>
                            </li>
                            <li>
                                <span v-if="languageState.eng_lan"><strong>Basic SEO</strong> & social meta tags</span>
                                <span v-else><strong>SEO di base</strong> e meta tag social</span>
                            </li>
                            <li>
                                <span v-if="languageState.eng_lan"><strong>Deployment</strong> & hosting setup</span>
                                <span v-else><strong>Deploy</strong> e configurazione hosting</span>
                            </li>
                        </ul>
                    </div>
                    <div class="mob_img_preview">
                        <img src="/immagini-progetti/gds-port.png" alt="Esempio sito vetrina" />
                    </div>
                </div>
            </Transition>
        </div>

        <!-- CARD 2 — Applicazione Web -->
        <div class="mob_card mob_card--dark" @click="selectCard(1)" :class="{ 'is-selected': selectedCard === 1 }">
            <button v-if="selectedCard === 1" class="mob_close" @click.stop="selectedCard = null" aria-label="Chiudi">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
            <span class="mob_num" aria-hidden="true">02</span>
            <div class="mob_card__body">
                <h2 class="mob_title">
                    {{ languageState.eng_lan ? 'Web Application' : 'Applicazione Web' }}
                </h2>
                <p class="mob_desc">
                    <span v-if="languageState.eng_lan">
                        <strong>E-commerce</strong>, management platforms and internal tools
                        with <strong>custom automations</strong>.
                    </span>
                    <span v-else>
                        <strong>E-commerce</strong>, <strong>portali</strong> e gestionali con
                        <strong>automazioni su misura</strong>.
                    </span>
                </p>
            </div>
            <Transition name="mob-expand">
                <div v-show="selectedCard === 1" class="mob_expanded">
                    <div class="mob_feat_card">
                        <span class="mob_exp_label">{{ languageState.eng_lan ? 'What will we build?' : 'Su cosa lavoreremo?' }}</span>
                        <ul class="mob_feat_list">
                            <li>
                                <span v-if="languageState.eng_lan"><strong>Custom applications</strong> built around your business</span>
                                <span v-else><strong>Applicazioni su misura</strong> costruite attorno al tuo business</span>
                            </li>
                            <li>
                                <span v-if="languageState.eng_lan"><strong>Custom admin dashboard</strong>, no third-party lock-in</span>
                                <span v-else><strong>Dashboard admin</strong> su misura, zero dipendenze esterne</span>
                            </li>
                            <li>
                                <span v-if="languageState.eng_lan"><strong>Automations</strong> that cut repetitive manual work</span>
                                <span v-else><strong>Automazioni</strong> che eliminano il lavoro manuale</span>
                            </li>
                            <li>
                                <span v-if="languageState.eng_lan"><strong>Deploy & hosting</strong> included — go live without touching a server</span>
                                <span v-else><strong>Deploy e hosting</strong> inclusi — online senza configurare nulla</span>
                            </li>
                        </ul>
                    </div>
                    <div class="mob_img_preview">
                        <img src="/immagini-progetti/image001.png" alt="Esempio web application" />
                    </div>
                </div>
            </Transition>
        </div>

        <!-- CARD 3 — Progetto Custom -->
        <div class="mob_card mob_card--light" @click="selectCard(2)" :class="{ 'is-selected': selectedCard === 2 }">
            <button v-if="selectedCard === 2" class="mob_close" @click.stop="selectedCard = null" aria-label="Chiudi">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
            <span class="mob_num" aria-hidden="true">03</span>
            <div class="mob_card__body">
                <h2 class="mob_title">
                    {{ languageState.eng_lan ? 'Custom Project' : 'Progetto Custom' }}
                </h2>
                <p class="mob_desc">
                    <span v-if="languageState.eng_lan">
                        A <strong>specific need</strong> or unconventional idea?
                        <strong>Let's talk</strong> — we'll find the right approach.
                    </span>
                    <span v-else>
                        Un'<strong>esigenza specifica</strong> o un'idea fuori dagli standard?
                        <strong>Parliamone</strong> — troviamo l'approccio giusto.
                    </span>
                </p>
            </div>
            <Transition name="mob-expand">
                <div v-show="selectedCard === 2" class="mob_expanded">
                    <div class="mob_feat_card">
                        <span class="mob_exp_label">{{ languageState.eng_lan ? 'How it works' : 'Come funziona' }}</span>
                        <ul class="mob_feat_list">
                            <li>
                                <span v-if="languageState.eng_lan"><strong>Free initial call</strong> to explore the idea</span>
                                <span v-else><strong>Call gratuita</strong> per esplorare l'idea</span>
                            </li>
                            <li>
                                <span v-if="languageState.eng_lan">Tech stack chosen for your <strong>specific need</strong></span>
                                <span v-else>Stack scelto per <strong>la tua esigenza</strong></span>
                            </li>
                            <li>
                                <span v-if="languageState.eng_lan"><strong>Iterative approach</strong> with ongoing feedback</span>
                                <span v-else><strong>Approccio iterativo</strong> con feedback continuo</span>
                            </li>
                            <li>
                                <span v-if="languageState.eng_lan"><strong>Direct, transparent</strong> communication</span>
                                <span v-else>Comunicazione <strong>diretta e trasparente</strong></span>
                            </li>
                        </ul>
                    </div>
                    <div class="mob_img_preview">
                        <img src="/immagini-progetti/silos.png" alt="Esempio progetto custom" />
                    </div>
                </div>
            </Transition>
        </div>

        <!-- WA CTA — fixed, visibile solo con card selezionata -->
        <Transition name="wa-btn">
        <a
            v-if="ctaVisible"
            href="https://wa.me/3477952189?text=Ciao%20Damiano!%20Vorrei%20usufruire%20della%20call%20gratuita%20che%20offri.%0AHo%20visto%20i%20tuoi%20servizi%20e%20mi%20piacerebbe%20parlare%20di%20un%20progetto%20a%20cui%20sto%20pensando."
            target="_blank"
            rel="noopener noreferrer"
            class="mob_wa_cta"
            :aria-label="languageState.eng_lan ? 'Book a free call on WhatsApp' : 'Fissa una call gratuita su WhatsApp'"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            <span>{{ languageState.eng_lan ? 'Book a free call' : 'Fissa una call gratuita' }}</span>
        </a>
        </Transition>

    </div>
</template>

<style lang="scss" scoped>
$header-h: 40px;

.mob_services {
    margin-top: $header-h;
    margin-left: auto;
    margin-right: auto;
    height: calc(100dvh - $header-h);
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    padding: 0.75rem;
    overflow: hidden;
    box-sizing: border-box;

    @media (min-width: 576px) { max-width: 540px; }
    @media (min-width: 768px) { max-width: 720px; }
}

// ─── ANIMAZIONE ENTRATA ───────────────────────────────────────────────────────

$ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);

.mob_card {
    opacity: 0;
    filter: blur(6px);
    transform: translateY(18px);
}

.mob_services.entered .mob_card {
    opacity: 1;
    filter: none;
    transform: translateY(0);
    transition:
        opacity   0.8s $ease-out-expo,
        transform 0.8s $ease-out-expo,
        filter    0.65s ease;

    &:nth-child(1) { transition-delay: 0.05s; }
    &:nth-child(2) { transition-delay: 0.18s; }
    &:nth-child(3) { transition-delay: 0.31s; }
}

// ─── CARD ────────────────────────────────────────────────────────────────────

.mob_card {
    flex: 1;
    min-height: 0;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    padding: 1.25rem 1.75rem;
    border-radius: 24px;
    cursor: pointer;

    transition:
        flex-grow 1.1s cubic-bezier(0.4, 0, 0.2, 1),
        opacity   0.5s ease,
        padding   0.9s cubic-bezier(0.4, 0, 0.2, 1);
    &:active { transform: scale(0.985); }

    &::before, &::after {
        content: '';
        flex-grow: 1;
        transition: flex-grow 0.75s cubic-bezier(0.4, 0, 0.2, 1);
    }

    &--light {
        background-color: #fafaf9;
        color: #1c1c1c;
        .mob_num  { color: rgba(0, 0, 0, 0.05); }
        .mob_close { color: rgba(0, 0, 0, 0.55); &:hover { color: #1c1c1c; } }
    }

    &--dark {
        background-color: #1c1c1c;
        color: #f5f4f2;
        .mob_num  { color: rgba(255, 255, 255, 0.04); }
        .mob_close { color: rgba(255, 255, 255, 0.6); &:hover { color: #f5f4f2; } }
    }
}

// ─── NUMERO DECORATIVO ───────────────────────────────────────────────────────

.mob_num {
    position: absolute;
    top: -0.5rem;
    left: 0.75rem;
    font-size: clamp(5rem, 22vw, 9rem);
    font-weight: 700;
    line-height: 1;
    letter-spacing: -0.04em;
    user-select: none;
    pointer-events: none;
    z-index: 0;
}

// ─── BODY ────────────────────────────────────────────────────────────────────

.mob_card__body {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    position: relative;
    z-index: 1;
}

.mob_title {
    font-size: clamp(1.3rem, 5.5vw, 1.9rem);
    font-weight: 600;
    letter-spacing: -0.02em;
    line-height: 1.15;
    margin: 0;
}

.mob_desc {
    font-size: clamp(0.8rem, 3vw, 0.92rem);
    line-height: 1.6;
    opacity: 0.7;
    margin: 0;
    max-width: 50ch;
}

// ─── CHIPS ───────────────────────────────────────────────────────────────────

.mob_chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
    margin-top: 0.25rem;
}

.mob_chip {
    display: inline-block;
    padding: 0.22rem 0.65rem;
    border-radius: 100px;
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.02em;
}

// ─── WA CTA FIXED ────────────────────────────────────────────────────────────

.mob_wa_cta {
    position: fixed;
    bottom: 1.5rem;
    right: 1.25rem;
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    padding: 0.42rem 1.15rem;
    background: #25D366;
    color: #fff;
    text-decoration: none;
    border-radius: 999px;
    border: 1px solid rgba(34, 197, 94, 0.45);
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.01em;
    box-shadow: 0 10px 24px rgba(22, 163, 74, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.28);
    z-index: 200;
    isolation: isolate;
    overflow: hidden;
    transition: transform 0.28s ease, box-shadow 0.28s ease, background 0.28s ease;

    &::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(120deg, transparent 0%, rgba(255, 255, 255, 0.65) 45%, transparent 70%);
        transform: translateX(-120%);
        transition: transform 0.75s ease;
        z-index: -1;
    }

    &:hover {
        color: #fff;
        background: #20c05e;
        border-color: rgba(34, 197, 94, 0.75);
        box-shadow: 0 16px 36px rgba(22, 163, 74, 0.34), 0 0 0 4px rgba(34, 197, 94, 0.13), inset 0 1px 0 rgba(255, 255, 255, 0.35);
        &::before { transform: translateX(120%); }
    }

    &:active { transform: translateY(-1px) scale(0.99); }

    svg { flex-shrink: 0; }
}

// ─── STATO READY (dopo animazione entrata) ───────────────────────────────────

.mob_services.ready .mob_card {
    opacity: 1;
    filter: none;
    transform: translateY(0);
    cursor: pointer;
    transition:
        flex-grow 1s cubic-bezier(0.4, 0, 0.2, 1),
        opacity   0.65s ease,
        padding   1s cubic-bezier(0.4, 0, 0.2, 1);
}

// ─── SELEZIONE CARD ──────────────────────────────────────────────────────────

.mob_services.ready.has-selection .mob_card:not(.is-selected) {
    flex-grow: 0;
    opacity: 0;
    padding-top: 0;
    padding-bottom: 0;
    pointer-events: none;
    overflow: hidden;
}

.mob_services.ready.has-selection .mob_card.is-selected {
    flex-grow: 8;
    cursor: default;

    &::before, &::after { flex-grow: 0; }
}

// ─── BOTTONE CHIUDI ───────────────────────────────────────────────────────────

.mob_close {
    position: absolute;
    top: 1.1rem;
    right: 1.1rem;
    background: transparent;
    border: none;
    padding: 0.35rem;
    cursor: pointer;
    z-index: 10;
    transition: transform 0.2s ease, color 0.2s ease;
    &:hover { transform: rotate(90deg); }
}

.wa-btn-enter-active,
.wa-btn-leave-active {
    transition: opacity 0.35s $ease-out-expo, transform 0.35s $ease-out-expo;
}
.wa-btn-enter-from,
.wa-btn-leave-to {
    opacity: 0;
    transform: translateY(18px) scale(0.94);
}

// ─── CONTENUTO ESPANSO ───────────────────────────────────────────────────────

.mob_expanded {
    position: absolute;
    top: 7rem;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
}

.mob_feat_card {
    position: absolute;
    top: 0;
    left: 0;
    right: 2rem;
    z-index: 2;
    border-radius: 16px;
    padding: 0.9rem 1.1rem;
    background: rgba(10, 10, 10, 0.58);
    border: 1px solid rgba(255, 255, 255, 0.11);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
}

.mob_exp_label {
    display: block;
    font-size: 0.58rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.38);
    padding-bottom: 0.6rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}

.mob_feat_list {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
        font-size: 0.8rem;
        line-height: 1.45;
        padding: 0.4rem 0 0.4rem 1.15rem;
        position: relative;
        color: rgba(255, 255, 255, 0.82);

        & + li { border-top: 1px solid rgba(255, 255, 255, 0.08); }

        &::before {
            content: '✓';
            position: absolute;
            left: 0;
            top: 0.4rem;
            font-size: 0.62rem;
            font-weight: 700;
            color: rgba(255, 255, 255, 0.45);
            line-height: 1.45;
        }
    }
}

.mob_img_preview {
    position: absolute;
    top: 2.5rem;
    left: 1.5rem;
    right: 0;
    bottom: 0;
    border-radius: 14px;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: top center;
        display: block;
    }
}

// ─── TRANSIZIONE CONTENUTO ESPANSO ───────────────────────────────────────────

.mob-expand-enter-active {
    transition: opacity 0.4s ease 0.25s, transform 0.4s ease 0.25s;
}
.mob-expand-leave-active {
    transition: opacity 0.15s ease;
}
.mob-expand-enter-from {
    opacity: 0;
    transform: translateY(10px);
}
.mob-expand-leave-to {
    opacity: 0;
}
</style>
