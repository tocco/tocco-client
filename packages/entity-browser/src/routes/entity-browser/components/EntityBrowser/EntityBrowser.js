import PropTypes from 'prop-types'
import React from 'react'
import {notification} from 'tocco-app-extensions'

import RouteWithSubRoutes from '../../../../components/RouteWithSubRoutes'
import StyledEntityBrowser from './StyledEntityBrowser'

const EntityBrowser = ({routes}) =>
  <StyledEntityBrowser>
    <notification.Notifications/>
    {routes.map((route, i) => (
      <RouteWithSubRoutes key={i} {...route}/>
    ))
    }
  </StyledEntityBrowser>

EntityBrowser.propTypes = {
  routes: PropTypes.array.isRequired
}

export default EntityBrowser
