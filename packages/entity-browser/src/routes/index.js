import list from './list'
import entityBrowser from './entity-browser'
import detail from './detail'

export const createRoutes = store => [{
  path: '/',
  render: entityBrowser(store),
  routes: [
    {
      path: '/',
      exact: true,
      render: list(store)
    },
    {
      path: '/detail/:entityId',
      render: detail(store)
    }
  ]
}]

export default createRoutes
