import {getParameterValue, evaluateFulltext} from './utils'

describe('tocco-util', () => {
  describe('mockData', () => {
    describe('utils', () => {
      describe('evaluateFulltext', () => {
        test('should extract fulltext value', () => {
          const query = 'firstname === "heinz" and fulltext("test")'
          const result = evaluateFulltext(query)
          expect(result).to.eql('test')
        })

        test('should return null if no fulltext exists', () => {
          const query = 'firstname === "heinz"'
          const result = evaluateFulltext(query)
          expect(result).to.be.null
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
