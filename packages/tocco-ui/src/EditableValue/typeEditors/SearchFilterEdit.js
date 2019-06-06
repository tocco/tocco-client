import React from 'react'
import PropTypes from 'prop-types'

import Select from '../../Select'

const SearchFilterEdit = props => (
  <Select
    immutable={props.immutable}
    onChange={props.onChange}
    value={props.value}
    {...props.options}
  />
)

const valueObjectType = PropTypes.shape({
  key: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired
})

SearchFilterEdit.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([
    valueObjectType,
    PropTypes.arrayOf(valueObjectType)
  ]),
  options: PropTypes.shape({
    isMulti: PropTypes.bool,
    fetchOptions: PropTypes.func,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.any,
        label: PropTypes.string
      }))
  }).isRequired,
  immutable: PropTypes.bool,
  id: PropTypes.string
}

export default SearchFilterEdit
