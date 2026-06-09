<script>
    import { languageState } from "../assets/js/language.js";

    export default {
        name: "ServicesDesktop",
        data() {
            return {
                languageState,
                selectedCard: null,
                ctaVisible: false,
                entered: false,
                ready: false,
                _detachScroll: null,
            };
        },
        mounted() {
            // precarica le immagini delle card espanse (fire and forget)
            [
                '/immagini_servizi/coach.png',
                '/immagini_servizi/aem.png',
                '/immagini_servizi/2-2.png',
                '/immagini_servizi/2-3.png',
                '/immagini_servizi/silos.png',
                '/immagini-progetti/bnb.png',
            ].forEach(src => { new Image().src = src; });

            // aspetta che le 3 immagini idle siano caricate prima di animare le card
            const loadImg = src => new Promise(resolve => {
                const img = new Image();
                img.onload = resolve;
                img.onerror = resolve; // non blocca in caso di errore
                img.src = src;
            });

            Promise.all([
                '/immagini_servizi/vetrina3.png',
                '/immagini_servizi/dashboard.png',
                '/immagini_servizi/cantiere.png',
            ].map(loadImg)).then(() => {
                requestAnimationFrame(() => {
                    this.entered = true;
                    setTimeout(() => {
                        this.entered = false;
                        this.ready = true;
                    }, 950);
                });
            });
        },
        unmounted() {
            this._detachScroll?.();
        },
        methods: {
            selectCard(i) {
                if (!this.ready || this.selectedCard === i) return;
                this._detachScroll?.();
                this.selectedCard = i;
                this.ctaVisible = false;
                this.$nextTick(() => {
                    const body = this.$refs.cardBody;
                    if (!body) return;
                    body.scrollTop = 0;
                    const onScroll = () => {
                        this.ctaVisible = body.scrollTop + body.clientHeight >= body.scrollHeight - 140;
                    };
                    body.addEventListener('scroll', onScroll, { passive: true });
                    this._detachScroll = () => body.removeEventListener('scroll', onScroll);
                });
            },
            closeCard() {
                const body = this.$refs.cardBody;
                if (body) body.scrollTop = 0;
                this._detachScroll?.();
                this._detachScroll = null;
                this.selectedCard = null;
                this.ctaVisible = false;
            },
        },
    };
</script>

<template>
    <div class="services_page">
        <div class="services_blob" aria-hidden="true"></div>
        <div class="container h-100">
            <div class="services_grid" :class="{ entered, ready, 'has-selection': selectedCard !== null }">

                <!-- ─── CARD 0 — Sito Vetrina ──────────────────────────────── -->
                <div class="service_card service_card--light"
                    :class="{
                        'is-expanded': selectedCard === 0,
                        'is-collapsed': selectedCard !== null && selectedCard !== 0,
                    }"
                    @click="selectCard(0)">

                    <template v-if="selectedCard !== 0">
                        <div class="card_idle_bg" aria-hidden="true">
                            <img src="/immagini_servizi/vetrina3.png" alt="" loading="lazy" />
                        </div>
                        <div class="card_idle" :class="{ 'card_idle--out': selectedCard !== null }">
                            <h2 class="service_title">{{ languageState.eng_lan ? 'Showcase Website' : 'Sito Vetrina' }}</h2>
                            <p class="service_desc">
                                <span v-if="languageState.eng_lan">A <strong>polished online presence</strong>, fast and built to <strong>turn visitors into clients</strong>.</span>
                                <span v-else>Una <strong>presenza online curata</strong>, veloce e costruita per <strong>convertire visitatori in clienti</strong>.</span>
                            </p>
                        </div>
                    </template>

                    <template v-else>
                        <button class="card_close" @click.stop="closeCard" aria-label="Chiudi">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                        </button>
                        <div class="card_expanded_body" ref="cardBody">
                            <div class="exp_inner">

                                <!-- S1: testo sinistra · img1 destra -->
                                <div class="exp_section exp_section--top">
                                    <div class="exp_col">
                                        <span class="exp_eyebrow">{{ languageState.eng_lan ? '01 — Service' : '01 — Servizio' }}</span>
                                        <h2 class="exp_title">{{ languageState.eng_lan ? 'Showcase Website' : 'Sito Vetrina' }}</h2>
                                        <p class="exp_desc"><span v-if="languageState.eng_lan">Custom design, fast loading, SEO-ready — everything from brief to launch.</span><span v-else>Design su misura, caricamento rapido, ottimizzato — dal brief al lancio.</span></p>
                                        <div class="exp_call_block">
                                            <span class="exp_call_badge">{{ languageState.eng_lan ? 'Start here' : 'Inizia da qui' }}</span>
                                            <p class="exp_call_text"><span v-if="languageState.eng_lan"><strong class="green_text_light">Free call, no commitment.</strong><br>Speak to me about your project.</span><span v-else><strong class="green_text_light">Call gratuita, senza impegno.</strong><br>Parlami del tuo progetto.</span></p>
                                        </div>
                                    </div>
                                    <div class="exp_col">
                                        <div class="exp_img_inline"><img src="/immagini_servizi/coach.png" alt="" loading="eager"/></div>
                                    </div>
                                </div>

                                <!-- S2: img2 sinistra · steps destra -->
                                <div class="exp_section exp_section--mid">
                                    <div class="exp_col">
                                        <div class="exp_img_inline"><img src="/immagini_servizi/aem.png" alt="" loading="eager"/></div>
                                    </div>
                                    <div class="exp_col">
                                        <div class="exp_divider"><span class="exp_divider_label">{{ languageState.eng_lan ? 'How it works' : 'Andiamo per ordine' }}</span><div class="exp_divider_line"></div></div>
                                        <div class="exp_steps">
                                            <div class="exp_step"><span class="exp_step_n">01</span><div class="exp_step_body"><strong>{{ languageState.eng_lan ? 'Free call, no commitment' : 'Call gratuita, senza impegno' }}</strong><span>{{ languageState.eng_lan ? '30 minutes, no pressure.' : '30 minuti senza pressioni.' }}</span></div></div>
                                            <div class="exp_step"><span class="exp_step_n">02</span><div class="exp_step_body"><strong>{{ languageState.eng_lan ? 'We identify your business' : 'Identifichiamo il tuo business' }}</strong><span>{{ languageState.eng_lan ? 'We find together the design and features that represent you.' : 'Troviamo insieme il design e le funzionalità che ti rappresentano.' }}</span></div></div>
                                            <div class="exp_step"><span class="exp_step_n">03</span><div class="exp_step_body"><strong>{{ languageState.eng_lan ? 'We present the proposal' : 'Ti presento la proposta' }}</strong><span>{{ languageState.eng_lan ? 'Clear timeline and costs, no surprises.' : 'Tempi e costi chiari, senza sorprese.' }}</span></div></div>
                                            <div class="exp_step"><span class="exp_step_n">04</span><div class="exp_step_body"><strong>{{ languageState.eng_lan ? 'We build it together' : 'Costruiamo insieme' }}</strong><span>{{ languageState.eng_lan ? 'Revisions included, continuous feedback.' : 'Revisioni incluse, feedback continuo.' }}</span></div></div>
                                            <div class="exp_step"><span class="exp_step_n">05</span><div class="exp_step_body"><strong>{{ languageState.eng_lan ? 'You go live' : 'Vai online' }}</strong><span>{{ languageState.eng_lan ? 'Deploy and hosting configured.' : 'Deploy e hosting configurati.' }}</span></div></div>
                                        </div>
                                    </div>
                                </div>

                                <!-- S3: pills + closing sinistra -->
                                <div class="exp_bottom">
                                    <div class="exp_extras">
                                        <span class="exp_extras_label">{{ languageState.eng_lan ? 'Extra options' : 'Opzioni aggiuntive' }}</span>
                                        <div class="exp_pills">
                                            <span class="exp_pill">{{ languageState.eng_lan ? 'Blog / News section' : 'Sezione blog / news' }}</span>
                                            <span class="exp_pill">{{ languageState.eng_lan ? 'Multi-language' : 'Multi-lingua' }}</span>
                                            <span class="exp_pill">{{ languageState.eng_lan ? 'Automations' : 'Automazioni' }}</span>
                                        </div>
                                    </div>
                                    <div class="exp_closing">
                                        <p class="exp_closing_text"><span v-if="languageState.eng_lan">From concept<br>to launch.</span><span v-else>Dal concept<br>al lancio.</span></p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </template>
                </div>

                <!-- ─── CARD 1 — Applicazione Web ──────────────────────────── -->
                <div class="service_card service_card--dark"
                    :class="{
                        'is-expanded': selectedCard === 1,
                        'is-collapsed': selectedCard !== null && selectedCard !== 1,
                    }"
                    @click="selectCard(1)">

                    <template v-if="selectedCard !== 1">
                        <div class="card_idle_bg" aria-hidden="true">
                            <img src="/immagini_servizi/dashboard.png" alt="" loading="lazy" />
                        </div>
                        <div class="card_idle" :class="{ 'card_idle--out': selectedCard !== null }">
                            <h2 class="service_title">{{ languageState.eng_lan ? 'Web Application' : 'Applicazione Web' }}</h2>
                            <p class="service_desc">
                                <span v-if="languageState.eng_lan"><strong>E-commerce</strong>, management platforms and internal tools with <strong>custom automations</strong>.</span>
                                <span v-else><strong>E-commerce</strong>, gestionali e strumenti interni con <strong>automazioni su misura</strong>.</span>
                            </p>
                        </div>
                    </template>

                    <template v-else>
                        <button class="card_close" @click.stop="closeCard" aria-label="Chiudi">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                        </button>
                        <div class="card_expanded_body" ref="cardBody">
                            <div class="exp_inner">
                                <div class="exp_section exp_section--top">
                                    <div class="exp_col">
                                        <span class="exp_eyebrow">{{ languageState.eng_lan ? '02 — Service' : '02 — Servizio' }}</span>
                                        <h2 class="exp_title">{{ languageState.eng_lan ? 'Web Application' : 'Applicazione Web' }}</h2>
                                        <p class="exp_desc"><span v-if="languageState.eng_lan">E-commerce, dashboards, automations — built for the way you actually work.</span><span v-else>E-commerce, gestionali, automazioni — costruiti attorno a come lavori davvero.</span></p>
                                        <div class="exp_call_block">
                                            <span class="exp_call_badge">{{ languageState.eng_lan ? 'Start here' : 'Inizia da qui' }}</span>
                                            <p class="exp_call_text"><span v-if="languageState.eng_lan"><strong>Free call, no commitment.</strong><br>We analyse your workflow and build exactly what you need, nothing more.</span><span v-else><strong class="green_text">Call gratuita, senza impegno.</strong><br>Analizziamo il tuo flusso di lavoro e costruiamo esattamente quello che ti serve, niente di più.</span></p>
                                        </div>
                                    </div>
                                    <div class="exp_col">
                                        <div class="exp_img_inline"><img src="/immagini_servizi/2-2.png" alt="" loading="eager"/></div>
                                    </div>
                                </div>
                                <div class="exp_section exp_section--mid">
                                    <div class="exp_col">
                                        <div class="exp_img_inline"><img src="/immagini_servizi/2-3.png" alt="" loading="eager"/></div>
                                    </div>
                                    <div class="exp_col">
                                        <div class="exp_divider"><span class="exp_divider_label">{{ languageState.eng_lan ? 'How it works' : 'Andiamo per ordine' }}</span><div class="exp_divider_line"></div></div>
                                        <div class="exp_steps">
                                            <div class="exp_step"><span class="exp_step_n">01</span><div class="exp_step_body"><strong>{{ languageState.eng_lan ? 'Free call, no commitment' : 'Call gratuita, senza impegno' }}</strong><span>{{ languageState.eng_lan ? '30 minutes to map out your needs.' : '30 minuti per mappare le tue esigenze.' }}</span></div></div>
                                            <div class="exp_step"><span class="exp_step_n">02</span><div class="exp_step_body"><strong>{{ languageState.eng_lan ? 'We identify your business' : 'Identifichiamo il tuo business' }}</strong><span>{{ languageState.eng_lan ? 'We find together the features and logic that fit your workflow.' : 'Troviamo insieme le funzionalità e la logica che si adattano al tuo flusso.' }}</span></div></div>
                                            <div class="exp_step"><span class="exp_step_n">03</span><div class="exp_step_body"><strong>{{ languageState.eng_lan ? 'Custom app, built around you' : 'App su misura, attorno al tuo business' }}</strong><span>{{ languageState.eng_lan ? 'No off-the-shelf software — everything tailored.' : 'Nessun software generico — tutto pensato per te.' }}</span></div></div>
                                            <div class="exp_step"><span class="exp_step_n">04</span><div class="exp_step_body"><strong>{{ languageState.eng_lan ? 'Automations that cut manual work' : 'Automazioni che eliminano il lavoro manuale' }}</strong><span>{{ languageState.eng_lan ? 'Repetitive tasks automated.' : 'I task ripetitivi vengono automatizzati.' }}</span></div></div>
                                            <div class="exp_step"><span class="exp_step_n">05</span><div class="exp_step_body"><strong>{{ languageState.eng_lan ? 'You go live' : 'Vai online' }}</strong><span>{{ languageState.eng_lan ? 'Deploy and hosting configured.' : 'Deploy e hosting configurati.' }}</span></div></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="exp_bottom">
                                    <div class="exp_extras">
                                        <span class="exp_extras_label">{{ languageState.eng_lan ? 'Extra options' : 'Opzioni aggiuntive' }}</span>
                                        <div class="exp_pills">
                                            <span class="exp_pill">{{ languageState.eng_lan ? 'AI / chatbot integration' : 'Integrazione AI / chatbot' }}</span>
                                            <span class="exp_pill">{{ languageState.eng_lan ? 'Old app reconstruction' : 'Ricostruzione vecchia app' }}</span>
                                            <span class="exp_pill">E-commerce</span>
                                        </div>
                                    </div>
                                    <div class="exp_closing">
                                        <p class="exp_closing_text"><span v-if="languageState.eng_lan">Built around<br>your business.</span><span v-else>Costruita attorno<br>al tuo business.</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>

                <!-- ─── CARD 2 — Progetto Custom ───────────────────────────── -->
                <div class="service_card service_card--light"
                    :class="{
                        'is-expanded': selectedCard === 2,
                        'is-collapsed': selectedCard !== null && selectedCard !== 2,
                    }"
                    @click="selectCard(2)">

                    <template v-if="selectedCard !== 2">
                        <div class="card_idle_bg" aria-hidden="true">
                            <img src="/immagini_servizi/cantiere.png" alt="" loading="lazy" />
                        </div>
                        <div class="card_idle" :class="{ 'card_idle--out': selectedCard !== null }">
                            <h2 class="service_title">{{ languageState.eng_lan ? 'Custom Project' : 'Progetto Custom' }}</h2>
                            <p class="service_desc">
                                <span v-if="languageState.eng_lan">A <strong>specific need</strong> or unconventional idea? <strong>Let's talk</strong> — we'll find the <strong>right approach</strong> together.</span>
                                <span v-else>Un'<strong>esigenza specifica</strong> o un'idea fuori dagli standard? <strong>Parliamone</strong> — troviamo insieme l'<strong>approccio giusto</strong>.</span>
                            </p>
                        </div>
                    </template>

                    <template v-else>
                        <button class="card_close" @click.stop="closeCard" aria-label="Chiudi">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
                        </button>
                        <div class="card_expanded_body" ref="cardBody">
                            <div class="exp_inner">
                                <div class="exp_section exp_section--top">
                                    <div class="exp_col">
                                        <span class="exp_eyebrow">{{ languageState.eng_lan ? '03 — Service' : '03 — Servizio' }}</span>
                                        <h2 class="exp_title">{{ languageState.eng_lan ? 'Custom Project' : 'Progetto Custom' }}</h2>
                                        <p class="exp_desc"><span v-if="languageState.eng_lan">Something specific or unconventional? We'll find the right approach together.</span><span v-else>Qualcosa di specifico o fuori dagli standard? Troviamo insieme l'approccio giusto.</span></p>
                                        <div class="exp_call_block">
                                            <span class="exp_call_badge">{{ languageState.eng_lan ? 'Start here' : 'Inizia da qui' }}</span>
                                            <p class="exp_call_text"><span v-if="languageState.eng_lan"><strong class="green_text_light">Free call, no commitment.</strong><br>Tell me your idea: in 30 minutes we map it out and find the right direction.</span><span v-else><strong class="green_text_light">Call gratuita, senza impegno.</strong><br>Raccontami la tua idea: in 30 minuti la mappiamo e troviamo la direzione giusta.</span></p>
                                        </div>
                                    </div>
                                    <div class="exp_col">
                                        <div class="exp_img_inline"><img src="/immagini_servizi/silos.png" alt="" loading="eager"/></div>
                                    </div>
                                </div>
                                <div class="exp_section exp_section--mid">
                                    <div class="exp_col">
                                        <div class="exp_img_inline"><img src="/immagini-progetti/bnb.png" alt="" loading="eager"/></div>
                                    </div>
                                    <div class="exp_col">
                                        <div class="exp_divider"><span class="exp_divider_label">{{ languageState.eng_lan ? 'How it works' : 'Andiamo per ordine' }}</span><div class="exp_divider_line"></div></div>
                                        <div class="exp_steps">
                                            <div class="exp_step"><span class="exp_step_n">01</span><div class="exp_step_body"><strong>{{ languageState.eng_lan ? 'Free call, no commitment' : 'Call gratuita, senza impegno' }}</strong><span>{{ languageState.eng_lan ? 'We explore your idea together, without any obligation.' : 'Esploriamo insieme la tua idea, senza nessun obbligo.' }}</span></div></div>
                                            <div class="exp_step"><span class="exp_step_n">02</span><div class="exp_step_body"><strong>{{ languageState.eng_lan ? 'We identify your business' : 'Identifichiamo il tuo business' }}</strong><span>{{ languageState.eng_lan ? 'We find together the features and design that represent you.' : 'Troviamo insieme le funzionalità e il design che ti rappresentano.' }}</span></div></div>
                                            <div class="exp_step"><span class="exp_step_n">03</span><div class="exp_step_body"><strong>{{ languageState.eng_lan ? 'Stack chosen for your specific need' : 'Stack scelto per la tua esigenza' }}</strong><span>{{ languageState.eng_lan ? 'We choose the right technology for your use case.' : 'Scegliamo la tecnologia giusta per il tuo caso.' }}</span></div></div>
                                            <div class="exp_step"><span class="exp_step_n">04</span><div class="exp_step_body"><strong>{{ languageState.eng_lan ? 'Modern, clean, recognisable design' : 'Design moderno, pulito e riconoscibile' }}</strong><span>{{ languageState.eng_lan ? 'Whatever the project, it will look and feel like you.' : 'Qualunque sia il progetto, sarà riconoscibile come tuo.' }}</span></div></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="exp_bottom">
                                    <div class="exp_extras">
                                        <span class="exp_extras_label">{{ languageState.eng_lan ? 'Extra options' : 'Opzioni aggiuntive' }}</span>
                                        <div class="exp_pills">
                                            <span class="exp_pill">{{ languageState.eng_lan ? 'Integration with existing systems' : 'Integrazione con sistemi esistenti' }}</span>
                                            <span class="exp_pill">{{ languageState.eng_lan ? 'Strategic consulting' : 'Consulenza strategica' }}</span>
                                            <span class="exp_pill">{{ languageState.eng_lan ? 'Maintenance & updates' : 'Manutenzione & aggiornamenti' }}</span>
                                        </div>
                                    </div>
                                    <div class="exp_closing">
                                        <p class="exp_closing_text"><span v-if="languageState.eng_lan">A project that<br>speaks for you.</span><span v-else>Un progetto che<br>parla di <i>te</i>.</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>

            </div>
        </div>

        <Transition name="wa-btn">
            <a
                v-if="ctaVisible"
                href="https://wa.me/3477952189?text=Ciao%20Damiano!%20Vorrei%20usufruire%20della%20call%20gratuita%20che%20offri.%0AHo%20visto%20i%20tuoi%20servizi%20e%20mi%20piacerebbe%20parlare%20di%20un%20progetto%20a%20cui%20sto%20pensando."
                target="_blank" rel="noopener noreferrer"
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

// ─── PAGE ─────────────────────────────────────────────────────────────────────

.services_page {
    margin-top: $header-h;
    height: calc(100dvh - $header-h);
    position: relative;
    overflow: hidden;
    background: #fafaf9;

    .container { height: 100%; padding-left: 0; padding-right: 0; }
}

.services_blob {
    position: absolute;
    top: -60px; right: -60px;
    width: 360px; height: 360px;
    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
    background: radial-gradient(circle at 40% 40%, rgba(120,120,125,0.4) 0%, rgba(150,150,155,0.15) 50%, transparent 72%);
    filter: blur(36px);
    pointer-events: none; z-index: 0;
    animation: blob-morph 12s ease-in-out infinite;
}
@keyframes blob-morph {
    0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
    50%       { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
}

// ─── GRID ─────────────────────────────────────────────────────────────────────

.services_grid {
    display: flex; flex-direction: row;
    height: 100%; gap: 0.75rem; padding: 0.75rem;
}

// ─── BASE CARD ────────────────────────────────────────────────────────────────

.service_card {
    flex: 1 1 0; min-width: 0; height: 100%;
    display: flex; flex-direction: column;
    padding: 3rem 2.5rem;
    position: relative; border-radius: 24px; overflow: hidden;
    opacity: 0; transform: translateY(22px); filter: blur(8px);

    &--light {
        background: #fafaf9; color: #1c1c1c;
        box-shadow: 0 12px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.08);
        .card_close { color: rgba(0,0,0,0.4); &:hover { color: #1c1c1c; background: rgba(0,0,0,0.1); } }
    }
    &--dark {
        background: #1c1c1c; color: #f5f4f2;
        box-shadow: 0 12px 32px rgba(0,0,0,0.38), 0 2px 8px rgba(0,0,0,0.22);
        .card_close { color: rgba(255,255,255,0.35); &:hover { color: #f5f4f2; background: rgba(255,255,255,0.1); } }
    }
}

// ─── CHEVRON ──────────────────────────────────────────────────────────────────

.services_grid.ready .service_card:not(.is-expanded):not(.is-collapsed)::after {
    content: '';
    position: absolute; bottom: 1.5rem; right: 1.6rem;
    width: 14px; height: 14px;
    border-right: 2px solid currentColor; border-top: 2px solid currentColor;
    transform: rotate(45deg); border-radius: 1px; opacity: 0.2;
    transition: opacity 0.18s ease, transform 0.18s ease;
}
.services_grid.ready:not(.has-selection) .service_card:hover::after {
    opacity: 0.5; transform: rotate(45deg) translate(2px, -2px);
}

// ─── ENTRY ANIMATION ──────────────────────────────────────────────────────────

.services_grid.entered .service_card {
    opacity: 1; transform: translateY(0); filter: blur(0);
    transition: opacity 0.85s $ease-out-expo, transform 0.85s $ease-out-expo, filter 0.7s ease;
    &:nth-child(1) { transition-delay: 0.08s; }
    &:nth-child(2) { transition-delay: 0.22s; }
    &:nth-child(3) { transition-delay: 0.36s; }
}

// ─── READY ────────────────────────────────────────────────────────────────────

.services_grid.ready .service_card {
    opacity: 1; transform: translateY(0); filter: none; cursor: pointer;
    transition:
        flex-grow  0.72s $ease-out-expo,
        flex-basis 0.72s $ease-out-expo,
        padding    0.65s $ease-out-expo,
        box-shadow 0.28s ease;
    transition-delay: 0s;
}
.services_grid.ready .service_card.is-expanded  { flex-grow: 10; flex-basis: 0; cursor: default; padding: 0; }
.services_grid.ready .service_card.is-collapsed {
    flex-grow: 0; flex-basis: 52px; padding: 0;
    &:hover { flex-basis: 70px; }
    .card_idle   { opacity: 0; }
    .service_num { left: 50%; top: 50%; transform: translate(-50%,-50%); opacity: 0.4; }
}

// ─── HOVER ────────────────────────────────────────────────────────────────────

.services_grid.ready:not(.has-selection) .service_card--light:hover {
    box-shadow: 0 20px 48px rgba(0,0,0,0.22), 0 4px 12px rgba(0,0,0,0.1);
}
.services_grid.ready:not(.has-selection) .service_card--dark:hover {
    box-shadow: 0 20px 48px rgba(0,0,0,0.5), 0 4px 12px rgba(0,0,0,0.28);
}

// ─── NUMBER ───────────────────────────────────────────────────────────────────

.service_num {
    position: absolute; top: 3rem; left: 2.5rem;
    pointer-events: none; z-index: 0;
    font-size: clamp(5rem, 10vw, 9rem); font-weight: 700; line-height: 1;
    letter-spacing: -0.04em; user-select: none;
    transition: left 0.72s $ease-out-expo, top 0.72s $ease-out-expo, transform 0.72s $ease-out-expo, opacity 0.25s ease;
    .service_card--light & { color: rgba(0,0,0,0.07); }
    .service_card--dark  & { color: rgba(255,255,255,0.07); }
}

// ─── IDLE CONTENT ─────────────────────────────────────────────────────────────

.card_idle_bg {
    position: absolute;
    inset: 0;
    z-index: 0;
    overflow: hidden;
    border-radius: inherit;
    pointer-events: none;

    img { width: 100%; height: 100%; object-fit: cover; object-position: top center; display: block; }

    // gradient in alto per non coprire testo e numero
    &::after {
        content: '';
        position: absolute;
        inset: 0;
        .service_card--light & {
            background: linear-gradient(to bottom, #fafaf9 30%, rgba(250,250,249,0.5) 65%, rgba(250,250,249,0) 100%);
        }
        .service_card--dark & {
            background: linear-gradient(to bottom, #1c1c1c 30%, rgba(28,28,28,0.5) 65%, rgba(28,28,28,0) 100%);
        }
    }
}

.card_idle {
    position: relative; z-index: 1;
    padding-top: 0;
    transition: opacity 0.25s ease;
    &--out { opacity: 0; pointer-events: none; }
}
.service_title {
    font-size: clamp(1.5rem, 2.4vw, 2.4rem); font-weight: 600;
    letter-spacing: -0.02em; margin-bottom: 1.1rem; line-height: 1.15;
}
.service_desc {
    font-size: clamp(0.85rem, 1.05vw, 0.98rem);
    line-height: 1.75; opacity: 0.7; max-width: 30ch;
}

// ─── CLOSE BUTTON ─────────────────────────────────────────────────────────────

.card_close {
    position: absolute; top: 1.25rem; right: 1.25rem; z-index: 10;
    width: 2.25rem; height: 2.25rem; border-radius: 50%;
    background: rgba(128,128,128,0.12); backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px); border: 1px solid rgba(128,128,128,0.18);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; flex-shrink: 0;
    transition: transform 0.22s ease, background 0.18s ease;
   
}

// ─── EXPANDED BODY (scroll) ───────────────────────────────────────────────────

.card_expanded_body {
    flex: 1 1 0;
    min-height: 0;
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
    scrollbar-color: rgba(128,128,128,0.2) transparent;
    position: relative;
    z-index: 2;
}

// ─── EXPANDED INNER ───────────────────────────────────────────────────────────

.exp_inner {
    padding: 3rem 3rem 5rem;
}

// ─── SEZIONI A GRIGLIA ────────────────────────────────────────────────────────

.exp_section {
    display: grid;
    gap: 2rem;
    align-items: center;
  
    overflow: visible;

    &--top { grid-template-columns: 3fr 2fr; }
    &--mid  { grid-template-columns: 2fr 3fr; }
}

.exp_col { display: flex; flex-direction: column; overflow: visible; }

// ─── IMMAGINI IN-FLOW con carattere ──────────────────────────────────────────

.exp_img_inline {
    width: 100%;
    aspect-ratio: 4 / 3;
    border-radius: 18px;
    overflow: hidden;
    flex-shrink: 0;

    img { width: 100%; height: 100%; object-fit: cover; object-position: top center; display: block; }
}

// img1 — colonna destra nella sezione top: inclinata, esce verso destra e in alto
.exp_section--top > .exp_col:last-child .exp_img_inline {
    transform: rotate(-9deg) translate(10%, -8%);
    box-shadow: 0 20px 50px rgba(0,0,0,0.28);
    transform-origin: bottom left;
}

// img2 — colonna sinistra nella sezione mid: più grande, inclinata, esce verso sinistra
.exp_section--mid > .exp_col:first-child .exp_img_inline {
    width: 130%;
    transform: rotate(7deg) translate(-18%, 6%);
    box-shadow: 0 20px 50px rgba(0,0,0,0.28);
    transform-origin: top right;
}

// ─── BOTTOM (pills + closing, sinistra) ──────────────────────────────────────

.exp_bottom {
    max-width: 85%;
}

.exp_eyebrow {
    display: block; font-size: 0.6rem; font-weight: 700;
    letter-spacing: 0.14em; text-transform: uppercase; opacity: 0.38; margin-bottom: 0.85rem;
}
.exp_title {
    font-size: clamp(1.8rem, 3vw, 2.6rem); font-weight: 700;
    letter-spacing: -0.04em; line-height: 1.06; margin: 0 0 0.85rem;
}
.exp_desc {
    font-size: 0.88rem; line-height: 1.7; opacity: 0.55; margin: 0 0 1.6rem; max-width: 38ch;
}

.green_text { color: #25D366; font-weight: 700; }
.green_text_light { color: #1cb254; font-weight: 700; }

// ─── CALL BLOCK ───────────────────────────────────────────────────────────────

.exp_call_block {
    padding: 1rem 1.25rem; border-radius: 14px; border-left: 3px solid currentColor;
    margin-bottom: 2.5rem;
    .service_card--light & { background: rgba(0,0,0,0.05); }
    .service_card--dark  & { background: rgba(255,255,255,0.06); }
}
.exp_call_badge {
    display: block; font-size: 0.55rem; font-weight: 700;
    letter-spacing: 0.14em; text-transform: uppercase; opacity: 0.38; margin-bottom: 0.45rem;
}
.exp_call_text { font-size: 1rem; line-height: 1.65; opacity: 0.78; margin: 0; }

// ─── DIVIDER ──────────────────────────────────────────────────────────────────

.exp_divider { display: flex; align-items: center; gap: 0.875rem; margin-bottom: 1.5rem; }
.exp_divider_label {
    font-size: 0.6rem; font-weight: 700; letter-spacing: 0.14em;
    text-transform: uppercase; opacity: 0.38; white-space: nowrap; flex-shrink: 0;
}
.exp_divider_line { flex: 1; height: 1px; background: currentColor; opacity: 0.12; }

// ─── STEPS ────────────────────────────────────────────────────────────────────

.exp_steps { display: flex; flex-direction: column; margin-bottom: 3rem; }
.exp_step {
    display: flex; align-items: flex-start; gap: 1.25rem; padding: 1rem 0;
    & + .exp_step { border-top: 1px solid rgba(128,128,128,0.12); }
}
.exp_step_n {
    font-size: 0.55rem; font-weight: 700; letter-spacing: 0.1em;
    opacity: 0.28; flex-shrink: 0; padding-top: 0.2rem; min-width: 1.6rem;
}
.exp_step_body {
    display: flex; flex-direction: column; gap: 0.18rem;
    strong { font-size: 1rem; font-weight: 600; letter-spacing: -0.01em; }
    span   { font-size: 0.8rem; line-height: 1.55; opacity: 0.56; }
}

// ─── EXTRAS ───────────────────────────────────────────────────────────────────

.exp_extras { margin-bottom: 3rem; }
.exp_extras_label {
    display: block; font-size: 0.55rem; font-weight: 700;
    letter-spacing: 0.14em; text-transform: uppercase; opacity: 0.35; margin-bottom: 0.8rem;
}
.exp_pills { display: flex; flex-wrap: wrap; gap: 0.45rem; }
.exp_pill {
    font-size: 0.76rem; font-weight: 500; padding: 0.32rem 0.85rem;
    border-radius: 999px; letter-spacing: 0.01em;
    .service_card--light & { background: rgba(0,0,0,0.06); color: rgba(0,0,0,0.62); border: 1px solid rgba(0,0,0,0.08); }
    .service_card--dark  & { background: rgba(255,255,255,0.07); color: rgba(255,255,255,0.58); border: 1px solid rgba(255,255,255,0.1); }
}

// ─── CLOSING ──────────────────────────────────────────────────────────────────

.exp_closing_text {
    font-size: clamp(2rem, 4.5vw, 3.4rem); font-weight: 700;
    letter-spacing: -0.045em; line-height: 1.04; margin: 0; opacity: 0.88;
}

// ─── WHATSAPP CTA ─────────────────────────────────────────────────────────────

.whatsapp_cta {
    position: fixed; bottom: 2rem; right: 2rem;
    display: inline-flex; align-items: center; gap: 0.55rem;
    padding: 0.42rem 1.15rem; background: #25D366; color: #fff; text-decoration: none;
    border-radius: 999px; border: 1px solid rgba(34,197,94,0.45);
    font-size: 0.75rem; font-weight: 700; letter-spacing: 0.01em;
    box-shadow: 0 10px 24px rgba(22,163,74,0.25), inset 0 1px 0 rgba(255,255,255,0.28);
    z-index: 200; isolation: isolate; overflow: hidden;
    transition: transform 0.28s ease, box-shadow 0.28s ease, background 0.28s ease, border-color 0.28s ease;
    &::before {
        content: ''; position: absolute; inset: 0;
        background: linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.65) 45%, transparent 70%);
        transform: translateX(-120%); transition: transform 0.75s ease; z-index: -1;
    }
    &:hover {
        color: #fff; background: #20c05e; border-color: rgba(34,197,94,0.75);
        box-shadow: 0 16px 36px rgba(22,163,74,0.34), 0 0 0 4px rgba(34,197,94,0.13), inset 0 1px 0 rgba(255,255,255,0.35);
        &::before { transform: translateX(120%); }
    }
    &:active { transform: translateY(-1px) scale(0.99); }
    svg { flex-shrink: 0; }
}

.wa-btn-enter-active,
.wa-btn-leave-active { transition: opacity 0.35s $ease-out-expo, transform 0.35s $ease-out-expo; }
.wa-btn-enter-from,
.wa-btn-leave-to     { opacity: 0; transform: translateY(18px) scale(0.94); }
</style>
