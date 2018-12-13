import PropTypes from 'prop-types'
import React from 'react'

import {calculateMilliseconds} from '../utils'
import Typography from '../../Typography'
import StyledDurationEdit from './StyledDurationEdit'

class DurationEdit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ...this.millisecondsToDuration(props.value)
    }
    this.maxHours = this.props.options.maxHours
    this.setHourInputProps()
    this.setOnBlurProps()
  }

  setOnBlurProps = () => {
    if (this.maxHours) {
      this.onBlurProps = {
        onBlur: this.fillInZeroOnBlur
      }
    }
  }

  fillInZeroOnBlur = () => {
    if (this.state.minutes === '' && this.state.hours === '') {
      return undefined
    } else if (this.state.minutes === '') {
      this.setState({...this.state, minutes: 0})
    } else if (this.state.hours === '') {
      this.setState({...this.state, hours: 0})
    }
  }

  setHourInputProps = () => {
    if (!this.maxHours) {
      this.hourInputProps = {
        pattern: '\\d+',
        min: 0
      }
    }
  }

  millisecondsToDuration = milliSeconds => {
    if (!milliSeconds && milliSeconds !== 0) {
      return {hours: '', minutes: ''}
    }

    const minutes = parseInt((milliSeconds / (1000 * 60)) % 60)
    const hours = parseInt((milliSeconds / (1000 * 60 * 60)) % 24)
    return {hours, minutes}
  }

  handleHourChange = e => {
    let hours = e.target.value.replace(/[^-\d]/g, '')

    this.setState({...this.state, hours})
    if (this.maxHours) {
      if (hours > this.maxHours) {
        hours = 0
      }
      
      if (hours < 0) {
        hours = this.maxHours
      }
      this.setState({...this.state, hours})
    }
    
    this.handleChange(hours, null)
  }

  getDesiredInputInMinutes = target => {
    let minutes = target.value.replace(/[^-\d]/g, '')

    if (!target.validity.valid) {
      minutes = 0
    }

    if (`${minutes}`.length > 2) {
      minutes = `${minutes}`.slice(0, 2)
    }

    if (minutes > 59) {
      minutes = 0
    }

    if (minutes < 0) {
      minutes = 59
    }

    return minutes
  }

  handleMinutesChange = e => {
    const minutes = this.getDesiredInputInMinutes(e.target)
    this.setState({...this.state, minutes})

    this.handleChange(null, minutes)

    if (minutes.toString().length === 2 || minutes === 0) {
      e.target.select()
    }
  }

  handleChange = (hours, minutes) => {
    const minutesValue = minutes !== null ? minutes : this.state.minutes
    const hoursValue = (hours !== null ? hours : this.state.hours)
    if (minutesValue === '' && hoursValue === '') {
      this.props.onChange(null)
      return
    }
    this.props.onChange(calculateMilliseconds(hoursValue, minutesValue))
  }

  clearInput = () => {
    this.setState({...this.state, hours: '', minutes: ''})
  }

  preventNonNumeric = event => {
    if (!(event.charCode >= 48 && event.charCode <= 57)) {
      event.preventDefault()
    }
  }

  render() {
    return (
      <StyledDurationEdit>
        <input
          type="number"
          step={1}
          onChange={() => {}} // Empty onChange function to prevent React internal error
          className="form-control"
          value={this.state.hours}
          onInput={this.handleHourChange}
          onKeyPress={this.preventNonNumeric}
          disabled={this.props.readOnly}
          {...this.hourInputProps}
          {...this.onBlurProps}
        />
        <Typography.Span>{this.props.options.hoursLabel}</Typography.Span>
        <input
          type="number"
          step={1}
          onChange={() => {}} // Empty onChange function to prevent React internal error
          className="form-control"
          value={this.state.minutes}
          onInput={this.handleMinutesChange}
          onKeyPress={this.preventNonNumeric}
          disabled={this.props.readOnly}
          pattern="\d+"
          {...this.onBlurProps}
        />
        <Typography.Span>{this.props.options.minutesLabel}</Typography.Span>
        { this.maxHours && <button onClick={this.clearInput}>Clear</button>}
      </StyledDurationEdit>
    )
  }
}

DurationEdit.defaultProps = {
  options: {
    hoursLabel: 'hrs',
    minutesLabel: 'min'
  }
}
DurationEdit.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number,
  name: PropTypes.string,
  id: PropTypes.string,
  readOnly: PropTypes.bool,
  options: PropTypes.shape({
    hoursLabel: PropTypes.string,
    minutesLabel: PropTypes.string,
    maxHours: PropTypes.number
  })
}

export default DurationEdit
