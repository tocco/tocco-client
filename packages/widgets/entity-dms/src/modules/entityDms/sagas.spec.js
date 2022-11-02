import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {all, select, takeLatest} from 'redux-saga/effects'
import {rest} from 'tocco-app-extensions'

import * as actions from './actions'
import rootSaga, * as sagas from './sagas'

describe('entity-dms', () => {
  describe('modules', () => {
    describe('entityDms', () => {
      describe('sagas', () => {
        describe('rootSaga', () => {
          test('should fork child sagas', () => {
            const generator = rootSaga()
            expect(generator.next().value).to.deep.equal(
              all([takeLatest(actions.LOAD_FOLDER_KEY, sagas.loadFolderKey)])
            )
            expect(generator.next().done).to.be.true
          })
        })

        describe('loadFolderKey', () => {
          test('loadFolderKey ', () => {
            return expectSaga(sagas.loadFolderKey)
              .provide([
                [select(sagas.inputSelector), {entityModel: 'Classroom'}],
                [matchers.call.fn(rest.requestSaga), {body: {key: '10'}}]
              ])
              .put(actions.setFolderKey('10'))
              .run()
          })
        })
      })
    })
  })
})
