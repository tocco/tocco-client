import React from 'react'
import {Route} from 'react-router'

export const RouteWithSubRoutes = route => (
  <Route
    path={route.path}
    render={props => (<route.component router={props} routes={route.routes}/>)}
  />
)
