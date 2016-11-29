import React from 'react'
import {FormattedDate} from 'react-intl'

const DateFormatter = props => {
  const timestamp = Date.parse(props.value)
  if (isNaN(timestamp)) {
    console.log('invalid date', props.value)
    return <span/>
  }

  const date = new Date(timestamp)

  return (
    <FormattedDate
      value={date}
      year="numeric"
      month="short"
      day="2-digit"
    />
  )
}

DateFormatter.propTypes = {
  value: React.PropTypes.string.isRequired
}

export default DateFormatter
