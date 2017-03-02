import React from 'react'
import {FormattedDate} from 'react-intl'
import {convertDateToUTC} from '../util/DateUtils'

const DateFormatter = props => {
  const timestamp = Date.parse(props.value)

  if (isNaN(timestamp)) {
    // eslint-disable-next-line no-console
    console.log('DateFormatter: Invalid date', props.value)
    return <span/>
  }

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
