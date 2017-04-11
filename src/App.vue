<template>
  <div id="app">
  	<app-header v-bind:page="$route.name"></app-header>
    <router-view class="page"></router-view>
    <app-footer></app-footer>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'

export default {
  name: 'app',
  components: {
  	'app-header': AppHeader,
  	'app-footer': AppFooter
  }
}
</script>
<style lang="sass">
@import './styles/app.scss'
</style>
