import Vue from "vue";
import NProgress from "vue-nprogress";
import VueBlu from "vue-blu";
// import zh from "vee-validate/dist/locale/zh_CN";
import VeeValidate, { Validator } from "vee-validate";
import VueLazyload from "vue-lazyload";
import { sync } from "vuex-router-sync";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import filters from "./filters";
import {
  TOGGLE_PAGE,
  TOGGLE_MENU,
  TOGGLE_LOGIN
} from "vuex-store/mutation-types";
import indicator from "./assets/indicator.png";
import * as Cookies from "js-cookie";
import { mapActions, mapGetters } from "vuex";
import VueClipboard from "vue-clipboard2";

const dictionary = {
  zh_CN: {
    messages: {
      required: field => "请填写" + field
    },
    attributes: {
      check: "用户注册协议",
      name: "用户名",
      password: "密码",
      rePassword: "确认密码",
      orgPasssword: "原始密码",
      newPassword: "新密码",
      mobile: "手机号",
      email: "邮箱",
      ValidateCode: "验证码",
      carBrand: "汽车品牌",
      carModels: "汽车型号"
    }
  }
};
Vue.use(VeeValidate, {
  locale: 'zh_CN',
  dictionary
});

Vue.use(VueClipboard);
Vue.use(NProgress);
// Validator.localize("zh_CN", dictionary.zh_CN);

Vue.use(VueBlu);
Vue.use(VueLazyload, {
  // preLoad: 1.3,
  error: indicator,
  loading: indicator,
  // attempt: 1,
  adapter: {
    loaded({
      bindType,
      el,
      naturalHeight,
      naturalWidth,
      $parent,
      src,
      loading,
      error,
      Init
    }) {
      el.setAttribute("data-natural-height", naturalHeight);
      el.setAttribute("data-some", "string");
    }
  }
});

Vue.config.devtools = true;

sync(store, router);

const nprogress = new NProgress({ parent: ".nprogress-container" });

const { state } = store;

router.beforeEach((to, from, next) => {
  store.commit(TOGGLE_PAGE, to.path.split("/")[1]);
  if (state.app.device.isMobile && state.app.menu.opened) {
    store.commit(TOGGLE_MENU, false);
  }

  if (to.matched.some(r => r.meta.requireAuth)) {
    const isLogin = Cookies.get("isLogin")
      ? Date.now() - Cookies.get("isLogin") < 1000 * 60 * 20
      : false;
    if (isLogin) {
      next();
    } else {
      store.commit(TOGGLE_LOGIN, false);
      next({
        path: "/signin",
        query: { redirect: to.fullPath }
      });
    }
  } else {
    next();
  }
});

Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));

const app = new Vue({
  router,
  store,
  nprogress,
  ...App
});

export { app, router, store };
