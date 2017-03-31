import React from 'react'
import Select from 'react-select'
import _isEmpty from 'lodash/isEmpty'

const SingleSelect = props => {
  const onChange = value => {
    props.onChange(value)
  }

  const options = _isEmpty(props.options.store) ? [props.value] : props.options.store

  return (
    <Select
      single
      valueKey="key"
      labelKey="display"
      clearable
      placeholder=""
      noResultsText="-"
      value={props.value}
      onChange={onChange}
      options={options}
      disabled={props.readOnly}
    />
  )
}

SingleSelect.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  value: React.PropTypes.shape(
    {
      key: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number
      ])
    }),
  options: React.PropTypes.shape({
    store: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        value: React.PropTypes.any,
        label: React.PropTypes.string
      }))
  }),
  readOnly: React.PropTypes.bool
}

export default SingleSelect
