export const LOG_ERROR = 'tocco-util/LOG_ERROR'

export const logError = (title, error, dateTime = Date.now()) => ({
  type: LOG_ERROR,
  payload: {
    title,
    type: 'error',
    error,
    dateTime
  }
})
