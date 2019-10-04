import PropTypes from 'prop-types'
const searchFormTypes = {
  NONE: 'none',
  SIMPLE: 'simple',
  BASIC: 'basic',
  ADMIN: 'admin'
}

export const searchFormTypePropTypes = PropTypes.oneOf(Object.values(searchFormTypes))

export default searchFormTypes
