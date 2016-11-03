import React from 'react'
import moment from 'moment'

const DateFieldLabel = props => {
  var formatted = ''
  if (props.value && props.value !== '') {
    var loc = props.locale || 'de'
    moment.locale(loc)
    formatted = moment(props.value).format('ll')
  }

  return (
    <span>{formatted}</span>
  )
}

DateFieldLabel.propTypes = {
  value: React.PropTypes.string,
  locale: React.PropTypes.string
}

export default DateFieldLabel
