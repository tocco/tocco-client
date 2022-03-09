import PropTypes from 'prop-types'
import React from 'react'
import {Router as ReactRouter} from 'react-router'

import RouteWithSubRoutes from './RouteWithSubRoutes'

const Router = ({history, routes}) => (
  <ReactRouter history={history}>
    <React.Fragment>
      {routes.map((route, i) => (
        <RouteWithSubRoutes key={i} {...route} />
      ))}
    </React.Fragment>
  </ReactRouter>
)

Router.propTypes = {
  routes: PropTypes.array.isRequired,
  history: PropTypes.object
}

export default Router
