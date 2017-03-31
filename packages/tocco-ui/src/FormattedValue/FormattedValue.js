import React from 'react'

import provider, {map as typeMap} from './typeFormatterProvider'

/**
 *  FormattedValue component to format values with given type.
 */
const FormattedValue = props => {
  const isNotDefined = value => (value === undefined || value === null || value === '')

  if (isNotDefined(props.value)) {
    return <span/>
  }

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
  value: React.PropTypes.any
}

export default FormattedValue
