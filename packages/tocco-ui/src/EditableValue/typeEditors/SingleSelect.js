import PropTypes from 'prop-types'
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
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.shape({
      key: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ])
    }),
    PropTypes.string
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

export default SingleSelect
