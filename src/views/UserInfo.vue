<template>
  <div class="tab-content">
    <h2 class="title">个人资料</h2>
    <hr>
    <!-- <div>{{userInfo}}</div> -->
    <ul class="line-list">
      <li><span class="name">ID：</span>{{userInfo.PanelId}}</li>
      <li><span class="name">用户名：</span>{{userInfo.PanelLoginName}}</li>
      <li><span class="name">真实姓名：</span>{{userInfo.PanelRealName || '未填写'}}</li>
      <li><span class="name">电子邮件：</span>{{userInfo.PanelEmail || '未填写'}}</li>
      <li><span class="name">性别：</span>{{userInfo.PanelGender | sex}}</li>
      <li><span class="name">出生日期：</span>{{userInfo.PanelBirthday | fromatDate(true)}}</li>
      <li><span class="name">所在城市：</span>{{userInfo.PanelProvinceName}}，{{userInfo.PanelCityName}}</li>
      <!-- <li><span class="name">昵称：</span>艺人</li> -->
      <!-- <li><span class="name">所获积分：</span>{{userInfo.PanelPoint}}</li>
          <li><span class="name">用户活跃度：</span>28</li>
          <li><span class="name">证件类型：</span>身份证</li>
          <li><span class="name">证件号码：</span>130***********9015</li>
          <li><span class="name">注册邮箱：</span>15840007@qq.com</li>
          <li><span class="name">手机号码：</span>18600773363</li>
          <li><span class="name">通讯地址：</span>北京市朝阳区酒仙桥路2号798艺术区01商务楼2192</li>
          <li><span class="name">邮政编码：</span>100011</li> -->
      <li><span class="name">加入日期：</span>{{userInfo.CreatedTime | fromatDate(true)}}</li>
      <li><span class="name">注册IP：</span>{{userInfo.PanelRegistIp}}</li>
      <!--<li><span class="name">用户类型：</span>乐购</li>-->
      <li><span class="name">用户状态：</span>{{panelStatus(userInfo.PanelStatus)}}</li>
      <!-- <li><span class="name">个人收入：</span>未填写</li>
          <li><span class="name">婚姻状况：</span>未填写</li>
          <li><span class="name">教育程度：</span>未填写</li> -->
    </ul>
  </div>
</template>

<script>
import storage from 'src/utils/localStorage'

export default {
  data() {
    return {
      userInfo: {}
    }
  },
  created() {
    this.userInfo = storage.get('user')
  },
  methods: {
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
