import React from 'react'
import PropTypes from 'prop-types'
import {components} from 'react-select'

import {StyledDropdownIndicatorBall, StyledDropdownIndicatorWrapper} from './StyledComponents'

const DropdownIndicator = props => {
  if (props.selectProps.isDisabled) {
    return null
  }

  return <components.DropdownIndicator {...props}>
    <StyledDropdownIndicatorWrapper>
      <StyledDropdownIndicatorBall
        icon={'chevron-down'}
        visible={!props.selectProps.menuIsOpen}
        tabIndex={-1}
      />
      <StyledDropdownIndicatorBall
        icon={'chevron-up'}
        visible={props.selectProps.menuIsOpen}
        tabIndex={-1}
      />
    </StyledDropdownIndicatorWrapper>
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
