import PropTypes from 'prop-types'
import React from 'react'
import {FormattedDate, FormattedTime} from 'react-intl'

import {Span, Time} from '../../Typography'

const DateTimeFormatter = props => {
  const timestamp = Date.parse(props.value)
  if (isNaN(timestamp)) {
    // eslint-disable-next-line no-console
    console.error('DateTimeFormatter: Invalid date', props.value)
    return <Span/>
  }

  const date = new Date(timestamp)

  return (
    <Time dateTime={date.toISOString()}>
      <FormattedDate
        value={date}
        year="numeric"
        month="2-digit"
        day="2-digit"
      />,&nbsp;
      <FormattedTime
        value={date}
      />
    </Time>
  )
}

DateTimeFormatter.propTypes = {
  value: PropTypes.string.isRequired
}

export default DateTimeFormatter
