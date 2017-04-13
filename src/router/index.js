import Vue from 'vue'
import Router from 'vue-router'
import {loadView} from 'src/utils/lazyLoading'
Vue.use(Router)

export default new Router({
  mode: 'hash',
  linkActiveClass: 'is-active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      name: 'Home',
      path: '/index',
      component: loadView('Home')
    },
    {
      name: 'User',
      path: '/user',
      component: loadView('User')
    },    
    {
      name: 'Projects',
      path: '/projects',
      component: loadView('Projects')
    },    
    {
      name: 'Mall',
      path: '/mall',
      component: loadView('Mall')
    },    
    {
      name: 'Signup',
      path: '/signup',
      component: loadView('Signup')
    },
    {
      path: '*',
      redirect: '/index'
    }
  ]
})