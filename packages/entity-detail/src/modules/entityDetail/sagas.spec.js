import rootSaga, * as sagas from './sagas'
import {call, put, fork, select, takeLatest, takeEvery, all} from 'redux-saga/effects'
import * as actions from './actions'
import {
  startSubmit,
  stopSubmit,
  initialize as initializeForm,
  SubmissionError,
  touch
} from 'redux-form'
import {externalEvents, notifier, errorLogging, form} from 'tocco-util'
import {ClientQuestionCancelledException} from 'tocco-util/src/rest'
import {updateEntity, fetchEntity, fetchModel, fetchEntities, selectEntitiesTransformer} from '../../util/api/entities'
import {getFieldsOfDetailForm} from '../../util/api/forms'
import {submitValidate} from '../../util/detailView/asyncValidation'

const FORM_ID = 'detailForm'

describe('entity-detail', () => {
  describe('modules', () => {
    describe('entityDetail', () => {
      describe('sagas', () => {
        describe('rootSaga', () => {
          it('should fork child sagas', () => {
            const generator = rootSaga()
            expect(generator.next().value).to.deep.equal(all([
              fork(takeLatest, actions.LOAD_DETAIL_VIEW, sagas.loadDetailView),
              fork(takeLatest, actions.UNLOAD_DETAIL_VIEW, sagas.unloadDetailView),
              fork(takeEvery, actions.SUBMIT_FORM, sagas.submitForm),
              fork(takeEvery, actions.LOAD_RELATION_ENTITY, sagas.loadRelationEntity),
              fork(takeEvery, actions.LOAD_REMOTE_ENTITY, sagas.loadRemoteEntity),
              fork(takeEvery, actions.FIRE_TOUCHED, sagas.fireTouched)
            ]))
            expect(generator.next().done).to.be.true
          })
        })

        describe('getTargetEntityName saga', () => {
          it('should return the base entity name if paths empty', () => {
            const entityName = 'User'
            const modelPaths = []

            const gen = sagas.getTargetEntityName(entityName, modelPaths)

            const next = gen.next()
            expect(next.value).to.eql(entityName)
            expect(next.done).to.be.true
          })

          it('should return the entity name resolved via paths', () => {
            const baseEntityName = 'User'
            const fooEntityName = 'Foo'
            const barEntityName = 'Bar'

            const userEntityModel = {
              relFoo: {targetEntity: fooEntityName}
            }
            const fooEntityModel = {
              relBar: {targetEntity: barEntityName}
            }

            const modelPaths = ['relFoo', 'relBar']

            const gen = sagas.getTargetEntityName(baseEntityName, modelPaths)

            expect(gen.next().value).to.eql(call(fetchModel, baseEntityName))
            expect(gen.next(userEntityModel).value).to.eql(call(fetchModel, fooEntityName))
            expect(gen.next(fooEntityModel).value).to.eql(call(fetchModel, barEntityName))

            const next = gen.next()
            expect(next.value).to.eql(barEntityName)
            expect(next.done).to.be.true
          })

          it('should throw an exception if path could not be found', () => {
            const baseEntityName = 'User'
            const knownEntityName = 'Known_entity'

            const userEntityModel = {
              relKnown: {targetEntity: knownEntityName}
            }

            const modelPaths = ['relUnknown']

            const gen = sagas.getTargetEntityName(baseEntityName, modelPaths)

            expect(gen.next().value).to.eql(call(fetchModel, baseEntityName))
            expect(() => gen.next(userEntityModel).value)
              .to.throw('No such path \'relUnknown\' found on entity model \'User\'')
          })
        })

        describe('loadDetailView saga', () => {
          it('should fetch entity and set it in store', () => {
            const modelPaths = []
            const entityId = 99
            const formName = 'UserSearch_detail'
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

            const entityModel = {}

            const gen = sagas.loadDetailView(actions.loadDetailView(modelPaths, entityId))
            expect(gen.next().value).to.eql(select(sagas.inputSelector))
            expect(gen.next({entityName, formName, entityId}).value).to.eql(call(fetchModel, entityName))
            expect(gen.next(entityModel).value).to.eql(put(actions.setEntityModel(entityModel)))
            expect(gen.next().value).to.eql(call(sagas.loadDetailFormDefinition, formName))
            expect(gen.next(formDefinition).value)
              .to.eql(call(sagas.loadEntity, entityName, entityId, formDefinition, formName))
            expect(gen.next(entity).value).to.eql(call(form.entityToFormValues, entity))
            expect(gen.next({}).value).to.eql(put(initializeForm(FORM_ID, {})))
            expect(gen.next().done).to.be.true
          })
        })

        describe('submitForm saga', () => {
          it('should validate form and reload saved entity', () => {
            const formId = FORM_ID
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
            expect(gen.next().value).to.eql(call(form.getDirtyFields, initialValues, values))
            expect(gen.next(dirtyFields).value).to.eql(call(form.formValuesToEntity, values, dirtyFields))
            expect(gen.next(entity).value).to.eql(select(sagas.entityDetailSelector))
            expect(gen.next({formDefinition}).value).to.eql(call(getFieldsOfDetailForm, formDefinition))
            expect(gen.next(fields).value).to.eql(call(updateEntity, entity, fields))
            expect(gen.next(updatedEntity).value).to.eql(call(form.entityToFormValues, updatedEntity))
            expect(gen.next(updatedFormValues).value).to.eql(put(initializeForm(formId, updatedFormValues)))
            expect(gen.next().value).to.eql(put(notifier.info(
              'success',
              'client.entity-detail.saveSuccessfulTitle',
              'client.entity-detail.saveSuccessfulMessage',
              'check',
              2000))
            )
            const lastSaveAction = gen.next().value
            const lastSaveTime = lastSaveAction.PUT.action.payload.lastSave
            expect(lastSaveAction).to.eql(put(actions.setLastSave(lastSaveTime)))
            expect(gen.next().value).to.eql(put(stopSubmit(formId)))
            expect(gen.next().done).to.be.true
          })

          it('should put stopSubmit with errors on SubmissionError', () => {
            const formId = FORM_ID
            const values = {firstname: 'peter'}
            const initialValues = {firstname: 'pet'}
            const errors = {field1: 'invalid value'}

            const gen = sagas.submitForm()

            expect(gen.next().value) // not working : expect(gen.next().value).to.eql(select(getFormValues(formId)))
            expect(gen.next(values).value) // expect(gen.next().value).to.eql(select(formInitialValueSelector(formId)))
            expect(gen.next(initialValues).value).to.eql(put(startSubmit(formId)))
            expect(gen.next().value).to.eql(call(submitValidate, values, initialValues))

            expect(gen.throw(new SubmissionError(errors)).value).to.eql(put(touch(FORM_ID, 'field1')))
            expect(gen.next().value).to.eql(put(stopSubmit(FORM_ID, errors)))
            expect(gen.next().value).to.eql(put(notifier.info(
              'warning',
              'client.entity-detail.saveAbortedTitle',
              'client.entity-detail.saveAbortedMessage',
              'ban',
              5000
            )))

            expect(gen.next().done).to.be.true
          })

          it('should put stopSubmit without logging an error on ClientQuestionCancelledException', () => {
            const formId = FORM_ID
            const values = {firstname: 'peter'}
            const initialValues = {firstname: 'pet'}
            const dirtyFields = ['firstname']
            const entity = {}
            const formDefinition = {}
            const fields = []

            const gen = sagas.submitForm()

            expect(gen.next().value) // not working : expect(gen.next().value).to.eql(select(getFormValues(formId)))
            expect(gen.next(values).value) // expect(gen.next().value).to.eql(select(formInitialValueSelector(formId)))
            expect(gen.next(initialValues).value).to.eql(put(startSubmit(formId)))
            expect(gen.next().value).to.eql(call(submitValidate, values, initialValues))
            expect(gen.next().value).to.eql(call(form.getDirtyFields, initialValues, values))
            expect(gen.next(dirtyFields).value).to.eql(call(form.formValuesToEntity, values, dirtyFields))
            expect(gen.next(entity).value).to.eql(select(sagas.entityDetailSelector))
            expect(gen.next({formDefinition}).value).to.eql(call(getFieldsOfDetailForm, formDefinition))
            expect(gen.next(fields).value).to.eql(call(updateEntity, entity, fields))

            expect(gen.throw(new ClientQuestionCancelledException()).value).to.eql(put(stopSubmit(FORM_ID)))
            expect(gen.next().value).to.eql(put(notifier.info(
              'warning',
              'client.entity-detail.saveAbortedTitle',
              'client.entity-detail.saveAbortedMessage',
              'ban',
              5000
            )))

            expect(gen.next().done).to.be.true
          })

          it('should put stopSubmit and log the error on general errors', () => {
            const formId = FORM_ID
            const values = {firstname: 'peter'}
            const initialValues = {firstname: 'pet'}
            const dirtyFields = ['firstname']
            const entity = {}
            const formDefinition = {}
            const fields = []

            const gen = sagas.submitForm()

            expect(gen.next().value) // not working : expect(gen.next().value).to.eql(select(getFormValues(formId)))
            expect(gen.next(values).value) // expect(gen.next().value).to.eql(select(formInitialValueSelector(formId)))
            expect(gen.next(initialValues).value).to.eql(put(startSubmit(formId)))
            expect(gen.next().value).to.eql(call(submitValidate, values, initialValues))
            expect(gen.next().value).to.eql(call(form.getDirtyFields, initialValues, values))
            expect(gen.next(dirtyFields).value).to.eql(call(form.formValuesToEntity, values, dirtyFields))
            expect(gen.next(entity).value).to.eql(select(sagas.entityDetailSelector))
            expect(gen.next({formDefinition}).value).to.eql(call(getFieldsOfDetailForm, formDefinition))
            expect(gen.next(fields).value).to.eql(call(updateEntity, entity, fields))

            const error = new Error('anything')
            expect(gen.throw(error).value).to.eql(put(errorLogging.logError(
              'client.common.unexpectedError',
              'client.entity-detail.saveError',
              error
            )))
            expect(gen.next().value).to.eql(put(stopSubmit(FORM_ID)))
            expect(gen.next().value).to.eql(put(notifier.info(
              'warning',
              'client.entity-detail.saveAbortedTitle',
              'client.entity-detail.saveAbortedMessage',
              'ban',
              5000
            )))

            expect(gen.next().done).to.be.true
          })
        })

        describe('loadEntity saga', () => {
          it('should fetchEntity with fields of form and set it on store', () => {
            const entityName = 'User'
            const entityId = '99'
            const formDefinition = {}
            const formName = 'User_detail'

            const fields = []
            const entity = {}

            const gen = sagas.loadEntity(entityName, entityId, formDefinition, formName)

            expect(gen.next().value).to.eql(call(getFieldsOfDetailForm, formDefinition))
            expect(gen.next(fields).value).to.eql(call(fetchEntity, entityName, entityId, fields, formName))
            expect(gen.next(entity).value).to.eql(put(actions.setEntity(entity)))

            expect(gen.next().done).to.be.true
          })
        })

        describe('loadRelationEntity saga', () => {
          it('should load relation entities ', () => {
            const entityName = 'User'

            const entities = [{display: 'User1', key: 1}]
            const transformedEntities = [{key: 1, display: 'User1'}]
            const fetchParams = {fields: [], relations: []}
            const gen = sagas.loadRelationEntity(actions.loadRelationEntity(entityName))
            expect(gen.next().value).to.eql(select(sagas.entityDetailSelector))
            expect(gen.next({relationEntities: {}}).value)
              .to.eql(call(fetchEntities, entityName, fetchParams, selectEntitiesTransformer))
            expect(gen.next(entities).value)
              .to.eql(put(actions.setRelationEntity(entityName, transformedEntities, true)))
            expect(gen.next().value).to.eql(put(actions.setRelationEntityLoaded(entityName)))
            expect(gen.next().done).to.be.true
          })

          it('should not load entities if already loaded', () => {
            const entityName = 'User'

            const state = {
              relationEntities: {
                User: {
                  loaded: true
                }
              }
            }

            const gen = sagas.loadRelationEntity(actions.loadRelationEntity(entityName))
            expect(gen.next().value).to.eql(select(sagas.entityDetailSelector))
            expect(gen.next(state).done).to.be.true
          })
        })

        describe('loadRemoteEntity saga', () => {
          it('should load remote entities ', () => {
            const field = 'relUser'
            const entity = 'User'
            const searchTerm = 'Dan'

            const fetchedRemoteEntities = [{key: 1, label: 'One'}]
            const setRemoteEntities = [{key: 1, label: 'One'}]
            const searchInputs = {
              limit: 101,
              fields: [],
              relations: [],
              searchInputs: {
                _search: searchTerm
              }
            }

            const gen = sagas.loadRemoteEntity(actions.loadRemoteEntity(field, entity, searchTerm))

            expect(gen.next().value).to.eql(put(actions.setRemoteEntityLoading(field)))
            expect(gen.next().value).to.eql(call(fetchEntities, entity, searchInputs, selectEntitiesTransformer))
            expect(gen.next(fetchedRemoteEntities).value).to.eql(
              put(actions.setRemoteEntity(field, setRemoteEntities, false)))

            expect(gen.next().done).to.be.true
          })

          it('should set flag `moreOptionsAvailable` and splice array', () => {
            const field = 'relUser'
            const entity = 'User'

            const searchInputs = {
              limit: 101,
              fields: [],
              relations: [],
              searchInputs: {
                _search: ''
              }
            }

            const fetchedRemoteEntities = Array(101)
            const setRemoteEntities = Array(100)

            const gen = sagas.loadRemoteEntity(actions.loadRemoteEntity(field, entity, ''))

            expect(gen.next().value).to.eql(put(actions.setRemoteEntityLoading(field)))
            expect(gen.next().value).to.eql(call(fetchEntities, entity, searchInputs, selectEntitiesTransformer))
            expect(gen.next(fetchedRemoteEntities).value).to.eql(
              put(actions.setRemoteEntity(field, setRemoteEntities, true)))
            expect(gen.next().done).to.be.true
          })
        })

        describe('fireTouched saga', () => {
          it('should fire external event if state changed', () => {
            const gen = sagas.fireTouched(actions.fireTouched(true))

            expect(gen.next().value).to.eql(select(sagas.entityDetailSelector))
            expect(gen.next({touched: false}).value)
              .to.eql(put(externalEvents.fireExternalEvent('onTouchedChange', {touched: true})))
            expect(gen.next().value).to.eql(put(actions.setTouched(true)))

            expect(gen.next().done).to.be.true
          })

          it('should not fire external event if state did not change', () => {
            const gen = sagas.fireTouched(actions.fireTouched(true))

            expect(gen.next().value).to.eql(select(sagas.entityDetailSelector))
            expect(gen.next({touched: true}).done).to.be.true
          })
        })
      })
    })
  })
})
