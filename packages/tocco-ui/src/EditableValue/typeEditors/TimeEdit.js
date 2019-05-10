import React from 'react'
import PropTypes from 'prop-types'

import {stringToDuration, numbersToTimeFormat} from '../utils'
import Button from '../../Button'
import {
  StyledEditableControl,
  StyledEditableWrapper
} from '../StyledEditableValue'
import StyledTimeEdit from './StyledTimeEdit'

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
    <StyledEditableWrapper readOnly={props.readOnly}>
      <StyledTimeEdit
        value={timeString}
        onChange={handleChange}
        name={props.name}
        id={props.id}
        disabled={props.readOnly}
      />
      {showClearButton && <StyledEditableControl>
        <Button
          icon="times"
          look="ball"
          onClick={clearInput}
          tabIndex={-1}
        />
      </StyledEditableControl>}
    </StyledEditableWrapper>
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
