import PropTypes from 'prop-types'
import React, {useMemo} from 'react'
import {injectIntl} from 'react-intl'
import moment from 'moment'

import DateAbstract from './DateAbstract'
import {atMostOne, momentJStoToFlatpickrFormat} from '../utils'

export const DateTimeEdit = props => {
  const momentDateFormat = moment().locale(props.intl.locale)._locale.longDateFormat('L')
  const momentTimeFormat = moment().locale(props.intl.locale)._locale.longDateFormat('LT')
  const altDateFormat = momentJStoToFlatpickrFormat(momentDateFormat)
  const altTimeFormat = momentJStoToFlatpickrFormat(momentTimeFormat)

  const parseDate = useMemo(() => s => {
    const momentDate = moment(s, ['D.M.YYYY H:m', momentDateFormat, momentTimeFormat])
    return momentDate.isValid() ? momentDate.toDate() : null
  }, [])

  const onBlur = (dateString, values, setValue) => {
    const parsed = parseDate(dateString)
    if (values[0] - parsed !== 0) {
      setValue(parsed)
    }
  }

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
    <DateAbstract
      value={[props.value]}
      onChange={handleChange}
      onBlur={onBlur}
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
