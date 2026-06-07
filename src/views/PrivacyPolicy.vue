<script>
    import { languageState } from "../assets/js/language";
    export default {
        name: 'privacyPolicy',
        data() {
            return {
                languageState
            }
        },
        setup() {


            return {}
        }
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

        <h2 class="text-white z-3 position-relative text-center h2">{{ languageState.eng_lan ? 'Privacy Policy' : 'Politica sulla privacy' }}</h2>
       <div class="text-white z-3 position-relative text-center privacy-policy h-25-">

            <div>
                {{ languageState.eng_lan
                    ? "Pursuant to EU Regulation 2016/679 (GDPR), we inform you that the personal data provided through the contact form on the damianocasolari.com website will be processed in compliance with current legislation."
                : "Ai sensi del Regolamento UE 2016/679 (GDPR), si informa che i dati personali forniti tramite il modulo di contatto del sito damianocasolari.com saranno trattati nel rispetto della normativa vigente."
                }}
            </div>

            <div class="section-title">
                {{ languageState.eng_lan ? "Data Controller" : "Titolare del trattamento" }}
            </div>

            <div>Damiano Casolari</div>

            <div>
                {{ languageState.eng_lan
                    ? "Email: info@damianocasolari.com"
                    : "Email: info@damianocasolari.com"
                }}
            </div>

            <div class="section-title">
                {{ languageState.eng_lan ? "Types of data processed" : "Tipologia di dati trattati" }}
            </div>

            <div>
                {{ languageState.eng_lan
                    ? "Name, email address and content of the message sent through the contact form."
                    : "Nome, indirizzo email e contenuto del messaggio inviato tramite il modulo di contatto."
                }}
            </div>

            <div>
                {{ languageState.eng_lan
                    ? "No sensitive data is collected."
                    : "Non vengono raccolti dati sensibili."
                }}
            </div>

            <div class="section-title">
                {{ languageState.eng_lan ? "Purpose of processing" : "Finalità del trattamento" }}
            </div>

            <div>
                {{ languageState.eng_lan
                    ? "The data is used exclusively to respond to requests sent by the user."
                    : "I dati sono utilizzati esclusivamente per rispondere alle richieste inviate dall’utente."
                }}
            </div>

            <div class="section-title">
                {{ languageState.eng_lan ? "Legal basis for processing" : "Base giuridica del trattamento" }}
            </div>

            <div>
                {{ languageState.eng_lan
                    ? "The processing is based on the consent expressed by the user by sending the contact form."
                    : "Il trattamento si basa sul consenso espresso dall’utente mediante l’invio del modulo di contatto."
                }}
            </div>

            <div class="section-title">
                {{ languageState.eng_lan ? "Processing methods" : "Modalità di trattamento" }}
            </div>

            <div>
                {{ languageState.eng_lan
                    ? "The data is processed using computer tools and adopting adequate security measures to ensure its confidentiality."
                : "I dati sono trattati con strumenti informatici e adottando misure di sicurezza adeguate a garantirne la riservatezza."
                }}
            </div>

            <div class="section-title">
                {{ languageState.eng_lan ? "Data retention" : "Conservazione dei dati" }}
            </div>

            <div>
                {{ languageState.eng_lan
                    ? "The data will be retained for the time necessary to respond to the request and in any case not beyond 12 months."
                : "I dati saranno conservati per il tempo necessario a rispondere alla richiesta e comunque non oltre 12 mesi."
                }}
            </div>

            <div class="section-title">
                {{ languageState.eng_lan ? "Data communication" : "Comunicazione dei dati" }}
            </div>

            <div>
                {{ languageState.eng_lan
                    ? "The data will not be communicated to third parties nor disseminated."
                    : "I dati non saranno comunicati a terzi né diffusi."
                }}
            </div>

            <div class="section-title">
                {{ languageState.eng_lan ? "User rights" : "Diritti dell’utente" }}
            </div>

            <div>
                {{ languageState.eng_lan
                    ? "The user can exercise at any time the rights provided for by Articles 15–22 of the GDPR, by contacting the data controller."
                : "L’utente può esercitare in qualsiasi momento i diritti previsti dagli articoli 15–22 del GDPR,contattando il titolare del trattamento."
                }}
            </div>

        </div>

        </div>
    </div>
</template>


<style lang="scss" scoped>
    .back_button {
        background-color: rgba(255, 255, 255, 0.671);
        color: rgba(51, 48, 48, 0.715);
        ;
        transition-duration: 0.7s;
        z-index: 100;
        position: relative;


    }


    .back_button:hover {

        background-color: transparent;
        color: rgb(250, 250, 250);

        border: 0 !important;
        letter-spacing: 3px;
        font-weight: bold;
        font-size: 18x;
        border-top: 1px solid rgb(250, 250, 250) !important;
        border-bottom: 1px solid rgb(250, 250, 250) !important;
        border-radius: 0 !important;
    }

    .privacy-policy {
        display: flex;
        flex-direction: column;
        gap: 14px;
        margin-inline: 10px;
        overflow-y: scroll;

        .section-title {
            margin-top: 20px;
            font-weight: 700;
            text-transform: uppercase;
            font-size: 0.85rem;
            opacity: 0.8;
        }
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