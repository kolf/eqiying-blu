<template>
  <div class="home">
    <section class="hero is-primary is-large">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">
            Large title
          </h1>
          <h2 class="subtitle">
            Large subtitle
          </h2>
        </div>
      </div>
    </section>
    <div class="section is-gray">
      <div class="container">
        <div class="columns">
          <div class="column">
            <p class="notification is-info">Auto</p>
          </div>
          <div class="column">
            <p class="notification is-warning">Auto</p>
          </div>
          <div class="column">
            <p class="notification is-danger">Auto</p>
          </div>
        </div>
      </div>
    </div>
    <div class="section steps-section">
      <div class="container has-text-centered">
        <h2 class="steps-header title box">活动参与流程</h2>
        <ul class="steps columns">
          <li class="column step-item">
            <h3 class="step-title">发送邀请</h3>
            <span class="icon is-large">
  <i class="fa fa-fighter-jet"></i>
</span>
          </li>
          <li class="column step-item">
            <h3 class="step-title">参与活动</h3>
            <span class="icon is-large">
  <i class="fa fa-american-sign-language-interpreting"></i>
</span>
          </li>
          <li class="column step-item">
            <h3 class="step-title">获取积分</h3>
            <span class="icon is-large">
  <i class="fa fa-bitcoin"></i>
</span>
          </li>
          <li class="column step-item">
            <h3 class="step-title">积分兑换</h3>
            <span class="icon is-large">
  <i class="fa fa-pie-chart"></i>
</span>
          </li>
          <li class="column step-item">
            <h3 class="step-title">礼品审核</h3>
            <span class="icon is-large">
  <i class="fa fa-low-vision"></i>
</span>
          </li>
          <li class="column step-item">
            <h3 class="step-title">礼品发放</h3>
            <span class="icon is-large">
  <i class="fa fa-gift"></i>
</span>
          </li>
        </ul>
        <!-- <div class="columns steps">
          <div class="column">发送邀请</div>
          <div class="column">参与活动</div>
          <div class="column">获取积分</div>
          <div class="column">积分兑换</div>
          <div class="column">礼品审核</div>
          <div class="column">礼品发放</div>
        </div> -->

      </div>
    </div>
  </div>
</template>

<script>
import api from '../api/index.js'

export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  created () {
    api.queryAnnounce()
  }
}
</script>

<style lang="scss" scoped>
.notification{
  height: 300px
}
.steps{
  padding-bottom: 20px;
}
.step{
  &-item{
    color: #999;
    position: relative;
    &:last-child{
      &:before{
        content: ''
      }
    }
    &:before{
      content: "\F105";
      font: normal normal normal 30px/1 FontAwesome;
      position: absolute;
      margin-top: -10px;
      right:0;
      top:50%;
    }
    .icon{
      // font-size: 60px;
      color: #fff;
      background-color: #6bafdc;
      border-radius: 50%;
      line-height: 80px;
      height: 80px;
      width: 80px
    }
  }
  &-title{
    font-size: 20px;
    margin-bottom: 20px;
  }
}
</style>
