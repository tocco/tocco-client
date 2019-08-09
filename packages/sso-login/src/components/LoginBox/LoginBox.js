import React from 'react'
import PropTypes from 'prop-types'

import {openLoginWindow} from '../../utils/loginWindow'
import ProviderButton from '../ProviderButton/ProviderButton'

class LoginBox extends React.Component {
  constructor(props) {
    super(props)
    props.loadProviders()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.autoLogin && prevProps.providers.length === 0 && this.props.providers.length > 0) {
      const autoLoginProvider = this.props.providers.find(entity => entity.unique_id === this.props.autoLogin)
      if (autoLoginProvider) {
        openLoginWindow(this.props.loginEndpoint, this.props.loginCompleted, autoLoginProvider)
      }
    }
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
  providers: PropTypes.array,
  autoLogin: PropTypes.string
}

export default LoginBox
