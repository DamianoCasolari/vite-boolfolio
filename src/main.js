import { createApp } from 'vue'
import './styles/general.scss'
import App from './App.vue'
// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'
import { router } from './router.js'
createApp(App).use(router).mount('#app')
