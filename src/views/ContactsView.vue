<script>

    import axios from 'axios';
    import { languageState } from "../assets/js/language.js";
    export default {
        data() {
            return {
                name: '',
                email: '',
                message: '',
                errors: {},
                loading: false,
                success: false,
                languageState,
                privacyAccepted: false,
                privacyError: '',
                nameError: '',
                emailError: '',
                messageError: ''
            }
        },



        methods: {
            magicBalls() {
                const balls = document.querySelectorAll('.ball');

                function moveBalls() {
                    balls.forEach(ball => {
                        const size = ball.offsetWidth;
                        const maxX = window.innerWidth - size;
                        const maxY = window.innerHeight - size;

                        const x = Math.random() * maxX;
                        const y = Math.random() * maxY;

                        ball.style.left = `${x}px`;
                        ball.style.top = `${y}px`;
                    });

                    setTimeout(moveBalls, 3500);
                }


                moveBalls();

            },
            submitForm() {
                this.privacyError = '';
                this.nameError = '';
                this.emailError = '';
                this.messageError = '';

                if (this.name.trim() === '') {
                    this.nameError = this.languageState.eng_lan
                        ? 'Name is required.'
                        : 'Il nome è obbligatorio.';
                }

                if (this.email.trim() === '') {
                    this.emailError = this.languageState.eng_lan
                        ? 'Email is required.'
                        : 'L\'email è obbligatoria.';
                }

                if (this.message.trim() === '') {
                    this.messageError = this.languageState.eng_lan
                        ? 'Message is required.'
                        : 'Il messaggio è obbligatorio.';
                }

                if (!this.privacyAccepted) {
                    this.privacyError = this.languageState.eng_lan
                        ? 'You must accept the Privacy Policy.'
                        : 'Devi accettare la Privacy Policy.';
                }

                if (this.nameError || this.emailError || this.messageError || this.privacyError) {
                    return;
                }

                this.loading = true;

                const data = {
                    name: this.name,
                    email: this.email,
                    message: this.message,
                }
                this.errors = {}
                axios.post('https://back.damianocasolari.com/api/contacts', data).then(response => {
                    if (!response.data.success) {
                        this.errors = response.data.errors
                    } else {
                        this.name = ''
                        this.email = ''
                        this.message = ''
                        this.success = true,
                        this.privacyAccepted = false;

                    }
                    this.loading = false;

                }).catch(err => {
                    console.log(err);
                })
            }
        },
        mounted() {
            this.magicBalls()
        }
    }

</script>
<template>
    <div class="bg-light contacts d-flex flex-wrap align-items-center justify-content-center">
        <!-- <div class="ball ball-1"></div>
        <div class="ball ball-2"></div>
        <div class="ball ball-3"></div>
        <div class="ball ball-4"></div>
        <div class="ball ball-5"></div>
        <div class="ball ball-6"></div>
        <div class="ball ball-7"></div>
        <div class="ball ball-8"></div>
        <div class="ball ball-9"></div>
        <div class="ball ball-10"></div>
        <div class="ball ball-11"></div> -->
        <!-- CARD CONTACTS  -->
        <div class="context d-flex flex-wrap align-items-center justify-content-center z_index50 ghost">
            <div class=" p-2 container">
                <h4 class=" text-center fw-semibold mb-3" v-if="!success && !loading"> {{ languageState.eng_lan ?
                    'Contact me' : 'Contattami'}}</h4>

                <form @submit.prevent="submitForm()" action="POST" class="d-flex flex-column justify-content-center"
                    v-if="!success && !loading">
                    <label for="guest_name" class="form-label fw-semibold fs-6">{{ languageState.eng_lan ? 'Name' :
                        'Nome'}}</label>
                    <input type="text" name="guest_email" class="form-control input_text" v-model="name" >
                    <small v-for="error in errors.name" :key="error" class="text-danger">{{ error }}</small>
                   <small  class="text-danger">{{ nameError }}</small>

                    <label for="guest_email" class="form-label fw-semibold fs-6 mt-2">Email</label>
                    <input type="email" name="guest_name" class="form-control input_text" v-model="email" >
                    <small v-for="error in errors.email" :key="error" class="text-danger">{{ error }}</small>
                    <small class="text-danger">{{ emailError }}</small>


                    <label for="guest_meassage" class="form-label fw-semibold fs-6 mt-2">{{ languageState.eng_lan ?
                        'Message' : 'Messaggio'}}</label>
                    <textarea name="guest_meassage" id="message" cols="30" rows="5"
                        :placeholder="languageState.eng_lan ? 'Speak about your project...' : 'Parlami del tuo progetto...'"
                        class="form-control input_text" v-model="message" ></textarea>
                    <small v-for="error in errors.message" :key="error" class="text-danger">{{ error }}</small>
                    <small  class="text-danger">{{ messageError }}</small>

                    <div class="form-check mt-2">
                        <input class="form-check-input border-2" type="checkbox" id="privacyAccepted"
                            v-model="privacyAccepted" />
                        <label class="form-check-label fw-semibold" for="privacyAccepted">
                            <span v-if="languageState.eng_lan">
                                I accept the
                                <a href="/privacy-policy" target="_blank" rel="noopener">Privacy Policy</a>
                            </span>
                            <span v-else>
                                Accetto la
                                <a href="/privacy-policy" target="_blank" rel="noopener">Privacy Policy</a>
                            </span>
                        </label>
                    </div>
                    <small  class="text-danger">{{ privacyError }}</small>


                    <div class="d-flex justify-content-center mt-2">
                        <input type="submit" :class="!privacyAccepted ? 'disabled_submit_button' : ''" class="px-4 py-2 border border-0 submit_button rounded-4 fs-6"
                            :value="languageState.eng_lan ? 'Submit' : 'Invia'" style="width: 150px;">
                    </div>
                </form>
                <div v-if="!success && loading"
                    class="d-flex flex-column  align-items-center justify-content-center ghost">
                    <div>{{ languageState.eng_lan ? 'Wait a few seconds' : 'Attendere qualche secondo' }}</div>
                    <h4>{{ languageState.eng_lan ? 'We are sending your request' : 'Stiamo inviando la tua richiesta' }}</h4>
                </div>
                <div class="text-center fs-5 fw-semibold ghost" v-if="success && !loading">
                    <h2 class="fw-bold">{{ languageState.eng_lan ? 'The message has been sent correctly' : 'La tua richiesta è stata inviata correttamente' }}</h2>
                    <div>{{ languageState.eng_lan ? 'You will be contacted as soon as possible,' : 'Verrai contattato il prima possibile,' }} <span class="text-success">{{languageState.eng_lan ? 'thank you' : 'grazie'}}</span></div>

                </div>

            </div>
        </div>

        <!-- BACKGROUND ANIMATION -->
        <div class="area">
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




<style lang="scss" scoped></style>