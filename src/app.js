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
import Promise from 'es6-promise'

Promise.polyfill()
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

router.beforeEach((route, redirect, next) => {
  store.commit(TOGGLE_PAGE, route.path.split('/')[1])
  if (state.app.device.isMobile && state.app.menu.opened) {
    store.commit(TOGGLE_MENU, false)
  }
  next()
})

const app = new Vue({
  router,
  store,
  nprogress,
  ...App
})

export { app, router, store }
