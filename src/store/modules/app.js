import * as types from '../mutation-types'
import router from 'src/router'

const state = {
  current: {
    page: '',
    isLogin: false
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
  }
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
  },

  [types.SWITCH_EFFECT] (state, effectItem) {
    for (let name in effectItem) {
      state.effect[name] = effectItem[name]
    }
  }
}

export default {
  state,
  mutations
}
