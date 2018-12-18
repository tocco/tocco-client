import React from 'react'
import PropTypes from 'prop-types'

import StyledTimeEdit from './StyledTimeEdit'
import {stringToDuration, numbersToTimeFormat} from '../utils'

const TimeEdit = props => {
  const hours = props.value.hourOfDay || 0
  const minutes = props.value.minuteOfHour || 0

  const timeString = numbersToTimeFormat(hours, minutes)

  const handleChange = e => {
    if (props.onChange) {
      props.onChange(stringToDuration(e.target.value))
    }
  }

  return (
    <StyledTimeEdit>
      <input
        type="time"
        value={timeString}
        onChange={handleChange}
        name={props.name}
        id={props.id}
        readOnly={props.readOnly}
      />
    </StyledTimeEdit>
  )
}

TimeEdit.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.shape({
    hourOfDay: PropTypes.number,
    minuteOfHour: PropTypes.number
  }),
  name: PropTypes.string,
  id: PropTypes.string,
  readOnly: PropTypes.bool
}

export default TimeEdit
