import PropTypes from 'prop-types'
import {injectIntl} from 'react-intl'

import LazyDatePicker from './LazyDatePicker'

const DateFormat = 'Pp' // MM/dd/yyyy hh:mm a.m. od. dd.MM.yyyy hh:mm

export const DateTimeEdit = ({onChange, options, value, immutable, events, placeholder}) => {
  const datePickerOptions = options?.datePickerOptions || {}

  return (
    <LazyDatePicker
      value={value}
      onChange={onChange}
      dateFormat={DateFormat}
      hasTime
      immutable={immutable}
      events={events}
      placeholder={placeholder}
      {...datePickerOptions}
    />
  )
}

DateTimeEdit.propTypes = {
  intl: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  immutable: PropTypes.bool,
  options: PropTypes.shape({
    datePickerOptions: PropTypes.shape({
      minDate: PropTypes.string,
      maxDate: PropTypes.string
    })
  }),
  events: PropTypes.shape({
    onFocus: PropTypes.func
  })
}

export default injectIntl(DateTimeEdit)
