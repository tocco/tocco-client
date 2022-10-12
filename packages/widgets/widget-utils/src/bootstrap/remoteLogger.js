import {consoleLogger} from 'tocco-util'

import {executeRequest} from './requests'

const LogLevels = {
  error: 'error'
}

const logException = async (backendUrl, message, error) => {
  const errorMessage = `ERROR MESSAGE: ${error.message} \nSTACK: ${error.stack ? error.stack.substring(0, 1000) : '-'}`
  const logMessage = `${message}\n${errorMessage}`

  consoleLogger.logError(logMessage)
  await logRemote(LogLevels.error, backendUrl, logMessage)
}

const logError = async (backendUrl, message) => {
  consoleLogger.logError(message)
  await logRemote(LogLevels.error, backendUrl, message)
}

const logRemote = async (logLevel, backendUrl, message) => {
  try {
    await executeRequest(`${backendUrl}/nice2/log?level=${logLevel}&message=${encodeURI(message)}`, {method: 'POST'})
  } catch (err) {
    // fail silently
  }
}

export {logError, logException}
