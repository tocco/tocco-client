import _isFunction from 'lodash/isFunction'

export const getRunEnv = () => {
  if (window.app && _isFunction(window.app.getRunEnv)) {
    return window.app.getRunEnv()
  }

  return 'PRODUCTION'
}
