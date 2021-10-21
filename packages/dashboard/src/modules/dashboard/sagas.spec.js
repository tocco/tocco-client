import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {call, takeLatest, takeEvery, all, select} from 'redux-saga/effects'
import {rest} from 'tocco-app-extensions'
import {channel} from 'redux-saga'

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
              takeLatest(actions.SAVE_INFOBOX_HEIGHT, sagas.saveInfoBoxHeight),
              takeEvery(actions.DISPLAY_INFOBOX_SETTINGS_MODAL, sagas.displayInfoBoxSettings),
              takeEvery(actions.RESET_INFOBOX_SETTINGS, sagas.resetInfoBoxSettings)
            ]))
            expect(generator.next().done).to.be.true
          })
        })

        describe('loadDashboard saga', () => {
          test('should fetch dashboard and set it in store', () => {
            const dashboardData = {infoboxes: [{id: 'hello', position: '1:2'}]}

            return expectSaga(sagas.loadDashboard)
              .provide([
                [matchers.call.fn(rest.requestSaga), {body: dashboardData}]
              ])
              .call(rest.requestSaga, 'client/dashboard', {method: 'GET'})
              .put(actions.setDashboard([{id: 'hello', position: '1:2', col: 0, row: 2}]))
              .run()
          })
        })

        describe('saveInfoBoxPositions', () => {
          test('should map and save infoBox positions', () => {
            const expectedInfoBoxes = [
              {id: '1', col: 0, row: 0, position: '1:0'},
              {id: '2', col: 0, row: 1, position: '1:1'},
              {id: '3', col: 1, row: 0, position: '2:0'}
            ]
            const expectedPreferences = {
              '1:POSITION': '1:0',
              '2:POSITION': '1:1',
              '3:POSITION': '2:0'
            }

            const action = {
              payload: {
                infoBoxes: [
                  {id: '1', col: 0, row: 0, position: null},
                  {id: '2', col: 0, row: 1, position: null},
                  {id: '3', col: 1, row: 0, position: null}
                ]
              }
            }

            return expectSaga(sagas.saveInfoBoxPositions, action)
              .provide([
                [matchers.call.fn(rest.savePreferences)]
              ])
              .call(rest.savePreferences, expectedPreferences, '/nice2/ui/settings/infoboxes')
              .put(actions.setDashboard(expectedInfoBoxes))
              .run()
          })
        })

        describe('displayInfoBoxSettings', () => {
          test('should save folded setting', () => {
            const expectedInfoBoxes = [
              {id: '1', folded: true},
              {id: '2', folded: false},
              {id: '3', folded: false},
              {id: '4', folded: true}
            ]
            const expectedPreferences = {
              '1:STATUS': 'folded',
              '2:STATUS': 'open',
              '3:STATUS': 'open',
              '4:STATUS': 'folded'
            }

            const dashboard = {
              infoBoxes: [
                {id: '1', folded: false},
                {id: '2', folded: true},
                {id: '3', folded: false},
                {id: '4', folded: true}
              ]
            }

            return expectSaga(sagas.displayInfoBoxSettings)
              .provide([
                [select(sagas.dashboardSelector), dashboard],
                [channel, {}],
                {
                  take() {
                    return [
                      {id: '1', folded: true},
                      {id: '2', folded: false},
                      {id: '3', folded: false},
                      {id: '4', folded: true}
                    ]
                  }
                },
                [matchers.call.fn(rest.savePreferences)]
              ])
              .put.like({
                action: {
                  type: 'notification/MODAL',
                  payload: {
                    id: 'dashboard-infobox-settings',
                    title: 'client.dashboard.preferences.show.title',
                    message: null,
                    closable: true
                  }
                }
              })
              .call.like({fn: channel})
              .call(rest.savePreferences, expectedPreferences, '/nice2/ui/settings/infoboxes')
              .put(actions.setDashboard(expectedInfoBoxes))
              .run()
          })
        })

        describe('resetInfoBoxSettings', () => {
          test('should reset all infoBox settings', () => {
            return expectSaga(sagas.resetInfoBoxSettings)
              .provide([
                [matchers.call.fn(rest.deleteUserPreferences)],
                [matchers.call.fn(sagas.loadDashboard)]
              ])
              .call(rest.deleteUserPreferences, '*:HEIGHT')
              .call(rest.deleteUserPreferences, '*:POSITION')
              .call(rest.deleteUserPreferences, '*:STATUS')
              .call(sagas.loadDashboard)
              .run()
          })
        })
      })
    })
  })
})
