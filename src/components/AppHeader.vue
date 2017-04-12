<template>
	<div class="header">
		<nav class="nav has-shadow">
			<div class="container">
				<div class="nav-left">
					<a class="nav-item is-brand">
						<img src="http://bulma.io/images/bulma-logo.png" alt="Bulma logo">
					</a>
					<router-link class="nav-item is-tab is-hidden-mobile" to="/index"><a>首页</a></router-link>
					<router-link class="nav-item is-tab is-hidden-mobile" to="/projects"><a>活动专区</a></router-link>
					<router-link class="nav-item is-tab is-hidden-mobile" to="/mall"><a>积分商城</a></router-link>
					<router-link class="nav-item is-tab is-hidden-mobile" to="/user"><a>个人中心</a></router-link>
				</div>
				<span class="nav-toggle">
					<span></span>
					<span></span>
					<span></span>
				</span>
				<div class="nav-right nav-menu">
					<a class="nav-item is-tab is-hidden-tablet is-active">首页</a>
					<a class="nav-item is-tab is-hidden-tablet">活动专区</a>
					<a class="nav-item is-tab is-hidden-tablet">积分商城</a>
					<a class="nav-item is-tab is-hidden-tablet">个人中心</a>
					<a class="nav-item is-tab" @click="toggle">
<!-- 						<span class="icon">
			              <i class="fa fa-user-circle"></i>
			            </span>  -->
			            登陆
					</a>
					<a class="nav-item is-tab">注册</a>
				</div>
			</div>
		</nav>
		<modal title="登陆" :on-ok="okCb" :width="320" :is-show="isShow" @close="isShow=false">
			<form>
				<label class="label">用户名</label>
				<p class="control">
					<input class="input" type="text" placeholder="请输入您的用户名">
				</p>
				<label class="label">密码</label>
				<p class="control">
					<input class="input" type="password" placeholder="请输入您的密码">
				</p>
				<label class="label">验证码</label>
				<p class="control">
					<input class="input" type="text" placeholder="请输入验证码">
				</p>
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
export default {
	components: {

	},
  data() {
    return {
			isShow: false
    }
  },
	props: ['page'],
	methods: {
    toggle() {
      this.isShow = !this.isShow;
    },
    okCb() {
      this.$notify.open({
        type: 'success',
        title: `ok回调`,
      });
    },
    cancelCb() {
      this.$notify.open({
        type: 'success',
        title: `cancel回调`,
      });
    },
    okCloseCb() {
      setTimeout(() => {
        this.toggle();
      }, 2000);
    },
  }
}
</script>
