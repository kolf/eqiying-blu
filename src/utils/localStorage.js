export default {
  get (key, exp) {
    const {value, time} = JSON.parse(window.localStorage.getItem(key))
    if(value){
      if(exp && Date.now()-time>exp){
        this.remove(key)
        return null
      }else{
        return value
      }
    }else{
      return null
    }
  },
  set (key, data) {
    window.localStorage.setItem(key, JSON.stringify({value: data, time: Date.now()}))
  },
  has (key, exp) {
    return this.get(key, exp)
  },
  remove (key) {
    window.localStorage.removeItem(key)
  },
  removeAll (key) {
    window.localStorage.clear()
  }
}
