import PropTypes from 'prop-types'
import React from 'react'
import {DropdownButton, Dropdown, Button as ButtonBS} from 'react-bootstrap'
import GroupElement from './GroupElement'

const ActionGroup = ({definition, onClick}) => {
  const hasMainAction = (definition.action && Object.keys(definition.action).length > 0)

  if (hasMainAction) {
    const mainActionDefinition = definition.action

    return (
      <Dropdown id={'action-' + definition.name} disabled={definition.readOnly === true}>
        <ButtonBS onClick={() => { onClick(mainActionDefinition) }}>
          {mainActionDefinition.icon && <i className={'fa ' + mainActionDefinition.icon}/>} {mainActionDefinition.label}
        </ButtonBS>
        <Dropdown.Toggle/>
        <Dropdown.Menu>
          {definition.children.map((actionDefinition, idx) =>
            <GroupElement key={idx} definition={actionDefinition} onClick={onClick}/>
          )}
        </Dropdown.Menu>
      </Dropdown>
    )
  } else {
    return (
      <DropdownButton
        id={'action-' + definition.name}
        title={definition.label}
        disabled={definition.readOnly === true}
      >
        {definition.children.map((actionDefinition, idx) =>
          <GroupElement key={idx} definition={actionDefinition} onClick={onClick}/>
        )}
      </DropdownButton>
    )
  }
}

ActionGroup.propTypes = {
  definition: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
}

export default ActionGroup
