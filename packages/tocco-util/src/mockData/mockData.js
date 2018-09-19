import {setupForms} from './forms'
import {setupEntities} from './entities'
import {setupActions} from './actions'
import {setupReports} from './reports'
import {setupUpload} from './upload'

export const setupFetchMock = (fetchMock, entityStore, timeout = 1000) => {
  setupForms(fetchMock, entityStore, timeout)
  setupEntities(fetchMock, entityStore, timeout)
  setupActions(fetchMock, entityStore, timeout)
  setupReports(fetchMock, entityStore, timeout)
  setupUpload(fetchMock, entityStore, timeout)
}

export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
