import consoleLogger from '../consoleLogger'
import {sleep} from './mockData'

export const setupLocation = (fetchMock, entityStore, timeout) => {
  fetchMock.get(
    new RegExp('^.*?/nice2/rest/location/suggestions(\\?.*)?$'),
    (url, opts) => {
      consoleLogger.log('fetchMock: called fetch locations', url, opts)
      return sleep(timeout).then(() => require('./data/locations'))
    }
  )
}
