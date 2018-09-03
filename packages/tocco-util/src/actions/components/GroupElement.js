import PropTypes from 'prop-types'
import React from 'react'
import {Button} from 'tocco-ui'
import {Item} from 'tocco-ui/src/Menu'
import {intlShape} from 'react-intl'

import {isValidSelection, selectionText} from './selectionHelper'
import actionTypes from '../actionTypes'

const GroupElement = ({definition, onClick, onSelect, selectedCount}, context) => {
  if (definition.actionType === actionTypes.DIVIDER) {
    return <hr/>
  }

  const validSelection = isValidSelection(selectedCount, definition)
  const title = selectionText(selectedCount, definition, context.intl)

  const disabled = definition.readonly === true || !validSelection

  return (
    <Item look="raised">
      <Button
        disabled={disabled}
        icon={definition.icon}
        label={definition.label}
        onClick={() => {
          if (!disabled) {
            setTimeout(() => onSelect(), 100)
            onClick(definition)
          }
        }}
        title={title}
      />
    </Item>
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
