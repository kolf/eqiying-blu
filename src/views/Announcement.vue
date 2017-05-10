<template>
    <div class="">
        <app-header></app-header>
        <section class="hero is-medium is-primary is-bold banner announcement-banner">
            <div class="hero-body">
                <div class="container has-text-centered">
                    <h1 class="title">
                        网站公告
                    </h1>
                    <h2 class="subtitle">
                        Website announcement
                    </h2>
                </div>
            </div>
        </section>
        <div class="section">
            <div class="container">
                <div class="columns">
                    <div class="column is-8 is-offset-2">
                        <!--<h3 class="title">{{announcement.AnnounceTitle}}</h3>-->
                        <div class="content announcement-content">
                            <h1 class="has-text-centered">{{announcement.AnnounceTitle}}</h1>
                            <p class="has-text-right">{{announcement.CreateTime | fromatDate(true)}}</p>
                            <p>{{decodeURI(announcement.AnnounceContent) | filterHTML}}</p>
                        </div>
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
            announcement: {}
        }
    },
    created() {
        const { id } = this.$route.params
        this.getAnnouncement(id)
    },
    methods: {
        getAnnouncement(AnnounceId) {
            api.getAnnouncement({ AnnounceId }).then(res => {
                const { msg, result, data } = res.data
                if (result !== 'ok') {
                    this.$notify.warning({ content: msg })
                    return false
                }
                this.announcement = data
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.announcement {
    &-content {
        min-height: 500px
    }
    &-banner {
        background-image: url(../assets/user_banner.jpg) !important;
        background-size: cover
    }
}
</style>
