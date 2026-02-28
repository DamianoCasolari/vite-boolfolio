import { createRouter, createWebHistory } from "vue-router";
import HomeView from './views/HomeView.vue'



const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/services",
      name: "services",
      component: () => import("./views/ServicesView.vue"),
    },
    {
      path: "/contacts",
      name: "contacts",
      component: () => import("./views/ContactsView.vue"),
    },
    {
      path: "/privacy-policy",
      name: "privacyPolicy",
      component: () => import("./views/PrivacyPolicy.vue"),
    },
    {
      path: "/projects/:slug",
      name: "single-project",
      component: () => import("./views/SingleProject.vue"),
    },
    { path: "/:pathMatch(.*)*", name: "PageNotFound", component: () => import("./views/PageNotFound.vue"), },
  ],
  scrollBehavior(to, from, savedPosition) {
    // se usi back/forward del browser, ripristina la posizione precedente
    if (savedPosition) return savedPosition;

    // se hai ancore tipo /#section
    if (to.hash) return { el: to.hash, behavior: "smooth" };

    // default: vai in cima
    return { top: 0, left: 0 };
  },
});

export { router };