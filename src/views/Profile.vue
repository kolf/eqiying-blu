<template>
  <div class="tab-content">
    <h2 class="title">个人资料</h2>
    <hr>
    <ul class="line-list">
      <li><span class="name">用户名：</span>{{user.PanelLoginName}}</li>
      <li><span class="name">真实姓名：</span>{{user.PanelRealName || '---'}}</li>
      <li><span class="name">电子邮件：</span>{{user.PanelEmail}}
        <a class="" @click="showEmailModal=true">
          <i class="iconfont icon-bianji"></i>修改</a>
      </li>
      <li><span class="name">手机号：</span>{{user.PanelMobile || '---'}}
        <a class="" @click="showMobileModal=true">
          <i class="iconfont icon-bianji"></i>修改</a>
      </li>
      <li><span class="name">性别：</span>{{user.PanelGender | sex}}</li>
      <li><span class="name">出生日期：</span>{{user.PanelBirthday | fromatDate(true)}}</li>
      <li><span class="name">所在城市：</span>{{user.PanelProvinceName}}，{{user.PanelCityName}}</li>
      <li><span class="name">加入日期：</span>{{user.CreatedTime | fromatDate(true)}}</li>
      <li><span class="name">注册IP：</span>{{user.PanelRegistIp || '---'}}</li>
      <li><span class="name">用户状态：</span>{{user.PanelStatus | panelStatus}}</li>
      <li><span class="name">我的积分：</span><strong class="text-danger">{{user.PanelPoint}}</strong></li>
    </ul>
    <update-email :visible="showEmailModal" :orgEmail="user.PanelEmail" @close="closeEmailModal"></update-email>
    <update-mobile :visible="showMobileModal" :orgPhone="user.PanelMobile" @close="closeMobileModal"></update-mobile>
  </div>
</template>

<script>
import api from 'src/api'
import { mapActions, mapGetters } from 'vuex'
import UpdateEmail from 'src/components/modals/UpdateEmail.vue'
import UpdateMobile from 'src/components/modals/UpdateMobile.vue'

export default {
  components: {
    UpdateEmail,
    UpdateMobile
  },
  data() {
    return {
      showEmailModal: false,
      showMobileModal: false
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  methods: {
    closeEmailModal() {
      this.showEmailModal = false
    },
    closeMobileModal() {
      this.showMobileModal = false
    },

  },
  filters: {
    panelStatus(value) {
      const data = {
        '-1': '已删除',
        '0': '未激活',
        '1': '正常',
        '-2': '黑名单'
      }
      return data[value]
    }
  }
}
</script>

<style lang="scss" scoped>
$primary: #6bafdc;
@import '~bulma/sass/utilities/mixins';

.line-list {
  li {
    padding: 10px 5px;
    border-bottom: 1px dotted #ccc;
    &>.name {
      display: inline-block;
      text-align: right;
      width: 100px;
      padding-right: 5px;
      font-weight: 700;
    }
  }
}
</style>
