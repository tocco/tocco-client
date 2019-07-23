import PropTypes from 'prop-types'
import React from 'react'

import Select from '../../Select'

const RemoteSelect = props => (
  <Select
    id={props.id}
    isMulti={false}
    immutable={props.immutable}
    onChange={props.onChange}
    value={props.value}
    {...props.options}
  />
)

RemoteSelect.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.shape({
    key: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ])
  }),
  options: PropTypes.shape({
    options: PropTypes.array,
    fetchOptions: PropTypes.func,
    searchOptions: PropTypes.func,
    isLoading: PropTypes.bool,
    valueClick: PropTypes.func,
    clearValueText: PropTypes.string,
    searchPromptText: PropTypes.string,
    noResultsText: PropTypes.string,
    moreOptionsAvailable: PropTypes.bool,
    moreOptionsAvailableText: PropTypes.string,
    openAdvancedSearch: PropTypes.func,
    tooltips: PropTypes.objectOf(PropTypes.string),
    loadTooltip: PropTypes.func
  }),
  immutable: PropTypes.bool,
  id: PropTypes.string
}

export default RemoteSelect
