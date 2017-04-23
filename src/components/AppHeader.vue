<template>
	<div class="header">
		<nav class="nav has-shadow">
			<div class="container">
				<div class="nav-left">
					<a class="nav-item is-brand">
						<img src="http://bulma.io/images/bulma-logo.png" alt="Bulma logo">
					</a>
					<router-link class="nav-item is-tab is-hidden-mobile" to="/index">首页</router-link>
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
					<!-- <a class="nav-item is-tab" @click="showlogin=true">登陆</a> -->
					<router-link class="nav-item is-tab" to="/signin">登陆</router-link>
					<router-link class="nav-item is-tab" to="/signup">注册</router-link>
				</div>
			</div>
		</nav>
		<modal title="登陆" :width="320" :is-show="showlogin" @close="showlogin=false">
			<form @submit.prevent="validateForm" >
				<label class="label">用户名</label>
				<p class="control">
					<input class="input" type="text" placeholder="请输入您的用户名" name="userName" v-model="loginForm.userName" v-validate="'required'" :class="{'is-danger': errors.has('userName')}" >
					<span class="help is-danger" v-show="errors.has('userName')">{{ errors.first('userName') }}</span>
				</p>
				<label class="label">密码</label>
				<p class="control">
					<input class="input" type="password" placeholder="请输入您的密码" name="userPwd" v-model="loginForm.userPwd" v-validate="'required'" :class="{'is-danger': errors.has('userPwd')}" >
					<span class="help is-danger" v-show="errors.has('userPwd')">{{ errors.first('userPwd') }}</span>
				</p>
				<label class="label">验证码</label>
				<p class="control has-addons">
					<input class="input" type="text" placeholder="请输入验证码" name="ValidateCode" v-model="loginForm.ValidateCode" v-validate="'required'" :class="{'is-danger': errors.has('ValidateCode')}" >
					<a @click="getValidateCode" class="button"><img :src="validateCode" /></a>
				</p>
				<span class="help is-danger" v-show="errors.has('ValidateCode')">{{ errors.first('ValidateCode') }}</span>
				<p class="control">
					<label class="checkbox">
						<input type="checkbox">
						记住我
					</label>
				</p>
				<p class="control">
					<button type="submit" class="button is-primary is-fullwidth">登陆</button>
				</p>
			</form>
			<div slot="footer">还没有帐号？ <a href="">马上注册</a></div>
		</modal>
	</div>

</template>

<script>
import api from '../api/index.js'
import { mapActions, mapGetters } from 'vuex'

export default {
	name: 'header',
	components: {

	},
  data() {
    return {
			showlogin: false,
			loginForm: {
				userPwd: '',
				userName: '',
				ValidateCode: '',
				IsFont:1
			},
			validateCode: ''
    }
  },
	props: ['page', 'show'],
	methods: {
		...mapActions([
			'toggleMenu'
		]),
		validateForm(){
			this.$validator.validateAll().then(() => {
				api.login(this.loginForm).then(res => {
					const {msg, result} = res.data;
					if(result!=='ok'){
						this.$notify.warning({content: msg});
						return false;
					}

					this.$notify.success(msg)
				})
			}).catch((error) => {
				console.log(error)
			})
		},
		getValidateCode(){
			this.validateCode = api.validateCode()
		}
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
@import '~bulma/sass/utilities/mixins';

.header{
  &>.nav{
    height: 64px
  }
	.nav-left{
		.nav-item{
			&.is-brand{padding-right: 20px;}
			font-size: 16px;
			padding-left: 15px;
			padding-right: 15px;
		}
	}
}
</style>
