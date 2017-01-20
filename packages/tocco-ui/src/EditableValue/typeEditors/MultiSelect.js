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
      options={props.options.store}
    />
  )
}

MultiSelect.propTypes = {
  onChange: React.PropTypes.func,
  value: React.PropTypes.array,
  options: React.PropTypes.shape({
    store: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        value: React.PropTypes.any,
        label: React.PropTypes.string
      }))
  })
}

export default MultiSelect
