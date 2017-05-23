<template>
  <div class="present-page">
    <app-header></app-header>
    <slider v-if="banners.length>0" :pages="banners" :sliderinit="sliderinit" class="banner"></slider>
  
    <div class="section is-gray main">
      <div class="container">
        <div class="columns is-multiline is-mobile presents">
          <div class="column is-half-mobile is-one-quarter-desktop present" v-for="present in presents">
            <div class="card is-fullwidth">
              <a class="card-image is-transition" @click="showModal(present)">
                <figure class="image is-1by1">
                  <img v-lazy="present.PresentPic" :alt="present.PresentName">
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
                  <p class="">
                    <strong class="title is-4 text-danger">{{present.PresentPoint}}</strong> 积分
                    <button @click="showModal(present)" class="button is-primary is-outlined is-pulled-right is-hidden-mobile">兑换</button>
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
    <modal title="兑换礼品" transition="fadeDown" :is-show="isShowModal" @close="hideModal">
      <div class="columns">
        <div class="column is-6">
          <figure class="image is-square">
            <img v-lazy="curPresent.PresentPic" :alt="curPresent.PresentName">
          </figure>
        </div>
        <div class="column">
          <p class="title">{{curPresent.PresentName}}</p>
          <ul class="param-list">
            <li>
              <span class="param-name">礼品介绍:</span>{{curPresent.PresentDesc}}</li>
            <li>
              <span class="param-name">兑换积分:</span>{{curPresent.PresentPoint}}</li>
            <li>
              <span class="param-name">礼品上架时间:</span>{{curPresent.CreateTime | fromatDate(true)}}</li>
            <li>
              <input-number style="width:80px" :val="1" v-model="changeNum" :on-change="changePresentNum"></input-number>
            </li>
            <li>共需
              <strong class="text-danger">{{curPresent.PresentPoint*changeNum}}</strong> 积分</li>
          </ul>
        </div>
      </div>
      <div slot="footer">
        <a class="button" @click="hideModal">取消</a>
        <a :disabled="changeNum==0" class="button is-primary" @click="exchange">兑换</a>
      </div>
    </modal>
  </div>
</template>

<script>
import api from 'src/api'
import AppHeader from 'components/AppHeader.vue'
import AppFooter from 'components/AppFooter.vue'
import { mapActions, mapGetters } from 'vuex'
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
      presents: [],
      total: 0,
      isShowModal: false,
      changeNum: 1,
      curPresent: {},
      presentsTop5: [],
      //滑动配置[obj]
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
    ...mapGetters({
			current: 'current',
			device: 'device',
			menu: 'menu',
			user: 'user'
		}),

    banners() {
      return this.presentsTop5.slice(0, 5).map(item => {
        return {
          style: item.PresentAnnouncePic ? { 'background-image': 'url(http://show.eqiying.com' + item.PresentAnnouncePic + ')' } : { 'background-color': '#333' }
        }
      })
    }
  },
  created() {
    this.queryPresent(1)
    this.queryPresentBanner()
  },
  methods: {
    ...mapActions([
      'toggleLogin',
      'saveUser'
    ]),
    queryPresentBanner() {
      api.queryPresentBanner().then(res => {
        const { msg, result, data } = res.data
        if (result !== 'ok') {
          this.$notify.warning({ content: msg })
          return false
        }

        this.presentsTop5 = data

      })
    },
    queryPresent(pageNum) {
      api.queryPresent(pageNum).then(res => {
        const { msg, result, data, recordCount } = res.data
        if (result !== 'ok') {
          this.$notify.warning({ content: msg })
          return false
        }

        this.presents = data ? data.map(item => {
          item.PresentPic = ROOT + item.PresentPic
          return item
        }) : []
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
      // this.curPresent = {}
    },
    changePresentNum(val) {
      this.changeNum = val
    },
    exchange() {
      // console.log(this.curPresent)
      const {PanelPoint, PresentId} = this.curPresent
      api.exchange(PresentId, this.changeNum).then(res => {
        this.hideModal()

        const { msg, result, data } = res.data
        if (result !== 'ok') {
          this.$notify.warning({ content: msg })
          return false
        }

        const PanelPoint = this.user.PanelPoint - this.curPresent.PresentPoint*this.changeNum

        this.saveUser({ PanelPoint})

        this.$notify.success({ content: msg || '兑换成功！' })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~bulma/sass/utilities/mixins';

.presents {
  @include mobile {
    margin: -15px;
  }
}

.present {
  @include mobile {
    padding: 5px
  }
  .card {
    transition: all .2s;
    &:hover {
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1); // background-color: #eee;
    }
  }
}
</style>
