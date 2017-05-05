<template>
  <div class="tab-content">
    <h2 class="title">个人资料</h2>
    <hr>
    <ul class="line-list">
      <li><span class="name">用户名：</span>{{user.PanelLoginName}}</li>
      <li><span class="name">真实姓名：</span>{{user.PanelRealName || '---'}}</li>
      <li><span class="name">电子邮件：</span>{{user.PanelEmail || '---'}}
        <a class="" @click="showEmailModal=true">
          <i class="iconfont icon-bianji"></i>修改</a>
      </li>
      <li><span class="name">手机号：</span>{{user.PanelMobile || '---'}}</li>
      <li><span class="name">性别：</span>{{user.PanelGender | sex}}</li>
      <li><span class="name">出生日期：</span>{{user.PanelBirthday | fromatDate(true)}}</li>
      <li><span class="name">所在城市：</span>{{user.PanelProvinceName}}，{{user.PanelCityName}}</li>
      <li><span class="name">加入日期：</span>{{user.CreatedTime | fromatDate(true)}}</li>
      <li><span class="name">注册IP：</span>{{user.PanelRegistIp || '---'}}</li>
      <li><span class="name">用户状态：</span>{{panelStatus(user.PanelStatus)}}</li>
    </ul>
    <update-email :visible="showEmailModal" :orgEmail="user.PanelEmail" @close="closeEmailModal"></update-email>
  </div>
</template>

<script>
import api from 'src/api'
import { mapActions, mapGetters } from 'vuex'
import UpdateEmail from 'src/components/modals/UpdateEmail.vue'

export default {
  components: {
    UpdateEmail
  },
  data() {
    return {
      showEmailModal: false
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
    panelStatus(value) {
      const data = {
        '-1': '已删除',
        '0': '未激活',
        '1': '正常',
        '-2': '黑名单'
      };

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
