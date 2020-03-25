import PropTypes from 'prop-types'
import React from 'react'
import _isEmpty from 'lodash/isEmpty'

import Typography from '../../Typography'

class PhoneFormatter extends React.Component {
  mounted = false
  constructor(props) {
    super(props)
    this.state = {libPhoneImport: null}
  }

  componentDidMount() {
    this.mounted = true
    this.importLibPhoneNumber()
  }

  async importLibPhoneNumber() {
    const libPhoneImport = await import(/* webpackChunkName: "libphonenumber-js" */ 'libphonenumber-js')
    if (this.mounted) {
      this.setState({libPhoneImport})
    }
  }

  componentWillUnmount() {
    this.mounted = false
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
    return <Typography.Span breakWords={this.props.breakWords}>{this.getFormattedInput()}</Typography.Span>
  }
}

PhoneFormatter.propTypes = {
  value: PropTypes.string,
  breakWords: PropTypes.bool
}

export default PhoneFormatter
