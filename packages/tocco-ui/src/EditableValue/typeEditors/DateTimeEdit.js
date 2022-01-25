import moment from 'moment'
import PropTypes from 'prop-types'
import React, {useMemo} from 'react'
import {injectIntl} from 'react-intl'

import {atMostOne, momentJStoToFlatpickrFormat} from '../utils'
import LazyDatePicker from './LazyDatePicker'

export const DateTimeEdit = props => {
  const momentDateFormat = moment().locale(props.intl.locale)._locale.longDateFormat('L')
  const momentTimeFormat = moment().locale(props.intl.locale)._locale.longDateFormat('LT')
  const altDateFormat = momentJStoToFlatpickrFormat(momentDateFormat)
  const altTimeFormat = momentJStoToFlatpickrFormat(momentTimeFormat)

  const parseDate = useMemo(
    () => s => {
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
    ...(props.options ? props.options.flatpickrOptions : {})
  }

  const handleChange = dates => props.onChange(atMostOne(dates))

  return (
    <LazyDatePicker
      value={[props.value]}
      onChange={handleChange}
      parseDate={parseDate}
      formatDate={formatDate}
      immutable={props.immutable}
      options={{...props.options, flatpickrOptions}}
      events={props.events}
    />
  )
}

DateTimeEdit.propTypes = {
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

export default injectIntl(DateTimeEdit)
