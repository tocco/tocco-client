export const LOAD_PROVIDERS = 'root/LOAD_PROVIDERS'
export const SET_PROVIDERS = 'root/SET_PROVIDERS'
export const LOGIN_COMPLETED = 'root/LOGIN_COMPLETED'

export const loadProviders = () => ({
  type: LOAD_PROVIDERS
})

export const setProviders = providers => ({
  type: SET_PROVIDERS,
  payload: {
    providers
  }
})

export const loginCompleted = result => ({
  type: LOGIN_COMPLETED,
  payload: {
    result
  }
})
