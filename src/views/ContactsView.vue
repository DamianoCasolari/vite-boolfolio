<script>
    import axios from "axios";
    import { languageState } from "../assets/js/language.js";

    export default {
        data() {
            return {
                name: "",
                email: "",
                message: "",
                errors: {},

                loading: false,
                success: false,

                languageState,

                privacyAccepted: false,
                privacyError: "",
                nameError: "",
                emailError: "",
                messageError: "",
            };
        },

        methods: {
            magicBalls() {
                const balls = document.querySelectorAll(".ball");

                const moveBalls = () => {
                    balls.forEach((ball) => {
                        const size = ball.offsetWidth;
                        const maxX = window.innerWidth - size;
                        const maxY = window.innerHeight - size;

                        const x = Math.random() * maxX;
                        const y = Math.random() * maxY;

                        ball.style.left = `${x}px`;
                        ball.style.top = `${y}px`;
                    });

                    setTimeout(moveBalls, 3500);
                };

                moveBalls();
            },

            validateForm() {
                this.privacyError = "";
                this.nameError = "";
                this.emailError = "";
                this.messageError = "";
                this.errors = {};
                this.success = false;

                if (this.name.trim() === "") {
                    this.nameError = this.languageState.eng_lan
                        ? "Name is required."
                        : "Il nome è obbligatorio.";
                }

                if (this.email.trim() === "") {
                    this.emailError = this.languageState.eng_lan
                        ? "Email is required."
                        : "L'email è obbligatoria.";
                }

                if (this.message.trim() === "") {
                    this.messageError = this.languageState.eng_lan
                        ? "Message is required."
                        : "Il messaggio è obbligatorio.";
                }

                if (!this.privacyAccepted) {
                    this.privacyError = this.languageState.eng_lan
                        ? "You must accept the Privacy Policy."
                        : "Devi accettare la Privacy Policy.";
                }

                return !(
                    this.nameError ||
                    this.emailError ||
                    this.messageError ||
                    this.privacyError
                );
            },

            submitForm() {
                if (!this.validateForm()) return;

                this.loading = true;

                const formspreeUrl = "https://formspree.io/f/xzdzyqnr";

                axios
                    .post(
                        formspreeUrl,
                        {
                            name: this.name,
                            email: this.email,
                            message: this.message,
                            _subject: "New portfolio contact",
                        },
                        {
                            headers: { Accept: "application/json" },
                        }
                    )
                    .then(() => {
                        this.name = "";
                        this.email = "";
                        this.message = "";
                        this.success = true;
                        this.privacyAccepted = false;
                    })
                    .catch((err) => {
                    
                        const data = err?.response?.data;

                        if (data?.errors && Array.isArray(data.errors)) {
                            this.errors = data.errors.reduce((acc, e) => {
                                const field = e.field || "_";
                                (acc[field] ||= []).push(e.message);
                                return acc;
                            }, {});
                        } else {
                            // fallback: messaggio generico
                            this.messageError = this.languageState.eng_lan
                                ? "Something went wrong. Try again."
                                : "Qualcosa è andato storto. Riprova.";
                        }
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            },
        },

        mounted() {
            this.magicBalls();
        },
    };
</script>

<template>
    <div class="bg_snow contacts d-flex flex-wrap align-items-center justify-content-center position-relative">

        <!-- LOADER -->
        <div v-if="loading" class="contacts_loader">
            <div class="dc-loader" role="status" :aria-label="languageState.eng_lan ? 'Sending...' : 'Invio in corso...'">
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

        <!-- CARD CONTACTS  -->
        <div class="context z_index50 ghost" v-if="!loading">
            <div class="contact_layout">

                <!-- LEFT — form -->
                <div class="contact_form_col">
                    <h4 class="fw-semibold mb-3" v-if="!success && !loading">
                        {{ languageState.eng_lan ? "Contact me" : "Contattami" }}
                    </h4>

                    <form @submit.prevent="submitForm()" class="d-flex flex-column"
                        v-if="!success && !loading">
                        <label for="guest_name" class="form-label fw-semibold fs-6">
                            {{ languageState.eng_lan ? "Name" : "Nome" }}
                        </label>
                        <input id="guest_name" type="text" name="name" class="form-control input_text" v-model="name" />
                        <small v-for="error in errors.name" :key="error" class="text-danger">{{ error }}</small>
                        <small class="text-danger">{{ nameError }}</small>

                        <label for="guest_email" class="form-label fw-semibold fs-6 mt-2">Email</label>
                        <input id="guest_email" type="email" name="email" class="form-control input_text" v-model="email" />
                        <small v-for="error in errors.email" :key="error" class="text-danger">{{ error }}</small>
                        <small class="text-danger">{{ emailError }}</small>

                        <label for="guest_message" class="form-label fw-semibold fs-6 mt-2">
                            {{ languageState.eng_lan ? "Message" : "Messaggio" }}
                        </label>
                        <textarea id="guest_message" name="message" cols="30" rows="3"
                            :placeholder="languageState.eng_lan ? 'Speak about your project...' : 'Parlami del tuo progetto...'"
                            class="form-control input_text" v-model="message"></textarea>
                        <small v-for="error in errors.message" :key="error" class="text-danger">{{ error }}</small>
                        <small class="text-danger">{{ messageError }}</small>

                        <div class="form-check mt-2">
                            <input type="text" name="_gotcha" class="d-none" tabindex="-1" autocomplete="off" />
                            <input class="form-check-input border-2" type="checkbox" id="privacyAccepted" v-model="privacyAccepted" />
                            <label class="form-check-label fw-semibold" for="privacyAccepted">
                                <span v-if="languageState.eng_lan">I accept the <a href="/privacy-policy" target="_blank" rel="noopener">Privacy Policy</a></span>
                                <span v-else>Accetto la <a href="/privacy-policy" target="_blank" rel="noopener">Privacy Policy</a></span>
                            </label>
                        </div>
                        <small class="text-danger">{{ privacyError }}</small>

                        <div class="d-flex mt-2 mb-3">
                            <button type="submit"
                                :class="!privacyAccepted ? 'disabled_submit_button' : ''"
                                class="submit_button">
                                {{ languageState.eng_lan ? 'Submit' : 'Invia richiesta' }}
                            </button>
                        </div>
                    </form>

                    <div class="ghost" v-if="success && !loading">
                        <h2 class="fw-bold">
                            {{ languageState.eng_lan ? "Message sent!" : "Richiesta inviata!" }}
                        </h2>
                        <p>
                            {{ languageState.eng_lan ? "You will be contacted as soon as possible," : "Verrai contattato il prima possibile," }}
                            <span class="text-success">{{ languageState.eng_lan ? "thank you." : "grazie." }}</span>
                        </p>
                    </div>
                </div>

                <!-- RIGHT — testo introduttivo -->
                <div class="contact_intro" v-if="!success">
                    <p class="contact_intro__heading">
                        <span v-if="languageState.eng_lan">Got a project in mind or want to improve your online presence?</span>
                        <span v-else>Hai un progetto in mente o vuoi migliorare la tua <i>presenza online</i>?</span>
                    </p>
                    <p class="contact_intro__sub">
                        <span v-if="languageState.eng_lan">Drop me a message, I'll get back to you as soon as possible.</span>
                        <span v-else>Scrivimi due righe, ti rispondo il prima possibile.</span>
                    </p>
                </div>

            </div>
        </div>

        <div class="shapes_clip" aria-hidden="true">
            <div class="shape_container position-absolute position3">
                <div class="shape"></div>
            </div>
            <div class="shape_container position-absolute position5">
                <div class="shape"></div>
            </div>
        </div>

        <a
            href="https://wa.me/3477952189?text=Ciao%20Damiano!%20Vorrei%20usufruire%20della%20call%20gratuita%20che%20offri.%0AHo%20visto%20i%20tuoi%20servizi%20e%20mi%20piacerebbe%20parlare%20di%20un%20progetto%20a%20cui%20sto%20pensando."
            target="_blank"
            rel="noopener noreferrer"
            class="wa_fixed_cta"
            :aria-label="languageState.eng_lan ? 'Or message me on WhatsApp' : 'Oppure scrivimi su WhatsApp'"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            <span>{{ languageState.eng_lan ? 'Or message me on WhatsApp' : 'Preferisci WhatsApp?' }}</span>
        </a>
    </div>
</template>

<style lang="scss" scoped>
.contacts_loader {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 50;
}

.shapes_clip {
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
    z-index: 0;
}

.contacts {
    .context {
        width: 100%;
        max-width: 960px;
        padding: 0 1.25rem;
    }

    .contact_layout {
        display: flex;
        align-items: center;
        gap: 4rem;
        width: 100%;
        padding-top: 1.5rem;
    }

    .contact_intro {
        flex: 1;
        min-width: 0;

        &__heading {
            font-size: clamp(1.35rem, 2.5vw, 1.9rem);
            font-weight: 700;
            line-height: 1.25;
            color: #1c1c1c;
            margin-bottom: 1rem;
        }

        &__sub {
            font-size: clamp(0.9rem, 1.5vw, 1.05rem);
            color: rgba(28, 28, 28, 0.55);
            line-height: 1.6;
            margin-bottom: 0;
        }
    }

    .contact_form_col {
        flex: 0 0 420px;
        max-width: 420px;
    }

    h4.text-center {
        font-size: clamp(1.3rem, 3vw, 1.7rem);
        margin-bottom: 1.5rem !important;
    }

    form {
        gap: 0.2rem;

        .form-label {
            margin-bottom: 0.25rem;
            margin-top: 0.9rem;
            font-size: 0.68rem;

            &:first-child { margin-top: 0; }
        }

        .form-control {
            border-radius: 10px;
            padding: 0.55rem 0.85rem;
            font-size: 0.9rem;
        }

        textarea.form-control {
            resize: none;
            min-height: 90px;
        }

        .form-check {
            margin-top: 0.9rem;
        }

        .d-flex.justify-content-center {
            margin-top: 1.25rem;
        }
    }

    @media (max-width: 767.98px) {
        :deep(.shapes_clip .shape_container) {
            height: auto;
            align-items: flex-start;
            justify-content: flex-start;
        }

        :deep(.position3) {
            top: auto !important;
            bottom: 10% !important;
            right: -20px !important;
            left: auto !important;
        }

        :deep(.position5) {
            top: 3% !important;
            bottom: auto !important;
            left: -20px !important;
        }

        .contact_layout {
            flex-direction: column;
            align-items: center;
            gap: 0;
        }

        .contact_intro {
            display: none;
        }

        .contact_form_col {
            width: 100%;
            max-width: 420px;
        }
    }
}

.submit_button {
    position: relative;
    isolation: isolate;
    overflow: hidden;

    padding: 0.42rem 1.4rem;
    border-radius: 999px;
    border: 1px solid rgba(17, 24, 39, 0.16);
    background: #1c1c1c;
    color: #f5f4f2;

    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.01em;
    cursor: pointer;

    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.18), inset 0 1px 0 rgba(255, 255, 255, 0.08);
    transition: transform 0.28s ease, box-shadow 0.28s ease, background 0.28s ease;

    &::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(120deg, transparent 0%, rgba(255, 255, 255, 0.14) 45%, transparent 70%);
        transform: translateX(-120%);
        transition: transform 0.75s ease;
        z-index: -1;
    }

    &:hover:not(.disabled_submit_button) {
        background: #2d2d2d;
        box-shadow: 0 16px 34px rgba(0, 0, 0, 0.26), 0 0 0 4px rgba(0, 0, 0, 0.07), inset 0 1px 0 rgba(255, 255, 255, 0.1);
        &::before { transform: translateX(120%); }
    }

    &:active:not(.disabled_submit_button) {
        transform: translateY(-1px) scale(0.99);
    }

    &.disabled_submit_button {
        opacity: 0.38;
        cursor: not-allowed;
    }
}

.wa_fixed_cta {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    padding: 0.42rem 1.15rem;
    background: #25D366;
    color: #fff;
    text-decoration: none;
    border-radius: 999px;
    border: 1px solid rgba(34, 197, 94, 0.45);
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.01em;
    box-shadow: 0 10px 24px rgba(22, 163, 74, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.28);
    z-index: 200;
    isolation: isolate;
    overflow: hidden;
    transition: transform 0.28s ease, box-shadow 0.28s ease, background 0.28s ease, border-color 0.28s ease;

    &::before {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(120deg, transparent 0%, rgba(255, 255, 255, 0.65) 45%, transparent 70%);
        transform: translateX(-120%);
        transition: transform 0.75s ease;
        z-index: -1;
    }

    &:hover {
        color: #fff;
        background: #20c05e;
        border-color: rgba(34, 197, 94, 0.75);
        box-shadow: 0 16px 36px rgba(22, 163, 74, 0.34), 0 0 0 4px rgba(34, 197, 94, 0.13), inset 0 1px 0 rgba(255, 255, 255, 0.35);
        &::before { transform: translateX(120%); }
    }

    &:active { transform: translateY(-1px) scale(0.99); }

    svg { flex-shrink: 0; }
}

@media (max-width: 767.98px) and (min-aspect-ratio: 1/2) {
    .wa_fixed_cta { display: none; }
}
</style>