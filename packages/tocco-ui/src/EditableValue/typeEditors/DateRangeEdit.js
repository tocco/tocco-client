import PropTypes from 'prop-types'
import React from 'react'
import moment from 'moment'
import {injectIntl, intlShape} from 'react-intl'

import DateAbstract from './DateAbstract'
import {atMostOne, momentJStoToFlatpickrFormat, toLocalDateString} from '../utils'

class DateRangeEdit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showCalendar: true,
      showDoubleCalendar: false,
      label: this.RANGE_CALENDAR_LABEL
    }
    this.onChangeObject = {
      exactValue: null,
      fromValue: null,
      toValue: null
    }
    this.counter = 1
  }
  DATE_FORMAT = 'YYYY-MM-DD'
  RANGE_CALENDAR_LABEL = 'Range Calendar'
  SINGLE_CALENDAR_LABEL = 'Exact Calendar'

  getLocalizedAltFormat = () => moment().locale(this.props.intl.locale)._locale.longDateFormat('L')

  parseDate = s => {
    const momentDate = moment(s, [this.getLocalizedAltFormat(), this.DATE_FORMAT])
    return momentDate.isValid() ? momentDate.toDate() : null
  }

  compareTimeIntervals = () => {
    const fromValue = this.onChangeObject.fromValue
    const toValue = this.onChangeObject.toValue
    return moment(fromValue).isBefore(toValue)
  }

  handleChange = dates => {
    const dateTime = atMostOne(dates)
    this.onChangeObject.exactValue = dateTime ? toLocalDateString(dateTime) : null
    this.props.onChange(this.onChangeObject)
  }

  handleFromDateChange = dates => {
    const dateTime = atMostOne(dates)
    this.onChangeObject.fromValue = dateTime ? toLocalDateString(dateTime) : null
    if (this.onChangeObject.fromValue && this.onChangeObject.toValue) {
      if (this.compareTimeIntervals() === false) {
        this.onChangeObject.fromValue = null
      }
    }
    this.props.onChange(this.onChangeObject)
  }

  handleToDateChange = dates => {
    const dateTime = atMostOne(dates)
    this.onChangeObject.toValue = dateTime ? toLocalDateString(dateTime) : null
    if (this.onChangeObject.fromValue && this.onChangeObject.toValue) {
      if (this.compareTimeIntervals() === false) {
        this.onChangeObject.toValue = null
      }
    }
    this.props.onChange(this.onChangeObject)
  }

  toggleRangeView = () => {
    this.setState(prevState => ({
      showCalendar: !prevState.showCalendar,
      showDoubleCalendar: !prevState.showDoubleCalendar
    }))
    this.counter += 1
    this.switchValues()
  }

  switchValues = () => {
    if (this.counter % 2 === 0) {
      this.setState({label: this.SINGLE_CALENDAR_LABEL})
      if (this.onChangeObject.exactValue !== null) {
        if (this.onChangeObject.fromValue === null && this.onChangeObject.toValue === null) {
          for (const key in this.onChangeObject) {
            if (this.onChangeObject.hasOwnProperty(key)) {
              this.onChangeObject[key] = this.onChangeObject.exactValue
            }
          }
        }
      } else if (this.counter % 2 === 1) {
        this.setState({label: this.RANGE_CALENDAR_LABEL})
        if (this.onChangeObject.exactValue === null) {
          if (this.onChangeObject.fromValue !== null) {
            this.onChangeObject.exactValue = this.onChangeObject.fromValue
          }
          if (this.onChangeObject.toValue !== null && this.onChangeObject.fromValue === null) {
            this.onChangeObject.exactValue = this.onChangeObject.toValue
          }
        }
      }
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
      <div>
        {this.state.showCalendar && <DateAbstract
          value={[this.props.value.exactValue]}
          onChange={this.handleChange}
          options={{...this.props.options, flatpickrOptions}}
          readOnly={this.props.readOnly}
          events={this.props.events}
        />}
        <button onClick={this.toggleRangeView}>{this.state.label}</button>
        {this.state.showDoubleCalendar
        && <div>
          <DateAbstract
            value={[this.props.value.fromValue]}
            onChange={this.handleFromDateChange}
            options={{...this.props.options, flatpickrOptions}}
            readOnly={this.props.readOnly}
            events={this.props.events}
          />
          <DateAbstract
            value={[this.props.value.toValue]}
            onChange={this.handleToDateChange}
            options={{...this.props.options, flatpickrOptions}}
            readOnly={this.props.readOnly}
            events={this.props.events}
          />
        </div>
        }
      </div>
    )
  }
}

DateRangeEdit.propTypes = {
  intl: intlShape.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.shape({
    exactValue: PropTypes.string,
    fromValue: PropTypes.string,
    toValue: PropTypes.string
  }),
  readOnly: PropTypes.bool,
  options: PropTypes.shape({
    placeholderText: PropTypes.string,
    flatpickrOptions: PropTypes.object
  }),
  events: PropTypes.shape({
    onFocus: PropTypes.func
  })
}

export default injectIntl(DateRangeEdit)
