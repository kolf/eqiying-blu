import api from '../api'
import * as types from './mutation-types'

export const toggleMenu = ({ commit }, opened) => commit(types.TOGGLE_MENU, opened)

export const togglePage = ({ commit }, pageName) => commit(types.TOGGLE_PAGE, pageName)

export const toggleDevice = ({ commit }, device) => commit(types.TOGGLE_DEVICE, device)

export const switchEffect = ({ commit }, effectItem) => {
  if (effectItem) {
    commit(types.SWITCH_EFFECT, effectItem)
  }
}
//
// export const getCaptchaUrl = ({commit}) => {
//   commit(types.GET_CAPTCHAURL)
// }
//
// export const login = (store, userInfo) => {
//   api.login(userInfo).then(res => {
//     const {msg, result} = res.data
//
//     console.log(this)
//
//     if(result!=='ok'){
//       this.$notify.warning({content: msg || '登陆失败'})
//       getCaptchaUrl(store)
//       return false;
//     }
//     getUserInfo(store)
//     store.commit(types.LOGIN)
//     this.$notify.success({content: '登陆成功'})
//     this.$router.push({ path: '/projects' })
//   }).catch((error) => {
//     this.$notify.warning({content: '登陆失败'})
//     getCaptchaUrl(store)
//   })
// }
//
// export const logout = ({commit, router}) => {
//   commit(types.LOGOUT)
//   window.location.pathname = '/'
// }
//
// export const getUserInfo = ({commit}) => {
//   api.getUserInfo().then(res => {
//     const {msg, result} = res.data
//     if(result!=='ok'){
//       return false
//     }
//
//     commit(types.GET_USER_INFO, { user: res.data.panelBaseInfo })
//   })
// }
