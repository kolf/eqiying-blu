<template>
  <div class="user-page">
    <section class="hero is-medium is-primary is-bold">
      <div class="hero-body">
        <div class="container has-text-centered">
            <h1 class="title">个人中心</h1>
        </div>
      </div>
    </section>
    <div class="section">
      <div class="container">
          <div class="user-profile">
              <div class="columns">
                  <div class="column is-one-quarter">
                      <div class="profile-info-left">
                          <div class="has-text-centered block">
                              <img src="http://bootdey.com/img/Content/avatar/avatar1.png" alt="Avatar" class="avatar">
                              <h1 class="title">王毅</h1>
                              <p>这位同学很懒，木有签名的说～</p>
                          </div>
                          <aside class="menu">
                            <ul class="menu-list">
                              <li><router-link  to="/user">个人资料</router-link></li>
                              <li><router-link  to="/user/activity">活动参与记录</router-link></li>
                              <li><router-link  to="/user/present">礼品兑换记录</router-link></li>
                            </ul>
                          </aside>
                      </div>

                  </div>
                  <div class="column">
                      <div class="profile-info-right">
                          <router-view></router-view>
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
  margin: -40px 0 15px 0;
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
