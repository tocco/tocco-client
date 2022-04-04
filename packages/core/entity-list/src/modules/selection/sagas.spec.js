import {expectSaga} from 'redux-saga-test-plan'
import {select, takeLatest, all} from 'redux-saga/effects'
import {externalEvents} from 'tocco-app-extensions'

import * as actions from './actions'
import rootSaga, * as sagas from './sagas'

describe('entity-list', () => {
  describe('modules', () => {
    describe('selection', () => {
      describe('rootSaga', () => {
        test('should fork child sagas', () => {
          const generator = rootSaga()
          expect(generator.next().value).to.deep.equal(
            all([
              takeLatest(actions.TOGGLE_SHOW_SELECTED_RECORDS, sagas.reloadData),
              takeLatest(actions.ON_SELECT_CHANGE, sagas.onSelectChange),
              takeLatest(actions.CLEAR_SELECTION, sagas.clearSelection)
            ])
          )
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

        describe('clearSelection', () => {
          test('should clear selection an put external event', () => {
            return expectSaga(sagas.clearSelection).put(externalEvents.fireExternalEvent('onSelectChange', [])).run()
          })
        })

        describe('reloadData', () => {
          test('should dispatch reload action', () => expectSaga(sagas.reloadData).put(actions.reloadData()).run())
        })
      })
    })
  })
})
