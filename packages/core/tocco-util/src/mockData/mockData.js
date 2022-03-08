import {Server} from 'mock-socket'

import env from '../env'
import {setupActions} from './actions'
import {setupEntities} from './entities'
import {setupForms} from './forms'
import {setupLocation} from './location'
import {setupLog} from './log'
import {setupPreferences} from './preferences'
import {setupPrincipals} from './principals'
import {setupReports} from './reports'
import {setupSession} from './session'
import {setupSettings} from './settings'
import {setupTextResources} from './textResource'
import {setupUpload} from './upload'

let webSocketServer = null

const createMockSocketServer = () => {
  try {
    const socketUrl = env.getBackendUrl().replace('http://', 'ws://').replace('https://', 'wss://')
    const notificationWebSocketUrl = `${socketUrl}/nice2/websocket/notification`
    webSocketServer = new Server(notificationWebSocketUrl)
  } catch (e) {}
}

export const setupFetchMock = (fetchMock, entityStore, timeout = 1000) => {
  createMockSocketServer()

  setupForms(fetchMock, entityStore, timeout)
  setupEntities(fetchMock, entityStore, timeout)
  setupActions(fetchMock, entityStore, webSocketServer, timeout)
  setupPreferences(fetchMock, entityStore, timeout)
  setupReports(fetchMock, entityStore, webSocketServer, timeout)
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
