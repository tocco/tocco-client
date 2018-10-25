import {setupFetchMock} from './mockData'

describe('tocco-util', () => {
  describe('mockData', () => {
    describe('mockData', () => {
      describe('setupFetchMock', () => {
        test('setup basic mocks', () => {
          const getSpy = sinon.spy()
          const postSpy = sinon.spy()
          const deleteSpy = sinon.spy()
          const fetchMockMock = {
            get: getSpy,
            post: postSpy,
            delete: deleteSpy
          }

          const entityStore = {}

          setupFetchMock(fetchMockMock, entityStore)
          expect(getSpy).to.be.called
          expect(postSpy).to.be.called
          expect(deleteSpy).to.be.called
        })
      })
    })
  })
})
