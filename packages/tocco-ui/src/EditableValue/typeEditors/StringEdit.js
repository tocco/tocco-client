import PropTypes from 'prop-types'
import React from 'react'
import {react} from 'tocco-util'

import {StyledEditableWrapper} from '../StyledEditableValue'
import StyledStringEdit from './StyledStringEdit'

const StringEdit = props =>
  <StyledEditableWrapper immutable={props.immutable}>
    <StyledStringEdit
      disabled={props.immutable}
      id={props.id}
      name={props.name}
      onChange={e => props.onChange(e.target.value)}
      immutable={props.immutable}
      value={props.value || ''}
    />
  </StyledEditableWrapper>

StringEdit.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.node,
  name: PropTypes.string,
  id: PropTypes.string,
  immutable: PropTypes.bool
}

export default react.Debouncer(StringEdit)
