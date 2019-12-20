import React from 'react'
import PropTypes from 'prop-types'
import {ButtonGroup} from 'tocco-ui'

import {StyledPaginationPanel, StyledButton} from './StyledPaginationPanel'

const PaginationPanel = props => {
  const {
    changePage,
    components,
    totalPages,
    currPage
  } = props

  return (
    <StyledPaginationPanel>
      <span>{components.totalText}</span>

      {totalPages > 1
        && <ButtonGroup
          look="raised"
          melt>
          {currPage > 2
            && <StyledButton
              icon="chevron-double-left"
              onClick={() => changePage(1)} />}
          {currPage > 1
            && <StyledButton
              icon="chevron-left"
              onClick={() => changePage(currPage - 1)} />}
          {currPage < totalPages
            && <StyledButton
              icon="chevron-right"
              onClick={() => changePage(currPage + 1)} />}
          {currPage < totalPages - 1
            && <StyledButton
              icon="chevron-double-right"
              onClick={() => changePage(totalPages)} />}
        </ButtonGroup>

      }
    </StyledPaginationPanel>
  )
}

PaginationPanel.propTypes = {
  currPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  changePage: PropTypes.func.isRequired,
  components: PropTypes.shape({
    totalText: PropTypes.element.isRequired
  }).isRequired
}

export default PaginationPanel
