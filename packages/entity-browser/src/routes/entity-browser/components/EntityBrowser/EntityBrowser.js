import PropTypes from 'prop-types'
import React from 'react'
import {notifier} from 'tocco-app-extensions'

import RouteWithSubRoutes from '../../../../components/RouteWithSubRoutes'
import StyledEntityBrowser from './StyledEntityBrowser'

const EntityBrowser = ({routes}) =>
  <StyledEntityBrowser>
    <notifier.Notifier/>
    {routes.map((route, i) => (
      <RouteWithSubRoutes key={i} {...route}/>
    ))
    }
  </StyledEntityBrowser>

EntityBrowser.propTypes = {
  routes: PropTypes.array.isRequired
}

export default EntityBrowser
