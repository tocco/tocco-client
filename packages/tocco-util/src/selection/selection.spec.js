import {selectionToQueryString, queryStringToSelection} from './selection'

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
  })
})
