import React from 'react'
import PropTypes from 'prop-types'

import ProviderButton from '../ProviderButton/ProviderButton'

class LoginBox extends React.Component {
  constructor(props) {
    super(props)
    props.loadProviders()
  }

  render() {
    return this.props.providers
      .map((provider, idx) => (
        <ProviderButton
          key={idx}
          provider={provider}
          loginEndpoint={this.props.loginEndpoint}
          loginCompleted={this.props.loginCompleted}
        />
      ))
  }
}

LoginBox.propTypes = {
  loginEndpoint: PropTypes.string,
  loginCompleted: PropTypes.func.isRequired,
  loadProviders: PropTypes.func.isRequired,
  providers: PropTypes.array
}

export default LoginBox
