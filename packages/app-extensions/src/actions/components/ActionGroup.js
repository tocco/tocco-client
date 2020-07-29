import PropTypes from 'prop-types'
import React from 'react'
import {injectIntl, intlShape} from 'react-intl'
import {ButtonMenu, MenuItem, Icon} from 'tocco-ui'

import {isValidSelection, selectionText} from './selectionHelper'

const getChildMenuItems = input => {
  const {onClick, definition, selectedCount, intl} = input
  const validSelection = isValidSelection(selectedCount, definition)
  const disabled = definition.readonly === true || !validSelection
  const title = selectionText(selectedCount, definition, intl)
  const isActionGroup = definition.componentType === 'action-group'
  return <MenuItem
    {...(!isActionGroup && !disabled && {onClick: () => onClick(definition)})}
    disabled={disabled}
    title={title}
    key={`MenuItem-${definition.id}`}
  >
    <span>{definition.icon && <Icon icon={definition.icon}/>} {definition.label}</span>
    {
      definition.componentType === 'action-group'
      && definition.children.map(child => getChildMenuItems({...input, definition: child}))
    }
  </MenuItem>
}

const ActionGroup = props => {
  const {definition, onClick} = props
  const hasDefaultAction = (definition.defaultAction && Object.keys(definition.defaultAction).length > 0)

  const label = hasDefaultAction ? definition.defaultAction.label : definition.label
  const onClickHandler = hasDefaultAction ? () => { onClick(definition.defaultAction) } : null
  return <ButtonMenu buttonProps={{look: 'raised'}} label={label} onClick={onClickHandler}>
    {
      definition.children.map((childDefinition, idx) => getChildMenuItems({...props, definition: childDefinition}))
    }
  </ButtonMenu>
}

ActionGroup.propTypes = {
  intl: intlShape.isRequired,
  definition: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  selectedCount: PropTypes.number,
  disabled: PropTypes.bool
}

export default injectIntl(ActionGroup)
