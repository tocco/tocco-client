import React from 'react'
import PropTypes from 'prop-types'
import {components} from 'react-select'

import Ball from '../Ball'

const DropdownIndicator = props => {
  return !props.selectProps.isDisabled && <components.DropdownIndicator {...props}>
    <Ball
      icon={props.selectProps.menuIsOpen ? 'chevron-up' : 'chevron-down'}
      tabIndex={-1}
    />
  </components.DropdownIndicator>
}

DropdownIndicator.propTypes = {
  immutable: PropTypes.bool,
  selectProps: PropTypes.shape({
    menuIsOpen: PropTypes.bool,
    isDisabled: PropTypes.bool
  })
}

export default DropdownIndicator
