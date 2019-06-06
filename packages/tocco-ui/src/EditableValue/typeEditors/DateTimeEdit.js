import PropTypes from 'prop-types'
import React from 'react'
import {injectIntl, intlShape} from 'react-intl'
import moment from 'moment'

import DateAbstract from './DateAbstract'
import {atMostOne, momentJStoToFlatpickrFormat} from '../utils'

export const DateTimeEdit = props => {
  const altDateFormat = momentJStoToFlatpickrFormat(moment().locale(props.intl.locale)._locale.longDateFormat('L'))
  const altTimeFormat = momentJStoToFlatpickrFormat(moment().locale(props.intl.locale)._locale.longDateFormat('LT'))

  const flatpickrOptions = {
    enableTime: true,
    time_24hr: true,
    allowInput: false,
    altFormat: `${altDateFormat} ${altTimeFormat}`,
    dateFormat: 'Y-m-d\\TH:i:S.000\\Z',
    ...(props.options ? props.options.flatpickrOptions : {})
  }

  const handleChange = dates => props.onChange(atMostOne(dates))

  return (
    <span>
      <DateAbstract
        value={[props.value]}
        onChange={handleChange}
        immutable={props.immutable}
        options={{...props.options, flatpickrOptions}}
        events={props.events}
      />
    </span>
  )
}

DateTimeEdit.propTypes = {
  intl: intlShape.isRequired,
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
