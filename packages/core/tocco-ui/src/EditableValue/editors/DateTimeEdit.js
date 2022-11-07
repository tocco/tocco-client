import PropTypes from 'prop-types'
import {injectIntl, useIntl} from 'react-intl'
import {date} from 'tocco-util'

import DatePicker from './DatePicker'

const DateTimeFormat = 'P HH:mm' // MM/dd/yyyy HH:mm od. dd.MM.y HH:mm

export const DateTimeEdit = ({onChange, options, value, immutable, placeholder}) => {
  const intl = useIntl()

  const datePickerOptions = options?.datePickerOptions || {}

  // to support direct input such as 01032020 1230
  const dateTimeFormatWithoutPunctuation = date.getLocalizedDateTimeFormatWithoutPunctuation(intl.locale)
  const dateFormats = [
    DateTimeFormat,
    dateTimeFormatWithoutPunctuation,
    date.useTwoDigitYear(DateTimeFormat), // to support direct input such as 01.03.22 12:30
    date.useTwoDigitYear(dateTimeFormatWithoutPunctuation) // to support direct input such as 010322 12:30
  ]

  return (
    <DatePicker
      value={value}
      onChange={onChange}
      dateFormat={dateFormats}
      hasTime
      immutable={immutable}
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
      maxDate: PropTypes.string,
      dateToValue: PropTypes.func,
      valueToDate: PropTypes.func
    })
  })
}

export default injectIntl(DateTimeEdit)
