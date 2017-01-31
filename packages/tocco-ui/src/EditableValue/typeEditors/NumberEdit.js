import React from 'react'

const NumberEdit = props => {
  const convertStrintToNumber = stringValue => (stringValue ? Number(stringValue) : null)

  const handleChange = e => {
    if (props.onChange) {
      props.onChange(convertStrintToNumber(e.target.value))
    }
  }

  const handleBlur = e => {
    if (props.events.onBlur) {
      props.events.onBlur(convertStrintToNumber(e.target.value))
    }
  }

  return (
    <input
      type="number"
      className="form-control"
      name={props.name}
      value={props.value}
      onChange={handleChange}
      id={props.id}
      {...props.events}
      readOnly={props.readOnly}
      onBlur={handleBlur}
    />
  )
}

NumberEdit.propTypes = {
  onChange: React.PropTypes.func,
  value: React.PropTypes.number,
  name: React.PropTypes.string,
  id: React.PropTypes.string,
  events: React.PropTypes.objectOf(React.PropTypes.func),
  readOnly: React.PropTypes.bool
}

export default NumberEdit
