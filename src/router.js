import { createRouter, createWebHistory } from "vue-router";



const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("./views/HomeView.vue"),
      meta: {
        title: "Damiano Casolari | Siti Web, AI e Automazioni | Cervia · Rimini",
        description:
          "Sviluppatore web a Cervia, specializzato nella realizzazione di siti internet moderni e applicazioni web su misura. Progetto soluzioni veloci, sicure e ottimizzate per la user experience, con attenzione al design, alle prestazioni e alla visibilità online.",
      },
    },
    {
      path: "/services",
      name: "services",
      component: () => import("./views/ServicesView.vue"),
      meta: {
        title: "Servizi | Siti Vetrina, Landing Page e Restyling – Damiano Casolari",
        description:
          "Sito vetrina, landing page o restyling del sito esistente: scopri i servizi di sviluppo web di Damiano Casolari, con una call gratuita per parlare del tuo progetto.",
      },
    },
    {
      path: "/contacts",
      name: "contacts",
      component: () => import("./views/ContactsView.vue"),
      meta: {
        title: "Contatti | Damiano Casolari – Sviluppatore Web a Cervia",
        description:
          "Hai un progetto in mente o vuoi migliorare la tua presenza online? Scrivimi un messaggio o contattami su WhatsApp, ti rispondo il prima possibile.",
      },
    },
    {
      path: "/privacy-policy",
      name: "privacyPolicy",
      component: () => import("./views/PrivacyPolicy.vue"),
      meta: {
        title: "Privacy Policy | Damiano Casolari",
        description: "Informativa sulla privacy del sito di Damiano Casolari.",
      },
    },
    {
      path: "/cookie-policy",
      name: "cookiePolicy",
      component: () => import("./views/CookiePolicy.vue"),
      meta: {
        title: "Cookie Policy | Damiano Casolari",
        description: "Informativa sui cookie del sito di Damiano Casolari.",
      },
    },
    {
      path: "/projects/:slug",
      name: "single-project",
      component: () => import("./views/SingleProject.vue"),
      meta: {
        title: "Progetto | Portfolio – Damiano Casolari",
        description:
          "Scopri i dettagli di questo progetto realizzato da Damiano Casolari, sviluppatore web a Cervia.",
      },
    },
    {
      path: "/about",
      name: "about",
      component: () => import("./views/AboutMobile.vue"),
      meta: {
        title: "Chi sono | Damiano Casolari – Software Developer e Creativo Digitale",
        description:
          "Damiano Casolari, software developer e creativo digitale: esperienze e prodotti digitali dal design curato, per valorizzare brand, idee e progetti online.",
      },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "PageNotFound",
      component: () => import("./views/PageNotFound.vue"),
      meta: {
        title: "Pagina non trovata | Damiano Casolari",
        description: "La pagina che cerchi non esiste o è stata spostata.",
      },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    if (to.hash) return { el: to.hash, behavior: "smooth" };

    // Safari-friendly: aspetta che il DOM sia pronto
    return new Promise((resolve) => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          resolve({ left: 0, top: 0 });
        });
      });
    });
  }
});

export { router };
