import PropTypes from 'prop-types'

const selectionModes = {
  ALL: 'all',
  SELECTION: 'selection'
}

const selectionModesPropTypes = PropTypes.oneOf(Object.values(selectionModes))

export {
  selectionModes as default,
  selectionModesPropTypes
}
