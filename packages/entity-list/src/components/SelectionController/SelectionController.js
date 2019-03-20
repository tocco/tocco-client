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
      {type === 'ID' && <Button
        icon="times"
        look="raised"
        title={msg('client.entity-list.clearSelection')}
        onClick={props.clearSelection}
      />}
      <Typography.Span>
        <FormattedMessage
          id={`client.entity-list.operateOn${type === 'ID' ? 'Selected' : 'Queried'}Items`}
          values={{count: count}}/>
      </Typography.Span>
      {type === 'ID' && <ButtonGroup melt look="raised">
        <Button
          aria={{'aria-pressed': !props.showSelectedRecords}}
          icon="search"
          title={msg('client.entity-list.showAllFilteredItems')}
          onClick={props.toggleShowSelectedRecords}
        />
        <Button
          aria={{'aria-pressed': props.showSelectedRecords}}
          icon="far, check-square"
          title={msg('client.entity-list.showSelectedItemsOnly')}
          onClick={props.toggleShowSelectedRecords}
        />
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
