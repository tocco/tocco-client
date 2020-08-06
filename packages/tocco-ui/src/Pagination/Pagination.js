import React from 'react'
import PropTypes from 'prop-types'
import {FormattedMessage, injectIntl, intlShape} from 'react-intl'
import styled from 'styled-components'

import Button from '../Button'
import ButtonGroup from '../ButtonGroup'
import Typography from '../Typography'

export const StyledPagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  span {
    padding-right: 6px;
  }
`

/**
 * Controlled Pagination component
 */
const Pagination = ({totalCount, recordsPerPage, currentPage, onPageChange, intl}) => {
  const totalPages = Math.ceil(totalCount / recordsPerPage)
  const start = (currentPage - 1) * recordsPerPage + 1
  const to = currentPage * recordsPerPage

  const msg = id => intl.formatMessage({id})

  return (
    <StyledPagination>
      <Typography.Span> <FormattedMessage id="client.component.pagination.text" values={{
        start,
        to,
        total: totalCount
      }}/>
      </Typography.Span>

      {totalPages > 1
      && <ButtonGroup>
        {currentPage > 2
        && <Button
          title={msg('client.component.pagination.firstPageTitle')}
          icon="chevron-double-left"
          onClick={() => onPageChange(1)} />}
        {currentPage > 1
        && <Button
          title={msg('client.component.pagination.prePageTitle')}
          icon="chevron-left"
          onClick={() => onPageChange(currentPage - 1)} />}
        {currentPage < totalPages
        && <Button
          title={msg('client.component.pagination.nextPageTitle')}
          icon="chevron-right"
          onClick={() => onPageChange(currentPage + 1)} />}
        {currentPage < totalPages - 1
        && <Button
          title={msg('client.component.pagination.lastPageTitle')}
          icon="chevron-double-right"
          onClick={() => onPageChange(totalPages)} />}
      </ButtonGroup>
      }
    </StyledPagination>
  )
}

Pagination.propTypes = {
  intl: intlShape.isRequired,
  /**
   * Currently displayed page
   */
  currentPage: PropTypes.number.isRequired,
  /**
   * Total of records available
   */
  totalCount: PropTypes.number.isRequired,
  /**
   * Limit for a page
   */
  recordsPerPage: PropTypes.number.isRequired,
  /**
   * Callback on page change with provided button, returns new page as single argument
   */
  onPageChange: PropTypes.func.isRequired
}

export default injectIntl(Pagination)
