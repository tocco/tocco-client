import {route} from 'tocco-util'

export default (store, input) => {
  return route.loadRoute(store, input, () => (import('./route')))
}
