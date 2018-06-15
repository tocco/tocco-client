import PropTypes from 'prop-types'
import React from 'react'
import {FormattedTime, injectIntl, intlShape} from 'react-intl'

import {Time} from '../../Typography'

const TimeFormatter = props => {
  const hours = parseInt(props.value.value.hourOfDay) || 0
  const minutes = parseInt(props.value.value.minuteOfHour) || 0
  const seconds = parseInt(props.value.value.secondOfMinute) || 0
  const milliSeconds = parseInt(props.value.value.millisOfSecond) || 0

  const date = new Date(2000, 1, 1, hours, minutes, seconds, milliSeconds)

  const twoDigits = n => { return String('00' + n).slice(-2) }
  const timeIso = `${twoDigits(date.getHours())}:${twoDigits(date.getMinutes())}`

  return (
    <Time
      dateTime={timeIso}
      title={props.intl.formatTime(date)}
    >
      <FormattedTime
        value={date}
      />
    </Time>
  )
}

TimeFormatter.propTypes = {
  intl: intlShape.isRequired,
  value: PropTypes.object.isRequired
}

export default injectIntl(TimeFormatter)
