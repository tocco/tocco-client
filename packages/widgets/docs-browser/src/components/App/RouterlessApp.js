import PropTypes from 'prop-types'
import {useEffect} from 'react'
import {notification} from 'tocco-app-extensions'
import {GlobalStyles} from 'tocco-ui'

import {withInternalRouter} from '../../utils/withRouter'
import DocsBrowser from '../DocsBrowser'

const RouterlessApp = ({handleNotifications, rootPath, navigate, path}) => {
  useEffect(() => {
    const isRoot = !path || path === '/' || path === '/docs'
    if (isRoot && rootPath !== path) {
      navigate(rootPath)
    }
  }, [rootPath, path, navigate])

  return (
    <>
      {handleNotifications && <notification.Notifications />}
      <GlobalStyles />
      <DocsBrowser />
    </>
  )
}

RouterlessApp.propTypes = {
  handleNotifications: PropTypes.bool,
  rootPath: PropTypes.string,
  navigate: PropTypes.func.isRequired,
  path: PropTypes.string
}

export default withInternalRouter(RouterlessApp)
