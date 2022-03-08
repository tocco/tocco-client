import PropTypes from 'prop-types'
import React from 'react'
import {Typography} from 'tocco-ui'

const TextValue = ({value}) => <Typography.Span>{value}</Typography.Span>

TextValue.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
}

export default TextValue
