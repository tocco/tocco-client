import moment from 'moment'
import PropTypes from 'prop-types'
import {useCallback} from 'react'
import {useIntl} from 'react-intl'

import {atMostOne, toLocalDateString, momentJStoToFlatpickrFormat} from '../utils'
import LazyDatePicker from './LazyDatePicker'

const DATE_FORMAT = 'YYYY-MM-DD'

export const DateEdit = ({onChange, options, id, value, immutable, events, placeholder}) => {
  const intl = useIntl()

  const getLocalizedAltFormat = useCallback(
    () => moment().locale(intl.locale)._locale.longDateFormat('L'),
    [intl.locale]
  )

  const parseDate = useCallback(
    s => {
      const momentDate = moment(s, [getLocalizedAltFormat(), DATE_FORMAT, moment.ISO_8601])
      return momentDate.isValid() ? momentDate.toDate() : null
    },
    [getLocalizedAltFormat]
  )

  const formatDate = s => moment(s).format(getLocalizedAltFormat())

  const handleChange = dates => {
    const dateTime = atMostOne(dates)
    const date = dateTime ? toLocalDateString(dateTime) : null
    onChange(date)
  }

  const flatpickrOptions = {
    altFormat: momentJStoToFlatpickrFormat(getLocalizedAltFormat()),
    dateFormat: momentJStoToFlatpickrFormat(DATE_FORMAT),
    allowInput: true,
    parseDate,
    ...(options?.flatpickrOptions || {})
  }

  return (
    <LazyDatePicker
      id={id}
      value={[value]}
      onChange={handleChange}
      parseDate={parseDate}
      formatDate={formatDate}
      options={{...options, flatpickrOptions}}
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
  options: PropTypes.shape({
    flatpickrOptions: PropTypes.object
  }),
  events: PropTypes.shape({
    onFocus: PropTypes.func
  })
}

export default DateEdit
