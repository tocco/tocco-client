import React from 'react'
import {FormattedDate} from 'react-intl'
import {matchesIsoDate} from '../util/DateUtils'

import {Time} from '../../Typography'

const DateFormatter = props => {
  return (
    <Time dateTime={props.value}>
      <FormattedDate
        value={props.value}
        year="numeric"
        month="2-digit"
        day="2-digit"
        timeZone="UTC"
      />
    </Time>
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
