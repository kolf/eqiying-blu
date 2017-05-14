<template>
  <div class="projects-page">
    <app-header></app-header>
    <slider v-if="banners.length>0" :pages="banners" :sliderinit="sliderinit" class="banner"></slider>
    <div class="section is-gray main">
      <div class="container" v-if="allProjects.length>0">
        <div class="columns">
          <div class="column">
            <div class="tabs">
              <ul>
                <li :class="{'is-active': curColumnId==''}" @click="curColumnId=''">
                  <a>
                    <!-- <span class="icon is-small"><i class="fa fa-th-list"></i></span> -->
                    <span>全部</span>
                  </a>
                </li>
                <li :class="{'is-active': curColumnId==column.ProjectColumnId}" v-for="(column, index) in columns" @click="curColumnId=column.ProjectColumnId">
                  <a>
                    <!-- <span class="icon is-small"><i class="fa fa-th-list"></i></span> -->
                    <span>{{column.ProjectColumnName}}</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="projects">
          <div v-for="(project, index) in projects" class="box project">
            <article class="media is-mobile related-card">
              <div class="media-left column is-3 project-thumb is-transition">
                <router-link class="image is-1by1" :to="'/projects/' + project.PjId"><img v-lazy="project.ProjectPicPath" alt="project.ProjectName"></router-link>
              </div>
              <div class="media-content column">
                <div class="content project-content">
                  <p class="subtitle">
                    <router-link :to="'/projects/' + project.PjId">{{project.ProjectName}}</router-link>
                  </p>
                  <p class="project-desc">{{project.ProjectDesc}}</p>
                  <p><i class="iconfont icon-shijian"></i> 活动时间: {{project.StartTime | fromatDate(true)}} / {{project.EndTime | fromatDate(true)}}</p>
                  <p><i class="iconfont icon-jifen"></i> 活动积分: <strong class="text-danger">{{project.projectPointList[0].Cpoint}}</strong></p>
                  <p class="is-hidden-mobile">
                    <!--<button class="button is-primary" @click="getInternalLink(project.PjId)">立即参与</button>-->
                    <!--<button class="button is-primary" @click="getInternalLink(project.PjId, index)">立即参与</button>-->
                    <a class="button is-primary" target="_black" :href="project.ProjectUserLink">立即参与</a>
                    <router-link class="button is-primary is-outlined" :to="'/projects/' + project.PjId">查看详情</router-link>
                  </p>
                </div>
              </div>
            </article>
            <span class="button is-primary is-medium project-badge">{{project.ProjectColumnName}}</span>
          </div>
        </div>
        <div class="box is-gray" v-if="projects.length>0">
          <pagination :total="total" :page-size="pageSize" layout="pager" :change="changePage"></pagination>
        </div>
      </div>
      <!--<div v-else class="container">
        <div class="section msg-box has-text-centered">
          <div class="">
            <i class="iconfont icon-tishi icon is—info"></i>
            <h2 class="title">您没有任何可以参加的活动</h2>
          </div>
          <div class="content">
            <p class="desc">您没有任何可以参加的活动， 我们最大的动力来自于您的支持与参与~</p>
            <p>
              <router-link class="button is-outlined is-medium" to="/index">返回首页</router-link>
              <router-link class="button is-primary is-primary is-medium" to="/user">个人中心</router-link>
            </p>
          </div>
        </div>
      </div>-->
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
      columns: [],
      allProjects: [],
      // ProjectColumnId: '',
      curColumnId: '',
      pageSize: 12,
      pageNum: 0,
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
  computed: {
    projects() {
      const { curColumnId, allProjects, pageNum, pageSize } = this
      const arr = curColumnId ? allProjects.filter(item => item.ProjectColumnId === curColumnId) : allProjects
      return arr.slice(pageNum * pageSize, (pageNum + 1) * pageSize)
    },
    total() {
      const { curColumnId, allProjects, pageNum, pageSize } = this
      const arr = curColumnId ? allProjects.filter(item => item.ProjectColumnId === curColumnId) : allProjects
      return arr.length
    },
    banners() {
      return this.allProjects.slice(0, 5).map(item => {
        return {
          style: item.ProjectPicAnnouncePath ? { 'background-image': 'url(http://show.eqiying.com' + item.ProjectPicAnnouncePath + ')' } : { 'background-color': '#333' }
        }
      })
    }
  },
  created() {
    this.queryProjectColumn()
    // this.queryList('')
  },
  methods: {
    // queryList(ProjectColumnId) {
    //   this.ProjectColumnId = ProjectColumnId
    //   this.queryProject(1) // 作废
    // },
    changePage(pageNum) {
      this.pageNum = pageNum
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

        this.columns = data.projectColumnList
        this.allProjects = allProjects

        if(allProjects.length===0){
          this.$notify.warning({ content: '您还没有任何可以参与的活动！' })
          this.$router.push({ path: '/index' })
        }
      })
    },
    // queryProject(pageNum) {
    //   api.queryProjectInfoByUserRole({ pageNum, ProjectColumnId: this.ProjectColumnId, pageSize: this.pageSize }).then(res => {
    //     const { msg, result, data, recordCount } = res.data
    //     if (result !== 'ok') {
    //       this.$notify.warning({ content: msg })
    //       return false
    //     }

    //     this.projects=data
    //     this.total=recordCount || data.length
    //   })
    // },
    getInternalLink(PjId, index) {
      api.getInternalLink({ PjId }).then(res => {
        const { msg, result, data } = res.data
        if (result !== 'ok') {
          this.$notify.warning({ content: msg })
          return false
        }

        // window.location.href= data.InternalLink
        // window.open(data.InternalLink)
        // this.projects[index].href = data.InternalLink
        this.$router.push({ path: '/projects' })
        
        console.log(this.projects[index].href)
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
@import '~bulma/sass/utilities/mixins';

.projects {
  @include mobile() {
    margin: 0 -20px;
  }
}

.project {
  margin-bottom: 20px;
  position: relative;
  &-badge{
    position: absolute;
    right: 0;
    top: 10px;
    border-radius: 0
  }
  @include mobile() {
    padding: 10px;
  }
  // border: 4px solid #fff;
  padding: 20px;
  border-radius: 0;
  &-desc {
    @include mobile() {
      height: 40px
    }
    height: 80px;
  }
  &-thumb {
    // margin-right: 20px;
    // padding: 5px;
  }
  &-content {
    p {
      margin-bottom: 11px
    }
  }
  transition: all .2s;
  @include desktop() {
    &:hover {
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1); // background-color: #eee;
      // border-color: #6bafdc // transform: translate3d(0, -2px, 0)
    }
  }
}
</style>
