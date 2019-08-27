import fetchMock from 'fetch-mock'

import {setupReports} from './reports'

const timeout = ms => new Promise(resolve => setTimeout(resolve, ms))

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
            return fetch(resource).then(res => res.json()).should.eventually.have.property('generalSettings')
          })
        })

        describe('Report Generation', () => {
          test('should return 202 status for a report', () => {
            setupReports(fetchMock)
            const resource = '/nice2/rest/report/sample_report/generations'
            return fetch(resource, {method: 'POST', body: {settings: {}}})
              .should.eventually.have.property('status', 202)
          })

          test('should return 400 for invalid_settings_report', () => {
            setupReports(fetchMock)
            const resource = '/nice2/rest/report/invalid_settings_report/generations'
            return fetch(resource, {method: 'POST', acceptedStatusCodes: [400], body: {settings: {}}})
              .should.eventually.have.property('status', 400)
          })
        })

        describe('Report Generation Status', () => {
          test('should first return in_progress answer and then completed.', async() => {
            setupReports(fetchMock, null, 0)

            const resource = '/nice2/rest/report/sample_report/generations'

            const response = await fetch(resource, {method: 'POST', body: {settings: {}}})
            const location = response.headers.get('Location')

            const firstRequestResponse = await fetch(location).then(resp => resp.json())
            await timeout(100)
            const sendRequestResponse = await fetch(location).then(resp => resp.json())

            expect(firstRequestResponse).to.have.property('status', 'in_progress')
            expect(sendRequestResponse).to.have.property('status', 'completed')
          })

          test('should first return in_progress answer and then failed for generate_fails_report.', async() => {
            setupReports(fetchMock, null, 0)

            const resource = '/nice2/rest/report/generate_fails_report/generations'

            const response = await fetch(resource, {method: 'POST', body: {settings: {}}})
            const location = response.headers.get('Location')

            const firstRequestResponse = await fetch(location).then(resp => resp.json())
            await timeout(100)
            const sendRequestResponse = await fetch(location).then(resp => resp.json())

            expect(firstRequestResponse).to.have.property('status', 'in_progress')
            expect(sendRequestResponse).to.have.property('status', 'failed')
          })
        })
      })
    })
  })
})
