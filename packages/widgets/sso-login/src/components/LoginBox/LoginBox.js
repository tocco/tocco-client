import PropTypes from 'prop-types'
import {useEffect} from 'react'

import ProviderButton from '../ProviderButton/ProviderButton'
import {StyledButtonContainer} from './StyledComponents'
import useAutoLogin from './useAutoLogin'

const LoginBox = ({loadProviders, autoLogin, providers = [], loginEndpoint, loginCompleted}) => {
  useEffect(() => {
    loadProviders()
  }, [loadProviders])

  useAutoLogin({autoLogin, providers, loginEndpoint, loginCompleted})

  const ProviderButtons = providers.map((provider, idx) => (
    <ProviderButton key={idx} provider={provider} loginEndpoint={loginEndpoint} loginCompleted={loginCompleted} />
  ))

  return <StyledButtonContainer>{ProviderButtons}</StyledButtonContainer>
}

LoginBox.propTypes = {
  loginEndpoint: PropTypes.string,
  loginCompleted: PropTypes.func.isRequired,
  loadProviders: PropTypes.func.isRequired,
  providers: PropTypes.array,
  autoLogin: PropTypes.string
}

export default LoginBox
