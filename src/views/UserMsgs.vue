<template>
  <div class="tab-content">
    <h2 class="title">我的私信
      <button class="button is-pulled-right is-primary" @click="showSendMsg=true">
        <i class="iconfont icon-bianji"></i>发送私信</button>
    </h2>
    <hr>
    <div class="msgs" v-if="msgs.length>0">
      <article class="media msg" v-for="(msg, index) in msgs">
        <div class="media-left">
          <avatar background-color="#6bafdc" v-if="msg.PanelOtherInfo1" :size="64" :src="msg.PanelOtherInfo1" :username="msg.SenderName"></avatar>
          <avatar background-color="#6bafdc" v-else :size="64" :username="msg.SenderName"></avatar>
        </div>
        <div class="media-content">
          <div class="content">
            <p>
              <strong>{{msg.MessageTitle}}</strong>
              <a class="tag is-dark is-pulled-right" @click="openConfirm(msg.InternalMessageId)">
                删除
                <i class="delete is-small"></i>
              </a>
              <br> {{msg.InternalMessageContent | decode}}
            </p>
            <p>
              <a>{{msg.SenderName}}</a> 于 {{msg.CreateTime | fromatDate}} 发送</p>
          </div>
        </div>
      </article>
    </div>
    <div class="has-text-centered" v-else>
      暂无数据...
    </div>
    <div class="box" v-show="msgs.length>0">
      <pagination :total="total" :page-size="pageSize" layout="pager" :change="queryMsg"></pagination>
    </div>
  
    <send-msg :visible="showSendMsg" @close="sendSuccess"></send-msg>
  </div>
</template>

<script>
import api from 'src/api'
import SendMsg from 'src/components/modals/SendMsg.vue'
import { Avatar } from 'vue-avatar'
const { ROOT } = process.env

export default {
  components: {
    SendMsg,
    Avatar
  },
  data() {
    return {
      msgs: [],
      total: 0,
      pageSize: 10,
      showSendMsg: false
    }
  },
  methods: {
    openConfirm(InternalMessageId) {
      this.$modal.confirm({
        transition: 'fadeDown',
        content: '确定删除这条信息?',
        cancelText: '取消',
        okText: '确定',
        showHeader: false,
        onOk: () => {
          this.deteleMsg(InternalMessageId)
        }
      })
    },
    queryMsg(pageNum) {
      api.queryMsg({ pageNum, pageSize: this.pageSize }).then(res => {
        const { msg, result, data, recordCount } = res.data
        if (result !== 'ok') {
          this.$notify.warning({ content: msg })
          return false
        }

        this.msgs = data.map(item => {
          item.PanelOtherInfo1 = item.PanelOtherInfo1 ? ROOT + '/' + item.PanelOtherInfo1 : ''
          return item
        })
        this.total = recordCount || 0
      })
    },
    deteleMsg(InternalMessageId) {
      api.deteleMsg({ InternalMessageId }).then(res => {
        const { msg, result, data } = res.data
        if (result !== 'ok') {
          this.$notify.warning({ content: msg })
          return false
        }

        this.$notify.success({ content: '删除成功！' })
        this.queryMsg(1)
      })
    },
    sendSuccess() {
      this.showSendMsg = false
    },
    updateMsgStatus() {
      api.updateMsgStatus().then(res => {
        console.log(res)

        const { msg, result, data } = res.data
        if (result !== 'ok') {
          // this.$notify.warning({ content: msg })
          return false
        }


      })
    }
  },
  created() {
    this.queryMsg(1)
    this.updateMsgStatus()
  }
}
</script>

<style lang="scss" scoped>
.msg {
  .content {
    p {
      margin-bottom: 5px
    }
  }
}
</style>
