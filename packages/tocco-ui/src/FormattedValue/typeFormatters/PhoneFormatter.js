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
    const parsed = libPhoneImport ? libPhoneImport.parseNumber(this.props.value) : this.props.value
    const formattedNumber = libPhoneImport ? libPhoneImport.formatNumber(parsed, 'International') : parsed
    return (<span>{_isEmpty(parsed) ? parsed : formattedNumber}</span>)
  }
}

PhoneFormatter.propTypes = {
  value: PropTypes.string
}

export default PhoneFormatter
