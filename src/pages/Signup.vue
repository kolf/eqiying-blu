<template>
  <div class="signup-page">
      <div class="container bg-white">
        <div class="row">
            <div class="col-md-8 col-md-offset-2 pad-h-x2">
              <h2 class="page-title">注册</h2>
              <p>‘乐’享生活社区是一个消费者们分享购物体验和心得的调研平台。在这里通过参与在线调研，您不但可以尽情分享自己的看法，而且会获得一定的奖励。这也更有助于我们为大家提供更好的购物服务。在这个平台上，我们不会对您进行任何推销。 我们定期将通过邮件向您发送调研邀请，只需几分钟即可完成调研。成功完成后， 您会获得相应的‘乐’享生活社区积分，这些积分能够兑换相应价值的电话充值卡！</p>
              <p>嗨！只需要短短一分钟的时间既可让您在社区上注册。仅仅需要一个用户名、一个密码以及一个电子邮件地址。
如已注册，则可以在此登录。</p>
              <form @submit.prevent="validateForm">
                <div class="form-group">
                  <label class="control-label" for="radios">会员类型</label>
                  <div class="">
                    <label class="radio-inline">
                      <input type="radio" name="radios" value="0" v-model="userForm.PanelType">乐购
                    </label>
                    <label class="radio-inline">
                      <input type="radio" name="radios" value="3" v-model="userForm.PanelType">华润
                    </label>
                    <label class="radio-inline">
                      <input type="radio" name="radios" value="4" v-model="userForm.PanelType">苏果
                    </label>
                    <label class="radio-inline">
                      <input type="radio" name="radios" value="To00001" v-model="userForm.PanelType">Tesco会员
                    </label>
                    <label class="radio-inline">
                      <input type="radio" name="radios" value="1" v-model="userForm.PanelType">非会员
                    </label>
                  </div>
                </div>
                <div class="form-group" :class="{'has-error': errors.has('PanelLoginName') }">
                  <label>登录名</label>
                  <input name="PanelLoginName" v-model="userForm.PanelLoginName" v-validate="'required'" type="text" class="form-control" placeholder="请填写登录名">
                  <p class="text-danger" v-show="errors.has('PanelLoginName')">{{ errors.first('PanelLoginName') }}</p>
                </div>
                <div class="form-group" :class="{'has-error': errors.has('password') }">
                  <label>密码</label>
                  <input name="password" v-model="userForm.PanelPw" v-validate="'required'" type="password" class="form-control" placeholder="请填写密码">
                  <p class="text-danger" v-show="errors.has('password')">{{ errors.first('password') }}</p>
                </div>
                <div class="form-group" :class="{'has-error': errors.has('rePassword') }">
                  <label>确认密码</label>
                  <input name="rePassword" v-model="userForm.RPanelPw" v-validate="'required'" type="password" class="form-control" placeholder="请填写确认密码">
                  <p class="text-danger" v-show="errors.has('rePassword')">{{ errors.first('rePassword') }}</p>
                </div>
                <div class="form-group" :class="{'has-error': errors.has('emall') }">
                  <label>电子邮件</label>
                  <input name="emall" v-model="userForm.PanelEmail" v-validate="'required'" type="email" class="form-control" placeholder="请填写电子邮件">
                  <p class="text-danger" v-show="errors.has('emall')">{{ errors.first('emall') }}</p>
                </div>
                <div class="form-group">
                  <label>会员卡号</label>
                  <input type="text" v-model="userForm.PanelCode" class="form-control" placeholder="请填写会员卡号">
                </div>
                <div class="form-group">
                  <label>真实姓名</label>
                  <input type="text" v-model="userForm.PanelRealName" class="form-control" placeholder="请填写真实姓名">
                </div>
                <div class="form-group">
                  <label>个人介绍</label>
                  <textarea type="text" v-model="userForm.PanelRemark" class="form-control" placeholder="请填写真实姓名" />
                </div>
                <button type="submit" class="btn btn-primary">提交</button>
              </form>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
import api from '../api/index.js'

export default {
  name: 'signup',
  data () {
    return {
      userForm: {
        PanelLoginName: '',
        PanelPw:'',
        RPanelPw:'',
        PanelEmail: '',
        PanelCode: '',
        PanelRealName: '',
        PanelRemark: '',
        PanelWebId: '1',
        PanelType: 1,
        action: 'panelRegister'
      }
    }
  },

  created(){

  },
  methods: {
    validateForm(){
      this.$validator.validateAll().then(() => {
        api.signup(this.userForm).then(res => {
          const {msg, result} = res.data;
          if(result!=='ok'){
            this.$toasted.error(msg);
            return false;
          }

          this.$toasted.success(msg)
        })
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss">
  .signup{
    &-page{
      padding: 30px 0;
    }
  }
</style>
