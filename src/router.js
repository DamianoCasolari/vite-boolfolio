import { createRouter, createWebHistory } from "vue-router";
import HomeView from './views/HomeView.vue'
import AboutView from './views/AboutView.vue'
import ContactsView from './views/ContactsView.vue'



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
        'path': '/#projects',
        'name': 'projects',
        'component': HomeView
    },

    ]
})

export { router };