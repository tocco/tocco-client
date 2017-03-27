import React from 'react'
import {FormattedDate} from 'react-intl'
import {parseLocalDate} from '../util/DateUtils'

const DateFormatter = props => {
  const localDate = parseLocalDate(props.value)

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
    if (!/^\d{4}-\d{2}-\d{2}$/.test(props[propName])) {
      return new Error(`Invalid prop '${propName}' supplied to ${componentName}.`)
    }
  }
}

export default DateFormatter
