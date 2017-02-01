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

  const handleBlur = e => {
    if (props.events && props.events.onBlur) {
      props.events.onBlur(convertStringToNumber(e.target.value))
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
