import React from 'react'
import PropTypes from 'prop-types'

import {Icon} from '../'
import {StyledSortingSpan} from './StyledTable'

const SortingState = ({column}) =>
  column.sorting && column.sorting.sortRank && column.sorting.order
    ? <StyledSortingSpan>
      <Icon icon={`sort-${column.sorting.order === 'asc' ? 'up' : 'down'}`}/>
      {column.sorting.sortRank > 1 && <span>{column.sorting.sortRank}</span>}
    </StyledSortingSpan> : null

SortingState.propTypes = {
  column: PropTypes.shape({
    sorting: PropTypes.shape({
      sortable: PropTypes.bool,
      sortRank: PropTypes.number,
      order: PropTypes.oneOf(['asc', 'desc'])
    })
  }).isRequired
}

export default SortingState
