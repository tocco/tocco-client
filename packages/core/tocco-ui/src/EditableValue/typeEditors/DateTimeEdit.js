import moment from 'moment'
import PropTypes from 'prop-types'
import React, {useCallback} from 'react'
import {injectIntl} from 'react-intl'

import {atMostOne, momentJStoToFlatpickrFormat} from '../utils'
import LazyDatePicker from './LazyDatePicker'

export const DateTimeEdit = ({intl, options, onChange, value, immutable, events, placeholder}) => {
  const momentLocale = moment().locale(intl.locale)._locale
  const momentDateFormat = momentLocale.longDateFormat('L')
  const momentTimeFormat = momentLocale.longDateFormat('LT')
  const altDateFormat = momentJStoToFlatpickrFormat(momentDateFormat)
  const altTimeFormat = momentJStoToFlatpickrFormat(momentTimeFormat)

  const parseDate = useCallback(
    s => {
      const momentDate = moment(s, ['D.M.YYYY H:m', momentDateFormat, momentTimeFormat])
      return momentDate.isValid() ? momentDate.toDate() : null
    },
    [momentDateFormat, momentTimeFormat]
  )

  const formatDate = s => moment(s).format(`${momentDateFormat} ${momentTimeFormat}`)

  const flatpickrOptions = {
    enableTime: true,
    time_24hr: true,
    allowInput: true,
    parseDate: parseDate,
    altFormat: `${altDateFormat} ${altTimeFormat}`,
    dateFormat: 'Y-m-d\\TH:i:S.000\\Z',
    ...(options?.flatpickrOptions || {})
  }

  const handleChange = dates => onChange(atMostOne(dates))

  return (
    <LazyDatePicker
      value={[value]}
      onChange={handleChange}
      parseDate={parseDate}
      formatDate={formatDate}
      immutable={immutable}
      options={{...options, flatpickrOptions}}
      events={events}
      placeholder={placeholder}
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
    flatpickrOptions: PropTypes.object
  }),
  events: PropTypes.shape({
    onFocus: PropTypes.func
  })
}

export default injectIntl(DateTimeEdit)
