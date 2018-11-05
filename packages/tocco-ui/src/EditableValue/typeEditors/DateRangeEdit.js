import PropTypes from 'prop-types'
import React from 'react'
import {injectIntl, intlShape} from 'react-intl'

import DateEdit from './DateEdit'

class DateRangeEdit extends React.Component {
  RANGE_CALENDAR_LABEL = 'Range Calendar'
  SINGLE_CALENDAR_LABEL = 'Exact Calendar'

  constructor(props) {
    super(props)
    this.state = {
      label: this.RANGE_CALENDAR_LABEL,
      showExact: this.handleShowExact()
    }
    this.onChangeObject = {
      exactValue: null,
      fromValue: null,
      toValue: null
    }
    this.fillInValuesOnLoad()
  }

  handleShowExact = () => {
    if (typeof this.props.value.showExact === 'boolean') {
      return this.props.value.showExact
    }
    if (!this.props.value.showExact) {
      if (this.props.value.exactValue) {
        return true
      }
      if (this.props.value.fromValue || this.props.value.toValue) {
        return false
      }
    }
    return true
  }

  fillInValuesOnLoad = () => {
    if (this.props.value.exactValue) {
      if (!this.props.value.fromValue && !this.props.value.toValue) {
        this.props.value.fromValue = this.props.value.exactValue
        this.props.value.toValue = this.props.value.exactValue

        this.onChangeObject.fromValue = this.props.value.exactValue
        this.onChangeObject.toValue = this.props.value.exactValue
      }
    }

    if (!this.props.value.exactValue) {
      if (this.props.value.fromValue && this.props.value.toValue) {
        this.props.value.exactValue = this.props.value.fromValue
      }
      if (this.props.value.fromValue && !this.props.value.toValue) {
        this.props.value.exactValue = this.props.value.fromValue
      }
      if (this.props.value.toValue && !this.props.value.fromValue) {
        this.props.value.exactValue = this.props.value.toValue
      }
    }
  }

  fillInExactValueOnChange = () => {
    if (this.onChangeObject.exactValue !== null) {
      if (this.onChangeObject.fromValue === null && this.onChangeObject.toValue === null) {
        this.onChangeObject.fromValue = this.onChangeObject.exactValue
        this.onChangeObject.toValue = this.onChangeObject.exactValue
      }
    }
  }

  fillInRangeValuesOnChange = () => {
    if (this.onChangeObject.exactValue === null) {
      if (this.onChangeObject.fromValue !== null && this.onChangeObject.toValue !== null) {
        this.onChangeObject.exactValue = this.onChangeObject.fromValue
      }

      if (this.onChangeObject.fromValue !== null && this.onChangeObject.toValue === null) {
        this.onChangeObject.exactValue = this.onChangeObject.fromValue
      }

      if (this.onChangeObject.fromValue === null && this.onChangeObject.toValue !== null) {
        this.onChangeObject.exactValue = this.onChangeObject.toValue
      }
    }
  }

  handleChange = date => {
    this.onChangeObject.exactValue = date
    this.props.onChange(this.onChangeObject)
  }

  handleFromDateChange = date => {
    this.onChangeObject.fromValue = date
    this.props.onChange(this.onChangeObject)
  }

  handleToDateChange = date => {
    this.onChangeObject.toValue = date
    this.props.onChange(this.onChangeObject)
  }

  toggleView = () => {
    this.setState(prevState => ({
      showExact: !prevState.showExact
    }))
    this.switchValues()
  }

  switchValues = () => {
    if (this.state.showExact === true) {
      this.setState({label: this.SINGLE_CALENDAR_LABEL})
      this.fillInExactValueOnChange()
    }
    if (this.state.showExact === false) {
      this.setState({label: this.RANGE_CALENDAR_LABEL})
      this.fillInRangeValuesOnChange()
    }
  }

  render() {
    const flatpickrOptions = {...(this.props.options ? this.props.options.flatpickrOptions : {})}

    return (
      <div>
        {this.state.showExact && <DateEdit
          value={this.props.value.exactValue}
          onChange={this.handleChange}
          options={{...this.props.options, flatpickrOptions}}
          readOnly={this.props.readOnly}
          events={this.props.events}
        />}
        <button onClick={this.toggleView}>{this.state.label}</button>
        {!this.state.showExact
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
    toValue: PropTypes.string,
    showExact: PropTypes.bool
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
