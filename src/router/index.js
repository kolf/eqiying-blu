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
      meta: {
          requireAuth: true,
      },
      children:[{
        path: 'main',
        component: loadView('UserInfo')
      },{
        path: 'projects',
        component: loadView('ProjectLogs')
      },{
        path: 'presents',
        component: loadView('PresentLogs')
      }]
    },
    {
      path: '/projects',
      component: loadView('Projects'),
      meta: {
          requireAuth: true,
      }
    },
    {
      path: '/presents',
      component: loadView('Presents'),
      meta: {
          requireAuth: true,
      }
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
