import React from 'react'
import Select from 'react-select'
import _isEmpty from 'lodash/isEmpty'

import '!style-loader!css-loader!react-select/dist/react-select.css'

const MultiSelect = props => {
  const handleChange = value => {
    props.onChange(value)
  }

  const options = _isEmpty(props.options.store) ? [] : props.options.store

  return (
    <Select
      multi
      valueKey="key"
      labelKey="display"
      clearable
      placeholder=""
      noResultsText="-"
      value={props.value}
      onChange={handleChange}
      options={options}
      disabled={props.readOnly}
    />
  )
}

MultiSelect.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  value: React.PropTypes.array,
  options: React.PropTypes.shape({
    store: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        value: React.PropTypes.any,
        label: React.PropTypes.string
      }))
  }),
  readOnly: React.PropTypes.bool
}

export default MultiSelect
