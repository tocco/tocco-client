import PropTypes from 'prop-types'
import {Routes, Navigate, Route} from 'react-router'
import {notification} from 'tocco-app-extensions'
import {GlobalStyles} from 'tocco-ui'
import {route} from 'tocco-util'

import DocsBrowser from '../DocsBrowser'

const StandaloneApp = ({rootPath, handleNotifications, history}) => (
  <route.CustomRouter history={history}>
    {handleNotifications && <notification.Notifications />}
    <GlobalStyles />

    <Routes>
      <Route exact path="/" element={<Navigate to={rootPath} replace />} />
      {rootPath !== '/docs' && <Route exact path="docs" element={<Navigate to={rootPath} replace />}></Route>}
      <Route exact path="docs/*" element={<DocsBrowser />} />
    </Routes>
  </route.CustomRouter>
)

StandaloneApp.propTypes = {
  history: PropTypes.object,
  handleNotifications: PropTypes.bool,
  rootPath: PropTypes.string
}

export default StandaloneApp
