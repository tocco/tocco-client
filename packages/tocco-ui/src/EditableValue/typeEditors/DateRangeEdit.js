import PropTypes from 'prop-types'
import React from 'react'
import moment from 'moment'
import {injectIntl, intlShape} from 'react-intl'

import DateAbstract from './DateAbstract'
import {momentJStoToFlatpickrFormat} from '../utils'

export const DateRangeEdit = props => {
  const flatpickrOptions = {
    mode: 'range',
    altFormat: momentJStoToFlatpickrFormat(moment().locale(props.intl.locale)._locale.longDateFormat('L')),
    dateFormat: 'Y-m-d',
    allowInput: false,
    ...props.options
  }

  const value = props.value && props.value.from && props.value.to
    ? [props.value.from, props.value.to]
    : null

  const handleChange = dates => {
    if (dates && dates.length === 2) {
      props.onChange({
        from: dates[0],
        to: dates[1]
      })
    }
  }

  return (
    <DateAbstract
      value={value}
      onChange={handleChange}
      immutable={props.immutable}
      options={{...props.options, flatpickrOptions}}
      events={props.events}
    />
  )
}

DateRangeEdit.propTypes = {
  intl: intlShape.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.shape({
    from: PropTypes.string,
    to: PropTypes.string
  }),
  immutable: PropTypes.bool,
  options: PropTypes.shape({
    placeholderText: PropTypes.string,
    flatpickrOptions: PropTypes.object
  }),
  events: PropTypes.shape({
    onFocus: PropTypes.func
  })
}

export default injectIntl(DateRangeEdit)
