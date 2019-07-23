import PropTypes from 'prop-types'
import React from 'react'

const BoolEdit = props => {
  const handleChange = e => {
    if (props.onChange) {
      props.onChange(e.target.checked)
    }
  }

  return (
    <input
      type="checkbox"
      checked={props.value || false}
      name={props.name}
      onChange={handleChange}
      id={props.id}
      disabled={props.immutable}
    />
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
