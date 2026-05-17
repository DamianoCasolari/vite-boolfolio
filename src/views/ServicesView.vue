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
                                    I design and develop <strong>custom websites</strong> and <strong>digital services</strong>, tailored to your <strong>business goals</strong> and <strong>real needs</strong>.
                                </span>
                                <span v-else>
                                    Progetto e realizzo <strong>siti web</strong> e <strong>servizi digitali su misura</strong>, costruiti attorno agli <strong>obiettivi</strong> e alle <strong>reali esigenze</strong> del tuo business.
                                </span>
                            </p>

                            <p class="position-relative">
                                <span v-if="languageState.eng_lan">
                                    Each project is <strong>unique</strong>: no templates, no <strong>pre-packaged solutions</strong>. From the <strong>initial idea</strong> to the <strong>final online release</strong>, everything is designed specifically for you.
                                </span>
                                <span v-else>
                                    Ogni progetto è <strong>unico</strong>: niente <strong>template preconfezionati</strong>, né <strong>soluzioni standard</strong>. Dall'<strong>idea iniziale</strong> fino alla <strong>pubblicazione online</strong>, tutto è pensato appositamente per te.
                                </span>
                            </p>

                            <p class="position-relative">
                                <span v-if="languageState.eng_lan">
                                    I also build <strong>custom automations</strong> and <strong>AI integrations</strong>: chatbots, smart assistants and automated workflows between apps, to <strong>eliminate repetitive tasks</strong> and let you focus on what truly matters.
                                </span>
                                <span v-else>
                                    Realizzo anche <strong>automazioni su misura</strong> e <strong>integrazioni AI</strong>: chatbot, assistenti intelligenti e flussi automatici tra applicazioni, per <strong>eliminare i processi ripetitivi</strong> e concentrarti su ciò che crea valore.
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
                                            <strong>Analysis</strong> of goals and requirements
                                        </span>
                                        <span v-else>
                                            <strong>Analisi</strong> degli obiettivi e delle esigenze
                                        </span>
                                    </li>

                                    <li class="position-relative">
                                        <strong>2.</strong>
                                        <span v-if="languageState.eng_lan">
                                            <strong>Design</strong> of structure and <strong>user experience</strong>
                                        </span>
                                        <span v-else>
                                            <strong>Progettazione</strong> della struttura e dell'<strong>esperienza utente</strong>
                                        </span>
                                    </li>

                                    <li class="position-relative">
                                        <strong>3.</strong>
                                        <span v-if="languageState.eng_lan">
                                            <strong>Front-end</strong> and <strong>back-end development</strong>
                                        </span>
                                        <span v-else>
                                            <strong>Sviluppo front-end</strong> e <strong>back-end</strong>
                                        </span>
                                    </li>

                                    <li class="position-relative">
                                        <strong>4.</strong>
                                        <span v-if="languageState.eng_lan">
                                            <strong>Testing</strong>, <strong>optimization</strong> and <strong>online release</strong>
                                        </span>
                                        <span v-else>
                                            <strong>Test</strong>, <strong>ottimizzazione</strong> e <strong>messa online</strong>
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
                                    I'm <strong>Damiano Casolari</strong>, a <strong>freelance fullstack web developer</strong> based in <strong>Cervia</strong> (Ravenna, Italy). I specialize in <strong>web development</strong>, <strong>automations</strong> and <strong>AI integrations</strong> for businesses and professionals.
                                </span>
                                <span v-else>
                                    Sono <strong>Damiano Casolari</strong>, <strong>sviluppatore web fullstack freelance</strong> di <strong>Cervia</strong> (Ravenna). Mi occupo di <strong>sviluppo web</strong>, <strong>automazioni</strong> e <strong>integrazioni con l'intelligenza artificiale</strong> per aziende e professionisti.
                                </span>
                            </p>

                            <p class="position-relative">
                                <span v-if="languageState.eng_lan">
                                    I handle the <strong>entire development process</strong>: from <strong>requirements analysis</strong> and <strong>design</strong>, to <strong>front-end and back-end development</strong>, all the way to <strong>deployment</strong> and <strong>optimization</strong>. I also work with <strong>external APIs</strong>, <strong>automated workflows</strong> and <strong>AI tools</strong>.
                                </span>
                                <span v-else>
                                    Seguo l'<strong>intero processo di realizzazione</strong>: dall'<strong>analisi delle esigenze</strong> e dalla <strong>progettazione</strong>, allo <strong>sviluppo front-end e back-end</strong>, fino alla <strong>messa online</strong> e all'<strong>ottimizzazione</strong>. Lavoro anche con <strong>API esterne</strong>, <strong>flussi automatizzati</strong> e strumenti di <strong>intelligenza artificiale</strong>.
                                </span>
                            </p>

                            <p class="position-relative">
                                <span v-if="languageState.eng_lan">
                                    Looking for a <strong>web developer in Cervia</strong> or the <strong>Ravenna</strong> area? I'm available for both <strong>local</strong> and <strong>remote projects</strong> across Italy.
                                </span>
                                <span v-else>
                                    Cerchi uno <strong>sviluppatore web a Cervia</strong>, a <strong>Ravenna</strong> o in <strong>Romagna</strong>? Sono disponibile per progetti <strong>in presenza</strong> e <strong>da remoto</strong> in tutta Italia.
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
