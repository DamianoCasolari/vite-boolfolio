<script>
    import { languageState } from "../assets/js/language.js";

    export default {
        name: "ServicesDesktop",
        data() {
            return {
                languageState,
                selectedCard: null,
                entered: false,
                ready: false,
            };
        },
        mounted() {
            requestAnimationFrame(() => {
                this.freezeContentWidth();
                this.entered = true;
                setTimeout(() => {
                    this.entered = false;
                    this.ready = true;
                }, 950);
            });
            window.addEventListener('resize', this.onResize, { passive: true });
        },
        unmounted() {
            window.removeEventListener('resize', this.onResize);
        },
        methods: {
            selectCard(i) {
                if (!this.ready) return;
                this.selectedCard = this.selectedCard === i ? null : i;
            },
            freezeContentWidth() {
                const card = this.$el?.querySelector('.service_card');
                if (!card) return;
                const padding = parseFloat(getComputedStyle(card).paddingLeft)
                              + parseFloat(getComputedStyle(card).paddingRight);
                const w = card.clientWidth - padding;
                this.$el.style.setProperty('--content-w', `${Math.round(w)}px`);
            },
            onResize() {
                if (this.selectedCard === null) this.freezeContentWidth();
            },
        },
    };
</script>

<template>
    <div class="services_page">
        <div class="services_blob" aria-hidden="true"></div>
        <div class="container h-100">
            <div class="services_grid" :class="{ entered, ready, 'has-selection': selectedCard !== null }">

                <!-- CARD 1 — Sito Vetrina -->
                <div class="service_card service_card--light"
                    :class="{
                        'is-expanded': selectedCard === 0,
                        'is-collapsed': selectedCard !== null && selectedCard !== 0,
                    }"
                    @click="selectCard(0)">

                    <button v-if="selectedCard === 0" class="card_close" @click.stop="selectedCard = null" aria-label="Chiudi">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" stroke-width="1.5"
                            stroke-linecap="round" stroke-linejoin="round">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>

                    <span class="service_num">1</span>

                    <div class="card_main_row">
                        <div class="service_body">
                            <h2 class="service_title">
                                {{ languageState.eng_lan ? 'Showcase Website' : 'Sito Vetrina' }}
                            </h2>
                            <p class="service_desc">
                                <span v-if="languageState.eng_lan">
                                    For businesses that need a <strong>polished online presence</strong>,
                                    fast and built to <strong>turn visitors into clients</strong>.
                                    <strong>Custom design</strong>, performance-first and <strong>basic SEO</strong> included.
                                </span>
                                <span v-else>
                                    Per chi vuole una <strong>presenza online curata</strong>, veloce
                                    e costruita per <strong>convertire visitatori in clienti</strong>.
                                    <strong>Design su misura</strong>, performance e <strong>SEO di base</strong> inclusi.
                                </span>
                            </p>
                        </div>

                        <div class="card_right_col">
                            <!-- rettangolo front: features -->
                            <div class="card_features">
                                <span class="expanded_label">{{ languageState.eng_lan ? "What's included" : 'Cosa include' }}</span>
                                <ul class="feature_list">
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
                                        <span v-if="languageState.eng_lan"><strong>Mobile-first</strong>, cross-browser tested</span>
                                        <span v-else><strong>Mobile-first</strong>, testato su tutti i browser</span>
                                    </li>
                                    <li>
                                        <span v-if="languageState.eng_lan"><strong>Deployment</strong> & hosting setup</span>
                                        <span v-else><strong>Deploy</strong> e configurazione hosting</span>
                                    </li>
                                </ul>
                            </div>
                            <!-- rettangolo back: immagine sfasata -->
                            <div class="card_preview">
                                <img src="/immagini_servizi/1-3.png" alt="Esempio sito vetrina" />
                            </div>
                        </div>
                    </div>
                </div>

                <!-- CARD 2 — Applicazione Web -->
                <div class="service_card service_card--dark"
                    :class="{
                        'is-expanded': selectedCard === 1,
                        'is-collapsed': selectedCard !== null && selectedCard !== 1,
                    }"
                    @click="selectCard(1)">

                    <button v-if="selectedCard === 1" class="card_close" @click.stop="selectedCard = null" aria-label="Chiudi">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" stroke-width="1.5"
                            stroke-linecap="round" stroke-linejoin="round">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>

                    <span class="service_num">2</span>

                    <div class="card_main_row">
                        <div class="service_body">
                            <h2 class="service_title">
                                {{ languageState.eng_lan ? 'Web Application' : 'Applicazione Web' }}
                            </h2>
                            <p class="service_desc">
                                <span v-if="languageState.eng_lan">
                                    <strong>Management platforms</strong>, <strong>e-commerce</strong>, portals and internal tools
                                    with <strong>custom automations</strong> that cut manual work.
                                    <strong>API integrations</strong> and seamless connection to your existing systems.
                                </span>
                                <span v-else>
                                    <strong>Gestionali</strong>, <strong>e-commerce</strong>, portali e strumenti interni
                                    con <strong>automazioni su misura</strong> che eliminano il lavoro manuale.
                                    <strong>Integrazione con API</strong> e connessione ai tuoi sistemi esistenti.
                                </span>
                            </p>
                        </div>

                        <div class="card_right_col">
                            <div class="card_features">
                                <span class="expanded_label">{{ languageState.eng_lan ? 'What will we build?' : 'Su cosa lavoreremo?' }}</span>
                                <ul class="feature_list">
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
                                        <span v-if="languageState.eng_lan"><strong>Scalable</strong>: handles growth without requiring a rewrite</span>
                                        <span v-else><strong>Scalabile</strong>: regge la crescita senza dover riscrivere il progetto</span>
                                    </li>
                                    <li>
                                        <span v-if="languageState.eng_lan"><strong>Deploy & hosting</strong> included — go live without touching a server</span>
                                        <span v-else><strong>Deploy e hosting</strong> inclusi — online senza configurare nulla</span>
                                    </li>
                                </ul>
                            </div>
                            <div class="card_preview">
                                <img src="/immagini-progetti/image001.png" alt="Esempio web application" />
                            </div>
                        </div>
                    </div>
                </div>

                <!-- CARD 3 — Progetto Custom -->
                <div class="service_card service_card--light"
                    :class="{
                        'is-expanded': selectedCard === 2,
                        'is-collapsed': selectedCard !== null && selectedCard !== 2,
                    }"
                    @click="selectCard(2)">

                    <button v-if="selectedCard === 2" class="card_close" @click.stop="selectedCard = null" aria-label="Chiudi">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" stroke-width="1.5"
                            stroke-linecap="round" stroke-linejoin="round">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>

                    <span class="service_num">3</span>

                    <div class="card_main_row">
                        <div class="service_body">
                            <h2 class="service_title">
                                {{ languageState.eng_lan ? 'Custom Project' : 'Progetto Custom' }}
                            </h2>
                            <p class="service_desc">
                                <span v-if="languageState.eng_lan">
                                    Got a <strong>specific need</strong>, an unconventional idea, or tried
                                    standard solutions without results?
                                    <strong>Let's talk</strong> — we'll find the <strong>right approach</strong> together.
                                </span>
                                <span v-else>
                                    Hai un'<strong>esigenza specifica</strong>, un'idea fuori dagli standard o
                                    hai già provato soluzioni pronte senza risultati?
                                    <strong>Parliamone</strong> — troviamo insieme l'<strong>approccio giusto</strong>.
                                </span>
                            </p>
                        </div>

                        <div class="card_right_col">
                            <div class="card_features">
                                <span class="expanded_label">{{ languageState.eng_lan ? 'How it works' : 'Come funziona' }}</span>
                                <ul class="feature_list">
                                    <li>
                                        <span v-if="languageState.eng_lan"><strong>Free initial call</strong> to explore the idea</span>
                                        <span v-else><strong>Call gratuita</strong> per esplorare l'idea</span>
                                    </li>
                                    <li>
                                        <span v-if="languageState.eng_lan">Tech stack chosen for your <strong>specific need</strong></span>
                                        <span v-else>Stack tecnologico scelto per <strong>la tua esigenza</strong></span>
                                    </li>
                                    <li>
                                        <span v-if="languageState.eng_lan"><strong>Iterative approach</strong> with ongoing feedback</span>
                                        <span v-else><strong>Design</strong> moderno e <strong>funzionale</strong></span>
                                    </li>
                                    <li>
                                        <span v-if="languageState.eng_lan"><strong>Direct, transparent</strong> communication</span>
                                        <span v-else>Comunicazione <strong>diretta e trasparente</strong></span>
                                    </li>
                                    <li>
                                        <span v-if="languageState.eng_lan"><strong>Flexible timeline</strong>, no agency overhead</span>
                                        <span v-else><strong>Tempi flessibili</strong>, senza overhead da agenzia</span>
                                    </li>
                                </ul>
                            </div>
                            <div class="card_preview">
                                <img src="/immagini-progetti/silos.png" alt="Esempio progetto custom" />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <Transition name="wa-btn">
            <a
                v-if="selectedCard !== null"
                href="https://wa.me/3477952189?text=Ciao%20Damiano!%20Vorrei%20usufruire%20della%20call%20gratuita%20che%20offri.%0AHo%20visto%20i%20tuoi%20servizi%20e%20mi%20piacerebbe%20parlare%20di%20un%20progetto%20a%20cui%20sto%20pensando."
                target="_blank"
                rel="noopener noreferrer"
                class="whatsapp_cta"
                :aria-label="languageState.eng_lan ? 'Book a free call on WhatsApp' : 'Fissa una call gratuita su WhatsApp'"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <span>{{ languageState.eng_lan ? 'Book a free call' : 'Fissa una call gratuita' }}</span>
            </a>
        </Transition>
    </div>
</template>

<style lang="scss" scoped>
$header-h: 40px;
$ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
// sfasamento tra i due rettangoli
$stack-offset: 2.5rem;
// dove inizia il contenuto (sotto il numero decorativo)
$content-top: calc(clamp(5rem, 10vw, 9rem) + 0.75rem);

.services_page {
    margin-top: $header-h;
    height: calc(100dvh - $header-h);
    position: relative;
    overflow: hidden;

    .container {
        height: 100%;
        display: flex;
        flex-direction: column;
        padding-left: 0;
        padding-right: 0;
    }
}

// ─── BLOB DECORATIVO ──────────────────────────────────────────────────────────

.services_blob {
    position: absolute;
    top: -50px;
    right: -50px;
    width: 380px;
    height: 380px;
    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
    background: radial-gradient(circle at 40% 40%, rgba(130, 130, 135, 0.45) 0%, rgba(160, 160, 165, 0.18) 50%, transparent 72%);
    filter: blur(32px);
    pointer-events: none;
    z-index: 2;
    animation: services-blob-morph 12s ease-in-out infinite;
}

@keyframes services-blob-morph {
    0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
    33%       { border-radius: 40% 60% 55% 45% / 45% 55% 40% 60%; }
    66%       { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
}

// ──────────────────────────────────────────────────────────────────────────────

.services_grid {
    display: flex;
    flex-direction: row;
    flex: 1;
    height: 100%;
    overflow: hidden;
}

// ─── BASE CARD ────────────────────────────────────────────────────────────────

.service_card {
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: 0;
    min-width: 0;
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    padding: 3rem 2.5rem;
    position: relative;
    border-right: 1px solid rgba(0, 0, 0, 0.07);
    opacity: 0;
    transform: translateY(22px);
    filter: blur(8px);

    &:last-child { border-right: none; }

    &--light {
        background-color: #fafaf9;
        color: #1c1c1c;
        .service_num  { color: rgba(0, 0, 0, 0.18); }
        .card_close   { color: rgba(0, 0, 0, 0.35); &:hover { color: #1c1c1c; } }
        .expanded_label { color: rgba(0, 0, 0, 0.38); }
        .feature_list li { color: rgba(0, 0, 0, 0.68); }
        .feature_list li::before { color: rgba(0, 0, 0, 0.3); }
        .card_features {
            background: rgba(10, 10, 10, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.13);
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.22), inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }
    }

    &--dark {
        background-color: #1c1c1c;
        color: #f5f4f2;
        .service_num  { color: rgba(255, 255, 255, 0.18); }
        .card_close   { color: rgba(255, 255, 255, 0.3); &:hover { color: #f5f4f2; } }
        .expanded_label { color: rgba(255, 255, 255, 0.32); }
        .feature_list li { color: rgba(255, 255, 255, 0.62); }
        .feature_list li::before { color: rgba(255, 255, 255, 0.25); }
        .card_features {
            background: rgba(4, 4, 4, 0.72);
            border: 1px solid rgba(255, 255, 255, 0.09);
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.06);
        }
    }
}

// ─── FASE 1 — entrata ─────────────────────────────────────────────────────────

.services_grid.entered .service_card {
    opacity: 1;
    transform: translateY(0);
    filter: blur(0px);
    transition:
        opacity   0.85s $ease-out-expo,
        transform 0.85s $ease-out-expo,
        filter    0.7s  ease;

    &:nth-child(1) { transition-delay: 0.08s; }
    &:nth-child(2) { transition-delay: 0.22s; }
    &:nth-child(3) { transition-delay: 0.36s; }
}

// ─── FASE 2 — pronto per l'interazione ────────────────────────────────────────

.services_grid.ready .service_card {
    opacity: 1;
    transform: translateY(0);
    filter: none;
    cursor: pointer;
    transition:
        flex-grow        0.72s $ease-out-expo,
        flex-basis       0.72s $ease-out-expo,
        padding          0.65s $ease-out-expo,
        background-color 0.3s ease,
        box-shadow       0.3s ease;
    transition-delay: 0s;

    .service_body,
    .card_close {
        transition: opacity 0.25s ease;
    }

    .service_num {
        transition: opacity 0.25s ease, left 0.72s $ease-out-expo, top 0.72s $ease-out-expo, transform 0.72s $ease-out-expo;
    }
}

.services_grid.ready .service_card.is-expanded {
    flex-grow: 10;
    flex-basis: 0;
    cursor: default;
}

.services_grid.ready .service_card.is-collapsed {
    flex-grow: 0;
    flex-basis: 52px;
    padding-left: 0;
    padding-right: 0;

    .service_body,
    .card_close {
        opacity: 0;
    }

    .service_num {
        opacity: 0.55;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }

    &:hover { flex-basis: 72px; }
}

// ─── HOVER — layout a 3 colonne ───────────────────────────────────────────────

.services_grid.ready:not(.has-selection) .service_card--light:hover {
    background-color: #f0f0ee;
    box-shadow: inset 0 3px 0 rgba(0, 0, 0, 0.1);
}

.services_grid.ready:not(.has-selection) .service_card--dark:hover {
    background-color: #242424;
    box-shadow: inset 0 3px 0 rgba(255, 255, 255, 0.08);
}

// ─── CONTENUTO BASE ───────────────────────────────────────────────────────────

.card_close {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    background: transparent;
    border: none;
    padding: 0.3rem;
    cursor: pointer;
    transition: color 0.2s ease, transform 0.2s ease;
    &:hover { transform: rotate(90deg); }
}

.service_num {
    position: absolute;
    top: 3rem;
    left: 2.5rem;
    pointer-events: none;
    z-index: 0;
    font-size: clamp(5rem, 10vw, 9rem);
    font-weight: 700;
    line-height: 1;
    letter-spacing: -0.04em;
    user-select: none;
}

// ─── RIGA PRINCIPALE ──────────────────────────────────────────────────────────

.card_main_row {
    flex: 1;
    display: flex;
    align-items: flex-start;
    gap: 3rem;
    overflow: hidden;
    min-width: 0;
    position: relative;
    z-index: 1;
}

.service_body {
    flex: 0 0 var(--content-w, 300px);
    flex-shrink: 0;
    width: var(--content-w, 300px);
    display: flex;
    flex-direction: column;
    padding-top: $content-top;
}

.service_title {
    font-size: clamp(1.6rem, 2.5vw, 2.4rem);
    font-weight: 600;
    letter-spacing: -0.02em;
    margin-bottom: 1.2rem;
    line-height: 1.15;
}

.service_desc {
    font-size: clamp(0.9rem, 1.1vw, 1rem);
    line-height: 1.75;
    opacity: 0.75;
    max-width: 36ch;
}

// ─── COLONNA DESTRA: due rettangoli sovrapposti sfasati ───────────────────────

.card_right_col {
    flex: 1;
    min-width: 0;
    align-self: stretch;
    position: relative;
    overflow: hidden;
}

// rettangolo FRONT: features, compatto in alto a sinistra (altezza = contenuto)
.card_features {
    position: absolute;
    top: 0;
    left: 0;
    right: $stack-offset;
    border-radius: 20px;
    padding: 1.4rem 1.6rem 1.6rem;
    display: flex;
    flex-direction: column;
    gap: 0;
    z-index: 2;
    overflow: hidden;
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);

    .expanded_label { color: rgba(255, 255, 255, 0.5); }
    .feature_list li { color: rgba(255, 255, 255, 0.85); }
    .feature_list li::before { color: rgba(255, 255, 255, 0.45); }
}

// rettangolo BACK: immagine, sfasata in basso a destra
.card_preview {
    position: absolute;
    top: calc(#{$content-top} + #{$stack-offset});
    left: $stack-offset;
    right: 0;
    bottom: 0;
    border-radius: 14px;
    overflow: hidden;
    z-index: 1;

    img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: top center;
        display: block;
    }
}

// ─── FEATURES ─────────────────────────────────────────────────────────────────

.expanded_label {
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    flex-shrink: 0;
    display: block;
    padding-bottom: 0.85rem;
    margin-bottom: 0.1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.feature_list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0;
    overflow: hidden;

    li {
        font-size: 0.85rem;
        line-height: 1.5;
        padding: 0.52rem 0 0.52rem 1.4rem;
        position: relative;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        & + li { border-top: 1px solid rgba(255, 255, 255, 0.07); }

        &::before {
            content: '✓';
            position: absolute;
            left: 0;
            top: 0.52rem;
            font-size: 0.68rem;
            font-weight: 700;
            line-height: 1.5;
        }
    }
}

// ─── WHATSAPP CTA ─────────────────────────────────────────────────────────────

.whatsapp_cta {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
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
    transition: transform 0.28s ease, box-shadow 0.28s ease, background 0.28s ease, border-color 0.28s ease;

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

.wa-btn-enter-active,
.wa-btn-leave-active {
    transition: opacity 0.35s $ease-out-expo, transform 0.35s $ease-out-expo;
}
.wa-btn-enter-from,
.wa-btn-leave-to {
    opacity: 0;
    transform: translateY(18px) scale(0.94);
}
</style>
