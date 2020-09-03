import {expectSaga} from 'redux-saga-test-plan'
import {consoleLogger} from 'tocco-util'

import {getEntities} from './selection'

describe('tocco-util', () => {
  describe('selection', () => {
    describe('getEntities', () => {
      test('should return object with name and array', () => {
        const entityName = 'User'
        const selection = {type: 'ID', ids: ['1', '3'], entityName}
        const expectedResult = {
          entityName,
          keys: ['1', '3']
        }

        return expectSaga(getEntities, selection)
          .returns(expectedResult)
          .run()
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

        return expectSaga(getEntities, selection, fetchEntities)
          .returns(expectedResult)
          .run()
      })

      test('should call console log if entities are to many', () => {
        const entityName = 'User'
        const selection = {type: 'QUERY', entityName}

        const fakeEntities = [...Array(100002).keys()].map(key => ({key}))
        const fetchEntities = sinon.fake.returns(fakeEntities)

        return expectSaga(getEntities, selection, fetchEntities)
          .call.like({fn: consoleLogger.logError})
          .run()
      })
    })
  })
})
