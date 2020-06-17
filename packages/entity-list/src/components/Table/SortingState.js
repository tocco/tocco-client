import React from 'react'
import PropTypes from 'prop-types'
import {Icon} from 'tocco-ui'

import {StyledSortingSpan} from './StyledTable'

const SortingState = ({column, sorting}) => {
  const isSortedBy = () => {
    let result = null
    sorting.forEach((s, idx) => {
      if (s.field === column.id) {
        result = {order: s.order, icon: s.order === 'asc' ? 'up' : 'down', rank: idx + 1}
      }
    })
    return result
  }

  const sortState = isSortedBy(column, sorting)
  return sortState
    && <StyledSortingSpan>
      <Icon icon={`sort-${sortState.icon}`}/>
      {sortState.rank > 1 && <span>{sortState.rank}</span>}
    </StyledSortingSpan>
}

SortingState.propTypes = {
  column: PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired,
  sorting: PropTypes.arrayOf(
    PropTypes.shape({field: PropTypes.string, order: PropTypes.string})
  ).isRequired
}

export default SortingState
