import * as types from '../mutation-types'

const state = {
  user: null
}

const mutations = {
  [types.GET_USER_INFO] (state) {
    console.log(state);
  },

  [types.LOGIN] (state) {
    console.log(state);
  },

  [types.LOGOUT] (state) {
    console.log(state);
  }
}

export default {
  state,
  mutations
}
