import {expectSaga, testSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {select, takeEvery} from 'redux-saga/effects'

import * as tooltipActions from './actions'
import rest from '../../rest'
import * as sagas from './sagas'

describe('app-extensions', () => {
  describe('formData', () => {
    describe('tooltips', () => {
      describe('sagas', () => {
        describe('main saga', () => {
          test('should fork sagas', () => {
            const saga = testSaga(sagas.default)
            saga.next().all([
              takeEvery(tooltipActions.LOAD_TOOLTIP, sagas.loadToolTip)
            ])
          })
        })

        describe('loadToolTip saga', () => {
          test('should load tooltip if not yet loaded', () => {
            const entity = 'User'
            const id = 1

            const tooltip = '<div>tooltip</div>'

            return expectSaga(
              sagas.loadToolTip, tooltipActions.loadTooltip(entity, id)
            )
              .provide([
                [select(sagas.tooltipSelector, entity, id), null],
                [matchers.call.fn(rest.requestSaga), {body: {display: tooltip}}]
              ])
              .put(tooltipActions.setToolTip(entity, id, tooltip))
              .run()
          })

          test('should not load tooltip if already loaded', () => {
            const entity = 'User'
            const id = 1

            const tooltip = '<div>tooltip</div>'

            return expectSaga(
              sagas.loadToolTip, tooltipActions.loadTooltip(entity, id)
            )
              .provide([
                [select(sagas.tooltipSelector, entity, id), tooltip]
              ])
              .not.put.like({action: {type: tooltipActions.SET_TOOLTIP}})
              .run()
          })
        })
      })
    })
  })
})
