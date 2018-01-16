import React from 'react'
import {FormattedDate} from 'react-intl'
import {matchesIsoDate} from '../util/DateUtils'

const DateFormatter = props => {
  return (
    <FormattedDate
      value={props.value}
      year="numeric"
      month="numeric"
      day="numeric"
    />
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
