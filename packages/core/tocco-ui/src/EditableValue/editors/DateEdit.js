import PropTypes from 'prop-types'

import {toLocalDateString} from '../utils'
import LazyDatePicker from './LazyDatePicker'

const DateFormat = 'P' // MM/dd/yyyy od. dd.MM.yyyy

export const DateEdit = ({onChange, id, value, immutable, events, placeholder}) => {
  const handleChange = dateTime => {
    const date = dateTime ? toLocalDateString(dateTime) : null
    onChange(date)
  }

  return (
    <LazyDatePicker
      id={id}
      value={value}
      onChange={handleChange}
      dateFormat={DateFormat}
      hasTime={false}
      immutable={immutable}
      events={events}
      placeholder={placeholder}
    />
  )
}

DateEdit.propTypes = {
  id: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  immutable: PropTypes.bool,
  events: PropTypes.shape({
    onFocus: PropTypes.func
  })
}

export default DateEdit
