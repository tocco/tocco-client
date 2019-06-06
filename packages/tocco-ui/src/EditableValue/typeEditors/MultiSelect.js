import PropTypes from 'prop-types'
import React from 'react'

import Select from '../../Select'

const MultiSelect = props => (
  <Select
    isMulti={true}
    immutable={props.immutable}
    onChange={props.onChange}
    value={props.value}
    openMenuOnClick
    {...props.options}
  />
)

MultiSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.array,
  options: PropTypes.shape({
    options: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.any,
        label: PropTypes.string
      })),
    fetchOptions: PropTypes.func,
    isLoading: PropTypes.bool,
    noResultsText: PropTypes.string,
    tooltips: PropTypes.objectOf(PropTypes.string),
    loadTooltip: PropTypes.func
  }),
  immutable: PropTypes.bool,
  id: PropTypes.string
}

export default MultiSelect
