import React from 'react'
import PropTypes from 'prop-types'

import Button from '../../Button'
import StyledFormControl from './StyledFormControl'
import {stringToDuration, numbersToTimeFormat} from '../utils'

const TimeEdit = props => {
  const hours = props.value ? props.value.hourOfDay : null
  const minutes = props.value ? props.value.minuteOfHour : null

  const timeString = numbersToTimeFormat(hours, minutes)

  const handleChange = e => {
    props.onChange(stringToDuration(e.target.value))
  }

  const clearInput = () => {
    props.onChange(null)
  }

  const isFirefox = !!window.sidebar

  const showClearButton = props.value && !props.readOnly && !isFirefox

  return (
    <StyledFormControl readOnly={props.readOnly}>
      <input
        type="time"
        value={timeString}
        onChange={handleChange}
        name={props.name}
        id={props.id}
        readOnly={props.readOnly}
      />
      {
        showClearButton && <Button
          icon="times"
          look="ball"
          onClick={clearInput}
          tabIndex={-1}
        />
      }
    </StyledFormControl>
  )
}

TimeEdit.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.shape({
    hourOfDay: PropTypes.number,
    minuteOfHour: PropTypes.number,
    secondOfMinute: PropTypes.number,
    millisOfSecond: PropTypes.number
  }),
  name: PropTypes.string,
  id: PropTypes.string,
  readOnly: PropTypes.bool
}

export default TimeEdit
