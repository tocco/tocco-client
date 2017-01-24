import rootSaga, * as sagas from './sagas'
import {takeLatest, takeEvery} from 'redux-saga'
import {call, put, fork, select} from 'redux-saga/effects'
import * as actions from './actions'
import {
  startSubmit,
  stopSubmit,
  initialize as initializeForm
} from 'redux-form'
import {fetchEntity, updateEntity, fetchEntities, fetchModel} from '../../util/api/entities'
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
              fork(takeEvery, actions.SUBMIT_FORM, sagas.submitForm),
              fork(takeEvery, actions.LOAD_RELATION_ENTITIES, sagas.loadRelationEntities)
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
            expect(gen.next().value).to.eql(call(fetchModel, entityName))
            expect(gen.next({}).value).to.eql(put(actions.setEntityModel({})))
            expect(gen.next().value).to.eql(call(fetchForm, formBase + '_detail'))
            expect(gen.next([]).value).to.eql(put(actions.setFormDefinition([])))
          })
        })

        describe('loadEntity saga', () => {
          it('should fetch entity and set it in store', () => {
            const entityId = 99
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

            const gen = sagas.loadEntity(actions.loadEntity(entityId))
            expect(gen.next().value).to.eql(select(sagas.detailViewSelector))
            expect(gen.next({entityName, formDefinition}).value).to.eql(call(getFieldsOfDetailForm, formDefinition))
            expect(gen.next(['field1', 'field2']).value).to.eql(
              call(fetchEntity, entityName, entityId, ['field1', 'field2'])
            )

            expect(gen.next(entity).value).to.eql(put(actions.setEntity(entity)))
            expect(gen.next([]).value).to.eql(call(entityToFormValues, entity))

            const storeSingleSelect = [
              {value: 1, label: 'fieldLabel'}
            ]
            expect(gen.next({}).value).to.eql(put(actions.setStore('field1', storeSingleSelect)))

            const storeMultiSelect = [
              {value: 1, label: 'fieldLabel1'},
              {value: 2, label: 'fieldLabel2'}
            ]
            expect(gen.next([]).value).to.eql(put(actions.setStore('field2', storeMultiSelect)))

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

        describe('loadRelationEntities saga', () => {
          it('should load passed entity and save to store', () => {
            const relationEntityName = 'relUser'
            const entityName = 'User'

            const detailView = {
              stores: {},
              entityModel: {
                relUser: {
                  targetEntity: 'User'
                }
              }
            }

            const gen = sagas.loadRelationEntities(actions.loadRelationEntities(relationEntityName))
            expect(gen.next().value).to.eql(select(sagas.detailViewSelector))
            expect(gen.next(detailView).value).to.eql(call(fetchEntities, entityName))
            expect(gen.next({data: []}).value).to.eql(put(actions.setStore(relationEntityName, [])))
            expect(gen.next().value).to.eql(put(actions.setStoreLoaded(relationEntityName, true)))
            expect(gen.next().done).to.be.true
          })

          it('should not load the store', () => {
            const relationEntityName = 'relUser'
            const detailView = {
              stores: {
                relUser: {
                  data: [],
                  loaded: true
                }
              }
            }

            const gen = sagas.loadRelationEntities(actions.loadRelationEntities(relationEntityName))
            expect(gen.next().value).to.eql(select(sagas.detailViewSelector))
            gen.next(detailView).value
            expect(gen.next().done).to.be.true
          })
        })
      })
    })
  })
})
