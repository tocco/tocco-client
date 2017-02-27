import React from 'react'
import {Route} from 'react-router'

export const RouteWithSubRoutes = route => (
  <Route
    path={route.path}
    exact={route.exact}
    render={props => (<route.component router={props} routes={route.routes}/>)}
  />
)
