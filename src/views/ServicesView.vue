<script>
    import * as bootstrap from "bootstrap";
    import { nextTick } from "vue";
    import { languageState } from "../assets/js/language.js";
    import SiteWelcomeModal from "../components/SiteWelcomeModal.vue";

    export default {
        name: "ServicesView",
        data() {
            return {
                languageState,
            };
        },
        components: {
        
            SiteWelcomeModal

        },
        methods: {
            openWelcomeModal() {
                nextTick(() => {
                    const el = document.getElementById("welcomeModal");
                    if (!el) return;

                    const instance = bootstrap.Modal.getInstance(el) || new bootstrap.Modal(el);
                    instance.show();
                });
            },
        },
    };
</script>

<template>
    <div class="about_me position-relative">
        <div class="info_container">
            <div class="shape_container position-absolute position4">
                <div class="shape "></div>
            </div>
            <div class="shape_container position-absolute position5">
                <div class="shape "></div>
            </div>
            <div class="container ">
                <div class="row justify-content-center align-items-center">

                    <!-- SERVIZI -->
                    <div class="col-12">
                        <div class="about_content mx-3 ms-lg-4 mt-4">
                            <h1 class="position-relative fw-semibold">
                                {{ languageState.eng_lan ? `Services` : `Servizi` }}
                            </h1>

                            <p class="position-relative">
                                <span v-if="languageState.eng_lan">
                                    I design and develop <b>custom-made websites</b>, tailored to your <b>business
                                        goals</b> and <b>real needs</b>.
                                </span>
                                <span v-else>
                                    Progetto e realizzo <b>siti web su misura</b>, costruiti attorno agli
                                    <b>obiettivi</b> e alle <b>reali esigenze</b> del tuo business.
                                </span>
                            </p>

                            <p class="position-relative">
                                <span v-if="languageState.eng_lan">
                                    Each project is <b>unique</b>: no templates, no <b>pre-packaged solutions</b>. From
                                    the <b>initial idea</b> to the <b>final online release</b>, everything is designed
                                    specifically for you.
                                </span>
                                <span v-else>
                                    Ogni progetto e' <b>unico</b>: niente <b>template preconfezionati</b>, né
                                    <b>soluzioni standard</b>. Dall'<b>idea iniziale</b> fino alla <b>pubblicazione
                                        online</b>, tutto e' pensato appositamente per te.
                                </span>
                            </p>

                            <p class="position-relative">
                                <span v-if="languageState.eng_lan">
                                    I focus on <b>performance</b>, <b>clarity</b>, <b>responsive design</b> and <b>clean
                                        code</b>, to deliver <b>fast</b>, <b>effective</b> and <b>scalable websites</b>.
                                </span>
                                <span v-else>
                                    Lavoro su <b>performance</b>, <b>chiarezza</b>, <b>design responsive</b> e <b>codice
                                        pulito</b>, per offrire <b>siti veloci</b>, <b>efficaci</b> e <b>pronti a
                                        crescere</b> nel tempo.
                                </span>
                            </p>

                            <!-- COME LAVORO -->
                            <div class="mt-4">
                                <h4 class="position-relative fw-semibold">
                                    {{ languageState.eng_lan ? `How I work` : `Come lavoro` }}
                                </h4>

                                <ul class="work_steps mt-3">
                                    <li class="position-relative">
                                        <strong>1.</strong>
                                        <span v-if="languageState.eng_lan">
                                            <b>Analysis</b> of goals and requirements
                                        </span>
                                        <span v-else>
                                            <b>Analisi</b> degli obiettivi e delle esigenze
                                        </span>
                                    </li>

                                    <li class="position-relative">
                                        <strong>2.</strong>
                                        <span v-if="languageState.eng_lan">
                                            <b>Design</b> of structure and <b>user experience</b>
                                        </span>
                                        <span v-else>
                                            <b>Progettazione</b> della struttura e dell'<b>esperienza utente</b>
                                        </span>
                                    </li>

                                    <li class="position-relative">
                                        <strong>3.</strong>
                                        <span v-if="languageState.eng_lan">
                                            <b>Front-end</b> and <b>back-end development</b>
                                        </span>
                                        <span v-else>
                                            <b>Sviluppo front-end</b> e <b>back-end</b>
                                        </span>
                                    </li>

                                    <li class="position-relative">
                                        <strong>4.</strong>
                                        <span v-if="languageState.eng_lan">
                                            <b>Testing</b>, <b>optimization</b> and <b>online release</b>
                                        </span>
                                        <span v-else>
                                            <b>Test</b>, <b>ottimizzazione</b> e <b>messa online</b>
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>


                    <!-- QUALCOSA SU DI ME (DOPO I SERVIZI) -->
                    <div class="col-12">
                        <div class="about_content mx-3 mt-4">
                            <h2 class="position-relative fw-semibold">
                                {{ languageState.eng_lan ? `A bit about me` : `Qualcosa su di me` }}
                            </h2>

                            <p class="position-relative">
                                <span v-if="languageState.eng_lan">
                                    I am a <b>web developer</b> with <b>several years of experience</b> and a strong
                                    passion for <b>modern web technologies</b>.
                                </span>
                                <span v-else>
                                    Sono uno <b>sviluppatore web</b> con <b>anni di esperienza</b> e una forte passione
                                    per le <b>tecnologie web moderne</b>.
                                </span>
                            </p>

                            <p class="position-relative">
                                <span v-if="languageState.eng_lan">
                                    I handle the <b>entire website creation process</b>: from <b>idea analysis</b> and
                                    client requirements, to <b>design</b>, <b>front-end</b> and <b>back-end
                                        development</b>, all the way to <b>deployment</b> and <b>final optimization</b>.
                                </span>
                                <span v-else>
                                    Mi occupo di <b>tutte le fasi di realizzazione di un sito web</b>: dall'<b>analisi
                                        delle esigenze del cliente</b>, alla <b>progettazione</b>, allo
                                    <b>sviluppo front-end</b> e <b>back-end</b>, fino alla <b>messa online</b> e
                                    all'<b>ottimizzazione finale</b>.
                                </span>
                            </p>

                            <p class="position-relative">
                                <span v-if="languageState.eng_lan">
                                    I build <b>complete</b>, <b>well-designed</b> and <b>high-performing websites</b>,
                                    focused on <b>clarity</b>, <b>speed</b> and <b>real business results</b>.
                                </span>
                                <span v-else>
                                    Creo <b>siti completi</b>, <b>funzionali</b> e <b>curati nel design</b>, pensati per
                                    essere <b>chiari</b>, <b>veloci</b> e <b>orientati ai risultati</b>.
                                </span>
                            </p>
                        </div>
                    </div>
                    <div class="col-12 position-relative px-4 pb-5 mt-lg-0">
                        <img src="/irish.jpg" alt="Profile Picture" class="profile_image w-100" />

                        <div class="write_ireland">
                            Ireland
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <SiteWelcomeModal />
    </div>
</template>

<style lang="scss" scoped>
    .work_steps {
        list-style: none;
        padding: 0;

        li {
            margin-bottom: 0.6rem;
        }

        strong {
            margin-right: 0.4rem;
        }
    }

    .write_ireland {
        position: absolute;
        bottom: 17%;
        right: 9%;
        margin: 1rem;
        color: #f7f7f7;
        font-weight: 600;
        z-index: 1;
    }
</style>
