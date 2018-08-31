import PropTypes from 'prop-types'
import React from 'react'
import {FormattedDate, FormattedTime, injectIntl, intlShape} from 'react-intl'

import Typography from '../../Typography'

const DateTimeFormatter = props => {
  const timestamp = Date.parse(props.value)
  if (isNaN(timestamp)) {
    // eslint-disable-next-line no-console
    console.error('DateTimeFormatter: Invalid date', props.value)
    return <Typography.Span/>
  }

  const date = new Date(timestamp)
  return (
    <Typography.Time
      dateTime={date.toISOString()}
      title={`${props.intl.formatDate(date)}, ${props.intl.formatTime(date)}`}
    >
      <FormattedDate
        value={date}
        year="numeric"
        month="2-digit"
        day="2-digit"
      />,&nbsp;
      <FormattedTime
        value={date}
      />
    </Typography.Time>
  )
}

DateTimeFormatter.propTypes = {
  intl: intlShape.isRequired,
  value: PropTypes.string.isRequired
}

export default injectIntl(DateTimeFormatter)
