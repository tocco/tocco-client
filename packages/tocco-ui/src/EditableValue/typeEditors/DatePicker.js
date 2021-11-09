import React, {useRef, useState} from 'react'
import PropTypes from 'prop-types'
import {injectIntl} from 'react-intl'
import {withTheme} from 'styled-components'

import {
  StyledDatePickerInput,
  StyledDatePickerWrapper,
  StyledDatePickerOuterWrapper,
  StyledDatePickerValue
} from './StyledDatePicker'
import Ball from '../../Ball'
import {useDatePickr} from '../../DatePicker/useDatePickr'
import {theme} from '../../utilStyles'

const focusFlatpickrInput = wrapper => {
  // flatpickr add two input in the DOM. One for the actual value (hidden) and one for the altInput
  const inputElement = wrapper.querySelector('input.flatpickr-input:not([type="hidden"])')
  if (inputElement) {
    inputElement.focus()
  }
}

const DatePicker = props => {
  const {immutable, id, options, value, onChange, parseDate, formatDate, intl} = props
  const [initialized, setInitialized] = useState(false)
  const flatpickr = useRef(null)
  const wrapper = useRef(null)
  const locale = intl.locale
  const msg = id => intl.formatMessage({id})

  const fontFamily = theme.fontFamily('regular')(props)

  const handleOnChange = val => {
    if (val) {
      onChange([val])
    }
  }

  const flatpickrOptions = {
    altInput: true,
    altInputClass: '',
    clickOpens: !immutable,
    ...(options ? options.flatpickrOptions : {})
  }
  const initializeFlatPickr = useDatePickr(wrapper,
    {value, onChange: handleOnChange, fontFamily, locale, flatpickrOptions})

  const init = () => {
    flatpickr.current = initializeFlatPickr()

    flatpickr.current.calendarContainer.classList.add('tocco-ui-theme')
    flatpickr.current.calendarContainer.addEventListener('keydown', handleConfirmKey)
    setInitialized(true)
  }

  const altInput = flatpickr.current?.altInput?.value || ''

  const handleOnBlur = () => {
    const parsed = parseDate(flatpickr.current.altInput.value)
    flatpickr.current.setDate(parsed, true)
  }

  const focusInput = () => {
    if (!initialized) {
      init()

      /**
       * Workaround:
       * To be sure that the initialized state has been updated
       * before we change the focus we delay this to the next tick.
       */
      setTimeout(() => {
        focusFlatpickrInput(wrapper.current)
      })
    } else {
      focusFlatpickrInput(wrapper.current)
    }
  }

  const handleConfirmKey = e => {
    if ((!e.target.classList.contains('flatpickr-hour') && e.key === 'Tab' && !e.shiftKey) || e.key === 'Enter') {
      handleOnBlur()
      setTimeout(() => {
        flatpickr.current.close()
      })
    }
    if (e.key === 'Enter') {
      e.preventDefault()
      e.stopPropagation()
    }
  }

  const hasValue = value && value.length > 0 && value.every(v => v)

  return <>
    <StyledDatePickerOuterWrapper
      immutable={immutable}
      id={id}
      tabIndex="-1"
      onFocus={() => {
        focusInput()
        
        if (flatpickr.current) {
          flatpickr.current.open()
        }
      }}
      onKeyDown={handleConfirmKey}
    >
      <StyledDatePickerWrapper
        data-wrap
        onBlur={handleOnBlur}
        immutable={immutable}
        ref={wrapper}
      >
        <StyledDatePickerInput
          {...immutable ? {disabled: 'disabled'} : {}}
          type="hidden"
          data-input
          immutable={immutable}
          {...(options ? {placeholder: options.placeholderText} : {})}
        />
        {!initialized && (
          <StyledDatePickerValue tabIndex={0}>
            {hasValue ? formatDate(value[0]) : ''}
          </StyledDatePickerValue>
        )}
        <StyledDatePickerInput
          disabled
          immutable={immutable}
          value={altInput}
        />
        {!immutable && hasValue && <Ball
          icon="times"
          tabIndex={-1}
          aria-label={msg('client.component.dateAbstract.clearDateLabel')}
          onMouseDown={e => {
            e.preventDefault()
            onChange(null)
          }}/>}
      </StyledDatePickerWrapper>
    </StyledDatePickerOuterWrapper>
  </>
}

DatePicker.propTypes = {
  id: PropTypes.string,
  intl: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.arrayOf(PropTypes.string),
  options: PropTypes.shape({
    placeholderText: PropTypes.string,
    flatpickrOptions: PropTypes.object
  }),
  parseDate: PropTypes.func,
  formatDate: PropTypes.func,
  immutable: PropTypes.bool,
  initialized: PropTypes.func,
  events: PropTypes.shape({
    onFocus: PropTypes.func
  })
}

export default withTheme(injectIntl(DatePicker))
