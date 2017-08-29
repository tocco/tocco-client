import PropTypes from 'prop-types'
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
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string // empty string coming from Redux Form if value null
  ]),
  options: PropTypes.shape({
    store: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.any,
        label: PropTypes.string
      }))
  }),
  readOnly: PropTypes.bool
}

export default MultiSelect
