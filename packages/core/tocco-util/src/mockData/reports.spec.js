import fetchMock from 'fetch-mock'

import {setupReports} from './reports'

describe('tocco-util', () => {
  describe('mockData', () => {
    describe('mockData', () => {
      beforeEach(() => {
        fetchMock.reset()
        fetchMock.restore()
      })

      describe('setupReports', () => {
        test('setup basic mocks', () => {
          const getSpy = sinon.spy()
          const postSpy = sinon.spy()
          const fetchMockMock = {
            get: getSpy,
            post: postSpy
          }

          setupReports(fetchMockMock)
          expect(getSpy).to.be.called
          expect(postSpy).to.be.called
        })

        describe('Report Settings', () => {
          test('should return valid response with generalSettings', () => {
            setupReports(fetchMock)
            const resource = '/nice2/rest/report/sample_report/settings'
            return fetch(resource, {method: 'POST'})
              .then(res => res.json())
              .should.eventually.have.property('generalSettings')
          })
        })

        describe('Report Generation', () => {
          test('should return 202 status for a report', () => {
            setupReports(fetchMock)
            const resource = '/nice2/rest/report/generation'
            const body = {additionalProperties: {reportId: 'sample_report'}}
            return fetch(resource, {method: 'POST', body: JSON.stringify(body)}).should.eventually.have.property(
              'status',
              200
            )
          })

          test('should return 400 for invalid_settings_report', () => {
            setupReports(fetchMock)
            const resource = '/nice2/rest/report/generation'
            const body = {additionalProperties: {reportId: 'invalid_settings_report'}}
            return fetch(resource, {
              method: 'POST',
              acceptedStatusCodes: [400],
              body: JSON.stringify(body)
            }).should.eventually.have.property('status', 400)
          })
        })
      })
    })
  })
})
