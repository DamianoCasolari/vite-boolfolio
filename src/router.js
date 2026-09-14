import { createRouter, createWebHistory } from "vue-router";



const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("./views/HomeView.vue"),
      meta: {
        title: "Siti Vetrina, Landing Page e Restyling a Ravenna | Damiano Casolari",
        description:
          "Web developer a Ravenna: realizzo landing page, siti vetrina e restyling di siti web veloci, curati e pensati per portarti clienti. Call gratuita, senza impegno.",
      },
    },
    {
      path: "/services",
      name: "services",
      component: () => import("./views/ServicesView.vue"),
      meta: {
        title: "Servizi | Landing Page, Siti Vetrina e Restyling a Ravenna",
        description:
          "Landing page, siti vetrina e restyling a Ravenna e in Romagna: cosa include ogni servizio e come lavoro. Si parte da una call gratuita, senza impegno.",
      },
    },
    {
      path: "/contacts",
      name: "contacts",
      component: () => import("./views/ContactsView.vue"),
      meta: {
        title: "Contatti | Damiano Casolari – Web Developer a Ravenna",
        description:
          "Hai un progetto a Ravenna o in Romagna? Scrivimi su WhatsApp o via email: la prima call è gratuita e senza impegno, per parlare del tuo sito o della tua landing page.",
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
      path: "/accessibility",
      name: "accessibility",
      component: () => import("./views/AccessibilityStatement.vue"),
      meta: {
        title: "Dichiarazione di accessibilità | Damiano Casolari",
        description: "Come è stato progettato il sito di Damiano Casolari per essere accessibile: linee guida WCAG 2.1, verifiche effettuate, limiti noti e contatto per segnalare problemi.",
      },
    },
    {
      path: "/projects/:slug",
      name: "single-project",
      component: () => import("./views/SingleProject.vue"),
      meta: {
        title: "Progetto | Portfolio – Damiano Casolari",
        description:
          "Scopri i dettagli di questo progetto realizzato da Damiano Casolari, web developer a Ravenna.",
      },
    },
    {
      path: "/about",
      name: "about",
      component: () => import("./views/AboutMobile.vue"),
      meta: {
        title: "Chi sono | Damiano Casolari – Web Developer a Ravenna",
        description:
          "Damiano Casolari, software developer e creativo digitale a Ravenna: landing page, siti vetrina e restyling dal design curato, per valorizzare brand e attività online.",
      },
    },
    {
      path: "/:pathMatch(.*)*",
      name: "PageNotFound",
      component: () => import("./views/PageNotFound.vue"),
      meta: {
        title: "Pagina non trovata | Damiano Casolari",
        description: "La pagina che cerchi non esiste o è stata spostata.",
        // La SPA risponde 200 anche agli URL inesistenti: senza noindex Google li indicizzerebbe
        robots: "noindex, follow",
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
