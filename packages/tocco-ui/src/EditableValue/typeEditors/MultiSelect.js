import PropTypes from 'prop-types'
import React from 'react'
import TetheredSelectWrap from './TetherSelectWrap'
import _isEmpty from 'lodash/isEmpty'

const MultiSelect = props => {
  const handleChange = value => {
    props.onChange(value)
  }

  const options = _isEmpty(props.options.store) ? [] : props.options.store

  let selectComponent
  const focusSelect = () => selectComponent.focus()

  return (
    <span tabIndex="-1" id={props.id} onFocus={focusSelect}>
      <TetheredSelectWrap
        multi
        valueKey="key"
        labelKey="display"
        clearable
        placeholder=""
        noResultsText={props.options.isLoading ? '' : props.options.noResultsText}
        value={props.value}
        onChange={handleChange}
        options={options}
        disabled={props.readOnly}
        ref={select => { selectComponent = select }}
        isLoading={props.options.isLoading}
      />
    </span>
  )
}

MultiSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.array,
  options: PropTypes.shape({
    store: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.any,
        label: PropTypes.string
      })),
    isLoading: PropTypes.bool,
    noResultsText: PropTypes.string
  }),
  readOnly: PropTypes.bool,
  id: PropTypes.string
}

export default MultiSelect
