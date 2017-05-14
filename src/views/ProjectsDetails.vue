<template>
  <div class="projects-page">
    <app-header></app-header>
    <slider v-if="banners.length>0" :pages="banners" :sliderinit="sliderinit" class="banner"></slider>
    <div class="section">
      <div class="container" style="padding: 40px 0">
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
                <button class="button is-primary is-fullwidth is-medium" @click="getInternalLink(project.PjId)">立即参与</button>
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
import Slider from 'components/Slider.vue'
const { ROOT } = process.env

export default {
  components: {
    AppHeader,
    AppFooter,
    Slider
  },
  data() {
    return {
      project: {},
      allProjects: [],
      sliderinit: {
        currentPage: 0,//当前页码
        // thresholdDistance: 500,//滑动判定距离
        // thresholdTime: 100,//滑动判定时间
        autoplay: 3000,//自动滚动[ms]
        loop: true,//循环滚动
        infinite: 1,//无限滚动前后遍历数
        slidesToScroll: 1,//每次滑动项数
      }
    }
  },
  created() {
    const { id } = this.$route.params
    this.queryProjectColumn()
    this.getProjectInfo(id)
  },
  computed: {
    banners() {
      return this.allProjects.slice(0, 5).map(item => {
        return {
          style: item.ProjectPicAnnouncePath ? { 'background-image': 'url(http://show.eqiying.com' + item.ProjectPicAnnouncePath + ')' } : { 'background-color': '#333' }
        }
      })
    }
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

        window.location.href = data.InternalLink
        // window.open(data.InternalLink)
      })
    },
    queryProjectColumn() {
      api.queryColumns().then(res => {
        const { msg, result, data } = res.data
        if (result !== 'ok') {
          this.$notify.warning({ content: msg })
          return false
        }

        const allProjects = data.projectColumnList.reduce((result, item) => {
          if (item.projectInfoList) {
            // result = result.concat(item.projectInfoList)
            item.projectInfoList.forEach(project => {
              project.ProjectColumnName = item.ProjectColumnName
              project.ProjectPicPath = ROOT + project.ProjectPicPath
              result.push(project)
            })
          }
          return result
        }, [])

        this.allProjects = allProjects
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
