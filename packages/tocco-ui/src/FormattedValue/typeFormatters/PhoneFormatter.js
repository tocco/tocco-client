import PropTypes from 'prop-types'
import React from 'react'
import {parseNumber, formatNumber} from 'libphonenumber-js'
import _isEmpty from 'lodash/isEmpty'

const PhoneFormatter = props => {
  const parsed = parseNumber(props.value)
  return <span>{_isEmpty(parsed) ? props.value : formatNumber(parsed, 'International')}</span>
}

PhoneFormatter.propTypes = {
  value: PropTypes.string
}

export default PhoneFormatter
