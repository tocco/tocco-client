import PropTypes from 'prop-types'
import React from 'react'
import {Typography, Link} from 'tocco-ui'
import {notification} from 'tocco-app-extensions'

import RouteWithSubRoutes from '../../../../components/RouteWithSubRoutes'
import {StyledDevCon, StyledNavigation, StyledLink} from './StyledDevCon'

const DevCon = ({routes}) =>
  <StyledDevCon>
    <notification.Notifications/>
    <Typography.Span>Tocco Developer Console</Typography.Span>
    <StyledNavigation>
      <Link href="/log"><StyledLink>Log</StyledLink></Link>
      <Link href="/dbrefactoring"><StyledLink>DB Refactoring</StyledLink></Link>
    </StyledNavigation>
    {routes.map((route, i) => (
      <RouteWithSubRoutes key={i} {...route}/>
    ))
    }
  </StyledDevCon>

DevCon.propTypes = {
  routes: PropTypes.array.isRequired
}

export default DevCon
