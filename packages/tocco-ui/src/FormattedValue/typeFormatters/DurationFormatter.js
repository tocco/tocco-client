import PropTypes from 'prop-types'
import React from 'react'
import {FormattedDate} from 'react-intl'

import {Time} from '../../Typography'

const DurationFormatter = props => {
  const milliSeconds = parseInt(props.value)
  const date = new Date(2000, 1, 1, 0, 0, 0, milliSeconds)
  const twoDigits = n => { return String('00' + n).slice(-2) }
  const durationIso = `${twoDigits(date.getHours())}:${twoDigits(date.getMinutes())}:${twoDigits(date.getSeconds())}`
  return (
    <Time dateTime={durationIso}>
      <FormattedDate
        value={date}
        hour="2-digit"
        minute="2-digit"
        second="2-digit"
        hour12={false}
      />
    </Time>
  )
}

DurationFormatter.propTypes = {
  value: PropTypes.number
}

export default DurationFormatter
