import Vue from 'vue'
import NProgress from 'vue-nprogress'
import VueBlu from 'vue-blu'
// import zh from 'vee-validate/dist/locale/zh_CN'
import VeeValidate, { Validator } from 'vee-validate'
import VueLazyload from 'vue-lazyload'
import { sync } from 'vuex-router-sync'
import App from './App.vue'
import router from './router'
import store from './store'
import filters from './filters'
import { TOGGLE_PAGE, TOGGLE_MENU, TOGGLE_LOGIN } from 'vuex-store/mutation-types'
import indicator from './assets/indicator.png'

Vue.use(NProgress)
// Validator.addLocale(zh)
Vue.use(VueBlu)
Vue.use(VueLazyload, {
    // preLoad: 1.3,
    error: indicator,
    loading: indicator,
    // attempt: 1,
    adapter: {
        loaded({ bindType, el, naturalHeight, naturalWidth, $parent, src, loading, error, Init }) {
            el.setAttribute('data-natural-height', naturalHeight);
            el.setAttribute('data-some', 'string');
        }
    }
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
        if (state.app.current.isLogin) {
            next()
        } else {
            store.commit(TOGGLE_LOGIN, false)
            next({
                path: '/signin',
                query: { redirect: to.fullPath }
            })
        }
    } else {
        next()
    }
})

Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))

const app = new Vue({
    router,
    store,
    nprogress,
    ...App
})

export { app, router, store }