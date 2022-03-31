import PropTypes from 'prop-types'

import {ALLOWED_EMBED_TYPES} from '../env/env'

export const propTypes = PropTypes.shape({
  embedType: PropTypes.oneOf(ALLOWED_EMBED_TYPES)
})
