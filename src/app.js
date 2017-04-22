import Vue from 'vue'
import NProgress from 'vue-nprogress'
import VueBlu from 'vue-blu'
import zh from 'vee-validate/dist/locale/zh_CN'
import VeeValidate, { Validator } from 'vee-validate'
import VueLazyload from 'vue-lazyload'
import { sync } from 'vuex-router-sync'
import App from './App.vue'
import router from './router'
import store from './store'
import { TOGGLE_PAGE, TOGGLE_MENU } from 'vuex-store/mutation-types'
import storage from 'src/utils/localStorage'

Vue.use(NProgress)
Validator.addLocale(zh)
Vue.use(VueBlu)
Vue.use(VueLazyload, {
	preLoad: 1.3,
	// error: 'dist/error.png',
	// loading: 'dist/loading.gif',
	attempt: 1
})
Vue.use(VeeValidate, {
	locale: 'zh_CN'
})
// Enable devtools
Vue.config.devtools = true

sync(store, router)

const nprogress = new NProgress({ parent: '.nprogress-container' })

const { state } = store

router.beforeEach((to, from, next) => {
	store.commit(TOGGLE_PAGE, to.path.split('/')[1])
	if (state.app.device.isMobile && state.app.menu.opened) {
		store.commit(TOGGLE_MENU, false)
	}

	if (to.matched.some(r => r.meta.requireAuth)) {
      if (storage.has('isLogin')) {
          next();
      } else {
          next({
              path: '/signin',
              query: {redirect: to.fullPath}
          })
      }
  }
  else {
      next();
  }
})

const app = new Vue({
	router,
	store,
	nprogress,
	...App
})

export { app, router, store }
