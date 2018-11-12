import React from 'react'
import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {rest, notifier} from 'tocco-app-extensions'

import * as advancedSearchActions from './actions'
import rootSaga, * as sagas from './sagas'

import {takeEvery, fork, all, select} from 'redux-saga/effects'

describe('app-extensions', () => {
  describe('formData', () => {
    describe('advancedSearch', () => {
      describe('sagas', () => {
        describe('root saga', () => {
          test('should handle openAdvancedSearch', () => {
            const config = {}
            const generator = rootSaga(config)

            expect(generator.next().value).to.deep.equal(
              all([
                fork(takeEvery, advancedSearchActions.OPEN_ADVANCED_SEARCH, sagas.openAdvancedSearch)
              ])
            )

            expect(generator.next().done).to.be.true
          })
        })

        describe('openAdvancedSearch', () => {
          test('should prompt a modal and spawn close saga', () => {
            const ListApp = () => <div>ListApp</div>
            const formField = {id: 'relRemote'}
            const modelField = {targetEntity: 'User', multi: true}
            const value = []
            const selectSpy = sinon.spy()

            const action = advancedSearchActions.openAdvancedSearch(ListApp, selectSpy, formField, modelField, value)
            return expectSaga(sagas.openAdvancedSearch, action)
              .provide([
                [select(sagas.textResourceSelector, 'client.common.advancedSearch'), {}],
                [matchers.spawn.fn(sagas.closeAdvancedSearch), () => {}]
              ])
              .put.actionType(notifier.modalComponent().type)
              .spawn.like(sagas.closeAdvancedSearch)
              .run()
          })
        })

        describe('closeAdvancedSearch', () => {
          const answerChannelMock = {
            take() {},
            flush() {},
            close() {}
          }

          test('should close of modal if action got dispatched in channel', () => {
            const modalId = '123'
            const fieldId = 'relRemote'
            const entity = 'user'
            const onSelect = () => ({})
            const multi = true

            return expectSaga(sagas.closeAdvancedSearch, answerChannelMock, modalId, fieldId, entity, onSelect, multi)
              .provide([
                {
                  take() {
                    return advancedSearchActions.advancedSearchClose()
                  }
                }
              ])
              .put.actionType(notifier.removeModalComponent().type)
              .run()
          })

          test('should put feedback action if action got dispatched to channel', () => {
            const onSelect = (field, ids) => ({
              type: advancedSearchActions.ADVANCED_SEARCH_UPDATE,
              payload: {
                field,
                ids
              }
            })
            const modalId = '123'
            const fieldId = 'relRemote'
            const entity = 'user'
            const multi = true

            const entities = [{display: 'User1', key: 1}]

            let i = 0
            return expectSaga(sagas.closeAdvancedSearch, answerChannelMock, modalId, fieldId, entity, onSelect, multi)
              .provide([
                {
                  take() {
                    return i++ <= 2
                      ? advancedSearchActions.advancedSearchUpdate(['1'])
                      : advancedSearchActions.advancedSearchClose()
                  }
                },
                [matchers.call.fn(rest.fetchEntities), entities]
              ])
              .put.actionType(onSelect().type)
              .put.actionType(notifier.removeModalComponent().type)
              .run()
          })
        })
      })
    })
  })
})
