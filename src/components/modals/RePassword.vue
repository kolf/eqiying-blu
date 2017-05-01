<template>
  <modal title="忘记密码" transition="fadeDown" :is-show="visible" @close="close" :show-header="false" :show-footer="false">
    <steps :current="index" type="line" prev-text="上一步" next-text="下一步" :show-footer="false">
      <step title="输入邮箱" description="输入您注册时的邮箱">
        <form @submit.prevent="validateForm('emailForm')" class="pad-h is-10 column is-offset-1">
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
      </step>
      <step title="输入密码" description="输入更改后的密码">
        <form @submit.prevent="validateForm('passwordForm')" class="pad-h is-10 column is-offset-1">
          <div class="control is-horizontal">
            <div class="control-label">
              <label class="label">原密码</label>
            </div>
            <div class="control">
              <input class="input" type="password" placeholder="请输入原密码" name="orgPasssword" v-model="passwordForm.orgPasssword" v-validate="'required'" :class="{'is-danger': errors.has('orgPasssword')}">
            </div>
          </div>
          <div class="control is-horizontal">
            <div class="control-label">
              <label class="label">新密码</label>
            </div>
            <div class="control">
              <input class="input" type="password" placeholder="请输入新密码" name="newPassword" v-model="passwordForm.newPassword" v-validate="'required'" :class="{'is-danger': errors.has('newPassword')}">
            </div>
          </div>
          <div class="control is-horizontal">
            <div class="control-label">
              <label class="label">确认新密码</label>
            </div>
            <div class="control">
              <input class="input" type="password" placeholder="请再次输入新密码" name="rePassword" v-model="passwordForm.rePassword" v-validate="'required'" :class="{'is-danger': errors.has('rePassword')}">
            </div>
          </div>
        </form>
      </step>
      <step title="设置成功" description="设置成功">
        <p>3.好雨知时节，当春乃发生。随风潜入夜，润物细无声</p>
      </step>
  
      <div class="step-footer has-text-right">
        <button class="button is-primary" @click="handlePrev" v-show="index>0">上一步</button>
        <button class="button is-primary" @click="handleNext">下一步</button>
      </div>
  
    </steps>
  </modal>
</template>
<script>
import api from 'src/api/index.js'
export default {
  props: ['visible'],
  data() {
    return {
      index: 0,
      validateCode: '',
      emailForm: {
        verificationCode: '',
        value: ''
      },
      passwordForm: {
        orgPasssword: '',
        newPassword: '',
        rePassword: ''
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
    handleNext() {
      if (this.index == 0) {
        this.validateForm('emailForm')
      }else if(this.index == 1){
        this.validateForm('passwordForm')
      }
    },
    handlePrev() {
      this.index >= 0 && this.index--
    },
    validateForm(scope) {
      console.log(scope)
      // if (scope === 'emailForm') {
      this.$validator.validateAll(scope).then(() => {
        if (scope === 'emailForm') {
          api.retrievePwd(this.emailForm).then(res => {
            this.getValidateCode()

            const { msg, result } = res.data;
            if (result !== 'ok') {
              this.$notify.warning({ content: msg || '验证失败' });
              return false;
            }

            this.index = 1
          }).catch((error) => {
            console.log(error)
          })
        } else if (scope === 'passwordForm') {
          api.changePwd(this.passwordForm).then(res => {
            const { msg, result } = res.data;
            if (result !== 'ok') {
              this.$notify.warning({ content: msg || '修改失败' });
              return false;
            }

            this.index = 2
          }).catch((error) => {
            console.log(error)
          })
        }
      })
      // }
    },
    getValidateCode() {
      this.validateCode = api.validateCode()
    },
  }
}
</script>
<style lang="scss" scoped>

</style>