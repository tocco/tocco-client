import {setupForms} from './forms'
import {setupEntities} from './entities'
import {setupActions} from './actions'
import {setupReports} from './reports'
import {setupUpload} from './upload'
import {setupSession} from './session'
import {setupTextResources} from './textResource'
import {setupLocation} from './location'
import {setupLog} from './log'

export const setupFetchMock = (fetchMock, entityStore, timeout = 1000) => {
  setupForms(fetchMock, entityStore, timeout)
  setupEntities(fetchMock, entityStore, timeout)
  setupActions(fetchMock, entityStore, timeout)
  setupReports(fetchMock, entityStore, timeout)
  setupUpload(fetchMock, entityStore, timeout)
  setupLocation(fetchMock, entityStore, timeout)
}

export const setupSystemMock = (packageName, fetchMock, textRessourceKeys) => {
  setupSession(fetchMock)
  setupLog(fetchMock)
  setupTextResources(packageName, fetchMock, textRessourceKeys)
}

export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
