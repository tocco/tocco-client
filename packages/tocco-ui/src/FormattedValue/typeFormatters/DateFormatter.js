import React from 'react'
import {FormattedDate} from 'react-intl'
import {convertDateToUTC} from '../util/DateUtils'

/* eslint no-console: 0 */

const DateFormatter = props => {
  const timestamp = Date.parse(props.value)

  if (isNaN(timestamp)) {
    return <span/>
  }

  console.log('props.value', props.value)
  let date
  if (props.value instanceof Date) {
    date = props.value
  } else {
    date = convertDateToUTC(new Date(timestamp))
  }

  return (
    <FormattedDate
      value={date}
      year="numeric"
      month="numeric"
      day="numeric"
    />
  )
}

DateFormatter.propTypes = {
  value: React.PropTypes.string.isRequired
}

export default DateFormatter
