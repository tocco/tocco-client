import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {LoadMask} from 'tocco-ui'
import {Helmet} from 'react-helmet'
import {notifier} from 'tocco-app-extensions'

import Login from '../../components/Login'
import fav from './favicon.ico'
import Admin from '../Admin'

const LoginGuard = ({doSessionCheck, loggedIn}) => {
  useEffect(() => { doSessionCheck() }, [])

  return (
    <div>
      <Helmet defer={false}>
        <title>Tocco</title>
        <link rel="icon" type="image/png" href={fav} sizes="16x16"/>
      </Helmet>
      <LoadMask required={[loggedIn !== undefined]} loadingText="Logging in...">
        <div>
          <notifier.Notifier/>
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
