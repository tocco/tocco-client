import React from 'react'
import Select from 'react-select'

const SingleSelect = props => {
  const onChange = e => {
    props.onChange(e)
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
    />
  )
}

SingleSelect.propTypes = {
  onChange: React.PropTypes.func,
  value: React.PropTypes.string,
  options: React.PropTypes.shape({
    store: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        key: React.PropTypes.any,
        label: React.PropTypes.string
      }))
  })
}

export default SingleSelect
