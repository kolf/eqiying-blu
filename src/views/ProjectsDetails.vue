<template>
<div class="projects-page">
  <section class="hero is-dark">
      <div class="hero-body">
        <div class="container has-text-centered">
          <p class="title">
            活动专区
          </p>
          <p class="subtitle">
            丰富的活动等你来参加还可以获得积分哟
          </p>
        </div>
      </div>
    </section>
  <div class="section main">
      <div class="container">
        <div class="section">
          <div class="columns is-desktop">
            <div class="column is-8 is-offset-2">
              <h1 class="title">{{projectInfo.ProjectName}}</h1>
              <div class="content project-content">
                <p>{{projectInfo.ProjectDesc}}</p>
              </div>
              <a class="button is-primary is-outlined is-fullwidth is-large">点击参与</a>
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
      projectInfo: {}
    }
  },
  created(){
    const {id} = this.$route.params
    this.getProjectInfo(id)
  },
  methods: {
    getProjectInfo(id){
      api.getProjectInfo({id}).then(res => {
        const {msg, result, data} = res.data
        if(result!=='ok'){
          this.$notify.warning({content: msg})
          return false
        }

        this.projectInfo = data.Project_Info
      })
    }
  }
}
</script>

<style lang="scss">
.project {
    &-content{
        p{
            font-size: 16px;
            line-height: 1.8
        }
        min-height: 200px
    }
}
</style>
