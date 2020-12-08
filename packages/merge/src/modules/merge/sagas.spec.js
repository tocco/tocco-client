import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {all, select, takeLatest} from 'redux-saga/effects'
import {rest} from 'tocco-app-extensions'

import * as actions from './actions'
import rootSaga, * as sagas from './sagas'

const selection = {
  entityName: 'USER',
  type: 'ID',
  ids: [1, 2]
}

const sourceData = require('../../dev/data/sourceResponse.json')

describe('merge', () => {
  describe('modules', () => {
    describe('merge', () => {
      describe('sagas', () => {
        test('should fork child sagas', () => {
          const generator = rootSaga()
          expect(generator.next().value).to.deep.equal(all([
            takeLatest(actions.INITIALIZE, sagas.initialize),
            takeLatest(actions.EXECUTE_MERGE, sagas.executeMerge)
          ]))
          expect(generator.next().done).to.be.true
        })

        describe('initialize', () => {
          test('should call initialize', () => {
            return expectSaga(sagas.initialize)
              .provide([
                [select(sagas.mergeSelector), {selection: selection}],
                [matchers.call.fn(sagas.loadSourceData), sourceData]
              ])
              .call(sagas.loadSourceData, selection)
              .run()
          })
        })

        describe('loadSourceData', () => {
          test('should call loadSourceData', () => {
            return expectSaga(sagas.loadSourceData, selection)
              .provide([
                [matchers.call.fn(rest.requestSaga), {body: sourceData}]
              ])
              .call(rest.requestSaga, 'nice2/rest/merge/sourceData', {method: 'POST', body: {selection: selection}})
              .put(actions.setSourceData(sourceData))
              .put(actions.setTargetEntity(sourceData.entities[0].key))
              .run()
          })
        })

        describe('executeMerge', () => {
          test('should call executeMerge', () => {
            const merge = {
              sourceData: sourceData,
              selection: selection,
              selected: {
                targetEntity: '1',
                single: {
                  firstname: '2',
                  birthdate: '1',
                  relGender: '1'
                },
                multiple: {
                  relPrincipal: {
                    3150: '1',
                    5711: '1'
                  }
                },
                multipleAll: {
                  relMail: ['2']
                }
              }
            }

            const expectedBody = {
              selection: selection,
              targetEntity: {
                key: merge.selected.targetEntity,
                paths: {
                  firstname: 'Muhammet',
                  birthdate: '1942-01-17',
                  relGender: {
                    key: '1'
                  },
                  relPrincipal: [{
                    key: '3150'
                  }, {
                    key: '5711'
                  }]
                }
              },
              mergeRelations: [{
                relationName: 'relMail',
                sourceKey: '1',
                selected: false
              }, {
                relationName: 'relMail',
                sourceKey: '2',
                selected: true
              }]
            }

            const response = {
              success: true
            }

            return expectSaga(sagas.executeMerge)
              .provide([
                [select(sagas.mergeSelector), merge],
                [matchers.call.fn(rest.requestSaga), response]
              ])
              .call(rest.requestSaga, 'nice2/rest/merge/merge', {method: 'POST', body: expectedBody})
              .put(actions.setMergeResponse(response))
              .run()
          })
        })
      })
    })
  })
})
