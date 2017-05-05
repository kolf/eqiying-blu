<template>
  <div id="app">
    <nprogress-container></nprogress-container>
    <router-view class="page"></router-view>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import NprogressContainer from 'vue-nprogress/src/NprogressContainer'
import storage from 'src/utils/localStorage'

export default {
  name: 'app',
  components: {
    NprogressContainer
  },
  beforeMount() {
    const { body } = document
    const WIDTH = 768
    const RATIO = 3
    const handler = () => {
      if (!document.hidden) {
        let rect = body.getBoundingClientRect()
        let isMobile = rect.width - RATIO < WIDTH
        this.toggleDevice(isMobile ? 'mobile' : 'other')
        this.toggleMenu(!isMobile)
      }
    }
    document.addEventListener('visibilitychange', handler)
    window.addEventListener('DOMContentLoaded', handler)
    window.addEventListener('resize', handler)

    const isLogin = storage.has('isLogin', 1000 * 60 * 20)
    const user = storage.get('user')
    this.saveUser(user)
    this.toggleLogin(isLogin)
  },
  computed: {
    ...mapGetters({
      current: 'current',
      device: 'device',
      menu: 'menu'
    })
  },
  methods: {
    ...mapActions([
      'toggleDevice',
      'toggleMenu',
      'toggleLogin',
      'saveUser',
    ])
  }
}
</script>
<style lang="sass">
@import './styles/app.scss'
</style>
