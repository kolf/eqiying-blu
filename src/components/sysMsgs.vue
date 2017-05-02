<template>
    <div class="columns sysMsgs-wrap">
        <div class="column is-narrow">
            <i class="iconfont icon-gonggao1"></i>
        </div>
        <div class="column">
            <div class="sysMsgs">
                <ul :style="{'margin-top': -index*20 + 'px'}">
                    <li v-for="(item, index) in msgs">
                        <a>{{item.AnnounceTitle}}</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="column is-narrow">
    
        </div>
    </div>
</template>
<script>
export default {
    props: ['list'],
    data(){
        return {
            index: 0
        }
    },
    methods: {
        next(){
            setInterval(() => {
                this.index = this.index == this.msgs.length-1 ? 0 : this.index+1
            }, 3000)
        }
    },
    computed: {
        msgs(){
            return this.list.concat(this.list)
        }
    },
    mounted(){
        this.next()
    }
}
</script>
<style lang="scss" scoped>
.sysMsgs {
    height: 20px;
    overflow: hidden;
    &>ul{
        transition: margin-top .2s
    }
}
</style>

