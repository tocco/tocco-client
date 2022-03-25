import parsePhoneNumber from 'libphonenumber-js'
import _isEmpty from 'lodash/isEmpty'
import PropTypes from 'prop-types'
import React from 'react'

import Typography from '../../Typography'

const LibPhoneFormatter = ({value, breakWords}) => {
  const parsed = parsePhoneNumber(value)
  const formattedInput = _isEmpty(parsed) ? value : parsed.formatInternational()

  return <Typography.Span breakWords={breakWords}>{formattedInput}</Typography.Span>
}

LibPhoneFormatter.propTypes = {
  value: PropTypes.string,
  breakWords: PropTypes.bool
}

export default LibPhoneFormatter
