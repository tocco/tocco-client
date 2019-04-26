import PropTypes from 'prop-types'
import React from 'react'

import {calculateMilliseconds} from '../utils'
import Typography from '../../Typography'
import {
  StyledDurationEditShadow,
  StyledDurationEditUnit,
  StyledDurationEdit
} from './StyledDurationEdit'
import {StyledEditableWrapper} from '../StyledEditableValue'

class DurationEdit extends React.Component {
  constructor(props) {
    super(props)
    this.hoursShadow = React.createRef()
    this.minutesShadow = React.createRef()
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
    const hours = e.target.value.replace(/[^-\d]/g, '')
    this.setState({...this.state, hours})
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

  preventNonNumeric = event => {
    if (!(event.charCode >= 48 && event.charCode <= 57)) {
      event.preventDefault()
    }
  }

  componentDidMount = () => {
    this.setState({
      hoursWidth: this.hoursShadow.current.offsetWidth,
      minutesWidth: this.minutesShadow.current.offsetWidth
    })
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.hours !== prevState.hours) {
      this.setState({hoursWidth: this.hoursShadow.current.offsetWidth})
    }
    if (this.state.minutes !== prevState.minutes) {
      this.setState({minutesWidth: this.minutesShadow.current.offsetWidth})
    }
  }

  render() {
    return (
      <StyledEditableWrapper readOnly={this.props.readOnly}>
        <StyledDurationEdit
          type="number"
          step={1}
          onChange={() => {}} // Empty onChange function to prevent React internal error
          value={this.state.hours}
          onInput={this.handleHourChange}
          onKeyPress={this.preventNonNumeric}
          disabled={this.props.readOnly}
          pattern="\d+"
          min={0}
          style={{width: this.state.hoursWidth}}
        />
        <StyledDurationEditUnit>
          <Typography.Span>{this.props.options.hoursLabel}</Typography.Span>
        </StyledDurationEditUnit>
        <StyledDurationEdit
          type="number"
          step={1}
          onChange={() => {}} // Empty onChange function to prevent React internal error
          value={this.state.minutes}
          onInput={this.handleMinutesChange}
          onKeyPress={this.preventNonNumeric}
          disabled={this.props.readOnly}
          pattern="\d+"
          style={{width: this.state.minutesWidth}}
        />
        <StyledDurationEditUnit>
          <Typography.Span>{this.props.options.minutesLabel}</Typography.Span>
        </StyledDurationEditUnit>
        <StyledDurationEditShadow ref={this.hoursShadow}>{this.state.hours}</StyledDurationEditShadow>
        <StyledDurationEditShadow ref={this.minutesShadow}>{this.state.minutes}</StyledDurationEditShadow>
      </StyledEditableWrapper>
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
    minutesLabel: PropTypes.string
  })
}

export default DurationEdit
