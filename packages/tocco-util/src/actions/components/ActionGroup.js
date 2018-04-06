import PropTypes from 'prop-types'
import React from 'react'
import DropdownButton from 'react-bootstrap/lib/DropdownButton'
import Dropdown from 'react-bootstrap/lib/Dropdown'
import {default as ButtonBS} from 'react-bootstrap/lib/Button'
import GroupElement from './GroupElement'
import {isValidSelection, selectionText} from './selectionHelper'
import {intlShape} from 'react-intl'

const MainAction = ({definition, selectedCount, onClick}, context) => {
  const validSelection = isValidSelection(selectedCount, definition)
  const title = selectionText(selectedCount, definition, context.intl)

  const disabled = definition.readonly === true || !validSelection

  return <ButtonBS onClick={() => { onClick(definition) }} disabled={disabled}>
    <span title={title}>
      {definition.icon && <i className={'fa ' + definition.icon}/>} {definition.label}
    </span>
  </ButtonBS>
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
      <Dropdown id={'action-' + definition.name} disabled={definition.readonly}>
        <MainAction definition={definition.action} selectedCount={selectedCount} onClick={onClick}/>
        <Dropdown.Toggle/>
        <Dropdown.Menu>
          {definition.children.map((actionDefinition, idx) =>
            <GroupElement key={idx} definition={actionDefinition} onClick={onClick} selectedCount={selectedCount}/>
          )}
        </Dropdown.Menu>
      </Dropdown>
    )
  } else {
    return (
      <DropdownButton
        id={'action-' + definition.name}
        title={definition.label}
        disabled={definition.readonly === true}
      >
        {definition.children.map((actionDefinition, idx) =>
          <GroupElement key={idx} definition={actionDefinition} onClick={onClick} selectedCount={selectedCount}/>
        )}
      </DropdownButton>
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
