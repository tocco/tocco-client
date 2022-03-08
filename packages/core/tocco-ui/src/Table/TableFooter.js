import PropTypes from 'prop-types'
import React from 'react'
import {injectIntl} from 'react-intl'

import {Pagination} from '../'
import Ball from '../Ball'
import {StyledTableFooter} from './StyledTable'

const TableFooter = ({onPageChange, onPageRefresh, paginationInfo, intl}) => {
  const showPagination = Boolean(paginationInfo)
  const showRefresh = typeof onPageRefresh === 'function'
  const showFooter = showPagination || showRefresh

  const msg = id => intl.formatMessage({id})

  if (!showFooter) {
    return null
  }

  return (
    <StyledTableFooter>
      {showPagination && (
        <Pagination
          onPageChange={onPageChange}
          currentPage={paginationInfo.currentPage}
          totalCount={paginationInfo.totalCount}
          recordsPerPage={paginationInfo.recordsPerPage}
        />
      )}
      {showRefresh && (
        <Ball type="button" title={msg('client.component.table.refreshTitle')} icon="sync" onClick={onPageRefresh} />
      )}
    </StyledTableFooter>
  )
}

TableFooter.propTypes = {
  intl: PropTypes.object.isRequired,
  onPageRefresh: PropTypes.func,
  onPageChange: PropTypes.func,
  /**
   * Used to display pagination
   */
  paginationInfo: PropTypes.shape({
    totalCount: PropTypes.number,
    currentPage: PropTypes.number,
    recordsPerPage: PropTypes.number
  })
}

export default injectIntl(TableFooter)
