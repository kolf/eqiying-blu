import * as types from '../mutation-types'
import router from 'src/router'
import storage from 'src/utils/localStorage'
import * as Cookies from "js-cookie"

const state = {
  current: {
    page: '',
    isLogin: Cookies.get('isLogin') ? (Date.now() - Cookies.get('isLogin')) >  1000 * 60 * 20 : false
  },
  device: {
    isMobile: false,
    isTablet: false
  },
  menu: {
    opened: false,
    hidden: false
  },
  effect: {
    translate3d: true
  },
  user: storage.get('user') || {}
}

const mutations = {
  [types.TOGGLE_DEVICE] (state, device) {
    state.device.isMobile = device === 'mobile'
    state.device.isTablet = device === 'tablet'
  },

  [types.TOGGLE_PAGE] (state, pageName) {
    state.current.page = pageName
  },

  [types.TOGGLE_MENU] (state, opened) {
    if (state.device.isMobile) {
      state.menu.opened = opened
    } else {
      state.menu.opened = true
    }
  },

  [types.TOGGLE_LOGIN] (state, status) {
    state.current.isLogin = status
    console.log('app.js', status)
    if(status){
      // storage.set('isLogin', 1)
      const t =  Date.now() + ''
      Cookies.set('isLogin', t)
    }else{
      Cookies.remove('isLogin')
      storage.remove('user')
    }
  },

  [types.SWITCH_EFFECT] (state, effectItem) {
    for (let name in effectItem) {
      state.effect[name] = effectItem[name]
    }
  },

  [types.SAVE_USER] (state, user) {
    Object.assign(state.user, user)
    storage.set('user', state.user)
  }
}

export default {
  state,
  mutations
}
