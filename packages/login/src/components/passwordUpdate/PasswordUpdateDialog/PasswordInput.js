import PropTypes from 'prop-types'
import React from 'react'
import {design, StatedValue} from 'tocco-ui'

import {StyledPasswordInput, StyledPasswordInputWrapper} from './StyledPasswordInput'

const PasswordInput = props => {
  const getSignal = props.value
    ? props.valid
      ? design.condition.SUCCESS
      : design.condition.DANGER
    : null

  return (
    <StatedValue
      hasValue={!!props.value}
      id={`${props.name}-input`}
      immutable={props.readOnly === true}
      label={props.label}
      signal={getSignal}
    >
      <StyledPasswordInputWrapper immutable={props.readOnly === true}>
        <StyledPasswordInput
          id={`${props.name}-input`}
          value={props.value}
          onChange={e => props.onChange(e.target.value)}
          disabled={props.readOnly === true}
          immutable={props.readOnly === true}
          onKeyDown={props.onKeyDown}
          autoFocus={props.autoFocus}
        />
      </StyledPasswordInputWrapper>
    </StatedValue>
  )
}

PasswordInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
  onKeyDown: PropTypes.func,
  autoFocus: PropTypes.bool,
  valid: PropTypes.bool
}

export default PasswordInput
