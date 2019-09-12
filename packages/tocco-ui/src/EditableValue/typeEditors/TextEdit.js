import PropTypes from 'prop-types'
import React from 'react'
import {hooks} from 'tocco-util'

import {StyledEditableWrapper} from '../StyledEditableValue'
import StyledTextareaAutosize from './StyledTextEdit'

const TextEdit = props => {
  const [value, onChange] = hooks.useDebounce(props.value || '', props.onChange)

  return (
    <StyledEditableWrapper immutable={props.immutable}>
      <StyledTextareaAutosize
        id={props.id}
        immutable={props.immutable}
        maxRows={20}
        name={props.name}
        onChange={e => onChange(e.target.value)}
        disabled={props.immutable}
        rows={2}
        value={value}
      />
    </StyledEditableWrapper>
  )
}

TextEdit.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.node,
  name: PropTypes.string,
  id: PropTypes.string,
  immutable: PropTypes.bool
}

export default TextEdit
