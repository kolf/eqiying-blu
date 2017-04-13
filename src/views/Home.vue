<template>
  <div class="home">

  </div>
</template>

<script>
import api from '../api/index.js'

export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  created () {
    api.queryAnnounce()
  }
}
</script>

<style lang="scss">

</style>
