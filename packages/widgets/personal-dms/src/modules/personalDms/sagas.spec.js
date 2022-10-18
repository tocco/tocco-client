import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {all, takeLatest} from 'redux-saga/effects'
import {rest} from 'tocco-app-extensions'

import * as actions from './actions'
import rootSaga, * as sagas from './sagas'

describe('personal-dms', () => {
  describe('modules', () => {
    describe('personalDms', () => {
      describe('sagas', () => {
        describe('rootSaga', () => {
          test('should fork child sagas', () => {
            const generator = rootSaga()
            expect(generator.next().value).to.deep.equal(
              all([takeLatest(actions.LOAD_PERSONAL_FOLDER_KEY, sagas.loadPersonalFolderKey)])
            )
            expect(generator.next().done).to.be.true
          })
        })

        describe('loadPersonalFolderKey', () => {
          test('loadPersonalFolderKey ', () => {
            return expectSaga(sagas.loadPersonalFolderKey)
              .provide([
                [matchers.call.fn(rest.fetchEntities), [{key: '1'}]],
                [matchers.call.fn(rest.requestSaga), {body: {key: 10}}]
              ])
              .put(actions.setPersonalFolderKey(10))
              .run()
          })
        })
      })
    })
  })
})
