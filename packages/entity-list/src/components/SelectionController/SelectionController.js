import React from 'react'
import PropTypes from 'prop-types'
import {FormattedMessage} from 'react-intl'
import {
  Button,
  ButtonGroup,
  Typography
} from 'tocco-ui'

import StyledSelectionController from './StyledSelectionController'

const SelectionController = props => {
  const msg = id => (props.intl.formatMessage({id}))
  const type = props.selection.length > 0 ? 'ID' : 'QUERY'
  const count = type === 'ID' ? props.selection.length : props.queryCount

  return (
    <StyledSelectionController>
      <Typography.Span>
        <FormattedMessage
          id={`client.entity-list.operateOn${type === 'ID' ? 'Selected' : 'Queried'}Items`}
          values={{count: count}}/>
      </Typography.Span>

      {props.selection.length > 0
      && <ButtonGroup look="raised" melt>
        <Button
          onClick={props.toggleShowSelectedRecords}
          label={msg(`client.entity-list.show${props.showSelectedRecords ? 'AllFilteredItems' : 'SelectedItemsOnly'}`)}
        />
        <Button icon="times" onClick={props.clearSelection}/>
      </ButtonGroup>
      }
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
