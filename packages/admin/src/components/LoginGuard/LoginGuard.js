import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {LoadMask} from 'tocco-ui'
import {Helmet} from 'react-helmet'

import Login from '../../components/Login'
import Admin from '../Admin'

const LoginGuard = ({doSessionCheck, loggedIn}) => {
  useEffect(() => {
    doSessionCheck()
  }, [])

  return (
    <div>
      <Helmet defer={false}>
        <title>Tocco</title>
      </Helmet>
      <LoadMask required={[loggedIn !== undefined]} loadingText="Logging in...">
        <div>
          {!loggedIn ? <Login/> : <Admin/>}
        </div>
      </LoadMask>
    </div>
  )
}

LoginGuard.propTypes = {
  loggedIn: PropTypes.bool,
  doSessionCheck: PropTypes.func.isRequired
}

export default LoginGuard
