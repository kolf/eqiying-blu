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
    <div class="section is-gray">
      <div class="container">
        <div class="columns">
          <div class="column">
            <div class="tabs">
              <ul>
                <li :class="{'is-active': ProjectColumnId==''}" @click="queryList('')">
                  <a>
                    <!-- <span class="icon is-small"><i class="fa fa-th-list"></i></span> -->
                    <span>全部</span>
                  </a>
                </li>
                <li :class="{'is-active': ProjectColumnId==column.ProjectColumnId}" v-for="(column, index) in columns" @click="queryList(column.ProjectColumnId)">
                  <a>
                    <!-- <span class="icon is-small"><i class="fa fa-th-list"></i></span> -->
                    <span>{{column.ProjectColumnName}}</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!--<div class="columns is-multiline">
              <div class="column" v-for="(project, index) in projects">
                <article class="media related-card box" v-for="(project, index) in projects">
                <div class="media-left">
                  <figure class="image">
                    <img src="http://placehold.it/240x240" alt="Image">
                  </figure>
                </div>
                <div class="media-content">
                  <div class="content">
                    <p class="subtitle">{{project.ProjectName}}</p>
                    <p>{{project.ProjectDesc}}</p>
                    <p>时间： {{project.StartTime}}</p>
                    <p><a class="button is-primary">查看详情</a></p>
                  </div>
                </div>
              </article>
                <div class="card  is-fullwidth">
                  <router-link class="card-image" :to="'/projects/' + project.PjId">
                    <figure class="image is-1by1">
                      <img v-lazy="'http://show.eqiying.com' + project.ProjectPicPath" alt="project.ProjectName">
                    </figure>
                  </router-link>
                  <div class="card-content">
                    <div class="media">
                      <div class="media-content">
                        <p>
                          <router-link class="card-image" :to="'/projects/' + project.PjId">{{project.ProjectName}}</router-link>
                        </p>
                        <small>{{project.StartTime}}</small>
                      </div>
                    </div>
                    <div class="content">
                      <p class="">可获 <span class="title is-4">{{project.Cpoint}}</span> 积分</p>
                    </div>
                  </div>
                </div>
              </div>-->
        <div v-for="(project, index) in projects" class="box projects">
          <article class="media related-card">
            <div class="media-left project-thumb">
              <figure class="image is-1by1">
                <img v-lazy="'http://show.eqiying.com' + project.ProjectPicPath" alt="project.ProjectName">
              </figure>
            </div>
            <div class="media-content">
              <div class="content">
                <p class="subtitle">[{{project.ProjectColumnName}}]
                  <router-link :to="'/projects/' + project.PjId">{{project.ProjectName}}</router-link>
                </p>
                <p class="project-desc">{{project.ProjectDesc}}</p>
                <p><i class="iconfont icon-shijian"></i> 活动时间: {{project.StartTime | fromatDate(true)}} / {{project.EndTime | fromatDate(true)}}</p>
                <p><i class="iconfont icon-jifen"></i> 积分: {{project.projectPointList[0].Cpoint}}</p>
                <p>
                  <a class="button is-primary" href="project.InternalLink">立即参与</a>
                  <router-link class="button is-link" :to="'/projects/' + project.PjId">查看详情</router-link>
                </p>
              </div>
            </div>
          </article>
        </div>
        <div class="box is-gray" v-if="projects.length>0">
          <pagination :total="total" :page-size="pageSize" layout="pager" :change="queryProject"></pagination>
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

export default {
  components: {
    AppHeader,
    AppFooter
  },
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      imgUrl: '../assets/event184125.jpg',
      columns: [],
      projects: [],
      ProjectColumnId: '',
      total: 0,
      pageSize: 12
    }
  },
  created() {
    this.queryProjectColumn()
    this.queryList('')
  },
  methods: {
    queryList(ProjectColumnId) {
      this.ProjectColumnId = ProjectColumnId
      // this.queryProject(1) // 作废
    },
    queryProjectColumn() {
      api.queryColumns().then(res => {
        const { msg, result, data } = res.data
        if (result !== 'ok') {
          this.$notify.warning({ content: msg })
          return false
        }


        const projects = data.projectColumnList.reduce((result, item) => {
          if (item.projectInfoList) {
            // result = result.concat(item.projectInfoList)
            item.projectInfoList.forEach(project => {
              project.ProjectColumnName = item.ProjectColumnName
              result.push(project)
            })
          }
          return result
        }, [])

        this.columns = data.projectColumnList
        this.projects = projects
        this.total = projects.length
      })
    },
    queryProject(pageNum) {
      api.queryProjectInfoByUserRole({ pageNum, ProjectColumnId: this.ProjectColumnId, pageSize: this.pageSize }).then(res => {
        const { msg, result, data, recordCount } = res.data
        if (result !== 'ok') {
          this.$notify.warning({ content: msg })
          return false
        }

        // this.projects=data
        // this.total=recordCount || data.length
      })
    },
    statusTag(value) {
      const CheckStatus = {
        3: 'is-dark',
        4: 'is-success'
      }
      return CheckStatus[value] || 'is-warning'
    }
  }
}
</script>

<style lang="scss" scoped>
.project {
  &-desc {
    height: 80px
  }
  &-thumb {
    width: 240px;
    margin-right: 20px;
  }
}
</style>
