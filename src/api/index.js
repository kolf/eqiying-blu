import axios from 'axios'
import qs from 'qs'
const {API_ROOT} = process.env

// axios.defaults.baseURL = process.env.API_ROOT
const apis = {
	announce: API_ROOT + 'Handler/Announce.ashx', // 查询公告
	signup: API_ROOT + 'Handler/PanelBaseInfo.ashx',
	login: API_ROOT + 'Handler/UserLogin.ashx',
	validateCode: API_ROOT + 'Tools/ShowValidateCode.aspx',
	present: API_ROOT + 'Handler/Present.ashx',
	projectUsers: API_ROOT + 'Handler/ProjectUsers.ashx',
	projectUsers: API_ROOT + 'Handler/ProjectUsers.ashx',
}

export default {
	queryAnnounce() {
		return axios.post(apis.announce, qs.stringify({
      action:'queryByAgencyIdType',
      startIndex:1,
      endIndex:999999
    }))
	},
	signup(param) {
		return axios.post(apis.signup, qs.stringify(param))
	},
	login(param) {
		return axios.post(apis.login, qs.stringify(param))
	},
	validateCode(param) {
		return apis.validateCode  + '?cc=' + Date.now()
	},
	queryPresent(pageNum) {
		return axios.post(apis.present, qs.stringify({
			action: 'queryPageByAgencyId',
			startIndex: pageNum,
			endIndex: 12,
			PresentType: 2
		}))
	},
	exchange(PresentId, ChangeTotal) {
		return axios.post(apis.present, qs.stringify({
			action: 'ChangeByPresentIdPanelId',
			PresentId: PresentId,
			ChangeTotal: ChangeTotal
		}))
	},
	getUserInfo(){
		return axios.post(apis.signup, qs.stringify({
			action: 'getPanelInfoById'
		}))
	},
	queryPresentLog(pageNum){
		return axios.post(apis.present, qs.stringify({
			action: 'queryHistoryByPanelId',
			endIndex: 20,
			startIndex: pageNum,
			CheckStatus: 1
		}))
	}
}
