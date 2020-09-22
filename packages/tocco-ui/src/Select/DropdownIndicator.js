import React from 'react'
import PropTypes from 'prop-types'
import {components} from 'react-select'

import Ball from '../Ball'

const DropdownIndicator = props => !props.immutable && <components.DropdownIndicator {...props}>
  <Ball
    icon="chevron-down"
    tabIndex={-1}
  />
</components.DropdownIndicator>

DropdownIndicator.propTypes = {
  immutable: PropTypes.bool,
  openMenu: PropTypes.func.isRequired
}

export default DropdownIndicator
