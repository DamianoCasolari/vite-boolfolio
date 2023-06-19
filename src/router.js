import { createRouter, createWebHistory } from "vue-router";
import HomeView from './views/HomeView.vue'
import AboutView from './views/AboutView.vue'
import ContactsView from './views/ContactsView.vue'
import SingleProject from './views/SingleProject.vue'
import PageNotFound from './views/PageNotFound.vue'



const router = createRouter({
    history: createWebHistory(),
    routes: [{
        'path': '/',
        'name': 'home',
        'component': HomeView
    },
    {
        'path': '/about',
        'name': 'about',
        'component': AboutView
    },
    {
        'path': '/contacts',
        'name': 'contacts',
        'component': ContactsView
    },
    {
        'path': '/progects/:slug',
        'name': 'single-project',
        'component': SingleProject
    },
    { path: '/:pathMatch(.*)*', name: 'PageNotFound', component: PageNotFound }

    ]
})

export { router };