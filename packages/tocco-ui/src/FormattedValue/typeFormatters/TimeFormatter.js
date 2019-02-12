import PropTypes from 'prop-types'
import React from 'react'
import {FormattedTime, injectIntl, intlShape} from 'react-intl'
import moment from 'moment'

import Typography from '../../Typography'

const TimeFormatter = props => {
  const hours = parseInt(props.value.value.hourOfDay) || 0
  const minutes = parseInt(props.value.value.minuteOfHour) || 0
  const seconds = parseInt(props.value.value.secondOfMinute) || 0
  const milliSeconds = parseInt(props.value.value.millisOfSecond) || 0
  const date = new Date(2000, 1, 1, hours, minutes, seconds, milliSeconds)
  const timeIso = moment(date).format(moment.HTML5_FMT.TIME_MS)

  return (
    <Typography.Time
      dateTime={timeIso}
      title={props.intl.formatTime(date)}
    >
      <FormattedTime
        value={date}
      />
    </Typography.Time>
  )
}

TimeFormatter.propTypes = {
  intl: intlShape.isRequired,
  value: PropTypes.object.isRequired
}

export default injectIntl(TimeFormatter)
