import PropTypes from 'prop-types'
import React from 'react'

import {StyledEditableWrapper} from '../StyledEditableValue'
import StyledStringEdit from './StyledStringEdit'

const StringEdit = props => {
  const value = props.value || ''

  const handleChange = e => {
    if (props.onChange) {
      props.onChange(e.target.value)
    }
  }

  return (
    <StyledEditableWrapper immutable={props.immutable}>
      <StyledStringEdit
        disabled={props.immutable}
        id={props.id}
        name={props.name}
        onChange={handleChange}
        immutable={props.immutable}
        value={value}
      />
    </StyledEditableWrapper>
  )
}

StringEdit.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.node,
  name: PropTypes.string,
  id: PropTypes.string,
  immutable: PropTypes.bool
}

export default StringEdit
