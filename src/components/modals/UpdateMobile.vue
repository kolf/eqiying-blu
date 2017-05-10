<template>
	<modal title="修改手机号" transition="fadeDown" :is-show="visible" @close="close">
		<div class="pad-h is-10 column is-offset-1">
			<form @submit.prevent="validateForm('mobileForm')" data-vv-scope="mobileForm" class="control is-horizontal">
				<div class="control-label">
					<label class="label">新手机号</label>
				</div>
				<div class="control has-addons">
					<input class="input is-expanded" name="newPhone" type="number" placeholder="请输入你的新手机号" v-model="mobileForm.newPhone" v-validate="'required|numeric'" :class="{'is-danger': errors.has('mobileForm.newPhone')}">
					<button class="button is-primary" :disabled="num>0" v-text="btnText"></button>
				</div>
			</form>
	
			<form @submit.prevent="validateForm('msgForm')" data-vv-scope="msgForm" class="control is-horizontal">
				<div class="control-label">
					<label class="label">验证码</label>
				</div>
				<div class="control">
					<input class="input" type="text" placeholder="请输入收到的验证码" name="msg" v-model="mobileForm.smsCode" v-validate="'required'" :class="{'is-danger': errors.has('msgForm.msg')}">
				</div>
			</form>
		</div>
		<div slot="footer">
			<a class="button" @click="close">取消</a>
			<a class="button is-primary" @click="validateForm('msgForm')" :disabled="!mobileForm.newPhone">确定</a>
		</div>
	</modal>
</template>
<script>
import api from 'src/api/index.js'
import { mapActions, mapGetters } from 'vuex'

export default {
	props: ['visible', 'orgPhone'],
	data() {
		return {
			mobileForm: {
				newPhone: '',
				smsCode: ''
			},
			num: 0
		}
	},
	computed: {
		btnText() {
			return this.num === 0 ? '获取手机验证码' : this.num + '秒后重新获取'
		}
	},
	methods: {
		...mapActions([
			'toggleLogin',
			'saveUser'
		]),
		close() {
			this.$emit('close')
		},
		validateForm(scope) {
			this.$validator.validateAll(scope).then(result => {
				console.log(scope)
				console.log(result)
				if (scope === 'mobileForm') {
					if (result) {
						// this.sendMsg()
						this.checkMobile()
					}
				} else if (scope === 'msgForm') {
					if (result) {
						this.updateMobile()
					}
				}
			})
		},
		sendMsg() {
			this.num = 60
			const timer = setInterval(() => {
				if (this.num === 0) {
					clearInterval(timer)
				} else {
					this.num--
				}
			}, 1000)

			const { newPhone } = this.mobileForm
			api.sendSms({ PanelMobiles: newPhone }).then(res => {
				const { msg, result, OK } = res.data

				if (OK || result == 1) {
					this.$notify.success({ content: '验证码发送成功，请注意查收' })
				} else {
					this.$notify.warning({ content: '验证码发送失败，请稍候重试！' })
				}
			}).catch((error) => {
				this.$notify.warning({ content: '验证码发送失败，请稍候重试！' })
			})
		},
		updateMobile() {
			const { mobileForm: { newPhone, smsCode }, orgPhone } = this
			api.updateMobile({
				orgPhone,
				newPhone,
				smsCode
			}).then(res => {
				const { msg, result, OK } = res.data
				if (result !== 'ok' && !OK) {
					this.$notify.warning({ content: msg || '修改失败，请稍候再试试！' });
					return false;
				}

				this.saveUser({ PanelMobile: newPhone })
			}).catch((error) => {
				this.$notify.warning({ content: '修改失败，请稍候再试试！' })
			})
		},
		checkMobile() {
			const { mobileForm: { newPhone } } = this
			api.checkUnique({
				TypeId: '1',
				strWord: newPhone
			}).then(res => {
				const { msg, result, OK } = res.data
				if (result !== 'ok' && result !== 'NotExist') {
					this.$notify.warning({ content: '该手机号已存在，请重试' });
					return false;
				}

				this.sendMsg()
			})
		}
	}
}
</script>
<style lang="scss" scoped>
@import '~bulma/sass/utilities/mixins';

.input {
	&.is-expanded {
		@include mobile {
			width: 160px
		}
	}
}
</style>