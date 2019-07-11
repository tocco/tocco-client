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
      {components.totalText}

      {totalPages > 1
        && <ButtonGroup
          look="raised"
          melt>
          {currPage > 2
            && <Button
              icon="angle-double-left"
              onClick={() => changePage(1)} />}
          {currPage > 1
            && <Button
              icon="angle-left"
              onClick={() => changePage(currPage - 1)} />}
          {currPage > 1
            && <Button
              label={currPage - 1}
              onClick={() => changePage(currPage - 1)} />}
          <Button
            disabled
            ink="primary"
            label={currPage} />
          {currPage < totalPages
            && <Button
              label={currPage + 1}
              onClick={() => changePage(currPage + 1)} />}
          {currPage < totalPages
            && <Button
              icon="angle-right"
              onClick={() => changePage(currPage + 1)} />}
          {currPage < totalPages - 1
            && <Button
              icon="angle-double-right"
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
