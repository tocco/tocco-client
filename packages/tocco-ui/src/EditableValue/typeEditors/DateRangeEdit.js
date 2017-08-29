import PropTypes from 'prop-types'
import React from 'react'
import DateAbstract from './DateAbstract'

const DateRangeEdit = props => {
  const options = {
    mode: 'range',
    altFormat: 'd.m.Y',
    dateFormat: 'Y-m-d',
    ...props.options
  }

  const value = props.value && props.value.from && props.value.to
    ? [props.value.from, props.value.to]
    : null

  const handleChange = dates => {
    const value = dates && dates.length === 2
      ? {
        from: dates[0],
        to: dates[1]
      }
      : null

    props.onChange(value)
  }

  return (
    <DateAbstract value={value} onChange={handleChange} readOnly={props.readOnly} options={options}/>
  )
}

DateRangeEdit.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.shape({
      from: PropTypes.string,
      to: PropTypes.string
    }),
    PropTypes.string // empty string coming from Redux Form if value null
  ]),
  readOnly: PropTypes.bool,
  options: PropTypes.object
}

export default DateRangeEdit
