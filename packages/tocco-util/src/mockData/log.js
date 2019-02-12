import consoleLogger from '../consoleLogger'

export const setupLog = fetchMock => {
  fetchMock.post(new RegExp('^.*?/nice2/log$'), (url, opts) => {
    consoleLogger.log('fetchMock: Logging to log-servlet...', opts)
    return {}
  })
}
