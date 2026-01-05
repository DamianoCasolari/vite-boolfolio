<script>
    import { languageState } from "../assets/js/language.js";
export default {
    data() {
        return {
            languageState
        }
    }
}
</script>
<template>
    <div class=" about_me">
        <div class="info_container ">
            <div class="container">
                <div class="row justify-content-center align-items-center ">
                    <div class="col-md-6 fade_in position-relative mt-lg-0">
                        <img src="../../public/irish.jpg" alt="Profile Picture" class="profile_image">
                    </div>
                    <div class="col-md-6">
                        <div class="about_content p-3 ms-lg-4 mt-4">
                            <h1 class=" position-relative fw-semibold">{{ languageState.eng_lan ? 'About me' : 'Chi sono' }}</h1>
                            <p class=" position-relative">{{ languageState.eng_lan ? 'I am a web developer with several years of experience in the industry and a strong passion for modern web technologies.' : 'Sono uno sviluppatore web con anni di esperienza nel settore e una forte passione per le tecnologie web moderne.' }}</p>
                            <p class="3 position-relative">
                              {{ languageState.eng_lan ? 'I handle the entire website creation process: from idea analysis and client requirements, to design, front-end and back-end development, all the way to deployment and final optimization.' : 'Mi occupo dell’intero processo di realizzazione dei siti web: dall’analisi dell’idea e delle esigenze del cliente, alla progettazione, allo sviluppo front-end e back-end, fino alla messa online e all’ottimizzazione finale.' }}
                                </p>
                            <p class="position-relative">{{ languageState.eng_lan ? 'I build complete, well-designed and high-performing websites, focused on clarity, speed and real business results.' : 'Creo siti completi, funzionali e curati nel design, pensati per essere chiari, veloci e orientati ai risultati' }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped></style>