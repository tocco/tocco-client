import PropTypes from 'prop-types'
import React from 'react'
import _isEmpty from 'lodash/isEmpty'

import Typography from '../../Typography'

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

  getFormattedInput = () => {
    const {libPhoneImport} = this.state
    const {value} = this.props
    if (libPhoneImport) {
      const parsed = libPhoneImport.parseNumber(value)
      return _isEmpty(parsed) ? value : libPhoneImport.formatNumber(parsed, 'International')
    } else {
      return value
    }
  }

  render() {
    return <Typography.Span>{this.getFormattedInput()}</Typography.Span>
  }
}

PhoneFormatter.propTypes = {
  value: PropTypes.string
}

export default PhoneFormatter
