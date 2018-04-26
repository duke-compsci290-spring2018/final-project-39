import Vue from 'vue'
import Router from 'vue-router'
import Admin from './../components/admin.vue'
import Unsignedin from './../components/unsignedIn.vue'
import Signedin from './../components/signedIn.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Unsignedin',
      component: Unsignedin
    },
    {
      path: '/Admin',
      name: 'Admin',
      component: Admin
    },
    {
      path: '/Signedin',
      name: 'Signedin',
      component: Signedin
    }
  ]
})
