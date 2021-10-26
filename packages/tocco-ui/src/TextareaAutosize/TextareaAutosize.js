import React from 'react'
import PropTypes from 'prop-types'

import {StyledSizeWrapper, StyledTextarea} from './StyledComponents'

const TextareaAutosize = ({value, onChange, name, id, disabled, immutable}) => (
  <StyledSizeWrapper data-replicated-value={value}>
    <StyledTextarea
      value={value}
      name={name}
      id={id}
      onChange={onChange}
      disabled={disabled}
      immutable={immutable}
      rows="1"
    />
  </StyledSizeWrapper>
)

TextareaAutosize.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.node,
  name: PropTypes.string,
  id: PropTypes.string,
  disabled: PropTypes.bool,
  immutable: PropTypes.bool
}

export default TextareaAutosize
