import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {LoadMask} from 'tocco-ui'
import {notifier} from 'tocco-app-extensions'

import Start from '../Start'
import Secret from '../Secret'
import Verification from '../Verification'
import Result from '../Result'

const stages = {
  Start: 0,
  Secret: 1,
  Verification: 2,
  Result: 3
}

const TwoFactorConnector = ({initialize, stage}) => {
  useEffect(() => {
    initialize()
  }, [])

  const renderContent = () => {
    switch (stage) {
      case stages.Start:
        return <Start/>
      case stages.Secret:
        return <Secret/>
      case stages.Verification:
        return <Verification/>
      case stages.Result:
        return <Result/>
      default:
        return <LoadMask/>
    }
  }

  return (
    <>
      <notifier.Notifier/>
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
