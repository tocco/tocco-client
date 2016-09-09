import React from 'react'
import {messages, DEFAULT as DEFAULT_MESSAGE} from './messages'

function getMessage(errorCode) {
  return messages[errorCode] || DEFAULT_MESSAGE
}

const FailureMessage = (props) => (
  <div className="FailureMessage text-danger">{getMessage(props.errorCode)}</div>
)

FailureMessage.propTypes = {
  errorCode: React.PropTypes.string
}

export default FailureMessage
