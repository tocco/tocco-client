import _get from 'lodash/get'
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

          const expectedQuery = {
            where: 'IN (unique_id,"id")',
            paths: 'unique_id,label,ignore_selection'
          }

          return expectSaga(sagas.loadReport, {payload: {reportIds: ['id']}})
            .provide([[matchers.call.fn(rest.fetchEntities), result]])
            .call.like({
              fn: rest.fetchEntities,
              args: [
                'Report',
                expectedQuery,
                {
                  method: 'GET'
                }
              ]
            })
            .put(actions.setReports(reports))
            .run()
        })

        test('should handle specific model', () => {
          const expectedWhere = 'IN (unique_id,"id") and exists (relReport_placement where entity_model == "Entity")'

          return expectSaga(sagas.loadReport, {payload: {reportIds: ['id'], entityName: 'Entity'}})
            .provide([[matchers.call.fn(rest.fetchEntities), []]])
            .run()
            .then(({effects}) => {
              const where = _get(effects, ['call', '0', 'payload', 'args', '1', 'where'])
              expect(where).to.eq(expectedWhere)
            })
        })

        test('should handle specific scope', () => {
          const expectedWhere =
            'IN (unique_id,"id") and exists (relReport_placement where relReport_location.unique_id == "scope")'

          return expectSaga(sagas.loadReport, {payload: {reportIds: ['id'], scope: 'scope'}})
            .provide([[matchers.call.fn(rest.fetchEntities), []]])
            .run()
            .then(({effects}) => {
              const where = _get(effects, ['call', '0', 'payload', 'args', '1', 'where'])
              expect(where).to.eq(expectedWhere)
            })
        })

        test('should handle specific model and scope', () => {
          // damn queries are too long and string templates have wonky whitespace handling, replace whitespace by hand
          const expectedWhere = `IN (unique_id,"id") and exists (
            relReport_placement where entity_model == "Entity"
            and relReport_location.unique_id == "scope"
          )`.replace(/\s+/g, ' ')

          return expectSaga(sagas.loadReport, {payload: {reportIds: ['id'], entityName: 'Entity', scope: 'scope'}})
            .provide([[matchers.call.fn(rest.fetchEntities), []]])
            .run()
            .then(({effects}) => {
              const where = _get(effects, ['call', '0', 'payload', 'args', '1', 'where'])
              expect(where.replace(/\s+/g, ' ')).to.eq(expectedWhere)
            })
        })
      })
    })
  })
})
