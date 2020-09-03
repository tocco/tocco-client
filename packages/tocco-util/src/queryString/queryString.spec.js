import {toQueryString, fromQueryString, hasJsonStructure} from './queryString'

describe('tocco-util', () => {
  describe('queryString', () => {
    const obj = {
      actionProperties: {
        formName: 'My_custom_form_list',
        hideSearch: true
      },
      selection: {
        count: 25,
        entityName: 'Input',
        query: {
          tql: 'IN(relInput_status.pk,2)'
        },
        type: 'QUERY'
      }
    }

    const queryString = 'actionProperties=%7B%22formName%22%3A%22My_custom_form_list%22%2C%22hideSearch%22%3Atrue%7D'
      + '&selection=%7B%22count%22%3A25%2C%22entityName%22%3A%22Input%22%2C%22query%22%3A%7B'
      + '%22tql%22%3A%22IN%28relInput_status.pk%2C2%29%22%7D%2C%22type%22%3A%22QUERY%22%7D'

    describe('toQueryString', () => {
      test('should build query param string from action properties object', () => {
        expect(toQueryString(obj)).to.eql(queryString)
      })
    })

    describe('fromQueryString', () => {
      test('should build action properties object from query string', () => {
        expect(fromQueryString(queryString)).to.eql(obj)
      })
    })

    describe('hasJsonStructure', () => {
      test('should return true if represents JSON stringified object', () => {
        expect(hasJsonStructure('{"x":true}')).to.be.true
      })

      test('should return false if represents a JSON stringified array', () => {
        // we don't have to JSON stringify array values, because the 'query-string' library can handle those
        expect(hasJsonStructure('[1, false, null]')).to.be.false
      })

      test('should return false if represents a primitive value', () => {
        expect(hasJsonStructure('true')).to.be.false
      })
    })
  })
})
