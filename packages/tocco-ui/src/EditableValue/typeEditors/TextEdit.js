import PropTypes from 'prop-types'
import React from 'react'

import {StyledEditableWrapper} from '../StyledEditableValue'
import StyledTextareaAutosize from './StyledTextEdit'

const TextEdit = props => {
  const value = props.value === null ? '' : props.value
  const handleChange = e => {
    if (props.onChange) {
      props.onChange(e.target.value)
    }
  }

  return (
    <StyledEditableWrapper readOnly={props.readOnly}>
      <StyledTextareaAutosize
        rows={2}
        maxRows={20}
        name={props.name}
        onChange={handleChange}
        id={props.id}
        value={value}
        disabled={props.readOnly}
      />
    </StyledEditableWrapper>
  )
}

TextEdit.defaultProps = {
  value: ''
}

TextEdit.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.node,
  name: PropTypes.string,
  id: PropTypes.string,
  readOnly: PropTypes.bool
}

export default TextEdit
