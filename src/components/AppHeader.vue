<template>
	<div class="header">
		<nav class="nav has-shadow">
			<div class="container">
				<div class="nav-left">
					<router-link class="nav-item is-brand" to="/index">
						<img src="http://bulma.io/images/bulma-logo.png" alt="Bulma logo">
					</router-link>
					<router-link class="nav-item is-tab is-hidden-mobile" to="/index">首页{{page}}</router-link>
					<router-link class="nav-item is-tab is-hidden-mobile" to="/projects">活动专区</router-link>
					<router-link class="nav-item is-tab is-hidden-mobile" to="/presents">积分商城</router-link>
					<router-link class="nav-item is-tab is-hidden-mobile" to="/user/profile">个人中心</router-link>
				</div>
				<span class="nav-toggle" :class="{'is-active': device.isMobile && menu.opened}" @click="toggleMenu(!menu.opened)">
							<span></span>
				<span></span>
				<span></span>
				</span>
				<div class="nav-right nav-menu" :class="{'is-active': device.isMobile && menu.opened}">
					<router-link class="nav-item is-tab is-hidden-tablet" to="/index">首页</router-link>
					<router-link class="nav-item is-tab is-hidden-tablet" to="/projects">活动专区</router-link>
					<router-link class="nav-item is-tab is-hidden-tablet" to="/presents">积分商城</router-link>
					<router-link class="nav-item is-tab is-hidden-tablet" to="/user/profile">个人中心</router-link>
	
					<span class="nav-item is-tab" v-if="!current.isLogin"><router-link class="" to="/signup">注册</router-link></span>
					<span class="nav-item is-tab" v-if="!current.isLogin"><router-link class="button is-primary" to="/signin">登陆</router-link></span>
					<router-link v-if="current.isLogin" class="nav-item is-hidden-mobile" to="/user/msgs"><i class="fa fa-bell-o header-notification"></i></router-link>
					<router-link to="/user/profile" class="nav-item is-hidden-mobile" v-if="current.isLogin">
						<avatar :size="40" :src="'http://show.eqiying.com/' + userInfo.PanelOtherInfo1" :username="userInfo.PanelLoginName"></avatar>
					</router-link>
				</div>
			</div>
		</nav>
	</div>
</template>

<script>
import api from 'src/api/index.js'
import { mapActions, mapGetters } from 'vuex'
import storage from 'src/utils/localStorage'
import { Avatar } from 'vue-avatar'

export default {
	name: 'header',
	components: {
		Avatar
	},
	data() {
		return {
			userInfo: {}
		}
	},
	created() {
		this.userInfo = storage.get('user')
	},
	props: ['page'],
	methods: {
		...mapActions([
			'toggleMenu'
		])
	},
	computed: {
		...mapGetters({
			current: 'current',
			device: 'device',
			menu: 'menu'
		})
	},
}
</script>
<style lang="scss">

</style>
