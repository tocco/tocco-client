import PropTypes from 'prop-types'
import React from 'react'
import {MenuItem} from 'react-bootstrap'
import actionTypes from '../actionTypes'

const GroupElement = ({definition, onClick, onSelect}) => {
  if (definition.actionType === actionTypes.DIVIDER) {
    return <MenuItem divider/>
  }

  return (
    <MenuItem disabled={definition.readonly === true} onClick={() => {
      if (!definition.readonly) {
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
