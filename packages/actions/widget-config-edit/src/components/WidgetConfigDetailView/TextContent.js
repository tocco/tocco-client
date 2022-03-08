import PropTypes from 'prop-types'
import React from 'react'
import {FormattedMessage} from 'react-intl'
import {Typography} from 'tocco-ui'

const TextContent = ({messageId}) => (
  <Typography.P>
    <FormattedMessage id={messageId} />
  </Typography.P>
)

TextContent.propTypes = {
  messageId: PropTypes.string.isRequired
}

export default TextContent
