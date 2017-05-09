<template>
	<modal title="修改邮箱" transition="fadeDown" @close="close" :is-show="visible" :show-footer="!isSuccess" :show-header="!isSuccess">
		<form v-if="!isSuccess" @submit.prevent="validateForm()" class="pad-h is-10 column is-offset-1">
			<div class="control is-horizontal">
				<div class="control-label">
					<label class="label">您的新邮箱</label>
				</div>
				<div class="control">
					<input class="input" type="emall" placeholder="请输入新邮箱" name="newEmail" v-model="emailForm.newEmail" v-validate="'required'" :class="{'is-danger': errors.has('newEmail')}">
				</div>
			</div>
		</form>
		<div v-else class="section msg-box has-text-centered">
			<div class="">
				<i class="iconfont icon-chenggong1 icon is-success"></i>
				<h2 class="title">受理成功</h2>
			</div>
			<div class="content">
				<p class="desc">请在24小时内登陆邮箱并点击确认链接完成最终的邮箱信息修改</p>
				<p>
					<!--<a href="" class="button is-outlined is-medium">马上登陆</a>-->
					<a :href="getEmailUrl()" class="button is-primary is-success is-medium" target="_blank">验证邮箱</a>
				</p>
			</div>
			<a class="delete" @click="close"></a>
		</div>
		<div slot="footer"><a class="button" @click="close">取消</a> <a class="button is-primary" @click="validateForm">确定</a></div>
	</modal>
</template>
<script>
import api from 'src/api/index.js'
export default {
	props: ['visible', 'orgEmail'],
	data() {
		return {
			emailForm: {
				newEmail: ''
			},
			isSuccess: false
		}
	},
	created() {

	},
	methods: {
		close() {
			// window.location.reload()
			this.$emit('close')
		},
		getEmailUrl() {
			const { newEmail } = this.emailForm
			return 'http://mail.' + newEmail.split('@')[1]
		}, 
		validateForm() {
			const { emailForm: { newEmail }, orgEmail } = this
			this.$validator.validateAll().then(() => {
				api.updateEmail({
					orgEmail,
					newEmail
				}).then(res => {
					const { msg, result, OK } = res.data

					if (result !== 'ok' && !OK) {
						this.$notify.warning({ content: msg || '验证失败' });
						return false;
					}

					this.isSuccess = true
					//   this.$notify.success({ content: msg || '重置密码已成功发至您的邮箱！' })

				}).catch((error) => {
					this.$notify.warning({ content: '邮箱发送失败，请稍候再试试！' })
				})
			})
		}
	}
}
</script>
<style lang="scss" scoped>

</style>