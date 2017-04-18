import React from 'react'
import DateAbstract from './DateAbstract'
import {atMostOne} from '../utils'

const DateTimeEdit = props => {
  const options = {
    enableTime: true,
    time_24hr: true,
    altFormat: 'd.m.Y H:i',
    dateFormat: 'Y-m-d\\TH:i:S.000\\Z',
    ...props.options
  }

  const handleChange = dates => props.onChange(atMostOne(dates))

  return (
    <DateAbstract value={[props.value]} onChange={handleChange} options={options}/>
  )
}

DateTimeEdit.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  value: React.PropTypes.string,
  options: React.PropTypes.object
}

export default DateTimeEdit
