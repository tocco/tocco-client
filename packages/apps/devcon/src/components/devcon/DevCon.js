import {Redirect, Route, Switch} from 'react-router-dom'
import {notification} from 'tocco-app-extensions'
import {Typography} from 'tocco-ui'

import DbRefactoring from '../dbrefactoring/DbRefactoring'
import LogView from '../log/LogView'
import ModelValidationView from '../modelvalidation/ModelValidationView'
import SqlLogView from '../sqllog/LogView'
import {StyledDevCon, StyledNavigation, StyledRouterLink} from './StyledDevCon'

const DevCon = () => (
  <StyledDevCon>
    <notification.Notifications />
    <Typography.Span>Tocco Developer Console</Typography.Span>
    <StyledNavigation>
      <StyledRouterLink to="/log">Log</StyledRouterLink>
      <StyledRouterLink to="/modelvalidation">Model Validation</StyledRouterLink>
      <StyledRouterLink to="/dbrefactoring">DB Refactoring</StyledRouterLink>
      <StyledRouterLink to="/sqllog">SQL Log</StyledRouterLink>
    </StyledNavigation>
    <Switch>
      <Route path="/" exact render={() => <Redirect to={{pathname: '/log'}} />} />
      <Route path="/log" exact render={() => <LogView />} />
      <Route path="/dbrefactoring" exact render={() => <DbRefactoring />} />
      <Route path="/modelvalidation" exact render={() => <ModelValidationView />} />
      <Route path="/sqllog" exact render={() => <SqlLogView />} />
    </Switch>
  </StyledDevCon>
)

DevCon.propTypes = {}

export default DevCon
