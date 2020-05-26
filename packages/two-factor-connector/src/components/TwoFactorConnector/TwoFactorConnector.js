import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {LoadMask} from 'tocco-ui'
import {notifier} from 'tocco-app-extensions'

import Dialog from '../Dialog'
import Result from '../Result'

const TwoFactorConnector = ({initialize, twoFactorActive, secret}) => {
  useEffect(() => {
    initialize()
  }, [])

  return <div>
    <notifier.Notifier/>
    <LoadMask
      required={[twoFactorActive !== null]}
    >
      {
        secret ? <Result/> : <Dialog/>
      }
    </LoadMask>
  </div>
}

TwoFactorConnector.propTypes = {
  initialize: PropTypes.func.isRequired,
  twoFactorActive: PropTypes.bool,
  secret: PropTypes.shape({
    text: PropTypes.string,
    uri: PropTypes.string
  })
}

export default TwoFactorConnector
