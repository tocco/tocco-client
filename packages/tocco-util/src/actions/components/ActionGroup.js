import PropTypes from 'prop-types'
import React from 'react'

import GroupElement from './GroupElement'
import {Button} from 'tocco-ui'
import {intlShape} from 'react-intl'
import {isValidSelection, selectionText} from './selectionHelper'
import {Item, ItemFlyout, MenuButton, MenuButtonGroup, MenuStack} from 'tocco-ui/src/Menu'

const MainAction = ({definition, selectedCount, onClick}, context) => {
  const validSelection = isValidSelection(selectedCount, definition)
  const title = selectionText(selectedCount, definition, context.intl)
  const disabled = definition.readonly === true || !validSelection

  return (
    <Item look="raised">
      <Button
        disabled={disabled}
        icon={definition.icon}
        label={definition.label}
        onClick={() => { onClick(definition) }}
        title={title}
      />
    </Item>
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
        <Item>
          <MenuButtonGroup>

            <MainAction
              definition={definition.action}
              onClick={onClick}
              selectedCount={selectedCount}
            />
            <ItemFlyout
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
            </ItemFlyout>
          </MenuButtonGroup>
        </Item>
      </MenuButton>
    )
  } else {
    return (
      <MenuButton
        look="raised"
      >
        <ItemFlyout
          isToggleable={definition.readonly !== true}
          label={definition.label}
        >
          <MenuStack>
            {definition.children.map((actionDefinition, idx) =>
              <GroupElement key={idx} definition={actionDefinition} onClick={onClick} selectedCount={selectedCount}/>
            )}
          </MenuStack>
        </ItemFlyout>
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
