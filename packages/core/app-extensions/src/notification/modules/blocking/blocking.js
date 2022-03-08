import PropTypes from 'prop-types'

export const blockerPropTypes = PropTypes.shape({
  id: PropTypes.string,
  title: PropTypes.string,
  body: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
})
