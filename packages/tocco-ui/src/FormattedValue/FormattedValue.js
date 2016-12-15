import React from 'react'

import provider from './typeFormatterProvider'
import './styles.scss'

/**
 *  FormattedValue component to format values with given type.
 */
const FormattedValue = props => {
  return (
    <span>
      {provider(props.type, props.value)}
    </span>)
}

FormattedValue.propTypes = {

  /**
   * Type of value. E.g. Phone
   */
  type: React.PropTypes.oneOf([
    'birthdate',
    'boolean',
    'char', 'counter',
    'date',
    'datetime',
    'decimal',
    'double',
    'duration',
    'email',
    'integer',
    'latitude',
    'long',
    'longitude',
    'moneyamount',
    'phone',
    'short',
    'string',
    'text',
    'time',
    'url'
  ]).isRequired,
  /**
   * Value that should be formatted
   */
  value: React.PropTypes.any.isRequired
}

export default FormattedValue

