<template>
  <div id="app">
    <nprogress-container></nprogress-container>
    <router-view class="page"></router-view>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import NprogressContainer from 'vue-nprogress/src/NprogressContainer'

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
      'toggleMenu'
    ])
  }
}
</script>
<style lang="sass">
@import './styles/app.scss'
</style>
