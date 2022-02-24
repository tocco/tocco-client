import PropTypes from 'prop-types'
import {Navigate, Route, Routes} from 'react-router-dom'
import {notification} from 'tocco-app-extensions'
import {GlobalStyles} from 'tocco-ui'

import DocsBrowser from '../DocsBrowser'

const InheritedApp = ({rootPath, handleNotifications}) => (
  <>
    {handleNotifications && <notification.Notifications />}
    <GlobalStyles />

    <Routes>
      {rootPath !== '/docs' && <Route exact path="/" element={<Navigate to={rootPath} replace />} />}
      <Route exact path="/*" element={<DocsBrowser />} />
    </Routes>
  </>
)

InheritedApp.propTypes = {
  handleNotifications: PropTypes.bool,
  rootPath: PropTypes.string
}

export default InheritedApp
