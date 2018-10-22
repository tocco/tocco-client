import PropTypes from 'prop-types'
import React from 'react'
import moment from 'moment'
import {injectIntl, intlShape} from 'react-intl'

import DateAbstract from './DateAbstract'
import {atMostOne, momentJStoToFlatpickrFormat, toLocalDateString} from '../utils'

class MultiDateEdit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showCalendar: true,
      showDoubleCalendar: false,
      counter: 0,
      label: this.RANGE_CALENDAR_LABEL
    }
    this.onChangeObject = {
      exactValue: null,
      fromValue: null,
      toValue: null
    }
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

  onBlur = (dateString, values, setValue) => {
    const parsed = this.parseDate(dateString)
    if (values[0] - parsed !== 0) {
      setValue(parsed)
    }
  }

  toggleRangeView = () => {
    this.setState(prevState => ({
      showCalendar: !prevState.showCalendar,
      showDoubleCalendar: !prevState.showDoubleCalendar,
      counter: prevState.counter + 1
    }))

    this.switchValues()
  }

  switchValues = () => {
    if (this.state.counter % 2 === 0) {
      this.setState({label: this.SINGLE_CALENDAR_LABEL})
      this.onChangeObject.exactValue = null
    } else if (this.state.counter % 2 === 1) {
      this.setState({label: this.RANGE_CALENDAR_LABEL})
      this.onChangeObject.fromValue = null
      this.onChangeObject.toValue = null
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
          onBlur={this.onBlur}
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
            onBlur={this.onBlur}
            onChange={this.handleFromDateChange}
            options={{...this.props.options, flatpickrOptions}}
            readOnly={this.props.readOnly}
            events={this.props.events}
          />
          <DateAbstract
            value={[this.props.value.toValue]}
            onBlur={this.onBlur}
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

MultiDateEdit.propTypes = {
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

export default injectIntl(MultiDateEdit)
