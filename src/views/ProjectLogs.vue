<template>
  <div class="tab-content">
    <h2 class="title">活动参与记录</h2>
    <hr>
    <div class="table-responsive">
      <table class="table is-striped">
        <thead>
          <tr>
            <th width="100">项目编号</th>
            <th>项目名称</th>
            <th width="80">参与状态</th>
            <th width="100">参与时间</th>
            <th width="80">所获积分</th>
          </tr>
        </thead>
        <tbody v-if="projectLogs.length>0">
          <tr v-for="(item, index) in projectLogs">
            <td>{{item.ProjectId}}</td>
            <td>
              <router-link class="card-image" :to="'/projects/' + item.PjId">{{item.ProjectName}}</router-link>
              </a>
            </td>
            <td><span class="tag" :class="statusTag(item.ProjectStatus)">{{item.Pstatus}}</span></td>
            <td>{{item.CreateTime | fromatDate(true)}}</td>
            <td>{{item.GetPoint}}</td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td class="has-text-centered" colspan="5">暂无数据...</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="box" v-if="projectLogs.length>0">
      <pagination :total="total" :page-size="pageSize" layout="pager" :change="queryProjectLog"></pagination>
    </div>
  </div>
</template>

<script>
import api from 'src/api'

export default {
  data() {
    return {
      projectLogs: [],
      total: 0,
      pageSize: 20
    }
  },
  methods: {
    queryProjectLog(pageNum) {
      api.queryProjectLog({ pageNum, pageSize: this.pageSize }).then(res => {
        const { msg, result, data, recordCount } = res.data
        if (result !== 'ok') {
          this.$notify.warning({ content: msg })
          return false
        }

        this.projectLogs = data
        this.total = recordCount || 0
      })
    },
    statusTag(value) {
      const CheckStatus = {
        3: 'is-dark',
        4: 'is-success'
      }
      return CheckStatus[value] || 'is-warning'
    }
  },
  created() {
    this.queryProjectLog(1)
  }
}
</script>

<style lang="scss">

</style>
