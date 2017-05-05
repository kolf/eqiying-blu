<template>
  <div class="user-page">
    <app-header></app-header>
    <section class="hero is-dark">
      <div class="hero-body">
        <div class="container has-text-centered">
          <p class="title">
            个人中心
          </p>
          <p class="subtitle">
            我们非常乐意倾听您的诉说
          </p>
        </div>
      </div>
    </section>
    <div class="section">
      <div class="container">
        <div class="user-profile">
          <div class="columns">
            <div class="column is-one-quarter">
              <div class="profile-info-left">
                <div class="has-text-centered block">
                  <div class="avatar image is-1by1">
                    <img v-lazy="'http://show.eqiying.com/' + user.PanelOtherInfo1">
                    <upload-avatar :server="upload.server" :api="upload.api" :filename="upload.filename" :params="upload.params" @success="upsuccess" :crop="upload.crop" class="iconfont avatar-upload" :width="upload.width" :height="upload.height" :ok="upload.ok" :cancel="upload.cancel">
                    </upload-avatar>
                  </div>
                  <h1 class="title">{{user.PanelLoginName}}</h1>
                  <textarea class="textarea user-remark" v-model="user.PanelRemark" @blur="updateRemark"></textarea>
                  <!--<p>{{user.PanelRemark}}</p>-->
                </div>
                <aside class="menu">
                  <ul class="menu-list">
                    <li>
                      <router-link to="/user/profile"><i class="iconfont icon-ziliao"></i>个人资料</router-link>
                    </li>
                    <li>
                      <router-link to="/user/projects"><i class="iconfont icon-huodong5050"></i>活动参与记录</router-link>
                    </li>
                    <li>
                      <router-link to="/user/presents"><i class="iconfont icon-lipin"></i>礼品兑换记录</router-link>
                    </li>
                    <li>
                      <router-link to="/user/msgs"><i class="iconfont icon-xiaoxi1"></i>我的私信</router-link>
                    </li>
                    <li>
                      <a @click="showModifyPassword=true"><i class="iconfont icon-Password"></i>修改密码</a>
                    </li>
                    <li><a @click="logout"><i class="iconfont icon-tuichu"></i>退出登陆</a></li>
                    <!--<li><a><i class="iconfont icon-zhuxiao1"></i>注销用户</a></li>-->
                  </ul>
                </aside>
              </div>
  
            </div>
            <div class="column">
              <div class="profile-info-right">
                <router-view></router-view>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <app-footer></app-footer>
    <modify-password :visible="showModifyPassword" @close="reModifyPasswordSuccess"></modify-password>
  </div>
</template>

<script>
import AppHeader from 'components/AppHeader.vue'
import AppFooter from 'components/AppFooter.vue'
import { mapActions, mapGetters } from 'vuex'
import api from 'src/api'
import storage from 'src/utils/localStorage'
import ModifyPassword from 'src/components/modals/ModifyPassword.vue'
import UploadAvatar from 'components/uploadavatar.vue'

export default {
  components: {
    AppHeader,
    AppFooter,
    UploadAvatar,
    ModifyPassword
  },
  data() {
    return {
      // userInfo: {},
      defaultRemark: '',
      upload: {
        server: api.API_ROOT,
        api: 'Handler/common.ashx',
        params: {
          action: 'upPic', savePath: 'upload/avatar'
        },
        preview: true,
        crop: true,
        width: 300,
        height: 300,
        cancel: '取消',
        ok: '裁剪',
        filename: 'avatar'
      },
      showModifyPassword: false
    }
  },
  created() {
    // this.userInfo = storage.get('user')

    // this.userInfo.PanelRemark = this.userInfo.PanelRemark
    // this.defaultRemark = this.userInfo.PanelRemark
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  methods: {
    ...mapActions([
      'toggleLogin',
      'saveUser'
    ]),
    updateRemark() {
      const { PanelRemark, PanelId } = this.user

      if (this.defaultRemark == PanelRemark) {
        return false
      }

      api.updateRemark({ PanelRemark, panelBaseInfoId: PanelId }).then(res => {
        const { msg, result } = res.data
        if (result !== 'ok') {
          this.$notify.warning({ content: msg || '保存用户信息失败' })
          return false
        }

        this.defaultRemark = PanelRemark
        this.saveUser({ PanelRemark })
      }).catch((error) => {
        console.log(error)
      })
    },
    upsuccess(data) {
      this.updateAvatar(data)
    },
    updateAvatar(path) {
      console.log(this.user.PanelId)
      api.updateAvatar({
        headPath: path,
        panelBaseInfoId: this.user.PanelId
      }).then(res => {
        const { msg, result } = res.data
        if (result !== 'ok') {
          this.$notify.warning({ content: msg || '保存用户头像失败' })
          return false
        }

        // this.$set(userInfo, 'PanelOtherInfo1', path)
        // this.userInfo.PanelOtherInfo1 = path

        // storage.set('user', this.userInfo)
        this.saveUser({ PanelOtherInfo1: path })
      }).catch((error) => {
        console.log(error)
      })
    },
    logout() {
      this.toggleLogin(false)
      this.$router.push({ path: '/index' })
    },
    reModifyPasswordSuccess() {
      this.showModifyPassword = false
    }
  }
}
</script>

<style lang="scss" scoped>
.user {
  &-banner {
    background-image: url(../assets/startup-banner-3c5415c78064da11455c3ab9b352e04c.jpg);
    background-position: center;
  }
  &-remark {
    background-color: #eee;
    border-color: #eee;
    height: 100px;
    border-radius: 4px;
    min-height: 100px;
    resize: none;
  }
}

.user-profile {
  // padding-bottom: 30px;
}

.profile-header-background {
  margin: -40px 0 15px 0;
}

.profile-header-background img {
  width: 100%;
  height: 310px;
}

.profile-info-left {
  position: relative;
  top: -62px;
  .avatar {
    border: 4px solid #fff;
    border-radius: 6px;
    margin-bottom: 10px; // overflow: hidden;
    // max-width: 240px;
    // display: inline-block;
  }
}

.avatar {
  .upload {
    position: absolute !important;
    left: 0;
    top: 0
  }
  &-upload {
    background-color: rgba(0, 0, 0, 0);
    font-size: 0;
    transition: background-color .2s;
    &:hover {
      background-color: rgba(0, 0, 0, .4);
      font-size: 50px;
    }
    &:after {
      content: "\e617";
      display: inline-block;
      color: #fff;
      margin-top: 50%;
      position: relative;
      top: -35px
    }
  }
}

.profile-info-left h2 {
  margin-bottom: 30px;
}

.profile-info-right {
  // padding: 30px 0;
  // background-color: transparent;
}

@media screen and (max-width: 768px) {
  .profile-info-right {
    position: relative;
    top: -50px;
  }
}
</style>
