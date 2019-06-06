import PropTypes from 'prop-types'
import React from 'react'

import Select from '../../Select'

const SingleSelect = props => (
  <Select
    immutable={props.immutable}
    isMulti={false}
    onChange={props.onChange}
    value={props.value}
    openMenuOnClick
    {...props.options}
  />
)

SingleSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.shape({
    key: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ])
  }),
  options: PropTypes.shape({
    options: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.any,
        label: PropTypes.string
      })),
    fetchOptions: PropTypes.func,
    noResultsText: PropTypes.string,
    isLoading: PropTypes.bool,
    tooltips: PropTypes.objectOf(PropTypes.string),
    loadTooltip: PropTypes.func
  }),
  immutable: PropTypes.bool,
  id: PropTypes.string
}

export default SingleSelect
