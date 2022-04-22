import PropTypes from 'prop-types'
import {useRef, useState, useEffect} from 'react'
import {date} from 'tocco-util'

import Typography from '../../Typography'
import {StyledEditableWrapper} from '../StyledEditableValue'
import {calculateMilliseconds} from '../utils'
import {StyledDurationEditShadow, StyledDurationEditFocusable, StyledDurationEdit} from './StyledDurationEdit'

const DurationEdit = ({value, immutable, onChange, options}) => {
  const hoursShadow = useRef(null)
  const minutesShadow = useRef(null)
  const secondsShadow = useRef(null)

  const duration = date.millisecondsToDuration(value)

  const [hoursWidth, setHoursWidth] = useState(0)
  const [minutesWidth, setMinutesWidth] = useState(0)
  const secondsWidth = secondsShadow.current?.offsetWidth || 0

  const [focused, setFocused] = useState(false)

  useEffect(() => {
    setHoursWidth(hoursShadow.current.offsetWidth)
    setMinutesWidth(minutesShadow.current.offsetWidth)
  }, [])

  const handleHourChange = e => {
    const hours = e.target.value.replace(/[^-\d]/g, '')
    handleChange(hours, null)
  }

  const handleMinutesChange = e => {
    const minutes = e.target.value.replace(/[^-\d]/g, '')
    handleChange(null, minutes)
  }

  const handleChange = (hoursInput, minutesInput) => {
    const minutesValue = minutesInput !== null ? minutesInput : duration.minutes
    let hoursValue = hoursInput !== null ? hoursInput : duration.hours

    if (minutesValue === '' && hoursValue === '') {
      onChange(null)
      return
    }

    if (minutesValue >= 60) {
      // if at least 1 hour entered in minutes, we use only the minutes and calculate hours and
      // minutes from that value and reset the hours that were set before
      hoursValue = 0
    }

    onChange(calculateMilliseconds(hoursValue, minutesValue))
  }

  const handleOnBlur = () => {
    setFocused(false)
  }

  const handleOnFocus = () => {
    setFocused(true)
  }

  const preventNonNumeric = event => {
    if (event.charCode >= 48 && event.charCode <= 57) {
      // numbers
      return
    }
    if (event.charCode === 45 && options.allowNegative === true) {
      // minus sign "-"
      return
    }
    event.preventDefault() // else prevent inputting character
  }

  // eslint-disable-next-line no-useless-escape
  const getPattern = () => (options.allowNegative === true ? '-?d+' : 'd+')

  const unitsVisible = () => focused || typeof value === 'number'

  /**
   * We don't want to offer the user to enter the duration in seconds,
   * because hours/minutes are already accurate enough.
   * However, duration values that are automatically measured can have seconds/milliseconds values.
   * Therefore, we show seconds/milliseconds only for immutable fields if such values are present.
   * (e.g. System_activity)
   */
  const showSeconds = immutable && Boolean(duration.seconds)

  return (
    <StyledEditableWrapper onBlur={handleOnBlur} immutable={immutable}>
      <StyledDurationEditFocusable immutable={immutable}>
        <StyledDurationEdit
          disabled={immutable}
          immutable={immutable}
          min={options.allowNegative === true ? undefined : 0}
          onChange={() => {}} // Empty onChange function to prevent React internal error
          onFocus={handleOnFocus}
          onInput={handleHourChange}
          onKeyPress={preventNonNumeric}
          pattern={getPattern()}
          step={1}
          width={hoursWidth}
          type="number"
          value={typeof duration.hours === 'number' && (duration.hours !== 0 || immutable) ? duration.hours : ''}
        />
        {unitsVisible() && <Typography.Span>{options.hoursLabel}</Typography.Span>}
      </StyledDurationEditFocusable>
      <StyledDurationEditFocusable immutable={immutable}>
        <StyledDurationEdit
          disabled={immutable}
          immutable={immutable}
          min={options.allowNegative === true && (duration.hours === null || duration.hours === 0) ? undefined : 0}
          onChange={() => {}} // Empty onChange function to prevent React internal error
          onFocus={handleOnFocus}
          onInput={handleMinutesChange}
          onKeyPress={preventNonNumeric}
          pattern={getPattern()}
          step={1}
          width={minutesWidth}
          type="number"
          value={duration.minutes}
        />
        {unitsVisible() && <Typography.Span>{options.minutesLabel}</Typography.Span>}
      </StyledDurationEditFocusable>
      {showSeconds && (
        <StyledDurationEditFocusable immutable={immutable}>
          <StyledDurationEdit
            disabled={immutable}
            immutable={immutable}
            onChange={() => {}} // Empty onChange function to prevent React internal error
            width={secondsWidth}
            type="number"
            value={duration.seconds}
          />
          {unitsVisible() && <Typography.Span>{options.secondsLabel}</Typography.Span>}
        </StyledDurationEditFocusable>
      )}
      <StyledDurationEditShadow ref={hoursShadow}>{duration.hours}</StyledDurationEditShadow>
      <StyledDurationEditShadow ref={minutesShadow}>{duration.minutes}</StyledDurationEditShadow>
      {showSeconds && <StyledDurationEditShadow ref={secondsShadow}>{duration.seconds}</StyledDurationEditShadow>}
    </StyledEditableWrapper>
  )
}

DurationEdit.defaultProps = {
  options: {
    hoursLabel: 'hrs',
    minutesLabel: 'min',
    secondsLabel: 's'
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
    secondsLabel: PropTypes.string,
    allowNegative: PropTypes.bool
  })
}

export default DurationEdit
