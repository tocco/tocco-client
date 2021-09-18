import React from 'react'
import PropTypes from 'prop-types'
import {Typography} from 'tocco-ui'

import {StyledCheckEventGroup, StyledGroupHeading} from './StyledCheckEvents'

const allSelected = (events, selection) => {
  for (const event of events) {
    if (!selection.has(event.id)) {
      return false
    }
  }
  return true
}

const CheckEventGroup = ({type, events, selection, setSelected}) => {
  const groupChecked = allSelected(events, selection)

  const handleHeaderSelectionChange = e => {
    setSelected(events.map(event => event.id), e.target.checked)
  }

  const handleSelectionChange = id => e => {
    setSelected([id], e.target.checked)
  }

  return (
    <StyledCheckEventGroup>
      <StyledGroupHeading>
        <input type="checkbox" id={'checkbox-' + type} checked={groupChecked} onChange={handleHeaderSelectionChange}/>
        <Typography.Label for={'checkbox-' + type}>
          <Typography.B>{type} ({events.length})</Typography.B>
        </Typography.Label>
      </StyledGroupHeading>
      {events.map(event => (
        <div key={event.id}>
          <input
            type="checkbox"
            id={'checkbox-' + event.id}
            checked={selection.has(event.id)}
            onChange={handleSelectionChange(event.id)}
          />
          <Typography.Label for={'checkbox-' + event.id}>{event.label}</Typography.Label>
        </div>
      ))}
    </StyledCheckEventGroup>
  )
}

CheckEventGroup.propTypes = {
  type: PropTypes.string.isRequired,
  events: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
  })).isRequired,
  selection: PropTypes.object.isRequired,
  setSelected: PropTypes.func.isRequired
}

export default CheckEventGroup
