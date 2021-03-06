import Vue from 'vue'
import Router from 'vue-router'
import {loadView} from 'src/utils/lazyLoading'
Vue.use(Router)

export default new Router({
  // mode: 'hash',
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
      redirect: '/user/profile',
      meta: {
          requireAuth: true,
      },
      children:[{
        path: 'profile',
        component: loadView('Profile')
      },{
        path: 'projects',
        component: loadView('ProjectLogs')
      },{
        path: 'presents',
        component: loadView('PresentLogs')
      },{
        path: 'msgs',
        component: loadView('UserMsgs')
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
      path: '/projects/:id',
      component: loadView('ProjectsDetails'),
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
      path: '/announcement/:id',
      component: loadView('Announcement'),
    },
    {
      path: '/presents/:id',
      component: loadView('PresentsDetails'),
      meta: {
          requireAuth: true,
      }
    },
    {
      path: '/signup',
      component: loadView('Signup')
    },
    {
      path: '/activate',
      component: loadView('ActivateUser')
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
