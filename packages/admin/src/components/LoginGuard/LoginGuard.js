import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {LoadMask} from 'tocco-ui'
import {Helmet} from 'react-helmet'

import favApple from './apple-touch-icon.png'
import fav32 from './favicon-32x32.png'
import fav16 from './favicon-16x16.png'
import manifest from './site.webmanifest'
import safariPinned from './safari-pinned-tab.svg'
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
        <link rel="apple-touch-icon" sizes="180x180" href={favApple}/>
        <link rel="icon" type="image/png" sizes="32x32" href={fav32}/>
        <link rel="icon" type="image/png" sizes="16x16" href={fav16}/>
        <link rel="manifest" href={manifest}/>
        <link rel="mask-icon" href={safariPinned} color="#5bbad5"/>
        <meta name="msapplication-TileColor" content="#da532c"/>
        <meta name="theme-color" content="#ffffff"/>
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
