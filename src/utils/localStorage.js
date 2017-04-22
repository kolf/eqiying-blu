export default {
  get (key) {
    return JSON.parse(window.localStorage.getItem(key))
  },
  set (key, data) {
    window.localStorage.setItem(key, JSON.stringify(data))
  },
  has (key) {
    return this.get(key)
  },
  remove (key) {
    window.localStorage.removeItem(key)
  },
  removeAll (key) {
    window.localStorage.clear()
  }
}
