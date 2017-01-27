import React from 'react'
import DateAbstract from './DateAbstract'

const DateTimeEdit = props => {
  const options = {
    altFormat: 'd.m.Y',
    dateFormat: 'Y-m-d',
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
