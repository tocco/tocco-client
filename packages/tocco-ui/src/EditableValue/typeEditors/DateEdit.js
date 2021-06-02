import PropTypes from 'prop-types'
import React from 'react'
import moment from 'moment'
import {useIntl} from 'react-intl'

import DateAbstract from './DateAbstract'
import {atMostOne, toLocalDateString, momentJStoToFlatpickrFormat} from '../utils'

export const DateEdit = ({onChange, options, id, value, immutable, events}) => {
  const DATE_FORMAT = 'YYYY-MM-DD'
  const intl = useIntl()

  const getLocalizedAltFormat = () => moment().locale(intl.locale)._locale.longDateFormat('L')

  const parseDate = s => {
    const momentDate = moment(s, [getLocalizedAltFormat(), DATE_FORMAT])
    return momentDate.isValid() ? momentDate.toDate() : null
  }

  const handleChange = dates => {
    const dateTime = atMostOne(dates)
    const date = dateTime ? toLocalDateString(dateTime) : null
    onChange(date)
  }

  const onBlur = (dateString, values, setValue) => {
    const parsed = parseDate(dateString)
    if (values[0] - parsed !== 0) {
      setValue(parsed)
    }
  }

  const flatpickrOptions = {
    altFormat: momentJStoToFlatpickrFormat(getLocalizedAltFormat()),
    dateFormat: momentJStoToFlatpickrFormat(DATE_FORMAT),
    allowInput: true,
    parseDate: parseDate,
    ...(options ? options.flatpickrOptions : {})
  }

  return (
    <DateAbstract
      id={id}
      value={[value]}
      onBlur={onBlur}
      onChange={handleChange}
      options={{...options, flatpickrOptions}}
      immutable={immutable}
      events={events}
    />
  )
}

DateEdit.propTypes = {
  id: PropTypes.string,
  intl: PropTypes.object.isRequired,
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
