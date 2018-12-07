import React from 'react'
import PropTypes from 'prop-types'
import {Button} from 'tocco-ui'

import selectionModes from '../../util/selectionModes'

const SelectionController = props => {
  const changeMode = event => {
    props.setSelectionMode(event.target.value)
  }

  return (
    <div>
      {props.selectionMode === 'selection'
      && <span>
        <Button dense icon="times" onClick={props.clearSelection}/>
        <Button dense label={`${props.selection.length} selected`}/>
      </span>
      }
      <select value={props.selectionMode} onChange={changeMode}>
        <option value={selectionModes.SELECTION}>Selection</option>
        <option value={selectionModes.ALL}>All</option>
      </select>
    </div>
  )
}

SelectionController.propTypes = {
  clearSelection: PropTypes.func.isRequired,
  selection: PropTypes.array.isRequired,
  setSelectionMode: PropTypes.func.isRequired,
  selectionMode: PropTypes.string
}

export default SelectionController
