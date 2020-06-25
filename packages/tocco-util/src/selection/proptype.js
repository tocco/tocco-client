import PropTypes from 'prop-types'

import selectionTypes from './selectionTypes'

export default PropTypes.shape({
  entityName: PropTypes.string.isRequired,
  ids: (props, propName, componentName) => {
    if (props.selection && props.selection.type === selectionTypes.ID && !props.selection[propName]) {
      return new Error(`Selection.ids prop not defined. Component: ${componentName}'.`)
    }
  },
  query: (props, propName, componentName) => {
    if (props.selection && props.selection.type === selectionTypes.QUERY && !props.selection[propName]) {
      return new Error(`Selection.query prop not defined. Component: ${componentName}'.`)
    }
  },
  type: PropTypes.oneOf(Object.keys(selectionTypes)).isRequired,
  count: PropTypes.number
}).isRequired
