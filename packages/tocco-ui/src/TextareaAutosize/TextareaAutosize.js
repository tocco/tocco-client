import React from 'react'
import PropTypes from 'prop-types'
import {userAgent} from 'tocco-util'

import {StyledSizeWrapper, StyledTextarea} from './StyledComponents'

const TextareaAutosize = ({value, onChange, name, id, disabled, immutable}) => (
    <StyledSizeWrapper
      // remove autosize feature for safari to be able to type fluently
      data-replicated-value={userAgent.isSafari() ? '' : value}
    >
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
