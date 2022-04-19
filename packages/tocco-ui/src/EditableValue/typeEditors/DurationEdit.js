import PropTypes from 'prop-types'
import React from 'react'

import {calculateMilliseconds} from '../utils'
import Typography from '../../Typography'
import {
  StyledDurationEditShadow,
  StyledDurationEditFocusable,
  StyledDurationEdit
} from './StyledDurationEdit'
import {StyledEditableWrapper} from '../StyledEditableValue'
class DurationEdit extends React.Component {
  WIDTH_PADDING = 5

  constructor(props) {
    super(props)
    this.hoursShadow = React.createRef()
    this.minutesShadow = React.createRef()
    this.state = {
      ...this.millisecondsToDuration(props.value),
      focussed: false
    }
  }

  millisecondsToDuration = milliSeconds => {
    if (!milliSeconds && milliSeconds !== 0) {
      return {hours: null, minutes: null}
    }

    let minutes = parseInt((milliSeconds / (1000 * 60)) % 60)
    const hours = parseInt(milliSeconds / (1000 * 60 * 60))

    // only biggest unit should be negative if negative duration
    if (hours < 0) {
      minutes = Math.abs(minutes)
    }

    return {hours, minutes}
  }

  componentDidMount = () => {
    this.setFieldWidths()
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (this.props.value !== prevProps.value) {
      this.setState({
        ...this.millisecondsToDuration(this.props.value)
      })
    }
    if (this.state.hours !== prevState.hours || this.state.minutes !== prevState.minutes) {
      this.setFieldWidths()
    }
  }

  setFieldWidths = () => {
    this.setState({
      hoursWidth: this.hoursShadow.current.offsetWidth + this.WIDTH_PADDING,
      minutesWidth: this.minutesShadow.current.offsetWidth + this.WIDTH_PADDING
    })
  }

  handleHourChange = e => {
    const hours = e.target.value.replace(/[^-\d]/g, '')
    this.handleChange(hours, null)
  }

  handleMinutesChange = e => {
    const minutes = e.target.value.replace(/[^-\d]/g, '')
    this.handleChange(null, minutes)
  }

  handleChange = (hours, minutes) => {
    const minutesValue = minutes !== null ? minutes : this.state.minutes
    let hoursValue = hours !== null ? hours : this.state.hours

    if (minutesValue === '' && hoursValue === '') {
      this.props.onChange(null)
      return
    }
    
    if (minutesValue >= 60) {
      // if at least 1 hour entered in minutes, we use only the minutes and calculate hours and
      // minutes from that value and reset the hours that were set before
      hoursValue = 0
    }
    
    this.props.onChange(calculateMilliseconds(hoursValue, minutesValue))
  }

  handleOnFocus = () => this.setState({focussed: true})

  handleOnBlur = () => this.setState({focussed: false})

  preventNonNumeric = event => {
    if (event.charCode >= 48 && event.charCode <= 57) { // numbers
      return
    }
    if (event.charCode === 45 && this.props.options?.allowNegative === true) { // minus sign "-"
      return
    }
    event.preventDefault() // else prevent inputting character
  }

  // eslint-disable-next-line no-useless-escape
  getPattern = () => this.props.options?.allowNegative === true ? '-?\d+' : '\d+'

  unitsVisible = () => this.state.focussed || typeof this.props.value === 'number'

  render() {
    return (
      <StyledEditableWrapper
        onBlur={this.handleOnBlur}
        immutable={this.props.immutable}
        style={{overflowX: 'auto'}}>
        <StyledDurationEditFocusable immutable={this.props.immutable}>
          <StyledDurationEdit
            disabled={this.props.immutable}
            immutable={this.props.immutable}
            min={this.props.options?.allowNegative === true ? undefined : 0}
            onChange={() => {}} // Empty onChange function to prevent React internal error
            onFocus={this.handleOnFocus}
            onBlur={this.handleOnBlur}
            onInput={this.handleHourChange}
            onKeyPress={this.preventNonNumeric}
            pattern={this.getPattern()}
            step={1}
            style={{width: this.state.hoursWidth + 'px'}}
            type="number"
            value={this.state.hours !== null && this.state.hours !== 0 ? this.state.hours : ''}
          />
          {this.unitsVisible() && <Typography.Span>{this.props.options.hoursLabel}</Typography.Span>}
        </StyledDurationEditFocusable>
        <StyledDurationEditFocusable immutable={this.props.immutable}>
          <StyledDurationEdit
            disabled={this.props.immutable}
            immutable={this.props.immutable}
            min={this.props.options?.allowNegative === true && (this.state.hours === null || this.state.hours === 0)
              ? undefined
              : 0}
            onChange={() => {}} // Empty onChange function to prevent React internal error
            onFocus={this.handleOnFocus}
            onBlur={this.handleOnBlur}
            onInput={this.handleMinutesChange}
            onKeyPress={this.preventNonNumeric}
            pattern={this.getPattern()}
            step={1}
            style={{width: this.state.minutesWidth + 'px'}}
            type="number"
            value={this.state.minutes !== null ? this.state.minutes : ''}
          />
          {this.unitsVisible() && <Typography.Span>{this.props.options.minutesLabel}</Typography.Span>}
        </StyledDurationEditFocusable>
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
  immutable: PropTypes.bool,
  options: PropTypes.shape({
    hoursLabel: PropTypes.string,
    minutesLabel: PropTypes.string,
    allowNegative: PropTypes.bool
  })
}

export default DurationEdit
