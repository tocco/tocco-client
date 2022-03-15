import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {all, select, takeLatest} from 'redux-saga/effects'
import {externalEvents, rest, templateValues} from 'tocco-app-extensions'

import * as actions from './actions'
import rootSaga, * as sagas from './sagas'

describe('app-extensions', () => {
  describe('templateValues', () => {
    describe('sagas', () => {
      describe('rootSaga', () => {
        test('should fork child sagas', () => {
          const generator = rootSaga()
          expect(generator.next().value).to.deep.equal(
            all([
              takeLatest(actions.LOAD_FORM_DATA, sagas.loadFormData),
              takeLatest(actions.RUN_EXPORT, sagas.runExport)
            ])
          )
          expect(generator.next().done).to.be.true
        })
      })

      describe('loadFormData', () => {
        test('should load and set required data', () => {
          const selection = {}
          const payload = {
            selection
          }

          const formData = {
            columns: [
              {
                fieldName: 'first',
                label: 'First',
                selected: true
              },
              {
                fieldName: 'second',
                label: 'Second',
                selected: false
              }
            ],
            defaultValues: {
              filename: 'Some filename'
            }
          }

          return expectSaga(sagas.loadFormData, {payload})
            .provide([
              [
                matchers.call.fn(rest.requestSaga, 'action/export/formData', {
                  method: 'POST',
                  body: selection
                }),
                {body: formData}
              ]
            ])
            .put.like({
              action: {
                type: actions.SET_AVAILABLE_COLUMNS,
                payload: {
                  availableColumns: [
                    {
                      id: 'first',
                      label: 'First',
                      hidden: false
                    },
                    {
                      id: 'second',
                      label: 'Second',
                      hidden: true
                    }
                  ]
                }
              }
            })
            .put(actions.setDefaultValues(formData.defaultValues))
            .run()
        })
      })

      describe('runExport', () => {
        test('should start export', () => {
          const selection = {}
          const payload = {
            columns: [
              {
                id: 'first',
                label: 'First',
                hidden: false
              },
              {
                id: 'second',
                label: 'Second',
                hidden: false
              }
            ]
          }

          const formValues = {
            print_field_names: true,
            relCorrespondence_language: {
              key: 2
            },
            relExport_format: {
              key: 3
            },
            filename: 'Some filename',
            archive: true
          }

          const expectedExportData = {
            paths: {
              first: 'First',
              second: 'Second'
            },
            printFieldNames: true,
            languageKey: 2,
            formatKey: 3,
            filename: 'Some filename',
            archive: true
          }

          return expectSaga(sagas.runExport, {payload})
            .provide([
              [select(sagas.selectionSelector), selection],
              [matchers.call.fn(templateValues.getFormValues), formValues],
              [matchers.call.fn(rest.requestSaga)]
            ])
            .call.like({
              fn: rest.requestSaga,
              args: [
                'action/export',
                {
                  method: 'POST',
                  body: {
                    selection,
                    params: {background: true},
                    additionalProperties: expectedExportData
                  }
                }
              ]
            })
            .put(externalEvents.fireExternalEvent('onSuccess', {title: null}))
            .run()
        })
      })
    })
  })
})
