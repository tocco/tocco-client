import PropTypes from 'prop-types'
import React, {useEffect} from 'react'
import {notification} from 'tocco-app-extensions'
import {LoadMask} from 'tocco-ui'

import Result from '../Result'
import Secret from '../Secret'
import Start from '../Start'
import Verification from '../Verification'

const stages = {
  Start: 0,
  Secret: 1,
  Verification: 2,
  Result: 3
}

const TwoFactorConnector = ({initialize, stage}) => {
  useEffect(() => {
    initialize()
  }, [initialize])

  const renderContent = () => {
    switch (stage) {
      case stages.Start:
        return <Start />
      case stages.Secret:
        return <Secret />
      case stages.Verification:
        return <Verification />
      case stages.Result:
        return <Result />
      default:
        return <LoadMask />
    }
  }

  return (
    <>
      <notification.Notifications />
      {renderContent()}
    </>
  )
}

TwoFactorConnector.propTypes = {
  stage: PropTypes.number,
  initialize: PropTypes.func.isRequired,
  twoFactorActive: PropTypes.bool,
  secret: PropTypes.shape({
    secret: PropTypes.string,
    uri: PropTypes.string
  })
}

export default TwoFactorConnector
