<template>
  <modal title="重置密码" transition="fadeDown" :is-show="visible" @close="close" :show-footer="!isSuccess" :show-header="!isSuccess">
    <form @submit.prevent="validateForm()" class="is-10 column is-offset-1" v-if="!isSuccess">
      <div class="control is-horizontal">
        <div class="control-label">
          <label class="label">邮箱</label>
        </div>
        <div class="control">
          <input class="input" type="emall" placeholder="请输入邮箱" name="emall" v-model="emailForm.value" v-validate="'required'" :class="{'is-danger': errors.has('emall')}">
        </div>
      </div>
      <div class="control is-horizontal">
        <div class="control-label">
          <label class="label">验证码</label>
        </div>
        <div class="control  has-addons validateCode-input">
          <input class="input" type="text" placeholder="请输入验证码" name="ValidateCode" v-model="emailForm.verificationCode" v-validate="'required'" :class="{'is-danger': errors.has('ValidateCode')}">
          <a @click="getValidateCode" class="button"><img :src="validateCode" /></a>
        </div>
      </div>
    </form>
    <div v-else class="section msg-box has-text-centered">
      <div class="">
        <i class="iconfont icon-chenggong1 icon is-success"></i>
        <h2 class="title">重置成功</h2>
      </div>
      <div class="content">
        <p class="desc">您的密码已被重置，新密码已发送至您的邮箱，请注意查收！</p>
        <p>
          <!--<a href="" class="button is-outlined is-medium">马上登陆</a>-->
          <a :href="getEmailUrl()" class="button is-primary is-success is-medium" target="_blank">查收邮件</a>
        </p>
      </div>
    </div>
    <div slot="footer"><a class="button" @click="close">取消</a> <a class="button is-primary" @click="validateForm">确定</a></div>
  </modal>
</template>
<script>
import api from 'src/api/index.js'
export default {
  props: ['visible'],
  data() {
    return {
      validateCode: '',
      isSuccess: false,
      emailForm: {
        verificationCode: '',
        value: ''
      }
    }
  },
  created() {
    this.getValidateCode()
  },
  methods: {
    close() {
      this.$emit('close')
    },
    validateForm() {
      // if (scope === 'emailForm') {
      this.$validator.validateAll().then(() => {
        api.retrievePwd(this.emailForm).then(res => {
          this.getValidateCode()

          const { msg, result } = res.data;
          if (result !== 'ok') {
            this.$notify.warning({ content: msg || '验证失败' });
            return false;
          }

          this.isSuccess = true
          // this.$notify.success({ content: msg || '重置密码已成功发至您的邮箱！' })
        }).catch((error) => {
          console.log(error)
        })
      })
    },
    getValidateCode() {
      this.validateCode = api.validateCode()
    },
    getEmailUrl() {
      const { value } = this.emailForm
      return 'http://mail.' + value.split('@')[1]
    },
  }
}
</script>
<style lang="scss" scoped>

</style>