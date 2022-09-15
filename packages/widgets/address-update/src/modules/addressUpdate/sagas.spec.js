import {actions as formActions, isValid as isValidSelector} from 'redux-form'
import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {throwError} from 'redux-saga-test-plan/providers'
import {all, call, put, select, takeEvery, takeLatest} from 'redux-saga/effects'
import {form, rest, notification} from 'tocco-app-extensions'
import {env} from 'tocco-util'

import {updateAddress} from '../../util/api/entities'
import * as actions from './actions'
import rootSaga, * as sagas from './sagas'

const FORM_ID = 'detailForm'

describe('address-update', () => {
  describe('modules', () => {
    describe('addressUpdate', () => {
      describe('sagas', () => {
        describe('rootSaga', () => {
          test('should fork child sagas', () => {
            const generator = rootSaga()
            expect(generator.next().value).to.deep.equal(
              all([
                takeLatest(actions.LOAD_VIEW, sagas.loadView),
                takeLatest(actions.UNLOAD_VIEW, sagas.unloadView),
                takeLatest(actions.TOUCH_ALL_FIELDS, form.sagasUtils.touchAllFields, sagas.formSagaConfig),
                takeEvery(actions.SUBMIT_FORM, sagas.submitForm),
                takeEvery(actions.FIRE_TOUCHED, sagas.fireTouched)
              ])
            )
            expect(generator.next().done).to.be.true
          })
        })

        describe('loadView saga', () => {
          test('should fetch entity and set it in store', () => {
            const formName = 'UserSearch'

            return expectSaga(sagas.loadView)
              .provide([
                [select(sagas.inputSelector), {formName}],
                [matchers.call.fn(sagas.loadDetailFormDefinition)],
                [matchers.call.fn(sagas.loadData)]
              ])
              .call(sagas.loadDetailFormDefinition, formName, 'detail')
              .call(sagas.loadData)
              .run()
          })
        })

        describe('submitForm saga', () => {
          const entity = {paths: {}}
          test('should call update submit', () => {
            const fieldDefinitions = []

            return expectSaga(sagas.submitForm)
              .provide([
                [select(sagas.addressUpdateSelector), {mode: 'update', fieldDefinitions}],
                [select(isValidSelector(FORM_ID)), true],
                [matchers.call.fn(form.sagasUtils.getEntityForSubmit), entity],
                [matchers.call.fn(sagas.submitValidate)]
              ])
              .call(sagas.updateFormSubmit, entity, fieldDefinitions)
              .run()
          })

          test('should handle thrown errors', () => {
            const fieldDefinitions = []
            const error = new Error('error')
            return expectSaga(sagas.submitForm)
              .provide([
                [select(sagas.addressUpdateSelector), {mode: 'update', fieldDefinitions}],
                [select(isValidSelector(FORM_ID)), true],
                [matchers.call.fn(form.sagasUtils.getEntityForSubmit), entity],
                [matchers.call.fn(sagas.updateFormSubmit), throwError(error)],
                [matchers.call.fn(sagas.submitValidate)]
              ])
              .call(form.sagasUtils.handleSubmitError, sagas.formSagaConfig, error)
              .run()
          })

          test('should call handleInvalidForm on invalid form', () =>
            expectSaga(sagas.submitForm)
              .provide({
                select() {
                  return false
                }
              })
              .call(form.sagasUtils.handleInvalidForm, sagas.formSagaConfig)
              .not.call(sagas.updateFormSubmit, entity)
              .run())
        })

        describe('updateFormSubmit saga', () => {
          const entity = {key: '123', model: 'User', paths: {lastname: 'test'}}
          env.setWidgetConfigKey('1')
          test('should call updateAddress, load data, show notification', () => {
            const updateResponse = {status: 200}
            return expectSaga(sagas.updateFormSubmit, entity)
              .provide([
                [matchers.call.fn(updateAddress), updateResponse],
                [matchers.call.fn(sagas.loadData), null]
              ])
              .call.like({fn: updateAddress})
              .call.like({fn: sagas.loadData})
              .put.like({action: {type: notification.toaster().type}})
              .put.like({action: {type: formActions.stopSubmit().type}})
              .run()
          })
        })

        describe('loadDetailFormDefinition saga', () => {
          test('should load formDefinition, save to store and return ', () => {
            const formName = 'User'
            const mode = 'update'
            const formDefinition = {}
            const fieldDefinitions = {}

            const gen = sagas.loadDetailFormDefinition(formName, mode)
            expect(gen.next().value).to.eql(call(rest.fetchForm, formName, mode))
            expect(gen.next(formDefinition).value).to.eql(put(actions.setFormDefinition(formDefinition)))
            expect(gen.next().value).to.eql(call(form.getFieldDefinitions, formDefinition))
            expect(gen.next(fieldDefinitions).value).to.eql(put(actions.setFieldDefinitions(fieldDefinitions)))
            const next = gen.next()
            expect(next.value).to.eql({formDefinition, fieldDefinitions})
            expect(next.done).to.be.true
          })
        })

        describe('submitValidate saga', () => {
          test('should call submitValidation', () => {
            const formValues = {firstname: 'test'}
            const initialValues = {firstname: 'test1'}
            const mode = 'update'
            const fieldDefinitions = []
            const formDefinition = {}

            return expectSaga(sagas.submitValidate)
              .provide([
                [
                  matchers.call.fn(form.sagasUtils.getCurrentEntityState),
                  {formValues, initialValues, mode, fieldDefinitions, formDefinition}
                ],
                [matchers.call.fn(form.submitValidation)]
              ])
              .call(form.submitValidation, formValues, initialValues, fieldDefinitions, formDefinition, mode)
              .run()
          })
        })

        describe('loadData saga', () => {
          test('should fetch the entity and call form initialize', () => {
            return expectSaga(sagas.loadData)
              .provide([
                [select(sagas.addressUpdateSelector), {fieldDefinitions: []}],
                [matchers.call.fn(sagas.loadEntity), {paths: {}}],
                [matchers.call.fn(sagas.enhanceEntityWithDisplays), {}],
                [matchers.call.fn(sagas.enhanceEntityWithDisplayExpressions), {}]
              ])
              .call.like({fn: sagas.loadEntity})
              .call.like({fn: form.entityToFormValues})
              .put.like({action: {type: formActions.initialize().type}})
              .run()
          })
        })
      })
    })
  })
})
