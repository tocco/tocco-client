// @flow

import React from 'react'
import {FormattedMessage} from 'react-intl'
import {messages, DEFAULT as DEFAULT_MESSAGE} from './messages'

function getMessage(errorCode: ?string): string {
  return messages[errorCode] || DEFAULT_MESSAGE
}

type Props = {
  errorCode?: string
}

const FailureMessage = (props: Props) => (
  <div className="FailureMessage text-danger"><FormattedMessage id={getMessage(props.errorCode)}/></div>
)

export default FailureMessage
