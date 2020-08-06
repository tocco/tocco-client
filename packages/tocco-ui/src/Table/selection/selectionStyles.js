import PropTypes from 'prop-types'

const selectionStyles = {
  SINGLE: 'single',
  MULTI: 'multi',
  NONE: 'none'
}

const selectionStylePropType = PropTypes.oneOf(Object.keys(selectionStyles).map(key => selectionStyles[key]))

export {
  selectionStyles as default,
  selectionStylePropType
}
