import React from 'react'
import Select from 'react-select'
import _isEmpty from 'lodash/isEmpty'

const SingleSelect = props => {
  const onChange = value => {
    props.onChange(value)
  }

  const getOptions = () => {
    if (!_isEmpty(props.options.store)) {
      return props.options.store
    }
    if (props.value) {
      return [props.value]
    }
    return []
  }

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
      options={getOptions()}
      disabled={props.readOnly}
    />
  )
}

SingleSelect.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  value: React.PropTypes.oneOfType([
    React.PropTypes.shape({
      key: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number
      ])
    }),
    React.PropTypes.string
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
