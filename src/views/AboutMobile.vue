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
            const reveal = () => {
                this.loading = false;
                this.$nextTick(() => {
                    requestAnimationFrame(() => { this.entered = true; });
                });
            };
            img.onload  = reveal;
            img.onerror = reveal;
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
            <span class="about_eyebrow">
                {{ languageState.eng_lan ? '— About me' : '— Chi sono' }}
            </span>
            <h1 class="about_name">Damiano<br>Casolari</h1>
            <p class="about_bio" v-if="!languageState.eng_lan">
                Sono Damiano, <strong>software developer</strong> e <strong>creativo digitale</strong>. Creo <strong>esperienze</strong> e <strong>prodotti digitali</strong> dal <strong>design curato</strong>, pensati per <strong>valorizzare brand</strong>, idee e progetti online. Unisco <strong>codice</strong>, estetica e <strong>attenzione al dettaglio</strong> per dare forma a soluzioni <strong>moderne</strong>, pulite e <strong>riconoscibili</strong>.
            </p>
            <p class="about_bio" v-else>
                I'm Damiano, <strong>software developer</strong> and <strong>digital creative</strong>. I build <strong>digital experiences</strong> and <strong>products</strong> with <strong>refined design</strong>, crafted to <strong>elevate brands</strong>, ideas and projects online. I combine <strong>code</strong>, aesthetics and <strong>attention to detail</strong> to shape <strong>modern</strong>, clean and <strong>recognisable</strong> solutions.
            </p>
               <!-- <p class="position-relative">
                <span v-if="languageState.eng_lan">
                  I help <strong>businesses and professionals</strong> build
                  their online presence — custom websites and web applications,
                  <strong>fast, modern and built to convert</strong>, not just
                  to look good.
                </span>
                <span v-else>
                  Aiuto <strong>aziende e professionisti</strong> a costruire la
                  loro presenza online — siti web e applicazioni su misura,
                  <strong>veloci, moderni e pensati per convertire</strong>, non
                  solo per fare bella figura.
                </span>
              </p>

              <p class="position-relative">
                <span v-if="languageState.eng_lan">
                  I manage every project <strong>from brief to launch</strong>:
                  design, code and performance — so you get a
                  <strong>product that actually works</strong> and that you can
                  run independently from day one.
                </span>
                <span v-else>
                  Seguo ogni progetto <strong>dal brief al lancio</strong>:
                  design, codice e performance — così ottieni un
                  <strong>prodotto che funziona davvero</strong> e che puoi
                  gestire in autonomia dal primo giorno.
                </span>
              </p>

              <p class="position-relative">
                <span v-if="languageState.eng_lan">
                  I also build <strong>AI integrations</strong> and
                  <strong>custom automations</strong> — chatbots, smart
                  assistants and automated workflows — to put technology to work
                  for you and <strong>multiply your results</strong> without
                  multiplying your workload.
                </span>
                <span v-else>
                  Realizzo anche <strong>integrazioni AI</strong> e
                  <strong>automazioni su misura</strong> — chatbot, assistenti
                  intelligenti e flussi automatici — per far lavorare la
                  tecnologia al posto tuo e
                  <strong>moltiplicare i risultati</strong> senza moltiplicare
                  il carico di lavoro.
                </span>
              </p> -->
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
    display: grid;
    grid-template-columns: 52fr 48fr;
    box-sizing: border-box;
    position: relative;
    z-index: 1;

    // Desktop: stessi margini del container Bootstrap dell'header
    @media (min-width: 768px)  { max-width: 720px;  margin-inline: auto; padding-inline: 0.75rem; }
    @media (min-width: 992px)  { max-width: 960px; }
    @media (min-width: 1200px) { max-width: 1140px; }
    @media (min-width: 1400px) { max-width: 1320px; }
}

$ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);

// ─── ANIMAZIONE ENTRATA ───────────────────────────────────────────────────────

.about_left,
.about_photo_wrap {
    opacity: 0;
    filter: blur(6px);
    transform: translateY(18px);
    transition: opacity 0.5s ease, transform 0.15s ease;
}

.about_mob.entered .about_left,
.about_mob.entered .about_photo_wrap {
    opacity: 1;
    filter: none;
    transform: translateY(0);
    transition: opacity 0.8s $ease-out-expo, transform 0.8s $ease-out-expo, filter 0.65s ease;
}

.about_mob.entered .about_left       { transition-delay: 0.05s; }
.about_mob.entered .about_photo_wrap { transition-delay: 0.22s; }

// ─── LAYOUT ───────────────────────────────────────────────────────────────────

.about_left {
    position: relative;
    z-index: 1;
    padding: 2.75rem 1.25rem 2rem 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow-y: auto;
}

.about_eyebrow {
    display: block;
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    opacity: 0.36;
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

    strong {
        color: #1c1c1c;
        font-weight: 600;
    }
}

.about_photo_wrap {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius:16px;
    padding: 0 1rem 0 0;
   
}

.about_photo {
    width: 120%;
    aspect-ratio: 2 / 5;
    border-radius: 20px;
    object-fit: cover;
    object-position: center top;
    display: block;

    @media (min-width: 768px) {
        // Desktop: altezza guida, larghezza calcolata dal ratio → foto stretta e alta
        width: auto;
        height: min(72vh, calc(100dvh - 80px));
         aspect-ratio: 1 / 1.8;
          object-position: center;
        max-width: 100%;
    }
}
</style>
