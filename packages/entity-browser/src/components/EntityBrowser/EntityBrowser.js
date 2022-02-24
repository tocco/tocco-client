import React from 'react'
import {Route, Switch} from 'react-router-dom'
import {notification} from 'tocco-app-extensions'

import ActionView from '../ActionView'
import EntityDetail from '../EntityDetail'
import ListView from '../ListView'
import StyledEntityBrowser from './StyledEntityBrowser'

const EntityBrowser = () => (
  <StyledEntityBrowser>
    <notification.Notifications />
    <Switch>
      <Route path="/" exact render={router => <ListView router={router} />} />
      <Route path="/detail/:entityId*" render={router => <EntityDetail router={router} />} />
      <Route path="/action/:appId*" render={router => <ActionView router={router} />} />
    </Switch>
  </StyledEntityBrowser>
)

EntityBrowser.propTypes = {}

export default EntityBrowser
