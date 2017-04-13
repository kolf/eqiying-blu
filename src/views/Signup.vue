<template>
  <div class="section is-gray">
      <div class="container">
        <div class="section">
          <div class="columns is-desktop">
            <form @submit.prevent="validateForm" class="column is-6 is-offset-3">
              <h1 class="title">注册</h1>
              <div class="content">
                <p>‘乐’享生活社区是一个消费者们分享购物体验和心得的调研平台。在这里通过参与在线调研，您不但可以尽情分享自己的看法，而且会获得一定的奖励。这也更有助于我们为大家提供更好的购物服务。在这个平台上，我们不会对您进行任何推销。 我们定期将通过邮件向您发送调研邀请，只需几分钟即可完成调研。成功完成后， 您会获得相应的‘乐’享生活社区积分，这些积分能够兑换相应价值的电话充值卡！</p>
             <p>嗨！只需要短短一分钟的时间既可让您在社区上注册。仅仅需要一个用户名、一个密码以及一个电子邮件地址。
如已注册，则可以在此登录。</p>
              </div>
              <label class="label">会员类型</label>
              <p class="control">
                <label class="radio">
                  <input type="radio" name="type" value="0" v-model="userForm.PanelType">
                  乐购
                </label>
                <label class="radio">
                  <input type="radio" name="type" value="3" v-model="userForm.PanelType">
                  华润
                </label>
                <label class="radio">
                  <input type="radio" name="type" value="4" v-model="userForm.PanelType">
                  苏果
                </label>
                <label class="radio">
                  <input type="radio" name="type" value="To00001" v-model="userForm.PanelType">
                  Tesco会员
                </label>
                <label class="radio">
                  <input type="radio" name="type" value="1" v-model="userForm.PanelType">
                  非会员
                </label>
              </p>
              <label class="label">登录名</label>
              <p class="control">
                <input name="PanelLoginName" class="input" :class="{'is-danger': errors.has('PanelLoginName')}" type="text" v-model="userForm.PanelLoginName" v-validate="'required'" placeholder="请输入登录名">
                <span class="help is-danger" v-show="errors.has('PanelLoginName')">{{ errors.first('PanelLoginName') }}</span>
              </p>
              <label class="label">密码</label>
              <p class="control">
                <input name="password" class="input" :class="{'is-danger': errors.has('password')}" type="password" v-model="userForm.PanelPw" v-validate="'required'" placeholder="请填写密码">
                <span class="help is-danger" v-show="errors.has('password')">{{ errors.first('password') }}</span>
              </p>
              <label class="label">确认密码</label>
              <p class="control">
                <input name="rePassword" :class="{'is-danger': errors.has('rePassword')}" v-model="userForm.RPanelPw" v-validate="'required'" type="password" class="input" placeholder="请填写确认密码">
                <span class="help is-danger" v-show="errors.has('password')">{{ errors.first('rePassword') }}</span>
              </p>
              <label class="label">电子邮件</label>
              <p class="control">
                <input name="emall" :class="{'is-danger': errors.has('emall')}" v-model="userForm.PanelEmail" v-validate="'required'" type="email" class="input" placeholder="请填写电子邮件">
                <span class="help is-danger" v-show="errors.has('emall')">{{ errors.first('emall') }}</span>
              </p>
              <label class="label">会员卡号</label>
              <p class="control">
                <input type="text" v-model="userForm.PanelCode" class="input" placeholder="请填写会员卡号">
              </p>
              <label class="label">真实姓名</label>
              <p class="control">
                <input type="text" v-model="userForm.PanelRealName" class="input" placeholder="请填写真实姓名">
              </p>
              <label class="label">个人介绍</label>
              <p class="control">
                <textarea type="text" v-model="userForm.PanelRemark" class="input" placeholder="请填写真实姓名" />
              </p>
              <p class="control">
                <button class="button is-primary">提交</button>
                <button class="button is-link">重置</button>
              </p>
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
