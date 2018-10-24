import PropTypes from 'prop-types'
import React from 'react'
import moment from 'moment'
import {injectIntl, intlShape} from 'react-intl'

import DateAbstract from './DateAbstract'
import {atMostOne, momentJStoToFlatpickrFormat, toLocalDateString} from '../utils'

class DateRangeEdit extends React.Component {
  DATE_FORMAT = 'YYYY-MM-DD'
  RANGE_CALENDAR_LABEL = 'Range Calendar'
  SINGLE_CALENDAR_LABEL = 'Exact Calendar'

  constructor(props) {
    super(props)
    this.state = {
      label: this.RANGE_CALENDAR_LABEL,
      showRange: true
    }
    this.onChangeObject = {
      exactValue: null,
      fromValue: null,
      toValue: null
    }
  }

  getLocalizedAltFormat = () => moment().locale(this.props.intl.locale)._locale.longDateFormat('L')

  parseDate = timeString => {
    const momentDate = moment(timeString, [this.getLocalizedAltFormat(), this.DATE_FORMAT])
    return momentDate.isValid() ? momentDate.toDate() : null
  }

  areDatesInOrder = () => {
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
      if (this.areDatesInOrder() === false) {
        this.onChangeObject.fromValue = null
      }
    }
    this.props.onChange(this.onChangeObject)
  }

  handleToDateChange = dates => {
    const dateTime = atMostOne(dates)
    this.onChangeObject.toValue = dateTime ? toLocalDateString(dateTime) : null
    if (this.onChangeObject.fromValue && this.onChangeObject.toValue) {
      if (this.areDatesInOrder() === false) {
        this.onChangeObject.toValue = null
      }
    }
    this.props.onChange(this.onChangeObject)
  }

  toggleRangeView = () => {
    this.setState(prevState => ({
      showRange: !prevState.showRange
    }))
    this.switchValues()
  }

  switchValues = () => {
    if (this.state.showRange) {
      this.setState({label: this.SINGLE_CALENDAR_LABEL})
      if (this.onChangeObject.exactValue !== null) {
        if (this.onChangeObject.fromValue === null && this.onChangeObject.toValue === null) {
          for (const key in this.onChangeObject) {
            if (this.onChangeObject.hasOwnProperty(key)) {
              this.onChangeObject[key] = this.onChangeObject.exactValue
            }
          }
        }
      }
    } else if (!this.state.showRange) {
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
      <div>
        {this.state.showRange && <DateAbstract
          value={[this.props.value.exactValue]}
          onChange={this.handleChange}
          options={{...this.props.options, flatpickrOptions}}
          readOnly={this.props.readOnly}
          events={this.props.events}
          onBlur={this.onBlur}
        />}
        <button onClick={this.toggleRangeView}>{this.state.label}</button>
        {!this.state.showRange
        && <div>
          <DateAbstract
            value={[this.props.value.fromValue]}
            onChange={this.handleFromDateChange}
            options={{...this.props.options, flatpickrOptions}}
            readOnly={this.props.readOnly}
            events={this.props.events}
            maxDate={this.props.value.toValue}
            onBlur={this.onBlur}
          />
          <DateAbstract
            value={[this.props.value.toValue]}
            onChange={this.handleToDateChange}
            options={{...this.props.options, flatpickrOptions}}
            readOnly={this.props.readOnly}
            events={this.props.events}
            minDate={this.props.value.fromValue}
            onBlur={this.onBlur}
          />
        </div>
        }
      </div>
    )
  }
}

DateRangeEdit.defaultProps = {
  value: {
    exactValue: null,
    fromValue: null,
    toValue: null
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
