import PropTypes from 'prop-types'
import React from 'react'
import {Typography} from 'tocco-ui'
import {notification} from 'tocco-app-extensions'

import RouteWithSubRoutes from '../../../../components/RouteWithSubRoutes'
import StyledDevCon from './StyledDevCon'

const DevCon = ({routes}) =>
  <StyledDevCon>
    <notification.Notifications/>
    <Typography.Span>Tocco Developer Console</Typography.Span>
    {routes.map((route, i) => (
      <RouteWithSubRoutes key={i} {...route}/>
    ))
    }
  </StyledDevCon>

DevCon.propTypes = {
  routes: PropTypes.array.isRequired
}

export default DevCon
