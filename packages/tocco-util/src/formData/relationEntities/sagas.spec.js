import {expectSaga, testSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'

import * as relationEntitiesActions from './actions'
import {fetchEntities} from '../../rest'
import * as sagas from './sagas'

import {select, fork, takeEvery} from 'redux-saga/effects'
import {asEffect} from 'redux-saga/utils'

describe('tocco-util', () => {
  describe('formData', () => {
    describe('relationEntities', () => {
      describe('setRelationEntities', () => {
        describe('sagas', () => {
          describe('main saga', () => {
            it('should fork sagas', () => {
              const saga = testSaga(sagas.default)
              saga.next().all([
                fork(takeEvery, relationEntitiesActions.LOAD_RELATION_ENTITIES, sagas.loadRelationEntity)
              ])
            })
          })

          describe('loadRelationEntity saga', () => {
            it('should load relation entities, dispatch loading and entities', () => {
              const fieldData = undefined
              const fieldName = 'relUser'
              const entities = [{display: 'User1', key: 1}]

              return expectSaga(
                sagas.loadRelationEntity, relationEntitiesActions.loadRelationEntities(fieldName, 'User')
              )
                .provide([
                  [select(sagas.fieldDataSelector, fieldName), fieldData],
                  [matchers.call.fn(fetchEntities), entities]
                ])
                .put(relationEntitiesActions.setRelationEntityLoading(fieldName))
                .put(relationEntitiesActions.setRelationEntities(fieldName, entities, false))
                .run()
            })

            it('should not load entities if allready loaded', () => {
              const fieldData = {data: [{key: '1', display: 'one'}]}
              const fieldName = 'relUser'

              return expectSaga(
                sagas.loadRelationEntity, relationEntitiesActions.loadRelationEntities(fieldName, 'User')
              )
                .provide([
                  [select(sagas.fieldDataSelector, fieldName), fieldData]
                ])
                .not.put.like({action: {type: relationEntitiesActions.SET_RELATION_ENTITIES_LOADING}})
                .not.put.like({action: {type: relationEntitiesActions.SET_RELATION_ENTITIES}})
                .run()
            })

            it('should reload with forceReload option ', () => {
              const fieldData = {data: [{key: '1', display: 'one'}]}
              const fieldName = 'relUser'
              const entities = [{display: 'User1', key: 1}]
              const forceReload = true

              return expectSaga(
                sagas.loadRelationEntity, relationEntitiesActions.loadRelationEntities(fieldName, 'User', {forceReload})
              )
                .provide([
                  [select(sagas.fieldDataSelector, fieldName), fieldData],
                  [matchers.call.fn(fetchEntities), entities]
                ])
                .put(relationEntitiesActions.setRelationEntityLoading(fieldName))
                .put(relationEntitiesActions.setRelationEntities(fieldName, entities, false))
                .run()
            })

            it('should set moreEntities available', () => {
              const fieldData = undefined
              const fieldName = 'relUser'
              const entities = [{display: 'User1', key: 1}, {display: 'User2', key: 2}]
              const options = {limit: 1}

              const moreEntitiesAvailable = true
              return expectSaga(
                sagas.loadRelationEntity, relationEntitiesActions.loadRelationEntities(fieldName, 'User', options)
              )
                .provide([
                  [select(sagas.fieldDataSelector, fieldName), fieldData],
                  [matchers.call.fn(fetchEntities), entities]
                ])
                .put(relationEntitiesActions.setRelationEntityLoading(fieldName))
                .put(relationEntitiesActions.setRelationEntities(fieldName, [entities[0]], moreEntitiesAvailable))
                .run()
            })

            it('should reload use option object to build query params', () => {
              const fieldData = {}
              const fieldName = 'relUser'
              const entities = [{display: 'User1', key: 1}]
              const options = {limit: 5, searchTerm: 'Tes', orderBy: {name: 'update_timestamp', direction: 'desc'}}

              return expectSaga(
                sagas.loadRelationEntity, relationEntitiesActions.loadRelationEntities(fieldName, 'User', options)
              )
                .provide([
                  [select(sagas.fieldDataSelector, fieldName), fieldData],
                  [matchers.call.fn(fetchEntities), entities]
                ])
                .run()
                .then(result => {
                  const {effects} = result
                  const expectedFetchParams = {
                    fields: [],
                    limit: options.limit + 1,
                    orderBy: options.orderBy,
                    relations: [],
                    searchInputs: {
                      _search: options.searchTerm
                    }
                  }

                  const paramArg = asEffect.call(effects.call[1]).args[1]
                  expect(paramArg).to.eql(expectedFetchParams)
                })
            })
          })
        })
      })
    })
  })
})
