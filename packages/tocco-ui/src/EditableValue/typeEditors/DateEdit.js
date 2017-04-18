import React from 'react'
import DateAbstract from './DateAbstract'
import {atMostOne} from '../utils'

const DateEdit = props => {
  const options = {
    altFormat: 'd.m.Y',
    dateFormat: 'Y-m-d',
    ...props.options
  }

  const handleChange = dates => props.onChange(atMostOne(dates))

  return (
    <DateAbstract value={[props.value]} onChange={handleChange} options={options}/>
  )
}

DateEdit.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  value: React.PropTypes.string,
  options: React.PropTypes.object
}

export default DateEdit
