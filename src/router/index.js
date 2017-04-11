import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import User from '@/pages/User'
import Projects from '@/pages/Projects'
import Mall from '@/pages/Mall'
import Signup from '@/pages/Signup'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'is-active',
  routes: [
    {
      path: '/index',
      name: 'home',
      component: Home
    },{
      path: '/user',
      name: 'user',
      component: User
    },{
      path: '/projects',
      name: 'projects',
      component: Projects
    },{
      path: '/mall',
      name: 'mall',
      component: Mall
    },{
      path: '/signup',
      name: 'signup',
      component: Signup
    },{
	    path: '*',
    	component: Home
    }
  ]
})
