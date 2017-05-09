<template>
  <div class="home-page">
    <app-header></app-header>
    <section class="hero is-primary is-large">
      <div class="banner index-banner"></div>
      <!--<img src="../assets/index.jpg" alt="">-->
    </section>
    <div class="section announcement-section">
      <div class="container">
        <announcements :list="sysMsgs"></announcements>
      </div>
    </div>
    <div class="section is-gray">
      <div class="container">
        <div class="columns has-text-centered">
          <div class="column">
            <div class="feature feature-1">
              <h2 class="title feature-title">活动专区 <small>Activity zone</small></h2>
              <div class="box">
                <i class="iconfont icon--3"></i>
                <i class="iconfont icon--7"></i>
                <i class="iconfont icon--6"></i>
                <i class="iconfont icon--5"></i>
                <i class="iconfont icon--4"></i>
                <i class="iconfont icon--8"></i>
              </div>
              <p class="text">丰富的活动等你来参加还可以获得积分哟</p>
              <router-link class="button" to="/projects">点击进入</router-link>
            </div>
          </div>
          <div class="column">
            <div class="feature feature-2">
              <h2 class="title feature-title">积分商城 <small>Points mall</small></h2>
              <div class="box">
                <i class="iconfont icon--1 i1"></i>
                <i class="iconfont icon--1 i2"></i>
                <i class="iconfont icon--1 i3"></i>
                <i class="i4"></i>
                <i class="i5"></i>
              </div>
              <p class="text">丰富的活动等你来参加还可以获得积分哟</p>
              <router-link class="button" to="/presents">点击进入</router-link>
            </div>
          </div>
          <div class="column">
            <div class="feature feature-3">
              <h2 class="title feature-title">个人中心 <small>Personal center</small></h2>
              <div class="box">积分<small>Integral</small>活跃度<small>Activity</small></div>
              <div class="user-icon"><i class="iconfont icon--2"></i></div>
              <p class="text">丰富的活动等你来参加还可以获得积分哟</p>
              <div class="bg"></div>
              <router-link class="button" to="/user/profile">点击进入</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="section steps-section">
      <div class="container has-text-centered">
        <div class="steps-header box">
          <h1 class="title">活动参与流程</h1>
          <h2 class="subtitle">Activities involved in the process</h2>
        </div>
        <ul class="steps columns is-multiline is-mobile">
          <li class="column is-half-mobile step-item">
            <h3 class="step-title">发送邀请 <span>点击发送邀请</span></h3>
            <i class="iconfont icon-fasongyaoqing"></i>
          </li>
          <li class="column is-half-mobile step-item">
            <h3 class="step-title">参与活动 <span>查看活动并参与</span></h3>
            <i class="iconfont icon-canyuhuodong"></i>
          </li>
          <li class="column is-half-mobile step-item">
            <h3 class="step-title">获取积分 <span>根据规则获取积分</span></h3>
            <i class="iconfont icon-huoqujifen"></i>
          </li>
          <li class="column is-half-mobile step-item">
            <h3 class="step-title">积分兑换 <span>使用积分兑换礼品</span></h3>
            <i class="iconfont icon-jifenduihuan"></i>
          </li>
          <li class="column is-half-mobile step-item">
            <h3 class="step-title">礼品审核 <span>管理员进行审核</span></h3>
            <i class="iconfont icon-lipinshenhe"></i>
          </li>
          <li class="column is-half-mobile step-item">
            <h3 class="step-title">礼品发放 <span>礼品发放</span></h3>
            <i class="iconfont icon-lipinfafang"></i>
          </li>
        </ul>
      </div>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script>
import api from 'src/api/index.js'
import AppHeader from 'components/AppHeader.vue'
import AppFooter from 'components/AppFooter.vue'
import Announcements from 'components/Announcements.vue'

export default {
  components: {
    AppHeader,
    AppFooter,
    Announcements
  },
  data() {
    return {
      sysMsgs: [],
    }
  },
  beforeMount() {
    this.queryAnnouncement()
  },
  methods: {
    queryAnnouncement() {
      api.queryAnnouncement().then(res => {
        const { msg, result, data } = res.data
        if (result !== 'ok') {
          this.$notify.warning({ content: msg })
          return false
        }

        this.sysMsgs = data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~bulma/sass/utilities/mixins';
$primary: #6bafdc;

.announcement {
  &-section {
    padding: 10px 20px;
  }
}

.feature {
  padding-top: 450px;
  width: 100%;
  background-color: #fff;
  position: relative;
  overflow: hidden;
  height: 0; // box-shadow: 0 8px 20px #eee;
  border-radius: 4px;
  &-title {
    font-size: 36px;
    position: absolute;
    width: 100%;
    top: 16%;
    small {
      display: block;
      font-size: 20px;
      color: #999;
      margin-top: 10px
    }
  }
  &-1 {
    transition: all .3s;
    &:hover {
      background-color: #6bafdc;
      .title {
        transition: all .3s;
        color: #eee;
        top: 10%;
        small {
          color: #eee;
        }
      }
      .box {
        background-color: transparent;
        border: none;
        box-shadow: 0 0 0 #fff;
      }
      .iconfont {
        top: -70px !important;
        color: #eee !important;
        &.icon--3 {
          opacity: 0;
          color: #fff;
          top: 400px !important;
        }
        &.icon--5 {
          left: 60px !important;
        }
        &.icon--7 {
          left: 160px !important;
        }
      }
      .text {
        top: 250px;
      }
      .button {
        top: 350px;
      }
    }
    .text {
      position: absolute;
      transition: all .3s;
      color: #eee;
      font-size: 20px;
      width: 100%;
      padding: 0 40px;
    }
    .button {
      position: absolute;
      transition: all .4s; // top: -100px;
      width: 80%;
      left: 10%;
      height: 50px;
      font-size: 18px;
      border: none;
    }
    .box {
      margin-top: -68%;
      border: 6px solid #fff;
      box-shadow: 0 0 30px #b0defb;
      width: 270px;
      height: 270px; // width: 80%;
      // box-sizing: border-box;
      // padding: 80% 0 0 0;
      background-color: #eee;
      display: inline-block;
      border-radius: 50%;
      position: relative;
      .iconfont {
        transition: all .3s;
        position: absolute;
        font-size: 40px;
        color: #cacaca;

        &.icon--6 {
          left: 10px;
          top: 100px;
        }
        &.icon--5 {
          left: 38px;
          top: 32px;
        }
        &.icon--7 {
          left: 180px;
          top: 32px;
        }
        &.icon--8 {
          left: 208px;
          top: 100px;
        }
        &.icon--4 {
          left: 110px;
          top: 0px;
        }
        &.icon--3 {
          font-size: 160px;
          left: 53px;
          top: 18px;
          color: #6bafdc
        }
      }
    }
  }
  &-2 {
    transition: all .3s;
    .text {
      position: absolute;
      transition: all .3s;
      color: #eee;
      font-size: 20px;
      width: 100%;
      padding: 0 40px;
    }
    .button {
      position: absolute;
      transition: all .4s; // top: -100px;
      width: 80%;
      left: 10%;
      height: 50px;
      font-size: 18px;
      border: none;
    }
    &:hover {
      background-color: #6bafdc;
      .title {
        transition: all .3s;
        color: #eee;
        top: 10%;
        small {
          color: #eee;
        }
      }
      .box {
        &>* {
          transition: all .3s;
        }
        .i2 {
          transform: rotate(0deg);
          color: #fff;
          font-size: 100px;
          top: -117px;
          left: 110px;
        }
        .i4 {
          left: -260px;
          top: 200px;
        }
        .i5 {
          left: 320px;
          top: 200px;
        }
      }
      .text {
        top: 250px;
      }
      .button {
        top: 350px;
      }
    }
    .box {
      position: absolute;
      top: 230px;
      left: 0;
      width: 100%;
      background-color: transparent;
      .i1,
      .i2,
      .i3 {
        font-size: 80px;
        color: $primary;
        position: absolute;
      }
      .i1 {
        left: 28px;
        transform: rotate(10deg);
        top: 26px;
      }
      .i2 {
        top: -3px;
        font-size: 120px;
        transform: rotate(-20deg);
        left: 100px;
      }
      .i3 {
        transform: rotate(10deg);
        left: 223px;
      }
      .i4,
      .i5 {
        width: 260px;
        height: 260px;
        background: url(../assets/c.png);
        background-size: cover;
        position: absolute;
        top: 80px
      }
      .i4 {
        left: -60px;
      }
      .i5 {
        width: 400px;
        height: 400px;
        top: 20px;
        left: 90px
      }
    }
  }
  &-3 {
    transition: all .3s;
    &:hover {
      background-color: #6bafdc;
      .title {
        transition: all .3s;
        top: 10%;
        color: #eee;
        small {
          color: #eee;
        }
      }
      .user-icon {
        transition: all .3s;
        margin-top: -98%;
        .icon--2 {
          color: #eee;
          font-size: 100px;
        }
      }
      .text {
        transition: all .3s;
        top: 250px;
      }
      .button {
        transition: all .3s;
        top: 350px;
      }
      .bg {
        transition: all .3s;
        top: 600px;
      }
      .box {
        transition: all .3s;
        top: 500px;
      }
    }
    .user-icon {
      margin-top: -60%;
      .icon--2 {
        color: #6bafdc;
        font-size: 160px;
        line-height: 1;
      }
    }
    .text {
      position: absolute;
      transition: all .3s;
      color: #eee;
      font-size: 20px;
      width: 100%;
      padding: 0 40px;
    }
    .button {
      position: absolute;
      transition: all .4s; // top: -100px;
      width: 80%;
      left: 10%;
      height: 50px;
      font-size: 18px;
      border: none;
    }
    .box {
      position: absolute;
      background-color: transparent;
      text-align: right;
      width: 100%;
      right: 0;
      top: 305px;
      font-size: 20px;
      z-index: 10;
      small {
        font-size: 20px;
        display: block;
        color: #999;
      }
    }

    .bg {
      z-index: 9;
      background-color: #eee;
      position: absolute;
      width: 400px;
      height: 400px;
      left: 30px;
      top: 330px;
      transform: rotate(71deg);
      box-shadow: 0 0 30px #7fc0e8;
    }
  }
} // <i class="iconfont icon--3"></i>
// <i class="iconfont icon--7"></i>
// <i class="iconfont icon--6"></i>
// <i class="iconfont icon--5"></i>
// <i class="iconfont icon--4"></i>
// <i class="iconfont icon--8"></i>
.index {
  &-banner {
    background-image: url(../assets/index.jpg);
    // background-size: cover;
    height: 600px;
    @include mobile {
      height: 200px;
    }
  }
}

.steps {
  padding-bottom: 20px;
  margin: 0 -20px;
}

.step {
  &-item {
    color: #999;
    position: relative;
    &:last-child {
      &:before {
        content: ''
      }
    } // &:before{
    //   content: "\F105";
    //   font: normal normal normal 30px/1 FontAwesome;
    //   position: absolute;
    //   margin-top: -10px;
    //   right:0;
    //   top:50%;
    // }
    .iconfont {
      font-size: 120px;
      line-height: 1;
      color: $primary
    }
  }
  &-title {
    font-size: 20px;
    margin-bottom: 10px;
    color: #333;
    &>span {
      display: block;
      font-size: 14px;
      color: #999
    }
  }
}
</style>
