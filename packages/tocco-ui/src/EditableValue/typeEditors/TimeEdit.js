import React from 'react'
import PropTypes from 'prop-types'

import DurationEdit from './DurationEdit'
import {calculateMilliseconds, isNullOrUndefined, millisecondsToDuration} from '../utils'

const TimeEdit = props => {
  const hours = isNullOrUndefined(props.value) ? null : props.value.hoursOfDay
  const minutes = isNullOrUndefined(props.value) ? null : props.value.minutesOfHour

  const handleChange = value => {
    if (props.onChange) {
      props.onChange(millisecondsToDuration(value))
    }
  }

  const value = calculateMilliseconds(hours, minutes)

  return (
    <DurationEdit
      onChange={handleChange}
      value={value}
      name={props.name}
      id={props.id}
      readOnly={props.readOnly}
      options={{
        maxHours: 23,
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
