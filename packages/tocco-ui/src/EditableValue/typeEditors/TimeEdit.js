import React from 'react'
import PropTypes from 'prop-types'

import StyledTimeEdit from './StyledTimeEdit'
import Button from '../../Button'
import {stringToDuration, numbersToTimeFormat} from '../utils'

const TimeEdit = props => {
  const hours = props.value ? props.value.hourOfDay : null
  const minutes = props.value ? props.value.minuteOfHour : null

  const timeString = numbersToTimeFormat(hours, minutes)

  const handleChange = e => {
    if (props.onChange) {
      props.onChange(stringToDuration(e.target.value))
    }
  }

  const clearInput = () => {
    if (props.onChange) {
      props.onChange(null)
    }
  }

  return (
    <StyledTimeEdit>
      <input
        className="form-control"
        type="time"
        value={timeString}
        onChange={handleChange}
        name={props.name}
        id={props.id}
        readOnly={props.readOnly}
      />
      <Button
        icon="times"
        look="raised"
        onClick={clearInput}
        tabIndex={-1}
      />
    </StyledTimeEdit>
  )
}

TimeEdit.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.shape({
    hourOfDay: PropTypes.number,
    minuteOfHour: PropTypes.number
  }),
  name: PropTypes.string,
  id: PropTypes.string,
  readOnly: PropTypes.bool
}

export default TimeEdit
