<template>
    <section class="hero is-fullheight">
        <div class="hero-head">
            <div class="header">
                <nav class="nav">
                    <div class="container">
                        <div class="nav-left">
                            <router-link class="nav-item is-brand" to="/index">
                                <img src="../assets/logo.png" alt="E起赢">
                            </router-link>
                        </div>
                        <span class="nav-toggle" :class="{'is-active': device.isMobile && menu.opened}" @click="toggleMenu(!menu.opened)">
                            <span></span>
                            <span></span>
                            <span></span>
                        </span>
                        <div class="nav-right nav-menu" :class="{'is-active': device.isMobile && menu.opened}">
                            <span class="nav-item is-tab">
                                <router-link class="" to="/signup">注册</router-link>
                            </span>
                            <span class="nav-item is-tab">
                                <router-link class="button is-primary" to="/signin">登陆</router-link>
                            </span>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
        <div class="hero-body">
            <div class="container">
                <div class="section msg-box has-text-centered">
                    <div class="success-heading">
                        <i class="iconfont icon-chenggong1 icon is-success"></i>
                        <h2 class="title">注册成功</h2>
                    </div>
                    <div class="content">
                        <p class="desc">您已成功注册一起赢生活社区，一起赢生活圈祝您永远幸福快乐！</p>
                        <p>
                            <router-link class="button is-outlined is-primary is-medium" to="/signin">马上登陆</router-link>
                        </p>
                    </div>
                </div>
            </div>
    
        </div>
        <div class="hero-foot">
            <footer class="footer">
                <div class="container">
                    <div class="content has-text-centered">
                        Copyright © 2016 EQYING Inc. All Rights Reserved 京ICP备14016765号-2
                    </div>
                </div>
            </footer>
        </div>
    </section>
</template>

<script>
import storage from 'src/utils/localStorage'
import { mapActions, mapGetters } from 'vuex'

export default {
    data() {
        return {

        }
    },
    computed: {
        ...mapGetters({
            current: 'current',
            device: 'device',
            menu: 'menu'
        })
    },
    created() {

    },
    methods: {

    }
}
</script>

<style lang="scss" scoped>

</style>
