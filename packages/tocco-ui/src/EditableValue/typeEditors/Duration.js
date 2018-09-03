import PropTypes from 'prop-types'
import React from 'react'

class Duration extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ...this.millisecondsToDuration(props.value)
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
    const hours = e.target.value.replace(/[^\d]/, '')
    this.setState({...this.state, hours})
    this.handleChange(hours, null)
  }

  preventInvalidInputInMinutes = event => {
    return event.target.value.replace(/[^\d]/, '')
  }

  handleMinutesChange = e => {
    let minutes = this.preventInvalidInputInMinutes(e)
    
    if (!e.target.validity.valid) {
      minutes = 0
    }

    if (`${minutes}`.length > 2) {
      minutes = `${minutes}`.slice(0, 2)
    }

    if (minutes > 59) {
      minutes = 0
    }

    this.setState({...this.state, minutes: minutes})

    this.handleChange(null, minutes)

    if (minutes.toString().length === 2 || minutes === 0) {
      e.target.select()
    }
  }

  calculateMilliseconds = (hoursValue, minutesValue) => {
    const hoursMilliseconds = (hoursValue || 0) * 60 * 60000
    const minutesMilliseconds = (minutesValue || 0) * 60000
    return hoursMilliseconds + minutesMilliseconds
  }

  handleChange = (hours, minutes) => {
    const minutesValue = minutes !== null ? minutes : this.state.minutes
    const hoursValue = (hours !== null ? hours : this.state.hours)
    if (minutesValue === '' && hoursValue === '') {
      this.props.onChange(null)
      return
    }
    this.props.onChange(this.calculateMilliseconds(minutesValue, hoursValue))
  }

  preventNonNumeric = event => {
    if (!(event.charCode >= 48 && event.charCode <= 57)) {
      event.preventDefault()
    }
  }

  render() {
    return (
      <div style={{display: 'flex', flexWrap: 'nowrap'}}>
        <input
          type="number"
          min={0}
          step={1}
          onChange={() => {}} // Empty onChange function to prevent React internal error
          style={{marginRight: '5px'}}
          className="form-control"
          value={this.state.hours}
          onInput={this.handleHourChange}
          onKeyPress={this.preventNonNumeric}
          disabled={this.props.readOnly}
          pattern="\d+"
        />
        {this.props.options.hoursLabel}
        <input
          type="number"
          min={0}
          step={1}
          onChange={() => {}} // Empty onChange function to prevent React internal error
          style={{margin: '0 5px 0 5px'}}
          className="form-control"
          value={this.state.minutes}
          onInput={this.handleMinutesChange}
          onKeyPress={this.preventNonNumeric}
          disabled={this.props.readOnly}
          max={59}
          pattern="\d+"
        />
        {this.props.options.minutesLabel}
      </div>
    )
  }
}

Duration.defaultProps = {
  options: {
    hoursLabel: 'hrs',
    minutesLabel: 'min'
  }
}
Duration.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number,
  name: PropTypes.string,
  id: PropTypes.string,
  readOnly: PropTypes.bool,
  options: PropTypes.shape({
    hoursLabel: PropTypes.string,
    minutesLabel: PropTypes.string
  })
}

export default Duration
