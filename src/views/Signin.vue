<template>
  <section class="hero is-fullheight is-light">
    <div class="hero-head">
      <div class="header">
        <nav class="nav">
          <div class="container">
            <div class="nav-left">
              <router-link class="nav-item is-brand" to="/index">
                <img src="../assets/logo.png" alt="E起赢">
              </router-link>
            </div>
            <span class="nav-toggle" :class="{'is-active': device.isMobile && menu.opened}" @click="toggleMenu(!menu.opened)">
              <span></span>
              <span></span>
              <span></span>
            </span>
            <div class="nav-right nav-menu" :class="{'is-active': device.isMobile && menu.opened}">
              <span class="nav-item is-tab"><router-link class="" to="/signup">注册</router-link></span>
              <span class="nav-item is-tab"><router-link class="button is-primary" to="/signin">登陆</router-link></span>
            </div>
          </div>
        </nav>
      </div>
    </div>
    <div class="hero-body">
      <div class="container">
        <div class="columns is-vcentered">
          <div class="column is-10 is-offset-1">
            <div class="columns section">
              <form @submit.prevent="validateForm" class="column is-6 is-offset-3">
                <h1 class="title has-text-centered">登陆</h1>
                <label class="label">用户名</label>
                <p class="control">
                  <input class="input" type="text" placeholder="请输入您的用户名" name="name" v-model="loginForm.userName" v-validate="'required'" :class="{'is-danger': errors.has('name')}">
                  <span class="help is-danger" v-show="errors.has('name')">{{ errors.first('name') }}</span>
                </p>
                <label class="label">密码</label>
                <p class="control">
                  <input class="input" type="password" placeholder="请输入您的密码" name="password" v-model="loginForm.userPwd" v-validate="'required'" :class="{'is-danger': errors.has('password')}">
                  <span class="help is-danger" v-show="errors.has('password')">{{ errors.first('password') }}</span>
                </p>
                <label class="label">验证码</label>
                <p class="control has-addons validateCode-input">
                  <input class="input" type="text" placeholder="请输入验证码" name="ValidateCode" v-model="loginForm.ValidateCode" v-validate="'required'" :class="{'is-danger': errors.has('ValidateCode')}">
                  <a @click="getValidateCode" class="button"><img :src="validateCode" /></a>
                </p>
                <span v-show="errors.has('ValidateCode')" class="help is-danger">{{ errors.first('ValidateCode') }}</span>
                <hr>
                <p class="control">
                  <button type="submit" class="button is-primary is-fullwidth is-medium">登陆</button>
                </p>
                <p class="control">
                  <a @click="showRepassword=true">忘记密码？</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
  
    </div>
    <div class="hero-foot">
      <footer class="footer">
        <div class="container">
          <div class="content has-text-centered">
            Copyright © 2016 EQYING Inc. All Rights Reserved 京ICP备14016765号-2
          </div>
        </div>
      </footer>
    </div>
    <re-password :visible="showRepassword" @close="rePasswordSuccess"></re-password>
  </section>
</template>

<script>
import api from 'src/api/index.js'
import storage from 'src/utils/localStorage'
import RePassword from 'src/components/modals/RePassword.vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'login',
  components: {
    RePassword
  },
  data() {
    return {
      showlogin: false,
      loginForm: {
        userPwd: '',
        userName: '',
        ValidateCode: '',
        IsFont: 1
      },
      validateCode: '',
      showRepassword: false,
      curPresent: {}
    }
  },
  computed: {
    ...mapGetters({
      current: 'current',
      device: 'device',
      menu: 'menu'
    })
  },
  created() {
    this.getValidateCode()
  },
  methods: {
    ...mapActions([
      'toggleLogin',
      'saveUser',
      'toggleMenu'
    ]),
    validateForm() {
      this.$validator.validateAll().then(() => {
        // this.login(this.loginForm)
        api.login(this.loginForm).then(res => {
          const { msg, result } = res.data;
          if (result !== 'ok') {
            this.$notify.warning({ content: msg });
            this.getValidateCode();
            return false;
          }

          this.getUserInfo()
        }).catch((error) => {
          this.getValidateCode();
        })
      })
    },
    getValidateCode() {
      this.validateCode = api.validateCode()
    },
    getUserInfo() {
      api.getUserInfo().then(res => {
        const { msg, result, data } = res.data;
        if (result !== 'ok') {
          this.$notify.warning({ content: msg || '获取用户信息失败，请重新登陆' });
          return false;
        }

        this.saveUser(data.panelBaseInfo)
        this.toggleLogin(true)
        // this.$notify.success({ content: '登陆成功' })
        this.$router.push({ path: '/projects' })
      })
    },
    showModal() {
      this.isShowModal = true
    },
    hideModal() {
      this.isShowModal = false
    },
    rePasswordSuccess() {
      this.showRepassword = false
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
