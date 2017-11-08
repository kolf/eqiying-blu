import { atob, btoa } from 'Base64'
const { ROOT } = process.env

export default {
    decode(str) {
        return decodeURIComponent(atob(str))
    },
    encode(str) {
        return btoa(encodeURIComponent(str))
    },
    fromatDate(str, isTime) {
        if (!str) return ''
        return str.replace('T', ' ').substr(0, (isTime ? 10 : 19))
    },
    sex(str) {
        const data = {
            1: '男',
            2: '女'
        }
        return data[str]
    },
    assetsUrl(url) {
        return /http/.test(url) ? url : ROOT + '/' + url
    },
    filterHTML(str) {
        str = str.replace(/<\/?[^>]+>/g, '')
        str = str.replace(/[ | ]*\n/g, '\n')
        str = str.replace(/\n[\s| | ]*\r/g, '\n')
        str = str.replace(/&nbsp;/ig, '')
        return str
    }
}