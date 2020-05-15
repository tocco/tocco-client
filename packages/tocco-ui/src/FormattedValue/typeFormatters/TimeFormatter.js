import PropTypes from 'prop-types'
import React from 'react'
import {FormattedTime, injectIntl, intlShape} from 'react-intl'
import moment from 'moment'

import Typography from '../../Typography'

const TimeFormatter = props => {
  const hours = parseInt(props.value.split(':')[0]) || 0
  const minutes = parseInt(props.value.split(':')[1]) || 0
  const seconds = parseInt(props.value.split(':')[2]) || 0
  const milliSeconds = parseInt(props.value.split(':')[4]) || 0

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
  value: PropTypes.string
}

export default injectIntl(TimeFormatter)
