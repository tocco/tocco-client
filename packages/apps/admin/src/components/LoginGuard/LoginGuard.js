import PropTypes from 'prop-types'
import {useEffect} from 'react'
import {Helmet} from 'react-helmet'
import {LoadMask} from 'tocco-ui'

import LoginScreen from '../../components/LoginScreen'
import Admin from '../Admin'

const LoginGuard = ({connectSocket, sessionHeartbeat, loggedIn}) => {
  useEffect(() => {
    connectSocket()
    sessionHeartbeat()
  }, [connectSocket, sessionHeartbeat])

  return (
    <div>
      <Helmet defer={false}>
        <title>Tocco</title>
      </Helmet>
      <LoadMask required={[loggedIn !== undefined]} loadingText="Logging in...">
        <div>{!loggedIn ? <LoginScreen /> : <Admin />}</div>
      </LoadMask>
    </div>
  )
}

LoginGuard.propTypes = {
  loggedIn: PropTypes.bool,
  connectSocket: PropTypes.func.isRequired,
  sessionHeartbeat: PropTypes.func.isRequired
}

export default LoginGuard
