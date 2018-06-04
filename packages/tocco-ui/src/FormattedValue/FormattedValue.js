import PropTypes from 'prop-types'
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
      {provider(props.type, props.value, props.options)}
    </span>)
}

FormattedValue.propTypes = {

  /**
   * Type of value. E.g. Phone
   */
  type: PropTypes.oneOf(
    Object.keys(typeMap)
  ).isRequired,
  /**
   * Value that should be formatted
   */
  value: PropTypes.any,
  /**
   * Type specific additional informations
   */
  options: PropTypes.object
}

export default FormattedValue
