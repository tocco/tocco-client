import PropTypes from 'prop-types'
import React from 'react'
import {FormattedDate, FormattedTime} from 'react-intl'

const DateTimeFormatter = props => {
  const timestamp = Date.parse(props.value)
  if (isNaN(timestamp)) {
    // eslint-disable-next-line no-console
    console.error('DateTimeFormatter: Invalid date', props.value)
    return <span/>
  }

  const date = new Date(timestamp)

  return (
    <span>
      <FormattedDate
        value={date}
        year="numeric"
        month="numeric"
        day="2-digit"
      />,&nbsp;
      <FormattedTime
        value={date}
      />
    </span>
  )
}

DateTimeFormatter.propTypes = {
  value: PropTypes.string.isRequired
}

export default DateTimeFormatter
