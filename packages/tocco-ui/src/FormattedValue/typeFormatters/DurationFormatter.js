import React from 'react'
import {FormattedDate} from 'react-intl'

const DurationFormatter = props => {
  const milliSeconds = parseInt(props.value)
  const date = new Date(2000, 1, 1, 0, 0, 0, milliSeconds)

  return (
    <FormattedDate
      value={date}
      hour="2-digit"
      minute="2-digit"
      second="2-digit"
      hour12={false}
    />
  )
}

DurationFormatter.propTypes = {
  value: React.PropTypes.number
}

export default DurationFormatter
