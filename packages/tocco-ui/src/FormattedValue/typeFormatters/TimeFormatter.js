import React from 'react'
import {FormattedTime, injectIntl, intlShape} from 'react-intl'
import moment from 'moment'

import Typography from '../../Typography'

export const getTimePartOrZero = (value, part) => parseInt(value.split(':')[part]) || 0

const TimeFormatter = ({value, intl}) => {
  const hours = getTimePartOrZero(value, 0)
  const minutes = getTimePartOrZero(value, 1)
  const seconds = getTimePartOrZero(value, 2)
  const milliSeconds = getTimePartOrZero(value, 3)

  const date = new Date(2000, 1, 1, hours, minutes, seconds, milliSeconds)
  const timeIso = moment(date).format(moment.HTML5_FMT.TIME_MS)

  return (
    <Typography.Time
      dateTime={timeIso}
      title={intl.formatTime(date)}
    >
      <FormattedTime
        value={date}
      />
    </Typography.Time>
  )
}

TimeFormatter.propTypes = {
  intl: intlShape.isRequired,
  value: (props, propName, componentName) => {
    if (!/^\d{2}:\d{2}(:\d{2}(:\d{3})?)?$/.test(props[propName])) {
      return new Error('Invalid prop `' + propName + '` supplied to `' + componentName + '`')
    }
  }
}

export default injectIntl(TimeFormatter)
