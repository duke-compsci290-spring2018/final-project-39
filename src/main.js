// only need to import bootstrap here for all components to have access to it
import 'bootstrap/dist/css/bootstrap.css'
// import site specific global styles AFTER bootstrap
import './assets/css/style.css'

// NPM libraries used
import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps';

// local resources used
import App from './App.vue'
import { MAP_KEY } from './assets/secrets'

// turn off the console note about switching to production mode
Vue.config.productionTip = false

// install plugin globally for all Vue app instances
Vue.use(VueGoogleMaps, {
    load: {
        key: MAP_KEY,
    }
})

// simply creating the Vue instance does all the necessary set up, so no need to name it
new Vue({
    // HTML element to attach Vue app
    el: '#app',
    // components (HTML, CSS, and JS) used by this app
    components: {
        App
    },
    // simply render the app component as this app
    template: '<App/>'
})
