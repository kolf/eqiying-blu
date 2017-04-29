<template>
  <div class="section is-gray">
    <div class="container">
      <div class="section">
        <div class="columns is-desktop">
          <form @submit.prevent="validateForm" class="column is-4 is-offset-4">
            <h1 class="title">登陆</h1>
            <label class="label">用户名</label>
            <p class="control">
              <input class="input" type="text" placeholder="请输入您的用户名" name="userName" v-model="loginForm.userName" v-validate="'required'" :class="{'is-danger': errors.has('userName')}">
              <span class="help is-danger" v-show="errors.has('userName')">{{ errors.first('userName') }}</span>
            </p>
            <label class="label">密码</label>
            <p class="control">
              <input class="input" type="password" placeholder="请输入您的密码" name="userPwd" v-model="loginForm.userPwd" v-validate="'required'" :class="{'is-danger': errors.has('userPwd')}">
              <span class="help is-danger" v-show="errors.has('userPwd')">{{ errors.first('userPwd') }}</span>
            </p>
            <label class="label">验证码</label>
            <p class="control has-addons validateCode-input">
              <input class="input" type="text" placeholder="请输入验证码" name="ValidateCode" v-model="loginForm.ValidateCode" v-validate="'required'" :class="{'is-danger': errors.has('ValidateCode')}">
              <a @click="getValidateCode" class="button"><img :src="validateCode" /></a>
            </p>
            <span v-show="errors.has('ValidateCode')" class="help is-danger">{{ errors.first('ValidateCode') }}</span>
            <p class="control pad-h">
              <button type="submit" class="button is-primary is-fullwidth">登陆</button>
            </p>
            <p class="control">
              <a @click="showModal">忘记密码？</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  
    <modal title="忘记密码" transition="fadeDown" :is-show="isShowModal" @close="hideModal" :show-footer="false">
      <steps :current="0" type="line" prev-text="上一步" next-text="下一步">
        <step title="输入邮箱" description="输入您注册时的邮箱">
          <div class="columns pad-h">
            <div class="column is-8 is-offset-2">
              <label class="label">邮箱</label>
              <p class="control">
                <input class="input" type="text" placeholder="请输入邮箱">
              </p>
            </div>
          </div>
        </step>
        <step title="输入密码" description="输入更改后的密码">
          <div class="columns pad-h">
            <div class="column is-8 is-offset-2">
              <label class="label">验证码</label>
              <p class="control">
                <input class="input" type="text" placeholder="请输入邮箱">
              </p>
              <label class="label">新密码</label>
              <p class="control">
                <input class="input" type="text" placeholder="请输入邮箱">
              </p>
              <label class="label">确认新密码</label>
              <p class="control">
                <input class="input" type="text" placeholder="请输入邮箱">
              </p>
            </div>
          </div>
        </step>
        <step title="设置成功" description="重置成功">
          <p>3.好雨知时节，当春乃发生。随风潜入夜，润物细无声</p>
        </step>
      </steps>
    </modal>
  </div>
</template>

<script>
import api from '../api/index.js'
import storage from 'src/utils/localStorage'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'login',
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
      isShowModal: false,
      curPresent: {}
    }
  },

  created() {
    this.validateCode = api.validateCode()
  },
  methods: {
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

          this.getUserInfo((userInfo) => {
            storage.set('user', userInfo)
            storage.set('isLogin', 1)
            this.$notify.success({ content: msg })
            this.$router.push({ path: '/projects' })
          })
        }).catch((error) => {
          this.getValidateCode();
        })
      })
    },
    getValidateCode() {
      this.validateCode = api.validateCode()
    },
    getUserInfo(cb) {
      api.getUserInfo().then(res => {
        const { msg, result, data } = res.data;
        if (result !== 'ok') {
          this.$notify.warning({ content: msg || '获取用户信息失败，请重新登陆' });
          return false;
        }

        cb && cb(data.panelBaseInfo)
      })
    },
    showModal() {
      this.isShowModal = true
    },
    hideModal() {
      this.isShowModal = false
    }
  }
}
</script>

<style lang="scss">
.validateCode-input {
  margin-bottom: 0 !important;
  &>.input {
    margin-right: 0 !important;
  }
  &>.button {
    border: none;
    &:active {
      box-shadow: none
    }
  }
}
</style>
