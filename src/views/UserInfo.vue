<template>
  <div class="tab-content">
      <h2 class="title">个人资料</h2>
      <ul class="line-list">
        <li><span class="name">会员卡号：</span>1293847362</li>
        <li><span class="name">真实姓名：</span>王毅</li>
        <li><span class="name">会员性别：</span>男</li>
        <li><span class="name">昵称：</span>艺人</li>
        <li><span class="name">所获积分：</span>2800</li>
        <li><span class="name">用户活跃度：</span>28</li>
        <li><span class="name">证件类型：</span>身份证</li>
        <li><span class="name">证件号码：</span>130***********9015</li>
        <li><span class="name">出生日期：</span>1982/09/10</li>
        <li><span class="name">注册邮箱：</span>15840007@qq.com</li>
        <li><span class="name">手机号码：</span>18600773363</li>
        <li><span class="name">通讯地址：</span>北京市朝阳区酒仙桥路2号798艺术区01商务楼2192</li>
        <li><span class="name">邮政编码：</span>100011</li>
        <li><span class="name">加入时间：</span>2015/06/12</li>
        <li><span class="name">注册IP：</span>199.10.276.12</li>
        <li><span class="name">用户类型：</span>乐购</li>
        <li><span class="name">用户状态：</span>正常</li>
        <li><span class="name">个人收入：</span>未填写</li>
        <li><span class="name">婚姻状况：</span>未填写</li>
        <li><span class="name">教育程度：</span>未填写</li>
      </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style lang="scss">
$primary: #6bafdc;
@import '~bulma/sass/utilities/mixins';

.line-list{
  li{
    padding:10px 5px;
    border-bottom: 1px dotted #ccc;
    &>.name{
      display: inline-block;
      text-align: right;
      width: 100px;
      padding-right: 5px;
      font-weight: 700;

    }
  }
}
</style>
