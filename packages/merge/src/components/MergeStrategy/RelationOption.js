import React from 'react'

const RelationOption = props => {
  const handleOnChange = event => {
    props.onChange(props.name, event.target.value)
  }

  const options = []
  for (const propertyName in props.values) {
    options.push(
      <option
        key={`fieldset${props.name}${propertyName}`}
        value={propertyName}
      >
        {props.values[propertyName]}
      </option>
    )
  }

  return (
    <div>
      <select
        className="form-control"
        disabled={props.disabled}
        value={props.value}
        onChange={handleOnChange}>
        {options}

      </select>
    </div>
  )
}

RelationOption.propTypes = {
  name: React.PropTypes.string.isRequired,
  values: React.PropTypes.object.isRequired,
  value: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
  disabled: React.PropTypes.bool
}

export default RelationOption
