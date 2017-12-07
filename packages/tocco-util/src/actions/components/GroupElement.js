import PropTypes from 'prop-types'
import React from 'react'
import {MenuItem} from 'react-bootstrap'

import {getTypeName} from '../actions'

const GroupElement = ({definition, onClick, onSelect}) => {
  const typeName = getTypeName(definition.type)

  if (typeName === 'GroupDivider') {
    return <MenuItem divider/>
  }

  return (
    <MenuItem disabled={definition.readOnly === true} onClick={() => {
      if (!definition.readOnly) {
        setTimeout(() => onSelect(), 100)
        onClick(definition)
      }
    }}>
      {definition.icon && <i className={'fa ' + definition.icon}/>} {definition.label}
    </MenuItem>
  )
}

GroupElement.propTypes = {
  definition: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  onSelect: PropTypes.func
}

export default GroupElement
