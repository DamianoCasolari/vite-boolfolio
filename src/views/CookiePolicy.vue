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
   <div class="privacy_policy_container vh100_100px d-flex justify-content-center align-items-center flex-column ">
        <div class="h-100 w-100 position-absolute bg-dark" style="opacity: 0.5;"></div>

        <h2 class="text-white z-3 postion-relative text-center h2">
            {{ languageState.eng_lan ? `Cookie Policy` : `Cookie Policy` }}
        </h2>

        <div class="text-white z-3 position-relative text-center privacy-policy h-25- ">

            <div>
                {{
                    languageState.eng_lan
                        ? `This Cookie Policy explains how the website damianocasolari.com uses cookies and similar
                technologies.`
                        : `La presente Cookie Policy spiega come il sito damianocasolari.com utilizza cookie e tecnologie
                simili.`
                }}
            </div>

            <div class="section-title">
                {{ languageState.eng_lan ? `What are cookies` : `Cosa sono i cookie` }}
            </div>

            <div>
                {{
                    languageState.eng_lan
                        ? `Cookies are small text files stored on the user's device during browsing.
                They are used to ensure the proper functioning of the website,
                improve the browsing experience and collect anonymous statistical information.`
                        : `I cookie sono piccoli file di testo che vengono salvati sul dispositivo dell’utente durante la
                navigazione.
                Servono a garantire il corretto funzionamento del sito,
                migliorare l’esperienza di navigazione e raccogliere informazioni statistiche anonime.`
                }}
            </div>

            <div class="section-title">
                {{ languageState.eng_lan ? `Types of cookies used` : `Tipologie di cookie utilizzate` }}
            </div>

            <div>
                {{
                    languageState.eng_lan
                        ? `The website uses the following categories of cookies:`
                        : `Il sito utilizza le seguenti categorie di cookie:`
                }}
            </div>

            <div>
                <strong>
                    {{ languageState.eng_lan ? `Technical cookies` : `Cookie tecnici` }}
                </strong>
            </div>

            <div>
                {{
                    languageState.eng_lan
                        ? `Technical cookies are necessary for the correct functioning of the website
                and allow the user to navigate and use its features.`
                        : `I cookie tecnici sono necessari per il corretto funzionamento del sito
                e permettono all’utente di navigare e utilizzare le sue funzionalità.`
                }}
            </div>

            <div>
                <strong>
                    {{ languageState.eng_lan ? `Analytics cookies` : `Cookie analytics` }}
                </strong>
            </div>

            <div>
                {{
                    languageState.eng_lan
                        ? `The website may use analytics tools such as Google Analytics to collect
                aggregated and anonymous information about website usage
                (for example number of visitors and most visited pages).`
                        : `Il sito può utilizzare strumenti di analisi come Google Analytics
                per raccogliere informazioni aggregate e anonime sull’utilizzo del sito
                (ad esempio numero di visitatori e pagine più visitate).`
                }}
            </div>

            <div>
                {{
                    languageState.eng_lan
                        ? `Analytics cookies are activated only after the user gives consent through the cookie banner.`
                        : `I cookie analytics vengono attivati solo dopo il consenso espresso dall’utente tramite il banner
                cookie.`
                }}
            </div>

            <div class="section-title">
                {{ languageState.eng_lan ? `Cookie management` : `Gestione dei cookie` }}
            </div>

            <div>
                {{
                    languageState.eng_lan
                        ? `The user can accept or refuse analytics cookies through the cookie banner displayed on the website.
                The choice is stored locally on the user's device.`
                        : `L’utente può accettare o rifiutare i cookie analytics tramite il banner cookie mostrato sul sito.
                La scelta viene salvata localmente sul dispositivo dell’utente.`
                }}
            </div>

            <div>
                {{
                    languageState.eng_lan
                        ? `It is also possible to delete or block cookies through the browser settings.`
                        : `È inoltre possibile eliminare o bloccare i cookie tramite le impostazioni del proprio browser.`
                }}
            </div>

            <div class="section-title">
                {{ languageState.eng_lan ? `Third-party services` : `Servizi di terze parti` }}
            </div>

            <div>
                {{
                    languageState.eng_lan
                        ? `This website may use third-party services such as Google Analytics,
                which may process navigation data according to their own privacy policies.`
                        : `Questo sito può utilizzare servizi di terze parti come Google Analytics,
                che possono trattare i dati di navigazione secondo le proprie policy sulla privacy.`
                }}
            </div>

            <div class="section-title">
                {{ languageState.eng_lan ? `Changes to this policy` : `Modifiche alla cookie policy` }}
            </div>

            <div>
                {{
                    languageState.eng_lan
                        ? `This Cookie Policy may be updated periodically to reflect regulatory changes or updates to the
                website.`
                        : `La presente Cookie Policy può essere aggiornata periodicamente
                per riflettere eventuali modifiche normative o aggiornamenti del sito.`
                }}
            </div>

        </div>

        <div>
            <ul class="circles">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div>

        <div>
            <ul class="circles2">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
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
</style>