import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {all, takeLatest} from 'redux-saga/effects'
import {rest} from 'tocco-app-extensions'

import * as actions from './actions'
import rootSaga, * as sagas from './sagas'

describe('app-extensinos', () => {
  describe('reports', () => {
    describe('sagas', () => {
      describe('rootSaga', () => {
        test('should fork child sagas', () => {
          const generator = rootSaga()
          expect(generator.next().value).to.deep.equal(all([takeLatest(actions.LOAD_REPORTS, sagas.loadReport)]))
          expect(generator.next().done).to.be.true
        })
      })

      describe('loadReport', () => {
        test('empty array do nothing', () => {
          return expectSaga(sagas.loadReport, {payload: {reportIds: []}})
            .put(actions.setReports([]))
            .run()
        })

        test('load report paths and map result to report action structure', () => {
          const result = [
            {
              paths: {
                unique_id: {
                  value: 'id'
                },
                label: {
                  value: 'label_de'
                },
                ignore_selection: {
                  value: false
                }
              }
            }
          ]

          const reports = [
            {
              actionType: 'report',
              componentType: 'report',
              confirmationThreshold: sagas.DEFAULT_CONFIRMATION_THRESHOLD,
              id: 'id',
              label: 'label_de',
              reportId: 'id',
              showConfirmation: true
            }
          ]

          return expectSaga(sagas.loadReport, {payload: {reportIds: ['id']}})
            .provide([[matchers.call.fn(rest.fetchEntities), result]])
            .put(actions.setReports(reports))
            .run()
        })
      })
    })
  })
})
