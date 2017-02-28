import React from 'react'
import {Route} from 'react-router'

const defaultRender = (route, props) => <route.component router={props} routes={route.routes}/>

export const RouteWithSubRoutes = route => (
  <Route
    path={route.path}
    exact={route.exact}
    render={route.render || defaultRender.bind(null, route)}
  />
)
