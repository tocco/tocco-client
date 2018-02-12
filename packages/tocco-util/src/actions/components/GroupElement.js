import PropTypes from 'prop-types'
import React from 'react'
import {MenuItem} from 'react-bootstrap'
import actionTypes from '../actionTypes'
import {isValidSelection, selectionText} from './selectionHelper'
import {intlShape} from 'react-intl'

const GroupElement = ({definition, onClick, onSelect, selectedCount}, context) => {
  if (definition.actionType === actionTypes.DIVIDER) {
    return <MenuItem divider/>
  }

  const validSelection = isValidSelection(selectedCount, definition)
  const title = selectionText(selectedCount, definition, context.intl)

  const disabled = definition.readonly === true || !validSelection

  return (
    <MenuItem disabled={disabled} onClick={() => {
      if (!disabled) {
        setTimeout(() => onSelect(), 100)
        onClick(definition)
      }
    }}>
      <span title={title}>
        {definition.icon && <i className={'fa ' + definition.icon}/>} {definition.label}
      </span>
    </MenuItem>
  )
}

GroupElement.contextTypes = {
  intl: intlShape
}

GroupElement.propTypes = {
  definition: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  onSelect: PropTypes.func,
  selectedCount: PropTypes.number
}

export default GroupElement
