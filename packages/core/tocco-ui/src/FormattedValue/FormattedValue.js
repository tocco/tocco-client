import PropTypes from 'prop-types'

import FormatterProvider, {map as typeMap} from './FormatterProvider'

/**
 *  FormattedValue component to format values with given type.
 */
const FormattedValue = ({type: componentType, value, options, breakWords}) => {
  const isNotDefined = value === undefined || value === null || value === ''

  if (isNotDefined) {
    return <span />
  }

  return <FormatterProvider componentType={componentType} value={value} options={options} breakWords={breakWords} />
}

FormattedValue.propTypes = {
  /**
   * Type of component. (e.g. phone or single-select)
   */
  type: PropTypes.oneOf(Object.keys(typeMap)).isRequired,
  /**
   * Value that should be formatted
   */
  value: PropTypes.any,
  /**
   * Type specific additional informations
   */
  options: PropTypes.object,
  /**
   * If set to false (default is true), the value can be forced to be a one-liner.
   */
  breakWords: PropTypes.bool
}

export default FormattedValue
