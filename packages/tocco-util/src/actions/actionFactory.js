import React from 'react'
import {Button} from 'tocco-ui'
import {FormattedMessage} from 'react-intl'
import {DropdownButton, MenuItem, Dropdown, Button as ButtonBS} from 'react-bootstrap'

const ACTION_NAMESPACE = 'ch.tocco.nice2.model.form.components.action.'
const ACTION_GROUP_TYPE = 'ch.tocco.nice2.model.form.components.action.ActionGroup'

export default (actionDefinition, idx) => {
  const action = actionDefinition.type === ACTION_GROUP_TYPE
    ? renderGroup(actionDefinition) : renderSingleAction(actionDefinition)

  return <span key={`${actionDefinition.name}-${idx}`} className="action">{action}</span>
}

export const isAction = type => type.startsWith(ACTION_NAMESPACE)
const getTypeName = fullType => fullType.split('.').pop()

const getActionAttributes = actionDefinition => ({
  ...getDefaultProps(getTypeName(actionDefinition.type)),
  ...actionDefinition.label && {label: actionDefinition.label},
  ...actionDefinition.icon && {icon: actionDefinition.icon}
})

const renderSingleAction = actionDefintion => (
  <Button {...getActionAttributes(actionDefintion)}/>
)

const renderGroup = actionGroupDefinition => {
  const hasMainAction = (actionGroupDefinition.action && Object.keys(actionGroupDefinition.action).length > 0)

  const groupMainElement = renderGroupElement(
    getActionAttributes(hasMainAction ? actionGroupDefinition.action : actionGroupDefinition)
  )

  if (hasMainAction) {
    return (
      <Dropdown id={'action-' + actionGroupDefinition.name}>
        <ButtonBS>
          {groupMainElement}
        </ButtonBS>
        <Dropdown.Toggle/>
        <Dropdown.Menu>
          {actionGroupDefinition.children.map(renderSubAction)}
        </Dropdown.Menu>
      </Dropdown>
    )
  } else {
    return (
      <DropdownButton id={'action-' + actionGroupDefinition.name} title={groupMainElement}>
        {actionGroupDefinition.children.map(renderSubAction)}
      </DropdownButton>
    )
  }
}

const renderGroupElement = actionDefinition => (
  <span>
    {actionDefinition.icon && <i className={'fa ' + actionDefinition.icon}/>} {actionDefinition.label}
  </span>
)

const renderSubAction = (actionDefinition, idx) => {
  const typeName = getTypeName(actionDefinition.type)

  if (typeName === 'GroupDivider') {
    return <MenuItem key={idx} divider/>
  }

  const attributes = getActionAttributes(actionDefinition)
  return (
    <MenuItem key={idx}>
      {renderGroupElement(attributes)}
    </MenuItem>
  )
}

const getDefaultProps = typeName => {
  switch (typeName) {
    case 'DeleteAction':
      return {
        icon: 'fa-trash-o',
        label: <FormattedMessage id="client.actions.delete"/>
      }
    case 'CreateAction':
      return {
        icon: 'fa-plus',
        label: <FormattedMessage id="client.actions.create"/>
      }
    case 'SaveAction':
      return {
        icon: 'fa-save',
        label: <FormattedMessage id="client.actions.save"/>
      }
  }

  return {}
}
