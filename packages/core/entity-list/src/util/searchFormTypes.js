import PropTypes from 'prop-types'
const searchFormTypes = {
  NONE: 'none',
  FULLTEXT: 'fulltext',
  SIMPLE: 'simple',
  SIMPLE_ADVANCED: 'simple_advanced',
  ADVANCED: 'advanced',
  ADMIN: 'admin'
}

export const searchFormTypePropTypes = PropTypes.oneOf(Object.values(searchFormTypes))

export default searchFormTypes
