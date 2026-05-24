<script>
import * as bootstrap from "bootstrap";
import { languageState } from "../assets/js/language.js";

export default {
  name: "SiteWelcomeModal",
  data() {
    return {
      languageState,
      step: 1, // 1 | 2 | 3
    };
  },
  computed: {
    waLink() {
      const msg = this.languageState.eng_lan
        ? "Hi! I'm interested in the 490€ website offer. Can you tell me what's included?"
        : "Ciao! Mi interessa l’offerta sito a 490€. Mi dici cosa include?";
      return "https://wa.me/3477952189?text=" + encodeURIComponent(msg);
    },
    t() {
      if (this.languageState.eng_lan) {
        return {
          title: "Professional website for your business",
          subtitle:
            "A clear, fast and reliable online presence, designed to help customers find and contact you easily.",
          product: "Complete landing page",
          priceNote: "+ €15/month management",
          s1: "What’s included",
          s2: "Monthly management (€15/month)",
          s3: "Custom solution",
          contacts: "Email",
          whatsapp: "Write on WhatsApp",
          inc: [
            {
              parts: [
                { t: "Modern design", b: true },
                { t: ", mobile and tablet friendly" },
              ],
            },
            {
              parts: [
                { t: "Clear", b: true },
                { t: " and " },
                { t: "easy navigation", b: true },
              ],
            },
            { parts: [{ t: "Basic", b: true }, { t: " Google optimization" }] },
            {
              parts: [
                { t: "Quick contact actions", b: true },
                { t: " (WhatsApp, email, form)" },
              ],
            },
            {
              parts: [
                { t: "Full setup", b: true },
                { t: " and " },
                { t: "website deployment", b: true },
              ],
            },
          ],
          mng: [
            {
              parts: [
                { t: "Domain included", b: true },
                { t: " (e.g. yoursite.com)" },
              ],
            },
            { parts: [{ t: "Reliable hosting", b: true }] },
            { parts: [{ t: "Secure connection", b: true }, { t: " (HTTPS)" }] },

            {
              parts: [
                { t: "1 content update per year included", b: true },
                { t: " (text or images)" },
              ],
            },

            {
              parts: [
                { t: "*Additional updates", b: true },
                { t: " available on request, " },
                { t: "with an agreed cost", b: true },
              ],
            },

            {
              parts: [
                { t: "No long-term commitment", b: true },
                { t: ". Cancel anytime" },
              ],
            },
          ],

          pagesHint:
            "Additional pages can be added based on your needs, with a clear quote agreed together.",
          noHidden:
            "No hidden costs. Everything is clearly agreed before we start.",
          customNeedTitle: "Need something different?",
          customNeedText:
            "No problem. If you're looking for a different kind of website, more pages, automations, AI integrations or a custom digital solution, get in touch and we'll find the right fit together.",
          customNeedHighlight:
            "Tell me what you have in mind and I'll help you find the most practical path forward.",
          step: "Step",
          back: "Back",
          next: "Next",
        };
      }

      return {
        title: "Sito web professionale per la tua attività",
        subtitle:
          "Una presenza online chiara, veloce e affidabile, pensata per farti trovare e contattare facilmente.",
        product: "Pagina vetrina completa",
        priceNote: "+ 15€/mese gestione",
        s1: "Cosa include",
        s2: "Gestione mensile (15€/mese)",
        s3: "Soluzione su misura",
        contacts: "Email",
        whatsapp: "Scrivimi su WhatsApp",
        inc: [
          {
            parts: [
              { t: "Design moderno", b: true },
              { t: ", ottimizzato per smartphone e tablet" },
            ],
          },
          {
            parts: [
              { t: "Struttura chiara", b: true },
              { t: " e " },
              { t: "facile da navigare", b: true },
            ],
          },
          {
            parts: [
              { t: "Ottimizzazione di base", b: true },
              { t: " per Google" },
            ],
          },
          {
            parts: [
              { t: "Contatti rapidi", b: true },
              { t: " (WhatsApp, email o modulo personalizzato)" },
            ],
          },
          {
            parts: [
              { t: "Pubblicazione", b: true },
              { t: " e " },
              { t: "configurazione completa", b: true },
              { t: " del sito" },
            ],
          },
        ],
        mng: [
          {
            parts: [
              { t: "Dominio incluso", b: true },
              { t: " (es. nomesito.it)" },
            ],
          },
          { parts: [{ t: "Hosting affidabile", b: true }] },
          { parts: [{ t: "Connessione sicura", b: true }, { t: " (HTTPS)" }] },

          {
            parts: [
              { t: "1 modifica dei contenuti all’anno", b: true },
              { t: " inclusa (testi o immagini)" },
            ],
          },

          {
            parts: [
              { t: "*Ulteriori modifiche", b: true },
              { t: " disponibili su richiesta, " },
              { t: "con costo concordato", b: true },
            ],
          },

          {
            parts: [
              { t: "Nessun vincolo", b: true },
              { t: ", disdici quando vuoi" },
            ],
          },
        ],

        pagesHint:
          "È possibile aggiungere altre pagine in base alle tue esigenze, con un preventivo chiaro e condiviso.",
        noHidden:
          "Nessun costo nascosto. Tutto viene concordato con chiarezza prima di partire.",
        customNeedTitle: "Hai bisogno di qualcosa di diverso?",
        customNeedText:
          "Nessun problema. Se cerchi un sito diverso, più pagine, automazioni, integrazioni con l'intelligenza artificiale o una soluzione digitale su misura, contattami e troviamo insieme la soluzione più adatta alle tue necessità.",
        customNeedHighlight:
          "Raccontami cosa hai in mente e ti aiuto a capire la strada più pratica.",
        step: "Step",
        back: "Indietro",
        next: "Avanti",
      };
    },
  },
  methods: {
    toggleLang() {
      this.languageState.toggle();
    },
    goContacts() {
      const el = document.getElementById("welcomeModal");
      const navigate = () => this.$router.push("/contacts");

      if (!el) return navigate();

      const instance = bootstrap.Modal.getInstance(el);
      if (!instance) return navigate();

      el.addEventListener("hidden.bs.modal", navigate, { once: true });
      if (document.activeElement instanceof HTMLElement)
        document.activeElement.blur();
      instance.hide();
    },
    setStep(n) {
      this.step = n;
    },
    next() {
      this.step = Math.min(3, this.step + 1);
    },
    prev() {
      this.step = Math.max(1, this.step - 1);
    },
  },
};
</script>

<template>
  <div
    class="modal fade"
    id="welcomeModal"
    tabindex="-1"
    aria-labelledby="welcomeModalLabel"
  >
    <div
      class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg"
    >
      <div class="modal-content welcome-modal">
        <!-- Header -->
        <div class="modal-header border-0 pb-0">
          <div class="welcome-header w-100">
            <div
              class="welcome-badge d-flex align-items-center justify-content-center"
            >
              %
            </div>

            <div class="welcome-title">
              <div class="d-flex align-items-center gap-2 flex-wrap">
                <h5 class="modal-title m-0" id="welcomeModalLabel">
                  {{ t.title }}
                </h5>
              </div>
              <!-- <div class="text-muted small mt-1">{{ t.subtitle }}</div> -->
            </div>

            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
        </div>

        <div class="modal-body pt-3">
          <!-- Price -->
          <div class="price-strip p-3 rounded-4 mb-3">
            <div
              class="d-flex align-items-center justify-content-between flex-wrap gap-2"
            >
              <div>
                <div class="fw-semibold">{{ t.product }}</div>
                <div class="text-muted small">
                  Design · sviluppo · messa online
                </div>
              </div>
              <div class="text-end">
                <div class="price">
                  <span class="price-old">€990</span>
                  <span class="currency">€</span>490
                </div>
                <div class="text-muted small">{{ t.priceNote }}</div>
              </div>
            </div>
          </div>
          <div
            class="d-flex d-lg-none justify-content-between align-items-center mt-3"
          >
            <button
              type="button"
              class="btn btn-outline-dark btn-sm"
              @click="prev"
              :disabled="step === 1"
            >
              ‹ {{ t.back }}
            </button>
            <!-- <span class="badge rounded-pill text-bg-light border">
                  {{ t.step }} {{ step }}/3
                </span> -->

            <button
              type="button"
              class="btn btn-outline-dark btn-sm"
              @click="next"
              :disabled="step === 3"
            >
              {{ t.next }} ›
            </button>
          </div>
          <!-- Steps -->
          <div class="step-tabs d-none d-lg-flex mb-3">
            <button
              type="button"
              class="step-tab"
              :class="{ active: step === 1 }"
              @click="setStep(1)"
            >
              1 · {{ t.s1 }}
            </button>
            <button
              type="button"
              class="step-tab"
              :class="{ active: step === 2 }"
              @click="setStep(2)"
            >
              2 · {{ t.s2 }}
            </button>
            <button
              type="button"
              class="step-tab"
              :class="{ active: step === 3 }"
              @click="setStep(3)"
            >
              3 · {{ t.s3 }}
            </button>
          </div>

          <div class="info-card p-3 rounded-4">
            <template v-if="step === 1">
              <div class="fw-semibold mb-2">{{ t.s1 }}</div>
              <ul class="mb-0 small">
                <li v-for="(row, i) in t.inc" :key="i">
                  <template v-for="(p, j) in row.parts" :key="j">
                    <b v-if="p.b">{{ p.t }}</b>
                    <span v-else>{{ p.t }}</span>
                  </template>
                </li>
              </ul>
            </template>

            <template v-else-if="step === 2">
              <div class="fw-semibold mb-2">{{ t.s2 }}</div>
              <ul class="mb-0 small">
                <li v-for="(row, i) in t.mng" :key="i">
                  <template v-for="(p, j) in row.parts" :key="j">
                    <b v-if="p.b">{{ p.t }}</b>
                    <span v-else>{{ p.t }}</span>
                  </template>
                </li>
              </ul>
            </template>

            <template v-else>
              <div class="fw-semibold mb-2">{{ t.customNeedTitle }}</div>
              <p class="small mb-3" style="line-height: 1.6">
                {{ t.customNeedText }}
              </p>
              <div class="custom-need-highlight p-3 rounded-4">
                <span class="small fw-semibold">{{
                  t.customNeedHighlight
                }}</span>
              </div>
            </template>
          </div>

          <!-- <div class="text-muted small mt-3">{{ t.noHidden }}</div>  -->
        </div>

        <div
          class="modal-footer border-0 pt-0 d-flex justify-content-end flex-wrap gap-2"
        >
          <button
            type="button"
            class="btn btn-outline-dark"
            @click="goContacts"
          >
            {{ t.contacts }}
          </button>
          <div class="d-flex justify-content-center align-item-center">
            <a
              class="btn btn-success d-inline-flex align-items-center gap-2"
              href="https://wa.me/3477952189?text=Buongiorno%2C%0Asono%20%5BNome%5D%20e%20vi%20contatto%20per%20avere%20informazioni%20sulla%20realizzazione%20di%20un%20sito%20web%20per%20la%20mia%20attivit%C3%A0.%0AResto%20in%20attesa%20di%20un%20vostro%20riscontro%2C%20grazie."
              target="_blank"
              rel="noopener"
            >
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              {{ t.whatsapp }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.welcome-modal {
  border-radius: 22px;
  overflow: hidden;
}

.welcome-header {
  display: grid;
  grid-template-columns: 44px 1fr 40px;
  align-items: start;
  column-gap: 12px;
}

.welcome-title {
  min-width: 0;
}

.welcome-badge {
  width: 44px;
  height: 44px;
  border-radius: 14px;
  background: rgba(0, 0, 0, 0.06);
  font-weight: 800;
}

.price-strip {
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.06), rgba(0, 0, 0, 0.02));
  border: 1px solid rgba(0, 0, 0, 0.06);
}

.price {
  font-size: 34px;
  font-weight: 800;
  line-height: 1;
}

.currency {
  font-size: 18px;
  vertical-align: super;
  margin-right: 2px;
}

.price-old {
  font-size: 16px;
  font-weight: 500;
  color: #aaa;
  text-decoration: line-through;
  margin-right: 6px;
  vertical-align: middle;
}

.info-card {
  border: 1px solid rgba(0, 0, 0, 0.08);
  background: #fff;
}

.mini-card {
  border: 1px solid rgba(0, 0, 0, 0.08);
  background: rgba(0, 0, 0, 0.02);
}

.custom-need-highlight {
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.02));
  border: 1px solid rgba(0, 0, 0, 0.08);
}

.step-tabs {
  gap: 8px;
  flex-wrap: wrap;
}

.step-tab {
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: #fff;
  border-radius: 999px;
  padding: 8px 12px;
  font-size: 13px;
}

.step-tab.active {
  border-color: rgba(0, 0, 0, 0.25);
  background: rgba(0, 0, 0, 0.04);
  font-weight: 700;
}

.badge.text-bg-dark {
  cursor: default;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    letter-spacing 0.2s ease;
}

.modal-footer .btn {
  position: relative;
  isolation: isolate;

  padding: 0.42rem 1.15rem;

  border-radius: 999px;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.01em;

  overflow: hidden;

  transition:
    transform 0.28s ease,
    box-shadow 0.28s ease,
    background 0.28s ease,
    border-color 0.28s ease,
    color 0.28s ease,
    letter-spacing 0.28s ease;
}

.modal-footer .btn::before {
  content: "";
  position: absolute;
  inset: 0;

  background: linear-gradient(
    120deg,
    transparent 0%,
    rgba(255, 255, 255, 0.65) 45%,
    transparent 70%
  );

  transform: translateX(-120%);
  transition: transform 0.75s ease;
  z-index: -1;
}

.modal-footer .btn:hover::before {
  transform: translateX(120%);
}

.modal-footer .btn:active {
  transform: translateY(-1px) scale(0.99);
}

/* Email */
.modal-footer .btn-outline-dark {
  color: #111827;
  background: linear-gradient(135deg, #ffffff 0%, #eeeeee 100%);
  border: 1px solid rgba(17, 24, 39, 0.16);

  box-shadow:
    0 10px 24px rgba(0, 0, 0, 0.09),
    inset 0 1px 0 rgba(255, 255, 255, 0.85);
}

.modal-footer .btn-outline-dark:hover {
  color: #111827;
  background: linear-gradient(135deg, #ffffff 0%, #e5e7eb 45%, #d1d5db 100%);
  border-color: rgba(17, 24, 39, 0.28);

  box-shadow:
    0 16px 34px rgba(0, 0, 0, 0.16),
    0 0 0 4px rgba(17, 24, 39, 0.06),
    inset 0 1px 0 rgba(255, 255, 255, 0.95);
}

/* WhatsApp */
.modal-footer .btn-success {
  color: #ffffff;
  background: #25D366;
  border: 1px solid rgba(34, 197, 94, 0.45);

  box-shadow:
    0 10px 24px rgba(22, 163, 74, 0.25),
    inset 0 1px 0 rgba(255, 255, 255, 0.28);
}

.modal-footer .btn-success:hover {
  color: #ffffff;
  background: #20c05e;
  border-color: rgba(34, 197, 94, 0.75);

  box-shadow:
    0 16px 36px rgba(22, 163, 74, 0.34),
    0 0 0 4px rgba(34, 197, 94, 0.13),
    inset 0 1px 0 rgba(255, 255, 255, 0.35);
}

.modal-body > .d-flex.d-lg-none {
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.modal-body > .d-flex.d-lg-none .btn {
  position: relative;
  isolation: isolate;

  min-width: 104px;
  padding: 0.48rem 0.9rem;

  border-radius: 999px;
  border: 1px solid rgba(17, 24, 39, 0.14);

  color: #111827;
  background: linear-gradient(135deg, #ffffff 0%, #eeeeee 100%);

  font-size: 0.84rem;
  font-weight: 700;
  letter-spacing: 0.01em;

  overflow: hidden;

  box-shadow:
    0 8px 20px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.85);

  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease,
    background 0.25s ease,
    border-color 0.25s ease,
    color 0.25s ease,
    opacity 0.25s ease;
}

.modal-body > .d-flex.d-lg-none .btn::before {
  content: "";
  position: absolute;
  inset: 0;

  background: linear-gradient(
    120deg,
    transparent 0%,
    rgba(255, 255, 255, 0.7) 45%,
    transparent 70%
  );

  transform: translateX(-120%);
  transition: transform 0.7s ease;
  z-index: -1;
}

.modal-body > .d-flex.d-lg-none .btn:hover:not(:disabled) {
  background: linear-gradient(135deg, #ffffff 0%, #e5e7eb 45%, #d1d5db 100%);
  border-color: rgba(17, 24, 39, 0.26);
}

.modal-body > .d-flex.d-lg-none .btn:hover:not(:disabled)::before {
  transform: translateX(120%);
}

.modal-body > .d-flex.d-lg-none .btn:active:not(:disabled) {
  transform: translateY(0) scale(0.98);
}

.modal-body > .d-flex.d-lg-none .btn:disabled {
  opacity: 0.38;
  cursor: default;

  background: linear-gradient(135deg, #f5f5f5 0%, #e5e5e5 100%);
  box-shadow: none;
}
</style>
