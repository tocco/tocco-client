import React from 'react'
import PropTypes from 'prop-types'
import {FormattedMessage} from 'react-intl'
import {
  Button,
  Typography
} from 'tocco-ui'

import StyledSelectionController, {StyledButton} from './StyledSelectionController'

const SelectionController = ({
  intl,
  selection,
  showSelectedRecords,
  toggleShowSelectedRecords,
  queryCount,
  clearSelection
}) => {
  const msg = id => intl.formatMessage({id})
  const selectionPossible = selection.length !== 0

  return (
    <StyledSelectionController>
      <StyledButton
        active={!showSelectedRecords}
        onClick={() => {
          if (selectionPossible) {
            toggleShowSelectedRecords()
          }
        }}
      >
        <Typography.Span>
          <FormattedMessage
            id="client.entity-list.selectionAll"
            values={{count: queryCount}}/>
        </Typography.Span>
      </StyledButton>
      <StyledButton
        active={showSelectedRecords}
        disabled={!selectionPossible}
        onClick={() => {
          if (selectionPossible) {
            toggleShowSelectedRecords()
          }
        }}
        data-cy="selection-controller-selection"
      >
        <Typography.Span>
          <FormattedMessage
            id="client.entity-list.selectionSelection"
            values={{count: selection.length}}/>
          {selection.length > 0 && <Button
            data-cy="selection-controller-delete-selection"
            dense
            icon="times"
            title={msg('client.entity-list.clearSelection')}
            onClick={e => {
              e.stopPropagation()
              if (showSelectedRecords) {
                toggleShowSelectedRecords()
              }
              clearSelection()
            }}
          />}
        </Typography.Span>
      </StyledButton>
    </StyledSelectionController>
  )
}

SelectionController.propTypes = {
  clearSelection: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
  queryCount: PropTypes.number.isRequired,
  selection: PropTypes.array.isRequired,
  showSelectedRecords: PropTypes.bool,
  toggleShowSelectedRecords: PropTypes.func.isRequired
}

export default SelectionController
