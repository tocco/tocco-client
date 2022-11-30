import {expect} from 'chai'
import {actions as formActions} from 'redux-form'
import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {all, takeLatest, select} from 'redux-saga/effects'
import {api} from 'tocco-util'

import display from '../../display'
import form from '../../form'
import rest from '../../rest'
import {REDUX_FORM_NAME} from '../components/TemplateForm'
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
              takeLatest(actions.INITIALIZE_TEMPLATES, sagas.initialize),
              takeLatest(actions.FETCH_TEMPLATES, sagas.fetchTemplates),
              takeLatest(actions.SET_TEMPLATE_VALUES, sagas.setTemplateValues)
            ])
          )
          expect(generator.next().done).to.be.true
        })
      })

      describe('initialize', () => {
        test('should load and set required data', () => {
          const payload = {
            formName: 'Export_template_action',
            defaultValues: {},
            customTemplateFields: {}
          }

          return expectSaga(sagas.initialize, {payload})
            .provide([
              [select(sagas.formDefinitionSelector), null],
              [matchers.call.fn(rest.fetchForm), {}],
              [matchers.call.fn(form.getFieldDefinitions), []],
              [matchers.call.fn(sagas.setTemplateValues)],
              [matchers.call.fn(sagas.fetchTemplates)]
            ])
            .call(rest.fetchForm, 'Export_template_action', 'detail')
            .put(actions.setForm({}))
            .put(actions.setFieldDefinitions([]))
            .put(formActions.initialize('template'))
            .call(sagas.setFormValues, {}, [], {})
            .call(sagas.fetchTemplates, {payload})
            .run()
        })

        test('should do nothing when form is loaded', () => {
          const payload = {
            formName: 'Export_template_action',
            defaultValues: {},
            customTemplateFields: {}
          }

          return expectSaga(sagas.initialize, {payload})
            .provide([
              [select(sagas.formDefinitionSelector), {}],
              [matchers.call.fn(rest.fetchForm), {}],
              [matchers.call.fn(form.getFieldDefinitions), []],
              [matchers.call.fn(sagas.setTemplateValues)],
              [matchers.call.fn(sagas.fetchTemplates)]
            ])
            .not.call.like({fn: rest.fetchForm})
            .not.put(formActions.initialize('template'))
            .not.put.like({action: {type: actions.SET_FORM}})
            .not.call.like({fn: sagas.setFormValues})
            .not.call.like({fn: sagas.fetchTemplates})
            .run()
        })
      })

      describe('fetchTemplates', () => {
        const selection = {}
        const templateEntityName = 'Export_template'
        const payload = {
          templateEntityName,
          selection,
          customTemplateFields: {}
        }

        const templateResponse = {
          templates: [
            {
              key: 1,
              label: 'First'
            },
            {
              key: 2,
              label: 'Second'
            }
          ],
          defaultTemplate: {
            key: 2,
            label: 'Second'
          }
        }

        const templateOptions = [
          {
            key: 1,
            display: 'First'
          },
          {
            key: 2,
            display: 'Second'
          }
        ]

        const defaultTemplate = {
          key: 2,
          display: 'Second'
        }

        test('should set options and default', () => {
          return expectSaga(sagas.fetchTemplates, {payload})
            .provide([
              [
                matchers.call.fn(rest.requestSaga, 'templates/Export_template', {
                  method: 'POST',
                  body: selection
                }),
                {body: templateResponse}
              ],
              [select(sagas.selectedTemplateSelector), null]
            ])
            .put.like({
              action: {
                type: actions.SET_TEMPLATE_OPTIONS,
                payload: {templateOptions}
              }
            })
            .put.like({
              action: {
                type: actions.SET_TEMPLATE_VALUES,
                payload: {
                  templateEntityName,
                  template: defaultTemplate,
                  customTemplateFields: {}
                }
              }
            })
            .run()
        })

        test('should not set default when template is selected', () => {
          return expectSaga(sagas.fetchTemplates, {payload})
            .provide([
              [
                matchers.call.fn(rest.requestSaga, 'templates/Export_template', {
                  method: 'POST',
                  body: selection
                }),
                {body: templateResponse}
              ],
              [
                select(sagas.selectedTemplateSelector),
                {
                  key: 1,
                  label: 'Template'
                }
              ]
            ])
            .put.like({
              action: {
                type: actions.SET_TEMPLATE_OPTIONS,
                payload: {templateOptions}
              }
            })
            .not.put.like({
              action: {
                type: actions.SET_TEMPLATE_VALUES,
                payload: {
                  templateEntityName,
                  template: defaultTemplate,
                  customTemplateFields: {}
                }
              }
            })
            .run()
        })

        test('should not set default when none is given', () => {
          return expectSaga(sagas.fetchTemplates, {payload})
            .provide([
              [
                matchers.call.fn(rest.requestSaga, 'templates/Export_template', {
                  method: 'POST',
                  body: selection
                }),
                {
                  body: {
                    ...templateResponse,
                    defaultTemplate: null
                  }
                }
              ],
              [select(sagas.selectedTemplateSelector), null]
            ])
            .put.like({
              action: {
                type: actions.SET_TEMPLATE_OPTIONS,
                payload: {templateOptions}
              }
            })
            .not.put.like({
              action: {
                type: actions.SET_TEMPLATE_VALUES,
                payload: {
                  templateEntityName,
                  template: defaultTemplate,
                  customTemplateFields: {}
                }
              }
            })
            .run()
        })
      })

      describe('setTemplateValues', () => {
        test('should gather paths and values and call setFormValues', () => {
          const customTemplateFields = {
            'custom-field': () => {}
          }
          const payload = {
            templateEntityName: 'Export_template',
            template: {
              key: '1'
            },
            customTemplateFields
          }

          const fieldDefinitions = [{id: 'form-field'}]

          const templateEntity = {key: '1'}
          const flattenedValues = []

          return expectSaga(sagas.setTemplateValues, {payload})
            .provide([
              [select(sagas.fieldDefinitionSelector), fieldDefinitions],
              [select(sagas.initializedSelector), false],
              [matchers.call.fn(rest.fetchEntity), templateEntity],
              [matchers.call.fn(api.getFlattenEntity), flattenedValues]
            ])
            .call(rest.fetchEntity, 'Export_template', '1', {paths: ['form-field', 'custom-field']})
            .call(sagas.setFormValues, flattenedValues, fieldDefinitions, customTemplateFields)
            .put(actions.setInitialized(true))
            .run()
        })

        test('should send null to custom fields when no template is selected', () => {
          const customFunction = sinon.spy()
          const customTemplateFields = {
            'custom-field': customFunction
          }
          const payload = {
            templateEntityName: 'Export_template',
            template: null,
            customTemplateFields
          }

          return expectSaga(sagas.setTemplateValues, {payload})
            .provide([[select(sagas.initializedSelector), true]])
            .run()
            .then(() => expect(customFunction).to.be.calledWith(null))
        })
      })

      describe('setFormValues', () => {
        test('should set form fields', () => {
          const values = []
          const fieldDefinitions = []
          const customTemplateFields = {}
          const formValues = {
            'form-field': 'form',
            'custom-field': 'custom'
          }

          return expectSaga(sagas.setFormValues, values, fieldDefinitions, customTemplateFields)
            .provide([
              [matchers.call.fn(display.enhanceEntityWithDisplays)],
              [matchers.call.fn(form.entityToFormValues), formValues]
            ])
            .call(display.enhanceEntityWithDisplays, values, fieldDefinitions)
            .call(form.entityToFormValues, values, fieldDefinitions)
            .put(formActions.change(REDUX_FORM_NAME, 'form-field', 'form'))
            .put(formActions.change(REDUX_FORM_NAME, 'custom-field', 'custom'))
            .run()
        })

        test('should set custom fields', () => {
          const fakeDataHolder = {
            value: null
          }
          const values = []
          const fieldDefinitions = []
          const customTemplateFields = {
            'custom-field': value => {
              fakeDataHolder.value = value
            }
          }
          const formValues = {
            'form-field': 'form',
            'custom-field': 'custom'
          }

          return expectSaga(sagas.setFormValues, values, fieldDefinitions, customTemplateFields)
            .provide([
              [matchers.call.fn(display.enhanceEntityWithDisplays)],
              [matchers.call.fn(form.entityToFormValues), formValues]
            ])
            .put(formActions.change(REDUX_FORM_NAME, 'form-field', 'form'))
            .run()
            .then(() => {
              expect(fakeDataHolder.value).to.eq('custom')
            })
        })
      })
    })
  })
})
