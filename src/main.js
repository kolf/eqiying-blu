// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueBlu from 'vue-blu'
import App from './App'
import router from './router'

Vue.config.productionTip = false

Vue.use(VueBlu)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
