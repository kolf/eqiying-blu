<template>
	<section class="footer">
		<div class="container">
			<div class="has-text-centered">
				<div class="icons">
					<a href=""><i class="iconfont icon-youjian1"></i></a>
					<a href=""><i class="iconfont icon-weixin1"></i></a>
					<a href=""><i class="iconfont icon-weibo1"></i></a>
				</div>
				<div class="links">
					<a href="#">网站声明</a>
					<a href="#">隐私保护条款</a>
					<a href="#">联系我们</a>
					<a href="#">积分兑换规则</a>
				</div>
				<p class="copyright">
					Copyright © 2016 XXXXX Inc. All Rights Reserved
				</p>
			</div>
		</div>
  </section>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>

<style lang="scss">
.footer a:not(.icon), .footer a:visited:not(.icon){
	border-bottom: none;
	text-decoration: none;
	&:hover{
		color: #999
	}
}
	.footer{
		background-color: #333;
	}
	.icons{
		padding-bottom: 10px;
		&>a{
			color:#999;
			margin: 1em;
			.iconfont{
				font-size: 4em;
			}
		}
	}
	.links{
		// text-align: center;
		padding: 10px 0;
		a{
			display: inline-block;
			color: #999;
			padding: 0 10px;
		}
	}
</style>
