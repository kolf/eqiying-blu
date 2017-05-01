<template>
  <div class="present-page">
    <app-header></app-header>
    <section class="hero is-dark">
      <div class="hero-body">
        <div class="container has-text-centered">
          <p class="title">
            积分商城
          </p>
          <p class="subtitle">
            国内领先的积分商城服务商
          </p>
        </div>
      </div>
    </section>
  
    <div class="section is-gray main">
      <div class="container">
        <div class="columns is-multiline">
          <div class="column is-3" v-for="present in presents">
            <div class="card  is-fullwidth">
              <a class="card-image" @click="showModal(present)">
                <figure class="image is-1by1">
                  <img v-lazy="'http://show.eqiying.com' + present.PresentPic" alt="Image">
                </figure>
              </a>
              <div class="card-content">
                <div class="media">
                  <div class="media-content">
                    <p>
                      <a @click="showModal(present)">{{present.PresentName}}</a>
                    </p>
                  </div>
                </div>
                <div class="content">
                  <p class=""><span class="title is-3">{{present.PresentPoint}}</span> 积分
                    <button @click="showModal(present)" class="button is-primary is-outlined is-pulled-right">兑换</button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="box is-gray" v-if="presents.length>0">
          <pagination :total="total" layout="pager" :change="queryPresent"></pagination>
        </div>
      </div>
    </div>
    <app-footer></app-footer>
    <modal title="兑换" transition="fadeDown" :is-show="isShowModal" @close="hideModal" :show-footer="false" :show-header="false">
      <article class="media">
        <div class="media-left" style="width:240px">
          <figure class="image is-square">
            <img v-lazy="'http://show.eqiying.com' + curPresent.PresentPic" alt="Image">
          </figure>
        </div>
        <div class="media-content">
          <p class="title">{{curPresent.PresentName}}</p>
          <!--<p class="subtitle">{{curPresent.PresentDesc}}</p>-->
          <ul class="param-list">
            <li><span class="param-name">礼品介绍:</span>{{curPresent.PresentDesc}}</li>
            <li><span class="param-name">积分:</span>{{curPresent.PresentPoint}}</li>
            <li><span class="param-name">兑换个数:</span>{{curPresent.PresentPoint}}</li>
            <li><span class="param-name">礼品上架时间:</span>{{curPresent.CreateTime}}</li>
            <li>
              <input-number style="width:80px" :val="1" v-model="changeNum" :on-change="changePresentNum"></input-number>
            </li>
            <li>共需 <span class="text-danger">{{curPresent.PresentPoint*changeNum}}</span> 积分</li>
          </ul>
          <div class="pad-t">
            <button class="button is-primary" @click="exchange" :disabled="changeNum==0">兑换</button>
          </div>
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
import AppHeader from 'components/AppHeader.vue'
import AppFooter from 'components/AppFooter.vue'

export default {
  components: {
    AppHeader,
    AppFooter
  },
  data() {
    return {
      presents: [],
      total: 0,
      isShowModal: false,
      changeNum: 1,
      curPresent: {}
    }
  },
  created() {
    this.queryPresent(1)
    this.queryPresentBanner()
  },
  methods: {
    queryPresentBanner() {
      api.queryPresentBanner().then(res => {
        const { msg, result, data } = res.data
        if (result !== 'ok') {
          this.$notify.warning({ content: msg })
          return false
        }

        this.banners = data ? data.map(item => {
          item.PresentAnnouncePic = 'http://show.eqiying.com' + item.PresentAnnouncePic;
          return item
        }) : []

      })
    },
    queryPresent(pageNum) {
      api.queryPresent(pageNum).then(res => {
        const { msg, result, data, recordCount } = res.data
        if (result !== 'ok') {
          this.$notify.warning({ content: msg })
          return false
        }

        this.presents = data || []
        this.total = recordCount || 0
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
    changePresentNum(val) {
      this.changeNum = val
    },
    exchange() {
      // console.log(this.curPresent)
      api.exchange(this.curPresent.PresentId, this.changeNum).then(res => {
        this.hideModal()

        const { msg, result, data } = res.data
        if (result !== 'ok') {
          this.$notify.warning({ content: msg })
          return false
        }

        this.$notify.success({ content: msg || '兑换成功！' })
      })
    }
  }
}
</script>

<style lang="scss">

</style>
