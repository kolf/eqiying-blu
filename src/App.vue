<template>
  <div id="app">
    <nprogress-container></nprogress-container>
  	<app-header v-bind:page="$route.name"></app-header>
    <router-view class="page"></router-view>
    <app-footer></app-footer>
  </div>
</template>

<script>
import NprogressContainer from 'vue-nprogress/src/NprogressContainer'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
  components: {
    AppHeader,
    AppFooter,
    NprogressContainer
  },
  methods: mapActions([
    'toggleDevice',
    'toggleMenu'
  ]),
  beforeMount () {
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
  }
}
</script>
<style lang="sass">
@import './styles/app.scss'
</style>
