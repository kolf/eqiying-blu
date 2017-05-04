<template>
  <section class="hero is-fullheight is-light">
    <div class="hero-head">
      <div class="header">
        <nav class="nav">
          <div class="container">
            <div class="nav-left">
              <router-link class="nav-item is-brand" to="/">
                <img src="http://bulma.io/images/bulma-logo.png" alt="Bulma logo">
              </router-link>
            </div>
  
            <div class="nav-right nav-menu">
              <span class="nav-item is-tab"><router-link class="" to="/signup">注册</router-link></span>
              <span class="nav-item is-tab"><router-link class="button is-primary is-hidden-mobile" to="/signin">登陆</router-link></span>
            </div>
          </div>
        </nav>
      </div>
    </div>
    <div class="hero-body">
      <div class="container">
        <div class="columns is-vcentered">
          <div class="column is-10 is-offset-1">
            <div class="columns section" v-if="isSuccess==false">
              <form @submit.prevent="validateForm" class="column is-6 is-offset-3">
                <h1 class="title has-text-centered">注册</h1>
                <div class="field">
                  <label class="label">登录名</label>
                  <p class="control">
                    <input name="PanelLoginName" class="input" :class="{'is-danger': errors.has('PanelLoginName')}" type="text" v-model="userForm.PanelLoginName" v-validate="'required'" placeholder="请输入登录名">
                    <!--<span class="help is-danger" v-show="errors.has('PanelLoginName')">{{ errors.first('PanelLoginName') }}</span>-->
                  </p>
                </div>
                <div class="field">
                  <label class="label">密码</label>
                  <p class="control">
                    <input name="password" class="input" :class="{'is-danger': errors.has('password')}" type="password" v-model="userForm.PanelPw" v-validate="'required'" placeholder="请填写密码">
                    <!--<span class="help is-danger" v-show="errors.has('password')">{{ errors.first('password') }}</span>-->
                  </p>
                </div>
                <div class="field">
                  <label class="label">确认密码</label>
                  <p class="control">
                    <input name="rePassword" :class="{'is-danger': errors.has('rePassword')}" v-model="userForm.RPanelPw" v-validate="'required'" type="password" class="input" placeholder="请填写确认密码">
                    <!--<span class="help is-danger" v-show="errors.has('password')">{{ errors.first('rePassword') }}</span>-->
                  </p>
                </div>
                <div class="field">
                  <label class="label">手机号</label>
                  <p class="control">
                    <input name="mobile" :class="{'is-danger': errors.has('mobile')}" v-model="userForm.PanelMobile" v-validate="'required'" type="number" class="input" placeholder="请填写手机号">
                    <!--<span class="help is-danger" v-show="errors.has('emall')">{{ errors.first('emall') }}</span>-->
                  </p>
                </div>
                <div class="field">
                  <label class="label">电子邮件</label>
                  <p class="control">
                    <input name="emall" :class="{'is-danger': errors.has('emall')}" v-model="userForm.PanelEmail" v-validate="'required'" type="email" class="input" placeholder="请填写电子邮件">
                    <!--<span class="help is-danger" v-show="errors.has('emall')">{{ errors.first('emall') }}</span>-->
                  </p>
                </div>
                <div class="field">
                  <label class="label">真实姓名</label>
                  <p class="control">
                    <input type="text" v-model="userForm.PanelRealName" class="input " placeholder="请填写真实姓名">
                  </p>
                </div>
                <div class="field">
                  <label class="label">生日</label>
                  <p class="control">
                    <span class="select">
                                              <select :class="{'is-danger': errors.has('year')}" name="year" v-model="ageVal.year" v-validate="'required'" @change="changeAge('year')">
                                                <option value="">请选择年</option>
                                                <option :value="item" v-for="(item, index) in ageOptons.year">{{item}}</option>
                                              </select>
                                            </span>
                    <span class="select">
                                              <select :class="{'is-danger': errors.has('month')}" name="month" v-model="ageVal.month" v-validate="'required'" @change="changeAge('month')">
                                                <option value="">请选择月</option>
                                                <option :value="item" v-for="(item, index) in ageOptons.month">{{item}}</option>
                                              </select>
                                            </span>
                    <span class="select">
                                              <select :class="{'is-danger': errors.has('day')}" name="day" v-model="ageVal.day" v-validate="'required'" >
                                                <option value="">请选择日</option>
                                                <option :value="item" v-for="(item, index) in ageOptons.day">{{item}}</option>
                                              </select>
                                            </span>
                  </p>
                </div>
                <div class="field">
                  <label class="label">性别</label>
                  <p class="control">
                    <!--<input type="text" name="sex" :class="{'is-danger': errors.has('sex')}" v-model="userForm.PanelSex" v-validate="'required'" class="input" placeholder="请填写真实姓名">-->
                    <radio-group v-model="userForm.PanelGender">
                      <radio val="1">男</radio>
                      <radio val="2">女</radio>
                    </radio-group>
                  </p>
                </div>
                <div class="field">
                  <label class="label">所在城市</label>
                  <p class="control">
                    <span class="select" style="width:150px">
                                                    <select :class="{'is-danger': errors.has('Panelprovince')}" name="Panelprovince" v-validate="'required'" v-model="userForm.Panelprovince" @change="queryByParenterCode(userForm.Panelprovince)">
                                                      <option value="">请选择省</option>
                                                      <option :value="item.value" v-for="(item, index) in provinceOptions">{{item.label}}</option>
                                                    </select>
                                                  </span>
                    <span class="select" style="width:150px">
                                                    <select :class="{'is-danger': errors.has('PanelCity')}" name="PanelCity" v-model="userForm.PanelCity" v-validate="'required'" >
                                                      <option value="">请选择市</option>
                                                      <option :value="item.value" v-for="(item, index) in cityOptions">{{item.label}}</option>
                                                    </select>
                                                  </span>
                    <!--<span class="help" v-show="errors.has('PanelCity')">{{ errors.first('PanelCity') }}</span>-->
                  </p>
                </div>
                <div class="field">
                  <label class="label">个人介绍</label>
                  <p class="control">
                    <textarea type="text" row="3" v-model="userForm.PanelRemark" class="textarea" placeholder="请填写个人介绍" />
                  </p>
                  <p class="control">
                    <button class="button is-primary">提交</button>
                    <button class="button">重置</button>
                  </p>
                </div>
              </form>
            </div>
            <div v-else class="section success-box has-text-centered">
              <div class="success-heading">
                <i class="iconfont icon-chenggong1 success-icon"></i>
                <h2 class="title">注册成功</h2>
              </div>
              <div class="content">
                <p class="success-desc">您已成功注册一起赢生活社区，请在24小时内点击下面的“验证邮箱”按钮，完成注册过程。</p>
                <p>
                  <a href="" class="button is-outlined is-medium">马上登陆</a>
                  <a :href="getEmailUrl()" class="button is-primary is-success is-medium" target="_blank">验证邮箱</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
  
    </div>
    <div class="hero-foot">
      <footer class="footer">
        <div class="container">
          <div class="content has-text-centered">
            Copyright © 2016 EQYING Inc. All Rights Reserved
          </div>
        </div>
      </footer>
    </div>
  </section>
</template>

<script>
import api from 'src/api/index.js'

export default {
  name: 'signup',
  data() {
    return {
      isSuccess: false,
      userForm: {
        PanelLoginName: '',
        PanelPw: '',
        RPanelPw: '',
        PanelEmail: '',
        PanelCode: '',
        PanelRealName: '',
        PanelRemark: '',
        PanelWebId: '1',
        PanelType: 1,
        action: 'panelRegister',
        Panelprovince: '',
        PanelCity: '',
        PanelGender: '1',
        PanelBirthday: '',
        PanelMobile: ''
      },
      provinceOptions: [],
      cityOptions: [],
      ageOptons: {
        year: [],
        month: [],
        day: []
      },
      ageVal: {
        year: '1985年',
        month: '1月',
        day: '1日'
      }
    }
  },

  created() {
    this.queryByParenterCode('100000')

    const year = new Date().getFullYear() + 1
    for (let i = year - 99; i < year; i++) {
      this.ageOptons.year.push(i + '年')
    }
    for (let i = 1; i < 13; i++) {
      this.ageOptons.month.push(i + '月')
    }

    this.changeAge('month')
  },
  methods: {
    getEmailUrl() {
      const { PanelEmail } = this.userForm
      return 'http://mail.' + PanelEmail.split('@')[1]
    },
    validateForm() {
      this.$validator.validateAll().then(() => {
        console.log(this.ageVal)
        const { year, month, day } = this.ageVal

        this.userForm.PanelBirthday = parseInt(year) + '-' + parseInt(month) + '-' + parseInt(day)
        api.signup({ ...this.userForm }).then(res => {
          const { msg, result } = res.data;
          if (result !== 'ok') {
            this.$notify.warning({ content: msg || '注册失败' });
            return false;
          }

          // this.$notify.success({ content: msg || '注册成功' });
          // this.$router.push({ path: '/signin' })
          this.isSuccess= true
        }).catch((error) => {
          console.log(error)
        })
      })
    },
    queryByParenterCode(ParenterCode) {
      api.queryByParenterCode({ ParenterCode }).then(res => {
        const { msg, result, data } = res.data
        if (result !== 'ok') {
          this.$notify.warning({ content: msg || '查询省市失败' });
          return false;
        }

        const options = data.map(item => {
          return {
            value: item.ParamsValues,
            label: item.ParamsName
          }
        })
        // this.provinceOptions = 
        if (ParenterCode === '100000') {
          this.provinceOptions = options
          this.userForm.PanelCity = ''
        } else {
          this.cityOptions = options
        }
      })
    },
    changeAge(type) {
      if (type === 'month') {
        this.ageOptons.day = []
        // this.ageVal.day = ''
        const { year, month } = this.ageVal
        const dayLength = new Date(parseInt(year), parseInt(month), 0).getDate() + 1
        for (let i = 1; i < dayLength; i++) {
          this.ageOptons.day.push(i + '日')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.field {
  margin-bottom: 15px
}

.success {
  &-icon {
    font-size: 80px;
    color: #23d160
  }
  &-desc {
    padding: 1em 0;
    font-size: 16px;
    margin-top: 1em
  }
}

.select {
  select {
    width: 100%
  }
}
</style>
