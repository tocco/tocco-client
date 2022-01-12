import {expectSaga} from 'redux-saga-test-plan'
import {consoleLogger} from 'tocco-util'

import {getEntities, getSingleKey} from './selection'

describe('app-extensions', () => {
  describe('selection', () => {
    describe('getEntities', () => {
      test('should return object with name and array', () => {
        const entityName = 'User'
        const selection = {type: 'ID', ids: ['1', '3'], entityName}
        const expectedResult = {
          entityName,
          keys: ['1', '3']
        }

        return expectSaga(getEntities, selection).returns(expectedResult).run()
      })

      test('should fetch entities for query type', () => {
        const entityName = 'User'
        const selection = {type: 'QUERY', entityName}

        const fakeEntities = [{key: '1'}, {key: '4'}]
        const fetchEntities = sinon.fake.returns(fakeEntities)
        const expectedResult = {
          entityName,
          keys: ['1', '4']
        }

        return expectSaga(getEntities, selection, fetchEntities).returns(expectedResult).run()
      })

      test('should call console log if entities are to many', () => {
        const entityName = 'User'
        const selection = {type: 'QUERY', entityName}

        const fakeEntities = [...Array(100002).keys()].map(key => ({key}))
        const fetchEntities = sinon.fake.returns(fakeEntities)

        return expectSaga(getEntities, selection, fetchEntities).call.like({fn: consoleLogger.logError}).run()
      })
    })

    describe('getSingleKey', () => {
      test('should return the only key of the selection', () => {
        expect(getSingleKey({entityName: 'User', type: 'ID', ids: ['1']}, 'User')).to.equal('1')
      })

      test('should throw error if not expected entity', () => {
        expect(() => getSingleKey({entityName: 'Address'}, 'User')).to.throw('Only selection of User supported')
      })

      test('should throw error if not ID selection', () => {
        expect(() => getSingleKey({entityName: 'User', type: 'QUERY'}, 'User')).to.throw(
          'Only ID selection type supported'
        )
      })

      test('should throw error if ids not present', () => {
        expect(() => getSingleKey({entityName: 'User', type: 'ID', ids: undefined}, 'User')).to.throw(
          'Exactly one User must be selected'
        )
      })

      test('should throw error if ids empty', () => {
        expect(() => getSingleKey({entityName: 'User', type: 'ID', ids: []}, 'User')).to.throw(
          'Exactly one User must be selected'
        )
      })

      test('should throw error if ids contains more than 1', () => {
        expect(() => getSingleKey({entityName: 'User', type: 'ID', ids: ['1', '2']}, 'User')).to.throw(
          'Exactly one User must be selected'
        )
      })
    })
  })
})
