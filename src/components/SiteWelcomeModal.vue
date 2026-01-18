<script>
    import * as bootstrap from "bootstrap";
    import { languageState } from "../assets/js/language.js";

    export default {
        name: "SiteWelcomeModal",
        data() {
            return {
                languageState,
                step: 1, // 1 | 2 | 3
            };
        },
        computed: {
            waLink() {
                const msg = this.languageState.eng_lan
                    ? "Hi! I'm interested in the 300€ website offer. Can you tell me what's included?"
                    : "Ciao! Mi interessa l’offerta sito a 300€. Mi dici cosa include?";
                return "https://wa.me/3517280143?text=" + encodeURIComponent(msg);
            },
            t() {
                if (this.languageState.eng_lan) {
                    return {
                        title: "Professional website for your business",
                        subtitle:
                            "A clear, fast and reliable online presence, designed to help customers find and contact you easily.",
                        product: "Complete landing page",
                        priceNote: "+ €15/month management",
                        s1: "What’s included",
                        s2: "Monthly management (€15/month)",
                        s3: "Need more than one page?",
                        contacts: "Go to contacts",
                        whatsapp: "Write on WhatsApp",
                        inc: [
                            { parts: [{ t: "Modern design", b: true }, { t: ", mobile and tablet friendly" }] },
                            { parts: [{ t: "Clear", b: true }, { t: " and " }, { t: "easy navigation", b: true }] },
                            { parts: [{ t: "Basic", b: true }, { t: " Google optimization" }] },
                            { parts: [{ t: "Quick contact actions", b: true }, { t: " (WhatsApp, email, form)" }] },
                            { parts: [{ t: "Full setup", b: true }, { t: " and " }, { t: "website deployment", b: true }] },
                        ],
                        mng: [
                            { parts: [{ t: "Domain included", b: true }, { t: " (e.g. yoursite.com)" }] },
                            { parts: [{ t: "Reliable hosting", b: true }] },
                            { parts: [{ t: "Secure connection", b: true }, { t: " (HTTPS)" }] },

                            {
                                parts: [
                                    { t: "1 content update per year included", b: true },
                                    { t: " (text or images)" },
                                ],
                            },

                            {
                                parts: [
                                    { t: "*Additional updates", b: true },
                                    { t: " available on request, " },
                                    { t: "with an agreed cost", b: true },
                                ],
                            },

                            { parts: [{ t: "No long-term commitment", b: true }, { t: ". Cancel anytime" }] },
                        ],


                        pagesHint:
                            "Additional pages can be added based on your needs, with a clear quote agreed together.",
                        noHidden:
                            "No hidden costs. Everything is clearly agreed before we start.",
                        step: "Step",
                        back: "Back",
                        next: "Next",
                    };
                }

                return {
                    title: "Sito web professionale per la tua attività",
                    subtitle:
                        "Una presenza online chiara, veloce e affidabile, pensata per farti trovare e contattare facilmente.",
                    product: "Pagina vetrina completa",
                    priceNote: "+ 15€/mese gestione",
                    s1: "Cosa include",
                    s2: "Gestione mensile (15€/mese)",
                    s3: "Vuoi più di una pagina?",
                    contacts: "Vai ai contatti",
                    whatsapp: "Scrivimi su WhatsApp",
                    inc: [
                        { parts: [{ t: "Design moderno", b: true }, { t: ", ottimizzato per smartphone e tablet" }] },
                        { parts: [{ t: "Struttura chiara", b: true }, { t: " e " }, { t: "facile da navigare", b: true }] },
                        { parts: [{ t: "Ottimizzazione di base", b: true }, { t: " per Google" }] },
                        { parts: [{ t: "Contatti rapidi", b: true }, { t: " (WhatsApp, email o modulo)" }] },
                        { parts: [{ t: "Pubblicazione", b: true }, { t: " e " }, { t: "configurazione completa", b: true }, { t: " del sito" }] },
                    ],
                    mng: [
                        { parts: [{ t: "Dominio incluso", b: true }, { t: " (es. nomesito.it)" }] },
                        { parts: [{ t: "Hosting affidabile", b: true }] },
                        { parts: [{ t: "Connessione sicura", b: true }, { t: " (HTTPS)" }] },

                        {
                            parts: [
                                { t: "1 modifica dei contenuti all’anno", b: true },
                                { t: " inclusa (testi o immagini)" },
                            ],
                        },

                        {
                            parts: [
                                { t: "*Ulteriori modifiche", b: true },
                                { t: " disponibili su richiesta, " },
                                { t: "con costo concordato", b: true },
                            ],
                        },

                        { parts: [{ t: "Nessun vincolo", b: true }, { t: ", disdici quando vuoi" }] },
                    ],

                    pagesHint:
                        "È possibile aggiungere altre pagine in base alle tue esigenze, con un preventivo chiaro e condiviso.",
                    noHidden:
                        "Nessun costo nascosto. Tutto viene concordato con chiarezza prima di partire.",
                    step: "Step",
                    back: "Indietro",
                    next: "Avanti",
                };
            },
        },
        methods: {
            toggleLang() {
                this.languageState.toggle();
            },
            goContacts() {
                const el = document.getElementById("welcomeModal");
                const navigate = () => this.$router.push("/contacts");

                if (!el) return navigate();

                const instance = bootstrap.Modal.getInstance(el);
                if (!instance) return navigate();

                el.addEventListener("hidden.bs.modal", navigate, { once: true });
                if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
                instance.hide();
            },
            setStep(n) {
                this.step = n;
            },
            next() {
                this.step = Math.min(3, this.step + 1);
            },
            prev() {
                this.step = Math.max(1, this.step - 1);
            },
        },
    };
</script>

<template>
    <div class="modal fade" id="welcomeModal" tabindex="-1" aria-labelledby="welcomeModalLabel">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content welcome-modal">

                <!-- Header -->
                <div class="modal-header border-0 pb-0">
                    <div class="welcome-header w-100">
                        <div class="welcome-badge d-flex align-items-center justify-content-center">%</div>

                        <div class="welcome-title">
                            <div class="d-flex align-items-center gap-2 flex-wrap">
                                <h5 class="modal-title m-0" id="welcomeModalLabel">{{ t.title }}</h5>
                                <span class="badge rounded-pill text-bg-light border">
                                    {{ t.step }} {{ step }}/3
                                </span>
                            </div>
                            <!-- <div class="text-muted small mt-1">{{ t.subtitle }}</div> -->
                            <span class="badge rounded-pill text-bg-dark">Offerta 2026</span>
                        </div>

                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                </div>

                <div class="modal-body pt-3">
                    <!-- Price -->
                    <div class="price-strip p-3 rounded-4 mb-3">
                        <div class="d-flex align-items-center justify-content-between flex-wrap gap-2">
                            <div>
                                <div class="fw-semibold">{{ t.product }}</div>
                                <div class="text-muted small">Design · sviluppo · messa online</div>
                            </div>
                            <div class="text-end">
                                <div class="price"><span class="currency">€</span>300</div>
                                <div class="text-muted small">{{ t.priceNote }}</div>
                            </div>
                        </div>
                    </div>

                    <!-- Steps -->
                    <div class="step-tabs mb-3">
                        <button type="button" class="step-tab" :class="{ active: step === 1 }" @click="setStep(1)">
                            1 · {{ t.s1 }}
                        </button>
                        <button type="button" class="step-tab" :class="{ active: step === 2 }" @click="setStep(2)">
                            2 · {{ t.s2 }}
                        </button>
                        <button type="button" class="step-tab" :class="{ active: step === 3 }" @click="setStep(3)">
                            3 · {{ t.s3 }}
                        </button>
                    </div>

                    <div class="info-card p-3 rounded-4">
                        <template v-if="step === 1">
                            <div class="fw-semibold mb-2">{{ t.s1 }}</div>
                            <ul class="mb-0 small">
                               <li v-for="(row, i) in t.inc" :key="i">
                                    <template v-for="(p, j) in row.parts" :key="j">
                                        <b v-if="p.b">{{ p.t }}</b>
                                        <span v-else>{{ p.t }}</span>
                                    </template>
                                </li>
                            </ul>
                        </template>

                        <template v-else-if="step === 2">
                            <div class="fw-semibold mb-2">{{ t.s2 }}</div>
                            <ul class="mb-0 small">
                                <li v-for="(row, i) in t.mng" :key="i">
                                    <template v-for="(p, j) in row.parts" :key="j">
                                        <b v-if="p.b">{{ p.t }}</b>
                                        <span v-else>{{ p.t }}</span>
                                    </template>
                                </li>
                            </ul>
                        </template>

                        <template v-else>
                            <div class="fw-semibold mb-2">{{ t.s3 }}</div>
                            <div class="row g-3">
                                <div class="col-12 col-md-4">
                                    <div class="mini-card p-3 rounded-4 h-100">
                                        <div class="fw-semibold mb-1">Home</div>
                                        <div class="text-muted small">Presentazione e contatti</div>
                                    </div>
                                </div>
                                <div class="col-12 col-md-4">
                                    <div class="mini-card p-3 rounded-4 h-100">
                                        <div class="fw-semibold mb-1">
                                            {{ languageState.eng_lan ? "Services" : "Servizi" }}
                                        </div>
                                        <div class="text-muted small">Dettaglio attività</div>
                                    </div>
                                </div>
                                <div class="col-12 col-md-4">
                                    <div class="mini-card p-3 rounded-4 h-100">
                                        <div class="fw-semibold mb-1">
                                            {{ languageState.eng_lan ? "Contacts" : "Contatti" }}
                                        </div>
                                        <div class="text-muted small">WhatsApp · form</div>
                                    </div>
                                </div>
                            </div>
                            <div class="text-muted small mt-3">{{ t.pagesHint }}</div>
                        </template>
                    </div>

                    <div class="d-flex justify-content-between align-items-center mt-3">
                        <button type="button" class="btn btn-outline-dark btn-sm" @click="prev" :disabled="step === 1">
                            ‹ {{ t.back }}
                        </button>
                        <button type="button" class="btn btn-outline-dark btn-sm" @click="next" :disabled="step === 3">
                            {{ t.next }} ›
                        </button>
                    </div>

                    <div class="text-muted small mt-3">{{ t.noHidden }}</div>
                </div>

                <div class="modal-footer border-0 pt-0 d-flex justify-content-between flex-wrap gap-2">
                    <button type="button" class="btn btn-outline-dark" @click="goContacts">
                        {{ t.contacts }}
                    </button>
                    <div class="d-flex justify-content-center align-item-center">
                        <a class="btn btn-success" :href="waLink" target="_blank" rel="noopener">
                            {{ t.whatsapp }}
                        </a>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<style scoped>
    .welcome-modal {
        border-radius: 22px;
        overflow: hidden;
    }

    .welcome-header {
        display: grid;
        grid-template-columns: 44px 1fr 40px;
        align-items: start;
        column-gap: 12px;
    }

    .welcome-title {
        min-width: 0;
    }

    .welcome-badge {
        width: 44px;
        height: 44px;
        border-radius: 14px;
        background: rgba(0, 0, 0, 0.06);
        font-weight: 800;
    }

    .price-strip {
        background: linear-gradient(135deg, rgba(0, 0, 0, 0.06), rgba(0, 0, 0, 0.02));
        border: 1px solid rgba(0, 0, 0, 0.06);
    }

    .price {
        font-size: 34px;
        font-weight: 800;
        line-height: 1;
    }

    .currency {
        font-size: 18px;
        vertical-align: super;
        margin-right: 2px;
    }

    .info-card {
        border: 1px solid rgba(0, 0, 0, 0.08);
        background: #fff;
    }

    .mini-card {
        border: 1px solid rgba(0, 0, 0, 0.08);
        background: rgba(0, 0, 0, 0.02);
    }

    .step-tabs {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
    }

    .step-tab {
        border: 1px solid rgba(0, 0, 0, 0.1);
        background: #fff;
        border-radius: 999px;
        padding: 8px 12px;
        font-size: 13px;
    }

    .step-tab.active {
        border-color: rgba(0, 0, 0, 0.25);
        background: rgba(0, 0, 0, 0.04);
        font-weight: 700;
    }
</style>
