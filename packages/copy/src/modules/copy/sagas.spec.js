import {externalEvents, form, rest} from 'tocco-app-extensions'
import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {select, takeLatest, all} from 'redux-saga/effects'
import {selection as selectionUtil} from 'tocco-util'

import * as actions from './actions'
import rootSaga, * as sagas from './sagas'

describe('copy', () => {
  describe('modules', () => {
    describe('copy', () => {
      describe('sagas', () => {
        describe('rootSaga', () => {
          test('should fork child sagas', () => {
            const generator = rootSaga()
            expect(generator.next().value).to.deep.equal(all([
              takeLatest(actions.START_COPY, sagas.copy)
            ]))
            expect(generator.next().done).to.be.true
          })
        })

        describe('copy saga', () => {
          test('should call action cancel and navigate with default values', () => {
            const input = {
              selection: {
                type: 'ID',
                entityName: 'User',
                keys: ['1']
              },
              navigationStrategy: {
                navigateToCreateRelative: () => {
                }
              },
              context: {
                formName: 'User_Test'
              }
            }

            const entities = {
              entityName: 'User',
              keys: ['1']
            }

            const values = {
              firstname: 'Homer'
            }

            return expectSaga(sagas.copy)
              .provide([
                [select(sagas.inputSelector), input],
                [matchers.call.fn(selectionUtil.getEntities), entities],
                [matchers.call.fn(sagas.getValues), values]
              ])
              .put(externalEvents.fireExternalEvent('onCancel'))
              .call(input.navigationStrategy.navigateToCreateRelative, null, {defaultValues: values})
              .run()
          })

          test('should throw error for invalid selection', done => {
            const entities = {
              entityName: 'User',
              keys: ['1', '2']
            }

            expectSaga(sagas.copy)
              .provide([
                [select(sagas.inputSelector), {context: {}}],
                [matchers.call.fn(selectionUtil.getEntities), entities]
              ])
              .silentRun()
              .catch(error => {
                expect(error.message).to.eql('Invalid selection')
                done()
              })
          })
        })

        describe('getPaths saga', () => {
          test('should fetch form and return array of paths that are not ignored', () => {
            const formDefinition = {}
            const fieldDefinitions = [
              {
                path: 'lastname',
                ignoreCopy: true
              },
              {
                path: 'firstname',
                ignoreCopy: false
              },
              {
                path: 'relGender'
              }
            ]

            const expectedResult = ['firstname', 'relGender']

            return expectSaga(sagas.getPaths, 'User_Test')
              .provide([
                [matchers.call.fn(rest.fetchForm), formDefinition],
                [matchers.call.fn(form.getFieldDefinitions), fieldDefinitions]
              ])
              .returns(expectedResult)
              .run()
          })
        })

        describe('getValues saga', () => {
          test('should transform entity to valid default values', () => {
            const paths = ['firstname', 'lastname', 'relGender', 'relRelation']
            const sourceEntity = {
              paths: {
                firstname: {
                  value: 'Homer'
                },
                lastname: {
                  value: ''
                },
                relGender: {
                  value: {key: '2'}
                },
                relRelation: {
                  value: [{key: '2'}, {key: '3'}]
                }
              }
            }

            const expectedResult = [
              {
                id: 'firstname',
                value: 'Homer'
              },
              {
                id: 'relGender',
                value: '2'
              },
              {
                id: 'relRelation',
                value: ['2', '3']
              }
            ]

            return expectSaga(sagas.getValues, 'User', '1', 'User_Test')
              .provide([
                [matchers.call.fn(sagas.getPaths), paths],
                [matchers.call.fn(rest.fetchEntity), sourceEntity]

              ])
              .returns(expectedResult)
              .run()
          })
        })
      })
    })
  })
})
