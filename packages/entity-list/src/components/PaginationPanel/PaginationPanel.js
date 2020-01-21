import React from 'react'
import PropTypes from 'prop-types'
import {Button, ButtonGroup} from 'tocco-ui'

import {StyledPaginationPanel} from './StyledPaginationPanel'

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
        && <ButtonGroup>
          {currPage > 2
            && <Button
              icon="chevron-double-left"
              onClick={() => changePage(1)} />}
          {currPage > 1
            && <Button
              icon="chevron-left"
              onClick={() => changePage(currPage - 1)} />}
          {currPage < totalPages
            && <Button
              icon="chevron-right"
              onClick={() => changePage(currPage + 1)} />}
          {currPage < totalPages - 1
            && <Button
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
