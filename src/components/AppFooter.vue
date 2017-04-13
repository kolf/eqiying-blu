<template>
	<section class="hero is-dark">
      <div class="hero-body">
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
      </div>
    </section>
	<!-- <footer class="footer">
  <div class="container">
    <div class="has-text-centered">
      <p>
        <strong>Bulma</strong> by <a href="http://jgthms.com">Jeremy Thomas</a>. The source code is licensed
        <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The website content
        is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC ANS 4.0</a>.
      </p>
      <p>
        Copyright © 2016 XXXXX Inc. All Rights Reserved
      </p>
    </div>
  </div>
</footer> -->
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
	.footer{
		background-color: #000;
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
