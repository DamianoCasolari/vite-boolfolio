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
            img.src = "/immagini_about_me/foto1.jpeg";
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
            <img
                src="/immagini_about_me/foto1.jpeg"
                alt="Damiano Casolari"
                class="about_photo"
            />
        </div>

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

.about_photo {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center ;
    border-radius: 20px;
    display: block;
}

@media screen and (min-width: 1025px) {
    .about_photo_wrap { width:30%;
    right: 10%; }
    
}
</style>
