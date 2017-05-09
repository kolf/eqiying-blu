<template>
    <div class="">
        <app-header></app-header>
        <div class="banner announcement-banner"></div>
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
        background-image: url(../assets/startup-banner-3c5415c78064da11455c3ab9b352e04c.jpg);
        background-size: cover
    }
}
</style>
