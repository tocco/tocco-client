import PropTypes from 'prop-types'
import React from 'react'
import {react} from 'tocco-util'

import TextareaAutosize from '../../TextareaAutosize'
import {StyledEditableWrapper} from '../StyledEditableValue'

const TextEdit = props =>
  <StyledEditableWrapper immutable={props.immutable}>
    <TextareaAutosize
      id={props.id}
      immutable={props.immutable}
      maxRows={20}
      name={props.name}
      onChange={e => props.onChange(e.target.value)}
      disabled={props.immutable}
      rows={2}
      value={props.value}
    />
  </StyledEditableWrapper>

TextEdit.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.node,
  name: PropTypes.string,
  id: PropTypes.string,
  immutable: PropTypes.bool
}

export default react.Debouncer(TextEdit)
