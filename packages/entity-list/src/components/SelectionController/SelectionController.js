import React from 'react'
import PropTypes from 'prop-types'
import {FormattedMessage} from 'react-intl'
import {
  Button,
  Typography
} from 'tocco-ui'

import StyledSelectionController, {StyledButton} from './StyledSelectionController'

const SelectionController = props => {
  const msg = id => (props.intl.formatMessage({id}))
  const selectionPossible = props.selection.length !== 0

  return (
    <StyledSelectionController>
      <StyledButton
        active={!props.showSelectedRecords}
        onClick={() => {
          if (selectionPossible) {
            props.toggleShowSelectedRecords()
          }
        }}
      >
        <Typography.Span>
          <FormattedMessage
            id="client.entity-list.selectionAll"
            values={{count: props.queryCount}}/>
        </Typography.Span>
      </StyledButton>
      <StyledButton active={props.showSelectedRecords} disabled={!selectionPossible}
        onClick={() => {
          if (selectionPossible) {
            props.toggleShowSelectedRecords()
          }
        }}>
        <Typography.Span>
          <FormattedMessage
            id="client.entity-list.selectionSelection"
            values={{count: props.selection.length}}/>
          {props.selection.length > 0 && <Button
            dense
            icon="times"
            look="raised"
            title={msg('client.entity-list.clearSelection')}
            onClick={e => {
              e.stopPropagation()
              props.toggleShowSelectedRecords()
              props.clearSelection()
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
