/**
 * Validate if valid css dimension as PropTypes.
 * @param  {object} props
 * @param  {string} propName
 * @param  {string} componentName
 * @return {object or null}
 */
export const validateCssDimension = (props, propName, componentName) => {
  componentName = componentName || 'ANONYMOUS'
  const value = props[propName]

  if (value !== undefined && !/^[1-9][0-9]*(%|em|fr|px|rem|vh|vmax|vmin|vw)$/.test(value)) {
    return new Error(
      `Invalid prop ${propName} supplied to ${componentName} (${value}).`
    )
  } else {
    return null
  }
}
