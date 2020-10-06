import {setupForms} from './forms'
import {setupEntities} from './entities'
import {setupActions} from './actions'
import {setupPreferences} from './preferences'
import {setupReports} from './reports'
import {setupUpload} from './upload'
import {setupSession} from './session'
import {setupTextResources} from './textResource'
import {setupLocation} from './location'
import {setupLog} from './log'
import {setupSettings} from './settings'
import {setupPrincipals} from './principals'

export const setupFetchMock = (fetchMock, entityStore, timeout = 1000) => {
  setupForms(fetchMock, entityStore, timeout)
  setupEntities(fetchMock, entityStore, timeout)
  setupActions(fetchMock, entityStore, timeout)
  setupPreferences(fetchMock, entityStore, timeout)
  setupReports(fetchMock, entityStore, timeout)
  setupUpload(fetchMock, entityStore, timeout)
  setupLocation(fetchMock, entityStore, timeout)
}

export const setupSystemMock = (packageName, fetchMock, textRessourceKeys) => {
  setupSession(fetchMock)
  setupPrincipals(fetchMock)
  setupLog(fetchMock)
  setupTextResources(packageName, fetchMock, textRessourceKeys)
  setupSettings(fetchMock)
}

export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
