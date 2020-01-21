import React from 'react'
import PropTypes from 'prop-types'

import Ball from '../Ball'

const ClearIndicator = props =>
  <span {...props.innerProps}>
    <Ball
      icon="times"
      tabIndex={-1}
    />
  </span>

ClearIndicator.propTypes = {
  innerProps: PropTypes.object
}

export default ClearIndicator
