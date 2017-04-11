import axios from 'axios'
import qs from 'qs'

// const API_ROOT = '/api/'
axios.defaults.baseURL = process.env.API_ROOT

const apis = {
	announce: 'Announce.ashx', // 查询公告
	signup: 'PanelBaseInfo.ashx',
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
	}
}
