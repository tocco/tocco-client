import React from 'react'
import PropTypes from 'prop-types'

import Ball from '../Ball'

const DropdownIndicator = props =>
  !props.immutable
  && <Ball
    icon="chevron-down"
    tabIndex={-1}
  />

DropdownIndicator.propTypes = {
  immutable: PropTypes.bool,
  openMenu: PropTypes.func.isRequired
}

export default DropdownIndicator
