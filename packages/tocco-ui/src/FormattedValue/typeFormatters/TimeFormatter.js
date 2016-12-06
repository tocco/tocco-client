import React from 'react'
import {FormattedDate} from 'react-intl'

const TimeFormatter = props => {
  const hours = parseInt(props.value.value.hourOfDay || 0)
  const minutes = parseInt(props.value.value.minuteOfHour || 0)
  const seconds = parseInt(props.value.value.secondOfMinute || 0)
  const milliSeconds = parseInt(props.value.value.millisOfSecond || 0)

  const date = new Date(2000, 1, 1, hours, minutes, seconds, milliSeconds)

  return (
    <FormattedDate
      value={date}
      hour="2-digit"
      minute="2-digit"
    />
  )
}

TimeFormatter.propTypes = {
  value: React.PropTypes.object.isRequired
}

export default TimeFormatter

