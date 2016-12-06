import React from 'react'
import {FormattedDate} from 'react-intl'

const DateTimeFormatter = props => {
  const timestamp = Date.parse(props.value)
  if (isNaN(timestamp)) {
    console.error('DateTimeFormatter: Invalid date', props.value)
    return <span/>
  }

  const date = new Date(timestamp)

  return (
    <FormattedDate
      value={date}
      year="numeric"
      month="numeric"
      day="2-digit"
      hour="2-digit"
      minute="2-digit"
    />
  )
}

DateTimeFormatter.propTypes = {
  value: React.PropTypes.string.isRequired
}

export default DateTimeFormatter
