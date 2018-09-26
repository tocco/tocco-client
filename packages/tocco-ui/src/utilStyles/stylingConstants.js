import PropTypes from 'prop-types'

import assertObjectValuesMatchOtherObjectKeys from './assertObjectValuesMatchOtherObjectKeys'

const animation = {
  NONE: 'none',
  SPIN: 'spin'
}

const condition = {
  BASE: 'base',
  DANGER: 'danger',
  PRIMARY: 'primary',
  SUCCESS: 'success',
  WARNING: 'warning'
}

const format = {
  HTML: 'html',
  SVG: 'svg'
}

const ink = {
  BASE: 'base',
  PRIMARY: 'primary'
}

const layout = {
  BOX: 'layoutBox',
  CONTAINER: 'layoutContainer',
  NONE: 'none'
}

const look = {
  FLAT: 'flat',
  PLAIN: 'plain',
  RAISED: 'raised'
}

const position = {
  APPEND: 'append',
  BETWEEN: 'between',
  PREPEND: 'prepend',
  SOLE: 'sole'
}

const oneOfPropTypeAndCompletelyMapped = (completeMap, potentialIncompleteMap) => {
  return assertObjectValuesMatchOtherObjectKeys(completeMap, potentialIncompleteMap)
    && PropTypes.oneOf(Object.values(completeMap))
}

const animationPropTypes = PropTypes.oneOf(Object.values(animation))
const conditionPropTypes = potentialIncompleteMap => oneOfPropTypeAndCompletelyMapped(condition, potentialIncompleteMap)
const inkPropTypes = PropTypes.oneOf(Object.values(ink))
const lookPropTypes = PropTypes.oneOf(Object.values(look))
const positionPropTypes = PropTypes.oneOf(Object.values(position))
const layoutPropTypes = PropTypes.oneOf(Object.values(layout))

export {
  animation,
  animationPropTypes,
  condition,
  conditionPropTypes,
  ink,
  inkPropTypes,
  layout,
  layoutPropTypes,
  look,
  lookPropTypes,
  format,
  oneOfPropTypeAndCompletelyMapped,
  position,
  positionPropTypes
}
