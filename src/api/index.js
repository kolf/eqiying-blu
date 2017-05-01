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
	common: API_ROOT + 'Handler/common.ashx',
	internalMessage: API_ROOT + 'Handler/InternalMessage.ashx',
}

export default {
	API_ROOT,
	queryAnnounce() {
		return axios.post(apis.announce, qs.stringify({
			action: 'queryByProjectColumnIdType',
			startIndex: 1,
			endIndex: 999999
		}))
	},
	signup(params) {
		return axios.post(apis.panelBaseInfo, qs.stringify(params))
	},
	updateAvatar({ panelBaseInfoId, headPath }) {
		return axios.post(apis.panelBaseInfo, qs.stringify({
			action: 'updateheadpath',
			headPath,
			panelBaseInfoId
		}))
	},
	login(params) {
		return axios.post(apis.login, qs.stringify(params))
	},
	retrievePwd(params) {
		params = Object.assign({
			retrieveWay: 2,
			action: 'retrievePwd'
		}, params)
		return axios.post(apis.panelBaseInfo, qs.stringify(params))
	},
	changePwd(params) {
		params = Object.assign({
			action: 'ChangePwd'
		}, params)
		return axios.post(apis.panelBaseInfo, qs.stringify(params))
	},
	validateCode(param) {
		return apis.validateCode + '?cc=' + Date.now()
	},
	queryPresent(pageNum) {
		const pageSize = 12
		return axios.post(apis.present, qs.stringify({
			action: 'queryPageByAgencyId',
			startIndex: pageSize * (pageNum - 1) + 1,
			endIndex: pageSize * pageNum,
			PresentType: 1
		}))
	},
	exchange(PresentId, ChangeTotal) {
		return axios.post(apis.present, qs.stringify({
			action: 'ChangeByPresentIdPanelId',
			PresentId,
			ChangeTotal
		}))
	},
	getUserInfo() {
		return axios.post(apis.panelBaseInfo, qs.stringify({
			action: 'getPanelInfoById'
		}))
	},
	queryPresentLog(pageNum, pageSize) {
		return axios.post(apis.present, qs.stringify({
			action: 'queryHistoryByPanelId',
			startIndex: pageSize * (pageNum - 1) + 1,
			endIndex: pageSize * pageNum,
			CheckStatus: 1
		}))
	},
	queryPresentBanner() {
		return axios.post(apis.present, qs.stringify({
			action: 'getLastPresent',
			top: 5,
			filedOrder: 'CreateTime Desc'
		}))
	},
	queryColumns() {
		return axios.post(apis.projectColumn, qs.stringify({
			action: 'getAllPcAndPjInfo'
		}))
	},
	queryProjectInfoByUserRole({ ProjectColumnId, pageNum, pageSize}) {
		let params = {
			action: 'queryProjectInfoByUserRole',
			startIndex: pageSize * (pageNum - 1) + 1,
			endIndex: pageSize * pageNum,
		}
		if (ProjectColumnId) params.ProjectColumnId = ProjectColumnId
		return axios.post(apis.projectInfo, qs.stringify(params))
	},
	queryProjectLog({ pageNum, pageSize}) {
		return axios.post(apis.projectUsers, qs.stringify({
			action: 'queryByPanelId',
			startIndex: pageSize * (pageNum - 1) + 1,
			endIndex: pageSize * pageNum,
		}))
	},
	getProjectInfo({ id }) {
		return axios.post(apis.projectInfo, qs.stringify({
			action: 'queryByPjId',
			PjId: id
		}))
	},
	getPresentInfo({ id }) {
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
	getUserId({ nickname }) { //获取用户Id
		return axios.post(apis.panelBaseInfo, qs.stringify({
			action: 'NickNameIsExist',
			nickname
		}))
	}
}
