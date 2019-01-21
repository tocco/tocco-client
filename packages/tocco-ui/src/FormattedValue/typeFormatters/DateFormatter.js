import React from 'react'
import {FormattedDate, injectIntl, intlShape} from 'react-intl'

import {matchesIsoDate} from '../util/DateUtils'
import Typography from '../../Typography'

export const DateFormatter = props => {
  return (
    <Typography.Time
      dateTime={props.value}
      title={props.intl.formatDate(props.value)}
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
  intl: intlShape.isRequired,
  value: (props, propName, componentName) => {
    if (!matchesIsoDate(props[propName])) {
      return new Error(`Invalid prop '${propName}' supplied to ${componentName}.`)
    }
  }
}

export default injectIntl(DateFormatter)
