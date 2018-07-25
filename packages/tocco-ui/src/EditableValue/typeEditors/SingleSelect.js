import PropTypes from 'prop-types'
import React from 'react'
import TetheredSelectWrap from './TetherSelectWrap'
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

  let selectComponent
  const focusSelect = () => selectComponent.focus()

  return (
    <span tabIndex="-1" id={props.id} onFocus={focusSelect}>
      <TetheredSelectWrap
        single
        valueKey="key"
        labelKey="display"
        clearable
        placeholder=""
        noResultsText={props.options.isLoading ? '' : props.options.noResultsText}
        value={props.value}
        onChange={onChange}
        options={getOptions()}
        disabled={props.readOnly}
        ref={select => { selectComponent = select }}
        isLoading={props.options.isLoading}
      />
    </span>
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
      })),
    noResultsText: PropTypes.string,
    isLoading: PropTypes.bool
  }),
  readOnly: PropTypes.bool,
  id: PropTypes.string
}

export default SingleSelect
