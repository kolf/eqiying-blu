<template>
  <div class="tab-content">
      <h2 class="title">活动参与记录</h2>
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
            <tbody>
              <tr v-for="(item, index) in projectLogs">
                  <td>{{item.ProjectId}}</td>
                  <td><a href="">{{item.ProjectName}}</a></td>
                  <td><span class="tag is-success">{{item.Pstatus}}</span></td>
                  <td>{{item.CreateTime.match(/\S{10}/)[0]}}</td>
                  <td>{{item.GetPoint}}</td>
              </tr>
            </tbody>
        </table>
        <div class="box" v-show="projectLogs.length>0">
          <pagination :total="total" layout="pager"></pagination>
        </div>
  </div>
</template>

<script>
import api from 'src/api'

export default {
  data () {
    return {
      projectLogs: [],
      total: 0
    }
  },
  methods: {
    queryPresentLog(pageNum){
      api.queryProjectLog({pageNum}).then(res => {
        const {msg, result, data, recordCount} = res.data
        if(result!=='ok'){
          this.$notify.warning({content: msg})
          return false
        }

        this.projectLogs = data
        this.total = recordCount || 0
      })
    }
  },
  created(){
    this.queryPresentLog(1)
  }
}
</script>

<style lang="scss">

</style>
