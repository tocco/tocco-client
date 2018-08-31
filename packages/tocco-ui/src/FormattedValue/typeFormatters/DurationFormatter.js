import PropTypes from 'prop-types'
import React from 'react'
import {FormattedDate} from 'react-intl'
import moment from 'moment'

import Typography from '../../Typography'

const DurationFormatter = props => {
  const milliSeconds = parseInt(props.value)
  const date = new Date(2000, 1, 1, 0, 0, 0, milliSeconds)
  const durationIsoMs = moment(date).format(moment.HTML5_FMT.TIME_MS)
  const durationIsoS = moment(date).format(moment.HTML5_FMT.TIME_SECONDS)
  return (
    <Typography.Time
      dateTime={durationIsoMs}
      title={durationIsoS}
    >
      <FormattedDate
        value={date}
        hour="2-digit"
        minute="2-digit"
        second="2-digit"
        hour12={false}
      />
    </Typography.Time>
  )
}

DurationFormatter.propTypes = {
  value: PropTypes.number
}

export default DurationFormatter
