import PropTypes from 'prop-types'
import React from 'react'
import {intlShape} from 'react-intl'
import {Button, Menu} from 'tocco-ui'

import GroupElement from './GroupElement'
import {isValidSelection, selectionText} from './selectionHelper'

const MainAction = ({definition, selectedCount, onClick, disabled}, context) => {
  const validSelection = isValidSelection(selectedCount, definition)
  const title = selectionText(selectedCount, definition, context.intl)
  const buttonDisabled = definition.readonly === true || !validSelection || disabled

  return (
    <Menu.Item look="raised">
      <Button
        disabled={buttonDisabled}
        icon={definition.icon}
        label={definition.label}
        onClick={() => { onClick(definition) }}
        title={title}
      />
    </Menu.Item>
  )
}

MainAction.contextTypes = {
  intl: intlShape
}

MainAction.propTypes = {
  definition: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  selectedCount: PropTypes.number,
  disabled: PropTypes.bool
}

const ActionGroup = ({definition, onClick, selectedCount, disabled}, context) => {
  const hasMainAction = (definition.action && Object.keys(definition.action).length > 0)

  if (hasMainAction) {
    return (
      <Menu.Button
        look="raised"
      >
        <Menu.Item>
          <Menu.ButtonGroup>

            <MainAction
              definition={definition.action}
              onClick={onClick}
              selectedCount={selectedCount}
              disabled={disabled}
            />
            <Menu.ItemFlyout
              isToggleable={definition.readonly !== true}
              label={definition.label}
            >
              <Menu.Stack>
                {definition.children.map((actionDefinition, idx) =>
                  <GroupElement
                    disabled={disabled}
                    definition={actionDefinition}
                    key={idx}
                    onClick={onClick}
                    selectedCount={selectedCount}
                  />
                )}
              </Menu.Stack>
            </Menu.ItemFlyout>
          </Menu.ButtonGroup>
        </Menu.Item>
      </Menu.Button>
    )
  } else {
    return (
      <Menu.Button
        look="raised"
      >
        <Menu.ItemFlyout
          isToggleable={definition.readonly !== true}
          label={definition.label}
        >
          <Menu.Stack>
            {definition.children.map((actionDefinition, idx) =>
              <GroupElement
                disabled={disabled}
                definition={actionDefinition}
                key={idx}
                onClick={onClick}
                selectedCount={selectedCount}
              />
            )}
          </Menu.Stack>
        </Menu.ItemFlyout>
      </Menu.Button>
    )
  }
}

ActionGroup.contextTypes = {
  intl: intlShape
}

ActionGroup.propTypes = {
  definition: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  selectedCount: PropTypes.number,
  disabled: PropTypes.bool
}

export default ActionGroup
