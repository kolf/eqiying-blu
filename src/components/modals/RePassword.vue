<template>
  <modal title="重置密码" transition="fadeDown" :is-show="visible" @close="close">
    <form @submit.prevent="validateForm()" class="pad-h is-10 column is-offset-1">
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

          this.$notify.success({ content: msg || '重置密码已成功发至您的邮箱！' })
        }).catch((error) => {
          console.log(error)
        })
      })
    },
    getValidateCode() {
      this.validateCode = api.validateCode()
    },
  }
}
</script>
<style lang="scss" scoped>

</style>