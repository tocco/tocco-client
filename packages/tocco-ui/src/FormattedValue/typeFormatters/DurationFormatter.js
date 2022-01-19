import PropTypes from 'prop-types'
import React from 'react'
import moment from 'moment'

import Typography from '../../Typography'

const DurationFormatter = props => {
  const milliSeconds = parseInt(props.value)
  const duration = moment.duration(milliSeconds)
  const durationString = joinDurationParts([duration.asHours(), duration.minutes(), duration.seconds()])
  const milliSecondString = `${durationString}.${removeDecimals(duration.milliseconds())}`
  return <Typography.Time
    dateTime={milliSecondString}
    title={durationString}>
    {durationString}
  </Typography.Time>
}

const joinDurationParts = parts => {
  return parts.map(removeDecimals).join(':')
}

const removeDecimals = number => {
  return number.toFixed(0).padStart(2, '0')
}

DurationFormatter.propTypes = {
  value: PropTypes.number
}

export default DurationFormatter
