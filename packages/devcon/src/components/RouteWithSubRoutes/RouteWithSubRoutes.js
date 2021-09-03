import React from 'react'
import {Route} from 'react-router'

const getRenderFn = route =>
  router => {
    if (route.component) {
      return <route.component router={router} routes={route.routes}/>
    }

    if (route.render) {
      const props = {
        router,
        routes: route.routes
      }
      return route.render(props)
    }
  }

export const RouteWithSubRoutes = route => (
  <Route
    path={route.path}
    exact={route.exact}
    render={getRenderFn(route)}
  />
)
