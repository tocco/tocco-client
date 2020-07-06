import {expectSaga} from 'redux-saga-test-plan'
import {consoleLogger} from 'tocco-util'

import {selectionToQueryString, queryStringToSelection, getEntities} from './selection'

describe('tocco-util', () => {
  describe('selection', () => {
    const selection = {
      count: 25,
      entityName: 'Input',
      query: {
        tql: 'IN(relInput_status.pk,2)'
      },
      type: 'QUERY'
    }

    const queryString = 'selection=%7B%22count%22%3A25%2C%22entityName%22%3A%22Input%22%2C%22'
      + 'query%22%3A%7B%22tql%22%3A%22IN(relInput_status.pk%2C2)%22%7D%2C%22type%22%3A%22QUERY%22%7D'

    describe('selectionToQueryString', () => {
      test('should build query param string from selection object', () => {
        expect(selectionToQueryString(selection)).to.eql(queryString)
      })
    })

    describe('queryStringToSelection', () => {
      test('should build selection object from query string', () => {
        expect(queryStringToSelection(queryString)).to.eql(selection)
      })
    })

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
