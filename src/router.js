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