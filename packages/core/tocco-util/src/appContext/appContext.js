import PropTypes from 'prop-types'

import {ALLOWED_EMBED_TYPES} from '../env/env'

export const propTypes = PropTypes.shape({
  embedType: PropTypes.oneOf(ALLOWED_EMBED_TYPES),
  widgetConfigKey: (props, propName, componentName) => {
    // widgetConfigKey is only required for widgets
    if (props.embedType === 'widget' && !props[propName]) {
      return new Error('Prop `' + propName + '` is missing for ' + ' `' + componentName + '`. Validation failed.')
    }
  }
})
