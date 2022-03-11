import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {all, select, takeLatest} from 'redux-saga/effects'
import {actions as actionHandlers, externalEvents, rest} from 'tocco-app-extensions'

import * as actions from './actions'
import rootSaga, * as sagas from './sagas'

describe('entity-report', () => {
  describe('modules', () => {
    describe('entityReport', () => {
      describe('sagas', () => {
        describe('rootSaga', () => {
          test('should fork child sagas', () => {
            const generator = rootSaga()
            expect(generator.next().value).to.deep.equal(
              all([
                takeLatest(actions.OPEN_REPORT_ACTION, sagas.openReportAction),
                takeLatest(actions.LOAD_REPORTS, sagas.loadReports)
              ])
            )
            expect(generator.next().done).to.be.true
          })
        })

        const input = {
          selection: {
            type: 'ID',
            entityName: 'User',
            keys: ['1']
          },
          actionProperties: {
            pathToReports: 'relReport'
          }
        }

        describe('openReportAction', () => {
          test('trigger action event', () => {
            const reportId = 'myReport'
            return expectSaga(sagas.openReportAction, {payload: {reportId}})
              .provide([[select(sagas.inputSelector), input]])
              .put(
                externalEvents.fireExternalEvent('onSuccess', {
                  title: null,
                  remoteEvents: [
                    {
                      type: 'action-trigger-event',
                      payload: {
                        func: actionHandlers.actions.actionInvoke,
                        args: [{reportId, actionType: 'report', componentType: 'report'}, input.selection, null]
                      }
                    }
                  ]
                })
              )
              .run()
          })
        })

        describe('loadReports', () => {
          test('set loaded reports', () => {
            const reportsData = [
              {
                uniqueId: 'pdf_report',
                label: 'PDF Report'
              },
              {
                uniqueId: 'excel_report',
                label: 'Excel Report'
              }
            ]

            return expectSaga(sagas.loadReports)
              .provide([
                [select(sagas.inputSelector), input],
                [matchers.call.fn(rest.requestSaga), {body: reportsData}]
              ])
              .put(
                actions.setReports([
                  {
                    key: 'pdf_report',
                    display: 'PDF Report'
                  },
                  {
                    key: 'excel_report',
                    display: 'Excel Report'
                  }
                ])
              )
              .run()
          })

          test('no reports found', () => {
            const reportsData = []

            return expectSaga(sagas.loadReports)
              .provide([
                [select(sagas.inputSelector), input],
                [matchers.call.fn(rest.requestSaga), {body: reportsData}],
                [select(sagas.textResourceSelector, 'client.component.actions.errorText'), 'title text'],
                [select(sagas.textResourceSelector, 'client.entity-report.no_reports'), 'msg text']
              ])
              .put(
                externalEvents.fireExternalEvent('onError', {
                  title: 'title text',
                  message: 'msg text'
                })
              )
              .run()
          })
        })
      })
    })
  })
})
