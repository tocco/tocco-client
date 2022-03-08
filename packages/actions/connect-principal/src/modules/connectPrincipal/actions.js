export const CHECK_ACCESS_RIGHTS = 'connectPrincipal/CHECK_ACCESS_RIGHTS'
export const SET_SHOW_SSO_LOGIN_APP = 'connectPrincipal/SET_SHOW_SSO_LOGIN_APP'
export const CONNECT_PRINCIPAL = 'connectPrincipal/CONNECT_PRINCIPAL'

export const checkAccessRights = () => ({
  type: CHECK_ACCESS_RIGHTS
})

export const setShowSsoLoginApp = showSsoLoginApp => ({
  type: SET_SHOW_SSO_LOGIN_APP,
  payload: {
    showSsoLoginApp
  }
})

export const connectPrincipal = (provider, ssoSubject) => ({
  type: CONNECT_PRINCIPAL,
  payload: {
    provider,
    ssoSubject
  }
})
