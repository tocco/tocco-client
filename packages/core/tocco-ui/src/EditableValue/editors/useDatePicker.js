import {getHours, getMinutes, getSeconds, setHours, setMinutes, setSeconds, startOfDay} from 'date-fns'
import {useEffect, useRef, useState} from 'react'
import {date as dateUtil} from 'tocco-util'

import {parseISOValue} from '../../DatePicker/utils'

const ReactDatepickerTimeInputClassName = 'react-datepicker-time__input'
const ReactDatepickerDayClassName = 'react-datepicker__day'
const ReactDatepickerInputClassName = 'react-datepicker__input'

const isDay = element => element.classList.contains(ReactDatepickerDayClassName)
const isTimeInput = element => element.classList.contains(ReactDatepickerTimeInputClassName)
const isInput = element => element.classList.contains(ReactDatepickerInputClassName)

const setTime = (date, {hour = 0, minute = 0, second = 0}) =>
  setHours(setMinutes(setSeconds(date, second), minute), hour)

const focusTimeInput = wrapper => {
  setTimeout(() => {
    if (wrapper) {
      const inputElement = wrapper.querySelector(`input.${ReactDatepickerTimeInputClassName}`)
      if (inputElement) {
        inputElement.focus({preventScroll: true})
      }
    }
  }, 0)
}

const focusDay = wrapper => {
  setTimeout(() => {
    if (wrapper) {
      // only the day of the preSelection has tabindex set to 0
      const selectedDay = wrapper.querySelector(`.${ReactDatepickerDayClassName}[tabindex="0"]`)
      if (selectedDay) {
        selectedDay.focus({preventScroll: true})
      }
    }
  }, 0)
}

const focusInput = inputElement => {
  setTimeout(() => {
    if (inputElement) {
      inputElement.focus({preventScroll: true})
    }
  }, 0)
}

const isoStringToDate = parseISOValue
const dateToIsoString = date => (date ? date.toISOString() : null)

/**
 * Keyboard Handling Requirements:
 * https://toccoag.atlassian.net/browse/TOCDEV-6134
 *
 * In order to fulfill the requirements react-datepicker internals had to be touched.
 *  - preSelection:
 *      A date which represents the currenty selected day (date) on the calendar.
 *      It can be different than the selected date when choosing another day by the arrow keys.
 *
 *   - open:
 *      The react-datepicker is tracking an internal open state
 *      although it's possible to set the open state from outside.
 *      Unfortunaltely at many places it only checks the internal state. Therefore we tried to keep those in sync.
 *
 * - getPreselection():
 *      https://github.com/Hacker0x01/react-datepicker/blob/master/src/index.jsx#L342
 *      Returns the initial preSelection state.
 */

const useDatePicker = (
  value,
  onChange,
  {minDate, maxDate, hasTime, valueToDate = isoStringToDate, dateToValue = dateToIsoString}
) => {
  const datePickerRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)

  const selectedDate = valueToDate(value)
  const minDateVal = minDate ? valueToDate(minDate) : undefined
  const maxDateVal = maxDate ? valueToDate(maxDate) : undefined

  useEffect(() => {
    /**
     * Keep internal state of DatePicker in sync.
     */
    if (datePickerRef.current && typeof datePickerRef.current.setOpen === 'function') {
      datePickerRef.current.setOpen(isOpen)
    }
  }, [isOpen])

  const toggleModal = () => setIsOpen(open => !open)
  const closeModal = () => setIsOpen(false)
  const openModal = () => setIsOpen(true)

  const getCurrentPreSelection = (fallbackToInitial = false) => {
    if (datePickerRef.current && typeof datePickerRef.current.getPreSelection === 'function') {
      const initialDate = fallbackToInitial ? datePickerRef.current.getPreSelection() : null
      return datePickerRef.current.state?.preSelection || initialDate
    }
    return null
  }

  const setFocusedDate = date => {
    /**
     * In order to focus a day on the calendar we only have to set the preSelection to the given date.
     * Vice versa to be able to remove the focus from a day an set it to another input/element
     * the preSelection has to be cleared first.
     */
    if (datePickerRef.current && typeof datePickerRef.current.setPreSelection === 'function') {
      datePickerRef.current.setPreSelection(date)
    }
  }

  const clearValue = () => {
    onChange(null)
    /**
     * Workaround:
     * When the date is cleared the preSelection has to be cleared as well.
     * Otherwise the value will be set right after it has been cleared when tabbing/entering out.
     */
    setFocusedDate(null)
  }

  const handleChangeToCurrentPreSelection = (event, onlyDate = false) => {
    const date = getCurrentPreSelection(false)
    if (date) {
      const dateWithTime = selectedDate || new Date()
      const changedDate = onlyDate
        ? setTime(date, {
            hour: getHours(dateWithTime),
            minute: getMinutes(dateWithTime),
            second: getSeconds(dateWithTime)
          })
        : date
      handleOnChange(changedDate, event)
    }
  }

  const handleOnChange = (date, event) => {
    if (date) {
      const changedInitially = !value && date

      const startOfSelectedDay = startOfDay(date)
      const hasTimeChanged =
        getHours(date) !== getHours(startOfSelectedDay) || getMinutes(date) !== getMinutes(startOfSelectedDay)

      // set time to now when time has not set explicitly yet
      if (changedInitially && hasTime && !hasTimeChanged) {
        date = dateUtil.setCurrentTime(date)
      }
      onChange(dateToValue(date))
    } else {
      clearValue()
    }

    if (!hasTime && event?.type === 'click') {
      // close Datepicker on select date by click (only without time)
      closeModal()
      focusInput(datePickerRef.current?.input)
    }
  }

  const handleConfirmKey = e => {
    if (e.key === 'Tab') {
      if (!e.shiftKey) {
        if (isInput(e.target) && isOpen) {
          // close Datepicker and tab to next input, also use preSelection as new value
          handleChangeToCurrentPreSelection(e)
          closeModal()
        } else if (isTimeInput(e.target)) {
          // close Datepicker and tab to next input in time-input
          closeModal()
        } else if (isDay(e.target)) {
          if (hasTime) {
            // tab to time-input when tabbing on a day
            handleChangeToCurrentPreSelection(e, true)
            /**
             * Workaround:
             * Clear preSelection so that it's possible to loose focus from days.
             */
            setFocusedDate(null)
            focusTimeInput(datePickerRef.current?.calendar?.componentNode)
          } else {
            // close Datepicker and tab to next input, also use preSelection as new value
            handleChangeToCurrentPreSelection(e)
            closeModal()
          }
        }
      } else {
        if (isInput(e.target)) {
          // close Datepicker and tab to prev input in datepicker-input
          closeModal()
        } else if (isTimeInput(e.target)) {
          // tab back to days
          /**
           * Workaround:
           * To focus a day the preSelection has to be set.
           * We jump back to the selected value or to the initial preSelection.
           */
          setFocusedDate(selectedDate || getCurrentPreSelection(true))
          focusDay(datePickerRef.current?.calendar?.componentNode)
        } else if (isDay(e.target)) {
          // close Datepicker to be able to tab to prev input
          closeModal()
        }
      }
    }

    if (e.key === 'Enter') {
      // close Datepicker and do not submit form
      closeModal()
      e.preventDefault()
      e.stopPropagation()
      focusInput(datePickerRef.current?.input) // keep focus on input to be able to open Datepicker with keyboard again
    }

    if (['ArrowDown', 'ArrowUp', 'Enter'].includes(e.key)) {
      if (!isOpen) {
        openModal()
        /**
         * React DatePicker expects to be open on click inside input and therefore to be open on key input.
         * We want to have it closed and open it with Arrow keys.
         * To be able to workaround the DatePickers expectations wie do not want let it handle the default behaviour
         * in this case.
         * The only option is to overwrite the key event so that it ignores the event completely.
         * https://github.com/Hacker0x01/react-datepicker/blob/master/src/index.jsx#L686
         * https://github.com/Hacker0x01/react-datepicker/issues/3458
         */
        e.key = `Handled${e.key}`
      } else if (isOpen && getCurrentPreSelection(false) === null) {
        /**
         * Workaround:
         * Since we do not want to open the Datepicker with a preSelection we need to set the preSelection
         * to be able to jump into the calendar by the keyboard.
         */
        setFocusedDate(selectedDate || getCurrentPreSelection(true))
        focusDay(datePickerRef.current?.calendar?.componentNode)
      }
    }
  }

  const handleCloseOnScroll = () => {
    closeModal()
    return true // to indicate that we want to close modal on scroll
  }

  const handleMouseDownOnClear = e => {
    e.preventDefault() // to not loose focus from the origin element
    clearValue()
  }

  const handleInputCalendarClick = () => {
    toggleModal()
    /**
     * Workaround:
     * Since we do not want to open the Datepicker with a preSelection we need to set it to null explicitly.
     * Otherwise it will be set to any date always.
     */
    setFocusedDate(null)
    focusInput(datePickerRef.current?.input) // do not remove focus from input when open modal
  }

  const handleCalendarOpen = () => {
    /**
     * Workaround:
     * Since we do not want to open the Datepicker with a preSelection we need to set it to null explicitly.
     * Otherwise it will be set to any date always.
     */
    setFocusedDate(null)
  }

  const reactDatePickerProps = {
    closeOnScroll: handleCloseOnScroll,
    onClickOutside: closeModal,
    onInputClick: handleInputCalendarClick,
    onKeyDown: handleConfirmKey,
    onChange: handleOnChange,
    onCalendarOpen: handleCalendarOpen,
    preventOpenOnFocus: true,
    enableTabLoop: false,
    /**
     * We do not want that react-datepicker it's changing it's internal state.
     * We would like to be under control the open state otherwise it can happen that
     * the user needs to click multiple times to close/open the modal because the states got out of sync.
     */
    shouldCloseOnSelect: false,
    open: isOpen,
    selected: selectedDate,
    showTimeInput: hasTime,
    minDate: minDateVal,
    maxDate: maxDateVal,
    ref: datePickerRef,
    className: ReactDatepickerInputClassName
  }

  const timeInputProps = {
    onKeyDown: handleConfirmKey,
    className: ReactDatepickerTimeInputClassName
  }

  const clearButtonProps = {
    onMouseDown: handleMouseDownOnClear
  }

  const calendarButtonProps = {
    // onMouseDown is not working here since it would interf with the closeOutside handler
    onClick: handleInputCalendarClick,
    /**
     * Prevent having multiple DatePicker open by clicking on Calendar icons.
     * Use ignore onClickOutside classname from React DatePicker https://github.com/Hacker0x01/react-datepicker/blob/master/src/index.jsx#L50
     * https://github.com/Pomax/react-onclickoutside#marking-elements-as-skip-over-this-one-during-the-event-loop
     */
    className: isOpen ? 'react-datepicker-ignore-onclickoutside' : ''
  }

  return {
    reactDatePickerProps,
    timeInputProps,
    clearButtonProps,
    calendarButtonProps
  }
}

export default useDatePicker
