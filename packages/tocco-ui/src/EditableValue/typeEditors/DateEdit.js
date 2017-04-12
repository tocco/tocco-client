import React from 'react'
import DateAbstract from './DateAbstract'

const DateEdit = props => {
  const options = {
    altFormat: 'd.m.Y',
    dateFormat: 'Y-m-d',
    ...props.options
  }

  return (
    <DateAbstract value={props.value} onChange={props.onChange} options={options}/>
  )
}

DateEdit.propTypes = {
  onChange: React.PropTypes.func,
  value: React.PropTypes.string,
  options: React.PropTypes.object
}

export default DateEdit
