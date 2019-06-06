import React from 'react'
import PropTypes from 'prop-types'

import Button from '../Button'

const DropdownIndicator = props =>
  !props.immutable
  && <span onMouseDown={() => props.openMenu()}>
    <Button
      icon="chevron-down"
      look="ball"
      tabIndex={-1}
    />
  </span>

DropdownIndicator.propTypes = {
  immutable: PropTypes.bool,
  openMenu: PropTypes.func.isRequired
}

export default DropdownIndicator
