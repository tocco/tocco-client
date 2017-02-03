import rootSaga, * as sagas from './sagas'
import {call, put, fork, select, takeLatest, takeEvery} from 'redux-saga/effects'
import * as actions from './actions'
import {
  startSubmit,
  stopSubmit,
  initialize as initializeForm
} from 'redux-form'
import {fetchEntity, updateEntity, fetchEntities, getInitialSelectBoxStore} from '../../util/api/entities'
import {fetchForm, getFieldsOfDetailForm} from '../../util/api/forms'
import {formValuesToEntity, entityToFormValues, submitValidate, getDirtyFields} from '../../util/reduxForms'

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

            const stores = [
              {
                key: 'field1',
                store: [
                  {value: 1, label: 'fieldLabel'}
                ]
              },
              {
                key: 'field2',
                store: [
                  {value: 1, label: 'fieldLabel1'},
                  {value: 2, label: 'fieldLabel2'}
                ]
              }
            ]

            const gen = sagas.loadEntity(actions.loadEntity(entityId))
            expect(gen.next().value).to.eql(select(sagas.detailViewSelector))
            expect(gen.next({entityName, formDefinition}).value).to.eql(call(getFieldsOfDetailForm, formDefinition))
            expect(gen.next(['field1', 'field2']).value).to.eql(
              call(fetchEntity, entityName, entityId, ['field1', 'field2'])
            )

            expect(gen.next(entity).value).to.eql(put(actions.setEntity(entity)))
            expect(gen.next([]).value).to.eql(call(entityToFormValues, entity))
            expect(gen.next({}).value).to.eql(call(getInitialSelectBoxStore, entity.paths))

            const storeSingleSelect = [
              {value: 1, label: 'fieldLabel'}
            ]
            expect(gen.next(stores).value).to.eql(put(actions.setStore('field1', storeSingleSelect)))

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
            const initialValues = {firstname: 'pet'}
            const dirtyFields = ['firstname']
            const entity = {}
            const updatedFormValues = {}
            const updatedEntity = {}
            const gen = sagas.submitForm()

            gen.next().value // not working : expect(gen.next().value).to.eql(select(getFormValues(formId)))
            gen.next(values).value // expect(gen.next().value).to.eql(select(formInitialValueSelector(formId)))
            expect(gen.next(initialValues).value).to.eql(put(startSubmit(formId)))
            expect(gen.next().value).to.eql(call(submitValidate, values))
            expect(gen.next().value).to.eql(call(getDirtyFields, initialValues, values))
            expect(gen.next(dirtyFields).value).to.eql(call(formValuesToEntity, values, dirtyFields))
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
              selectBoxStores: {}
            }

            const entityBrowser = {
              entityModel: {
                relUser: {
                  type: 'relation',
                  targetEntity: 'User'
                }
              }
            }

            const gen = sagas.loadRelationEntities(actions.loadRelationEntities(relationEntityName))
            expect(gen.next().value).to.eql(select(sagas.detailViewSelector))
            expect(gen.next(detailView).value).to.eql(select(sagas.entityBrowserSelector))
            expect(gen.next(entityBrowser).value).to.eql(call(fetchEntities, entityName))
            expect(gen.next({data: []}).value).to.eql(put(actions.setStore(relationEntityName, [])))
            expect(gen.next().value).to.eql(put(actions.setStoreLoaded(relationEntityName, true)))
            expect(gen.next().done).to.be.true
          })

          it('should not load the store because loaded is set', () => {
            const relationEntityName = 'relUser'
            const detailView = {
              selectBoxStores: {
                relUser: {
                  data: [],
                  loaded: true
                }
              }
            }

            const entityBrowser = {
              entityModel: {
                relUser: {
                  type: 'relation'
                }
              }
            }

            const gen = sagas.loadRelationEntities(actions.loadRelationEntities(relationEntityName))
            expect(gen.next().value).to.eql(select(sagas.detailViewSelector))
            expect(gen.next(detailView).value).to.eql(select(sagas.entityBrowserSelector))
            gen.next(entityBrowser).value
            expect(gen.next().done).to.be.true
          })

          it('should not load the store because type is not equal `relation`', () => {
            const relationEntityName = 'relUser'
            const detailView = {
              selectBoxStores: {
                relUser: {
                  data: [],
                  loaded: false
                }
              }
            }

            const entityBrowser = {
              entityModel: {
                relUser: {
                  type: 'NOT_RELATION'
                }
              }
            }

            const gen = sagas.loadRelationEntities(actions.loadRelationEntities(relationEntityName))
            expect(gen.next().value).to.eql(select(sagas.detailViewSelector))
            expect(gen.next(detailView).value).to.eql(select(sagas.entityBrowserSelector))
            gen.next(entityBrowser).value
            expect(gen.next().done).to.be.true
          })
        })
      })
    })
  })
})
