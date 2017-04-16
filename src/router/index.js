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
      path: '/index',
      component: loadView('Home')
    },
    {
      path: '/user',
      component: loadView('User'),
      children:[{
        path: '',
        component: loadView('UserInfo')
      },{
        path: '/activity/log',
        component: loadView('ActivityLog')
      },{
        path: '/present/log',
        component: loadView('PresentLog')
      }]
    },
    {
      path: '/projects',
      component: loadView('Projects')
    },
    {
      path: '/present',
      component: loadView('Present')
    },
    {
      path: '/signup',
      component: loadView('Signup')
    },
    {
      path: '/signin',
      component: loadView('Signin')
    },
    {
      path: '*',
      redirect: '/index'
    }
  ]
})
