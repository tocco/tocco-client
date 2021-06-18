import React from 'react'
import {FormattedDate, useIntl} from 'react-intl'

import {matchesIsoDate} from '../util/DateUtils'
import Typography from '../../Typography'

export const DateFormatter = props => {
  const intl = useIntl()
  return (
    <Typography.Time
      dateTime={props.value}
      title={intl.formatDate(props.value)}
    >
      <FormattedDate
        value={props.value}
        year="numeric"
        month="2-digit"
        day="2-digit"
        timeZone="UTC"
      />
    </Typography.Time>
  )
}

DateFormatter.propTypes = {
  value: (props, propName, componentName) => {
    if (!matchesIsoDate(props[propName])) {
      return new Error(`Invalid prop '${propName}' supplied to ${componentName}.`)
    }
  }
}

export default DateFormatter
