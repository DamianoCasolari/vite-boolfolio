<script>
    import { languageState } from "../assets/js/language";
    export default {
        name: 'AccessibilityStatement',
        data() {
            return {
                languageState
            }
        },
    }
</script>

<template>
    <div class="policy-page position-relative overflow-hidden" style="min-height: 100vh; background: #1a1a1a;">

        <div class="shape_container position-absolute policy-blob-pos1">
            <div class="policy-blob policy-blob--1"></div>
        </div>
        <div class="shape_container position-absolute policy-blob-pos2">
            <div class="policy-blob policy-blob--2"></div>
        </div>

        <div class="privacy_policy_container vh100_100px d-flex justify-content-center align-items-center flex-column">

            <h1 class="text-white z-3 position-relative text-center h2">
                {{ languageState.eng_lan ? 'Accessibility statement' : 'Dichiarazione di accessibilità' }}
            </h1>

            <div class="text-white z-3 position-relative text-center privacy-policy" tabindex="0" role="region"
                :aria-label="languageState.eng_lan ? 'Accessibility statement text' : 'Testo della dichiarazione di accessibilità'">

                <div>
                    {{ languageState.eng_lan
                        ? 'This website was designed following the international Web Content Accessibility Guidelines (WCAG 2.1) published by the W3C, with the aim of making it usable by as many people as possible, including those who browse with a keyboard, a screen reader or screen magnification.'
                        : 'Questo sito è stato progettato seguendo le linee guida internazionali di accessibilità WCAG 2.1 (Web Content Accessibility Guidelines) pubblicate dal W3C, con l’obiettivo di renderlo utilizzabile dal maggior numero possibile di persone, comprese quelle che navigano con la tastiera, con un lettore di schermo o con l’ingrandimento dello schermo.' }}
                </div>

                <div class="section-title">
                    {{ languageState.eng_lan ? 'What has been done' : 'Cosa è stato fatto' }}
                </div>
                <ul class="policy-list">
                    <li>{{ languageState.eng_lan ? 'The whole site can be used with the keyboard; a "Skip to content" link lets you jump past the header.' : 'Il sito è utilizzabile interamente da tastiera; il link “Vai al contenuto” permette di saltare l’intestazione.' }}</li>
                    <li>{{ languageState.eng_lan ? 'Pages have a clear structure (headings, main areas, named buttons and links) readable by screen readers.' : 'Le pagine hanno una struttura chiara (titoli, aree principali, pulsanti e link con un nome) leggibile dai lettori di schermo.' }}</li>
                    <li>{{ languageState.eng_lan ? 'Meaningful images have a text alternative; purely decorative images are excluded from reading.' : 'Le immagini significative hanno un testo alternativo; quelle puramente decorative sono escluse dalla lettura.' }}</li>
                    <li>{{ languageState.eng_lan ? 'Text contrast has been checked against the WCAG thresholds (4.5:1 for normal text, 3:1 for large text).' : 'Il contrasto dei testi è stato verificato rispetto alle soglie WCAG (4,5:1 per il testo normale, 3:1 per quello grande).' }}</li>
                    <li>{{ languageState.eng_lan ? 'The page language is updated when switching between Italian and English, so screen readers use the right pronunciation.' : 'La lingua della pagina viene aggiornata passando dall’italiano all’inglese, così i lettori di schermo usano la pronuncia corretta.' }}</li>
                </ul>

                <div class="section-title">
                    {{ languageState.eng_lan ? 'Known limitations' : 'Limiti noti' }}
                </div>
                <ul class="policy-list">
                    <li>{{ languageState.eng_lan ? 'Some animations (the rotating words in the home page title and the automatic rotation of the 3D showcase on mobile) cannot yet be paused.' : 'Alcune animazioni (le parole che si alternano nel titolo della home e la rotazione automatica della vetrina 3D su mobile) non possono ancora essere messe in pausa.' }}</li>
                    <li>{{ languageState.eng_lan ? 'The 3D project showcase cannot be used with a keyboard or screen reader: the same projects are available as a list of links.' : 'La vetrina 3D dei progetti non è utilizzabile da tastiera o lettore di schermo: gli stessi progetti sono disponibili come elenco di link.' }}</li>
                    <li>{{ languageState.eng_lan ? 'Some purely decorative elements (such as the large numbers in the service cards) intentionally have low contrast.' : 'Alcuni elementi puramente decorativi (come i numeri grandi nelle schede dei servizi) hanno volutamente un contrasto ridotto.' }}</li>
                    <li>{{ languageState.eng_lan ? 'External websites and services linked from this site (such as WhatsApp or LinkedIn) are not under our control.' : 'I siti e i servizi esterni collegati (come WhatsApp o LinkedIn) non dipendono da questo sito.' }}</li>
                </ul>

                <div class="section-title">
                    {{ languageState.eng_lan ? 'How it was checked' : 'Come è stato verificato' }}
                </div>
                <div>
                    {{ languageState.eng_lan
                        ? 'Automated checks with standard tools, keyboard navigation tests and contrast measurements. Last review: September 2026.'
                        : 'Verifiche automatiche con strumenti standard, prove di navigazione da tastiera e misure del contrasto. Ultima verifica: settembre 2026.' }}
                </div>

                <div class="section-title">
                    {{ languageState.eng_lan ? 'Report a problem' : 'Segnala un problema' }}
                </div>
                <div>
                    {{ languageState.eng_lan
                        ? 'If you have difficulty using the site or find content that is not accessible, write to'
                        : 'Se incontri difficoltà nell’uso del sito o trovi un contenuto non accessibile, scrivi a' }}
                    <a href="mailto:info@damianocasolari.com" class="policy-link">info@damianocasolari.com</a>.
                    {{ languageState.eng_lan
                        ? 'I will reply as soon as possible and, where feasible, provide the content in an alternative format.'
                        : 'Risponderò il prima possibile e, dove fattibile, fornirò il contenuto in un formato alternativo.' }}
                </div>

                <div class="section-title">
                    {{ languageState.eng_lan ? 'Updates' : 'Aggiornamenti' }}
                </div>
                <div>
                    {{ languageState.eng_lan
                        ? 'This statement is updated whenever the website changes significantly.'
                        : 'Questa dichiarazione viene aggiornata quando il sito cambia in modo significativo.' }}
                </div>

            </div>

        </div>
    </div>
</template>


<style lang="scss" scoped>
    .privacy-policy {
        display: flex;
        flex-direction: column;
        gap: 14px;
        margin-inline: 0px;
        overflow-y: scroll;

        .section-title {
            margin-top: 20px;
            font-weight: 700;
            text-transform: uppercase;
            font-size: 0.85rem;
            opacity: 0.8;
        }
    }

    .policy-list {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .policy-link {
        color: #fff;
        text-decoration: underline;
    }

    .policy-blob-pos1 {
        left: -60px;
        bottom: -200px;
    }

    .policy-blob-pos2 {
        right: -80px;
        top: -150px;
    }

    .policy-blob {
        animation: morph 8s ease-in-out infinite;
        border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
        transition: all 1s ease-in-out;
    }

    .policy-blob--1 {
        background: linear-gradient(#3a3a3a 25%, #505050 55%);
        height: 300px;
        width: 300px;
        opacity: 0.7;
    }

    .policy-blob--2 {
        background: linear-gradient(#2e2e2e 25%, #424242 55%);
        height: 500px;
        width: 500px;
        opacity: 0.5;
    }

    @keyframes morph {
        0%   { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
        50%  { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
        100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
    }
</style>
