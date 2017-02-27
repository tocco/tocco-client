import list from './list'
import entityBrowser from './entity-browser'
import detail from './detail'

export const createRoutes = store => [{
  path: '/',
  component: entityBrowser,
  routes: [
    {
      path: '/',
      exact: true,
      component: list
    },
    {
      path: '/detail/:entityId',
      component: detail
    }
  ]
}]

export default createRoutes
