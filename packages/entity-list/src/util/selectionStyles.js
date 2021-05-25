import PropTypes from 'prop-types'

const selectionStyles = {
  SINGLE: 'single',
  MULTI: 'multi',
  MULTI_EXPLICIT: 'multi_explicit',
  NONE: 'none'
}

const selectionStylePropType = PropTypes.oneOf(Object.keys(selectionStyles).map(key => selectionStyles[key]))

export {
  selectionStyles as default,
  selectionStylePropType
}
