import PropTypes from 'prop-types'
import React from 'react'
import _isEmpty from 'lodash/isEmpty'

import ButtonLink from '../../ButtonLink'
import {
  StyledEditableControl,
  StyledEditableWrapper
} from '../StyledEditableValue'
import StyledPhoneEdit from './StyledPhoneEdit'

class PhoneEdit extends React.Component {
  DEFAULT_DEFAULT_COUNTRY = 'CH'

  constructor(props) {
    super(props)
    this.state = {libPhoneImport: null, defaultCountry: this.DEFAULT_DEFAULT_COUNTRY}
    this.importLibPhoneNumber()
    this.inputElement = React.createRef()
  }

  async importLibPhoneNumber() {
    const libPhoneImport = await import(/* webpackChunkName: "libphonenumber-js" */ 'libphonenumber-js')
    this.setState({...this.state, libPhoneImport})
  }

  amountOfSpacesBeforeCaret = (str, caretPosition) => {
    const spaces = str.substring(0, caretPosition - 1).match(/\s/g)
    return spaces ? spaces.length : 0
  }

  repositionCaret = (value, previousValue, caretPosition) => {
    if (caretPosition && value.length !== caretPosition) {
      const defaultCountryString = this.state.defaultCountry
      const previousValueFormatted = new this.state.libPhoneImport.AsYouType(defaultCountryString).input(previousValue)
      const currentValueFormatted = new this.state.libPhoneImport.AsYouType(defaultCountryString).input(value)

      const spacesPrevious = this.amountOfSpacesBeforeCaret(previousValueFormatted, caretPosition)
      const spacesCurrent = this.amountOfSpacesBeforeCaret(currentValueFormatted, caretPosition)

      const offset = spacesCurrent - spacesPrevious

      window.requestAnimationFrame(function() {
        const start = caretPosition + offset
        this.setSelectionRange(start, start)
      }.bind(this.inputElement))
    }
  }

  removeSpaces = str => str.replace(/\s/g, '')

  handleChange = e => {
    const defaultCountry = (this.props.options && this.props.options.defaultCountry) || this.state.defaultCountry
    const newValue = e.target.value
    const {libPhoneImport} = this.state
    const parsedNumber = libPhoneImport ? libPhoneImport.parseNumber(newValue, defaultCountry) : newValue

    if (this.props.onChange) {
      const valueWithoutSpaces = this.removeSpaces(newValue)
      const isEmpty = _isEmpty(parsedNumber)

      if (libPhoneImport) {
        this.valueNormalized = isEmpty ? valueWithoutSpaces : libPhoneImport.formatNumber(parsedNumber, 'E.164')
      } else {
        this.valueNormalized = valueWithoutSpaces
      }
      this.props.onChange(this.valueNormalized)
    }

    const currentCaretPosition = e.target.selectionStart
    this.repositionCaret(newValue, this.props.value, currentCaretPosition)
  }

  determineDisplayValue = () => {
    if (this.state.libPhoneImport && this.state.libPhoneImport.AsYouType) {
      return new this.state.libPhoneImport.AsYouType(this.state.defaultCountry).input(this.props.value)
    } else {
      return (this.props.value === null ? '' : this.props.value)
    }
  }

  render() {
    const displayValue = this.determineDisplayValue()

    return (
      <StyledEditableWrapper readOnly={this.props.readOnly}>
        <StyledPhoneEdit
          ref={this.inputElement}
          name={name}
          value={displayValue}
          onChange={this.handleChange}
          id={this.props.id}
          disabled={this.props.readOnly}
        />
        {displayValue && <StyledEditableControl>
          <ButtonLink
            href={`tel:${this.props.value}`}
            icon="phone"
            iconPosition="sole"
            look="ball"
            tabIndex={-1}
          />
        </StyledEditableControl>}
      </StyledEditableWrapper>
    )
  }
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
