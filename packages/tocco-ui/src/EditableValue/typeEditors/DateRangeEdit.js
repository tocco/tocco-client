import PropTypes from 'prop-types'
import React from 'react'
import moment from 'moment'
import {injectIntl, intlShape} from 'react-intl'

import DateEdit from './DateEdit'

class DateRangeEdit extends React.Component {
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

  areDatesInOrder = () => {
    const fromValue = this.onChangeObject.fromValue
    const toValue = this.onChangeObject.toValue
    return moment(fromValue).isBefore(toValue)
  }

  handleChange = date => {
    this.onChangeObject.exactValue = date
    this.props.onChange(this.onChangeObject)
  }

  handleFromDateChange = date => {
    this.onChangeObject.fromValue = date
    if (this.onChangeObject.fromValue && this.onChangeObject.toValue) {
      if (this.areDatesInOrder() === false) {
        this.onChangeObject.fromValue = null
      }
    }
    this.props.onChange(this.onChangeObject)
  }

  handleToDateChange = date => {
    this.onChangeObject.toValue = date
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

  render() {
    const flatpickrOptions = {...(this.props.options ? this.props.options.flatpickrOptions : {})}

    return (
      <div>
        {this.state.showRange && <DateEdit
          value={this.props.value.exactValue}
          onChange={this.handleChange}
          options={{...this.props.options, flatpickrOptions}}
          readOnly={this.props.readOnly}
          events={this.props.events}
        />}
        <button onClick={this.toggleRangeView}>{this.state.label}</button>
        {!this.state.showRange
        && <div>
          <DateEdit
            value={this.props.value.fromValue}
            onChange={this.handleFromDateChange}
            options={{...this.props.options, flatpickrOptions}}
            readOnly={this.props.readOnly}
            events={this.props.events}
            maxDate={this.props.value.toValue}
          />
          <DateEdit
            value={this.props.value.toValue}
            onChange={this.handleToDateChange}
            options={{...this.props.options, flatpickrOptions}}
            readOnly={this.props.readOnly}
            events={this.props.events}
            minDate={this.props.value.fromValue}
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
