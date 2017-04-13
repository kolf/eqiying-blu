const loadView = (name, index = false) => () => import(`views/${name}${index ? '/index' : ''}.vue`)
export {loadView}