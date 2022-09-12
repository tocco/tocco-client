import PropTypes from 'prop-types'
import {useEffect} from 'react'
import {react} from 'tocco-util'

import {openLoginWindow} from '../../utils/loginWindow'
import ProviderButton from '../ProviderButton/ProviderButton'
import {StyledButtonContainer} from './StyledComponents'

const LoginBox = ({loadProviders, autoLogin, providers = [], loginEndpoint, loginCompleted}) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => loadProviders(), []) // only invoke the loadprovider func once at the beginning
  const prevProps = react.usePrevious(providers)

  useEffect(() => {
    if (autoLogin && (!prevProps || prevProps.length === 0) && providers.length > 0) {
      const autoLoginProvider = providers.find(entity => entity.unique_id === autoLogin)

      if (autoLoginProvider) {
        openLoginWindow(loginEndpoint, loginCompleted, autoLoginProvider)
      }
    }
  }, [prevProps, providers, autoLogin, loginEndpoint, loginCompleted])

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
