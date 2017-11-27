import React from 'react'
import {Button} from 'tocco-ui'
import {FormattedMessage} from 'react-intl'
import {DropdownButton, MenuItem, Dropdown, Button as ButtonBS} from 'react-bootstrap'

const ACTION_NAMESPACE = 'ch.tocco.nice2.model.form.components.action'
const OLD_ACTION_TYPE = `${ACTION_NAMESPACE}.Action`
const ACTION_GROUP_TYPE = `${ACTION_NAMESPACE}.ActionGroup`

export default (actionDefinition, idx, {mode} = {}) => {
  if (mode && actionDefinition.scopes && !actionDefinition.scopes.includes(mode)) return null
  if (actionDefinition.type === OLD_ACTION_TYPE) return null

  const action = actionDefinition.type === ACTION_GROUP_TYPE
    ? renderGroup(actionDefinition) : renderSingleAction(actionDefinition)

  return <span key={`${actionDefinition.name}-${idx}`} className="action">{action}</span>
}

export const isAction = type => type.startsWith(ACTION_NAMESPACE)
const getTypeName = fullType => fullType.split('.').pop()

const getActionAttributes = actionDefinition => {
  actionDefinition = {...actionDefinition, ...getDefaultProps(getTypeName(actionDefinition.type))}
  return {
    ...actionDefinition.label && actionDefinition.useLabel === 'NO'
      ? {title: actionDefinition.label} : {label: actionDefinition.label},
    ...actionDefinition.icon && {icon: actionDefinition.icon},
    ...actionDefinition.readOnly === true && {disabled: true}
  }
}

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
      <Dropdown id={'action-' + actionGroupDefinition.name} disabled={actionGroupDefinition.readOnly === true}>
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
      <DropdownButton
        id={'action-' + actionGroupDefinition.name}
        title={groupMainElement}
        disabled={actionGroupDefinition.readOnly === true}
      >
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
    <MenuItem key={idx} disabled={actionDefinition.readOnly === true}>
      {renderGroupElement(attributes)}
    </MenuItem>
  )
}

const getDefaultProps = typeName => {
  switch (typeName) {
    case 'DeleteAction':
      return {
        useLabel: 'YES',
        icon: 'fa-trash-o',
        label: <FormattedMessage id="client.actions.delete"/>
      }
    case 'CreateAction':
      return {
        useLabel: 'YES',
        icon: 'fa-plus',
        label: <FormattedMessage id="client.actions.create"/>
      }
    case 'SaveAction':
      return {
        useLabel: 'YES',
        icon: 'fa-save',
        label: <FormattedMessage id="client.actions.save"/>
      }
  }

  return {}
}
