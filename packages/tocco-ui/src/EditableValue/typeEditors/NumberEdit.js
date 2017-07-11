import React from 'react'

const convertStringToNumber = stringValue => (
  !stringValue || isNaN(stringValue) ? null : Number(stringValue)
)

const NumberEdit = props => {
  const handleChange = e => {
    if (props.onChange) {
      props.onChange(convertStringToNumber(e.target.value))
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
      disabled={props.readOnly}
    />
  )
}

NumberEdit.propTypes = {
  onChange: React.PropTypes.func,
  value: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string // empty string coming from Redux Form if value null
  ]),
  name: React.PropTypes.string,
  id: React.PropTypes.string,
  readOnly: React.PropTypes.bool
}

export default NumberEdit
