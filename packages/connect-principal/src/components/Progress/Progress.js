import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {LoadingSpinner} from 'tocco-ui'
import styled from 'styled-components'
import SsoLoginApp from 'tocco-sso-login/src/main'

const StyledDiv = styled.div`
  text-align: center;
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  height: 40px;
`

const Progress = ({checkAccessRights, connectPrincipal, setShowSsoLoginApp, showSsoLoginApp}) => {
  useEffect(() => {
    checkAccessRights()
  }, [checkAccessRights])

  if (showSsoLoginApp) {
    const loginCompleted = ({provider, sub: ssoSubject}) => {
      setShowSsoLoginApp(false)
      connectPrincipal(provider, ssoSubject)
    }
    return (
      <SsoLoginApp
        ssoLoginEndpoint="/sso-lookup"
        loginCompleted={loginCompleted}/>
    )
  } else {
    return (
      <StyledDiv>
        <LoadingSpinner size="30px"/>
      </StyledDiv>
    )
  }
}

Progress.propTypes = {
  checkAccessRights: PropTypes.func.isRequired,
  connectPrincipal: PropTypes.func.isRequired,
  showSsoLoginApp: PropTypes.bool.isRequired,
  setShowSsoLoginApp: PropTypes.func.isRequired
}

export default Progress
