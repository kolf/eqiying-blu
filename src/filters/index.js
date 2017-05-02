import {atob, btoa} from 'Base64'

export default {
    decode(str) {
        return decodeURIComponent(atob(str))
    },
    encode(str) {
        return encodeURIComponent(btoa(str))
    },
    fromatDate(str, isTime) {
        if(!str) return ''
        return str.replace('T', ' ').substr(0, (isTime ? 10 : 19))
    },
    sex(str) {
        const data = {
            1: '男',
            2: '女'
        }
        return data[str]
    }
}