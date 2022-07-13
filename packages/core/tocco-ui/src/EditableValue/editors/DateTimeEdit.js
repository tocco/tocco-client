import PropTypes from 'prop-types'
import {injectIntl, useIntl} from 'react-intl'
import {date} from 'tocco-util'

import LazyDatePicker from './LazyDatePicker'

const DateTimeFormat = 'Pp' // MM/dd/yyyy hh:mm a.m. od. dd.MM.yyyy hh:mm

export const DateTimeEdit = ({onChange, options, value, immutable, events, placeholder}) => {
  const intl = useIntl()

  const datePickerOptions = options?.datePickerOptions || {}

  // to support direct input such as 01032020 1230
  const dateTimeFormatWithoutPunctuation = date.getLocalizedDateTimeFormatWithoutPunctuation(intl.locale)

  return (
    <LazyDatePicker
      value={value}
      onChange={onChange}
      dateFormat={[DateTimeFormat, dateTimeFormatWithoutPunctuation]}
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
