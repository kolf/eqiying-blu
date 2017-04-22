import * as types from '../mutation-types'
import storage from 'src/utils/localStorage'

const state = {
  user: null
}

const mutations = {
  [types.GET_USER_INFO] (state) {
    console.log(state);
    // storage.set('user', )
  },

  [types.LOGIN] (state) {

  },

  [types.LOGOUT] (state) {
    storage.removeAll()
  }
}

export default {
  state,
  mutations
}
