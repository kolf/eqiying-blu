<template>
	<div class="header">
		<nav class="nav has-shadow">
			<div class="container">
				<div class="nav-left">
					<router-link class="nav-item is-brand" to="/index">
						<img src="../assets/logo.png" alt="E起赢">
					</router-link>
					<router-link class="nav-item is-tab is-hidden-mobile" to="/index">首页{{page}}</router-link>
					<router-link class="nav-item is-tab is-hidden-mobile" to="/projects">活动专区</router-link>
					<router-link class="nav-item is-tab is-hidden-mobile" to="/presents">积分商城</router-link>
					<router-link class="nav-item is-tab is-hidden-mobile" to="/user">个人中心</router-link>
				</div>

				<div class="nav-center is-hidden-tablet">
					<router-link class="nav-item msg-count" to="/user/msgs" :class="{active: user.NoreadCount>0}">
						<i class="fa fa-bell-o header-icon"></i>
					</router-link>
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
					<router-link class="nav-item is-tab is-hidden-tablet" to="/user">个人中心</router-link>
	
					<span class="nav-item is-tab" v-if="!current.isLogin"><router-link class="" to="/signup">注册</router-link></span>
					<span class="nav-item is-tab" v-if="!current.isLogin"><router-link class="button is-primary" to="/signin">登陆</router-link></span>
					<router-link title="我的积分" v-if="current.isLogin" class="nav-item is-badge is-hidden-mobile" to="/user/presents"><i class="iconfont icon-jifen21 header-icon"></i><span class="tag is-primary">{{user.PanelPoint}}</span></router-link>
					<router-link title="我和私信" style="width:70px" v-if="current.isLogin" class="nav-item  is-badge is-hidden-mobile" to="/user/msgs"><i class="fa fa-bell-o header-icon"></i><span v-if="user.NoreadCount" class="tag is-primary">{{user.NoreadCount}}</span></router-link>
					<router-link title="个人资料" to="/user" class="nav-item is-hidden-mobile" v-if="current.isLogin">
						<avatar v-if="user.PanelOtherInfo1" :size="40" :src="user.PanelOtherInfo1 | assetsUrl" :username="user.PanelLoginName"></avatar>
						<avatar v-else :size="40" :username="user.PanelLoginName"></avatar>
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
			// user: {}
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
			menu: 'menu',
			user: 'user'
		})
	},
}
</script>
<style lang="scss">
.msg-count{
	&>i{
		font-size: 18px;
	}
	&.active{
		position: relative;
		&:after{
			position: absolute;
			border-radius: 50%;
			width: 10px;
			height: 10px;
			right:5px;
			top:20px;
			background: #ff3860;
			content: ''
		}
	}
}
</style>
