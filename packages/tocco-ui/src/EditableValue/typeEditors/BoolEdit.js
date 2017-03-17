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
      checked={props.value}
      name={props.name}
      onChange={handleChange}
      id={props.id}
      disabled={props.readOnly}
    />
  )
}

BoolEdit.propTypes = {
  onChange: React.PropTypes.func,
  value: React.PropTypes.bool,
  name: React.PropTypes.string,
  id: React.PropTypes.string,
  readOnly: React.PropTypes.bool
}

export default BoolEdit
