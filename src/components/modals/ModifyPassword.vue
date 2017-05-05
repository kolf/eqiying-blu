<template>
    <modal title="修改密码" transition="fadeDown" :is-show="visible" @close="close" ok-text="确定" cancel-text="取消">
        <form @submit.prevent="validateForm" class="pad-h is-10 column is-offset-1">
            <div class="control is-horizontal">
                <div class="control-label">
                    <label class="label">原密码</label>
                </div>
                <div class="control">
                    <input class="input" type="password" placeholder="请输入原密码" name="orgPasssword" v-model="passwordForm.orgPasssword" v-validate="'required'" :class="{'is-danger': errors.has('orgPasssword')}">
                </div>
            </div>
            <div class="control is-horizontal">
                <div class="control-label">
                    <label class="label">新密码</label>
                </div>
                <div class="control">
                    <input class="input" type="password" placeholder="请输入新密码" name="newPassword" v-model="passwordForm.newPassword" v-validate="'required'" :class="{'is-danger': errors.has('newPassword')}">
                </div>
            </div>
            <div class="control is-horizontal">
                <div class="control-label">
                    <label class="label">确认新密码</label>
                </div>
                <div class="control">
                    <input class="input" type="password" placeholder="请再次输入新密码" name="rePassword" v-model="passwordForm.rePassword" v-validate="'required'" :class="{'is-danger': errors.has('rePassword')}">
                </div>
            </div>
        </form>
        <div slot="footer"><a class="button" @click="close">取消</a> <a class="button is-primary" @click="validateForm">确定</a></div>
    </modal>
</template>
<script>
import api from 'src/api/index.js'

export default {
    props: ['visible'],
    data() {
        return {
            passwordForm: {
                orgPasssword: '',
                newPassword: '',
                rePassword: ''
            }
        }
    },
    computed: {
        panelId() {
            return this.$store.getters.user.panelId
        }
    },
    methods: {
        close() {
            this.$emit('close')
        },
        validateForm(scope) {
            this.$validator.validateAll().then(() => {
                const {orgPasssword, newPassword} = this.passwordForm
                api.changePwd({
                    panelId: this.panelId,
                    orgPasssword,
                    newPassword
                }).then(res => {
                    const { msg, result } = res.data;
                    if (result !== 'ok') {
                        this.$notify.warning({ content: msg || '验证失败' })
                        return false;
                    }

                    this.$notify.success({ content: msg || '密码修改成功' })
                }).catch((error) => {
                    console.log(error)
                })
            })
        }
    }
}
</script>
<style lang="scss" scoped>

</style>