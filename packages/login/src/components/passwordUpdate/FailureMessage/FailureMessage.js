import PropTypes from 'prop-types'
import React from 'react'
import {FormattedMessage} from 'react-intl'
import {design, SignalList} from 'tocco-ui'

import {messages, DEFAULT as DEFAULT_MESSAGE} from './messages'

function getMessage(errorCode) {
  return messages[errorCode] || DEFAULT_MESSAGE
}

const FailureMessage = props => (
  <SignalList.List>
    <SignalList.Item condition={design.condition.DANGER}>
      <FormattedMessage id={getMessage(props.errorCode)}/>
    </SignalList.Item>
  </SignalList.List>
)

FailureMessage.propTypes = {
  errorCode: PropTypes.string
}

export default FailureMessage
