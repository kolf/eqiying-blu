import axios from 'axios'
import qs from 'qs'
const { API_ROOT } = process.env

// axios.defaults.baseURL = process.env.API_ROOT
const apis = {
	announce: API_ROOT + 'Handler/Announce.ashx', // 查询公告
	signup: API_ROOT + 'Handler/PanelBaseInfo.ashx',
	login: API_ROOT + 'Handler/UserLogin.ashx',
	validateCode: API_ROOT + 'Tools/ShowValidateCode.aspx',
	present: API_ROOT + 'Handler/Present.ashx',
	projectUsers: API_ROOT + 'Handler/ProjectUsers.ashx',
	projectColumn: API_ROOT + 'Handler/ProjectColumn.ashx',
	projectInfo: API_ROOT + 'Handler/ProjectInfo.ashx',
}

export default {
	queryAnnounce() {
		return axios.post(apis.announce, qs.stringify({
			action: 'queryByProjectColumnIdType',
			startIndex: 1,
			endIndex: 999999
		}))
	},
	signup(param) {
		return axios.post(apis.signup, qs.stringify(param))
	},
	login(param) {
		return axios.post(apis.login, qs.stringify(param))
	},
	validateCode(param) {
		return apis.validateCode + '?cc=' + Date.now()
	},
	queryPresent(pageNum) {
		return axios.post(apis.present, qs.stringify({
			action: 'queryPageByProjectColumnId',
			startIndex: pageNum,
			endIndex: 12,
			PresentType: 2
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
		return axios.post(apis.signup, qs.stringify({
			action: 'getPanelInfoById'
		}))
	},
	queryPresentLog(pageNum) {
		return axios.post(apis.present, qs.stringify({
			action: 'queryHistoryByPanelId',
			endIndex: 20,
			startIndex: pageNum,
			CheckStatus: 1
		}))
	},
	queryPresentBanner(pageNum) {
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
	queryProjectInfoByUserRole({ProjectColumnId, pageNum}){
		let params = {
			action: 'queryProjectInfoByUserRole',
			startIndex: pageNum,
			endIndex: 12
		}
		if(ProjectColumnId) params.ProjectColumnId = ProjectColumnId
		return axios.post(apis.projectInfo, qs.stringify(params))
	},
	queryProjectLog({pageNum}){
		return axios.post(apis.projectUsers, qs.stringify({
			action: 'queryByPanelId',
			endIndex: 20,
			startIndex: pageNum
		}))
	}
}
