import PropTypes from 'prop-types'
import {injectIntl} from 'react-intl'

import {Icon} from '../'
import {StyledSortingSpan, StyledSortingRank} from './StyledComponents'

const SortingState = ({column, intl}) => {
  const hasSorting = column.sorting && column.sorting.sortRank && column.sorting.order
  const SortingRank = column.sorting?.sortRank > 1 && <StyledSortingRank>{column.sorting.sortRank}</StyledSortingRank>
  const sortingIcon = `sort-${column.sorting?.order === 'asc' ? 'up' : 'down'}`

  const msg = id => intl.formatMessage({id})

  return hasSorting ? (
    <StyledSortingSpan title={msg('client.component.table.sortingTitle')}>
      <Icon icon={sortingIcon} />
      {SortingRank}
    </StyledSortingSpan>
  ) : null
}

SortingState.propTypes = {
  intl: PropTypes.object.isRequired,
  column: PropTypes.shape({
    sorting: PropTypes.shape({
      sortable: PropTypes.bool,
      sortRank: PropTypes.number,
      order: PropTypes.oneOf(['asc', 'desc'])
    })
  }).isRequired
}

export default injectIntl(SortingState)
