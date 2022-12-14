import PropTypes from 'prop-types'

export const createPropTypes = externalEvents =>
  externalEvents.reduce(
    (propTypes, event) => ({
      ...propTypes,
      [event]: PropTypes.func
    }),
    {}
  )
