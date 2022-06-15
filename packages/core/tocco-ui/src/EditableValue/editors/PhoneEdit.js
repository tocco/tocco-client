import _get from 'lodash/get'
import _isEmpty from 'lodash/isEmpty'
import PropTypes from 'prop-types'
import React, {useState, useEffect} from 'react'

import Link from '../../Link'
import {StyledEditableControl, StyledEditableWrapper} from '../StyledEditableValue'
import StyledPhoneEdit from './StyledPhoneEdit'

const PhoneEdit = props => {
  const {onChange, value: valueProp, immutable, id, onLibLoaded} = props
  const FALLBACK_DEFAULT_COUNTRY = 'CH'
  const defaultCountry = _get(props, 'options.defaultCountry') || FALLBACK_DEFAULT_COUNTRY
  const [phoneLib, setPhoneLib] = useState(null)
  const inputElement = React.createRef()

  useEffect(() => {
    const loadLib = async () => {
      const libPhoneImport = await import(/* webpackChunkName: "vendor-libphonenumber-js" */ 'libphonenumber-js')
      setPhoneLib(libPhoneImport)

      if (onLibLoaded) {
        onLibLoaded()
      }
    }
    loadLib()
  }, [onLibLoaded])

  const amountOfSpacesBeforeCaret = (str, caretPosition) => {
    const spaces = str.substring(0, caretPosition - 1).match(/\s/g)
    return spaces?.length || 0
  }

  const repositionCaret = (value, previousValue, caretPosition) => {
    if (caretPosition && value.length !== caretPosition) {
      const previousFormatted = new phoneLib.AsYouType(defaultCountry).input(previousValue)
      const currentFormatted = new phoneLib.AsYouType(defaultCountry).input(value)

      const spacesPrevious = amountOfSpacesBeforeCaret(previousFormatted, caretPosition)
      const spacesCurrent = amountOfSpacesBeforeCaret(currentFormatted, caretPosition)

      const offset = spacesCurrent - spacesPrevious

      window.requestAnimationFrame(
        function () {
          const start = caretPosition + offset
          this.setSelectionRange(start, start)
        }.bind(inputElement.current)
      )
    }
  }

  const removeSpaces = str => str.replace(/\s/g, '')

  const handleChange = e => {
    const newValue = e.target.value
    const parsedNumber = phoneLib ? phoneLib.parseNumber(newValue, defaultCountry) : newValue

    const valueNormalized = _isEmpty(parsedNumber)
      ? removeSpaces(new phoneLib.AsYouType(defaultCountry).input(newValue))
      : phoneLib.formatNumber(parsedNumber, 'E.164')

    onChange(valueNormalized)

    const currentCaretPosition = e.target.selectionStart
    repositionCaret(newValue, valueProp, currentCaretPosition)
  }

  const determineDisplayValue = () => {
    if (valueProp && phoneLib?.AsYouType) {
      return new phoneLib.AsYouType(defaultCountry).input(valueProp)
    }

    return valueProp || ''
  }

  const displayValue = determineDisplayValue()

  return (
    <StyledEditableWrapper immutable={immutable}>
      <StyledPhoneEdit
        disabled={immutable || !phoneLib}
        id={id}
        name={name}
        onChange={handleChange}
        immutable={immutable || !phoneLib}
        ref={inputElement}
        value={displayValue}
      />
      {displayValue && (
        <StyledEditableControl>
          <Link href={`tel:${valueProp}`} icon="phone" tabIndex={-1} neutral />
        </StyledEditableControl>
      )}
    </StyledEditableWrapper>
  )
}

PhoneEdit.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.node,
  name: PropTypes.string,
  id: PropTypes.string,
  immutable: PropTypes.bool,
  options: PropTypes.shape({
    defaultCountry: PropTypes.string,
    customPhoneRegex: PropTypes.string
  }),
  onLibLoaded: PropTypes.func
}

export default PhoneEdit
