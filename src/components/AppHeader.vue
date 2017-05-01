<template>
	<div class="header">
		<nav class="nav has-shadow">
			<div class="container">
				<div class="nav-left">
					<a class="nav-item is-brand">
						<img src="http://bulma.io/images/bulma-logo.png" alt="Bulma logo">
					</a>
					<router-link class="nav-item is-tab is-hidden-mobile" to="/index">首页{{page}}</router-link>
					<router-link class="nav-item is-tab is-hidden-mobile" to="/projects">活动专区</router-link>
					<router-link class="nav-item is-tab is-hidden-mobile" to="/presents">积分商城</router-link>
					<router-link class="nav-item is-tab is-hidden-mobile" to="/user/main">个人中心</router-link>
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
					<router-link class="nav-item is-tab is-hidden-tablet" to="/user/main">个人中心</router-link>
	
					<span class="nav-item is-tab" v-if="!current.isLogin"><router-link class="" to="/signup">注册</router-link></span>
					<span class="nav-item is-tab" v-if="!current.isLogin"><router-link class="button is-primary" to="/signin">登陆</router-link></span>
					<router-link v-if="current.isLogin" class="nav-item is-hidden-mobile" to="/user/msg"><i class="fa fa-bell-o header-notification"></i></router-link>
					<router-link to="/user/main" class="nav-item is-hidden-mobile" v-if="current.isLogin">
						<figure class="image header-avatar is-32x32"><img src="http://bulma.io/images/placeholders/32x32.png"></figure>
					</router-link>
				</div>
			</div>
		</nav>
	</div>
</template>

<script>
import api from 'src/api/index.js'
import { mapActions, mapGetters } from 'vuex'

export default {
	name: 'header',
	components: {

	},
	data() {
		return {

		}
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
<style lang="scss" scoped>
@import '~bulma/sass/utilities/mixins';

.header {
	&-notification {
		font-size: 20px;
	}
	&-avatar {
		border-radius: 50%;
		overflow: hidden;
		img {
			max-height: none
		}
	}
	&>.nav {
		height: 64px
	}
	.nav-left {
		.nav-item {
			&.is-brand {
				padding-right: 20px;
			}
			font-size: 16px;
			padding-left: 15px;
			padding-right: 15px;
		}
	}
}
</style>
