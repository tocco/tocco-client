import {typeValueExtractor} from './entities'

describe('tocco-util', () => {
  describe('api', () => {
    describe('typeValueExtractor', () => {
      test('should handle display epressions', () => {
        const value = '<h1>Test</h1>'
        const result = typeValueExtractor['display-expression'](value)
        expect(result).to.eql(value)
      })

      test('should handle entity', () => {
        const value = {key: '1', display: 'Test', link: 'test', model: 'User'}
        const result = typeValueExtractor.entity(value)
        const expectedResult = {key: '1', display: 'Test', model: 'User'}
        expect(result).to.eql(expectedResult)
      })

      test('should handle entity-list', () => {
        const value = [{key: '1', display: 'Test', link: 'test', model: 'User'},
          {key: '71', display: 'Test 4', link: 'test', model: 'User'}]
        const result = typeValueExtractor['entity-list'](value)
        const expectedResult = [{key: '1', display: 'Test', model: 'User'},
          {key: '71', display: 'Test 4', model: 'User'}]
        expect(result).to.eql(expectedResult)
      })

      test('should extract values of special field types', () => {
        const value = {type: 'login', value: {username: 'dake'}}
        const result = typeValueExtractor.field(value)
        expect(result).to.eql('dake')
      })

      test('should return null if value is null', () => {
        let value = {type: 'login', value: null}
        let result = typeValueExtractor.field(value)
        expect(result).to.eql(null)

        value = {type: 'string', value: null}
        result = typeValueExtractor.field(value)
        expect(result).to.eql(null)
      })
    })
  })
})
