import {evaluateINQuery, getParameterValue} from './utils'

describe('tocco-util', () => {
  describe('mockData', () => {
    describe('utils', () => {
      describe('evaluateINQuery', () => {
        test('should extract keys', () => {
          const query = 'IN(pk, 1, 3, 55)'
          const result = evaluateINQuery(query)
          expect(result).to.eql(['1', '3', '55'])
        })

        test('should return empty array of no IN query exists', () => {
          const query = 'YX(pk, 1, 3, 55)'
          const result = evaluateINQuery(query)
          expect(result).to.eql([])
        })
      })

      describe('getParameterValue', () => {
        test('setup return parameter value', () => {
          const paramName = '_para1'
          const paramValue = 'test123'
          const url = `http://someurl.com/route?${paramName}=${paramValue}`
          const result = getParameterValue(paramName, url)
          expect(result).to.eql(paramValue)
        })

        test('setup return null for none existing parameter', () => {
          const paramName = '_para1'
          const url = 'http://someurl.com/route'
          const result = getParameterValue(paramName, url)
          expect(result).to.be.null
        })
      })
    })
  })
})
