<template>
    <div class="">
        <app-header></app-header>
        <section class="hero is-dark">
      <div class="hero-body">
        <div class="container has-text-centered">
          <p class="title">
            网站公告
          </p>
          <p class="subtitle">
            精彩，因您的每一刻关注
          </p>
        </div>
      </div>
    </section>
        <div class="section">
            <div class="container">
                <div class="columns">
                    <div class="column is-8 is-offset-2">ddd

                    </div>
                </div>
            </div>
        </div>
        <app-footer></app-footer>
    </div>
</template>

<script>
import api from 'src/api/index.js'
import AppHeader from 'components/AppHeader.vue'
import AppFooter from 'components/AppFooter.vue'

export default {
    components: {
        AppHeader,
        AppFooter
    },
    data() {
        return {

        }
    },
    created() {

    },
    methods: {

    }
}
</script>

<style lang="scss" scoped>

</style>
