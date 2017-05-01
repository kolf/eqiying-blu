import { atob, btoa } from 'Base64'

export default {
    decode(str) {
        return decodeURIComponent(atob(str))
    },
    encode(str) {
        return encodeURIComponent(btoa(str))
    },
    fromatDate(str, isTime) {
        return str.replace('T', ' ').substr(0, (isTime ? 10 : 19))
    }
}