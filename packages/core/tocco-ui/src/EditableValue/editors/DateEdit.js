import PropTypes from 'prop-types'
import {useIntl} from 'react-intl'
import {date} from 'tocco-util'

import {toLocalDateString} from '../utils'
import DatePicker from './DatePicker'

const DateFormat = 'P' // MM/dd/yyyy od. dd.MM.y

export const DateEdit = ({onChange, options, id, value, immutable, events, placeholder}) => {
  const intl = useIntl()

  const handleChange = dateTime => {
    const date = dateTime ? toLocalDateString(dateTime) : null
    onChange(date)
  }

  const datePickerOptions = options?.datePickerOptions || {}

  // to support direct input such as 01032020
  const dateFormatWithoutPunctuation = date.getLocalizedDateFormatWithoutPunctuation(intl.locale)
  const dateFormats = [
    DateFormat,
    dateFormatWithoutPunctuation,
    date.useTwoDigitYear(DateFormat), // to support direct input such as 01.03.22
    date.useTwoDigitYear(dateFormatWithoutPunctuation) // to support direct input such as 010322
  ]

  return (
    <DatePicker
      id={id}
      value={value}
      onChange={handleChange}
      dateFormat={dateFormats}
      hasTime={false}
      immutable={immutable}
      events={events}
      placeholder={placeholder}
      {...datePickerOptions}
    />
  )
}

DateEdit.propTypes = {
  id: PropTypes.string,
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

export default DateEdit
