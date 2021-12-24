import PropTypes from 'prop-types'
import React, {useRef, useState, useEffect} from 'react'
import {react} from 'tocco-util'

import Typography from '../../Typography'
import {StyledEditableWrapper} from '../StyledEditableValue'
import {calculateMilliseconds} from '../utils'
import {StyledDurationEditShadow, StyledDurationEditFocusable, StyledDurationEdit} from './StyledDurationEdit'

const DurationEdit = ({value, immutable, onChange, options}) => {
  const hoursShadow = useRef(null)
  const minutesShadow = useRef(null)
  const millisecondsToDuration = ms => {
    if (!ms) {
      return {
        hours: '',
        minutes: ''
      }
    }

    const minutes = parseInt((ms / (1000 * 60)) % 60)
    const hours = parseInt((ms / (1000 * 60 * 60)) % 24)
    return {
      hours,
      minutes
    }
  }

  const [hours, setHours] = useState(millisecondsToDuration(value).hours)
  const [minutes, setMinutes] = useState(millisecondsToDuration(value).minutes)
  const [hoursWidth, setHoursWidth] = useState(0)
  const [minutesWidth, setMinutesWidth] = useState(0)
  const [showUnits, setShowUnits] = useState(value >= 0)
  const previousHours = react.usePrevious(hours)
  const previousMinutes = react.usePrevious(minutes)

  useEffect(() => {
    setHoursWidth(hoursShadow.current.offsetWidth)
    setMinutesWidth(minutesShadow.current.offsetWidth)
  }, [])

  useEffect(() => {
    if (hours !== previousHours) {
      setHoursWidth(hoursShadow.current.offsetWidth)
    }
    if (minutes !== previousMinutes) {
      setMinutesWidth(minutesShadow.current.offsetWidth)
    }
  }, [hours, minutes])

  const handleHourChange = e => {
    const hours = e.target.value.replace(/[^-\d]/g, '')
    setHours(hours)
    handleChange(hours, null)
  }

  const getDesiredInputInMinutes = target => {
    let minutes = target.value.replace(/[^-\d]/g, '')

    if (!target.validity.valid) {
      minutes = 0
    }

    if (minutes.length > 2) {
      minutes = minutes.slice(0, 2)
    }

    if (minutes > 59) {
      minutes = 0
    }

    if (minutes < 0) {
      minutes = 59
    }

    return minutes
  }

  const handleMinutesChange = e => {
    const minutes = getDesiredInputInMinutes(e.target)
    setMinutes(minutes)
    handleChange(null, minutes)

    if (minutes.toString().length === 2 || minutes === 0) {
      e.target.select()
    }
  }

  const handleChange = (hoursInput, minutesInput) => {
    const minutesValue = minutesInput !== null ? minutesInput : minutes
    const hoursValue = hoursInput !== null ? hoursInput : hours

    if (minutesValue === '' && hoursValue === '') {
      onChange(null)
      return
    }

    onChange(calculateMilliseconds(hoursValue, minutesValue))
  }

  const handleOnBlur = () => {
    setShowUnits(hours.toString().length >= 1 || minutes.toString().length >= 1)
  }

  const handleOnFocus = () => {
    setShowUnits(true)
  }

  const preventNonNumeric = e => {
    const isNonNumericInput = !(e.charCode >= 48 && e.charCode <= 57)

    if (isNonNumericInput) {
      e.preventDefault()
    }
  }

  return (
    <StyledEditableWrapper onBlur={handleOnBlur} immutable={immutable}>
      <StyledDurationEditFocusable immutable={immutable}>
        <StyledDurationEdit
          disabled={immutable}
          immutable={immutable}
          min={0}
          onChange={() => {}} // Empty onChange function to prevent React internal error
          onFocus={handleOnFocus}
          onInput={handleHourChange}
          onKeyPress={preventNonNumeric}
          pattern="\d+"
          step={1}
          width={hoursWidth}
          type="number"
          value={hours}
        />
        {showUnits && <Typography.Span>{options.hoursLabel}</Typography.Span>}
      </StyledDurationEditFocusable>
      <StyledDurationEditFocusable immutable={immutable}>
        <StyledDurationEdit
          disabled={immutable}
          immutable={immutable}
          onChange={() => {}} // Empty onChange function to prevent React internal error
          onFocus={handleOnFocus}
          onInput={handleMinutesChange}
          onKeyPress={preventNonNumeric}
          pattern="\d+"
          step={1}
          width={minutesWidth}
          type="number"
          value={minutes}
        />
        {showUnits && <Typography.Span>{options.minutesLabel}</Typography.Span>}
      </StyledDurationEditFocusable>
      <StyledDurationEditShadow ref={hoursShadow}>{hours}</StyledDurationEditShadow>
      <StyledDurationEditShadow ref={minutesShadow}>{minutes}</StyledDurationEditShadow>
    </StyledEditableWrapper>
  )
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
    minutesLabel: PropTypes.string
  })
}

export default DurationEdit
