import React from 'react'
import Select from 'react-select'

const SingleSelect = props => {
  const onChange = e => {
    props.onChange(e.value ? e.value : e)
  }

  return (
    <Select
      single
      clearable
      placeholder=""
      noResultsText="-"
      value={props.value}
      onChange={onChange}
      options={props.options.store}
      disabled={props.readOnly}
    />
  )
}

SingleSelect.propTypes = {
  onChange: React.PropTypes.func,
  value: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]),
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
