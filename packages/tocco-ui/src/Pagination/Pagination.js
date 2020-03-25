import React from 'react'
import PropTypes from 'prop-types'
import {FormattedMessage} from 'react-intl'
import styled from 'styled-components'

import Button from '../Button'
import ButtonGroup from '../ButtonGroup'
import Typography from '../Typography'

const StyledPagination = styled.div`
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
const Pagination = ({totalCount, recordsPerPage, currentPage, onPageChange}) => {
  const totalPages = Math.ceil(totalCount / recordsPerPage)
  const start = (currentPage - 1) * recordsPerPage + 1
  const to = currentPage * recordsPerPage

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
          icon="chevron-double-left"
          onClick={() => onPageChange(1)} />}
        {currentPage > 1
        && <Button
          icon="chevron-left"
          onClick={() => onPageChange(currentPage - 1)} />}
        {currentPage < totalPages
        && <Button
          icon="chevron-right"
          onClick={() => onPageChange(currentPage + 1)} />}
        {currentPage < totalPages - 1
        && <Button
          icon="chevron-double-right"
          onClick={() => onPageChange(totalPages)} />}
      </ButtonGroup>
      }
    </StyledPagination>
  )
}

Pagination.propTypes = {
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

export default Pagination
