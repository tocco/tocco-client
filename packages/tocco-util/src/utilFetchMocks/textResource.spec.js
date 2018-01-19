import textResourceFetchMock from './textResource'

describe('tocco-util', () => {
  describe('dev', () => {
    describe('utilFetchMock', () => {
      const packageName = 'entity-detail'
      describe('textResourceFetchMock', () => {
        it('should contain a matcher for textresources', () => {
          let urlRegex

          const fetchMockStub = {
            get: (regex, response) => {
              urlRegex = regex
            }
          }

          textResourceFetchMock(packageName, fetchMockStub, [])

          expect(urlRegex.toString()).to.contains('/textresource')
        })

        it('should return an object with readable text resources', () => {
          let fetchResponse

          const fetchMockStub = {
            get: (regex, response) => {
              fetchResponse = response
            }
          }

          textResourceFetchMock(packageName, fetchMockStub, ['test.twoWords', 'test.threeWordsYes'])

          expect(fetchResponse).to.have.property('test.twoWords', 'Two Words')
          expect(fetchResponse).to.have.property('test.threeWordsYes', 'Three Words Yes')
        })
      })
    })
  })
})
