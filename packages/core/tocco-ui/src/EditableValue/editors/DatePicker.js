import '!style-loader!css-loader!react-datepicker/dist/react-datepicker.css'
import PropTypes from 'prop-types'
import {useRef, useState} from 'react'
import ReactDatePicker from 'react-datepicker'
import {injectIntl} from 'react-intl'
import {withTheme} from 'styled-components'

import Ball from '../../Ball'
import {loadLocales, parseISOValue} from '../../DatePicker/utils'
import {StyledDatePickerWrapper, StyledDatePickerOuterWrapper, StyledTimeInput} from './StyledDatePicker'

loadLocales()

const ReactDatepickerTimeInputClassName = 'react-datepicker-time__input'
const ReactDatepickerDayClassName = 'react-datepicker__day'
const ReactDatepickerInputClassName = 'react-datepicker-ignore-onclickoutside'

const TimeInput = ({value, onChange, onKeyDown}) => (
  <StyledTimeInput
    type="time"
    className={ReactDatepickerTimeInputClassName}
    required
    value={value}
    onKeyDown={onKeyDown}
    onChange={ev => {
      if (onChange) {
        onChange(ev.target.value)
      }
    }}
    onClick={e => {
      /**
       * Workaround
       * When a day is selected it's not possible to set focus with mouse by clicking inside time input.
       */
      e.target.focus()
    }}
  />
)

TimeInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func
}

const focusTimeInput = wrapper => {
  const inputElement = wrapper.querySelector(`input.${ReactDatepickerTimeInputClassName}`)
  if (inputElement) {
    inputElement.focus()
  }
}

const isDay = element => element.classList.contains(ReactDatepickerDayClassName)
const isTimeInput = element => element.classList.contains(ReactDatepickerTimeInputClassName)
const isInput = element => element.classList.contains(ReactDatepickerInputClassName)

const DatePicker = props => {
  const {immutable, id, value, minDate, maxDate, onChange, intl, placeholder, hasTime, dateFormat} = props

  const locale = intl.locale
  const msg = msgId => intl.formatMessage({id: msgId})

  const wrapper = useRef(null)
  const datePickerRef = useRef(null)
  const [open, setOpen] = useState(false)

  const hasValue = !!value
  const selectedDate = parseISOValue(value)
  const minDateVal = minDate ? parseISOValue(minDate) : undefined
  const maxDateVal = maxDate ? parseISOValue(maxDate) : undefined

  const handleOnChange = val => {
    if (val) {
      onChange(val.toISOString())
    }
  }

  const handleOpen = val => {
    setOpen(val)
    if (datePickerRef.current?.setPreSelection) {
      datePickerRef.current?.setPreSelection(selectedDate)
    }
  }

  const handleConfirmKey = e => {
    if (e.key === 'Tab' && !e.shiftKey) {
      if (isDay(e.target)) {
        if (hasTime) {
          // tab to time-input when tabbing on a day
          focusTimeInput(wrapper.current)
        } else {
          handleOpen(false)
        }
      } else if (isTimeInput(e.target)) {
        // Close Datepicker and tab to next input in time-input
        handleOpen(false)
      }
    }

    if (isInput(e.target) && e.key === 'Tab' && e.shiftKey) {
      // Close Datepicker and tab to prev input in datepicker-input
      handleOpen(false)
    }

    if (e.key === 'Enter') {
      // Close Datepicker and do not submit form
      handleOpen(false)
      e.preventDefault()
      e.stopPropagation()
    }
  }

  return (
    <StyledDatePickerOuterWrapper immutable={immutable} id={id} tabIndex="-1">
      <StyledDatePickerWrapper immutable={immutable} ref={wrapper} hasTime={hasTime}>
        <ReactDatePicker
          ref={datePickerRef}
          selected={selectedDate}
          onChange={handleOnChange}
          disabled={immutable}
          showTimeInput={hasTime}
          dateFormat={dateFormat}
          showPopperArrow={false}
          placeholderText={placeholder}
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          open={open}
          onFocus={() => {
            handleOpen(true)
          }}
          onClickOutside={() => {
            handleOpen(false)
          }}
          locale={locale}
          onKeyDown={handleConfirmKey}
          customTimeInput={<TimeInput onKeyDown={handleConfirmKey} />}
          enableTabLoop={false}
          timeInputLabel=""
          minDate={minDateVal}
          maxDate={maxDateVal}
        />

        {!immutable && hasValue && (
          <Ball
            icon="times"
            tabIndex={-1}
            aria-label={msg('client.component.dateAbstract.clearDateLabel')}
            onMouseDown={e => {
              e.preventDefault()
              onChange(null)
            }}
          />
        )}
      </StyledDatePickerWrapper>
    </StyledDatePickerOuterWrapper>
  )
}

DatePicker.propTypes = {
  id: PropTypes.string,
  intl: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  hasTime: PropTypes.bool,
  dateFormat: PropTypes.string,
  placeholder: PropTypes.string,
  immutable: PropTypes.bool,
  initialized: PropTypes.func,
  minDate: PropTypes.string,
  maxDate: PropTypes.string,
  events: PropTypes.shape({
    onFocus: PropTypes.func
  })
}

export default withTheme(injectIntl(DatePicker))
