import PropTypes from 'prop-types'
import React from 'react'
import {Redirect, Route} from 'react-router-dom'
import {notification} from 'tocco-app-extensions'
import {GlobalStyles} from 'tocco-ui'

import DocsBrowser from '../DocsBrowser'

const InheritedApp = ({rootPath, handleNotifications}) => (
  <>
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
  </>
)

InheritedApp.propTypes = {
  handleNotifications: PropTypes.bool,
  rootPath: PropTypes.string
}

export default InheritedApp
