import {setupTextResources} from './textResource'

describe('tocco-util', () => {
  describe('mockData', () => {
    const packageName = 'entity-detail'
    describe('textResource', () => {
      test('should contain a matcher for textresources', () => {
        let urlRegex

        const fetchMockStub = {
          get: (regex, response) => {
            urlRegex = regex
          }
        }

        setupTextResources(packageName, fetchMockStub, [])

        expect(urlRegex.toString()).to.contains('/textresource')
      })

      test('should return an object with readable text resources', () => {
        let fetchResponse

        const fetchMockStub = {
          get: (regex, response) => {
            fetchResponse = response
          }
        }

        setupTextResources(packageName, fetchMockStub, ['test.twoWords', 'test.threeWordsYes'])

        expect(fetchResponse).to.have.property('test.twoWords', 'Two Words')
        expect(fetchResponse).to.have.property('test.threeWordsYes', 'Three Words Yes')
      })
    })
  })
})
