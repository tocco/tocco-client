import {useEffect} from 'react'
import {react} from 'tocco-util'

import {openLoginWindow} from '../../utils/loginWindow'

const useAutoLogin = ({autoLogin, providers, loginEndpoint, loginCompleted}) => {
  const prevProviders = react.usePrevious(providers)

  useEffect(() => {
    if (autoLogin && (!prevProviders || prevProviders.length === 0) && providers.length > 0) {
      const autoLoginProvider = providers.find(entity => entity.unique_id === autoLogin)

      if (autoLoginProvider) {
        openLoginWindow(loginEndpoint, loginCompleted, autoLoginProvider)
      }
    }
  }, [prevProviders, providers, autoLogin, loginEndpoint, loginCompleted])
}

export default useAutoLogin
