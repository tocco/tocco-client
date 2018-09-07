import PropTypes from 'prop-types'
import React from 'react'
import {intlShape} from 'react-intl'
import {Button, MenuItem, MenuButton, MenuButtonGroup, MenuItemFlyout, MenuStack} from 'tocco-ui'

import GroupElement from './GroupElement'
import {isValidSelection, selectionText} from './selectionHelper'

const MainAction = ({definition, selectedCount, onClick}, context) => {
  const validSelection = isValidSelection(selectedCount, definition)
  const title = selectionText(selectedCount, definition, context.intl)
  const disabled = definition.readonly === true || !validSelection

  return (
    <MenuItem look="raised">
      <Button
        disabled={disabled}
        icon={definition.icon}
        label={definition.label}
        onClick={() => { onClick(definition) }}
        title={title}
      />
    </MenuItem>
  )
}

MainAction.contextTypes = {
  intl: intlShape
}

MainAction.propTypes = {
  definition: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  selectedCount: PropTypes.number
}

const ActionGroup = ({definition, onClick, selectedCount}, context) => {
  const hasMainAction = (definition.action && Object.keys(definition.action).length > 0)

  if (hasMainAction) {
    return (
      <MenuButton
        look="raised"
      >
        <MenuItem>
          <MenuButtonGroup>

            <MainAction
              definition={definition.action}
              onClick={onClick}
              selectedCount={selectedCount}
            />
            <MenuItemFlyout
              isToggleable={definition.readonly !== true}
              label={definition.label}
            >
              <MenuStack>
                {definition.children.map((actionDefinition, idx) =>
                  <GroupElement
                    definition={actionDefinition}
                    key={idx}
                    onClick={onClick}
                    selectedCount={selectedCount}
                  />
                )}
              </MenuStack>
            </MenuItemFlyout>
          </MenuButtonGroup>
        </MenuItem>
      </MenuButton>
    )
  } else {
    return (
      <MenuButton
        look="raised"
      >
        <MenuItemFlyout
          isToggleable={definition.readonly !== true}
          label={definition.label}
        >
          <MenuStack>
            {definition.children.map((actionDefinition, idx) =>
              <GroupElement key={idx} definition={actionDefinition} onClick={onClick} selectedCount={selectedCount}/>
            )}
          </MenuStack>
        </MenuItemFlyout>
      </MenuButton>
    )
  }
}

ActionGroup.contextTypes = {
  intl: intlShape
}

ActionGroup.propTypes = {
  definition: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  selectedCount: PropTypes.number
}

export default ActionGroup
