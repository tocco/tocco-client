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
        disabled={props.readOnly}
        id={props.id}
        maxRows={20}
        name={props.name}
        onChange={handleChange}
        readOnly={props.readOnly}
        rows={2}
        value={value}
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
