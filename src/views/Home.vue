<template>
  <div class="home">
    <section class="hero is-primary is-large">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">
            Large title
          </h1>
          <h2 class="subtitle">
            Large subtitle
          </h2>
        </div>
      </div>
    </section>
    <div class="section">
      <div class="container">
        <div class="columns">
          <div class="column">
            <p class="notification is-info">Auto</p>
          </div>
          <div class="column">
            <p class="notification is-warning">Auto</p>
          </div>
          <div class="column">
            <p class="notification is-danger">Auto</p>
          </div>
        </div>
      </div>
    </div>
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

<style lang="scss" scoped>
.notification{
  height: 600px
}
</style>
