import React from 'react'
import DateAbstract from './DateAbstract'

const DateTimeEdit = props => {
  const options = {
    enableTime: true,
    altFormat: 'd.m.Y H:i',
    dateFormat: 'Y-m-d\\TH:i:s.000\\Z',
    time_24hr: true,
    ...props.options
  }

  return (
    <DateAbstract {...props} options={options}/>
  )
}

DateTimeEdit.propTypes = {
  onChange: React.PropTypes.func,
  value: React.PropTypes.string,
  options: React.PropTypes.object
}

export default DateTimeEdit
