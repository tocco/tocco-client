import {route} from 'tocco-util'

export default (store, input) => (
  route.loadRoute(store, input, () => (import('./route')))
)
