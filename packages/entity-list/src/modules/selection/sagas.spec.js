import {expectSaga} from 'redux-saga-test-plan'
import {externalEvents} from 'tocco-app-extensions'

import * as actions from './actions'
import rootSaga, * as sagas from './sagas'
import {SET_FORM_SELECTABLE} from '../list/actions'

import {fork, select, takeLatest, all} from 'redux-saga/effects'

describe('entity-list', () => {
  describe('modules', () => {
    describe('selection', () => {
      describe('rootSaga', () => {
        test('should fork child sagas', () => {
          const generator = rootSaga()
          expect(generator.next().value).to.deep.equal(all([
            fork(takeLatest, actions.ON_SELECT_CHANGE, sagas.onSelectChange),
            fork(takeLatest, SET_FORM_SELECTABLE, sagas.initialize),
            fork(takeLatest, actions.SET_SELECTION_MODE, sagas.selectionModeSet)
          ]))
          expect(generator.next().done).to.be.true
        })
      })
      describe('sagas', () => {
        describe('onSelectChange', () => {
          test('should calculate new selection an put action and external event', () => {
            const expectedSelection = ['1', '2', '3']

            return expectSaga(sagas.onSelectChange, actions.onSelectChange(['2', '3'], true))
              .provide([
                [select(sagas.inputSelector), {}],
                [select(sagas.selectionSelector), {selection: ['1', '2']}]
              ])

              .put(actions.setSelection(expectedSelection))
              .put(externalEvents.fireExternalEvent('onSelectChange', expectedSelection))
              .run()
          })

          test('should put action of key in case of single', () => {
            const expectedSelection = ['33']

            return expectSaga(sagas.onSelectChange, actions.onSelectChange(['33'], true))
              .provide([
                [select(sagas.inputSelector), {selectionStyle: 'single'}],
                [select(sagas.selectionSelector), {selection: ['2']}]
              ])

              .put(actions.setSelection(expectedSelection))
              .put(externalEvents.fireExternalEvent('onSelectChange', expectedSelection))
              .run()
          })
        })
      })
    })
  })
})
