import PropTypes from 'prop-types'
import React from 'react'

const StringEdit = props => {
  const value = props.value || ''

  const handleChange = e => {
    if (props.onChange) {
      props.onChange(e.target.value)
    }
  }

  return (
    <input
      type="text"
      className="form-control"
      name={props.name}
      value={value}
      onChange={handleChange}
      id={props.id}
      disabled={props.readOnly}
    />
  )
}

StringEdit.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.node,
  name: PropTypes.string,
  id: PropTypes.string,
  readOnly: PropTypes.bool
}

export default StringEdit
