import _isNil from 'lodash/isNil'
import PropTypes from 'prop-types'
import React from 'react'

import Select from '../../Select'

const BooleanSingleSelect = ({id, immutable, value, options: {trueLabel, falseLabel}, onChange}) => (
  <Select
    id={id}
    immutable={immutable}
    isMulti={false}
    onChange={option => onChange(option ? option.key : null)}
    value={_isNil(value) ? value : {key: value, display: value ? trueLabel : falseLabel}}
    openMenuOnClick
    options={[
      {
        key: true,
        display: trueLabel
      },
      {
        key: false,
        display: falseLabel
      }
    ]}
  />
)

BooleanSingleSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.bool,
  options: PropTypes.shape({
    trueLabel: PropTypes.string.isRequired,
    falseLabel: PropTypes.string.isRequired
  }),
  immutable: PropTypes.bool,
  id: PropTypes.string
}

export default BooleanSingleSelect
