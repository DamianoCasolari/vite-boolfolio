<script>
    import { languageState } from "../assets/js/language.js";
    export default {
        name: "ServicesMobile",
        data() {
            return { languageState };
        },
    };
</script>

<template>
    <div class="mob_services">

        <!-- CARD 1 — Sito Vetrina -->
        <div class="mob_card mob_card--light">
            <span class="mob_num" aria-hidden="true">01</span>
            <div class="mob_card__body">
                <h2 class="mob_title">
                    {{ languageState.eng_lan ? 'Showcase Website' : 'Sito Vetrina' }}
                </h2>
                <p class="mob_desc">
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

                <!-- Phone only: 3 key chips -->
                <div class="mob_chips">
                    <span v-if="languageState.eng_lan">
                        <span class="mob_chip">Custom Design</span>
                        <span class="mob_chip">Lighthouse 90+</span>
                        <span class="mob_chip">Basic SEO</span>
                    </span>
                    <span v-else>
                        <span class="mob_chip">Design su misura</span>
                        <span class="mob_chip">Lighthouse 90+</span>
                        <span class="mob_chip">SEO di base</span>
                    </span>
                </div>

                <!-- Tablet only: full feature list -->
                <div class="mob_features_wrap">
                    <span class="mob_features_label">{{ languageState.eng_lan ? "What's included" : 'Cosa include' }}</span>
                    <ul class="mob_features">
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
            </div>
            <div class="mob_scroll_hint" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" stroke-width="1.5"
                    stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
            </div>
        </div>

        <!-- CARD 2 — Applicazione Web -->
        <div class="mob_card mob_card--dark">
            <span class="mob_num" aria-hidden="true">02</span>
            <div class="mob_card__body">
                <h2 class="mob_title">
                    {{ languageState.eng_lan ? 'Web Application' : 'Applicazione Web' }}
                </h2>
                <p class="mob_desc">
                    <span v-if="languageState.eng_lan">
                        <strong>Management platforms</strong>, <strong>e-commerce</strong>, portals
                        and internal tools with <strong>custom automations</strong> that cut manual work.
                    </span>
                    <span v-else>
                        <strong>Gestionali</strong>, <strong>e-commerce</strong>, portali e strumenti interni
                        con <strong>automazioni su misura</strong> che eliminano il lavoro manuale.
                    </span>
                </p>

                <!-- Phone only: 3 key chips -->
                <div class="mob_chips">
                    <span v-if="languageState.eng_lan">
                        <span class="mob_chip">E-commerce</span>
                        <span class="mob_chip">Automations</span>
                        <span class="mob_chip">API Integrations</span>
                    </span>
                    <span v-else>
                        <span class="mob_chip">E-commerce</span>
                        <span class="mob_chip">Automazioni</span>
                        <span class="mob_chip">Integrazione API</span>
                    </span>
                </div>

                <!-- Tablet only: full feature list -->
                <div class="mob_features_wrap">
                    <span class="mob_features_label">{{ languageState.eng_lan ? 'What will we build?' : 'Su cosa lavoreremo?' }}</span>
                    <ul class="mob_features">
                        <li>
                            <span v-if="languageState.eng_lan"><strong>E-commerce</strong> and custom <strong>management tools</strong></span>
                            <span v-else><strong>E-commerce</strong> e piccoli <strong>gestionali</strong> su misura</span>
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
                            <span v-if="languageState.eng_lan"><strong>Scales</strong> from MVP to enterprise</span>
                            <span v-else><strong>Scalabile</strong> da MVP a grande azienda</span>
                        </li>
                        <li>
                            <span v-if="languageState.eng_lan"><strong>Production deploy</strong> included, live from day one</span>
                            <span v-else><strong>Deploy in produzione</strong> incluso, live dal primo giorno</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="mob_scroll_hint" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" stroke-width="1.5"
                    stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
            </div>
        </div>

        <!-- CARD 3 — Progetto Custom -->
        <div class="mob_card mob_card--light mob_card--last">
            <span class="mob_num" aria-hidden="true">03</span>
            <div class="mob_card__body">
                <h2 class="mob_title">
                    {{ languageState.eng_lan ? 'Custom Project' : 'Progetto Custom' }}
                </h2>
                <p class="mob_desc">
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

                <!-- Phone only: 3 key chips -->
                <div class="mob_chips">
                    <span v-if="languageState.eng_lan">
                        <span class="mob_chip">Free call</span>
                        <span class="mob_chip">Iterative approach</span>
                        <span class="mob_chip">Flexible timeline</span>
                    </span>
                    <span v-else>
                        <span class="mob_chip">Call gratuita</span>
                        <span class="mob_chip">Approccio iterativo</span>
                        <span class="mob_chip">Tempi flessibili</span>
                    </span>
                </div>

                <!-- Tablet only: full feature list -->
                <div class="mob_features_wrap">
                    <span class="mob_features_label">{{ languageState.eng_lan ? 'How it works' : 'Come funziona' }}</span>
                    <ul class="mob_features">
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
                            <span v-else><strong>Approccio iterativo</strong> con feedback continuo</span>
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
            </div>
        </div>

        <!-- WA CTA — fixed, always visible -->
        <a
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

    </div>
</template>

<style lang="scss" scoped>
$header-h: 80px;

.mob_services {
    margin-top: $header-h;
    height: calc(100dvh - $header-h);
    overflow-y: auto;
    scroll-snap-type: y mandatory;
    -webkit-overflow-scrolling: touch;

    @media (min-width: 576px) {
        scroll-snap-type: none;
        height: auto;
        min-height: calc(100dvh - $header-h);
        overflow-y: visible;
    }
}

// ─── CARD ────────────────────────────────────────────────────────────────────

.mob_card {
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    padding: 2.5rem 1.75rem 1.75rem;

    // Phone: full-screen snap
    height: calc(100dvh - $header-h);
    scroll-snap-align: start;
    scroll-snap-stop: always;

    @media (min-width: 576px) {
        height: auto;
        min-height: 0;
        padding: 4rem 3rem 3.5rem;
        scroll-snap-align: none;
    }

    &--light {
        background-color: #fafaf9;
        color: #1c1c1c;
        .mob_num        { color: rgba(0, 0, 0, 0.05); }
        .mob_scroll_hint { color: rgba(0, 0, 0, 0.22); }
        .mob_chip       { background: rgba(0, 0, 0, 0.07); color: rgba(0, 0, 0, 0.6); }
        .mob_features_wrap {
            background: rgba(10, 10, 10, 0.06);
            border: 1px solid rgba(0, 0, 0, 0.08);
        }
        .mob_features_label { color: rgba(0, 0, 0, 0.38); border-bottom-color: rgba(0, 0, 0, 0.08); }
        .mob_features li    { color: rgba(0, 0, 0, 0.7); border-top-color: rgba(0, 0, 0, 0.06); }
        .mob_features li::before { color: rgba(0, 0, 0, 0.3); }
    }

    &--dark {
        background-color: #1c1c1c;
        color: #f5f4f2;
        .mob_num        { color: rgba(255, 255, 255, 0.04); }
        .mob_scroll_hint { color: rgba(255, 255, 255, 0.18); }
        .mob_chip       { background: rgba(255, 255, 255, 0.1); color: rgba(255, 255, 255, 0.7); }
        .mob_features_wrap {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.09);
        }
        .mob_features_label { color: rgba(255, 255, 255, 0.35); border-bottom-color: rgba(255, 255, 255, 0.09); }
        .mob_features li    { color: rgba(255, 255, 255, 0.72); border-top-color: rgba(255, 255, 255, 0.06); }
        .mob_features li::before { color: rgba(255, 255, 255, 0.35); }
    }
}

// ─── NUMERO DECORATIVO ───────────────────────────────────────────────────────

.mob_num {
    position: absolute;
    top: 0.75rem;
    left: 1.5rem;
    font-size: clamp(6rem, 28vw, 9rem);
    font-weight: 700;
    line-height: 1;
    letter-spacing: -0.04em;
    user-select: none;
    pointer-events: none;

    @media (min-width: 576px) {
        font-size: clamp(8rem, 16vw, 13rem);
        top: 1rem;
        left: 2.5rem;
    }
}

// ─── BODY ────────────────────────────────────────────────────────────────────

.mob_card__body {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    position: relative;
    z-index: 1;
    padding-top: clamp(4rem, 18vw, 7rem);

    @media (min-width: 576px) {
        padding-top: clamp(6rem, 14vw, 10rem);
        gap: 1.5rem;
    }
}

.mob_title {
    font-size: clamp(1.8rem, 7vw, 2.4rem);
    font-weight: 600;
    letter-spacing: -0.02em;
    line-height: 1.1;
    margin: 0;

    @media (min-width: 576px) {
        font-size: clamp(2rem, 4vw, 2.8rem);
    }
}

.mob_desc {
    font-size: 0.95rem;
    line-height: 1.7;
    opacity: 0.72;
    margin: 0;
    max-width: 54ch;
}

// ─── CHIPS (phone only) ───────────────────────────────────────────────────────

.mob_chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.45rem;

    @media (min-width: 576px) {
        display: none;
    }

    span { display: contents; }
}

.mob_chip {
    display: inline-block;
    padding: 0.28rem 0.75rem;
    border-radius: 100px;
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.02em;
}

// ─── FEATURE LIST (tablet only) ───────────────────────────────────────────────

.mob_features_wrap {
    display: none;

    @media (min-width: 576px) {
        display: block;
        border-radius: 16px;
        overflow: hidden;
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
    }
}

.mob_features_label {
    display: block;
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid;
}

.mob_features {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: 1fr 1fr;

    li {
        font-size: 0.85rem;
        line-height: 1.5;
        padding: 0.65rem 0.85rem 0.65rem 2rem;
        position: relative;
        border-top: 1px solid;

        &:first-child,
        &:nth-child(2) { border-top: none; }

        &:nth-child(odd):not(:last-child) {
            border-right: 1px solid;
            border-right-color: inherit;
        }

        &:last-child:nth-child(odd) {
            grid-column: span 2;
        }

        &::before {
            content: '✓';
            position: absolute;
            left: 0.75rem;
            top: 0.65rem;
            font-size: 0.65rem;
            font-weight: 700;
            line-height: 1.5;
        }
    }
}

// ─── SCROLL HINT (phone only) ────────────────────────────────────────────────

.mob_scroll_hint {
    display: flex;
    justify-content: center;
    padding-bottom: 0.25rem;
    animation: bounce 2s ease-in-out infinite;

    @media (min-width: 576px) {
        display: none;
    }
}

@keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50%       { transform: translateY(6px); }
}

// ─── WA CTA FIXED ────────────────────────────────────────────────────────────

.mob_wa_cta {
    position: fixed;
    bottom: 2rem;
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
</style>
