<template>
  <div class="user">
    <div class="container">
        <div class="user-profile">
            <div class="profile-header-background"><img src="http://demo.thedevelovers.com/dashboard/queenadmin-1.2/assets/img/city.jpg" alt="Profile Header Background"></div>
            <div class="columns">
                <div class="column is-one-quarter">
                    <div class="profile-info-left">
                        <div class="has-text-centered block">
                            <img src="http://bootdey.com/img/Content/avatar/avatar1.png" alt="Avatar" class="avatar">
                            <h1 class="title">王毅</h1>
                        </div>
                        <div class="box">
                            <p>这家伙很懒，什么也没留下.</p>
                        </div>
                    </div>

                </div>
                <div class="column">
                    <div class="profile-info-right box">
                      <div class="tabs">
                      <ul>
                        <li class="is-active"><a>活动参与记录</a></li>
                        <li><a>礼品兑换记录</a></li>
                        <li><a>个人基本信息</a></li>
                      </ul>
                      </div>
                        <div class="tab-content">
                          <div class="">
                              <table class="table is-striped">
                                  <thead>
                                  <tr>
                                      <th width="100">项目编号</th>
                                      <th>项目名称</th>
                                      <th width="80">参与状态</th>
                                      <th width="160">参与时间</th>
                                      <th width="80">所获积分</th>
                                  </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                        <td>1454545</td>
                                        <td><a href="">公益活动一个鸡蛋的暴走</a></td>
                                        <td><span class="tag is-success">已完成</span></td>
                                        <td>14.07.2014 10:16:36</td>
                                        <td>200</td>
                                    </tr>
                                    <tr>
                                        <td>1454545</td>
                                        <td><a href="">公益活动一个鸡蛋的暴走</a></td>
                                        <td><span class="tag is-success">已完成</span></td>
                                        <td>14.07.2014 10:16:36</td>
                                        <td>200</td>
                                    </tr>
                                    <tr>
                                        <td>1454545</td>
                                        <td><a href="">公益活动一个鸡蛋的暴走</a></td>
                                        <td><span class="tag is-success">已完成</span></td>
                                        <td>14.07.2014 10:16:36</td>
                                        <td>200</td>
                                    </tr>
                                    <tr>
                                        <td>1454545</td>
                                        <td><a href="">公益活动一个鸡蛋的暴走</a></td>
                                        <td><span class="tag is-success">已完成</span></td>
                                        <td>14.07.2014 10:16:36</td>
                                        <td>200</td>
                                    </tr>
                                    <tr>
                                        <td>1454545</td>
                                        <td><a href="">公益活动一个鸡蛋的暴走</a></td>
                                        <td><span class="tag is-success">已完成</span></td>
                                        <td>14.07.2014 10:16:36</td>
                                        <td>200</td>
                                    </tr>

                                  </tbody>
                              </table>

                          </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
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
.user-profile {
  // padding-bottom: 30px;
}

.profile-header-background {
  margin: 0 0 15px 0;
}
.profile-header-background img {
  width: 100%;
  height: 310px;
}

.profile-info-left {
  position: relative;
  top: -92px;
}
.profile-info-left img.avatar {
border: 2px solid #fff;
border-radius: 6px;
}
.profile-info-left h2 {
  margin-bottom: 30px;
}

.profile-info-right{
  // padding: 30px 0;
  // background-color: transparent;
}
@media screen and (max-width: 768px) {
.profile-info-right {
  position: relative;
  top: -70px;
}
}

</style>
