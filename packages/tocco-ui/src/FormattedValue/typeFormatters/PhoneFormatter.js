import PropTypes from 'prop-types'
import React from 'react'
import _isEmpty from 'lodash/isEmpty'

class PhoneFormatter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {libPhoneImport: null}
    this.importLibPhoneNumber()
  }

  async importLibPhoneNumber() {
    const libPhoneImport = await import(/* webpackChunkName: "libphonenumber-js" */ 'libphonenumber-js')
    this.setState({libPhoneImport})
  }

  render() {
    const libPhoneImport = this.state.libPhoneImport
    const parsed = libPhoneImport ? libPhoneImport.parseNumber(this.props.value, {extended: true}) : this.props.value
    const validityParsed = parsed.valid ? parsed : this.props.value
    const notEmptyValue = _isEmpty(validityParsed) ? this.props.value : validityParsed
    const formattedNumber = libPhoneImport ? libPhoneImport.formatNumber(notEmptyValue, 'International') : notEmptyValue
    return (<span>{formattedNumber}</span>)
  }
}

PhoneFormatter.propTypes = {
  value: PropTypes.string
}

export default PhoneFormatter
