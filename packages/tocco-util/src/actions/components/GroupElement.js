import PropTypes from 'prop-types'
import React from 'react'
import {intlShape} from 'react-intl'
import {Button, Menu} from 'tocco-ui'

import actionTypes from '../actionTypes'
import {isValidSelection, selectionText} from './selectionHelper'

const GroupElement = ({definition, onClick, selectedCount}, context) => {
  if (definition.actionType === actionTypes.DIVIDER) {
    return <hr/>
  }

  const validSelection = isValidSelection(selectedCount, definition)
  const title = selectionText(selectedCount, definition, context.intl)

  const disabled = definition.readonly === true || !validSelection

  return (
    <Menu.Item look="raised">
      <Button
        disabled={disabled}
        icon={definition.icon}
        label={definition.label}
        onClick={() => !disabled && onClick(definition)}
        title={title}
      />
    </Menu.Item>
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
