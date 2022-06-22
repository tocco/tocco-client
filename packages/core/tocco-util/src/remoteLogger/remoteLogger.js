import consoleLogger from '../consoleLogger'
import request from '../request'

const logLevel = {
  error: 'error'
}

const logException = async error => {
  const logMessage = `ERROR MESSAGE: ${error.message} \nSTACK: ${error.stack ? error.stack.substring(0, 1000) : '-'}`

  consoleLogger.logError(logMessage)
  await logRemote(logLevel.error, logMessage)
}

const logError = async message => {
  consoleLogger.logError(message)
  await logRemote(logLevel.error, message)
}

const logRemote = async (logLevel, message) => {
  try {
    await request.executeRequest(`log?level=${logLevel}&message=${encodeURI(message)}`, {method: 'POST'})
  } catch (err) {
    // fail silently
  }
}

export {logError, logException}
