import {setupFetchMock} from './fetchMock'

describe('tocco-util', () => {
  describe('mockData', () => {
    describe('fetchMock', () => {
      describe('setupFetchMock', () => {
        it('setup basic mocks', () => {
          const getSpy = sinon.spy()
          const fetchMock = {
            get: getSpy
          }

          const entityStore = {}

          setupFetchMock(fetchMock, entityStore)
          expect(getSpy).to.be.called
        })
      })
    })
  })
})
