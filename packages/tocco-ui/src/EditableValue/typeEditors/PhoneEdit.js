import PropTypes from 'prop-types'
import React from 'react'
import _isEmpty from 'lodash/isEmpty'
import {AsYouType, formatNumber, parseNumber} from 'libphonenumber-js'

const DEFAULT_DEFAULT_COUNTRY = 'CH'

const removeSpaces = str => str.replace(/\s/g, '')

const amountOfSpacesBeforeCaret = (str, caretPosition) => {
  const spaces = str.substring(0, caretPosition - 1).match(/\s/g)
  return spaces ? spaces.length : 0
}

const PhoneEdit = ({value, options, onChange, id, readOnly}) => {
  let inputElement

  const defaultCountry = (options && options.defaultCountry) || DEFAULT_DEFAULT_COUNTRY

  const repositionCaret = (number, caret) => {
    if (caret && number.length !== caret) {
      const previousValueFormatted = new AsYouType(defaultCountry).input(value)
      const currentValueFormatted = new AsYouType(defaultCountry).input(number)

      const spacesPrevious = amountOfSpacesBeforeCaret(previousValueFormatted, caret)
      const spacesCurrent = amountOfSpacesBeforeCaret(currentValueFormatted, caret)

      const offset = spacesCurrent - spacesPrevious

      window.requestAnimationFrame(function() {
        this.setSelectionRange(caret + offset, caret + offset)
      }.bind(inputElement))
    }
  }

  const handleChange = e => {
    const number = e.target.value
    const parsedNumber = parseNumber(number, defaultCountry)

    if (onChange) {
      const numberDB = _isEmpty(parsedNumber) ? removeSpaces(number) : formatNumber(parsedNumber, 'E.164')
      onChange(numberDB)
    }

    const currentCaretPosition = e.target.selectionStart
    repositionCaret(number, currentCaretPosition)
  }

  const customRegex = options && options.customPhoneRegex
  const displayValue = customRegex ? value : new AsYouType(defaultCountry).input(value) || (value || '')

  return (
    <div className={value ? 'input-group' : ''}>
      <input
        ref={e => { inputElement = e }}
        type="tel"
        className="form-control"
        name={name}
        value={displayValue}
        onChange={handleChange}
        id={id}
        disabled={readOnly}
      />
      {value && <span className="input-group-addon">
        <a tabIndex="-1" href={`tel:${value}`}>
          <span className="fa fa-phone"/>
        </a>
      </span>}
    </div>
  )
}

PhoneEdit.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.node,
  name: PropTypes.string,
  id: PropTypes.string,
  readOnly: PropTypes.bool,
  options: PropTypes.shape({
    defaultCountry: PropTypes.string,
    customPhoneRegex: PropTypes.string
  })
}

export default PhoneEdit
