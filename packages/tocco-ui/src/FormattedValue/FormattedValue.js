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
    'phone',
    'counter',
    'number',
    'text',
    'url',
    'date',
    'birthdate',
    'email',
    'moneyamount',
    'boolean'
  ]).isRequired,
  /**
   * Value that should be formatted
   */
  value: React.PropTypes.node.isRequired
}

export default FormattedValue
