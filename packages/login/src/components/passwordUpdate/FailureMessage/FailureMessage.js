import PropTypes from 'prop-types'
import React from 'react'
import {FormattedMessage} from 'react-intl'
import {messages, DEFAULT as DEFAULT_MESSAGE} from './messages'

function getMessage(errorCode) {
  return messages[errorCode] || DEFAULT_MESSAGE
}

const FailureMessage = props => (
  <div className="alert alert-danger" role="alert"><FormattedMessage id={getMessage(props.errorCode)}/></div>
)

FailureMessage.propTypes = {
  errorCode: PropTypes.string
}

export default FailureMessage
