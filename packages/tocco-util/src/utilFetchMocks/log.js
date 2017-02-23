import {consoleLog} from '../consoleLogger'
export default fetchMock => {
  fetchMock.post(new RegExp('^.*?/nice2/log'), (url, opts) => {
    consoleLog('fetchMock: Logging to log-servlet...', opts)
    return {}
  })
}
