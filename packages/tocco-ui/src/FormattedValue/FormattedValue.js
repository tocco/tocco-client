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
    'string',
    'char',
    'text',
    'short',
    'integer',
    'long',
    'decimal',
    'double',
    'phone',
    'counter',
    'url',
    'date',
    'birthdate',
    'datetime',
    'time',
    'duration',
    'email',
    'moneyamount',
    'boolean',
    'latitude',
    'longitude'
  ]).isRequired,
  /**
   * Value that should be formatted
   */
  value: React.PropTypes.any.isRequired
}

export default FormattedValue

