<script>
    import { languageState } from "../assets/js/language.js";
    export default {
        name: "AboutMobile",
        data() {
            return {
                languageState,
                loading: true,
                entered: false,
            };
        },
        mounted() {
            const img = new Image();
            img.onload = img.onerror = () => {
                this.loading = false;
                this.$nextTick(() => {
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => { this.entered = true; });
                    });
                });
            };
            img.src = "/immagini_about_me/foto1-3.webp";
        },
    };
</script>

<template>
    <!-- LOADER -->
    <div v-if="loading" class="bg_snow vh100 d-flex flex-column align-items-center justify-content-center">
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

    <!-- CONTENUTO -->
    <div v-else class="about_page">
    <div class="about_mob" :class="{ entered }">

        <!-- TESTO -->
        <div class="about_left">
            <div class="about_left--dark">
                <span class="about_eyebrow">{{ languageState.eng_lan ? '— About me' : '— Chi sono' }}</span>
                <h1 class="about_name">Damiano<br>Casolari</h1>
                <p class="about_bio" v-if="!languageState.eng_lan">Sono Damiano, <strong>software developer</strong> e <strong>creativo digitale</strong>. Creo <strong>esperienze</strong> e <strong>prodotti digitali</strong> dal <strong>design curato</strong>, pensati per <strong>valorizzare brand</strong>, idee e progetti online. Unisco <strong>codice</strong>, estetica e <strong>attenzione al dettaglio</strong> per dare forma a soluzioni <strong>moderne</strong>, pulite e <strong>riconoscibili</strong>.</p>
                <p class="about_bio" v-else>I'm Damiano, <strong>software developer</strong> and <strong>digital creative</strong>. I build <strong>digital experiences</strong> and <strong>products</strong> with <strong>refined design</strong>, crafted to <strong>elevate brands</strong>, ideas and projects online. I combine <strong>code</strong>, aesthetics and <strong>attention to detail</strong> to shape <strong>modern</strong>, clean and <strong>recognisable</strong> solutions.</p>
            </div>

            <!-- Layer bianco: dentro about_left → stesso contenitore, allineamento garantito -->
            <!-- <div class="about_left--white" aria-hidden="true">
                <span class="about_eyebrow">{{ languageState.eng_lan ? '— About me' : '— Chi sono' }}</span>
                <h1 class="about_name">Damiano<br>Casolari</h1>
                <p class="about_bio" v-if="!languageState.eng_lan">Sono Damiano, <strong>software developer</strong> e <strong>creativo digitale</strong>. Creo <strong>esperienze</strong> e <strong>prodotti digitali</strong> dal <strong>design curato</strong>, pensati per <strong>valorizzare brand</strong>, idee e progetti online. Unisco <strong>codice</strong>, estetica e <strong>attenzione al dettaglio</strong> per dare forma a soluzioni <strong>moderne</strong>, pulite e <strong>riconoscibili</strong>.</p>
                <p class="about_bio" v-else>I'm Damiano, <strong>software developer</strong> and <strong>digital creative</strong>. I build <strong>digital experiences</strong> and <strong>products</strong> with <strong>refined design</strong>, crafted to <strong>elevate brands</strong>, ideas and projects online. I combine <strong>code</strong>, aesthetics and <strong>attention to detail</strong> to shape <strong>modern</strong>, clean and <strong>recognisable</strong> solutions.</p>
            </div> -->
        </div>

        <!-- FOTO -->
        <div class="about_photo_wrap">
            <div class="about_photo_clip">
                <div class="about_photo_fx">
                    <img
                        src="/immagini_about_me/foto1-3.webp"
                        alt="Damiano Casolari"
                        class="about_photo about_photo--color"
                    />
                    <img
                        src="/immagini_about_me/foto1-3.webp"
                        alt=""
                        aria-hidden="true"
                        class="about_photo about_photo--bw"
                    />
                </div>
            </div>
        </div>

        <!-- SVG: una cresta attraversa la foto sollevandone i pixel, e scopre il colore solo su quella riga -->
        <svg aria-hidden="true" class="about_svg_defs">
            <defs>
                <!--
                    Displacement map: grigio neutro (128 = nessuno spostamento) ovunque, con due bande
                    sfumate che scorrono dal basso verso l'alto — G alto solleva i pixel (cresta),
                    G basso li abbassa (cavo dell'onda). Il canale R resta 128: nessuno spostamento orizzontale.
                -->
                <filter id="about_crest_filter" x="-10%" y="-10%" width="120%" height="120%"
                        primitiveUnits="objectBoundingBox" color-interpolation-filters="sRGB">
                    <feFlood flood-color="rgb(128,128,128)" x="-0.1" y="-0.1" width="1.2" height="1.2" result="neutral" />

                    <feFlood flood-color="rgb(128,235,128)" x="-0.1" y="1.08" width="1.2" height="0.06" result="crest">
                        <animate attributeName="y" values="1.08;1.08;-0.14;-0.14" keyTimes="0;0.06;0.46;1" dur="6s" begin="0.7s" calcMode="linear" repeatCount="indefinite" />
                    </feFlood>

                    <feFlood flood-color="rgb(128,30,128)" x="-0.1" y="1.15" width="1.2" height="0.06" result="trough">
                        <animate attributeName="y" values="1.15;1.15;-0.07;-0.07" keyTimes="0;0.06;0.46;1" dur="6s" begin="0.7s" calcMode="linear" repeatCount="indefinite" />
                    </feFlood>

                    <feMerge x="-0.1" y="-0.1" width="1.2" height="1.2" result="bandsRaw">
                        <feMergeNode in="crest" />
                        <feMergeNode in="trough" />
                    </feMerge>

                    <feGaussianBlur in="bandsRaw" stdDeviation="0 0.014" x="-0.1" y="-0.1" width="1.2" height="1.2" result="bands" />

                    <feMerge x="-0.1" y="-0.1" width="1.2" height="1.2" result="dmap">
                        <feMergeNode in="neutral" />
                        <feMergeNode in="bands" />
                    </feMerge>

                    <feDisplacementMap in="SourceGraphic" in2="dmap" xChannelSelector="R" yChannelSelector="G" scale="0.065" />
                </filter>

                <!-- Bordo sfumato dei due wipe: la transizione non è netta ma si dissolve sulla cresta -->
                <linearGradient id="about_wipe_color" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stop-color="#fff" />
                    <stop offset="0.045" stop-color="#000" />
                    <stop offset="1" stop-color="#000" />
                </linearGradient>

                <linearGradient id="about_wipe_bw" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stop-color="#000" />
                    <stop offset="0.045" stop-color="#fff" />
                    <stop offset="1" stop-color="#fff" />
                </linearGradient>

                <!--
                    Maschera del layer b/n (bianco = b/n, nero = colore). Ogni onda si lascia dietro
                    il proprio stato: la prima stende il colore risalendo, la seconda ripassa e
                    riporta il bianco e nero. Ciclo di 12s = due passaggi della cresta (6s l'uno).
                -->
                <mask id="about_wipe_mask" maskContentUnits="objectBoundingBox">
                    <rect x="-0.2" y="-0.2" width="1.4" height="1.4" fill="#fff" />

                    <rect x="-0.2" y="1.06" width="1.4" height="1.4" fill="url(#about_wipe_color)">
                        <animate attributeName="y" values="1.06;1.06;-0.16;-0.16" keyTimes="0;0.03;0.23;1" dur="12s" begin="0.7s" calcMode="linear" repeatCount="indefinite" />
                    </rect>

                    <rect x="-0.2" y="1.06" width="1.4" height="1.4" fill="url(#about_wipe_bw)">
                        <animate attributeName="y" values="1.06;1.06;-0.16;-0.16" keyTimes="0;0.53;0.73;1" dur="12s" begin="0.7s" calcMode="linear" repeatCount="indefinite" />
                    </rect>
                </mask>
            </defs>
        </svg>

    </div>
    </div>
</template>

<style lang="scss" scoped>
$header-h: 40px;

// Wrapper full-width: contiene la shape senza vincoli di max-width
.about_page {
    position: relative;
    background: #fafaf9;
    overflow: hidden;
    height: calc(100dvh - $header-h);
    margin-top: $header-h;

    &::before {
        content: '';
        position: absolute;
        width: 60vw;
        height: 60vw;
        background: linear-gradient(#e2e0dd 25%, #d4d1cc 55%);
        border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
        animation: morph 8s ease-in-out infinite;
        bottom: -12vw;
        right: -8vw;
        z-index: 0;
        pointer-events: none;
    }
}

.about_mob {
    height: 100%;
    display: block;
    box-sizing: border-box;
    position: relative;

    // Desktop: stessi margini del container Bootstrap dell'header
    @media (min-width: 768px)  { max-width: 720px;  margin-inline: auto; padding-inline: 0.75rem; }
    @media (min-width: 992px)  { max-width: 960px; }
    @media (min-width: 1200px) { max-width: 1140px; }
    @media (min-width: 1400px) { max-width: 1320px; }
}

$ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);

// ─── ANIMAZIONE ENTRATA ───────────────────────────────────────────────────────

.about_left--dark,
.about_photo_wrap {
    opacity: 0;
    filter: blur(6px);
    transform: translateY(18px);
    transition: opacity 0.5s ease, transform 0.15s ease, filter 0.5s ease;
}

.about_mob.entered .about_left--dark,
.about_mob.entered .about_photo_wrap {
    opacity: 1;
    filter: none;
    transform: translateY(0);
    transition: opacity 0.8s $ease-out-expo, transform 0.8s $ease-out-expo, filter 0.65s ease;
}

.about_mob.entered .about_left--dark  { transition-delay: 0.05s; }
.about_mob.entered .about_photo_wrap  { transition-delay: 0.22s; }

// ─── LAYOUT ──────────────────────────────────────────────────────────────────
// Testo (65%) e foto (50% da destra) si sovrappongono del 15% al centro.
// Il layer bianco ha STESSA larghezza del layer base → testo identico → clip preciso.
// Foto parte al 50% di .about_mob → dentro il layer 65%: 50/65 = 76.9% ≈ 77%

.about_left {
    position: relative;
    z-index: 2;
    width: 50%;
    height: 100%;
    padding: 2.75rem 1.25rem 2rem 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow-y: auto;
}

// .about_left--dark {
//     clip-path: inset(0 18% 0 0);
// }

// .about_left--white {
//     position: absolute;
//     left: -3.5px;
//     top: 0;
//     width: 100%;
//     height: 100%;
//     padding: 2.75rem 1.25rem 2rem 1.5rem;
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     color: white;
//     clip-path: inset(0 0 0 77%);
//     pointer-events: none;
//     z-index: 3;

//     .about_name  { color: white; }
//     .about_bio   { color: white; strong { color: white; font-weight: 700; } }
//     .about_eyebrow { color: white; }
// }

.about_eyebrow {
    display: block;
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    opacity: 0.5;
    margin-bottom: 1.1rem;
}

.about_name {
    font-size: clamp(1.9rem, 8.5vw, 2.8rem);
    font-weight: 700;
    letter-spacing: -0.04em;
    line-height: 1.06;
    color: #1c1c1c;
    margin: 0 0 1.5rem;
}

.about_bio {
    font-size: clamp(0.78rem, 3vw, 0.9rem);
    line-height: 1.8;
    color: #555;
    margin: 0;

    strong { font-weight: 600; color: #1c1c1c; }
}

.about_photo_wrap {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 50%;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 1rem 1rem 1rem 0;
}

.about_svg_defs {
    position: absolute;
    width: 0;
    height: 0;
    overflow: hidden;
}

.about_photo_clip {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 20px;
    overflow: hidden;
}

// Leggermente più grande della cornice: dà "materiale" extra da cui pescare
// quando la cresta sposta i pixel, così ai bordi non si aprono fessure trasparenti.
.about_photo_fx {
    position: absolute;
    inset: -20px;
    filter: url(#about_crest_filter);
}

.about_photo {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
}

// Il layer b/n sta sopra quello a colori: la maschera decide dove scoprire il colore sotto.
.about_photo--bw {
    filter: grayscale(1) contrast(1.05) brightness(1.02);
    -webkit-mask-image: url(#about_wipe_mask);
    mask-image: url(#about_wipe_mask);
}

@media (prefers-reduced-motion: reduce) {
    .about_photo_fx {
        filter: none;
    }

    .about_photo--bw {
        -webkit-mask-image: none;
        mask-image: none;
    }
}

@media screen and (min-width: 1025px) {
    .about_photo_wrap { width:30%;
    right: 10%; }
    
}
</style>
