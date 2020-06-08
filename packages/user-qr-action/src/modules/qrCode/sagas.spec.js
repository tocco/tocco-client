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
        expect(generator.next().value).to.deep.equal(all([
          takeEvery(actions.FETCH_DATA, sagas.fetchData)
        ]))
        expect(generator.next().done).to.be.true
      })

      describe('getSingleKey', () => {
        test('should return the only key of the selection', () => {
          expect(sagas.getSingleKey({entityName: 'User', type: 'ID', ids: ['1']})).to.equal('1')
        })

        test('should throw error if not User entity', () => {
          expect(() => sagas.getSingleKey({entityName: 'Address'}))
            .to.throw('Only selection of User supported')
        })

        test('should throw error if not ID selection', () => {
          expect(() => sagas.getSingleKey({entityName: 'User', type: 'QUERY'}))
            .to.throw('Only ID selection type supported')
        })

        test('should throw error if ids not present', () => {
          expect(() => sagas.getSingleKey({entityName: 'User', type: 'ID', ids: undefined}))
            .to.throw('Exactly one user must be selected')
        })

        test('should throw error if ids empty', () => {
          expect(() => sagas.getSingleKey({entityName: 'User', type: 'ID', ids: []}))
            .to.throw('Exactly one user must be selected')
        })

        test('should throw error if ids contains more than 1', () => {
          expect(() => sagas.getSingleKey({entityName: 'User', type: 'ID', ids: ['1', '2']}))
            .to.throw('Exactly one user must be selected')
        })
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
            .run()
        )
      })
    })
  })
})
