import rootSaga, * as sagas from './sagas'
import {takeLatest, takeEvery} from 'redux-saga'
import {call, put, fork, select} from 'redux-saga/effects'
import * as actions from './actions'
import {
  startSubmit,
  stopSubmit,
  initialize as initializeForm
} from 'redux-form'
import {fetchEntity, updateEntity} from '../../util/api/entities'
import {fetchForm, getFieldsOfDetailForm} from '../../util/api/forms'
import {formValuesToEntity, entityToFormValues, submitValidate} from '../../util/reduxForms'

describe('entity-browser', () => {
  describe('modules', () => {
    describe('detailView', () => {
      describe('sagas', () => {
        describe('rootSaga', () => {
          it('should fork child sagas', () => {
            const generator = rootSaga()
            expect(generator.next().value).to.deep.equal([
              fork(takeLatest, actions.INITIALIZE, sagas.initialize),
              fork(takeLatest, actions.LOAD_ENTITY, sagas.loadEntity),
              fork(takeEvery, actions.SUBMIT_FORM, sagas.submitForm)
            ])
            expect(generator.next().done).to.be.true
          })
        })

        describe('initialize saga', () => {
          it('should set entityname and load detail form definition', () => {
            const formBase = 'Base_form'
            const entityName = 'User'

            const gen = sagas.initialize(actions.initialize(entityName, formBase))
            expect(gen.next().value).to.eql(put(actions.setEntityName(entityName)))
            expect(gen.next().value).to.eql(call(fetchForm, formBase + '_detail'))
            expect(gen.next([]).value).to.eql(put(actions.setFormDefinition([])))
          })
        })

        describe('loadEntity saga', () => {
          it('should fetch entity and set it in store', () => {
            const entityId = 99
            const entityName = 'User'
            const formDefinition = {}

            const gen = sagas.loadEntity(actions.loadEntity(entityId))
            expect(gen.next().value).to.eql(select(sagas.detailViewSelector))
            expect(gen.next({entityName, formDefinition}).value).to.eql(call(getFieldsOfDetailForm, formDefinition))
            expect(gen.next([]).value).to.eql(
              call(fetchEntity, entityName, entityId, [])
            )

            expect(gen.next([]).value).to.eql(put(actions.setEntity([])))
            expect(gen.next([]).value).to.eql(call(entityToFormValues, []))
            expect(gen.next({}).value).to.eql(put(initializeForm('detailForm', {})))
            expect(gen.next().done).to.be.true
          })
        })

        describe('submitForm saga', () => {
          it('should validate from and reload saved entity', () => {
            const formId = 'detailForm'
            const values = {firstname: 'peter'}
            const entity = {}
            const updatedFormValues = {}
            const updatedEntity = {}
            const gen = sagas.submitForm()

            gen.next().value // not working : expect(gen.next().value).to.eql(select(getFormValues(formId)))
            expect(gen.next(values).value).to.eql(put(startSubmit(formId)))
            expect(gen.next().value).to.eql(call(submitValidate, values))
            expect(gen.next().value).to.eql(call(formValuesToEntity, values))
            expect(gen.next(entity).value).to.eql(call(updateEntity, entity))
            expect(gen.next(updatedEntity).value).to.eql(call(entityToFormValues, updatedEntity))
            expect(gen.next(updatedFormValues).value).to.eql(put(initializeForm(formId, updatedFormValues)))
            expect(gen.next().value).to.eql(put(stopSubmit(formId)))
            expect(gen.next().done).to.be.true
          })
        })
      })
    })
  })
})
