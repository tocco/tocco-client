import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {all, select, takeLatest} from 'redux-saga/effects'
import {rest} from 'tocco-app-extensions'

import * as actions from './actions'
import rootSaga, * as sagas from './sagas'

const selection = {
  entityName: 'User',
  type: 'ID',
  ids: [1, 2]
}

const expectedSelection = {
  model: 'User',
  keys: [1, 2]
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

        describe('getSelection', () => {
          test('should call getSelection', () => {
            return expectSaga(sagas.getSelection, selection)
              .returns(expectedSelection)
              .run()
          })
        })

        describe('loadSourceData', () => {
          test('should call loadSourceData', () => {
            return expectSaga(sagas.loadSourceData, selection)
              .provide([
                [matchers.call.fn(rest.requestSaga), {body: sourceData}]
              ])
              .call(rest.requestSaga, 'merge/sourceData', {method: 'POST', body: expectedSelection})
              .put(actions.setSourceData(sourceData))
              .put(actions.setTargetEntity(sourceData.entities[0].key))
              .run()
          })
        })

        describe('executeMerge', () => {
          test('should call executeMerge', () => {
            const body = {
              selection: expectedSelection,
              targetEntity: {
                key: '1',
                paths: {}
              },
              mergeRelations: []
            }
            const response = {
              notCopiedRelations: [
                {
                  pk: '1',
                  entity: 'User',
                  name: 'Display 1'
                },
                {
                  pk: '2',
                  entity: 'User',
                  name: 'Display 2'
                }
              ],
              notDeletedEntities: [],
              showPermissionMessage: false
            }

            return expectSaga(sagas.executeMerge)
              .provide([
                [matchers.call.fn(sagas.getMergeBody), body],
                [matchers.call.fn(rest.requestSaga), {body: response}]
              ])
              .call(rest.requestSaga, 'merge/merge', {method: 'POST', body: body})
              .put(actions.setMergeResponse(response))
              .run()
          })
        })

        describe('getMergeBody', () => {
          test('should call getMergeBody', () => {
            const merge = {
              sourceData: sourceData,
              selection: selection,
              selected: {
                targetEntity: '1',
                single: {
                  firstname: '2',
                  callname: '1',
                  birthdate: '1',
                  relGender: '1',
                  relAcademic_title: '10'
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
              selection: expectedSelection,
              targetEntity: {
                key: merge.selected.targetEntity,
                paths: {
                  firstname: '2',
                  birthdate: '1',
                  relGender: {
                    key: '1'
                  },
                  relAcademic_title: null,
                  relPrincipal: [{
                    key: '3150'
                  }, {
                    key: '5711'
                  }]
                }
              },
              mergeRelations: [{
                relationName: 'relMail',
                sourceKey: ['2']
              }]
            }

            return expectSaga(sagas.getMergeBody)
              .provide([
                [select(sagas.mergeSelector), merge]
              ])
              .returns(expectedBody)
              .run()
          })
        })
      })
    })
  })
})
