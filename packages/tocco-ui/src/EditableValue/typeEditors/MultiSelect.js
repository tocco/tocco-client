import React from 'react'
import Select from 'react-select'

import '!style-loader!css-loader!react-select/dist/react-select.css'

const MultiSelect = props => {
  const handleChange = e => {
    if (props.onChange) {
      const newKeys = e.map(o => o.value)
      props.onChange(newKeys)
    }
  }

  return (
    <Select
      multi
      clearable
      placeholder=""
      noResultsText="-"
      value={props.value}
      onChange={handleChange}
      options={props.options.possibleValues}
    />
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
