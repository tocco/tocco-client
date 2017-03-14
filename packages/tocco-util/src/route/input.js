import consoleLogger from '../consoleLogger'

export const dispatchInput = (store, input, key, actionCreator, mandatory = false, logger = consoleLogger.logError) => {
  if (input.hasOwnProperty(key)) {
    const action = actionCreator(input[key])
    store.dispatch(action)
  } else if (mandatory === true) {
    logger(`EntityBrowser: Mandatory field '${key}' not set in input`)
  }
}
