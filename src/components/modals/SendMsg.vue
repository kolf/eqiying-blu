<template>
    <modal title="忘记密码" transition="fadeDown" :is-show="visible" @close="close" :show-header="false" :show-footer="false">
        <div class="title has-text-centered">发送私信</div>
        <form @submit.prevent="validateForm">
            <div class="control is-horizontal">
                <div class="control-label">
                    <label class="label">收件人</label>
                </div>
                <div class="control">
                    <input class="input" type="text" name="name" v-validate:name.initial="'required|alpha'" v-model="msgName" placeholder="请输入收件人帐号">
                </div>
            </div>
            <div class="control is-horizontal">
                <div class="control-label">
                    <label class="label"></label>
                </div>
                <div class="control">
                    <checkbox v-model="msgName" val="虎皮猫大人">管理员</checkbox>
                </div>
            </div>
            <div class="control is-horizontal">
                <div class="control-label">
                    <label class="label">标题</label>
                </div>
                <div class="control">
                    <input class="input" type="text" name="title" v-validate:title.initial="'required|alpha'" placeholder="请填写标题">
                </div>
            </div>
            <div class="control is-horizontal">
                <div class="control-label">
                    <label class="label">内容</label>
                </div>
                <div class="control">
                    <textarea class="textarea" name="content" v-validate:content.initial="'required|alpha'" placeholder="请填写正文"></textarea>
                </div>
            </div>
            <div class="control is-horizontal">
                <div class="control-label">
    
                </div>
                <div class="control">
                    <button class="button is-primary">确定</button>
                </div>
            </div>
        </form>
    </modal>
</template>
<script>
import api from 'src/api/index.js'
export default {
    name: 'sendMsg',
    props: ['visible'],
    data() {
        return {
            msgName: '',
            msgForm: {
                MessageTitle: '',
                InternalMessageContent: '',
                SenderId: '',
                ReciptorId: ''
            }
        }
    },
    created() {

    },
    methods: {
        close() {
            this.$emit('close')
        },
        validateForm() {
            this.$validator.validateAll().then(() => {
                console.log(44444444444)
            }).catch(() => {
                
            })
        }
    }
}
</script>
<style lang="scss" scoped>

</style>