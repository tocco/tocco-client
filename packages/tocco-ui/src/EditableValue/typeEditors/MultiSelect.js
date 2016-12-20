import React from 'react'
import _values from 'lodash/values'

const MultiSelect = props => {
  const handleChange = e => {
    if (props.onChange) {
      const options = e.target.options
      const selectedValues = _values(options).filter(o => o.selected).map(o => o.value)
      props.onChange(selectedValues)
    }
  }

  return (
    <select multiple onChange={handleChange} value={props.value} className="form-control">
      {
        props.options.possibleValues.map(value => (
          <option key={value.value} value={value.value}>
            {value.label}
          </option>
        ))
      }
    </select>
  )
}

MultiSelect.propTypes = {
  onChange: React.PropTypes.func,
  value: React.PropTypes.array,
  options: React.PropTypes.shape({
    possibleValues: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        key: React.PropTypes.any,
        label: React.PropTypes.string
      }))
  })
}

export default MultiSelect
