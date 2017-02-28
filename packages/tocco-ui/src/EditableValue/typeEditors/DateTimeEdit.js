import React from 'react'
import DateAbstract from './DateAbstract'

const DateTimeEdit = props => {
  const options = {
    enableTime: true,
    time_24hr: true,
    altFormat: 'd.m.Y H:i',
    dateFormat: 'Y-m-d\\TH:i:S.000\\Z',
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
