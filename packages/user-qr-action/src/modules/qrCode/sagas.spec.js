import {expectSaga} from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {all, select, takeEvery} from 'redux-saga/effects'
import {rest} from 'tocco-app-extensions'

import * as actions from './actions'
import rootSaga, * as sagas from './sagas'

describe('user-qr-action', () => {
  describe('modules', () => {
    describe('sagas', () => {
      test('should fork child sagas', () => {
        const generator = rootSaga()
        expect(generator.next().value).to.deep.equal(all([takeEvery(actions.FETCH_DATA, sagas.fetchData)]))
        expect(generator.next().done).to.be.true
      })

      describe('fetchData', () => {
        const fakeEntity = {paths: {firstname: {value: 'Max'}}}
        const data = {
          firstname: 'Max'
        }

        test('should fetch user data', () =>
          expectSaga(sagas.fetchData)
            .provide([
              [select(sagas.inputSelector), {selection: {entityName: 'User', type: 'ID', ids: ['1']}}],
              [matchers.call.fn(rest.fetchEntity), fakeEntity]
            ])
            .put(actions.setData(data))
            .run())
      })
    })
  })
})
