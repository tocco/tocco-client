import rootSaga, * as sagas from './sagas'
import {call, put, fork, select, takeLatest, takeEvery} from 'redux-saga/effects'
import * as actions from './actions'
import {
  startSubmit,
  stopSubmit,
  initialize as initializeForm
} from 'redux-form'
import {updateEntity, fetchEntity} from '../../../util/api/entities'
import {getFieldsOfDetailForm, fetchForm} from '../../../util/api/forms'
import {formValuesToEntity, entityToFormValues, getDirtyFields} from '../../../util/detailView/reduxForm'
import {submitValidate} from '../../../util/detailView/asyncValidation'
import {notify} from '../../../util/notification'

describe('entity-browser', () => {
  describe('modules', () => {
    describe('detailView', () => {
      describe('sagas', () => {
        describe('rootSaga', () => {
          it('should fork child sagas', () => {
            const generator = rootSaga()
            expect(generator.next().value).to.deep.equal([
              fork(takeLatest, actions.LOAD_DETAIL_VIEW, sagas.loadDetailView),
              fork(takeEvery, actions.SUBMIT_FORM, sagas.submitForm)
            ])
            expect(generator.next().done).to.be.true
          })
        })

        describe('loadDetailView saga', () => {
          it('should fetch entity and set it in store', () => {
            const entityId = 99
            const formBase = 'UserSearch'
            const entityName = 'User'
            const formDefinition = {}

            const entity = {
              key: 1,
              model: 'User',
              paths: {
                field1: {
                  type: 'entity',
                  value: {
                    key: 1,
                    display: 'fieldLabel'
                  }
                },
                field2: {
                  type: 'entity-list',
                  value: [
                    {key: 1, display: 'fieldLabel1'},
                    {key: 2, display: 'fieldLabel2'}
                  ]
                }
              }
            }

            const gen = sagas.loadDetailView(actions.loadDetailView(entityId))
            expect(gen.next().value).to.eql(select(sagas.entityBrowserSelector))
            expect(gen.next({entityName, formBase, formDefinition}).value)
              .to.eql(call(sagas.loadDetailFormDefinition, formDefinition, formBase))
            expect(gen.next(formDefinition).value).to.eql(call(sagas.loadEntity, entityName, entityId, formDefinition))
            expect(gen.next(entity).value).to.eql(call(entityToFormValues, entity))
            expect(gen.next({}).value).to.eql(put(initializeForm('detailForm', {})))
            expect(gen.next().done).to.be.true
          })
        })

        describe('submitForm saga', () => {
          it('should validate form and reload saved entity', () => {
            const formId = 'detailForm'
            const values = {firstname: 'peter'}
            const initialValues = {firstname: 'pet'}
            const dirtyFields = ['firstname']
            const entity = {}
            const updatedFormValues = {}
            const updatedEntity = {}
            const formDefinition = {}
            const fields = []
            const gen = sagas.submitForm()

            expect(gen.next().value) // not working : expect(gen.next().value).to.eql(select(getFormValues(formId)))
            expect(gen.next(values).value) // expect(gen.next().value).to.eql(select(formInitialValueSelector(formId)))
            expect(gen.next(initialValues).value).to.eql(put(startSubmit(formId)))
            expect(gen.next().value).to.eql(call(submitValidate, values, initialValues))
            expect(gen.next().value).to.eql(call(getDirtyFields, initialValues, values))
            expect(gen.next(dirtyFields).value).to.eql(call(formValuesToEntity, values, dirtyFields))
            expect(gen.next(entity).value).to.eql(select(sagas.formDefinitionSelector))
            expect(gen.next(formDefinition).value).to.eql(call(getFieldsOfDetailForm, formDefinition))
            expect(gen.next(fields).value).to.eql(call(updateEntity, entity, fields))
            expect(gen.next(updatedEntity).value).to.eql(call(entityToFormValues, updatedEntity))
            expect(gen.next(updatedFormValues).value).to.eql(put(initializeForm(formId, updatedFormValues)))
            expect(gen.next().value).to.eql(call(
              notify, 'success', 'saveSuccessfulTitle', 'saveSuccessfulMessage', 'floppy-saved', 2000)
            )
            const lastSaveAction = gen.next().value
            const lastSaveTime = lastSaveAction.PUT.action.payload.lastSave
            expect(lastSaveAction).to.eql(put(actions.setLastSave(lastSaveTime)))
            expect(gen.next().value).to.eql(put(stopSubmit(formId)))
            expect(gen.next().done).to.be.true
          })
        })

        describe('loadDetailFormDefinition saga', () => {
          it('should load formDefinition if not loaded', () => {
            const formDefinition = {}
            const loadedFormDefinition = {}
            const formBase = 'UserSearch'

            const gen = sagas.loadDetailFormDefinition(formDefinition, formBase)

            expect(gen.next().value).to.eql(call(fetchForm, formBase + '_detail'))
            expect(gen.next(loadedFormDefinition).value).to.eql(put(actions.setFormDefinition(loadedFormDefinition)))
            expect(gen.next().done).to.be.true
          })

          it('should not load formDefinition if already loaded', () => {
            const formDefinition = {someContent: true}
            const formBase = 'UserSearch'

            const gen = sagas.loadDetailFormDefinition(formDefinition, formBase)
            expect(gen.next().done).to.be.true
          })
        })

        describe('loadEntity saga', () => {
          it('should fetchEntity with fields of form and set it on store', () => {
            const entityName = 'User'
            const entityId = '99'
            const formDefinition = {}

            const fields = []
            const entity = {}

            const gen = sagas.loadEntity(entityName, entityId, formDefinition)

            expect(gen.next().value).to.eql(call(getFieldsOfDetailForm, formDefinition))
            expect(gen.next(fields).value).to.eql(call(fetchEntity, entityName, entityId, fields))
            expect(gen.next(entity).value).to.eql(put(actions.setEntity(entity)))

            expect(gen.next().done).to.be.true
          })

          it('should not load formDefinition if already loaded', () => {
            const formDefinition = {someContent: true}
            const formBase = 'UserSearch'

            const gen = sagas.loadDetailFormDefinition(formDefinition, formBase)
            expect(gen.next().done).to.be.true
          })
        })
      })
    })
  })
})
