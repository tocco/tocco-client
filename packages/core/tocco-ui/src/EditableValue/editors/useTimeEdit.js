import {format, isMatch, parse} from 'date-fns'
import {useRef, useState, useEffect} from 'react'
import {react} from 'tocco-util'

const TimeInitialFormat = 'HH:mm:ss'
const TimeFormat = 'HH:mm'
const OneHourFormat = 'H'
const HoursFormat = 'HH:'

// e.g. 1, 12, 12:, 12:3, 12:34, 1:34
const isIntermediateValid = val => /^(\d{0,2}|\d{1,2}:\d{0,2})$/.test(val)
const isValid = val => isMatch(val, TimeFormat)

const parseValueToDatetime = val => {
  if (isMatch(val, TimeInitialFormat)) {
    return parse(val, TimeInitialFormat, new Date())
  }

  if (isMatch(val, TimeFormat)) {
    return parse(val, TimeFormat, new Date())
  }

  if (isMatch(val, HoursFormat)) {
    return parse(val, HoursFormat, new Date())
  }
  if (isMatch(val, OneHourFormat)) {
    return parse(val, OneHourFormat, new Date())
  }

  return null
}
const formatDatetime = datetime => format(datetime, TimeFormat)
const formatValue = val => {
  const datetime = parseValueToDatetime(val)
  return datetime && !isNaN(datetime) ? formatDatetime(datetime) : ''
}

const toggleColon = (value, prevValue) => {
  if (!value || !prevValue) {
    return value
  }

  if (value.length === 2 && prevValue.length !== 3 && !value.includes(':')) {
    return `${value}:`
  }

  if (value.length + 1 === prevValue.length && prevValue.indexOf(':') === prevValue.length - 1) {
    return value.slice(0, -1)
  }

  return value
}

const useTimeEdit = (value, onChange) => {
  const formattedValue = formatValue(value)
  const [inputValue, setInputValue] = useState(formattedValue)
  const prevInputValue = useRef(inputValue)

  const prevValue = react.usePrevious(formattedValue)

  useEffect(() => {
    if (prevValue !== formattedValue && inputValue === prevValue) {
      setInputValue(formattedValue)
    }
  }, [formattedValue, inputValue, prevValue])

  const onChangeHandler = e => {
    if (e.target.value === inputValue) {
      return
    }

    if (!isIntermediateValid(e.target.value)) {
      return
    }

    const val = toggleColon(e.target.value, prevInputValue.current)

    const colonIndex = val.indexOf(':')
    const hoursString = val.substring(0, colonIndex)
    const minutesString = val.substring(colonIndex + 1)
    const hours = parseInt(hoursString, 10)
    const minutes = parseInt(minutesString, 10)

    const validHours = !hoursString || (!Number.isNaN(hours) && hours < 24)
    const validMinutes = !minutesString || (!Number.isNaN(minutes) && minutes < 60)

    if (!validHours || !validMinutes) {
      return false
    }

    prevInputValue.current = val
    setInputValue(val)

    if (!val || isValid(val)) {
      onChange(val)
    }
  }

  const onBlurHandler = () => {
    // reset input value to field value to get rid of intermediate input values
    if (inputValue !== formattedValue) {
      const validValue = formatValue(inputValue)
      if (validValue && isValid(validValue)) {
        prevInputValue.current = validValue
        setInputValue(validValue)
        onChange(validValue)
      } else {
        setInputValue(formattedValue)
      }
    }
  }

  const onFocusHandler = e => {
    if (inputValue && typeof e.target.select === 'function') {
      e.target.select()
    }
  }

  const clearInput = () => {
    onChange('')
    setInputValue('')
  }

  const inputProps = {
    onChange: onChangeHandler,
    onBlur: onBlurHandler,
    onFocus: onFocusHandler,
    value: inputValue || ''
  }

  const clearButtonProps = {
    onClick: clearInput
  }

  return {
    inputProps,
    clearButtonProps
  }
}

export default useTimeEdit
