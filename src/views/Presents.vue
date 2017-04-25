<template>
  <div class="present-page">
    <!-- <article class="banner">
        <lory class="js_rewind" :options="{ enableMouseEvents: true, }">
          <item v-lazy:background-image="banner.PresentAnnouncePic" v-for="(banner, index) in banners"></item>
        </lory>
    </article> -->
    <section class="hero is-medium is-primary is-bold">
      <div class="hero-body">
        <div class="container has-text-centered">
            <h1 class="title">积分商城</h1>
        </div>
      </div>
    </section>

    <div class="section is-gray">
      <div class="container">
        <div class="columns is-multiline">
          <div class="column is-3" v-for="present in presents">
            <div class="card  is-fullwidth">
              <router-link class="card-image" :to="'/presents/' + present.PresentId">
                <figure class="image is-4by3">
                  <img v-lazy="'http://show.eqiying.com' + present.PresentPic" alt="Image">
                </figure>
              </router-link>
              <div class="card-content">
                <div class="media">
                  <div class="media-content">
                    <p><router-link :to="'/presents/' + present.PresentId">{{present.PresentName}}</router-link></p>
                  </div>
                </div>
                <div class="content">
                  <p class=""><span class="title is-3">{{present.PresentPoint}}</span> 积分<button @click="showModal(present)" class="button is-primary is-outlined is-pulled-right">兑换</button></p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="box is-gray">
          <pagination :total="total" layout="pager" :change="queryPresent"></pagination>
        </div>
      </div>
    </div>
    <modal title="兑换" :is-show="isShowModal" :on-ok="exchange" @close="isShowModal=false" ok-text="确定" cancel-text="取消">
			<!-- <div slot="footer"></div> -->
      <div class="columns">
        <div class="column is-3 has-text-right">礼品名称</div>
        <div class="column is-8">{{curPresent.PresentName}}</div>
      </div>
      <div class="columns">
        <div class="column is-3 has-text-right" style="padding-top: 15px">兑换个数</div>
        <div class="column is-8"><input-number :val="curPresent.val" :on-change="changePresentNum"></input-number></div>
      </div>
      <div class="columns">
        <div class="column is-3  has-text-right">所需积分</div>
        <div class="column is-8">{{curPresent.PresentPoint}}</div>
      </div>
		</modal>
  </div>
</template>

<script>
import api from 'src/api'
import { Lory, Item, Prev, Next } from 'vue-lory'

export default {
  components: {
    Lory,
    Item,
    Prev,
    Next
  },
  data () {
    return {
      presents: [],
      total: 0,
      isShowModal: false,
      curPresent: {},
      changeNum: 1,
      banners: [],
      // imgUrl: 'http://minigame.qq.com/common_manage/381/big_image_8cf953f75f1c4903c246c6cf6d48f867.jpg'
    }
  },
  created(){
    this.queryPresent(1)
    this.queryPresentBanner()
  },
  methods: {
    queryPresentBanner(){
      api.queryPresentBanner().then(res => {
        const {msg, result, data} = res.data
        if(result!=='ok'){
          this.$notify.warning({content: msg})
          return false
        }

        this.banners = data ? data.map(item => {
          item.PresentAnnouncePic = 'http://show.eqiying.com' + item.PresentAnnouncePic;
          return item
        }) : []

      })
    },
    queryPresent(pageNum){
      api.queryPresent(pageNum).then(res => {
        const {msg, result, data, recordCount} = res.data
        if(result!=='ok'){
          this.$notify.warning({content: msg})
          return false
        }

        this.presents = data || []
        this.total = recordCount || 0
      })
    },
    showModal(present){
      this.isShowModal = true
      this.curPresent = present
      this.curPresent.val = 1
    },
    changePresentNum(val){
      this.curPresent.val = val
    },
    exchange(){
      // console.log(this.curPresent)
      api.exchange(this.curPresent.PresentId, this.curPresent.val).then(res => {
        const {msg, result, data} = res.data
        if(result!=='ok'){
          this.$notify.warning({content: msg})
          return false
        }

        this.$notify.success({content: msg || '兑换成功！'})
      })
    }
  }
}
</script>

<style lang="scss">
.image{
  background-color:#eee
}
.banner{
  // height: 380px;
  overflow: hidden;
}
.js_slide{
  background-color: #fff;
  height: 380px;
  background-position: center;
}
</style>
