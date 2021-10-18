import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {call, takeLatest, all} from 'redux-saga/effects'
import {rest} from 'tocco-app-extensions'

import * as actions from './actions'
import rootSaga, * as sagas from './sagas'

describe('dashboard', () => {
  describe('modules', () => {
    describe('dashboard', () => {
      describe('dashboard', () => {
        describe('sagas', () => {
          test('should fork child sagas', () => {
            const generator = rootSaga()
            expect(generator.next().value).to.deep.equal(all([
              call(sagas.loadDashboard),
              takeLatest(actions.LOAD_DASHBOARD, sagas.loadDashboard),
              takeLatest(actions.SAVE_INFOBOX_POSITIONS, sagas.saveInfoBoxPositions),
              takeLatest(actions.SAVE_INFOBOX_HEIGHT, sagas.saveInfoBoxHeight)
            ]))
            expect(generator.next().done).to.be.true
          })
        })

        describe('loadDashboard saga', () => {
          test('should fetch dashboard and set it in store', () => {
            const dashboardData = {infoboxes: [{id: 'hello'}]}

            return expectSaga(sagas.loadDashboard)
              .provide([
                [matchers.call.fn(rest.requestSaga), {body: dashboardData}]
              ])
              .call(rest.requestSaga, 'client/dashboard', {method: 'GET'})
              .put(actions.setDashboard(dashboardData.infoboxes))
              .run()
          })
        })
      })
    })
  })
})
