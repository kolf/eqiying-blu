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
								E起赢生活社区
							</p>
							<p class="subtitle">
								一个基于话题讨论的社交网站
							</p>
							<p>在这里你可以畅所欲言，可以发起任何你想讨论的话题，也可以收集你想了解的想法。同时，你也可以随时参与E起赢官方发起的各种话题讨论或活动，发表自己对消费、品牌、服务等等的看法和意见，参与到品牌/产品的调研活动，帮助品牌/产品更好地提升和改善，同时还能赚取相应的积分兑换礼品。
							</p>
							<p>想随时随地引领话题讨论，想让你的想法被更多人了解并接受吗？来到E起赢生活社区，开启你的新生活吧！
							</p>
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
						Copyright © 2016 EQYING Inc. All Rights Reserved
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
			copyright: '京ICP备14016765号-2'
		}
	},
	methods: {

	}
}
</script>

<style lang="scss" scoped>
@import '~bulma/sass/utilities/mixins';

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
		@include mobile(){
			padding-top: 20px;
			padding-bottom: 20px
		}
		.is-half {
			@include mobile() {
				text-align: center;
			}
		}
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
