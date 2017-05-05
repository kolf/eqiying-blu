import api from 'src/api'
import * as types from './mutation-types'

export const toggleMenu = ({ commit }, opened) => commit(types.TOGGLE_MENU, opened)

export const togglePage = ({ commit }, pageName) => commit(types.TOGGLE_PAGE, pageName)

export const toggleLogin = ({ commit }, status) => commit(types.TOGGLE_LOGIN, status)

export const toggleDevice = ({ commit }, device) => commit(types.TOGGLE_DEVICE, device)

export const saveUser = ({ commit }, user) => commit(types.SAVE_USER, user)

export const switchEffect = ({ commit }, effectItem) => {
  if (effectItem) {
    commit(types.SWITCH_EFFECT, effectItem)
  }
}
