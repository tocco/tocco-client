import React from 'react'
import PropTypes from 'prop-types'
import {Router as ReactRouter} from 'react-router'
import {hot} from 'react-hot-loader/root'

import RouteWithSubRoutes from '../RouteWithSubRoutes'

const Router = ({history, routes}) => (
  <ReactRouter history={history}>
    <React.Fragment>
      {routes.map((route, i) => (
        <RouteWithSubRoutes key={i} {...route}/>
      ))}
    </React.Fragment>
  </ReactRouter>
)

Router.propTypes = {
  routes: PropTypes.array,
  history: PropTypes.object
}

export default hot(Router)
