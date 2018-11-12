export const LOG_ERROR = 'tocco-util/LOG_ERROR'

export const logError = (title, description, error, dateTime = Date.now()) => ({
  type: LOG_ERROR,
  payload: {
    title,
    description,
    error,
    dateTime
  }
})
