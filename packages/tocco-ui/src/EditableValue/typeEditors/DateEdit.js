import PropTypes from 'prop-types'
import React from 'react'
import DateAbstract from './DateAbstract'
import {atMostOne, toLocalDateString} from '../utils'

const DateEdit = props => {
  const options = {
    altFormat: 'd.m.Y',
    dateFormat: 'Y-m-d',
    ...props.options
  }

  const handleChange = dates => {
    const dateTime = atMostOne(dates)
    const date = dateTime ? toLocalDateString(dateTime) : null
    props.onChange(date)
  }

  return (
    <DateAbstract value={[props.value]} onChange={handleChange} options={options} readOnly={props.readOnly}/>
  )
}

DateEdit.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  readOnly: PropTypes.bool,
  options: PropTypes.object
}

export default DateEdit
