const app = state => state.app
const device = state => state.app.device
const menu = state => state.app.menu
const effect = state => state.app.effect
const current = state => state.app.current
const user = state => state.app.user
const isLogin = state => state.app.isLogin

export {
  app,
  device,
  menu,
  effect,
  current,
  user,
  isLogin
}
