import React from 'react'
import PropTypes from 'prop-types'

import DurationEdit from './DurationEdit'
import {calculateMilliseconds} from '../utils'

const TimeEdit = props => {
  const propHours = (props.value === null || props.value === undefined) ? 0 : props.value.hoursOfDay
  const propMinutes = (props.value === null || props.value === undefined) ? 0 : props.value.minutesOfHour

  const millisecondsToDuration = milliSeconds => {
    if (!milliSeconds && milliSeconds !== 0) {
      return {hoursOfDay: 0, minutesOfHour: 0}
    }

    const hoursOfDay = Math.floor(milliSeconds / (60 * 60 * 1000))
    const minutesOfHour = Math.floor((milliSeconds - (hoursOfDay * (60 * 60 * 1000))) / (60 * 1000))
    return {hoursOfDay, minutesOfHour}
  }

  const handleChange = value => {
    if (props.onChange) {
      props.onChange(millisecondsToDuration(value))
    }
  }

  const value = calculateMilliseconds(propHours, propMinutes)

  return (
    <DurationEdit
      onChange={handleChange}
      value={value}
      name={props.name}
      id={props.id}
      readOnly={props.readOnly}
      options={{
        maxHours: true,
        hoursLabel: ' : '
      }}
    />
  )
}

TimeEdit.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.shape({
    hoursOfDay: PropTypes.number,
    minutesOfHour: PropTypes.number
  }),
  name: PropTypes.string,
  id: PropTypes.string,
  readOnly: PropTypes.bool
}

export default TimeEdit
