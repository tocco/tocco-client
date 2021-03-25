import {expectSaga, testSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {select, call, takeEvery} from 'redux-saga/effects'
import {rest, notification} from 'tocco-app-extensions'
import {v4 as uuid} from 'uuid'

import * as sagas from './sagas'
import * as actions from './actions'

describe('admin', () => {
  describe('routes', () => {
    describe('docs', () => {
      describe('modules', () => {
        describe('create', () => {
          describe('sagas', () => {
            describe('main saga', () => {
              test('should fork sagas', () => {
                const saga = testSaga(sagas.default)
                saga.next().all([
                  takeEvery(actions.FILES_SELECTED, sagas.handleFilesSelected)
                ])
              })
            })

            describe('handleFilesSelected', () => {
              test('should handle selected files', () => {
                const files = [{}, {}]
                const location = '/docs/folders/23523/list'
                const response = {
                  body: {
                    items: [{
                      status: 201,
                      bean: {
                        model: 'Resource',
                        key: '2352'
                      }
                    },
                    {
                      status: 201,
                      bean: {
                        model: 'Resource',
                        key: '2353'
                      }
                    }]
                  }
                }

                const onSuccess = jest.fn()

                return expectSaga(sagas.handleFilesSelected, actions.filesSelected(files))
                  .provide([
                    [call(uuid), 'my-random-uuid'],
                    [select(sagas.dialogSelector), {location, onSuccess}],
                    [call(sagas.createDocuments, location, files), response],
                    [select(sagas.textResourceSelector, 'client.docs-browser.uploadSuccessful'), 'upload successful']
                  ])
                  .put(notification.blockingInfo(
                    'my-random-uuid', 'client.docs-browser.uploadInProgressMultiple', null
                  ))
                  .put(notification.removeBlockingInfo('my-random-uuid'))
                  .run()
                  .then(() => {
                    expect(onSuccess.mock.calls.length).to.eql(1)
                  })
              })
            })

            describe('createDocuments', () => {
              test('should upload files', () => {
                const files = [{}, {}]

                const location = '/docs/folder/23523/list'

                const response = {
                  body: {
                    items: [{
                      status: 201,
                      bean: {
                        model: 'Resource',
                        key: '2352'
                      }
                    },
                    {
                      status: 201,
                      bean: {
                        model: 'Resource',
                        key: '2353'
                      }
                    }]
                  }
                }

                return expectSaga(sagas.createDocuments, location, files)
                  .provide([
                    [matchers.call.fn(rest.requestSaga), response]
                  ])
                  .returns(response)
                  .run()
              })
            })
          })
        })
      })
    })
  })
})
