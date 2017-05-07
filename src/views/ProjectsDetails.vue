<template>
  <div class="projects-page">
    <app-header></app-header>
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
    <div class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-6 box">
            <div class="image is-1by1">
              <img v-lazy="project.ProjectPicPath" :alt="project.ProjectName">
            </div>
          </div>
          <div class="column is-5 is-offset-1">
            <div class="title is-3">{{project.ProjectName}}</div>
            <hr>
            <!--<p class="title is-4 has-text-muted">40积分</p>-->
  
            <table class="table">
              <tbody>
                <tr>
                  <td class="has-text-right">
                    <strong>开始时间</strong>
                  </td>
                  <td>{{project.StartTime | fromatDate(true)}}</td>
                </tr>
                <tr>
                  <td class="has-text-right">
                    <strong>结束时间</strong>
                  </td>
                  <td>{{project.EndTime | fromatDate(true)}}</td>
                </tr>
                <tr>
                  <td class="has-text-right">
                    <strong>活动积分</strong>
                  </td>
                  <td>{{project.Cpoint}}</td>
                </tr>
                <tr>
                  <td class="has-text-right" width="100">
                    <strong>活动方式</strong>
                  </td>
                  <td>线上</td>
                </tr>
              </tbody>
            </table>
            <br>
            <div class="content project-content">
              <p>{{project.ProjectDesc}}</p>
              <p>
                <button class="button is-primary" @click="getInternalLink(project.PjId)">立即参与</button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script>
import api from 'src/api'
import AppHeader from 'components/AppHeader.vue'
import AppFooter from 'components/AppFooter.vue'
const { ROOT } = process.env

export default {
  components: {
    AppHeader,
    AppFooter
  },
  data() {
    return {
      project: {}
    }
  },
  created() {
    const { id } = this.$route.params
    this.getProjectInfo(id)
  },
  methods: {
    getProjectInfo(id) {
      api.getProjectInfo({ id }).then(res => {
        const { msg, result, data } = res.data
        if (result !== 'ok') {
          this.$notify.warning({ content: msg })
          return false
        }

        this.project = data.Project_Info
        this.project.Cpoint = data.Project_Point[0].Cpoint
        this.project.ProjectPicPath = ROOT + data.Project_Info.ProjectPicPath
      })
    },
    getInternalLink(PjId) {
      api.getInternalLink({ PjId }).then(res => {
        const { msg, result, data } = res.data
        if (result !== 'ok') {
          this.$notify.warning({ content: msg })
          return false
        }

        // window.location.href= data.InternalLink
        window.open(data.InternalLink)
      })
    },
  }
}
</script>

<style lang="scss">
.project {
  &-content {
    p {
      // font-size: 16px;
      line-height: 1.8
    }
    min-height: 200px
  }
}
</style>
