import React from 'react'
import {FormattedDate} from 'react-intl'
import {matchesIsoDate, parseIsoDate} from '../util/DateUtils'

const DateFormatter = props => {
  const localDate = parseIsoDate(props.value)

  if (!localDate) {
    return <span/>
  }

  return (
    <FormattedDate
      value={localDate}
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
