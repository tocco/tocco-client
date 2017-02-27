import {put, select, call, fork, takeLatest} from 'redux-saga/effects'
import * as actions from './actions'
import * as searchFormActions from '../../list/modules/searchForm/actions'
import * as listViewActions from '../../list/modules/actions'
import * as detailViewActions from '../../../detail/modules/detailView/actions'
import rootSaga, * as sagas from './sagas'
import {fetchModel} from '../../../util/api/entities'

describe('entity-browser', () => {
  describe('modules', () => {
    describe('entityBrowser', () => {
      describe('sagas', () => {
        describe('rootSaga', () => {
          it('should fork child sagas', () => {
            const generator = rootSaga()
            expect(generator.next().value).to.deep.equal([
              fork(takeLatest, actions.INITIALIZE, sagas.initialize)
            ])
            expect(generator.next().done).to.be.true
          })
        })

        describe('initialize saga', () => {
          it('should initialize search- and list-form', () => {
            const entityName = 'User'
            const formBase = 'UserSearch'
            const disableSimpleSearch = false
            const simpleSearchFields = 'some,simple,search,fields'

            const input = {
              entityName,
              limit: 50,
              formBase,
              showSearchForm: true,
              disableSimpleSearch,
              simpleSearchFields
            }

            const gen = sagas.initialize()
            expect(gen.next().value).to.eql(select(sagas.entityBrowserSelector))
            expect(gen.next(input).value).to.eql(call(fetchModel, entityName))
            expect(gen.next({}).value).to.eql(put(actions.setEntityModel({})))
            expect(gen.next().value).to.eql(put(searchFormActions.initialize(
              entityName,
              formBase,
              disableSimpleSearch,
              simpleSearchFields))
            )
            expect(gen.next().value).to.eql(put(listViewActions.initialize(entityName, formBase)))
            expect(gen.next().value).to.eql(put(detailViewActions.initialize(entityName, formBase)))
            expect(gen.next().done).to.be.true
          })

          it('should not initialize search form', () => {
            const entityName = 'User'
            const formBase = 'UserSearch'
            const disableSimpleSearch = false
            const simpleSearchFields = 'some,simple,search,fields'

            const input = {
              entityName,
              limit: 50,
              formBase,
              showSearchForm: false,
              disableSimpleSearch,
              simpleSearchFields
            }

            const gen = sagas.initialize()
            expect(gen.next().value).to.eql(select(sagas.entityBrowserSelector))
            expect(gen.next(input).value).to.eql(call(fetchModel, entityName))
            expect(gen.next({}).value).to.eql(put(actions.setEntityModel({})))
            expect(gen.next().value).to.eql(put(listViewActions.initialize(entityName, formBase)))
            expect(gen.next().value).to.eql(put(detailViewActions.initialize(entityName, formBase)))
            expect(gen.next().done).to.be.true
          })

          it('should use the entity name as form base', () => {
            const entityName = 'User'
            const formBase = ''
            const disableSimpleSearch = false
            const simpleSearchFields = 'some,simple,search,fields'

            const input = {
              entityName,
              limit: 50,
              formBase,
              showSearchForm: false,
              disableSimpleSearch,
              simpleSearchFields
            }

            const gen = sagas.initialize()
            expect(gen.next().value).to.eql(select(sagas.entityBrowserSelector))
            expect(gen.next(input).value).to.eql(call(fetchModel, entityName))
            expect(gen.next({}).value).to.eql(put(actions.setEntityModel({})))
            expect(gen.next().value).to.eql(put(actions.setFormBase(entityName)))
            expect(gen.next().value).to.eql(put(listViewActions.initialize(entityName, entityName)))
            expect(gen.next().value).to.eql(put(detailViewActions.initialize(entityName, entityName)))
            expect(gen.next().done).to.be.true
          })
        })
      })
    })
  })
})
