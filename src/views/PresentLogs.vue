<template>
  <div class="tab-content">
    <h2 class="title">礼品兑换记录</h2>
    <hr>
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
      <tbody v-if="presentLogs.length>0">
        <tr v-for="(item, index) in presentLogs">
          <td><a @click="getPresent(item.PresentId)">{{item.PresentName}}</a></td>
          <td>{{item.PresentPoint}}</td>
          <td>{{item.ChangeTotal}}</td>
          <td>{{item.ChangeTotal}}</td>
          <td><span class="tag" :class="statusTag(item.CheckStatus)">{{item.statusName}}</span></td>
          <td>{{item.ReleaseTime | fromatDate(true)}}</td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td class="has-text-centered" colspan="6">暂无数据...</td>
        </tr>
      </tbody>
    </table>
    <div class="box" v-if="presentLogs.length>0">
      <pagination :total="total" layout="pager" :page-size="pageSize" :change="queryPresentLog"></pagination>
    </div>
  
    <modal title="兑换" transition="fadeDown" :is-show="isShowModal" @close="hideModal" :show-footer="false" :show-header="false">
      <article class="media">
        <div class="media-left" style="width:240px">
          <figure class="image is-square">
            <img v-lazy="'http://show.eqiying.com' + curPresent.PresentPic" alt="Image">
          </figure>
        </div>
        <div class="media-content">
          <p class="title">{{curPresent.PresentName}}</p>
          <p class="subtitle">{{curPresent.PresentDesc}}</p>
          <ul class="param-list">
            <li><span class="param-name">礼品介绍:</span>{{curPresent.PresentDesc}}</li>
            <li><span class="param-name">积分:</span>{{curPresent.PresentPoint}}</li>
            <li><span class="param-name">兑换个数:</span>{{curPresent.PresentPoint}}</li>
            <li><span class="param-name">礼品上架时间:</span>{{curPresent.CreateTime}}</li>
          </ul>
        </div>
        <div class="media-right">
          <button class="delete" @click="hideModal"></button>
        </div>
      </article>
    </modal>
  </div>
</template>

<script>
import api from 'src/api'

export default {
  data() {
    return {
      presentLogs: [],
      total: 0,
      isShowModal: false,
      curPresent: {},
      pageSize: 20
    }
  },
  methods: {
    queryPresentLog(pageNum) {
      api.queryPresentLog(pageNum, this.pageSize).then(res => {
        const { msg, result, data, recordCount } = res.data
        if (result !== 'ok') {
          this.$notify.warning({ content: msg })
          return false
        }

        this.presentLogs = data
        this.total = recordCount || 0
      })
    },
    getPresent(id) {
      api.getPresentInfo({ id }).then(res => {
        const { msg, result, data } = res.data
        if (result !== 'ok') {
          this.$notify.warning({ content: msg })
          return false
        }

        this.curPresent = data
        this.isShowModal = true
      })
    },
    showModal(present) {
      this.isShowModal = true
      this.curPresent = present
      // this.changeNum = 1
    },
    hideModal() {
      this.isShowModal = false
      this.curPresent = {}
    },
    statusTag(value) {
      const CheckStatus = {
        1: 'is-dark',
        2: 'is-info',
        3: 'is-success'
      }
      return CheckStatus[value] || 'is-warning'
    }
  },
  created() {
    this.queryPresentLog(1)
  }
}
</script>

<style lang="scss">

</style>
