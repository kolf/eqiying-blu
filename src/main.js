// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueBlu from 'vue-blu'
import NProgress from 'vue-nprogress'
import zh from 'vee-validate/dist/locale/zh_CN'
import VeeValidate, { Validator } from 'vee-validate'
import VueLazyload from 'vue-lazyload'
import { sync } from 'vuex-router-sync'
import App from './App'
import router from './router'

Vue.config.productionTip = false

Validator.addLocale(zh)
Vue.use(VueBlu)
Vue.use(VueLazyload)
Vue.use(VeeValidate, {
  locale: 'zh_CN'
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
