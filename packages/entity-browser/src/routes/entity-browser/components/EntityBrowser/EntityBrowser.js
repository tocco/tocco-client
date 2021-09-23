import PropTypes from 'prop-types'
import React from 'react'
import {notification} from 'tocco-app-extensions'
import {route as routeUtil} from 'tocco-util'

import StyledEntityBrowser from './StyledEntityBrowser'

const EntityBrowser = ({routes}) =>
  <StyledEntityBrowser>
    <notification.Notifications/>
    {routes.map((route, i) => (
      <routeUtil.RouteWithSubRoutes key={i} {...route}/>
    ))
    }
  </StyledEntityBrowser>

EntityBrowser.propTypes = {
  routes: PropTypes.array.isRequired
}

export default EntityBrowser
