import React from 'react'
import {FormattedMessage} from 'react-intl'
import {messages, DEFAULT as DEFAULT_MESSAGE} from './messages'

function getMessage(errorCode) {
  return messages[errorCode] || DEFAULT_MESSAGE
}

const FailureMessage = props => (
  <div className="FailureMessage text-danger"><FormattedMessage id={getMessage(props.errorCode)}/></div>
)

FailureMessage.propTypes = {
  errorCode: React.PropTypes.string
}

export default FailureMessage
