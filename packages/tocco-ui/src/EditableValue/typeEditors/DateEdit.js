import PropTypes from 'prop-types'
import React from 'react'
import moment from 'moment'
import {injectIntl, intlShape} from 'react-intl'

import DateAbstract from './DateAbstract'
import {atMostOne, toLocalDateString, momentJStoToFlatpickrFormat} from '../utils'

export class DateEdit extends React.Component {
  DATE_FORMAT = 'YYYY-MM-DD'

  getLocalizedAltFormat = () => moment().locale(this.props.intl.locale)._locale.longDateFormat('L')

  parseDate = s => {
    const momentDate = moment(s, [this.getLocalizedAltFormat(), this.DATE_FORMAT])
    return momentDate.isValid() ? momentDate.toDate() : null
  }

  handleChange = dates => {
    const dateTime = atMostOne(dates)
    const date = dateTime ? toLocalDateString(dateTime) : null
    this.props.onChange(date)
  }

  onBlur = (dateString, values, setValue) => {
    const parsed = this.parseDate(dateString)
    if (values[0] - parsed !== 0) {
      setValue(parsed)
    }
  }

  render() {
    const flatpickrOptions = {
      altFormat: momentJStoToFlatpickrFormat(this.getLocalizedAltFormat()),
      dateFormat: momentJStoToFlatpickrFormat(this.DATE_FORMAT),
      allowInput: true,
      parseDate: this.parseDate,
      ...(this.props.options ? this.props.options.flatpickrOptions : {})
    }

    return (
      <DateAbstract
        id={this.props.id}
        value={[this.props.value]}
        onBlur={this.onBlur}
        onChange={this.handleChange}
        options={{...this.props.options, flatpickrOptions}}
        immutable={this.props.immutable}
        events={this.props.events}
      />
    )
  }
}

DateEdit.propTypes = {
  id: PropTypes.string,
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

export default injectIntl(DateEdit)
