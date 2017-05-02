<template>
    <modal title="发送私信" transition="fadeDown" :is-show="visible" @close="close">
        <!--<div class="title has-text-centered">发送私信</div>-->
        <form @submit.prevent="validateForm">
            <div class="control is-horizontal">
                <div class="control-label">
                    <label class="label">收件人</label>
                </div>
                <div class="control">
                    <input class="input" type="text" name="msgName" v-validate="'required'" :class="{'is-danger': errors.has('msgName')}" v-model="msgName" placeholder="请输入收件人帐号">
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
                    <input class="input" type="text" name="title" v-validate="'required'" :class="{'is-danger': errors.has('title')}" v-model="msgForm.MessageTitle" placeholder="请填写标题">
                </div>
            </div>
            <div class="control is-horizontal">
                <div class="control-label">
                    <label class="label">内容</label>
                </div>
                <div class="control">
                    <textarea class="textarea" name="content" v-validate="'required'" :class="{'is-danger': errors.has('content')}" v-model="msgForm.InternalMessageContent" placeholder="请填写正文"></textarea>
                </div>
            </div>
        </form>
        <div slot="footer"><a class="button" @click="close">取消</a> <a class="button is-primary" @click="validateForm">确定</a></div>
    </modal>
</template>
<script>
import api from 'src/api/index.js'
import storage from 'src/utils/localStorage'
import filters from 'src/filters'

export default {
    name: 'sendMsg',
    props: ['visible'],
    data() {
        return {
            userInfo: {},
            msgName: '',
            msgForm: {
                MessageTitle: '',
                InternalMessageContent: ''
            }
        }
    },
    computed: {
        SenderId() {
            return storage.get('user').PanelId
        }
    },
    methods: {
        close() {
            this.$emit('close')
        },
        validateForm() {
            this.$validator.validateAll().then(() => {
                this.getUserId()
            }).catch((error) => {
                console.log(error)
            })
        },
        send(ReciptorId) {
            let data = { ...this.msgForm }
            data.SenderId = this.SenderId
            data.ReciptorId = ReciptorId
            data.InternalMessageContent = filters.encode(data.InternalMessageContent)

            api.setMsg(data).then(res => {
                const { msg, result, data } = res.data
                if (result !== 'ok') {
                    this.$notify.warning({ content: msg })
                    return false
                }

                this.$notify.success({ content: '发送私信成功！' })
                this.close()
            })
        },
        getUserId() {
            api.getUserId({ nickname: this.msgName }).then(res => {
                const { msg, result, data } = res.data
                if (result !== 'ok' || !data || !data.PanelId) {
                    this.$notify.warning({ content: msg })
                    return false
                }

                const ReciptorId = data.PanelId
                this.send(ReciptorId)
            })
        }
    }
}
</script>
<style lang="scss" scoped>

</style>