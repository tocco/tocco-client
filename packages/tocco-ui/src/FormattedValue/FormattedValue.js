import React from 'react'

import provider, {map as typeMap} from './typeFormatterProvider'
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
  type: React.PropTypes.oneOf(
    Object.keys(typeMap)
  ).isRequired,
  /**
   * Value that should be formatted
   */
  value: React.PropTypes.any.isRequired
}

export default FormattedValue

