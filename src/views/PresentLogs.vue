<template>
  <div class="tab-content">
    <h2 class="title">礼品兑换记录</h2>
    <table class="table is-striped">
      <thead>
        <tr>
          <th>礼品名称</th>
          <th width="100">所需积分</th>
          <th width="80">兑换数量</th>
          <th width="80">消费分数</th>
          <th width="80">兑换状态</th>
          <th width="200">兑换日期</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in presentLogs">
          <td><a href="">{{item.PresentName}}</a></td>
          <td>{{item.PresentPoint}}</td>
          <td>{{item.ChangeTotal}}</td>
          <td>{{item.ChangeTotal}}</td>
          <td><span class="tag is-success">{{item.statusName}}</span></td>
          <td>{{item.ReleaseTime}}</td>
        </tr>
      </tbody>
    </table>
    <div class="box">
      <pagination :total="total" layout="pager"></pagination>
    </div>
  </div>
</template>

<script>
import api from 'src/api'

export default {
  data() {
    return {
      presentLogs: [],
      total: 0
    }
  },
  methods: {
    queryPresentLog(pageNum) {
      api.queryPresentLog(pageNum).then(res => {
        const { msg, result, data, recordCount } = res.data
        if (result !== 'ok') {
          this.$notify.warning({ content: msg })
          return false
        }

        this.presentLogs = data
        this.total = recordCount || 0
      })
    }
  },
  created() {
    this.queryPresentLog(1)
  }
}
</script>

<style lang="scss">

</style>
