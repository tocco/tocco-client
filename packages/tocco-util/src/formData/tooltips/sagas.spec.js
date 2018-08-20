import {fork, select, takeEvery} from 'redux-saga/effects'
import * as tooltipActions from './actions'
import {requestSaga} from '../../rest'

import {expectSaga, testSaga} from 'redux-saga-test-plan'
import * as sagas from './sagas'
import * as matchers from 'redux-saga-test-plan/matchers'

describe('tocco-util', () => {
  describe('formData', () => {
    describe('tooltips', () => {
      describe('sagas', () => {
        describe('main saga', () => {
          it('should fork sagas', () => {
            const saga = testSaga(sagas.default)
            saga.next().all([
              fork(takeEvery, tooltipActions.loadTooltip, sagas.loadToolTip)
            ])
          })
        })

        describe('loadToolTip saga', () => {
          it('should load tooltip if not yet loaded', () => {
            const entity = 'User'
            const id = 1

            const tooltip = '<div>tooltip</div>'

            return expectSaga(
              sagas.loadToolTip, tooltipActions.loadTooltip(entity, id)
            )
              .provide([
                [select(sagas.tooltipSelector, entity, id), null],
                [matchers.call.fn(requestSaga), {display: tooltip}]
              ])
              .put(tooltipActions.setToolTip(entity, id, tooltip))
              .run()
          })

          it('should not load tooltip if already loaded', () => {
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
