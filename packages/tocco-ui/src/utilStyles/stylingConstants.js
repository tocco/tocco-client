import PropTypes from 'prop-types'

const animation = {
  NONE: 'none',
  SPIN: 'spin'
}

const ink = {
  BASE: 'base',
  PRIMARY: 'primary'
}

const look = {
  FLAT: 'flat',
  PLAIN: 'plain',
  RAISED: 'raised'
}

const position = {
  AFTER: 'after',
  BEFORE: 'before',
  BETWEEN: 'between',
  SOLELY: 'solely'
}

const animationPropTypes = PropTypes.oneOf(Object.values(animation))
const inkPropTypes = PropTypes.oneOf(Object.values(ink))
const lookPropTypes = PropTypes.oneOf(Object.values(look))
const positionPropTypes = PropTypes.oneOf(Object.values(position))

export {
  animation,
  animationPropTypes,
  ink,
  inkPropTypes,
  look,
  lookPropTypes,
  position,
  positionPropTypes
}
