import * as types from '../mutation-types'
import router from 'src/router'
import storage from 'src/utils/localStorage'
import Cookie from 'js-cookie'

const state = {
  current: {
    page: '',
    isLogin: Cookie.get('isLogin') ? (Date.now() - Cookie.get('isLogin')) >  1000 * 60 * 20 : false
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
      Cookie.set('isLogin', Date.now())
    }else{
      Cookie.remove('isLogin')
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
