<template>
	<!--<section class="footer">
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
									  </section>-->
	
	<div class="footer">
		<section class="hero is-dark">
			<div class="hero-body">
				<div class="container">
					<div class="columns">
						<div class="column is-half">
							<p class="title">
								一起赢生活社区
							</p>
							<p class="subtitle">
								我们非常乐意倾听您的诉说
							</p>
							<p>本社区是一种新的消费者分享其购物经验和想法的方式，这种方式也帮助我们准确了解消费者的所看所想，站在消费者的角度创造更好的购物环境和体验。 </p>
							<p>每天你都面临着很多不同的选择，不仅仅只是在超市，你生活当中的每一刻可能都需要作出不同的选择。在这个社区里面，我们会定期发送问卷调查到你，以便我们更好的了解您喜欢什么，不喜欢什么。什么对于您来说是重要的。这些信息都将指导我们未来更好的服务于您。</p>
						</div>
						<div class="column is-half has-text-right">
							<div class="icons">
								<a href=""><i class="iconfont icon-youjian1"></i></a>
								<a href=""><i class="iconfont icon-weixin1"></i></a>
								<a href=""><i class="iconfont icon-weibo1"></i></a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<div class="footer-bar">
			<div class="container">
				<div class="columns">
					<div class="column is-half">
						<div class="links">
							<a href="#">网站声明</a>
							<a href="#">隐私保护条款</a>
							<a href="#">联系我们</a>
							<a href="#">积分兑换规则</a>
						</div>
					</div>
					<div class="column is-half has-text-right">
						Copyright © 2016 XXXXX Inc. All Rights Reserved
					</div>
				</div>
			</div>
		</div>
	</div>
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

<style lang="scss" scoped>
.footer {
	background-color: #363636;
	padding: 0;
	.hero-body {
		padding: 50px 20px 70px 20px;
	}
	a {
		border-bottom: none !important;
		color: #999;
		&:hover {
			color: #7a7a7a !important;
		}
	}

	p {
		margin-top: 10px; // text-indent: 2em
		color: #999
	}
	&-bar {
		background: #000;
		padding: 0 20px;
	}
}

.icons {
	padding-bottom: 10px; // text-align: right;
	&>a {
		// color:#999;
		margin: 1em;
		.iconfont {
			font-size: 4em;
		}
	}
}

.links {
	// text-align: center;
	// padding: 10px 0;
	a {
		display: inline-block;
		padding: 0 4px;
	}
}
</style>
