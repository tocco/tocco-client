import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components'

const StyledBoolEdit = styled.div`
  margin: 5px 0px;
`

const BoolEdit = props => {
  const handleChange = e => {
    if (props.onChange) {
      props.onChange(e.target.checked)
    }
  }

  return (
    <StyledBoolEdit>
      <input
        type="checkbox"
        checked={props.value || false}
        name={props.name}
        onChange={handleChange}
        id={props.id}
        disabled={props.immutable}
      />
    </StyledBoolEdit>
  )
}

BoolEdit.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.bool,
  name: PropTypes.string,
  id: PropTypes.string,
  immutable: PropTypes.bool
}

export default BoolEdit
