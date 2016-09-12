import React from 'react'

const RelationOption = props => {
  var handleOnChange = (event) => {
    props.onChange(props.name, event.target.value)
  }

  var options = []
  for (var propertyName in props.values) {
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
      <select value={props.value} onChange={handleOnChange}>
        {options}
      </select>
    </div>
  )
}

RelationOption.propTypes = {
  name: React.PropTypes.string.isRequired,
  values: React.PropTypes.object.isRequired,
  value: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired
}

export default RelationOption
