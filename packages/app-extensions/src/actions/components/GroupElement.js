import PropTypes from 'prop-types'
import React from 'react'
import {injectIntl, intlShape} from 'react-intl'
import {Button, Menu} from 'tocco-ui'

import actionTypes from '../actionTypes'
import {isValidSelection, selectionText} from './selectionHelper'

export const GroupElement = ({definition, onClick, selectedCount, disabled, intl}) => {
  if (definition.actionType === actionTypes.DIVIDER) {
    return <hr/>
  }

  const validSelection = isValidSelection(selectedCount, definition)
  const title = selectionText(selectedCount, definition, intl)

  const buttonDisabled = definition.readonly === true || !validSelection || disabled

  if (definition.componentType === 'action-group') {
    return (
      <Menu.ItemFlyout isOpen={false} label={definition.label}>
        <Menu.Stack>
          {definition.children.map((actionDefinition, idx) =>
            <GroupElement
              disabled={buttonDisabled}
              definition={actionDefinition}
              key={idx}
              onClick={onClick}
              selectedCount={selectedCount}
              intl={intl}
            />
          )}
        </Menu.Stack>
      </Menu.ItemFlyout>
    )
  }

  return (
    <Menu.Item look="raised">
      <Button
        disabled={buttonDisabled}
        icon={definition.icon}
        label={definition.label}
        onClick={() => !buttonDisabled && onClick(definition)}
        title={title}
      />
    </Menu.Item>
  )
}

GroupElement.propTypes = {
  intl: intlShape.isRequired,
  definition: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  onSelect: PropTypes.func,
  selectedCount: PropTypes.number,
  disabled: PropTypes.bool
}

export default injectIntl(GroupElement)
