import moment from 'moment'
import PropTypes from 'prop-types'
import React from 'react'
import {useIntl} from 'react-intl'

import {atMostOne, toLocalDateString, momentJStoToFlatpickrFormat} from '../utils'
import LazyDatePicker from './LazyDatePicker'

export const DateEdit = ({onChange, options, id, value, immutable, events}) => {
  const DATE_FORMAT = 'YYYY-MM-DD'
  const intl = useIntl()

  const getLocalizedAltFormat = () => moment().locale(intl.locale)._locale.longDateFormat('L')

  const parseDate = s => {
    const momentDate = moment(s, [getLocalizedAltFormat(), DATE_FORMAT])
    return momentDate.isValid() ? momentDate.toDate() : null
  }

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
    parseDate: parseDate,
    ...(options ? options.flatpickrOptions : {})
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
    />
  )
}

DateEdit.propTypes = {
  id: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  immutable: PropTypes.bool,
  options: PropTypes.shape({
    placeholderText: PropTypes.string,
    flatpickrOptions: PropTypes.object
  }),
  events: PropTypes.shape({
    onFocus: PropTypes.func
  })
}

export default DateEdit
