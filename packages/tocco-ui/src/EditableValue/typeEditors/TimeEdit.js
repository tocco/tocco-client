import React from 'react'
import PropTypes from 'prop-types'

import Ball from '../../Ball'
import {
  StyledEditableControl,
  StyledEditableWrapper
} from '../StyledEditableValue'
import StyledTimeEdit from './StyledTimeEdit'

const TimeEdit = props => {
  const handleChange = e => {
    props.onChange(e.target.value)
  }

  const clearInput = () => {
    props.onChange(null)
  }

  const isFirefox = !!window.sidebar

  const showClearButton = props.value && !props.immutable && !isFirefox

  const value = props.value || ''

  return (
    <StyledEditableWrapper immutable={props.immutable}>
      <StyledTimeEdit
        disabled={props.immutable}
        id={props.id}
        immutable={props.immutable}
        name={props.name}
        onChange={handleChange}
        value={value}
      />
      {showClearButton && <StyledEditableControl>
        <Ball
          icon="times"
          onClick={clearInput}
          tabIndex={-1}
        />
      </StyledEditableControl>}
    </StyledEditableWrapper>
  )
}

TimeEdit.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  immutable: PropTypes.bool
}

export default TimeEdit
