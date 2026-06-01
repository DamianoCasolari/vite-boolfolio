<script>
    import { languageState } from "../assets/js/language.js";
    export default {
        name: "ServicesMobile",
        data() {
            return {
                languageState,
                entered: false,
                ready: false,
                selectedCard: null,
                ctaVisible: false,
                panelLoading: false,
            };
        },
        methods: {
            selectCard(i) {
                if (!this.ready) return;
                this.selectedCard = i;
                this.panelLoading = true;
                this.ctaVisible = false;
                document.body.style.overflow = "hidden";
                this._detachScroll?.();
                this.$nextTick(() => {
                    const b = this.$refs.srvBody;
                    if (b) {
                        b.scrollTop = 0;
                        const onScroll = () => {
                            this.ctaVisible = b.scrollTop + b.clientHeight >= b.scrollHeight - 80;
                        };
                        b.addEventListener('scroll', onScroll, { passive: true });
                        this._detachScroll = () => b.removeEventListener('scroll', onScroll);
                    }
                    setTimeout(() => { this.panelLoading = false; }, 480);
                });
            },
            closePanel() {
                this.selectedCard = null;
                this.ctaVisible = false;
                this.panelLoading = false;
                this._detachScroll?.();
                this._detachScroll = null;
                document.body.style.overflow = "";
            },
        },
        mounted() {
            const sl = document.querySelector('.shadow_line');
            if (sl) sl.style.display = 'none';
            requestAnimationFrame(() => {
                this.entered = true;
                setTimeout(() => {
                    this.entered = false;
                    this.ready = true;
                }, 950);
            });
        },
        beforeUnmount() {
            const sl = document.querySelector('.shadow_line');
            if (sl) sl.style.display = '';
            document.body.style.overflow = "";
        },
        unmounted() {
            this._detachScroll?.();
        },
    };
</script>

<template>
    <div class="mob_services" :class="{ entered, ready }">

        <!-- BG DECORATIVO: X sfocate in fixed -->
        <div class="mob_x_bg" aria-hidden="true"></div>

        <!-- CARD 1 -->
        <div class="mob_card mob_card--light" @click="selectCard(0)">
            <span class="mob_num" aria-hidden="true">01</span>
            <div class="mob_card__body">
                <h2 class="mob_title">{{ languageState.eng_lan ? 'Showcase Website' : 'Sito Vetrina' }}</h2>
                <p class="mob_desc">
                    <span v-if="languageState.eng_lan">A <strong>polished online presence</strong>, fast and built to <strong>turn visitors into clients</strong>.</span>
                    <span v-else>Una <strong>presenza online curata</strong>, veloce e costruita per <strong>convertire visitatori in clienti</strong>.</span>
                </p>
            </div>
        </div>

        <!-- CARD 2 -->
        <div class="mob_card mob_card--dark" @click="selectCard(1)">
            <span class="mob_num" aria-hidden="true">02</span>
            <div class="mob_card__body">
                <h2 class="mob_title">{{ languageState.eng_lan ? 'Web Application' : 'Applicazione Web' }}</h2>
                <p class="mob_desc">
                    <span v-if="languageState.eng_lan"><strong>E-commerce</strong>, management platforms and internal tools with <strong>custom automations</strong>.</span>
                    <span v-else><strong>E-commerce</strong>, <strong>portali</strong> e gestionali con <strong>automazioni su misura</strong>.</span>
                </p>
            </div>
        </div>

        <!-- CARD 3 -->
        <div class="mob_card mob_card--light" @click="selectCard(2)">
            <span class="mob_num" aria-hidden="true">03</span>
            <div class="mob_card__body">
                <h2 class="mob_title">{{ languageState.eng_lan ? 'Custom Project' : 'Progetto Custom' }}</h2>
                <p class="mob_desc">
                    <span v-if="languageState.eng_lan">A <strong>specific need</strong> or unconventional idea? <strong>Let's talk</strong>.</span>
                    <span v-else>Un'<strong>esigenza specifica</strong> o un'idea fuori dagli standard? <strong>Parliamone</strong>.</span>
                </p>
            </div>
        </div>

        <!-- ─── PANEL ───────────────────────────────────────────────────────── -->
        <Transition name="srv-panel">
            <div
                v-if="selectedCard !== null"
                class="srv_panel"
                :class="selectedCard === 1 ? 'srv_panel--dark' : 'srv_panel--light'"
            >
                <button class="srv_close" @click.stop="closePanel" aria-label="Chiudi">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M18 6L6 18M6 6l12 12"/>
                    </svg>
                </button>

                <!-- LOADER -->
                <Transition name="panel-loader">
                    <div v-if="panelLoading" class="srv_loader">
                        <div class="dc-loader" role="status" aria-label="Loading">
                            <div class="dc-loader__glow"></div>
                            <div class="dc-loader__logo-wrap">
                                <img src="/dc-loader2.png" alt="DC Logo" class="dc-loader__logo" />
                            </div>
                            <span class="dc-loader__pixel dc-loader__pixel--1"></span>
                            <span class="dc-loader__pixel dc-loader__pixel--2"></span>
                            <span class="dc-loader__pixel dc-loader__pixel--3"></span>
                            <span class="dc-loader__pixel dc-loader__pixel--4"></span>
                            <span class="dc-loader__pixel dc-loader__pixel--5"></span>
                        </div>
                    </div>
                </Transition>

                <div class="srv_body" ref="srvBody">

                    <!-- ════════════════════════════════════════
                         SERVICE 0 — SITO VETRINA
                         ════════════════════════════════════════ -->
                    <template v-if="selectedCard === 0">

                        <!-- HEADER: gerarchia tipografica pulita -->
                        <header class="sp_header">
                            <span class="sp_eyebrow">
                                {{ languageState.eng_lan ? '01 — Service' : '01 — Servizio' }}
                            </span>
                            <h2 class="sp_title">
                                <span v-if="languageState.eng_lan">A site that<br>works for you.</span>
                                <span v-else>Un sito che<br>lavora per te.</span>
                            </h2>
                            <p class="sp_desc">
                                <span v-if="languageState.eng_lan">
                                    Custom design, fast loading, SEO-ready and
                                    deployed — everything from brief to launch.
                                </span>
                                <span v-else>
                                    Design su misura, caricamento rapido, ottimizzato
                                    per i motori di ricerca e online in tempi brevi.
                                </span>
                            </p>
                        </header>

                        <!-- CARDS: telefono + 2 rettangolari -->
                        <div class="sp_cards">
                            <!-- Card a forma di telefono (sinistra, alta) -->
                            <div class="sp_card sp_card--phone">
                                <img src="/immagini_servizi/1-1.png" alt="" loading="eager" />
                            </div>
                            <!-- Colonna destra: 2 card rettangolari -->
                            <div class="sp_cards_col">
                                <div class="sp_card sp_card--rect">
                                    <img src="/immagini_servizi/1-2.png" alt="" loading="eager" />
                                </div>
                                <div class="sp_card sp_card--rect">
                                    <img src="/immagini_servizi/1-3.png" alt="" loading="eager" />
                                </div>
                            </div>
                        </div>

                        <!-- DIVISORE con label sezione -->
                        <div class="sp_divider">
                            <span class="sp_divider_label">
                                {{ languageState.eng_lan ? "What's included" : 'Cosa include' }}
                            </span>
                            <div class="sp_divider_line"></div>
                        </div>

                        <!-- FEATURES: 4 micro-card in griglia 2×2 -->
                        <div class="sp_features">
                            <div class="sp_feat">
                                <span class="sp_feat_n">01</span>
                                <span class="sp_feat_t">
                                    <span v-if="languageState.eng_lan">Custom design</span>
                                    <span v-else>Design su misura</span>
                                </span>
                            </div>
                            <div class="sp_feat">
                                <span class="sp_feat_n">02</span>
                                <span class="sp_feat_t">
                                    <span v-if="languageState.eng_lan">No templates</span>
                                    <span v-else>Nessun template </span>
                                </span>
                            </div>
                            <div class="sp_feat">
                                <span class="sp_feat_n">03</span>
                                <span class="sp_feat_t">
                                    <span v-if="languageState.eng_lan">Basic SEO</span>
                                    <span v-else>SEO di base</span>
                                </span>
                            </div>
                            <div class="sp_feat">
                                <span class="sp_feat_n">04</span>
                                <span class="sp_feat_t">
                                    <span v-if="languageState.eng_lan">Deploy & hosting</span>
                                    <span v-else>Deploy & hosting</span>
                                </span>
                            </div>
                        </div>

                        <!-- CLOSING: statement tipografico -->
                        <div class="sp_closing">
                            <p class="sp_closing_text">
                                <span v-if="languageState.eng_lan">From concept<br>to launch.</span>
                                <span v-else>Dal concept<br>al lancio.</span>
                            </p>
                        </div>

                    </template>

                    <!-- ════════════════════════════════════════
                         SERVICE 1 — WEB APP  (da raffinare)
                         ════════════════════════════════════════ -->
                    <template v-else-if="selectedCard === 1">
                        <header class="sp_header">
                            <span class="sp_eyebrow">{{ languageState.eng_lan ? '02 — Service' : '02 — Servizio' }}</span>
                            <h2 class="sp_title">
                                <span v-if="languageState.eng_lan">Built around<br>your business.</span>
                                <span v-else>Costruita attorno<br>al tuo business.</span>
                            </h2>
                            <p class="sp_desc">
                                <span v-if="languageState.eng_lan">E-commerce, dashboards, automations — built for the way you actually work.</span>
                                <span v-else>E-commerce, gestionali, automazioni — costruiti attorno a come lavori davvero.</span>
                            </p>
                        </header>
                        <div class="sp_cards">
                            <div class="sp_card sp_card--phone">
                                <img src="/immagini_servizi/2-1.png" alt="" loading="eager" />
                            </div>
                            <div class="sp_cards_col">
                                <div class="sp_card sp_card--rect">
                                    <img src="/immagini_servizi/2-2.png" alt="" loading="eager" />
                                </div>
                                <div class="sp_card sp_card--rect">
                                    <img src="/immagini_servizi/2-3.png" alt="" loading="eager" />
                                </div>
                            </div>
                        </div>
                        <div class="sp_divider">
                            <span class="sp_divider_label">{{ languageState.eng_lan ? 'What will we build?' : 'Su cosa lavoreremo?' }}</span>
                            <div class="sp_divider_line"></div>
                        </div>
                        <div class="sp_features">
                            <div class="sp_feat"><span class="sp_feat_n">01</span><span class="sp_feat_t"><span v-if="languageState.eng_lan">Custom app</span><span v-else>App su misura</span></span></div>
                            <div class="sp_feat"><span class="sp_feat_n">02</span><span class="sp_feat_t"><span v-if="languageState.eng_lan">Admin panel</span><span v-else>Dashboard admin</span></span></div>
                            <div class="sp_feat"><span class="sp_feat_n">03</span><span class="sp_feat_t"><span v-if="languageState.eng_lan">Automations</span><span v-else>Automazioni</span></span></div>
                            <div class="sp_feat"><span class="sp_feat_n">04</span><span class="sp_feat_t">Deploy & hosting</span></div>
                        </div>
                        <div class="sp_closing">
                            <p class="sp_closing_text">
                                <span v-if="languageState.eng_lan">Your business<br>evolve.</span>
                                <span v-else>Il tuo business<br>evolve.</span>

                            </p>
                        </div>
                    </template>

                    <!-- ════════════════════════════════════════
                         SERVICE 2 — CUSTOM  (da raffinare)
                         ════════════════════════════════════════ -->
                    <template v-else>
                        <header class="sp_header">
                            <span class="sp_eyebrow">{{ languageState.eng_lan ? '03 — Service' : '03 — Servizio' }}</span>
                            <h2 class="sp_title">
                                <span v-if="languageState.eng_lan">Your idea,<br>our code.</span>
                                <span v-else>La tua idea,<br>diventa codice.</span>
                            </h2>
                            <p class="sp_desc">
                                <span v-if="languageState.eng_lan">Something specific or unconventional? We'll find the right approach together.</span>
                                <span v-else>Qualcosa di specifico o fuori dagli standard? Troviamo insieme l'approccio giusto.</span>
                            </p>
                        </header>
                        <div class="sp_cards">
                            <div class="sp_card sp_card--phone">
                                <img src="/immagini_servizi/oikos.png" alt="" loading="eager" />
                            </div>
                            <div class="sp_cards_col">
                                <div class="sp_card sp_card--rect">
                                    <img src="/immagini_servizi/silos.png" alt="" loading="eager" />
                                </div>
                                <div class="sp_card sp_card--rect">
                                    <img src="/immagini_servizi/ceramica.png" alt="" loading="eager" />
                                </div>
                            </div>
                        </div>
                        <div class="sp_divider">
                            <span class="sp_divider_label">{{ languageState.eng_lan ? 'How it works' : 'Come funziona' }}</span>
                            <div class="sp_divider_line"></div>
                        </div>
                        <div class="sp_features">
                            <div class="sp_feat"><span class="sp_feat_n">01</span><span class="sp_feat_t"><span v-if="languageState.eng_lan">Free call</span><span v-else>Call gratuita</span></span></div>
                            <div class="sp_feat"><span class="sp_feat_n">02</span><span class="sp_feat_t"><span v-if="languageState.eng_lan">Dedicated stack</span><span v-else>Stack dedicato</span></span></div>
                            <div class="sp_feat"><span class="sp_feat_n">03</span><span class="sp_feat_t"><span v-if="languageState.eng_lan">Iterative</span><span v-else>Iterativo</span></span></div>
                            <div class="sp_feat"><span class="sp_feat_n">04</span><span class="sp_feat_t"><span v-if="languageState.eng_lan">Transparent</span><span v-else>Trasparente</span></span></div>
                        </div>
                        <div class="sp_closing">
                            <p class="sp_closing_text">
                                <span v-if="languageState.eng_lan">Your idea,<br>our code.</span>
                                <span v-else>La <i>tua</i> idea,<br>diventa codice.</span>
                            </p>
                        </div>
                    </template>

                </div>
            </div>
        </Transition>

        <!-- WA CTA -->
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
$ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
$px: 1.5rem;   // padding orizzontale base
$gap: 10px;    // gap tra card

// ─── 3 CARD CHIUSE (invariate) ───────────────────────────────────────────────

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

.mob_card {
    flex: 1;
       box-shadow: 0 12px 32px rgba(0, 0, 0, 0.24), 0 2px 8px rgba(0, 0, 0, 0.12);
    min-height: 0;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1.25rem 1.75rem;
    border-radius: 24px;
    cursor: pointer;
    opacity: 0;
    filter: blur(6px);
    transform: translateY(18px);
    transition: opacity 0.5s ease, transform 0.15s ease;
    &:active { transform: scale(0.985); }
    // Chevron tap-indicator, bottom-right
    &::after {
        content: '';
        position: absolute;
        bottom: 1.35rem;
        right: 1.5rem;
        width: 18px;
        height: 18px;
        border-right: 2.2px solid currentColor;
        border-top: 2.2px solid currentColor;
        transform: rotate(45deg);
        border-radius: 1px;
        opacity: 0.22;
        z-index: 2;
        transition: opacity 0.15s ease;
    }
    &:active::after { opacity: 0.5; }
    &--light {
        background: rgba(250,250,249,0.82);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        color: #1c1c1c;
        .mob_num { color: rgba(0,0,0,0.05); }
    }
    &--dark {
        background: rgb(28, 28, 28);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        color: #f5f4f2;
        .mob_num { color: rgba(255,255,255,0.04); }
    }
}

// ─── BACKGROUND DECORATIVO: cerchi frosted-glass con × ──────────────────────

.mob_x_bg {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    overflow: hidden;


    &::before, &::after {
        position: absolute;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(22px);
        -webkit-backdrop-filter: blur(22px);
        background: rgba(255,255,255,0.07);
        border: 1px solid rgba(255,255,255,0.14);
        font-weight: 700;
        letter-spacing: -0.05em;
        color: rgba(0,0,0,0.09);
        user-select: none;
    }

}

.mob_services.entered .mob_card {
    opacity: 1; filter: none; transform: translateY(0);
    transition: opacity 0.8s $ease-out-expo, transform 0.8s $ease-out-expo, filter 0.65s ease;
    &:nth-child(1) { transition-delay: 0.05s; }
    &:nth-child(2) { transition-delay: 0.18s; }
    &:nth-child(3) { transition-delay: 0.31s; }
}
.mob_services.ready .mob_card {
    opacity: 1; filter: none; transform: translateY(0);
    transition: opacity 0.65s ease, transform 0.15s ease;
}

.mob_num { position: absolute; top: -0.5rem; left: 0.75rem; font-size: clamp(5rem, 22vw, 9rem); font-weight: 700; line-height: 1; letter-spacing: -0.04em; user-select: none; pointer-events: none; z-index: 0; }
.mob_card__body { display: flex; flex-direction: column; gap: 0.5rem; position: relative; z-index: 1; }
.mob_title { font-size: clamp(1.3rem, 5.5vw, 1.9rem); font-weight: 600; letter-spacing: -0.02em; line-height: 1.15; margin: 0; }
.mob_desc  { font-size: clamp(0.8rem, 3vw, 0.92rem); line-height: 1.6; opacity: 0.7; margin: 0; max-width: 50ch; }

// ─── WA CTA ──────────────────────────────────────────────────────────────────

.mob_wa_cta {
    position: fixed; bottom: 1.5rem; right: 1.25rem;
    display: inline-flex; align-items: center; gap: 0.55rem;
    padding: 0.42rem 1.15rem;
    background: #25D366; color: #fff; text-decoration: none;
    border-radius: 999px; border: 1px solid rgba(34,197,94,0.45);
    font-size: 0.75rem; font-weight: 700; letter-spacing: 0.01em;
    box-shadow: 0 10px 24px rgba(22,163,74,0.25), inset 0 1px 0 rgba(255,255,255,0.28);
    z-index: 200; isolation: isolate; overflow: hidden;
    transition: transform 0.28s ease, box-shadow 0.28s ease, background 0.28s ease;
    &::before { content: ''; position: absolute; inset: 0; background: linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.65) 45%, transparent 70%); transform: translateX(-120%); transition: transform 0.75s ease; z-index: -1; }
    &:hover { color: #fff; background: #20c05e; border-color: rgba(34,197,94,0.75); box-shadow: 0 16px 36px rgba(22,163,74,0.34), 0 0 0 4px rgba(34,197,94,0.13), inset 0 1px 0 rgba(255,255,255,0.35); &::before { transform: translateX(120%); } }
    &:active { transform: translateY(-1px) scale(0.99); }
    svg { flex-shrink: 0; }
}
.wa-btn-enter-active, .wa-btn-leave-active { transition: opacity 0.35s $ease-out-expo, transform 0.35s $ease-out-expo; }
.wa-btn-enter-from, .wa-btn-leave-to { opacity: 0; transform: translateY(18px) scale(0.94); }

// ─── PANEL ───────────────────────────────────────────────────────────────────

.srv_panel {
    position: fixed; inset: 0; z-index: 100; overflow: hidden;
    &--light { background: #f5f4f2; color: #1c1c1c; }
    &--dark  { background: #141414; color: #f0eeeb; }
}

.srv_close {
    position: absolute; top: 1rem; right: 1rem; z-index: 10;
    width: 2.5rem; height: 2.5rem; border-radius: 50%;
    background: rgba(128,128,128,0.15);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(128,128,128,0.18);
    color: currentColor;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; transition: transform 0.22s ease, background 0.18s ease;
    &:hover { transform: rotate(90deg); background: rgba(128,128,128,0.25); }
}

.srv_body {
    height: 100%; overflow-y: auto; overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
}

// ─── LOADER PANEL ─────────────────────────────────────────────────────────────

.srv_loader {
    position: absolute;
    inset: 0;
    z-index: 20;
    display: flex;
    align-items: center;
    justify-content: center;
    .srv_panel--light & { background: #f5f4f2; }
    .srv_panel--dark  & { background: #141414; }
}

.panel-loader-enter-active { transition: opacity 0.18s ease; }
.panel-loader-leave-active  { transition: opacity 0.3s ease; }
.panel-loader-enter-from,
.panel-loader-leave-to      { opacity: 0; }

// ─── HEADER ──────────────────────────────────────────────────────────────────

.sp_header {
    padding: 2.75rem $px 2.5rem;
}

.sp_eyebrow {
    display: block;
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    opacity: 0.38;
    margin-bottom: 1rem;
}

.sp_title {
    font-size: clamp(2rem, 8.5vw, 2.8rem);
    font-weight: 700;
    letter-spacing: -0.04em;
    line-height: 1.06;
    margin: 0 0 1rem;
}

.sp_desc {
    font-size: clamp(0.85rem, 3.4vw, 0.95rem);
    line-height: 1.7;
    opacity: 0.54;
    max-width: 36ch;
    margin: 0;
}

// ─── CARDS ───────────────────────────────────────────────────────────────────
// Layout "scattered": telefono in primo piano, 2 rect sfasate e ruotate dietro

.sp_cards {
    padding: 0 $px;
    position: relative;
    height: 265px;
    margin-bottom: 1.5rem;
}

.sp_cards_col {
    position: absolute;
    inset: 0;
}

.sp_card {
    position: absolute;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: top center;
        display: block;
    }
}

// Telefono: sinistra, ruotata CCW, in primo piano
.sp_card--phone {
    border-radius: 22px;
    aspect-ratio: 9 / 19;
    width: 33%;
    left: 20px;
    top: 16px;
    z-index: 3;
    transform: rotate(-3deg);
    box-shadow: 0 12px 32px rgba(0,0,0,0.24), 0 2px 8px rgba(0,0,0,0.12);
}

// Prima rect: alto-destra, ruotata CW, piano intermedio
.sp_cards_col .sp_card--rect:nth-child(1) {
    border-radius: 14px;
    aspect-ratio: 4 / 3;
    width: 58%;
    right: 0;
    top: -10px;
    z-index: 2;
    transform: rotate(5deg);
    box-shadow: 0 10px 28px rgba(0,0,0,0.2), 0 2px 6px rgba(0,0,0,0.1);
}

// Seconda rect: basso-destra, lieve rotazione CCW, piano più in fondo
.sp_cards_col .sp_card--rect:nth-child(2) {
    border-radius: 14px;
    aspect-ratio: 4 / 3;
    width: 54%;
    right: 6%;
    bottom: -10%;
    z-index: 1;
    transform: rotate(-2.5deg);
    box-shadow: 0 10px 28px rgba(0,0,0,0.2), 0 2px 6px rgba(0,0,0,0.1);
}

// ─── DIVISORE ────────────────────────────────────────────────────────────────

.sp_divider {
    padding: 2.75rem $px 0;
    display: flex;
    align-items: center;
    gap: 0.875rem;
}

.sp_divider_label {
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    opacity: 0.38;
    white-space: nowrap;
    flex-shrink: 0;
}

.sp_divider_line {
    flex: 1;
    height: 1px;
    background: currentColor;
    opacity: 0.12;
}

// ─── FEATURES: 2×2 griglia di micro-card ─────────────────────────────────────

.sp_features {
    padding: 1.5rem $px 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    position: relative;
    z-index: 10;
}

.sp_feat {
    border-radius: 14px;
    padding: 1rem 1rem 1.1rem;
    display: flex;
    flex-direction: column;
    gap: 0.45rem;

    .srv_panel--light & { background: #fff; box-shadow: 0 1px 8px rgba(0,0,0,0.06); }
    .srv_panel--dark  & { background: rgb(31, 31, 31); border: 1px solid rgba(255,255,255,0.08); }
}

.sp_feat_n {
    font-size: 0.56rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    opacity: 0.28;
}

.sp_feat_t {
    font-size: clamp(0.82rem, 3.3vw, 0.95rem);
    font-weight: 600;
    letter-spacing: -0.01em;
    line-height: 1.3;
}

// ─── CLOSING ─────────────────────────────────────────────────────────────────

.sp_closing {
    padding: 3.5rem $px 5.5rem;
    display: flex;
    align-items: flex-end;
    min-height: 32vh;
}

.sp_closing_text {
    font-size: clamp(2.4rem, 11vw, 3.8rem);
    font-weight: 700;
    letter-spacing: -0.045em;
    line-height: 1.04;
    margin: 0;
}

// ─── TRANSIZIONE PANEL ───────────────────────────────────────────────────────

.srv-panel-enter-active { transition: transform 0.5s $ease-out-expo, opacity 0.28s ease; }
.srv-panel-leave-active { transition: transform 0.32s cubic-bezier(0.4,0,0.2,1), opacity 0.22s ease; }
.srv-panel-enter-from { transform: scale(0.96) translateY(24px); opacity: 0; }
.srv-panel-leave-to   { transform: scale(0.97) translateY(16px); opacity: 0; }
</style>
