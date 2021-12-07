import action from './action'
import detail from './detail'
import entityBrowser from './entity-browser'
import list from './list'

export const createRoutes = (store, input) => [
  {
    path: '/',
    render: entityBrowser(store, input),
    routes: [
      {
        path: '/',
        exact: true,
        render: list(store, input)
      },
      {
        path: '/detail/:entityId*',
        render: detail(store, input)
      },
      {
        path: '/action/:appId*',
        render: action(store, input)
      }
    ]
  }
]

export default createRoutes
