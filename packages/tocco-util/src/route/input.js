import consoleLogger from '../consoleLogger'

export const dispatchInput = (store,
  input,
  {key, actionCreator, mandatory = false, defaultValue},
  logger = consoleLogger.logError) => {
  if (input.hasOwnProperty(key) || defaultValue) {
    const action = actionCreator(input[key] || defaultValue)
    store.dispatch(action)
  } else if (mandatory === true) {
    logger(`EntityBrowser: Mandatory field '${key}' not set in input`)
  }
}
