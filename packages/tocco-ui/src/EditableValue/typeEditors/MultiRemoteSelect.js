import PropTypes from 'prop-types'
import React from 'react'

import Select from '../../Select'

const MultiRemoteSelect = props => (
  <Select
    id={props.id}
    isMulti
    immutable={props.immutable}
    onChange={props.onChange}
    value={props.value}
    {...props.options}
  />
)

MultiRemoteSelect.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ])
    })
  ),
  options: PropTypes.shape({
    options: PropTypes.array,
    fetchOptions: PropTypes.func,
    searchOptions: PropTypes.func,
    openAdvancedSearch: PropTypes.func,
    isLoading: PropTypes.bool,
    valueClick: PropTypes.func,
    clearAllText: PropTypes.string,
    searchPromptText: PropTypes.string,
    noResultsText: PropTypes.string,
    moreOptionsAvailable: PropTypes.bool,
    moreOptionsAvailableText: PropTypes.string,
    tooltips: PropTypes.objectOf(PropTypes.string),
    loadTooltip: PropTypes.func,
    valueLinkFactory: PropTypes.func
  }),
  immutable: PropTypes.bool,
  id: PropTypes.string
}

export default MultiRemoteSelect
