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

const repositionCaret = (value, previousValue, caretPosition, inputElement, defaultCountry) => {
  if (caretPosition && value.length !== caretPosition) {
    const previousValueFormatted = new AsYouType(defaultCountry).input(previousValue)
    const currentValueFormatted = new AsYouType(defaultCountry).input(value)

    const spacesPrevious = amountOfSpacesBeforeCaret(previousValueFormatted, caretPosition)
    const spacesCurrent = amountOfSpacesBeforeCaret(currentValueFormatted, caretPosition)

    const offset = spacesCurrent - spacesPrevious

    window.requestAnimationFrame(function() {
      const start = caretPosition + offset
      this.setSelectionRange(start, start)
    }.bind(inputElement))
  }
}

const PhoneEdit = ({value, options, onChange, id, readOnly}) => {
  let inputElement

  const defaultCountry = (options && options.defaultCountry) || DEFAULT_DEFAULT_COUNTRY

  const handleChange = e => {
    const newValue = e.target.value
    const parsedNumber = parseNumber(newValue, defaultCountry)

    if (onChange) {
      const valueNormalized = _isEmpty(parsedNumber) ? removeSpaces(newValue) : formatNumber(parsedNumber, 'E.164')
      onChange(valueNormalized)
    }

    const currentCaretPosition = e.target.selectionStart
    repositionCaret(newValue, value, currentCaretPosition, inputElement, defaultCountry)
  }

  const displayValue = new AsYouType(defaultCountry).input(value) || value

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
