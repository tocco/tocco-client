import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {LoadMask} from 'tocco-ui'
import SsoLoginApp from 'tocco-sso-login/src/main'

const Progress = ({checkAccessRights, connectPrincipal, setShowSsoLoginApp, showSsoLoginApp}) => {
  useEffect(() => {
    checkAccessRights()
  }, [checkAccessRights])

  const loginCompleted = ({provider, sub: ssoSubject}) => {
    setShowSsoLoginApp(false)
    connectPrincipal(provider, ssoSubject)
  }
  return (
    <LoadMask required={[showSsoLoginApp]}>
      <SsoLoginApp
        ssoLoginEndpoint="/sso-lookup"
        loginCompleted={loginCompleted}/>
    </LoadMask>
  )
}

Progress.propTypes = {
  checkAccessRights: PropTypes.func.isRequired,
  connectPrincipal: PropTypes.func.isRequired,
  showSsoLoginApp: PropTypes.bool.isRequired,
  setShowSsoLoginApp: PropTypes.func.isRequired
}

export default Progress
