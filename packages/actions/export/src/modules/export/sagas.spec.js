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
              takeLatest(actions.RUN_EXPORT, sagas.runExport),
              takeLatest(actions.HANDLE_TEMPLATE_CHANGE, sagas.handleTemplateChange),
              takeLatest(actions.SET_DEFAULT_COLUMNS, sagas.calculateAvailableColumns),
              takeLatest(actions.SET_TEMPLATE_COLUMNS, sagas.calculateAvailableColumns)
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
                type: actions.SET_DEFAULT_COLUMNS,
                payload: {
                  defaultColumns: [
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

      describe('handleTemplateChange', () => {
        test('should load additional columns', () => {
          const selection = {entityName: 'Model'}
          const columns = [
            {
              fieldName: 'path',
              label: 'Path',
              selected: true
            },
            {
              fieldName: 'other',
              label: 'Other',
              selected: true
            }
          ]

          const transformedColumns = [
            {
              id: 'path',
              label: 'Path',
              hidden: false
            },
            {
              id: 'other',
              label: 'Other',
              hidden: false
            }
          ]

          return expectSaga(sagas.handleTemplateChange, {payload: {text: 'path\nother'}})
            .provide([
              [select(sagas.selectionSelector), selection],
              [matchers.call.fn(rest.requestSaga), {body: {columns}}]
            ])
            .call.like({
              fn: rest.requestSaga,
              args: [
                'action/export/templatePaths',
                {
                  method: 'POST',
                  body: {
                    entityName: 'Model',
                    text: 'path\nother'
                  }
                }
              ]
            })
            .put(actions.setTemplateColumns(transformedColumns))
            .run()
        })

        test('should clear additional columns when no value passed', () => {
          return expectSaga(sagas.handleTemplateChange, {payload: {text: null}})
            .put(actions.setTemplateColumns(null))
            .run()
        })
      })

      describe('calculateAvailableColumns', () => {
        test('should use default columns when nothing else is available', () => {
          const defaultColumns = []

          return expectSaga(sagas.calculateAvailableColumns)
            .provide([
              [select(sagas.availableColumnsSelector), null],
              [select(sagas.defaultColumnsSelector), defaultColumns],
              [select(sagas.templateColumnsSelector), null]
            ])
            .put(actions.setAvailableColumns(defaultColumns))
            .run()
        })

        test('should combine default and template columns and unselect defaults', () => {
          const defaultColumns = [
            {
              id: 'both',
              label: 'Both',
              hidden: true
            },
            {
              id: 'default',
              label: 'Default',
              hidden: false
            }
          ]
          const templateColumns = [
            {
              id: 'template',
              label: 'Template',
              hidden: false
            },
            {
              id: 'both',
              label: 'Both',
              hidden: false
            }
          ]
          const expectedColumns = [
            {
              id: 'default',
              label: 'Default',
              hidden: true
            },
            {
              id: 'template',
              label: 'Template',
              hidden: false
            },
            {
              id: 'both',
              label: 'Both',
              hidden: false
            }
          ]

          return expectSaga(sagas.calculateAvailableColumns)
            .provide([
              [select(sagas.availableColumnsSelector), null],
              [select(sagas.defaultColumnsSelector), defaultColumns],
              [select(sagas.templateColumnsSelector), templateColumns]
            ])
            .put.like({
              action: {
                type: actions.SET_AVAILABLE_COLUMNS,
                payload: {
                  availableColumns: expectedColumns
                }
              }
            })
            .run()
        })

        test('should combine available and default columns and keep selected', () => {
          const defaultColumns = [
            {
              id: 'both',
              label: 'Both',
              hidden: true
            }
          ]
          const availableColumns = [
            {
              id: 'available',
              label: 'Available',
              hidden: false
            },
            {
              id: 'both',
              label: 'Both',
              hidden: false
            }
          ]
          const expectedColumns = [
            {
              id: 'both',
              label: 'Both',
              hidden: false
            }
          ]

          return expectSaga(sagas.calculateAvailableColumns)
            .provide([
              [select(sagas.availableColumnsSelector), availableColumns],
              [select(sagas.defaultColumnsSelector), defaultColumns],
              [select(sagas.templateColumnsSelector), null]
            ])
            .put.like({
              action: {
                type: actions.SET_AVAILABLE_COLUMNS,
                payload: {
                  availableColumns: expectedColumns
                }
              }
            })
            .run()
        })
      })
    })
  })
})
