import PropTypes from 'prop-types'
import React from 'react'
import {injectIntl, intlShape} from 'react-intl'
import {Button, Menu} from 'tocco-ui'

import GroupElement from './GroupElement'
import {isValidSelection, selectionText} from './selectionHelper'

const MainAction = ({definition, selectedCount, onClick, disabled, intl}) => {
  const validSelection = isValidSelection(selectedCount, definition)
  const title = selectionText(selectedCount, definition, intl)
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

MainAction.propTypes = {
  intl: intlShape.isRequired,
  definition: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  selectedCount: PropTypes.number,
  disabled: PropTypes.bool
}

const ActionGroup = ({definition, onClick, selectedCount, disabled, intl}) => {
  const hasMainAction = (definition.defaultAction && Object.keys(definition.defaultAction).length > 0)

  if (hasMainAction) {
    return (
      <Menu.Button
        look="raised"
      >
        <Menu.Item>
          <Menu.ButtonGroup>

            <MainAction
              definition={definition.defaultAction}
              onClick={onClick}
              selectedCount={selectedCount}
              disabled={disabled}
              intl={intl}
            />
            <Menu.ItemFlyout
              isToggleable={definition.readonly !== true}
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

ActionGroup.propTypes = {
  intl: intlShape.isRequired,
  definition: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  selectedCount: PropTypes.number,
  disabled: PropTypes.bool
}

export default injectIntl(ActionGroup)
