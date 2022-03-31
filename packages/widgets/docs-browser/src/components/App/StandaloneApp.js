import PropTypes from 'prop-types'
import {Redirect, Route, Router as ReactRouter} from 'react-router'
import {notification} from 'tocco-app-extensions'
import {GlobalStyles} from 'tocco-ui'

import DocsBrowser from '../DocsBrowser'

const StandaloneApp = ({rootPath, handleNotifications, history}) => (
  <ReactRouter history={history}>
    {handleNotifications && <notification.Notifications />}
    <GlobalStyles />

    <DocsBrowser />
    <Route exact path="/">
      <Redirect to={rootPath} />
    </Route>
    {rootPath !== '/docs' && (
      <Route exact path="/docs">
        <Redirect to={rootPath} />
      </Route>
    )}
  </ReactRouter>
)

StandaloneApp.propTypes = {
  history: PropTypes.object,
  handleNotifications: PropTypes.bool,
  rootPath: PropTypes.string
}

export default StandaloneApp
