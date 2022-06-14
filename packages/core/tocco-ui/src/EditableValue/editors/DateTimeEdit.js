import PropTypes from 'prop-types'
import {injectIntl} from 'react-intl'

import LazyDatePicker from './LazyDatePicker'

const DateFormat = 'Pp' // MM/dd/yyyy hh:mm a.m. od. dd.MM.yyyy hh:mm

export const DateTimeEdit = ({onChange, value, immutable, events, placeholder}) => {
  return (
    <LazyDatePicker
      value={value}
      onChange={onChange}
      dateFormat={DateFormat}
      hasTime
      immutable={immutable}
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
  events: PropTypes.shape({
    onFocus: PropTypes.func
  })
}

export default injectIntl(DateTimeEdit)
