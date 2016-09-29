// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout/CoreLayout'
import List from './List'

export const createRoutes = store => {
/*  Note: Instead of using JSX, we are using react-router PlainRoute,
    a simple javascript object to provide route definitions.
    When creating a new async route, pass the instantiated store!   */

  const routes = {
    path: '/',
    component: CoreLayout,
    indexRoute: List(store),
    getChildRoutes(location, next) {
      require.ensure([], require => {
        next(null, [
          require('./Detail').default(store)
        ])
      })
    }
  }

  return routes
}

export default createRoutes
