import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {takeEvery, all} from 'redux-saga/effects'
import {rest, notification} from 'tocco-app-extensions'

import * as advancedSearchActions from './actions'
import rootSaga, * as sagas from './sagas'

describe('app-extensions', () => {
  describe('formData', () => {
    describe('advancedSearch', () => {
      describe('sagas', () => {
        describe('root saga', () => {
          test('should handle open search', () => {
            const configSelector = () => ({})
            const generator = rootSaga(configSelector)

            expect(generator.next().value).to.deep.equal(
              all([
                takeEvery(advancedSearchActions.OPEN_ADVANCED_SEARCH, sagas.openAdvancedSearch, configSelector),
                takeEvery(advancedSearchActions.OPEN_DOCS_TREE_SEARCH, sagas.openDocsTreeSearch, configSelector)
              ])
            )

            expect(generator.next().done).to.be.true
          })
        })

        describe('openDocsTreeSearch', () => {
          test('should prompt a modal and spawn close saga', () => {
            const DocsApp = () => <div>DocsApp</div>
            const formField = {id: 'relRemote', dataType: 'multi-remote-field', targetEntity: 'User'}
            const value = []
            const formName = 'searchForm'

            const action = advancedSearchActions.openDocsTreeSearch(formName, formField, value)
            const configSelector = () => ({DocsApp})
            return expectSaga(sagas.openDocsTreeSearch, configSelector, action)
              .provide([
                [matchers.spawn.fn(sagas.closeAdvancedSearch), () => {}],
                [matchers.call.fn(rest.fetchForm), {form: {}}]
              ])
              .put.actionType(notification.modal().type)
              .spawn.like(sagas.closeAdvancedSearch)
              .run()
          })
        })

        describe('openAdvancedSearch', () => {
          test('should prompt a modal and spawn close saga', () => {
            const ListApp = () => <div>ListApp</div>
            const formField = {id: 'relRemote', dataType: 'multi-remote-field', targetEntity: 'User'}
            const value = []
            const searchTerm = ''
            const formName = 'searchForm'

            const action = advancedSearchActions.openAdvancedSearch(formName, formField, searchTerm, value)
            const configSelector = () => ({ListApp})
            return expectSaga(sagas.openAdvancedSearch, configSelector, action)
              .provide([
                [matchers.spawn.fn(sagas.closeAdvancedSearch), () => {}],
                [matchers.call.fn(rest.fetchForm), {form: {}}]
              ])
              .put.actionType(notification.modal().type)
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
              .put.actionType(notification.removeModal().type)
              .run()
          })

          test('should put feedback action if action got dispatched to channel', () => {
            const modalId = '123'
            const fieldId = 'relRemote'
            const formName = 'detailForm'
            const entity = 'user'
            const multi = true

            const entities = [{display: 'User1', key: 1}]

            let i = 0
            return expectSaga(sagas.closeAdvancedSearch, answerChannelMock, modalId, fieldId, formName, entity, multi)
              .provide([
                {
                  take() {
                    return i++ <= 2
                      ? advancedSearchActions.advancedSearchUpdate(['1'])
                      : advancedSearchActions.advancedSearchClose()
                  }
                },
                [matchers.call.fn(rest.fetchEntities), entities],
                [matchers.call.fn(sagas.enhanceEntitiesWithDisplays), entities]
              ])
              .call(sagas.advancedSearchUpdate, formName, fieldId, entities)
              .put.actionType(notification.removeModal().type)
              .run()
          })
        })
      })
    })
  })
})
