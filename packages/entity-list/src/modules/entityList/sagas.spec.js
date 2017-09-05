import {put, call, fork, takeLatest, all} from 'redux-saga/effects'
import * as actions from './actions'
import rootSaga, * as sagas from './sagas'
import {fetchModel} from '../../util/api/entities'

describe('entity-list', () => {
  describe('modules', () => {
    describe('entityList', () => {
      describe('sagas', () => {
        describe('rootSaga', () => {
          it('should fork child sagas', () => {
            const generator = rootSaga()
            expect(generator.next().value).to.deep.equal(all([
              fork(takeLatest, actions.INITIALIZE, sagas.initialize),
              fork(takeLatest, actions.NAVIGATE_TO_CREATE, sagas.navigateToCreate)
            ]))
            expect(generator.next().done).to.be.true
          })
        })

        describe('loadEntityModel saga', () => {
          it('should load model if not already loaded', () => {
            const entityName = 'User'
            const entityModel = {}
            const loadedModel = {}
            const gen = sagas.loadEntityModel(entityName, entityModel)

            expect(gen.next().value).to.eql(call(fetchModel, entityName))
            expect(gen.next(loadedModel).value).to.eql(put(actions.setEntityModel(loadedModel)))

            expect(gen.next().done).to.be.true
          })

          it('should not load model if already loaded', () => {
            const entityName = 'User'
            const entityModel = {someContent: true}

            const gen = sagas.loadEntityModel(entityName, entityModel)
            expect(gen.next().done).to.be.true
          })
        })
      })
    })
  })
})
