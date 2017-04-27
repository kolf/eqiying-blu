<template>
<div class="projects-page">
  <section class="hero is-medium banner user-banner"></section>
  <div class="section main">
      <div class="container">
        <div class="section">
          <div class="columns is-desktop">
            <div class="column is-8 is-offset-2">
              <h1 class="title">{{presentInfo.PresentName}}</h1>
              <div class="content">
                <p>{{presentInfo.PresentDesc}}</p>
              </div>
              <a class="button is-primary is-outlined is-fullwidth is-large">点击兑换</a>
            </div>
          </div>
        </div>
      </div>
  </div>
</div>
</template>

<script>
import api from 'src/api'

export default {
  data() {
    return {
      presentInfo: {}
    }
  },
  created(){
    const {id} = this.$route.params
    this.getProjectInfo(id)
  },
  methods: {
    getProjectInfo(id){
      api.getPresentInfo({id}).then(res => {
        const {msg, result, data} = res.data
        if(result!=='ok'){
          this.$notify.warning({content: msg})
          return false
        }

        this.presentInfo = data
      })
    }
  }
}
</script>

<style lang="scss">
.project {
    margin-bottom: 30px;
    vertical-align: top;
    margin-right: 30px;
    float: left;
    cursor: pointer;
    width: 100%;
}
</style>
