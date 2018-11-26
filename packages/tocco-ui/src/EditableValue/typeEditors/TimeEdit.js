import PropTypes from 'prop-types'
import React from 'react'

import DurationEdit from './DurationEdit'
import {calculateMilliseconds} from '../utils'

const TimeEdit = props => {
  const propHours = props.value === null ? 0 : props.value.hoursOfDay
  const propMinutes = props.value === null ? 0 : props.value.minutesOfHour

  const millisecondsToDuration = milliSeconds => {
    if (!milliSeconds && milliSeconds !== 0) {
      return {hoursOfDay: '', minutesOfHour: ''}
    }

    const minutesOfHour = parseInt((milliSeconds / (1000 * 60 * 60)) % 60)
    const hoursOfDay = parseInt((milliSeconds / (1000 * 60)) % 24)
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
        maxHours: 24,
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
  readOnly: PropTypes.bool,
  options: PropTypes.shape({
    hoursLabel: PropTypes.string,
    minutesLabel: PropTypes.string,
    maxHours: PropTypes.number
  })
}

export default TimeEdit
