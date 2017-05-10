<template>
    <div class="columns is-mobile sysMsgs-wrap">
        <div class="column is-narrow">
            <i class="iconfont icon-gonggao1"></i>
        </div>
        <div class="column">
            <div class="sysMsgs">
                <ul :style="{'margin-top': -index*20 + 'px'}">
                    <li v-for="(item, index) in msgs">
                        <span class="is-pulled-right">{{item.CreateTime | fromatDate(true)}}</span>
                        <a @click="toAnnouncement(item.AnnounceId)">{{item.AnnounceTitle}} <i v-if="computeNew(item.CreateTime)" class="iconfont icon-new"></i></a>
                        <!--<router-link :to="'/announcement/'+item.AnnounceId">{{item.AnnounceTitle}}</router-link>-->
                    </li>
                </ul>
            </div>
        </div>
        <!--<div class="column is-narrow">
        
            </div>-->
    </div>
</template>
<script>
export default {
    props: ['list'],
    data() {
        return {
            index: 0
        }
    },
    methods: {
        next() {
            setInterval(() => {
                this.index = this.index == this.msgs.length - 1 ? 0 : this.index + 1
            }, 3000)
        },
        toAnnouncement(id) {
            // window.open('#/announcement/'+id)
            this.$router.push({ path: '/announcement/' + id })
        },
        computeNew(date){
            return Date.now() - new Date(date).getTime() < 1000*60*60*24*3
        }
    },
    computed: {
        msgs() {
            return this.list.concat(this.list)
        }
    },
    mounted() {
        this.next()
    }
}
</script>
<style lang="scss" scoped>
.sysMsgs {
    height: 20px;
    overflow: hidden;
    margin-left: -10px;
    &>ul {
        transition: margin-top .2s;
        li{
            height: 20px;
            overflow: hidden;
        }
        a {
            .iconfont{
                color: #f40
            }
        }
    }
}
</style>

