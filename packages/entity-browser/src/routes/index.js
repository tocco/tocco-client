import list from './list'
import entityBrowser from './entity-browser'
import detail from './detail'

export const createRoutes = (store, input) => [{
  path: '/',
  render: entityBrowser(store, input),
  routes: [
    {
      path: '/',
      exact: true,
      render: list(store, input)
    },
    {
      path: '/detail/:entityId',
      render: detail(store, input)
    }
  ]
}]

export default createRoutes
