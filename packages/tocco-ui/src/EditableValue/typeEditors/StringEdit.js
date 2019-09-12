import PropTypes from 'prop-types'
import React from 'react'
import {hooks} from 'tocco-util'

import {StyledEditableWrapper} from '../StyledEditableValue'
import StyledStringEdit from './StyledStringEdit'

const StringEdit = props => {
  const [value, onChange] = hooks.useDebounce(props.value || '', props.onChange)

  return (
    <StyledEditableWrapper immutable={props.immutable}>
      <StyledStringEdit
        disabled={props.immutable}
        id={props.id}
        name={props.name}
        onChange={e => onChange(e.target.value)}
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
