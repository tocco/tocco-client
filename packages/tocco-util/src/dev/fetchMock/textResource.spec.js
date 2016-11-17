import textResourceFetchMock from './textResource'

describe('tocco-util', () => {
  describe('dev', () => {
    describe('utilFetchMock', () => {
      describe('textResourceFetchMock', () => {
        it('should contain a matcher for textresources', () => {
          let urlRegex

          const fetchMockStub = {
            get: (regex, response) => {
              urlRegex = regex
            }
          }

          textResourceFetchMock(fetchMockStub, [])

          expect(urlRegex.toString()).to.contains('/textresource')
        })

        it('should return an object with readable text resources', () => {
          let fetchResponse

          const fetchMockStub = {
            get: (regex, response) => {
              fetchResponse = response
            }
          }

          textResourceFetchMock(fetchMockStub, ['test.twoWords', 'test.threeWordsYes'])

          const expectedResult = {
            'test.twoWords': 'Two Words',
            'test.threeWordsYes': 'Three Words Yes'
          }

          expect(fetchResponse).to.deep.equal(expectedResult)
        })
      })
    })
  })
})
