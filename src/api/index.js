import axios from 'axios'
import qs from 'qs'
const { API_ROOT } = process.env

// axios.defaults.baseURL = process.env.API_ROOT
const apis = {
	announce: API_ROOT + 'Handler/Announce.ashx', // 查询公告
	panelBaseInfo: API_ROOT + 'Handler/PanelBaseInfo.ashx',
	login: API_ROOT + 'Handler/UserLogin.ashx',
	validateCode: API_ROOT + 'Tools/ShowValidateCode.aspx',
	present: API_ROOT + 'Handler/Present.ashx',
	projectUsers: API_ROOT + 'Handler/ProjectUsers.ashx',
	projectColumn: API_ROOT + 'Handler/ProjectColumn.ashx',
	projectInfo: API_ROOT + 'Handler/ProjectInfo.ashx',
	paramsInfo: API_ROOT + 'Handler/ParamsInfo.ashx',
	common: API_ROOT + 'Handler/Common.ashx',
	internalMessage: API_ROOT + 'Handler/InternalMessage.ashx',
}

export default {
	API_ROOT,
	queryAnnouncement() { // 查询公告
		return axios.post(apis.announce, qs.stringify({
			action: 'queryByAgencyIdType',
			startIndex: 1,
			endIndex: 999999
		}))
	},
	getAnnouncement({ AnnounceId }) { // 查询公告详情
		return axios.post(apis.announce, qs.stringify({
			action: 'queryByAnnounceId',
			AnnounceId
		}))
	},
	signup(params) { // 注册
		return axios.post(apis.panelBaseInfo, qs.stringify(Object.assign({
			PanelType: 1,
			action: 'panelRegister',
		}, params)))
	},
	updateEmail({ orgEmail, newEmail }) { // 更新用户邮箱
		return axios.post(apis.panelBaseInfo, qs.stringify({
			action: 'updateEmail',
			orgEmail,
			newEmail
		}))
	},
	updateAvatar({ panelBaseInfoId, headPath }) { // 更新用户头像
		return axios.post(apis.panelBaseInfo, qs.stringify({
			action: 'updateheadpath',
			headPath,
			panelBaseInfoId
		}))
	},
	checkUnique({ TypeId, strWord }) { // 验证手机号、邮箱唯一性
		return axios.post(apis.common, qs.stringify({
			action: 'CheckUnique',
			IsUpdate: 0,
			AgencyId: 1,
			TypeId,
			strWord
		}))
	},
	updateRemark({ panelBaseInfoId, PanelRemark }) { // 更新用户说明
		return axios.post(apis.panelBaseInfo, qs.stringify({
			action: 'updatepanelremark',
			PanelRemark,
			panelBaseInfoId
		}))
	},
	getInviteLink() { // 获取邀请链接
		return axios.post(apis.panelBaseInfo, qs.stringify({
			action: 'getInviteLink'
		}))
	},
	sendSms({ PanelMobiles }) { // 发送短信
		return axios.post(apis.common, qs.stringify({
			action: 'sendsmscode',
			PanelMobiles
		}))
	},
	updateMobile({ orgPhone, newPhone, smsCode}) { // 更新手机号
		return axios.post(apis.panelBaseInfo, qs.stringify({
			action: 'updatemobile',
			orgPhone,
			newPhone,
			smsCode
		}))
	},
	login(params) { //登陆
		return axios.post(apis.login, qs.stringify(params))
	},
	retrievePwd(params) { // 重置密码
		params = Object.assign({
			retrieveWay: 2,
			action: 'retrievePwd'
		}, params)
		return axios.post(apis.panelBaseInfo, qs.stringify(params))
	},
	changePwd(params) { // 修改密码
		params = Object.assign({
			action: 'ChangePwd'
		}, params)
		return axios.post(apis.panelBaseInfo, qs.stringify(params))
	},
	validateCode: apis.validateCode,
	queryPresent(pageNum) { // 查询礼品
		const pageSize = 12
		return axios.post(apis.present, qs.stringify({
			action: 'queryPageByAgencyId',
			startIndex: pageSize * (pageNum - 1) + 1,
			endIndex: pageSize * pageNum,
			PresentType: 1
		}))
	},
	exchange(PresentId, ChangeTotal) { // 兑换礼品
		return axios.post(apis.present, qs.stringify({
			action: 'ChangeByPresentIdPanelId',
			PresentId,
			ChangeTotal
		}))
	},
	getUserInfo() { // 获取用户信息
		return axios.post(apis.panelBaseInfo, qs.stringify({
			action: 'getPanelInfoById'
		}))
	},
	queryPresentLog(pageNum, pageSize) { // 查询兑换记录
		return axios.post(apis.present, qs.stringify({
			action: 'queryHistoryByPanelId',
			startIndex: pageSize * (pageNum - 1) + 1,
			endIndex: pageSize * pageNum,
			CheckStatus: 1
		}))
	},
	queryPresentBanner() { // 查询礼品banner
		return axios.post(apis.present, qs.stringify({
			action: 'getLastPresent',
			top: 5,
			filedOrder: 'CreateTime Desc'
		}))
	},
	queryColumns() { // 查询栏目
		return axios.post(apis.projectColumn, qs.stringify({
			action: 'getAllPcAndPjInfo'
		}))
	},
	queryProjectInfoByUserRole({ ProjectColumnId, pageNum, pageSize }) { // 查询活动
		let params = {
			action: 'queryProjectInfoByUserRole',
			startIndex: pageSize * (pageNum - 1) + 1,
			endIndex: pageSize * pageNum,
		}
		if (ProjectColumnId) params.ProjectColumnId = ProjectColumnId
		return axios.post(apis.projectInfo, qs.stringify(params))
	},
	queryProjectLog({ pageNum, pageSize }) { //查询活动参与记录
		return axios.post(apis.projectUsers, qs.stringify({
			action: 'queryByPanelId',
			startIndex: pageSize * (pageNum - 1) + 1,
			endIndex: pageSize * pageNum,
		}))
	},
	getInternalLink({ PjId }) { // 获取参与链接
		return axios.post(apis.projectUsers, qs.stringify({
			action: 'queryByPjId',
			PjId
		}))
	},
	getProjectInfo({ id }) { // 获取活动详情
		return axios.post(apis.projectInfo, qs.stringify({
			action: 'queryByPjId',
			PjId: id
		}))
	},
	getPresentInfo({ id }) { // 获取礼品详情
		return axios.post(apis.present, qs.stringify({
			action: 'queryByPresentId',
			PresentId: id
		}))
	},
	queryByParenterCode({ ParenterCode, typeCode }) { //查询省市
		return axios.post(apis.paramsInfo, qs.stringify({
			action: 'queryByParenterCode',
			ParenterCode,
			typeCode: 'AC0001'
		}))
	},
	queryMsg({ pageNum, pageSize }) { //查询消息
		return axios.post(apis.internalMessage, qs.stringify({
			action: 'queryByPanelId',
			startIndex: pageSize * (pageNum - 1) + 1,
			endIndex: pageSize * pageNum,
		}))
	},
	setMsg(params) { //发送消息
		const defaultParams = {
			action: 'insert',
			ParentId: 0,
			MessageType: 1
		}
		return axios.post(apis.internalMessage, qs.stringify(Object.assign(defaultParams, params)))
	},
	deteleMsg({ InternalMessageId }) { //删除消息
		return axios.post(apis.internalMessage, qs.stringify({
			action: 'delete',
			InternalMessageId
		}))
	},
	updateMsgStatus() { //将所以消息置为已读
		return axios.post(apis.internalMessage, qs.stringify({
			action: 'updateByReciptorId'
		}))
	},
	getUserId({ nickname }) { //获取用户Id
		return axios.post(apis.panelBaseInfo, qs.stringify({
			action: 'NickNameIsExist',
			nickname
		}))
	}
}
