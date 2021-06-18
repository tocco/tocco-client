import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'

import {notificationTransform} from './api'
import rest from '../rest'

describe('app-extensions', () => {
  describe('notification', () => {
    describe('api', () => {
      describe('notificationTransform', () => {
        test('simple', async() => {
          const key = '393'
          const timestamp = '2021-05-05T12:10:02.221Z'
          const originId = 'client__69376f9c-dcc3-4251-bda2-f85702d66fcf'
          const message = 'Die Aktion wurde erfolgreich ausgeführt'
          const type = 'success'
          const username = 'swuersten@tocco.ch'
          const read = true

          const notification = {
            key,
            timestamp,
            originId,
            message,
            result: '{"type":"ENTITIES","content":[{"key":"13229","model":"User","display":"display"}]}',
            type,
            username,
            read,
            taskProgress: null
          }

          const result = {
            type: 'ENTITIES',
            content: [{key: '13229', model: 'User', display: 'display'}]
          }

          const {returnValue} = await expectSaga(notificationTransform, notification)
            .run()

          expect(returnValue.key).to.be.eql(key)
          expect(returnValue.timestamp).to.be.eql(timestamp)
          expect(returnValue.originId).to.be.eql(originId)
          expect(returnValue.message).to.be.eql(message)
          expect(returnValue.type).to.be.eql(type)
          expect(returnValue.username).to.be.eql(username)
          expect(returnValue.read).to.be.eql(read)
          expect(returnValue.taskProgress).to.be.null
          expect(returnValue.result).to.be.eql(result)
        })

        test('without type, use fallback type info', async() => {
          const notification = {}
          const {returnValue} = await expectSaga(notificationTransform, notification)
            .run()

          expect(returnValue.type).to.be.eql('info')
        })

        test('without result', async() => {
          const notification = {}
          const {returnValue} = await expectSaga(notificationTransform, notification)
            .run()

          expect(returnValue.result).to.be.null
        })

        test('with task progress', async() => {
          const key = '350'
          const taskId = '7435237b-b946-41b5-86c5-d79ba11d3dad'
          const message = 'Ausgeführt'
          const status = 'completed'
          const total = 1
          const done = 1
          const isRunning = false
          const percentage = 100

          const notification = {
            taskProgress: {key, taskId, message, status, total, done}
          }
          const expected = {key, taskId, message, status, total, done, percentage, isRunning}

          const {returnValue} = await expectSaga(notificationTransform, notification)
            .run()

          expect(returnValue.taskProgress).to.be.eql(expected)
        })

        test('with outputjob as result', async() => {
          const notification = {
            result: '{"type":"OUTPUTJOB","content":[{"key":"13229","model":"Output_job","display":"display"}]}'
          }
          const entity = {
            paths: {
              document: {
                type: 'document',
                writable: null,
                value: {
                  mimeType: 'application/pdf',
                  fileExtension: 'pdf',
                  sizeInBytes: 21786,
                  fileName: 'document',
                  binaryLink: 'https://master.tocco.ch/0fecab7/13321/document?version=1',
                  thumbnailLink: 'https://master.tocco.ch/615e876/96/96/24850/document?version=1'
                }
              }
            }
          }

          const file = {
            name: 'document',
            link: 'https://master.tocco.ch/0fecab7/13321/document?version=1',
            description: 'display'
          }

          const {returnValue} = await expectSaga(notificationTransform, notification)
            .provide([
              [matchers.call.fn(rest.fetchEntity), entity]
            ])
            .run()

          expect(returnValue.result.file).to.be.eql(file)
        })
      })
    })
  })
})
