import originId from '../originId'
import {getRandomInt} from './utils'

export const setupReports = (fetchMock, entityStore, webSocketServer, timeout = 2000) => {
  fetchMock.post(new RegExp('^.*?/nice2/rest/report/.*/settings*?'), require('./data/report_settings.json'))

  fetchMock.post(new RegExp('^.*?/nice2/rest/report/generation'), (url, opts) => {
    const body = JSON.parse(opts.body)
    const {reportId} = body.additionalProperties
    if (reportId === 'invalid_settings_report') {
      return {
        status: 400,
        body: {
          status: 400,
          message: 'Invalid setting message',
          errorCode: 'INVALID_SETTINGS'
        }
      }
    } else {
      const notificationKey = Math.floor(Math.random() * 100).toString()
      const generationTime = getRandomInt(2000, 6000)

      setTimeout(() => {
        webSocketServer.emit(
          'message',
          JSON.stringify({
            key: notificationKey,
            timestamp: new Date().toISOString(),
            originId: originId.getOriginId(),
            message: 'Die Aktion wird ausgeführt',
            result: '',
            type: 'info',
            username: 'dkeller@tocco.ch',
            read: false,
            taskProgress: {
              done: 0,
              key: '184',
              message: 'In Ausführung',
              status: 'running_infinite',
              taskId: '3b50d399-1e9b-4caf-a1d0-5ece470f19f2',
              total: 0
            }
          })
        )
      }, timeout)

      setTimeout(() => {
        if (reportId !== 'generate_fails_report') {
          webSocketServer.emit(
            'message',
            JSON.stringify({
              key: notificationKey,
              timestamp: new Date().toISOString(),
              originId: originId.getOriginId(),
              message: 'Report generiert',
              result:
                // eslint-disable-next-line max-len
                '{"type":"OUTPUTJOB","content":[{"key":"5178","model":"Output_job","display":"Ausbildungshistorie / 2021-08-04 15-10-19"}]}',
              type: 'success',
              username: 'dkeller@tocco.ch',
              read: false,
              taskProgress: {
                done: 0,
                key: '184',
                message: 'Ausgeführt',
                status: 'completed',
                taskId: '3b50d399-1e9b-4caf-a1d0-5ece470f19f2',
                total: 0
              }
            })
          )
        } else {
          webSocketServer.emit(
            'message',
            JSON.stringify({
              key: notificationKey,
              timestamp: new Date().toISOString(),
              originId: originId.getOriginId(),
              message: 'Report fehlgeschlagen',
              result: '',
              type: 'failed',
              username: 'dkeller@tocco.ch',
              read: false,
              taskProgress: {
                done: 0,
                key: '184',
                message: 'Fehler',
                status: 'completed',
                taskId: '3b50d399-1e9b-4caf-a1d0-5ece470f19f2',
                total: 0
              }
            })
          )
        }
      }, generationTime)

      return {
        success: true,
        message: 'Die Aktion wurde zur Ausführung eingeplant',
        params: {},
        result: null,
        notificationKey
      }
    }
  })

  fetchMock.get(new RegExp('^.*?/nice2/rest/entities/2.0/Output_job/*?'), url => {
    const id = url.match(/^.*\/Output_job\/([a-zA-Z0-9]+)/)[1]
    const outputJob = require('./data/output_job')
    return {
      body: JSON.parse(
        JSON.stringify(outputJob)
          .replace(/{id}/g, id)
          .replace(/{date}/g, new Date().toJSON())
      )
    }
  })
}
