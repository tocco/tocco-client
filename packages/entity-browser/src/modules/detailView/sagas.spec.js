import rootSaga, * as sagas from './sagas'
import {takeLatest, takeEvery} from 'redux-saga'
import {call, put, fork, select} from 'redux-saga/effects'
import * as actions from './actions'

import {fetchEntity} from '../../util/api/entities'
import {fetchForm, getFieldsOfDetailForm} from '../../util/api/forms'

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
              fork(takeEvery, actions.SAVE_ENTITY, sagas.saveEntity)
            ])
            expect(generator.next().done).to.be.true
          })
        })

        describe('initialize saga', () => {
          it('should set entityname and load detail form definition', () => {
            const formBase = 'Base_form'
            const entityName = 'User'

            const gen = sagas.initialize({payload: {entityName, formBase}})

            expect(gen.next().value).to.eql(put(actions.setEntityName(entityName)))
            expect(gen.next().value).to.eql(call(fetchForm, formBase + '_detail'))
            expect(gen.next([]).value).to.eql(put(actions.setFormDefinition([])))
          })
        })

        describe('loadEntity saga', () => {
          it('should initialize the entity browser by form base', () => {
            const entityId = 99
            const entityName = 'User'
            const formDefinition = {}

            const gen = sagas.loadEntity({payload: {entityId}})

            expect(gen.next().value).to.eql(select(sagas.detailViewSelector))
            expect(gen.next({entityName, formDefinition}).value).to.eql(call(getFieldsOfDetailForm, formDefinition))
            expect(gen.next([]).value).to.eql(
              call(fetchEntity, entityName, entityId, [])
            )

            expect(gen.next([]).value).to.eql(put(actions.setEntity([])))
          })
        })
      })
    })
  })
})
