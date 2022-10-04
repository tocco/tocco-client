import '!style-loader!css-loader!react-datepicker/dist/react-datepicker.css'
import PropTypes from 'prop-types'
import {useRef} from 'react'
import ReactDatePicker from 'react-datepicker'
import {injectIntl} from 'react-intl'
import {withTheme} from 'styled-components'

import Ball from '../../Ball'
import Button from '../../Button'
import {loadLocales} from '../../DatePicker/utils'
import {StyledDatePickerWrapper, StyledDatePickerOuterWrapper, StyledTimeInput} from './StyledDatePicker'
import useDatePicker from './useDatePicker'
import useTimeEdit from './useTimeEdit'

loadLocales()

const CustomTodayButton = ({onChange, label}) => {
  const handleOnMouseDown = e => {
    // this keeps the focus from changing, allowing handleConfirmKey on datepicker to keep working
    e.preventDefault()
    // this is a workaround for the previous date still being selected, see https://github.com/Hacker0x01/react-datepicker/issues/2206
    onChange(null)
  }

  return (
    <Button onMouseDown={handleOnMouseDown} tabIndex={-1}>
      {label}
    </Button>
  )
}

CustomTodayButton.propTypes = {
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
}

const TimeInput = ({value, onChange, onKeyDown, ...timeInputProps}) => {
  const handleOnChange = val => {
    if (onChange) {
      onChange(val || '00:00')
    }
  }
  const {inputProps} = useTimeEdit(value, handleOnChange)

  const handleOnClick = e => {
    /**
     * Workaround
     * When a day is selected it's not possible to set focus with mouse by clicking inside time input.
     */
    e.target.focus()
  }

  return (
    <StyledTimeInput {...inputProps} {...timeInputProps} type="text" onKeyDown={onKeyDown} onClick={handleOnClick} />
  )
}

TimeInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func
}

const popperProps = {strategy: 'fixed'}

const DatePicker = ({immutable, id, value, minDate, maxDate, onChange, intl, placeholder, hasTime, dateFormat}) => {
  const locale = intl.locale
  const msg = msgId => intl.formatMessage({id: msgId})

  const wrapper = useRef(null)

  const hasValue = Boolean(value)
  const showClearButton = !immutable && hasValue

  const {reactDatePickerProps, timeInputProps, clearButtonProps, calendarButtonProps} = useDatePicker(value, onChange, {
    minDate,
    maxDate,
    hasTime
  })

  return (
    <StyledDatePickerOuterWrapper immutable={immutable} id={id} tabIndex="-1">
      <StyledDatePickerWrapper immutable={immutable} ref={wrapper} hasTime={hasTime}>
        <ReactDatePicker
          {...reactDatePickerProps}
          disabled={immutable}
          dateFormat={dateFormat}
          placeholderText={placeholder}
          showMonthDropdown
          showYearDropdown
          scrollableYearDropdown={false}
          fixedHeight
          showPopperArrow={false}
          locale={locale}
          customTimeInput={<TimeInput {...timeInputProps} />}
          timeInputLabel=""
          popperProps={popperProps}
          todayButton={<CustomTodayButton onChange={onChange} label={msg('client.component.datePicker.todayLabel')} />}
        />
        {showClearButton && (
          <Ball
            icon="times"
            tabIndex={-1}
            aria-label={msg('client.component.datePicker.clearDateLabel')}
            {...clearButtonProps}
          />
        )}
        {!immutable && <Ball icon="calendar" tabIndex={-1} {...calendarButtonProps} />}
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
  dateFormat: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
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
