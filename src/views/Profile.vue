<template>
  <div class="tab-content">
    <h2 class="title">个人资料</h2>
    <hr>
    <table class="table">
              <tbody>
                <tr>
                  <td class="has-text-right" width="100">
                    <strong>用户名：</strong>
                  </td>
                  <td>{{user.PanelLoginName}}</td>
                </tr>
                <tr>
                  <td class="has-text-right">
                    <strong>真实姓名：</strong>
                  </td>
                  <td>{{user.PanelRealName || '---'}}</td>
                </tr>
                <tr>
                  <td class="has-text-right">
                    <strong>电子邮件：</strong>
                  </td>
                  <td>{{user.PanelEmail}}
        <a class="" @click="showEmailModal=true">
          <i class="iconfont icon-bianji"></i>修改</a></td>
                </tr>
                <tr>
                  <td class="has-text-right">
                    <strong>手机号：</strong>
                  </td>
                  <td>{{user.PanelMobile || '---'}}
        <a class="" @click="showMobileModal=true">
          <i class="iconfont icon-bianji"></i>修改</a></td>
                </tr>
                <tr>
                  <td class="has-text-right">
                    <strong>性别：</strong>
                  </td>
                  <td>{{user.PanelGender | sex}}</td>
                </tr>
                <tr>
                  <td class="has-text-right">
                    <strong>出生日期：</strong>
                  </td>
                  <td>{{user.PanelBirthday | fromatDate(true)}}</td>
                </tr>
                <tr>
                  <td class="has-text-right">
                    <strong>所在城市：</strong>
                  </td>
                  <td>{{user.PanelProvinceName}}，{{user.PanelCityName}}</td>
                </tr>
                <tr v-if="user.carBrand">
                  <td class="has-text-right">
                    <strong>我的汽车：</strong>
                  </td>
                  <td>{{user.carBrand}} {{user.carModels}} ( {{user.carBuyDate}})</td>
                </tr>
                <tr>
                  <td class="has-text-right">
                    <strong>加入日期：</strong>
                  </td>
                  <td>{{user.CreatedTime | fromatDate(true)}}</td>
                </tr>
                <tr>
                  <td class="has-text-right">
                    <strong>注册IP：</strong>
                  </td>
                  <td>{{user.PanelRegistIp || '---'}}</td>
                </tr>
                <tr>
                  <td class="has-text-right">
                    <strong>用户状态：</strong>
                  </td>
                  <td>{{user.PanelStatus | panelStatus}}</td>
                </tr>
                <tr>
                  <td class="has-text-right">
                    <strong>我的积分：</strong>
                  </td>
                  <td><strong class="text-danger">{{user.PanelPoint}}</strong></td>
                </tr>

                <tr>
                  <td class="has-text-right">
                    <strong>邀请链接：</strong>
                  </td>
                  <td><input type="text" readonly v-model="inviteLink" class="input" /><a style="marginTop:5px" v-clipboard:copy="user.inviteLink" class="button is-info">
      复制链接
    </a></td>
                </tr>
                

              </tbody>
            </table>

    <update-email :visible="showEmailModal" :orgEmail="user.PanelEmail" @close="closeEmailModal"></update-email>
    <update-mobile :visible="showMobileModal" :orgPhone="user.PanelMobile" @close="closeMobileModal"></update-mobile>
  </div>
</template>

<script>
import api from "src/api";
import { mapActions, mapGetters } from "vuex";
import UpdateEmail from "src/components/modals/UpdateEmail.vue";
import UpdateMobile from "src/components/modals/UpdateMobile.vue";

export default {
  components: {
    UpdateEmail,
    UpdateMobile
  },
  data() {
    return {
      showEmailModal: false,
      showMobileModal: false,
      inviteLink: ""
    };
  },
  created() {
    this.getInviteLink();
  },
  computed: {
    ...mapGetters(["user"])
  },
  methods: {
    ...mapActions(["toggleLogin", "saveUser"]),
    closeEmailModal() {
      this.showEmailModal = false;
    },
    closeMobileModal() {
      this.showMobileModal = false;
    },
    getInviteLink() {
      api.getInviteLink().then(res => {
        const { msg, result, data } = res.data;
        if (result !== "ok") {
          // this.$notify.warning({ content: msg || '获取用户信息失败，请重新登陆' });
          return false;
        }

        this.inviteLink = data;
      });
    }
  },
  filters: {
    panelStatus(value) {
      const data = {
        "-1": "已删除",
        "0": "未激活",
        "1": "正常",
        "-2": "黑名单"
      };
      return data[value];
    }
  }
};
</script>

<style lang="scss" scoped>
$primary: #6bafdc;
@import "~bulma/sass/utilities/mixins";

.line-list {
  li {
    padding: 10px 5px;
    border-bottom: 1px dotted #ccc;
    &.columns {
      margin: 0;
      .column {
        padding: 0;
      }
    }

    & > .name {
      display: inline-block;
      text-align: right;
      width: 100px;
      padding-right: 5px;
      font-weight: 700;
    }
  }
}
</style>
